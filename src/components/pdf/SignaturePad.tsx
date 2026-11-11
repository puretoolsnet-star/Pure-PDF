"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

export type SignaturePadHandle = {
  clear: () => void;
  isEmpty: () => boolean;
  exportPng: () => Promise<Uint8Array>;
  renderText: (text: string, color: string) => void;
};

type SignaturePadProps = {
  strokeColor: string;
  strokeWidth: number;
  onChange?: () => void;
  className?: string;
  ariaLabel: string;
  /** When true, display only (e.g. typed signature preview). */
  readOnly?: boolean;
};

function getPoint(
  canvas: HTMLCanvasElement,
  clientX: number,
  clientY: number,
) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
  };
}

export const SignaturePad = forwardRef<SignaturePadHandle, SignaturePadProps>(
  function SignaturePad({ strokeColor, strokeWidth, onChange, className, ariaLabel, readOnly }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const drawingRef = useRef(false);
    const emptyRef = useRef(true);
    const lastPointRef = useRef<{ x: number; y: number } | null>(null);

    const resizeCanvas = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const parent = canvas.parentElement;
      if (!parent) return;

      const dpr = window.devicePixelRatio || 1;
      const cssW = parent.clientWidth;
      const cssH = Math.max(120, Math.min(200, Math.round(cssW * 0.38)));
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);
      emptyRef.current = true;
    }, []);

    useEffect(() => {
      resizeCanvas();
      const ro = new ResizeObserver(() => resizeCanvas());
      const parent = canvasRef.current?.parentElement;
      if (parent) ro.observe(parent);
      return () => ro.disconnect();
    }, [resizeCanvas]);

    const clear = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      emptyRef.current = true;
      lastPointRef.current = null;
      onChange?.();
    }, [onChange]);

    const isEmpty = useCallback(() => emptyRef.current, []);

    const exportPng = useCallback(async () => {
      const canvas = canvasRef.current;
      if (!canvas) throw new Error("NO_CANVAS");
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error("EXPORT_FAILED"))),
          "image/png",
        );
      });
      return new Uint8Array(await blob.arrayBuffer());
    }, []);

    const renderText = useCallback(
      (text: string, color: string) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        ctx.clearRect(0, 0, w, h);
        const trimmed = text.trim();
        if (!trimmed) {
          emptyRef.current = true;
          onChange?.();
          return;
        }
        const fontSize = Math.min(56, Math.max(22, w / (trimmed.length * 0.55)));
        ctx.fillStyle = color;
        ctx.font = `italic ${fontSize}px "Segoe Script", "Brush Script MT", "Lucida Handwriting", cursive`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(trimmed, w / 2, h / 2);
        emptyRef.current = false;
        onChange?.();
      },
      [onChange],
    );

    useImperativeHandle(ref, () => ({ clear, isEmpty, exportPng, renderText }), [
      clear,
      exportPng,
      isEmpty,
      renderText,
    ]);

    const drawStroke = useCallback(
      (x: number, y: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        const last = lastPointRef.current;
        if (!last) {
          ctx.beginPath();
          ctx.arc(x, y, strokeWidth / 2, 0, Math.PI * 2);
          ctx.fillStyle = strokeColor;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.moveTo(last.x, last.y);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
        lastPointRef.current = { x, y };
        emptyRef.current = false;
      },
      [strokeColor, strokeWidth],
    );

    return (
      <canvas
        ref={canvasRef}
        aria-label={ariaLabel}
        className={className}
        style={{ touchAction: readOnly ? "auto" : "none" }}
        onPointerDown={(event) => {
          if (readOnly) return;
          if (event.button !== 0) return;
          const canvas = canvasRef.current;
          if (!canvas) return;
          canvas.setPointerCapture(event.pointerId);
          drawingRef.current = true;
          lastPointRef.current = null;
          const pt = getPoint(canvas, event.clientX, event.clientY);
          drawStroke(pt.x, pt.y);
          onChange?.();
        }}
        onPointerMove={(event) => {
          if (readOnly) return;
          if (!drawingRef.current) return;
          const canvas = canvasRef.current;
          if (!canvas) return;
          const pt = getPoint(canvas, event.clientX, event.clientY);
          drawStroke(pt.x, pt.y);
          onChange?.();
        }}
        onPointerUp={(event) => {
          drawingRef.current = false;
          lastPointRef.current = null;
          canvasRef.current?.releasePointerCapture(event.pointerId);
        }}
        onPointerLeave={() => {
          drawingRef.current = false;
          lastPointRef.current = null;
        }}
      />
    );
  },
);
