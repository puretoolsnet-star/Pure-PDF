import type { MetadataRoute } from "next";

import { LOCALES } from "@/i18n/locales";

const baseUrl = "https://pdf.kixt.net";

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
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl.replace(/^https?:\/\//, ""),
  };
}
