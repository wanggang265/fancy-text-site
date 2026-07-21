import Header from '@/components/Header';
import type { Metadata } from 'next';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'RemovePDFPages - Success',
  description: 'Thank you for purchasing the RemovePDFPages full editor license.',
};

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
<Header />
      

<main className="flex-grow flex flex-col items-center justify-center py-space-20 px-margin-desktop relative overflow-hidden">

<div className="absolute inset-0 dot-grid -z-10 opacity-50"></div>
<div className="max-w-container-max w-full">

<div className="text-center mb-space-10">
<div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-accent-olive-100 text-accent-olive-700 mb-6 shadow-sm border border-accent-olive-700/20">
<span className="material-symbols-outlined !text-[48px]" data-icon="check_circle" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
</div>
<h1 className="font-heading-lg text-heading-lg text-primary mb-4">Welcome to the Full Editor</h1>
<p className="font-body-lead text-body-lead text-on-surface-variant max-w-2xl mx-auto">Your license key has been sent to alex@example.com.</p>
</div>

<div className="space-y-space-6 max-w-3xl mx-auto">

<div className="bg-paper rounded-[28px] border border-ink-200 shadow-sm p-8 relative overflow-hidden">
<div className="absolute inset-0 dot-grid opacity-30 pointer-events-none"></div>
<div className="relative z-10 text-center flex flex-col items-center">
<h2 className="font-label-caps text-label-caps uppercase text-ink-600 mb-4 tracking-wider">Your license key</h2>
<div className="bg-surface-container-low border border-outline-variant rounded p-4 mb-6 w-full max-w-md">
<code className="font-mono-data text-mono-data text-primary text-xl tracking-wider" id="license-key">REMPDF-XXXX-XXXX-XXXX</code>
</div>
<button className="bg-primary hover:bg-primary-container text-on-primary font-body-md py-3 px-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 inline-flex items-center gap-2" style={{borderRadius: 4}}>
<span className="material-symbols-outlined" data-icon="content_copy">content_copy</span>
                            Copy License Key
                        </button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-space-6">

<div className="bg-surface border border-ink-200 rounded-[20px] p-6 shadow-sm hover:shadow-md transition-shadow">
<div className="text-primary mb-4">
<span className="material-symbols-outlined" data-icon="download" style={{fontVariationSettings: "'FILL' 1"}}>download</span>
</div>
<h3 className="font-heading-sm text-heading-sm mb-2 text-on-background">Download the app</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-4">Get the desktop or mobile version to start editing.</p>
<div className="flex gap-2">
<span className="material-symbols-outlined text-ink-600 text-sm" data-icon="desktop_windows">desktop_windows</span>
<span className="material-symbols-outlined text-ink-600 text-sm" data-icon="smartphone">smartphone</span>
</div>
</div>

<div className="bg-surface border border-ink-200 rounded-[20px] p-6 shadow-sm hover:shadow-md transition-shadow">
<div className="text-secondary mb-4">
<span className="material-symbols-outlined" data-icon="key" style={{fontVariationSettings: "'FILL' 1"}}>key</span>
</div>
<h3 className="font-heading-sm text-heading-sm mb-2 text-on-background">Activate your license</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Open settings in the app and paste your license key.</p>
</div>

<div className="bg-surface border border-ink-200 rounded-[20px] p-6 shadow-sm hover:shadow-md transition-shadow">
<div className="text-tertiary mb-4">
<span className="material-symbols-outlined" data-icon="explore" style={{fontVariationSettings: "'FILL' 1"}}>explore</span>
</div>
<h3 className="font-heading-sm text-heading-sm mb-2 text-on-background">Explore paid tools</h3>
<ul className="font-body-sm text-body-sm text-on-surface-variant space-y-1 list-disc list-inside">
<li><a className="text-primary hover:underline" href="/convert-to-word">Convert PDF to Word</a></li>
<li><a className="text-primary hover:underline" href="/">Edit text directly</a></li>
<li><a className="text-primary hover:underline" href="/">Replace images</a></li>
</ul>
</div>
</div>

<div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-space-6 border-t border-ink-200">
<a className="bg-primary hover:bg-primary-container text-on-primary font-body-md py-3 px-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-center w-full sm:w-auto" href="/remove-pages" style={{borderRadius: 4}}>
                        Go to Dashboard
                    </a>
<a className="bg-transparent border-2 border-primary text-primary hover:bg-brand-indigo-50 font-body-md py-3 px-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-center w-full sm:w-auto" href="/convert-to-word" style={{borderRadius: 4}}>Convert PDF to Word</a>
</div>

<div className="text-center pt-space-3">
<p className="font-body-sm text-body-sm text-ink-600">
                        Need help? <a className="text-primary hover:underline" href="/contact">Contact support</a>. Refund available within 14 days.
                    </p>
</div>
</div>
</div>
</main>


<Footer />
</div>
  );
}
