import { describe, expect, it } from "vitest"
import { inspireViolations } from "@/lib/inspire-validate"
import type { CompareResult } from "@/lib/types"

const d = (name: string, flightHours: number | undefined, isWinner = false) => ({ name, isWinner, flightHours })
const result = (destinations: ReturnType<typeof d>[], winner = "A") => ({ winner, destinations }) as unknown as CompareResult

describe("inspireViolations", () => {
  it("accepts three in-range destinations with a matching winner", () => {
    expect(inspireViolations(result([d("A", 3, true), d("B", 4), d("C", 4.5)]), "short")).toEqual([])
  })

  it("flags count, flight range, missing hours, and winner mismatch", () => {
    const problems = inspireViolations(result([d("A", 3), d("B", 12)], "Z"), "short")
    expect(problems).toHaveLength(3)
    expect(problems.join(" ")).toMatch(/exactly 3/)
    expect(problems.join(" ")).toMatch(/B is ~12h/)
    expect(problems.join(" ")).toMatch(/winner/)
    expect(inspireViolations(result([d("A", undefined, true), d("B", 2), d("C", 2)]), "medium")[0]).toMatch(/missing a numeric/)
  })

  it("lets long-haul trips through", () => {
    expect(inspireViolations(result([d("A", 20, true), d("B", 15), d("C", 30)]), "long")).toEqual([])
  })
})
