import { describe, expect, it } from "vitest"
import { cityOgImage, resolveCityImageSrc, toShareJpeg } from "@/lib/cities/share-image"

describe("resolveCityImageSrc", () => {
  it("keeps Unsplash URLs intact", () => {
    const src = "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1600&q=85&auto=format&fit=crop"
    expect(resolveCityImageSrc(src)).toBe(src)
  })

  it("keeps local files with extensions", () => {
    expect(resolveCityImageSrc("/assets/home-hero-tokyo.webp")).toBe("/assets/home-hero-tokyo.webp")
  })

  it("appends -1600.webp only for story-style bases", () => {
    expect(resolveCityImageSrc("/stories/macau/01/londoner-big-ben")).toBe(
      "/stories/macau/01/londoner-big-ben-1600.webp"
    )
  })
})

describe("toShareJpeg / cityOgImage", () => {
  it("uses first-party JPG for remote heroes", () => {
    expect(
      cityOgImage("https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1600&q=85&auto=format&fit=crop")
    ).toBe("/assets/og-travel-decision-2400.jpg")
  })

  it("maps local webp heroes to /assets/og/*.jpg", () => {
    expect(cityOgImage("/assets/home-hero-hong-kong.webp")).toBe("/assets/og/assets-home-hero-hong-kong.jpg")
    expect(toShareJpeg("/stories/hong-kong/01/harbour-promenade-skyline")).toBe(
      "/assets/og/stories-hong-kong-01-harbour-promenade-skyline-1600.jpg"
    )
  })

  it("keeps existing jpeg paths", () => {
    expect(toShareJpeg("/assets/og-travel-decision-2400.jpg")).toBe("/assets/og-travel-decision-2400.jpg")
  })
})
