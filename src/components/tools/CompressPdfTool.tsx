"use client";

import { Loader2, Minimize2, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { FileDropzone } from "@/components/tools/FileDropzone";
import { ToolShell } from "@/components/tools/ToolShell";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";
import { useProtectedGeneration } from "@/lib/bot-protection/use-protected-generation";
import { downloadBytes } from "@/lib/download";
import { useRewardedDownload } from "@/lib/use-rewarded-download";
import {
  compressPdfFile,
  type CompressLevel,
} from "@/lib/pdf/compress-pdf";

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function CompressPdfTool() {
  const { t } = useI18n();
  const { runProtected, ready } = useProtectedGeneration();
  const { requestDownload, modal } = useRewardedDownload("compress-pdf");
  const copy = t.tools["compress-pdf"];
  const [file, setFile] = useState<File | null>(null);
  const [level, setLevel] = useState<CompressLevel>("balanced");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultReady, setResultReady] = useState(false);
  const [result, setResult] = useState<{
    bytes: Uint8Array;
    originalSize: number;
    compressedSize: number;
  } | null>(null);

  const savings = useMemo(() => {
    if (!result) return null;
    const delta = result.originalSize - result.compressedSize;
    const percent =
      result.originalSize === 0
        ? 0
        : Math.round((delta / result.originalSize) * 100);
    return { delta, percent };
  }, [result]);

  const handleFile = useCallback(
    (files: File[]) => {
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
      setResult(null);
      setResultReady(false);
      setFile(pdf);
    },
    [copy.errors.invalid],
  );

  useEffect(() => {
    setResult(null);
    setResultReady(false);
  }, [level]);

  const handleCompress = useCallback(async () => {
    if (!file) return;
    await runProtected(async () => {
      setProcessing(true);
      setError(null);
      setResult(null);
      setResultReady(false);
      try {
        const bytes = await compressPdfFile(file, level);
        const payload = {
          bytes,
          originalSize: file.size,
          compressedSize: bytes.length,
        };
        setResult(payload);
        setResultReady(true);
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : copy.errors.failed);
      } finally {
        setProcessing(false);
      }
    }, setError);
  }, [copy.errors.failed, file, level, runProtected]);

  const performDownload = useCallback(async () => {
    if (!file || !result) return;
    const suffix =
      result.compressedSize < result.originalSize ? "compressed" : "optimized";
    downloadBytes(
      result.bytes,
      file.name.replace(/\.pdf$/i, "") + `-${suffix}.pdf`,
    );
  }, [file, result]);

  const handleRewardedDownload = useCallback(async () => {
    await runProtected(async () => {
      await performDownload();
    }, setError);
  }, [performDownload, runProtected]);

  return (
    <ToolShell toolId="compress-pdf" icon={Minimize2}>
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
          <section className="glass-card rounded-2xl p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-white">{file.name}</p>
                <p className="mt-1 text-xs text-gray-500">
                  Original size: {formatSize(file.size)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setResult(null);
                  setResultReady(false);
                }}
                className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-red-300"
                aria-label={`${t.common.remove} PDF`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5">
              <p className="text-xs uppercase tracking-wider text-gray-500">
                {t.toolsExtra.optimization}
              </p>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {(
                  [
                    {
                      id: "balanced" as const,
                      label: t.toolsExtra.compressBalanced,
                      hint: t.toolsExtra.compressBalancedHint,
                    },
                    {
                      id: "maximum" as const,
                      label: t.toolsExtra.compressMaximum,
                      hint: t.toolsExtra.compressMaximumHint,
                    },
                  ] as const
                ).map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setLevel(option.id)}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-left transition-colors",
                      level === option.id
                        ? "border-primary/50 bg-primary/10"
                        : "border-white/10 bg-surface/50 hover:border-white/20",
                    )}
                  >
                    <p className="text-sm font-medium text-white">
                      {option.label}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">{option.hint}</p>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {result && savings && (
          <section className="glass-card rounded-2xl p-4 sm:p-5">
            <p className="text-sm font-medium text-white">
              {t.toolsExtra.compressResult}
            </p>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-surface/60 p-3">
                <p className="text-xs text-gray-500">{t.common.before}</p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {formatSize(result.originalSize)}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-surface/60 p-3">
                <p className="text-xs text-gray-500">{t.common.after}</p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {formatSize(result.compressedSize)}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-surface/60 p-3">
                <p className="text-xs text-gray-500">{t.common.saved}</p>
                <p className="mt-1 text-sm font-semibold text-accent">
                  {savings.percent > 0
                    ? `${savings.percent}%`
                    : t.common.minimalChange}
                </p>
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
            disabled={processing || !file || !ready}
            onClick={() => void handleCompress()}
            className={cn(
              "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-primary/40 sm:w-auto",
            )}
          >
            {processing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                {t.common.optimizing}
              </>
            ) : (
              copy.processAction
            )}
          </button>
          <button
            type="button"
            disabled={processing || !resultReady || !ready}
            onClick={() => requestDownload(handleRewardedDownload)}
            className={cn(
              "inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto",
            )}
          >
            {t.common.downloadReadyPdf}
          </button>
        </div>
        {modal}
      </div>
    </ToolShell>
  );
}
