import { existsSync } from "node:fs"
import { describe, expect, it } from "vitest"
import { decideHref, getSeason, publishedEpisodes, seasons } from "@/lib/stories"

describe("los-cabos season", () => {
  it("is registered with 4 published episodes", () => {
    expect(seasons.map((s) => s.slug)).toContain("los-cabos")
    const cabo = getSeason("los-cabos")!
    expect(publishedEpisodes(cabo)).toHaveLength(4)
    expect(decideHref(cabo)).toContain("places=Los+Cabos")
    expect(decideHref(cabo)).toContain("region=latin_america")
  })

  it("ships processed stills for every photo block", () => {
    const cabo = getSeason("los-cabos")!
    for (const episode of cabo.episodes) {
      expect(existsSync(`public${episode.cover.src}-1600.webp`)).toBe(true)
      for (const block of episode.blocks) {
        if (block.type !== "photo" || !block.photo.src) continue
        expect(existsSync(`public${block.photo.src}-1600.webp`)).toBe(true)
      }
    }
  })
})
