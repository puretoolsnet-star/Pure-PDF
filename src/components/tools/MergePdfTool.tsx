"use client";

import { GitMerge, Loader2, Trash2 } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { FileDropzone } from "@/components/tools/FileDropzone";
import { ToolShell } from "@/components/tools/ToolShell";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";
import { useProtectedGeneration } from "@/lib/bot-protection/use-protected-generation";
import { downloadBytes } from "@/lib/download";
import { useRewardedAction } from "@/lib/use-rewarded-action";
import { mergePdfFiles } from "@/lib/pdf/merge-pdf";

type PdfItem = {
  id: string;
  file: File;
};

function createPdfItem(file: File): PdfItem {
  return { id: crypto.randomUUID(), file };
}

export function MergePdfTool() {
  const { t } = useI18n();
  const { runProtected, ready } = useProtectedGeneration();
  const { requestAction, modal } = useRewardedAction("merge-pdf");
  const copy = t.tools["merge-pdf"];
  const [items, setItems] = useState<PdfItem[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mergedReady, setMergedReady] = useState(false);
  const mergedBytesRef = useRef<Uint8Array | null>(null);

  const addPdfs = useCallback(
    (files: File[]) => {
      const pdfs = files.filter(
        (file) =>
          file.type === "application/pdf" ||
          file.name.toLowerCase().endsWith(".pdf"),
      );
      if (pdfs.length === 0) {
        setError(copy.errors.invalid);
        return;
      }
      setError(null);
      mergedBytesRef.current = null;
      setMergedReady(false);
      setItems((current) => [...current, ...pdfs.map(createPdfItem)]);
    },
    [copy.errors.invalid],
  );

  const removeItem = useCallback((id: string) => {
    mergedBytesRef.current = null;
    setMergedReady(false);
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const moveItem = useCallback((index: number, direction: -1 | 1) => {
    setItems((current) => {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= current.length) return current;
      const copy = [...current];
      [copy[index], copy[nextIndex]] = [copy[nextIndex], copy[index]];
      mergedBytesRef.current = null;
      setMergedReady(false);
      return copy;
    });
  }, []);

  const handleMerge = useCallback(async () => {
    await runProtected(async () => {
      setProcessing(true);
      setError(null);
      mergedBytesRef.current = null;
      setMergedReady(false);
      try {
        const pdfBytes = await mergePdfFiles(items.map((item) => item.file));
        mergedBytesRef.current = pdfBytes;
        setMergedReady(true);
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : copy.errors.failed);
      } finally {
        setProcessing(false);
      }
    }, setError);
  }, [copy.errors.failed, items, runProtected]);

  const performDownload = useCallback(async () => {
    const bytes = mergedBytesRef.current;
    if (!bytes) return;
    downloadBytes(bytes, "purepdf-merged.pdf");
  }, []);

  const handleRewardedDownload = useCallback(async () => {
    await runProtected(async () => {
      await performDownload();
    }, setError);
  }, [performDownload, runProtected]);

  return (
    <ToolShell toolId="merge-pdf" icon={GitMerge}>
      <div className="space-y-6">
        <FileDropzone
          accept="application/pdf,.pdf"
          title={t.common.dropzoneTitle}
          hint={copy.hint}
          onFiles={addPdfs}
          disabled={processing}
        />

        {items.length > 0 && (
          <section className="glass-card rounded-2xl p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-sm font-medium text-white">
                {t.toolsExtra.pdfsInQueue(items.length)}
              </h2>
              <button
                type="button"
                onClick={() => {
                  mergedBytesRef.current = null;
                  setMergedReady(false);
                  setItems([]);
                }}
                className="text-sm text-gray-400 transition-colors hover:text-white"
              >
                {t.common.clearAll}
              </button>
            </div>

            <ul className="space-y-3">
              {items.map((item, index) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-surface/60 p-3"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-violet-500/15 text-sm font-semibold text-violet-200 ring-1 ring-violet-400/20">
                    PDF
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">
                      {item.file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t.toolsExtra.positionLabel(index + 1)} ·{" "}
                      {(item.file.size / 1024).toFixed(0)} KB
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => moveItem(index, -1)}
                      className="rounded-lg px-2 py-1 text-xs text-gray-400 hover:bg-white/5 hover:text-white disabled:opacity-30"
                    >
                      {t.common.up}
                    </button>
                    <button
                      type="button"
                      disabled={index === items.length - 1}
                      onClick={() => moveItem(index, 1)}
                      className="rounded-lg px-2 py-1 text-xs text-gray-400 hover:bg-white/5 hover:text-white disabled:opacity-30"
                    >
                      {t.common.down}
                    </button>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-red-300"
                      aria-label={`${t.common.remove} ${item.file.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
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
            disabled={processing || items.length < 2 || !ready}
            onClick={() => requestAction(() => void handleMerge(), "process")}
            className={cn(
              "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-primary/40 sm:w-auto",
            )}
          >
            {processing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                {t.common.merging}
              </>
            ) : (
              copy.processAction
            )}
          </button>
          <button
            type="button"
            disabled={processing || !mergedReady || !ready}
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
