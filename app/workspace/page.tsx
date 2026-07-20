'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

type WorkflowStatus = 'idle' | 'ready' | 'processing' | 'done';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB
const MAX_PAGES = 500;

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

function isPdfFile(file: File) {
  return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
}

function parsePageRanges(input: string, maxPage: number): number[] {
  const pages = new Set<number>();
  const parts = input
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  for (const part of parts) {
    if (part.includes('-')) {
      const [start, end] = part.split('-').map((s) => parseInt(s.trim(), 10));
      if (!Number.isNaN(start) && !Number.isNaN(end)) {
        const from = Math.max(1, Math.min(start, end));
        const to = Math.min(maxPage, Math.max(start, end));
        for (let p = from; p <= to; p++) {
          pages.add(p);
        }
      }
    } else {
      const p = parseInt(part, 10);
      if (!Number.isNaN(p) && p >= 1 && p <= maxPage) {
        pages.add(p);
      }
    }
  }

  return Array.from(pages).sort((a, b) => a - b);
}

function formatPageRanges(pages: number[]): string {
  if (pages.length === 0) return '';
  const ranges: string[] = [];
  let start = pages[0];
  let end = pages[0];

  for (let i = 1; i <= pages.length; i++) {
    if (pages[i] === end + 1) {
      end = pages[i];
    } else {
      ranges.push(start === end ? String(start) : `${start}-${end}`);
      start = pages[i];
      end = pages[i];
    }
  }

  return ranges.join(',');
}

function getApiError(xhr: XMLHttpRequest, fallback: string): string {
  try {
    const data = JSON.parse(xhr.responseText);
    return data.error || data.message || fallback;
  } catch {
    return xhr.statusText || fallback;
  }
}

