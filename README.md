# XingAI Travel AI

**Explore Better** — compare destinations first, plan second.

Production target: [travel.xingai.app](https://travel.xingai.app)

XingAI Travel AI is a **travel decision system**, not an OTA or price-comparison wall. Users describe real trip constraints; the product compares a small set of destinations, names one winner with honest trade-offs, then offers a book-first checklist and itinerary. Affiliate links appear **after** the decision — they never influence ranking or confidence.

---

## Status (October 2026)

| Area | State |
|------|--------|
| **Decision result (2026-10-02)** | Result shows **XingAI Match Score** (0–100 from overall stars + confidence), factor bars for overall/walkability, ranked alternatives with **Why not {city}?**. Hero is result-oriented: “Stop searching. Start deciding.” + proof line (en / zh / ko / es). **Evidence panel** labels weather / flight / walkability / plan budget / match as estimate·derived·plan (no fake source URLs). Hero “How to use” starts **collapsed** on all breakpoints. |
| **SEO/AEO/GEO content graph (ADR 0009)** | Live intent pages: `/how-it-works`, `/faq`, `/compare` (+ 5 A-vs-B pages), `/guides` (+ 5 intent pages). `/decide` stays the conversion step. Fit labels stay qualitative. `hreflang` no longer points 中文 / 한국어 / Español at the English `/decide` URL. |
| **Home (2026-10-05)** | `/` is the product landing (hero carousel, how/why/FAQ). First-visit polish: trust chips, section icons, CTA arrow nudge, ken-burns carousel, scroll-in reveals (honors `prefers-reduced-motion`). `/decide` stays the decision step. Primary CTA is **Make My Travel Decision** (en / zh / ko / es). `/decide` and `/stories` share the same pill CTAs, typography, and light hero treatment as Home. Only live routes are linked: Hong Kong city guide, comparisons, guides, and stories. Tokyo, Seoul, and Los Cabos appear as inspiration imagery only — not as city guides. |
| **Stories media (2026-10-05)** | All **31** published episode stills (HK×2 + Macau×2) export at **1600×2133** (`-800`/`-1600` WebP). Story UI prefers the 1600w asset on larger screens. Hero videos unchanged. |
| **Decision honesty (2026-10-05)** | A missing `OPENAI_API_KEY` returns a labeled demo and does not save it as a trip. A failed compare or plan shows a retry and does not substitute the Lisbon sample. API errors stay generic. Partner search links stay up. Revenue stays **NOT AVAILABLE** until a `NEXT_PUBLIC_*` partner id is set; the booking note says XingAI is not earning a commission. |
| **App shell** | Next.js 16 App Router, React 19, Tailwind 4. On desktop the sidebar stays fixed and the main column scrolls. |
| **Core flow** | `/` explains the product → `/decide` → compare or inspire → `/result` with plan |
| **Stories** | `/stories` after the decision ([ADR 0006](./docs/adr/0006-stories-after-decision.md)). **My Hong Kong** Season 1: EP01 Victoria Harbour + EP02 streets/food/people. **My Macau** Season 1 EP01–EP02 published. en / 中文 / 한국어 / Español. Contained display; no clear-face stills in authored copy. |
| **Compare quality** | Prompt + normalize pass require non-blank, distinct weather / flight / walkability rows; Hero copy says compare-then-search (not “actually book”). Past dates blocked; dead Settings control removed. Trip cards pick a city photo by name (EN/中文/한국어 aliases) instead of falling back to Lisbon for every unknown destination. Taipei / Shanghai / New Orleans use local `/assets/destination-*-card.webp` (dead Unsplash IDs were 404). |
| **Layla round (2026-09-28)** | Moat deepen, not booking race: result **uncertainty panel**, **Print/PDF**, compare table shows **full trade-offs per city**. Research: [`docs/research/2026-09-layla-vs-travel-ai.md`](./docs/research/2026-09-layla-vs-travel-ai.md). No fake chat agent / Expedia booking. |
| **Deep audit (2026-09-28)** | Compare cells no longer append city suffixes on duplicate scores; twitter title matches OG; legal link says Affiliate disclosure; GitHub repo public. Stories stay **4 published episodes** (HK×2 + Macau×2) — not 8. Locale URLs are not live yet, so pages do not advertise 中文 / 한국어 / Español as the same English URL. |
| **Catalog honesty (2026-09-30)** | Mother-site Travel features: device-local `/trips` is Free (this browser only). Synced/account history stays Planned — not sold as Pro. |
| **AI backend** | OpenAI JSON (`gpt-4o-mini` default), mock fallback when no API key |
| **i18n** | English, 中文, 한국어, Español (including published Travel Stories) |
| **Theme** | Light / dark, custom provider (React 19–safe) |
| **Affiliate** | Book-first module with optional partner IDs |
| **UX reference** | Static gallery in [`docs/ux-v1/`](./docs/ux-v1/) |
| **Architecture docs** | [`docs/adr/`](./docs/adr/) |
| **Tech blog** | [`docs/tech-blog/`](./docs/tech-blog/) (EN + 中文) |

---

## Product principles

Full copy: [`docs/PRODUCT-PRINCIPLES.md`](./docs/PRODUCT-PRINCIPLES.md)

1. **Decision quality first.** Winners, confidence, and trade-offs reflect trip fit — not commission.
2. **Compare before plan.** The default CTA is “Compare destinations”, not “Generate itinerary”.
3. **One clear winner.** Three options max; one recommended; alternatives explained honestly.
4. **Book-first on the result page.** Flights, hotel area, and key activity before day-by-day detail.
5. **Legal and affiliate disclosure** on dedicated pages and near booking links.
6. **Stories after the decision.** First-hand episodes never change the winner, ranking, confidence, or trade-offs. See [ADR 0006](./docs/adr/0006-stories-after-decision.md) and [docs/stories/README.md](./docs/stories/README.md).

Chinese shorthand used internally: **赚钱靠决策质量，联盟靠事后。**

---

## User flow

```mermaid
flowchart LR
  A["/decide<br/>Trip context"] --> B{Mode}
  B -->|I know where| C["POST /api/compare"]
  B -->|Surprise me| D["POST /api/inspire"]
  C --> E["sessionStorage<br/>compare + plan"]
  D --> E
  E --> F["/result<br/>Winner + table + book-first + itinerary"]
```

### Step 1 — Your trip (`/decide`)

- **Hero:** decision framing (“Where should I go — really?”), help accordion, primary CTA.
- **Mode toggle:**
  - **I know where I want to go** — full trip form (dates, origin, budget, travelers, style, pace, notes).
  - **Surprise me** — lightweight inspire chips (vibe, flight range, priority) + legal disclaimer.
- **Live preview:** compare result can render inline on `/decide` before navigating to `/result`.
- **Plan prefetch:** after compare succeeds, `/api/plan` runs in the background; result page polls `sessionStorage`.

### Step 2 — Compare / inspire (API)

- **`POST /api/compare`** — Zod-validated `TripContext` → `CompareResult` (3 destinations, 1 winner).
- **`POST /api/inspire`** — `InspireContext` → same `CompareResult` shape when user has no destination in mind.
- Responses are localized via `locale` in the payload (prompt language in `lib/prompts.ts`).

### Step 3 — Result (`/result`)

- **DestinationCompare** — winner hero, trade-offs, scrollable comparison table; tap a column to preview that city’s photo and see **full whyWins + trade-offs** for the focused city.
- **UncertaintyNotes** — honest soft spots (estimates vs live quotes; itinerary is a draft; booking links are partner search).
- **BookFirst** — affiliate-aware outbound links (Skyscanner, Booking.com, Expedia, Viator, GetYourGuide).
- **Itinerary** — simple + detailed day blocks; trip warnings when present.
- **Share / Print** — shareable link (no personal trip context) + Print/PDF via the browser dialog.
- **Replan** — back to `/decide` with trip context restored from storage.

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16.2 (App Router, Turbopack dev) |
| UI | React 19, Tailwind CSS 4, Lucide icons |
| AI | OpenAI Chat Completions, `response_format: json_object` |
| Validation | Zod 3 |
| Analytics | Vercel Analytics (production only) |
| Deploy | Vercel → `travel.xingai.app` |
| Node | ≥ 20.9 |

Shell pattern forked from `xingai-meal-coach-ai` / `xingai-cook-ai`: shared chrome (sidebar, mobile drawer, bottom nav), locale switcher, theme toggle, legal pages.

---

## Project structure

```
xingai-travel-ai/
├── app/
│   ├── layout.tsx              # Fonts, SEO metadata, ThemeProvider, AppChrome
│   ├── page.tsx                # Redirect → /decide
│   ├── decide/page.tsx
│   ├── result/page.tsx
│   ├── privacy|terms|disclaimer|affiliate-disclosure/
│   ├── api/
│   │   ├── compare/route.ts    # Destination comparison
│   │   ├── inspire/route.ts    # Surprise-me suggestions
│   │   ├── plan/route.ts       # Itinerary + book-first + warnings
│   │   └── track/route.ts      # Affiliate click logging (stdout for now)
│   ├── llms.txt/route.ts       # AEO summary for crawlers
│   ├── robots.ts
│   └── sitemap.ts              # /result excluded (session-only)
├── components/
│   ├── app-chrome.tsx          # Sidebar, mobile drawer, bottom nav, last-trip card
│   ├── decide-page.tsx         # Hero, forms, compare CTA, inline preview
│   ├── result-page.tsx
│   ├── destination-compare.tsx # Table + column photo preview
│   ├── book-first.tsx          # Affiliate cards
│   ├── inspire-form.tsx
│   ├── trip-form.tsx, style-pace-selector.tsx, …
│   ├── locale-provider.tsx, theme-provider.tsx
│   └── seo-json-ld.tsx         # JSON-LD via next/script
├── lib/
│   ├── types.ts                # TripContext, CompareResult, PlanResult, …
│   ├── mock-data.ts            # Lisbon demo when API unavailable
│   ├── prompts.ts              # OpenAI prompt templates
│   ├── affiliate.ts            # Partner URL builders
│   ├── rate-limit.ts           # Per-IP daily demo limit
│   ├── seo-json-ld.ts
│   ├── utils.ts                # cn(), getCityImage()
│   └── i18n/                   # en, zh, ko, es
├── public/assets/              # Logos, favicons, Lisbon hero/card images
├── docs/
│   ├── PRODUCT-PRINCIPLES.md
│   ├── adr/                    # Architecture decision records
│   ├── tech-blog/              # EN + 中文 engineering posts
│   └── ux-v1/                  # Static HTML/CSS UX gallery
├── DEV-PLAN.md                 # Phase-by-phase build plan
├── DEV-PLAN-AFFILIATE.md       # Affiliate monetization plan
└── .env.example
```

---

## API reference

### `POST /api/compare`

**Body:** `TripContext` (see `lib/types.ts`)

**Response:** `CompareResult`

**Behavior:**

- No `OPENAI_API_KEY` → returns `mockCompareResult` (200).
- Invalid body → `400 BAD_REQUEST`.
- Rate limit exceeded → `429 RATE_LIMIT` (production default: 3/day/IP).
- OpenAI failure → one retry, then `502 OPENAI_ERROR`.

### `POST /api/inspire`

**Body:** `InspireContext`

**Response:** `CompareResult` (same shape as compare)

Same fallback, rate limit, and error semantics as compare.

### `POST /api/plan`

**Body:** `{ destination: string, tripContext: TripContext }`

**Response:** `PlanResult` (`itinerary`, `bookFirst`, `warnings`, …)

Triggered automatically after compare on the client. Does not consume an extra rate-limit slot (compare already counted).

### `POST /api/track`

**Body:** `{ platform, type: "flight"|"hotel"|"activity", destination }`

Logs affiliate clicks to server stdout. Replace with KV/Plausible when ready.

---

## Client storage

| Key | Purpose |
|-----|---------|
| `xingai-travel-trip-context` | Trip form state (`sessionStorage`) |
| `xingai-travel-compare-result` | Last compare/inspire result |
| `xingai-travel-plan-result` | Plan payload (may arrive after navigation) |
| `xingai-travel-locale` | UI language (`localStorage`) |
| `theme` | Light / dark / system (`localStorage`) |

Event `xingai-travel-compare-updated` refreshes the sidebar “Continue your last trip” card.

**Hydration rule:** never read storage in `useState` initializers. Use stable SSR defaults, then `useEffect` after mount. See [ADR 0003](./docs/adr/0003-session-storage-client-state.md).

---

## Environment variables

Copy [`.env.example`](./.env.example) → `.env.local`.

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | For live AI | Without it, all API routes return mock data |
| `OPENAI_TRAVEL_MODEL` | No | Default `gpt-4o-mini` |
| `TRAVEL_DEMO_DAILY_LIMIT` | No | `0` = unlimited (local); omit/`3` in production |
| `NEXT_PUBLIC_APP_URL` | Yes (prod) | Canonical base URL for metadata |
| `NEXT_PUBLIC_*_AFFILIATE_*` | No | Partner IDs for book-first links |

---

## Local development

```bash
cd xingai-travel-ai
npm install
cp .env.example .env.local
# Set TRAVEL_DEMO_DAILY_LIMIT=0 and optionally OPENAI_API_KEY
npm run dev
```

Open [http://localhost:3000/decide](http://localhost:3000/decide).

```bash
npm run build    # production build
npm run lint     # ESLint
```

### UX gallery (static mock, no Next.js)

```bash
cd docs/ux-v1 && python3 -m http.server 8767
```

---

## Deployment (Vercel)

1. Connect repo; set root to `xingai-travel-ai`.
2. Env: `OPENAI_API_KEY`, `NEXT_PUBLIC_APP_URL=https://travel.xingai.app`, `TRAVEL_DEMO_DAILY_LIMIT=3`.
3. Optional affiliate IDs from partner dashboards.
4. Custom domain: `travel.xingai.app`.

---

## SEO & AEO

- Metadata + Open Graph in `app/layout.tsx`
- JSON-LD graph: Organization, WebSite, WebApplication, FAQPage, HowTo (`lib/seo-json-ld.ts`)
- `/robots.txt`, `/sitemap.xml` (static routes only)
- `/llms.txt` — plain-text product summary for AI crawlers
- **IndexNow (Bing):** public key at `/{key}.txt` (same shared XingAI key as xingai.app / invest). After deploy, run `python3 scripts/submit-indexnow.py` to notify engines from the live sitemap. Key is public by protocol; crawl outcomes are not guaranteed.

---

## Related documentation

| Doc | Description |
|-----|-------------|
| [docs/PRODUCT-PRINCIPLES.md](./docs/PRODUCT-PRINCIPLES.md) | Monetization and decision rules |
| [docs/adr/README.md](./docs/adr/README.md) | Architecture decision index |
| [docs/tech-blog/](./docs/tech-blog/) | Engineering blog (EN + 中文) |
| [docs/ux-v1/PRODUCT-FLOW.md](./docs/ux-v1/PRODUCT-FLOW.md) | Original V1 UX flow spec |
| [DEV-PLAN.md](./DEV-PLAN.md) | Build phases for AI agents |
| [DEV-PLAN-AFFILIATE.md](./DEV-PLAN-AFFILIATE.md) | Affiliate integration plan |

---

## License

Private — All rights reserved. © XingAI.
