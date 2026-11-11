import { decryptPDF, isEncrypted } from "@pdfsmaller/pdf-decrypt";
import { PDFDocument } from "pdf-lib";

export type PdfUnlockProbe = {
  encrypted: boolean;
  algorithm?: "AES-256" | "RC4";
  pageCount: number | null;
};

export async function probePdfForUnlock(file: File): Promise<PdfUnlockProbe> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const info = await isEncrypted(bytes);

  let pageCount: number | null = null;
  try {
    const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
    pageCount = doc.getPageCount();
  } catch {
    pageCount = null;
  }

  return {
    encrypted: info.encrypted,
    algorithm: info.algorithm,
    pageCount,
  };
}

export async function unlockPdfWithPassword(
  file: File,
  password: string,
): Promise<Uint8Array> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const info = await isEncrypted(bytes);

  if (!info.encrypted) {
    throw new Error("NOT_ENCRYPTED");
  }

  try {
    const decrypted = await decryptPDF(bytes, password);
    const doc = await PDFDocument.load(decrypted, { ignoreEncryption: true });
    return doc.save();
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : String(cause);
    if (/incorrect password/i.test(message)) {
      throw new Error("WRONG_PASSWORD");
    }
    if (/not encrypted/i.test(message)) {
      throw new Error("NOT_ENCRYPTED");
    }
    throw cause;
  }
}
