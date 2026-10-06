# ADR 0019: Page-scoped JSON-LD + Decide funnel events + city `q`

**Status:** Accepted  
**Date:** 2026-10-06  
**Author:** Xing @ XingAI  
**Also available:** [中文](0019-jsonld-funnel-city-q.zh.md)

## Context

Sitewide `SeoJsonLd` injected FAQPage + HowTo on every route while the homepage also emitted FAQPage. Stories lacked Article schema. Decide funnel lacked start/view events. City search text was not in the URL (region/intent already were).

## Decision

1. **Sitewide JSON-LD** keeps Organization / WebSite / WebApplication only.
2. **FAQPage** on `/faq` (and the existing homepage FAQ block). **HowTo** on `/how-it-works` only.
3. **Article + Person (Xing)** JSON-LD on each published story episode.
4. **`decide_start` / `recommendation_view`** via `/api/track`.
5. **`/city?q=`** syncs the search box; 404 document title is “Page not found”.

## Consequences

- Schema matches visible page content for crawlers and partner audits.
- Funnel metrics cover decide → recommendation → booking CTA → click.

## Related

- `lib/seo-json-ld.ts`, `app/faq/page.tsx`, `app/how-it-works/page.tsx`, `app/stories/.../page.tsx`
- `components/decide-page.tsx`, `components/city/cities-index.tsx`, `app/not-found.tsx`
