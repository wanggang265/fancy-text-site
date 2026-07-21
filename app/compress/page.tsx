import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compress PDF Online | RemovePDFPages',
  description: 'Reduce PDF file size online for free. No upload, no watermark, and no signup required.',
};

export default function Page() {
  return (
    <div className="bg-background text-on-surface font-body-md antialiased min-h-screen flex flex-col relative">
      

<header className="bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-md fixed top-0 w-full z-50 flex justify-between items-center px-margin-desktop py-space-3 max-w-container-max mx-auto flat no shadows border-none h-16">
<div className="text-heading-sm font-heading-sm text-primary dark:text-inverse-primary font-bold">RemovePDFPages</div>
<nav className="hidden md:flex gap-6 items-center">
<a className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors text-body-md font-body-md" href="/remove-pages">Tools</a>
<a className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors text-body-md font-body-md" href="/pricing">Pricing</a>
<a className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors text-body-md font-body-md" href="/faq">FAQ</a>
</nav>
<button className="bg-primary-container text-on-primary-container px-4 py-2 rounded-lg font-body-md text-sm hidden md:block">Buy License — $29</button>
</header>
<main className="flex-grow pt-24 pb-space-20">

<section className="max-w-container-max mx-auto px-margin-desktop text-center py-space-10">
<h1 className="text-[#3730A3] font-display-xl md:font-display-xl text-display-xl-mobile md:text-display-xl mb-4">Compress PDF Online</h1>
<p className="text-on-surface-variant font-body-lead text-body-lead max-w-2xl mx-auto mb-6">Reduce PDF file size without losing quality. Free, no signup.</p>
<div className="flex flex-wrap justify-center gap-3">
<span className="bg-accent-olive-100 text-accent-olive-700 px-3 py-1 font-label-caps text-label-caps rounded-none border border-accent-olive-700/20">FREE</span>
<span className="bg-brand-indigo-50 text-brand-indigo-900 px-3 py-1 font-label-caps text-label-caps rounded-none border border-brand-indigo-900/20">No upload</span>
<span className="bg-accent-olive-100 text-accent-olive-700 px-3 py-1 font-label-caps text-label-caps rounded-none border border-accent-olive-700/20">No watermark</span>
</div>
</section>

<section className="max-w-[1080px] mx-auto px-margin-desktop mb-space-20 relative">
<div className="bg-paper shadow-lg rounded-[28px] border border-ink-200 overflow-hidden relative z-10">
<div className="absolute inset-0 dot-grid opacity-50 z-0"></div>
<div className="relative z-10 p-8 md:p-12 flex flex-col items-center">

<div className="w-full max-w-3xl border-2 border-dashed border-ink-300 rounded-[20px] bg-white/80 backdrop-blur-sm p-12 text-center hover:bg-surface-container-low transition-colors cursor-pointer group mb-8">
<span className="material-symbols-outlined text-4xl text-primary mb-4 group-hover:-translate-y-1 transition-transform" data-icon="cloud_upload">cloud_upload</span>
<h3 className="font-heading-sm text-heading-sm text-on-surface mb-2">Drop your PDF here or click to browse</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Max 50 MB. Your file stays in your browser.</p>
</div>

<div className="w-full max-w-3xl mb-8">
<h4 className="font-heading-md text-body-lead mb-4 text-on-surface">Compression level</h4>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<div className="border-[2px] border-[#65A30D] rounded-lg p-4 bg-accent-olive-100/20 cursor-pointer flex items-start gap-3">
<input checked className="mt-1 rounded-sm text-[#65A30D] focus:ring-[#65A30D]" id="comp-rec" name="compression" type="radio" />
<div>
<label className="font-mono-data text-mono-data block cursor-pointer" htmlFor="comp-rec">Recommended compression</label>
<span className="font-body-sm text-body-sm text-on-surface-variant">Smaller file, good quality</span>
</div>
</div>

<div className="border border-ink-300 rounded-lg p-4 hover:border-primary transition-colors cursor-pointer flex items-start gap-3 bg-white">
<input className="mt-1 rounded-sm text-primary focus:ring-primary" id="comp-max" name="compression" type="radio" />
<div>
<label className="font-mono-data text-mono-data block cursor-pointer" htmlFor="comp-max">Maximum compression</label>
<span className="font-body-sm text-body-sm text-on-surface-variant">Smallest file, acceptable quality</span>
</div>
</div>
</div>
</div>

<div className="w-full max-w-3xl flex items-center justify-between p-4 bg-surface-container-lowest border border-ink-200 rounded-lg mb-8">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-outline" data-icon="description">description</span>
<span className="font-body-md text-body-md text-on-surface">document_final_v2.pdf</span>
</div>
<div className="flex items-center gap-3">
<span className="font-mono-data text-label-caps text-on-surface-variant line-through decoration-error">2.4 MB</span>
<span className="material-symbols-outlined text-sm text-outline" data-icon="arrow_right_alt">arrow_right_alt</span>
<span className="font-mono-data text-mono-data text-on-surface font-semibold">0.8 MB</span>
<span className="bg-accent-olive-100 text-accent-olive-700 px-2 py-0.5 rounded-none font-label-caps text-[10px]">-67%</span>
</div>
</div>

<div className="w-full max-w-3xl flex flex-col sm:flex-row gap-4 justify-center">
<button className="bg-[#65A30D] hover:bg-accent-olive-700 text-white font-body-md text-body-md py-3 px-8 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-sm" data-icon="compress">compress</span>
                            Compress PDF
                        </button>
<button className="bg-white border-2 border-primary text-primary hover:bg-brand-indigo-50 font-body-md text-body-md py-3 px-8 rounded-lg transition-all flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-sm" data-icon="download">download</span>
                            Download compressed PDF
                        </button>
</div>
</div>
</div>
</section>
</main>

    </div>
  );
}
