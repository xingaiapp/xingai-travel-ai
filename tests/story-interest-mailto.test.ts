import { describe, expect, it } from "vitest"
import { storyInterestMailto } from "@/lib/stories"

describe("storyInterestMailto", () => {
  it("localizes subject and body", () => {
    const en = decodeURIComponent(storyInterestMailto("Hong Kong", "en"))
    expect(en).toContain("Travel story interest")
    expect(en).toContain("Where I went: Hong Kong")

    const zh = decodeURIComponent(storyInterestMailto("香港", "zh"))
    expect(zh).toContain("旅行故事意向")
    expect(zh).toContain("我去过的地方：香港")

    const ko = decodeURIComponent(storyInterestMailto("홍콩", "ko"))
    expect(ko).toContain("여행 이야기 관심")
    expect(ko).toContain("다녀온 곳: 홍콩")

    const es = decodeURIComponent(storyInterestMailto("Hong Kong", "es"))
    expect(es).toContain("Interés en historia de viaje")
    expect(es).toContain("Dónde fui: Hong Kong")
  })
})
