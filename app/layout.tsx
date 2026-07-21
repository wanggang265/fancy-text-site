import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://removepdfpages.net"),
  title: "RemovePDFPages - Free PDF Tools. Full Editor for One Price.",
  description:
    "Delete pages, merge, compress, and sign PDFs for free. Upgrade once to edit text, replace images, and convert PDF to Word.",
  openGraph: {
    title: "RemovePDFPages - Free PDF Tools. Full Editor for One Price.",
    description:
      "Delete pages, merge, compress, and sign PDFs for free. Upgrade once to edit text, replace images, and convert PDF to Word.",
    type: "website",
    images: ["/og-home.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "RemovePDFPages - Free PDF Tools. Full Editor for One Price.",
    description:
      "Delete pages, merge, compress, and sign PDFs for free. Upgrade once to edit text, replace images, and convert PDF to Word.",
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
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-on-background font-body-md">
        {children}
      </body>
    </html>
  );
}
