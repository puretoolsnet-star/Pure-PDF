"use client";

import { useEffect } from "react";

import type { Locale } from "@/i18n/locales";

type HtmlLangSyncProps = {
  locale: Locale;
};

export function HtmlLangSync({ locale }: HtmlLangSyncProps) {
  useEffect(() => {
    document.documentElement.lang = locale === "uk" ? "uk" : locale;
  }, [locale]);

  return null;
}
