import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - RemovePDFPages',
  description: "Last updated: July 21, 2026",
  alternates: {
    canonical: 'https://removepdfpages.net/terms',
  },
  openGraph: {
    title: 'Terms of Service - RemovePDFPages',
    description: "Last updated: July 21, 2026",
    url: 'https://removepdfpages.net/terms',
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
    <h1 className="font-display text-4xl md:text-5xl text-primary font-bold mb-2 tracking-tight">Terms of Service</h1>
    <p className="text-sm text-ink-600 mb-10">Last updated: July 21, 2026</p>
    <section className="mb-8">
    <h2 className="text-xl font-bold text-on-surface mb-3 font-heading">1. Acceptance</h2>
    <div className="text-base text-on-surface-variant leading-relaxed space-y-3"><p>By accessing or using RemovePDFPages, you agree to these Terms of Service. If you do not agree, do not use the Service.</p></div>
    </section>
    <section className="mb-8">
    <h2 className="text-xl font-bold text-on-surface mb-3 font-heading">2. Description of the Service</h2>
    <div className="text-base text-on-surface-variant leading-relaxed space-y-3"><p>We provide browser-based PDF tools. The free tools process files locally when possible. The Full Editor unlocks Convert to Word and other advanced features.</p></div>
    </section>
    <section className="mb-8">
    <h2 className="text-xl font-bold text-on-surface mb-3 font-heading">3. Full Editor License</h2>
    <div className="text-base text-on-surface-variant leading-relaxed space-y-3"><p>The Full Editor is sold as a one-time license for the current major version (v1.x). It covers up to 5 personal devices. A future new platform may require a separate license.</p></div>
    </section>
    <section className="mb-8">
    <h2 className="text-xl font-bold text-on-surface mb-3 font-heading">4. Acceptable Use</h2>
    <div className="text-base text-on-surface-variant leading-relaxed space-y-3"><p>You may not use the service to process unlawful, harmful, or copyrighted material you do not have permission to modify.</p></div>
    </section>
    <section className="mb-8">
    <h2 className="text-xl font-bold text-on-surface mb-3 font-heading">5. Refunds</h2>
    <div className="text-base text-on-surface-variant leading-relaxed space-y-3"><p>We offer a 14-day no-questions-asked refund for Full Editor purchases. Contact us with your order information.</p></div>
    </section>
    <section className="mb-8">
    <h2 className="text-xl font-bold text-on-surface mb-3 font-heading">6. Limitation of Liability</h2>
    <div className="text-base text-on-surface-variant leading-relaxed space-y-3"><p>We provide the service as-is. We are not liable for data loss or errors in output files. Always keep backups of important PDFs.</p></div>
    </section>
    </section>
    </main>
    
    </div>
  );
}
