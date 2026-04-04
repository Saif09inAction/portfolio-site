import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

/* Pin Turbopack’s root to this app. Otherwise Next may pick another lockfile (e.g. repo root or
 * ~/package-lock.json) and hang on “Compiling / …” while scanning the wrong tree. */
const appRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  /* Static HTML export — reliable on Netlify (and works on Vercel) without the Functions runtime */
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    root: appRoot,
  },
};

export default nextConfig;
