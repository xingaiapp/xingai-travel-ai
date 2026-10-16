import { existsSync } from "node:fs"
import { describe, expect, it } from "vitest"
import { decideHref, getSeason, publishedEpisodes, seasons, storiesForDestinations } from "@/lib/stories"

/**
 * Covers here are stills pulled from Xing's own published Niagara footage
 * (720–1080px wide), not hi-res photos — so the los-cabos 1200px floor does
 * not apply. The guard keeps chat-compressed thumbnails out and proves the
 * processed files exist. (Same reasoning as stories-my-lord-holy.test.ts.)
 */
const MIN_FRAME_W = 500

const EXPECTED_YOUTUBE: Record<string, string[]> = {
  "01-sailing-into-the-mist": ["-FzIBdK7eEI"],
  "02-niagara-from-above": ["toHq-jrLP1g"],
  "03-the-horseshoe-up-close": ["LjFRkfgBtxM"],
  "04-standing-at-the-foot": ["c-S1kFGD0c0"],
}

/** Uploads that must never appear in this season: the deleted denoised cut
 * (Xing ordered it deleted 2026-10-11) and any unlisted/held material. */
const BANNED_YOUTUBE = ["i0L4xjulORs"]

describe("niagara-falls season", () => {
  it("is registered with 4 published episodes", () => {
    expect(seasons.map((s) => s.slug)).toContain("niagara-falls")
    const season = getSeason("niagara-falls")!
    expect(season.destination).toBe("Niagara Falls")
    expect(season.region).toBe("north_america")
    expect(publishedEpisodes(season)).toHaveLength(4)
    expect(decideHref(season)).toContain("places=Niagara+Falls")
    expect(decideHref(season)).toContain("region=north_america")
  })

  it("matches its destination for related-story lookups", () => {
    const season = getSeason("niagara-falls")!
    expect(storiesForDestinations(["Niagara Falls"])).toContain(season)
  })

  it("embeds exactly the expected published films in each episode", () => {
    const season = getSeason("niagara-falls")!
    for (const episode of season.episodes) {
      const embeds = episode.blocks.filter((block) => block.type === "youtube")
      expect(embeds.map((block) => (block.type === "youtube" ? block.youtubeId : undefined))).toEqual(
        EXPECTED_YOUTUBE[episode.slug],
      )
      for (const embed of embeds) {
        if (embed.type === "youtube") expect(BANNED_YOUTUBE).not.toContain(embed.youtubeId)
      }
    }
  })

  it("ships processed stills for the season and episode covers", () => {
    const season = getSeason("niagara-falls")!
    expect(season.cover.width).toBeGreaterThanOrEqual(MIN_FRAME_W)
    expect(existsSync(`public${season.cover.src}-1600.webp`)).toBe(true)
    for (const episode of season.episodes) {
      expect(episode.cover.width).toBeGreaterThanOrEqual(MIN_FRAME_W)
      expect(existsSync(`public${episode.cover.src}-1600.webp`)).toBe(true)
    }
  })
})
