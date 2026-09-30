# City layer — existing architecture audit

**Date:** 2026-09-30 · **Repo HEAD:** `5bf3768` · **Decision record:** [ADR 0008](../adr/0008-city-layer-after-decision.md)

Step 0 of the Hong Kong first-time decision work. It records what Travel AI already has, so the city layer extends it instead of rebuilding it.

## 1. Stack

| Area | Today |
|------|-------|
| Framework | Next.js 16.2 App Router, React 19, TypeScript 5.7 |
| Styling | Tailwind CSS 4, shadcn-style oklch tokens in `app/globals.css` (`--primary`, `--card`, `--border`, `--success`, `--warning`, …), `.dark` class theme via `next-themes` |
| Fonts | Inter (body), Fraunces (`--font-display`) in `app/layout.tsx` |
| Icons | `lucide-react` |
| Validation | `zod` on every API body |
| AI | `openai` SDK, JSON mode, mock fallback when no key ([ADR 0002](../adr/0002-openai-json-api-fallback.md)) |
| Storage | None server-side. `sessionStorage` / `localStorage` on the client ([ADR 0003](../adr/0003-session-storage-client-state.md), [ADR 0007](../adr/0007-local-trip-history.md)) |
| Tests | None. `npm run lint` is the only automated check |
| Deploy | Vercel, `travel.xingai.app` |

## 2. Routes and pages

| Route | Rendering | Role |
|-------|-----------|------|
| `/` | Server redirect | → `/decide` |
| `/decide` | Client (`components/decide-page.tsx`) | Trip context form + Inspire mode; main entry |
| `/result` | Client (`components/result-page.tsx`) | Winner, compare table, trade-offs, uncertainty notes, book-first, itinerary, related stories |
| `/s` | Server + client | Shared trip view decoded from URL (`lib/share-codec.ts`) |
| `/trips` | Client | Local decision history |
| `/stories`, `/stories/[season]`, `/stories/[season]/[episode]` | Static (`generateStaticParams`) | First-hand travel stories (Hong Kong, Macau) |
| `/privacy`, `/terms`, `/disclaimer`, `/affiliate-disclosure` | Static | Legal |
| `/llms.txt`, `/sitemap.xml`, `/robots.txt` | Route handlers | SEO / AEO |

Navigation (`components/app-chrome.tsx`): Decide, Stories, Trips, in the desktop sidebar, mobile bottom bar and mobile drawer. There is no locale in the URL.

## 3. APIs

| Route | Calls | Notes |
|-------|-------|-------|
| `POST /api/compare` | OpenAI in the request | Compare 3 destinations → winner |
| `POST /api/inspire` | OpenAI in the request | "Surprise me" suggestions |
| `POST /api/plan` | OpenAI in the request | Budget + itinerary for the chosen destination |
| `POST /api/track` | Logs only | `affiliate` click types + `story_from_result`, `story_to_decide` |
| `GET /api/og` | `next/og` | Share image for `/s` |

All three AI routes call an external service inside the request, which goes against the workspace "worker writes, API reads" rule. That is existing debt and out of scope here. ADR 0008 makes sure the city layer does not add to it.

## 4. Data models

- `lib/types.ts`: `TripContext`, `InspireContext`, `Destination` (`whyWins`, `tradeoffs`, `confidence`, `scores`), `CompareResult`, `PlanResult`, `ItineraryDay`, warnings.
- `lib/stories/types.ts`: `StoryText` (`en` required, `zh`/`ko`/`es` optional), `StoryPhoto` (base path + `-800`/`-1600` webp), `StoryBlock`, `StoryEpisode`, `StorySeason` (`destination` used for matching).
- **No place, coordinate, district or route model exists anywhere.**

## 5. Maps and location

None. There is no map library, no coordinates, and no "open in maps" links. `getCityImage()` in `lib/utils.ts` maps city names to thumbnails: local cards for some cities, Unsplash URLs for others.

## 6. Destination and decision UI

| Component | What it does |
|-----------|--------------|
| `destination-compare.tsx` | Winner card with `ConfidencePill`, `whyWins` bullets, per-destination trade-offs, focused-destination detail |
| `tradeoff-note.tsx` | Bordered "why not the others" note (`title` + children) |
| `uncertainty-notes.tsx` | "What this does not know" panel (prices, flights, itinerary, booking) |
| `itinerary.tsx` | Day list with Simple / Detailed toggle |
| `book-first.tsx`, `budget-breakdown.tsx`, `trip-warnings.tsx`, `trip-snapshot.tsx` | Execution and context panels on `/result` |
| `style-pace-selector.tsx` | Chip-style toggles for style and pace |
| `related-stories.tsx` | Post-decision story links for any compared destination (ADR 0006) |

Visual language is consistent across these: `rounded-md border border-border bg-card p-4 shadow-sm sm:p-5` panels, `h2.text-base.font-extrabold` headings with a lucide icon in `text-primary`.

## 7. Story content and images

- `lib/stories/hong-kong.ts`: season "My Hong Kong", EP01–EP02 published. `public/stories/hong-kong/01|02/` holds 17 photos (34 files: 800 w and 1600 w).
- `components/story-view.tsx` exports `StoryImage` (srcset 800/1600, lazy, alt from `StoryText`), `SeasonView`, `EpisodeView`, `StoriesIndexView`.
- `scripts/process-story-photos.mjs` (sharp) resizes, applies orientation, **strips EXIF/GPS**, and re-reads the output to prove the metadata is gone.
- `lib/stories/index.ts`: `pickText()`, `visibleSeasons()`, `publishedEpisodes()`, `storiesForDestinations()` (name matching), `trackStoryClick()`.

