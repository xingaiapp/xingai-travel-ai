import { prayerKeywordMap } from "@/lib/content/prayer-keywords"
import type { PrayerSituation } from "@/lib/content/prayer-for-you"
import type { Locale } from "@/lib/i18n/types"

type L = Record<Locale, string>

/**
 * Pure logic that turns the curated situation list + the channel's public
 * feed into the /prayer/for-you page model. Kept free of fetching so it can
 * be unit-tested with fixture feeds (see tests/prayer-match.test.ts).
 *
 * Rules (set 2026-10-16, Xing's automation request):
 * - Curated cells (lib/content/prayer-for-you.ts) always show first, with
 *   their hand-checked verse — a curated film is never duplicated by a feed
 *   copy of the same video.
 * - New series films are auto-filed into the situation cell their title
 *   matches in lib/content/prayer-keywords.ts (newest first, max 3 videos
 *   per cell, curated film included in the count).
 * - A series film matching no keyword — or overflowing a full cell — goes
 *   to the "Latest prayers" strip, so no episode is ever lost.
 * - Verses are only ever extracted from the film's own description, in the
 *   publish-pack format (quoted text + scripture reference). No match, no
 *   verse line — verses are never invented.
 */

export interface FeedPrayerVideo {
  id: string
  title: string
  /** ISO timestamp from the feed. */
  published: string
  description: string
}

export interface PrayerCellVideo {
  videoId: string
  videoTitle: string
  verse?: string
  verseRef?: string
  /** True for the hand-checked curated entry of the cell. */
  curated: boolean
}

export interface PrayerCellData {
  key: string
  heading: L
  videos: PrayerCellVideo[]
}

export interface PrayerPageData {
  cells: PrayerCellData[]
  /** Series films not filed into any situation cell, newest first. */
  latest: PrayerCellVideo[]
}

export const MAX_VIDEOS_PER_CELL = 3
export const MAX_LATEST_VIDEOS = 12

/**
 * Series membership: the films live under the "A Prayer For You" banner,
 * including the sibling phrasing "A Prayer For When You …" (the 3am film).
 */
export function isPrayerSeriesTitle(title: string): boolean {
  const lower = title.toLowerCase()
  return lower.includes("a prayer for you") || lower.includes("a prayer for when you")
}

/** First matching keyword-map row wins; rows are ordered most-specific first. */
export function matchSituationKey(title: string): string | null {
  const lower = title.toLowerCase()
  for (const rule of prayerKeywordMap) {
    if (rule.keywords.some((keyword) => lower.includes(keyword.toLowerCase()))) {
      return rule.key
    }
  }
  return null
}

const BOOKS =
  "Genesis|Exodus|Leviticus|Numbers|Deuteronomy|Joshua|Judges|Ruth|1 Samuel|2 Samuel|1 Kings|2 Kings|1 Chronicles|2 Chronicles|Ezra|Nehemiah|Esther|Job|Psalms?|Proverbs|Ecclesiastes|Song of Solomon|Isaiah|Jeremiah|Lamentations|Ezekiel|Daniel|Hosea|Joel|Amos|Obadiah|Jonah|Micah|Nahum|Habakkuk|Zephaniah|Haggai|Zechariah|Malachi|Matthew|Mark|Luke|John|Acts|Romans|1 Corinthians|2 Corinthians|Galatians|Ephesians|Philippians|Colossians|1 Thessalonians|2 Thessalonians|1 Timothy|2 Timothy|Titus|Philemon|Hebrews|James|1 Peter|2 Peter|1 John|2 John|3 John|Jude|Revelation"

const VERSE_PATTERN = new RegExp(
  `["“]([^"”]{15,320}?)["”]\\s*(?:—|–|-)\\s*\\(?((?:${BOOKS})\\s+\\d+:\\d+(?:\\s?[–-]\\s?\\d+)?)(?:\\s*\\((KJV)\\))?\\)?` +
    `|["“]([^"”]{15,320}?)["”]\\s*\\(\\s*((?:${BOOKS})\\s+\\d+:\\d+(?:\\s?[–-]\\s?\\d+)?)(?:\\s*\\((KJV)\\))?\\s*\\)`
)

/**
 * Extract the verse from a film description, publish-pack format only:
 * a quoted verse followed by its scripture reference, either
 * `"…" — Book 3:16 (KJV)` or `"…" (Book 3:16)`. Returns null when the
 * description carries no such pair — the page then shows no verse line.
 */
export function extractVerse(description: string): { verse: string; verseRef: string } | null {
  if (!description) return null
  const match = description.match(VERSE_PATTERN)
  if (!match) return null
  const verse = (match[1] ?? match[4] ?? "").trim()
  const ref = (match[2] ?? match[5] ?? "").trim()
  const kjv = match[3] ?? match[6]
  if (!verse || !ref) return null
  return { verse, verseRef: kjv ? `${ref} (KJV)` : ref }
}

function toCellVideo(video: FeedPrayerVideo): PrayerCellVideo {
  const extracted = extractVerse(video.description)
  return {
    videoId: video.id,
    videoTitle: video.title,
    ...(extracted ? { verse: extracted.verse, verseRef: extracted.verseRef } : {}),
    curated: false,
  }
}

export function buildPrayerPageData(curated: PrayerSituation[], feed: FeedPrayerVideo[]): PrayerPageData {
  const curatedIds = new Set(curated.map((s) => s.videoId))
  const cells: PrayerCellData[] = []
  const byKey = new Map<string, PrayerCellData>()

  const ensureCell = (key: string, heading: L): PrayerCellData => {
    const existing = byKey.get(key)
    if (existing) return existing
    const cell: PrayerCellData = { key, heading, videos: [] }
    byKey.set(key, cell)
    cells.push(cell)
    return cell
  }

  // Curated cells first, in curated order, with their hand-checked verses.
  for (const situation of curated) {
    const cell = ensureCell(situation.key, situation.heading)
    cell.videos.push({
      videoId: situation.videoId,
      videoTitle: situation.videoTitle,
      verse: situation.verse,
      verseRef: situation.verseRef,
      curated: true,
    })
  }

  const auto = feed
    .filter((video) => isPrayerSeriesTitle(video.title) && !curatedIds.has(video.id))
    .sort((a, b) => b.published.localeCompare(a.published))

  const latest: PrayerCellVideo[] = []
  for (const video of auto) {
    const key = matchSituationKey(video.title)
    const rule = key ? prayerKeywordMap.find((r) => r.key === key) : undefined
    if (key && rule) {
      const cell = ensureCell(key, rule.heading)
      if (cell.videos.length < MAX_VIDEOS_PER_CELL) {
        cell.videos.push(toCellVideo(video))
        continue
      }
    }
    if (latest.length < MAX_LATEST_VIDEOS) latest.push(toCellVideo(video))
  }

  return { cells, latest }
}
