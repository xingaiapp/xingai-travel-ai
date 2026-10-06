# Next.js Image on the Travel home hero: drop `unoptimized`, keep `priority`

**Date:** 2026-10-06  
**Author:** Xing @ [XingAI](https://xingai.app)  
**Project:** [XingAI Travel AI](https://travel.xingai.app) — `xingai-travel-ai`  
**Tags:** `nextjs` `performance` `lcp` `mobile` `image`  
**Decision record:** [ADR 0012](../adr/0012-decide-trust-avoid-hard.md)  
**Also available:** [中文](2026-10-06-next-image-hero-unoptimized-vs-priority.zh.md)

---

## What we changed in one line

On the homepage hero carousel: **stop shipping 2560px originals to phones; still fetch the first slide early.**

Code: `components/home-landing.tsx` — remove `unoptimized`, keep `priority={slideIndex === 0}`, set an honest `sizes`.

## Two knobs people mix up

| Prop | Controls | Bad default we had |
|------|----------|--------------------|
| `unoptimized` | *Whether* Next resizes via `/_next/image` | `true` → browser loads the raw `/assets/home-hero-*.webp` (~2560px, 380–510KB each) |
| `priority` | *When* the browser should fetch | First slide already had this — keep it |

`priority` ≈ “this is likely LCP; load it now.”  
`unoptimized` ≈ “skip the image optimizer; give me the file as stored.”

We want **early fetch of a sized file**, not early fetch of a desktop original.

## Why the blank first paint

A 2026-10-06 site review saw the mobile hero band empty on the first screenshot:

1. Four carousel slides used `unoptimized`.
2. Phones still downloaded ~2560px assets.
3. Even with `priority` on slide 0, the bytes were too heavy for a fast LCP.

Homepage transfer sat around ~2.8MB with those heroes as a large slice.

## What “optimized” means here

After dropping `unoptimized`:

- Next serves `/_next/image?url=…&w=…` variants from `deviceSizes` / `imageSizes` in `next.config.mjs`.
- `sizes="(max-width: 640px) 100vw, (max-width: 1280px) 100vw, 1280px"` tells the browser which width to pick.
- Slide 0 keeps `priority` so it is not lazy-loaded behind the fold.

Later slides stay without `priority` so they do not compete with LCP.

## When `unoptimized` is still OK

- Tiny icons or SVGs already tiny.
- Remote hosts you cannot put through the optimizer (and you accept the cost).
- Debugging a broken optimizer pipeline.

Full-bleed product heroes under `public/assets/` should almost never be `unoptimized` on mobile-first XingAI pages.

## Related

- [ADR 0012 — Decide trust + hero delivery](../adr/0012-decide-trust-avoid-hard.md)
- [ADR 0011 — First-HTML SEO honesty](../adr/0011-first-html-seo-honesty.md)
- Live: https://travel.xingai.app/
