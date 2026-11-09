"use client";

import { Globe, Home, Sparkles, X } from "lucide-react";
import Link from "next/link";

import { useLocalizedPath } from "@/lib/i18n/use-localized-path";
import { cn } from "@/lib/cn";
import { Z } from "@/lib/layer-stack";
import {
  LOCALE_LABELS,
  LOCALES,
  type Dictionary,
  type Locale,
} from "@/i18n/locales";

type MobileNavOverlayProps = {
  open: boolean;
  locale: Locale;
  t: Dictionary;
  onClose: () => void;
  onOpenEcosystem: () => void;
  onSelectLocale: (locale: Locale) => void;
};

export function MobileNavOverlay({
  open,
  locale,
  t,
  onClose,
  onOpenEcosystem,
  onSelectLocale,
}: MobileNavOverlayProps) {
  const href = useLocalizedPath();

  if (!open) {
    return null;
  }

  return (
    <div
      data-purepdf-overlay="mobile-nav"
      data-open="true"
      className={cn(
        "pointer-events-auto fixed inset-0 opacity-100 transition-opacity duration-200 md:hidden",
      )}
      style={{ zIndex: Z.mobileNav }}
      aria-hidden={false}
    >
      <button
        type="button"
        aria-label={t.nav.menuClose}
        className="absolute inset-0 touch-manipulation bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <aside
        id="purepdf-mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label={t.nav.menuAria}
        className="glass-card pointer-events-auto absolute inset-y-0 right-0 flex w-[min(100vw-3rem,20rem)] max-w-full flex-col border-l border-white/10 shadow-2xl shadow-black/50"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <p className="text-sm font-semibold text-white">{t.brand.name}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.nav.menuClose}
            className="touch-manipulation rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-3">
          <Link
            href={href("/")}
            onClick={onClose}
            className="glass-card touch-manipulation flex w-full items-center gap-3 rounded-xl border border-white/10 p-3 text-left transition-colors hover:border-white/20 hover:bg-surface-hover/60"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-gray-200">
              <Home className="h-5 w-5" aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium text-white">
                {t.brand.name}
              </span>
              <span className="mt-0.5 block text-xs text-gray-400">
                {t.brand.tagline}
              </span>
            </span>
          </Link>

          <button
            type="button"
            onClick={onOpenEcosystem}
            className="glass-card touch-manipulation flex w-full items-center gap-3 rounded-xl border border-white/10 p-3 text-left transition-colors hover:border-white/20 hover:bg-surface-hover/60"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Sparkles className="h-5 w-5" aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium text-white">
                {t.ecosystem.menuLabel}
              </span>
              <span className="mt-0.5 block text-xs text-gray-400">
                {t.ecosystem.menuShort}
              </span>
            </span>
          </button>

          <div className="glass-card rounded-xl border border-white/10 p-3">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-gray-500">
              <Globe className="h-3.5 w-3.5" aria-hidden />
              {t.nav.selectLanguage}
            </div>
            <ul className="grid grid-cols-1 gap-1">
              {LOCALES.map((item) => {
                const meta = LOCALE_LABELS[item];
                const selected = item === locale;
                return (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectLocale(item);
                        onClose();
                      }}
                      className={cn(
                        "touch-manipulation flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm transition-colors",
                        selected
                          ? "bg-primary/15 text-white"
                          : "text-gray-300 hover:bg-white/5",
                      )}
                    >
                      <span aria-hidden>{meta.flag}</span>
                      <span className="min-w-0 truncate">{meta.native}</span>
                      <span className="ml-auto text-xs text-gray-500">
                        {meta.code}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <p className="mt-auto rounded-xl border border-accent/20 bg-accent/10 px-3 py-2 text-xs leading-relaxed text-accent">
            {t.security.badgeShort}
          </p>
        </div>
      </aside>
    </div>
  );
}
