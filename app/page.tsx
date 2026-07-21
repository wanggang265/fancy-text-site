import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'RemovePDFPages - Free PDF Tools. Full Editor for One Price.',
  description: 'Delete pages, merge, compress, and sign PDFs for free. Upgrade once to edit text, replace images, and convert PDF to Word. $29 lifetime, no subscription.',
};

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body-md antialiased min-h-screen flex flex-col relative bg-dot-grid">
      <Header />
<main className="flex-grow pt-space-20 max-w-container-max mx-auto w-full px-margin-desktop">

<section className="py-space-20 grid grid-cols-1 lg:grid-cols-2 gap-gutter-desktop items-center">
<div className="flex flex-col gap-space-6">
<h1 className="font-display-xl-mobile text-display-xl-mobile md:font-display-xl md:text-display-xl text-on-surface tracking-tight text-balance break-words">
                    Free PDF Tools. Full Editor for One Price.
                </h1>
<p className="font-body-lead text-body-lead text-on-surface-variant max-w-xl">
                    Delete pages, merge, compress, and sign PDFs for free. Upgrade once to edit text, replace images, and convert PDF to Word. $29 lifetime, no subscription.
                </p>
<div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-space-3">
<a className="inline-flex items-center justify-center bg-primary text-on-primary px-6 py-3 rounded shadow-sm hover:shadow-md transition-all font-mono-data text-mono-data" href="/checkout">Get Full Editor — $29</a>
<a className="inline-flex items-center justify-center bg-paper text-primary border border-primary px-6 py-3 rounded shadow-sm hover:shadow-md transition-all font-mono-data text-mono-data" href="/remove-pages">Try Free Tools</a>
</div>
<div className="flex flex-col md:flex-row md:flex-wrap gap-x-6 gap-y-2 mt-space-6 font-mono-data text-mono-data text-ink-600 break-words">
<span className="flex flex-wrap items-center gap-1 min-w-0"><span className="material-symbols-outlined text-secondary flex-shrink-0" style={{fontSize: 18}}>check</span> <span className="break-words min-w-0">Free tools: no signup</span></span>
<span className="flex flex-wrap items-center gap-1 min-w-0"><span className="material-symbols-outlined text-secondary flex-shrink-0" style={{fontSize: 18}}>check</span> <span className="break-words min-w-0">Full editor: one-time</span></span>
<span className="flex flex-wrap items-center gap-1 min-w-0"><span className="material-symbols-outlined text-secondary flex-shrink-0" style={{fontSize: 18}}>check</span> <span className="break-words min-w-0">No subscription, ever</span></span>
<span className="flex flex-wrap items-center gap-1 min-w-0"><span className="material-symbols-outlined text-secondary flex-shrink-0" style={{fontSize: 18}}>check</span> <span className="break-words min-w-0">Works on all devices</span></span>
</div>
</div>
<div className="relative w-full h-[400px] lg:h-[600px] bg-paper rounded-[28px] border border-ink-200 shadow-sm overflow-hidden flex items-center justify-center">
<img alt="Illustration" className="object-cover w-full h-full" src="/hero-illustration.png" />
</div>
</section>

<section className="py-space-20">
<h2 className="font-heading-lg text-heading-lg text-center mb-space-10 text-on-surface break-words text-balance">Choose what you need.</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter-desktop">

<div className="bg-paper p-space-10 rounded-[28px] border border-ink-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
<div className="absolute top-0 right-0 p-space-6">
<span className="inline-block bg-accent-olive-100 text-accent-olive-700 font-label-caps text-label-caps px-3 py-1 uppercase tracking-wider rounded-none">Free</span>
</div>
<div className="w-12 h-12 bg-accent-olive-100 rounded-none flex items-center justify-center mb-space-6">
<span className="material-symbols-outlined text-accent-olive-700">delete</span>
</div>
<h3 className="font-heading-md text-heading-md mb-space-3 text-on-surface">Essential Tools</h3>
<p className="font-body-md text-body-md text-on-surface-variant">
                        No signup, no watermark. Delete pages, merge, compress, and sign PDFs directly in your browser.
                    </p>
<div className="mt-space-6 border-t border-ink-200 pt-space-6 group-hover:border-accent-olive-100 transition-colors">
<ul className="space-y-2 font-mono-data text-mono-data text-ink-600">
<li className="flex items-center gap-2"><span className="material-symbols-outlined text-accent-olive-700" style={{fontSize: 16}}>check</span> Delete Pages</li>
<li className="flex items-center gap-2"><span className="material-symbols-outlined text-accent-olive-700" style={{fontSize: 16}}>check</span> Merge & Compress</li>
<li className="flex items-center gap-2"><span className="material-symbols-outlined text-accent-olive-700" style={{fontSize: 16}}>check</span> Basic Signatures</li>
</ul>
<a className="mt-space-6 block w-full text-center bg-paper text-primary border border-primary font-mono-data text-mono-data px-4 py-3 rounded shadow-sm hover:shadow-md transition-all" href="/remove-pages">Remove Pages</a>
</div>
</div>

<div className="bg-paper p-space-10 rounded-[28px] border border-brand-indigo-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden ring-1 ring-brand-indigo-50 group">
<div className="absolute top-0 right-0 p-space-6">
<span className="inline-block bg-brand-indigo-100 text-brand-indigo-900 font-label-caps text-label-caps px-3 py-1 uppercase tracking-wider rounded-none">Pro</span>
</div>
<div className="w-12 h-12 bg-brand-indigo-50 rounded-none flex items-center justify-center mb-space-6">
<span className="material-symbols-outlined text-primary">edit_document</span>
</div>
<h3 className="font-heading-md text-heading-md mb-space-3 text-on-surface">Full Editor</h3>
<p className="font-body-md text-body-md text-on-surface-variant">
                        One-time unlock. Edit text, replace images, convert to Word, and use on up to 5 devices.
                    </p>
<div className="mt-space-6 border-t border-ink-200 pt-space-6 group-hover:border-brand-indigo-100 transition-colors">
<ul className="space-y-2 font-mono-data text-mono-data text-ink-600">
<li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary" style={{fontSize: 16}}>check</span> Direct Text Editing</li>
<li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary" style={{fontSize: 16}}>check</span> Image Replacement</li>
<li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary" style={{fontSize: 16}}>check</span> PDF to Word/Excel</li>
</ul>
</div>
<div className="mt-space-10">
<a className="block w-full text-center bg-primary text-on-primary font-mono-data text-mono-data px-4 py-3 rounded shadow-sm hover:shadow-md transition-all" href="/checkout">Buy for $29</a>
</div>
</div>
</div>
</section>
</main>

<Footer />

    </div>
  );
}
