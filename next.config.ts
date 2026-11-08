import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    // Static export has no image optimization server; serve assets as-is.
    unoptimized: true,
  },
};

export default nextConfig;
