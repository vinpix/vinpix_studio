import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fix warning about multiple lockfiles by enforcing project root
  outputFileTracingRoot: process.cwd(),
  eslint: {
    // Disable ESLint during production builds (Vercel)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript errors during production builds (Vercel)
    ignoreBuildErrors: true,
  },
  images: {
    // Serve images as static files without Next.js Image Optimization
    unoptimized: true,
  },
};

export default nextConfig;
