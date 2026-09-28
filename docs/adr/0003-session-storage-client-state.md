# ADR 0003: Session storage for client trip state

**Status:** Accepted  
**Date:** 2026-05-31  
**Author:** Xing @ XingAI  
**Supersedes:** —  
**Superseded by:** —  
**Also available:** [中文](0003-session-storage-client-state.zh.md)

## Context

V1 has no user accounts or database. Trip form, compare result, and plan must survive navigation from `/decide` → `/result` and refresh within a session.

Next.js App Router **server-renders** client components. Reading `sessionStorage` or `localStorage` during the initial client render (e.g. in `useState(() => loadFromStorage())`) produces HTML that **does not match** the server — React 19 reports hydration failures.

The sidebar “Continue your last trip” card and locale switcher had the same bug class.

## Decision

**Use browser storage for V1 trip state; load it only after mount.**

### Storage keys

| Key | Store | Content |
|-----|-------|---------|
| `xingai-travel-trip-context` | `sessionStorage` | `TripContext` + locale |
| `xingai-travel-compare-result` | `sessionStorage` | `CompareResult` |
| `xingai-travel-plan-result` | `sessionStorage` | `PlanResult` (may arrive async) |
| `xingai-travel-inspire-prefs` | `sessionStorage` | Surprise me vibe / flight range / priority |
| `xingai-travel-regenerate` | `sessionStorage` | One-shot flag: `/result` asks `/decide` to rerun a mode in the current language |
| `xingai-travel-locale` | `localStorage` | `en` \| `zh` \| `ko` \| `es` |
| `theme` | `localStorage` | `light` \| `dark` \| `system` |
| `xingai-travel-trip-history` | `localStorage` | Recent decisions for `/trips` (max 12) — see [ADR 0007](./0007-local-trip-history.md) |

### Hydration-safe pattern

```tsx
// ✅ Server and first client paint match
const [trip, setTrip] = useState(defaultTrip)
const [ready, setReady] = useState(false)

useEffect(() => {
  const raw = sessionStorage.getItem(TRIP_STORAGE)
  if (raw) setTrip(JSON.parse(raw))
  setReady(true)
}, [])

useEffect(() => {
  if (!ready) return
  sessionStorage.setItem(TRIP_STORAGE, JSON.stringify(trip))
}, [trip, ready])
```

```tsx
// ❌ Never do this in client components
const [trip] = useState(() =>
  typeof window === "undefined" ? defaultTrip : readSession()
)
```

### Other rules

- Dispatch `xingai-travel-compare-updated` after writing compare result so `AppChrome` sidebar updates.
- `/result` is excluded from `sitemap.ts` — not crawlable, session-specific.
- Plan prefetch on decide page: fire `/api/plan` after compare; result page polls until plan exists or 15s timeout → mock plan.
- Theme: custom `ThemeProvider` (no `next-themes` inline script); `<html class="light">` SSR default; apply stored theme in `useEffect`. No blocking `<script>` in React tree (React 19 warning).

## Consequences

**Positive**

- Zero backend persistence cost for V1.
- Hydration-stable when pattern is followed.
- Fast replan loop — form restores on return to `/decide`.

**Negative**

- Brief flash: English → saved locale, default form → saved trip, explore card → last trip link.
- No cross-device sync or shareable result URLs.
- `sessionStorage` clears when tab closes.

## Alternatives considered

- **Cookies for theme/locale SSR** — deferred; flash acceptable for V1.
- **URL-encoded compare state** — rejected; payloads too large, leaks PII in referrer.
- **Supabase/DB in V1** — rejected; scope creep before product validation.

## Related

- `components/decide-page.tsx`, `components/result-page.tsx`, `components/app-chrome.tsx`
- `components/locale-provider.tsx`, `components/theme-provider.tsx`
- [ADR 0001](./0001-compare-first-product-scope.md)
