"use client";

import { FileText, Loader2, Trash2 } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { FileDropzone } from "@/components/tools/FileDropzone";
import { ToolShell } from "@/components/tools/ToolShell";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";
import { useProtectedGeneration } from "@/lib/bot-protection/use-protected-generation";
import { downloadBytes } from "@/lib/download";
import { useRewardedAction } from "@/lib/use-rewarded-action";
import { convertDocxToPdf, previewDocx } from "@/lib/pdf/word-to-pdf";

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function WordToPdfTool() {
  const { t } = useI18n();
  const { runProtected, ready } = useProtectedGeneration();
  const { requestAction, modal } = useRewardedAction("word-to-pdf");
  const copy = t.tools["word-to-pdf"];
  const [file, setFile] = useState<File | null>(null);
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pdfReady, setPdfReady] = useState(false);
  const pdfBytesRef = useRef<Uint8Array | null>(null);

  const handleFile = useCallback(async (files: File[]) => {
    const docx = files.find((item) => {
      const lower = item.name.toLowerCase();
      return (
        lower.endsWith(".docx") ||
        item.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );
    });

    if (!docx) {
      setError(copy.errors.invalid);
      return;
    }

    setError(null);
    pdfBytesRef.current = null;
    setPdfReady(false);
    setFile(docx);
    setLoadingPreview(true);
    setPreviewHtml(null);
    setWarnings([]);

    try {
      const preview = await previewDocx(docx);
      setPreviewHtml(preview.html);
      setWarnings(preview.warnings);
    } catch {
      setError(copy.errors.failed);
      pdfBytesRef.current = null;
      setPdfReady(false);
      setFile(null);
    } finally {
      setLoadingPreview(false);
    }
  }, [copy.errors.failed, copy.errors.invalid]);

  const handleConvert = useCallback(async () => {
    if (!file) return;
    await runProtected(async () => {
      setProcessing(true);
      setError(null);
      pdfBytesRef.current = null;
      setPdfReady(false);
      try {
        const pdfBytes = await convertDocxToPdf(file);
        pdfBytesRef.current = pdfBytes;
        setPdfReady(true);
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : copy.errors.failed);
      } finally {
        setProcessing(false);
      }
    }, setError);
  }, [copy.errors.failed, file, runProtected]);

  const performDownload = useCallback(async () => {
    const bytes = pdfBytesRef.current;
    if (!file || !bytes) return;
    downloadBytes(bytes, file.name.replace(/\.docx$/i, "") + ".pdf");
  }, [file]);

  const handleRewardedDownload = useCallback(async () => {
    await runProtected(async () => {
      await performDownload();
    }, setError);
  }, [performDownload, runProtected]);

  return (
    <ToolShell toolId="word-to-pdf" icon={FileText}>
      <div className="space-y-6">
        <FileDropzone
          accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          multiple={false}
          title={t.common.dropzoneTitle}
          hint={copy.hint}
          onFiles={handleFile}
          disabled={processing || loadingPreview}
        />

        {file && (
          <section className="glass-card rounded-2xl p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-white">{file.name}</p>
                <p className="mt-1 text-xs text-gray-500">
                  {formatSize(file.size)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  pdfBytesRef.current = null;
                  setPdfReady(false);
                  setFile(null);
                  setPreviewHtml(null);
                  setWarnings([]);
                }}
                className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-red-300"
                aria-label={`${t.common.remove} document`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {loadingPreview && (
              <p className="mt-4 flex items-center gap-2 text-sm text-gray-400">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                {t.toolsExtra.preparingPreview}
              </p>
            )}

            {previewHtml && !loadingPreview && (
              <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-white">
                <div
                  className="max-h-[420px] overflow-y-auto p-6 text-gray-900 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-semibold [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-3 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-gray-300 [&_td]:p-2 [&_th]:border [&_th]:border-gray-300 [&_th]:p-2 [&_ul]:list-disc [&_ul]:pl-6"
                  dangerouslySetInnerHTML={{ __html: previewHtml }}
                />
              </div>
            )}

            {warnings.length > 0 && (
              <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                <p className="font-medium">{t.toolsExtra.conversionNotes}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-amber-100/90">
                  {warnings.slice(0, 4).map((warning) => (
                    <li key={warning}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}
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
            disabled={
              processing || !file || !previewHtml || loadingPreview || !ready
            }
            onClick={() => requestAction(() => void handleConvert(), "process")}
            className={cn(
              "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-primary/40 sm:w-auto",
            )}
          >
            {processing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                {t.common.converting}
              </>
            ) : (
              copy.processAction
            )}
          </button>
          <button
            type="button"
            disabled={processing || !pdfReady || !ready}
            onClick={() => requestAction(handleRewardedDownload, "download")}
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
