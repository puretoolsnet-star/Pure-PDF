"use client";

import { useEffect } from "react";

import type { Locale } from "@/i18n/locales";
import { HTML_LANG } from "@/lib/seo/site";

type HtmlLangSyncProps = {
  locale: Locale;
};

export function HtmlLangSync({ locale }: HtmlLangSyncProps) {
  useEffect(() => {
    document.documentElement.lang = HTML_LANG[locale];
  }, [locale]);

  return null;
}
