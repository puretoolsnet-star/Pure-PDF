"use client";

import { Upload } from "lucide-react";
import {
  type DragEvent,
  useCallback,
  useId,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/cn";
import { TOUCH_TARGET_CLASS } from "@/lib/touch-target";

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
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = useCallback(
    (list: FileList | null) => {
      if (!list?.length || disabled) return;
      onFiles(Array.from(list));
    },
    [disabled, onFiles],
  );

  const sharedDropHandlers = {
    onDragEnter: (event: DragEvent) => {
      event.preventDefault();
      if (!disabled) setDragging(true);
    },
    onDragOver: (event: DragEvent) => {
      event.preventDefault();
      if (!disabled) setDragging(true);
    },
    onDragLeave: (event: DragEvent) => {
      event.preventDefault();
      setDragging(false);
    },
    onDrop: (event: DragEvent) => {
      event.preventDefault();
      setDragging(false);
      handleFiles(event.dataTransfer.files);
    },
  };

  const zoneClassName = cn(
    TOUCH_TARGET_CLASS,
    "glass-card flex flex-col items-center justify-center rounded-2xl border border-dashed px-4 py-10 text-center transition-colors sm:px-6 sm:py-12",
    disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
    dragging
      ? "border-primary/60 bg-primary/10"
      : "border-white/15 hover:border-white/25 hover:bg-surface-hover/40",
  );

  const fileInput = (
    <input
      ref={inputRef}
      id={inputId}
      type="file"
      accept={accept}
      multiple={multiple}
      className="sr-only"
      disabled={disabled}
      onChange={(event) => {
        handleFiles(event.target.files);
        event.target.value = "";
      }}
    />
  );

  const zoneContent = (
    <>
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
        <Upload className="h-5 w-5 text-primary" aria-hidden />
      </div>
      <p className="text-base font-medium text-white">{title}</p>
      <p className="mt-2 max-w-md text-sm text-gray-400">{hint}</p>
    </>
  );

  if (disabled) {
    return (
      <div className={zoneClassName} {...sharedDropHandlers}>
        {zoneContent}
        {fileInput}
      </div>
    );
  }

  return (
    <label htmlFor={inputId} className={zoneClassName} {...sharedDropHandlers}>
      {zoneContent}
      {fileInput}
    </label>
  );
}
