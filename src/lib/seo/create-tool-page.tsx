import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";

import { JsonLd } from "@/components/seo/JsonLd";
import { isLocale, LOCALES, type Locale, type ToolId } from "@/i18n/locales";
import { buildToolMetadata } from "@/lib/seo/metadata";
import { buildToolStructuredData } from "@/lib/seo/structured-data";

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

    const jsonLd = buildToolStructuredData(toolId, raw as Locale);

    return (
      <>
        <JsonLd data={jsonLd} />
        <ToolComponent />
      </>
    );
  }

  return {
    generateStaticParams,
    generateMetadata,
    default: ToolPage,
  };
}
