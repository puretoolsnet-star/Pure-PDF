"use client";

import { REWARDED_VIDEO_SDK_ENABLED } from "@/lib/ads/rewarded-video-sdk";

/** Reserved DOM mount for a future Rewarded Video SDK — renders nothing while disabled. */
export function RewardedVideoHost() {
  if (!REWARDED_VIDEO_SDK_ENABLED) {
    return null;
  }
  return <div id="purepdf-rewarded-video-host" hidden aria-hidden />;
}