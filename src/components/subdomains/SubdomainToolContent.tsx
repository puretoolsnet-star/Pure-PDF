"use client";

import { SignPdfTool } from "@/components/pdf/tools/SignPdfTool";
import { PdfSubdomainHub } from "@/components/subdomains/PdfSubdomainHub";
import { QrGeneratorTool } from "@/components/subdomains/QrGeneratorTool";
import { TableEditorTool } from "@/components/subdomains/TableEditorTool";
import {
  isKnownSubdomain,
  normalizeSubdomainSlug,
  ROOT_DOMAIN,
  type KnownSubdomain,
} from "@/lib/subdomains";

type SubdomainToolContentProps = {
  subdomain: string;
};

export function SubdomainToolContent({ subdomain }: SubdomainToolContentProps) {
  const slug = normalizeSubdomainSlug(subdomain);

  if (!isKnownSubdomain(slug)) {
    return (
      <div className="glass-card rounded-2xl p-6 sm:p-8">
        <p className="text-sm leading-relaxed text-gray-400">
          No tool is mapped for{" "}
          <span className="text-gray-200">
            {slug}.{ROOT_DOMAIN}
          </span>{" "}
          yet.
        </p>
      </div>
    );
  }

  return renderSubdomainTool(slug);
}

function renderSubdomainTool(slug: KnownSubdomain) {
  switch (slug) {
    case "qr":
      return <QrGeneratorTool />;
    case "table":
      return <TableEditorTool />;
    case "sign":
      return <SignPdfTool embedded />;
    case "pdf":
      return <PdfSubdomainHub />;
    default: {
      const exhaustive: never = slug;
      return exhaustive;
    }
  }
}