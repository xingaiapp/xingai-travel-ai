import type { MetadataRoute } from "next"
import { cities } from "@/lib/cities"
import { compares, guides } from "@/lib/content"
import { publishedEpisodes, seasons } from "@/lib/stories"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://travel.xingai.app"
  // /result is excluded: it's dynamic sessionStorage content, not crawlable
  const pages = ["decide", "how-it-works", "faq", "privacy", "terms", "disclaimer", "affiliate-disclosure"]
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
  const comparePages = [
    { url: `${base}/compare`, changeFrequency: "weekly" as const, priority: 0.85 },
    ...compares.map((item) => ({
      url: `${base}/compare/${item.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ]
  const guidePages = [
    { url: `${base}/guides`, changeFrequency: "weekly" as const, priority: 0.85 },
    ...guides.map((item) => ({
      url: `${base}/guides/${item.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ]
  return [
    { url: base, changeFrequency: "weekly" as const, priority: 1 },
    ...cityPages,
    ...comparePages,
    ...guidePages,
    ...storiesIndex,
    ...stories,
    ...pages.map((page) => ({
      url: `${base}/${page}`,
      changeFrequency: "weekly" as const,
      priority: page === "decide" ? 0.9 : page === "how-it-works" || page === "faq" ? 0.8 : 0.5,
    })),
  ]
}
