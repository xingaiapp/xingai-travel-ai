# ADR 0011: First-HTML SEO honesty for indexable Travel routes

**Status:** Accepted  
**Date:** 2026-10-06  
**Author:** Xing @ XingAI  
**Supersedes:** —  
**Superseded by:** —  
**Also available:** [中文](0011-first-html-seo-honesty.zh.md)

## Context

[ADR 0009](./0009-seo-aeo-geo-content-graph.md) ships the content graph and discoverability rules. A 2026-10-06 crawl / self-check still found gaps that hurt SEO, AEO, and GEO even when pages returned 200:

- `/city` used `useSearchParams` in a way that forced a **client-side render bailout**, so crawlers did not get the full city directory in the first HTML.
- Some routes set a self-canonical but **Open Graph / Twitter `url` did not match**, so share cards and answer engines could disagree with the canonical.
- City titles / H1 duplicated Latin `localName` noise.

Workspace cache/SEO rule: users and bots get the **same core HTML**; correctness beats a fake “CSR looks fine in the browser” check.

## Decision

1. **`/city` stays statically prerendered with the full catalog in the first HTML.** Directory filters may sync from the URL on the client after paint. Do not reintroduce `useSearchParams` (or similar) if it CSR-bailouts the index page.
2. **Server `searchParams` may seed filters when the route is a real server page**; if filter parsing must stay client-only, still render the **unfiltered full catalog** in SSR HTML first (current shipped shape: always full catalog SSR; client syncs region/intent from the path/query).
3. **Shared `pageMeta()` for indexable routes.** Every sitemap URL gets:
   - self-canonical `alternates.canonical`
   - matching `openGraph.url` and Twitter URL fields
   - title + description + OG/Twitter images
4. **Filter helpers that both server and client use live in non-`use client` modules** (e.g. `lib/cities/filters.ts`). Do not import parse helpers from client-only modules into Server Components (that caused `/city` 500s).
5. **No cloaking / no bot-only HTML.** Crawl checks compare the same HTML a user gets; User-Agent spoofing is not a substitute for indexing proof.
6. **Content graph honesty from ADR 0009 still holds.** This ADR does not authorize thin auto-pages or fake rankings for crawl volume ([ADR 0010](./0010-city-map-soft-fill-decide.md)).

## Consequences

**Positive**

- City directory and other indexables expose answerable first HTML to Googlebot / Bingbot / GPTBot-class crawlers.
- Canonical and social URL stay one story.
- Filter logic stays shareable without Server/Client boundary bugs.

**Negative**

- Full catalog in first HTML is heavier than a filter-only CSR shell; acceptable at current Top-10 guide scale.
- Client filter sync can briefly disagree with URL until hydration; first paint prefers catalog completeness.

## Alternatives considered

- **Keep CSR directory “it works in Chrome”:** rejected — fails one-HTML / AEO checklist.
- **Separate bot-only static dump:** rejected — cloaking risk; forbidden by workspace SEO rule.
- **Per-page hand-rolled metadata forever:** rejected — drift caused mismatched `og:url`; central `pageMeta()` is the fix.

## Related

- `lib/seo-meta.ts` (`pageMeta`)
- `app/city/page.tsx`, `lib/cities/filters.ts`, `components/city/cities-index.tsx`
- [ADR 0008](./0008-city-layer-after-decision.md) · [ADR 0009](./0009-seo-aeo-geo-content-graph.md) · [ADR 0010](./0010-city-map-soft-fill-decide.md)
- Workspace: `.cursor/rules/xingai-cache-seo-aeo-geo.mdc`
