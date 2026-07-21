import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Convert PDF to Word - RemovePDFPages',
};

export default function Page() {
  return (
    <div className="font-body-md text-on-surface antialiased bg-workspace min-h-screen flex flex-col">
      

<nav className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-desktop py-space-3 max-w-container-max mx-auto bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-md">
<div className="flex items-center gap-6">
<span className="text-heading-sm font-heading-sm text-primary dark:text-inverse-primary font-bold">RemovePDFPages</span>
<div className="hidden md:flex gap-6 items-center">
<a className="font-body-md text-body-md text-primary dark:text-inverse-primary font-bold border-b-2 border-primary hover:text-primary dark:hover:text-inverse-primary transition-colors hover:scale-95 transition-transform" href="/remove-pages">Tools</a>
<a className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors hover:scale-95 transition-transform" href="/pricing">Pricing</a>
<a className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors hover:scale-95 transition-transform" href="/faq">FAQ</a>
</div>
</div>
<div>
<a className="font-body-md text-body-md text-primary dark:text-inverse-primary font-semibold hover:text-primary dark:hover:text-inverse-primary transition-colors hover:scale-95 transition-transform" href="/checkout">Buy License — $29</a>
</div>
</nav>
<main className="flex-grow pt-[100px] pb-space-20">
<div className="max-w-container-max mx-auto px-margin-desktop md:px-margin-desktop px-4">

<div className="mb-space-10 max-w-3xl">
<div className="flex gap-2 mb-4">
<span className="bg-brand-indigo-100 text-brand-indigo-900 font-label-caps text-label-caps px-2 py-1 rounded-none uppercase tracking-wider">PAID</span>
<span className="bg-brand-indigo-50 text-brand-indigo-900 font-label-caps text-label-caps px-2 py-1 rounded-none uppercase tracking-wider">One-time unlock</span>
</div>
<h1 className="font-heading-lg text-heading-lg text-[#3730A3] mb-4">Convert PDF to Word</h1>
<p className="font-body-lead text-body-lead text-on-surface-variant">Turn PDFs into editable Word documents. Part of the full editor unlock.</p>
</div>

<div className="bg-paper rounded-[28px] shadow-lg border border-ink-200 overflow-hidden mb-space-20 max-w-[1080px]">
<div className="p-8">

<div className="border-2 border-dashed border-ink-300 rounded-[20px] bg-surface-container-low p-12 text-center hover:border-primary transition-colors cursor-pointer group">
<span className="material-symbols-outlined text-4xl text-ink-600 group-hover:text-primary mb-4" style={{fontVariationSettings: "'FILL' 0"}}>cloud_upload</span>
<p className="font-heading-sm text-heading-sm text-on-surface mb-2">Drop your PDF here or click to browse</p>
<p className="font-body-sm text-body-sm text-on-surface-variant">Max 50 MB. Your file stays in your browser.</p>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">

<div className="border border-ink-200 rounded-[20px] p-6 bg-surface">
<h3 className="font-heading-sm text-heading-sm mb-4">Output Settings</h3>
<div className="space-y-4">
<label className="flex items-center justify-between p-3 border border-primary bg-brand-indigo-50 rounded-[4px] cursor-pointer">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>description</span>
<span className="font-body-md text-body-md font-medium text-brand-indigo-900">Word (DOCX)</span>
</div>
<input checked className="text-primary focus:ring-primary rounded-none" name="output_format" type="radio" />
</label>
<label className="flex items-center justify-between p-3 border border-ink-300 hover:border-primary/50 bg-paper rounded-[4px] cursor-pointer transition-colors">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-ink-600" style={{fontVariationSettings: "'FILL' 1"}}>description</span>
<span className="font-body-md text-body-md font-medium text-on-surface">Rich Text (RTF)</span>
</div>
<input className="text-primary focus:ring-primary rounded-none" name="output_format" type="radio" />
</label>
<div className="pt-4 border-t border-ink-200 mt-4">
<label className="flex items-center gap-3 cursor-pointer">
<input checked className="rounded-none text-primary focus:ring-primary border-ink-300" type="checkbox" />
<span className="font-body-sm text-body-sm text-on-surface-variant">Keep formatting (experimental)</span>
</label>
</div>
</div>
</div>

<div className="flex flex-col justify-between">
<div className="bg-brand-indigo-50 border-l-4 border-[#3730A3] p-4 rounded-r-[4px] mb-6">
<div className="flex gap-3">
<span className="material-symbols-outlined text-[#3730A3] shrink-0" style={{fontVariationSettings: "'FILL' 1"}}>workspace_premium</span>
<div>
<h4 className="font-body-md text-body-md font-semibold text-brand-indigo-900 mb-1">Unlock Conversion</h4>
<p className="font-body-sm text-body-sm text-brand-indigo-900/80 mb-3">Get the full editor for $29 one-time. Includes Convert PDF to Word, edit text, replace images, and more.</p>
<button className="bg-[#3730A3] hover:bg-brand-indigo-900 text-white font-body-sm text-body-sm px-4 py-2 rounded-[4px] transition-colors font-medium">
                                            Buy Full Editor
                                        </button>
</div>
</div>
</div>
<div className="flex gap-4 items-center">
<button className="flex-1 bg-[#4F46E5] hover:bg-primary-container/90 text-white font-heading-sm text-heading-sm py-4 rounded-[4px] transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
<span className="material-symbols-outlined">autorenew</span>
                                    Convert to Word
                                </button>
</div>
</div>
</div>
</div>
</div>

<div className="mb-space-20">
<h2 className="font-heading-lg text-heading-lg mb-8 text-on-surface">Why use this converter?</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="bg-paper p-6 rounded-[20px] shadow-sm border border-ink-200">
<span className="material-symbols-outlined text-3xl text-primary mb-4">edit_document</span>
<h3 className="font-heading-sm text-heading-sm mb-2">Editable output</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Turn static PDFs into fully editable Word documents without retyping.</p>
</div>
<div className="bg-paper p-6 rounded-[20px] shadow-sm border border-ink-200">
<span className="material-symbols-outlined text-3xl text-primary mb-4">format_paint</span>
<h3 className="font-heading-sm text-heading-sm mb-2">Preserves formatting</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Maintains tables, lists, and layout structures as closely as possible.</p>
</div>
<div className="bg-paper p-6 rounded-[20px] shadow-sm border border-ink-200">
<span className="material-symbols-outlined text-3xl text-primary mb-4">credit_card_off</span>
<h3 className="font-heading-sm text-heading-sm mb-2">No subscription</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Pay once for the full editor license and use it forever. No recurring fees.</p>
</div>
</div>
</div>
</div>
</main>

<footer className="w-full px-margin-desktop py-space-20 grid grid-cols-1 md:grid-cols-4 gap-gutter-desktop bg-inverse-surface dark:bg-on-surface text-inverse-on-surface dark:text-surface-bright mt-auto">
<div className="col-span-1 md:col-span-4 mb-8">
<span className="text-heading-sm font-heading-sm text-white">RemovePDFPages</span>
</div>
<div className="flex flex-col gap-4">
<a className="font-body-sm text-body-sm text-ink-300 dark:text-ink-300 hover:text-white transition-colors focus:underline" href="/remove-pages">Split PDF</a>
<a className="font-body-sm text-body-sm text-ink-300 dark:text-ink-300 hover:text-white transition-colors focus:underline" href="/merge">Merge PDF</a>
<a className="font-body-sm text-body-sm text-ink-300 dark:text-ink-300 hover:text-white transition-colors focus:underline" href="/compress">Compress PDF</a>
</div>
<div className="flex flex-col gap-4">
<a className="font-body-sm text-body-sm text-ink-300 dark:text-ink-300 hover:text-white transition-colors focus:underline" href="/contact">Terms of Service</a>
<a className="font-body-sm text-body-sm text-ink-300 dark:text-ink-300 hover:text-white transition-colors focus:underline" href="/contact">Privacy Policy</a>
<a className="font-body-sm text-body-sm text-ink-300 dark:text-ink-300 hover:text-white transition-colors focus:underline" href="/contact">Contact Us</a>
</div>
<div className="col-span-1 md:col-span-4 mt-8 pt-8 border-t border-ink-600">
<p className="font-body-sm text-body-sm text-ink-300">© 2024 RemovePDFPages. Precision Drafting for PDF Documents.</p>
</div>
</footer>

    </div>
  );
}
