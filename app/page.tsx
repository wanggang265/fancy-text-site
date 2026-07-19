import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const trustPoints = [
  'Fast and simple',
  'Secure file handling',
  'No unnecessary steps',
  'Works in your browser',
];

const steps = [
  {
    step: '1',
    title: 'Upload your PDF',
    body: 'Drop in a file or pick one from your device.',
  },
  {
    step: '2',
    title: 'Select the pages to remove',
    body: 'Click thumbnails to switch pages between keep and delete.',
  },
  {
    step: '3',
    title: 'Download the cleaned PDF',
    body: 'Export the PDF with the selected pages removed.',
  },
];

const faqItems = [
  {
    q: 'Is my file secure?',
    a: 'Yes. Your file is processed securely and deleted from our servers after processing. We do not share files with third parties.',
  },
  {
    q: 'Can I remove multiple pages at once?',
    a: 'Yes. Select any number of pages from the thumbnail grid and remove them all in a single export.',
  },
  {
    q: 'Do I need to install anything?',
    a: 'No. Remove PDF Pages runs entirely in your browser, so no installation or account is required.',
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-col bg-slate-50 text-slate-900">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pb-8 pt-10 sm:px-6 sm:pt-14">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Remove PDF pages in seconds
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Fast, secure, and simple page removal for PDFs.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="#how-it-works" className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700">
                  Remove pages
                </Link>
                <Link href="/pricing" className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-200 hover:text-blue-700">
                  Learn more
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-500">Preview</div>
                  <div className="mt-1 text-lg font-semibold text-slate-950">report_2024.pdf</div>
                </div>
                <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Ready
                </div>
              </div>
              <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>2.4 MB</span>
                  <span>4 pages</span>
                </div>
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {[1, 2, 3, 4].map((page) => (
                    <div
                      key={page}
                      className={`rounded-xl border p-3 text-left ${page === 2 || page === 4 ? 'border-blue-300 bg-blue-50' : 'border-slate-200 bg-white'}`}
                    >
                      <div className="text-xs font-medium text-slate-500">Page {page}</div>
                      <div className="mt-8 text-[11px] font-semibold tracking-wide text-slate-900">
                        {page === 2 || page === 4 ? 'REMOVE' : 'KEEP'}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700">
                  2 pages selected for removal
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust */}
        <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white px-6 py-8 shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {trustPoints.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                  <span className="text-sm font-medium text-slate-800">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            How it works
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700">
                  {item.step}
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
              FAQ
            </h2>
            <div className="mt-8 space-y-3">
              {faqItems.map((faq, index) => (
                <details key={faq.q} className="rounded-xl border border-slate-200 bg-white px-4 py-3" open={index === 0}>
                  <summary className="cursor-pointer list-none font-medium text-slate-950">{faq.q}</summary>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
