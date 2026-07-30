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
    <div className={`faq-accordion rpp-card overflow-hidden ${active ? 'active' : ''}`}>
      <button
        type="button"
        onClick={() => setActive(!active)}
        className="w-full text-left flex items-center justify-between rpp-heading-3 hover:bg-[var(--rpp-ink-100)] transition-colors px-6 py-4"
        aria-expanded={active}
      >
        {question}
        <svg
          className="faq-icon rpp-icon flex-shrink-0 transition-transform"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div className="faq-accordion-content px-6 rpp-body">{children}</div>
    </div>
  );
}
