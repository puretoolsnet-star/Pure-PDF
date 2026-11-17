const AD_PASS_THROUGH_ATTR = "data-purepdf-ad-pass-through";

function coversSignificantViewport(node: HTMLElement): boolean {
  const rect = node.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  if (vw <= 0 || vh <= 0) return false;
  return rect.width * rect.height >= vw * vh * 0.35;
}

/** Removes stale overlays and marks full-page third-party layers as click-through. */
export function scrubOrphanedBlockers() {
  if (typeof document === "undefined") return;

  document.querySelectorAll<HTMLElement>("[data-purepdf-overlay]").forEach((node) => {
    if (node.dataset.open !== "true") {
      node.remove();
    }
  });

  for (const child of document.body.children) {
    if (!(child instanceof HTMLElement)) continue;
    if (child.id === "purepdf-app-root" || child.id === "purepdf-portal-root") continue;
    if (child.hasAttribute("data-purepdf-overlay")) continue;

    const position = getComputedStyle(child).position;
    if (position !== "fixed" && position !== "absolute") continue;
    if (!coversSignificantViewport(child)) continue;
    if (child.querySelector("#purepdf-app-root")) continue;

    child.setAttribute(AD_PASS_THROUGH_ATTR, "true");
  }

  document.querySelectorAll<HTMLElement>("body > iframe").forEach((frame) => {
    if (coversSignificantViewport(frame)) {
      frame.setAttribute(AD_PASS_THROUGH_ATTR, "true");
    }
  });
}

/** @deprecated Use scrubOrphanedBlockers — kept for any stale imports */
export function tameThirdPartyOverlays() {
  scrubOrphanedBlockers();
}