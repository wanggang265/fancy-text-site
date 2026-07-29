import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Replace an Image in a PDF Without Adobe Acrobat | RemovePDFPages',
  description: "Published on the RemovePDFPages blog.",
  alternates: {
    canonical: 'https://removepdfpages.net/blog/replace-image-in-pdf',
  },
  openGraph: {
    title: 'How to Replace an Image in a PDF Without Adobe Acrobat | RemovePDFPages',
    description: "Published on the RemovePDFPages blog.",
    url: 'https://removepdfpages.net/blog/replace-image-in-pdf',
    siteName: 'RemovePDFPages',
    images: [{ url: 'https://removepdfpages.net/og-home.png', width: 1200, height: 630 }],
    type: 'website',
  },
};

export default function Page() {
  return (
    <div className="bg-surface text-on-surface font-body antialiased min-h-screen flex flex-col relative">
    
    <main className="flex-grow pt-32 pb-20">
    <article className="max-w-3xl mx-auto px-margin-desktop">
    <header className="mb-10">
    <h1 className="font-display text-3xl md:text-4xl text-primary font-bold mb-4 tracking-tight">How to Replace an Image in a PDF Without Adobe Acrobat</h1>
    <p className="text-sm text-ink-600">Published on the RemovePDFPages blog.</p>
    </header>
    <section className="mb-10">
    <h2 className="text-2xl font-bold text-on-surface mb-3 font-heading">The problem with PDF images</h2>
    <p className="text-base text-on-surface-variant leading-relaxed">PDFs are designed to preserve layout, so editing images inside them is less flexible than in a Word document.</p>
    </section>
    <section className="mb-10">
    <h2 className="text-2xl font-bold text-on-surface mb-3 font-heading">Option 1: Use a PDF editor</h2>
    <p className="text-base text-on-surface-variant leading-relaxed">A Full Editor license can replace or extract images directly. This is the fastest option for simple layouts.</p>
    </section>
    <section className="mb-10">
    <h2 className="text-2xl font-bold text-on-surface mb-3 font-heading">Option 2: Convert to Word first</h2>
    <p className="text-base text-on-surface-variant leading-relaxed">If the PDF has many images or complex formatting, convert it to DOCX, edit the image, and export back to PDF.</p>
    </section>
    <section className="mb-10">
    <h2 className="text-2xl font-bold text-on-surface mb-3 font-heading">Option 3: Free online tools</h2>
    <p className="text-base text-on-surface-variant leading-relaxed">For one-off tasks, free tools can remove pages or split files so you can rebuild the document in another app.</p>
    </section>
    <div className="mt-12 pt-8 border-t border-ink-200">
    <a className="inline-flex items-center bg-primary text-on-primary px-6 py-3 rounded-lg font-medium hover:bg-primary-container transition-colors shadow-sm" href="/remove-pages">Try Remove Pages</a>
    </div>
    </article>
    </main>
    
    </div>
  );
}
