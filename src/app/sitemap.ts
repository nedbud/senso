export default async function sitemap() {
  const baseUrl = "https://sensohearingdhaka.com";

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/about-us`, lastModified: new Date() },
    { url: `${baseUrl}/#services`, lastModified: new Date() },
    { url: `${baseUrl}/#contact`, lastModified: new Date() },
  ];
}

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