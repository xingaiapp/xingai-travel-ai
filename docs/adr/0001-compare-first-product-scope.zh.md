# ADR 0001：先比较、再规划的产品范围

**状态：** Accepted  
**日期：** 2026-05-31  
**作者：** Xing @ XingAI  
**取代：** —  
**被取代：** —  
**语言：** [English](0001-compare-first-product-scope.md) · 中文

## 背景

多数旅行产品优化的是**库存**——机票、酒店、套餐。用户开五个标签比价格，仍然不知道**该去哪**。

XingAI 已有 **决策型**产品（Invest AI、Meal Coach、Cook AI）。Travel AI 应对齐：**在约束下给一个推荐，并把取舍说清楚**，而不是再做一个预订墙。

静态 UX 画廊（`docs/ux-v1/`）与产品原则文档都写明：**先比较目的地，再规划行程**。

## 决策

**XingAI Travel AI V1 是目的地决策工具，不是 OTA。**

| 范围内 | 范围外（V1） |
|--------|----------------|
| `/decide` 采集行程约束 | 跨 OTA 实时比价 |
| 比较 3 个目的地 → 1 个首选 | 账号体系 / 行程数据库 |
| 诚实 trade-off + 置信度 | 多城路线引擎 |
| `/result` 上的先订清单 + 行程 | 对用户暴露内部版本号 |
| 可选联盟跳转链接 | 佣金驱动排序 |

主路径：

- `/decide` — 输入 + 比较 CTA（可内联预览）
- `/result` — 首选、对比表、先订、行程

产品升级规则（工作区 `AGENTS.md`）：后续版本继承既有 UX 与主流程；新功能先可选，验证后再默认。

## 后果

**正面**

- 与 Booking / Google Flights 定位清晰。
- 与 XingAI 其他产品的决策 UX 一致。
- 后端更轻：三个 JSON API，V1 无数据库。

**负面**

- 期待即时报价的用户可能被文案门槛挡住。
- `/result` 依赖 session — 暂无稳定分享链接，需后续持久化。

## 曾考虑的替代方案

- **先生成行程** — 否决；回避了最难的问题「去哪」。
- **做完整 OTA 联盟 hub** — 否决；违背决策质量优先。
- **并入通用 super-app** — 否决；独立部署 `travel.xingai.app`。

## 相关

- [PRODUCT-PRINCIPLES.md](../PRODUCT-PRINCIPLES.md)
- [docs/ux-v1/PRODUCT-FLOW.md](../ux-v1/PRODUCT-FLOW.md)
- 技术博客：[Compare-first decision system](../tech-blog/2026-05-31-travel-compare-first-decision-system.md)
