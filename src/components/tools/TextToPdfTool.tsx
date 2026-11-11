"use client";

import { Loader2, Trash2, Type } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { ToolShell } from "@/components/tools/ToolShell";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";
import { useProtectedGeneration } from "@/lib/bot-protection/use-protected-generation";
import { downloadBytes } from "@/lib/download";
import { useRewardedAction } from "@/lib/use-rewarded-action";
import { convertTextToPdf } from "@/lib/pdf/text-to-pdf";

export function TextToPdfTool() {
  const { t } = useI18n();
  const { runProtected, ready } = useProtectedGeneration();
  const { requestAction, modal } = useRewardedAction("text-to-pdf");
  const copy = t.tools["text-to-pdf"];
  const [text, setText] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pdfReady, setPdfReady] = useState(false);
  const pdfBytesRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    pdfBytesRef.current = null;
    setPdfReady(false);
  }, [text]);

  const charCount = useMemo(() => text.length, [text]);
  const canGenerate = text.trim().length > 0 && !processing && ready;

  const handleGenerate = useCallback(async () => {
    await runProtected(async () => {
      setProcessing(true);
      setError(null);
      pdfBytesRef.current = null;
      setPdfReady(false);
      try {
        const pdfBytes = await convertTextToPdf(text);
        pdfBytesRef.current = pdfBytes;
        setPdfReady(true);
      } catch (cause) {
        if (cause instanceof Error && cause.message === "EMPTY_TEXT") {
          setError(copy.errors.invalid);
        } else {
          setError(copy.errors.failed);
        }
      } finally {
        setProcessing(false);
      }
    }, setError);
  }, [copy.errors.failed, copy.errors.invalid, runProtected, text]);

  const performDownload = useCallback(async () => {
    const bytes = pdfBytesRef.current;
    if (!bytes) return;
    downloadBytes(bytes, "purepdf-text.pdf");
  }, []);

  const handleRewardedDownload = useCallback(async () => {
    await runProtected(async () => {
      await performDownload();
    }, setError);
  }, [performDownload, runProtected]);

  return (
    <ToolShell toolId="text-to-pdf" icon={Type}>
      <div className="space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-gray-200">
            {t.toolsExtra.textLabel}
          </span>
          <textarea
            value={text}
            onChange={(event) => {
              setText(event.target.value);
              setError(null);
            }}
            placeholder={t.toolsExtra.textPlaceholder}
            rows={14}
            className="glass-card w-full max-w-full resize-y rounded-xl border border-white/10 bg-surface/40 px-4 py-3 text-sm leading-relaxed text-gray-100 placeholder:text-gray-500 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/25"
          />
        </label>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            {t.toolsExtra.charactersCount(charCount)}
          </p>
          <button
            type="button"
            disabled={!text}
            onClick={() => {
              setText("");
              setError(null);
            }}
            className="inline-flex touch-manipulation items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs text-gray-400 transition-colors hover:bg-white/5 hover:text-white disabled:opacity-40"
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden />
            {t.toolsExtra.clearText}
          </button>
        </div>

        <p className="text-xs leading-relaxed text-gray-500">{copy.hint}</p>

        {error && (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <button
            type="button"
            disabled={!canGenerate}
            onClick={() => requestAction(() => void handleGenerate(), "process")}
            className={cn(
              "inline-flex w-full touch-manipulation items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-primary/40 sm:w-auto",
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
              "inline-flex w-full touch-manipulation items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto",
            )}
          >
            {t.common.downloadReadyPdf}
          </button>
        </div>
        {modal}

        <p className="text-xs text-gray-500">{t.security.toolNote}</p>
      </div>
    </ToolShell>
  );
}
