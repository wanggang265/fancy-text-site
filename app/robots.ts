import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteMeta";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/checkout", "/success"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
