import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Remove PDF Pages — Remove PDF pages in seconds",
  description:
    "Fast, secure, and simple page removal for PDFs. Upload your PDF, select pages to remove, and download the cleaned file.",
  openGraph: {
    title: "Remove PDF Pages — Remove PDF pages in seconds",
    description:
      "Fast, secure, and simple page removal for PDFs. Upload your PDF, select pages to remove, and download the cleaned file.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Remove PDF Pages — Remove PDF pages in seconds",
    description:
      "Fast, secure, and simple page removal for PDFs. Upload your PDF, select pages to remove, and download the cleaned file.",
  },
  alternates: {
    canonical: "https://removepdfpages.net/",
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script src="https://accounts.google.com/gsi/client" async defer></script>
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
