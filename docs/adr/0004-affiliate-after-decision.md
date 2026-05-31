# ADR 0004: Affiliate links after the decision

**Status:** Accepted  
**Date:** 2026-05-31  
**Author:** Xing @ XingAI  
**Supersedes:** —  
**Superseded by:** —  
**Also available:** [中文](0004-affiliate-after-decision.zh.md)

## Context

Travel AI can monetize through booking partners (Skyscanner, Booking.com, Viator, etc.). That creates a conflict: commission incentives could bias destination rankings if links appear too early or too prominently.

Product principles and legal pages already state: **decision quality first; affiliate after the decision.**

## Decision

**Affiliate URLs appear only in the Book-first module on `/result`, after the user has seen the winner, comparison table, and trade-offs.**

Implementation:

1. **`lib/affiliate.ts`** — builds outbound URLs from trip dates, origin IATA guess, destination city. Partner IDs from `NEXT_PUBLIC_*` env vars; links work without IDs (no commission).
2. **`components/book-first.tsx`** — renders flight / hotel / activity cards with `rel="noopener noreferrer sponsored nofollow"`.
3. **`POST /api/track`** — logs clicks to stdout (`platform`, `type`, `destination`); future: KV or analytics pipeline.
4. **`/affiliate-disclosure`** — dedicated legal page; footer + mobile drawer link.
5. **AI prompts** — no affiliate URLs or platform names in compare/inspire/plan JSON; model output is decision-only.

Explicit bans:

- Affiliate links on `/decide` hero or compare table.
- Commission-driven reordering of destinations (enforced by product review, not code alone).
- Hiding sponsored nature of outbound links.

## Consequences

**Positive**

- Trust-aligned with Invest AI and other XingAI decision products.
- Book-first block doubles as monetization without changing the recommendation UI.
- Env-gated IDs — safe to ship UI before partner approval.

**Negative**

- Revenue depends on users reaching `/result` and clicking through.
- IATA guessing (`guessIata`) is best-effort — wrong airport codes on rare cities.

## Alternatives considered

- **Inline OTA widgets on decide page** — rejected; looks like price shopping, not deciding.
- **Single partner lock-in** — rejected; users expect choice across flights/hotels/tours.
- **Server-side redirect /api/go?** — deferred; direct outbound links simpler for V1.

## Related

- [PRODUCT-PRINCIPLES.md](../PRODUCT-PRINCIPLES.md)
- [DEV-PLAN-AFFILIATE.md](../../DEV-PLAN-AFFILIATE.md)
- `lib/affiliate.ts`, `components/book-first.tsx`, `app/affiliate-disclosure/page.tsx`

## Env reference

| Variable | Partner |
|----------|---------|
| `NEXT_PUBLIC_SKYSCANNER_PARTNER_ID` | Skyscanner |
| `NEXT_PUBLIC_BOOKING_AFFILIATE_ID` | Booking.com |
| `NEXT_PUBLIC_EXPEDIA_CID` | Expedia |
| `NEXT_PUBLIC_VIATOR_PARTNER_ID` | Viator |
| `NEXT_PUBLIC_GETYOURGUIDE_PARTNER_ID` | GetYourGuide |
