# ADR 0001: Compare-first product scope

**Status:** Accepted  
**Date:** 2026-05-31  
**Author:** Xing @ XingAI  
**Supersedes:** —  
**Superseded by:** —  
**Also available:** [中文](0001-compare-first-product-scope.zh.md)

## Context

Travel products usually optimize for **inventory** — flights, hotels, packages. Users open five tabs, compare prices, and still do not know *where* they should go.

XingAI already ships **decision systems** (Invest AI, Meal Coach, Cook AI). Travel AI should match that pattern: one constrained recommendation with explicit trade-offs, not another booking wall.

The static UX gallery (`docs/ux-v1/`) and product principles doc both state: **compare first, plan second**.

## Decision

**XingAI Travel AI V1 is a destination decision tool, not an OTA.**

| In scope | Out of scope (V1) |
|----------|-------------------|
| Trip context capture on `/decide` | Live price search across OTAs |
| Compare 3 destinations → 1 winner | Account system / saved trips DB |
| Honest trade-offs + confidence | Multi-city routing engine |
| Book-first checklist + itinerary on `/result` | Internal version labels in UI |
| Optional affiliate execution links | Commission-driven ranking |

Primary routes:

- `/decide` — input + compare CTA (+ inline preview)
- `/result` — winner, table, book-first, itinerary

Product upgrade rule (workspace `AGENTS.md`): later versions inherit prior UX and flows; new features stay optional until proven.

## Consequences

**Positive**

- Clear positioning vs Booking.com / Google Flights.
- Shared XingAI chrome and decision UX patterns across products.
- Smaller backend: three JSON API routes, no database in V1.

**Negative**

- Users expecting instant price quotes may bounce until copy sets expectations.
- `/result` is session-backed — not a stable share URL without future persistence work.

## Alternatives considered

- **Itinerary-first generator** — rejected; hides the hardest question (“where?”).
- **Full OTA affiliate hub** — rejected; violates decision-quality-first rule.
- **Merge into a generic “XingAI lifestyle super-app”** — rejected; focused deploy at `travel.xingai.app`.

## Related

- [PRODUCT-PRINCIPLES.md](../PRODUCT-PRINCIPLES.md)
- [docs/ux-v1/PRODUCT-FLOW.md](../ux-v1/PRODUCT-FLOW.md)
- Tech blog: [Compare-first decision system](../tech-blog/2026-05-31-travel-compare-first-decision-system.md)
