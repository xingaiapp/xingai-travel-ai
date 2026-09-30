# ADR 0008: City layer after the destination decision

**Status:** Accepted  
**Date:** 2026-09-30  
**Author:** Xing @ XingAI  
**Supersedes:** —  
**Superseded by:** —  
**Also available:** [中文](0008-city-layer-after-decision.zh.md)

## Context

Travel AI answers "where should I go?" ([ADR 0001](./0001-compare-first-product-scope.md)). Once a traveler has picked a city, the next question for a first-timer is different: "which places should I know about, and how should I spend my days there?" Today the product stops at a generated itinerary on `/result`, with no way to see places on a map, compare ways to experience the city, or check where a claim came from.

We want to add that layer, with Hong Kong as the first reference city. It is a scope change, not a feature toggle:

- ADR 0001 lists a "multi-city routing engine" as out of scope. A city layer is in-destination routing, which ADR 0001 did not consider.
- All three API routes (`/api/compare`, `/api/inspire`, `/api/plan`) call OpenAI inside the request. The workspace rule for XingAI backends is that request handlers read precomputed data and do not call external services live. A new "customize with AI" endpoint would widen that gap.
- The same bias problems that shaped [ADR 0004](./0004-affiliate-after-decision.md) (commission) and [ADR 0006](./0006-stories-after-decision.md) (creator bias) apply to a city guide written by the publisher.
- Opening hours, prices, closures and events go stale. There is no worker in this repo to refresh them.

## Decision

**The city layer is optional reading after the destination decision. It is built from reviewed static data, uses no request-time AI, and never feeds back into destination comparison.**

### 1. Placement

1. Route: `/city/[slug]`, statically generated from a city registry. Hong Kong (`/city/hong-kong`) is the only entry at launch.
2. Entry points:
   - `/result`, after the decision and next to Related Stories, for **any** compared destination that has a city page, in comparison order. It uses the same name matching as `storiesForDestinations()`.
   - The Hong Kong story season page.
   - Direct landing from search, via the sitemap and `llms.txt`.
3. The bottom and side navigation stay as they are (`/decide`, `/stories`, `/trips`). The city layer is not a new tab.
4. No city data is passed to `/api/compare`, `/api/inspire` or `/api/plan`, and prompts must not mention it. Having a city page must not change winner, ranking, confidence or trade-offs.

### 2. Data and evidence

1. City data lives in `lib/cities/` as typed, human-reviewed TypeScript: places, geographic clusters and routes. There is no database, no API route and no LLM at runtime.
2. **Stable facts only in v1:** coordinates, district, place type and historical significance. Each place records at least one source (`sourceName`, `sourceUrl`, `retrievedAt`).
3. **Dynamic facts are left out in v1:** opening hours, ticket prices, closures, transit status, events, weather, reservations and current popularity. The page says plainly that these are not covered and should be checked before going. That is better than showing a stale value marked "unverified".
4. Travel time between stops is labelled as an estimate, never shown as a timetable.
5. "Xing's pick" may appear as a label on a place card, marked as one person's first-hand choice. It is never used as a reason in a route's "why this route" text. This follows ADR 0006.

### 3. Routes

1. Three hand-authored reference routes for Hong Kong: Essentials, Photo, Local. The LLM does not generate them.
2. Every route has **Why this route**, **Good for** and **Trade-offs**. No route is labelled "best".
3. A build-time check fails when a route:
   - references an unknown place;
   - returns to a cluster it already left (backtracking);
   - has a stop without a reason.

### 4. Adjustments (instead of AI customization)

1. v1 ships deterministic toggles, for example "rain", "easier walking", "shorter day" and "more food". Each toggle is a pure function over the structured route and place data: it removes, swaps or reorders stops, using only places that are already in the dataset.
2. Every change is shown with its reason ("Swapped the Peak for M+ because it is outdoor and weather-sensitive"). If a toggle cannot produce a sensible route, it says so instead of producing a weak one.
3. LLM-based customization is out of scope. If it comes later, it gets its own ADR and must follow the read-only request path: a worker generates and validates results ahead of time, and requests only read them.

### 5. Map

1. v1 uses an inline SVG schematic of the Hong Kong Island and Kowloon clusters. It needs no map tiles and no API key. Stops and the route timeline highlight each other both ways.
2. Each stop has an "Open in maps" link built from its coordinates, so turn-by-turn navigation happens in the traveler's own map app.
3. An interactive tile map is deferred to a separate ADR, which will cover the tile provider, usage policy and mobile performance.

### 6. Photos, language and affiliate links

1. Photos are first-hand images processed with `scripts/process-story-photos.mjs`, which strips EXIF and GPS data. Otherwise a licensed image with attribution stored in the data, otherwise no photo. Images never contain text.
2. City copy is required in all four locales (`en`, `zh`, `ko`, `es`); unlike stories, it does not fall back to English. The type system enforces this.
3. The city page has no affiliate links in v1. ADR 0004 still applies to `/result`.

### 7. Measurement

`POST /api/track` gets two new event types: `city_from_result` and `city_route_select`. Checkpoint after 30 days: continue with a second city, adjust the layer, or stop.

### Explicit bans

- A "best route" badge or any single-winner framing between reference routes.
- Opening hours, prices or event dates shown without a live, dated source.
- Request-time LLM or third-party API calls from the city layer.
- A separate Hong Kong mini-app, a second design system or new top-level navigation.
- Using city page existence or content in destination comparison.

## Consequences

**Positive**

- First-time visitors can see places, clusters and three clear ways to spend the day, with reasons and costs, within about a minute.
- Every claim on the page has a source. Nothing on it goes stale silently.
- The layer adds no API cost or latency and needs no new secrets.
- Components accept `City` data, so a second city means adding data, not a rewrite.

**Negative**

- No opening hours or prices means travelers still check other sites for those.
- A schematic map is less precise than a tile map, which is why each stop links out to a real map app.
- Deterministic toggles cover fewer requests than free-text AI customization.
- Hand-authored data costs editorial time per city, so coverage will grow slowly.

## Alternatives considered

- **LLM-generated itinerary per request:** rejected. It hallucinates, cannot be verified, and adds a request-time external call.
- **Show dynamic facts marked "unverified":** rejected for v1. Without a refresh worker, stale values would outnumber verified ones.
- **Interactive tile map now (Leaflet / MapLibre):** deferred. The tile policy, API keys and bundle weight are not worth it before the layer proves useful.
- **City layer inside `/result`:** rejected. It would make the result page much longer and tie city content to one session's result.
- **Generic multi-city framework first:** rejected. We should abstract after the second city, not before.

## Related

- [ADR 0001: Compare-first product scope](./0001-compare-first-product-scope.md)
- [ADR 0004: Affiliate links after the decision](./0004-affiliate-after-decision.md)
- [ADR 0006: Travel Stories after the decision](./0006-stories-after-decision.md)
- [PRODUCT-PRINCIPLES.md](../PRODUCT-PRINCIPLES.md)
- [City layer: existing architecture audit](../city-layer/EXISTING_ARCHITECTURE.md)
