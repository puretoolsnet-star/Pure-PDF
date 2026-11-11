"use client";

import { Images, Loader2, Trash2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { FileDropzone } from "@/components/tools/FileDropzone";
import { ToolShell } from "@/components/tools/ToolShell";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";
import { useProtectedGeneration } from "@/lib/bot-protection/use-protected-generation";
import { downloadBytes } from "@/lib/download";
import { useRewardedAction } from "@/lib/use-rewarded-action";
import { buildPdfFromImages } from "@/lib/pdf/images-to-pdf";

type ImageItem = {
  id: string;
  file: File;
  previewUrl: string;
};

function createImageItem(file: File): ImageItem {
  return {
    id: crypto.randomUUID(),
    file,
    previewUrl: URL.createObjectURL(file),
  };
}

export function ImagesToPdfTool() {
  const { t } = useI18n();
  const { runProtected, ready } = useProtectedGeneration();
  const { requestAction, modal } = useRewardedAction("images-to-pdf");
  const copy = t.tools["images-to-pdf"];
  const [items, setItems] = useState<ImageItem[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pdfReady, setPdfReady] = useState(false);
  const pdfBytesRef = useRef<Uint8Array | null>(null);

  const itemsRef = useRef(items);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    return () => {
      for (const item of itemsRef.current) {
        URL.revokeObjectURL(item.previewUrl);
      }
    };
  }, []);

  const addImages = useCallback(
    (files: File[]) => {
      const images = files.filter((file) => file.type.startsWith("image/"));
      if (images.length === 0) {
        setError(copy.errors.invalid);
        return;
      }
      setError(null);
      pdfBytesRef.current = null;
      setPdfReady(false);
      setItems((current) => [...current, ...images.map(createImageItem)]);
    },
    [copy.errors.invalid],
  );

  const removeItem = useCallback((id: string) => {
    setItems((current) => {
      const target = current.find((item) => item.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      pdfBytesRef.current = null;
      setPdfReady(false);
      return current.filter((item) => item.id !== id);
    });
  }, []);

  const moveItem = useCallback((index: number, direction: -1 | 1) => {
    setItems((current) => {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= current.length) return current;
      const copy = [...current];
      [copy[index], copy[nextIndex]] = [copy[nextIndex], copy[index]];
      pdfBytesRef.current = null;
      setPdfReady(false);
      return copy;
    });
  }, []);

  const handleConvert = useCallback(async () => {
    await runProtected(async () => {
      setProcessing(true);
      setError(null);
      pdfBytesRef.current = null;
      setPdfReady(false);
      try {
        const pdfBytes = await buildPdfFromImages(items.map((item) => item.file));
        pdfBytesRef.current = pdfBytes;
        setPdfReady(true);
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : copy.errors.failed);
      } finally {
        setProcessing(false);
      }
    }, setError);
  }, [copy.errors.failed, items, runProtected]);

  const performDownload = useCallback(async () => {
    const bytes = pdfBytesRef.current;
    if (!bytes) return;
    downloadBytes(bytes, "purepdf-images.pdf");
  }, []);

  const handleRewardedDownload = useCallback(async () => {
    await runProtected(async () => {
      await performDownload();
    }, setError);
  }, [performDownload, runProtected]);

  return (
    <ToolShell toolId="images-to-pdf" icon={Images}>
      <div className="space-y-6">
        <FileDropzone
          accept="image/png,image/jpeg,image/jpg,image/webp,image/*"
          title={t.common.dropzoneTitle}
          hint={copy.hint}
          onFiles={addImages}
          disabled={processing}
        />

        {items.length > 0 && (
          <section className="glass-card rounded-2xl p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-sm font-medium text-white">
                {t.toolsExtra.imagesSelected(items.length)}
              </h2>
              <button
                type="button"
                onClick={() => {
                  for (const item of items) {
                    URL.revokeObjectURL(item.previewUrl);
                  }
                  pdfBytesRef.current = null;
                  setPdfReady(false);
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.previewUrl}
                    alt={item.file.name}
                    className="h-14 w-14 rounded-lg object-cover ring-1 ring-white/10"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">
                      {item.file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t.toolsExtra.pageLabel(index + 1)} ·{" "}
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
            disabled={processing || items.length === 0 || !ready}
            onClick={() => requestAction(() => void handleConvert(), "process")}
            className={cn(
              "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-primary/40 sm:w-auto",
            )}
          >
            {processing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                {t.common.building}
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
