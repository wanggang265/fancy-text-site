"use client";

import { useState } from "react";

const tools = [
  { href: "/remove-pages", label: "Remove Pages" },
  { href: "/merge", label: "Merge PDFs" },
  { href: "/compress", label: "Compress PDF" },
  { href: "/sign", label: "Sign PDF" },
  { href: "/convert-to-word", label: "Convert to Word", badge: "Full Editor" },
];

const support = [
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

const legal = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/refund", label: "Refund Policy" },
  { href: "/cookie-policy", label: "Cookie Policy" },
];

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <header className="rpp-header">
      <div className="rpp-container rpp-header-inner">
        <a href="/" className="rpp-nav-logo" aria-current="page">
          <span className="rpp-nav-logo-mark">R</span>
          RemovePDFPages
        </a>

        <nav className="rpp-nav-links" aria-label="Main">
          <div
            className="relative"
            onMouseEnter={() => setToolsOpen(true)}
            onMouseLeave={() => setToolsOpen(false)}
          >
            <button
              className="rpp-nav-link flex items-center gap-1"
              onClick={() => setToolsOpen((v) => !v)}
              aria-expanded={toolsOpen}
            >
              Tools
              <svg
                className="w-4 h-4 transition-transform"
                style={{ transform: toolsOpen ? "rotate(180deg)" : undefined }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {toolsOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-slate-200 rounded-lg shadow-lg p-2 z-50">
                {tools.map((t) => (
                  <a
                    key={t.href}
                    href={t.href}
                    className="flex items-center justify-between px-3 py-2.5 rounded-md hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-sm font-medium text-slate-800">
                      {t.label}
                    </span>
                    {t.badge && (
                      <span className="text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                        {t.badge}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>
          <a href="/pricing" className="rpp-nav-link">
            Pricing
          </a>
          <a href="/faq" className="rpp-nav-link">
            FAQ
          </a>
          <a href="/blog" className="rpp-nav-link">
            Blog
          </a>
        </nav>

        <div className="rpp-nav-cta">
          <a
            href="/remove-pages"
            className="rpp-btn rpp-btn-secondary rpp-btn-small"
          >
            Try free
          </a>
          <a
            href="/pricing"
            className="rpp-btn rpp-btn-primary rpp-btn-small"
          >
            Get Full Editor — $19/month Launch Special
          </a>
        </div>

        <button
          className="rpp-menu-toggle"
          aria-label="Open menu"
          onClick={() => setDrawerOpen(true)}
        >
          <svg
            className="rpp-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </div>

      {drawerOpen && (
        <div
          className="fixed inset-0 z-[200] bg-black/40"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-[300px] max-w-full bg-white shadow-xl z-[201] transform transition-transform duration-200 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-modal="true"
        role="dialog"
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <span className="font-bold text-slate-900">Menu</span>
          <button
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
            className="p-2 text-slate-600 hover:text-slate-900"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4 space-y-6 overflow-y-auto h-full pb-24">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
              Free Tools
            </h3>
            <div className="space-y-1">
              {tools.slice(0, 4).map((t) => (
                <a
                  key={t.href}
                  href={t.href}
                  className="block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50"
                >
                  {t.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
              Full Editor
            </h3>
            <a
              href="/convert-to-word"
              className="block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50"
            >
              Convert to Word
            </a>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
              Support
            </h3>
            <div className="space-y-1">
              {support.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  className="block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
              Legal
            </h3>
            <div className="space-y-1">
              {legal.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div className="pt-4 border-t border-slate-200 space-y-3">
            <a href="/remove-pages" className="rpp-btn rpp-btn-secondary rpp-btn-full">
              Try free
            </a>
            <a href="/pricing" className="rpp-btn rpp-btn-primary rpp-btn-full">
              Get Full Editor — $19/month
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
