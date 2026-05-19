# Travel AI — Product flow (V1)

Decision system modeled on Cook AI / Meal Coach, tuned for **trip context → destination choice → bookable plan**.

## Three steps

### 1 — Your trip

User describes:

- Dates / window
- Departure airport or city
- Budget (total or per person)
- Who's traveling
- Vibe (warm, walkable, kid-friendly, food-focused, etc.)

**Inputs:** paste trip notes (demo) or free-text textarea. Mock parser surfaces understood constraints.

### 2 — Recommend a destination (style + pace)

| Control | Options |
|---------|---------|
| **Trip style** | City break · Beach · Nature · Culture |
| **Pace** | Relaxed · Balanced · Adventure (+ city-break preset chip) |

Optional constraints textarea (no long flights, dietary, crowd avoidance).

**CTA:** Compare destinations → loading overlay → result screen.

AI returns **2–3 compared options** with one **winner** and honest trade-offs (mock: Lisbon).

### 3 — Plan it

Turn the pick into action:

| Block | Example (Lisbon) |
|-------|------------------|
| **Itinerary snapshot** | Day 1 arrive · Day 2 Alfama · Day 3 Sintra · Day 4 Belém · Day 5 fly home |
| **Book first** | Flights · hotel · day-trip train |
| **Day plan** | Simple vs detailed toggle |
| **Trade-off note** | Why not Barcelona / Porto for this trip |

User can edit trip context or compare other destinations.

**Later (post-V1):** save trips, price alerts, share itinerary, live booking links.

## UX V1 scope

- Static HTML/CSS/JS gallery (`docs/ux-v1/`)
- i18n: EN, 中文, 한국어, Español
- Light / dark theme (sky-blue accent)
- No API — illustrative copy and Lisbon demo result

## Implementation path

1. Sign off UX in `docs/ux-v1/`
2. `travel_v1` Next.js app (fork `cook_v1` / `meal_v1` shell)
3. Deploy `travel.xingai.app`, update `xingai-dot-app` `apps.ts` (`comingSoon: false`)
