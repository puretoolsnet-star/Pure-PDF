"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";

import { RewardedActionModal } from "@/components/ads/RewardedActionModal";
import type { ToolId } from "@/i18n/locales";

export type RewardedIntent = "process" | "download";

export type RewardedActionOptions = {
  watchMs?: number;
  /** After the timer ends, run the pending action without an extra tap. */
  autoContinueWhenReady?: boolean;
};

export function useRewardedAction(
  toolId: ToolId,
  options?: RewardedActionOptions,
): {
  requestAction: (
    action: () => void | Promise<void>,
    intent: RewardedIntent,
  ) => void;
  modal: ReactNode;
} {
  const [open, setOpen] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);
  const [intent, setIntent] = useState<RewardedIntent>("process");
  const unlockedRef = useRef(false);
  const pendingRef = useRef<(() => void | Promise<void>) | null>(null);

  const requestAction = useCallback(
    (action: () => void | Promise<void>, nextIntent: RewardedIntent) => {
      if (unlockedRef.current) {
        void action();
        return;
      }
      pendingRef.current = action;
      setIntent(nextIntent);
      setSessionKey((key) => key + 1);
      setOpen(true);
    },
    [],
  );

  const close = useCallback(() => {
    pendingRef.current = null;
    setOpen(false);
  }, []);

  const complete = useCallback(async () => {
    const action = pendingRef.current;
    pendingRef.current = null;
    unlockedRef.current = true;
    if (action) await action();
    setOpen(false);
  }, []);

  return {
    requestAction,
    modal: (
      <RewardedActionModal
        open={open}
        sessionKey={sessionKey}
        toolId={toolId}
        intent={intent}
        watchMs={options?.watchMs}
        autoContinueWhenReady={options?.autoContinueWhenReady}
        onClose={close}
        onUnlocked={complete}
      />
    ),
  };
}

/** @deprecated Use useRewardedAction */
export function useRewardedDownload(toolId: ToolId) {
  const { requestAction, modal } = useRewardedAction(toolId);
  return {
    requestDownload: (action: () => void | Promise<void>) =>
      requestAction(action, "download"),
    modal,
  };
}
