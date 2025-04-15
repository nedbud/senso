import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    const dynamicUrls = data.map((item: any) => ({
      url: `https://yourwebsite.com/users/${item.username}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.5,
    }));

    const staticUrls: MetadataRoute.Sitemap = [
      {
        url: 'https://yourwebsite.com/',
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 0.5,
      }
    ];

    return [...staticUrls, ...dynamicUrls];
  } catch (e) {
    console.error("Error generating sitemap:", e);
    return [];
  }
}

// export default async function sitemap() {
//   const baseUrl = "https://sensohearingdhaka.com";

//   return [
//     { url: baseUrl, lastModified: new Date() },
//     { url: `${baseUrl}/about-us`, lastModified: new Date() },
//     { url: `${baseUrl}/#services`, lastModified: new Date() },
//     { url: `${baseUrl}/#contact`, lastModified: new Date() },
//   ];
// }

// export default async function sitemap() {
//   const baseUrl = "https://sensohearingdhaka.com";

//   // Fetch products from API
//   const productsRes = await fetch('https://cloud.sensohearingdhaka.com/api/senso/products/list', {
//      cache: 'no-store'
//   });
//   const products = await productsRes.json();

//   // Generate product URLs
//   const productUrls = products.data.map((product: { slug: any; updatedAt: any; }) => ({
//     url: `${baseUrl}/hearing-aids/${product.slug}`, 
//     lastModified: new Date(product.updatedAt || new Date()),
//     changefreq: 'daily',
//     priority: 0.8,
//   }));

//   // Base URLs
//   const staticUrls = [
//     { 
//       url: baseUrl, 
//       lastModified: new Date(),
//       changefreq: 'weekly',  // Changed from changeFrequency
//       priority: 1, 
//     },
//     { 
//       url: `${baseUrl}/about-us`, 
//       lastModified: new Date(),
//       changefreq: 'weekly',  // Changed from changeFrequency
//       priority: 1, 
//     },
//     { 
//       url: `${baseUrl}/#services`, 
//       lastModified: new Date(),
//       changefreq: 'weekly',  // Changed from changeFrequency
//       priority: 1, 
//     },
//     { 
//       url: `${baseUrl}/#contact`, 
//       lastModified: new Date(),
//       changefreq: 'weekly',  // Changed from changeFrequency
//       priority: 1, 
//     },
//   ];

//   return [...staticUrls, ...productUrls];
// }