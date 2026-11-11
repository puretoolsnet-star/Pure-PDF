import { PDFDocument } from "pdf-lib";

import { getPdfPageCount } from "@/lib/pdf/split-pdf";

export { getPdfPageCount };

export type SignHorizontal = "left" | "center" | "right";

export type SignPlacement = {
  horizontal: SignHorizontal;
  /** Distance from bottom as a fraction of page height (0.05–0.3). */
  marginBottomRatio: number;
  /** Signature width as a fraction of page width (0.2–0.55). */
  widthRatio: number;
};

const DEFAULT_PLACEMENT: SignPlacement = {
  horizontal: "center",
  marginBottomRatio: 0.1,
  widthRatio: 0.38,
};

export async function applySignatureToPdf(
  file: File,
  pageNumber1Based: number,
  signaturePngBytes: Uint8Array,
  placement: SignPlacement = DEFAULT_PLACEMENT,
): Promise<Uint8Array> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const pageCount = doc.getPageCount();

  if (pageNumber1Based < 1 || pageNumber1Based > pageCount) {
    throw new Error("INVALID_PAGE");
  }

  const page = doc.getPage(pageNumber1Based - 1);
  const image = await doc.embedPng(signaturePngBytes);
  const { width: pageW, height: pageH } = page.getSize();

  const sigW = Math.min(pageW * placement.widthRatio, pageW * 0.55);
  const aspect = image.height / image.width;
  const sigH = sigW * aspect;
  const marginBottom = pageH * placement.marginBottomRatio;

  let x: number;
  switch (placement.horizontal) {
    case "left":
      x = pageW * 0.08;
      break;
    case "right":
      x = pageW - sigW - pageW * 0.08;
      break;
    default:
      x = (pageW - sigW) / 2;
  }

  const y = marginBottom;

  page.drawImage(image, { x, y, width: sigW, height: sigH });

  return doc.save();
}
