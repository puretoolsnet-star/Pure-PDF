"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(min-width: 768px)";

function subscribeMd(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getMdSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(QUERY).matches;
}

/** `true` from the `md` breakpoint (768px) up — desktop/tablet ad layout. */
export function useIsMdViewport() {
  return useSyncExternalStore(subscribeMd, getMdSnapshot, () => false);
}