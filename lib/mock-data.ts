import { normalizeBudget } from "@/lib/budget"
import type { CompareResult, PlanResult, TripContext } from "@/lib/types"

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

/** Default demo window: ~30 days out so the form never ships with past dates. */
export function defaultFutureDates(nights = 4): TripContext["dates"] {
  const from = new Date()
  from.setUTCHours(12, 0, 0, 0)
  from.setUTCDate(from.getUTCDate() + 30)
  const to = new Date(from)
  to.setUTCDate(to.getUTCDate() + nights)
  return { from: isoDate(from), to: isoDate(to), nights }
}

export function isPastDate(value: string, today = new Date()): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return true
  const day = new Date(`${value}T12:00:00Z`)
  const start = new Date(today)
  start.setUTCHours(0, 0, 0, 0)
  return day.getTime() < start.getTime()
}

/** Empty traveler fields — placeholders only in the form. Do not pre-fill wishes/avoid/origin. */
export const defaultTrip: TripContext = {
  dates: defaultFutureDates(4),
  origin: "",
  region: "anywhere",
  budget: { amount: 2000, currency: "USD" },
  travelers: { count: 2, type: "couple" },
  notes: "",
  style: ["city"],
  pace: "balanced",
  avoid: "",
  locale: "en",
}

export const mockCompareResult: CompareResult = {
  winner: "Lisbon, Portugal",
  confidence: "high",
  whyNotOthers:
    "Lisbon has the best balance of April weather, walkability, food, and value; Barcelona is pricier and Porto is rainier.",
  destinations: [
    {
      name: "Lisbon",
      country: "Portugal",
      isWinner: true,
      confidence: "high",
      whyWins: ["Mild April weather", "Walkable neighborhoods", "Good value for food and stays"],
      tradeoffs: ["Less beach time than Barcelona", "A longer flight than Mexico City"],
      scores: {
        overall: 5,
        weather: "Mild, pleasant",
        flightTime: "~11h 40m (1 stop)",
        walkability: "Excellent",
      },
    },
    {
      name: "Barcelona",
      country: "Spain",
      isWinner: false,
      confidence: "medium",
      whyWins: ["Lively food scene", "Great transit", "Easy day trips"],
      tradeoffs: ["Pricier overall", "Busier in April"],
      scores: {
        overall: 4,
        weather: "Warm, some rain",
        flightTime: "~11h 25m (1 stop)",
        walkability: "Good",
      },
    },
    {
      name: "Porto",
      country: "Portugal",
      isWinner: false,
      confidence: "medium",
      whyWins: ["Lower hotel costs", "Compact historic center", "Good food value"],
      tradeoffs: ["Cooler weather", "More rainy days, less variety"],
      scores: {
        overall: 3,
        weather: "Cooler, more rain",
        flightTime: "~11h 55m (1 stop)",
        walkability: "Good",
      },
    },
  ],
}

/** Raw model-shaped estimate for the preview plan; /api/plan re-normalizes it against the real trip. */
export function mockRawBudget() {
  return {
    currency: "USD",
    lines: [
      { category: "flights", low: 1400, high: 1900, note: "2 round-trip economy tickets SFO–LIS, 1 stop" },
      { category: "lodging", low: 600, high: 900, note: "5 nights in Chiado/Baixa at ~$120–180 per night" },
      { category: "food", low: 400, high: 600, note: "~$40–60 per person per day" },
      { category: "activities", low: 150, high: 300, note: "Sintra day trip, a museum or two, fado night" },
      { category: "local_transport", low: 60, high: 120, note: "Metro/tram passes and one airport taxi" },
    ],
  }
}

export const mockPlanResult: PlanResult = {
  destination: "Lisbon, Portugal",
  tradeoffNote:
    "Choose Lisbon if food, walking, and budget predictability matter more than beach time or late-night energy.",
  bookFirst: [
    { type: "flight", label: "SFO → LIS flight", note: "Prioritize 1-stop routes under 13 hours." },
    { type: "hotel", label: "Hotel in Chiado or Baixa", note: "Keeps most days walkable." },
    { type: "activity", label: "Sintra day trip", note: "Book train timing after hotel is set." },
  ],
  itinerary: [
    {
      day: 1,
      title: "Arrive + Chiado walk",
      simple: "Land, check in, take an easy evening walk, and keep dinner near the hotel.",
      detailed: ["Arrive by afternoon if possible", "Metro or rideshare to Chiado/Baixa", "Dinner within 15 minutes on foot"],
    },
    {
      day: 2,
      title: "Alfama + viewpoints",
      simple: "Spend the day in Alfama, viewpoints, and a relaxed seafood dinner.",
      detailed: ["Start early in Alfama", "Use viewpoints as rest stops", "Avoid overloading the evening"],
    },
    {
      day: 3,
      title: "Sintra day",
      simple: "Use this as the one structured day trip, with Pena Palace and old town.",
      detailed: ["Take an early train", "Pena Palace before crowds", "Return before dinner fatigue hits"],
    },
    {
      day: 4,
      title: "Belem + waterfront",
      simple: "Do Belem in the morning, then keep the afternoon flexible.",
      detailed: ["Pasteis de Belem first", "Walk the waterfront", "Optional museum or slow cafe block"],
    },
    {
      day: 5,
      title: "Final meal + fly home",
      simple: "Keep the final morning low-friction and close to your departure route.",
      detailed: ["One final breakfast", "Pack with buffer", "Avoid far cross-town activities"],
    },
  ],
  warnings: [
    {
      type: "weather",
      severity: "info",
      title: "April weather is mild",
      body: "April in Lisbon averages 18–22°C with occasional light rain — bring a light layer and a compact umbrella.",
    },
    {
      type: "security",
      severity: "caution",
      title: "Pickpocket risk in tourist areas",
      body: "Alfama and the 28 tram are known pickpocket hotspots — keep bags in front and avoid back pockets.",
    },
    {
      type: "visa",
      severity: "info",
      title: "US passport — no visa needed",
      body: "US citizens can stay in Portugal (Schengen) up to 90 days without a visa. ETIAS registration may be required from 2025.",
    },
    {
      type: "crowds",
      severity: "caution",
      title: "April is shoulder season",
      body: "Crowds are lighter than summer but Sintra gets busy on weekends — visit Pena Palace on a weekday morning.",
    },
  ],
  budgetEstimate: normalizeBudget(mockRawBudget(), defaultTrip, new Date("2026-04-01T00:00:00Z")),
}
