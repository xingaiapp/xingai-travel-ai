import type { TripContext } from "@/lib/types"

function responseLanguage(locale?: TripContext["locale"]) {
  if (locale === "zh") return "Simplified Chinese"
  if (locale === "ko") return "Korean"
  if (locale === "es") return "Spanish"
  return "English"
}

export function buildComparePrompt(ctx: TripContext): string {
  return `
You are a travel decision advisor. Given the trip constraints below, recommend exactly 3 destinations.
Return JSON only. Respond in ${responseLanguage(ctx.locale)}.

Trip context:
- Dates: ${ctx.dates.from} to ${ctx.dates.to} (${ctx.dates.nights} nights)
- Origin: ${ctx.origin}
- Budget: ${ctx.budget.amount} ${ctx.budget.currency} total
- Travelers: ${ctx.travelers.count} ${ctx.travelers.type}
- Style preference: ${ctx.style.join(", ")}
- Pace: ${ctx.pace}
- Notes: ${ctx.notes || "none"}
- Avoid: ${ctx.avoid || "none"}

Return this exact JSON structure:
{
  "winner": "destination name",
  "confidence": "high|medium|low",
  "destinations": [
    {
      "name": "City",
      "country": "Country",
      "isWinner": true,
      "confidence": "high|medium|low",
      "whyWins": ["reason 1", "reason 2", "reason 3"],
      "tradeoffs": ["tradeoff 1", "tradeoff 2"],
      "scores": {
        "overall": 5,
        "budget": "Great",
        "weather": "Mild, pleasant",
        "flightTime": "~11h (1 stop)",
        "walkability": "Excellent"
      }
    }
  ],
  "whyNotOthers": "one sentence explaining why the winner beats the other two"
}

Be honest about trade-offs. Do not recommend a destination that does not fit the budget.
`.trim()
}

export function buildPlanPrompt(destination: string, ctx: TripContext): string {
  return `
You are a travel planning advisor. Create a bookable plan for ${destination}.
Return JSON only. Respond in ${responseLanguage(ctx.locale)}.

Trip context:
- Dates: ${ctx.dates.from} to ${ctx.dates.to} (${ctx.dates.nights} nights)
- Origin: ${ctx.origin}
- Budget: ${ctx.budget.amount} ${ctx.budget.currency} total
- Travelers: ${ctx.travelers.count} ${ctx.travelers.type}
- Style preference: ${ctx.style.join(", ")}
- Pace: ${ctx.pace}
- Notes: ${ctx.notes || "none"}
- Avoid: ${ctx.avoid || "none"}

Return:
{
  "destination": "${destination}",
  "tradeoffNote": "one honest trade-off note",
  "bookFirst": [
    { "type": "flight", "label": "item", "note": "why it matters" },
    { "type": "hotel", "label": "item", "note": "why it matters" },
    { "type": "activity", "label": "item", "note": "why it matters" }
  ],
  "itinerary": [
    { "day": 1, "title": "title", "simple": "one sentence", "detailed": ["step 1", "step 2", "step 3"] }
  ]
}
`.trim()
}
