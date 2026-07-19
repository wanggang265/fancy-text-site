import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Pricing - Remove PDF Pages',
  description: 'Simple, one-time pricing for Remove PDF Pages. Free tools stay free. Unlock advanced PDF tools with a single payment.',
};

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'For quick, one-off PDF tasks.',
    features: ['Remove pages', 'Basic merge', 'Basic compress'],
    cta: 'Start free',
    highlighted: false,
  },
  {
    name: 'Full Editor',
    price: '$29',
    period: 'one-time',
    description: 'Unlock every tool. No subscription.',
    features: ['Full text editing', 'Image replacement', 'Word/Excel conversion', 'All future PDF tools'],
    cta: 'Get full editor',
    highlighted: true,
  },
  {
    name: 'Launch Special',
    price: '$19',
    period: 'one-time',
    description: 'Full editor at launch-week pricing.',
    features: ['All Full Editor features', 'Limited time offer'],
    cta: 'Claim launch price',
    highlighted: false,
  },
];

const comparison = [
  { feature: 'Delete pages', free: true, full: true },
  { feature: 'Merge & compress', free: true, full: true },
  { feature: 'Basic signatures', free: true, full: true },
  { feature: 'Full text editing', free: false, full: true },
  { feature: 'Image replacement', free: false, full: true },
  { feature: 'Word/Excel conversion', free: false, full: true },
];

const faq = [
  {
    q: 'Is it really a one-time payment?',
    a: 'Yes. You pay once and keep access to the current major version forever, with no recurring subscription fees.',
  },
  {
    q: 'Can I use it on multiple devices?',
    a: 'Your license covers up to 5 personal devices (Mac, Windows, or Linux) used by you.',
  },
  {
    q: 'How do refunds work?',
    a: 'We offer a 14-day no-questions-asked refund policy. If the tool does not meet your needs, just email us.',
  },
];

export default function PricingPage() {
  return (
    <div className="flex min-h-full flex-col bg-slate-50 text-slate-900">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Simple, one-time pricing
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-7 text-slate-600">
              Free tools stay free. Unlock advanced tools with a single payment.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-end">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-[2rem] border bg-white p-6 shadow-sm ${plan.highlighted ? 'border-blue-600 ring-1 ring-blue-600' : 'border-slate-200'}`}
              >
                {plan.highlighted && (
                  <div className="-mt-9 mb-4 text-center">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-200">
                      Recommended
                    </span>
                  </div>
                )}
                <h2 className="text-xl font-semibold text-slate-950">{plan.name}</h2>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-slate-950">{plan.price}</span>
                  <span className="text-sm text-slate-500">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{plan.description}</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={`mt-6 w-full rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${plan.highlighted ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:text-blue-700'}`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 sm:pb-16">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-slate-950">Compare features</h2>
          <div className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="p-4 font-semibold text-slate-950 sm:p-6">Feature</th>
                  <th className="p-4 text-center font-semibold text-slate-950 sm:p-6">Free</th>
                  <th className="p-4 text-center font-semibold text-blue-700 sm:p-6">Full Editor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparison.map((row) => (
                  <tr key={row.feature}>
                    <td className="p-4 font-medium text-slate-700 sm:p-6">{row.feature}</td>
                    <td className="p-4 text-center sm:p-6">
                      {row.free ? <span className="text-emerald-600">&#10003;</span> : <span className="text-slate-300">-</span>}
                    </td>
                    <td className="p-4 text-center sm:p-6">
                      {row.full ? <span className="text-blue-600">&#10003;</span> : <span className="text-slate-300">-</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-slate-950">Frequently asked questions</h2>
          <div className="mt-8 space-y-3">
            {faq.map((item) => (
              <div key={item.q} className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-semibold text-slate-950">{item.q}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
