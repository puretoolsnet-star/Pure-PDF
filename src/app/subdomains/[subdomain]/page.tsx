import type { Metadata } from "next";
import Link from "next/link";

import { MicroToolLayout } from "@/components/layout/MicroToolLayout";
import { SubdomainToolContent } from "@/components/subdomains/SubdomainToolContent";
import {
  getSubdomainToolDescription,
  getSubdomainToolTitle,
  isHubSubdomain,
  ROOT_DOMAIN,
  subdomainAdSlot,
  subdomainEyebrow,
  SUBDOMAIN_SLUGS,
  SUBDOMAIN_TOOL_LABELS,
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
  const { subdomain } = await params;
  const title = getSubdomainToolTitle(subdomain);
  return {
    title: `${title} | ${ROOT_DOMAIN}`,
    description: getSubdomainToolDescription(subdomain),
  };
}

export default async function SubdomainToolPage({ params }: SubdomainPageProps) {
  const { subdomain } = await params;
  const isHub = isHubSubdomain(subdomain);
  const title = getSubdomainToolTitle(subdomain);
  const description = getSubdomainToolDescription(subdomain);
  const eyebrow = subdomainEyebrow(subdomain);
  const adSlot = subdomainAdSlot(subdomain);

  return (
    <MicroToolLayout
      title={title}
      description={description}
      eyebrow={eyebrow}
      adSlot={adSlot}
    >
      {isHub ? <HubToolGrid /> : <SubdomainToolContent subdomain={subdomain} />}
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
            href={`/subdomains/${id}`}
            className="glass-card block h-full rounded-2xl p-6 transition hover:border-cyan-400/40 hover:bg-white/5"
          >
            <h2 className="text-lg font-semibold text-white">
              {SUBDOMAIN_TOOL_LABELS[id]}
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              {getSubdomainToolDescription(id)}
            </p>
            <p className="mt-4 text-xs text-cyan-300/80">
              {id}.{ROOT_DOMAIN}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}