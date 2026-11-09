import { zipSync } from "fflate";

export function downloadBytes(
  data: Uint8Array,
  filename: string,
  mime = "application/pdf",
) {
  const blob = new Blob([data as BlobPart], { type: mime });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function downloadZip(
  entries: { path: string; data: Uint8Array }[],
  filename: string,
) {
  const archive: Record<string, Uint8Array> = {};
  for (const entry of entries) {
    archive[entry.path] = entry.data;
  }
  downloadBytes(zipSync(archive), filename, "application/zip");
}
