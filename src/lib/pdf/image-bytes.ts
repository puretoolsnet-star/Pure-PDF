async function fileToImageBitmap(file: File): Promise<ImageBitmap> {
  if (typeof createImageBitmap === "function") {
    return createImageBitmap(file);
  }

  const url = URL.createObjectURL(file);
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Could not decode ${file.name}.`));
      img.src = url;
    });

    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Canvas is not available in this browser.");
    }
    context.drawImage(image, 0, 0);
    return createImageBitmap(canvas);
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function imageFileToPngBytes(file: File): Promise<Uint8Array> {
  const bitmap = await fileToImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const context = canvas.getContext("2d");
  if (!context) {
    bitmap.close?.();
    throw new Error("Canvas is not available in this browser.");
  }
  context.drawImage(bitmap, 0, 0);
  bitmap.close?.();

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((result) => {
      if (!result) {
        reject(new Error(`Could not convert ${file.name} to PNG.`));
        return;
      }
      resolve(result);
    }, "image/png");
  });

  return new Uint8Array(await blob.arrayBuffer());
}
