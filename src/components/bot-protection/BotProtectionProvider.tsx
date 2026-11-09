"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { GENERATION_COOLDOWN_MS } from "@/lib/bot-protection/constants";
import {
  isDevSessionToken,
  isStoredSessionValid,
  issueDevSessionToken,
  readStoredSessionToken,
  storeSessionToken,
} from "@/lib/bot-protection/session-client";
import { loadTurnstileScript } from "@/lib/bot-protection/turnstile-loader";

export type BotGuardFailureCode = "rate_limit" | "session";

export type BotGuardResult =
  | { ok: true }
  | { ok: false; code: BotGuardFailureCode };

type BotProtectionContextValue = {
  guardGeneration: () => Promise<BotGuardResult>;
  ready: boolean;
};

const BotProtectionContext = createContext<BotProtectionContextValue | null>(
  null,
);

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? "";

async function exchangeTurnstileForSession(turnstileToken: string) {
  const response = await fetch("/api/bot/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ turnstileToken }),
  });

  if (!response.ok) {
    throw new Error("session_exchange_failed");
  }

  const data = (await response.json()) as { sessionToken?: string };
  if (!data.sessionToken) {
    throw new Error("session_missing");
  }

  storeSessionToken(data.sessionToken);
  return data.sessionToken;
}

export function BotProtectionProvider({ children }: { children: ReactNode }) {
  const widgetHostRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const pendingResolveRef = useRef<((token: string) => void) | null>(null);
  const pendingRejectRef = useRef<((reason?: unknown) => void) | null>(null);
  const lastGenerationAtRef = useRef(0);
  /** With Turnstile configured: true only after first successful session exchange. */
  const [ready, setReady] = useState(!siteKey);

  const resolveTurnstile = useCallback((token: string) => {
    pendingResolveRef.current?.(token);
    pendingResolveRef.current = null;
    pendingRejectRef.current = null;
  }, []);

  const rejectTurnstile = useCallback(() => {
    pendingRejectRef.current?.(new Error("turnstile_error"));
    pendingResolveRef.current = null;
    pendingRejectRef.current = null;
  }, []);

  const runInvisibleTurnstile = useCallback((): Promise<string> => {
    if (!siteKey || !widgetIdRef.current || !window.turnstile) {
      return Promise.reject(new Error("turnstile_unavailable"));
    }

    return new Promise((resolve, reject) => {
      pendingResolveRef.current = resolve;
      pendingRejectRef.current = reject;
      window.turnstile!.reset(widgetIdRef.current!);
      window.turnstile!.execute(widgetIdRef.current!);
    });
  }, []);

  const ensureSession = useCallback(async () => {
    if (!siteKey) {
      const devToken = issueDevSessionToken();
      storeSessionToken(devToken);
      return devToken;
    }

    const existing = readStoredSessionToken();
    if (isStoredSessionValid(existing)) {
      return existing!;
    }

    const turnstileToken = await runInvisibleTurnstile();
    return exchangeTurnstileForSession(turnstileToken);
  }, [runInvisibleTurnstile]);

  useEffect(() => {
    if (!siteKey) {
      storeSessionToken(issueDevSessionToken());
      setReady(true);
      return;
    }

    let cancelled = false;
    setReady(false);

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !widgetHostRef.current || !window.turnstile) {
          if (!cancelled) setReady(false);
          return;
        }

        widgetIdRef.current = window.turnstile.render(widgetHostRef.current, {
          sitekey: siteKey,
          size: "invisible",
          appearance: "execute",
          callback: (token) => {
            void exchangeTurnstileForSession(token)
              .then(() => resolveTurnstile(token))
              .catch(() => rejectTurnstile());
          },
          "error-callback": () => rejectTurnstile(),
          "expired-callback": () => rejectTurnstile(),
        });

        void ensureSession()
          .then(() => {
            if (!cancelled) setReady(true);
          })
          .catch(() => {
            if (!cancelled) setReady(false);
          });
      })
      .catch(() => {
        if (!cancelled) setReady(false);
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [ensureSession, rejectTurnstile, resolveTurnstile]);

  const guardGeneration = useCallback(async (): Promise<BotGuardResult> => {
    const now = Date.now();
    if (now - lastGenerationAtRef.current < GENERATION_COOLDOWN_MS) {
      return { ok: false, code: "rate_limit" };
    }

    try {
      const token = await ensureSession();
      if (!token) {
        return { ok: false, code: "session" };
      }

      if (!isDevSessionToken(token)) {
        const verify = await fetch("/api/bot/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionToken: token }),
        });
        const data = (await verify.json()) as { ok?: boolean };
        if (!data.ok) {
          storeSessionToken("");
          await ensureSession();
        }
      }

      lastGenerationAtRef.current = Date.now();
      return { ok: true };
    } catch {
      return { ok: false, code: "session" };
    }
  }, [ensureSession]);

  const value = useMemo<BotProtectionContextValue>(
    () => ({ guardGeneration, ready }),
    [guardGeneration, ready],
  );

  return (
    <BotProtectionContext.Provider value={value}>
      {children}
      <div
        ref={widgetHostRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 h-px w-px overflow-hidden opacity-0"
        data-purepdf-turnstile-host
      />
    </BotProtectionContext.Provider>
  );
}

export function useBotProtection() {
  const context = useContext(BotProtectionContext);
  if (!context) {
    throw new Error("useBotProtection must be used within BotProtectionProvider");
  }
  return context;
}
