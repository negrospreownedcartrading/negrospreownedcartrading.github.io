import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages (carxxx.github.io, served from the root)
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
