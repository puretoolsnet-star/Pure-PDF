"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { LOCALE_LABELS, LOCALES, type Locale } from "@/i18n/locales";
import { useI18n } from "@/i18n/context";
import { useTapHandler } from "@/lib/use-tap-handler";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const current = LOCALE_LABELS[locale];
  const toggleOpen = useTapHandler(() => setOpen((value) => !value));

  return (
    <div ref={rootRef} className="relative z-30">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.nav.selectLanguage}
        onClick={toggleOpen.onClick}
        className="glass-card touch-manipulation relative z-10 inline-flex max-w-[min(100%,9.5rem)] items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs text-gray-200 transition-colors hover:border-white/20 hover:bg-surface-hover/60 sm:max-w-[11rem] sm:gap-2 sm:rounded-xl sm:px-2.5 sm:py-2 sm:text-sm lg:max-w-none"
      >
        <span aria-hidden>{current.flag}</span>
        <span className="hidden font-medium sm:inline">{current.native}</span>
        <span className="font-medium sm:hidden">{current.code}</span>
        <ChevronDown
          className={cn("h-4 w-4 text-gray-400 transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t.nav.selectLanguage}
          className="glass-card absolute right-0 z-[100] mt-2 min-w-[11rem] overflow-hidden rounded-xl border border-white/10 py-1 shadow-xl shadow-black/40"
        >
          {LOCALES.map((item) => {
            const meta = LOCALE_LABELS[item];
            const selected = item === locale;
            return (
              <li key={item} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => {
                    setLocale(item as Locale);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors",
                    selected
                      ? "bg-primary/15 text-white"
                      : "text-gray-300 hover:bg-white/5 hover:text-white",
                  )}
                >
                  <span aria-hidden>{meta.flag}</span>
                  <span>{meta.native}</span>
                  <span className="ml-auto text-xs text-gray-500">{meta.code}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
