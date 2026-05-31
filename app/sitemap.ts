import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://travel.xingai.app"
  const pages = ["decide", "result", "privacy", "terms", "disclaimer", "affiliate-disclosure"]
  return [
    ...pages.map((page) => ({
      url: `${base}/${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "decide" ? 1 : page === "result" ? 0.8 : 0.5,
    })),
  ]
}
