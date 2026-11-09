import { DEFAULT_LOCALE, LOCALES, isLocale, type Locale } from "@/i18n/locales";

const LOCALE_PATTERN = new RegExp(`^/(${LOCALES.join("|")})(?=/|$)`);

/** Path without locale prefix, e.g. `/uk/tools/x` → `/tools/x`, `/uk` → `/`. */
export function stripLocalePrefix(pathname: string): string {
  const match = pathname.match(LOCALE_PATTERN);
  if (!match) return pathname || "/";
  const rest = pathname.slice(match[0].length);
  return rest === "" ? "/" : rest;
}

export function localeFromPathname(pathname: string): Locale | null {
  const match = pathname.match(LOCALE_PATTERN);
  if (!match) return null;
  const code = match[1];
  return isLocale(code) ? code : null;
}

export function localizedPath(locale: Locale, path: string): string {
  const normalized = path === "/" || path === "" ? "/" : path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return `/${locale}`;
  return `/${locale}${normalized}`;
}

export function toolRoute(locale: Locale, toolSlug: string): string {
  return localizedPath(locale, `/tools/${toolSlug}`);
}

export function homeRoute(locale: Locale): string {
  return localizedPath(locale, "/");
}

export function defaultLocaleRedirectPath(pathname: string): string {
  const rest = stripLocalePrefix(pathname);
  return localizedPath(DEFAULT_LOCALE, rest);
}
