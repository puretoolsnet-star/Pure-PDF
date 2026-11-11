"use client";

import { Check, CheckCircle2, FileMinus, Loader2, Trash2, ZoomIn } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { PdfPagePreviewModal } from "@/components/pdf/PdfPagePreviewModal";
import { FileDropzone } from "@/components/tools/FileDropzone";
import { ToolShell } from "@/components/tools/ToolShell";
import { useI18n } from "@/i18n/context";
import { AD_REMOVE_TOOL_WATCH_MS } from "@/lib/ads/adsterra";
import { useProtectedGeneration } from "@/lib/bot-protection/use-protected-generation";
import { cn } from "@/lib/cn";
import { downloadBytes } from "@/lib/download";
import { getPdfPageCount, removePdfPages } from "@/lib/pdf/remove-pages-pdf";
import { renderPdfPageDataUrl, renderPdfThumbnails } from "@/lib/pdf/pdfjs-client";
import { useRewardedAction } from "@/lib/use-rewarded-action";

export function RemovePagesTool() {
  const { t } = useI18n();
  const { runProtected, ready } = useProtectedGeneration();
  const { requestAction, modal } = useRewardedAction("remove-pages", {
    watchMs: AD_REMOVE_TOOL_WATCH_MS,
    autoContinueWhenReady: true,
  });

  const copy = t.tools["remove-pages"];
  const ui = t.removeUi;

  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [marked, setMarked] = useState<Set<number>>(() => new Set());
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

  const markedCount = marked.size;

  const pageNumbers = useMemo(() => {
    if (!pageCount) return [];
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }, [pageCount]);

  const resetResult = useCallback(() => {
    resultRef.current = null;
    setResultReady(false);
  }, []);

  const clearFile = useCallback(() => {
    thumbGenRef.current += 1;
    previewGenRef.current += 1;
    setFile(null);
    setPageCount(null);
    setMarked(new Set());
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
      setMarked(new Set());
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

  const togglePage = useCallback(
    (page: number) => {
      resetResult();
      setMarked((prev) => {
        const next = new Set(prev);
        if (next.has(page)) next.delete(page);
        else next.add(page);
        return next;
      });
    },
    [resetResult],
  );

  const clearMarks = useCallback(() => {
    resetResult();
    setMarked(new Set());
  }, [resetResult]);

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

  const runRemove = useCallback(async () => {
    if (!file || !pageCount) return;
    if (marked.size === 0) {
      setError(ui.errNoneSelected);
      return;
    }
    if (marked.size >= pageCount) {
      setError(ui.errAllPages);
      return;
    }

    await runProtected(async () => {
      setProcessing(true);
      setError(null);
      resetResult();
      try {
        const toRemove = [...marked].sort((a, b) => a - b);
        const bytes = await removePdfPages(file, toRemove);
        const base = file.name.replace(/\.pdf$/i, "") || "document";
        resultRef.current = { bytes, filename: `${base}-trimmed.pdf` };
        setResultReady(true);
      } catch (cause) {
        if (cause instanceof Error) {
          if (cause.message === "ALL_PAGES") setError(ui.errAllPages);
          else if (cause.message === "NONE_SELECTED") setError(ui.errNoneSelected);
          else setError(cause.message || copy.errors.failed);
        } else {
          setError(copy.errors.failed);
        }
      } finally {
        setProcessing(false);
      }
    }, setError);
  }, [
    copy.errors.failed,
    file,
    marked,
    pageCount,
    resetResult,
    runProtected,
    ui.errAllPages,
    ui.errNoneSelected,
  ]);

  const handleDownload = useCallback(async () => {
    const payload = resultRef.current;
    if (!payload) return;
    downloadBytes(payload.bytes, payload.filename);
  }, []);

  const canProcess =
    file && pageCount && markedCount > 0 && markedCount < pageCount && !thumbsLoading;

  return (
    <ToolShell toolId="remove-pages" icon={FileMinus}>
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

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-medium text-gray-300">
                {ui.pagesSelected(markedCount)}
              </p>
              {markedCount > 0 && (
                <button
                  type="button"
                  onClick={clearMarks}
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
                const selected = marked.has(page);
                const src = thumbnails[page];
                return (
                  <div
                    key={page}
                    className={cn(
                      "relative min-w-0 overflow-hidden rounded-xl border bg-gray-950/80 transition",
                      selected
                        ? "border-red-500/70 ring-2 ring-red-500/30"
                        : "border-white/10",
                    )}
                  >
                    <div className="relative aspect-[3/4] w-full bg-gray-900">
                      <button
                        type="button"
                        aria-pressed={selected}
                        aria-label={selected ? ui.unmarkPage(page) : ui.markForRemoval(page)}
                        onClick={() => togglePage(page)}
                        disabled={processing}
                        className="absolute inset-0 touch-manipulation"
                      >
                        {src ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={src}
                            alt=""
                            className={cn(
                              "h-full w-full object-contain object-center",
                              selected && "opacity-80",
                            )}
                            loading="lazy"
                            draggable={false}
                          />
                        ) : (
                          <span className="flex h-full items-center justify-center">
                            <Loader2 className="h-7 w-7 animate-spin text-gray-600" aria-hidden />
                          </span>
                        )}
                      </button>
                      {selected && (
                        <div className="pointer-events-none absolute inset-0 bg-red-950/20" />
                      )}
                      <button
                        type="button"
                        aria-label={`${ui.zoomPreview}. ${ui.pageButton(page)}`}
                        title={ui.zoomPreview}
                        onClick={(event) => {
                          event.stopPropagation();
                          openPagePreview(page);
                        }}
                        className="absolute right-2 top-2 z-10 flex h-9 w-9 touch-manipulation items-center justify-center rounded-lg border border-white/20 bg-black/75 text-cyan-100 shadow-lg transition hover:border-cyan-400/50 hover:bg-cyan-950/90"
                      >
                        <ZoomIn className="h-4 w-4" aria-hidden />
                      </button>
                      {selected && (
                        <span className="pointer-events-none absolute left-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-red-500/95 text-white shadow-lg">
                          <Trash2 className="h-4 w-4" aria-hidden />
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2 border-t border-white/10 px-2.5 py-2">
                      <span
                        className={cn(
                          "text-xs font-semibold tabular-nums",
                          selected ? "text-red-300 line-through" : "text-gray-300",
                        )}
                      >
                        {ui.pageButton(page)}
                      </span>
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={selected}
                        aria-label={ui.removeCheckbox}
                        onClick={() => togglePage(page)}
                        disabled={processing}
                        className={cn(
                          "flex h-6 w-6 shrink-0 touch-manipulation items-center justify-center rounded-md border transition",
                          selected
                            ? "border-red-400 bg-red-500/90 text-white"
                            : "border-white/25 bg-gray-900 text-transparent hover:border-red-400/40",
                        )}
                      >
                        <Check className="h-3.5 w-3.5" aria-hidden strokeWidth={3} />
                      </button>
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
            onClick={() => requestAction(() => void runRemove(), "process")}
            className={cn(
              "inline-flex w-full touch-manipulation items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto",
            )}
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
            className={cn(
              "inline-flex w-full touch-manipulation items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto",
            )}
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
