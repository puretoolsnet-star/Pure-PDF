"use client";

import { HomeToolCategoryAccordion } from "@/components/home/HomeToolCategoryAccordion";
import { PrivacyBanner } from "@/components/layout/PrivacyBanner";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SupportBlock } from "@/components/layout/SupportBlock";
import { useI18n } from "@/i18n/context";

export function HomePage() {
  const { t } = useI18n();

  return (
    <div className="purepdf-page-shell purepdf-mobile-interactive relative flex min-h-dvh w-full flex-1 flex-col overflow-x-hidden bg-background font-sans text-gray-100">
      <SiteHeader />

      <main className="purepdf-main-workspace relative z-10 mx-auto flex w-full min-w-0 max-w-6xl flex-1 flex-col px-4 pb-[max(4rem,env(safe-area-inset-bottom))] pt-2 sm:px-6 md:px-8 md:pb-16">
        <PrivacyBanner className="mb-8" />

        <section className="mb-8 max-w-2xl min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl [overflow-wrap:anywhere]">
            {t.home.heroTitle}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-gray-400 sm:text-base md:text-lg [overflow-wrap:anywhere]">
            {t.home.heroSubtitle}
          </p>
        </section>

        <div className="relative z-20 w-full min-w-0">
          <HomeToolCategoryAccordion />
          <SupportBlock />
        </div>
      </main>
    </div>
  );
}