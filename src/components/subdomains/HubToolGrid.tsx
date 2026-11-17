"use client";

import { useI18n } from "@/i18n/context";
import { subdomainPublicUrl } from "@/lib/ecosystem-urls";
import {
  getSubdomainToolDescription,
  getSubdomainToolTitle,
  subdomainEyebrow,
  SUBDOMAIN_SLUGS,
  type KnownSubdomain,
} from "@/lib/subdomains";

export function HubToolGrid() {
  const { locale } = useI18n();
  const tools: KnownSubdomain[] = [...SUBDOMAIN_SLUGS];

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {tools.map((id) => (
        <li key={id}>
          <a
            href={subdomainPublicUrl(id, locale)}
            className="glass-card block h-full rounded-2xl p-6 transition hover:border-cyan-400/40 hover:bg-white/5"
          >
            <h2 className="text-lg font-semibold text-white">
              {getSubdomainToolTitle(id)}
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              {getSubdomainToolDescription(id)}
            </p>
            <p className="mt-4 text-xs text-cyan-300/80">{subdomainEyebrow(id)}</p>
          </a>
        </li>
      ))}
    </ul>
  );
}