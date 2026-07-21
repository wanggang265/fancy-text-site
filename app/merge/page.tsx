import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Merge PDFs Online - RemovePDFPages',
  description: 'Combine multiple PDFs into one online for free. No upload, no watermark, no signup.',
};

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col relative dot-grid">
      

<nav className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-desktop py-space-3 max-w-container-max mx-auto bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-md">
<div className="flex items-center gap-space-6">
<a className="text-heading-sm font-heading-sm text-primary dark:text-inverse-primary tracking-tight" href="/">RemovePDFPages</a>
<div className="hidden md:flex gap-space-6 items-center">
<a className="font-body-md text-body-md text-primary dark:text-inverse-primary font-bold border-b-2 border-primary pb-1" href="/remove-pages">Tools</a>
<a className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors pb-1 border-b-2 border-transparent" href="/pricing">Pricing</a>
<a className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors pb-1 border-b-2 border-transparent" href="/faq">FAQ</a>
</div>
</div>
<div className="flex items-center">
<button className="bg-brand-indigo-50 text-primary font-body-md text-body-md px-4 py-2 rounded-DEFAULT hover:bg-brand-indigo-100 transition-colors font-medium">
                Buy License — $29
            </button>
</div>
</nav>

<main className="flex-grow pt-space-20 pb-space-20 px-margin-desktop max-w-container-max mx-auto w-full flex flex-col gap-space-20 mt-16">

<section className="flex flex-col gap-space-10 lg:grid lg:grid-cols-[1fr_1080px] lg:gap-space-6 xl:grid-cols-1 items-start justify-center">

<div className="flex flex-col gap-space-6 text-center xl:max-w-3xl xl:mx-auto">
<h1 className="font-display-xl-mobile md:font-display-xl text-primary-container">
                    Merge PDFs Online
                </h1>
<p className="font-body-lead text-body-lead text-on-surface-variant max-w-2xl mx-auto">
                    Combine multiple PDFs into one file for free. No signup, no watermark.
                </p>
<div className="flex flex-wrap justify-center gap-space-3">
<span className="inline-flex items-center px-2 py-1 bg-accent-olive-100 text-accent-olive-700 font-label-caps text-label-caps rounded-none uppercase tracking-wider">
                        FREE
                    </span>
<span className="inline-flex items-center px-2 py-1 bg-brand-indigo-50 text-brand-indigo-900 font-label-caps text-label-caps rounded-none uppercase tracking-wider">
                        No upload
                    </span>
<span className="inline-flex items-center px-2 py-1 bg-accent-olive-100 text-accent-olive-700 font-label-caps text-label-caps rounded-none uppercase tracking-wider">
                        No watermark
                    </span>
</div>
</div>

<div className="bg-paper rounded-[28px] shadow-lg border border-ink-200 p-space-6 md:p-space-10 w-full max-w-[1080px] mx-auto flex flex-col gap-space-6 relative z-10">

<div className="border-2 border-dashed border-ink-300 rounded-[20px] p-space-10 flex flex-col items-center justify-center text-center gap-space-3 bg-surface-container-lowest hover:bg-surface-container-low transition-colors cursor-pointer group">
<span className="material-symbols-outlined text-4xl text-outline group-hover:text-primary transition-colors">cloud_upload</span>
<div>
<p className="font-body-md text-body-md text-on-surface font-medium">Drop PDFs here or click to browse</p>
<p className="font-body-sm text-body-sm text-outline">Max 50 MB total. Files stay in your browser.</p>
</div>
</div>

<div className="flex flex-col gap-space-3">
<p className="font-body-sm text-body-sm text-outline-variant font-medium">Drag to reorder files.</p>
<div className="flex flex-col gap-2">

<div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-ink-200 rounded-DEFAULT bg-surface-container-lowest hover:shadow-sm transition-shadow group gap-2">
<div className="flex items-center gap-3 min-w-0">
<span className="material-symbols-outlined text-outline cursor-grab active:cursor-grabbing hover:text-on-surface">drag_indicator</span>
<span className="material-symbols-outlined text-error">picture_as_pdf</span>
<span className="font-mono-data text-mono-data text-on-surface break-words min-w-0">Financial_Report_Q1.pdf</span>
</div>
<div className="flex items-center gap-4 justify-end">
<span className="font-mono-data text-mono-data text-outline">2.4 MB</span>
<button className="text-outline hover:text-error transition-colors"><span className="material-symbols-outlined">delete</span></button>
</div>
</div>

<div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-ink-200 rounded-DEFAULT bg-surface-container-lowest hover:shadow-sm transition-shadow group gap-2">
<div className="flex items-center gap-3 min-w-0">
<span className="material-symbols-outlined text-outline cursor-grab active:cursor-grabbing hover:text-on-surface">drag_indicator</span>
<span className="material-symbols-outlined text-error">picture_as_pdf</span>
<span className="font-mono-data text-mono-data text-on-surface break-words min-w-0">Appendix_Charts.pdf</span>
</div>
<div className="flex items-center gap-4 justify-end">
<span className="font-mono-data text-mono-data text-outline">800 KB</span>
<button className="text-outline hover:text-error transition-colors"><span className="material-symbols-outlined">delete</span></button>
</div>
</div>

