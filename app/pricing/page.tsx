import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Pricing - Remove PDF Pages',
  description: 'Simple, one-time pricing for Remove PDF Pages. Remove pages for free within generous limits, or unlock larger files and batches with a single payment.',
};

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'For occasional PDF page cleanup.',
    features: ['Remove pages', 'Up to 20 MB / 200 pages', 'Standard processing'],
    cta: 'Start free',
    highlighted: false,
  },
  {
    name: 'Plus',
    price: '$9',
    period: 'one-time',
    description: 'For larger documents and faster turnaround.',
    features: ['Everything in Free', 'Up to 100 MB / 500 pages', 'Priority processing', 'No recurring fees'],
    cta: 'Get Plus',
    highlighted: true,
  },
  {
    name: 'Pro',
    price: '$19',
    period: 'one-time',
    description: 'Best for frequent or heavy PDF cleanup.',
    features: ['Everything in Plus', 'Up to 500 MB / 2,000 pages', 'Batch-friendly limits', 'All future page-removal updates'],
    cta: 'Get Pro',
    highlighted: false,
  },
];

const comparison = [
  { feature: 'Remove pages', free: true, full: true },
  { feature: 'Max file size', free: '20 MB', full: '500 MB' },
  { feature: 'Max page count', free: '200', full: '2,000' },
  { feature: 'Priority processing', free: false, full: true },
  { feature: 'Batch-friendly limits', free: false, full: true },
  { feature: 'One-time payment', free: '—', full: '✓' },
];

const faq = [
  {
    q: 'Is it really a one-time payment?',
    a: 'Yes. Pay once and keep access to the current tier forever. No subscriptions, no surprise charges.',
  },
  {
    q: 'What happens if my file is over the limit?',
    a: 'Free users see a clear upgrade prompt. Plus or Pro users can process files up to their tier limit.',
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
              Remove PDF pages for free within generous limits. Unlock larger files and batches with a single payment.
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
          <h2 className="text-center text-2xl font-semibold tracking-tight text-slate-950">Compare plans</h2>
          <div className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="p-4 font-semibold text-slate-950 sm:p-6">Feature</th>
                  <th className="p-4 text-center font-semibold text-slate-950 sm:p-6">Free</th>
                  <th className="p-4 text-center font-semibold text-blue-700 sm:p-6">Plus / Pro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparison.map((row) => (
                  <tr key={row.feature}>
                    <td className="p-4 font-medium text-slate-700 sm:p-6">{row.feature}</td>
                    <td className="p-4 text-center sm:p-6">
                      {row.free === true ? <span className="text-emerald-600">&#10003;</span> : <span className="text-slate-600">{row.free}</span>}
                    </td>
                    <td className="p-4 text-center sm:p-6">
                      {row.full === true ? <span className="text-blue-600">&#10003;</span> : <span className="text-slate-600">{row.full}</span>}
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
