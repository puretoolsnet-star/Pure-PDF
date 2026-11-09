"use client";

import type { ReactNode } from "react";

import { HtmlLangSync } from "@/components/i18n/HtmlLangSync";
import { I18nProvider } from "@/i18n/context";
import type { Locale } from "@/i18n/locales";

type LocaleShellProps = {
  locale: Locale;
  children: ReactNode;
};

export function LocaleShell({ locale, children }: LocaleShellProps) {
  return (
    <I18nProvider initialLocale={locale}>
      <HtmlLangSync locale={locale} />
      {children}
    </I18nProvider>
  );
}
