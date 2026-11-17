"use client";

import { ChevronDown, Layers, RefreshCw, Shield } from "lucide-react";

import { HomeToolCard } from "@/components/home/HomeToolCard";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";
import { TOUCH_TARGET_CLASS } from "@/lib/touch-target";
import {
  TOOL_CATEGORIES,
  type ToolCategoryId,
} from "@/lib/tools/catalog";

const CATEGORY_ICON: Record<ToolCategoryId, typeof Layers> = {
  pages: Layers,
  convert: RefreshCw,
  security: Shield,
};

/** Native `<details>` / `<Link>` catalog — same interaction model as subdomain hubs. */
export function HomeToolCategoryAccordion() {
  const { t } = useI18n();

  return (
    <div
      id="purepdf-tool-catalog"
      className={cn(TOUCH_TARGET_CLASS, "flex w-full min-w-0 flex-col gap-4")}
    >
      <h2
        id="purepdf-tools-heading"
        className="text-lg font-semibold tracking-tight text-white sm:text-xl"
      >
        {t.home.toolsHeading}
      </h2>
      <div
        role="region"
        aria-labelledby="purepdf-tools-heading"
        aria-label={t.home.toolsAria}
        className={cn(TOUCH_TARGET_CLASS, "flex flex-col gap-3 sm:gap-4")}
      >
        {TOOL_CATEGORIES.map((category) => {
          const copy = t.toolCategories[category.id];
          const Icon = CATEGORY_ICON[category.id];

          return (
            <details
              key={category.id}
              open={category.defaultOpen}
              className={cn(
                TOUCH_TARGET_CLASS,
                "glass-card group overflow-visible rounded-2xl border border-white/10 open:border-cyan-500/15",
              )}
            >
              <summary
                className={cn(
                  TOUCH_TARGET_CLASS,
                  "flex w-full cursor-pointer list-none items-center gap-4 p-4 text-left transition-colors hover:bg-white/[0.03] sm:p-5 [&::-webkit-details-marker]:hidden",
                )}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/10 ring-1 ring-cyan-400/20">
                  <Icon className="h-5 w-5 text-cyan-200" aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold text-white sm:text-lg">
                    {copy.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">{copy.summary}</p>
                </div>
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-gray-400 transition-transform duration-300 group-open:rotate-180 group-open:text-cyan-300"
                  aria-hidden
                />
              </summary>
              <div
                className={cn(
                  TOUCH_TARGET_CLASS,
                  "grid grid-cols-1 gap-2 border-t border-white/10 bg-black/20 p-3 sm:grid-cols-2 sm:gap-3 sm:p-4 lg:grid-cols-2",
                )}
              >
                {category.tools.map((tool) => (
                  <HomeToolCard
                    key={tool.id}
                    toolId={tool.id}
                    icon={tool.icon}
                    accent={tool.accent}
                    status={tool.status}
                    rewardedHeavy={tool.rewardedHeavy}
                    compact
                  />
                ))}
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}