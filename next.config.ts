import type { NextConfig } from "next";

// const isProd = process.env.NODE_ENV === "production";
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: "/interfaces_blog/",
  basePath: "/interfaces_blog",
  output: "export",
};

export default nextConfig;
