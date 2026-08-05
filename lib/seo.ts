import type { Metadata } from "next";

interface BuildMetadataOptions {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  type?: "website" | "article";
}

/**
 * Build a Metadata object with unique title/description, canonical URL,
 * and Open Graph / Twitter cards that match the page content.
 */
export function buildMetadata({
  title,
  description,
  path,
  ogImage = "/og-home.png",
  type = "website",
}: BuildMetadataOptions): Metadata {
  const url = `https://removepdfpages.net${path}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/**
 * Build metadata for pages that should not be indexed by search engines.
 */
export function buildNoIndexMetadata(options: BuildMetadataOptions): Metadata {
  return {
    ...buildMetadata(options),
    robots: {
      index: false,
      follow: false,
    },
  };
}
