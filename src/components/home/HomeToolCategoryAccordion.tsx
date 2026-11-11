"use client";

import { ChevronDown, Layers, RefreshCw, Shield } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useId, useState } from "react";

import { HomeToolCard } from "@/components/home/HomeToolCard";
import { useI18n } from "@/i18n/context";
import type { ToolId } from "@/i18n/locales";
import { cn } from "@/lib/cn";
import {
  TOOL_CATEGORIES,
  type ToolCategoryCatalog,
  type ToolCategoryId,
} from "@/lib/tools/catalog";

const CATEGORY_ICON: Record<ToolCategoryId, typeof Layers> = {
  pages: Layers,
  convert: RefreshCw,
  security: Shield,
};

type HomeToolCategoryAccordionProps = {
  onOpenTool: (toolId: ToolId) => void;
};

function CategoryPanel({
  category,
  onOpenTool,
}: {
  category: ToolCategoryCatalog;
  onOpenTool: (toolId: ToolId) => void;
}) {
  const { t } = useI18n();
  const panelId = useId();
  const [open, setOpen] = useState(category.defaultOpen);
  const copy = t.toolCategories[category.id];
  const Icon = CATEGORY_ICON[category.id];

  const toggle = useCallback(() => {
    setOpen((value) => !value);
  }, []);

  return (
    <section className="glass-card overflow-hidden rounded-2xl border border-white/10 transition-colors hover:border-cyan-500/15">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
        className="flex w-full touch-manipulation items-center gap-4 p-4 text-left transition-colors hover:bg-white/[0.03] sm:p-5"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/10 ring-1 ring-cyan-400/20">
          <Icon className="h-5 w-5 text-cyan-200" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-white sm:text-lg">{copy.title}</h3>
          <p className="mt-1 text-sm text-gray-400">{copy.summary}</p>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-gray-400 transition-transform duration-300",
            open && "rotate-180 text-cyan-300",
          )}
          aria-hidden
        />
        <span className="sr-only">
          {open ? t.catalogUi.collapseCategory : t.catalogUi.expandCategory}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -4 }}
              animate={{ y: 0 }}
              exit={{ y: -4 }}
              transition={{ duration: 0.22 }}
              className="grid grid-cols-1 gap-2 border-t border-white/10 bg-black/20 p-3 sm:grid-cols-2 sm:gap-3 sm:p-4 lg:grid-cols-2"
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
                  onActivate={(id) => {
                    if (tool.status === "live") onOpenTool(id);
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export function HomeToolCategoryAccordion({ onOpenTool }: HomeToolCategoryAccordionProps) {
  const { t } = useI18n();

  return (
    <div className="flex w-full min-w-0 flex-col gap-4">
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
        className="flex flex-col gap-3 sm:gap-4"
      >
        {TOOL_CATEGORIES.map((category) => (
          <CategoryPanel key={category.id} category={category} onOpenTool={onOpenTool} />
        ))}
      </div>
    </div>
  );
}
