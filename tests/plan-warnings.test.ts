import { describe, expect, it } from "vitest"
import { neutralizeNationalityClaims } from "@/lib/plan-warnings"
import type { TripWarning } from "@/lib/types"

const weather: TripWarning = {
  type: "weather",
  severity: "info",
  title: "Pleasant weather expected",
  body: "November is usually mild.",
}

describe("neutralizeNationalityClaims", () => {
  it("replaces a nationality-specific visa claim with a neutral note in the user's language", () => {
    const out = neutralizeNationalityClaims(
      [
        weather,
        {
          type: "visa",
          severity: "info",
          title: "Visa-Free Entry for US Citizens",
          body: "US citizens can enter Taiwan visa-free for up to 90 days.",
        },
      ],
      "zh"
    )
    expect(out?.[0]).toEqual(weather)
    expect(out?.[1]).toMatchObject({ type: "visa", severity: "info", title: "核实入境规定" })
    expect(out?.[1].body).not.toMatch(/US|美国/)
  })

  it("catches the claim in other languages too", () => {
    for (const body of ["美国公民可免签入境 90 天。", "미국 시민권자는 90일 무비자입니다.", "Los ciudadanos estadounidenses no necesitan visa."]) {
      const out = neutralizeNationalityClaims([{ type: "visa", severity: "info", title: "Visa", body }], "en")
      expect(out?.[0].title).toBe("Check entry rules")
    }
  })

  it("leaves neutral visa guidance and missing warnings alone", () => {
    const neutral: TripWarning = {
      type: "visa",
      severity: "info",
      title: "Check entry rules",
      body: "Entry rules depend on your nationality; check the official site.",
    }
    expect(neutralizeNationalityClaims([neutral])).toEqual([neutral])
    expect(neutralizeNationalityClaims(undefined)).toBeUndefined()
  })
})
