# ADR 0002: OpenAI JSON API with mock fallback

**Status:** Accepted  
**Date:** 2026-05-31  
**Author:** Xing @ XingAI  
**Supersedes:** —  
**Superseded by:** —  
**Also available:** [中文](0002-openai-json-api-fallback.zh.md)

## Context

Travel AI needs structured outputs: destination scores, winner flag, itinerary days, warnings. Free-form markdown is hard to render and easy to break in UI.

DEV-PLAN originally listed Anthropic Claude; the shipped app uses **OpenAI** with JSON mode, matching other XingAI demos (Meal Coach rate-limit pattern).

We also need **local dev and CI** to work without API keys, and **demo cost control** in production.

## Decision

**Three route handlers call OpenAI Chat Completions with `response_format: { type: "json_object" }`.**

| Route | Input | Output |
|-------|-------|--------|
| `POST /api/compare` | `TripContext` | `CompareResult` |
| `POST /api/inspire` | `InspireContext` | `CompareResult` |
| `POST /api/plan` | `{ destination, tripContext }` | `PlanResult` |

Rules:

1. **No `OPENAI_API_KEY`** → return mock JSON from `lib/mock-data.ts` (HTTP 200). UI stays demo-able.
2. **Zod validation** on request bodies before any model call.
3. **Model** — `OPENAI_TRAVEL_MODEL` env, default `gpt-4o-mini`.
4. **Retry once** on parse/network failure; then `502 OPENAI_ERROR`.
5. **Rate limit** — `lib/rate-limit.ts`, per-IP daily cap on compare/inspire only (`TRAVEL_DEMO_DAILY_LIMIT`, default 3; `0` = unlimited for local).
6. **Prompts** — centralized in `lib/prompts.ts`; response language follows `locale` in payload.

Plan route does not increment the daily counter (fired after compare succeeds).

## Consequences

**Positive**

- Predictable UI contracts via TypeScript types in `lib/types.ts`.
- Designers and PMs can run the app without keys.
- Demo abuse capped cheaply on serverless (in-memory map; acceptable for V1).

**Negative**

- In-memory rate limits reset on cold start and do not span Vercel instances — upgrade to KV/Redis when traffic grows.
- JSON schema is prompt-enforced, not OpenAI strict schema — occasional malformed responses need retry/fallback.

## Alternatives considered

- **Anthropic Claude** — deferred; OpenAI already in org tooling and `.env.example`.
- **Streaming markdown itinerary** — rejected; compare table needs structured scores.
- **Fail hard without API key** — rejected; blocks UX review and affiliate QA.

## Related

- `app/api/compare/route.ts`, `app/api/inspire/route.ts`, `app/api/plan/route.ts`
- `lib/prompts.ts`, `lib/rate-limit.ts`, `lib/mock-data.ts`

## Env reference

| Variable | Default | Purpose |
|----------|---------|---------|
| `OPENAI_API_KEY` | — | Live AI |
| `OPENAI_TRAVEL_MODEL` | `gpt-4o-mini` | Model override |
| `TRAVEL_DEMO_DAILY_LIMIT` | `3` | Compare/inspire cap per IP/day; `0` disables |
