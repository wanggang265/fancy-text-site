import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://removepdfpages.net"),
  title: "RemovePDFPages — Free PDF Tools & Full Editor",
  description:
    "Delete pages, merge, compress, and sign PDFs in your browser. Subscribe to the Full Editor from $19/month or buy a one-time license for $59 and convert PDF to Word.",
  openGraph: {
    title: "RemovePDFPages — Free PDF Tools & Full Editor",
    description:
      "Delete pages, merge, compress, and sign PDFs in your browser. Subscribe to the Full Editor from $19/month or buy a one-time license for $59 and convert PDF to Word.",
    type: "website",
    images: ["/og-home.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "RemovePDFPages — Free PDF Tools & Full Editor",
    description:
      "Delete pages, merge, compress, and sign PDFs in your browser. Subscribe to the Full Editor from $19/month or buy a one-time license for $59 and convert PDF to Word.",
    images: ["/og-home.png"],
  },
  alternates: {
    canonical: "https://removepdfpages.net/",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased">
        <a href="#main" className="rpp-sr-only">
          Skip to content
        </a>
        <Header />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
