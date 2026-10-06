# ADR 0018：预订入口曝光埋点 + 伙伴 Cookie 隐私披露

**状态：** 已接受  
**日期：** 2026-10-06  
**作者：** Xing @ XingAI  
**英文版：** [English](0018-booking-cta-view-privacy.md)

## 背景

收入验证需要「看见 → 点击」，不能只有点击。申请联盟前，隐私政策应写明伙伴归因 cookie。有 ID 后的披露文案切换已在 ADR 0004 / `affiliateIdsConfigured()` 完成。

## 决策

1. **`booking_cta_view`**：Book-first 区块可见 ≥25% 时，每次挂载只记一次（与 `affiliate_click` 成对）。
2. **隐私**：增加「Partner booking links」说明伙伴 cookie/追踪；排序不受佣金影响；未配置 ID 时无佣金。
3. **申请用简介**：`docs/affiliate-application-blurb.md`（中英）。

## 后果

- 低流量也能积累转化数据，方便与伙伴沟通。
- 隐私与点击后的伙伴追踪行为对齐。

## 相关

- [ADR 0004](./0004-affiliate-after-decision.zh.md)
- `components/book-first.tsx`、`app/api/track/route.ts`、`components/legal-page.tsx`、`docs/affiliate-application-blurb.md`
