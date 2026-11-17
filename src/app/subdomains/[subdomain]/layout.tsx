import type { ReactNode } from "react";

import { SubdomainLocaleProvider } from "@/components/i18n/SubdomainLocaleProvider";

type SubdomainLayoutProps = LayoutProps<"/subdomains/[subdomain]">;

export default function SubdomainLayout({ children }: SubdomainLayoutProps) {
  return <SubdomainLocaleProvider>{children}</SubdomainLocaleProvider>;
}