import { PDFDocument } from "pdf-lib";

import { getPdfPageCount } from "@/lib/pdf/split-pdf";

export { getPdfPageCount };

export async function removePdfPages(
  file: File,
  pagesToRemove1Based: number[],
): Promise<Uint8Array> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const source = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const pageCount = source.getPageCount();

  const removeSet = new Set(
    pagesToRemove1Based.filter((p) => Number.isFinite(p) && p >= 1 && p <= pageCount),
  );

  if (removeSet.size === 0) {
    throw new Error("NONE_SELECTED");
  }
  if (removeSet.size >= pageCount) {
    throw new Error("ALL_PAGES");
  }

  const keepIndices: number[] = [];
  for (let i = 0; i < pageCount; i++) {
    if (!removeSet.has(i + 1)) {
      keepIndices.push(i);
    }
  }

  const output = await PDFDocument.create();
  const copied = await output.copyPages(source, keepIndices);
  for (const page of copied) {
    output.addPage(page);
  }

  return output.save();
}
