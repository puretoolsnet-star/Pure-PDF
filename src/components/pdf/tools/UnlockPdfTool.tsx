"use client";

import {
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  LockOpen,
  Trash2,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { FileDropzone } from "@/components/tools/FileDropzone";
import { ToolShell } from "@/components/tools/ToolShell";
import { useI18n } from "@/i18n/context";
import { AD_UNLOCK_TOOL_WATCH_MS } from "@/lib/ads/adsterra";
import { useProtectedGeneration } from "@/lib/bot-protection/use-protected-generation";
import { downloadBytes } from "@/lib/download";
import { probePdfForUnlock, unlockPdfWithPassword } from "@/lib/pdf/unlock-pdf";
import { useRewardedAction } from "@/lib/use-rewarded-action";

export function UnlockPdfTool() {
  const { t } = useI18n();
  const { runProtected, ready } = useProtectedGeneration();
  const { requestAction, modal } = useRewardedAction("unlock-pdf", {
    watchMs: AD_UNLOCK_TOOL_WATCH_MS,
    autoContinueWhenReady: true,
  });

  const copy = t.tools["unlock-pdf"];
  const ui = t.unlockUi;

  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [algorithm, setAlgorithm] = useState<string | undefined>();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultReady, setResultReady] = useState(false);
  const resultRef = useRef<{ bytes: Uint8Array; filename: string } | null>(null);

  const resetResult = useCallback(() => {
    resultRef.current = null;
    setResultReady(false);
  }, []);

  const clearAll = useCallback(() => {
    setFile(null);
    setPageCount(null);
    setIsEncrypted(false);
    setAlgorithm(undefined);
    setPassword("");
    setShowPassword(false);
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
      setPassword("");
      setFile(pdf);
      try {
        const probe = await probePdfForUnlock(pdf);
        setIsEncrypted(probe.encrypted);
        setAlgorithm(probe.algorithm);
        setPageCount(probe.pageCount);
      } catch {
        setError(copy.errors.invalid);
        setFile(null);
        setPageCount(null);
        setIsEncrypted(false);
        setAlgorithm(undefined);
      }
    },
    [copy.errors.invalid, resetResult],
  );

  const runUnlock = useCallback(async () => {
    if (!file) return;
    if (!isEncrypted) {
      setError(ui.errNotEncrypted);
      return;
    }
    if (!password) {
      setError(ui.errPasswordRequired);
      return;
    }

    await runProtected(async () => {
      setProcessing(true);
      setError(null);
      resetResult();
      try {
        const bytes = await unlockPdfWithPassword(file, password);
        const base = file.name.replace(/\.pdf$/i, "") || "document";
        resultRef.current = { bytes, filename: `${base}-unlocked.pdf` };
        setResultReady(true);
      } catch (cause) {
        if (cause instanceof Error) {
          if (cause.message === "WRONG_PASSWORD") setError(ui.errWrongPassword);
          else if (cause.message === "NOT_ENCRYPTED") {
            setError(ui.errNotEncrypted);
            setIsEncrypted(false);
          } else setError(cause.message || copy.errors.failed);
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
    isEncrypted,
    password,
    resetResult,
    runProtected,
    ui.errNotEncrypted,
    ui.errPasswordRequired,
    ui.errWrongPassword,
  ]);

  const handleDownload = useCallback(async () => {
    const payload = resultRef.current;
    if (!payload) return;
    downloadBytes(payload.bytes, payload.filename);
  }, []);

  const canProcess = file && isEncrypted && password.length > 0;

  return (
    <ToolShell toolId="unlock-pdf" icon={LockOpen}>
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
                {isEncrypted && (
                  <p className="mt-1 text-xs font-medium text-emerald-300/90">
                    {ui.encryptedBadge(algorithm)}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={clearAll}
                disabled={processing}
                className="inline-flex touch-manipulation items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-gray-300 transition hover:bg-white/5 hover:text-white disabled:opacity-40"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden />
                {ui.removeFile}
              </button>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-gray-400 sm:text-sm">{ui.formHint}</p>

            {!isEncrypted && (
              <p
                role="status"
                className="mt-4 rounded-xl border border-amber-500/35 bg-amber-500/10 px-4 py-3 text-sm text-amber-100"
              >
                {ui.notEncryptedWarning}
              </p>
            )}

            {isEncrypted && (
              <div className="mt-5">
                <label
                  htmlFor="unlock-password"
                  className="text-xs font-medium uppercase tracking-wide text-gray-400"
                >
                  {ui.passwordLabel}
                </label>
                <div className="relative mt-2">
                  <input
                    id="unlock-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => {
                      resetResult();
                      setPassword(e.target.value);
                      setError(null);
                    }}
                    disabled={processing}
                    className="w-full rounded-xl border border-white/15 bg-gray-950/80 px-4 py-3 pr-12 text-base text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 disabled:opacity-50"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? ui.hidePassword : ui.showPassword}
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 touch-manipulation items-center justify-center rounded-lg text-gray-400 hover:bg-white/5 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" aria-hidden />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden />
                    )}
                  </button>
                </div>
              </div>
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
          <p
            role="alert"
            className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
          >
            {error}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <button
            type="button"
            disabled={!canProcess || processing || !ready}
            onClick={() => requestAction(() => void runUnlock(), "process")}
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
