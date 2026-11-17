import { isMobileSponsorBlocked } from "@/lib/ads/mobile-ad-gate";

const NATIVE_SRC = process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_SRC?.trim() ?? "";
const NATIVE_ID = process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_ID?.trim() ?? "";
/** Opt-in only — default off so Social Bar cannot block UI before env is set. */
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

/** Site-wide Adsterra Social Bar — loaded from root layout. */
export const adsterraSocialBar = {
  src: SOCIAL_SRC,
};

const BANNER_KEY =
  process.env.NEXT_PUBLIC_ADSTERRA_BANNER_KEY?.trim() ??
  "7e8b48e3a5a395d2c396b6e98f8e0196";
const BANNER_SRC =
  process.env.NEXT_PUBLIC_ADSTERRA_BANNER_SRC?.trim() ??
  "https://bauval.org/22/7e8b48e3a5a395d2c396b6e98f8e0196";

/** Tool sidebar / inline rectangle (300×250). */
export const adsterraRectangleBanner = {
  key: BANNER_KEY,
  src: BANNER_SRC,
  width: 300,
  height: 250,
};

/** Inject Adsterra 300×250 iframe bundle into `host` (client-only). */
export function mountAdsterraRectangleBanner(
  host: HTMLElement,
  instanceId: string,
): () => void {
  if (isMobileSponsorBlocked()) return () => {};
  const cfg = adsterraRectangleBanner;
  if (!cfg.src || !cfg.key) return () => {};

  const safeId = instanceId.replace(/[^\w-]/g, "-");
  host.replaceChildren();

  const optionsScript = document.createElement("script");
  optionsScript.type = "text/javascript";
  optionsScript.text = `atOptions = {
    'key' : '${cfg.key}',
    'format' : 'iframe',
    'height' : ${cfg.height},
    'width' : ${cfg.width},
    'params' : {}
  };`;

  const loader = document.createElement("script");
  loader.id = `adsterra-rect-${safeId}`;
  loader.async = true;
  loader.setAttribute("data-cfasync", "false");
  loader.src = cfg.src;

  host.appendChild(optionsScript);
  host.appendChild(loader);

  return () => {
    host.replaceChildren();
  };
}

function ensureScript(src: string, id: string) {
  if (!src || typeof document === "undefined") return;
  if (isMobileSponsorBlocked()) return;
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
  if (POPUNDER_SRC) ensureScript(POPUNDER_SRC, "adsterra-reward-trigger");
  const invoke = (window as Window & { invoke?: () => void }).invoke;
  if (typeof invoke === "function") invoke();
}
