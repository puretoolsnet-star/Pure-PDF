import { forceReleaseBodyScrollLock } from "@/lib/body-scroll-lock";
import { scrubOrphanedBlockers } from "@/lib/tame-third-party-overlays";

const PORTAL_ROOT_ID = "purepdf-portal-root";

/** Clears stuck scroll/pointer locks and orphaned full-screen layers that block clicks. */
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
}

export function getPortalRoot(): HTMLElement {
  const existing = document.getElementById(PORTAL_ROOT_ID);
  if (existing) return existing;

  const created = document.createElement("div");
  created.id = PORTAL_ROOT_ID;
  const appRoot = document.getElementById("purepdf-app-root");
  if (appRoot) {
    appRoot.appendChild(created);
  } else {
    document.body.appendChild(created);
  }
  return created;
}