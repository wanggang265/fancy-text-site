"use client";

import { useCallback, useRef, useState } from "react";
import type { PDFDocument } from "pdf-lib";

type Level = "low" | "medium" | "high";

type Status =
  | { kind: "idle" }
  | { kind: "reading"; name: string }
  | { kind: "ready"; doc: PDFDocument; bytes: Uint8Array; name: string; level: Level }
  | { kind: "processing" }
  | { kind: "done"; url: string; filename: string; original: number; compressed: number }
  | { kind: "error"; message: string };

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function CompressTool() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const inputRef = useRef<HTMLInputElement>(null);

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
      setStatus({ kind: "ready", doc, bytes: new Uint8Array(arrayBuffer), name: file.name, level: "medium" });
    } catch {
      setStatus({ kind: "error", message: "Could not read the PDF." });
    }
  }, []);

  const setLevel = useCallback((level: Level) => {
    setStatus((prev) => (prev.kind === "ready" ? { ...prev, level } : prev));
  }, []);

  const compress = useCallback(async () => {
    if (status.kind !== "ready") return;
    setStatus({ kind: "processing" });
    try {
      const mod = await import("pdf-lib");
      const { doc, bytes, name, level } = status;
      const useObjectStreams = level !== "low";
      const output = await doc.save({ useObjectStreams, updateFieldAppearances: false });
      const blob = new Blob([output as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setStatus({
        kind: "done",
        url,
        filename: name.replace(/\.pdf$/i, "-compressed.pdf"),
        original: bytes.byteLength,
        compressed: output.byteLength,
      });
    } catch {
      setStatus({ kind: "error", message: "Could not compress the PDF." });
    }
  }, [status]);

  const reset = useCallback(() => {
    setStatus({ kind: "idle" });
    if (inputRef.current) inputRef.current.value = "";
  }, []);

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
            <span className="rpp-step">Choose compression</span>
            <span className="rpp-step">Download smaller file</span>
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
            <div className="rpp-upload-zone-title">Upload PDF to compress</div>
            <p className="rpp-body-sm rpp-upload-zone-meta">Drop a PDF here or click to browse. Max 50 MB and 200 pages.</p>
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
          <div className="rpp-notice rpp-notice-info" style={{ marginBottom: "var(--rpp-space-6)" }}>
            <svg className="rpp-icon rpp-notice-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <div>
              <div className="rpp-notice-title">Choose a compression level</div>
              <div className="rpp-notice-body">Higher compression may reduce image quality or remove redundant data.</div>
            </div>
          </div>
          <div style={{ display: "grid", gap: "var(--rpp-space-3)", marginBottom: "var(--rpp-space-6)" }}>
            {(["low", "medium", "high"] as Level[]).map((level) => (
              <label
                key={level}
                className="rpp-flex rpp-items-center"
                style={{
                  gap: "var(--rpp-space-3)",
                  padding: "var(--rpp-space-3)",
                  border: "1px solid var(--rpp-ink-200)",
                  borderRadius: "var(--rpp-radius-md)",
                  cursor: "pointer",
                  background: status.level === level ? "var(--rpp-indigo-light)" : undefined,
                }}
              >
                <input type="radio" name="level" checked={status.level === level} onChange={() => setLevel(level)} />
                <span className="rpp-body" style={{ color: "var(--rpp-ink-900)", textTransform: "capitalize" }}>
                  {level} compression
                </span>
              </label>
            ))}
          </div>
          <div className="rpp-flex" style={{ gap: "var(--rpp-space-3)", flexWrap: "wrap" }}>
            <button className="rpp-btn rpp-btn-primary" onClick={compress}>
              Compress PDF
            </button>
            <button className="rpp-btn rpp-btn-secondary" onClick={reset}>
              Start over
            </button>
          </div>
        </>
      )}

      {status.kind === "processing" && (
        <div className="rpp-processing-overlay" style={{ position: "static", minHeight: "200px" }}>
          <div className="rpp-spinner" />
          <p className="rpp-body">Compressing PDF...</p>
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
              <div className="rpp-notice-body">
                Original: {formatBytes(status.original)} → Compressed: {formatBytes(status.compressed)}
              </div>
            </div>
          </div>
          <a href={status.url} download={status.filename} className="rpp-btn rpp-btn-primary">
            Download compressed PDF
          </a>
          <button className="rpp-btn rpp-btn-secondary" style={{ marginLeft: "var(--rpp-space-3)" }} onClick={reset}>
            Compress another PDF
          </button>
        </>
      )}
    </div>
  );
}
