import { NextResponse } from "next/server";
import { getProducts } from "@/routes/product";
import { SITE } from "@/lib/site";

export const revalidate = 3600;

/**
 * Every URL now has a Bangla and an English version, and each entry declares
 * the other through xhtml:link alternates — which is what Google reads for
 * language targeting. The previous sitemap listed fragment URLs (/#services,
 * /#contact) as separate pages; fragments are not separate pages and were
 * ignored, so they have been dropped.
 */
export async function GET() {
  const products = await getProducts();
  const now = new Date().toISOString();

  const paths: { path: string; priority: number; changefreq: string }[] = [
    { path: "", priority: 1.0, changefreq: "weekly" },
    { path: "/hearing-aids", priority: 0.9, changefreq: "weekly" },
    { path: "/about-us", priority: 0.6, changefreq: "monthly" },
    ...products
      .filter((p) => p.slug)
      .map((p) => ({
        path: `/hearing-aids/${p.slug}`,
        priority: 0.8,
        changefreq: "monthly",
      })),
  ];

  const entry = (path: string, priority: number, changefreq: string) => {
    const bn = `${SITE.url}${path || "/"}`;
    const en = `${SITE.url}/en${path}`;
    return `
  <url>
    <loc>${bn}</loc>
    <xhtml:link rel="alternate" hreflang="bn-BD" href="${bn}"/>
    <xhtml:link rel="alternate" hreflang="en-BD" href="${en}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${bn}"/>
    <lastmod>${now}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
  <url>
    <loc>${en}</loc>
    <xhtml:link rel="alternate" hreflang="bn-BD" href="${bn}"/>
    <xhtml:link rel="alternate" hreflang="en-BD" href="${en}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${bn}"/>
    <lastmod>${now}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${Math.max(priority - 0.1, 0.1).toFixed(1)}</priority>
  </url>`;
  };

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">` +
    paths.map((p) => entry(p.path, p.priority, p.changefreq)).join("") +
    `\n</urlset>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
