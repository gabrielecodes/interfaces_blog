import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: isProd ? "/interfaces_blog/" : "",
  basePath: isProd ? "/interfaces_blog" : "",
  output: "export",
};

export default nextConfig;
