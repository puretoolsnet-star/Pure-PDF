"use client";

import { useEffect } from "react";

import { adsterraSocialBar } from "@/lib/ads/adsterra";
import { tameThirdPartyOverlays } from "@/lib/tame-third-party-overlays";

function scheduleAdTaming() {
  tameThirdPartyOverlays();
  window.setTimeout(tameThirdPartyOverlays, 0);
  window.setTimeout(tameThirdPartyOverlays, 500);
  window.setTimeout(tameThirdPartyOverlays, 2000);
}

/**
 * Optional Social Bar — loads only when `NEXT_PUBLIC_ADSTERRA_SOCIAL_SRC` is set.
 * Container is inert; compact ad controls are marked in tame-third-party-overlays.
 */
export function AdsterraSocialBarLoader() {
  useEffect(() => {
    const src = adsterraSocialBar.src;
    if (!src) return;
    if (document.getElementById("adsterra-social-bar")) return;

    let host = document.getElementById("purepdf-ad-external-host");
    if (!host) {
      host = document.createElement("div");
      host.id = "purepdf-ad-external-host";
      host.setAttribute("data-purepdf-ad-pass-through", "true");
      host.className = "pointer-events-none relative z-0 min-h-0 w-full";
      document.body.appendChild(host);
    }

    const script = document.createElement("script");
    script.id = "adsterra-social-bar";
    script.async = true;
    script.src = src.startsWith("//") ? `https:${src}` : src;
    script.setAttribute("data-cfasync", "false");
    script.addEventListener("load", scheduleAdTaming);
    host.appendChild(script);
    scheduleAdTaming();

    return () => {
      script.removeEventListener("load", scheduleAdTaming);
    };
  }, []);

  return null;
}