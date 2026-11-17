import type { MetadataRoute } from "next";

import { LOCALES, TOOL_IDS } from "@/i18n/locales";
import { localizedPath } from "@/lib/i18n/routing";
import { buildHreflangAlternates } from "@/lib/seo/hreflang";
import { buildExternalEcosystemAlternates } from "@/lib/seo/structured-data";
import { absoluteUrl } from "@/lib/seo/site";

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
      url: absoluteUrl(localizedPath(locale, "/")),
      lastModified: sitemapLastModified(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: buildHreflangAlternates("/"),
      },
    });
  }

  for (const toolId of TOOL_IDS) {
    const path = `/tools/${toolId}`;
    for (const locale of LOCALES) {
      entries.push({
        url: absoluteUrl(localizedPath(locale, path)),
        lastModified: sitemapLastModified(),
        changeFrequency: "monthly",
        priority: 0.9,
        alternates: {
          languages: buildHreflangAlternates(path),
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
