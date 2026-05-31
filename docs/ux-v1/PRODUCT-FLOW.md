# Travel AI — Product flow (V1)

Decision system modeled on Cook AI / Meal Coach, tuned for **trip context → compare destinations → bookable plan**.

**Product soul:** Compare first, plan second — not a generic itinerary generator.

## Three steps

### 1 — Your trip

Structured fields (UX V2 mock):

- Dates / window
- Departure airport or city
- Budget (total or per person)
- Who's traveling
- Trip notes (vibe, avoid, dietary, etc.)

**Trip snapshot** updates as the user types (mock). **Missing info** lists optional gaps (exact dates, hotel comfort).

### 2 — Style & pace

| Control | Options |
|---------|---------|
| **Trip style** | City · Beach · Nature · Culture |
| **Pace** | Relaxed · Balanced · Adventure |

**CTA:** `Compare destinations →` (not "Generate itinerary" / "Plan my trip")

Loading copy: *Comparing weather, budget, flight friction, and pace fit…*

AI returns **2–3 compared options** with one **winner** and honest trade-offs (demo: Lisbon).

### 3 — Plan it (result page)

**Winner first** — do not lead with day-by-day itinerary.

| Block | Content |
|-------|---------|
| **Best fit** | Destination + one-line meta |
| **Why this wins** | 3 bullets |
| **Trade-offs** | 2 bullets |
| **Match strength** | Strong fit + disclaimer (not live prices) |
| **Compare options** | Table: Destination · Fit · Trade-off · Verdict |
| **Book first** | Numbered list (flights, hotel area, day-trip) |
| **Itinerary** | Simple / Detailed toggle (mobile: collapsed fold) |

**Later (post-V1):** save trips, price alerts, share itinerary, live booking links.

## UX V1 scope

- Static HTML/CSS/JS gallery (`docs/ux-v1/`)
- i18n: EN, 中文, 한국어, Español
- Light / dark theme (sky-blue accent)
- No API — illustrative Lisbon demo

## Implementation path

1. Sign off UX in `docs/ux-v1/`
2. `travel_v1` Next.js app (fork `cook_v1` / `meal_v1` shell)
3. Deploy `travel.xingai.app`, update `xingai-dot-app` `apps.ts` (`comingSoon: false`)
