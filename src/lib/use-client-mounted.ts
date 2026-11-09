"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** True on the client after hydration; false during SSR. */
export function useClientMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
