"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LoginModal } from "@/components/LoginModal";
import { getMe, logout, type User } from "@/lib/api";

const navLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const refreshUser = () => {
    getMe()
      .then((data) => setUser(data.user))
      .catch(() => setUser(null));
  };

  useEffect(() => {
    refreshUser();
    function handleCreditsRefresh() {
      refreshUser();
    }
    window.addEventListener('removepdf:credits:refresh', handleCreditsRefresh);
    return () => window.removeEventListener('removepdf:credits:refresh', handleCreditsRefresh);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [userMenuOpen]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // ignore errors
    }
    setUser(null);
    setUserMenuOpen(false);
    window.location.reload();
  };
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
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className="rpp-nav-link flex items-center gap-1 truncate max-w-[200px]"
                title={user.email}
              >
                {user.name || user.email}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg border border-slate-200 bg-white py-1 shadow-lg z-50">
                  <div className="px-4 py-2 text-xs text-slate-500 truncate border-b border-slate-100">
                    {user.email}
                  </div>
                  <div className="px-4 py-2 text-sm text-slate-700 flex items-center justify-between">
                    <span>Credits</span>
                    <span className="font-semibold text-slate-900">{user.credits}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 border-t border-slate-100"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setLoginOpen(true)}
              className="rpp-nav-link"
            >
              Sign in
            </button>
          )}
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
                {user ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-sm text-[var(--rpp-ink-700)] truncate">
                      {user.name || user.email}
                    </div>
                    <div className="px-3 py-2 text-sm text-[var(--rpp-ink-700)] flex items-center justify-between">
                      <span>Credits</span>
                      <span className="font-semibold text-[var(--rpp-ink-900)]">{user.credits}</span>
                    </div>
                    <button
                      onClick={() => {
                        setDrawerOpen(false);
                        handleLogout();
                      }}
                      className="rpp-btn rpp-btn-secondary rpp-btn-full"
                    >
                      Log out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      setLoginOpen(true);
                    }}
                    className="rpp-btn rpp-btn-secondary rpp-btn-full"
                  >
                    Sign in
                  </button>
                )}
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
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </header>
  );
}
