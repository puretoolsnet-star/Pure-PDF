"use client";

import { useCallback, type ReactNode } from "react";

import { RewardedVideoHost } from "@/components/ads/RewardedVideoHost";
import {
  REWARDED_VIDEO_SDK_ENABLED,
  requestRewardedVideo,
} from "@/lib/ads/rewarded-video-sdk";
import type { ToolId } from "@/i18n/locales";

export type RewardedIntent = "process" | "download";

export type RewardedActionOptions = {
  watchMs?: number;
  /** Reserved for SDK — no-op while rewarded video is disabled. */
  autoContinueWhenReady?: boolean;
};

export function useRewardedAction(
  toolId: ToolId,
  _options?: RewardedActionOptions,
): {
  requestAction: (
    action: () => void | Promise<void>,
    intent: RewardedIntent,
  ) => void;
  modal: ReactNode;
} {
  const requestAction = useCallback(
    (action: () => void | Promise<void>, intent: RewardedIntent) => {
      void (async () => {
        const allowed = await requestRewardedVideo({ toolId, intent });
        if (allowed) await action();
      })();
    },
    [toolId],
  );

  return {
    requestAction,
    modal: REWARDED_VIDEO_SDK_ENABLED ? <RewardedVideoHost /> : null,
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