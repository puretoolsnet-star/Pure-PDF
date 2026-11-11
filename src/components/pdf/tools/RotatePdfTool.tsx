"use client";

import {
  Check,
  CheckCircle2,
  Loader2,
  RotateCcw,
  RotateCw,
  Trash2,
  ZoomIn,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { PdfPagePreviewModal } from "@/components/pdf/PdfPagePreviewModal";
import { FileDropzone } from "@/components/tools/FileDropzone";
import { ToolShell } from "@/components/tools/ToolShell";
import { useI18n } from "@/i18n/context";
import { AD_ROTATE_TOOL_WATCH_MS } from "@/lib/ads/adsterra";
import { useProtectedGeneration } from "@/lib/bot-protection/use-protected-generation";
import { cn } from "@/lib/cn";
import { downloadBytes } from "@/lib/download";
import { renderPdfPageDataUrl, renderPdfThumbnails } from "@/lib/pdf/pdfjs-client";
import { applyPdfPageRotations, getPdfPageCount } from "@/lib/pdf/rotate-pdf";
import { useRewardedAction } from "@/lib/use-rewarded-action";

function normalizeDegrees(value: number) {
  return ((value % 360) + 360) % 360;
}

function addDelta(current: number, delta: number) {
  return normalizeDegrees(current + delta);
}

export function RotatePdfTool() {
  const { t } = useI18n();
  const { runProtected, ready } = useProtectedGeneration();
  const { requestAction, modal } = useRewardedAction("rotate-pdf", {
    watchMs: AD_ROTATE_TOOL_WATCH_MS,
    autoContinueWhenReady: true,
  });

  const copy = t.tools["rotate-pdf"];
  const ui = t.rotateUi;

  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [rotations, setRotations] = useState<Record<number, number>>({});
  const [selected, setSelected] = useState<Set<number>>(() => new Set());
  const [thumbnails, setThumbnails] = useState<Record<number, string>>({});
  const [thumbsLoading, setThumbsLoading] = useState(false);
  const [thumbProgress, setThumbProgress] = useState<{ current: number; total: number } | null>(
    null,
  );
  const thumbGenRef = useRef(0);
  const previewGenRef = useRef(0);

  const [previewPage, setPreviewPage] = useState<number | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultReady, setResultReady] = useState(false);
  const resultRef = useRef<{ bytes: Uint8Array; filename: string } | null>(null);

  const selectedCount = selected.size;

  const pageNumbers = useMemo(() => {
    if (!pageCount) return [];
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }, [pageCount]);

  const hasRotationChanges = useMemo(
    () => pageNumbers.some((p) => (rotations[p] ?? 0) !== 0),
    [pageNumbers, rotations],
  );

  const resetResult = useCallback(() => {
    resultRef.current = null;
    setResultReady(false);
  }, []);

  const clearFile = useCallback(() => {
    thumbGenRef.current += 1;
    previewGenRef.current += 1;
    setFile(null);
    setPageCount(null);
    setRotations({});
    setSelected(new Set());
    setThumbnails({});
    setThumbsLoading(false);
    setThumbProgress(null);
    setPreviewPage(null);
    setPreviewSrc(null);
    setError(null);
    resetResult();
  }, [resetResult]);

  const loadFile = useCallback(
    async (files: File[]) => {
      const pdf = files.find(
        (f) => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf"),
      );
      if (!pdf) {
        setError(copy.errors.invalid);
        return;
      }
      setError(null);
      resetResult();
      setFile(pdf);
      setRotations({});
      setSelected(new Set());
      setThumbnails({});
      try {
        const count = await getPdfPageCount(pdf);
        setPageCount(count);
      } catch {
        setError(copy.errors.failed);
        setFile(null);
        setPageCount(null);
      }
    },
    [copy.errors.failed, copy.errors.invalid, resetResult],
  );

  useEffect(() => {
    if (!file || !pageCount) return;

    const generation = ++thumbGenRef.current;
    setThumbsLoading(true);
    setThumbProgress({ current: 0, total: pageCount });

    void renderPdfThumbnails({
      file,
      onProgress: (current, total) => {
        if (generation !== thumbGenRef.current) return;
        setThumbProgress({ current, total });
      },
      onThumbnail: (pageNumber, dataUrl) => {
        if (generation !== thumbGenRef.current) return;
        setThumbnails((prev) => ({ ...prev, [pageNumber]: dataUrl }));
      },
      shouldCancel: () => generation !== thumbGenRef.current,
    })
      .catch(() => {
        if (generation !== thumbGenRef.current) return;
        setError(copy.errors.failed);
      })
      .finally(() => {
        if (generation !== thumbGenRef.current) return;
        setThumbsLoading(false);
      });
  }, [copy.errors.failed, file, pageCount]);

  const mutateRotations = useCallback(
    (mutate: (prev: Record<number, number>) => Record<number, number>) => {
      resetResult();
      setRotations((prev) => mutate(prev));
    },
    [resetResult],
  );

  const adjustPage = useCallback(
    (page: number, delta: number) => {
      mutateRotations((prev) => ({
        ...prev,
        [page]: addDelta(prev[page] ?? 0, delta),
      }));
    },
    [mutateRotations],
  );

  const resetPage = useCallback(
    (page: number) => {
      mutateRotations((prev) => {
        if ((prev[page] ?? 0) === 0) return prev;
        const next = { ...prev };
        delete next[page];
        return next;
      });
    },
    [mutateRotations],
  );

  const adjustMany = useCallback(
    (pages: number[], delta: number) => {
      mutateRotations((prev) => {
        const next = { ...prev };
        for (const page of pages) {
          next[page] = addDelta(prev[page] ?? 0, delta);
        }
        return next;
      });
    },
    [mutateRotations],
  );

  const resetAllRotations = useCallback(() => {
    mutateRotations(() => ({}));
  }, [mutateRotations]);

  const toggleSelected = useCallback((page: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(page)) next.delete(page);
      else next.add(page);
      return next;
    });
  }, []);

  const clearSelection = useCallback(() => setSelected(new Set()), []);

  const openPagePreview = useCallback(
    (page: number) => {
      if (!file) return;
      const generation = ++previewGenRef.current;
      setPreviewPage(page);
      setPreviewSrc(null);
      setPreviewLoading(true);
      void renderPdfPageDataUrl(file, page)
        .then((url) => {
          if (generation !== previewGenRef.current) return;
          setPreviewSrc(url);
        })
        .catch(() => {
          if (generation !== previewGenRef.current) return;
          setError(copy.errors.failed);
          setPreviewPage(null);
        })
        .finally(() => {
          if (generation !== previewGenRef.current) return;
          setPreviewLoading(false);
        });
    },
    [copy.errors.failed, file],
  );

  const closePagePreview = useCallback(() => {
    previewGenRef.current += 1;
    setPreviewPage(null);
    setPreviewSrc(null);
    setPreviewLoading(false);
  }, []);

  const runRotate = useCallback(async () => {
    if (!file) return;
    if (!hasRotationChanges) {
      setError(ui.errNoChanges);
      return;
    }

    await runProtected(async () => {
      setProcessing(true);
      setError(null);
      resetResult();
      try {
        const bytes = await applyPdfPageRotations(file, rotations);
        const base = file.name.replace(/\.pdf$/i, "") || "document";
        resultRef.current = { bytes, filename: `${base}-rotated.pdf` };
        setResultReady(true);
      } catch (cause) {
        setError(cause instanceof Error ? cause.message || copy.errors.failed : copy.errors.failed);
      } finally {
        setProcessing(false);
      }
    }, setError);
  }, [
    copy.errors.failed,
    file,
    hasRotationChanges,
    resetResult,
    rotations,
    runProtected,
    ui.errNoChanges,
  ]);

  const handleDownload = useCallback(async () => {
    const payload = resultRef.current;
    if (!payload) return;
    downloadBytes(payload.bytes, payload.filename);
  }, []);

  const selectedPages = useMemo(() => [...selected].sort((a, b) => a - b), [selected]);

  const canProcess = file && hasRotationChanges && !thumbsLoading;

  const bulkBtnClass =
    "inline-flex touch-manipulation items-center justify-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-2.5 py-2 text-xs font-medium text-gray-200 transition hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <ToolShell toolId="rotate-pdf" icon={RotateCw}>
      <div className="flex min-w-0 flex-col gap-6">
        {!file ? (
          <FileDropzone
            accept="application/pdf,.pdf"
            multiple={false}
            title={t.common.dropzoneTitle}
            hint={copy.hint}
            onFiles={loadFile}
            disabled={processing}
          />
        ) : (
          <section className="glass-card min-w-0 rounded-2xl border border-white/10 p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">{file.name}</p>
                {pageCount != null && (
                  <p className="mt-1 text-xs text-cyan-300/80">
                    {t.splitUi.pagesInFile(pageCount)}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={clearFile}
                disabled={processing}
                className="inline-flex touch-manipulation items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-gray-300 transition hover:bg-white/5 hover:text-white disabled:opacity-40"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden />
                {ui.removeFile}
              </button>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-gray-400 sm:text-sm">
              {ui.selectPagesHint}
            </p>

            <div className="mt-4 rounded-xl border border-white/10 bg-gray-950/50 p-3 sm:p-4">
              <p className="text-xs text-gray-400">{ui.bulkHint}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  className={bulkBtnClass}
                  onClick={() => adjustMany(pageNumbers, 90)}
                >
                  <RotateCw className="h-3.5 w-3.5" aria-hidden />
                  {ui.rotateAllCw}
                </button>
                <button
                  type="button"
                  className={bulkBtnClass}
                  onClick={() => adjustMany(pageNumbers, -90)}
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                  {ui.rotateAllCcw}
                </button>
                <button
                  type="button"
                  className={bulkBtnClass}
                  onClick={() => adjustMany(pageNumbers, 180)}
                >
                  {ui.rotateAll180}
                </button>
                <span className="mx-1 hidden h-8 w-px self-center bg-white/10 sm:inline" />
                <button
                  type="button"
                  className={bulkBtnClass}
                  disabled={selectedCount === 0}
                  onClick={() => adjustMany(selectedPages, 90)}
                >
                  <RotateCw className="h-3.5 w-3.5" aria-hidden />
                  {ui.rotateSelectedCw}
                </button>
                <button
                  type="button"
                  className={bulkBtnClass}
                  disabled={selectedCount === 0}
                  onClick={() => adjustMany(selectedPages, -90)}
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                  {ui.rotateSelectedCcw}
                </button>
                <button
                  type="button"
                  className={bulkBtnClass}
                  disabled={selectedCount === 0}
                  onClick={() => adjustMany(selectedPages, 180)}
                >
                  {ui.rotateSelected180}
                </button>
                {hasRotationChanges && (
                  <button
                    type="button"
                    className={cn(bulkBtnClass, "border-amber-500/30 text-amber-200/90")}
                    onClick={resetAllRotations}
                  >
                    {ui.resetAll}
                  </button>
                )}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-medium text-gray-300">{ui.pagesSelected(selectedCount)}</p>
              {selectedCount > 0 && (
                <button
                  type="button"
                  onClick={clearSelection}
                  className="text-xs font-medium text-cyan-300/90 hover:text-cyan-200"
                >
                  {ui.clearSelection}
                </button>
              )}
            </div>

            {thumbsLoading && (
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-cyan-400" aria-hidden />
                <span>
                  {thumbProgress
                    ? ui.thumbnailProgress(thumbProgress.current, thumbProgress.total)
                    : ui.loadingThumbnails}
                </span>
              </div>
            )}

            <div className="mt-4 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {pageNumbers.map((page) => {
                const angle = rotations[page] ?? 0;
                const isSelected = selected.has(page);
                const src = thumbnails[page];
                return (
                  <div
                    key={page}
                    className={cn(
                      "relative min-w-0 overflow-hidden rounded-xl border bg-gray-950/80 transition",
                      angle !== 0
                        ? "border-amber-500/60 ring-2 ring-amber-500/20"
                        : isSelected
                          ? "border-cyan-500/50 ring-2 ring-cyan-500/20"
                          : "border-white/10",
                    )}
                  >
                    <div className="relative aspect-[3/4] w-full bg-gray-900">
                      {src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={src}
                          alt=""
                          className="h-full w-full object-contain object-center transition-transform duration-200"
                          style={{ transform: `rotate(${angle}deg)` }}
                          loading="lazy"
                          draggable={false}
                        />
                      ) : (
                        <span className="flex h-full items-center justify-center">
                          <Loader2 className="h-7 w-7 animate-spin text-gray-600" aria-hidden />
                        </span>
                      )}
                      <button
                        type="button"
                        aria-label={`${ui.zoomPreview}. ${ui.pageButton(page)}`}
                        title={ui.zoomPreview}
                        onClick={() => openPagePreview(page)}
                        className="absolute right-2 top-2 z-10 flex h-9 w-9 touch-manipulation items-center justify-center rounded-lg border border-white/20 bg-black/75 text-cyan-100 shadow-lg transition hover:border-cyan-400/50 hover:bg-cyan-950/90"
                      >
                        <ZoomIn className="h-4 w-4" aria-hidden />
                      </button>
                      {angle !== 0 && (
                        <span className="pointer-events-none absolute left-2 top-2 z-10 rounded-lg bg-amber-500/90 px-2 py-1 text-[10px] font-bold text-gray-950 shadow">
                          {ui.rotationLabel(angle)}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 border-t border-white/10 px-2.5 py-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold tabular-nums text-gray-300">
                          {ui.pageButton(page)}
                        </span>
                        <button
                          type="button"
                          role="checkbox"
                          aria-checked={isSelected}
                          aria-label={ui.selectPage}
                          onClick={() => toggleSelected(page)}
                          disabled={processing}
                          className={cn(
                            "flex h-6 w-6 shrink-0 touch-manipulation items-center justify-center rounded-md border transition",
                            isSelected
                              ? "border-cyan-400 bg-cyan-500/90 text-white"
                              : "border-white/25 bg-gray-900 text-transparent hover:border-cyan-400/40",
                          )}
                        >
                          <Check className="h-3.5 w-3.5" aria-hidden strokeWidth={3} />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <button
                          type="button"
                          title={ui.rotateCcw90}
                          aria-label={`${ui.rotateCcw90}. ${ui.pageButton(page)}`}
                          onClick={() => adjustPage(page, -90)}
                          disabled={processing}
                          className="inline-flex flex-1 touch-manipulation items-center justify-center gap-1 rounded-lg border border-white/10 bg-gray-900/80 px-2 py-2 text-[10px] font-medium text-gray-200 hover:border-cyan-500/30 hover:text-white sm:text-xs"
                        >
                          <RotateCcw className="h-3.5 w-3.5 shrink-0" aria-hidden />
                          <span className="hidden sm:inline">−90°</span>
                        </button>
                        <button
                          type="button"
                          title={ui.rotateCw90}
                          aria-label={`${ui.rotateCw90}. ${ui.pageButton(page)}`}
                          onClick={() => adjustPage(page, 90)}
                          disabled={processing}
                          className="inline-flex flex-1 touch-manipulation items-center justify-center gap-1 rounded-lg border border-white/10 bg-gray-900/80 px-2 py-2 text-[10px] font-medium text-gray-200 hover:border-cyan-500/30 hover:text-white sm:text-xs"
                        >
                          <RotateCw className="h-3.5 w-3.5 shrink-0" aria-hidden />
                          <span className="hidden sm:inline">+90°</span>
                        </button>
                        <button
                          type="button"
                          title={ui.rotate180}
                          aria-label={`${ui.rotate180}. ${ui.pageButton(page)}`}
                          onClick={() => adjustPage(page, 180)}
                          disabled={processing}
                          className="inline-flex touch-manipulation items-center justify-center rounded-lg border border-white/10 bg-gray-900/80 px-2.5 py-2 text-[10px] font-semibold text-gray-200 hover:border-cyan-500/30 hover:text-white sm:text-xs"
                        >
                          180°
                        </button>
                        {angle !== 0 && (
                          <button
                            type="button"
                            title={ui.resetPage}
                            aria-label={`${ui.resetPage}. ${ui.pageButton(page)}`}
                            onClick={() => resetPage(page)}
                            disabled={processing}
                            className="inline-flex touch-manipulation items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 px-2 py-2 text-[10px] font-medium text-amber-200 hover:bg-amber-500/20 sm:text-xs"
                          >
                            ↺
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {resultReady && (
          <section
            className="glass-card rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-4 sm:p-5"
            aria-live="polite"
          >
            <div className="flex gap-3">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-400" aria-hidden />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">{ui.successTitle}</p>
                <p className="mt-1 text-sm text-gray-300">{ui.successBody}</p>
              </div>
            </div>
          </section>
        )}

        {error && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <button
            type="button"
            disabled={!canProcess || processing || !ready}
            onClick={() => requestAction(() => void runRotate(), "process")}
            className="inline-flex w-full touch-manipulation items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
          >
            {processing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                {ui.processing}
              </>
            ) : (
              copy.processAction
            )}
          </button>
          <button
            type="button"
            disabled={!resultReady || processing || !ready}
            onClick={() => requestAction(handleDownload, "download")}
            className="inline-flex w-full touch-manipulation items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
          >
            {t.common.downloadReadyPdf}
          </button>
        </div>
        {modal}

        <PdfPagePreviewModal
          open={previewPage != null}
          title={previewPage != null ? ui.previewTitle(previewPage) : ""}
          closeLabel={ui.previewClose}
          loading={previewLoading}
          loadingLabel={ui.previewLoading}
          imageSrc={previewSrc}
          onClose={closePagePreview}
        />
      </div>
    </ToolShell>
  );
}