<div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-ink-200 rounded-DEFAULT bg-surface-container-lowest hover:shadow-sm transition-shadow group gap-2">
<div className="flex items-center gap-3 min-w-0">
<span className="material-symbols-outlined text-outline cursor-grab active:cursor-grabbing hover:text-on-surface">drag_indicator</span>
<span className="material-symbols-outlined text-error">picture_as_pdf</span>
<span className="font-mono-data text-mono-data text-on-surface break-words min-w-0">Summary_Notes.pdf</span>
</div>
<div className="flex items-center gap-4 justify-end">
<span className="font-mono-data text-mono-data text-outline">1.1 MB</span>
<button className="text-outline hover:text-error transition-colors"><span className="material-symbols-outlined">delete</span></button>
</div>
</div>
</div>
</div>

<div className="flex flex-col sm:flex-row justify-between items-center pt-space-6 border-t border-ink-200 gap-4 mt-auto">
<button className="w-full sm:w-auto px-6 py-3 bg-[#65A30D] text-white font-body-md text-body-md font-medium rounded-lg hover:bg-[#4D7C0F] transition-colors flex items-center justify-center gap-2">
<span className="material-symbols-outlined">call_merge</span>
                        Merge PDFs
                    </button>
<button className="w-full sm:w-auto px-6 py-3 border border-ink-300 text-ink-300 font-body-md text-body-md font-medium rounded-lg cursor-not-allowed flex items-center justify-center gap-2" disabled>
<span className="material-symbols-outlined">download</span>
                        Download merged PDF
                    </button>
</div>
</div>
</section>

<section className="flex flex-col gap-space-10 pt-space-10">
<h2 className="font-heading-lg text-heading-lg text-on-background text-center">Why Use Our Merge Tool?</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-6">

<div className="bg-paper rounded-[20px] p-space-6 border border-ink-200 shadow-sm flex flex-col gap-3">
<div className="w-12 h-12 rounded-full bg-brand-indigo-50 flex items-center justify-center text-primary mb-2">
<span className="material-symbols-outlined">shield</span>
</div>
<h3 className="font-heading-md text-heading-md text-on-surface text-xl">Browser-based</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Your files never leave your device. All processing happens locally in your browser for maximum privacy.</p>
</div>

<div className="bg-paper rounded-[20px] p-space-6 border border-ink-200 shadow-sm flex flex-col gap-3">
<div className="w-12 h-12 rounded-full bg-accent-olive-100 flex items-center justify-center text-accent-olive-700 mb-2">
<span className="material-symbols-outlined">format_list_numbered</span>
</div>
<h3 className="font-heading-md text-heading-md text-on-surface text-xl">Preserves order</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Easily drag and drop to arrange your files before merging. The final PDF reflects your exact order reliably.</p>
</div>

<div className="bg-paper rounded-[20px] p-space-6 border border-ink-200 shadow-sm flex flex-col gap-3">
<div className="w-12 h-12 rounded-full bg-brand-indigo-50 flex items-center justify-center text-primary mb-2">
<span className="material-symbols-outlined">speed</span>
</div>
<h3 className="font-heading-md text-heading-md text-on-surface text-xl">Generous Limits</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Merge multiple files seamlessly up to 50MB total size without any premium subscriptions required.</p>
</div>
</div>
</section>
</main>

<footer className="w-full px-margin-desktop py-space-20 grid grid-cols-1 md:grid-cols-4 gap-gutter-desktop bg-inverse-surface dark:bg-on-surface mt-auto">
<div className="col-span-1 md:col-span-1 flex flex-col gap-4">
<a className="text-heading-sm font-heading-sm text-white tracking-tight" href="/">RemovePDFPages</a>
<p className="font-body-sm text-body-sm text-inverse-on-surface dark:text-surface-bright opacity-80">
                Precision Drafting for PDF Documents.
            </p>
</div>
<div className="col-span-1 flex flex-col gap-3">
<h4 className="font-heading-sm text-heading-sm text-white text-lg">Tools</h4>
<a className="font-body-sm text-body-sm text-ink-300 dark:text-ink-300 hover:text-white transition-colors focus:underline" href="/remove-pages">Split PDF</a>
<a className="font-body-sm text-body-sm text-ink-300 dark:text-ink-300 hover:text-white transition-colors focus:underline" href="/merge">Merge PDF</a>
<a className="font-body-sm text-body-sm text-ink-300 dark:text-ink-300 hover:text-white transition-colors focus:underline" href="/compress">Compress PDF</a>
</div>
<div className="col-span-1 flex flex-col gap-3">
<h4 className="font-heading-sm text-heading-sm text-white text-lg">Legal</h4>
<a className="font-body-sm text-body-sm text-ink-300 dark:text-ink-300 hover:text-white transition-colors focus:underline" href="/contact">Terms of Service</a>
<a className="font-body-sm text-body-sm text-ink-300 dark:text-ink-300 hover:text-white transition-colors focus:underline" href="/contact">Privacy Policy</a>
</div>
<div className="col-span-1 flex flex-col gap-3 justify-end items-start md:items-end">
<a className="font-body-sm text-body-sm text-ink-300 dark:text-ink-300 hover:text-white transition-colors focus:underline" href="/contact">Contact Us</a>
<p className="font-body-sm text-body-sm text-inverse-on-surface dark:text-surface-bright mt-4 opacity-60">
                © 2024 RemovePDFPages. All rights reserved.
            </p>
</div>
</footer>

    </div>
  );
}
