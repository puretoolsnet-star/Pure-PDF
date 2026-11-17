import type { MetadataRoute } from "next";

import { LOCALES } from "@/i18n/locales";
import { absoluteUrl, getSiteUrl } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  const localizedAllow = LOCALES.map((locale) => `/${locale}/`);

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", ...localizedAllow],
        disallow: ["/api/", "/og"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: getSiteUrl().replace(/^https?:\/\//, ""),
  };
}
