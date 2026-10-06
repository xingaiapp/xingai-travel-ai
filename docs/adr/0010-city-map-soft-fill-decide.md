# ADR 0010: City map Want/Been soft-fills Decide (no client re-rank)

**Status:** Accepted  
**Date:** 2026-10-06  
**Author:** Xing @ XingAI  
**Supersedes:** —  
**Superseded by:** —  
**Also available:** [中文](0010-city-map-soft-fill-decide.zh.md)

## Context

Travel AI is decide-first ([ADR 0001](./0001-compare-first-product-scope.md)). A research draft proposed a public “Life Travel 100” / Desire Score ranking. Shipping that would invent a global Top 100 we do not have evidence for, and would blur the product into a listicle.

Users still need a lightweight way to remember cities they want or have already visited. `/trips` already keeps recent **decisions** in this browser ([ADR 0007](./0007-local-trip-history.md)). City guides ([ADR 0008](./0008-city-layer-after-decision.md)) needed a separate, smaller memory: Want / Been on live guide slugs.

Storage for that map was added under `xingai-travel-city-map` ([ADR 0003](./0003-session-storage-client-state.md)). This ADR locks how that map may touch Decide and how empty city search fails closed.

## Decision

1. **No fake Top 100 / Desire Score / Lifetime ranking page.** Progress UI counts marks against the **live guide catalog only**. Copy must not claim a global ranking.
2. **Want / Been is device-local.** Same honesty as trip history: this browser only, clearable, no account sync in this ADR.
3. **Been wins.** A slug cannot sit in both lists; marking Been removes Want and vice versa when the other is chosen.
4. **Soft-fill only on Decide hydrate.** After mount (hydration-safe, ADR 0003):
   - If `placesInMind` is empty, fill from Want city display names.
   - Append Been as `Already visited: …` on `avoid` when those names are not already present.
   - Never overwrite non-empty URL or session text.
5. **Never re-rank in the browser.** Map marks do not change `/api/compare` scoring, confidence, or result order client-side. They are trip-form soft constraints only.
6. **City search miss → Decide, not a fake guide.** Empty `/city` search offers **Decide with {q}** → `/decide?places=…`. Do not invent guide pages or ranking rows for typos / missing cities.
7. **Progress chrome is optional.** Strip on `/`, `/city`, and `/decide` (decide only when something is marked). Not a new nav tab.
8. **Not Trips.** Want / Been never appear on `/trips`. Trips only lists finished Decide API results in `xingai-travel-trip-history` ([ADR 0007](./0007-local-trip-history.md)). Soft-filling Decide from Want does **not** create a Trips row.

### Boundary vs Your trips

| | Travel map (this ADR) | Your trips (ADR 0007) |
|--|----------------------|------------------------|
| URL | `/city` (+ home / decide strips) | `/trips` |
| Key | `xingai-travel-city-map` | `xingai-travel-trip-history` |
| User action | Want / Been on a live guide | Complete Compare or Surprise me |
| Reads the other? | No | No |

## Consequences

**Positive**

- Map memory feeds the decision form without lying about rankings.
- Empty search stays decide-first instead of thin SEO spam.
- Aligns with ADR 0001 / 0008: city layer does not feed destination comparison logic.

**Negative**

- Soft-fill is easy to miss if the user already typed places.
- Been → avoid is a soft demote string; the model may still surface a Been city if other constraints dominate.
- Easy UX confusion with `/trips` unless copy and docs state the split (see ADR 0007 § Two browser memories).

## Alternatives considered

- **Public Life Travel 100 page:** rejected — no honest ranked evidence set.
- **Client-side re-sort of compare results from Want/Been:** rejected — breaks decide-engine trust and ADR 0008’s “city data never feeds comparison” rule.
- **Show Want marks on `/trips`:** rejected — would redefine Trips as a wishlist; keep decision history honest.
- **Account-synced map:** deferred; needs auth ADR and product signal first.
- **Auto-create city pages from search misses:** rejected — quality bar is Hong Kong–class static guides (ADR 0008).

## Related

- `lib/city-map.ts` (`applyCityMapPrefill`, `CITY_MAP_STORAGE`)
- `components/decide-page.tsx`, `components/city/cities-index.tsx`
- `components/city/city-map-toggles.tsx`, `components/travel-map-progress.tsx`, `hooks/use-city-map.ts`
- `tests/city-map.test.ts`
- [ADR 0003](./0003-session-storage-client-state.md) · [ADR 0007](./0007-local-trip-history.md) · [ADR 0008](./0008-city-layer-after-decision.md)
