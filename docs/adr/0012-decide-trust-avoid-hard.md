# ADR 0012: Decide trust — empty form defaults + Avoid as hard constraints

**Status:** Accepted  
**Date:** 2026-10-06  
**Author:** Xing @ XingAI  
**Also available:** [中文](0012-decide-trust-avoid-hard.zh.md)

## Context

A full-site review (2026-10-06) found two trust failures on the decision path:

1. **Pre-filled demo trip.** `defaultTrip` shipped with SFO origin, wishes, and “Long flights, extreme heat” already filled. Submitting without edits produced someone else’s decision.
2. **Avoid was soft.** The compare prompt listed Avoid as plain text. Normalize did not demote violators. A 4-night trip with “Avoid: Long flights” could still rank a ~12h Lisbon connection in the top three.

Share images for Singapore / Barcelona / Xi'an also mangled Unsplash URLs by appending `-1600.webp` to query strings ([ADR 0011](./0011-first-html-seo-honesty.md) honesty goal).

## Decision

1. **Empty traveler defaults.** `defaultTrip` keeps dates / budget / travelers shape for the form, but `origin`, `notes`, and `avoid` start empty. Region example cities stay in the **placeholder** only — changing region must not write them into `placesInMind`.
2. **Origin required before compare.** Client blocks submit with a clear error; API still rejects empty origin via zod.
3. **Avoid is hard in prompt + normalize.** `buildComparePrompt` states Avoid as HARD CONSTRAINTS (short trips ≤5 nights: no ~9h+ flights in the top 3 when Avoid mentions long flights). `normalizeCompareResult(result, trip)` demotes matching destinations (cap overall ≤2, confidence low, rewrite winner) when flight hours parse above the cap.
4. **No citizenship guesses** in the compare prompt (no default “U.S. citizens…” visa lines).
5. **City OG images.** `cityOgImage()` / `resolveCityImageSrc()` — never append `-1600.webp` to `http(s)` URLs; remote heroes use first-party `/assets/hero-travel-decision.png` for OG/Twitter.
6. **Home hero.** Drop `unoptimized` on the homepage carousel so Next.js serves sized images; keep `priority` on the first slide.

## Consequences

- Users must enter an origin before comparing — fewer accidental demo submissions.
- Long-flight Avoid is enforced even when the model ignores the prompt (best-effort parse of `scores.flightTime`).
- Flight-hour parsing is heuristic; odd model strings may skip demotion — prompt still carries the rule.
- Three Unsplash city pages keep remote heroes on-page; share cards use a branded PNG until first-party photos exist.

## Related

- `lib/mock-data.ts`, `components/trip-form.tsx`, `components/decide-page.tsx`
- `lib/prompts.ts`, `lib/compare-normalize.ts`, `app/api/compare/route.ts`
- `lib/cities/share-image.ts`, `app/city/[slug]/page.tsx`, `components/home-landing.tsx`
- [ADR 0001](./0001-compare-first-product-scope.md) · [ADR 0010](./0010-city-map-soft-fill-decide.md) · [ADR 0011](./0011-first-html-seo-honesty.md)
