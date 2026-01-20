/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const nextConfig = {
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  reactStrictMode: true,
};

const pwaConfig = {
  dest: 'public',
  register: true,
  skipWaiting: true,
  buildExcludes: ['manifest.webmanifest'],
  publicExcludes: ['!sitemap.xml', '!robots.txt'],
  disable: process.env.NODE_ENV === 'development',
};

export default withPWA(pwaConfig)(nextConfig);
