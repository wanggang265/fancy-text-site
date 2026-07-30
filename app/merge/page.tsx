import MergeTool from "@/components/MergeTool";
import StructuredData from "@/components/StructuredData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merge PDFs Online | RemovePDFPages",
  description:
    "Combine multiple PDF files into one document. Reorder pages and merge in seconds. No signup required.",
  alternates: {
    canonical: "https://removepdfpages.net/merge",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "RemovePDFPages Merge PDFs",
  applicationCategory: "BrowserApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function MergePage() {
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
              Merge PDFs Online
            </h1>
            <p
              className="rpp-lead"
              style={{ marginTop: "var(--rpp-space-3)", maxWidth: "640px", marginInline: "auto" }}
            >
              Upload two or more PDFs and combine them in the order you choose. No signup required.
            </p>
          </div>
        </section>
        <section className="rpp-section-sm">
          <div className="rpp-workspace">
            <MergeTool />
          </div>
        </section>
      </main>
    </>
  );
}
