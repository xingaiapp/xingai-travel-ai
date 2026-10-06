import type { MetadataRoute } from "next"
import { cities } from "@/lib/cities"
import { compares, guides } from "@/lib/content"
import {
  hreflangPaths,
  localizedPublicHref,
  PUBLIC_LOCALES,
} from "@/lib/public-locale"
import { publishedEpisodes, seasons } from "@/lib/stories"

const SITE = "https://travel.xingai.app"

function localizedEntries(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  lastModified?: Date
): MetadataRoute.Sitemap {
  const languages: Record<string, string> = {}
  for (const [code, href] of Object.entries(hreflangPaths(path))) {
    languages[code] = `${SITE}${href}`
  }
  return PUBLIC_LOCALES.map((locale) => ({
    url: `${SITE}${localizedPublicHref(locale, path)}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages },
  }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  // /result and /trips are excluded: session/local state, not crawlable
  const staticPages = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/decide", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/how-it-works", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/faq", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/privacy", priority: 0.5, changeFrequency: "weekly" as const },
    { path: "/terms", priority: 0.5, changeFrequency: "weekly" as const },
    { path: "/disclaimer", priority: 0.5, changeFrequency: "weekly" as const },
    { path: "/affiliate-disclosure", priority: 0.5, changeFrequency: "weekly" as const },
    { path: "/city", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/compare", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/guides", priority: 0.85, changeFrequency: "weekly" as const },
  ]

  const entries: MetadataRoute.Sitemap = staticPages.flatMap((page) =>
    localizedEntries(page.path, page.priority, page.changeFrequency)
  )

  for (const city of cities) {
    entries.push(...localizedEntries(`/city/${city.slug}`, 0.8, "monthly"))
  }
  for (const item of compares) {
    entries.push(...localizedEntries(`/compare/${item.slug}`, 0.85, "monthly"))
  }
  for (const item of guides) {
    entries.push(...localizedEntries(`/guides/${item.slug}`, 0.85, "monthly"))
  }

  const storySeasons = seasons.filter((season) => publishedEpisodes(season).length > 0)
  if (storySeasons.length > 0) {
    entries.push(...localizedEntries("/stories", 0.7, "weekly"))
    for (const season of storySeasons) {
      entries.push(...localizedEntries(`/stories/${season.slug}`, 0.8, "weekly"))
      for (const episode of publishedEpisodes(season)) {
        entries.push(
          ...localizedEntries(
            `/stories/${season.slug}/${episode.slug}`,
            0.7,
            "monthly",
            episode.publishedAt ? new Date(episode.publishedAt) : undefined
          )
        )
      }
    }
  }

  return entries
}
