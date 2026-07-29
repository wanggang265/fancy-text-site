import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'No-Subscription PDF Editors: Free and One-Time-Pay Options | RemovePDFPages',
  description: "Published on the RemovePDFPages blog.",
  alternates: {
    canonical: 'https://removepdfpages.net/blog/no-subscription-pdf-editor',
  },
  openGraph: {
    title: 'No-Subscription PDF Editors: Free and One-Time-Pay Options | RemovePDFPages',
    description: "Published on the RemovePDFPages blog.",
    url: 'https://removepdfpages.net/blog/no-subscription-pdf-editor',
    siteName: 'RemovePDFPages',
    images: [{ url: 'https://removepdfpages.net/og-home.png', width: 1200, height: 630 }],
    type: 'website',
  },
};

export default function Page() {
  return (
    <div className="bg-surface text-on-surface font-body antialiased min-h-screen flex flex-col relative">
    
    <main className="flex-grow pt-32 pb-20">
    <article className="max-w-3xl mx-auto px-margin-desktop">
    <header className="mb-10">
    <h1 className="font-display text-3xl md:text-4xl text-primary font-bold mb-4 tracking-tight">No-Subscription PDF Editors: Free and One-Time-Pay Options</h1>
    <p className="text-sm text-ink-600">Published on the RemovePDFPages blog.</p>
    </header>
    <section className="mb-10">
    <h2 className="text-2xl font-bold text-on-surface mb-3 font-heading">Free tools for quick tasks</h2>
    <p className="text-base text-on-surface-variant leading-relaxed">Remove pages, merge, compress, and sign PDFs in your browser. No signup and no watermark on the free tools.</p>
    </section>
    <section className="mb-10">
    <h2 className="text-2xl font-bold text-on-surface mb-3 font-heading">One-time full editors</h2>
    <p className="text-base text-on-surface-variant leading-relaxed">If you need PDF to Word conversion or image replacement, a one-time purchase can cover those features.</p>
    </section>
    <section className="mb-10">
    <h2 className="text-2xl font-bold text-on-surface mb-3 font-heading">What to watch out for</h2>
    <p className="text-base text-on-surface-variant leading-relaxed">Free tools may have fair-use limits. Paid tools may define “lifetime” narrowly. Read the refund policy before buying.</p>
    </section>
    <section className="mb-10">
    <h2 className="text-2xl font-bold text-on-surface mb-3 font-heading">Pick the right tool for the job</h2>
    <p className="text-base text-on-surface-variant leading-relaxed">Use free tools for simple edits. Upgrade to a Full Editor when you need conversion or advanced editing.</p>
    </section>
    <div className="mt-12 pt-8 border-t border-ink-200">
    <a className="inline-flex items-center bg-primary text-on-primary px-6 py-3 rounded-lg font-medium hover:bg-primary-container transition-colors shadow-sm" href="/pricing">See pricing</a>
    </div>
    </article>
    </main>
    
    </div>
  );
}
