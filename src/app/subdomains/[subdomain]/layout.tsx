import { headers } from "next/headers";
import type { ReactNode } from "react";

import { LocaleShell } from "@/components/i18n/LocaleShell";
import { localeFromMiddlewareHeader } from "@/lib/ecosystem-urls";

type SubdomainLayoutProps = LayoutProps<"/subdomains/[subdomain]">;

export default async function SubdomainLayout({
  children,
}: SubdomainLayoutProps) {
  const headerStore = await headers();
  const locale = localeFromMiddlewareHeader(
    headerStore.get("x-purepdf-locale"),
  );

  return <LocaleShell locale={locale}>{children}</LocaleShell>;
}