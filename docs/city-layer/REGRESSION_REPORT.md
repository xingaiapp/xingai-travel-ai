# City layer — regression report

**Date:** 2026-09-30 · **Baseline:** `5bf3768` (before the city layer) · **Decision record:** [ADR 0008](../adr/0008-city-layer-after-decision.md) · **Baseline checklist:** [EXISTING_ARCHITECTURE.md §12](./EXISTING_ARCHITECTURE.md#12-regression-baseline-to-re-check-after-build)

Checked on a local dev server and a production build (`npm run build`), in the in-app browser at 375 px and desktop widths, light and dark.

## Existing features

| Existing feature | Before | After | Status | Notes |
|------------------|--------|-------|--------|-------|
| `/decide` page | 200, form renders | 200, form renders | ✅ No change | `decide-page.tsx`, compare / inspire / plan APIs and `lib/prompts.ts` untouched (empty diff) |
| Compare → `/result` | Winner, table, trade-offs, uncertainty, book-first, itinerary, related stories | Same, plus a city guide link for any compared destination with a city page | ✅ Additive | Link sits after Related Stories; tested with Hong Kong as a **non-winner** (shown) and the Lisbon/Barcelona/Porto mock (not shown) |
| `UncertaintyNotes` on `/result` | 4 items from `messages.result.uncertainty` | Same | ✅ No change | Component now takes optional `title` / `lead` / `items`; no props = old behaviour |
| `/s` shared trip | 200 | 200 | ✅ No change | `share-codec.ts` untouched |
| `/trips` history | 200 | 200 | ✅ No change | `trip-history.ts` untouched |
| `/stories` index, HK and Macau seasons, episodes | 200 | 200 | ✅ Additive | HK season page gains a "First time in Hong Kong?" link; Macau (no city page) shows nothing new |
| Old HK story slugs | 308 to new episodes | 308 to new episodes | ✅ No change | e.g. `01-the-hong-kong-i-called-home` → `01-victoria-harbour-start-with-the-sea` |
| Navigation (sidebar, bottom bar, drawer) | Decide, Stories, Trips | Decide, Stories, Trips | ✅ No change | No new tab (ADR 0008 §1.3). Mobile header shows "City guide" on `/city/*` instead of falling back to "Decide" |
| Affiliate links + disclosure | After decision on `/result` | Same | ✅ No change | No affiliate links on the city page (ADR 0008 §6.3) |
| `POST /api/track` | `affiliate`, `story_from_result`, `story_to_decide` | Same + `city_from_result`, `city_route_select` | ✅ Additive | Existing story event still returns `{"ok":true}` |
| Locales en / zh / ko / es | Complete | Complete | ✅ Additive | New `city` section is required in all four `Messages` files (type error if missing) |
| Light / dark theme | OK | OK | ✅ Additive | Added `--color-success` / `--color-warning` to `@theme` (tokens already existed) |
| `sitemap.xml` | decide, legal, stories | Same + `/city/hong-kong` | ✅ Additive | |
| `llms.txt` | Product + stories | Same + "City guides" section | ✅ Additive | |
| `robots.txt` | 200 | 200 | ✅ No change | |
| Legal pages | 200 | 200 | ✅ No change | |
| `npm run lint` | 2 errors | 2 errors | ✅ No new errors | Same pre-existing `react-hooks/set-state-in-effect` in `decide-page.tsx` and `locale-provider.tsx` |
| `npm run build` | Pass | Pass | ✅ | Now runs `check:cities` first (also in `vercel-build`) |

**Result: no unintended regression found.**

## New surface checked

| Area | Check | Status |
|------|-------|--------|
| `/city/hong-kong` | 200; unknown slug (`/city/tokyo`) is 404 | ✅ |
| Data rules | `check:cities` passes; 7 deliberately broken inputs all rejected | ✅ |
| Adjustment toggles | All 15 toggle combinations × 3 routes produce routes that pass the same rules; none rejected | ✅ |
| Unworkable case | Photo route with "rain + easier walking" keeps 2 of 6 stops and says another route may suit better | ✅ |
| City matching | "Hong Kong", "Hong Kong, China", "hong kong sar", "香港", "香港特别行政区", "홍콩" match; "Lisbon", "Kong" do not | ✅ |
| Phone (375 px) | No horizontal scroll; tall map layout; "Open in maps", evidence, reset and toggles are ≥ 36 px tall | ✅ |
| Map ↔ timeline | Tapping a marker highlights and scrolls to the stop; tapping a stop highlights the marker | ✅ |
| JSON-LD | `TouristDestination` with attractions (name, summary, coordinates, source links); no ratings, hours or prices | ✅ |

## Found outside this change (not fixed here, low risk)

- `components/destination-compare.tsx:29` renders stars with `"★".repeat(item.scores.overall)`. An `overall` outside 0–5 throws `RangeError: Invalid count value` and takes down `/result`. The compare API (`lib/compare-normalize.ts`) and shared links (`lib/share-codec.ts`) already clamp to 1–5 / 0–5, so this only happens with hand-edited or corrupted `sessionStorage`. Seen while hand-writing a test comparison with `overall: 8`.
