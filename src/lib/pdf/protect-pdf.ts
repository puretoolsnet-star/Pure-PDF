import { AlreadyEncryptedError, encryptPDF } from "@pdfsmaller/pdf-encrypt";
import { PDFDocument } from "pdf-lib";

export type PdfProtectProbe = {
  pageCount: number;
  alreadyEncrypted: boolean;
};

export async function probePdfForProtect(file: File): Promise<PdfProtectProbe> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  return {
    pageCount: doc.getPageCount(),
    alreadyEncrypted: doc.isEncrypted,
  };
}

export type PasswordStrength = "empty" | "weak" | "fair" | "strong";

export function assessPasswordStrength(password: string): PasswordStrength {
  if (!password) return "empty";
  if (password.length < 4) return "weak";

  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;

  if (score <= 1) return "weak";
  if (score <= 3) return "fair";
  return "strong";
}

export async function protectPdfWithPassword(
  file: File,
  userPassword: string,
): Promise<Uint8Array> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });

  if (doc.isEncrypted) {
    throw new Error("ALREADY_ENCRYPTED");
  }

  const normalized = await doc.save();

  try {
    return await encryptPDF(normalized, userPassword, {
      algorithm: "AES-256",
      allowPrinting: true,
      allowHighQualityPrint: true,
      allowCopying: true,
      allowFillingForms: true,
      allowModifying: false,
      allowAnnotating: false,
      allowAssembly: false,
      allowExtraction: true,
    });
  } catch (cause) {
    if (cause instanceof AlreadyEncryptedError) {
      throw new Error("ALREADY_ENCRYPTED");
    }
    throw cause;
  }
}
