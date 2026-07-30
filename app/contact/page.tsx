import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact & Refund | RemovePDFPages',
  description: 'Get in touch with RemovePDFPages for support, questions, or refund requests. We typically reply within 1–2 business days.',
  alternates: {
    canonical: 'https://removepdfpages.net/contact',
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: '{"@context": "https://schema.org", "@type": "ContactPage", "name": "Contact & Refund", "url": "https://removepdfpages.net/contact"}'}} />

<a href="#main" className="rpp-sr-only">Skip to content</a><main id="main"><section className="rpp-section rpp-section-hero"><div className="rpp-container rpp-text-center"><h1 className="rpp-display">Contact & Refund</h1><p className="rpp-lead" style={{maxWidth: '640px', margin: 'var(--rpp-space-4) auto 0'}}>Have a question or need a refund? Fill out the form below and we’ll get back to you as soon as possible.</p></div></section><section className="rpp-section"><div className="rpp-workspace"><div className="rpp-card"><div className="rpp-contact-email"><svg className="rpp-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg><span className="rpp-body" style={{color: 'var(--rpp-ink-900)'}}><strong>Support email:</strong><a href="mailto:support@removepdfpages.net">support@removepdfpages.net</a></span></div><form className="rpp-contact-form" style={{marginTop: 'var(--rpp-space-6)'}}><div className="rpp-form-row"><div className="rpp-form-field"><label htmlFor="name">Your name</label><input id="name" type="text" placeholder="Jane Doe" /></div><div className="rpp-form-field"><label htmlFor="email">Your email</label><input id="email" type="email" placeholder="you@example.com" /></div></div><div className="rpp-form-field"><label htmlFor="subject">What can we help with?</label><select id="subject"><option>Support question</option><option>Refund request</option><option>Billing issue</option><option>Subscription cancel</option><option>Feature suggestion</option><option>Other</option></select></div><div className="rpp-form-field"><label htmlFor="order">Order ID (if applicable)</label><input id="order" type="text" placeholder="[Creem order ID]" /></div><div className="rpp-form-field"><label htmlFor="message">Message</label><textarea id="message" rows={5} placeholder="Tell us more about your request..."></textarea></div><button type="submit" className="rpp-btn rpp-btn-primary">Send message</button></form></div><div className="rpp-card" style={{marginTop: 'var(--rpp-space-6)'}}><h2 className="rpp-heading-2">Request a refund</h2><p className="rpp-body" style={{marginTop: 'var(--rpp-space-3)', color: 'var(--rpp-ink-700)'}}>If you purchased within the last 14 days, you can request a refund here. Include your Creem order ID and the email used for purchase.</p><div className="rpp-flex" style={{marginTop: 'var(--rpp-space-4)', gap: 'var(--rpp-space-3)', flexWrap: 'wrap'}}><a href="/contact?subject=Refund+request" className="rpp-btn rpp-btn-primary">Request refund</a><a href="/refund" className="rpp-btn rpp-btn-secondary">Read the full refund policy</a></div></div></div></section></main>

    </>
  );
}
