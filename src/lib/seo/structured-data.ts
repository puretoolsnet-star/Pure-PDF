import { dictionaries, type Locale, type ToolId } from "@/i18n/locales";
import { getSeoCopy } from "@/i18n/seo/copy";
import { homeRoute, localizedPath, toolRoute } from "@/lib/i18n/routing";
import { DEFAULT_LOCALE, LOCALES } from "@/i18n/locales";
import { absoluteUrl, HREFLANG_MAP } from "@/lib/seo/site";

function ecosystemRelatedUrls(): string[] {
  const urls: string[] = [];
  const pureQr = process.env.NEXT_PUBLIC_PUREQR_URL?.trim().replace(/\/$/, "");
  const pureSign = process.env.NEXT_PUBLIC_PURESIGN_URL?.trim().replace(
    /\/$/,
    "",
  );
  if (pureQr) urls.push(`${pureQr}${localizedPath(DEFAULT_LOCALE, "/")}`);
  if (pureSign) urls.push(`${pureSign}${localizedPath(DEFAULT_LOCALE, "/")}`);
  return urls;
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
      inLanguage: locale,
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

export function buildSitemapLanguageAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[HREFLANG_MAP[locale]] = absoluteUrl(localizedPath(locale, path));
  }
  languages["x-default"] = absoluteUrl(
    localizedPath(DEFAULT_LOCALE, path),
  );
  return languages;
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
