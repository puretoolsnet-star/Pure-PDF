"use client";

import { Construction } from "lucide-react";

import { AdBanner } from "@/components/ads/AdBanner";
import { ToolShell } from "@/components/tools/ToolShell";
import { useI18n } from "@/i18n/context";
import type { ToolId } from "@/i18n/locales";
import { getCatalogEntry } from "@/lib/tools/catalog";

type ComingSoonToolProps = {
  toolId: ToolId;
};

export function ComingSoonTool({ toolId }: ComingSoonToolProps) {
  const { t } = useI18n();
  const icon = getCatalogEntry(toolId)?.icon ?? Construction;

  return (
    <ToolShell toolId={toolId} icon={icon}>
      <div className="glass-card flex flex-col gap-4 rounded-2xl border border-dashed border-cyan-500/25 bg-cyan-500/5 p-6 sm:p-8">
        <div className="flex items-center gap-3 text-cyan-200">
          <Construction className="h-6 w-6" aria-hidden />
          <span className="text-sm font-semibold uppercase tracking-wide">
            {t.catalogUi.comingSoonBadge}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-gray-300 sm:text-base">
          {t.catalogUi.comingSoonBody}
        </p>
        <AdBanner layout="inline" slot={`tool-${toolId}-inline`} />
      </div>
    </ToolShell>
  );
}
