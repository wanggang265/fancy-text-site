import { buildMetadata } from '@/lib/seo';
import RemovePagesTool from "@/components/RemovePagesTool";
import StructuredData from "@/components/StructuredData";

export const metadata = buildMetadata({
  title: "Remove PDF Pages Online | RemovePDFPages",
  description: "Delete pages from any PDF online. Select the pages you want to remove, then download the rest. No upload needed \u2014 processed in your browser.",
  path: "/remove-pages",
  type: "website",
});

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "RemovePDFPages Remove Pages",
  applicationCategory: "BrowserApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function RemovePagesPage() {
  return (
    <>
      <StructuredData schema={schema} />
      <a href="#main" className="rpp-sr-only">
        Skip to content
      </a>
      <main id="main">
        <section className="rpp-section" style={{ paddingBottom: 0 }}>
          <div className="rpp-workspace">
            <span
              className="rpp-badge rpp-badge-free"
              style={{ marginBottom: "var(--rpp-space-3)" }}
            >
              Currently free
            </span>
            <h1 className="rpp-display">Remove PDF Pages Online</h1>
            <p
              className="rpp-lead"
              style={{ marginTop: "var(--rpp-space-3)", maxWidth: "640px" }}
            >
              Upload your PDF, select the pages to remove, and download the clean file in seconds. No signup, no watermark.
            </p>
          </div>
        </section>

        <section className="rpp-section-sm">
          <div className="rpp-workspace">
            <RemovePagesTool />

            <div className="rpp-card" style={{ marginTop: "var(--rpp-space-8)" }}>
              <h2 className="rpp-heading-2">Features</h2>
              <ul
                style={{
                  marginTop: "var(--rpp-space-4)",
                  display: "grid",
                  gap: "var(--rpp-space-3)",
                  color: "var(--rpp-ink-700)",
                }}
              >
                <li className="rpp-flex rpp-items-center rpp-gap-2">
                  <svg className="rpp-icon" viewBox="0 0 24 24" fill="none" stroke="#65A30D" strokeWidth="2">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                  Works in your browser by default
                </li>
                <li className="rpp-flex rpp-items-center rpp-gap-2">
                  <svg className="rpp-icon" viewBox="0 0 24 24" fill="none" stroke="#65A30D" strokeWidth="2">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                  Your file does not leave your device
                </li>
                <li className="rpp-flex rpp-items-center rpp-gap-2">
                  <svg className="rpp-icon" viewBox="0 0 24 24" fill="none" stroke="#65A30D" strokeWidth="2">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                  Supports PDFs up to 50 MB and 200 pages
                </li>
                <li className="rpp-flex rpp-items-center rpp-gap-2">
                  <svg className="rpp-icon" viewBox="0 0 24 24" fill="none" stroke="#65A30D" strokeWidth="2">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                  No watermark on the output
                </li>
              </ul>
            </div>

            <div
              className="rpp-notice rpp-notice-warning"
              style={{ marginTop: "var(--rpp-space-8)" }}
            >
              <svg
                className="rpp-icon rpp-notice-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <div>
                <div className="rpp-notice-title">Free to use</div>
                <div className="rpp-notice-body">
                  Fair-use limits apply: up to 50 MB per file, 200 pages per file, and 10–20 free tasks per hour from the same IP.
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