export default function WorkspacePage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [fileSizeLabel, setFileSizeLabel] = useState('');
  const [pageCount, setPageCount] = useState(0);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [status, setStatus] = useState<WorkflowStatus>('idle');
  const [message, setMessage] = useState('Upload a PDF to get started.');
  const [lastAction, setLastAction] = useState('Waiting for upload');
  const [resultName, setResultName] = useState('');
  const [fileId, setFileId] = useState<string | null>(null);
  const [downloadToken, setDownloadToken] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [quickInput, setQuickInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const pages = useMemo(() => Array.from({ length: pageCount }, (_, index) => index + 1), [pageCount]);
  const selectedCount = selectedPages.length;
  const keepCount = pageCount - selectedCount;

  const progress = useMemo(() => {
    if (status === 'idle') return uploadProgress;
    if (status === 'ready') return 100;
    if (status === 'processing') return 70;
    return 100;
  }, [status, uploadProgress]);

  const resetWorkspace = () => {
    setFileName('');
    setFileSize(0);
    setFileSizeLabel('');
    setPageCount(0);
    setSelectedPages([]);
    setStatus('idle');
    setMessage('Upload a PDF to get started.');
    setLastAction('Workspace reset');
    setResultName('');
    setFileId(null);
    setDownloadToken(null);
    setUploadProgress(0);
    setQuickInput('');
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUploadError = (msg: string) => {
    setError(msg);
    setMessage(msg);
    setStatus('idle');
    setLastAction('Upload failed');
    setUploadProgress(0);
  };

  const handlePickFile = (file?: File) => {
    if (!file) return;
    setError(null);

    if (!isPdfFile(file)) {
      handleUploadError('Please upload a PDF file.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      handleUploadError('File is too large. Maximum size is 50 MB.');
      return;
    }

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('file', file);

    setStatus('idle');
    setMessage('Uploading PDF...');
    setLastAction(`Uploading ${file.name}`);
    setUploadProgress(0);
    setFileName(file.name);
    setFileSize(file.size);
    setFileSizeLabel(formatBytes(file.size));
    setSelectedPages([]);
    setPageCount(0);
    setFileId(null);
    setDownloadToken(null);
    setResultName(buildResultName(file.name));

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percent);
        setMessage(`Uploading PDF... ${percent}%`);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          if (data.pageCount > MAX_PAGES) {
            handleUploadError(`PDF has too many pages. Maximum is ${MAX_PAGES} pages.`);
            return;
          }
          setPageCount(data.pageCount);
          setFileId(data.fileId);
          setStatus('ready');
          setMessage(`${file.name} uploaded. ${data.pageCount} pages loaded. Select pages to remove.`);
          setLastAction(`Uploaded ${file.name} (${data.pageCount} pages)`);
          setUploadProgress(100);
        } catch {
          handleUploadError('Failed to parse upload response. Please try again.');
        }
      } else if (xhr.status === 429) {
        handleUploadError('Too many requests. Please wait a minute and try again.');
      } else if (xhr.status === 413) {
        handleUploadError('File is too large for the server. Maximum size is 50 MB.');
      } else {
        handleUploadError(getApiError(xhr, 'Upload failed. Please try again.'));
      }
    });

    xhr.addEventListener('error', () => {
      handleUploadError('Network error during upload. Please check your connection and try again.');
    });

    xhr.addEventListener('abort', () => {
      handleUploadError('Upload was cancelled.');
    });

    xhr.open('POST', '/api/pdf/upload');
    xhr.send(formData);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    handlePickFile(file);
  };

  const togglePage = (page: number) => {
    if (status === 'processing') return;
    setSelectedPages((current) =>
      current.includes(page)
        ? current.filter((item) => item !== page)
        : [...current, page].sort((a, b) => a - b),
    );
    setMessage(`Page ${page} updated in the removal list.`);
    setLastAction(`Toggled page ${page}`);
    if (status === 'done') setStatus('ready');
  };

  const selectAll = () => {
    if (status === 'processing' || pageCount === 0) return;
    setSelectedPages(pages);
    setStatus('ready');
    setMessage(`All ${pageCount} pages selected. You must keep at least 1 page before deleting.`);
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

  const handleQuickInputChange = (value: string) => {
    setQuickInput(value);
    if (pageCount === 0) return;
    const parsed = parsePageRanges(value, pageCount);
    setSelectedPages(parsed);
    setMessage(`Quick input applied: ${parsed.length} page${parsed.length === 1 ? '' : 's'} selected.`);
    setLastAction('Applied quick input');
    if (status === 'done') setStatus('ready');
  };

  const startDelete = async () => {
    if (status === 'processing') return;
    if (selectedCount === 0) {
      setMessage('Pick at least one page first.');
      setLastAction('Blocked delete because no pages were selected');
      return;
    }
    if (selectedCount >= pageCount) {
      setMessage('At least 1 page must be kept. Please adjust your selection.');
      setLastAction('Blocked delete: would remove all pages');
      return;
    }
    if (!fileId) {
      setMessage('No uploaded file. Please upload a PDF first.');
      setLastAction('Blocked delete: missing fileId');
      return;
    }

    setError(null);
    setStatus('processing');
    setMessage(`Processing ${selectedCount} page${selectedCount === 1 ? '' : 's'}...`);
    setLastAction(`Sent ${selectedCount} pages to process`);

    try {
      const response = await fetch('/api/pdf/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileId, pagesToRemove: selectedPages }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Too many requests. Please wait a minute and try again.');
        }
        throw new Error(data.error || data.message || 'Processing failed. Please try again.');
      }

      setDownloadToken(data.downloadToken);
      setStatus('done');
      setMessage(`${resultName} is ready to download.`);
      setLastAction('Processing complete');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Processing failed. Please try again.';
      setError(msg);
      setMessage(msg);
      setStatus('ready');
      setLastAction('Processing failed');
    }
  };

  const startOver = () => {
    resetWorkspace();
  };

  // Sync quick input when selection changes via grid clicks
  useEffect(() => {
    setQuickInput(formatPageRanges(selectedPages));
  }, [selectedPages]);

  const isProcessing = status === 'processing';
  const isDone = status === 'done';
  const canDelete = status === 'ready' && selectedCount > 0 && selectedCount < pageCount;

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
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  ['Upload', 'PDF files up to 50 MB'],
                  ['Select', 'Click pages or type 1,3,5-10'],
                  ['Download', 'Get your cleaned PDF'],
                ].map(([title, body]) => (
                  <div key={title} className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 backdrop-blur">
                    <div className="text-sm font-semibold text-slate-950">{title}</div>
                    <div className="mt-1 text-xs leading-5 text-slate-500">{body}</div>
                  </div>
                ))}
              </div>

              <div
                className={`mt-7 rounded-[1.75rem] border bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.06)] sm:p-6 ${isDragging ? 'border-blue-400 ring-2 ring-blue-100' : 'border-slate-200'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-slate-500">Current file</div>
                    <div className="text-xl font-semibold text-slate-950">{fileName || 'No file uploaded'}</div>
                    <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1">{fileSizeLabel || '—'}</span>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1">{pageCount > 0 ? `${pageCount} pages` : '—'}</span>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1">
                        {status === 'done' ? 'Ready to download' : status === 'processing' ? 'Processing' : status === 'ready' ? 'Ready to edit' : 'Waiting for upload'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:min-w-[240px]">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
                    >
                      {status === 'idle' ? 'Upload PDF' : 'Replace PDF'}
                    </button>
                    <button
                      type="button"
                      onClick={startOver}
                      className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-200 hover:text-blue-700"
                    >
                      Start over
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

                {error && (
                  <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                {status !== 'idle' && pageCount > 0 && (
                  <>
                    <div className="mt-6 grid gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600 sm:grid-cols-3">
                      <button
                        type="button"
                        onClick={selectAll}
                        disabled={isProcessing}
                        className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left font-medium text-slate-700 transition-colors hover:border-blue-200 hover:text-blue-700 disabled:opacity-50"
                      >
                        Select all
                        <span className="mt-1 block text-xs text-slate-500">Mark every page for removal</span>
                      </button>
                      <button
                        type="button"
                        onClick={clearSelection}
                        disabled={isProcessing}
                        className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left font-medium text-slate-700 transition-colors hover:border-blue-200 hover:text-blue-700 disabled:opacity-50"
                      >
                        Clear selection
                        <span className="mt-1 block text-xs text-slate-500">Keep every page</span>
                      </button>
                      <button
                        type="button"
                        onClick={invertSelection}
                        disabled={isProcessing}
                        className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left font-medium text-slate-700 transition-colors hover:border-blue-200 hover:text-blue-700 disabled:opacity-50"
                      >
                        Invert selection
                        <span className="mt-1 block text-xs text-slate-500">Swap keep and delete pages</span>
                      </button>
                    </div>

                    <div className="mt-4">
                      <label htmlFor="quick-pages" className="block text-sm font-medium text-slate-700">
                        Quick selection
                      </label>
                      <div className="mt-2 flex gap-2">
                        <input
                          id="quick-pages"
                          type="text"
                          value={quickInput}
                          onChange={(e) => handleQuickInputChange(e.target.value)}
                          disabled={isProcessing}
                          placeholder="e.g. 1,3,5-10"
                          className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-60"
                        />
                      </div>
                      <p className="mt-1 text-xs text-slate-500">Use commas and dashes to select multiple pages.</p>
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
                              disabled={isProcessing}
                              className={`group flex aspect-[3/4] flex-col justify-between rounded-xl border p-3 text-left transition-all ${selected ? 'border-blue-300 bg-blue-50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'} ${isProcessing ? 'cursor-not-allowed opacity-70' : ''}`}
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
                  </>
                )}

                {status === 'idle' && (
                  <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
                    <p>Drag and drop a PDF here, or click Upload PDF.</p>
                    <p className="mt-2 text-xs">Maximum 50 MB and 500 pages.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.05)]">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-base font-semibold text-slate-950">Workflow state</h2>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status === 'processing' ? 'bg-amber-100 text-amber-800' : status === 'done' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'}`}>
                    {status === 'processing' ? 'Working' : status === 'done' ? 'Complete' : status === 'ready' ? 'Ready' : 'Idle'}
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
                  disabled={!canDelete}
                  className="mt-5 w-full rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                >
                  {isProcessing ? 'Deleting pages…' : 'Delete selected pages'}
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
                  Selected pages will be removed from the final PDF. You must keep at least one page.
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white shadow-[0_24px_80px_rgba(15,23,42,0.15)]">
                <h2 className="text-base font-semibold">Export result</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  When processing finishes, download the cleaned PDF here. If the download link expires, click Start over and process again.
                </p>
                <div className="mt-4 rounded-xl bg-white/10 p-4 text-sm text-slate-200">
                  <div className="flex items-center justify-between gap-3">
                    <span>Output file</span>
                    <span className="font-medium text-white">{resultName || '—'}</span>
                  </div>
                </div>
                <div className="mt-4 flex gap-3">
                  <a
                    ref={downloadLinkRef}
                    href={downloadToken ? `/api/pdf/download/${downloadToken}` : '#'}
                    download={resultName}
                    className={`flex-1 rounded-full px-4 py-2.5 text-center text-sm font-semibold ${downloadToken ? 'bg-white text-slate-900 hover:bg-slate-100' : 'bg-slate-700 text-slate-400 cursor-not-allowed'}`}
                    onClick={(e) => {
                      if (!downloadToken) {
                        e.preventDefault();
                        setMessage('No download link available. Please process the PDF first.');
                        setLastAction('Download blocked: no token');
                      }
                    }}
                  >
                    Download cleaned PDF
                  </a>
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
