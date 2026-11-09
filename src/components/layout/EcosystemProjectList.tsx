"use client";

import { PenLine, QrCode, Sparkles, Table2 } from "lucide-react";
import Link from "next/link";

import { useI18n } from "@/i18n/context";
import { useLocalizedPath } from "@/lib/i18n/use-localized-path";
import {
  ECOSYSTEM_PROJECTS,
  type EcosystemProjectId,
} from "@/lib/ecosystem";
import { ecosystemExternalUrl } from "@/lib/ecosystem-urls";
import { cn } from "@/lib/cn";

const PROJECT_ICONS: Record<EcosystemProjectId, typeof Sparkles> = {
  purepdf: Sparkles,
  pureQr: QrCode,
  pureSign: PenLine,
  pureTable: Table2,
};

type EcosystemProjectListProps = {
  onNavigate?: () => void;
  className?: string;
  variant?: "rows" | "cards";
  /** Desktop ecosystem dropdown: always 2 columns. Centered modal: 1 col then 2 on sm+. */
  cardsGrid?: "responsive" | "two-columns";
};

export function EcosystemProjectList({
  onNavigate,
  className,
  variant = "rows",
  cardsGrid = "responsive",
}: EcosystemProjectListProps) {
  const { t, locale } = useI18n();
  const toHref = useLocalizedPath();
  const asCards = variant === "cards";

  return (
    <ul
      className={cn(
        "projects-grid",
        asCards
          ? cn(
              "grid gap-2 sm:gap-3",
              cardsGrid === "two-columns"
                ? "grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2",
            )
          : "grid grid-cols-1 gap-0",
        className,
      )}
    >
      {ECOSYSTEM_PROJECTS.map((project) => {
        const copy = t.ecosystem.items[project.id];
        const Icon = PROJECT_ICONS[project.id];
        const isActive = project.status === "active";

        const rowClass = cn(
          "w-full max-w-full min-w-0 text-left transition-colors",
          asCards
            ? cn(
                "project-card glass-card flex h-full min-h-0 flex-col gap-2 overflow-hidden rounded-xl border border-white/10 p-3 hover:border-white/15 sm:gap-3 sm:p-4",
                isActive
                  ? "bg-primary/10 ring-1 ring-primary/25"
                  : "bg-surface/40 hover:bg-surface-hover/50",
              )
            : cn(
                "flex items-start gap-3 px-3 py-3 sm:px-4",
                isActive
                  ? "bg-primary/10 hover:bg-primary/15"
                  : "opacity-90 hover:bg-white/5",
              ),
        );

        const badge = isActive ? (
          <span className="w-fit shrink-0 rounded-full border border-primary/40 bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
            {t.ecosystem.activeHere}
          </span>
        ) : (
          <span className="w-fit shrink-0 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-200/90">
            {t.ecosystem.comingSoon}
          </span>
        );

        const inner = asCards ? (
          <>
            <div className="flex min-w-0 items-start justify-between gap-2 overflow-hidden">
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1 ring-white/10 sm:h-10 sm:w-10",
                  isActive
                    ? "bg-primary/20 text-primary"
                    : "bg-white/5 text-gray-300",
                )}
              >
                <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              </div>
              <span className="min-w-0 shrink">{badge}</span>
            </div>
            <div className="min-w-0 flex-1 overflow-hidden">
              <h3 className="whitespace-normal break-words text-sm font-semibold leading-snug text-white">
                {copy.name}
              </h3>
              <p className="mt-2 whitespace-normal break-words text-xs leading-relaxed text-gray-400">
                {copy.tagline}
              </p>
            </div>
          </>
        ) : (
          <>
            <div
              className={cn(
                "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1 ring-white/10",
                isActive
                  ? "bg-primary/20 text-primary"
                  : "bg-white/5 text-gray-300",
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            </div>
            <div className="min-w-0 flex-1 overflow-hidden">
              <div className="flex min-w-0 flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2 sm:gap-y-1">
                <span className="min-w-0 text-sm font-medium leading-snug text-white [overflow-wrap:anywhere]">
                  {copy.name}
                </span>
                {badge}
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-gray-400 [overflow-wrap:anywhere]">
                {copy.tagline}
              </p>
            </div>
          </>
        );

        const externalHref =
          isActive && project.external
            ? ecosystemExternalUrl(project.external, locale)
            : null;
        const internalHref =
          isActive && project.href ? toHref(project.href) : null;

        return (
          <li key={project.id} role="none" className="min-w-0 max-w-full">
            {externalHref ? (
              <a
                role="menuitem"
                href={externalHref}
                target="_blank"
                rel="noopener noreferrer"
                className={rowClass}
                onClick={onNavigate}
              >
                {inner}
              </a>
            ) : internalHref ? (
              <Link
                role="menuitem"
                href={internalHref}
                aria-current={project.id === "purepdf" ? "page" : undefined}
                className={rowClass}
                onClick={onNavigate}
              >
                {inner}
              </Link>
            ) : (
              <div
                role="menuitem"
                aria-disabled="true"
                className={cn(rowClass, "cursor-default")}
              >
                {inner}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
