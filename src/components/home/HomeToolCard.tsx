"use client";

import type { LucideIcon } from "lucide-react";
import Link from "next/link";

import { useI18n } from "@/i18n/context";
import type { ToolId } from "@/i18n/locales";
import { toolRoute } from "@/lib/i18n/routing";
import { cn } from "@/lib/cn";
import type { ToolCatalogStatus } from "@/lib/tools/catalog";
import { TOUCH_TARGET_CLASS } from "@/lib/touch-target";

type HomeToolCardProps = {
  toolId: ToolId;
  icon: LucideIcon;
  accent: string;
  status: ToolCatalogStatus;
  compact?: boolean;
};

/** Same tap model as subdomain hub cards — native `Link`, not programmatic `onClick`. */
export function HomeToolCard({
  toolId,
  icon: Icon,
  accent,
  status,
  compact,
}: HomeToolCardProps) {
  const { t, locale } = useI18n();
  const copy = t.tools[toolId];
  const isSoon = status === "coming-soon";
  const href = toolRoute(locale, toolId);

  const cardClassName = cn(
    TOUCH_TARGET_CLASS,
    "glass-card group relative z-10 flex h-full flex-col rounded-xl text-left transition-all duration-300",
    compact ? "p-3.5 sm:p-4" : "rounded-2xl p-5",
    isSoon
      ? "cursor-not-allowed opacity-75"
      : "cursor-pointer hover:border-emerald-400/25 hover:bg-surface-hover/80 active:scale-[0.98]",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/80",
  );

  const content = (
    <div className="flex items-start gap-3">
      <div
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ring-1 ring-white/10",
          compact ? "h-9 w-9" : "mb-3 h-11 w-11 rounded-xl",
          accent,
        )}
      >
        <Icon
          className={cn("text-cyan-50", compact ? "h-4 w-4" : "h-5 w-5")}
          strokeWidth={1.75}
          aria-hidden
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3
            className={cn(
              "font-semibold text-white",
              compact ? "text-sm" : "text-base",
            )}
          >
            {copy.title}
          </h3>
          {isSoon && (
            <span className="rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400 ring-1 ring-white/10">
              {t.catalogUi.comingSoonBadge}
            </span>
          )}
        </div>
        <p
          className={cn(
            "mt-1 text-gray-400 [overflow-wrap:anywhere]",
            compact ? "text-xs leading-snug" : "text-sm leading-relaxed",
          )}
        >
          {compact ? copy.hint : copy.description}
        </p>
        {!isSoon && (
          <span className="mt-2 inline-block text-xs font-medium text-cyan-300/90 transition-colors group-hover:text-emerald-300">
            {t.home.openTool}
          </span>
        )}
      </div>
    </div>
  );

  if (isSoon) {
    return (
      <div
        aria-disabled
        aria-label={`${copy.title}. ${copy.hint}`}
        className={cardClassName}
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      href={href}
      aria-label={`${copy.title}. ${copy.hint}`}
      className={cardClassName}
    >
      {content}
    </Link>
  );
}