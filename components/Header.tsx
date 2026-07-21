export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-desktop py-space-3 max-w-container-max mx-auto bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-md">
      <a className="text-heading-sm font-heading-sm text-primary dark:text-inverse-primary tracking-tight" href="/">RemovePDFPages</a>
      <nav className="hidden md:flex gap-space-6 items-center">
        <div className="relative group">
          <button className="flex items-center gap-1 text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors font-body-md text-body-md">
            Tools
            <span className="material-symbols-outlined transition-transform group-hover:rotate-180" style={{fontSize: 18}}>expand_more</span>
          </button>
          <div className="absolute top-full left-0 mt-2 w-80 bg-paper border border-ink-200 rounded-lg shadow-lg p-2 hidden group-hover:block">
            <a className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-brand-indigo-50 transition-colors" href="/remove-pages">
              <span className="material-symbols-outlined text-accent-olive-700">delete</span>
              <span className="text-on-surface font-body-md text-body-md">Remove Pages</span>
            </a>
            <a className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-brand-indigo-50 transition-colors" href="/merge">
              <span className="material-symbols-outlined text-accent-olive-700">merge_type</span>
              <span className="text-on-surface font-body-md text-body-md">Merge PDF</span>
            </a>
            <a className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-brand-indigo-50 transition-colors" href="/compress">
              <span className="material-symbols-outlined text-accent-olive-700">compress</span>
              <span className="text-on-surface font-body-md text-body-md">Compress PDF</span>
            </a>
            <a className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-brand-indigo-50 transition-colors" href="/sign">
              <span className="material-symbols-outlined text-accent-olive-700">signature</span>
              <span className="text-on-surface font-body-md text-body-md">Sign PDF</span>
            </a>
            <a className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-brand-indigo-50 transition-colors" href="/convert-to-word">
              <span className="material-symbols-outlined text-accent-olive-700">description</span>
              <span className="text-on-surface font-body-md text-body-md">Convert to Word</span>
            </a>
          </div>
        </div>
        <a className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors font-body-md text-body-md" href="/pricing">Pricing</a>
        <a className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors font-body-md text-body-md" href="/faq">FAQ</a>
      </nav>
      <a className="hidden md:inline-flex items-center justify-center bg-primary text-on-primary font-mono-data text-mono-data px-4 py-2 rounded shadow-sm hover:shadow-md transition-all" href="/checkout">Buy License — $29</a>
    </header>
  );
}
