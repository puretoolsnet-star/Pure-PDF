import type { MetadataRoute } from "next";

import { LOCALES, TOOL_IDS } from "@/i18n/locales";
import { localizedPath } from "@/lib/i18n/routing";
import {
  buildExternalEcosystemAlternates,
  buildSitemapLanguageAlternates,
} from "@/lib/seo/structured-data";
import { absoluteUrl } from "@/lib/seo/site";

const LAST_MODIFIED = new Date("2026-11-05");

function stripTrailingSlash(url: string): string {
  return url.replace(/\/$/, "");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    entries.push({
      url: absoluteUrl(localizedPath(locale, "/")),
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: buildSitemapLanguageAlternates("/"),
      },
    });
  }

  for (const toolId of TOOL_IDS) {
    const path = `/tools/${toolId}`;
    for (const locale of LOCALES) {
      entries.push({
        url: absoluteUrl(localizedPath(locale, path)),
        lastModified: LAST_MODIFIED,
        changeFrequency: "monthly",
        priority: 0.9,
        alternates: {
          languages: buildSitemapLanguageAlternates(path),
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
        lastModified: LAST_MODIFIED,
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
        lastModified: LAST_MODIFIED,
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
