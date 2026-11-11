import { degrees, PDFDocument } from "pdf-lib";

import { getPdfPageCount } from "@/lib/pdf/split-pdf";

export { getPdfPageCount };

/** Extra rotation per 1-based page (0 | 90 | 180 | 270), relative to the uploaded file. */
export type PageRotationDeltas = Record<number, number>;

export async function applyPdfPageRotations(
  file: File,
  deltas: PageRotationDeltas,
): Promise<Uint8Array> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const pageCount = doc.getPageCount();

  for (let index = 0; index < pageCount; index++) {
    const pageNumber = index + 1;
    const delta = deltas[pageNumber] ?? 0;
    const normalized = ((delta % 360) + 360) % 360;
    if (normalized === 0) continue;

    const page = doc.getPage(index);
    const current = page.getRotation().angle;
    page.setRotation(degrees((current + normalized) % 360));
  }

  return doc.save();
}
