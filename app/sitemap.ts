import type { MetadataRoute } from "next"
import { cities } from "@/lib/cities"
import { compares, guides } from "@/lib/content"
import {
  CITY_CONTENT_DATE,
  COMPARE_CONTENT_DATE,
  GUIDE_CONTENT_DATE,
  SHELL_CONTENT_DATE,
  STORIES_INDEX_DATE,
} from "@/lib/content-dates"
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
    { path: "/", priority: 1, changeFrequency: "weekly" as const, lastModified: SHELL_CONTENT_DATE },
    { path: "/decide", priority: 0.9, changeFrequency: "weekly" as const, lastModified: SHELL_CONTENT_DATE },
    { path: "/how-it-works", priority: 0.8, changeFrequency: "weekly" as const, lastModified: SHELL_CONTENT_DATE },
    { path: "/faq", priority: 0.8, changeFrequency: "weekly" as const, lastModified: SHELL_CONTENT_DATE },
    { path: "/prayer", priority: 0.8, changeFrequency: "weekly" as const, lastModified: SHELL_CONTENT_DATE },
    { path: "/prayer/for-you", priority: 0.8, changeFrequency: "weekly" as const, lastModified: SHELL_CONTENT_DATE },
    { path: "/privacy", priority: 0.5, changeFrequency: "weekly" as const, lastModified: SHELL_CONTENT_DATE },
    { path: "/terms", priority: 0.5, changeFrequency: "weekly" as const, lastModified: SHELL_CONTENT_DATE },
    { path: "/disclaimer", priority: 0.5, changeFrequency: "weekly" as const, lastModified: SHELL_CONTENT_DATE },
    { path: "/affiliate-disclosure", priority: 0.5, changeFrequency: "weekly" as const, lastModified: SHELL_CONTENT_DATE },
    { path: "/city", priority: 0.85, changeFrequency: "weekly" as const, lastModified: CITY_CONTENT_DATE },
    { path: "/compare", priority: 0.85, changeFrequency: "weekly" as const, lastModified: COMPARE_CONTENT_DATE },
    { path: "/guides", priority: 0.85, changeFrequency: "weekly" as const, lastModified: GUIDE_CONTENT_DATE },
  ]

  const entries: MetadataRoute.Sitemap = staticPages.flatMap((page) =>
    localizedEntries(page.path, page.priority, page.changeFrequency, page.lastModified)
  )

  for (const city of cities) {
    entries.push(...localizedEntries(`/city/${city.slug}`, 0.8, "monthly", CITY_CONTENT_DATE))
  }
  for (const item of compares) {
    entries.push(...localizedEntries(`/compare/${item.slug}`, 0.85, "monthly", COMPARE_CONTENT_DATE))
  }
  for (const item of guides) {
    entries.push(...localizedEntries(`/guides/${item.slug}`, 0.85, "monthly", GUIDE_CONTENT_DATE))
  }

  const storySeasons = seasons.filter((season) => publishedEpisodes(season).length > 0)
  if (storySeasons.length > 0) {
    entries.push(...localizedEntries("/stories", 0.7, "weekly", STORIES_INDEX_DATE))
    for (const season of storySeasons) {
      const seasonDate = publishedEpisodes(season)
        .map((ep) => (ep.publishedAt ? new Date(ep.publishedAt).getTime() : 0))
        .reduce((max, t) => Math.max(max, t), STORIES_INDEX_DATE.getTime())
      entries.push(
        ...localizedEntries(`/stories/${season.slug}`, 0.8, "weekly", new Date(seasonDate))
      )
      for (const episode of publishedEpisodes(season)) {
        entries.push(
          ...localizedEntries(
            `/stories/${season.slug}/${episode.slug}`,
            0.7,
            "monthly",
            episode.publishedAt ? new Date(episode.publishedAt) : STORIES_INDEX_DATE
          )
        )
      }
    }
  }

  return entries
}
