# ADR 0016: Traffic recovery — custom 404, FAQ link labels, Decide CTA, Stories index honesty

**Status:** Accepted  
**Date:** 2026-10-06  
**Author:** Xing @ XingAI  
**Also available:** [中文](0016-traffic-404-faq-stories.zh.md)

## Context

Launch priority is traffic and bug fixes (affiliate later; Stories UGC deferred). Third-round review still listed:

- Next.js default 404 copy
- FAQ answers showing raw paths like `/stories/hong-kong` as link text
- Desktop “Make My Travel Decision” on `/decide` linking to `/decide` again
- `/stories` index very thin for SEO / AEO

## Decision

1. **Custom `app/not-found.tsx`** with Decide / Cities / Home CTAs (localized).
2. **FAQ `linkifyInternalPaths`** shows human labels (Decide, Hong Kong stories, …) while `href` stays the path.
3. **Chrome Decide CTA** on decide/result routes points to `/decide#trip-form`.
4. **Stories index** adds publisher-only honesty copy + Decide CTA; metadata clarifies not a UGC feed. No user submissions.

## Consequences

- Dead links recover into product flows instead of a blank Next error.
- FAQ and Stories stay crawl-friendly without opening UGC or affiliate work.

## Related

- `app/not-found.tsx`, `components/content-shell.tsx`, `components/app-chrome.tsx`, `components/story-view.tsx`
- [ADR 0006](./0006-stories-after-decision.md) · [ADR 0015](./0015-constraint-conflict-privacy-i18n.md)
