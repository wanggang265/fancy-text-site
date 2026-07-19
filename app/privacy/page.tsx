import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Remove PDF Pages.',
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-full flex-col bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto flex-1 max-w-3xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">Privacy Policy</h1>
        <p className="mt-4 text-sm text-slate-500">Last updated: {new Date().toISOString().split('T')[0]}</p>

        <div className="mt-8 space-y-6 text-slate-700">
          <section>
            <h2 className="text-lg font-semibold text-slate-950">1. Information We Do Not Collect</h2>
            <p className="mt-2">
              Remove PDF Pages is designed to keep the workflow lightweight. We do not require account information for basic use.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-950">2. File Handling</h2>
            <p className="mt-2">
              Uploaded files are only used to perform the page-removal workflow and are not shown in this policy as retained assets.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-950">3. Analytics</h2>
            <p className="mt-2">
              If analytics are enabled in the future, they should stay limited and privacy-conscious.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-950">4. Cookies</h2>
            <p className="mt-2">
              Cookies may be used for basic product functionality or preference handling, depending on deployment settings.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-950">5. Changes to This Policy</h2>
            <p className="mt-2">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
