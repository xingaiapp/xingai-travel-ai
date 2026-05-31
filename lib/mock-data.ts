import type { CompareResult, PlanResult, TripContext } from "@/lib/types"

export const defaultTrip: TripContext = {
  dates: { from: "2026-04-12", to: "2026-04-16", nights: 5 },
  origin: "San Francisco (SFO)",
  budget: { amount: 2000, currency: "USD" },
  travelers: { count: 2, type: "couple" },
  notes: "Warm weather, walkable cities, great food, minimal driving.",
  style: ["city"],
  pace: "balanced",
  avoid: "Long flights, extreme heat",
  locale: "en",
}

export const mockCompareResult: CompareResult = {
  winner: "Lisbon, Portugal",
  confidence: "high",
  whyNotOthers:
    "Lisbon has the best balance of April weather, walkability, food, and budget fit; Barcelona is pricier and Porto is rainier.",
  destinations: [
    {
      name: "Lisbon",
      country: "Portugal",
      isWinner: true,
      confidence: "high",
      whyWins: ["Mild April weather", "Walkable neighborhoods", "Fits the budget"],
      tradeoffs: ["Less beach time than Barcelona", "A longer flight than Mexico City"],
      scores: {
        overall: 5,
        budget: "Great",
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
        budget: "Fair",
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
        budget: "Great",
        weather: "Cooler, more rain",
        flightTime: "~11h 55m (1 stop)",
        walkability: "Good",
      },
    },
  ],
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
}
