import { PDFDocument } from "pdf-lib";

export async function getPdfPageCount(file: File): Promise<number> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  return doc.getPageCount();
}

function clampRange(pageCount: number, from1: number, to1: number): [number, number] {
  const from = Math.min(Math.max(1, from1), pageCount);
  const to = Math.min(Math.max(1, to1), pageCount);
  if (from > to) {
    throw new Error("INVALID_RANGE");
  }
  return [from, to];
}

/** Extract inclusive 1-based page range into one PDF. */
export async function splitPdfPageRange(
  file: File,
  from1: number,
  to1: number,
): Promise<Uint8Array> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const source = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const pageCount = source.getPageCount();
  const [from, to] = clampRange(pageCount, from1, to1);
  const out = await PDFDocument.create();
  const indices = Array.from({ length: to - from + 1 }, (_, i) => from - 1 + i);
  const pages = await out.copyPages(source, indices);
  for (const page of pages) {
    out.addPage(page);
  }
  return out.save();
}

/** One PDF file per page (for ZIP download). */
export async function splitPdfIntoAllPages(
  file: File,
): Promise<{ path: string; data: Uint8Array }[]> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const source = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const pageCount = source.getPageCount();
  const base = file.name.replace(/\.pdf$/i, "") || "document";
  const entries: { path: string; data: Uint8Array }[] = [];

  for (let i = 0; i < pageCount; i++) {
    const doc = await PDFDocument.create();
    const [page] = await doc.copyPages(source, [i]);
    doc.addPage(page);
    entries.push({
      path: `${base}-page-${i + 1}.pdf`,
      data: await doc.save(),
    });
  }

  return entries;
}

/** Extract specific 1-based pages (order preserved) into one PDF. */
export async function extractPdfPages(
  file: File,
  pages1Based: number[],
): Promise<Uint8Array> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const source = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const pageCount = source.getPageCount();
  const unique = [...new Set(pages1Based.filter((p) => p >= 1 && p <= pageCount))].sort(
    (a, b) => a - b,
  );
  if (unique.length === 0) {
    throw new Error("NONE_SELECTED");
  }
  const out = await PDFDocument.create();
  const indices = unique.map((p) => p - 1);
  const pages = await out.copyPages(source, indices);
  for (const page of pages) {
    out.addPage(page);
  }
  return out.save();
}
