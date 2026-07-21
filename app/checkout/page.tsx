import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout - RemovePDFPages',
};

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body-md text-body-md antialiased min-h-screen flex flex-col relative drafting-grid">
      

<main className="flex-grow pt-space-20 pb-space-20 relative z-10">
<div className="max-w-container-max mx-auto px-margin-desktop w-full">
<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter-desktop">

<div className="md:col-span-7 space-y-space-10">
<header className="space-y-space-3">
<h1 className="font-heading-lg text-heading-lg md:font-display-xl md:text-display-xl text-brand-indigo-900 tracking-tight">Get the Full Editor</h1>
<p className="font-body-lead text-body-lead text-ink-600 max-w-lg">One-time payment. Unlock every tool on up to 5 devices.</p>
</header>

<section className="space-y-space-3">
<h2 className="font-heading-sm text-heading-sm text-on-surface">Select your license</h2>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-3">

<label className="relative block cursor-pointer group">
<input checked className="peer sr-only" name="plan" type="radio" value="launch" />
<div className="h-full p-space-6 rounded-[28px] border-2 border-accent-olive-700 bg-surface-container-lowest shadow-sm peer-checked:bg-accent-olive-100/30 transition-all hover:shadow-md">
<div className="absolute -top-3 right-6 bg-accent-olive-100 text-accent-olive-700 font-label-caps text-label-caps px-2 py-1 rounded-none border border-accent-olive-700">Recommended</div>
<div className="flex justify-between items-start mb-2">
<h3 className="font-heading-md text-heading-md text-on-surface">Launch Special</h3>
<span className="material-symbols-outlined text-accent-olive-700" data-icon="check_circle" data-weight="fill" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
</div>
<div className="font-display-xl-mobile text-display-xl-mobile text-on-surface mb-1">$19</div>
<p className="font-body-sm text-body-sm text-ink-600">Lifetime access. Limited time offer.</p>
</div>
</label>

<label className="relative block cursor-pointer group">
<input className="peer sr-only" name="plan" type="radio" value="full" />
<div className="h-full p-space-6 rounded-[28px] border border-ink-200 bg-surface-container-lowest shadow-sm peer-checked:border-2 peer-checked:border-primary peer-checked:bg-brand-indigo-50 transition-all hover:shadow-md">
<div className="flex justify-between items-start mb-2">
<h3 className="font-heading-md text-heading-md text-on-surface">Full Editor</h3>
<span className="material-symbols-outlined text-ink-300 peer-checked:text-primary opacity-0 group-hover:opacity-50 peer-checked:opacity-100 peer-checked:opacity-100" data-icon="radio_button_unchecked">radio_button_unchecked</span>
</div>
<div className="font-display-xl-mobile text-display-xl-mobile text-on-surface mb-1">$29</div>
<p className="font-body-sm text-body-sm text-ink-600">Standard lifetime license.</p>
</div>
</label>
</div>
</section>

<section className="bg-surface-container-lowest rounded-[28px] border border-ink-200 p-space-6 sm:p-space-10 shadow-sm">
<form className="space-y-space-6">
<div className="space-y-space-3">
<h3 className="font-heading-sm text-heading-sm text-on-surface border-b border-ink-200 pb-2">Account Details</h3>
<div>
<label className="block font-body-sm text-body-sm text-on-surface-variant mb-1" htmlFor="email">Email address</label>
<input className="w-full rounded bg-transparent border border-ink-300 font-body-md text-body-md p-3 focus:ring-2 focus:ring-primary focus:border-primary transition-shadow" id="email" placeholder="you@example.com" required type="email" />
</div>
</div>
<div className="space-y-space-3 pt-space-3">
<h3 className="font-heading-sm text-heading-sm text-on-surface border-b border-ink-200 pb-2">Payment</h3>
<div className="space-y-space-3">
<div>
<label className="block font-body-sm text-body-sm text-on-surface-variant mb-1" htmlFor="card">Card number</label>
<div className="relative">
<input className="w-full rounded bg-transparent border border-ink-300 font-body-md text-body-md p-3 pl-10 focus:ring-2 focus:ring-primary focus:border-primary transition-shadow" id="card" placeholder="0000 0000 0000 0000" required type="text" />
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-ink-600" data-icon="credit_card">credit_card</span>
</div>
</div>
<div className="grid grid-cols-2 gap-space-3">
<div>
<label className="block font-body-sm text-body-sm text-on-surface-variant mb-1" htmlFor="expiry">Expiry date</label>
<input className="w-full rounded bg-transparent border border-ink-300 font-body-md text-body-md p-3 focus:ring-2 focus:ring-primary focus:border-primary transition-shadow" id="expiry" placeholder="MM / YY" required type="text" />
</div>
<div>
<label className="block font-body-sm text-body-sm text-on-surface-variant mb-1" htmlFor="cvc">CVC</label>
<input className="w-full rounded bg-transparent border border-ink-300 font-body-md text-body-md p-3 focus:ring-2 focus:ring-primary focus:border-primary transition-shadow" id="cvc" placeholder="123" required type="text" />
</div>
</div>
</div>
</div>

