/** Rewarded Video SDK integration — disabled until a provider is configured. */
export const REWARDED_VIDEO_SDK_ENABLED = false;

export type RewardedVideoIntent = "process" | "download";

export type RewardedVideoContext = {
  toolId: string;
  intent: RewardedVideoIntent;
};

/**
 * Show a rewarded placement and resolve when the user earns the reward.
 * While disabled, always resolves `true` without UI or network calls.
 */
export async function requestRewardedVideo(
  _context: RewardedVideoContext,
): Promise<boolean> {
  if (!REWARDED_VIDEO_SDK_ENABLED) {
    return true;
  }
  return false;
}