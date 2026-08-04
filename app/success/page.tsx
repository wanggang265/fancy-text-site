import type { Metadata } from 'next';
import { Suspense } from 'react';
import SuccessContent from './SuccessContent';

export const metadata: Metadata = {
  title: 'Thank You | RemovePDFPages',
  description: 'Your RemovePDFPages Full Editor purchase is complete. Your license key and receipts have been sent to your email.',
  alternates: {
    canonical: 'https://removepdfpages.net/success',
  },
  robots: {
    index: false,
  },
};

function SuccessSkeleton() {
  return (
    <main id="main">
      <section className="rpp-section rpp-section-hero">
        <div className="rpp-container rpp-text-center">
          <h1 className="rpp-display">Welcome to the Full Editor</h1>
          <p className="rpp-lead">Loading your purchase details…</p>
        </div>
      </section>
    </main>
  );
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Thank You",
            url: "https://removepdfpages.net/success",
          }),
        }}
      />
      <a href="#main" className="rpp-sr-only">Skip to content</a>
      <Suspense fallback={<SuccessSkeleton />}>
        <SuccessContent />
      </Suspense>
    </>
  );
}
