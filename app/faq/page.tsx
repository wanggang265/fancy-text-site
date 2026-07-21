import type { Metadata } from 'next';
import { FaqAccordion } from '@/components/FaqAccordion';

export const metadata: Metadata = {
  title: 'FAQ - RemovePDFPages',
};

export default function Page() {
  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col relative dot-grid">
      

<header className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-desktop py-space-3 max-w-container-max mx-auto bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-md shadow-none font-body-md text-body-md">
<div className="flex items-center gap-4">
<span className="text-heading-sm font-heading-sm text-primary dark:text-inverse-primary tracking-tight">RemovePDFPages</span>
</div>
<nav className="hidden md:flex gap-8">
<a className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors" href="/remove-pages">Tools</a>
<a className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors" href="/pricing">Pricing</a>
<a className="text-primary dark:text-inverse-primary font-bold border-b-2 border-primary hover:text-primary dark:hover:text-inverse-primary transition-colors" href="/faq">FAQ</a>
</nav>
<div>
<button className="bg-primary hover:bg-primary-container text-on-primary font-mono-data text-mono-data py-2 px-4 rounded transition-colors shadow-sm hover:shadow-md">Buy License — $29</button>
</div>
</header>
<main className="flex-grow pt-32 pb-space-20 max-w-container-max mx-auto w-full px-margin-desktop md:px-margin-desktop px-4">

<section className="mb-space-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-ink-200 pb-12">
<div className="md:w-1/2">
<h1 className="font-heading-lg text-heading-lg text-[#3730A3] mb-4">Help & FAQs</h1>
<p className="font-body-lead text-body-lead text-on-surface-variant">Quick answers to common questions about RemovePDFPages.</p>
</div>
<div className="md:w-1/2 relative w-full max-w-md ml-auto">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-ink-600">search</span>
<input className="w-full pl-10 pr-4 py-3 bg-paper border border-ink-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md text-body-md shadow-sm" placeholder="Search the help center..." type="text" />
</div>
</section>

<div className="flex flex-col md:flex-row gap-gutter-desktop">

<aside className="md:w-[30%] hidden md:block">
<div className="sticky top-32 space-y-2">
<a className="block py-2 px-4 rounded-md bg-brand-indigo-50 text-primary font-medium border-l-2 border-primary transition-colors" href="#using-tool">Using the tool</a>
<a className="block py-2 px-4 rounded-md text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface transition-colors" href="#privacy">Privacy & security</a>
<a className="block py-2 px-4 rounded-md text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface transition-colors" href="#pricing">Pricing & license</a>
<a className="block py-2 px-4 rounded-md text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface transition-colors" href="#refunds">Refunds</a>
<a className="block py-2 px-4 rounded-md text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface transition-colors" href="#contact">Contact support</a>
</div>
</aside>

<div className="md:w-[70%] space-y-16">

<section id="using-tool">
<h2 className="font-heading-md text-heading-md text-on-surface mb-6 flex items-center gap-2">
<span className="material-symbols-outlined text-primary">build</span> Using the tool
                    </h2>
<div className="space-y-4">
<FaqAccordion question="How do I remove pages?">
                            Simply drag and drop your PDF into the upload zone. Once loaded, hover over any page thumbnail and click the 'Trash' icon to mark it for removal. Click 'Export PDF' when you're done.
                        </FaqAccordion>
<FaqAccordion question="Can I reorder pages?">
                            Currently, RemovePDFPages is strictly designed for removing pages efficiently. We plan to introduce reordering in a future update.
                        </FaqAccordion>
</div>
</section>

<section id="privacy">
<h2 className="font-heading-md text-heading-md text-on-surface mb-6 flex items-center gap-2">
<span className="material-symbols-outlined text-primary">security</span> Privacy & security
                    </h2>
<div className="space-y-4">
<FaqAccordion question="Are my files stored on your server?">
                            No. All processing happens locally in your browser. Your files never leave your computer, ensuring complete privacy.
                        </FaqAccordion>
</div>
</section>

<section id="pricing">
<h2 className="font-heading-md text-heading-md text-on-surface mb-6 flex items-center gap-2">
<span className="material-symbols-outlined text-primary">payments</span> Pricing & license
                    </h2>
<div className="space-y-4">
<FaqAccordion question="Is it really a one-time payment?">
                            Yes. We believe in owning your tools. You pay once and get access to the current version forever, including minor updates.
                        </FaqAccordion>
</div>
</section>

<section className="mt-space-20 bg-brand-indigo-50 border border-primary/20 rounded-[28px] p-8 md:p-12 text-center shadow-sm relative overflow-hidden">
<div className="absolute inset-0 dot-grid opacity-30 pointer-events-none"></div>
<div className="relative z-10">
<h3 className="font-heading-md text-heading-md text-[#3730A3] mb-4">Still need help?</h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-8 max-w-md mx-auto">If you couldn't find the answer to your question, our support team is ready to assist you.</p>
<div className="flex flex-col sm:flex-row justify-center gap-4">
<button className="bg-primary hover:bg-primary-container text-on-primary font-mono-data text-mono-data py-3 px-6 rounded transition-colors shadow-sm hover:shadow-md flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-sm">mail</span> Contact us
                            </button>
<button className="bg-white hover:bg-ink-200 text-primary font-mono-data text-mono-data py-3 px-6 rounded border border-ink-300 transition-colors shadow-sm flex items-center justify-center gap-2">
                                Request a refund
                            </button>
</div>
</div>
</section>
</div>
</div>
</main>

<footer className="w-full px-margin-desktop py-space-20 grid grid-cols-1 md:grid-cols-4 gap-gutter-desktop bg-inverse-surface dark:bg-on-surface font-body-sm text-body-sm text-inverse-on-surface dark:text-surface-bright mt-auto">
<div className="md:col-span-1">
<span className="text-heading-sm font-heading-sm text-white mb-4 block">RemovePDFPages</span>
<p className="text-ink-300 mb-4">© 2024 RemovePDFPages. Precision Drafting for PDF Documents.</p>
</div>
<div className="flex flex-col gap-2">
<h4 className="font-semibold text-white mb-2">Tools</h4>
<a className="text-ink-300 dark:text-ink-300 hover:text-white transition-colors focus:underline" href="/remove-pages">Split PDF</a>
<a className="text-ink-300 dark:text-ink-300 hover:text-white transition-colors focus:underline" href="/merge">Merge PDF</a>
<a className="text-ink-300 dark:text-ink-300 hover:text-white transition-colors focus:underline" href="/compress">Compress PDF</a>
</div>
<div className="flex flex-col gap-2">
<h4 className="font-semibold text-white mb-2">Legal</h4>
<a className="text-ink-300 dark:text-ink-300 hover:text-white transition-colors focus:underline" href="/contact">Terms of Service</a>
<a className="text-ink-300 dark:text-ink-300 hover:text-white transition-colors focus:underline" href="/contact">Privacy Policy</a>
</div>
<div className="flex flex-col gap-2">
<h4 className="font-semibold text-white mb-2">Support</h4>
<a className="text-ink-300 dark:text-ink-300 hover:text-white transition-colors focus:underline" href="/contact">Contact Us</a>
</div>
</footer>

    </div>
  );
}
