"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { releaseInteractionLocks } from "@/lib/release-interaction-locks";
import { scrubOrphanedBlockers } from "@/lib/tame-third-party-overlays";

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
    const mobileTidy = window.setTimeout(releaseInteractionLocks, 100);
    const onResize = () => {
      if (window.innerWidth < 768) releaseInteractionLocks();
    };
    window.addEventListener("resize", onResize);

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) releaseInteractionLocks();
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible") releaseInteractionLocks();
    };

    window.addEventListener("pageshow", onPageShow);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.clearTimeout(mobileTidy);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pageshow", onPageShow);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= 768) return;

    const runScrub = () => scrubOrphanedBlockers();
    runScrub();

    const observer = new MutationObserver(runScrub);
    observer.observe(document.body, { childList: true });

    const onTouchStart = () => {
      runScrub();
    };
    document.addEventListener("touchstart", onTouchStart, {
      capture: true,
      passive: true,
    });

    return () => {
      observer.disconnect();
      document.removeEventListener("touchstart", onTouchStart, {
        capture: true,
      });
    };
  }, []);

  return null;
}