/**
 * Latest uploads for the @xingaitravel YouTube channel, read server-side from
 * the channel's public uploads feed (the RSS mirror of the uploads playlist
 * UUaexpFXZ7AsVAv3ZZmMzWtw). No API key, no quota; the fetch is ISR-cached so
 * the homepage stays static-fast and the section refreshes itself. Any feed
 * failure resolves to an empty list and the homepage section hides itself —
 * the page must never break because YouTube is unreachable.
 */

export const YOUTUBE_CHANNEL_ID = "UCaexpFXZ7AsVAv3ZZmMzWtw"
export const YOUTUBE_UPLOADS_PLAYLIST_ID = "UUaexpFXZ7AsVAv3ZZmMzWtw"
export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@xingaitravel"
export const YOUTUBE_SUBSCRIBE_URL = `${YOUTUBE_CHANNEL_URL}?sub_confirmation=1`
export const YOUTUBE_UPLOADS_URL = `https://www.youtube.com/playlist?list=${YOUTUBE_UPLOADS_PLAYLIST_ID}`

const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`

export interface LatestVideo {
  id: string
  title: string
  /** Canonical watch URL from the feed (shorts link for Shorts, watch link otherwise). */
  url: string
  published: string
  thumbnail: string
}

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

export async function getLatestVideos(limit = 3): Promise<LatestVideo[]> {
  try {
    const response = await fetch(FEED_URL, {
      next: { revalidate: 1800 },
      headers: { "user-agent": "Mozilla/5.0 (compatible; XingAITravelSite/1.0)" },
    })
    if (!response.ok) return []
    const xml = await response.text()
    const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? []
    const videos: LatestVideo[] = []
    for (const entry of entries) {
      const id = firstMatch(entry, /<yt:videoId>([^<]+)<\/yt:videoId>/)
      const title = firstMatch(entry, /<title>([^<]+)<\/title>/)
      if (!id || !title) continue
      videos.push({
        id,
        title: decodeEntities(title),
        url: firstMatch(entry, /<link rel="alternate" href="([^"]+)"/) ?? `https://www.youtube.com/watch?v=${id}`,
        published: firstMatch(entry, /<published>([^<]+)<\/published>/) ?? "",
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      })
      if (videos.length >= limit) break
    }
    return videos
  } catch {
    return []
  }
}
