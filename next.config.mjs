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
  // Next 16 only allows listed qualities — hero uses 95; without this it falls back to 75 (soft).
  images: {
    qualities: [75, 88, 90, 95],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
    imageSizes: [64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // frame-ancestors only — a full script CSP breaks Next hydration.
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
        ],
      },
    ]
  },
  // My Hong Kong Season 1 rebuilt 2026-09-28 (Macau-style EP01–EP02). Old long-form slugs redirect.
  async redirects() {
    const season = "/stories/hong-kong"
    const ep01 = `${season}/01-victoria-harbour-start-with-the-sea`
    const ep02 = `${season}/02-streets-food-and-people`
    return [
      // Foundation / project-init legal slugs → local pages (same pattern as Invest).
      { source: "/legal/privacy", destination: "/privacy", permanent: false },
      { source: "/legal/terms", destination: "/terms", permanent: false },
      { source: "/legal/disclaimer", destination: "/disclaimer", permanent: false },
      { source: `${season}/01-the-hong-kong-i-called-home`, destination: ep01, permanent: true },
      { source: `${season}/02-the-harbor-i-kept-coming-back-to`, destination: ep01, permanent: true },
      { source: `${season}/03-what-i-actually-ate`, destination: ep02, permanent: true },
      { source: `${season}/04-hong-kong-in-motion`, destination: ep01, permanent: true },
      { source: `${season}/05-small-moments-i-didnt-plan`, destination: ep02, permanent: true },
      { source: `${season}/06-hong-kong-with-family`, destination: ep02, permanent: true },
      { source: `${season}/07-what-id-do-again-and-differently`, destination: season, permanent: true },
      { source: `${season}/08-your-hong-kong`, destination: season, permanent: true },
    ]
  },
}

export default nextConfig
