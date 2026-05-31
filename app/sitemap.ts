import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://travel.xingai.app"
  // /result is excluded: it's dynamic sessionStorage content, not crawlable
  const pages = ["decide", "privacy", "terms", "disclaimer", "affiliate-disclosure"]
  return [
    ...pages.map((page) => ({
      url: `${base}/${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "decide" ? 1 : 0.5,
    })),
  ]
}
