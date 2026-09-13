import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * There was no robots.txt at all — no file, no route. Not fatal, since
 * crawling is allowed by default, but it meant the sitemap was never declared
 * and a crawler had to guess that /sitemap.xml existed.
 *
 * A route rather than a file in public/, so the host name comes from the same
 * constant as every canonical URL. Two places to write the domain is one place
 * too many.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Nothing here is secret; these simply are not pages, and letting them
      // be crawled spends the site's crawl budget on JSON.
      disallow: ["/api/"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
