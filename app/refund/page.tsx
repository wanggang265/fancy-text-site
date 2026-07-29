import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Policy - RemovePDFPages',
  description: "Last updated: July 21, 2026",
  alternates: {
    canonical: 'https://removepdfpages.net/refund',
  },
  openGraph: {
    title: 'Refund Policy - RemovePDFPages',
    description: "Last updated: July 21, 2026",
    url: 'https://removepdfpages.net/refund',
    siteName: 'RemovePDFPages',
    images: [{ url: 'https://removepdfpages.net/og-home.png', width: 1200, height: 630 }],
    type: 'website',
  },
};

export default function Page() {
  return (
    <div className="bg-surface text-on-surface font-body antialiased min-h-screen flex flex-col relative">
    
    <main className="flex-grow pt-32 pb-20">
    <section className="max-w-3xl mx-auto px-margin-desktop">
    <h1 className="font-display text-4xl md:text-5xl text-primary font-bold mb-2 tracking-tight">Refund Policy</h1>
    <p className="text-sm text-ink-600 mb-10">Last updated: July 21, 2026</p>
    <section className="mb-8">
    <h2 className="text-xl font-bold text-on-surface mb-3 font-heading">1. Refund Eligibility</h2>
    <div className="text-base text-on-surface-variant leading-relaxed space-y-3"><p>RemovePDFPages offers a 14-day, no-questions-asked refund for all Full Editor purchases. If you are not satisfied, you may request a full refund within 14 days of your purchase date.</p></div>
    </section>
    <section className="mb-8">
    <h2 className="text-xl font-bold text-on-surface mb-3 font-heading">2. How to Request a Refund</h2>
    <div className="text-base text-on-surface-variant leading-relaxed space-y-3"><p>Submit your request through our <a className="text-primary hover:underline" href="/contact">Contact page</a> or by emailing support@removepdfpages.com. Include your order number or the email address used during checkout.</p></div>
    </section>
    <section className="mb-8">
    <h2 className="text-xl font-bold text-on-surface mb-3 font-heading">3. Processing Time</h2>
    <div className="text-base text-on-surface-variant leading-relaxed space-y-3"><p>Refunds are processed through Stripe and usually appear within 5–10 business days, depending on your bank.</p></div>
    </section>
    <section className="mb-8">
    <h2 className="text-xl font-bold text-on-surface mb-3 font-heading">4. Exceptions</h2>
    <div className="text-base text-on-surface-variant leading-relaxed space-y-3"><p>We reserve the right to deny refunds in cases of abuse, fraud, or after the 14-day window. We absorb a $0.30 Stripe processing fee per refund.</p></div>
    </section>
    </section>
    </main>
    
    </div>
  );
}
