export default function Footer() {
  return (
    <footer className="w-full px-margin-desktop py-space-20 grid grid-cols-1 md:grid-cols-4 gap-gutter-desktop bg-inverse-surface dark:bg-on-surface text-inverse-on-surface dark:text-surface-bright font-body-sm text-body-sm mt-auto">
      <div className="col-span-1 md:col-span-1 flex flex-col gap-space-3">
        <span className="text-heading-sm font-heading-sm text-white">RemovePDFPages</span>
        <p className="text-ink-300 dark:text-ink-300 mt-2">
          © 2024 RemovePDFPages. Precision Drafting for PDF Documents.
        </p>
      </div>
      <div className="col-span-1 flex flex-col gap-space-3">
        <h4 className="font-heading-sm text-heading-sm text-white mb-2">Free Tools</h4>
        <a className="text-ink-300 dark:text-ink-300 hover:text-white transition-colors" href="/remove-pages">Remove Pages</a>
        <a className="text-ink-300 dark:text-ink-300 hover:text-white transition-colors" href="/merge">Merge PDF</a>
        <a className="text-ink-300 dark:text-ink-300 hover:text-white transition-colors" href="/compress">Compress PDF</a>
        <a className="text-ink-300 dark:text-ink-300 hover:text-white transition-colors" href="/sign">Sign PDF</a>
        <a className="text-ink-300 dark:text-ink-300 hover:text-white transition-colors" href="/convert-to-word">Convert to Word</a>
      </div>
      <div className="col-span-1 flex flex-col gap-space-3">
        <h4 className="font-heading-sm text-heading-sm text-white mb-2">Legal</h4>
        <a className="text-ink-300 dark:text-ink-300 hover:text-white transition-colors" href="/contact">Terms of Service</a>
        <a className="text-ink-300 dark:text-ink-300 hover:text-white transition-colors" href="/contact">Privacy Policy</a>
        <a className="text-ink-300 dark:text-ink-300 hover:text-white transition-colors" href="/contact">Contact Us</a>
      </div>
    </footer>
  );
}
