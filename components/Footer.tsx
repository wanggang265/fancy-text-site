import Link from 'next/link';

const supportEmail = 'support@removepdfpages.net';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white/80">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-950">Remove PDF Pages</h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">
              Remove pages from PDFs in seconds.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-950">Product</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link href="/#how-it-works" className="hover:text-blue-700">How it works</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-700">Pricing</Link></li>
              <li><Link href="/#faq" className="hover:text-blue-700">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-950">Support</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link href="/contact" className="hover:text-blue-700">Contact</Link></li>
              <li><Link href="/refund" className="hover:text-blue-700">Refund</Link></li>
              <li><a href={`mailto:${supportEmail}`} className="hover:text-blue-700">{supportEmail}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-950">Legal</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link href="/privacy/" className="hover:text-blue-700">Privacy Policy</Link></li>
              <li><Link href="/terms/" className="hover:text-blue-700">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-6 text-sm text-slate-500">
          © 2026 Remove PDF Pages. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
