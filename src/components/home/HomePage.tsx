"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { HomeToolCategoryAccordion } from "@/components/home/HomeToolCategoryAccordion";
import { AdBanner } from "@/components/ads/AdBanner";
import { PrivacyBanner } from "@/components/layout/PrivacyBanner";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SupportBlock } from "@/components/layout/SupportBlock";
import { useI18n } from "@/i18n/context";
import type { ToolId } from "@/i18n/locales";
import { toolRoute } from "@/lib/i18n/routing";

export function HomePage() {
  const router = useRouter();
  const { t, locale } = useI18n();

  const openTool = useCallback(
    (toolId: ToolId) => {
      router.push(toolRoute(locale, toolId));
    },
    [locale, router],
  );

  return (
    <div className="purepdf-page-shell relative flex min-h-dvh w-full flex-1 flex-col overflow-x-hidden bg-background font-sans text-gray-100">
      <SiteHeader />

      <main className="relative z-10 mx-auto flex w-full min-w-0 max-w-6xl flex-1 flex-col px-4 pb-[max(4rem,env(safe-area-inset-bottom))] pt-2 sm:px-6 md:px-8 md:pb-16 [&_button]:touch-manipulation [&_a]:touch-manipulation">
        <PrivacyBanner className="mb-8" />

        <section className="mb-8 max-w-2xl min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl [overflow-wrap:anywhere]">
            {t.home.heroTitle}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-gray-400 sm:text-base md:text-lg [overflow-wrap:anywhere]">
            {t.home.heroSubtitle}
          </p>
        </section>

        <div className="grid w-full min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_min(100%,17rem)] lg:items-start">
          <div className="min-w-0">
            <HomeToolCategoryAccordion onOpenTool={openTool} />
            <SupportBlock />
          </div>
          <AdBanner layout="sidebar" slot="home-sidebar" className="lg:sticky lg:top-6" />
        </div>
      </main>
    </div>
  );
}
