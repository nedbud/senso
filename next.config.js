/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      "https://cloud.sensohearingdhaka.com",
      "https://test.sensohearingdhaka.com",
    ],
  },
};

module.exports = nextConfig;
