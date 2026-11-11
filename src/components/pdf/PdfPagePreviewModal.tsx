"use client";

import { Loader2, X, ZoomIn } from "lucide-react";
import { useEffect } from "react";

import { BodyPortal } from "@/components/layout/BodyPortal";
import { Z } from "@/lib/layer-stack";
import { cn } from "@/lib/cn";

type PdfPagePreviewModalProps = {
  open: boolean;
  title: string;
  closeLabel: string;
  loading: boolean;
  loadingLabel?: string;
  imageSrc: string | null;
  onClose: () => void;
};

export function PdfPagePreviewModal({
  open,
  title,
  closeLabel,
  loading,
  loadingLabel,
  imageSrc,
  onClose,
}: PdfPagePreviewModalProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  if (!open) return null;

  return (
    <BodyPortal open={open}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pdf-page-preview-title"
        data-purepdf-overlay="pdf-page-preview"
        className="pointer-events-auto fixed inset-0 flex flex-col bg-black/90 p-3 backdrop-blur-md sm:p-6"
        style={{ zIndex: Z.modalPanel }}
      >
        <div className="mx-auto flex w-full max-w-4xl min-w-0 flex-1 flex-col">
          <div className="mb-3 flex shrink-0 items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2 text-cyan-200/90">
              <ZoomIn className="h-4 w-4 shrink-0" aria-hidden />
              <h2 id="pdf-page-preview-title" className="truncate text-sm font-semibold text-white sm:text-base">
                {title}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className="touch-manipulation shrink-0 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm font-medium text-gray-200 hover:bg-white/10"
            >
              <X className="h-4 w-4 sm:hidden" aria-hidden />
              <span className="hidden sm:inline">{closeLabel}</span>
            </button>
          </div>

          <div
            className={cn(
              "relative flex min-h-0 flex-1 items-center justify-center overflow-auto rounded-xl border border-white/10 bg-gray-950/80 p-2 sm:p-4",
            )}
          >
            {loading && (
              <div className="flex flex-col items-center gap-3 text-gray-400">
                <Loader2 className="h-8 w-8 animate-spin text-cyan-400" aria-hidden />
                {loadingLabel ? (
                  <p className="text-sm text-gray-400">{loadingLabel}</p>
                ) : null}
              </div>
            )}
            {!loading && imageSrc && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageSrc}
                alt=""
                className="max-h-[min(78vh,56rem)] w-auto max-w-full object-contain"
                draggable={false}
              />
            )}
          </div>
        </div>
      </div>
    </BodyPortal>
  );
}
