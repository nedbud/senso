export default async function sitemap() {
  const baseUrl = "https://sensohearingdhaka.com";

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/about-us`, lastModified: new Date() },
    { url: `${baseUrl}/#services`, lastModified: new Date() },
    { url: `${baseUrl}/#contact`, lastModified: new Date() },
  ];
}
