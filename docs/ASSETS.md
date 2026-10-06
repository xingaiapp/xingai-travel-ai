# Site imagery (高清)

All **wired** images under `public/` must meet minimum width before merge. `npm run build` runs `check:assets`.

**Agent rule:** `.cursor/rules/travel-image-quality.mdc` — clean, sharp delivery + Next Image config (always on in this repo).

## Minimum widths

| Use | Path pattern | Min width |
|-----|----------------|-----------|
| Home hero carousel | `public/assets/home-hero-{hong-kong,tokyo,seoul,los-cabos}.webp` | 2400 (target **2560×1440**, 16:9) |
| Home destination cards | `public/assets/dest-*-v2.webp` | 1600 (16:10) |
| Compare / result city cards | `public/assets/destination-*-card.webp` | 1600 |
| Sidebar trip thumb | `public/assets/destination-lisbon-thumb.webp` | 800 |
| Decide hero background | `public/assets/hero-travel-decision.webp` | 2400 |
| HK harbour promo block | `public/assets/home-hero-harbour-v2.webp` | 1920 (target 2560×1440) |
| Global footer photo | `public/assets/footer-traveler-hong-kong.webp` | 2400 (target 2560×1440) |
| Travel stories | `public/stories/**/-800.webp`, `-1600.webp` | 800 / 1600 (see `scripts/process-story-photos.mjs`) |
| City layer photos | same `-800`/`-1600` convention | 800 / 1600 |

Icons (`favicon`, `logo-*.png`) and UX mock assets in `docs/ux-v1/` are excluded.

## Commands

```bash
npm run check:assets    # fail if any wired asset is too small
npm run assets:hires    # re-export from high-res sources (safe overwrite)
npm run stories:photos  # story episode stills (EXIF strip, 800/1600)
```

## When an asset is too small

1. Prefer a **higher-res source** in-repo (hero → card crop, story still → harbour block, PNG master → webp).
2. Run `npm run assets:hires -- --force`.
3. If there is no good source (upscale would look soft), **regenerate** matching scene/style, then add or update a job in `scripts/process-site-images.mjs`.
4. Remove unused low-res files so nothing links to them by mistake.

Do not ship new UI paths to sub-1600 photography without updating the script and this table.
