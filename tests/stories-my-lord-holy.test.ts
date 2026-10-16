import { existsSync } from "node:fs"
import { describe, expect, it } from "vitest"
import { decideHref, getSeason, publishedEpisodes, seasons, storiesForDestinations } from "@/lib/stories"

/**
 * Covers here are stills pulled from the Faith Shorts themselves (576–1080px wide),
 * not hi-res photos — so the los-cabos 1200px floor does not apply. The guard below
 * still keeps chat-compressed thumbnails out and proves the processed files exist.
 */
const MIN_FRAME_W = 500

const EXPECTED_YOUTUBE: Record<string, string[]> = {
  "01-niagara-falls": ["LjFRkfgBtxM", "c-S1kFGD0c0"],
  "02-hong-kong-harbour-night": ["g2hUROL-9y4"],
  "03-highland-lakes-camp": ["3mc7JCtYaUY"],
  "04-cabo-san-lucas-sunrise": ["vUQxUD6Lr0k"],
}

describe("my-lord-holy season", () => {
  it("is registered as a cross-place season with 4 published episodes", () => {
    expect(seasons.map((s) => s.slug)).toContain("my-lord-holy")
    const season = getSeason("my-lord-holy")!
    expect(season.destination).toBeUndefined()
    expect(season.region).toBe("anywhere")
    expect(season.episodes).toHaveLength(4)
    expect(season.episodes.every((episode) => episode.status === "published")).toBe(true)
    expect(publishedEpisodes(season)).toHaveLength(4)
  })

  it("never matches a destination and its decide link carries no place", () => {
    const season = getSeason("my-lord-holy")!
    expect(storiesForDestinations(["Hong Kong", "Niagara Falls", "Texas"])).not.toContain(season)
    expect(decideHref(season)).toContain("region=anywhere")
    expect(decideHref(season)).not.toContain("places=")
  })

  it("embeds exactly the expected YouTube Shorts in each episode", () => {
    const season = getSeason("my-lord-holy")!
    for (const episode of season.episodes) {
      const embeds = episode.blocks.filter((block) => block.type === "youtube")
      expect(embeds.map((block) => (block.type === "youtube" ? block.youtubeId : undefined))).toEqual(
        EXPECTED_YOUTUBE[episode.slug],
      )
    }
  })

  it("ships processed stills for the season and episode covers", () => {
    const season = getSeason("my-lord-holy")!
    expect(season.cover.width).toBeGreaterThanOrEqual(MIN_FRAME_W)
    expect(existsSync(`public${season.cover.src}-1600.webp`)).toBe(true)
    for (const episode of season.episodes) {
      expect(episode.cover.width).toBeGreaterThanOrEqual(MIN_FRAME_W)
      expect(existsSync(`public${episode.cover.src}-1600.webp`)).toBe(true)
    }
  })
})
