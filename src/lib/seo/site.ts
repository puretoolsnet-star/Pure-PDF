import { DEFAULT_LOCALE, type Locale } from "@/i18n/locales";

export { DEFAULT_LOCALE };

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  return "https://purepdf.app";
}

/** Legacy static preview (optional); primary social images use `/og` (see `buildOgImageUrl`). */
export const OG_IMAGE_PATH = "/og/purepdf-og.svg";

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalized}`;
}

export const HREFLANG_MAP: Record<Locale, string> = {
  uk: "uk-UA",
  en: "en",
  pl: "pl",
  de: "de",
  es: "es",
  fr: "fr",
};

export const OPEN_GRAPH_LOCALE: Record<Locale, string> = {
  uk: "uk_UA",
  en: "en_GB",
  pl: "pl_PL",
  de: "de_DE",
  es: "es_ES",
  fr: "fr_FR",
};
