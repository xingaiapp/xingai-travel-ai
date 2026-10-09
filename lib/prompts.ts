import type { InspireContext, TripContext } from "@/lib/types"

const regionNames: Record<NonNullable<TripContext["region"]>, string> = {
  anywhere: "Anywhere",
  europe: "Europe",
  asia: "Asia",
  north_america: "North America",
  latin_america: "Latin America",
  middle_east: "Middle East",
  africa: "Africa",
  oceania: "Oceania",
}

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
- Destination range: ${regionNames[ctx.region] ?? "Anywhere"}
- Places already in mind: ${ctx.placesInMind || "none"}
- Budget: ${ctx.budget.amount} ${ctx.budget.currency} total
- Travelers: ${ctx.travelers.count} ${ctx.travelers.type}
- Style preference: ${ctx.style.join(", ")}
- Pace: ${ctx.pace}
- Notes: ${ctx.notes || "none"}
- Avoid: ${ctx.avoid || "none"}

HARD CONSTRAINTS (must obey — soft preferences never override these):
- Treat Avoid as hard constraints. Do not place a destination in the top 3 if it clearly violates Avoid.
- If Avoid mentions long flights (or similar) and the trip is 5 nights or fewer, do not recommend destinations whose scores.flightTime is about 9 hours or longer from the given origin.
- If Avoid mentions long flights on a longer trip, keep flight times under ~12 hours unless no realistic alternative exists — and say so in tradeoffs.
- Prefer a slightly weaker soft fit that respects Avoid over a high-scoring destination that breaks Avoid.

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
        "weather": "Mild, pleasant",
        "flightTime": "~11h (1 stop)",
        "walkability": "Excellent"
      }
    }
  ],
  "whyNotOthers": "one sentence explaining why the winner beats the other two"
}

Be honest about trade-offs. Do not recommend a destination that does not fit the budget.
- Do not claim a destination "fits the budget" or rate its budget fit; describe relative cost instead (e.g. "cheaper than Porto", "hotels spike in December"). A line-by-line cost estimate is produced later.
- scores.weather must name the likely weather for THESE travel dates in that city (not blank, not "N/A", not a copy-paste of another city).
- scores.flightTime must differ when hubs or stops differ (include hours + stops from the given origin). Prefer realistic nonstop when it exists; do not invent a connection.
- Never assume the traveler's citizenship or visa status (no "U.S. citizens do not need a visa" unless the trip context states nationality).
- scores.walkability must not be identical across all three unless truly the same — prefer Excellent / Good / Moderate with a short reason only if needed.
- whyNotOthers must name each runner-up with a different concrete reason (cost, weather, flight friction, or fit) — never three identical lines.
If places already in mind are provided, compare those first unless they clearly violate the trip constraints or Avoid.
If no places are provided, use the destination range as the search boundary.
`.trim()
}

export function buildPlanPrompt(destination: string, ctx: TripContext): string {
  return `
You are a travel planning advisor. Create a bookable plan for ${destination}.
Return JSON only. Respond in ${responseLanguage(ctx.locale)}.

Trip context:
- Dates: ${ctx.dates.from} to ${ctx.dates.to} (${ctx.dates.nights} nights)
- Origin: ${ctx.origin}
- Destination range: ${regionNames[ctx.region] ?? "Anywhere"}
- Places already in mind: ${ctx.placesInMind || "none"}
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
  "budgetEstimate": {
    "currency": "${ctx.budget.currency}",
    "lines": [
      { "category": "flights", "low": 0, "high": 0, "note": "assumption, e.g. 2 round-trip economy tickets from the origin" },
      { "category": "lodging", "low": 0, "high": 0, "note": "e.g. N nights in <area> at ~X–Y per night" },
      { "category": "food", "low": 0, "high": 0, "note": "e.g. ~X–Y per person per day" },
      { "category": "activities", "low": 0, "high": 0, "note": "the paid items in this itinerary" },
      { "category": "local_transport", "low": 0, "high": 0, "note": "transit passes, airport transfers" }
    ]
  },
  "warnings": [
    {
      "type": "weather|security|visa|crowds|health",
      "severity": "info|caution|warning",
      "title": "short title (4-6 words)",
      "body": "one honest, practical sentence the traveler should know before booking"
    }
  ]
}

For budgetEstimate:
- Amounts are whole numbers in ${ctx.budget.currency} for the WHOLE party (${ctx.travelers.count} travelers) and the WHOLE trip (${ctx.dates.nights} nights), not per person or per day
- Give a realistic low–high range for these specific dates from typical prices; include all five categories
- Do NOT bend the numbers to fit the user's budget — if it will likely run over, the estimate must show that
- Each note states the assumption behind the range in one short phrase

For warnings:
- severity "warning" = something that could seriously affect the trip (active travel advisories, dangerous weather season, complex visa requirements)
- severity "caution" = something worth knowing but manageable (pickpocket risk, rainy season, crowds)
- severity "info" = useful background (visa-on-arrival available, typhoon season ends in October)
- Include 2-4 warnings covering weather, security, visa/entry, and crowd conditions for the specific travel dates
- Be factual, not alarmist. If the destination is genuinely safe and easy, use "info" level
- Base warnings on the specific travel dates, not generic year-round conditions
- Never assume the traveler's citizenship or passport. For visa/entry, say that entry rules depend on nationality and point to the official government source; do not say any nationality is visa-free unless the trip context states nationality.
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
  const priorityNote = ctx.priority === "kids_friendly"
    ? "kids-friendly places, easy logistics, safe pacing, short transfers, and activities children can enjoy"
    : ctx.priority

  return `
You are a travel inspiration advisor. The user has no specific destination in mind and wants to discover somewhere new.
Recommend exactly 3 destinations they may not have considered, based on their mood and preferences.
Return JSON only. Respond in ${lang}.

User preferences:
- Vibe: ${ctx.vibe} (recharge = slow/relaxing, explore = new discovery, culture = deep history/arts, adventure = active/outdoors)
- Max flight range: ${flightLabel} — HARD LIMIT. Every destination must fit, counting connections and layovers from the origin.
- Top priority: ${priorityNote}
- Budget: ${ctx.budget.amount} ${ctx.budget.currency} total
- Travelers: ${ctx.travelers.count} ${ctx.travelers.type}
- ${originNote}
- ${dateNote}

Rules:
- Match the vibe honestly — not just the most popular cities
- Never assume the traveler's citizenship or passport. For visa/entry, say that entry rules depend on nationality and point to the official government source; do not say any nationality is visa-free unless the trip context states nationality.
- Include at least one lesser-known gem if vibe is "explore" or "adventure"
- If a destination is slightly over budget, flag it honestly in tradeoffs
- Do not claim a destination "fits the budget" or rate its budget fit; describe relative cost instead (e.g. "cheaper than Porto", "hotels spike in December"). A line-by-line cost estimate is produced later.
- Avoid repeating same country unless strongly justified
- whyWins should explain why this place specifically matches the vibe and priority
- flightHours = realistic one-way door-to-door flight time in hours from the origin, including connections (number, not text)
- Exactly one destination has isWinner: true, and "winner" equals its name
- scores.weather / flightTime / walkability must be filled and differ across the three picks when the cities differ
- whyNotOthers must contrast the three picks with concrete differences, not repeated filler

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
      "flightHours": 5.5,
      "whyWins": ["why it matches the vibe", "what makes it special", "why these dates work"],
      "tradeoffs": ["honest limitation 1", "honest limitation 2"],
      "scores": {
        "overall": 5,
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
