"use client";

import { AdsterraRectangleBanner } from "@/components/ads/AdsterraRectangleBanner";
import { useI18n } from "@/i18n/context";
import { adsterraRectangleBanner } from "@/lib/ads/adsterra";
import { cn } from "@/lib/cn";
import { useIsMdViewport } from "@/lib/use-md-viewport";

export type AdBannerLayout = "sidebar" | "inline";

type AdBannerProps = {
  className?: string;
  /** Sidebar: sticky column on lg; stacks under tool form on mobile. */
  layout?: AdBannerLayout;
  /** Value for `data-ad-slot` (analytics / ad network hooks). */
  slot?: string;
};

/**
 * Sponsored rectangle — desktop/tablet only (md+). Not mounted below 768px
 * so Adsterra scripts cannot block mobile taps.
 */
export function AdBanner({
  className,
  layout = "sidebar",
  slot = "tool-sidebar",
}: AdBannerProps) {
  const { t } = useI18n();
  const isMd = useIsMdViewport();
  const isSidebar = layout === "sidebar";
  const hasLiveBanner = Boolean(
    adsterraRectangleBanner.key && adsterraRectangleBanner.src,
  );

  if (!isMd) {
    return null;
  }

  return (
    <aside
      aria-label={t.toolAd.sponsored}
      data-ad-slot={slot}
      className={cn(
        "purepdf-ad-desktop relative z-0 hidden min-w-0 w-full max-w-full shrink-0 md:block",
        isSidebar &&
          "lg:order-none lg:border-t-0 lg:pt-0",
        className,
      )}
    >
      <p
        className={cn(
          "mb-2 text-center text-[10px] font-semibold uppercase tracking-wider text-gray-500",
          isSidebar && "lg:text-left",
        )}
      >
        {t.toolAd.sponsored}
      </p>
      <div
        className={cn(
          "glass-card w-full max-w-full rounded-xl bg-surface/30",
          hasLiveBanner
            ? "flex flex-col items-center border border-white/10 px-2 py-3 sm:px-3"
            : cn(
                "flex flex-col items-center justify-center border border-dashed border-white/15 px-4 py-5 text-center",
                isSidebar
                  ? "min-h-[6.5rem] sm:min-h-[7.5rem] lg:min-h-[8rem]"
                  : "min-h-[5.5rem]",
              ),
        )}
      >
        {hasLiveBanner ? (
          <AdsterraRectangleBanner slot={slot} layout={layout} />
        ) : (
          <>
            <p className="text-sm font-medium text-gray-300">
              {t.toolAd.slotTitle}
            </p>
            <p className="mt-2 max-w-xs text-center text-xs leading-relaxed text-gray-500">
              {t.toolAd.slotHint}
            </p>
          </>
        )}
      </div>
    </aside>
  );
}