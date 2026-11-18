import type { MetadataRoute } from "next";

/**
 * Sitemap for pdf.kixt.net (via `NEXT_PUBLIC_SITE_URL`): home + every tool route
 * in all six locales, each entry with full hreflang alternates.
 */
import { DEFAULT_LOCALE, LOCALES, TOOL_IDS } from "@/i18n/locales";
import { localizedPath } from "@/lib/i18n/routing";
import { buildExternalEcosystemAlternates } from "@/lib/seo/structured-data";
import { getSiteUrl, HREFLANG_MAP } from "@/lib/seo/site";

const baseUrl = getSiteUrl();

function sitemapAbsoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${normalized}`;
}

function buildSitemapHreflangAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};

  for (const locale of LOCALES) {
    languages[HREFLANG_MAP[locale]] = sitemapAbsoluteUrl(
      localizedPath(locale, path),
    );
  }

  languages["x-default"] = sitemapAbsoluteUrl(
    localizedPath(DEFAULT_LOCALE, path),
  );

  return languages;
}

function sitemapLastModified(): Date {
  return new Date();
}

function stripTrailingSlash(url: string): string {
  return url.replace(/\/$/, "");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    entries.push({
      url: sitemapAbsoluteUrl(localizedPath(locale, "/")),
      lastModified: sitemapLastModified(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: buildSitemapHreflangAlternates("/"),
      },
    });
  }

  for (const toolId of TOOL_IDS) {
    const path = `/tools/${toolId}`;
    for (const locale of LOCALES) {
      entries.push({
        url: sitemapAbsoluteUrl(localizedPath(locale, path)),
        lastModified: sitemapLastModified(),
        changeFrequency: "monthly",
        priority: 0.9,
        alternates: {
          languages: buildSitemapHreflangAlternates(path),
        },
      });
    }
  }

  const pureQrBase = process.env.NEXT_PUBLIC_PUREQR_URL?.trim();
  const pureSignBase = process.env.NEXT_PUBLIC_PURESIGN_URL?.trim();

  if (pureQrBase) {
    const base = stripTrailingSlash(pureQrBase);
    for (const locale of LOCALES) {
      const path = localizedPath(locale, "/");
      entries.push({
        url: `${base}${path}`,
        lastModified: sitemapLastModified(),
        changeFrequency: "weekly",
        priority: 0.6,
        alternates: {
          languages: buildExternalEcosystemAlternates(base, "/"),
        },
      });
    }
  }

  if (pureSignBase) {
    const base = stripTrailingSlash(pureSignBase);
    for (const locale of LOCALES) {
      const path = localizedPath(locale, "/");
      entries.push({
        url: `${base}${path}`,
        lastModified: sitemapLastModified(),
        changeFrequency: "weekly",
        priority: 0.6,
        alternates: {
          languages: buildExternalEcosystemAlternates(base, "/"),
        },
      });
    }
  }

  return entries;
}
