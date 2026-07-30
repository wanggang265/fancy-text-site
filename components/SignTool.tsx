"use client";

import { useCallback, useRef, useState } from "react";
import type { PDFDocument } from "pdf-lib";

type Status =
  | { kind: "idle" }
  | { kind: "reading"; name: string }
  | { kind: "ready"; doc: PDFDocument; name: string }
  | { kind: "processing" }
  | { kind: "done"; url: string; filename: string }
  | { kind: "error"; message: string };

export default function SignTool() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [drawing, setDrawing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = useCallback(async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setStatus({ kind: "error", message: "Please upload a PDF file." });
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setStatus({ kind: "error", message: "File size must be under 50 MB." });
      return;
    }
    setStatus({ kind: "reading", name: file.name });
    try {
      const arrayBuffer = await file.arrayBuffer();
      const mod = await import("pdf-lib");
      const doc = await mod.PDFDocument.load(arrayBuffer, { updateMetadata: false });
      if (doc.getPageCount() > 200) {
        setStatus({ kind: "error", message: "PDF has more than 200 pages." });
        return;
      }
      setStatus({ kind: "ready", doc, name: file.name });
    } catch {
      setStatus({ kind: "error", message: "Could not read the PDF." });
    }
  }, []);

  const getCtx = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    return { canvas, ctx };
  }, []);

  const startDraw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    setDrawing(true);
    const res = getCtx();
    if (!res) return;
    const { ctx, canvas } = res;
    ctx.beginPath();
    const pos = getPos(canvas, e);
    ctx.moveTo(pos.x, pos.y);
  }, [getCtx]);

  const draw = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!drawing) return;
      const res = getCtx();
      if (!res) return;
      const { ctx, canvas } = res;
      const pos = getPos(canvas, e);
      ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = "#1c1c1f";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.stroke();
    },
    [drawing, getCtx]
  );

  const endDraw = useCallback(() => setDrawing(false), []);

  const clearCanvas = useCallback(() => {
    const res = getCtx();
    if (!res) return;
    const { ctx, canvas } = res;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, [getCtx]);

  const sign = useCallback(async () => {
    if (status.kind !== "ready") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const blank = isCanvasBlank(canvas);
    if (blank) {
      setStatus({ kind: "error", message: "Please draw or type a signature first." });
      return;
    }
    setStatus({ kind: "processing" });
    try {
      const mod = await import("pdf-lib");
      const { doc, name } = status;
      const pngUrl = canvas.toDataURL("image/png");
      const pngBytes = Uint8Array.from(atob(pngUrl.split(",")[1]), (c) => c.charCodeAt(0));
      const png = await doc.embedPng(pngBytes);
      const page = doc.getPage(0);
      const { width, height } = page.getSize();
      const sigWidth = Math.min(200, width * 0.4);
      const sigHeight = (png.height / png.width) * sigWidth;
      page.drawImage(png, {
        x: width - sigWidth - 50,
        y: height - sigHeight - 50,
        width: sigWidth,
        height: sigHeight,
      });
      const bytes = await doc.save();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setStatus({ kind: "done", url, filename: name.replace(/\.pdf$/i, "-signed.pdf") });
    } catch {
      setStatus({ kind: "error", message: "Could not sign the PDF." });
    }
  }, [status]);

  const reset = useCallback(() => {
    setStatus({ kind: "idle" });
    clearCanvas();
    if (inputRef.current) inputRef.current.value = "";
  }, [clearCanvas]);

  return (
    <div className="rpp-tool-card" style={{ position: "relative" }}>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="rpp-sr-only"
        onChange={(e) => handleFile(e.currentTarget.files)}
      />

      {(status.kind === "idle" || status.kind === "error") && (
        <>
          <div className="rpp-steps" style={{ marginBottom: "var(--rpp-space-8)" }}>
            <span className="rpp-step rpp-step-active">Upload PDF</span>
            <span className="rpp-step">Add signature</span>
            <span className="rpp-step">Download signed file</span>
          </div>
          <div
            className="rpp-upload-zone"
            onClick={() => inputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
            }}
          >
            <div className="rpp-upload-zone-icon">
              <svg className="rpp-icon" style={{ width: "48px", height: "48px" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 16V4m0 0l-4 4m4-4l4 4" />
                <path d="M4 17a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v1H4z" />
              </svg>
            </div>
            <div className="rpp-upload-zone-title">Upload PDF to sign</div>
            <p className="rpp-body-sm rpp-upload-zone-meta">Drop your file here or click to browse. Max 50 MB / 200 pages.</p>
          </div>
          {status.kind === "error" && (
            <div className="rpp-notice rpp-notice-error" style={{ marginTop: "var(--rpp-space-6)" }}>
              <svg className="rpp-icon rpp-notice-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <div>
                <div className="rpp-notice-title">Could not process this PDF</div>
                <div className="rpp-notice-body">{status.message}</div>
              </div>
            </div>
          )}
        </>
      )}

      {status.kind === "reading" && (
        <div style={{ textAlign: "center", padding: "var(--rpp-space-8)" }}>
          <div className="rpp-spinner" style={{ margin: "0 auto var(--rpp-space-4)" }} />
          <p className="rpp-body">Reading PDF...</p>
        </div>
      )}

      {status.kind === "ready" && (
        <>
          <div className="rpp-notice rpp-notice-warning" style={{ marginBottom: "var(--rpp-space-6)" }}>
            <svg className="rpp-icon rpp-notice-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <div>
              <div className="rpp-notice-title">Disclaimer</div>
              <div className="rpp-notice-body">
                This signature is a visual mark only. It is not a digital certificate signature and is not legally binding for regulated electronic-signing requirements.
              </div>
            </div>
          </div>
          <div
            style={{
              border: "2px dashed var(--rpp-ink-300)",
              borderRadius: "var(--rpp-radius-md)",
              padding: "var(--rpp-space-3)",
              background: "#fff",
              marginBottom: "var(--rpp-space-4)",
            }}
          >
            <canvas
              ref={canvasRef}
              width={600}
              height={150}
              style={{ width: "100%", height: "auto", cursor: "crosshair", touchAction: "none" }}
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={endDraw}
              onMouseLeave={endDraw}
              onTouchStart={startDraw}
              onTouchMove={draw}
              onTouchEnd={endDraw}
            />
          </div>
          <div className="rpp-flex" style={{ gap: "var(--rpp-space-3)", flexWrap: "wrap", marginBottom: "var(--rpp-space-6)" }}>
            <button className="rpp-btn rpp-btn-secondary" onClick={clearCanvas}>
              Clear signature
            </button>
          </div>
          <div className="rpp-flex" style={{ gap: "var(--rpp-space-3)", flexWrap: "wrap" }}>
            <button className="rpp-btn rpp-btn-primary" onClick={sign}>
              Apply and download
            </button>
            <button className="rpp-btn rpp-btn-tertiary" onClick={reset}>
              Start over
            </button>
          </div>
        </>
      )}

      {status.kind === "processing" && (
        <div className="rpp-processing-overlay" style={{ position: "static", minHeight: "200px" }}>
          <div className="rpp-spinner" />
          <p className="rpp-body">Applying signature...</p>
        </div>
      )}

      {status.kind === "done" && (
        <>
          <div className="rpp-notice rpp-notice-success" style={{ marginBottom: "var(--rpp-space-6)" }}>
            <svg className="rpp-icon rpp-notice-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12l5 5L20 7" />
            </svg>
            <div>
              <div className="rpp-notice-title">Done!</div>
              <div className="rpp-notice-body">Your signed PDF is ready.</div>
            </div>
          </div>
          <a href={status.url} download={status.filename} className="rpp-btn rpp-btn-primary">
            Download signed PDF
          </a>
          <button className="rpp-btn rpp-btn-secondary" style={{ marginLeft: "var(--rpp-space-3)" }} onClick={reset}>
            Sign another PDF
          </button>
        </>
      )}
    </div>
  );
}

function getPos(canvas: HTMLCanvasElement, e: React.MouseEvent | React.TouchEvent) {
  const rect = canvas.getBoundingClientRect();
  if ("touches" in e) {
    const touch = e.touches[0] || e.changedTouches[0];
    return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
  }
  return { x: e.clientX - rect.left, y: e.clientY - rect.top };
}

function isCanvasBlank(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return true;
  const pixelBuffer = new Uint32Array(ctx.getImageData(0, 0, canvas.width, canvas.height).data.buffer);
  return pixelBuffer.every((p) => p === 0);
}
