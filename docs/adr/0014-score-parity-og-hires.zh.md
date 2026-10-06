# ADR 0014：匹配分 UI 一致、表单字段提示、Avoid 降权本地化、高清 OG

**状态：** Accepted  
**日期：** 2026-10-06  
**作者：** Xing @ XingAI  
**语言：** [English](0014-score-parity-og-hires.md) · 中文

## 背景

ADR 0012/0013 之后下午复评发现：

1. 卡片 Match Score（含步行）与对比表表头分数不一致（漏传 walkability），列序仍跟模型原数组。
2. 空出发地校验复用 API 错误卡，带无用的「Try again」，无焦点 / live region。
3. Avoid 降权文案在 `compare-normalize` 里写死英文。
4. 兜底 OG `hero-travel-decision.png` 约 2.2MB，聊天预览不友好；产品要求**高分辨率**源图，不能靠糊缩略图糊弄。

## 决策

1. **全页同一套分数公式。** 表头调用 `computeMatchScore(overall, confidence, walkability)`。列顺序用 winner 优先的 `orderedDestinations`，与 `rankedAlternatives` 对齐。
2. **字段提示 ≠ API 错误。** 空出发地 / 日期校验走 `fieldNotice` + `role="alert"` / `aria-live="assertive"`，滚到并 focus `#trip-origin`，不出现 Try again。
3. **Avoid 降权文案跟 `trip.locale`**（en / zh / ko / es）写 tradeoff 与 `whyNotOthers`。
4. **高清 OG。** 远程城市 OG 指向 `/assets/og-travel-decision-2400.jpg` — 从线上 `home-hero-hong-kong.webp`（2560×1440）裁 **2400×1260**，mozjpeg ~90。另存 WebP 备用。不用低清 AI 图硬放大冒充高清。2.2MB PNG 不再作默认分享图。

## 后果

- 同一页不再出现两套 /100。
- 表单校验可操作、可读屏。
- 非英文用户看到对应语言的 Avoid 降权说明。
- 分享卡保持锐利；体积从 ~2.2MB PNG 降到 ~450KB JPEG，像素仍不低于经典 OG 的 2×。

## 相关

- `components/destination-compare.tsx`、`components/decide-page.tsx`、`components/trip-form.tsx`
- `lib/compare-normalize.ts`、`lib/cities/share-image.ts`
- [ADR 0012](./0012-decide-trust-avoid-hard.zh.md) · [ADR 0013](./0013-compare-honesty-match-headers.zh.md)
