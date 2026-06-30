/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // Immagini caricate su Strapi locale
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        // Per produzione: sostituisci con il tuo dominio Strapi
        protocol: 'https',
        hostname: 'your-strapi-domain.com',
        pathname: '/uploads/**',
      },
      {
        // Unsplash (fallback immagini durante sviluppo)
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;
