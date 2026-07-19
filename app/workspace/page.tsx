'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

type WorkflowStatus = 'idle' | 'ready' | 'processing' | 'done';

const demoPages = 12;
const initialSelection = [2, 4];

function formatBytes(bytes: number) {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  let value = bytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  const digits = unitIndex === 0 ? 0 : value >= 10 ? 1 : 2;
  return `${value.toFixed(digits)} ${units[unitIndex]}`;
}

function buildResultName(name: string) {
  const stem = name.replace(/\.[^.]+$/, '');
  return `${stem}_cleaned.pdf`;
}

export default function WorkspacePage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const timerRef = useRef<number | null>(null);

  const [fileName, setFileName] = useState('annual_report_2024.pdf');
  const [fileSizeLabel, setFileSizeLabel] = useState('12.4 MB');
  const [pageCount, setPageCount] = useState(demoPages);
  const [selectedPages, setSelectedPages] = useState<number[]>(initialSelection);
  const [status, setStatus] = useState<WorkflowStatus>('ready');
  const [message, setMessage] = useState('Page map loaded. Select pages to remove.');
  const [lastAction, setLastAction] = useState('Demo document ready');
  const [resultName, setResultName] = useState(buildResultName('annual_report_2024.pdf'));

  const pages = useMemo(() => Array.from({ length: pageCount }, (_, index) => index + 1), [pageCount]);
  const selectedCount = selectedPages.length;
  const keepCount = pageCount - selectedCount;
  const progress = status === 'idle' ? 16 : status === 'ready' ? 44 : status === 'processing' ? 72 : 100;

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearTimer();
  }, []);

  const loadDemo = () => {
    clearTimer();
    setFileName('annual_report_2024.pdf');
    setFileSizeLabel('12.4 MB');
    setPageCount(demoPages);
    setSelectedPages(initialSelection);
    setStatus('ready');
    setMessage('Demo document ready. Fine-tune the page selection below.');
    setLastAction('Loaded demo document');
    setResultName(buildResultName('annual_report_2024.pdf'));
  };

  const handlePickFile = (file?: File) => {
    if (!file) return;

    clearTimer();
    const derivedPages = Math.max(8, Math.min(24, Math.round(file.size / (1024 * 1024)) * 2 + 8));
    const suggestedSelection = [2, 4, 6].filter((page) => page <= derivedPages).slice(0, 2);

    setFileName(file.name);
    setFileSizeLabel(formatBytes(file.size));
    setPageCount(derivedPages);
    setSelectedPages(suggestedSelection.length > 0 ? suggestedSelection : [1]);
    setStatus('ready');
    setMessage(`Loaded ${file.name}. The page map is ready.`);
    setLastAction(`Imported ${file.name}`);
    setResultName(buildResultName(file.name));
  };

  const togglePage = (page: number) => {
    if (status === 'processing') return;

    setSelectedPages((current) =>
      current.includes(page) ? current.filter((item) => item !== page) : [...current, page].sort((a, b) => a - b),
    );
    setMessage(`Page ${page} updated in the removal list.`);
    setLastAction(`Toggled page ${page}`);
    setStatus('ready');
  };

  const selectAll = () => {
    if (status === 'processing') return;
    setSelectedPages(pages);
    setStatus('ready');
    setMessage(`All ${pageCount} pages are now selected for deletion.`);
    setLastAction('Selected all pages');
  };

  const clearSelection = () => {
    if (status === 'processing') return;
    setSelectedPages([]);
    setStatus('ready');
    setMessage('Selection cleared. Choose the pages you want to delete.');
    setLastAction('Cleared selection');
  };

  const invertSelection = () => {
    if (status === 'processing') return;
    setSelectedPages((current) => pages.filter((page) => !current.includes(page)));
    setStatus('ready');
    setMessage('Selection inverted. Removed pages are now the keep pages, and vice versa.');
    setLastAction('Inverted selection');
  };

  const startDelete = () => {
    if (status === 'processing') return;
    if (selectedCount === 0) {
      setMessage('Pick at least one page first.');
      setLastAction('Blocked delete because no pages were selected');
      return;
    }

    clearTimer();
    setStatus('processing');
    setMessage(`Deleting ${selectedCount} page${selectedCount === 1 ? '' : 's'} from ${fileName}...`);
    setLastAction(`Queued ${selectedCount} page${selectedCount === 1 ? '' : 's'} for deletion`);

    timerRef.current = window.setTimeout(() => {
      setSelectedPages([]);
      setStatus('done');
      setMessage(`Done. ${buildResultName(fileName)} is ready to download.`);
      setLastAction('Completed page deletion');
      setResultName(buildResultName(fileName));
      timerRef.current = null;
    }, 1100);
  };

  const startOver = () => {
    clearTimer();
    loadDemo();
  };

  return (
    <div className="flex min-h-full flex-col bg-slate-50 text-slate-900">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr]">
            <div>
              <div className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
                Single-purpose PDF tool
              </div>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Remove PDF pages without friction
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Upload a PDF, inspect the page map, choose the pages you want removed, and export the cleaned file. The workspace mirrors the homepage flow, so it feels like one system.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
                >
                  Upload PDF
                </button>
                <button
                  type="button"
                  onClick={loadDemo}
                  className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-200 hover:text-blue-700"
                >
                  Load demo
                </button>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  ['Clear state', 'Selection and export stay readable'],
                  ['Fast edits', 'Click pages to update the list'],
                  ['Same system', 'Matches the homepage style'],
                ].map(([title, body]) => (
                  <div key={title} className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 backdrop-blur">
                    <div className="text-sm font-semibold text-slate-950">{title}</div>
                    <div className="mt-1 text-xs leading-5 text-slate-500">{body}</div>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.06)] sm:p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-slate-500">Current file</div>
                    <div className="text-xl font-semibold text-slate-950">{fileName}</div>
                    <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1">{fileSizeLabel}</span>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1">{pageCount} pages</span>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1">{status === 'done' ? 'Ready to download' : status === 'processing' ? 'Processing' : 'Ready to edit'}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:min-w-[240px]">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
                    >
                      Upload PDF
                    </button>
                    <button
                      type="button"
                      onClick={loadDemo}
                      className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-200 hover:text-blue-700"
                    >
                      Load demo
                    </button>
                  </div>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(event) => handlePickFile(event.target.files?.[0])}
                />

                <div className="mt-6 grid gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={selectAll}
                    className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left font-medium text-slate-700 transition-colors hover:border-blue-200 hover:text-blue-700"
                  >
                    Select all
                    <span className="mt-1 block text-xs text-slate-500">Mark every page for removal</span>
                  </button>
                  <button
                    type="button"
                    onClick={clearSelection}
                    className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left font-medium text-slate-700 transition-colors hover:border-blue-200 hover:text-blue-700"
                  >
                    Clear selection
                    <span className="mt-1 block text-xs text-slate-500">Keep every page</span>
                  </button>
                  <button
                    type="button"
                    onClick={invertSelection}
                    className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left font-medium text-slate-700 transition-colors hover:border-blue-200 hover:text-blue-700"
                  >
                    Invert selection
                    <span className="mt-1 block text-xs text-slate-500">Swap keep and delete pages</span>
                  </button>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between gap-3 text-sm text-slate-600">
                    <span>Page map</span>
                    <span className="font-medium text-slate-900">{selectedCount} selected · {keepCount} kept</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 xl:grid-cols-6">
                    {pages.map((page) => {
                      const selected = selectedPages.includes(page);
                      return (
                        <button
                          key={page}
                          type="button"
                          onClick={() => togglePage(page)}
                          disabled={status === 'processing'}
                          className={`group flex aspect-[3/4] flex-col justify-between rounded-xl border p-3 text-left transition-all ${selected ? 'border-blue-300 bg-blue-50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'} ${status === 'processing' ? 'cursor-not-allowed opacity-70' : ''}`}
                        >
                          <div>
                            <div className="text-xs font-medium text-slate-500">Page {page}</div>
                            <div className={`mt-2 h-16 rounded-lg ${selected ? 'bg-gradient-to-br from-blue-100 to-white' : 'bg-slate-100'} flex items-end justify-center pb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500`}>
                              {selected ? 'Remove' : 'Keep'}
                            </div>
                          </div>
                          <div className={`text-[11px] font-semibold tracking-wide ${selected ? 'text-blue-700' : 'text-slate-900'}`}>
                            {selected ? 'Selected' : 'Available'}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.05)]">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-base font-semibold text-slate-950">Workflow state</h2>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status === 'processing' ? 'bg-amber-100 text-amber-800' : status === 'done' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'}`}>
                    {status === 'processing' ? 'Working' : status === 'done' ? 'Complete' : 'Ready'}
                  </span>
                </div>

                <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>{status === 'processing' ? 'Deleting pages' : 'Workflow progress'}</span>
                    <span className="font-medium text-slate-900">{progress}%</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                    <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{message}</p>
                </div>

                <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-xs font-medium text-slate-500">Pages selected</div>
                    <div className="mt-1 text-2xl font-semibold text-slate-950">{selectedCount}</div>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-xs font-medium text-slate-500">Pages kept</div>
                    <div className="mt-1 text-2xl font-semibold text-slate-950">{keepCount}</div>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
                  <div className="flex items-center justify-between gap-3">
                    <span>Last action</span>
                    <span className="font-medium text-slate-900">{lastAction}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={startDelete}
                  disabled={status === 'processing'}
                  className="mt-5 w-full rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                >
                  {status === 'processing' ? 'Deleting pages…' : 'Delete selected pages'}
                </button>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.05)]">
                <h2 className="text-base font-semibold text-slate-950">Selection summary</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedCount > 0 ? (
                    selectedPages.map((page) => (
                      <span key={page} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        Page {page}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-500">No pages selected.</span>
                  )}
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Keep the summary tight and make the next action obvious. This panel mirrors the state the frontend will wire up for real.
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white shadow-[0_24px_80px_rgba(15,23,42,0.15)]">
                <h2 className="text-base font-semibold">Export result</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  When export finishes, this panel becomes the download button, file name, and start-over action.
                </p>
                <div className="mt-4 rounded-xl bg-white/10 p-4 text-sm text-slate-200">
                  <div className="flex items-center justify-between gap-3">
                    <span>Output file</span>
                    <span className="font-medium text-white">{resultName}</span>
                  </div>
                </div>
                <div className="mt-4 flex gap-3">
                  <button type="button" className="flex-1 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 disabled:opacity-40" disabled={status !== 'done'}>
                    Download cleaned PDF
                  </button>
                  <button type="button" onClick={startOver} className="rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                    Start over
                  </button>
                </div>
              </article>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-[0_24px_80px_rgba(15,23,42,0.05)]">
                <div className="font-semibold text-slate-950">Design pack</div>
                <p className="mt-2 leading-6">
                  The handoff package, front-end notes, and page guidance are still available if you need to align implementation details.
                </p>
                <Link href="/docs/precision-pdf-delivery-pack" className="mt-3 inline-block font-semibold text-blue-700 hover:text-blue-800">
                  Open delivery pack
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
