import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteMeta";

export const dynamic = "force-static";

const indexableRoutes = [
  "/",
  "/remove-pages",
  "/merge",
  "/compress",
  "/sign",
  "/convert-to-word",
  "/pricing",
  "/faq",
  "/contact",
  "/privacy",
  "/terms",
  "/refund",
  "/cookie-policy",
  "/blog",
  "/blog/foxit-alternative",
  "/blog/replace-image-in-pdf",
  "/blog/one-time-payment-pdf-editor",
  "/blog/no-subscription-pdf-editor",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return indexableRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1.0 : 0.7,
  }));
}
