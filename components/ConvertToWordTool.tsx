"use client";

import { useEffect, useRef, useState } from "react";

type ViewState = "paywall" | "authorized" | "processing" | "success" | "quota-exceeded" | "top-up";

const demoStates: { value: ViewState; label: string }[] = [
  { value: "paywall", label: "Paywall" },
  { value: "authorized", label: "Authorized" },
  { value: "processing", label: "Processing" },
  { value: "success", label: "Success" },
  { value: "quota-exceeded", label: "Quota exceeded" },
  { value: "top-up", label: "Top-up" },
];

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

export default function ConvertToWordTool() {
  const [state, setState] = useState<ViewState>("paywall");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Simulate conversion: processing → success after 1.5s.
  useEffect(() => {
    if (state !== "processing") return;
    const timer = setTimeout(() => {
      setState("success");
    }, 1500);
    return () => clearTimeout(timer);
  }, [state]);

  // Create a fake DOCX download on demand.
  const handleDownload = () => {
    const filename = selectedFile ? selectedFile.name.replace(/\.pdf$/i, ".docx") : "converted.docx";
    const blob = new Blob(["Mock DOCX content for RemovePDFPages"], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDemoStateChange = (next: ViewState) => {
    setState(next);
    if (next === "authorized") {
      setSelectedFile(null);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0] ?? null;
    if (!file) return;
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      return;
    }
    setSelectedFile(file);
  };

  const handleConvert = () => {
    if (!selectedFile) return;
    setState("processing");
  };

  const handleConvertAnother = () => {
    setState("authorized");
    setSelectedFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const quotaBar = (label: string, percent: number) => (
    <div className="rpp-quota-bar">
      <div className="rpp-quota-track">
        <div className="rpp-quota-fill" style={{ width: `${percent}%` }} />
      </div>
      <p className="rpp-quota-label">{label}</p>
    </div>
  );

  return (
    <div className="rpp-tool-card" style={{ position: "relative" }}>
      {/* Mock state switcher for component review / local development */}
      <div
        style={{
          marginBottom: "var(--rpp-space-6)",
          display: "flex",
          gap: "var(--rpp-space-2)",
          flexWrap: "wrap",
        }}
      >
        <span className="rpp-body-sm" style={{ alignSelf: "center", marginRight: "var(--rpp-space-2)" }}>
          Mock state:
        </span>
        {demoStates.map((s) => (
          <button
            key={s.value}
            type="button"
            className={`rpp-btn rpp-btn-small ${state === s.value ? "rpp-btn-primary" : "rpp-btn-secondary"}`}
            onClick={() => handleDemoStateChange(s.value)}
          >
            {s.label}
          </button>
        ))}
      </div>

      {state === "paywall" && (
        <>
          {quotaBar("You have 2 free conversions left this 30-day period.", 33)}
          <div className="rpp-notice rpp-notice-info" style={{ marginBottom: "var(--rpp-space-6)" }}>
            <InfoIcon />
            <div>
              <div className="rpp-notice-title">This feature is part of the Full Editor</div>
              <div className="rpp-notice-body">
                Convert PDF to Word is included with the Full Editor. Free users get 3 conversions per 30 days; paid plans include 10 per month, with extra conversions available as needed.
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
                <li>10 conversions per month</li>
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
              <p className="rpp-pricing-card-period">10 conversions</p>
              <p className="rpp-body-sm" style={{ color: "var(--rpp-ink-600)", marginTop: "var(--rpp-space-2)" }}>
                Or $0.50 each
              </p>
              <button
                type="button"
                className="rpp-btn rpp-btn-secondary rpp-btn-full"
                style={{ marginTop: "var(--rpp-space-5)" }}
                onClick={() => handleDemoStateChange("top-up")}
              >
                Buy 10 more conversions for $5
              </button>
            </div>
          </div>
        </>
      )}

      {state === "authorized" && (
        <>
          {quotaBar("10 included conversions remaining this month.", 80)}
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
              Drop your PDF here or click to browse. Max 50 MB and 200 pages for free users.
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

      {state === "processing" && (
        <div className="rpp-processing-overlay" style={{ position: "static", minHeight: "220px" }}>
          <div className="rpp-spinner" />
          <p className="rpp-body">Converting PDF to Word...</p>
          <p className="rpp-caption" style={{ marginTop: "var(--rpp-space-2)", maxWidth: "360px", textAlign: "center" }}>
            Complex layouts may take longer. Results vary based on formatting, images, and fonts.
          </p>
        </div>
      )}

      {state === "success" && (
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

      {state === "quota-exceeded" && (
        <>
          <div className="rpp-notice rpp-notice-warning" style={{ marginBottom: "var(--rpp-space-6)" }}>
            <WarningIcon />
            <div>
              <div className="rpp-notice-title">You’ve used your included conversions</div>
              <div className="rpp-notice-body">
                You’ve used your 10 included conversions this month. Top up to keep converting, or upgrade to a plan with more included conversions.
              </div>
            </div>
          </div>
          <div className="rpp-flex" style={{ gap: "var(--rpp-space-3)", flexWrap: "wrap" }}>
            <a href="/pricing" className="rpp-btn rpp-btn-primary">
              View pricing
            </a>
            <button type="button" className="rpp-btn rpp-btn-secondary" onClick={() => handleDemoStateChange("top-up")}>
              Top up
            </button>
          </div>
        </>
      )}

      {state === "top-up" && (
        <>
          <div className="rpp-notice rpp-notice-info" style={{ marginBottom: "var(--rpp-space-6)" }}>
            <InfoIcon />
            <div>
              <div className="rpp-notice-title">Choose a plan or add credits</div>
              <div className="rpp-notice-body">
                All paid plans include 10 Convert to Word conversions per month. Credits roll over for 30 days.
              </div>
            </div>
          </div>
          <div className="rpp-pricing-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
            <div className="rpp-pricing-card">
              <h3 className="rpp-pricing-card-name">Free</h3>
              <p className="rpp-pricing-card-desc">3 Convert to Word conversions per 30 days.</p>
              <div className="rpp-pricing-card-price" style={{ fontSize: "var(--rpp-scale-5)" }}>
                $0
              </div>
              <a href="/convert-to-word" className="rpp-btn rpp-btn-secondary rpp-btn-full">
                Continue free
              </a>
            </div>
            <div className="rpp-pricing-card rpp-pricing-card-popular">
              <div className="rpp-pricing-card-popular-flag">Launch Special</div>
              <h3 className="rpp-pricing-card-name">Monthly</h3>
              <p className="rpp-pricing-card-desc">10 conversions per month. Cancel anytime.</p>
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
              <p className="rpp-pricing-card-desc">Best value. 10 conversions per month.</p>
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
              <p className="rpp-pricing-card-desc">One-time license. 10 conversions per month.</p>
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
            <p className="rpp-body-sm">Need more this month? Buy 10 extra conversions for $5.</p>
            <a href="/checkout?topup=10" className="rpp-btn rpp-btn-secondary" style={{ marginTop: "var(--rpp-space-3)" }}>
              Buy 10 conversions for $5
            </a>
          </div>
        </>
      )}
    </div>
  );
}
