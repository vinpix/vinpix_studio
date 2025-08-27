import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during production builds (Vercel)
    ignoreDuringBuilds: true,
  },
  images: {
    // Serve images as static files without Next.js Image Optimization
    unoptimized: true,
  },
};

export default nextConfig;
