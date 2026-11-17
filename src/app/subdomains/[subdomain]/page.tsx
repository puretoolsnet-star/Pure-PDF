import type { Metadata } from "next";
import Link from "next/link";

import { MicroToolLayout } from "@/components/layout/MicroToolLayout";
import { SubdomainToolContent } from "@/components/subdomains/SubdomainToolContent";
import {
  getSubdomainPageContext,
  getSubdomainToolDescription,
  getSubdomainToolTitle,
  isHubSubdomain,
  normalizeSubdomainSlug,
  ROOT_DOMAIN,
  subdomainEyebrow,
  subdomainRoutePath,
  SUBDOMAIN_SLUGS,
  type KnownSubdomain,
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

function HubToolGrid() {
  const tools: KnownSubdomain[] = [...SUBDOMAIN_SLUGS];

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {tools.map((id) => (
        <li key={id}>
          <Link
            href={subdomainRoutePath(id)}
            className="glass-card block h-full rounded-2xl p-6 transition hover:border-cyan-400/40 hover:bg-white/5"
          >
            <h2 className="text-lg font-semibold text-white">
              {getSubdomainToolTitle(id)}
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              {getSubdomainToolDescription(id)}
            </p>
            <p className="mt-4 text-xs text-cyan-300/80">{subdomainEyebrow(id)}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}