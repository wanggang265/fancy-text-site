import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://removepdfpages.net";
  const lastModified = "2026-08-04";

  return [
    { url: `${base}/`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/remove-pages`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/merge`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/compress`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/sign`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/convert-to-word`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/pricing`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/faq`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/privacy`, lastModified, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/terms`, lastModified, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/refund`, lastModified, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/cookie-policy`, lastModified, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/blog`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/blog/foxit-alternative`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog/replace-image-in-pdf`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog/one-time-payment-pdf-editor`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog/no-subscription-pdf-editor`, lastModified, changeFrequency: "monthly", priority: 0.6 },
  ];
}
