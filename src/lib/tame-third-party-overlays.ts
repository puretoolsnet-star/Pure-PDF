const EXEMPT_BODY_IDS = new Set(["purepdf-portal-root", "purepdf-app-root"]);
const AD_PASS_THROUGH_ATTR = "data-purepdf-ad-pass-through";

/** Interactive descendants that should still receive taps on ad widgets. */
const AD_INTERACTIVE_SELECTOR =
  "iframe, a, button, img, video, input, [role='button'], [onclick]";

function coversMostOfViewport(node: HTMLElement): boolean {
  const rect = node.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  if (vw <= 0 || vh <= 0) return false;

  return (
    rect.width >= vw * 0.85 &&
    rect.height >= vh * 0.85 &&
    rect.left <= vw * 0.1 &&
    rect.top <= vh * 0.1
  );
}

function shouldExemptOverlay(node: HTMLElement): boolean {
  if (EXEMPT_BODY_IDS.has(node.id)) return true;
  if (node.tagName === "SCRIPT" || node.tagName === "STYLE") return true;
  if (node.hasAttribute("data-purepdf-overlay")) return true;
  if (node.closest("#purepdf-app-root, #purepdf-portal-root")) return true;
  return false;
}

/**
 * Ad networks (e.g. Adsterra Social Bar) often inject full-viewport fixed layers
 * that steal touch events. Make those layers transparent to taps while keeping
 * visible ad controls clickable.
 */
export function tameThirdPartyOverlays(root: ParentNode = document.body) {
  if (typeof document === "undefined" || typeof window === "undefined") return;

  const nodes: HTMLElement[] = [];
  if (root === document.body) {
    for (const child of document.body.children) {
      if (child instanceof HTMLElement) nodes.push(child);
    }
  } else {
    root.querySelectorAll<HTMLElement>("div, iframe").forEach((el) => nodes.push(el));
  }

  for (const node of nodes) {
    if (shouldExemptOverlay(node)) continue;
    if (node.hasAttribute(AD_PASS_THROUGH_ATTR)) continue;

    const position = getComputedStyle(node).position;
    if (position !== "fixed" && position !== "absolute") continue;
    if (!coversMostOfViewport(node)) continue;

    node.style.pointerEvents = "none";
    node.setAttribute(AD_PASS_THROUGH_ATTR, "true");
    node.querySelectorAll<HTMLElement>(AD_INTERACTIVE_SELECTOR).forEach((el) => {
      el.style.pointerEvents = "auto";
    });
  }
}