const EXEMPT_BODY_IDS = new Set(["purepdf-portal-root", "purepdf-app-root"]);
const AD_PASS_THROUGH_ATTR = "data-purepdf-ad-pass-through";
const AD_HIT_ATTR = "data-purepdf-ad-hit";

const AD_INTERACTIVE_SELECTOR =
  "a, button, img, video, input, [role='button'], [onclick], svg, iframe";

function isOpenPurepdfOverlay(node: HTMLElement): boolean {
  return (
    node.hasAttribute("data-purepdf-overlay") && node.dataset.open === "true"
  );
}

function shouldExemptOverlay(node: HTMLElement): boolean {
  if (EXEMPT_BODY_IDS.has(node.id)) return true;
  if (node.tagName === "SCRIPT" || node.tagName === "STYLE") return true;
  if (isOpenPurepdfOverlay(node)) return true;
  if (node.closest("#purepdf-app-root, #purepdf-portal-root")) return true;
  if (node.closest("[data-purepdf-overlay][data-open='true']")) return true;
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

function isCompactAdControl(node: HTMLElement): boolean {
  if (coversSignificantViewport(node)) return false;
  const rect = node.getBoundingClientRect();
  return rect.width >= 4 && rect.height >= 4;
}

function markCompactClickTargets(shell: HTMLElement) {
  shell.querySelectorAll<HTMLElement>(AD_INTERACTIVE_SELECTOR).forEach((el) => {
    el.removeAttribute(AD_HIT_ATTR);
    el.style.removeProperty("pointer-events");

    if (!isCompactAdControl(el)) {
      el.style.pointerEvents = "none";
      return;
    }

    el.setAttribute(AD_HIT_ATTR, "true");
    el.style.pointerEvents = "auto";
  });
}

function neuterPassThrough(node: HTMLElement) {
  if (node.hasAttribute(AD_PASS_THROUGH_ATTR)) {
    markCompactClickTargets(node);
    return;
  }

  node.style.pointerEvents = "none";
  node.setAttribute(AD_PASS_THROUGH_ATTR, "true");
  markCompactClickTargets(node);
}

/** Removes stray full-screen blockers that are not marked as open app overlays. */
export function scrubOrphanedBlockers() {
  if (typeof document === "undefined") return;

  document.querySelectorAll<HTMLElement>("[data-purepdf-overlay]").forEach((node) => {
    if (node.dataset.open !== "true") {
      node.remove();
    }
  });

  for (const child of document.body.children) {
    if (!(child instanceof HTMLElement)) continue;
    if (shouldExemptOverlay(child)) continue;
    if (child.hasAttribute(AD_PASS_THROUGH_ATTR)) continue;

    const position = getComputedStyle(child).position;
    if (position !== "fixed" && position !== "absolute") continue;
    if (!coversSignificantViewport(child)) continue;

    const opacity = Number.parseFloat(getComputedStyle(child).opacity);
    if (opacity <= 0.02 && child.childElementCount === 0) {
      child.remove();
      continue;
    }

    neuterPassThrough(child);
  }
}

/**
 * Ad widgets inject full-viewport `fixed` layers (and giant iframes) that steal
 * every click. Shells stay inert; only compact ad controls remain clickable.
 */
export function tameThirdPartyOverlays() {
  if (typeof document === "undefined" || typeof window === "undefined") return;

  scrubOrphanedBlockers();

  document.body.querySelectorAll<HTMLElement>("div, iframe").forEach((node) => {
    if (shouldExemptOverlay(node)) return;
    if (isOpenPurepdfOverlay(node)) return;

    const position = getComputedStyle(node).position;
    if (position !== "fixed" && position !== "absolute") return;
    if (!coversSignificantViewport(node)) return;

    neuterPassThrough(node);
  });

  document
    .querySelectorAll<HTMLElement>(`[${AD_PASS_THROUGH_ATTR}]`)
    .forEach((node) => markCompactClickTargets(node));
}