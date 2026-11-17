/** Below `md` — no Adsterra scripts/DOM (taps must not hit ad iframes). */
export function isMobileSponsorBlocked(): boolean {
  return typeof window !== "undefined" && window.innerWidth < 768;
}