export type DocxPreview = {
  html: string;
  warnings: string[];
};

export async function previewDocx(file: File): Promise<DocxPreview> {
  const mammoth = await import("mammoth");
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.convertToHtml({ arrayBuffer });

  return {
    html: result.value,
    warnings: result.messages.map((message) => message.message),
  };
}

function buildPrintableContainer(html: string) {
  const container = document.createElement("div");
  container.style.width = "794px";
  container.style.padding = "48px";
  container.style.background = "#ffffff";
  container.style.color = "#111827";
  container.style.fontFamily = "Georgia, 'Times New Roman', serif";
  container.style.fontSize = "12pt";
  container.style.lineHeight = "1.6";
  container.innerHTML = html;
  return container;
}

export async function convertDocxToPdf(file: File): Promise<Uint8Array> {
  const { html } = await previewDocx(file);
  const html2pdf = (await import("html2pdf.js")).default;
  const container = buildPrintableContainer(html);
  document.body.appendChild(container);

  try {
    const blob = await html2pdf()
      .set({
        margin: [12, 12, 12, 12],
        filename: file.name.replace(/\.docx$/i, "") + ".pdf",
        image: { type: "jpeg", quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"] },
      })
      .from(container)
      .outputPdf("blob");

    return new Uint8Array(await blob.arrayBuffer());
  } finally {
    container.remove();
  }
}
