import { describe, expect, it } from "vitest"
import { prayerSituations } from "@/lib/content/prayer-for-you"
import { staticPageMetaCopy } from "@/lib/seo-page-copy"

/**
 * Guards for /prayer/for-you. Every video id here was verified PUBLIC on the
 * live channel on 2026-10-16 (oEmbed + RSS). Do not add an id that has not
 * been verified public, and never resurrect the blocked ids below.
 */
const BLOCKED_IDS = [
  "RWOX8bR8_uI", // earlier Can't Sleep upload id — no longer public
  "jK80WrHqxqc", // Needs Peace Tonight P1 — scheduled 2026-10-16 23:00 CT, not public at page launch
]

describe("prayer-for-you situations", () => {
  it("has unique situations and unique videos", () => {
    const keys = prayerSituations.map((s) => s.key)
    const ids = prayerSituations.map((s) => s.videoId)
    expect(new Set(keys).size).toBe(keys.length)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it("every situation carries a verse, reference and four-locale heading", () => {
    for (const s of prayerSituations) {
      expect(s.verse.length).toBeGreaterThan(10)
      expect(s.verseRef).toMatch(/\d/)
      for (const locale of ["en", "zh", "ko", "es"] as const) {
        expect(s.heading[locale].length).toBeGreaterThan(0)
      }
      expect(s.videoTitle.length).toBeGreaterThan(0)
    }
  })

  it("never lists blocked or unverified ids", () => {
    for (const s of prayerSituations) {
      expect(BLOCKED_IDS).not.toContain(s.videoId)
    }
  })

  it("has SEO copy for the page in all locales", () => {
    for (const locale of ["en", "zh", "ko", "es"] as const) {
      const copy = staticPageMetaCopy("/prayer/for-you", locale)
      expect(copy?.title.length).toBeGreaterThan(0)
      expect(copy?.description.length).toBeGreaterThan(0)
    }
  })
})
