# ADR 0004：联盟链接放在决策之后

**状态：** Accepted  
**日期：** 2026-05-31  
**作者：** Xing @ XingAI  
**取代：** —  
**被取代：** —  
**语言：** [English](0004-affiliate-after-decision.md) · 中文

## 背景

Travel AI 可通过预订合作方（Skyscanner、Booking.com、Viator 等）变现。风险是：若链接出现太早或太显眼，佣金动机可能影响目的地排序。

产品原则与法律页已写明：**决策质量优先；联盟放在决策之后。**

## 决策

**联盟 URL 仅出现在 `/result` 的「先订」模块中，且用户已看到首选、对比表与 trade-off 之后。**

实现：

1. **`lib/affiliate.ts`** — 根据日期、出发 IATA 猜测、目的地城市生成外链；合作 ID 来自 `NEXT_PUBLIC_*`；无 ID 时链接仍可用（无佣金）。
2. **`components/book-first.tsx`** — 机票/酒店/活动卡片，`rel="noopener noreferrer sponsored nofollow"`。
3. **`POST /api/track`** — 点击记 stdout；后续接 KV 或分析管道。
4. **`/affiliate-disclosure`** — 独立披露页；页脚与移动抽屉可进。
5. **AI Prompt** — compare/inspire/plan 的 JSON 中不含联盟 URL 或平台名；模型只输出决策内容。

明确禁止：

- 在 `/decide` 首屏或对比表上放联盟链接。
- 为佣金重排目的地（靠产品审查，不单靠代码）。
- 隐瞒外链为赞助性质。

## 后果

**正面**

- 与 Invest AI 等 XingAI 决策产品信任模型一致。
- 「先订」块可变现且不改变推荐 UI。
- ID 用环境变量门控 — 未过审合作方也可先上线 UI。

**负面**

- 收入依赖用户到达 `/result` 并点击外链。
- `guessIata` 为尽力猜测 — 小众城市可能机场码不准。

## 曾考虑的替代方案

- **decide 页内嵌 OTA 组件** — 否决；像比价站，不像决策工具。
- **独家合作方** — 否决；用户期望航班/酒店/活动有多家可选。
- **服务端跳转 `/api/go?`** — 暂缓；V1 直接外链更简单。

## 相关

- [PRODUCT-PRINCIPLES.md](../PRODUCT-PRINCIPLES.md)
- [DEV-PLAN-AFFILIATE.md](../../DEV-PLAN-AFFILIATE.md)
- `lib/affiliate.ts`、`components/book-first.tsx`、`app/affiliate-disclosure/page.tsx`

## 环境变量

| 变量 | 合作方 |
|------|--------|
| `NEXT_PUBLIC_SKYSCANNER_PARTNER_ID` | Skyscanner |
| `NEXT_PUBLIC_BOOKING_AFFILIATE_ID` | Booking.com |
| `NEXT_PUBLIC_EXPEDIA_CID` | Expedia |
| `NEXT_PUBLIC_VIATOR_PARTNER_ID` | Viator |
| `NEXT_PUBLIC_GETYOURGUIDE_PARTNER_ID` | GetYourGuide |
