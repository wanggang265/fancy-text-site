import { buildNoIndexMetadata } from '@/lib/seo';
import { Suspense } from 'react';
import CheckoutForm from './CheckoutForm';

export const metadata = buildNoIndexMetadata({
  title: "Checkout | RemovePDFPages",
  description: "Complete your purchase of the RemovePDFPages Full Editor. Choose monthly, yearly, or a one-time license. Secure checkout through Creem.",
  path: "/checkout",
  type: "website",
});

function CheckoutSkeleton() {
  return (
    <main id="main">
      <section className="rpp-section rpp-section-hero">
        <div className="rpp-container rpp-text-center">
          <h1 className="rpp-display">Get the Full Editor</h1>
          <p className="rpp-lead">Loading checkout…</p>
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
            name: "Checkout",
            url: "https://removepdfpages.net/checkout",
          }),
        }}
      />
      <a href="#main" className="rpp-sr-only">Skip to content</a>
      <Suspense fallback={<CheckoutSkeleton />}>
        <CheckoutForm />
      </Suspense>
    </>
  );
}
