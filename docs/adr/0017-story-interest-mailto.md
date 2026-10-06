# ADR 0017: Story interest gauge (mailto) — no “coming soon”, no UGC yet

**Status:** Accepted  
**Date:** 2026-10-06  
**Author:** Xing @ XingAI  
**Also available:** [中文](0017-story-interest-mailto.zh.md)

## Context

ADR 0006 defers reader UGC until auth, moderation, and legal updates. Shipping “Share your trip — coming soon” would falsely mark an undecided feature as Planned/Live and erode honesty.

We still need a signal: do readers want to contribute?

## Decision

1. **Interest CTA** on `/stories`, season pages, and episode endings: honest copy that we do **not** publish reader stories yet; invite email interest only.
2. **Button = `mailto:contact@xingai.app`** with a short subject/body template. No form, no photo upload (EXIF risk; privacy not ready).
3. **Metric `story_submit_interest`** via existing `/api/track` (alongside `story_from_result` / `story_to_decide`).
4. **Privacy** discloses that voluntary emails about story interest are used to reply and gauge demand only.

Enough clicks → write a separate UGC ADR. Not enough → leave Stories publisher-only.

## Consequences

- No fake roadmap promise.
- Demand is measurable without building moderation.

## Related

- [ADR 0006](./0006-stories-after-decision.md) · [ADR 0016](./0016-traffic-404-faq-stories.md)
- `components/story-view.tsx`, `lib/stories/index.ts`, `app/api/track/route.ts`, `components/legal-page.tsx`
