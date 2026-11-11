"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FolderOpen,
  GripVertical,
  Loader2,
  Trash2,
  ZoomIn,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { PdfPagePreviewModal } from "@/components/pdf/PdfPagePreviewModal";
import { FileDropzone } from "@/components/tools/FileDropzone";
import { ToolShell } from "@/components/tools/ToolShell";
import { useI18n } from "@/i18n/context";
import { AD_ORGANIZE_TOOL_WATCH_MS } from "@/lib/ads/adsterra";
import { useProtectedGeneration } from "@/lib/bot-protection/use-protected-generation";
import { cn } from "@/lib/cn";
import { downloadBytes } from "@/lib/download";
import { buildOrganizedPdf, getPdfPageCount } from "@/lib/pdf/organize-pdf";
import { renderPdfPageDataUrl, renderPdfThumbnails } from "@/lib/pdf/pdfjs-client";
import { useRewardedAction } from "@/lib/use-rewarded-action";

const DRAG_MIME = "application/x-purepdf-organize-page";

function identityOrder(count: number) {
  return Array.from({ length: count }, (_, i) => i + 1);
}

export function OrganizePdfTool() {
  const { t } = useI18n();
  const { runProtected, ready } = useProtectedGeneration();
  const { requestAction, modal } = useRewardedAction("organize-pdf", {
    watchMs: AD_ORGANIZE_TOOL_WATCH_MS,
    autoContinueWhenReady: true,
  });

  const copy = t.tools["organize-pdf"];
  const ui = t.organizeUi;

  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [pageOrder, setPageOrder] = useState<number[]>([]);
  const [thumbnails, setThumbnails] = useState<Record<number, string>>({});
  const [thumbsLoading, setThumbsLoading] = useState(false);
  const [thumbProgress, setThumbProgress] = useState<{ current: number; total: number } | null>(
    null,
  );
  const thumbGenRef = useRef(0);
  const previewGenRef = useRef(0);
  const [draggingSource, setDraggingSource] = useState<number | null>(null);
  const [dropTarget, setDropTarget] = useState<number | null>(null);

  const [previewPage, setPreviewPage] = useState<number | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultReady, setResultReady] = useState(false);
  const resultRef = useRef<{ bytes: Uint8Array; filename: string } | null>(null);

  const hasChanges = useMemo(() => {
    if (!pageCount) return false;
    if (pageOrder.length !== pageCount) return true;
    return pageOrder.some((p, i) => p !== i + 1);
  }, [pageCount, pageOrder]);

  const resetResult = useCallback(() => {
    resultRef.current = null;
    setResultReady(false);
  }, []);

  const clearFile = useCallback(() => {
    thumbGenRef.current += 1;
    previewGenRef.current += 1;
    setFile(null);
    setPageCount(null);
    setPageOrder([]);
    setThumbnails({});
    setThumbsLoading(false);
    setThumbProgress(null);
    setPreviewPage(null);
    setPreviewSrc(null);
    setDraggingSource(null);
    setDropTarget(null);
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
      setThumbnails({});
      try {
        const count = await getPdfPageCount(pdf);
        setPageCount(count);
        setPageOrder(identityOrder(count));
      } catch {
        setError(copy.errors.failed);
        setFile(null);
        setPageCount(null);
        setPageOrder([]);
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

  const mutateOrder = useCallback(
    (mutate: (prev: number[]) => number[]) => {
      resetResult();
      setPageOrder((prev) => mutate(prev));
    },
    [resetResult],
  );

  const movePage = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (fromIndex === toIndex) return;
      mutateOrder((prev) => {
        const next = [...prev];
        const [item] = next.splice(fromIndex, 1);
        next.splice(toIndex, 0, item);
        return next;
      });
    },
    [mutateOrder],
  );

  const removePageFromOutput = useCallback(
    (sourcePage: number) => {
      mutateOrder((prev) => prev.filter((p) => p !== sourcePage));
    },
    [mutateOrder],
  );

  const resetOrder = useCallback(() => {
    if (!pageCount) return;
    mutateOrder(() => identityOrder(pageCount));
  }, [mutateOrder, pageCount]);

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

  const commitPosition = useCallback(
    (index: number, raw: string) => {
      const parsed = Number.parseInt(raw, 10);
      if (!Number.isFinite(parsed)) return;
      const target = Math.min(Math.max(1, parsed), pageOrder.length) - 1;
      movePage(index, target);
    },
    [movePage, pageOrder.length],
  );

  const runOrganize = useCallback(async () => {
    if (!file) return;
    if (pageOrder.length === 0) {
      setError(ui.errEmpty);
      return;
    }
    if (!hasChanges) {
      setError(ui.errNoChanges);
      return;
    }

    await runProtected(async () => {
      setProcessing(true);
      setError(null);
      resetResult();
      try {
        const bytes = await buildOrganizedPdf(file, pageOrder);
        const base = file.name.replace(/\.pdf$/i, "") || "document";
        resultRef.current = { bytes, filename: `${base}-organized.pdf` };
        setResultReady(true);
      } catch (cause) {
        if (cause instanceof Error && cause.message === "EMPTY") {
          setError(ui.errEmpty);
        } else {
          setError(cause instanceof Error ? cause.message || copy.errors.failed : copy.errors.failed);
        }
      } finally {
        setProcessing(false);
      }
    }, setError);
  }, [
    copy.errors.failed,
    file,
    hasChanges,
    pageOrder,
    resetResult,
    runProtected,
    ui.errEmpty,
    ui.errNoChanges,
  ]);

  const handleDownload = useCallback(async () => {
    const payload = resultRef.current;
    if (!payload) return;
    downloadBytes(payload.bytes, payload.filename);
  }, []);

  const canProcess =
    file && pageOrder.length > 0 && hasChanges && !thumbsLoading;

  return (
    <ToolShell toolId="organize-pdf" icon={FolderOpen}>
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
                    {t.splitUi.pagesInFile(pageCount)} · {ui.pagesRemaining(pageOrder.length)}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {hasChanges && (
                  <button
                    type="button"
                    onClick={resetOrder}
                    disabled={processing}
                    className="inline-flex touch-manipulation items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-xs font-medium text-cyan-100 transition hover:bg-cyan-500/20 disabled:opacity-40"
                  >
                    {ui.resetOrder}
                  </button>
                )}
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
            </div>

            <p className="mt-4 text-xs leading-relaxed text-gray-400 sm:text-sm">
              {ui.workspaceHint}
            </p>
            <p className="mt-2 text-[11px] text-gray-500 sm:text-xs">{ui.dragHint}</p>

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
              {pageOrder.map((sourcePage, index) => {
                const src = thumbnails[sourcePage];
                const isDragging = draggingSource === sourcePage;
                const isDropHover = dropTarget === sourcePage && draggingSource != null;
                return (
                  <motion.div
                    key={sourcePage}
                    layout
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    onDragOver={(event) => {
                      event.preventDefault();
                      if (draggingSource == null || draggingSource === sourcePage) return;
                      setDropTarget(sourcePage);
                    }}
                    onDragLeave={() => {
                      if (dropTarget === sourcePage) setDropTarget(null);
                    }}
                    onDrop={(event) => {
                      event.preventDefault();
                      const raw =
                        event.dataTransfer.getData(DRAG_MIME) ||
                        event.dataTransfer.getData("text/plain");
                      const fromPage = Number.parseInt(raw, 10);
                      if (!Number.isFinite(fromPage)) return;
                      const fromIndex = pageOrder.indexOf(fromPage);
                      const toIndex = index;
                      if (fromIndex >= 0) movePage(fromIndex, toIndex);
                      setDraggingSource(null);
                      setDropTarget(null);
                    }}
                    className={cn(
                      "relative min-w-0 overflow-hidden rounded-xl border bg-gray-950/80 transition-colors",
                      isDropHover
                        ? "border-cyan-400 ring-2 ring-cyan-500/40"
                        : "border-white/10",
                      isDragging && "opacity-60",
                    )}
                  >
                    <div className="flex items-center justify-between gap-2 border-b border-white/10 bg-gray-900/80 px-2 py-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wide text-cyan-300/90 sm:text-xs">
                        {ui.positionLabel(index + 1)}
                      </span>
                      <button
                        type="button"
                        draggable
                        aria-label={ui.dragHandle}
                        title={ui.dragHandle}
                        onDragStart={(event) => {
                          event.dataTransfer.setData(DRAG_MIME, String(sourcePage));
                          event.dataTransfer.setData("text/plain", String(sourcePage));
                          event.dataTransfer.effectAllowed = "move";
                          setDraggingSource(sourcePage);
                        }}
                        onDragEnd={() => {
                          setDraggingSource(null);
                          setDropTarget(null);
                        }}
                        className="flex h-8 w-8 touch-manipulation cursor-grab items-center justify-center rounded-lg text-gray-400 active:cursor-grabbing hover:bg-white/5 hover:text-cyan-200"
                      >
                        <GripVertical className="h-4 w-4" aria-hidden />
                      </button>
                    </div>

                    <div className="relative aspect-[3/4] w-full bg-gray-900">
                      {src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={src}
                          alt=""
                          className="h-full w-full object-contain object-center"
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
                        aria-label={`${ui.zoomPreview}. ${ui.sourcePageLabel(sourcePage)}`}
                        title={ui.zoomPreview}
                        onClick={() => openPagePreview(sourcePage)}
                        className="absolute right-2 top-2 z-10 flex h-9 w-9 touch-manipulation items-center justify-center rounded-lg border border-white/20 bg-black/75 text-cyan-100 shadow-lg transition hover:border-cyan-400/50 hover:bg-cyan-950/90"
                      >
                        <ZoomIn className="h-4 w-4" aria-hidden />
                      </button>
                    </div>

                    <div className="space-y-2 border-t border-white/10 px-2.5 py-2">
                      <p className="text-[11px] text-gray-400 sm:text-xs">
                        {ui.sourcePageLabel(sourcePage)}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          disabled={index === 0 || processing}
                          aria-label={`${ui.moveLeft}. ${ui.sourcePageLabel(sourcePage)}`}
                          title={ui.moveLeft}
                          onClick={() => movePage(index, index - 1)}
                          className="inline-flex h-9 flex-1 touch-manipulation items-center justify-center rounded-lg border border-white/10 bg-gray-900/80 text-gray-200 hover:border-cyan-500/30 disabled:opacity-30"
                        >
                          <ArrowLeft className="h-4 w-4" aria-hidden />
                        </button>
                        <label className="flex items-center gap-1 text-[10px] text-gray-400">
                          <span className="sr-only">{ui.moveToPosition}</span>
                          <span aria-hidden className="font-semibold text-gray-500">
                            {ui.moveToPosition}
                          </span>
                          <input
                            key={`pos-${sourcePage}-${index}`}
                            type="number"
                            min={1}
                            max={pageOrder.length}
                            defaultValue={index + 1}
                            disabled={processing}
                            aria-label={ui.positionInputAria(sourcePage)}
                            onBlur={(event) => commitPosition(index, event.target.value)}
                            className="w-12 rounded-md border border-white/15 bg-gray-950 px-1.5 py-1.5 text-center text-xs font-semibold text-white tabular-nums focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
                          />
                        </label>
                        <button
                          type="button"
                          disabled={index === pageOrder.length - 1 || processing}
                          aria-label={`${ui.moveRight}. ${ui.sourcePageLabel(sourcePage)}`}
                          title={ui.moveRight}
                          onClick={() => movePage(index, index + 1)}
                          className="inline-flex h-9 flex-1 touch-manipulation items-center justify-center rounded-lg border border-white/10 bg-gray-900/80 text-gray-200 hover:border-cyan-500/30 disabled:opacity-30"
                        >
                          <ArrowRight className="h-4 w-4" aria-hidden />
                        </button>
                        <button
                          type="button"
                          disabled={processing || pageOrder.length <= 1}
                          aria-label={ui.removePage(sourcePage)}
                          title={ui.removePage(sourcePage)}
                          onClick={() => removePageFromOutput(sourcePage)}
                          className="inline-flex h-9 w-9 shrink-0 touch-manipulation items-center justify-center rounded-lg border border-red-500/25 bg-red-500/10 text-red-200 hover:bg-red-500/20 disabled:opacity-30"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {pageCount != null && pageOrder.length === 0 && (
              <p className="mt-4 text-sm text-amber-200/90">{ui.errEmpty}</p>
            )}
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
            onClick={() => requestAction(() => void runOrganize(), "process")}
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
