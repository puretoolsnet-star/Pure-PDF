"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { LocaleShell } from "@/components/i18n/LocaleShell";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import { localeFromPathname } from "@/lib/i18n/routing";

type SubdomainLocaleProviderProps = {
  children: ReactNode;
};

/** Locale from public URL (`/uk`, …) — no `headers()` so static prerender stays valid. */
export function SubdomainLocaleProvider({
  children,
}: SubdomainLocaleProviderProps) {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname) ?? DEFAULT_LOCALE;

  return <LocaleShell locale={locale}>{children}</LocaleShell>;
}