import Header from '@/components/Header';
import type { Metadata } from 'next';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Contact & Refund - RemovePDFPages',
  description: 'Get in touch with RemovePDFPages for support, questions, or refund requests.',
};

export default function Page() {
  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col pt-[88px]">
<Header />
      

<main className="flex-grow w-full max-w-container-max mx-auto px-margin-desktop py-space-20 dot-grid relative">

<div className="mb-space-10 text-center md:text-left">
<h1 className="text-display-xl-mobile md:text-display-xl font-display-xl-mobile md:font-display-xl text-brand-indigo-900 mb-space-3">Contact & Refund</h1>
<p className="text-body-lead font-body-lead text-on-surface-variant max-w-2xl">Reach out for support or request a refund within 14 days.</p>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop">

<div className="lg:col-span-7 bg-paper p-space-6 rounded-28px border border-ink-200 shadow-sm relative z-10">
<form className="space-y-space-6">
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-6">
<div className="space-y-space-1">
<label className="font-mono-data text-mono-data text-ink-600 block" htmlFor="name">Name</label>
<input className="w-full border border-ink-300 rounded font-body-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow" id="name" placeholder="Jane Doe" type="text" />
</div>
<div className="space-y-space-1">
<label className="font-mono-data text-mono-data text-ink-600 block" htmlFor="email">Email</label>
<input className="w-full border border-ink-300 rounded font-body-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow" id="email" placeholder="jane@example.com" type="email" />
</div>
</div>
<div className="space-y-space-1">
<label className="font-mono-data text-mono-data text-ink-600 block" htmlFor="subject">Subject</label>
<select className="w-full border border-ink-300 rounded font-body-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow bg-white" id="subject">
<option>Support</option>
<option>Refund</option>
<option>Business</option>
<option>Other</option>
</select>
</div>
<div className="space-y-space-1">
<label className="font-mono-data text-mono-data text-ink-600 block" htmlFor="message">Message</label>
<textarea className="w-full border border-ink-300 rounded font-body-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow resize-y" id="message" placeholder="How can we help you?" rows={5}></textarea>
</div>
<button className="bg-indigo-600 text-white rounded-lg px-6 py-3 font-body-md font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 w-full md:w-auto" type="submit">
<span>Send message</span>
<span className="material-symbols-outlined text-sm">send</span>
</button>
</form>
</div>

<div className="lg:col-span-5 flex flex-col gap-space-6 relative z-10">

<div className="bg-brand-indigo-50 p-space-6 rounded-20px border border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
<div className="flex items-start gap-4 mb-4">
<span className="material-symbols-outlined text-indigo-600 text-3xl">currency_exchange</span>
<div>
<h3 className="font-heading-sm text-heading-sm text-brand-indigo-900 mb-1">Refund policy</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Full refund within 14 days of purchase. No questions asked.</p>
</div>
</div>
<button className="w-full bg-white text-indigo-700 border border-indigo-200 rounded px-4 py-2 font-body-sm font-medium hover:bg-indigo-50 transition-colors">
                        Request refund
                    </button>
</div>

<div className="bg-paper p-space-6 rounded-20px border border-ink-200 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
<span className="material-symbols-outlined text-indigo-600 text-3xl">schedule</span>
<div>
<h3 className="font-heading-sm text-heading-sm text-brand-indigo-900 mb-1">Response time</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">We usually reply within 24 hours.</p>
</div>
</div>

<div className="bg-paper p-space-6 rounded-20px border border-ink-200 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
<span className="material-symbols-outlined text-indigo-600 text-3xl">mail</span>
<div>
<h3 className="font-heading-sm text-heading-sm text-brand-indigo-900 mb-1">Email us</h3>
<a className="font-body-sm text-body-sm text-indigo-600 hover:underline" href="mailto:support@removepdfpages.com">support@removepdfpages.com</a>
</div>
</div>
</div>
</div>

<div className="mt-space-10 pt-space-6 border-t border-ink-200 flex flex-wrap justify-center gap-space-6 md:gap-space-10">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-olive-600 text-sm font-bold">check</span>
<span className="font-body-sm text-body-sm text-ink-600">Encrypted by TLS</span>
</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-olive-600 text-sm font-bold">check</span>
<span className="font-body-sm text-body-sm text-ink-600">Stripe payments</span>
</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-olive-600 text-sm font-bold">check</span>
<span className="font-body-sm text-body-sm text-ink-600">No subscription required</span>
</div>
</div>
</main>


<Footer />
</div>
  );
}
