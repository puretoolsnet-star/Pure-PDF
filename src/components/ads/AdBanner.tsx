"use client";

import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";

export type AdBannerLayout = "sidebar" | "inline";

type AdBannerProps = {
  className?: string;
  /** Sidebar: sticky column on lg; stacks under tool form on mobile. */
  layout?: AdBannerLayout;
  /** Value for `data-ad-slot` (analytics / ad network hooks). */
  slot?: string;
};

/**
 * Standard PurePDF ad placeholder — i18n labels, safe on touch devices
 * (no overlay; lives in document flow).
 */
export function AdBanner({
  className,
  layout = "sidebar",
  slot = "tool-sidebar",
}: AdBannerProps) {
  const { t } = useI18n();
  const isSidebar = layout === "sidebar";

  return (
    <aside
      aria-label={t.toolAd.sponsored}
      data-ad-slot={slot}
      className={cn(
        "pointer-events-auto relative z-0 min-w-0 w-full max-w-full shrink-0",
        isSidebar &&
          "order-2 border-t border-white/10 pt-6 lg:order-none lg:border-t-0 lg:pt-0",
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
          "glass-card flex w-full max-w-full flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-surface/30 px-4 py-5 text-center",
          isSidebar
            ? "min-h-[6.5rem] sm:min-h-[7.5rem] lg:min-h-[8rem]"
            : "min-h-[5.5rem]",
        )}
      >
        <p className="text-sm font-medium text-gray-300">{t.toolAd.slotTitle}</p>
        <p className="mt-2 max-w-xs text-xs leading-relaxed text-gray-500">
          {t.toolAd.slotHint}
        </p>
      </div>
    </aside>
  );
}
