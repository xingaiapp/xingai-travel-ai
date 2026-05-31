# Travel AI — UX V1 (sign-off)

Interactive HTML mocks aligned with **compare first, plan second** wireframe.

## Preview locally

```bash
cd ~/Desktop/ai-projects-work-space/xingai-travel-ai/docs/ux-v1
python3 -m http.server 8765
```

Open **http://localhost:8765/mobile-input.html** (or `index.html` for the gallery).

## What to verify

- **Input:** Structured trip fields + live **Trip snapshot** + style/pace + CTA `Compare destinations →`
- **Result (mobile):** Winner hero first (why + trade-offs + match strength) → **folds** for compare / book-first / itinerary
- **Result (desktop):** Same hierarchy, compare **table**, book-first + itinerary side by side
- **Nav:** Decide · Trips · Saved · Profile (Trips/Saved/Profile/Save trip = Soon)
- **i18n:** EN / 中文 / 한국어 / Español · light/dark

## Demo scenario

April · 5 days · SFO · ~$2k · couple · city + relaxed → **Lisbon** wins over Barcelona / Porto

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
