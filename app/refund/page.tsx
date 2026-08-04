import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Refund Policy - RemovePDFPages",
  description: "RemovePDFPages refund policy: 14-day refund for Full Editor subscriptions, one-time licenses, and unused top-up credits.",
  path: "/refund",
  type: "website",
});

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Refund Policy",
  description: "RemovePDFPages refund policy: 14-day refund for Full Editor subscriptions, one-time licenses, and unused top-up credits.",
  url: "https://removepdfpages.net/refund",
};

export default function Page() {
  return (
    <>
      <StructuredData schema={schema} />

<a href="#main" className="rpp-sr-only">Skip to content</a><main id="main"><section className="rpp-section rpp-section-hero"><div className="rpp-container rpp-text-center"><h1 className="rpp-display">Refund Policy</h1><span className="rpp-legal-updated">Last updated: July 29, 2026</span></div></section><section className="rpp-section"><div className="rpp-container"><div className="rpp-legal-list"><section className="rpp-legal-section"><h2>1. Refund Eligibility</h2><p>RemovePDFPages offers a 14-day, no-questions-asked refund for all Full Editor subscriptions and one-time licenses. If you are not satisfied, you may request a full refund within 14 days of your purchase date.</p></section><section className="rpp-legal-section"><h2>1.5. Top-Up Credits Refund</h2><p>Top-up credits ("2 conversions for $1" or "10 conversions for $5") are refundable only if they have not been used and the refund is requested within 14 days of purchase. Once a credit has been consumed for a conversion, it is not refundable. Refunds for unused credits are processed through Creem and may take 5–10 business days to appear on your statement. Creem processing fees are not refunded.</p></section><section className="rpp-legal-section"><h2>2. How to Request a Refund</h2><p>Submit your request through our <a href="/contact">Contact page</a> or by emailing <a href="mailto:support@removepdfpages.net">support@removepdfpages.net</a>. Include your Creem order ID and the email address used during checkout.</p></section><section className="rpp-legal-section"><h2>3. Processing Time</h2><p>Refunds are processed through Creem and usually appear within 5–10 business days, depending on your bank.</p></section><section className="rpp-legal-section"><h2>4. Exceptions</h2><p>We reserve the right to deny refunds in cases of abuse, fraud, license key redistribution, or after the 14-day window. Refunds of subscriptions or licenses will revoke the associated license key and any unused top-up credits. Creem payment processing fees are not returned by Creem; we absorb this cost on every refund.</p></section></div></div></section></main>

    </>
  );
}
