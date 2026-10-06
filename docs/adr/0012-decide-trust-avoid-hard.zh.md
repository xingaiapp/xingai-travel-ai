# ADR 0012：Decide 可信度 — 空表单默认 + Avoid 硬约束

**状态：** Accepted  
**日期：** 2026-10-06  
**作者：** Xing @ XingAI  
**语言：** [English](0012-decide-trust-avoid-hard.md) · 中文

## 背景

2026-10-06 全站复盘发现决策路径上两处信任问题：

1. **示例行程预填。** `defaultTrip` 自带 SFO、愿望与 “Long flights, extreme heat”。用户不改直接提交，等于替别人做了决定。
2. **Avoid 是软的。** compare prompt 只把 Avoid 当普通文字；normalize 不降权。4 晚行程写了 “Avoid: Long flights”，仍可能把约 12 小时的里斯本转机排进前三。

新加坡 / 巴塞罗那 / 西安的分享图还给 Unsplash URL 末尾拼了 `-1600.webp`，弄坏查询串（对齐 [ADR 0011](./0011-first-html-seo-honesty.zh.md) 的诚实目标）。

## 决策

1. **旅行者字段默认留空。** `defaultTrip` 保留日期 / 预算 / 人数形状；`origin`、`notes`、`avoid` 起始为空。区域示例城市只出现在 **placeholder**——切换区域不得写入 `placesInMind`。
2. **比较前必须填出发地。** 客户端拦截并提示；API 仍用 zod 拒绝空 origin。
3. **Avoid 在 prompt + normalize 都当硬约束。** `buildComparePrompt` 写明 HARD CONSTRAINTS（≤5 晚且 Avoid 含长途：前三不得出现约 9h+ 航程）。`normalizeCompareResult(result, trip)` 在可解析的飞行小时超限时降权（overall ≤2、confidence low、重选 winner）。
4. **compare prompt 不做国籍假定**（无默认 “美国公民免签” 类句子）。
5. **城市 OG 图。** `cityOgImage()` / `resolveCityImageSrc()` — 不对 `http(s)` URL 追加 `-1600.webp`；远程 hero 用本站高清分享卡（见 [ADR 0014](./0014-score-parity-og-hires.zh.md) 的 `/assets/og-travel-decision-2400.jpg`）。
6. **首页 hero 图片加载**（详见 [tech blog](../tech-blog/2026-10-06-next-image-hero-unoptimized-vs-priority.zh.md)）：
   - **去掉 `unoptimized`。** 开着时浏览器直接拉 `/assets/home-hero-*.webp` 原图（约 2560px，每张几百 KB）。手机也要下桌面级大图，首屏 LCP 常先空白一阵。
   - 去掉后走 `/_next/image`，配合 `sizes` 按屏宽出较小文件。
   - **保留首图 `priority={slideIndex === 0}`。** 只给第一张标 LCP：提前抓取（接近 `fetchPriority=high`）。后面几张仍可懒加载。
   - 别混为一谈：`priority` 管**何时**抓；`unoptimized` 管**是否**缩放。我们要的是「早点抓优化后的图」，不是「早点抓 2560 原图」。

## 后果

- 比较前必须填出发地，减少误交示例单。
- 即使模型无视 prompt，「避开长途」仍会尽量降权（依赖 `scores.flightTime` 解析）。
- 小时解析是启发式；奇怪文案可能漏降权 — prompt 仍保留规则。
- 三城页内仍可用 Unsplash hero；分享卡用品牌 PNG，直到有本站实拍。
- 手机首页 hero 字节更小，同时首图仍优先加载。

## 相关

- `lib/mock-data.ts`、`components/trip-form.tsx`、`components/decide-page.tsx`
- `lib/prompts.ts`、`lib/compare-normalize.ts`、`app/api/compare/route.ts`
- `lib/cities/share-image.ts`、`app/city/[slug]/page.tsx`、`components/home-landing.tsx`
- Tech blog：[Next.js Image：去掉 unoptimized，保留 priority](../tech-blog/2026-10-06-next-image-hero-unoptimized-vs-priority.zh.md)
- [ADR 0001](./0001-compare-first-product-scope.zh.md) · [ADR 0010](./0010-city-map-soft-fill-decide.zh.md) · [ADR 0011](./0011-first-html-seo-honesty.zh.md)
