# ADR 0013：Compare 诚实文案 + 匹配分清晰度 + 基础安全头

**状态：** Accepted  
**日期：** 2026-10-06  
**作者：** Xing @ XingAI  
**语言：** [English](0013-compare-honesty-match-headers.md) · 中文

## 背景

[ADR 0012](./0012-decide-trust-avoid-hard.zh.md) 之后，2026-10-06 复盘仍剩几处信任 / SEO 抛光：

- Compare / Guides 相关链接露出 `/city/…` 与 slug；FAQ 里 `/stories/…` 是纯文本。
- 结果页把 Match Score、Overall fit /10、Confidence 叠在同一含义上。
- 星级 + 置信度相同的备选常并列同一 /100 分。
- 响应缺基础安全头（完整 script CSP 延后 — 会弄坏 Next）。

## 决策

1. **相关链接用人名。** 城市用 `getCity` 显示名；对比页用 `getCompare` 标题。
2. **FAQ 路径自动成链。** `FaqBlock` 把站内已知路径变成 `<Link>`。
3. **对比维度文案。** 「站内亲历故事」改为「初次到访者清晰度」。
4. **Match Score 是唯一头条适配数字。** 去掉重复的 Overall fit 条与标题旁 Confidence 胶囊；天气 / 航班 / 步行仍作支撑事实。
5. **分数可区分。** `computeMatchScore` 可加小幅步行加成（0–3）；`rankedAlternatives` 同分时更短航程优先；备选行展示飞行时间。
6. **安全头**（`next.config.mjs`）：`X-Content-Type-Options`、`Referrer-Policy`、`X-Frame-Options: DENY`、`Permissions-Policy`（关摄像头/麦/定位）、仅 `CSP: frame-ancestors 'none'` — 暂不上完整 script CSP。
7. **目录文案。** 去掉过时的「Top 10」（已上线超过十座）。

## 后果

- 内容页读起来像产品文案，不是 URL 清单。
- 适配 UI 更好扫；并列更少。
- 降低点击劫持等表面风险，又不因 CSP 打断 hydration。
- 完整 CSP、`/assets` 带 hash 长缓存不在本 ADR。

## 相关

- `components/content-pages.tsx`、`components/content-shell.tsx`、`components/destination-compare.tsx`
- `lib/match-score.ts`、`lib/content/compares.ts`、`next.config.mjs`
- [ADR 0011](./0011-first-html-seo-honesty.zh.md) · [ADR 0012](./0012-decide-trust-avoid-hard.zh.md)
