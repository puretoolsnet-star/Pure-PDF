"use client";

import { useI18n } from "@/i18n/context";

export function SupportBlock() {
  const { t } = useI18n();

  return (
    <footer
      aria-labelledby="purepdf-support-heading"
      className="mt-10 w-full min-w-0 border-t border-white/10 pt-8 pb-2"
    >
      <div className="glass-card rounded-xl border border-white/10 bg-surface/40 px-4 py-4 sm:px-5">
        <h2
          id="purepdf-support-heading"
          className="text-sm font-semibold text-white"
        >
          {t.support.title}
        </h2>
        <p className="mt-1 max-w-xl text-xs leading-relaxed text-gray-400 sm:text-sm">
          {t.support.body}
        </p>
      </div>
    </footer>
  );
}