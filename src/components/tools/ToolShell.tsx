"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

import { PrivacyBanner } from "@/components/layout/PrivacyBanner";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AdBanner } from "@/components/ads/AdBanner";
import { useI18n } from "@/i18n/context";
import type { ToolId } from "@/i18n/locales";
import { useLocalizedPath } from "@/lib/i18n/use-localized-path";
import { cn } from "@/lib/cn";

type ToolShellProps = {
  toolId: ToolId;
  icon: LucideIcon;
  children: ReactNode;
  className?: string;
};

export function ToolShell({
  toolId,
  icon: Icon,
  children,
  className,
}: ToolShellProps) {
  const { t } = useI18n();
  const href = useLocalizedPath();
  const copy = t.tools[toolId];

  return (
    <div className="purepdf-page-shell relative flex min-h-full flex-1 flex-col bg-background font-sans text-gray-100">
      <SiteHeader maxWidth="4xl" />

      <div className="relative z-10 mx-auto w-full min-w-0 max-w-4xl px-4 sm:px-6 md:px-8">
        <Link
          href={href("/")}
          className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {t.common.backToTools}
        </Link>

        <PrivacyBanner variant="compact" className="mt-4" />

        <div className="mt-6 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
            <Icon className="h-6 w-6 text-primary" aria-hidden />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-white [overflow-wrap:anywhere] sm:text-2xl md:text-3xl">
              {copy.title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-400 [overflow-wrap:anywhere] sm:text-base">
              {copy.description}
            </p>
          </div>
        </div>
      </div>

      <main
        className={cn(
          "relative z-10 mx-auto w-full max-w-4xl flex-1 px-4 pb-[max(4rem,env(safe-area-inset-bottom))] pt-8 sm:px-8 sm:pb-16",
          className,
        )}
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_min(100%,17.5rem)] lg:items-start lg:gap-8">
          <div className="relative z-10 min-w-0 order-1 lg:order-none">
            {children}
          </div>
          <AdBanner
            layout="sidebar"
            slot="tool-sidebar"
            className="lg:sticky lg:top-6 lg:self-start"
          />
        </div>
      </main>
    </div>
  );
}
