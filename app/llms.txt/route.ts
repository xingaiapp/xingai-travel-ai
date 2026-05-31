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

Product principle:
- Decision quality comes first.
- Affiliate links may appear after the recommendation and should not influence destination ranking, winner selection, confidence, or trade-off explanations.
`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } }
  )
}
