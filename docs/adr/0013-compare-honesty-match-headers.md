# ADR 0013: Compare page honesty + match-score clarity + baseline security headers

**Status:** Accepted  
**Date:** 2026-10-06  
**Author:** Xing @ XingAI  
**Also available:** [中文](0013-compare-honesty-match-headers.zh.md)

## Context

Follow-up to the 2026-10-06 site review after [ADR 0012](./0012-decide-trust-avoid-hard.md). Remaining trust/SEO polish:

- Compare/guides related links showed raw `/city/…` and slug paths; FAQ answers left `/stories/…` as plain text.
- Result UI stacked Match Score + Overall fit /10 + Confidence for the same idea.
- Equal star/confidence alternatives often tied at the same /100 score.
- Response lacked basic browser security headers (CSP full script policy deferred — breaks Next).

## Decision

1. **Human labels for related links.** City names from `getCity`; compare titles from `getCompare`.
2. **FAQ path linkify.** `FaqBlock` turns known internal paths into `<Link>`s.
3. **Compare factor copy.** Replace self-promo “First-hand stories on XingAI” with “First-timer clarity”.
4. **Match Score is the single headline fit number.** Drop duplicate Overall-fit bar and Confidence pill beside the winner title. Keep weather / flight / walkability as supporting facts.
5. **Score differentiation.** `computeMatchScore` may add a small walkability nudge (0–3). `rankedAlternatives` breaks remaining ties by shorter parsed flight hours; UI shows flight time on each alternative row.
6. **Security headers** on all routes via `next.config.mjs`: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options: DENY`, `Permissions-Policy` (camera/mic/geo off), `Content-Security-Policy: frame-ancestors 'none'` only — no full script CSP yet.
7. **Directory copy.** Drop stale “Top 10” wording now that more than ten live guides exist.

## Consequences

- Content pages read as product copy, not URL dumps.
- Fit UI is easier to scan; ties are less common.
- Framing/XSS surface is reduced without shipping a CSP that breaks hydration.
- Full CSP and hashed long-cache for `/assets` stay out of this ADR.

## Related

- `components/content-pages.tsx`, `components/content-shell.tsx`, `components/destination-compare.tsx`
- `lib/match-score.ts`, `lib/content/compares.ts`, `next.config.mjs`
- [ADR 0011](./0011-first-html-seo-honesty.md) · [ADR 0012](./0012-decide-trust-avoid-hard.md)
