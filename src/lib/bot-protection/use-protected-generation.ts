"use client";

import { useCallback } from "react";

import { useBotProtection } from "@/components/bot-protection/BotProtectionProvider";
import { useI18n } from "@/i18n/context";

export function useProtectedGeneration() {
  const { guardGeneration, ready } = useBotProtection();
  const { t } = useI18n();

  const runProtected = useCallback(
    async (
      action: () => Promise<void>,
      setError: (message: string | null) => void,
    ) => {
      if (!ready) {
        setError(t.botProtection.unavailable);
        return;
      }

      const guard = await guardGeneration();
      if (!guard.ok) {
        setError(
          guard.code === "rate_limit"
            ? t.botProtection.rateLimited
            : t.botProtection.unavailable,
        );
        return;
      }

      setError(null);
      await action();
    },
    [
      guardGeneration,
      ready,
      t.botProtection.rateLimited,
      t.botProtection.unavailable,
    ],
  );

  return { runProtected, ready };
}
