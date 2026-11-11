import { PDFDocument } from "pdf-lib";

import { getPdfPageCount } from "@/lib/pdf/split-pdf";

export { getPdfPageCount };

/**
 * Build a PDF with pages in the given order. Values are 1-based source page indices
 * from the original file (duplicates allowed if ever needed; UI uses a permutation).
 */
export async function buildOrganizedPdf(
  file: File,
  orderedSourcePages1Based: number[],
): Promise<Uint8Array> {
  if (orderedSourcePages1Based.length === 0) {
    throw new Error("EMPTY");
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const source = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const pageCount = source.getPageCount();

  const indices: number[] = [];
  for (const page of orderedSourcePages1Based) {
    if (!Number.isFinite(page) || page < 1 || page > pageCount) {
      throw new Error("INVALID_PAGE");
    }
    indices.push(page - 1);
  }

  const output = await PDFDocument.create();
  const copied = await output.copyPages(source, indices);
  for (const page of copied) {
    output.addPage(page);
  }

  return output.save();
}
