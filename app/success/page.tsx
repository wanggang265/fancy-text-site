import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thank You | RemovePDFPages',
  description: 'Your RemovePDFPages Full Editor purchase is complete. Your license key and receipts have been sent to your email.',
  alternates: {
    canonical: 'https://removepdfpages.net/success',
  },
  robots: {
    index: false,
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: '{"@context": "https://schema.org", "@type": "WebPage", "name": "Thank You", "url": "https://removepdfpages.net/success"}'}} />

<a href="#main" className="rpp-sr-only">Skip to content</a><main id="main"><section className="rpp-section rpp-section-hero"><div className="rpp-container rpp-text-center"><div className="rpp-notice rpp-notice-success" style={{maxWidth: '640px', margin: '0 auto', justifyContent: 'center'}}><svg className="rpp-icon rpp-notice-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12l5 5L20 7"></path></svg><div><div className="rpp-notice-title">Payment successful</div></div></div><h1 className="rpp-display" style={{marginTop: 'var(--rpp-space-5)'}}>Welcome to the Full Editor</h1><p className="rpp-lead" style={{maxWidth: '640px', margin: 'var(--rpp-space-4) auto 0'}}>Your purchase is complete. Your license key and receipts have been emailed to you.</p></div></section><section className="rpp-section"><div className="rpp-workspace"><div className="rpp-card"><h2 className="rpp-heading-2">Purchase summary</h2><dl className="rpp-summary-list" style={{marginTop: 'var(--rpp-space-4)'}}><div className="rpp-summary-row"><dt>Item</dt><dd>RemovePDFPages Full Editor</dd></div><div className="rpp-summary-row"><dt>Price paid</dt><dd>[plan price]</dd></div><div className="rpp-summary-row"><dt>Email</dt><dd>[user email]</dd></div><div className="rpp-summary-row"><dt>Order ID</dt><dd>[Creem order ID]</dd></div></dl></div><div className="rpp-card" style={{marginTop: 'var(--rpp-space-6)'}}><h2 className="rpp-heading-2">Your license key</h2><div className="rpp-license-box" style={{marginTop: 'var(--rpp-space-4)'}}><code className="rpp-mono">REMPDF-XXXX-XXXX-XXXX</code><button className="rpp-btn rpp-btn-secondary rpp-btn-small">Copy License Key</button></div><p className="rpp-body-sm" style={{marginTop: 'var(--rpp-space-3)', color: 'var(--rpp-ink-700)'}}>We also emailed this key to [user email]. Check your spam folder if you don’t see it.</p><div className="rpp-notice rpp-notice-info" style={{marginTop: 'var(--rpp-space-4)'}}><svg className="rpp-icon rpp-notice-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg><div><div className="rpp-notice-title">Your subscription is active</div><div className="rpp-notice-body">You can cancel anytime from your account settings or by contacting support.</div></div></div></div><div className="rpp-card" style={{marginTop: 'var(--rpp-space-6)'}}><h2 className="rpp-heading-2">What’s next</h2><ul className="rpp-feature-list" style={{marginTop: 'var(--rpp-space-4)'}}><li className="rpp-feature-item"><div className="rpp-feature-icon"><svg className="rpp-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12l5 5L20 7"></path></svg></div><div><div className="rpp-feature-title">Your license works on up to 5 personal devices.</div></div></li><li className="rpp-feature-item"><div className="rpp-feature-icon"><svg className="rpp-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12l5 5L20 7"></path></svg></div><div><div className="rpp-feature-title">Need to reinstall? Use the same license key.</div></div></li><li className="rpp-feature-item"><div className="rpp-feature-icon"><svg className="rpp-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12l5 5L20 7"></path></svg></div><div><div className="rpp-feature-title">Questions about refunds? <a href="/refund">Visit our refund policy</a>.</div></div></li></ul><div className="rpp-flex" style={{marginTop: 'var(--rpp-space-6)', gap: 'var(--rpp-space-3)', flexWrap: 'wrap'}}><a href="/convert-to-word" className="rpp-btn rpp-btn-primary">Convert PDF to Word</a><a href="/pricing" className="rpp-btn rpp-btn-secondary">Go to Pricing</a><a href="/contact" className="rpp-btn rpp-btn-tertiary">Need help? Contact support</a></div></div></div></section></main>

    </>
  );
}
