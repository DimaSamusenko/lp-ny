require('dotenv').config()

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    nextScriptWorkers: true,
  },
  images: {
    domains: ['localhost', process.env.NEXT_PUBLIC_PAYLOAD_URL],
    formats: ['image/webp'],
  },
}
