"use client";

import type { ReactNode } from "react";

import { AdsterraSocialBarLoader } from "@/components/ads/AdsterraSocialBarLoader";
import { BotProtectionProvider } from "@/components/bot-protection/BotProtectionProvider";
import { AppTouchGuard } from "@/components/layout/AppTouchGuard";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <BotProtectionProvider>
      <AppTouchGuard />
      <AdsterraSocialBarLoader />
      <div
        id="purepdf-app-root"
        className="relative z-[100] isolate flex min-h-dvh min-w-0 flex-1 flex-col overflow-x-hidden pointer-events-auto touch-manipulation"
      >
        {children}
      </div>
    </BotProtectionProvider>
  );
}
