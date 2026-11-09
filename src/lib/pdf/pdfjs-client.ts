import type { PDFDocumentProxy } from "pdfjs-dist";

let workerConfigured = false;

export async function loadPdfJs() {
  const pdfjs = await import("pdfjs-dist");

  if (!workerConfigured && typeof window !== "undefined") {
    pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
    workerConfigured = true;
  }

  return pdfjs;
}

export async function openPdfDocument(file: File): Promise<PDFDocumentProxy> {
  const pdfjs = await loadPdfJs();
  const data = new Uint8Array(await file.arrayBuffer());
  const task = pdfjs.getDocument({ data });
  return task.promise;
}

export type ImageExportFormat = "png" | "jpeg";

export type RenderedPageImage = {
  pageNumber: number;
  filename: string;
  bytes: Uint8Array;
};

export async function renderPdfPagesToImages(options: {
  file: File;
  format: ImageExportFormat;
  quality: number;
  scale: number;
  onProgress?: (current: number, total: number) => void;
}): Promise<RenderedPageImage[]> {
  const { file, format, quality, scale, onProgress } = options;
  const pdf = await openPdfDocument(file);
  const baseName = file.name.replace(/\.pdf$/i, "") || "document";
  const images: RenderedPageImage[] = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    onProgress?.(pageNumber, pdf.numPages);
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Canvas rendering is not available in this browser.");
    }

    await page.render({ canvas, canvasContext: context, viewport }).promise;

    const mime = format === "jpeg" ? "image/jpeg" : "image/png";
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) => {
          if (!result) {
            reject(new Error(`Could not export page ${pageNumber}.`));
            return;
          }
          resolve(result);
        },
        mime,
        format === "jpeg" ? quality : undefined,
      );
    });

    const extension = format === "jpeg" ? "jpg" : "png";
    images.push({
      pageNumber,
      filename: `${baseName}-page-${String(pageNumber).padStart(3, "0")}.${extension}`,
      bytes: new Uint8Array(await blob.arrayBuffer()),
    });
  }

  await pdf.destroy();
  return images;
}
