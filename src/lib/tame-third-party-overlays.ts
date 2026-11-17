function isMobileViewport(): boolean {
  return typeof window !== "undefined" && window.innerWidth < 768;
}

function coversSignificantViewport(node: HTMLElement): boolean {
  const rect = node.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  if (vw <= 0 || vh <= 0) return false;
  return rect.width * rect.height >= vw * vh * 0.35;
}

function isExemptBodyNode(node: HTMLElement): boolean {
  if (node.id === "purepdf-app-root" || node.id === "purepdf-portal-root") return true;
  if (node.hasAttribute("data-purepdf-overlay") && node.dataset.open === "true") return true;
  if (node.querySelector("#purepdf-app-root")) return true;
  return false;
}

/** Removes stale overlays and full-screen third-party blockers (mobile-first). */
export function scrubOrphanedBlockers() {
  if (typeof document === "undefined") return;

  document.querySelectorAll<HTMLElement>("[data-purepdf-overlay]").forEach((node) => {
    if (node.dataset.open !== "true") {
      node.remove();
    }
  });

  const mobile = isMobileViewport();

  for (const child of document.body.children) {
    if (!(child instanceof HTMLElement)) continue;
    if (isExemptBodyNode(child)) continue;

    const position = getComputedStyle(child).position;
    if (position !== "fixed" && position !== "absolute") continue;
    if (!coversSignificantViewport(child)) continue;

    if (mobile) {
      child.remove();
      continue;
    }

    child.setAttribute("data-purepdf-ad-pass-through", "true");
  }

  document.querySelectorAll<HTMLElement>("body > iframe").forEach((frame) => {
    if (!coversSignificantViewport(frame)) return;
    if (mobile) {
      frame.remove();
    } else {
      frame.setAttribute("data-purepdf-ad-pass-through", "true");
    }
  });
}

export function tameThirdPartyOverlays() {
  scrubOrphanedBlockers();
}