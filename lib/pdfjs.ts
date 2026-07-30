let workerSrcSet = false;

async function ensureWorker() {
  if (workerSrcSet) return;
  if (typeof window === "undefined") return;
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  workerSrcSet = true;
}

function canvasToJpegBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
}

async function renderPageToJpeg(
  page: import("pdfjs-dist").PDFPageProxy,
  scale: number,
  quality: number
): Promise<{ imageBytes: Uint8Array; width: number; height: number } | null> {
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return null;

  canvas.width = Math.max(1, Math.floor(viewport.width));
  canvas.height = Math.max(1, Math.floor(viewport.height));

  // Fill white background so transparent pages compress cleanly as JPEG.
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);

  await page.render({ canvas, canvasContext: context, viewport }).promise;

  const blob = await canvasToJpegBlob(canvas, quality);
  if (!blob) return null;
  const buffer = await blob.arrayBuffer();
  return { imageBytes: new Uint8Array(buffer), width: canvas.width, height: canvas.height };
}

export async function renderPageThumbnail(
  pdfBytes: Uint8Array,
  pageIndex: number,
  maxWidth = 220
): Promise<string | null> {
  await ensureWorker();
  const pdfjs = await import("pdfjs-dist");
  const pdf = await pdfjs.getDocument({ data: pdfBytes }).promise;
  const page = await pdf.getPage(pageIndex + 1);
  const originalViewport = page.getViewport({ scale: 1 });
  const scale = Math.min(maxWidth / originalViewport.width, 1);
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return null;

  canvas.width = Math.max(1, Math.floor(viewport.width));
  canvas.height = Math.max(1, Math.floor(viewport.height));
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);

  await page.render({ canvas, canvasContext: context, viewport }).promise;
  return canvas.toDataURL("image/jpeg", 0.85);
}

type CompressionLevel = "low" | "medium" | "high";

interface CompressionSettings {
  scale: number;
  quality: number;
}

const SETTINGS: Record<CompressionLevel, CompressionSettings> = {
  low: { scale: 2.0, quality: 0.85 },
  medium: { scale: 2.0, quality: 0.7 },
  high: { scale: 1.5, quality: 0.4 },
};

export async function compressPdfWithImages(
  pdfBytes: Uint8Array,
  level: Exclude<CompressionLevel, "low">
): Promise<Uint8Array> {
  await ensureWorker();
  const pdfjs = await import("pdfjs-dist");
  const pdfLib = await import("pdf-lib");

  const pdf = await pdfjs.getDocument({ data: pdfBytes }).promise;
  const newDoc = await pdfLib.PDFDocument.create();

  const { scale, quality } = SETTINGS[level];

  for (let i = 0; i < pdf.numPages; i++) {
    const page = await pdf.getPage(i + 1);
    const originalViewport = page.getViewport({ scale: 1 });
    const rendered = await renderPageToJpeg(page, scale, quality);

    if (!rendered) {
      throw new Error(`Could not render page ${i + 1} for compression.`);
    }

    const embedded = await newDoc.embedJpg(rendered.imageBytes);
    const pdfPage = newDoc.addPage([originalViewport.width, originalViewport.height]);
    pdfPage.drawImage(embedded, {
      x: 0,
      y: 0,
      width: originalViewport.width,
      height: originalViewport.height,
    });
  }

  return newDoc.save();
}

export async function renderAllThumbnails(
  pdfBytes: Uint8Array,
  pageCount: number,
  maxWidth = 220,
  onProgress?: (index: number, dataUrl: string) => void
): Promise<Map<number, string>> {
  await ensureWorker();
  const pdfjs = await import("pdfjs-dist");
  const pdf = await pdfjs.getDocument({ data: pdfBytes }).promise;
  const thumbnails = new Map<number, string>();

  for (let i = 0; i < pageCount; i++) {
    const page = await pdf.getPage(i + 1);
    const originalViewport = page.getViewport({ scale: 1 });
    const scale = Math.min(maxWidth / originalViewport.width, 1);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) continue;

    canvas.width = Math.max(1, Math.floor(viewport.width));
    canvas.height = Math.max(1, Math.floor(viewport.height));
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvas, canvasContext: context, viewport }).promise;

    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
    thumbnails.set(i, dataUrl);
    onProgress?.(i, dataUrl);
  }

  return thumbnails;
}

export { SETTINGS };
export type { CompressionLevel };
