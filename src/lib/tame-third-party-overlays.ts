const EXEMPT_BODY_IDS = new Set(["purepdf-portal-root", "purepdf-app-root"]);
const AD_PASS_THROUGH_ATTR = "data-purepdf-ad-pass-through";

function isOpenPurepdfOverlay(node: HTMLElement): boolean {
  return (
    node.hasAttribute("data-purepdf-overlay") && node.dataset.open === "true"
  );
}

function containsAppRoot(node: HTMLElement): boolean {
  return Boolean(node.querySelector("#purepdf-app-root"));
}

function shouldExemptOverlay(node: HTMLElement): boolean {
  if (EXEMPT_BODY_IDS.has(node.id)) return true;
  if (node.tagName === "SCRIPT" || node.tagName === "STYLE") return true;
  if (isOpenPurepdfOverlay(node)) return true;
  if (node.closest("#purepdf-app-root, #purepdf-portal-root")) return true;
  if (node.closest("[data-purepdf-overlay][data-open='true']")) return true;
  if (containsAppRoot(node)) return true;
  return false;
}

export function coversSignificantViewport(node: HTMLElement): boolean {
  const rect = node.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  if (vw <= 0 || vh <= 0) return false;

  const area = rect.width * rect.height;
  const viewportArea = vw * vh;
  if (area >= viewportArea * 0.35) return true;

  return (
    rect.width >= vw * 0.85 &&
    rect.height >= vh * 0.35 &&
    rect.left <= vw * 0.15 &&
    rect.top <= vh * 0.15
  );
}

function tagPassThrough(node: HTMLElement) {
  if (shouldExemptOverlay(node)) return;
  node.setAttribute(AD_PASS_THROUGH_ATTR, "true");
  node.style.removeProperty("pointer-events");
}

/** Removes stale full-screen overlays and tags ad shells for CSS pass-through. */
export function scrubOrphanedBlockers() {
  if (typeof document === "undefined") return;

  document.querySelectorAll<HTMLElement>("[data-purepdf-overlay]").forEach((node) => {
    if (node.dataset.open !== "true") {
      node.remove();
    }
  });

  document.querySelectorAll<HTMLElement>("body > iframe").forEach((frame) => {
    if (coversSignificantViewport(frame)) {
      tagPassThrough(frame);
    }
  });

  for (const child of document.body.children) {
    if (!(child instanceof HTMLElement)) continue;
    if (shouldExemptOverlay(child)) continue;

    const position = getComputedStyle(child).position;
    if (position !== "fixed" && position !== "absolute") continue;
    if (!coversSignificantViewport(child)) continue;

    const opacity = Number.parseFloat(getComputedStyle(child).opacity);
    if (opacity <= 0.02 && child.childElementCount === 0) {
      child.remove();
      continue;
    }

    tagPassThrough(child);
  }
}

export function tameThirdPartyOverlays() {
  if (typeof document === "undefined" || typeof window === "undefined") return;
  scrubOrphanedBlockers();
}