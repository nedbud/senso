/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["localhost", "127.0.0.1:8000"],
  },
};

module.exports = nextConfig;
