"use client";

import QRCode from "qrcode";
import { Download, Link2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/cn";

export function QrGeneratorTool() {
  const [text, setText] = useState("https://kixt.net");
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const value = text.trim();
    if (!value) {
      setDataUrl(null);
      setError(null);
      return;
    }
    void QRCode.toDataURL(value, {
      margin: 2,
      width: 280,
      color: { dark: "#e5e7eb", light: "#11182700" },
    })
      .then((url) => {
        if (!cancelled) {
          setDataUrl(url);
          setError(null);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setDataUrl(null);
          setError("Could not generate QR code for this input.");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [text]);

  const download = useCallback(() => {
    if (!dataUrl) return;
    const anchor = document.createElement("a");
    anchor.href = dataUrl;
    anchor.download = "qr-code.png";
    anchor.click();
  }, [dataUrl]);

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <label className="glass-card block rounded-2xl border border-white/10 p-4 sm:p-5">
        <span className="flex items-center gap-2 text-sm font-medium text-white">
          <Link2 className="h-4 w-4 text-cyan-400" aria-hidden />
          Text or URL
        </span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="mt-3 w-full resize-y rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-gray-100 outline-none ring-cyan-500/40 focus:ring-2"
          placeholder="https://example.com"
        />
      </label>

      <div className="glass-card flex flex-col items-center gap-4 rounded-2xl border border-white/10 p-6 sm:p-8">
        {error ? (
          <p className="text-sm text-rose-300">{error}</p>
        ) : dataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={dataUrl}
            alt="Generated QR code"
            className="h-auto w-[min(100%,280px)] rounded-lg bg-black/20 p-3"
          />
        ) : (
          <p className="text-sm text-gray-500">Enter text to generate a QR code.</p>
        )}
        <button
          type="button"
          disabled={!dataUrl}
          onClick={download}
          className={cn(
            "inline-flex items-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-500/15 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-40",
          )}
        >
          <Download className="h-4 w-4" aria-hidden />
          Download PNG
        </button>
      </div>
    </div>
  );
}