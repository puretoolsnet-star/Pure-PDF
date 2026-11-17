"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { releaseInteractionLocks } from "@/lib/release-interaction-locks";

/** Clears stuck scroll locks and orphaned overlays after navigation. */
export function AppTouchGuard() {
  const pathname = usePathname();

  useEffect(() => {
    releaseInteractionLocks();
    const id = window.requestAnimationFrame(releaseInteractionLocks);
    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    releaseInteractionLocks();

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) releaseInteractionLocks();
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible") releaseInteractionLocks();
    };

    window.addEventListener("pageshow", onPageShow);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("pageshow", onPageShow);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return null;
}