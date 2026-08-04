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

<a href="#main" className="rpp-sr-only">Skip to content</a><main id="main"><section className="rpp-section rpp-section-hero"><div className="rpp-container rpp-text-center"><h1 className="rpp-display">Cookie Policy</h1><span className="rpp-legal-updated">Last updated: July 29, 2026</span></div></section><section className="rpp-section"><div className="rpp-container"><div className="rpp-legal-list"><section className="rpp-legal-section"><h2>1. What are cookies</h2><p>Cookies are small text files placed on your device by websites you visit.</p></section><section className="rpp-legal-section"><h2>2. How we use cookies</h2><p>We do not currently use third-party analytics or advertising cookies. We may use essential cookies required for the service to function, such as security and rate limiting. If we add analytics cookies in the future, we will update this policy and, where required by law (e.g., EU/UK/California), obtain your consent before placing non-essential cookies.</p></section><section className="rpp-legal-section"><h2>3. Third-party cookies</h2><p>We do not currently allow third-party advertising cookies. Any future analytics provider will be listed here once selected.</p></section><section className="rpp-legal-section"><h2>4. Managing cookies</h2><p>You can manage or delete cookies through your browser settings. For more information, visit the help pages of your browser.</p></section><section className="rpp-legal-section"><h2>5. Changes</h2><p>We may update this Cookie Policy from time to time. The latest version will be posted at this page with the updated date.</p></section></div></div></section></main>

    </>
  );
}
