"use client";

import { Upload } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { cn } from "@/lib/cn";

type FileDropzoneProps = {
  accept: string;
  multiple?: boolean;
  title?: string;
  hint: string;
  onFiles: (files: File[]) => void;
  disabled?: boolean;
};

export function FileDropzone({
  accept,
  multiple = true,
  title = "Drop files here or click to browse",
  hint,
  onFiles,
  disabled = false,
}: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = useCallback(
    (list: FileList | null) => {
      if (!list?.length || disabled) return;
      onFiles(Array.from(list));
    },
    [disabled, onFiles],
  );

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(event) => {
        if (disabled) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          inputRef.current?.click();
        }
      }}
      onClick={() => {
        if (!disabled) inputRef.current?.click();
      }}
      onDragEnter={(event) => {
        event.preventDefault();
        if (!disabled) setDragging(true);
      }}
      onDragOver={(event) => {
        event.preventDefault();
        if (!disabled) setDragging(true);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        setDragging(false);
      }}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        handleFiles(event.dataTransfer.files);
      }}
      className={cn(
        "glass-card touch-none flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-4 py-10 text-center transition-colors sm:px-6 sm:py-12",
        dragging
          ? "border-primary/60 bg-primary/10"
          : "border-white/15 hover:border-white/25 hover:bg-surface-hover/40",
        disabled && "cursor-not-allowed opacity-60",
      )}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
        <Upload className="h-5 w-5 text-primary" aria-hidden />
      </div>
      <p className="text-base font-medium text-white">{title}</p>
      <p className="mt-2 max-w-md text-sm text-gray-400">{hint}</p>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        disabled={disabled}
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = "";
        }}
      />
    </div>
  );
}
