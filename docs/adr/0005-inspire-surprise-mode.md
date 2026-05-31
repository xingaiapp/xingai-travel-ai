# ADR 0005: Inspire / Surprise Me mode

**Status:** Accepted  
**Date:** 2026-05-31  
**Author:** Xing @ XingAI  
**Supersedes:** —  
**Superseded by:** —  
**Also available:** [中文](0005-inspire-surprise-mode.zh.md)

## Context

Many users land on Travel AI **without a destination in mind**. The primary flow assumes they can name candidate cities or regions in trip notes — that is still friction.

We need an optional path that matches the headline (“Where should I go — really?”) without turning the product into a random destination spinner.

## Decision

**Add a mode toggle on `/decide` with two paths that converge on the same `CompareResult` UI.**

| Mode | UI | API |
|------|-----|-----|
| **I know where I want to go** | Full `TripForm` + `StylePaceSelector` | `POST /api/compare` |
| **Surprise me** | `InspireForm` (vibe, flight range, priority chips) | `POST /api/inspire` |

Rules:

1. **Same result components** — `DestinationCompare`, `/result` page; inspire is not a separate product surface.
2. **Legal banner** when inspire mode is active — suggestions only; user decides; link to `/disclaimer`. Copy in all four locales (`inspireLegal`).
3. **Visual distinction** — gold/amber styling on surprise tab (`surprise-tab-idle` / active) so optional path is obvious, not default.
4. **Budget/travelers** — inherited from trip form defaults when user switches modes; inspire payload can include optional dates/origin if already filled.
5. **Prompt** — `buildInspirePrompt()` asks model to propose 3 destinations from preferences, same JSON schema as compare.

Compare table photo preview (tap column header) applies to both modes; recommendation copy stays on winner.

## Consequences

**Positive**

- Covers “no idea where to go” without a second app.
- One code path for result rendering and affiliate book-first.
- Clear legal boundary for open-ended AI suggestions.

**Negative**

- Two prompts to maintain; inspire temperature slightly higher (0.5 vs 0.3) — monitor for consistency.
- Users may expect inspire to skip trade-off honesty — copy must reinforce comparison, not magic pick.

## Alternatives considered

- **Separate `/inspire` route** — rejected; splits analytics and chrome.
- **Random destination button** — rejected; no constraint fit, no trade-offs.
- **Conversational chat UI** — rejected for V1; tab overload product goal.

## Related

- `components/decide-page.tsx`, `components/inspire-form.tsx`
- `app/api/inspire/route.ts`, `lib/prompts.ts` (`buildInspirePrompt`)
- [ADR 0001](./0001-compare-first-product-scope.md), [ADR 0002](./0002-openai-json-api-fallback.md)
