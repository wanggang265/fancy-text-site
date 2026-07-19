import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const supportEmail = 'support@removepdfpages.net';

export const metadata: Metadata = {
  title: 'Refund Policy - Remove PDF Pages',
  description: 'Refund policy for Remove PDF Pages. We offer a 14-day no-questions-asked refund guarantee.',
};

export default function RefundPage() {
  return (
    <div className="flex min-h-full flex-col bg-slate-50 text-slate-900">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-10">
            <div className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
              Support
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Refund Policy
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              We want you to be happy with Remove PDF Pages. If the tool does not meet your needs, you can request a refund within 14 days of purchase.
            </p>

            <div className="mt-8 space-y-6 text-slate-700">
              <section>
                <h2 className="text-lg font-semibold text-slate-950">14-day guarantee</h2>
                <p className="mt-2">
                  We offer a 14-day no-questions-asked refund policy for all paid purchases. Contact us within 14 days of your purchase and we will process your refund.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-slate-950">How to request a refund</h2>
                <p className="mt-2">
                  Email us at{' '}
                  <a href={`mailto:${supportEmail}`} className="font-semibold text-blue-700 hover:underline">
                    {supportEmail}
                  </a>{' '}
                  with your purchase details. We typically respond within one business day.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-slate-950">Exceptions</h2>
                <p className="mt-2">
                  Refunds apply to tool purchases and license upgrades. They do not apply to completed document processing services where the output has already been delivered and accepted.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-slate-950">Processing time</h2>
                <p className="mt-2">
                  Approved refunds are processed back to the original payment method within 5-10 business days, depending on your payment provider.
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
