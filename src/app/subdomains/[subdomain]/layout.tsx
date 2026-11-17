import type { ReactNode } from "react";

import { LocaleShell } from "@/components/i18n/LocaleShell";
import { DEFAULT_LOCALE } from "@/i18n/locales";

type SubdomainLayoutProps = LayoutProps<"/subdomains/[subdomain]">;

export default function SubdomainLayout({ children }: SubdomainLayoutProps) {
  return <LocaleShell locale={DEFAULT_LOCALE}>{children}</LocaleShell>;
}