# ADR 0009: SEO / AEO / GEO content graph (Decision Engine preserved)

**Status:** Accepted  
**Date:** 2026-10-02  
**Author:** Xing @ XingAI  
**Also available:** [中文](0009-seo-aeo-geo-content-graph.zh.md)

## Context

`/decide` is a strong **conversion** surface (Travel Decision System), but it is a poor **SEO landing page**: crawlers see a form, not answers to queries like “Tokyo vs Seoul” or “where to travel in November”. Public index coverage for `travel.xingai.app` is thin.

We already have Stories, `llms.txt`, layout FAQ/HowTo JSON-LD, and `/city/[slug]` (ADR 0008). Missing: canonical methodology, visible FAQ, comparison pages, and intent guides that funnel into `/decide` without changing ranking logic.

## Decision

1. **Keep `/decide` as conversion.** SEO/AEO pages answer first, then CTA to the Decision Engine.
2. **Ship a content graph** under:
   - `/how-it-works` — methodology (GEO canonical)
   - `/faq` — visible Q&A aligned with FAQPage schema
   - `/compare/[slug]` — A vs B decision pages
   - `/guides/[slug]` — intent pages (month, budget, style)
3. **Reuse `/city/[slug]`** for in-destination guides (ADR 0008). Do not invent a parallel `/destinations/` tree in v1; link city pages from compare/guides/stories.
4. **Honesty:** no fake numeric factor scores on content pages. Use qualitative fit labels and explicit “estimate / first-hand / methodology” labels. Content never feeds `/api/compare` scoring (same boundary as ADR 0006 / 0008).
5. **Phased scale:** start with a small set of high-intent pages; expand only with reviewed copy. Do not auto-generate thin pages for GEO spam.
6. **Discoverability:** sitemap + `llms.txt` list all published content URLs; footer exposes How it works / FAQ / Compare / Guides.

## Consequences

- Search/AI systems get citable answer blocks and internal links into `/decide`.
- Product chrome (Decide / Stories / Trips) stays unchanged.
- Editorial cost rises with each new compare/guide; quality > volume.

## Related

- [ADR 0001](./0001-compare-first-product-scope.md) · [ADR 0006](./0006-stories-after-decision.md) · [ADR 0008](./0008-city-layer-after-decision.md)
