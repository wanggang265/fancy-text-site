import { buildMetadata } from '@/lib/seo';
import MergeTool from "@/components/MergeTool";
import StructuredData from "@/components/StructuredData";

export const metadata = buildMetadata({
  title: "Merge PDFs Online | RemovePDFPages",
  description: "Combine multiple PDF files into one document. Reorder pages and merge in seconds. No signup required.",
  path: "/merge",
  type: "website",
});

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

            <div className="rpp-card" style={{ marginTop: "var(--rpp-space-8)" }}>
              <h2 className="rpp-heading-2">How do I merge multiple PDFs into one file?</h2>
              <p className="rpp-body" style={{ marginTop: "var(--rpp-space-4)", color: "var(--rpp-ink-700)" }}>
                Start by dragging your PDF files into the merge tool or clicking the upload area to browse your device. Each file appears as a thumbnail strip, and you can rearrange the order by dragging the strips into the sequence you need. Once everything is in the right order, click the merge button to combine every page into a single PDF document. The merge runs locally in your browser, so your files are never sent to our servers and no watermark is added to the output. This is useful for combining contracts, reports, scanned pages, invoices, and presentations into one easy-to-share file. Because the entire process stays on your device, your documents remain private and you can download the merged PDF immediately without waiting for a server to respond. You can merge as many files as you need within the free fair-use limits, making it a fast way to organize paperwork or combine attachments.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
