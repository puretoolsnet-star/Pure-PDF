let depth = 0;
let previousBodyOverflow = "";
let previousHtmlOverflow = "";

/** Reference-counted scroll lock — avoids stuck `overflow: hidden` on mobile. */
export function acquireBodyScrollLock(): () => void {
  if (typeof document === "undefined") return () => {};

  if (depth === 0) {
    previousBodyOverflow = document.body.style.overflow;
    previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  }
  depth += 1;

  let released = false;
  return () => {
    if (released) return;
    released = true;
    depth = Math.max(0, depth - 1);
    if (depth === 0) {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    }
  };
}

export function forceReleaseBodyScrollLock() {
  depth = 0;
  if (typeof document === "undefined") return;
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";
}