import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Cookie Policy - RemovePDFPages",
  description: "RemovePDFPages cookie policy: how we use cookies and similar technologies.",
  path: "/cookie-policy",
  type: "website",
});

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Cookie Policy",
  description: "RemovePDFPages cookie policy: how we use cookies and similar technologies.",
  url: "https://removepdfpages.net/cookie-policy",
};

export default function Page() {
  return (
    <>
      <StructuredData schema={schema} />

<a href="#main" className="rpp-sr-only">Skip to content</a><main id="main"><section className="rpp-section rpp-section-hero"><div className="rpp-container rpp-text-center"><h1 className="rpp-display">Cookie Policy</h1><span className="rpp-legal-updated">Last updated: August 04, 2026</span></div></section><section className="rpp-section"><div className="rpp-container"><div className="rpp-legal-list"><section className="rpp-legal-section"><h2>1. What are cookies</h2><p>Cookies are small text files placed on your device by websites you visit.</p></section><section className="rpp-legal-section"><h2>2. How we use cookies</h2><p>We use Plausible Analytics (plausible.io) to understand how visitors use the site. Plausible is privacy-focused, does not use cookies, and does not track personal data or store device identifiers. We only see aggregated, non-identifying statistics such as page views, referrers, and device types. We may also use essential cookies required for the service to function, such as security and rate limiting. Because Plausible does not use cookies, no additional non-essential cookies are placed for analytics.</p></section><section className="rpp-legal-section"><h2>3. Third-party cookies</h2><p>We use Plausible Analytics, a privacy-first analytics provider. Plausible does not sell or share analytics data with third parties. You can learn more at https://plausible.io/data-policy.</p></section><section className="rpp-legal-section"><h2>4. Managing cookies</h2><p>You can manage or delete cookies through your browser settings. For more information, visit the help pages of your browser.</p></section><section className="rpp-legal-section"><h2>5. Changes</h2><p>We may update this Cookie Policy from time to time. The latest version will be posted at this page with the updated date.</p></section></div></div></section></main>

    </>
  );
}
