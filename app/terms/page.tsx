import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for Remove PDF Pages.',
};

export default function TermsPage() {
  return (
    <div className="flex min-h-full flex-col bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto flex-1 max-w-3xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">Terms of Service</h1>
        <p className="mt-4 text-sm text-slate-500">Last updated: {new Date().toISOString().split('T')[0]}</p>

        <div className="mt-8 space-y-6 text-slate-700">
          <section>
            <h2 className="text-lg font-semibold text-slate-950">1. Acceptance of Terms</h2>
            <p className="mt-2">
              By using Remove PDF Pages, you agree to these Terms of Use. If you do not agree, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-950">2. Description of Service</h2>
            <p className="mt-2">
              Remove PDF Pages is a focused tool for removing selected pages from a PDF file and downloading the cleaned result.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-950">3. Permitted Use</h2>
            <p className="mt-2">
              You may use this tool for personal or business document cleanup, subject to applicable laws and third-party obligations.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-950">4. No Warranty</h2>
            <p className="mt-2">
              This service is provided &quot;as is&quot; without warranties. We do not guarantee that every PDF will be supported in every browser or environment.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-950">5. Limitation of Liability</h2>
            <p className="mt-2">
              We are not liable for damages arising from the use or inability to use this service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-950">6. Changes to Terms</h2>
            <p className="mt-2">
              We may modify these terms at any time. Continued use of the service after changes constitutes acceptance of the updated terms.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
