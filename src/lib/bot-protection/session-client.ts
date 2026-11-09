"use client";

import {
  BOT_SESSION_STORAGE_KEY,
  SESSION_TTL_MS,
} from "@/lib/bot-protection/constants";

export function readStoredSessionToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return sessionStorage.getItem(BOT_SESSION_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function storeSessionToken(token: string) {
  try {
    if (!token) {
      sessionStorage.removeItem(BOT_SESSION_STORAGE_KEY);
      return;
    }
    sessionStorage.setItem(BOT_SESSION_STORAGE_KEY, token);
  } catch {
    /* private mode / quota */
  }
}

export function isStoredSessionValid(token: string | null): boolean {
  if (!token) return false;
  const expRaw = token.split(".")[0];
  const exp = Number(expRaw);
  if (!Number.isFinite(exp)) return false;
  return exp > Date.now() + 5_000;
}

export function sessionExpiresInMs(token: string | null): number {
  if (!token) return 0;
  const exp = Number(token.split(".")[0]);
  if (!Number.isFinite(exp)) return 0;
  return Math.max(0, exp - Date.now());
}

/** Dev-only local token when Turnstile keys are not configured. */
export function issueDevSessionToken(): string {
  const exp = Date.now() + SESSION_TTL_MS;
  return `${exp}.dev`;
}

export function isDevSessionToken(token: string): boolean {
  return token.endsWith(".dev");
}
