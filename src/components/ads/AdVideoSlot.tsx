"use client";

import { Play } from "lucide-react";

import { cn } from "@/lib/cn";

type AdVideoSlotProps = {
  slotLabel: string;
  networkLabel?: string;
  watching?: boolean;
};

/** Placeholder frame for sponsored video / native ad slots. */
export function AdVideoSlot({
  slotLabel,
  networkLabel = "Adsterra",
  watching = false,
}: AdVideoSlotProps) {
  return (
    <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-white/15 bg-black/40 backdrop-blur-sm">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-emerald-500/10"
        aria-hidden
      />
      <div
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10",
          watching && "animate-pulse",
        )}
      >
        <Play className="h-6 w-6 fill-white/90 text-white" aria-hidden />
      </div>
      <p className="relative mt-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
        {slotLabel}
      </p>
      <p className="relative mt-1 text-xs text-gray-400">{networkLabel}</p>
    </div>
  );
}
