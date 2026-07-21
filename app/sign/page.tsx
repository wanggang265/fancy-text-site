import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign PDF Online - RemovePDFPages',
};

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body-md antialiased pt-24 min-h-screen flex flex-col relative dot-grid">
      

<header className="bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-md fixed top-0 w-full z-50 flex justify-between items-center px-margin-desktop py-space-3 max-w-container-max mx-auto shadow-none">
<div className="text-heading-sm font-heading-sm text-primary dark:text-inverse-primary">
            RemovePDFPages
        </div>
<nav className="hidden md:flex space-x-8">
<a className="text-primary dark:text-inverse-primary font-bold border-b-2 border-primary" href="/remove-pages">Tools</a>
<a className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors" href="/pricing">Pricing</a>
<a className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors" href="/faq">FAQ</a>
</nav>
<button className="bg-custom-indigo text-white px-4 py-2 rounded-none font-label-caps uppercase tracking-wider hover:bg-brand-indigo-900 transition-colors hidden md:block">
            Buy License — $29
        </button>
</header>
<main className="flex-grow w-full max-w-container-max mx-auto px-margin-desktop py-space-10">

<section className="text-center mb-space-10">
<h1 className="font-display-xl-mobile md:font-display-xl text-custom-indigo mb-space-3">Sign PDF Online</h1>
<p className="font-body-lead text-on-surface-variant max-w-2xl mx-auto mb-space-6">Add your signature to any PDF for free. No upload, no watermark, no signup.</p>
<div className="flex flex-wrap justify-center gap-space-3">
<span className="bg-accent-olive-100 text-accent-olive-700 px-3 py-1 font-label-caps rounded-none">FREE</span>
<span className="bg-brand-indigo-50 text-custom-indigo px-3 py-1 font-label-caps rounded-none">NO UPLOAD</span>
<span className="bg-accent-olive-100 text-accent-olive-700 px-3 py-1 font-label-caps rounded-none">NO WATERMARK</span>
</div>
</section>

<section className="bg-paper rounded-[28px] shadow-lg p-space-6 md:p-space-10 mb-space-20 border border-ink-200">
<div className="border-2 border-dashed border-ink-300 rounded-[20px] p-space-10 text-center mb-space-10 hover:border-custom-indigo transition-colors cursor-pointer bg-surface/50">
<span className="material-symbols-outlined text-4xl text-custom-indigo mb-space-3" style={{fontVariationSettings: "'FILL' 0"}}>cloud_upload</span>
<h3 className="font-heading-md text-on-surface mb-space-1">Drop your PDF here or click to browse</h3>
<p className="font-body-sm text-on-surface-variant">Max 50 MB. Your file stays in your browser.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter-desktop">

<div className="bg-ink-200/30 p-space-3 rounded-lg border border-ink-200 flex items-center justify-center min-h-[400px]">
<div className="bg-paper shadow-sm w-3/4 h-5/6 p-space-6 flex flex-col justify-end border border-ink-200 relative">
<div className="absolute inset-0 p-4 pointer-events-none opacity-20">
<div className="h-4 bg-ink-600 w-3/4 mb-2 rounded"></div>
<div className="h-4 bg-ink-600 w-full mb-2 rounded"></div>
<div className="h-4 bg-ink-600 w-5/6 mb-2 rounded"></div>
<div className="h-4 bg-ink-600 w-2/3 mb-2 rounded"></div>
</div>
<div className="border-2 border-dashed border-custom-indigo p-space-3 text-center text-custom-indigo font-body-sm bg-brand-indigo-50/50">
                            Sign here
                        </div>
</div>
</div>

<div className="flex flex-col">
<div className="flex justify-between items-end mb-space-3">
<label className="font-heading-sm text-on-surface">Draw your signature</label>
<button className="text-custom-olive font-body-sm hover:underline">Clear</button>
</div>
<div className="border border-ink-300 rounded-lg h-48 bg-paper mb-space-6 cursor-crosshair"></div>
<div className="mt-auto flex flex-col sm:flex-row gap-space-3">
<button className="bg-custom-olive text-white px-6 py-3 rounded-lg font-body-md font-medium hover:bg-opacity-90 transition-opacity flex-1 text-center">
                            Apply signature
                        </button>
<button className="border border-custom-indigo text-custom-indigo px-6 py-3 rounded-lg font-body-md font-medium hover:bg-brand-indigo-50 transition-colors flex-1 text-center">
                            Download signed PDF
                        </button>
</div>
</div>
</div>
</section>

