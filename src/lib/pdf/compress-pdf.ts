import { PDFDocument } from "pdf-lib";

export type CompressLevel = "balanced" | "maximum";

export async function compressPdfFile(
  file: File,
  level: CompressLevel = "balanced",
): Promise<Uint8Array> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const source = await PDFDocument.load(bytes, {
    ignoreEncryption: true,
    updateMetadata: false,
  });

  const output = await PDFDocument.create();
  const copiedPages = await output.copyPages(source, source.getPageIndices());
  for (const page of copiedPages) {
    output.addPage(page);
  }

  return output.save({
    useObjectStreams: level === "maximum",
    addDefaultPage: false,
    updateFieldAppearances: false,
  });
}
