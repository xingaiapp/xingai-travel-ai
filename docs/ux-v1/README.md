# Travel AI — UX V1 (sign-off)

Interactive HTML mocks for **XingAI Travel AI**: trip context → destination recommendation → bookable plan.

## Preview locally

```bash
cd ~/Desktop/ai-projects-work-space/xingai-travel-ai/docs/ux-v1
python3 -m http.server 8765
```

Open **http://localhost:8765/mobile-input.html** (or `index.html` for the gallery).

Hard refresh after changes: **Cmd+Shift+R**.

## What to verify

Open **`mobile-input.html`** — header should say **Travel · Decide** (sky-blue accent), not Cook (orange) or Routine (green).

- **3-step flow:** Your trip → Recommend a destination → Plan it
- **Nav:** Decide · Trips · Explore · Saved · Profile (Trips/Saved/Profile = Soon)
- **Explore** scrolls to trip context on the input page
- **Result demo:** Lisbon, itinerary snapshot, book-first list, day plan toggle

## Files

| File | Role |
|------|------|
| `messages.js` | `TRAVEL_UX_MESSAGES` (en/zh/ko/es) |
| `ux.js` | Locale, theme, chips, CTA, plan step mode |
| `i18n-boot.js` | Early i18n before paint |
| `tokens.css` | Sky-blue product palette |
| `app.css` | Shared meal-coach shell + travel hero |
| `mobile-input.html` / `mobile-result.html` | Mobile decide + result |
| `desktop-input.html` / `desktop-result.html` | Desktop parity |
| `seo.js` / `seo-config.js` | Meta + JSON-LD |
| `PRODUCT-FLOW.md` | Product spec for V1 |

`assets/` — Travel branding from `xingai-dot-app/public/`:

- `favicon.png`, `logo-light.png`, `logo-dark.png`, `hero-icon.png`, `context-mock.jpg`

## Related repos

- Reference UX: `xingai-cook-ai/docs/ux-v1/`
- Sibling product: `xingai-routine-ai/docs/ux-v1/`
- Marketing: `xingai-dot-app` (`travel-ai` entry, `comingSoon: true`)
