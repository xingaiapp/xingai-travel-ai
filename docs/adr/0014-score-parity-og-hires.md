# ADR 0014: Match-score UI parity, form field alerts, localized Avoid demotion, high-res OG

**Status:** Accepted  
**Date:** 2026-10-06  
**Author:** Xing @ XingAI  
**Also available:** [中文](0014-score-parity-og-hires.zh.md)

## Context

Afternoon re-review after ADR 0012/0013 found:

1. Card Match Score (with walkability) disagreed with the comparison-table header scores (walkability omitted) and column order followed the raw model array.
2. Empty-origin validation reused the API error card with a useless “Try again” button and no focus / live region.
3. Avoid demotion strings were English-only in `compare-normalize`.
4. First-party OG fallback `hero-travel-decision.png` was ~2.2MB — bad for chat previews — while the product rule requires **high-resolution** sources (not muddy downscales).

## Decision

1. **One score formula everywhere.** Table headers call `computeMatchScore(overall, confidence, walkability)`. Columns use winner-first `orderedDestinations` aligned with `rankedAlternatives`.
2. **Field notices ≠ API errors.** Empty origin / date validation uses `fieldNotice` + `role="alert"` / `aria-live="assertive"`, scrolls and focuses `#trip-origin`, and never shows Try again.
3. **Avoid demotion copy follows `trip.locale`** (en / zh / ko / es) for tradeoff lines and `whyNotOthers` notes.
4. **High-res OG card.** Remote-city OG points to `/assets/og-travel-decision-2400.jpg` — **2400×1260** cropped from the live `home-hero-hong-kong.webp` (2560×1440 source), mozjpeg ~90. Keep a WebP twin for future use. Do not replace high-res with soft AI upscales of low-res gens. Retire the 2.2MB PNG as the share default (file may remain for other scripts).

## Consequences

- Same page no longer shows conflicting /100 numbers.
- Form validation is accessible and actionable.
- Non-English Decide users see Avoid demotion in their language.
- Share cards stay sharp; file size drops from ~2.2MB PNG to ~450KB JPEG without lowering pixel count below 2× classic OG.

## Related

- `components/destination-compare.tsx`, `components/decide-page.tsx`, `components/trip-form.tsx`
- `lib/compare-normalize.ts`, `lib/cities/share-image.ts`
- [ADR 0012](./0012-decide-trust-avoid-hard.md) · [ADR 0013](./0013-compare-honesty-match-headers.md)
