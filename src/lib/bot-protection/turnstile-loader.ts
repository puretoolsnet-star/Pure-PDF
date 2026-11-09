"use client";

import { TURNSTILE_SCRIPT_SRC } from "@/lib/bot-protection/constants";

let loadPromise: Promise<void> | null = null;

export function loadTurnstileScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.turnstile) {
    return Promise.resolve();
  }

  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-purepdf-turnstile="1"]',
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("turnstile_load")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = TURNSTILE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.dataset.purepdfTurnstile = "1";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("turnstile_load"));
    document.head.appendChild(script);
  });

  return loadPromise;
}
