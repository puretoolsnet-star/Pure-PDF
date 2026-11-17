import { forceReleaseBodyScrollLock } from "@/lib/body-scroll-lock";
import {
  scrubOrphanedBlockers,
  tameThirdPartyOverlays,
} from "@/lib/tame-third-party-overlays";

const PORTAL_ROOT_ID = "purepdf-portal-root";
const PORTAL_ROOT_CLASS = "contents [&>*]:pointer-events-auto";

/** Clears inline locks and orphaned full-screen layers that block mobile taps. */
export function releaseInteractionLocks() {
  if (typeof document === "undefined") return;

  forceReleaseBodyScrollLock();
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";
  document.body.style.pointerEvents = "";
  document.documentElement.style.pointerEvents = "";
  document.body.style.touchAction = "";
  document.documentElement.style.touchAction = "";
  scrubOrphanedBlockers();
  tameThirdPartyOverlays();

  const portalRoot = document.getElementById(PORTAL_ROOT_ID);
  if (portalRoot) {
    portalRoot.className = PORTAL_ROOT_CLASS;
  }
}

export function getPortalRoot(): HTMLElement {
  const existing = document.getElementById(PORTAL_ROOT_ID);
  if (existing) return existing;

  const created = document.createElement("div");
  created.id = PORTAL_ROOT_ID;
  created.setAttribute("aria-hidden", "true");
  created.className = PORTAL_ROOT_CLASS;
  document.body.appendChild(created);
  return created;
}
