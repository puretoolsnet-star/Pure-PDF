"use client";

import { Play } from "lucide-react";
import { useState } from "react";

import { SupportWatchModal } from "@/components/ads/SupportWatchModal";
import { useI18n } from "@/i18n/context";

export function SupportBlock() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);

  return (
    <>
      <footer
        aria-labelledby="purepdf-support-heading"
        className="mt-10 w-full min-w-0 border-t border-white/10 pt-8 pb-2"
      >
        <div className="glass-card flex flex-col gap-3 rounded-xl border border-white/10 bg-surface/40 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="min-w-0">
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
          <button
            type="button"
            onClick={() => {
              setSessionKey((k) => k + 1);
              setOpen(true);
            }}
            className="inline-flex shrink-0 touch-manipulation items-center justify-center gap-2 rounded-lg border border-cyan-500/30 bg-gradient-to-r from-cyan-500/15 to-emerald-500/15 px-4 py-2.5 text-sm font-medium text-cyan-100 transition hover:border-cyan-400/40 hover:brightness-110 active:scale-[0.98]"
          >
            <Play className="h-4 w-4 fill-current" aria-hidden />
            {t.support.watchCta}
          </button>
        </div>
      </footer>

      <SupportWatchModal
        open={open}
        sessionKey={sessionKey}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
