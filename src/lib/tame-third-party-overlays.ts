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

const AD_SCRIPT_HINT =
  /adsterra|highperformanceformat|bauval\.org|clickadu|propellerads/i;

function isInsideAppOrOpenOverlay(node: HTMLElement): boolean {
  if (node.closest("#purepdf-app-root")) return true;
  const overlay = node.closest<HTMLElement>("[data-purepdf-overlay]");
  return Boolean(overlay && overlay.dataset.open === "true");
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

  if (mobile) {
    document.querySelectorAll("script").forEach((script) => {
      const id = script.id ?? "";
      const src = script.getAttribute("src") ?? "";
      if (AD_SCRIPT_HINT.test(id) || AD_SCRIPT_HINT.test(src)) {
        script.remove();
      }
    });

    const appRoot = document.getElementById("purepdf-app-root");
    document.querySelectorAll<HTMLElement>("body *").forEach((node) => {
      if (appRoot?.contains(node)) return;
      if (isInsideAppOrOpenOverlay(node)) return;
      const position = getComputedStyle(node).position;
      if (position !== "fixed" && position !== "absolute") return;
      if (!coversSignificantViewport(node)) return;
      node.remove();
    });
  }

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