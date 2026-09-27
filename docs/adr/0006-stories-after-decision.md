# ADR 0006: Travel Stories after the decision, never in scoring

**Status:** Accepted  
**Date:** 2026-09-26  
**Author:** Xing @ XingAI  
**Supersedes:** —  
**Superseded by:** —  
**Also available:** [中文](0006-stories-after-decision.zh.md)

## Context

Travel Stories (`/stories`) publish first-hand trips (Hong Kong first, Los Cabos next) with honest takes: would return, would skip, hidden gems, lessons. They make the product feel human and bring search traffic into `/decide`.

The obvious next idea is to feed those experiences into the decision itself ("Winner: Hong Kong — Xing lived there six months"). That creates the same conflict ADR 0004 solved for affiliate links:

- **Coverage bias** — only destinations the publisher visited get "real evidence", so they would systematically look stronger than places with no story.
- **Sample of one** — six months living in a city says little about a family's one-week trip there.
- **Creator bias** — the publisher's preferences are an incentive, just like commission.

## Decision

**Stories are optional reading after the decision. They never influence winner, ranking, confidence, or trade-off text.**

1. **`/result`** — `components/related-stories.tsx` renders after the comparison, trade-offs, book-first, and itinerary. It lists stories for **any** compared destination (winner or not), in comparison order, labelled as one person's experience that did not affect the result.
2. **Matching** — `storiesForDestinations()` in `lib/stories/index.ts` matches by destination name only. No story data is passed to `/api/compare`, `/api/inspire`, or `/api/plan`, and prompts must not mention stories.
3. **Story → decide** — the story CTA links to `/decide?places=…&region=…`, prefilling the destination as one option; the reader supplies their own constraints.
4. **Takes are human-written** — `take`, `quote`, and "would I return" copy is written by the publisher. AI may order photos, draft alt text, and flag missing fields, but must not invent first-hand judgments.
5. **Measurement** — `POST /api/track` logs `story_from_result` and `story_to_decide` (`[story-click]`). Checkpoint after two published episodes: continue, adjust, or stop.

Explicit bans:

- Story counts, "real experience" badges, or publisher quotes inside the compare table or winner header.
- Any destination reordering or confidence change based on whether a story exists.
- UGC (comments, likes, "add my experience") until there is auth, moderation, and updated terms/privacy — a separate ADR.

## Consequences

**Positive**

- Decision trust stays intact; stories add depth without adding bias.
- Stories have a measurable job: bring readers into `/decide` and give deciders something real to read.

**Negative**

- The "real human evidence" differentiator is weaker than a scored signal would be.
- Only destinations with stories show the block; that is visible unevenness, but it is placed below the decision.

## Alternatives considered

- **Stories as a scoring input** — rejected; coverage and creator bias.
- **Stories shown only for the winner** — rejected; reinforces the winner with the publisher's authority.
- **Open UGC now** — deferred; needs auth, moderation, legal pages, and proof that stories get read.

## Related

- [ADR 0004 — Affiliate links after the decision](./0004-affiliate-after-decision.md)
- [PRODUCT-PRINCIPLES.md](../PRODUCT-PRINCIPLES.md)
- [Stories authoring guide](../stories/README.md)
- `lib/stories/`, `components/story-view.tsx`, `components/related-stories.tsx`, `app/api/track/route.ts`
