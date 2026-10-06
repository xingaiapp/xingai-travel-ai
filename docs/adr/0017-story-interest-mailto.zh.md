# ADR 0017：故事兴趣探测（mailto）— 不写「即将推出」，暂不做 UGC

**状态：** 已接受  
**日期：** 2026-10-06  
**作者：** Xing @ XingAI  
**英文版：** [English](0017-story-interest-mailto.md)

## 背景

ADR 0006 将读者 UGC 推迟到有登录、审核与法律更新之后。写「分享你的旅行 — 即将推出」会把未立项功能包装成即将上线，伤害诚实感。

但仍需要信号：读者是否想投稿？

## 决策

1. 在 `/stories`、季页、分集结尾放**兴趣 CTA**：明确**尚未**发布读者故事，只邀请发邮件表达兴趣。
2. **按钮 = `mailto:contact@xingai.app`**，带简短主题/正文模板。无表单、无照片上传。
3. 埋点 **`story_submit_interest`**（走现有 `/api/track`）。
4. **隐私政策**说明：主动发来的故事兴趣邮件仅用于回复与评估需求。

点击足够多再另写 UGC ADR；不够则继续只发出版方故事。

## 后果

- 不做假路线图承诺。
- 不建审核也能测需求。

## 相关

- [ADR 0006](./0006-stories-after-decision.zh.md) · [ADR 0016](./0016-traffic-404-faq-stories.zh.md)
- `components/story-view.tsx`、`lib/stories/index.ts`、`app/api/track/route.ts`、`components/legal-page.tsx`
