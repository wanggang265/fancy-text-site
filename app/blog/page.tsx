import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF Tools & Editing Tips | RemovePDFPages Blog',
  description: "Practical guides, honest comparisons, and tips for working with PDFs without getting locked into a subscription.",
  alternates: {
    canonical: 'https://removepdfpages.net/blog',
  },
  openGraph: {
    title: 'PDF Tools & Editing Tips | RemovePDFPages Blog',
    description: "Practical guides, honest comparisons, and tips for working with PDFs without getting locked into a subscription.",
    url: 'https://removepdfpages.net/blog',
    siteName: 'RemovePDFPages',
    images: [{ url: 'https://removepdfpages.net/og-home.png', width: 1200, height: 630 }],
    type: 'website',
  },
};

export default function Page() {
  return (
    <div className="bg-surface text-on-surface font-body antialiased min-h-screen flex flex-col relative">
    
    <main className="flex-grow pt-32 pb-20">
    <section className="max-w-container-max mx-auto px-margin-desktop mb-12">
    <h1 className="font-display text-4xl md:text-5xl text-primary font-bold mb-4 tracking-tight">RemovePDFPages Blog</h1>
    <p className="text-lg text-on-surface-variant max-w-2xl">Practical guides, honest comparisons, and tips for working with PDFs without getting locked into a subscription.</p>
    </section>
    <section className="max-w-container-max mx-auto px-margin-desktop">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <article className="bg-paper border border-ink-200 rounded-[20px] p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
    <h2 className="text-xl font-bold text-on-surface mb-3 font-heading"><a className="hover:text-primary transition-colors" href="/blog/foxit-alternative">Foxit Alternatives to Consider in 2026</a></h2>
    <p className="text-sm text-on-surface-variant mb-6 flex-grow">Looking for a PDF editor that doesn’t require a subscription? Here are several options, including browser-based tools and one-time purchase apps.</p>
    <a className="inline-flex items-center text-primary font-medium text-sm hover:underline" href="/pricing">See pricing <span className="material-symbols-outlined text-sm">arrow_forward</span></a>
    </article>
    <article className="bg-paper border border-ink-200 rounded-[20px] p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
    <h2 className="text-xl font-bold text-on-surface mb-3 font-heading"><a className="hover:text-primary transition-colors" href="/blog/replace-image-in-pdf">How to Replace an Image in a PDF Without Adobe Acrobat</a></h2>
    <p className="text-sm text-on-surface-variant mb-6 flex-grow">Replacing an image in a PDF can be tricky. Here are a few ways to do it, plus tools that let you edit PDFs without paying monthly.</p>
    <a className="inline-flex items-center text-primary font-medium text-sm hover:underline" href="/remove-pages">Try Remove Pages <span className="material-symbols-outlined text-sm">arrow_forward</span></a>
    </article>
    <article className="bg-paper border border-ink-200 rounded-[20px] p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
    <h2 className="text-xl font-bold text-on-surface mb-3 font-heading"><a className="hover:text-primary transition-colors" href="/blog/one-time-payment-pdf-editor">One-Time Payment PDF Editors Compared</a></h2>
    <p className="text-sm text-on-surface-variant mb-6 flex-grow">Tired of subscriptions? Here are several PDF editors you can buy once and keep using, including our own $19 Launch Special.</p>
    <a className="inline-flex items-center text-primary font-medium text-sm hover:underline" href="/pricing">Get Full Editor <span className="material-symbols-outlined text-sm">arrow_forward</span></a>
    </article>
    <article className="bg-paper border border-ink-200 rounded-[20px] p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
    <h2 className="text-xl font-bold text-on-surface mb-3 font-heading"><a className="hover:text-primary transition-colors" href="/blog/no-subscription-pdf-editor">No-Subscription PDF Editors: Free and One-Time-Pay Options</a></h2>
    <p className="text-sm text-on-surface-variant mb-6 flex-grow">Compare free PDF tools and one-time-payment editors that don’t lock you into a monthly plan.</p>
    <a className="inline-flex items-center text-primary font-medium text-sm hover:underline" href="/pricing">See pricing <span className="material-symbols-outlined text-sm">arrow_forward</span></a>
    </article>
    </div>
    </section>
    <section className="max-w-container-max mx-auto px-margin-desktop mt-16 text-center">
    <a className="inline-flex items-center bg-primary text-on-primary px-6 py-3 rounded-lg font-medium hover:bg-primary-container transition-colors shadow-sm" href="/pricing">See pricing</a>
    </section>
    </main>
    
    </div>
  );
}
