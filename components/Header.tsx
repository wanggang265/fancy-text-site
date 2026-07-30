"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <header className="rpp-header">
      <div className="rpp-container rpp-header-inner">
        <Link href="/" className="rpp-nav-logo" aria-current="page">
          <span className="rpp-nav-logo-mark">R</span>
          RemovePDFPages
        </Link>

        <nav className="rpp-nav-links" aria-label="Main">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="rpp-nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="rpp-nav-cta">
          <Link
            href="/pricing"
            className="rpp-btn rpp-btn-secondary rpp-btn-small"
          >
            Get Full Editor — $19/month Launch Special
          </Link>
          <Link href="/remove-pages" className="rpp-btn rpp-btn-primary rpp-btn-small">
            Try free
          </Link>
        </div>

        <button
          className="rpp-menu-toggle"
          aria-label={drawerOpen ? "Close menu" : "Open menu"}
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen((v) => !v)}
        >
          <svg
            className="rpp-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {drawerOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {drawerOpen && (
        <>
          <div
            className="fixed inset-0 z-[200] bg-black/40"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <div
            className="fixed top-0 right-0 h-full w-[300px] max-w-full bg-white shadow-xl z-[201] transform transition-transform duration-200 translate-x-0"
            aria-modal="true"
            role="dialog"
            aria-label="Site menu"
          >
            <div className="flex items-center justify-between p-4 border-b border-[var(--rpp-ink-200)]">
              <span className="font-bold text-[var(--rpp-ink-900)]">Menu</span>
              <button
                aria-label="Close menu"
                onClick={() => setDrawerOpen(false)}
                className="p-2 text-[var(--rpp-ink-600)] hover:text-[var(--rpp-ink-900)]"
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
            <div className="p-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-[var(--rpp-ink-700)] hover:bg-[var(--rpp-ink-100)] font-medium"
                  onClick={() => setDrawerOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-[var(--rpp-ink-200)] space-y-3">
                <Link
                  href="/remove-pages"
                  className="rpp-btn rpp-btn-secondary rpp-btn-full"
                  onClick={() => setDrawerOpen(false)}
                >
                  Try free
                </Link>
                <Link
                  href="/pricing"
                  className="rpp-btn rpp-btn-primary rpp-btn-full"
                  onClick={() => setDrawerOpen(false)}
                >
                  Get Full Editor — $19/month
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
