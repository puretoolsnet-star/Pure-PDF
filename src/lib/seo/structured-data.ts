import {
  DEFAULT_LOCALE,
  LOCALES,
  TOOL_IDS,
  dictionaries,
  type Locale,
  type ToolId,
} from "@/i18n/locales";
import { getSeoCopy } from "@/i18n/seo/copy";
import type { SeoFaqItem } from "@/i18n/seo/page-content-types";
import { homeRoute, localizedPath, toolRoute } from "@/lib/i18n/routing";
import { buildHreflangAlternates } from "@/lib/seo/hreflang";
import { absoluteUrl, HREFLANG_MAP } from "@/lib/seo/site";

import { ecosystemLocalizedUrl, ecosystemSiblingOrigins } from "@/lib/ecosystem-urls";

function ecosystemRelatedUrls(): string[] {
  return [
    ...ecosystemSiblingOrigins().map((origin) =>
      `${origin}${localizedPath(DEFAULT_LOCALE, "/")}`,
    ),
    ecosystemLocalizedUrl("pdf", DEFAULT_LOCALE, "/"),
  ];
}

export function buildFaqPageStructuredData(faq: SeoFaqItem[]) {
  if (faq.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function buildHomeToolItemList(locale: Locale) {
  const t = dictionaries[locale];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.home.toolsHeading,
    numberOfItems: TOOL_IDS.length,
    itemListElement: TOOL_IDS.map((toolId, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: t.tools[toolId].title,
      url: absoluteUrl(toolRoute(locale, toolId)),
    })),
  };
}

export function buildHomeStructuredData(locale: Locale) {
  const copy = getSeoCopy("home", locale);
  const url = absoluteUrl(homeRoute(locale));
  const related = ecosystemRelatedUrls();

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "PurePDF",
      url,
      description: copy.description,
      inLanguage: HREFLANG_MAP[locale],
      ...(related.length > 0 ? { sameAs: related } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "PurePDF",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "All",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      url,
      description: copy.description,
    },
    buildHomeToolItemList(locale),
  ];
}

export function buildToolStructuredData(toolId: ToolId, locale: Locale) {
  const t = dictionaries[locale];
  const tool = t.tools[toolId];
  const seo = getSeoCopy(toolId, locale);
  const url = absoluteUrl(toolRoute(locale, toolId));

  return [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: tool.title,
      applicationCategory: "BusinessApplication",
      operatingSystem: "All",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      url,
      description: seo.description,
      isAccessibleForFree: true,
      provider: {
        "@type": "Organization",
        name: "PurePDF",
        url: absoluteUrl(homeRoute(locale)),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: t.brand.name,
          item: absoluteUrl(homeRoute(locale)),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: tool.title,
          item: url,
        },
      ],
    },
  ];
}

/** @deprecated Import `buildHreflangAlternates` from `@/lib/seo/hreflang`. */
export function buildSitemapLanguageAlternates(path: string) {
  return buildHreflangAlternates(path);
}

/**
 * Same path shape as PurePDF (`/{locale}` or `/tools/...`) on another origin,
 * for ecosystem sibling sites (PureQR, PureSign).
 */
export function buildExternalEcosystemAlternates(
  siteOrigin: string,
  path: string,
): Record<string, string> {
  const normalizedOrigin = siteOrigin.replace(/\/$/, "");
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[HREFLANG_MAP[locale]] = `${normalizedOrigin}${localizedPath(locale, path)}`;
  }
  languages["x-default"] = `${normalizedOrigin}${localizedPath(DEFAULT_LOCALE, path)}`;
  return languages;
}
