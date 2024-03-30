/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  images: {
    domains: [
      "cloudflare-ipfs.com",
      "ipfs.io",
    ],
    unoptimized: true,
  },
};
module.exports = nextConfig;