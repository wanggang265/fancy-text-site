import { buildMetadata } from '@/lib/seo';
import CompressTool from "@/components/CompressTool";
import StructuredData from "@/components/StructuredData";

export const metadata = buildMetadata({
  title: "Compress PDF Online | RemovePDFPages",
  description: "Reduce PDF file size online. Choose a compression level and download a smaller PDF. No signup required.",
  path: "/compress",
  type: "website",
});

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "RemovePDFPages Compress PDF",
  applicationCategory: "BrowserApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function CompressPage() {
  return (
    <>
      <StructuredData schema={schema} />
      <a href="#main" className="rpp-sr-only">
        Skip to content
      </a>
      <main id="main">
        <section className="rpp-section" style={{ paddingBottom: 0 }}>
          <div className="rpp-workspace rpp-text-center">
            <span className="rpp-badge rpp-badge-free">Currently free</span>
            <h1 className="rpp-display" style={{ marginTop: "var(--rpp-space-3)" }}>
              Compress PDF Online
            </h1>
            <p
              className="rpp-lead"
              style={{ marginTop: "var(--rpp-space-3)", maxWidth: "640px", marginInline: "auto" }}
            >
              Make your PDF smaller while keeping it readable. Choose a compression level and download.
            </p>
          </div>
        </section>
        <section className="rpp-section-sm">
          <div className="rpp-workspace">
            <CompressTool />

            <div className="rpp-card" style={{ marginTop: "var(--rpp-space-8)" }}>
              <h2 className="rpp-heading-2">How do I compress a PDF without losing quality?</h2>
              <p className="rpp-body" style={{ marginTop: "var(--rpp-space-4)", color: "var(--rpp-ink-700)" }}>
                Open the Compress tool and choose a compression level that balances file size with readability. A lighter setting keeps text and images crisp for sharing or printing, while a stronger setting makes the file much smaller for email attachments or storage. The compression runs entirely in your browser, so your document stays on your device and is never uploaded to our servers. We do not add watermarks to the compressed PDF, and the output keeps your original formatting as much as possible for the chosen level. Free tasks include files up to 50 MB and 200 pages, with a fair-use limit of 10 to 20 conversions per hour from the same IP address. If you need a smaller result or want to batch-compress several documents, the optional Full Editor gives you additional control over image quality and file size.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
