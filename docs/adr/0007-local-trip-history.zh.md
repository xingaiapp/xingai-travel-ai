# ADR 0007：Trips 使用本地行程历史

**状态：** Accepted  
**日期：** 2026-09-27  
**作者：** Xing @ XingAI  
**取代：** —  
**被取代：** —  
**语言：** [English](0007-local-trip-history.md) · 中文

## 背景

导航里的 **Trips / Saved / Profile** 一直是「即将推出」占位。站点测试把它们列为死导航，这会损害用户对产品的信任。[ADR 0001](./0001-compare-first-product-scope.zh.md) 把账户和保存行程数据库划在范围外，[ADR 0003](./0003-session-storage-client-state.zh.md) 规定行程状态保存在浏览器里。

但 `sessionStorage` 在关闭标签页后就会清空，用户的决策也随之丢失。

## 决策

1. **Trips = 这个浏览器里的最近决策。** 每次真实的比较或 Inspire 结果都写入 `localStorage` 的 `xingai-travel-trip-history`，最多保留最新 12 条。每条记录包含行程条件、比较结果，以及已经生成的计划。
2. **重新打开 = 恢复 session 键。** 打开一条记录时，把它写回三个 `sessionStorage` 键，然后跳转到 `/result`。如果当时计划还没生成（用户提前离开），就重新请求一次，并补回这条记录。
3. **不保存预览回退数据。** 只记录 API 返回的结果，出错时使用的 mock 数据不记录。
4. **Saved 和 Profile 从导航中移除**，等真正做好再放回来，不留占位入口。
5. **用户可控：** 每条记录都能单独删除，也有「全部清除」按钮。页面上注明数据只保存在这个浏览器里，隐私页也同步说明。`/trips` 设为 `noindex`，不放进 sitemap。

### 两套浏览器记忆（不要混）

| 表面 | 存储键 | 存什么 | 怎么写进去 |
|------|--------|--------|------------|
| **Your trips**（`/trips`） | `xingai-travel-trip-history` | 已完成的 Decide 结果（compare / inspire） | 跑完 Decide → API 成功 |
| **Your travel map**（`/city`、首页条） | `xingai-travel-city-map` | 已上线指南上的 Want / Been | 在指南上点 Want 或 Been |

在 [/city](https://travel.xingai.app/city) 标 Want **绝不会**写入 Trips 行。打开 [/trips](https://travel.xingai.app/trips) **绝不会**列出城市地图标记。Want 可以软填 Decide 表单（[ADR 0010](./0010-city-map-soft-fill-decide.zh.md)）；那仍然不是 Trips 条目，直到一次决策完成。

## 影响

**正面**

- 没有死导航了，不注册也能回到之前的决策。
- 没有后端，个人数据不离开设备，与 ADR 0001 和 ADR 0003 一致。

**负面**

- 历史不能跨设备同步，清除网站数据后会一起删除。
- 记录保留生成结果时使用的语言。
- 用户可能以为 Want 会出现在 `/trips` — 产品文案与 ADR 0010 必须把边界说清楚。

## 考虑过的替代方案

- **保留「即将推出」入口**：否决，因为它就是死导航。
- **账户 + 服务端存储**：暂不采用，按 ADR 0001 属于范围外。
- **把 Want 合并进 Trips**：否决 — 城市心愿单不是决策；混在一起会让 `/trips` 对「最近决策」撒谎。

## 相关

- `lib/trip-history.ts`、`components/trips-page.tsx`、`app/trips/page.tsx`
- `components/decide-page.tsx`（写入记录）、`components/app-chrome.tsx`（导航）
- [ADR 0010](./0010-city-map-soft-fill-decide.zh.md)（城市地图 — 另一把键）
- [ADR 0003](./0003-session-storage-client-state.zh.md)