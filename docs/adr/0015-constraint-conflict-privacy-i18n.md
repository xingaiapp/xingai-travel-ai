# ADR 0015: Constraint-conflict banner, privacy substance, Decide i18n leaks

**Status:** Accepted  
**Date:** 2026-10-06  
**Author:** Xing @ XingAI  
**Also available:** [中文](0015-constraint-conflict-privacy-i18n.zh.md)

## Context

Third-round live review after ADR 0014 found:

1. SFO → Europe + short trip + Avoid long flights demoted **every** candidate, yet the UI still said “Best match” with no explicit conflict.
2. Match Score floor of 52 collapsed demoted cities onto the same number (walkability nudge invisible).
3. `/privacy` omitted OpenAI processing, IP/Redis rate limits, Analytics, browser map/Trips storage, and `/s` encoding; 中文/한국어 blurbs were copied from the disclaimer.
4. Decide UI leaked English in trip snapshot (`nights`) and Avoid/notes placeholders.

## Decision

1. **`constraintConflict` on `CompareResult`.** When Avoid (long flights) demotes all destinations, `normalizeCompareResult` sets a locale-aware conflict string. The UI shows it above the result and labels the pick as soft (“Closest among conflicts” / 冲突中相对较好), not a clean best match.
2. **Lower Match Score floor for `confidence: "low"`** (28 instead of 52) so demoted peers can still separate on walkability.
3. **Expand Privacy Policy** with the real processors and storage surfaces; give each legal page its own 中文/한국어 blurb; add an effective date and `contact@xingai.app`.
4. **i18n for Decide chrome:** snapshot nights unit, Avoid/notes placeholders, date `aria-label`s, and `aria-invalid` on empty origin.

## Consequences

- Conflicting constraints are visible at decision time — the product’s job, not a silent ranking.
- Privacy page matches what production actually does.
- Chinese (and ko/es) Decide no longer shows raw English nights/placeholders for those fields.
- Affiliate / GSC / thin compare expansion remain out of scope for this ADR.

## Related

- `lib/compare-normalize.ts`, `lib/match-score.ts`, `lib/types.ts`
- `components/destination-compare.tsx`, `components/legal-page.tsx`, `components/trip-form.tsx`, `components/trip-snapshot.tsx`
- [ADR 0012](./0012-decide-trust-avoid-hard.md) · [ADR 0014](./0014-score-parity-og-hires.md)
