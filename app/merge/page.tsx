import Header from '@/components/Header';
import type { Metadata } from 'next';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Merge PDFs Online - RemovePDFPages',
  description: 'Combine multiple PDFs into one online for free. No upload, no watermark, no signup.',
};

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col relative dot-grid">
<Header />
      

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


<Footer />
</div>
  );
}
