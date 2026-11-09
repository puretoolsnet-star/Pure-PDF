"use client";

import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { BodyPortal } from "@/components/layout/BodyPortal";
import { EcosystemDialog } from "@/components/layout/EcosystemDialog";
import { MobileNavOverlay } from "@/components/layout/MobileNavOverlay";
import { useI18n } from "@/i18n/context";
import type { Locale } from "@/i18n/locales";
import { useTapHandler } from "@/lib/use-tap-handler";

export function MobileHeaderMenu() {
  const { locale, setLocale, t } = useI18n();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEcosystemOpen, setIsEcosystemOpen] = useState(false);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const openMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(true);
  }, []);

  const toggleMenu = useTapHandler(() => {
    if (isMobileMenuOpen) closeMobileMenu();
    else openMobileMenu();
  });

  useEffect(() => {
    if (!isMobileMenuOpen && !isEcosystemOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobileMenuOpen, isEcosystemOpen]);

  useEffect(() => {
    if (isMobileMenuOpen || isEcosystemOpen) return;
    document.body.style.overflow = "";
  }, [isMobileMenuOpen, isEcosystemOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMobileMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen, closeMobileMenu]);

  return (
    <>
      <button
        type="button"
        aria-expanded={isMobileMenuOpen}
        aria-controls="purepdf-mobile-nav"
        aria-label={t.nav.menuAria}
        onClick={toggleMenu.onClick}
        className="glass-card relative z-30 inline-flex h-10 w-10 touch-manipulation items-center justify-center rounded-xl text-gray-200 transition-colors hover:border-white/20 hover:bg-surface-hover/60 md:hidden"
      >
        {isMobileMenuOpen ? (
          <X className="h-5 w-5" aria-hidden />
        ) : (
          <Menu className="h-5 w-5" aria-hidden />
        )}
      </button>

      <BodyPortal open={isMobileMenuOpen}>
        <MobileNavOverlay
          open={isMobileMenuOpen}
          locale={locale}
          t={t}
          onClose={closeMobileMenu}
          onOpenEcosystem={() => {
            closeMobileMenu();
            setIsEcosystemOpen(true);
          }}
          onSelectLocale={(item: Locale) => setLocale(item)}
        />
      </BodyPortal>

      {isEcosystemOpen && (
        <EcosystemDialog
          open={isEcosystemOpen}
          onClose={() => setIsEcosystemOpen(false)}
          layout="centered"
        />
      )}
    </>
  );
}
