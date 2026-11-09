import { PDFDocument } from "pdf-lib";

export async function mergePdfFiles(files: File[]): Promise<Uint8Array> {
  if (files.length === 0) {
    throw new Error("Add at least one PDF file.");
  }

  const merged = await PDFDocument.create();

  for (const file of files) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const source = await PDFDocument.load(bytes, { ignoreEncryption: true });
    const copiedPages = await merged.copyPages(source, source.getPageIndices());
    for (const page of copiedPages) {
      merged.addPage(page);
    }
  }

  return merged.save();
}
