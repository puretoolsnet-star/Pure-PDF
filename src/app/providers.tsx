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
        className="relative z-[1] flex min-h-dvh min-w-0 flex-1 flex-col overflow-x-hidden pointer-events-auto touch-manipulation"
      >
        {children}
      </div>
    </BotProtectionProvider>
  );
}
