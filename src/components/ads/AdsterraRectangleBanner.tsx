"use client";

import { useLayoutEffect, useRef, useState } from "react";

import type { AdBannerLayout } from "@/components/ads/AdBanner";
import {
  adsterraRectangleBanner,
  mountAdsterraRectangleBanner,
} from "@/lib/ads/adsterra";
import { cn } from "@/lib/cn";

type AdsterraRectangleBannerProps = {
  slot: string;
  layout: AdBannerLayout;
};

export function AdsterraRectangleBanner({
  slot,
  layout,
}: AdsterraRectangleBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const { width: designWidth, height: designHeight } = adsterraRectangleBanner;

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScale = () => {
      const w = container.clientWidth;
      setScale(w > 0 ? Math.min(1, w / designWidth) : 1);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(container);
    return () => observer.disconnect();
  }, [designWidth]);

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    return mountAdsterraRectangleBanner(host, slot);
  }, [slot]);

  const frameHeight = designHeight * scale;
  const isSidebar = layout === "sidebar";

  return (
    <div
      ref={containerRef}
      className={cn("mx-auto w-full max-w-full", isSidebar && "lg:max-w-[300px]")}
      style={{ maxWidth: designWidth }}
    >
      <div
        className="relative w-full overflow-hidden rounded-lg"
        style={{ height: frameHeight }}
      >
        <div
          ref={hostRef}
          className="purepdf-ad-slot pointer-events-auto absolute top-0 left-1/2"
          style={{
            width: designWidth,
            height: designHeight,
            transform: `translateX(-50%) scale(${scale})`,
            transformOrigin: "top center",
          }}
        />
      </div>
    </div>
  );
}