# ADR 0019：按页 JSON-LD + Decide 漏斗埋点 + 城市搜索 `q`

**状态：** 已接受  
**日期：** 2026-10-06  
**作者：** Xing @ XingAI  
**英文版：** [English](0019-jsonld-funnel-city-q.md)

## 背景

全站 `SeoJsonLd` 在每个路由注入 FAQPage + HowTo，首页又另有 FAQPage。故事页缺 Article。Decide 缺开始/展示埋点。城市搜索词未进 URL（region/intent 已有）。

## 决策

1. **全站 JSON-LD** 只保留 Organization / WebSite / WebApplication。
2. **FAQPage** 在 `/faq`（首页原有 FAQ 保留）。**HowTo** 只在 `/how-it-works`。
3. **故事分集**输出 Article + Person（Xing）。
4. **`decide_start` / `recommendation_view`** 走 `/api/track`。
5. **`/city?q=`** 同步搜索框；404 文档 title 为 “Page not found”。

## 后果

- Schema 与可见内容对齐，利于收录与审核。
- 漏斗可覆盖 decide → 推荐 → 预订入口 → 点击。

## 相关

- `lib/seo-json-ld.ts`、`app/faq/page.tsx`、`app/how-it-works/page.tsx`、`app/stories/.../page.tsx`
- `components/decide-page.tsx`、`components/city/cities-index.tsx`、`app/not-found.tsx`
