"use client";

import Link from "next/link";

import { useI18n } from "@/i18n/context";
import { toolRoute } from "@/lib/i18n/routing";
import { TOOL_CATEGORIES } from "@/lib/tools/catalog";
import { cn } from "@/lib/cn";

export function PdfSubdomainHub() {
  const { t, locale } = useI18n();

  return (
    <div className="flex min-w-0 flex-col gap-6">
      {TOOL_CATEGORIES.map((category) => {
        const categoryCopy = t.toolCategories[category.id];
        return (
          <section key={category.id} className="min-w-0">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
              {categoryCopy.title}
            </h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {category.tools.map((entry) => {
                const tool = t.tools[entry.id];
                const Icon = entry.icon;
                const href = toolRoute(locale, entry.id);
                const soon = entry.status === "coming-soon";

                return (
                  <li key={entry.id}>
                    <Link
                      href={href}
                      className={cn(
                        "glass-card flex min-h-[4.5rem] items-start gap-3 rounded-xl border border-white/10 p-4 transition hover:border-cyan-400/30 hover:bg-white/5",
                        soon && "opacity-75",
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ring-1 ring-white/10",
                          entry.accent,
                        )}
                      >
                        <Icon className="h-5 w-5 text-white" aria-hidden />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white">
                          {tool.title}
                        </p>
                        <p className="mt-1 line-clamp-2 text-xs text-gray-400">
                          {tool.description}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}