"use client";

import { FileImage, Loader2, Trash2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { FileDropzone } from "@/components/tools/FileDropzone";
import { ToolShell } from "@/components/tools/ToolShell";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";
import { useProtectedGeneration } from "@/lib/bot-protection/use-protected-generation";
import { useRewardedDownload } from "@/lib/use-rewarded-download";
import { downloadZip } from "@/lib/download";
import {
  openPdfDocument,
  renderPdfPagesToImages,
  type ImageExportFormat,
} from "@/lib/pdf/pdfjs-client";

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

export function PdfToImgTool() {
  const { t } = useI18n();
  const { runProtected, ready } = useProtectedGeneration();
  const { requestDownload, modal } = useRewardedDownload("pdf-to-images");
  const copy = t.tools["pdf-to-images"];
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [format, setFormat] = useState<ImageExportFormat>("png");
  const [quality, setQuality] = useState(0.92);
  const [scale, setScale] = useState(1.5);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [exportReady, setExportReady] = useState(false);
  const zipPayloadRef = useRef<{
    entries: { path: string; data: Uint8Array }[];
    zipName: string;
  } | null>(null);

  const previewUrlsRef = useRef(previewUrls);

  useEffect(() => {
    previewUrlsRef.current = previewUrls;
  }, [previewUrls]);

  useEffect(() => {
    return () => {
      for (const url of previewUrlsRef.current) {
        URL.revokeObjectURL(url);
      }
    };
  }, []);

  const resetPreviews = useCallback(() => {
    setPreviewUrls((current) => {
      for (const url of current) URL.revokeObjectURL(url);
      return [];
    });
  }, []);

  useEffect(() => {
    setExportReady(false);
    zipPayloadRef.current = null;
    resetPreviews();
  }, [format, quality, resetPreviews, scale]);

  const handleFile = useCallback(
    async (files: File[]) => {
      const pdf = files.find(
        (item) =>
          item.type === "application/pdf" ||
          item.name.toLowerCase().endsWith(".pdf"),
      );
      if (!pdf) {
        setError(copy.errors.invalid);
        return;
      }

      setError(null);
      resetPreviews();
      setExportReady(false);
      zipPayloadRef.current = null;
      setFile(pdf);

      try {
        const doc = await openPdfDocument(pdf);
        setPageCount(doc.numPages);
        await doc.destroy();
      } catch {
        setPageCount(null);
        setError(copy.errors.failed);
      }
    },
    [copy.errors.failed, copy.errors.invalid, resetPreviews],
  );

  const handleExport = useCallback(async () => {
    if (!file) return;
    await runProtected(async () => {
      setProcessing(true);
      setError(null);
      setProgress(null);
      setExportReady(false);
      zipPayloadRef.current = null;
      resetPreviews();

      try {
        const images = await renderPdfPagesToImages({
          file,
          format,
          quality,
          scale,
          onProgress: (current, total) => {
            setProgress(t.toolsExtra.renderingPage(current, total));
          },
        });

        const zipName = `${file.name.replace(/\.pdf$/i, "") || "document"}-pages.zip`;
        const entries = images.map((image) => ({
          path: image.filename,
          data: image.bytes,
        }));
        zipPayloadRef.current = { entries, zipName };

        const urls = images.slice(0, 6).map((image) => {
          const mime = format === "jpeg" ? "image/jpeg" : "image/png";
          return URL.createObjectURL(new Blob([image.bytes as BlobPart], { type: mime }));
        });
        setPreviewUrls(urls);
        setProgress(t.toolsExtra.exportedPages(images.length));
        setExportReady(true);
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : copy.errors.failed);
      } finally {
        setProcessing(false);
      }
    }, setError);
  }, [
    copy.errors.failed,
    file,
    format,
    quality,
    resetPreviews,
    runProtected,
    scale,
    t.toolsExtra,
  ]);

  const performDownload = useCallback(async () => {
    const payload = zipPayloadRef.current;
    if (!payload) return;
    downloadZip(payload.entries, payload.zipName);
  }, []);

  const handleRewardedDownload = useCallback(async () => {
    await runProtected(async () => {
      await performDownload();
    }, setError);
  }, [performDownload, runProtected]);

  return (
    <ToolShell toolId="pdf-to-images" icon={FileImage}>
      <div className="space-y-6">
        <FileDropzone
          accept="application/pdf,.pdf"
          multiple={false}
          title={t.common.dropzoneTitle}
          hint={copy.hint}
          onFiles={handleFile}
          disabled={processing}
        />

        {file && (
          <section className="glass-card space-y-5 rounded-2xl p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-white">{file.name}</p>
                <p className="mt-1 text-xs text-gray-500">
                  {formatSize(file.size)}
                  {pageCount !== null
                    ? ` · ${t.toolsExtra.pagesCount(pageCount)}`
                    : ""}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setPageCount(null);
                  setExportReady(false);
                  zipPayloadRef.current = null;
                  resetPreviews();
                }}
                className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-red-300"
                aria-label={`${t.common.remove} PDF`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500">
                {t.toolsExtra.formatLabel}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {(["png", "jpeg"] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFormat(value)}
                    className={cn(
                      "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                      format === value
                        ? "bg-primary text-white"
                        : "bg-surface/70 text-gray-300 hover:bg-surface-hover",
                    )}
                  >
                    {value.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-gray-500">
                {t.toolsExtra.scaleLabel(scale)}
              </label>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={scale}
                onChange={(event) => setScale(Number(event.target.value))}
                className="mt-3 w-full accent-primary"
              />
            </div>

            {format === "jpeg" && (
              <div>
                <label className="text-xs uppercase tracking-wider text-gray-500">
                  {t.toolsExtra.qualityLabel(Math.round(quality * 100))}
                </label>
                <input
                  type="range"
                  min={0.6}
                  max={0.98}
                  step={0.02}
                  value={quality}
                  onChange={(event) => setQuality(Number(event.target.value))}
                  className="mt-3 w-full accent-primary"
                />
              </div>
            )}
          </section>
        )}

        {previewUrls.length > 0 && (
          <section className="glass-card rounded-2xl p-4 sm:p-5">
            <p className="text-sm font-medium text-white">{t.toolsExtra.preview}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {previewUrls.map((url, index) => (
                <div
                  key={url}
                  className="overflow-hidden rounded-xl border border-white/10 bg-surface/60"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={t.toolsExtra.pageLabel(index + 1)}
                    className="aspect-[3/4] w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {progress && !error && (
          <p className="text-sm text-gray-400">{progress}</p>
        )}

        {error && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <button
            type="button"
            disabled={processing || !file || !ready}
            onClick={() => void handleExport()}
            className={cn(
              "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-primary/40 sm:w-auto",
            )}
          >
            {processing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                {t.common.exporting}
              </>
            ) : (
              copy.processAction
            )}
          </button>
          <button
            type="button"
            disabled={processing || !exportReady || !ready}
            onClick={() => requestDownload(handleRewardedDownload)}
            className={cn(
              "inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto",
            )}
          >
            {t.common.downloadReadyZip}
          </button>
        </div>
        {modal}
      </div>
    </ToolShell>
  );
}
