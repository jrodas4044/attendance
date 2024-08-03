/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd1aet42jaoyd8g.cloudfront.net',
      },
    ],
  },
}

module.exports = nextConfig
