import { buildMetadata } from '@/lib/seo';
import ConvertToWordTool from "@/components/ConvertToWordTool";
import StructuredData from "@/components/StructuredData";

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "RemovePDFPages Convert PDF to Word",
  applicationCategory: "BrowserApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    name: "Full Editor Launch Special",
    price: "19",
    priceCurrency: "USD",
    priceFrequency: "P1M",
    availability: "https://schema.org/InStock",
    url: "https://removepdfpages.net/checkout?plan=monthly",
  },
};

export const metadata = buildMetadata({
  title: "Convert PDF to Word Online | RemovePDFPages",
  description: "Convert PDF to editable Word documents with the RemovePDFPages Full Editor. $19/month Launch Special, $99/year, or $59 one-time license. Files are deleted from our server within 1 hour.",
  path: "/convert-to-word",
  type: "website",
});

export default function Page() {
  return (
    <>
      <StructuredData schema={schema} />

      <main id="main">
        <section className="rpp-section rpp-section-hero">
          <div className="rpp-container rpp-text-center">
            <h1 className="rpp-display">Convert PDF to Word Online</h1>
            <p
              className="rpp-lead"
              style={{ maxWidth: "640px", margin: "var(--rpp-space-4) auto 0" }}
            >
              Turn PDFs into DOCX or RTF files you can edit in Word. Subscribe from $19/month or
              $99/year, or buy a one-time license for $59. Use on up to 5 devices. Each paid plan
              includes 30 included conversions per month.
            </p>
          </div>
        </section>

        <section className="rpp-section">
          <div className="rpp-workspace">
            <ConvertToWordTool />

            <div className="rpp-notice rpp-notice-warning" style={{ marginTop: "var(--rpp-space-8)" }}>
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
                <div className="rpp-notice-title">Temporary file storage</div>
                <div className="rpp-notice-body">
                  During conversion, files are held on our servers for 1-hour temporary backend
                  retention so you can retry downloads. After that, they are permanently deleted.
                  We do not use your files to train models or share them with third parties.
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
