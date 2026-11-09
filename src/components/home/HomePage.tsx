"use client";

import {
  FileImage,
  FileText,
  GitMerge,
  Images,
  Minimize2,
  Type,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { HomeToolCard } from "@/components/home/HomeToolCard";
import { PrivacyBanner } from "@/components/layout/PrivacyBanner";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { useI18n } from "@/i18n/context";
import type { ToolId } from "@/i18n/locales";
import { toolRoute } from "@/lib/i18n/routing";

const TOOL_META = [
  {
    id: "images-to-pdf" as const,
    icon: Images,
    accent: "from-primary/20 to-primary/5",
  },
  {
    id: "pdf-to-images" as const,
    icon: FileImage,
    accent: "from-accent/20 to-accent/5",
  },
  {
    id: "merge-pdf" as const,
    icon: GitMerge,
    accent: "from-violet-500/20 to-violet-500/5",
  },
  {
    id: "compress-pdf" as const,
    icon: Minimize2,
    accent: "from-amber-500/20 to-amber-500/5",
  },
  {
    id: "word-to-pdf" as const,
    icon: FileText,
    accent: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    id: "text-to-pdf" as const,
    icon: Type,
    accent: "from-sky-500/20 to-sky-500/5",
  },
] satisfies Array<{ id: ToolId; icon: typeof Images; accent: string }>;

export function HomePage() {
  const router = useRouter();
  const { t, locale } = useI18n();

  const openTool = useCallback(
    (toolId: ToolId) => {
      router.push(toolRoute(locale, toolId));
    },
    [locale, router],
  );

  return (
    <div className="purepdf-page-shell relative flex min-h-dvh w-full flex-1 flex-col overflow-x-hidden bg-background font-sans text-gray-100">
      <SiteHeader />

      <main className="relative z-10 mx-auto flex w-full min-w-0 max-w-6xl flex-1 flex-col px-4 pb-[max(4rem,env(safe-area-inset-bottom))] pt-2 sm:px-6 md:px-8 md:pb-16 [&_button]:touch-manipulation [&_a]:touch-manipulation">
        <PrivacyBanner className="mb-8" />

        <section className="mb-10 max-w-2xl min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl [overflow-wrap:anywhere]">
            {t.home.heroTitle}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-gray-400 sm:text-base md:text-lg [overflow-wrap:anywhere]">
            {t.home.heroSubtitle}
          </p>
        </section>

        <section
          aria-labelledby="purepdf-tools-heading"
          className="grid w-full min-w-0 shrink-0 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          <h2
            id="purepdf-tools-heading"
            className="col-span-full text-lg font-semibold tracking-tight text-white sm:text-xl"
          >
            {t.home.toolsHeading}
          </h2>
          {TOOL_META.map((tool) => (
            <HomeToolCard
              key={tool.id}
              toolId={tool.id}
              icon={tool.icon}
              accent={tool.accent}
              onActivate={openTool}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
