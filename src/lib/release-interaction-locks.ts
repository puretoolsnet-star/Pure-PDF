import { forceReleaseBodyScrollLock } from "@/lib/body-scroll-lock";
import {
  scrubOrphanedBlockers,
  tameThirdPartyOverlays,
} from "@/lib/tame-third-party-overlays";

const PORTAL_ROOT_ID = "purepdf-portal-root";

/** Remove inline pointer locks left by third-party scripts (not our open modals). */
export function clearInlinePointerLocks() {
  if (typeof document === "undefined") return;

  const appRoot = document.getElementById("purepdf-app-root");
  appRoot?.style.removeProperty("pointer-events");

  document.querySelectorAll<HTMLElement>("body *").forEach((node) => {
    if (node.closest("[data-purepdf-overlay][data-open='true']")) return;
    if (node === appRoot || node.closest("#purepdf-app-root")) return;
    if (node.style.pointerEvents === "none") {
      node.style.removeProperty("pointer-events");
    }
  });

  document.body.style.pointerEvents = "";
  document.documentElement.style.pointerEvents = "";
}

/** Clears stuck scroll/pointer locks and orphaned full-screen layers that block clicks. */
export function releaseInteractionLocks() {
  if (typeof document === "undefined") return;

  forceReleaseBodyScrollLock();
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";
  document.body.style.touchAction = "";
  document.documentElement.style.touchAction = "";

  clearInlinePointerLocks();
  scrubOrphanedBlockers();
  tameThirdPartyOverlays();

  const portalRoot = document.getElementById(PORTAL_ROOT_ID);
  if (portalRoot) {
    portalRoot.removeAttribute("style");
  }
}

export function getPortalRoot(): HTMLElement {
  const existing = document.getElementById(PORTAL_ROOT_ID);
  if (existing) return existing;

  const created = document.createElement("div");
  created.id = PORTAL_ROOT_ID;
  document.body.appendChild(created);
  return created;
}