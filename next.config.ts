import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Enables `next dev` to resolve Cloudflare bindings when present.
initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  // Fix warning about multiple lockfiles by enforcing project root
  outputFileTracingRoot: process.cwd(),
  // Local dev of the game subdomains: http://floorzero.localhost:3002, http://lastdungeon.localhost:3002
  allowedDevOrigins: ["floorzero.localhost", "lastdungeon.localhost"],
  eslint: {
    // Disable ESLint during production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript errors during production builds
    ignoreBuildErrors: true,
  },
  images: {
    // Serve images as static files without Next.js Image Optimization
    // (also required-friendly for Cloudflare Workers / unoptimized path)
    unoptimized: true,
  },
  experimental: {
    // Force Next.js to use the correct sharp binary for the target platform
    externalDir: true,
  },
  // Configure webpack to handle sharp module properly
  webpack: (config, { isServer, webpack }) => {
    // Skip sharp module on server-side during build
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        sharp: "commonjs sharp",
      });
    } else {
      // @gltf-transform/core imports node:fs / node:path (for its NodeIO).
      // Strip the node: scheme so its browser field ({fs:false, path:false})
      // applies, then stub the bare modules for the client/worker bundles.
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
          /^node:/,
          (resource: { request: string }) => {
            resource.request = resource.request.replace(/^node:/, "");
          }
        )
      );
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    return config;
  },
};

export default nextConfig;
