import StructuredData from '@/components/StructuredData';
import type { Metadata } from 'next';

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

export const metadata: Metadata = {
  title: 'Convert PDF to Word Online | RemovePDFPages',
  description: 'Convert PDF to editable Word documents with the RemovePDFPages Full Editor. $19/month Launch Special, $99/year, or $59 one-time license. Files are deleted from our server within 1 hour.',
  alternates: {
    canonical: 'https://removepdfpages.net/convert-to-word',
  },
};

export default function Page() {
  return (
    <>
      <StructuredData schema={schema} />

<a href="#main" className="rpp-sr-only">Skip to content</a><main id="main"><section className="rpp-section rpp-section-hero"><div className="rpp-container rpp-text-center"><h1 className="rpp-display">Convert PDF to Word Online</h1><p className="rpp-lead" style={{maxWidth: '640px', margin: 'var(--rpp-space-4) auto 0'}}>Turn PDFs into DOCX or RTF files you can edit in Word. Subscribe from $19/month or $99/year, or buy a one-time license for $59. Use on up to 5 devices. Each paid plan includes 10 included conversions per month.</p></div></section><section className="rpp-section"><div className="rpp-workspace"><div className="rpp-tool-card"><div className="rpp-state-section" aria-label="Quota state — anonymous free"><span className="rpp-state-label">Anonymous / free quota state</span><div className="rpp-quota-bar"><div className="rpp-quota-track"><div className="rpp-quota-fill" style={{width: '33%'}}></div></div><p className="rpp-quota-label">You have 2 free conversions left this 30-day period.</p></div></div><div className="rpp-state-section" aria-label="Paywall state"><span className="rpp-state-label">Paywall state</span><div className="rpp-notice rpp-notice-info" style={{marginBottom: 'var(--rpp-space-6)'}}><svg className="rpp-icon rpp-notice-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg><div><div className="rpp-notice-title">This feature is part of the Full Editor</div><div className="rpp-notice-body">Convert PDF to Word is included with the Full Editor. Free users get 3 conversions per 30 days; paid plans include 10 per month, with extra conversions available as needed.</div></div></div><div className="rpp-upsell-grid"><div className="rpp-upsell-card"><h3 className="rpp-heading-3">Monthly</h3><div className="rpp-pricing-card-price"><span className="rpp-pricing-card-old">$29</span><span>$19</span><span className="rpp-pricing-card-unit">/month</span></div><ul className="rpp-pricing-card-list" style={{marginTop: 'var(--rpp-space-4)'}}><li>10 conversions per month</li><li>All PDF tools unlocked</li><li>Use on up to 5 devices</li></ul><a href="/checkout?plan=monthly" className="rpp-btn rpp-btn-primary rpp-btn-full" style={{marginTop: 'var(--rpp-space-5)'}}>Get Full Editor — $19/month Launch Special</a></div><div className="rpp-upsell-card"><h3 className="rpp-heading-3">Top-up</h3><div className="rpp-pricing-card-price" style={{fontSize: 'var(--rpp-scale-5)'}}>$5</div><p className="rpp-pricing-card-period">10 conversions</p><p className="rpp-body-sm" style={{color: 'var(--rpp-ink-600)', marginTop: 'var(--rpp-space-2)'}}>Or $0.50 each</p><a href="/checkout?topup=10" className="rpp-btn rpp-btn-secondary rpp-btn-full" style={{marginTop: 'var(--rpp-space-5)'}}>Buy 10 more conversions for $5</a></div></div></div><div className="rpp-state-section" aria-label="Tool interface"><span className="rpp-state-label">Tool interface</span><div className="rpp-upload-zone"><div className="rpp-upload-zone-icon"><svg className="rpp-icon" style={{width: '48px', height: '48px'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 16V4m0 0l-4 4m4-4l4 4"></path><path d="M4 17a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v1H4z"></path></svg></div><div className="rpp-upload-zone-title">Upload PDF to convert</div><p className="rpp-upload-zone-meta">Drop your PDF here or click to browse. Max 50 MB and 200 pages for free users.</p></div></div><div className="rpp-state-section" aria-label="Conversion processing state"><span className="rpp-state-label">Conversion processing state</span><div className="rpp-processing-overlay" style={{position: 'static', minHeight: '220px'}}><div className="rpp-spinner"></div><p className="rpp-body">Converting PDF to Word...</p><p className="rpp-caption" style={{marginTop: 'var(--rpp-space-2)', maxWidth: '360px'}}>Complex layouts may take longer. Results vary based on formatting, images, and fonts.</p></div></div><div className="rpp-state-section" aria-label="Success state"><span className="rpp-state-label">Success state</span><div className="rpp-notice rpp-notice-success" style={{marginBottom: 'var(--rpp-space-6)'}}><svg className="rpp-icon rpp-notice-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12l5 5L20 7"></path></svg><div><div className="rpp-notice-title">Conversion ready</div><div className="rpp-notice-body">Your DOCX is ready to download. The file is stored for up to 1 hour, then permanently deleted.</div></div></div><button className="rpp-btn rpp-btn-primary">Download DOCX</button></div></div><div className="rpp-notice rpp-notice-warning" style={{marginTop: 'var(--rpp-space-8)'}}><svg className="rpp-icon rpp-notice-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg><div><div className="rpp-notice-title">Temporary file storage</div><div className="rpp-notice-body">During conversion, files are held on our servers for 1-hour temporary backend retention so you can retry downloads. After that, they are permanently deleted. We do not use your files to train models or share them with third parties.</div></div></div></div></section></main>

    </>
  );
}
