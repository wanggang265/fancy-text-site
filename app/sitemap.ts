import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteMeta";

export const dynamic = "force-static";

const indexableRoutes: { route: string; priority: number; frequency: "weekly" | "monthly" }[] = [
  { route: "/", priority: 1.0, frequency: "weekly" },
  { route: "/remove-pages", priority: 0.9, frequency: "monthly" },
  { route: "/merge", priority: 0.9, frequency: "monthly" },
  { route: "/compress", priority: 0.9, frequency: "monthly" },
  { route: "/sign", priority: 0.9, frequency: "monthly" },
  { route: "/convert-to-word", priority: 0.8, frequency: "monthly" },
  { route: "/pricing", priority: 0.8, frequency: "monthly" },
  { route: "/blog", priority: 0.7, frequency: "monthly" },
  { route: "/blog/foxit-alternative", priority: 0.8, frequency: "monthly" },
  { route: "/blog/no-subscription-pdf-editor", priority: 0.8, frequency: "monthly" },
  { route: "/blog/one-time-payment-pdf-editor", priority: 0.8, frequency: "monthly" },
  { route: "/blog/replace-image-in-pdf", priority: 0.8, frequency: "monthly" },
  { route: "/faq", priority: 0.6, frequency: "monthly" },
  { route: "/contact", priority: 0.5, frequency: "monthly" },
  { route: "/privacy", priority: 0.5, frequency: "monthly" },
  { route: "/terms", priority: 0.5, frequency: "monthly" },
  { route: "/refund", priority: 0.5, frequency: "monthly" },
  { route: "/cookie-policy", priority: 0.5, frequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return indexableRoutes.map(({ route, priority, frequency }) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: frequency,
    priority,
  }));
}
