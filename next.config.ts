import type { NextConfig } from "next";

// Vercel runs Next.js natively, so no static export is needed.
// To host somewhere static instead (e.g. Cloudflare Pages), add `output: "export"` and build to /out.
const nextConfig: NextConfig = {
  images: { unoptimized: true },
};

export default nextConfig;
