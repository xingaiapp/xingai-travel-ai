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
- /decide
- /result
- /privacy
- /terms
- /disclaimer
- /affiliate-disclosure
${storiesSection()}
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
