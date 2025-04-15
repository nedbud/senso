import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const baseUrl = "https://www.sensohearingdhaka.com";
    const res = await fetch('https://cloud.sensohearingdhaka.com/api/senso/products/list');
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    
    // Create the XML string manually
    let xml = '<?xml version="1.0" encoding="UTF-8"?>';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    
    // Add static URLs
    xml += `
      <url>
        <loc>${baseUrl}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${baseUrl}/about-us</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
      </url>
      <url>
        <loc>${baseUrl}/#services</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
      </url>
      <url>
        <loc>${baseUrl}/#contact</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
      </url>
    `;
    
    // Add dynamic URLs for products
    if (data.data && Array.isArray(data.data)) {
      for (const item of data.data) {
        if (item.slug) {
          xml += `
            <url>
              <loc>${baseUrl}/hearing-aids/${item.slug}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>0.8</priority>
            </url>
          `;
        }
      }
    }
    
    xml += '</urlset>';
    
    // Return the XML with the correct content type
    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (e) {
    console.error("Error generating sitemap:", e);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}