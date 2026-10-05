import { cities } from "@/lib/cities"
import { compares, guides } from "@/lib/content"
import { publishedEpisodes, seasons } from "@/lib/stories"

function storiesSection() {
  const lines = seasons.flatMap((season) =>
    publishedEpisodes(season).map((episode) => `- /stories/${season.slug}/${episode.slug} — ${episode.title.en}: ${episode.dek.en}`)
  )
  if (lines.length === 0) return ""
  return `
Travel Stories (first-hand, written by the publisher; each ends with a link to /decide for the reader's own trip):
${lines.join("\n")}
`
}

function citiesSection() {
  if (cities.length === 0) return ""
  const lines = cities.map(
    (city) =>
      `- /city/${city.slug} — ${city.name.en}: ${city.places.length} places with cited sources, ${city.routes.length} hand-written reference routes (${city.routes.map((route) => route.name.en).join(", ")}), each with why, who it suits and trade-offs.`
  )
  return `
City guides (optional, after the destination decision; stable facts only, no opening hours or prices; never used to rank destinations):
${lines.join("\n")}
`
}

function contentGraphSection() {
  const compareLines = compares.map((item) => `- /compare/${item.slug} — ${item.title.en}`)
  const guideLines = guides.map((item) => `- /guides/${item.slug} — ${item.title.en}`)
  return `
SEO / AEO / GEO content graph (ADR 0009). Decision Engine stays at /decide; content pages answer first, then CTA to /decide. No fake numeric scores on content pages.
- /how-it-works — methodology: constraints → compare → winner → trade-offs → evidence → book
- /faq — visible FAQ aligned with product principles
- /compare — index
${compareLines.join("\n")}
- /guides — index
${guideLines.join("\n")}
`
}

export function GET() {
  return new Response(
    `# XingAI Travel AI

XingAI Travel AI is an AI travel decision tool for people who have not decided where to go yet.

Core flow:
- Capture real trip constraints: dates, origin, budget, travelers, pace, and preferences.
- Compare destinations with honest trade-offs.
- Recommend one best-fit destination.
- Produce a book-first checklist and practical itinerary.

Primary pages:
- /decide (conversion — Travel Decision System)
- /privacy
- /terms
- /disclaimer
- /affiliate-disclosure
${contentGraphSection()}${storiesSection()}${citiesSection()}
Not indexed:
- /result and /trips depend on this browser's session or local history. They are noindex and omitted from the sitemap.

Product principle:
- Decision quality comes first.
- Affiliate links may appear after the recommendation and should not influence destination ranking, winner selection, confidence, or trade-off explanations.

Publisher: XingAI (https://xingai.app/) — AI decision systems for everyday life.

Related XingAI apps:
- Cook AI: https://cook.xingai.app/
- Wear AI: https://wear.xingai.app/
- Invest AI (research, not investment advice): https://invest.xingai.app/ai-map
- All apps: https://xingai.app/apps
`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } }
  )
}
