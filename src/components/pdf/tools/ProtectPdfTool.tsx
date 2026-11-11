"use client";

import {
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";

import { FileDropzone } from "@/components/tools/FileDropzone";
import { ToolShell } from "@/components/tools/ToolShell";
import { useI18n } from "@/i18n/context";
import { AD_PROTECT_TOOL_WATCH_MS } from "@/lib/ads/adsterra";
import { useProtectedGeneration } from "@/lib/bot-protection/use-protected-generation";
import { cn } from "@/lib/cn";
import { downloadBytes } from "@/lib/download";
import {
  assessPasswordStrength,
  protectPdfWithPassword,
  probePdfForProtect,
} from "@/lib/pdf/protect-pdf";
import { useRewardedAction } from "@/lib/use-rewarded-action";

const MIN_PASSWORD_LEN = 4;

function strengthBarClass(strength: ReturnType<typeof assessPasswordStrength>) {
  switch (strength) {
    case "weak":
      return "bg-red-500";
    case "fair":
      return "bg-amber-400";
    case "strong":
      return "bg-emerald-500";
    default:
      return "bg-white/15";
  }
}

function strengthWidth(strength: ReturnType<typeof assessPasswordStrength>) {
  switch (strength) {
    case "weak":
      return "33%";
    case "fair":
      return "66%";
    case "strong":
      return "100%";
    default:
      return "0%";
  }
}

export function ProtectPdfTool() {
  const { t } = useI18n();
  const { runProtected, ready } = useProtectedGeneration();
  const { requestAction, modal } = useRewardedAction("protect-pdf", {
    watchMs: AD_PROTECT_TOOL_WATCH_MS,
    autoContinueWhenReady: true,
  });

  const copy = t.tools["protect-pdf"];
  const ui = t.protectUi;

  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [alreadyEncrypted, setAlreadyEncrypted] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultReady, setResultReady] = useState(false);
  const resultRef = useRef<{ bytes: Uint8Array; filename: string } | null>(null);

  const strength = useMemo(() => assessPasswordStrength(password), [password]);
  const strengthText = useMemo(() => {
    switch (strength) {
      case "weak":
        return ui.strengthWeak;
      case "fair":
        return ui.strengthFair;
      case "strong":
        return ui.strengthStrong;
      default:
        return ui.strengthEmpty;
    }
  }, [strength, ui.strengthEmpty, ui.strengthFair, ui.strengthStrong, ui.strengthWeak]);

  const passwordsMatch = confirm.length > 0 && password === confirm;
  const passwordsMismatch = confirm.length > 0 && password !== confirm;

  const resetResult = useCallback(() => {
    resultRef.current = null;
    setResultReady(false);
  }, []);

  const clearAll = useCallback(() => {
    setFile(null);
    setPageCount(null);
    setAlreadyEncrypted(false);
    setPassword("");
    setConfirm("");
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
      setConfirm("");
      setFile(pdf);
      try {
        const probe = await probePdfForProtect(pdf);
        setPageCount(probe.pageCount);
        setAlreadyEncrypted(probe.alreadyEncrypted);
      } catch {
        setError(copy.errors.invalid);
        setFile(null);
        setPageCount(null);
        setAlreadyEncrypted(false);
      }
    },
    [copy.errors.invalid, resetResult],
  );

  const runProtect = useCallback(async () => {
    if (!file) return;
    if (alreadyEncrypted) {
      setError(ui.errAlreadyEncrypted);
      return;
    }
    if (password.length < MIN_PASSWORD_LEN) {
      setError(ui.errPasswordShort);
      return;
    }
    if (password !== confirm) {
      setError(ui.errPasswordMismatch);
      return;
    }

    await runProtected(async () => {
      setProcessing(true);
      setError(null);
      resetResult();
      try {
        const bytes = await protectPdfWithPassword(file, password);
        const base = file.name.replace(/\.pdf$/i, "") || "document";
        resultRef.current = { bytes, filename: `${base}-protected.pdf` };
        setResultReady(true);
      } catch (cause) {
        if (cause instanceof Error && cause.message === "ALREADY_ENCRYPTED") {
          setError(ui.errAlreadyEncrypted);
          setAlreadyEncrypted(true);
        } else {
          setError(cause instanceof Error ? cause.message || copy.errors.failed : copy.errors.failed);
        }
      } finally {
        setProcessing(false);
      }
    }, setError);
  }, [
    alreadyEncrypted,
    confirm,
    copy.errors.failed,
    file,
    password,
    resetResult,
    runProtected,
    ui.errAlreadyEncrypted,
    ui.errPasswordMismatch,
    ui.errPasswordShort,
  ]);

  const handleDownload = useCallback(async () => {
    const payload = resultRef.current;
    if (!payload) return;
    downloadBytes(payload.bytes, payload.filename);
  }, []);

  const canProcess =
    file &&
    !alreadyEncrypted &&
    password.length >= MIN_PASSWORD_LEN &&
    password === confirm;

  const onPasswordChange = useCallback(
    (value: string) => {
      resetResult();
      setPassword(value);
    },
    [resetResult],
  );

  const onConfirmChange = useCallback(
    (value: string) => {
      resetResult();
      setConfirm(value);
    },
    [resetResult],
  );

  return (
    <ToolShell toolId="protect-pdf" icon={Lock}>
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

            {alreadyEncrypted && (
              <p
                role="alert"
                className="mt-4 rounded-xl border border-amber-500/35 bg-amber-500/10 px-4 py-3 text-sm text-amber-100"
              >
                {ui.alreadyEncryptedWarning}
              </p>
            )}

            <div className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="protect-password"
                  className="text-xs font-medium uppercase tracking-wide text-gray-400"
                >
                  {ui.passwordLabel}
                </label>
                <div className="relative mt-2">
                  <input
                    id="protect-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => onPasswordChange(e.target.value)}
                    disabled={processing || alreadyEncrypted}
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
                <p className="mt-2 text-[11px] text-gray-500 sm:text-xs">{ui.minPasswordHint}</p>
              </div>

              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    {ui.strengthHeading}
                  </span>
                  <span
                    className={cn(
                      "text-xs font-semibold",
                      strength === "strong" && "text-emerald-300",
                      strength === "fair" && "text-amber-300",
                      strength === "weak" && "text-red-300",
                      strength === "empty" && "text-gray-500",
                    )}
                  >
                    {strengthText}
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-300",
                      strengthBarClass(strength),
                    )}
                    style={{ width: strengthWidth(strength) }}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="protect-confirm"
                  className="text-xs font-medium uppercase tracking-wide text-gray-400"
                >
                  {ui.confirmLabel}
                </label>
                <input
                  id="protect-confirm"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(e) => onConfirmChange(e.target.value)}
                  disabled={processing || alreadyEncrypted}
                  className="mt-2 w-full rounded-xl border border-white/15 bg-gray-950/80 px-4 py-3 text-base text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 disabled:opacity-50"
                />
                {passwordsMatch && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-emerald-300">
                    <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                    {ui.passwordsMatch}
                  </p>
                )}
                {passwordsMismatch && (
                  <p className="mt-2 text-xs text-red-300">{ui.passwordsMismatch}</p>
                )}
              </div>
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
            disabled={!canProcess || processing || !ready}
            onClick={() => requestAction(() => void runProtect(), "process")}
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
