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
  // Fix sharp module compatibility issue for Vercel deployment
  experimental: {
    // Force Next.js to use the correct sharp binary for the target platform
    externalDir: true,
  },
  // Configure webpack to handle sharp module properly
  webpack: (config, { isServer }) => {
    // Skip sharp module on server-side during build
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        sharp: "commonjs sharp",
      });
    }
    return config;
  },
};

export default nextConfig;
