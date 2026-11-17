"use client";

import { useCallback, useLayoutEffect, useRef } from "react";

/** Reliable tap handler — uses native `click` (best support on mobile browsers). */
export function useTapHandler(handler: () => void) {
  const handlerRef = useRef(handler);

  useLayoutEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  const onClick = useCallback(() => {
    handlerRef.current();
  }, []);

  return { onClick };
}