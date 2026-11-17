"use client";

import type { ReactNode } from "react";

import { BotProtectionProvider } from "@/components/bot-protection/BotProtectionProvider";
import { AppTouchGuard } from "@/components/layout/AppTouchGuard";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <BotProtectionProvider>
      <AppTouchGuard />
      <div
        id="purepdf-app-root"
        className="purepdf-mobile-ui relative flex min-h-dvh min-w-0 flex-1 flex-col overflow-x-hidden touch-manipulation"
      >
        {children}
        {/* Modals portal inside app stack — no full-viewport ghost on `body` */}
        <div id="purepdf-portal-root" />
      </div>
    </BotProtectionProvider>
  );
}
