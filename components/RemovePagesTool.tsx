"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PDFDocument } from "pdf-lib";
import { renderAllThumbnails } from "@/lib/pdfjs";

interface PageInfo {
  index: number;
  number: number;
}

type Status =
  | { kind: "idle" }
  | { kind: "reading"; name: string }
  | { kind: "preview"; doc: PDFDocument; bytes: Uint8Array; pages: PageInfo[]; selected: Set<number>; name: string; thumbnails: Map<number, string>; loadingThumbnails: boolean }
  | { kind: "processing" }
  | { kind: "done"; url: string; filename: string; remaining: number }
  | { kind: "error"; message: string };

export default function RemovePagesTool() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(async (files: FileList | null) => {
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
      const bytes = await file.arrayBuffer();
      const mod = await import("pdf-lib");
      const doc = await mod.PDFDocument.load(bytes, { updateMetadata: false });
      const count = doc.getPageCount();
      if (count > 200) {
        setStatus({ kind: "error", message: "PDF has more than 200 pages." });
        return;
      }
      const pages: PageInfo[] = Array.from({ length: count }, (_, i) => ({
        index: i,
        number: i + 1,
      }));
      setStatus({ kind: "preview", doc, bytes: new Uint8Array(bytes), pages, selected: new Set(), name: file.name, thumbnails: new Map(), loadingThumbnails: true });
    } catch {
      setStatus({ kind: "error", message: "Could not read the PDF. It may be encrypted or damaged." });
    }
  }, []);

  const togglePage = useCallback((index: number) => {
    setStatus((prev) => {
      if (prev.kind !== "preview") return prev;
      const next = new Set(prev.selected);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return { ...prev, selected: next };
    });
  }, []);

  const removeSelected = useCallback(async () => {
    if (status.kind !== "preview") return;
    const { doc, selected, name } = status;
    if (selected.size === 0) {
      setStatus({ kind: "error", message: "Select at least one page to remove." });
      return;
    }
    setStatus({ kind: "processing" });
    try {
      const mod = await import("pdf-lib");
      const newDoc = await mod.PDFDocument.create();
      const indicesToKeep = status.pages
        .filter((p) => !selected.has(p.index))
        .map((p) => p.index);
      if (indicesToKeep.length === 0) {
        setStatus({ kind: "error", message: "You cannot remove every page." });
        return;
      }
      const copied = await newDoc.copyPages(doc, indicesToKeep);
      copied.forEach((page) => newDoc.addPage(page));
      const bytes = await newDoc.save();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setStatus({
        kind: "done",
        url,
        filename: name.replace(/\.pdf$/i, "-removed.pdf"),
        remaining: indicesToKeep.length,
      });
    } catch {
      setStatus({ kind: "error", message: "Could not process the PDF." });
    }
  }, [status]);

  const reset = useCallback(() => {
    setStatus({ kind: "idle" });
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  const renderRef = useRef<number | null>(null);
  const startedRef = useRef<WeakMap<Uint8Array, boolean>>(new WeakMap());

  const bytesForThumb = status.kind === "preview" ? status.bytes : null;
  const pageCountForThumb = status.kind === "preview" ? status.pages.length : 0;

  useEffect(() => {
    if (!bytesForThumb || !pageCountForThumb) return;
    // Guard against double-run from StrictMode / re-renders for the same file.
    if (startedRef.current.get(bytesForThumb)) return;
    startedRef.current.set(bytesForThumb, true);
    const runId = Date.now();
    renderRef.current = runId;

    let cancelled = false;
    (async () => {
      try {
        const dataUrls = await renderAllThumbnails(
          bytesForThumb,
          pageCountForThumb,
          220,
          (index, dataUrl) => {
            if (cancelled) return;
            setStatus((prev) => {
              if (prev.kind !== "preview") return prev;
              if (renderRef.current !== runId) return prev;
              const next = new Map(prev.thumbnails);
              next.set(index, dataUrl);
              return { ...prev, thumbnails: next };
            });
          }
        );
        if (!cancelled && renderRef.current === runId) {
          setStatus((prev) => {
            if (prev.kind !== "preview") return prev;
            return { ...prev, thumbnails: dataUrls, loadingThumbnails: false };
          });
        }
      } catch {
        if (!cancelled) {
          setStatus((prev) => {
            if (prev.kind !== "preview") return prev;
            return { ...prev, loadingThumbnails: false };
          });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [bytesForThumb, pageCountForThumb]);

  return (
    <div className="rpp-tool-card" style={{ position: "relative" }}>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="rpp-sr-only"
        onChange={(e) => handleFiles(e.currentTarget.files)}
      />

      {(status.kind === "idle" || status.kind === "error") && (
        <>
          <div className="rpp-steps" style={{ marginBottom: "var(--rpp-space-8)" }}>
            <span className="rpp-step rpp-step-active">Upload your PDF</span>
            <span className="rpp-step">Select pages to remove</span>
            <span className="rpp-step">Download the remaining file</span>
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
              <svg
                className="rpp-icon"
                style={{ width: "48px", height: "48px" }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 16V4m0 0l-4 4m4-4l4 4" />
                <path d="M4 17a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v1H4z" />
              </svg>
            </div>
            <div className="rpp-upload-zone-title">Upload PDF</div>
            <p className="rpp-body-sm rpp-upload-zone-meta">
              Drop a PDF here or click to browse. Supports PDFs up to 50 MB and 200 pages.
            </p>
          </div>
          {status.kind === "error" && (
            <div className="rpp-notice rpp-notice-error" style={{ marginTop: "var(--rpp-space-6)" }}>
              <svg
                className="rpp-icon rpp-notice-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
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
          <p className="rpp-body" style={{ marginBottom: "var(--rpp-space-2)" }}>
            Reading <span className="rpp-mono">{status.name}</span>...
          </p>
          <button className="rpp-btn rpp-btn-tertiary" style={{ marginTop: "var(--rpp-space-4)" }} onClick={reset}>
            Cancel
          </button>
        </div>
      )}

      {status.kind === "preview" && (
        <>
          <div className="rpp-notice rpp-notice-info" style={{ marginBottom: "var(--rpp-space-6)" }}>
            <svg
              className="rpp-icon rpp-notice-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <div>
              <div className="rpp-notice-title">Click thumbnails to select pages to remove</div>
              <div className="rpp-notice-body">Selected pages will be removed from the final PDF.</div>
            </div>
          </div>
          <div className="rpp-page-grid" style={{ marginBottom: "var(--rpp-space-6)" }}>
            {status.pages.map((page) => {
              const selected = status.selected.has(page.index);
              const thumbSrc = status.thumbnails.get(page.index);
              return (
                <button
                  key={page.index}
                  type="button"
                  className={`rpp-page-thumb ${selected ? "rpp-page-thumb-selected" : ""}`}
                  onClick={() => togglePage(page.index)}
                  aria-pressed={selected}
                >
                  {thumbSrc ? (
                    <img
                      src={thumbSrc}
                      alt={`Thumbnail of page ${page.number}`}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        borderRadius: "var(--rpp-radius-sm)",
                        pointerEvents: "none",
                      }}
                    />
                  ) : (
                    <>
                      <div className="line w-30" />
                      <div className="line w-60" />
                      <div className="line w-85" />
                    </>
                  )}
                  <div className="rpp-page-number">Page {page.number}</div>
                </button>
              );
            })}
          </div>
          <div
            className="rpp-flex rpp-justify-between rpp-items-center"
            style={{ gap: "var(--rpp-space-4)", flexWrap: "wrap" }}
          >
            <span className="rpp-body-sm">{status.selected.size} pages selected</span>
            <div className="rpp-flex" style={{ gap: "var(--rpp-space-3)" }}>
              <button className="rpp-btn rpp-btn-secondary" onClick={reset}>
                Clear selection
              </button>
              <button className="rpp-btn rpp-btn-primary" onClick={removeSelected}>
                Remove selected pages
              </button>
            </div>
          </div>
        </>
      )}

      {status.kind === "processing" && (
        <div className="rpp-processing-overlay" style={{ position: "static", minHeight: "200px" }}>
          <div className="rpp-spinner" />
          <p className="rpp-body">Removing pages...</p>
        </div>
      )}

      {status.kind === "done" && (
        <>
          <div className="rpp-notice rpp-notice-success" style={{ marginBottom: "var(--rpp-space-6)" }}>
            <svg
              className="rpp-icon rpp-notice-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12l5 5L20 7" />
            </svg>
            <div>
              <div className="rpp-notice-title">Done! {status.remaining} pages remaining</div>
              <div className="rpp-notice-body">Your PDF has been updated without watermark.</div>
            </div>
          </div>
          <a href={status.url} download={status.filename} className="rpp-btn rpp-btn-primary">
            Download remaining PDF
          </a>
          <button className="rpp-btn rpp-btn-secondary" style={{ marginLeft: "var(--rpp-space-3)" }} onClick={reset}>
            Process another PDF
          </button>
        </>
      )}
    </div>
  );
}
