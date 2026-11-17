import {
  DEFAULT_LOCALE,
  isLocale,
  type Locale,
} from "@/i18n/locales";
import { localizedPath } from "@/lib/i18n/routing";
import {
  isKnownSubdomain,
  normalizeSubdomainSlug,
  ROOT_DOMAIN,
  type KnownSubdomain,
} from "@/lib/subdomains";
import { getSiteUrl } from "@/lib/seo/site";

export type EcosystemOriginKey = "pdf" | KnownSubdomain;

function trimOrigin(value: string | undefined): string | undefined {
  const trimmed = value?.trim().replace(/\/$/, "");
  return trimmed || undefined;
}

/** Canonical HTTPS origin per micro-site (`https://{slug}.kixt.net` by default). */
export function ecosystemOrigin(key: EcosystemOriginKey): string {
  if (key === "pdf") {
    return (
      trimOrigin(process.env.NEXT_PUBLIC_SITE_URL) ??
      trimOrigin(process.env.NEXT_PUBLIC_PDF_URL) ??
      `https://pdf.${ROOT_DOMAIN}`
    );
  }

  const envBySlug: Record<KnownSubdomain, string | undefined> = {
    qr:
      process.env.NEXT_PUBLIC_QR_URL ??
      process.env.NEXT_PUBLIC_PUREQR_URL,
    table:
      process.env.NEXT_PUBLIC_TABLE_URL ??
      process.env.NEXT_PUBLIC_PURETABLE_URL,
    sign:
      process.env.NEXT_PUBLIC_SIGN_URL ??
      process.env.NEXT_PUBLIC_PURESIGN_URL,
    pdf:
      process.env.NEXT_PUBLIC_PDF_URL ?? process.env.NEXT_PUBLIC_SITE_URL,
  };

  const fromEnv = trimOrigin(envBySlug[key]);
  if (fromEnv) return fromEnv;
  return `https://${key}.${ROOT_DOMAIN}`;
}

/** Public URL with locale prefix — same shape on every Kixt site (`/{locale}` or PDF tool paths). */
export function ecosystemLocalizedUrl(
  originKey: EcosystemOriginKey,
  locale: Locale,
  path = "/",
): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${ecosystemOrigin(originKey)}${localizedPath(locale, normalizedPath)}`;
}

export function ecosystemExternalUrl(
  projectId: "pureQr" | "pureSign" | "pureTable",
  locale: Locale,
): string {
  const map = {
    pureQr: "qr",
    pureSign: "sign",
    pureTable: "table",
  } as const satisfies Record<
    "pureQr" | "pureSign" | "pureTable",
    KnownSubdomain
  >;
  return ecosystemLocalizedUrl(map[projectId], locale, "/");
}

export function ecosystemPurePdfUrl(locale: Locale, path = "/"): string {
  return ecosystemLocalizedUrl("pdf", locale, path);
}

export function ecosystemPurePdfOrigin(): string {
  return getSiteUrl();
}

/** All sibling origins (for JSON-LD `sameAs`). */
export function ecosystemSiblingOrigins(): string[] {
  const keys: EcosystemOriginKey[] = ["qr", "sign", "table"];
  return keys.map((key) => ecosystemOrigin(key));
}

export function localeFromMiddlewareHeader(value: string | null): Locale {
  if (value && isLocale(value)) return value;
  return DEFAULT_LOCALE;
}

/** Redirect target when `/subdomains/{slug}` is hit on the wrong host. */
export function subdomainPublicUrl(
  subdomain: string,
  locale: Locale = DEFAULT_LOCALE,
): string {
  const slug = normalizeSubdomainSlug(subdomain);
  if (slug === "hub") {
    return ecosystemLocalizedUrl("pdf", locale, "/");
  }
  if (isKnownSubdomain(slug)) {
    if (slug === "pdf") {
      return ecosystemPurePdfUrl(locale, "/");
    }
    return ecosystemLocalizedUrl(slug, locale, "/");
  }
  return ecosystemPurePdfUrl(locale, "/");
}