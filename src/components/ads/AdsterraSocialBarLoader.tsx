"use client";

import { useEffect } from "react";

import { adsterraSocialBar } from "@/lib/ads/adsterra";
import { tameThirdPartyOverlays } from "@/lib/tame-third-party-overlays";

function scheduleAdTaming() {
  tameThirdPartyOverlays();
  window.setTimeout(tameThirdPartyOverlays, 0);
  window.setTimeout(tameThirdPartyOverlays, 300);
  window.setTimeout(tameThirdPartyOverlays, 1500);
  window.setTimeout(tameThirdPartyOverlays, 4000);
}

/** Loads Social Bar after first interaction so ad iframes cannot block the initial UI. */
export function AdsterraSocialBarLoader() {
  useEffect(() => {
    const src = adsterraSocialBar.src;
    if (!src || document.getElementById("adsterra-social-bar")) return;

    let loaded = false;

    const inject = () => {
      if (loaded || document.getElementById("adsterra-social-bar")) return;
      loaded = true;

      const script = document.createElement("script");
      script.id = "adsterra-social-bar";
      script.async = true;
      script.src = src.startsWith("//") ? `https:${src}` : src;
      script.setAttribute("data-cfasync", "false");
      script.addEventListener("load", scheduleAdTaming);
      document.body.appendChild(script);
      scheduleAdTaming();
    };

    const onFirstInteract = () => {
      window.setTimeout(inject, 400);
    };

    window.addEventListener("pointerdown", onFirstInteract, {
      once: true,
      passive: true,
    });
    window.addEventListener("keydown", onFirstInteract, { once: true });
    const fallback = window.setTimeout(inject, 12_000);

    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener("pointerdown", onFirstInteract);
      window.removeEventListener("keydown", onFirstInteract);
    };
  }, []);

  return null;
}