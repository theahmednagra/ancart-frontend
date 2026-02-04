import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        // destination: `${process.env.NEXT_PUBLIC_BASE_URL}/api/:path*`,
        destination: `http://localhost:4000/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
