import { buildMetadata } from '@/lib/seo';
import StructuredData from '@/components/StructuredData';

const schema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "RemovePDFPages Full Editor",
  description: "PDF tools and the Full Editor: remove pages, merge, compress, sign, and convert PDF to Word. Free tools available; upgrade for PDF to Word and higher limits.",
  url: "https://removepdfpages.net/pricing",
  brand: {
    "@type": "Brand",
    name: "RemovePDFPages",
  },
  offers: [
    {
      "@type": "Offer",
      name: "Free",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://removepdfpages.net/pricing",
    },
    {
      "@type": "Offer",
      name: "Monthly Launch Special",
      price: "19",
      priceCurrency: "USD",
      priceFrequency: "P1M",
      availability: "https://schema.org/InStock",
      url: "https://removepdfpages.net/checkout?plan=monthly",
    },
    {
      "@type": "Offer",
      name: "Yearly",
      price: "99",
      priceCurrency: "USD",
      priceFrequency: "P1Y",
      availability: "https://schema.org/InStock",
      url: "https://removepdfpages.net/checkout?plan=yearly",
    },
    {
      "@type": "Offer",
      name: "One-time License",
      price: "59",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://removepdfpages.net/checkout?plan=onetime",
    },
  ],
};

export const metadata = buildMetadata({
  title: "Pricing | RemovePDFPages",
  description: "RemovePDFPages pricing: free PDF tools and a $19/month Launch Special for the Full Editor. $99/year. One-time license $59. 14-day refund policy.",
  path: "/pricing",
  type: "website",
});

