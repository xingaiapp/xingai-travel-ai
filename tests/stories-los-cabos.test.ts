import { existsSync } from "node:fs"
import { describe, expect, it } from "vitest"
import { decideHref, getSeason, publishedEpisodes, seasons } from "@/lib/stories"

/** Chat-compressed covers were ~450–1024px; published stills must stay video-frame resolution. */
const MIN_COVER_W = 1200

describe("los-cabos season", () => {
  it("is registered with 4 published episodes", () => {
    expect(seasons.map((s) => s.slug)).toContain("los-cabos")
    const cabo = getSeason("los-cabos")!
    expect(publishedEpisodes(cabo)).toHaveLength(4)
    expect(decideHref(cabo)).toContain("places=Los+Cabos")
    expect(decideHref(cabo)).toContain("region=latin_america")
  })

  it("ships high-res stills for covers and every photo block", () => {
    const cabo = getSeason("los-cabos")!
    expect(cabo.cover.width).toBeGreaterThanOrEqual(MIN_COVER_W)
    for (const episode of cabo.episodes) {
      expect(episode.cover.width).toBeGreaterThanOrEqual(MIN_COVER_W)
      expect(existsSync(`public${episode.cover.src}-1600.webp`)).toBe(true)
      for (const block of episode.blocks) {
        if (block.type !== "photo" || !block.photo.src) continue
        expect(existsSync(`public${block.photo.src}-1600.webp`)).toBe(true)
        // Logo crop may stay small; body frames stay full-width.
        if (!block.photo.src.includes("velas-10-logo")) {
          expect(block.photo.width).toBeGreaterThanOrEqual(MIN_COVER_W)
        }
      }
    }
  })
})
