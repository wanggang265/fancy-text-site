import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - RemovePDFPages',
  description: "Last updated: July 21, 2026",
  alternates: {
    canonical: 'https://removepdfpages.net/privacy',
  },
  openGraph: {
    title: 'Privacy Policy - RemovePDFPages',
    description: "Last updated: July 21, 2026",
    url: 'https://removepdfpages.net/privacy',
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
    <h1 className="font-display text-4xl md:text-5xl text-primary font-bold mb-2 tracking-tight">Privacy Policy</h1>
    <p className="text-sm text-ink-600 mb-10">Last updated: July 21, 2026</p>
    <section className="mb-8">
    <h2 className="text-xl font-bold text-on-surface mb-3 font-heading">1. Overview</h2>
    <div className="text-base text-on-surface-variant leading-relaxed space-y-3"><p>RemovePDFPages operates removepdfpages.net. This Privacy Policy explains how we handle information when you use our free PDF tools and the Full Editor license.</p></div>
    </section>
    <section className="mb-8">
    <h2 className="text-xl font-bold text-on-surface mb-3 font-heading">2. Files and PDFs</h2>
    <div className="text-base text-on-surface-variant leading-relaxed space-y-3"><p><strong>Free tools:</strong> By default, Remove Pages, Merge, Compress, and Sign process your files entirely in your browser. Your PDFs are not uploaded to our servers.</p><p><strong>Convert PDF to Word:</strong> This feature requires server-side processing. Your file is uploaded temporarily and deleted automatically within 1 hour.</p></div>
    </section>
    <section className="mb-8">
    <h2 className="text-xl font-bold text-on-surface mb-3 font-heading">3. Data we collect</h2>
    <div className="text-base text-on-surface-variant leading-relaxed space-y-3"><p>We collect your email address at checkout to send your license key and provide support. We may also collect IP addresses for rate limiting and abuse prevention.</p></div>
    </section>
    <section className="mb-8">
    <h2 className="text-xl font-bold text-on-surface mb-3 font-heading">4. Third parties</h2>
    <div className="text-base text-on-surface-variant leading-relaxed space-y-3"><p>We use Stripe for payments and Resend for email. We do not sell your data or use your PDFs for training or advertising.</p></div>
    </section>
    <section className="mb-8">
    <h2 className="text-xl font-bold text-on-surface mb-3 font-heading">5. Your rights</h2>
    <div className="text-base text-on-surface-variant leading-relaxed space-y-3"><p>You can contact us to access, update, or delete your account information. Because we do not store free-tool PDFs, there is no PDF content to delete.</p></div>
    </section>
    </section>
    </main>
    
    </div>
  );
}
