# ADR 0002：OpenAI JSON API 与 mock 回退

**状态：** Accepted  
**日期：** 2026-05-31  
**作者：** Xing @ XingAI  
**取代：** —  
**被取代：** —  
**语言：** [English](0002-openai-json-api-fallback.md) · 中文

## 背景

Travel AI 需要结构化输出：目的地评分、是否首选、行程天数、警告等。自由 Markdown 难渲染，也容易把 UI 搞崩。

DEV-PLAN 曾写 Anthropic Claude；当前实现用 **OpenAI JSON 模式**，并与 Meal Coach 等同款的 **按 IP 日限额** 对齐。

还需要：**无 API Key 也能本地跑**，以及 **生产 demo 控成本**。

## 决策

**三个 Route Handler 使用 OpenAI Chat Completions，`response_format: { type: "json_object" }`。**

| 路由 | 输入 | 输出 |
|------|------|------|
| `POST /api/compare` | `TripContext` | `CompareResult` |
| `POST /api/inspire` | `InspireContext` | `CompareResult` |
| `POST /api/plan` | `{ destination, tripContext }` | `PlanResult` |

规则：

1. **无 `OPENAI_API_KEY`** → 返回 `lib/mock-data.ts` 中的 mock JSON（HTTP 200），UI 可演示。
2. 调用模型前用 **Zod** 校验请求体。
3. **模型** — 环境变量 `OPENAI_TRAVEL_MODEL`，默认 `gpt-4o-mini`。
4. 解析/网络失败 **重试一次**；仍失败则 `502 OPENAI_ERROR`。
5. **限流** — `lib/rate-limit.ts`，仅 compare/inspire 计次（`TRAVEL_DEMO_DAILY_LIMIT`，默认 3；`0` 表示本地不限）。
6. **Prompt** — 集中在 `lib/prompts.ts`；回复语言跟随 payload 中的 `locale`。

plan 路由不单独扣日配额（在 compare 成功后由客户端触发）。

## 后果

**正面**

- `lib/types.ts` 与 UI 契约清晰。
- 设计与 PM 无 Key 也能跑通流程。
- Demo 滥用有廉价服务端上限（V1 内存 map 可接受）。

**负面**

- 内存限流遇冷启动会重置，且不跨 Vercel 实例 — 流量上来需 KV/Redis。
- JSON 结构靠 prompt 约束，非 strict schema — 偶发坏 JSON 依赖重试/回退。

## 曾考虑的替代方案

- **Anthropic Claude** — 暂缓；组织内已有 OpenAI 与 `.env.example`。
- **流式 Markdown 行程** — 否决；对比表需要结构化分数。
- **无 Key 直接报错** — 否决；阻塞 UX 与联盟链接验收。

## 相关

- `app/api/compare/route.ts`、`app/api/inspire/route.ts`、`app/api/plan/route.ts`
- `lib/prompts.ts`、`lib/rate-limit.ts`、`lib/mock-data.ts`

## 环境变量

| 变量 | 默认 | 用途 |
|------|------|------|
| `OPENAI_API_KEY` | — | 线上 AI |
| `OPENAI_TRAVEL_MODEL` | `gpt-4o-mini` | 模型覆盖 |
| `TRAVEL_DEMO_DAILY_LIMIT` | `3` | compare/inspire 每 IP 每日上限；`0` 关闭 |
