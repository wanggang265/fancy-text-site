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
        <p className="mt-4 text-sm text-slate-500">Last updated: 2026-07-20</p>

        <div className="mt-8 space-y-6 text-slate-700">
          <section>
            <h2 className="text-lg font-semibold text-slate-950">1. Information We Do Not Collect</h2>
            <p className="mt-2">
              Remove PDF Pages does not ask you to create an account, sign in, or provide any personal information. You can use the tool anonymously. We do not collect your name, email address, payment information, or any other identifying details.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-950">2. File Handling</h2>
            <p className="mt-2">
              When you upload a PDF, it is used only to remove the pages you select and generate the output file. We do not review, share, or retain your files. After processing, uploaded files and generated outputs are automatically deleted from our servers, typically within 60 minutes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-950">3. Analytics</h2>
            <p className="mt-2">
              We do not use third-party analytics or tracking tools. If we ever decide to enable analytics in the future, we will only do so after clearly updating this policy and choosing a privacy-conscious provider.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-950">4. Cookies</h2>
            <p className="mt-2">
              We do not use non-essential cookies. Any cookies used are limited to what is strictly necessary to keep the product working, such as maintaining basic session or preference state while you use the tool.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-950">5. Changes to This Policy</h2>
            <p className="mt-2">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
