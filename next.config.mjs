import path from "node:path"
import { fileURLToPath } from "node:url"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // This repo sits inside a workspace that also has a package-lock.json.
  // Without an explicit root, Turbopack compiles the parent folder and dev hangs.
  turbopack: {
    root: path.dirname(fileURLToPath(import.meta.url)),
  },
}

export default nextConfig
