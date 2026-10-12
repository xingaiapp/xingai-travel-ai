# Travel SEO audit follow-ups (2026-10-12)

Verified against live `travel.xingai.app` before code changes. Closes the “待验证” items from the audit review.

## Findings

| Item | Verdict |
|---|---|
| zh/ko/es content thickness | **Not a blanket thin-site problem.** Sampled main content: `/zh`, `/zh/compare/*`, `/zh/city/tokyo`, `/zh/faq`, `/ko/compare/*`, `/es/compare/*` are mostly in the path language. Thinner hubs: `/zh/stories` (~500 main chars). GSC “crawled, not indexed” needs a separate content-expansion work order for hubs + any leftover EN-only chrome — not a one-line fix. |
| `<html lang>` | **Confirmed bug.** All locale URLs served `lang="en"` from the root layout. Fixed: locale tree sets `zh-CN` / `ko` / `es` / `en` in first HTML (no `headers()`, CDN-safe). |
| `/pricing` | **Not a defect.** 404, absent from sitemap, no in-app `/pricing` links (only `lib/pricing-tiers.ts` for Free/Pro labels). Closed. |
| `/decide` dual `<h1>` | **Confirmed.** Mobile strip repeated the accent line as a second `<h1>` (substring of the desktop title). Mobile tag demoted to `<p>`. |
| Sitemap `lastmod` | Static hubs had **no** lastmod (~60 URLs). Content families shared midnight stamps. Fixed: shell/city/compare/guide/stories dates with distinct UTC times; episodes keep `publishedAt`. |
| Compare JSON-LD | Visible FAQ had no FAQPage schema. Each `/compare/[slug]` now emits FAQPage matching on-page Q&A. |
| `og:image` size | Default OG JPEG ~450 KB (`content-length: 459507`) — fine. |
| speakable | Out of scope for Travel (not a news publisher). |

## Next audit template notes

- Drop speakable checks for Travel.
- Add GSC indexed vs crawled-not-indexed rate.
- Sample ≥3 URLs per page type (home, decide, city, compare, guide, story) × locale.
- Prefer byte/hash equality for `llms.txt`, not line counts.
- Do not raise P1 solely because the verification method changed.
- Grep hreflang with `hrefLang|hreflang` (Next emits camelCase `hrefLang`).
- Before flagging `/pricing` 404: check sitemap + in-app links; no product page ⇒ not a defect.
- Re-verify badge/count claims against the same data source as the hero (do not hand-count RSC duplicates).

## CI lint follow-up (same day)

- `react-hooks/set-state-in-effect`: Stories NEW badge + Trips usage counters hydrate via `queueMicrotask` after mount.
- Theme boot: inline script at body start (avoids `next/script` `beforeInteractive` outside `pages/_document`).
