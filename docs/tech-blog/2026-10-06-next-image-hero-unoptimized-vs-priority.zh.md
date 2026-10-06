# Travel 首页 Hero：去掉 `unoptimized`，保留 `priority`

**日期：** 2026-10-06  
**作者：** Xing @ [XingAI](https://xingai.app)  
**项目：** [XingAI Travel AI](https://travel.xingai.app) — `xingai-travel-ai`  
**标签：** `nextjs` `performance` `lcp` `mobile` `image`  
**决策记录：** [ADR 0012](../adr/0012-decide-trust-avoid-hard.zh.md)  
**语言：** [English](2026-10-06-next-image-hero-unoptimized-vs-priority.md) · 中文

---

## 一句话

首页轮播大图：**别再逼手机下 2560 原图；第一张仍然优先加载。**

代码：`components/home-landing.tsx` — 去掉 `unoptimized`，保留 `priority={slideIndex === 0}`，配上诚实的 `sizes`。

## 两个常被搞混的开关

| 属性 | 管什么 | 我们之前的坏默认 |
|------|--------|------------------|
| `unoptimized` | **是否**走 `/_next/image` 缩放 | `true` → 直接拉 `/assets/home-hero-*.webp` 原图（约 2560px，每张 380–510KB） |
| `priority` | **何时**开始抓取 | 首图本来就有 — 保留 |

`priority` ≈「这多半是 LCP，现在就抓。」  
`unoptimized` ≈「跳过图片优化器，按磁盘文件原样给。」

我们要的是：**早点抓优化后的文件**，不是早点抓桌面原图。

## 为什么首屏会空白

2026-10-06 复盘里，手机第一次截图 hero 区域是空的：

1. 四张轮播都开了 `unoptimized`；
2. 手机照样下 ~2560px 资源；
3. 即便首图有 `priority`，字节量太大，LCP 仍慢。

首页总传输大约 2.8MB，这些 hero 占了很大一块。

## 「优化」在这里指什么

去掉 `unoptimized` 之后：

- Next 通过 `/_next/image?url=…&w=…` 按 `next.config.mjs` 里的 `deviceSizes` / `imageSizes` 出多档；
- `sizes="(max-width: 640px) 100vw, …"` 告诉浏览器选哪一档；
- 第 0 张保留 `priority`，不会被当成折页下懒加载。

后面几张不加 `priority`，避免和 LCP 抢带宽。

## 什么时候还可以用 `unoptimized`

- 已经很小的图标 / SVG；
- 无法进优化器的外链，且你接受体积；
- 排查优化器管道故障时临时关掉。

`public/assets/` 下的全幅产品 hero，在 XingAI 手机优先页面上，几乎不该再开 `unoptimized`。

## 相关

- [ADR 0012 — Decide 可信度 + hero 加载](../adr/0012-decide-trust-avoid-hard.zh.md)
- [ADR 0011 — 首屏 HTML SEO 诚实性](../adr/0011-first-html-seo-honesty.zh.md)
- 线上：https://travel.xingai.app/
