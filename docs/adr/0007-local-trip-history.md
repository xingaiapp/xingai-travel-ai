# ADR 0007: Local trip history for Trips

**Status:** Accepted  
**Date:** 2026-09-27  
**Author:** Xing @ XingAI  
**Supersedes:** —  
**Superseded by:** —  
**Also available:** [中文](0007-local-trip-history.zh.md)

## Context

The nav showed **Trips / Saved / Profile** as “Coming soon” placeholders. A site test flagged them as dead navigation, which hurts trust in the product. [ADR 0001](./0001-compare-first-product-scope.md) keeps accounts and a saved-trips database out of scope, and [ADR 0003](./0003-session-storage-client-state.md) keeps trip state in the browser.

Users still lose a decision as soon as the tab closes, because `sessionStorage` does not survive it.

## Decision

1. **Trips = recent decisions in this browser.** Every live compare or inspire result is saved to `localStorage` under `xingai-travel-trip-history`. The list keeps the 12 newest entries, and each entry stores the trip context, the compare result, and the plan if one arrived.
2. **Reopen = restore session keys.** Opening an entry writes it back to the three `sessionStorage` keys and navigates to `/result`. If the plan never arrived (the user left early), it is requested again and attached to the entry.
3. **Preview fallback is never saved.** Only responses from the API are recorded; mock data from the error path is not.
4. **Saved and Profile are removed from the nav** until they exist. No placeholder entries.
5. **User control:** each entry can be removed, and there is a “Clear all” button. The page says the data stays in this browser only, and the privacy page says the same. `/trips` is `noindex` and not in the sitemap.

### Two browser memories (do not mix)

| Surface | Storage key | What it stores | How it fills |
|---------|-------------|----------------|--------------|
| **Your trips** (`/trips`) | `xingai-travel-trip-history` | Finished Decide results (compare / inspire) | Run Decide → API success |
| **Your travel map** (`/city`, home strip) | `xingai-travel-city-map` | Want / Been on live city-guide slugs | Tap Want or Been on a guide |

Marking Want on [/city](https://travel.xingai.app/city) **never** writes a Trips row. Opening [/trips](https://travel.xingai.app/trips) **never** lists city-map marks. Want may soft-fill Decide form fields ([ADR 0010](./0010-city-map-soft-fill-decide.md)); that still is not a Trips entry until a decision completes.

## Consequences

**Positive**

- No dead nav. Users can return to a decision without an account.
- No backend, no personal data leaves the device. This matches ADR 0001 and ADR 0003.

**Negative**

- History does not sync across devices and disappears with site data.
- Entries keep the language the result was generated in.
- Users may expect Want marks on `/trips` — product copy and ADR 0010 must keep the boundary explicit.

## Alternatives considered

- **Keep “Coming soon” entries**: rejected, because they are dead navigation.
- **Accounts + server storage**: rejected for now, because it is out of scope per ADR 0001.
- **Merge Want marks into Trips**: rejected — a city wishlist is not a decision; mixing them would make `/trips` lie about “recent decisions.”

## Related

- `lib/trip-history.ts`, `components/trips-page.tsx`, `app/trips/page.tsx`
- `components/decide-page.tsx` (saves entries), `components/app-chrome.tsx` (nav)
- [ADR 0010](./0010-city-map-soft-fill-decide.md) (city map — separate key)
- [ADR 0003](./0003-session-storage-client-state.md)
