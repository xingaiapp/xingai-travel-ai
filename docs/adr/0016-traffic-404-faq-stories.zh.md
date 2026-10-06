# ADR 0016：流量回收 — 自定义 404、FAQ 链接文案、Decide CTA、Stories 索引诚实说明

**状态：** 已接受  
**日期：** 2026-10-06  
**作者：** Xing @ XingAI  
**英文版：** [English](0016-traffic-404-faq-stories.md)

## 背景

当前优先级是流量与修 bug（联盟后做；Stories 用户投稿延后）。第三轮复评仍提到：

- Next 默认 404 文案
- FAQ 把 `/stories/hong-kong` 这类路径当链接文字
- `/decide` 顶栏 CTA 又链回 `/decide`
- `/stories` 索引过薄

## 决策

1. **自定义 `app/not-found.tsx`**，提供 Decide / 城市 / 首页入口（多语言）。
2. **FAQ 内链**显示可读标签，`href` 仍是路径。
3. **Decide/Result 上顶栏 CTA** 指向 `/decide#trip-form`。
4. **Stories 索引**补充「出版方故事、非社区投稿」说明 + Decide CTA；不开放 UGC。

## 后果

- 死链回到产品主路径，而不是空白 Next 错误页。
- 不碰联盟与用户投稿。

## 相关

- `app/not-found.tsx`、`components/content-shell.tsx`、`components/app-chrome.tsx`、`components/story-view.tsx`
- [ADR 0006](./0006-stories-after-decision.zh.md) · [ADR 0015](./0015-constraint-conflict-privacy-i18n.zh.md)
