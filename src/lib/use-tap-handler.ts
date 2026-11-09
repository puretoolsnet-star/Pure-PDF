"use client";

import { useCallback, useRef } from "react";

/** Reliable tap handler — uses native `click` (best support on mobile browsers). */
export function useTapHandler(handler: () => void) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  const onClick = useCallback(() => {
    handlerRef.current();
  }, []);

  return { onClick };
}
