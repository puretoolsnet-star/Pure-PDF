import type { Metadata } from "next";

import { MicroToolLayout } from "@/components/layout/MicroToolLayout";
import { HubToolGrid } from "@/components/subdomains/HubToolGrid";
import { SubdomainToolContent } from "@/components/subdomains/SubdomainToolContent";
import {
  getSubdomainPageContext,
  getSubdomainToolDescription,
  getSubdomainToolTitle,
  isHubSubdomain,
  normalizeSubdomainSlug,
  ROOT_DOMAIN,
  SUBDOMAIN_SLUGS,
} from "@/lib/subdomains";

type SubdomainPageProps = PageProps<"/subdomains/[subdomain]">;

export function generateStaticParams() {
  return [
    { subdomain: "hub" },
    ...SUBDOMAIN_SLUGS.map((subdomain) => ({ subdomain })),
  ];
}

export async function generateMetadata({
  params,
}: SubdomainPageProps): Promise<Metadata> {
  const { subdomain: raw } = await params;
  const subdomain = normalizeSubdomainSlug(raw);
  const title = getSubdomainToolTitle(subdomain);
  return {
    title: `${title} | ${ROOT_DOMAIN}`,
    description: getSubdomainToolDescription(subdomain),
  };
}

export default async function SubdomainToolPage({ params }: SubdomainPageProps) {
  const { subdomain: raw } = await params;
  const subdomain = normalizeSubdomainSlug(raw);
  const layout = getSubdomainPageContext(subdomain);
  const isHub = isHubSubdomain(subdomain);

  return (
    <MicroToolLayout
      key={subdomain}
      title={layout.title}
      description={layout.description}
      eyebrow={layout.eyebrow}
      adSlot={layout.adSlot}
    >
      {isHub ? (
        <HubToolGrid />
      ) : (
        <SubdomainToolContent key={subdomain} subdomain={subdomain} />
      )}
    </MicroToolLayout>
  );
}