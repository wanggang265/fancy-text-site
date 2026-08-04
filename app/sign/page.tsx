import { buildMetadata } from '@/lib/seo';
import SignTool from "@/components/SignTool";
import StructuredData from "@/components/StructuredData";

export const metadata = buildMetadata({
  title: "Sign PDF Online | RemovePDFPages",
  description: "Add a visible signature or initials to any PDF online. Fast, free, and private. Not a digital certificate signature.",
  path: "/sign",
  type: "website",
});

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "RemovePDFPages Sign PDF",
  applicationCategory: "BrowserApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function SignPage() {
  return (
    <>
      <StructuredData schema={schema} />
      <a href="#main" className="rpp-sr-only">
        Skip to content
      </a>
      <main id="main">
        <section className="rpp-section rpp-section-hero">
          <div className="rpp-container rpp-text-center">
            <h1 className="rpp-display">Sign PDF Online</h1>
            <p
              className="rpp-lead"
              style={{ maxWidth: "640px", margin: "var(--rpp-space-4) auto 0" }}
            >
              Add your signature, initials, or a date to any PDF. Free and simple. No account needed.
            </p>
          </div>
        </section>
        <section className="rpp-section">
          <div className="rpp-workspace">
            <SignTool />

            <div className="rpp-card" style={{ marginTop: "var(--rpp-space-8)" }}>
              <h2 className="rpp-heading-2">How it works</h2>
              <ol
                style={{
                  marginTop: "var(--rpp-space-4)",
                  display: "grid",
                  gap: "var(--rpp-space-3)",
                  color: "var(--rpp-ink-700)",
                  paddingLeft: "var(--rpp-space-6)",
                }}
              >
                <li>Upload the PDF you want to sign.</li>
                <li>Draw your signature in the box above.</li>
                <li>Download the signed PDF.</li>
              </ol>
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
                <div className="rpp-notice-title">Signature disclaimer</div>
                <div className="rpp-notice-body">
                  This signature is a visual mark only. It is not a digital certificate signature and is not legally binding for regulated electronic-signing requirements.
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
