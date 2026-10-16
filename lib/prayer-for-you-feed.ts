import type { FeedPrayerVideo } from "@/lib/prayer-match"
import { YOUTUBE_CHANNEL_ID } from "@/lib/youtube-latest"

/**
 * Server-side feed reader for /prayer/for-you. The single source of truth is
 * the films themselves: every 30 minutes (ISR) the page re-reads the
 * channel's public uploads feed plus the two prayer playlists' feeds, and
 * lib/prayer-match.ts files each "A Prayer For You" film into its situation
 * cell. Publishing a new episode on YouTube is all it takes for the page to
 * grow — no code or content edit on the site side.
 *
 * Why three feeds: the uploads feed only carries the channel's ~15 newest
 * uploads (about two days at this channel's pace), while each playlist feed
 * carries that playlist's ~15 newest entries — together they keep every
 * recent prayer film in reach. All feeds are public RSS (no API key); any
 * failure resolves to an empty list for that source, and if every source
 * fails the page falls back to the curated static cells alone.
 */

const MY_LORD_HOLY_PLAYLIST_ID = "PLWOzZDBAqYuY"
const WITH_YOU_TONIGHT_PLAYLIST_ID = "PLNX4iFXo0DJY"

const FEED_URLS = [
  `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`,
  `https://www.youtube.com/feeds/videos.xml?playlist_id=${MY_LORD_HOLY_PLAYLIST_ID}`,
  `https://www.youtube.com/feeds/videos.xml?playlist_id=${WITH_YOU_TONIGHT_PLAYLIST_ID}`,
]

function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
}

function firstMatch(source: string, pattern: RegExp): string | null {
  const match = source.match(pattern)
  return match ? match[1] : null
}

function parseFeed(xml: string): FeedPrayerVideo[] {
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? []
  const videos: FeedPrayerVideo[] = []
  for (const entry of entries) {
    const id = firstMatch(entry, /<yt:videoId>([^<]+)<\/yt:videoId>/)
    const title = firstMatch(entry, /<title>([^<]+)<\/title>/)
    if (!id || !title) continue
    const description = firstMatch(entry, /<media:description>([\s\S]*?)<\/media:description>/) ?? ""
    videos.push({
      id,
      title: decodeEntities(title),
      published: firstMatch(entry, /<published>([^<]+)<\/published>/) ?? "",
      description: decodeEntities(description),
    })
  }
  return videos
}

async function fetchFeed(url: string): Promise<FeedPrayerVideo[]> {
  try {
    const response = await fetch(url, {
      next: { revalidate: 1800 },
      headers: { "user-agent": "Mozilla/5.0 (compatible; XingAITravelSite/1.0)" },
    })
    if (!response.ok) return []
    return parseFeed(await response.text())
  } catch {
    return []
  }
}

/** All prayer-feed films, deduplicated by video id (uploads feed wins). */
export async function getPrayerFeedVideos(): Promise<FeedPrayerVideo[]> {
  const feeds = await Promise.all(FEED_URLS.map(fetchFeed))
  const seen = new Set<string>()
  const videos: FeedPrayerVideo[] = []
  for (const feed of feeds) {
    for (const video of feed) {
      if (seen.has(video.id)) continue
      seen.add(video.id)
      videos.push(video)
    }
  }
  return videos
}
