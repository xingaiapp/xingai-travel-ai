import { hongKong } from "@/lib/stories/hong-kong"
import { macau } from "@/lib/stories/macau"
import type { StoryEpisode, StorySeason, StoryText } from "@/lib/stories/types"
import type { Locale } from "@/lib/i18n/types"

export const seasons: StorySeason[] = [hongKong, macau]

/** Drafts render locally (and on previews with STORIES_SHOW_DRAFTS=1) but 404 in production. */
const showDrafts = process.env.NODE_ENV !== "production" || process.env.STORIES_SHOW_DRAFTS === "1"

export function isVisible(episode: StoryEpisode) {
  return episode.status === "published" || showDrafts
}

export function visibleEpisodes(season: StorySeason) {
  return season.episodes.filter(isVisible)
}

export function visibleSeasons() {
  return seasons.filter((season) => visibleEpisodes(season).length > 0)
}

export function publishedEpisodes(season: StorySeason) {
  return season.episodes.filter((episode) => episode.status === "published")
}

export function getSeason(slug: string) {
  return seasons.find((season) => season.slug === slug)
}

export function getEpisode(season: StorySeason, slug: string) {
  return season.episodes.find((episode) => episode.slug === slug)
}

export function pickText(text: StoryText, locale: Locale) {
  if (locale === "zh" && text.zh) return text.zh
  if (locale === "ko" && text.ko) return text.ko
  if (locale === "es" && text.es) return text.es
  return text.en
}

export function episodeLabel(episode: StoryEpisode) {
  return `EP ${String(episode.number).padStart(2, "0")}`
}

/** Readers leave a story with the destination prefilled, not with Xing's trip copied. */
export function decideHref(season: StorySeason) {
  const params = new URLSearchParams({ places: season.destination, region: season.region })
  return `/decide?${params.toString()}#trip-form`
}

function normalizePlace(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()
}

/**
 * Stories for any destination in a finished comparison, in comparison order.
 * Matching is by name only — stories never feed back into winner, ranking, or confidence (ADR 0006).
 */
export function storiesForDestinations(names: string[]) {
  const wanted = names.map(normalizePlace)
  return visibleSeasons().filter((season) => {
    const place = normalizePlace(season.destination)
    return wanted.some((name) => name === place || name.startsWith(`${place} `) || place.startsWith(`${name} `))
  })
}

export function trackStoryClick(
  type: "story_from_result" | "story_to_decide" | "story_submit_interest",
  season: string
) {
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, season }),
    keepalive: true,
  }).catch(() => {})
}

/** Interest gauge only — not a publish pipeline. No photo upload. */
export function storyInterestMailto(placeHint?: string) {
  const subject = "Travel story interest — XingAI Travel"
  const body = placeHint
    ? `Where I went: ${placeHint}\n\nOne sentence about the trip:\n`
    : "Where I went:\n\nOne sentence about the trip:\n"
  return `mailto:contact@xingai.app?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