## 8. i18n

- `lib/i18n/{en,zh,ko,es}.ts` implement `Messages` (`lib/i18n/types.ts`), so a missing key is a type error.
- `components/locale-provider.tsx`: client-side locale in `localStorage`, `useLocale()` → `{ locale, messages }`. The server always renders English first.
- Four locales: **en, zh, ko, es**. The Hong Kong spec listed only three; Spanish is inherited and required.
- Metadata `alternates.languages` all point to the same URL, because the locale is not in the URL.

## 9. SEO / AEO

- `app/sitemap.ts`: `/decide`, legal pages and published stories.
- `app/llms.txt/route.ts`: product summary + published story list.
- `lib/seo-json-ld.ts`: Organization, WebSite, WebApplication, FAQPage graph in the layout.
- Story pages have per-page `generateMetadata`.

## 10. Reuse / Extend / New for the city layer

| Spec item | Verdict | Based on |
|-----------|---------|----------|
| Page shell, nav, theme, locale | **REUSE** | `AppChrome`, `LocaleProvider`, `ThemeProvider`, tokens in `globals.css` |
| `/city/[slug]` page | **NEW** | Same static pattern as `app/stories/[season]/page.tsx` (`generateStaticParams`, `generateMetadata`) |
| City / Place / Cluster / Route / RouteStop types | **NEW** | `lib/cities/types.ts`; text type modelled on `StoryText` but with all 4 locales required |
| Hong Kong dataset | **NEW** | `lib/cities/hong-kong.ts` |
| Route validation (unknown place, backtracking, missing reason) | **NEW** | Build-time check (`scripts/check-cities.mjs` run in `prebuild`) |
| Adjustment toggles (rain, easier walking, shorter day, more food) | **NEW** logic, **EXTEND** UI | Pure functions in `lib/cities/adjust.ts`; chips styled like `style-pace-selector.tsx` |
| `PlaceCard` | **NEW** | Uses `StoryImage` for photos, `pickText` pattern for copy |
| `RouteCard` ("3 ways to experience") | **NEW** | Panel and heading style from `destination-compare.tsx`; **no** `ConfidencePill`, no winner framing |
| `RouteTimeline` | **EXTEND** pattern | Row and divider structure from `itinerary.tsx`; adds stop ↔ map selection |
| `TravelMap` | **NEW** | Inline SVG schematic + "Open in maps" links; no dependency |
| Why / Good for | **NEW** (small) | Bullet style of `whyWins` in `destination-compare.tsx` |
| Trade-offs | **REUSE** | `TradeoffNote` |
| "What this page does not cover" | **EXTEND** | `UncertaintyNotes`: take the items as props so the city page can pass hours / prices / events |
| `EvidenceBadge` (source + retrieved date) | **NEW** | Small inline component |
| Entry from `/result` | **EXTEND** | Next to `RelatedStories`; matching helper modelled on `storiesForDestinations()` |
| Entry from HK story season | **EXTEND** | `SeasonView` gets an optional city link |
| Photos | **REUSE** | `process-story-photos.mjs` (target folder extended to `public/cities/…`), existing HK story photos |
| Tracking | **EXTEND** | `/api/track` enum: `city_from_result`, `city_route_select` |
| Sitemap, `llms.txt`, JSON-LD | **EXTEND** | Add `/city/hong-kong`; `TouristTrip` / `ItemList` JSON-LD on the city page only |
| i18n chrome strings | **EXTEND** | New `city` section in `Messages`, all 4 locale files |
| AI customization | **Not in v1** | ADR 0008 §4 |

Not touched: `/decide`, compare, inspire and plan APIs and prompts, share codec, trip history, affiliate logic, legal pages.

## 11. Constraints to carry into implementation

1. **No request-time AI or third-party calls** from anything under `/city` or `lib/cities`.
2. **Client-side locale:** the server renders English, and the city page must hydrate cleanly the same way story pages do.
3. **Public repo:** city data and docs stay free of private notes, internal hosts and unpublished plans. Photos go through the EXIF-stripping script.
4. **Unsplash thumbnails have broken before** (commits `6915669`, `3d4b479`). City photos are local files only.
5. **Mobile first:** the bottom bar already takes space. The route timeline and map must fit in a 375 px viewport without horizontal scroll.

## 12. Regression baseline (to re-check after build)

| Existing feature | Check |
|------------------|-------|
| `/decide` compare flow | Submit → `/result` renders winner, table, trade-offs |
| Inspire mode | Submit → suggestions → result |
| `/result` itinerary, book-first, affiliate links, related stories | Render unchanged; new city link only for matched destinations |
| `/s` shared trip + `/api/og` | Decode and render; OG image returns 200 |
| `/trips` history | Lists, restores, deletes |
| `/stories` index, HK + Macau season and episodes | Render; old HK slugs still redirect |
| Nav (desktop sidebar, mobile bottom bar, drawer) | Same three items |
| Locale switch en/zh/ko/es, light/dark | No missing strings, no hydration warnings |
| `sitemap.xml`, `llms.txt`, `robots.txt` | Valid; existing URLs still listed |
| `npm run lint`, `npm run build` | Pass |

Results go into `REGRESSION_REPORT.md` in this folder after implementation.
