/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "*.googleusercontent.com"
      },
      {
        hostname: "*.fbsbx.com"
      }
    ]
  }
}

module.exports = nextConfig
