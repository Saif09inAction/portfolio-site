import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Static HTML export — reliable on Netlify (and works on Vercel) without the Functions runtime */
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
