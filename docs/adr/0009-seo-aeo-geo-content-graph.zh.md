# ADR 0009：SEO / AEO / GEO 内容图（保留决策引擎）

**Status:** Accepted  
**Date:** 2026-10-02  
**Author:** Xing @ XingAI  
**语言：** [English](0009-seo-aeo-geo-content-graph.md) · 中文

## 背景

`/decide` 是强转化页，但不是好的 SEO 落地页：爬虫看到的是表单，不是 “Tokyo vs Seoul”“十一月去哪玩” 这类答案。`travel.xingai.app` 公开索引覆盖很弱。

已有 Stories、`llms.txt`、布局层 FAQ/HowTo JSON-LD，以及 `/city/[slug]`（ADR 0008）。缺的是：方法论页、可见 FAQ、对比页、意图型指南，以及导向 `/decide` 的内链——且不改动排名逻辑。

## 决策

1. **`/decide` 只做转化。** SEO/AEO 页先给答案，再 CTA 进决策引擎。
2. **内容图：** `/how-it-works`、`/faq`、`/compare/[slug]`、`/guides/[slug]`。
3. **目的地深度页沿用 `/city/`**（ADR 0008）；v1 不平行开 `/destinations/`。
4. **诚实：** 内容页禁止假数字分；用定性标签。内容永不进入 compare 打分（同 ADR 0006 / 0008）。
5. **分批：** 先少而精，禁止批量灌水。
6. **可发现性：** sitemap + `llms.txt` + 页脚 Discover。

## 后果

- 搜索与 AI 有可引用答案块；产品主导航不变。
- 每加一页都有编辑成本。

## 相关

- [ADR 0001](./0001-compare-first-product-scope.zh.md) · [ADR 0006](./0006-stories-after-decision.zh.md) · [ADR 0008](./0008-city-layer-after-decision.zh.md)
