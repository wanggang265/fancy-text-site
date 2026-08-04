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
          </div>
        </section>
      </main>
    </>
  );
}
