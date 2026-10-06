import { describe, expect, it } from "vitest"
import {
  alternatesFor,
  hreflangPaths,
  isIndexablePublicPath,
  localizedPublicHref,
  stripLocalePrefix,
} from "@/lib/public-locale"

describe("public-locale", () => {
  it("strips zh/ko/es prefixes and leaves English bare", () => {
    expect(stripLocalePrefix("/zh/city/tokyo")).toEqual({ locale: "zh", path: "/city/tokyo" })
    expect(stripLocalePrefix("/ko")).toEqual({ locale: "ko", path: "/" })
    expect(stripLocalePrefix("/es/decide")).toEqual({ locale: "es", path: "/decide" })
    expect(stripLocalePrefix("/decide")).toEqual({ locale: "en", path: "/decide" })
  })

  it("marks session paths non-indexable", () => {
    expect(isIndexablePublicPath("/result")).toBe(false)
    expect(isIndexablePublicPath("/trips")).toBe(false)
    expect(isIndexablePublicPath("/s")).toBe(false)
    expect(isIndexablePublicPath("/city/tokyo")).toBe(true)
  })

  it("prefixes only indexable paths", () => {
    expect(localizedPublicHref("zh", "/")).toBe("/zh")
    expect(localizedPublicHref("ko", "/decide")).toBe("/ko/decide")
    expect(localizedPublicHref("es", "/result")).toBe("/result")
    expect(localizedPublicHref("en", "/city")).toBe("/city")
  })

  it("emits matching hreflang and canonical sets", () => {
    expect(hreflangPaths("/decide")).toEqual({
      en: "/decide",
      "zh-CN": "/zh/decide",
      ko: "/ko/decide",
      es: "/es/decide",
      "x-default": "/decide",
    })
    const alt = alternatesFor("https://travel.xingai.app", "/decide", "zh")
    expect(alt.canonical).toBe("https://travel.xingai.app/zh/decide")
    expect(alt.languages["zh-CN"]).toBe("https://travel.xingai.app/zh/decide")
    expect(alt.languages.en).toBe("https://travel.xingai.app/decide")
    expect(alt.languages["x-default"]).toBe("https://travel.xingai.app/decide")
  })
})
