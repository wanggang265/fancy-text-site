import Header from '@/components/Header';
import Footer from '@/components/Footer';

const docs = [
  {
    file: 'README.md',
    desc: 'Overview of the design pack and recommended usage order.',
  },
  {
    file: '01_stitch_prompt.md',
    desc: 'The final Stitch optimization prompt for the Precision PDF homepage.',
  },
  {
    file: '02_design_handoff.md',
    desc: 'Component-level handoff for design and front-end.',
  },
  {
    file: '03_frontend_spec.md',
    desc: 'Page structure, copy, states, and implementation guidance.',
  },
  {
    file: '05_frontend_handoff.md',
    desc: 'Final homepage and workspace handoff for implementation.',
  },
  {
    file: '06_frontend_handoff_short.md',
    desc: 'Short version for direct front-end use.',
  },
];

export default function DeliveryPackPage() {
  return (
    <div className="flex min-h-full flex-col bg-slate-50 text-slate-900">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
              Project index
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Precision PDF delivery pack
            </h1>
            <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
              A quick index for the design prompt, handoff notes, front-end spec, and development task list.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {docs.map((doc) => (
              <article key={doc.file} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="text-sm font-semibold text-slate-950">{doc.file}</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{doc.desc}</p>
                <p className="mt-4 text-xs font-medium uppercase tracking-wider text-slate-400">
                  Stored in /docs/precision-pdf-delivery-pack/
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white">
            <h2 className="text-xl font-semibold">Recommended reading order</h2>
            <ol className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
              <li>1. README.md for the overall map.</li>
              <li>2. 01_stitch_prompt.md before running Stitch.</li>
              <li>3. 06_frontend_handoff_short.md for the fastest implementation brief.</li>
              <li>4. 05_frontend_handoff.md for the fuller homepage + workspace handoff.</li>
              <li>5. 02_design_handoff.md for structure and states.</li>
              <li>6. 03_frontend_spec.md for implementation details.</li>
              <li>7. 04_dev_task_list.md for build priority.</li>
            </ol>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
