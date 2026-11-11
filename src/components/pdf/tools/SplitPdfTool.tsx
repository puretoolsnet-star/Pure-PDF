"use client";

import { CheckCircle2, Loader2, Scissors, Trash2, ZoomIn } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { PdfPagePreviewModal } from "@/components/pdf/PdfPagePreviewModal";
import { FileDropzone } from "@/components/tools/FileDropzone";
import { ToolShell } from "@/components/tools/ToolShell";
import { useI18n } from "@/i18n/context";
import { AD_SPLIT_TOOL_WATCH_MS } from "@/lib/ads/adsterra";
import { useProtectedGeneration } from "@/lib/bot-protection/use-protected-generation";
import { cn } from "@/lib/cn";
import { downloadBytes, downloadZip } from "@/lib/download";
import { renderPdfPageDataUrl, renderPdfThumbnails } from "@/lib/pdf/pdfjs-client";
import {
  extractPdfPages,
  getPdfPageCount,
  splitPdfIntoAllPages,
  splitPdfPageRange,
} from "@/lib/pdf/split-pdf";
import { useRewardedAction } from "@/lib/use-rewarded-action";

type SplitMode = "all" | "range" | "pick";

type SplitResult =
  | { kind: "single"; bytes: Uint8Array; filename: string }
  | { kind: "zip"; entries: { path: string; data: Uint8Array }[]; filename: string };

function clampPageInputs(pageCount: number, from: number, to: number) {
  const f = Math.min(Math.max(1, from), pageCount);
  const t = Math.min(Math.max(1, to), pageCount);
  return f <= t ? { from: f, to: t } : { from: t, to: f };
}

