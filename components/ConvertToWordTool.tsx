"use client";

import { useEffect, useRef, useState } from "react";
import { getAnonId, getQuota, convertToWord, emitCreditsRefresh, type QuotaStatus, type QuotaResponse } from "@/lib/api";

type ViewState = "loading" | "paywall" | "authorized" | "processing" | "success" | "quota-exceeded" | "top-up";

function InfoIcon() {
  return (
    <svg className="rpp-icon rpp-notice-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function SuccessIcon() {
  return (
    <svg className="rpp-icon rpp-notice-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg className="rpp-icon rpp-notice-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg className="rpp-icon" style={{ width: "48px", height: "48px" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 16V4m0 0l-4 4m4-4l4 4" />
      <path d="M4 17a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v1H4z" />
    </svg>
  );
}

function isAllowed(q: QuotaStatus | null): boolean {
  if (!q) return false;
  if (q.plan === "free") {
    return q.free_conversions_used < q.free_conversions_limit;
  }
  const includedRemaining = q.included_conversions_limit - q.included_conversions_used;
  return includedRemaining > 0 || q.credits_balance > 0;
}

function quotaLabel(q: QuotaStatus): { label: string; percent: number } {
  if (q.plan === "free") {
    const remaining = Math.max(0, q.free_conversions_limit - q.free_conversions_used);
    const pct = Math.round((remaining / Math.max(1, q.free_conversions_limit)) * 100);
    return {
      label: `${remaining} free conversion${remaining === 1 ? "" : "s"} remaining this 30-day period.`,
      percent: pct,
    };
  }
  const includedRemaining = Math.max(0, q.included_conversions_limit - q.included_conversions_used);
  const creditText = q.credits_balance > 0 ? ` (${q.credits_balance} credit${q.credits_balance === 1 ? "" : "s"} available)` : "";
  const pct = Math.round((includedRemaining / Math.max(1, q.included_conversions_limit)) * 100);
  return {
    label: `${includedRemaining} included conversion${includedRemaining === 1 ? "" : "s"} remaining this month.${creditText}`,
    percent: pct,
  };
}

export default function ConvertToWordTool() {
  const [view, setView] = useState<ViewState>("loading");
  const [quota, setQuota] = useState<QuotaStatus | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<{ downloadUrl: string; fileName: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMounted = useRef(true);

  const anonId = typeof window !== "undefined" ? getAnonId() : "";

  const refreshQuota = async () => {
    try {
      const data: QuotaResponse = await getQuota(anonId);
      if (!isMounted.current) return;
      setQuota(data.quota);
      const allowed = isAllowed(data.quota);
      setView((current) => {
        if (current === "processing" || current === "success") return current;
        return allowed ? "authorized" : "quota-exceeded";
      });
    } catch (err) {
      if (!isMounted.current) return;
      setError(err instanceof Error ? err.message : "Unable to load quota.");
      setView("quota-exceeded");
    }
  };

  useEffect(() => {
    let cancelled = false;
    getQuota(anonId)
      .then((data) => {
        if (cancelled) return;
        setQuota(data.quota);
        setView((current) => {
          if (current === "processing" || current === "success") return current;
          return isAllowed(data.quota) ? "authorized" : "quota-exceeded";
        });
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Unable to load quota.");
        setView("quota-exceeded");
      });
    return () => {
      cancelled = true;
      isMounted.current = false;
    };
  }, [anonId]);

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0] ?? null;
    if (!file) return;
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setError("Please upload a PDF file.");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setError("File too large. Max 50 MB.");
      return;
    }
    setError(null);
    setSelectedFile(file);
  };

  const handleConvert = async () => {
    if (!selectedFile) return;
    if (!isAllowed(quota)) {
      setView("quota-exceeded");
      return;
    }
    setView("processing");
    setError(null);
    try {
      const data = await convertToWord(selectedFile, "docx", anonId);
      if (!isMounted.current) return;
      if (!data.ok || !data.download_url) {
        throw new Error(data.message || "Conversion failed.");
      }
      setResult({ downloadUrl: data.download_url, fileName: data.file_name || selectedFile.name.replace(/\.pdf$/i, ".docx") });
      setView("success");
      // Refresh displayed quota and header credits
      await refreshQuota();
      emitCreditsRefresh();
    } catch (err) {
      if (!isMounted.current) return;
      const code = (err as Error & { code?: string }).code;
      const message = err instanceof Error ? err.message : "Conversion failed.";
      if (code === "FREE_LIMIT_REACHED" || code === "PAID_LIMIT_REACHED" || code === "NO_CREDITS" || code === "QUOTA_EXCEEDED") {
        setView("quota-exceeded");
      } else {
        setView("authorized");
      }
      setError(message);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.downloadUrl;
    a.download = result.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleConvertAnother = () => {
    setSelectedFile(null);
    setResult(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
    refreshQuota();
  };

  const quotaBar = (label: string, percent: number) => (
    <div className="rpp-quota-bar">
      <div className="rpp-quota-track">
        <div className="rpp-quota-fill" style={{ width: `${Math.max(0, Math.min(100, percent))}%` }} />
      </div>
      <p className="rpp-quota-label">{label}</p>
    </div>
  );

  if (view === "loading") {
    return (
      <div className="rpp-tool-card">
        <div className="rpp-processing-overlay" style={{ position: "static", minHeight: "220px" }}>
          <div className="rpp-spinner" />
          <p className="rpp-body">Loading your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rpp-tool-card" style={{ position: "relative" }}>
      {error && view !== "quota-exceeded" && (
        <div className="rpp-notice rpp-notice-warning" style={{ marginBottom: "var(--rpp-space-6)" }}>
          <WarningIcon />
          <div>
            <div className="rpp-notice-title">Something went wrong</div>
            <div className="rpp-notice-body">{error}</div>
          </div>
        </div>
      )}

      {(view === "paywall" || view === "quota-exceeded") && (
        <>
          {quota && !isAllowed(quota) && quotaBar(quotaLabel(quota).label, quotaLabel(quota).percent)}
          <div className="rpp-notice rpp-notice-info" style={{ marginBottom: "var(--rpp-space-6)" }}>
            <InfoIcon />
            <div>
              <div className="rpp-notice-title">This feature is part of the Full Editor</div>
              <div className="rpp-notice-body">
                Convert PDF to Word is included with the Full Editor. Free users get {quota?.free_conversions_limit ?? 3} conversions per 30 days; paid plans include 30 per month, with extra conversions available as needed.
              </div>
            </div>
          </div>
          <div className="rpp-upsell-grid">
            <div className="rpp-upsell-card">
              <h3 className="rpp-heading-3">Monthly</h3>
              <div className="rpp-pricing-card-price">
                <span className="rpp-pricing-card-old">$29</span>
                <span>$19</span>
                <span className="rpp-pricing-card-unit">/month</span>
              </div>
              <ul className="rpp-pricing-card-list" style={{ marginTop: "var(--rpp-space-4)" }}>
                <li>30 conversions per month</li>
                <li>All PDF tools unlocked</li>
                <li>Use on up to 5 devices</li>
              </ul>
              <a href="/pricing" className="rpp-btn rpp-btn-primary rpp-btn-full" style={{ marginTop: "var(--rpp-space-5)" }}>
                Get Full Editor — $19/month Launch Special
              </a>
            </div>
            <div className="rpp-upsell-card">
              <h3 className="rpp-heading-3">Top-up</h3>
              <div className="rpp-pricing-card-price" style={{ fontSize: "var(--rpp-scale-5)" }}>
                $5
              </div>
              <p className="rpp-pricing-card-period">2 credits minimum</p>
              <p className="rpp-body-sm" style={{ color: "var(--rpp-ink-600)", marginTop: "var(--rpp-space-2)" }}>
                $5 for 10 or $1 for 2
              </p>
              <button
                type="button"
                className="rpp-btn rpp-btn-secondary rpp-btn-full"
                style={{ marginTop: "var(--rpp-space-5)" }}
                onClick={() => setView("top-up")}
              >
                Buy extra credits
              </button>
            </div>
          </div>
        </>
      )}

      {view === "authorized" && quota && (
        <>
          {quotaBar(quotaLabel(quota).label, quotaLabel(quota).percent)}
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            className="rpp-sr-only"
            onChange={(e) => handleFiles(e.currentTarget.files)}
          />
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
              <UploadIcon />
            </div>
            <div className="rpp-upload-zone-title">Upload PDF to convert</div>
            <p className="rpp-upload-zone-meta">
              Drop your PDF here or click to browse. Max 50 MB and 200 pages.
            </p>
          </div>
          {selectedFile && (
            <div className="rpp-file-row" style={{ marginTop: "var(--rpp-space-5)" }}>
              <span className="rpp-mono">{selectedFile.name}</span>
              <button type="button" className="rpp-btn rpp-btn-primary" onClick={handleConvert}>
                Convert to Word
              </button>
            </div>
          )}
        </>
      )}

      {view === "processing" && (
        <div className="rpp-processing-overlay" style={{ position: "static", minHeight: "220px" }}>
          <div className="rpp-spinner" />
          <p className="rpp-body">Converting PDF to Word...</p>
          <p className="rpp-caption" style={{ marginTop: "var(--rpp-space-2)", maxWidth: "360px", textAlign: "center" }}>
            Complex layouts may take longer. Results vary based on formatting, images, and fonts.
          </p>
        </div>
      )}

      {view === "success" && result && (
        <>
          <div className="rpp-notice rpp-notice-success" style={{ marginBottom: "var(--rpp-space-6)" }}>
            <SuccessIcon />
            <div>
              <div className="rpp-notice-title">Conversion ready</div>
              <div className="rpp-notice-body">
                Your DOCX is ready to download. The file is stored for up to 1 hour, then permanently deleted.
              </div>
            </div>
          </div>
          <button type="button" className="rpp-btn rpp-btn-primary" onClick={handleDownload}>
            Download DOCX
          </button>
          <button
            type="button"
            className="rpp-btn rpp-btn-secondary"
            style={{ marginLeft: "var(--rpp-space-3)" }}
            onClick={handleConvertAnother}
          >
            Convert another PDF
          </button>
        </>
      )}

      {view === "top-up" && (
        <>
          <div className="rpp-notice rpp-notice-info" style={{ marginBottom: "var(--rpp-space-6)" }}>
            <InfoIcon />
            <div>
              <div className="rpp-notice-title">Choose a plan or add credits</div>
              <div className="rpp-notice-body">
                All paid plans include 30 Convert to Word conversions per month. Top-up credits are consumed after included conversions are used.
              </div>
            </div>
          </div>
          <div className="rpp-pricing-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
            <div className="rpp-pricing-card">
              <h3 className="rpp-pricing-card-name">Free</h3>
              <p className="rpp-pricing-card-desc">{quota?.free_conversions_limit ?? 3} Convert to Word conversions per 30 days.</p>
              <div className="rpp-pricing-card-price" style={{ fontSize: "var(--rpp-scale-5)" }}>
                $0
              </div>
              <button type="button" onClick={() => refreshQuota()} className="rpp-btn rpp-btn-secondary rpp-btn-full">
                Continue free
              </button>
            </div>
            <div className="rpp-pricing-card rpp-pricing-card-popular">
              <div className="rpp-pricing-card-popular-flag">Launch Special</div>
              <h3 className="rpp-pricing-card-name">Monthly</h3>
              <p className="rpp-pricing-card-desc">30 conversions per month. Cancel anytime.</p>
              <div className="rpp-pricing-card-price">
                <span className="rpp-pricing-card-old">$29</span>
                <span>$19</span>
                <span className="rpp-pricing-card-unit">/month</span>
              </div>
              <a href="/checkout?plan=monthly" className="rpp-btn rpp-btn-primary rpp-btn-full">
                Get Full Editor — $19/month
              </a>
            </div>
            <div className="rpp-pricing-card">
              <h3 className="rpp-pricing-card-name">Yearly</h3>
              <p className="rpp-pricing-card-desc">Best value. 30 conversions per month.</p>
              <div className="rpp-pricing-card-price">
                <span className="rpp-pricing-card-old">$149</span>
                <span>$99</span>
                <span className="rpp-pricing-card-unit">/year</span>
              </div>
              <a href="/checkout?plan=yearly" className="rpp-btn rpp-btn-secondary rpp-btn-full">
                Get yearly — $99/year
              </a>
            </div>
            <div className="rpp-pricing-card">
              <h3 className="rpp-pricing-card-name">One-time</h3>
              <p className="rpp-pricing-card-desc">One-time license. 30 conversions per month.</p>
              <div className="rpp-pricing-card-price">
                <span className="rpp-pricing-card-old">$79</span>
                <span>$59</span>
              </div>
              <a href="/checkout?plan=onetime" className="rpp-btn rpp-btn-secondary rpp-btn-full">
                Buy once — $59
              </a>
            </div>
          </div>
          <div style={{ marginTop: "var(--rpp-space-6)", textAlign: "center" }}>
            <p className="rpp-body-sm">Need more this month? Top-up credits start at $1 for 2, or $5 for 10 (minimum $1/2 credits).</p>
            <a href="/checkout?topup=10" className="rpp-btn rpp-btn-secondary" style={{ marginTop: "var(--rpp-space-3)" }}>
              Buy extra credits
            </a>
          </div>
        </>
      )}
    </div>
  );
}
