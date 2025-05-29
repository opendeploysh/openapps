import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  trailingSlash: true,
  output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "styles.redditmedia.com",
      },
    ],
  },
}

export default nextConfig
