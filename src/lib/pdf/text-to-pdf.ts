function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildTextContainer(text: string) {
  const container = document.createElement("div");
  container.style.width = "794px";
  container.style.padding = "48px";
  container.style.background = "#ffffff";
  container.style.color = "#111827";
  container.style.fontFamily =
    "system-ui, -apple-system, 'Segoe UI', Roboto, 'Noto Sans', sans-serif";
  container.style.fontSize = "12pt";
  container.style.lineHeight = "1.6";
  container.style.whiteSpace = "pre-wrap";
  container.style.wordBreak = "break-word";
  container.innerHTML = escapeHtml(text);
  return container;
}

export async function convertTextToPdf(text: string): Promise<Uint8Array> {
  const trimmed = text.trim();
  if (!trimmed) {
    throw new Error("EMPTY_TEXT");
  }

  const html2pdf = (await import("html2pdf.js")).default;
  const container = buildTextContainer(trimmed);
  container.style.position = "fixed";
  container.style.left = "-9999px";
  container.style.top = "0";
  document.body.appendChild(container);

  try {
    const blob = await html2pdf()
      .set({
        margin: [12, 12, 12, 12],
        filename: "purepdf-text.pdf",
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
