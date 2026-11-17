import { DEFAULT_LOCALE, LOCALES } from "@/i18n/locales";
import { localizedPath } from "@/lib/i18n/routing";
import { absoluteUrl, HREFLANG_MAP } from "@/lib/seo/site";

/**
 * Absolute alternate URLs for `<link rel="alternate" hreflang="…">`
 * and sitemap `xhtml:link` entries. Uses `NEXT_PUBLIC_SITE_URL` via `absoluteUrl`.
 *
 * @param path Locale-agnostic path: `/` or `/tools/{id}`.
 */
export function buildHreflangAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};

  for (const locale of LOCALES) {
    languages[HREFLANG_MAP[locale]] = absoluteUrl(localizedPath(locale, path));
  }

  languages["x-default"] = absoluteUrl(localizedPath(DEFAULT_LOCALE, path));

  return languages;
}