export function SplitPdfTool() {
  const { t } = useI18n();
  const { runProtected, ready } = useProtectedGeneration();
  const { requestAction, modal } = useRewardedAction("split-pdf", {
    watchMs: AD_SPLIT_TOOL_WATCH_MS,
    autoContinueWhenReady: true,
  });

  const copy = t.tools["split-pdf"];
  const ui = t.splitUi;

  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [mode, setMode] = useState<SplitMode>("range");
  const [fromPage, setFromPage] = useState(1);
  const [toPage, setToPage] = useState(1);
  const [picked, setPicked] = useState<Set<number>>(() => new Set());
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
  const resultRef = useRef<SplitResult | null>(null);

  const pageNumbers = useMemo(() => {
    if (!pageCount) return [];
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }, [pageCount]);

  const normalizedRange = useMemo(() => {
    if (!pageCount) return { from: 1, to: 1 };
    return clampPageInputs(pageCount, fromPage, toPage);
  }, [fromPage, pageCount, toPage]);

  const resetResult = useCallback(() => {
    resultRef.current = null;
    setResultReady(false);
  }, []);

  const clearFile = useCallback(() => {
    thumbGenRef.current += 1;
    setFile(null);
    setPageCount(null);
    setFromPage(1);
    setToPage(1);
    setPicked(new Set());
    setThumbnails({});
    setThumbsLoading(false);
    setThumbProgress(null);
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
      setPicked(new Set());
      setThumbnails({});
      try {
        const count = await getPdfPageCount(pdf);
        setPageCount(count);
        setFromPage(1);
        setToPage(count);
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

  const togglePick = useCallback(
    (page: number) => {
      if (mode !== "pick") return;
      resetResult();
      setPicked((prev) => {
        const next = new Set(prev);
        if (next.has(page)) next.delete(page);
        else next.add(page);
        return next;
      });
    },
    [mode, resetResult],
  );

  const clearPicked = useCallback(() => {
    resetResult();
    setPicked(new Set());
  }, [resetResult]);

  const handleThumbClick = useCallback(
    (page: number) => {
      if (mode === "pick") {
        togglePick(page);
        return;
      }
      if (mode === "range") {
        resetResult();
        setFromPage(page);
        setToPage(page);
      }
    },
    [mode, resetResult, togglePick],
  );

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

  const isPageHighlighted = useCallback(
    (page: number) => {
      if (mode === "range") {
        return page >= normalizedRange.from && page <= normalizedRange.to;
      }
      if (mode === "pick") {
        return picked.has(page);
      }
      return false;
    },
    [mode, normalizedRange.from, normalizedRange.to, picked],
  );

  const runSplit = useCallback(async () => {
    if (!file || !pageCount) return;

    if (mode === "pick" && picked.size === 0) {
      setError(ui.errNonePicked);
      return;
    }

    await runProtected(async () => {
      setProcessing(true);
      setError(null);
      resetResult();
      try {
        const base = file.name.replace(/\.pdf$/i, "") || "document";
        if (mode === "all") {
          const entries = await splitPdfIntoAllPages(file);
          resultRef.current = {
            kind: "zip",
            entries,
            filename: `${base}-split.zip`,
          };
        } else if (mode === "range") {
          const { from, to } = normalizedRange;
          const bytes = await splitPdfPageRange(file, from, to);
          resultRef.current = {
            kind: "single",
            bytes,
            filename: `${base}-pages-${from}-${to}.pdf`,
          };
        } else {
          const pages = [...picked].sort((a, b) => a - b);
          const bytes = await extractPdfPages(file, pages);
          const label = pages.join("-");
          resultRef.current = {
            kind: "single",
            bytes,
            filename: `${base}-pages-${label}.pdf`,
          };
        }
        setResultReady(true);
      } catch (cause) {
        if (cause instanceof Error) {
          if (cause.message === "INVALID_RANGE") setError(ui.invalidRange);
          else if (cause.message === "NONE_SELECTED") setError(ui.errNonePicked);
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
    mode,
    normalizedRange,
    pageCount,
    picked,
    resetResult,
    runProtected,
    ui.errNonePicked,
    ui.invalidRange,
  ]);

  const handleDownload = useCallback(async () => {
    const payload = resultRef.current;
    if (!payload) return;
    if (payload.kind === "zip") {
      downloadZip(payload.entries, payload.filename);
    } else {
      downloadBytes(payload.bytes, payload.filename);
    }
  }, []);

  const canSplit =
    file &&
    pageCount &&
    pageCount > 0 &&
    !thumbsLoading &&
    (mode === "all" ||
      (mode === "range" &&
        normalizedRange.from >= 1 &&
        normalizedRange.to <= pageCount) ||
      (mode === "pick" && picked.size > 0));

  const thumbAria = (page: number) => {
    if (mode === "pick") return ui.togglePick(page);
    if (mode === "range") return ui.pageInRange(page);
    return ui.pageInRange(page);
  };

  return (
    <ToolShell toolId="split-pdf" icon={Scissors}>
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
                    {ui.pagesInFile(pageCount)}
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

            <fieldset className="mt-5 min-w-0">
              <legend className="sr-only">{copy.action}</legend>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {(
                  [
                    ["all", ui.modeAll, ui.modeAllHint],
                    ["range", ui.modeRange, ui.modeRangeHint],
                    ["pick", ui.modePick, ui.modePickHint],
                  ] as const
                ).map(([id, title, hint]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setMode(id);
                      resetResult();
                    }}
                    className={cn(
                      "touch-manipulation rounded-xl border p-3 text-left transition",
                      mode === id
                        ? "border-cyan-500/40 bg-cyan-500/10"
                        : "border-white/10 bg-black/20 hover:border-white/20",
                    )}
                  >
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="mt-1 text-xs text-gray-400">{hint}</p>
                  </button>
                ))}
              </div>
            </fieldset>

            {mode === "range" && pageCount != null && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <label className="flex min-w-0 flex-col gap-1.5">
                  <span className="text-xs font-medium text-gray-400">{ui.fromPage}</span>
                  <input
                    type="number"
                    min={1}
                    max={pageCount}
                    value={fromPage}
                    onChange={(e) => {
                      resetResult();
                      setFromPage(Number(e.target.value));
                    }}
                    className="w-full min-w-0 rounded-lg border border-white/10 bg-gray-950/80 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500/50"
                  />
                </label>
                <label className="flex min-w-0 flex-col gap-1.5">
                  <span className="text-xs font-medium text-gray-400">{ui.toPage}</span>
                  <input
                    type="number"
                    min={1}
                    max={pageCount}
                    value={toPage}
                    onChange={(e) => {
                      resetResult();
                      setToPage(Number(e.target.value));
                    }}
                    className="w-full min-w-0 rounded-lg border border-white/10 bg-gray-950/80 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500/50"
                  />
                </label>
              </div>
            )}

            {mode === "pick" && (
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-medium text-cyan-200/90">
                  {ui.pagesPicked(picked.size)}
                </p>
                {picked.size > 0 && (
                  <button
                    type="button"
                    onClick={clearPicked}
                    className="text-xs font-medium text-cyan-300/90 hover:text-cyan-200"
                  >
                    {ui.clearPick}
                  </button>
                )}
              </div>
            )}

            <p className="mt-4 text-xs text-gray-400 sm:text-sm">{ui.previewHint}</p>

            {thumbsLoading && (
              <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
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
                const highlighted = isPageHighlighted(page);
                const src = thumbnails[page];
                const interactive = mode !== "all";
                return (
                  <div
                    key={page}
                    className={cn(
                      "relative min-w-0 overflow-hidden rounded-xl border bg-gray-950/80 transition",
                      highlighted
                        ? "border-cyan-500/70 ring-2 ring-cyan-500/35"
                        : "border-white/10",
                    )}
                  >
                    <button
                      type="button"
                      aria-pressed={mode === "pick" ? picked.has(page) : undefined}
                      aria-label={thumbAria(page)}
                      disabled={!interactive || processing}
                      onClick={() => handleThumbClick(page)}
                      className={cn(
                        "relative flex w-full min-w-0 flex-col text-left",
                        interactive
                          ? "touch-manipulation cursor-pointer hover:bg-white/[0.03]"
                          : "cursor-default",
                      )}
                    >
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
                          <div className="flex h-full items-center justify-center">
                            <Loader2 className="h-7 w-7 animate-spin text-gray-600" aria-hidden />
                          </div>
                        )}
                        <span className="absolute bottom-2 left-2 rounded-md bg-black/70 px-2 py-0.5 text-xs font-bold tabular-nums text-gray-100">
                          {page}
                        </span>
                      </div>
                    </button>
                    <button
                      type="button"
                      aria-label={`${ui.zoomPreview}. ${ui.pageInRange(page)}`}
                      title={ui.zoomPreview}
                      onClick={(event) => {
                        event.stopPropagation();
                        openPagePreview(page);
                      }}
                      className="absolute right-2 top-2 flex h-9 w-9 touch-manipulation items-center justify-center rounded-lg border border-white/20 bg-black/75 text-cyan-100 shadow-lg transition hover:border-cyan-400/50 hover:bg-cyan-950/90"
                    >
                      <ZoomIn className="h-4 w-4" aria-hidden />
                    </button>
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
            disabled={!canSplit || processing || !ready}
            onClick={() => requestAction(() => void runSplit(), "process")}
            className={cn(
              "inline-flex w-full touch-manipulation items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto",
            )}
          >
            {processing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                {ui.processingSplit}
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
            {resultRef.current?.kind === "zip"
              ? t.common.downloadReadyZip
              : t.common.downloadReadyPdf}
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
