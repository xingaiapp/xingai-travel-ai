import type { InspireContext, TripContext } from "@/lib/types"

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

Return this exact JSON:
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
  ],
  "warnings": [
    {
      "type": "weather|security|visa|crowds|health",
      "severity": "info|caution|warning",
      "title": "short title (4-6 words)",
      "body": "one honest, practical sentence the traveler should know before booking"
    }
  ]
}

For warnings:
- severity "warning" = something that could seriously affect the trip (active travel advisories, dangerous weather season, complex visa requirements)
- severity "caution" = something worth knowing but manageable (pickpocket risk, rainy season, crowds)
- severity "info" = useful background (visa-on-arrival available, typhoon season ends in October)
- Include 2-4 warnings covering weather, security, visa/entry, and crowd conditions for the specific travel dates
- Be factual, not alarmist. If the destination is genuinely safe and easy, use "info" level
- Base warnings on the specific travel dates, not generic year-round conditions
`.trim()
}

// Inspire Me — for users who have no destination idea
export function buildInspirePrompt(ctx: InspireContext): string {
  const lang = responseLanguage(ctx.locale)
  const flightLabel =
    ctx.flightRange === "short" ? "under 4 hours" :
    ctx.flightRange === "medium" ? "4–9 hours" :
    "9+ hours (long-haul welcome)"
  const originNote = ctx.origin ? `Origin: ${ctx.origin}` : "Origin: not specified"
  const dateNote = ctx.dates
    ? `Travel window: ${ctx.dates.from} to ${ctx.dates.to} (${ctx.dates.nights} nights)`
    : "Dates: flexible"

  return `
You are a travel inspiration advisor. The user has no specific destination in mind and wants to discover somewhere new.
Recommend exactly 3 destinations they may not have considered, based on their mood and preferences.
Return JSON only. Respond in ${lang}.

User preferences:
- Vibe: ${ctx.vibe} (recharge = slow/relaxing, explore = new discovery, culture = deep history/arts, adventure = active/outdoors)
- Max flight range: ${flightLabel}
- Top priority: ${ctx.priority}
- Budget: ${ctx.budget.amount} ${ctx.budget.currency} total
- Travelers: ${ctx.travelers.count} ${ctx.travelers.type}
- ${originNote}
- ${dateNote}

Rules:
- Match the vibe honestly — not just the most popular cities
- Include at least one lesser-known gem if vibe is "explore" or "adventure"
- If a destination is slightly over budget, flag it honestly in tradeoffs
- Avoid repeating same country unless strongly justified
- whyWins should explain why this place specifically matches the vibe and priority

Return this exact JSON:
{
  "winner": "destination name",
  "confidence": "high|medium|low",
  "inspireMode": true,
  "destinations": [
    {
      "name": "City",
      "country": "Country",
      "isWinner": true,
      "confidence": "high|medium|low",
      "whyWins": ["why it matches the vibe", "what makes it special", "why these dates work"],
      "tradeoffs": ["honest limitation 1", "honest limitation 2"],
      "scores": {
        "overall": 5,
        "budget": "Great|Fair|Tight",
        "weather": "description for travel dates",
        "flightTime": "~Xh from nearest hub (stops)",
        "walkability": "Excellent|Good|Moderate"
      }
    }
  ],
  "whyNotOthers": "one sentence contrasting what makes each pick different"
}
`.trim()
}
