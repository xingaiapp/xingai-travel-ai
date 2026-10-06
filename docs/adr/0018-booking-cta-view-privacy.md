# ADR 0018: Booking CTA view metric + partner-cookie privacy

**Status:** Accepted  
**Date:** 2026-10-06  
**Author:** Xing @ XingAI  
**Also available:** [中文](0018-booking-cta-view-privacy.zh.md)

## Context

Revenue validation needs view→click, not clicks alone. Privacy must name partner attribution cookies before affiliate applications. Disclosure copy already switches when partner IDs are set (ADR 0004).

## Decision

1. **`booking_cta_view`** — when the Book-first block is ≥25% visible, fire once per mount via `/api/track` (pairs with `affiliate_click`).
2. **Privacy** — add “Partner booking links” describing partner cookies/tracking; rankings unchanged; no commission until IDs exist.
3. **Application blurbs** — `docs/affiliate-application-blurb.md` (EN + 中文) for partner forms.

## Consequences

- Funnel data for partner talks without waiting for large traffic.
- Privacy matches what partners’ pixels may do after click-out.

## Related

- [ADR 0004](./0004-affiliate-after-decision.md)
- `components/book-first.tsx`, `app/api/track/route.ts`, `components/legal-page.tsx`, `docs/affiliate-application-blurb.md`
