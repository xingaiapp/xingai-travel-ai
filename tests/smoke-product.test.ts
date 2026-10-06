import { describe, expect, it } from "vitest"
import { buildCityDirectorySearch, parseIntent, parseRegion } from "@/lib/cities/filters"
import { decideCompareFormIssue } from "@/lib/decide-validate"
import { getCompare } from "@/lib/content/compares"
import { getCity } from "@/lib/cities"

describe("decideCompareFormIssue", () => {
  it("flags empty origin, past dates, and reversed range", () => {
    expect(decideCompareFormIssue({ origin: "", from: "2099-01-01", to: "2099-01-05" })).toBe("origin")
    expect(decideCompareFormIssue({ origin: "CHI", from: "2020-01-01", to: "2020-01-05" })).toBe("dates_past")
    expect(decideCompareFormIssue({ origin: "CHI", from: "2099-01-10", to: "2099-01-05" })).toBe("dates_order")
    expect(decideCompareFormIssue({ origin: "CHI", from: "2099-01-01", to: "2099-01-05" })).toBeNull()
  })
})

describe("city directory ?q=", () => {
  it("builds and parses filter query strings", () => {
    expect(buildCityDirectorySearch("asia", "food", "Kyoto")).toBe("region=asia&intent=food&q=Kyoto")
    expect(buildCityDirectorySearch("all", "all", "")).toBe("")
    expect(parseRegion("americas")).toBe("americas")
    expect(parseRegion("mars")).toBe("all")
    expect(parseIntent("beach")).toBe("beach")
    expect(parseIntent("nope")).toBe("all")
  })
})

describe("new Orleans live guide + compare pickWhen", () => {
  it("registers New Orleans as a live city with routes", () => {
    const city = getCity("new-orleans")
    expect(city).toBeTruthy()
    expect(city!.places.length).toBeGreaterThanOrEqual(15)
    expect(city!.routes.length).toBe(3)
  })

  it("ships pickWhen on compares including the new Americas pair", () => {
    const tokyoSeoul = getCompare("tokyo-vs-seoul")
    expect(tokyoSeoul?.pickWhenA.length).toBeGreaterThan(0)
    expect(tokyoSeoul?.pickWhenB.length).toBeGreaterThan(0)
    const nola = getCompare("new-orleans-vs-los-cabos")
    expect(nola?.relatedCitySlugs).toContain("new-orleans")
    expect(nola?.pickWhenA[0].en).toMatch(/Creole|Cajun|music/i)
  })
})

describe("404 document title", () => {
  it("exports Page not found metadata", async () => {
    const mod = await import("@/app/not-found")
    expect(mod.metadata.title).toBe("Page not found")
  })
})
