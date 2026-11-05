import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Minimal OpenNext Cloudflare config. API routes are dynamic; static pages
// do not require R2/KV incremental cache for the first CF deploy.
export default defineCloudflareConfig();
