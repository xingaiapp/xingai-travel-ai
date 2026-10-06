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
5. **城市 OG 图。** `cityOgImage()` / `resolveCityImageSrc()` — 不对 `http(s)` URL 追加 `-1600.webp`；远程 hero 的 OG/Twitter 用本站 `/assets/hero-travel-decision.png`。
6. **首页 hero。** 去掉轮播 `unoptimized`，由 Next 出多档尺寸；首图保留 `priority`。

## 后果

- 比较前必须填出发地，减少误交示例单。
- 即使模型无视 prompt，“避开长途”仍会尽量降权（依赖 `scores.flightTime` 解析）。
- 小时解析是启发式；奇怪文案可能漏降权 — prompt 仍保留规则。
- 三城页内仍可用 Unsplash hero；分享卡用品牌 PNG，直到有本站实拍。

## 相关

- `lib/mock-data.ts`、`components/trip-form.tsx`、`components/decide-page.tsx`
- `lib/prompts.ts`、`lib/compare-normalize.ts`、`app/api/compare/route.ts`
- `lib/cities/share-image.ts`、`app/city/[slug]/page.tsx`、`components/home-landing.tsx`
- [ADR 0001](./0001-compare-first-product-scope.zh.md) · [ADR 0010](./0010-city-map-soft-fill-decide.zh.md) · [ADR 0011](./0011-first-html-seo-honesty.zh.md)
