# ADR 0011：可索引 Travel 路由的首屏 HTML 诚实性

**状态：** Accepted  
**日期：** 2026-10-06  
**作者：** Xing @ XingAI  
**取代：** —  
**被取代：** —  
**语言：** [English](0011-first-html-seo-honesty.md) · 中文

## 背景

[ADR 0009](./0009-seo-aeo-geo-content-graph.zh.md) 已落地内容图与可发现性规则。2026-10-06 抓取 / 自检仍发现：页面 200，但 SEO / AEO / GEO 仍吃亏——

- `/city` 因 `useSearchParams` 触发 **CSR bailout**，爬虫首屏 HTML 拿不到完整城市目录；
- 部分路由 self-canonical 与 **Open Graph / Twitter `url` 不一致**，分享卡与答案引擎会对不上；
- 城市 title / H1 重复拉丁 `localName` 噪音。

工作区缓存 / SEO 规则：用户与机器人拿到**同一份核心 HTML**；正确性优先于「浏览器里 CSR 看起来没事」。

## 决策

1. **`/city` 保持静态预渲染，首屏 HTML 含完整目录。** 筛选可在 paint 后由客户端按 URL 同步。若会 CSR-bailout 索引页，不要再引入 `useSearchParams`（或同类 API）。
2. **路由若是真 Server Page，可用服务端 `searchParams` 种子筛选**；若解析必须留在客户端，仍须先 SSR **未筛选的完整目录**（当前上线形态：始终完整目录 SSR；客户端再同步 region/intent）。
3. **可索引路由统一走 `pageMeta()`。** 每个 sitemap URL 具备：
   - self-canonical `alternates.canonical`
   - 匹配的 `openGraph.url` 与 Twitter URL
   - title + description + OG/Twitter 图
4. **服务端与客户端共用的筛选解析放在非 `use client` 模块**（如 `lib/cities/filters.ts`）。禁止从仅客户端模块向 Server Component 导入解析函数（曾导致 `/city` 500）。
5. **不做伪装 / 不为机器人单独 HTML。** 抓取检查对比的是用户同款 HTML；伪造 UA 不能代替收录证明。
6. **ADR 0009 的内容图诚实性仍有效。** 本 ADR 不授权为冲收录量做薄页或假排名（见 [ADR 0010](./0010-city-map-soft-fill-decide.zh.md)）。

## 后果

**正面**

- 城市目录等可索引页向 Googlebot / Bingbot / GPTBot 类爬虫暴露可引用的首屏 HTML。
- Canonical 与社交 URL 同一叙事。
- 筛选逻辑可共享，且不踩 Server/Client 边界。

**负面**

- 首屏完整目录比「仅 CSR 壳」更重；在当前 Top-10 指南规模可接受。
- 水合前客户端筛选可能与 URL 短暂不一致；首屏优先完整目录。

## 曾考虑的替代方案

- **维持 CSR 目录「Chrome 里能用」：** 否决 — 通不过 one-HTML / AEO 清单。
- **单独给机器人静态 dump：** 否决 — 伪装风险；工作区 SEO 规则禁止。
- **继续逐页手写 metadata：** 否决 — 易漂移导致 `og:url` 错位；统一 `pageMeta()`。

## 相关

- `lib/seo-meta.ts`（`pageMeta`）
- `app/city/page.tsx`、`lib/cities/filters.ts`、`components/city/cities-index.tsx`
- [ADR 0008](./0008-city-layer-after-decision.zh.md) · [ADR 0009](./0009-seo-aeo-geo-content-graph.zh.md) · [ADR 0010](./0010-city-map-soft-fill-decide.zh.md)
- 工作区：`.cursor/rules/xingai-cache-seo-aeo-geo.mdc`
