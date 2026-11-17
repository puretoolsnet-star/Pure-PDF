"use client";

import type { ReactNode } from "react";

import { PrivacyBanner } from "@/components/layout/PrivacyBanner";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ToolWorkspaceLayout } from "@/components/layout/ToolWorkspaceLayout";
import { cn } from "@/lib/cn";

export type MicroToolLayoutProps = {
  title: string;
  description?: string;
  /** Small label above the title (e.g. `qr.kixt.net`). */
  eyebrow?: string;
  children: ReactNode;
  adSlot?: string;
  className?: string;
  mainClassName?: string;
};

/**
 * Shared shell for Kixt micro-tools (subdomains and future standalone tools):
 * header, title block, and the standard workspace + ad sidebar grid.
 */
export function MicroToolLayout({
  title,
  description,
  eyebrow,
  children,
  adSlot = "microtool-sidebar",
  className,
  mainClassName,
}: MicroToolLayoutProps) {
  return (
    <div
      className={cn(
        "purepdf-page-shell relative flex min-h-dvh flex-1 flex-col bg-background font-sans text-gray-100",
        className,
      )}
    >
      <SiteHeader maxWidth="4xl" />

      <div className="relative z-10 mx-auto w-full min-w-0 max-w-4xl px-4 sm:px-6 md:px-8">
        <PrivacyBanner variant="compact" className="mt-2" />

        <header className="mt-6">
          {eyebrow ? (
            <p className="text-sm font-medium text-cyan-300/90">{eyebrow}</p>
          ) : null}
          <h1 className="mt-1 text-xl font-semibold tracking-tight text-white [overflow-wrap:anywhere] sm:text-2xl md:text-3xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-400 [overflow-wrap:anywhere] sm:text-base">
              {description}
            </p>
          ) : null}
        </header>
      </div>

      <main
        className={cn(
          "relative z-10 mx-auto w-full max-w-4xl flex-1 px-4 pb-[max(4rem,env(safe-area-inset-bottom))] pt-8 sm:px-8 sm:pb-16",
          mainClassName,
        )}
      >
        <ToolWorkspaceLayout adSlot={adSlot}>{children}</ToolWorkspaceLayout>
      </main>
    </div>
  );
}