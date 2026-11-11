"use client";

import { Play, X } from "lucide-react";
import { useEffect, useState } from "react";

import { AdVideoSlot } from "@/components/ads/AdVideoSlot";
import { BodyPortal } from "@/components/layout/BodyPortal";
import { useI18n } from "@/i18n/context";
import {
  AD_SUPPORT_WATCH_MS,
  adsterraNative,
  loadAdsterraNative,
  triggerAdsterraReward,
} from "@/lib/ads/adsterra";
import { cn } from "@/lib/cn";
import { Z } from "@/lib/layer-stack";

type Phase = "idle" | "watching" | "ready";

type SupportWatchModalProps = {
  open: boolean;
  sessionKey: number;
  onClose: () => void;
};

function SupportWatchPanel({
  sessionKey,
  onClose,
}: {
  sessionKey: number;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setPhase("idle");
    setProgress(0);
    loadAdsterraNative();
  }, [sessionKey]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    if (phase !== "watching") return;
    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const next = Math.min(1, (now - started) / AD_SUPPORT_WATCH_MS);
      setProgress(next);
      if (next >= 1) {
        setPhase("ready");
        return;
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [phase, sessionKey]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && phase !== "watching") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [phase, onClose]);

  const secondsLeft = Math.max(
    0,
    Math.ceil((1 - progress) * (AD_SUPPORT_WATCH_MS / 1000)),
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="support-watch-title"
      data-purepdf-overlay="support-watch"
      data-open="true"
      className="pointer-events-auto fixed inset-0 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
      style={{ zIndex: Z.modalPanel }}
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-surface/85 shadow-2xl shadow-black/50 backdrop-blur-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wider text-emerald-300/80">
              {t.rewardedAd.sponsored}
            </p>
            <h2 id="support-watch-title" className="mt-1 text-lg font-semibold text-white">
              {t.support.watchTitle}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-300">{t.support.watchMessage}</p>
          </div>
          {phase !== "watching" && (
            <button
              type="button"
              onClick={onClose}
              aria-label={t.rewardedAd.close}
              className="touch-manipulation shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          )}
        </div>

        <div className="space-y-4 px-5 py-4">
          <div id={adsterraNative.containerId || undefined}>
            <AdVideoSlot
              slotLabel={t.rewardedAd.slotLabel}
              watching={phase === "watching"}
            />
          </div>

          {phase === "watching" && (
            <div className="space-y-2">
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                  style={{ width: `${Math.round(progress * 100)}%` }}
                />
              </div>
              <p className="text-sm text-gray-400">
                {t.rewardedAd.watching} {t.rewardedAd.progress(secondsLeft)}
              </p>
            </div>
          )}
          {phase === "idle" && (
            <p className="text-sm text-gray-400">{t.rewardedAd.waitHint}</p>
          )}
          {phase === "ready" && (
            <p className="text-sm text-emerald-200/90">{t.support.thanks}</p>
          )}
        </div>

        <div className="border-t border-white/10 bg-black/25 px-5 py-4 backdrop-blur-sm">
          {phase === "ready" ? (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110"
            >
              {t.support.doneCta}
            </button>
          ) : (
            <button
              type="button"
              disabled={phase === "watching"}
              onClick={() => {
                triggerAdsterraReward();
                setPhase("watching");
              }}
              className={cn(
                "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110",
                phase === "watching" && "cursor-not-allowed opacity-60",
              )}
            >
              <Play className="h-4 w-4 fill-current" aria-hidden />
              {t.support.watchCta}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function SupportWatchModal({ open, sessionKey, onClose }: SupportWatchModalProps) {
  if (!open) return null;

  return (
    <BodyPortal open={open}>
      <SupportWatchPanel key={sessionKey} sessionKey={sessionKey} onClose={onClose} />
    </BodyPortal>
  );
}