<div className="flex flex-wrap items-center gap-space-6 py-space-3 text-ink-600 font-body-sm text-body-sm">
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]" data-icon="lock">lock</span>
<span>Encrypted</span>
</div>
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]" data-icon="verified">verified</span>
<span>Stripe checkout</span>
</div>
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]" data-icon="history">history</span>
<span>14-day refund</span>
</div>
</div>
<button className="w-full bg-primary text-on-primary font-heading-sm text-heading-sm py-4 px-6 rounded-lg hover:bg-primary-container transition-colors shadow-sm hover:shadow-md flex items-center justify-center gap-2" type="submit">
<span className="material-symbols-outlined" data-icon="lock" data-weight="fill" style={{fontVariationSettings: "'FILL' 1"}}>lock</span>
                                Pay $19 — Unlock Full Editor
                            </button>
<p className="text-center font-body-sm text-body-sm text-ink-600">You will receive a license key by email immediately.</p>
</form>
</section>
</div>

<div className="md:col-span-5 relative">
<div className="md:sticky md:top-space-6 mt-space-10 md:mt-0">
<div className="bg-surface-container-lowest rounded-[28px] border border-ink-200 p-space-6 sm:p-space-10 shadow-lg">
<div className="mb-space-6 pb-space-6 border-b border-ink-200">
<h3 className="font-heading-md text-heading-md text-on-surface mb-2">Order Summary</h3>
<div className="flex justify-between items-end">
<div>
<p className="font-body-md text-body-md text-on-surface-variant font-semibold">Launch Special License</p>
<p className="font-body-sm text-body-sm text-ink-600">One-time payment</p>
</div>
<div className="text-right">
<p className="font-body-sm text-body-sm text-ink-600 line-through mb-1">$29.00</p>
<p className="font-heading-lg text-heading-lg text-on-surface leading-none">$19.00</p>
</div>
</div>
</div>
<div className="space-y-space-6">
<div>
<h4 className="font-label-caps text-label-caps text-ink-600 tracking-widest uppercase mb-4">What's included</h4>
<ul className="space-y-3 font-body-sm text-body-sm text-on-surface-variant">
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary text-[20px] shrink-0" data-icon="check">check</span>
<span>Edit PDF text natively</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary text-[20px] shrink-0" data-icon="check">check</span>
<span>Replace or extract images</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary text-[20px] shrink-0" data-icon="check">check</span>
<span>Convert PDF to Word & Excel</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary text-[20px] shrink-0" data-icon="check">check</span>
<span>Merge, Compress, Remove pages, Sign</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary text-[20px] shrink-0" data-icon="check">check</span>
<span className="font-medium text-on-surface">Install on up to 5 devices</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary text-[20px] shrink-0" data-icon="check">check</span>
<span>Lifetime updates (Major & Minor)</span>
</li>
</ul>
</div>
<div className="pt-space-6 border-t border-ink-200 flex justify-between items-center">
<span className="font-heading-sm text-heading-sm text-on-surface">Total</span>
<span className="font-heading-md text-heading-md text-brand-indigo-900">$19.00</span>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</main>

<footer className="bg-inverse-surface dark:bg-on-surface w-full px-margin-desktop py-space-10 grid grid-cols-1 md:grid-cols-4 gap-gutter-desktop mt-auto relative z-10">
<div className="col-span-1 md:col-span-4 flex justify-between items-center text-inverse-on-surface dark:text-surface-bright font-body-sm text-body-sm border-t border-ink-600/30 pt-space-6">
<div>
<span className="text-heading-sm font-heading-sm text-white block mb-2">RemovePDFPages</span>
<span className="text-ink-300 dark:text-ink-300">© 2024 RemovePDFPages. Precision Drafting for PDF Documents.</span>
</div>
<div className="flex gap-space-6">
<a className="text-ink-300 dark:text-ink-300 hover:text-white transition-colors" href="/contact">Terms of Service</a>
<a className="text-ink-300 dark:text-ink-300 hover:text-white transition-colors" href="/contact">Privacy Policy</a>
</div>
</div>
</footer>

    </div>
  );
}
