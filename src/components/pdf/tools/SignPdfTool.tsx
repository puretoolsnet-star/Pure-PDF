"use client";

import {
  CheckCircle2,
  Eraser,
  FileSignature,
  Loader2,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { SignaturePad, type SignaturePadHandle } from "@/components/pdf/SignaturePad";
import { FileDropzone } from "@/components/tools/FileDropzone";
import { ToolShell } from "@/components/tools/ToolShell";
import { useI18n } from "@/i18n/context";
import { SIGN_STROKE_COLORS } from "@/i18n/sign-tool-ui";
import { AD_SIGN_TOOL_WATCH_MS } from "@/lib/ads/adsterra";
import { useProtectedGeneration } from "@/lib/bot-protection/use-protected-generation";
import { cn } from "@/lib/cn";
import { downloadBytes } from "@/lib/download";
import { renderPdfThumbnails } from "@/lib/pdf/pdfjs-client";
import {
  applySignatureToPdf,
  getPdfPageCount,
  type SignHorizontal,
} from "@/lib/pdf/sign-pdf";
import { useRewardedAction } from "@/lib/use-rewarded-action";

type SignMode = "draw" | "text";
type ColorKey = keyof typeof SIGN_STROKE_COLORS;

export function SignPdfTool() {
  const { t } = useI18n();
  const { runProtected, ready } = useProtectedGeneration();
  const { requestAction, modal } = useRewardedAction("sign-pdf", {
    watchMs: AD_SIGN_TOOL_WATCH_MS,
    autoContinueWhenReady: true,
  });

  const copy = t.tools["sign-pdf"];
  const ui = t.signUi;

  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [selectedPage, setSelectedPage] = useState(1);
  const [thumbnails, setThumbnails] = useState<Record<number, string>>({});
  const [thumbsLoading, setThumbsLoading] = useState(false);
  const [thumbProgress, setThumbProgress] = useState<{ current: number; total: number } | null>(
    null,
  );
  const thumbGenRef = useRef(0);

  const [mode, setMode] = useState<SignMode>("draw");
  const [textSignature, setTextSignature] = useState("");
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [colorKey, setColorKey] = useState<ColorKey>("cyan");
  const [horizontal, setHorizontal] = useState<SignHorizontal>("center");
  const [marginBottom, setMarginBottom] = useState(10);
  const [signatureSize, setSignatureSize] = useState(38);
  const [hasSignature, setHasSignature] = useState(false);

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultReady, setResultReady] = useState(false);
  const resultRef = useRef<{ bytes: Uint8Array; filename: string } | null>(null);

  const padRef = useRef<SignaturePadHandle>(null);
  const strokeColor = SIGN_STROKE_COLORS[colorKey];

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
    setFile(null);
    setPageCount(null);
    setSelectedPage(1);
    setThumbnails({});
    setThumbsLoading(false);
    setThumbProgress(null);
    setTextSignature("");
    setHasSignature(false);
    padRef.current?.clear();
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
      setTextSignature("");
      setHasSignature(false);
      padRef.current?.clear();
      setFile(pdf);
      setThumbnails({});
      try {
        const count = await getPdfPageCount(pdf);
        setPageCount(count);
        setSelectedPage(1);
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

  useEffect(() => {
    if (mode !== "text") return;
    padRef.current?.renderText(textSignature, strokeColor);
    setHasSignature(Boolean(textSignature.trim()));
  }, [mode, strokeColor, textSignature]);

  const clearSignature = useCallback(() => {
    padRef.current?.clear();
    setTextSignature("");
    setHasSignature(false);
    resetResult();
  }, [resetResult]);

  const switchMode = useCallback(
    (next: SignMode) => {
      setMode(next);
      padRef.current?.clear();
      setTextSignature("");
      setHasSignature(false);
      resetResult();
    },
    [resetResult],
  );

  const runSign = useCallback(async () => {
    if (!file) return;
    if (!selectedPage) {
      setError(ui.errNoPage);
      return;
    }
    const pad = padRef.current;
    if (!pad || pad.isEmpty()) {
      setError(ui.errNoSignature);
      return;
    }

    await runProtected(async () => {
      setProcessing(true);
      setError(null);
      resetResult();
      try {
        const png = await pad.exportPng();
        const bytes = await applySignatureToPdf(file, selectedPage, png, {
          horizontal,
          marginBottomRatio: marginBottom / 100,
          widthRatio: signatureSize / 100,
        });
        const base = file.name.replace(/\.pdf$/i, "") || "document";
        resultRef.current = { bytes, filename: `${base}-signed.pdf` };
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
    horizontal,
    marginBottom,
    resetResult,
    runProtected,
    selectedPage,
    signatureSize,
    ui.errNoPage,
    ui.errNoSignature,
  ]);

  const handleDownload = useCallback(async () => {
    const payload = resultRef.current;
    if (!payload) return;
    downloadBytes(payload.bytes, payload.filename);
  }, []);

  const canProcess = file && selectedPage && hasSignature && !thumbsLoading;

  return (
    <ToolShell toolId="sign-pdf" icon={FileSignature}>
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
          <>
            <section className="glass-card min-w-0 rounded-2xl border border-white/10 p-4 sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">{file.name}</p>
                  {pageCount != null && (
                    <p className="mt-1 text-xs text-cyan-300/80">
                      {ui.selectedPage(selectedPage)} · {t.splitUi.pagesInFile(pageCount)}
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
                {ui.workspaceHint}
              </p>
              <p className="mt-2 text-[11px] text-gray-500 sm:text-xs">{ui.selectPageHint}</p>

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

              <div className="mt-4 grid grid-cols-2 gap-3 min-[420px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {pageNumbers.map((page) => {
                  const src = thumbnails[page];
                  const active = page === selectedPage;
                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() => {
                        setSelectedPage(page);
                        resetResult();
                      }}
                      className={cn(
                        "overflow-hidden rounded-xl border bg-gray-950/80 text-left transition",
                        active
                          ? "border-cyan-500/70 ring-2 ring-cyan-500/30"
                          : "border-white/10 hover:border-cyan-500/30",
                      )}
                    >
                      <div className="aspect-[3/4] w-full bg-gray-900">
                        {src ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={src}
                            alt=""
                            className="h-full w-full object-contain"
                            loading="lazy"
                          />
                        ) : (
                          <span className="flex h-full items-center justify-center">
                            <Loader2 className="h-6 w-6 animate-spin text-gray-600" aria-hidden />
                          </span>
                        )}
                      </div>
                      <p className="border-t border-white/10 px-2 py-1 text-center text-[10px] font-semibold text-gray-300">
                        {page}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="glass-card rounded-2xl border border-white/10 p-4 sm:p-5">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => switchMode("draw")}
                  className={cn(
                    "rounded-lg px-3 py-2 text-xs font-semibold transition",
                    mode === "draw"
                      ? "bg-cyan-600 text-white"
                      : "border border-white/10 text-gray-300 hover:bg-white/5",
                  )}
                >
                  {ui.modeDraw}
                </button>
                <button
                  type="button"
                  onClick={() => switchMode("text")}
                  className={cn(
                    "rounded-lg px-3 py-2 text-xs font-semibold transition",
                    mode === "text"
                      ? "bg-cyan-600 text-white"
                      : "border border-white/10 text-gray-300 hover:bg-white/5",
                  )}
                >
                  {ui.modeText}
                </button>
                <button
                  type="button"
                  onClick={clearSignature}
                  className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-gray-200 hover:bg-white/5"
                >
                  <Eraser className="h-3.5 w-3.5" aria-hidden />
                  {ui.clearSignature}
                </button>
              </div>

              {mode === "text" && (
                <label className="mt-4 block">
                  <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    {ui.textSignatureLabel}
                  </span>
                  <input
                    type="text"
                    value={textSignature}
                    onChange={(e) => {
                      setTextSignature(e.target.value);
                      resetResult();
                    }}
                    placeholder={ui.textSignaturePlaceholder}
                    className="mt-2 w-full rounded-xl border border-white/15 bg-gray-950/80 px-4 py-3 text-base text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  />
                </label>
              )}

              <SignToolControls
                ui={ui}
                strokeWidth={strokeWidth}
                setStrokeWidth={setStrokeWidth}
                colorKey={colorKey}
                setColorKey={setColorKey}
                horizontal={horizontal}
                setHorizontal={setHorizontal}
                marginBottom={marginBottom}
                setMarginBottom={setMarginBottom}
                signatureSize={signatureSize}
                setSignatureSize={setSignatureSize}
                resetResult={resetResult}
              />

              <div className="mt-4 overflow-hidden rounded-xl border border-dashed border-cyan-500/35 bg-gray-950/60">
                <SignaturePad
                  ref={padRef}
                  strokeColor={strokeColor}
                  strokeWidth={strokeWidth}
                  readOnly={mode === "text"}
                  ariaLabel={ui.signaturePadLabel}
                  className={cn(
                    "block w-full",
                    mode === "draw" ? "cursor-crosshair" : "pointer-events-none",
                  )}
                  onChange={() => {
                    setHasSignature(!padRef.current?.isEmpty());
                    resetResult();
                  }}
                />
              </div>
            </section>
          </>
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
            onClick={() => requestAction(() => void runSign(), "process")}
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
      </div>
    </ToolShell>
  );
}

function SignToolControls(props: {
  ui: (typeof import("@/i18n/sign-tool-ui").SIGN_TOOL_UI)["uk"];
  strokeWidth: number;
  setStrokeWidth: (v: number) => void;
  colorKey: ColorKey;
  setColorKey: (v: ColorKey) => void;
  horizontal: SignHorizontal;
  setHorizontal: (v: SignHorizontal) => void;
  marginBottom: number;
  setMarginBottom: (v: number) => void;
  signatureSize: number;
  setSignatureSize: (v: number) => void;
  resetResult: () => void;
}) {
  const {
    ui,
    strokeWidth,
    setStrokeWidth,
    colorKey,
    setColorKey,
    horizontal,
    setHorizontal,
    marginBottom,
    setMarginBottom,
    signatureSize,
    setSignatureSize,
    resetResult,
  } = props;

  const chip =
    "rounded-lg border px-2.5 py-1.5 text-xs font-medium transition touch-manipulation";

  return (
    <div className="mt-4 space-y-4">
      <div>
        <p className="text-xs font-medium text-gray-400">{ui.strokeWidth}</p>
        <div className="mt-2 flex gap-2">
          {[2, 3, 5].map((w) => (
            <button
              key={w}
              type="button"
              onClick={() => setStrokeWidth(w)}
              className={cn(
                chip,
                strokeWidth === w
                  ? "border-cyan-500/60 bg-cyan-500/15 text-cyan-100"
                  : "border-white/10 text-gray-300 hover:bg-white/5",
              )}
            >
              {w}px
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-gray-400">{ui.strokeColor}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {(
            [
              ["cyan", ui.colorCyan, SIGN_STROKE_COLORS.cyan],
              ["white", ui.colorWhite, SIGN_STROKE_COLORS.white],
              ["ink", ui.colorInk, SIGN_STROKE_COLORS.ink],
            ] as const
          ).map(([key, label, swatch]) => (
            <button
              key={key}
              type="button"
              onClick={() => setColorKey(key)}
              className={cn(
                chip,
                "inline-flex items-center gap-2",
                colorKey === key
                  ? "border-cyan-500/60 bg-cyan-500/15 text-cyan-100"
                  : "border-white/10 text-gray-300",
              )}
            >
              <span
                className="h-4 w-4 rounded-full border border-white/20"
                style={{ backgroundColor: swatch }}
                aria-hidden
              />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-gray-400">{ui.placementTitle}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {(
            [
              ["left", ui.placementLeft],
              ["center", ui.placementCenter],
              ["right", ui.placementRight],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                setHorizontal(key);
                resetResult();
              }}
              className={cn(
                chip,
                horizontal === key
                  ? "border-cyan-500/60 bg-cyan-500/15 text-cyan-100"
                  : "border-white/10 text-gray-300",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-xs text-gray-400">
          {ui.marginBottom}: {marginBottom}%
          <input
            type="range"
            min={5}
            max={28}
            value={marginBottom}
            onChange={(e) => {
              setMarginBottom(Number(e.target.value));
              resetResult();
            }}
            className="mt-2 w-full accent-cyan-500"
          />
        </label>
        <label className="block text-xs text-gray-400">
          {ui.signatureSize}: {signatureSize}%
          <input
            type="range"
            min={22}
            max={50}
            value={signatureSize}
            onChange={(e) => {
              setSignatureSize(Number(e.target.value));
              resetResult();
            }}
            className="mt-2 w-full accent-cyan-500"
          />
        </label>
      </div>
    </div>
  );
}
