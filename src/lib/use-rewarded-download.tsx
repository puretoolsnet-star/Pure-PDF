"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";

import { RewardedDownloadModal } from "@/components/ads/RewardedDownloadModal";
import type { ToolId } from "@/i18n/locales";

export function useRewardedDownload(toolId: ToolId): {
  requestDownload: (action: () => void | Promise<void>) => void;
  modal: ReactNode;
} {
  const [open, setOpen] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);
  const pendingRef = useRef<(() => void | Promise<void>) | null>(null);

  const requestDownload = useCallback((action: () => void | Promise<void>) => {
    pendingRef.current = action;
    setSessionKey((key) => key + 1);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    pendingRef.current = null;
    setOpen(false);
  }, []);

  const complete = useCallback(async () => {
    const action = pendingRef.current;
    pendingRef.current = null;
    if (action) await action();
    setOpen(false);
  }, []);

  return {
    requestDownload,
    modal: (
      <RewardedDownloadModal
        open={open}
        sessionKey={sessionKey}
        toolId={toolId}
        onClose={close}
        onUnlocked={complete}
      />
    ),
  };
}
