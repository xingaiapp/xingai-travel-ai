import type { MetadataRoute } from "next"
import { cities } from "@/lib/cities"
import { publishedEpisodes, seasons } from "@/lib/stories"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://travel.xingai.app"
  // /result is excluded: it's dynamic sessionStorage content, not crawlable
  const pages = ["decide", "privacy", "terms", "disclaimer", "affiliate-disclosure"]
  // Draft stories are never listed; a season appears once it has a published episode.
  const stories = seasons.flatMap((season) => {
    const episodes = publishedEpisodes(season)
    if (episodes.length === 0) return []
    return [
      { url: `${base}/stories/${season.slug}`, changeFrequency: "weekly" as const, priority: 0.8 },
      ...episodes.map((episode) => ({
        url: `${base}/stories/${season.slug}/${episode.slug}`,
        lastModified: episode.publishedAt ? new Date(episode.publishedAt) : undefined,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ]
  })
  const storiesIndex = stories.length > 0 ? [{ url: `${base}/stories`, changeFrequency: "weekly" as const, priority: 0.7 }] : []
  const cityPages = cities.map((city) => ({
    url: `${base}/city/${city.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))
  return [
    ...cityPages,
    ...storiesIndex,
    ...stories,
    ...pages.map((page) => ({
      url: `${base}/${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "decide" ? 1 : 0.5,
    })),
  ]
}
