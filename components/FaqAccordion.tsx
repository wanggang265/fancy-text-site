'use client';

import { useState } from 'react';

export function FaqAccordion({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) {
  const [active, setActive] = useState(false);
  return (
    <div className={`faq-accordion border border-ink-200 rounded-lg bg-paper shadow-sm overflow-hidden ${active ? 'active' : ''}`}>
      <button
        type="button"
        onClick={() => setActive(!active)}
        className="w-full text-left px-6 py-4 flex justify-between items-center font-semibold text-on-surface hover:bg-brand-indigo-50/50 transition-colors"
      >
        {question}
        <span className="material-symbols-outlined faq-icon transition-transform text-ink-600">expand_more</span>
      </button>
      <div className="faq-accordion-content px-6 text-on-surface-variant">{children}</div>
    </div>
  );
}
