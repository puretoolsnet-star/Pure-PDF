import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HomePage } from "@/components/home/HomePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { isLocale, LOCALES, type Locale } from "@/i18n/locales";
import { PageSeoSection } from "@/components/seo/PageSeoSection";
import { getPageFaqForSchema } from "@/i18n/seo/page-content";
import { buildHomeMetadata } from "@/lib/seo/metadata";
import {
  buildFaqPageStructuredData,
  buildHomeStructuredData,
} from "@/lib/seo/structured-data";

type HomePageProps = PageProps<"/[locale]">;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return buildHomeMetadata(raw);
}

export default async function LocalizedHomePage({ params }: HomePageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale = raw as Locale;
  const jsonLd = buildHomeStructuredData(locale);
  const faqLd = buildFaqPageStructuredData(getPageFaqForSchema("home", locale));
  const structured = faqLd ? [...jsonLd, faqLd] : jsonLd;

  return (
    <>
      <JsonLd data={structured} />
      <HomePage />
      <div className="relative z-10 mx-auto w-full min-w-0 max-w-6xl px-4 pb-[max(4rem,env(safe-area-inset-bottom))] sm:px-6 md:px-8 md:pb-16">
        <PageSeoSection pageId="home" locale={locale} />
      </div>
    </>
  );
}
