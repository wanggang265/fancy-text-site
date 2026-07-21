import Header from '@/components/Header';
import type { Metadata } from 'next';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Pricing - RemovePDFPages',
  description: 'RemovePDFPages pricing: free PDF tools and a one-time $29 full editor license.',
};

export default function Page() {
  return (
    <div className="bg-surface dot-grid text-on-surface antialiased min-h-screen flex flex-col relative font-body-md">
<Header />
      

<main className="flex-grow pt-32 pb-space-20">

<section className="max-w-container-max mx-auto px-margin-desktop mb-16 text-center">
<h1 className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-primary font-bold mb-4 tracking-tight">Simple, one-time pricing</h1>
<p className="font-body-lead text-body-lead text-on-surface-variant max-w-2xl mx-auto">Free tools stay free. Unlock advanced tools with a single payment.</p>
</section>

<section className="max-w-[1280px] mx-auto px-margin-desktop mb-24">
<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop items-end">

<div className="bg-paper border border-ink-200 rounded-[24px] p-8 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
<div className="mb-8 flex-grow">
<h3 className="font-heading-sm text-heading-sm text-on-surface mb-2 font-semibold">Free</h3>
<div className="text-3xl font-heading-md font-bold text-primary mb-4">$0 <span className="text-body-sm font-body-sm text-ink-600 font-normal">forever</span></div>
<p className="text-body-sm font-body-sm text-on-surface-variant">For quick, one-off PDF tasks.</p>
<ul className="mt-6 space-y-3">
<li className="flex items-center text-body-sm font-body-sm">
<span className="material-symbols-outlined text-accent-olive-700 mr-2 text-[20px]">check</span>
                                Remove pages
                            </li>
<li className="flex items-center text-body-sm font-body-sm">
<span className="material-symbols-outlined text-accent-olive-700 mr-2 text-[20px]">check</span>
                                Basic merge
                            </li>
</ul>
</div>
<button className="w-full bg-brand-indigo-50 text-brand-indigo-900 border border-brand-indigo-100 py-3 rounded font-body-md text-body-md font-medium hover:bg-brand-indigo-100 transition-colors">
                        Start free
                    </button>
</div>

<div className="bg-paper border-2 border-primary rounded-[28px] p-8 shadow-md relative flex flex-col h-[105%] z-10 transform md:-translate-y-4">
<div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-accent-olive-100 text-accent-olive-700 px-4 py-1 rounded-none text-label-caps font-label-caps uppercase tracking-wider font-bold border border-accent-olive-700">
                        Recommended
                    </div>
<div className="mb-8 flex-grow">
<h3 className="font-heading-sm text-heading-sm text-on-surface mb-2 font-semibold">Full Editor</h3>
<div className="text-4xl font-heading-lg font-bold text-primary mb-4">$29 <span className="text-body-sm font-body-sm text-ink-600 font-normal">one-time</span></div>
<p className="text-body-sm font-body-sm text-on-surface-variant">Unlock every tool. No subscription.</p>
<ul className="mt-6 space-y-3">
<li className="flex items-center text-body-sm font-body-sm">
<span className="material-symbols-outlined text-primary mr-2 text-[20px]">check</span>
                                Full text editing
                            </li>
<li className="flex items-center text-body-sm font-body-sm">
<span className="material-symbols-outlined text-primary mr-2 text-[20px]">check</span>
                                Image replacement
                            </li>
<li className="flex items-center text-body-sm font-body-sm">
<span className="material-symbols-outlined text-primary mr-2 text-[20px]">check</span>
                                Word/Excel conversion
                            </li>
</ul>
</div>
<button className="w-full bg-primary text-on-primary py-3 rounded font-body-md text-body-md font-medium hover:bg-primary-container transition-colors">
                        Get full editor
                    </button>
</div>

<div className="bg-paper border border-ink-200 rounded-[24px] p-8 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
<div className="mb-8 flex-grow">
<h3 className="font-heading-sm text-heading-sm text-on-surface mb-2 font-semibold">Launch Special</h3>
<div className="text-3xl font-heading-md font-bold text-primary mb-4">$19 <span className="text-body-sm font-body-sm text-ink-600 font-normal">one-time</span></div>
<p className="text-body-sm font-body-sm text-on-surface-variant">Full editor at launch-week pricing.</p>
<ul className="mt-6 space-y-3">
<li className="flex items-center text-body-sm font-body-sm">
<span className="material-symbols-outlined text-accent-olive-700 mr-2 text-[20px]">check</span>
                                All Full Editor features
                            </li>
<li className="flex items-center text-body-sm font-body-sm">
<span className="material-symbols-outlined text-accent-olive-700 mr-2 text-[20px]">check</span>
                                Limited time offer
                            </li>
</ul>
</div>
<button className="w-full bg-white text-primary border border-primary py-3 rounded font-body-md text-body-md font-medium hover:bg-brand-indigo-50 transition-colors">
                        Claim launch price
                    </button>
</div>
</div>
</section>

<section className="max-w-container-max mx-auto px-margin-desktop mb-24">
<h2 className="font-heading-md text-heading-md text-on-surface mb-8 text-center">Compare Features</h2>
<div className="bg-paper border border-ink-200 rounded-[20px] overflow-hidden shadow-sm">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low border-b border-ink-200">
<th className="p-6 font-heading-sm text-heading-sm text-on-surface w-1/3">Feature</th>
<th className="p-6 font-heading-sm text-heading-sm text-on-surface text-center w-1/3">Free</th>
<th className="p-6 font-heading-sm text-heading-sm text-primary text-center w-1/3 bg-brand-indigo-50/50">Full Editor</th>
</tr>
</thead>
<tbody className="font-body-sm text-body-sm text-on-surface-variant">
<tr className="border-b border-ink-200 hover:bg-surface/50">
<td className="p-6 font-medium">Delete Pages</td>
<td className="p-6 text-center"><span className="material-symbols-outlined text-accent-olive-700">check</span></td>
<td className="p-6 text-center bg-brand-indigo-50/20"><span className="material-symbols-outlined text-primary">check</span></td>
</tr>
<tr className="border-b border-ink-200 hover:bg-surface/50">
<td className="p-6 font-medium">Merge & Compress</td>
<td className="p-6 text-center"><span className="material-symbols-outlined text-accent-olive-700">check</span></td>
<td className="p-6 text-center bg-brand-indigo-50/20"><span className="material-symbols-outlined text-primary">check</span></td>
</tr>
<tr className="border-b border-ink-200 hover:bg-surface/50">
<td className="p-6 font-medium">Basic Signatures</td>
<td className="p-6 text-center"><span className="material-symbols-outlined text-accent-olive-700">check</span></td>
<td className="p-6 text-center bg-brand-indigo-50/20"><span className="material-symbols-outlined text-primary">check</span></td>
</tr>
<tr className="border-b border-ink-200 hover:bg-surface/50">
<td className="p-6 font-medium">Full Text Editing</td>
<td className="p-6 text-center text-ink-300"><span className="material-symbols-outlined">remove</span></td>
<td className="p-6 text-center bg-brand-indigo-50/20"><span className="material-symbols-outlined text-primary">check</span></td>
</tr>
<tr className="border-b border-ink-200 hover:bg-surface/50">
<td className="p-6 font-medium">Image Replacement</td>
<td className="p-6 text-center text-ink-300"><span className="material-symbols-outlined">remove</span></td>
<td className="p-6 text-center bg-brand-indigo-50/20"><span className="material-symbols-outlined text-primary">check</span></td>
</tr>
<tr className="hover:bg-surface/50">
<td className="p-6 font-medium">Word/Excel Conversion</td>
<td className="p-6 text-center text-ink-300"><span className="material-symbols-outlined">remove</span></td>
<td className="p-6 text-center bg-brand-indigo-50/20"><span className="material-symbols-outlined text-primary">check</span></td>
</tr>
</tbody>
</table>
</div>
</section>

<section className="max-w-3xl mx-auto px-margin-desktop mb-24">
<h2 className="font-heading-md text-heading-md text-on-surface mb-8 text-center">Frequently Asked Questions</h2>
<div className="space-y-4">
<div className="bg-paper border border-ink-200 rounded-lg p-6 shadow-sm">
<h4 className="font-heading-sm text-heading-sm text-on-surface mb-2">Is it really a one-time payment?</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Yes. You pay once and keep access to the current major version forever, with no recurring subscription fees.</p>
</div>
<div className="bg-paper border border-ink-200 rounded-lg p-6 shadow-sm">
<h4 className="font-heading-sm text-heading-sm text-on-surface mb-2">Can I use it on multiple devices?</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Your license covers up to 5 personal devices (Mac, Windows, or Linux) used by you.</p>
</div>
<div className="bg-paper border border-ink-200 rounded-lg p-6 shadow-sm">
<h4 className="font-heading-sm text-heading-sm text-on-surface mb-2">How do refunds work?</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">We offer a 14-day no-questions-asked refund policy. If the tool doesn't meet your needs, just email us.</p>
</div>
</div>
</section>

<section className="max-w-container-max mx-auto px-margin-desktop text-center border-t border-ink-200 pt-8">
<div className="flex flex-wrap justify-center gap-8 items-center text-on-surface-variant font-mono-data text-mono-data">
<div className="flex items-center">
<span className="material-symbols-outlined mr-2 text-primary text-[20px]">verified_user</span>
                    14-day refund guarantee
                </div>
<div className="flex items-center">
<span className="material-symbols-outlined mr-2 text-primary text-[20px]">lock</span>
                    Secure Stripe checkout
                </div>
<div className="flex items-center">
<span className="material-symbols-outlined mr-2 text-primary text-[20px]">devices</span>
                    5 device limit
                </div>
</div>
</section>
</main>


<Footer />
</div>
  );
}
