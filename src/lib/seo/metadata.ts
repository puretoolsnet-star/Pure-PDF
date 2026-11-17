import type { Metadata } from "next";

import type { Locale, ToolId } from "@/i18n/locales";
import { LOCALES } from "@/i18n/locales";
import { getSeoCopy, type SeoPageId } from "@/i18n/seo/copy";
import { homeRoute, localizedPath } from "@/lib/i18n/routing";
import { buildOgImageUrl } from "@/lib/seo/og";
import { buildHreflangAlternates } from "@/lib/seo/hreflang";
import {
  absoluteUrl,
  DEFAULT_LOCALE,
  getSiteUrl,
  OPEN_GRAPH_LOCALE,
} from "@/lib/seo/site";

function pathForPage(page: SeoPageId): string {
  if (page === "home") return "/";
  return `/tools/${page}`;
}

export function buildPageMetadata(page: SeoPageId, locale: Locale): Metadata {
  const copy = getSeoCopy(page, locale);
  const path = pathForPage(page);
  const canonical = absoluteUrl(localizedPath(locale, path));
  const ogImage = absoluteUrl(buildOgImageUrl(locale, page));
  const ogImageAlt = copy.title;

  const publisherUrl = absoluteUrl(homeRoute(locale));

  return {
    title: copy.title,
    description: copy.description,
    keywords: copy.keywords,
    authors: [{ name: "PurePDF", url: publisherUrl }],
    creator: "PurePDF",
    publisher: "PurePDF",
    category: "technology",
    alternates: {
      canonical,
      languages: buildHreflangAlternates(pathForPage(page)),
    },
    openGraph: {
      type: "website",
      url: canonical,
      title: copy.title,
      description: copy.description,
      siteName: "PurePDF",
      locale: OPEN_GRAPH_LOCALE[locale],
      alternateLocale: LOCALES.filter((item) => item !== locale).map(
        (item) => OPEN_GRAPH_LOCALE[item],
      ),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function buildToolMetadata(toolId: ToolId, locale: Locale): Metadata {
  return buildPageMetadata(toolId, locale);
}

export function buildHomeMetadata(locale: Locale): Metadata {
  return buildPageMetadata("home", locale);
}

export function siteMetadataBase(): Metadata {
  const siteUrl = getSiteUrl();
  const googleVerification =
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

  const defaultOg = absoluteUrl(
    buildOgImageUrl(DEFAULT_LOCALE, "home"),
  );

  return {
    metadataBase: new URL(siteUrl),
    applicationName: "PurePDF",
    creator: "PurePDF",
    publisher: "PurePDF",
    title: {
      default: "PurePDF",
      template: "%s | PurePDF",
    },
    description:
      "Free private PDF tools in your browser — merge, convert, compress, and more. Six locales, local processing, no server uploads.",
    icons: {
      icon: "/favicon.ico",
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      siteName: "PurePDF",
      locale: OPEN_GRAPH_LOCALE[DEFAULT_LOCALE],
      alternateLocale: LOCALES.filter((locale) => locale !== DEFAULT_LOCALE).map(
        (locale) => OPEN_GRAPH_LOCALE[locale],
      ),
      images: [
        {
          url: defaultOg,
          width: 1200,
          height: 630,
          alt: "PurePDF",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
    },
    robots: {
      index: true,
      follow: true,
    },
    ...(googleVerification
      ? { verification: { google: googleVerification } }
      : {}),
  };
}
