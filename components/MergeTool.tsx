"use client";

import { useCallback, useRef, useState } from "react";

interface FileItem {
  id: string;
  file: File;
  bytes: ArrayBuffer;
  pageCount: number;
}

type Status =
  | { kind: "idle" }
  | { kind: "reading"; name: string }
  | { kind: "ready"; items: FileItem[] }
  | { kind: "processing" }
  | { kind: "done"; url: string; filename: string; pages: number }
  | { kind: "error"; message: string };

export default function MergeTool() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback(async (files: FileList | null) => {
    if (!files?.length) return;
    const valid = Array.from(files).filter(
      (f) => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf")
    );
    if (!valid.length) {
      setStatus({ kind: "error", message: "Please upload PDF files only." });
      return;
    }

    const existingItems = status.kind === "ready" ? status.items : [];
    setStatus({ kind: "reading", name: valid.map((f) => f.name).join(", ") });
    try {
      const mod = await import("pdf-lib");
      const newItems: FileItem[] = [];
      for (const file of valid) {
        if (file.size > 50 * 1024 * 1024) throw new Error(`${file.name} is over 50 MB.`);
        const bytes = await file.arrayBuffer();
        const doc = await mod.PDFDocument.load(bytes, { updateMetadata: false });
        if (doc.getPageCount() > 200) throw new Error(`${file.name} has more than 200 pages.`);
        newItems.push({ id: Math.random().toString(36).slice(2), file, bytes, pageCount: doc.getPageCount() });
      }

      const combined = [...existingItems, ...newItems];
      const seen = new Set<string>();
      const items = combined.filter((item) => {
        const key = `${item.file.name}|${item.file.size}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      setStatus({ kind: "ready", items });
    } catch (err) {
      setStatus({ kind: "error", message: err instanceof Error ? err.message : "Could not read one of the PDFs." });
    }
  }, [status]);

  const moveItem = useCallback((index: number, direction: -1 | 1) => {
    setStatus((prev) => {
      if (prev.kind !== "ready") return prev;
      const items = [...prev.items];
      const target = index + direction;
      if (target < 0 || target >= items.length) return prev;
      [items[index], items[target]] = [items[target], items[index]];
      return { ...prev, items };
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setStatus((prev) => {
      if (prev.kind !== "ready") return prev;
      const items = prev.items.filter((i) => i.id !== id);
      if (items.length === 0) return { kind: "idle" };
      return { ...prev, items };
    });
  }, []);

  const merge = useCallback(async () => {
    if (status.kind !== "ready" || status.items.length < 2) {
      setStatus({ kind: "error", message: "Add at least two PDFs to merge." });
      return;
    }
    setStatus({ kind: "processing" });
    try {
      const mod = await import("pdf-lib");
      const merged = await mod.PDFDocument.create();
      let pages = 0;
      for (const item of status.items) {
        const doc = await mod.PDFDocument.load(item.bytes, { updateMetadata: false });
        const copied = await merged.copyPages(doc, doc.getPageIndices());
        copied.forEach((page) => {
          merged.addPage(page);
          pages++;
        });
      }
      const bytes = await merged.save();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setStatus({ kind: "done", url, filename: "merged.pdf", pages });
    } catch {
      setStatus({ kind: "error", message: "Could not merge the PDFs." });
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
        multiple
        className="rpp-sr-only"
        onChange={(e) => {
          addFiles(e.currentTarget.files);
          e.currentTarget.value = "";
        }}
      />

      {(status.kind === "idle" || status.kind === "error") && (
        <>
          <div className="rpp-steps" style={{ marginBottom: "var(--rpp-space-8)" }}>
            <span className="rpp-step rpp-step-active">Upload PDFs</span>
            <span className="rpp-step">Arrange order</span>
            <span className="rpp-step">Download merged file</span>
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
            <div className="rpp-upload-zone-title">Upload PDFs to merge</div>
            <p className="rpp-body-sm rpp-upload-zone-meta">Drop PDFs here or click to browse. Up to 50 MB each and 200 pages each.</p>
          </div>
          {status.kind === "error" && (
            <div className="rpp-notice rpp-notice-error" style={{ marginTop: "var(--rpp-space-6)" }}>
              <svg className="rpp-icon rpp-notice-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <div>
                <div className="rpp-notice-title">Could not read a PDF</div>
                <div className="rpp-notice-body">{status.message}</div>
              </div>
            </div>
          )}
        </>
      )}

      {status.kind === "reading" && (
        <div style={{ textAlign: "center", padding: "var(--rpp-space-8)" }}>
          <div className="rpp-spinner" style={{ margin: "0 auto var(--rpp-space-4)" }} />
          <p className="rpp-body">Reading files...</p>
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
              <div className="rpp-notice-title">Arrange the PDFs in the order you want</div>
              <div className="rpp-notice-body">The first file will appear first in the merged PDF.</div>
            </div>
          </div>
          <div style={{ display: "grid", gap: "var(--rpp-space-3)", marginBottom: "var(--rpp-space-6)" }}>
            {status.items.map((item, index) => (
              <div
                key={item.id}
                className="rpp-flex rpp-items-center rpp-justify-between"
                style={{
                  padding: "var(--rpp-space-3)",
                  border: "1px solid var(--rpp-ink-200)",
                  borderRadius: "var(--rpp-radius-md)",
                  gap: "var(--rpp-space-3)",
                  flexWrap: "wrap",
                }}
              >
                <span className="rpp-body" style={{ color: "var(--rpp-ink-900)" }}>
                  {index + 1}. {item.file.name} ({item.pageCount} pages)
                </span>
                <div className="rpp-flex" style={{ gap: "var(--rpp-space-2)" }}>
                  <button className="rpp-btn rpp-btn-secondary rpp-btn-small" onClick={() => moveItem(index, -1)} disabled={index === 0}>
                    Up
                  </button>
                  <button className="rpp-btn rpp-btn-secondary rpp-btn-small" onClick={() => moveItem(index, 1)} disabled={index === status.items.length - 1}>
                    Down
                  </button>
                  <button className="rpp-btn rpp-btn-secondary rpp-btn-small" onClick={() => removeItem(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="rpp-flex" style={{ gap: "var(--rpp-space-3)", flexWrap: "wrap" }}>
            <button className="rpp-btn rpp-btn-secondary" onClick={() => inputRef.current?.click()}>
              Add more PDFs
            </button>
            <button className="rpp-btn rpp-btn-primary" onClick={merge}>
              Merge PDFs
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
          <p className="rpp-body">Merging PDFs...</p>
        </div>
      )}

      {status.kind === "done" && (
        <>
          <div className="rpp-notice rpp-notice-success" style={{ marginBottom: "var(--rpp-space-6)" }}>
            <svg className="rpp-icon rpp-notice-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12l5 5L20 7" />
            </svg>
            <div>
              <div className="rpp-notice-title">Done! {status.pages} pages merged</div>
              <div className="rpp-notice-body">Your merged PDF is ready.</div>
            </div>
          </div>
          <a href={status.url} download={status.filename} className="rpp-btn rpp-btn-primary">
            Download merged PDF
          </a>
          <button className="rpp-btn rpp-btn-secondary" style={{ marginLeft: "var(--rpp-space-3)" }} onClick={reset}>
            Merge more PDFs
          </button>
        </>
      )}
    </div>
  );
}
