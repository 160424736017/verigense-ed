import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicitly set the root directory to avoid warnings about multiple lockfiles
  turbopack: {
    root: ".",
  },
};

export default nextConfig;