<section className="mb-space-20">
<h2 className="font-heading-lg text-center mb-space-10">Why use our tool?</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop">
<div className="bg-paper p-space-6 rounded-[20px] shadow-sm border border-ink-200">
<span className="material-symbols-outlined text-3xl text-custom-indigo mb-space-3">draw</span>
<h3 className="font-heading-sm mb-space-1">Draw signature</h3>
<p className="font-body-sm text-on-surface-variant">Experience a smooth, responsive drawing canvas to create your perfect signature directly in the browser.</p>
</div>
<div className="bg-paper p-space-6 rounded-[20px] shadow-sm border border-ink-200">
<span className="material-symbols-outlined text-3xl text-custom-indigo mb-space-3">shield_lock</span>
<h3 className="font-heading-sm mb-space-1">No upload</h3>
<p className="font-body-sm text-on-surface-variant">Your files never leave your device. All processing happens locally in your browser for maximum privacy.</p>
</div>
<div className="bg-paper p-space-6 rounded-[20px] shadow-sm border border-ink-200">
<span className="material-symbols-outlined text-3xl text-custom-indigo mb-space-3">water_drop</span>
<h3 className="font-heading-sm mb-space-1">No watermark</h3>
<p className="font-body-sm text-on-surface-variant">We don't add any watermarks to your documents. Your signed PDF looks exactly how you want it.</p>
</div>
</div>
</section>

<section className="mb-space-20">
<h2 className="font-heading-lg text-center mb-space-10">More PDF Tools</h2>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
<div className="bg-paper p-space-6 rounded-[20px] shadow-sm border border-ink-200 hover:shadow-md transition-shadow cursor-pointer">
<span className="material-symbols-outlined text-2xl text-on-surface-variant mb-space-1">delete</span>
<h4 className="font-body-md font-medium">Remove PDF Pages</h4>
</div>
<div className="bg-paper p-space-6 rounded-[20px] shadow-sm border border-ink-200 hover:shadow-md transition-shadow cursor-pointer">
<span className="material-symbols-outlined text-2xl text-on-surface-variant mb-space-1">call_merge</span>
<h4 className="font-body-md font-medium">Merge PDF</h4>
</div>
<div className="bg-paper p-space-6 rounded-[20px] shadow-sm border border-ink-200 hover:shadow-md transition-shadow cursor-pointer">
<span className="material-symbols-outlined text-2xl text-on-surface-variant mb-space-1">compress</span>
<h4 className="font-body-md font-medium">Compress PDF</h4>
</div>
<div className="bg-paper p-space-6 rounded-[20px] shadow-sm border border-ink-200 hover:shadow-md transition-shadow cursor-pointer">
<span className="material-symbols-outlined text-2xl text-on-surface-variant mb-space-1">description</span>
<h4 className="font-body-md font-medium">Convert PDF to Word</h4>
</div>
</div>
</section>
</main>

<footer className="bg-inverse-surface dark:bg-on-surface w-full px-margin-desktop py-space-20 grid grid-cols-1 md:grid-cols-4 gap-gutter-desktop mt-auto">
<div className="col-span-1 md:col-span-4 mb-8">
<span className="text-heading-sm font-heading-sm text-white">RemovePDFPages</span>
</div>
<div className="flex flex-col space-y-2">
<a className="text-ink-300 dark:text-ink-300 hover:text-white transition-colors focus:underline font-body-sm text-body-sm" href="/remove-pages">Split PDF</a>
<a className="text-ink-300 dark:text-ink-300 hover:text-white transition-colors focus:underline font-body-sm text-body-sm" href="/merge">Merge PDF</a>
<a className="text-ink-300 dark:text-ink-300 hover:text-white transition-colors focus:underline font-body-sm text-body-sm" href="/compress">Compress PDF</a>
</div>
<div className="flex flex-col space-y-2">
<a className="text-ink-300 dark:text-ink-300 hover:text-white transition-colors focus:underline font-body-sm text-body-sm" href="/contact">Terms of Service</a>
<a className="text-ink-300 dark:text-ink-300 hover:text-white transition-colors focus:underline font-body-sm text-body-sm" href="/contact">Privacy Policy</a>
<a className="text-ink-300 dark:text-ink-300 hover:text-white transition-colors focus:underline font-body-sm text-body-sm" href="/contact">Contact Us</a>
</div>
<div className="col-span-1 md:col-span-4 mt-8 pt-8 border-t border-ink-600/30">
<p className="text-inverse-on-surface dark:text-surface-bright font-body-sm text-body-sm opacity-60">© 2024 RemovePDFPages. Precision Drafting for PDF Documents.</p>
</div>
</footer>

    </div>
  );
}
