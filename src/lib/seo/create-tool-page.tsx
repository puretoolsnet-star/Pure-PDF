import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";

import { JsonLd } from "@/components/seo/JsonLd";
import { isLocale, LOCALES, type Locale, type ToolId } from "@/i18n/locales";
import { getPageFaqForSchema } from "@/i18n/seo/page-content";
import { PageSeoSection } from "@/components/seo/PageSeoSection";
import { buildToolMetadata } from "@/lib/seo/metadata";
import {
  buildFaqPageStructuredData,
  buildToolStructuredData,
} from "@/lib/seo/structured-data";

type PageParams = { locale: string };

export function createToolPage(toolId: ToolId, ToolComponent: ComponentType) {
  async function generateStaticParams() {
    return LOCALES.map((locale) => ({ locale }));
  }

  async function generateMetadata({
    params,
  }: {
    params: Promise<PageParams>;
  }): Promise<Metadata> {
    const { locale: raw } = await params;
    if (!isLocale(raw)) return {};
    return buildToolMetadata(toolId, raw);
  }

  async function ToolPage({ params }: { params: Promise<PageParams> }) {
    const { locale: raw } = await params;
    if (!isLocale(raw)) notFound();

    const locale = raw as Locale;
    const jsonLd = buildToolStructuredData(toolId, locale);
    const faqLd = buildFaqPageStructuredData(getPageFaqForSchema(toolId, locale));
    const structured = faqLd ? [...jsonLd, faqLd] : jsonLd;

    return (
      <>
        <JsonLd data={structured} />
        <ToolComponent />
        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 pb-[max(4rem,env(safe-area-inset-bottom))] sm:px-8 sm:pb-16">
          <PageSeoSection pageId={toolId} locale={locale} />
        </div>
      </>
    );
  }

  return {
    generateStaticParams,
    generateMetadata,
    default: ToolPage,
  };
}
