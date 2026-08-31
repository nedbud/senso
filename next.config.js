/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    // Was `domains: ["https://cloud.sensohearingdhaka.com", ...]` — full URLs
    // where Next expects bare hostnames, so next/image silently refused every
    // CMS image and every component fell back to a raw <img> with the eslint
    // rule disabled. That shipped full-size unoptimised images to people on
    // mobile data. remotePatterns is the supported form in Next 13.4+.
    remotePatterns: [
      { protocol: "https", hostname: "cloud.sensohearingdhaka.com", pathname: "/storage/**" },
      { protocol: "https", hostname: "test.sensohearingdhaka.com", pathname: "/**" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
