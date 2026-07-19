import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - Remove PDF Pages',
  description: 'Contact Remove PDF Pages for support, billing, privacy requests, and partnership inquiries.',
};

const supportEmail = 'support@removepdfpages.net';
const billingEmail = 'billing@removepdfpages.net';

export default function ContactPage() {
  return (
    <div className="flex min-h-full flex-col bg-slate-50 text-slate-900">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-10">
            <div className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
              Contact
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Contact Remove PDF Pages
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Use this page for product support, billing questions, privacy requests, and partnership inquiries.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="text-sm font-semibold text-slate-950">Support</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Product help, general questions, and account issues.
                </p>
                <a href={`mailto:${supportEmail}`} className="mt-4 inline-block text-sm font-semibold text-blue-700 hover:underline">
                  {supportEmail}
                </a>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="text-sm font-semibold text-slate-950">Billing</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Receipts, refunds, and payment-related questions.
                </p>
                <a href={`mailto:${billingEmail}`} className="mt-4 inline-block text-sm font-semibold text-blue-700 hover:underline">
                  {billingEmail}
                </a>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm leading-6 text-slate-600">
              We keep replies short and practical. For the fastest response, include your PDF file size, browser, and what you were trying to do.
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
