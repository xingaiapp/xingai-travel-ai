import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

vi.mock("@vercel/analytics", () => ({
  track: vi.fn(),
}))

function installMemoryLocalStorage() {
  const store = new Map<string, string>()
  const api = {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => {
      store.set(k, String(v))
    },
    removeItem: (k: string) => {
      store.delete(k)
    },
    clear: () => store.clear(),
  }
  vi.stubGlobal("localStorage", api)
  vi.stubGlobal("window", { localStorage: api })
}

import {
  TRAVEL_RETENTION_STORAGE_KEY,
  TRAVEL_USAGE_STORAGE_KEY,
  countTravelActiveDaysLast7,
  loadTravelUsage,
  recordTravelRetention,
} from "@/lib/travel-retention"

describe("travel retention", () => {
  beforeEach(() => {
    installMemoryLocalStorage()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("counts decisions and active days", () => {
    recordTravelRetention("decision")
    recordTravelRetention("save")
    expect(loadTravelUsage().decisionCount).toBe(1)
    expect(loadTravelUsage().saveCount).toBe(1)
    expect(countTravelActiveDaysLast7()).toBe(1)
    expect(localStorage.getItem(TRAVEL_USAGE_STORAGE_KEY)).toBeTruthy()
    expect(localStorage.getItem(TRAVEL_RETENTION_STORAGE_KEY)).toBeTruthy()
  })
})
