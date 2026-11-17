"use client";

import type { ReactNode } from "react";

import { SignPdfTool } from "@/components/pdf/tools/SignPdfTool";
import { PdfSubdomainHub } from "@/components/subdomains/PdfSubdomainHub";
import { QrGeneratorTool } from "@/components/subdomains/QrGeneratorTool";
import { TableEditorTool } from "@/components/subdomains/TableEditorTool";
import {
  isKnownSubdomain,
  ROOT_DOMAIN,
  type KnownSubdomain,
} from "@/lib/subdomains";

type SubdomainToolContentProps = {
  subdomain: string;
};

const TOOL_BY_SUBDOMAIN: Record<KnownSubdomain, () => ReactNode> = {
  qr: () => <QrGeneratorTool />,
  table: () => <TableEditorTool />,
  sign: () => <SignPdfTool embedded />,
  pdf: () => <PdfSubdomainHub />,
};

export function SubdomainToolContent({ subdomain }: SubdomainToolContentProps) {
  if (!isKnownSubdomain(subdomain)) {
    return (
      <div className="glass-card rounded-2xl p-6 sm:p-8">
        <p className="text-sm leading-relaxed text-gray-400">
          No tool is mapped for{" "}
          <span className="text-gray-200">
            {subdomain}.{ROOT_DOMAIN}
          </span>{" "}
          yet.
        </p>
      </div>
    );
  }

  const render = TOOL_BY_SUBDOMAIN[subdomain];
  return <>{render()}</>;
}