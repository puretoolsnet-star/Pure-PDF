const NATIVE_SRC = process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_SRC?.trim() ?? "";
const NATIVE_ID = process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_ID?.trim() ?? "";
const SOCIAL_SRC = process.env.NEXT_PUBLIC_ADSTERRA_SOCIAL_SRC?.trim() ?? "";
const POPUNDER_SRC = process.env.NEXT_PUBLIC_ADSTERRA_POPUNDER_SRC?.trim() ?? "";

/** Tool rewarded flow (process / download). */
export const ADSTERRA_WATCH_MS = 10_000;

/** Footer “support by watching” — shorter voluntary view. */
export const AD_SUPPORT_WATCH_MS = 8_000;

/** PDF page tools (split, remove pages, …) — 5s rewarded view. */
export const AD_SPLIT_TOOL_WATCH_MS = 5_000;
export const AD_REMOVE_TOOL_WATCH_MS = 5_000;
export const AD_ROTATE_TOOL_WATCH_MS = 5_000;
export const AD_ORGANIZE_TOOL_WATCH_MS = 5_000;
export const AD_PROTECT_TOOL_WATCH_MS = 5_000;
export const AD_UNLOCK_TOOL_WATCH_MS = 5_000;
export const AD_SIGN_TOOL_WATCH_MS = 5_000;

export const adsterraNative = {
  src: NATIVE_SRC,
  containerId: NATIVE_ID,
};

function ensureScript(src: string, id: string) {
  if (!src || typeof document === "undefined") return;
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.setAttribute("data-cfasync", "false");
  script.src = src.startsWith("//") ? `https:${src}` : src;
  document.body.appendChild(script);
}

export function loadAdsterraNative() {
  if (!NATIVE_SRC) return;
  ensureScript(NATIVE_SRC, "adsterra-native-invoke");
}

export function triggerAdsterraReward() {
  if (typeof window === "undefined") return;
  const popunder = POPUNDER_SRC || SOCIAL_SRC;
  if (popunder) ensureScript(popunder, "adsterra-reward-trigger");
  const invoke = (window as Window & { invoke?: () => void }).invoke;
  if (typeof invoke === "function") invoke();
}
