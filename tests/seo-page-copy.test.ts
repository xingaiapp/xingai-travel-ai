import { describe, expect, it } from "vitest"
import { cityGuideMeta, schemaInLanguage, staticPageMetaCopy } from "@/lib/seo-page-copy"

describe("seo-page-copy", () => {
  it("localizes static decide meta", () => {
    expect(staticPageMetaCopy("/decide", "zh")?.title).toContain("决定")
    expect(staticPageMetaCopy("/decide", "ko")?.title).toMatch(/결정|여행/)
    expect(staticPageMetaCopy("/decide", "es")?.title).toMatch(/Decide tu viaje/)
    expect(staticPageMetaCopy("/decide", "en")?.title).toMatch(/Decide your trip/)
  })

  it("localizes city guide titles", () => {
    expect(cityGuideMeta("东京", 20, 3, "zh").title).toBe("第一次来东京？")
    expect(cityGuideMeta("Tokyo", 20, 3, "en").title).toBe("First time in Tokyo?")
    expect(schemaInLanguage("zh")).toBe("zh-CN")
  })
})
