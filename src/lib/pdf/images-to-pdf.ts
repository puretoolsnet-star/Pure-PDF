import { PDFDocument } from "pdf-lib";

import { imageFileToPngBytes } from "./image-bytes";

async function embedImage(pdfDoc: PDFDocument, file: File) {
  const bytes = new Uint8Array(await file.arrayBuffer());

  if (file.type === "image/png") {
    return pdfDoc.embedPng(bytes);
  }

  if (file.type === "image/jpeg" || file.type === "image/jpg") {
    return pdfDoc.embedJpg(bytes);
  }

  const pngBytes = await imageFileToPngBytes(file);
  return pdfDoc.embedPng(pngBytes);
}

export async function buildPdfFromImages(files: File[]): Promise<Uint8Array> {
  if (files.length === 0) {
    throw new Error("Add at least one image.");
  }

  const pdfDoc = await PDFDocument.create();

  for (const file of files) {
    const image = await embedImage(pdfDoc, file);
    const { width, height } = image.scale(1);
    const page = pdfDoc.addPage([width, height]);
    page.drawImage(image, { x: 0, y: 0, width, height });
  }

  return pdfDoc.save();
}
