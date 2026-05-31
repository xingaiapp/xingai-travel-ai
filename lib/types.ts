export type TripStyle = "city" | "beach" | "nature" | "culture"
export type TripPace = "relaxed" | "balanced" | "adventure"
export type Confidence = "high" | "medium" | "low"

export interface TripContext {
  dates: { from: string; to: string; nights: number }
  origin: string
  budget: { amount: number; currency: string }
  travelers: { count: number; type: "solo" | "couple" | "family" | "group" }
  notes?: string
  style: TripStyle[]
  pace: TripPace
  avoid?: string
  locale?: "en" | "zh" | "ko" | "es"
}

export interface Destination {
  name: string
  country: string
  isWinner: boolean
  confidence: Confidence
  whyWins: string[]
  tradeoffs: string[]
  scores: {
    overall: number
    budget: "Great" | "Fair" | "Tight" | string
    weather: string
    flightTime: string
    walkability: string
  }
}

export interface CompareResult {
  winner: string
  confidence: Confidence
  destinations: Destination[]
  whyNotOthers: string
}

export interface ItineraryDay {
  day: number
  title: string
  simple: string
  detailed: string[]
}

export interface BookItem {
  type: "flight" | "hotel" | "activity"
  label: string
  note?: string
}

export interface PlanResult {
  destination: string
  itinerary: ItineraryDay[]
  bookFirst: BookItem[]
  tradeoffNote: string
}