export default function Page() {
  return (
    <>
      <StructuredData schema={schema} />

<a href="#main" className="rpp-sr-only">Skip to content</a><main id="main"><section className="rpp-section rpp-section-hero"><div className="rpp-container rpp-text-center"><span className="rpp-badge rpp-badge-subtle">Pricing</span><h1 className="rpp-display">Simple subscription pricing. One-time option available.</h1><p className="rpp-lead" style={{maxWidth: '640px', margin: 'var(--rpp-space-4) auto 0'}}>Use the core tools for free. Upgrade for PDF to Word conversion, larger files, and more devices.</p></div></section><section className="rpp-section"><div className="rpp-container"><div className="rpp-pricing-grid"><article className="rpp-pricing-card"><h2 className="rpp-pricing-card-name">Free</h2><p className="rpp-pricing-card-desc">Core tools in your browser.</p><div className="rpp-pricing-card-price">$0</div><p className="rpp-pricing-card-period">No account needed</p><a href="/remove-pages" className="rpp-btn rpp-btn-secondary rpp-btn-full">Start free</a><ul className="rpp-pricing-card-list"><li>Remove PDF pages</li><li>Merge PDFs</li><li>Compress PDFs</li><li>Sign PDFs</li><li>No watermark</li><li>Files stay in your browser by default</li><li>Fair-use limits: 50 MB / 200 pages / 10–20 tasks per hour</li></ul></article><article className="rpp-pricing-card rpp-pricing-card-popular"><div className="rpp-pricing-card-popular-flag">Most popular</div><h2 className="rpp-pricing-card-name">Monthly</h2><p className="rpp-pricing-card-desc">Full Editor, billed monthly. Cancel anytime.</p><div className="rpp-pricing-card-price"><span className="rpp-pricing-card-old">$29</span><span>$19</span><span className="rpp-pricing-card-unit">/month</span></div><p className="rpp-pricing-card-period">Billed monthly. Cancel anytime. Launch price for a limited time. Standard price is $29/month.</p><a href="/checkout?plan=monthly" className="rpp-btn rpp-btn-primary rpp-btn-full">Get Monthly — $19 Launch Special</a><ul className="rpp-pricing-card-list"><li>Everything in Free</li><li>Convert PDF to Word (30 conversions/month included)</li><li>Extra conversions: $1/2 credits or $5/10 credits</li><li>Use on up to 5 personal devices</li><li>Updates for the current major version</li><li>14-day refund policy</li></ul></article><article className="rpp-pricing-card"><div className="rpp-pricing-card-popular-flag" style={{background: 'var(--rpp-ink-800)'}}>Best value</div><h2 className="rpp-pricing-card-name">Yearly</h2><p className="rpp-pricing-card-desc">Full Editor, billed once per year.</p><div className="rpp-pricing-card-price"><span className="rpp-pricing-card-old">$149</span><span>$99</span><span className="rpp-pricing-card-unit">/year</span></div><p className="rpp-pricing-card-period">Billed annually. Save $129.</p><a href="/checkout?plan=yearly" className="rpp-btn rpp-btn-primary rpp-btn-full">Get Yearly — $99/year</a><ul className="rpp-pricing-card-list"><li>Everything in Monthly</li><li>Save $129 vs. monthly</li><li>Same device and refund limits</li></ul></article></div><div className="rpp-card rpp-text-center" style={{marginTop: 'var(--rpp-space-8)', border: '1px dashed var(--rpp-ink-300)'}}><h2 className="rpp-heading-3">Prefer to pay once?</h2><p className="rpp-body" style={{maxWidth: '520px', margin: 'var(--rpp-space-3) auto 0', color: 'var(--rpp-ink-700)'}}>Get a one-time license for $59.</p><div style={{marginTop: 'var(--rpp-space-4)'}}><span className="rpp-mono" style={{fontSize: 'var(--rpp-scale-3)', color: 'var(--rpp-ink-900)'}}><s style={{color: 'var(--rpp-ink-500)'}}>$79</s> $59</span><span className="rpp-body-sm" style={{color: 'var(--rpp-ink-700)'}}>One-time payment</span></div><a href="/checkout?plan=onetime" className="rpp-btn rpp-btn-tertiary" style={{marginTop: 'var(--rpp-space-5)'}}>Buy one-time license</a></div><div className="rpp-card" style={{marginTop: 'var(--rpp-space-8)'}}><h2 className="rpp-heading-3">Top-up credits</h2><p className="rpp-body" style={{marginTop: 'var(--rpp-space-3)', color: 'var(--rpp-ink-700)'}}>After you use your 30 included Convert to Word conversions each month, you can buy extra credits starting at $1 for 2, or $5 for 10 (minimum purchase $1/2 credits). Unused credits are refundable within 14 days; used credits are not.</p><div className="rpp-flex" style={{marginTop: 'var(--rpp-space-4)', gap: 'var(--rpp-space-3)', flexWrap: 'wrap'}}><div className="rpp-credit-badge">10 conversions — $5</div><div className="rpp-credit-badge">2 conversions — $1</div><div className="rpp-credit-badge">Minimum purchase $1/2 credits</div></div></div><div className="rpp-card" style={{marginTop: 'var(--rpp-space-8)', overflow: 'auto'}}><h2 className="rpp-heading-3" style={{marginBottom: 'var(--rpp-space-5)'}}>Compare plans</h2><table className="rpp-compare-table"><thead><tr><th>Feature</th><th>Free</th><th>Monthly / Yearly</th><th>One-time</th></tr></thead><tbody><tr><td>Remove / Merge / Compress / Sign</td><td>✅</td><td>✅</td><td>✅</td></tr><tr><td>Convert PDF to Word</td><td>3/30 days</td><td>30/month included</td><td>30/month included</td></tr><tr><td>Extra Convert to Word</td><td>—</td><td>$1/2 credits or $5/10 credits</td><td>$1/2 credits or $5/10 credits</td></tr><tr><td>Max file size</td><td>50 MB</td><td>50 MB</td><td>50 MB</td></tr><tr><td>Max pages per file</td><td>200</td><td>200</td><td>200</td></tr><tr><td>Devices</td><td>Browser only</td><td>Up to 5 devices</td><td>Up to 5 devices</td></tr><tr><td>Billing</td><td>$0</td><td>$19/month or $99/year</td><td>$59 once</td></tr></tbody></table></div></div></section><section className="rpp-section rpp-section-soft"><div className="rpp-container"><h2 className="rpp-heading-2 rpp-text-center">Common questions</h2><dl className="rpp-faq-list" style={{marginTop: 'var(--rpp-space-6)'}}><div className="rpp-faq-item"><dt className="rpp-faq-question">Is the $19 price a subscription?</dt><dd className="rpp-faq-answer">Yes, the $19 Launch Special is a monthly subscription. You can also choose the $99/year plan to save $129, or the $59 one-time license if you prefer not to subscribe.</dd></div><div className="rpp-faq-item"><dt className="rpp-faq-question">Can I pay once instead of subscribing?</dt><dd className="rpp-faq-answer">Yes. Select the One-time License at checkout for $59. It includes the same 30 Convert to Word conversions per month.</dd></div><div className="rpp-faq-item"><dt className="rpp-faq-question">How many Convert to Word conversions do I get?</dt><dd className="rpp-faq-answer">Free users can try 3 conversions per 30-day period. Paid plans include 30 conversions per month. Additional conversions are $1 for 2 or $5 for 10.</dd></div><div className="rpp-faq-item"><dt className="rpp-faq-question">Can I cancel anytime?</dt><dd className="rpp-faq-answer">Yes. Monthly and yearly subscriptions can be canceled anytime. Your access continues until the end of the current billing period. We also offer a 14-day refund policy.</dd></div><div className="rpp-faq-item"><dt className="rpp-faq-question">What happens when the launch period ends?</dt><dd className="rpp-faq-answer">We will return to the standard monthly price of $29 and the standard yearly price of $149. The $19 Launch Special is limited time and may end without notice.</dd></div><div className="rpp-faq-item"><dt className="rpp-faq-question">What does “one-time license” mean?</dt><dd className="rpp-faq-answer">It means you pay once for the current major version of RemovePDFPages Full Editor (v1.x). It includes updates within that version. A future new product or platform may require a separate license.</dd></div><div className="rpp-faq-item"><dt className="rpp-faq-question">Why does Convert to Word need a server?</dt><dd className="rpp-faq-answer">PDF to Word conversion is complex and currently runs on our backend. Your file is uploaded temporarily and deleted automatically within 1 hour.</dd></div></dl></div></section></main>

    </>
  );
}
