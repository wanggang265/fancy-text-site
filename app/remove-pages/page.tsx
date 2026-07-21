import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Remove PDF Pages',
};

export default function Page() {
  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col pt-space-20 md:pt-space-20">
      

<nav className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-desktop py-space-3 max-w-container-max mx-auto bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-md">
<a className="text-heading-sm font-heading-sm text-primary dark:text-inverse-primary tracking-tight" href="/">RemovePDFPages</a>
<div className="hidden md:flex gap-space-6 items-center">
<a className="text-primary dark:text-inverse-primary font-bold border-b-2 border-primary font-body-md text-body-md hover:text-primary transition-colors" href="/remove-pages">Tools</a>
<a className="text-on-surface-variant dark:text-on-surface-variant font-body-md text-body-md hover:text-primary transition-colors" href="/pricing">Pricing</a>
<a className="text-on-surface-variant dark:text-on-surface-variant font-body-md text-body-md hover:text-primary transition-colors" href="/faq">FAQ</a>
</div>
<button className="bg-primary text-on-primary font-mono-data text-mono-data px-4 py-2 rounded-sm hover:opacity-90 transition-opacity">Buy License — $29</button>
</nav>

<header className="px-margin-desktop max-w-container-max mx-auto w-full pt-space-20 pb-space-10">
<div className="max-w-2xl">
<div className="flex flex-wrap gap-2 mb-6">
<span className="bg-accent-olive-100 text-accent-olive-700 px-3 py-1 font-label-caps text-label-caps rounded-none uppercase">FREE</span>
<span className="bg-brand-indigo-50 text-brand-indigo-900 px-3 py-1 font-label-caps text-label-caps rounded-none uppercase">No server upload</span>
<span className="bg-accent-olive-100 text-accent-olive-700 px-3 py-1 font-label-caps text-label-caps rounded-none uppercase">No watermark</span>
</div>
<h1 className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-brand-indigo-900 mb-6">Remove PDF Pages Online</h1>
<p className="font-body-lead text-body-lead text-on-surface-variant mb-8">Free, secure, and no signup. Delete pages from any PDF in your browser.</p>
</div>
</header>

<main className="flex-grow px-margin-desktop max-w-container-max mx-auto w-full mb-space-20">
<div className="bg-paper rounded-[28px] shadow-lg border border-ink-200 overflow-hidden relative">
<div className="absolute inset-0 dot-grid opacity-50 z-0"></div>
<div className="relative z-10 p-8 md:p-12">

<div className="border-2 border-dashed border-ink-300 rounded-[20px] p-10 flex flex-col items-center justify-center text-center bg-surface-container-lowest/80 backdrop-blur-sm cursor-pointer hover:border-primary transition-colors mb-8">
<span className="material-symbols-outlined text-4xl text-primary mb-4" style={{fontVariationSettings: "'FILL' 0"}}>cloud_upload</span>
<h3 className="font-heading-md text-heading-md text-on-surface mb-2">Drop your PDF here or click to browse</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Max 50 MB. Your file stays in your browser.</p>
</div>

<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">

<div className="flex flex-col items-center">
<div className="w-full page-thumb-ratio bg-white border-2 border-accent-olive-700 rounded-sm relative overflow-hidden mb-2 group cursor-pointer shadow-sm">
<img className="w-full h-full object-cover opacity-50 grayscale" alt="A macro shot of a crisp white drafting paper document with technical geometric lines drawn in light blue ink. The lighting is bright studio lighting highlighting the texture of the thick paper. The aesthetic is modern, clean, and technical." src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjgzIiB2aWV3Qm94PSIwIDAgMjAwIDI4MyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyODMiIGZpbGw9IiNmOGZhZmMiLz48cmVjdCB4PSIyMCIgeT0iMzAiIHdpZHRoPSIxNjAiIGhlaWdodD0iNiIgZmlsbD0iI2NiZDVlMSIvPjxyZWN0IHg9IjIwIiB5PSI1MCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI0IiBmaWxsPSIjZTJlOGYwIi8+PHJlY3QgeD0iMjAiIHk9IjY1IiB3aWR0aD0iMTQwIiBoZWlnaHQ9IjQiIGZpbGw9IiNlMmU4ZjAiLz48cmVjdCB4PSIyMCIgeT0iOTAiIHdpZHRoPSIxNjAiIGhlaWdodD0iODAiIGZpbGw9IiNlZWYyZmYiLz48cmVjdCB4PSIzMCIgeT0iMTA1IiB3aWR0aD0iNjAiIGhlaWdodD0iNDAiIGZpbGw9IiM0ZjQ2ZTUiIG9wYWNpdHk9IjAuMTUiLz48cmVjdCB4PSIxMDAiIHk9IjEwNSIgd2lkdGg9IjcwIiBoZWlnaHQ9IjQiIGZpbGw9IiNjYmQ1ZTEiLz48cmVjdCB4PSIxMDAiIHk9IjEyMCIgd2lkdGg9IjcwIiBoZWlnaHQ9IjQiIGZpbGw9IiNjYmQ1ZTEiLz48cmVjdCB4PSIxMDAiIHk9IjEzNSIgd2lkdGg9IjUwIiBoZWlnaHQ9IjQiIGZpbGw9IiNjYmQ1ZTEiLz48L3N2Zz4=" />
<div className="absolute inset-0 bg-accent-olive-700/20 flex items-center justify-center">
<div className="bg-accent-olive-700 text-white rounded-full p-2 flex items-center justify-center">
<span className="material-symbols-outlined text-xl" style={{fontVariationSettings: "'FILL' 1"}}>close</span>
</div>
</div>
</div>
<span className="font-mono-data text-mono-data text-on-surface-variant">1</span>
</div>

<div className="flex flex-col items-center">
<div className="w-full page-thumb-ratio bg-white border border-ink-200 rounded-sm relative overflow-hidden mb-2 group cursor-pointer shadow-sm hover:shadow-md transition-shadow">
<img className="w-full h-full object-cover" alt="A clean, minimalist layout of a technical manual page on bright white paper. Black crisp typography and simple diagrams. High key lighting, very sharp and professional." src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjgzIiB2aWV3Qm94PSIwIDAgMjAwIDI4MyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyODMiIGZpbGw9IiNmZmZmZmYiLz48cmVjdCB4PSIyMCIgeT0iMjUiIHdpZHRoPSIxMDAiIGhlaWdodD0iNiIgZmlsbD0iIzBmMTcyYSIvPjxyZWN0IHg9IjIwIiB5PSI0NSIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIzIiBmaWxsPSIjY2JkNWUxIi8+PHJlY3QgeD0iMjAiIHk9IjU4IiB3aWR0aD0iMTYwIiBoZWlnaHQ9IjMiIGZpbGw9IiNjYmQ1ZTEiLz48cmVjdCB4PSIyMCIgeT0iNzEiIHdpZHRoPSIxNDAiIGhlaWdodD0iMyIgZmlsbD0iI2NiZDVlMSIvPjxyZWN0IHg9IjIwIiB5PSI5NSIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIzIiBmaWxsPSIjY2JkNWUxIi8+PHJlY3QgeD0iMjAiIHk9IjEwOCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIzIiBmaWxsPSIjY2JkNWUxIi8+PHJlY3QgeD0iMjAiIHk9IjEyMSIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIzIiBmaWxsPSIjY2JkNWUxIi8+PC9zdmc+" />
</div>
<span className="font-mono-data text-mono-data text-on-surface-variant">2</span>
</div>

<div className="flex flex-col items-center">
<div className="w-full page-thumb-ratio bg-white border border-ink-200 rounded-sm relative overflow-hidden mb-2 group cursor-pointer shadow-sm hover:shadow-md transition-shadow">
<img className="w-full h-full object-cover" alt="A section of an architectural blueprint rendered in stark black and white on premium drafting paper. Minimalist, analog-modern style with exact geometric precision." src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjgzIiB2aWV3Qm94PSIwIDAgMjAwIDI4MyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyODMiIGZpbGw9IiNmOGZhZmMiLz48cmVjdCB4PSIyNSIgeT0iNDAiIHdpZHRoPSIxNTAiIGhlaWdodD0iMTAwIiBmaWxsPSJub25lIiBzdHJva2U9IiNlMmU4ZjAiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjkwIiByPSIzMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTJlOGYwIiBzdHJva2Utd2lkdGg9IjEuNSIvPjxsaW5lIHgxPSIyNSIgeTE9IjkwIiB4Mj0iMTc1IiB5Mj0iOTAiIHN0cm9rZT0iI2UyZThmMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PGxpbmUgeDE9IjEwMCIgeTE9IjQwIiB4Mj0iMTAwIiB5Mj0iMTQwIiBzdHJva2U9IiNlMmU4ZjAiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==" />
</div>
<span className="font-mono-data text-mono-data text-on-surface-variant">3</span>
</div>

<div className="flex flex-col items-center">
<div className="w-full page-thumb-ratio bg-white border border-ink-200 rounded-sm relative overflow-hidden mb-2 group cursor-pointer shadow-sm hover:shadow-md transition-shadow">
<img className="w-full h-full object-cover" alt="A close up view of a sophisticated data visualization chart on white paper. Deep indigo and slate gray lines. Clean, sparse, and highly technical design language." src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjgzIiB2aWV3Qm94PSIwIDAgMjAwIDI4MyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyODMiIGZpbGw9IiNmZmZmZmYiLz48cmVjdCB4PSIzMCIgeT0iMTgwIiB3aWR0aD0iMjAiIGhlaWdodD0iNjAiIGZpbGw9IiM0ZjQ2ZTUiIG9wYWNpdHk9IjAuMyIvPjxyZWN0IHg9IjYwIiB5PSIxNjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzRmNDZlNSIgb3BhY2l0eT0iMC40Ii8+PHJlY3QgeD0iOTAiIHk9IjE0MCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzRmNDZlNSIgb3BhY2l0eT0iMC41Ii8+PHJlY3QgeD0iMTIwIiB5PSIxNzAiIHdpZHRoPSIyMCIgaGVpZ2h0PSI3MCIgZmlsbD0iIzRmNDZlNSIgb3BhY2l0eT0iMC4zNSIvPjxyZWN0IHg9IjE1MCIgeT0iMTUwIiB3aWR0aD0iMjAiIGhlaWdodD0iOTAiIGZpbGw9IiM0ZjQ2ZTUiIG9wYWNpdHk9IjAuNDUiLz48cmVjdCB4PSIzMCIgeT0iNTAiIHdpZHRoPSIxNDAiIGhlaWdodD0iMyIgZmlsbD0iI2NiZDVlMSIvPjxyZWN0IHg9IjMwIiB5PSI2NSIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIzIiBmaWxsPSIjY2JkNWUxIi8+PC9zdmc+" />
</div>
<span className="font-mono-data text-mono-data text-on-surface-variant">4</span>
</div>
</div>

<div className="flex flex-col sm:flex-row gap-4 justify-end border-t border-ink-200 pt-6">
<button className="bg-surface text-primary border border-primary px-6 py-3 rounded-lg font-mono-data text-mono-data hover:bg-brand-indigo-50 transition-colors">Download remaining PDF</button>
<button className="bg-[#65A30D] text-white px-6 py-3 rounded-lg font-mono-data text-mono-data hover:bg-accent-olive-700 transition-colors shadow-sm">Remove selected pages</button>
</div>
</div>
</div>
</main>

<footer className="w-full px-margin-desktop py-space-20 grid grid-cols-1 md:grid-cols-4 gap-gutter-desktop bg-inverse-surface dark:bg-on-surface">
<div className="md:col-span-1">
<span className="text-heading-sm font-heading-sm text-white mb-4 block tracking-tight">RemovePDFPages</span>
<p className="font-body-sm text-body-sm text-ink-300 dark:text-ink-300">© 2024 RemovePDFPages. Precision Drafting for PDF Documents.</p>
</div>
<div className="md:col-span-3 flex flex-wrap gap-x-8 gap-y-4">
<a className="font-body-sm text-body-sm text-ink-300 dark:text-ink-300 hover:text-white transition-colors focus:underline" href="/remove-pages">Split PDF</a>
<a className="font-body-sm text-body-sm text-ink-300 dark:text-ink-300 hover:text-white transition-colors focus:underline" href="/merge">Merge PDF</a>
<a className="font-body-sm text-body-sm text-ink-300 dark:text-ink-300 hover:text-white transition-colors focus:underline" href="/compress">Compress PDF</a>
<a className="font-body-sm text-body-sm text-ink-300 dark:text-ink-300 hover:text-white transition-colors focus:underline" href="/contact">Terms of Service</a>
<a className="font-body-sm text-body-sm text-ink-300 dark:text-ink-300 hover:text-white transition-colors focus:underline" href="/contact">Privacy Policy</a>
<a className="font-body-sm text-body-sm text-ink-300 dark:text-ink-300 hover:text-white transition-colors focus:underline" href="/contact">Contact Us</a>
</div>
</footer>

    </div>
  );
}
