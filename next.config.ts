import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // wagmi connectors don't support React Strict Mode double-invoke
  turbopack: {
    root: __dirname,
    resolveAlias: {
      // Prevent pdfjs from trying to use node-canvas in the browser
      canvas: { browser: "./empty.ts" },
    },
  },
};

export default nextConfig;
