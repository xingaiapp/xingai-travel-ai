# ADR 0003：客户端 session 存储行程状态

**状态：** Accepted  
**日期：** 2026-05-31  
**作者：** Xing @ XingAI  
**取代：** —  
**被取代：** —  
**语言：** [English](0003-session-storage-client-state.md) · 中文

## 背景

V1 无账号、无数据库。行程表单、比较结果、规划结果需要在 `/decide` → `/result` 导航和刷新后仍可用。

Next.js App Router 会 **服务端渲染** 客户端组件。若在首次客户端渲染时读 `sessionStorage` / `localStorage`（例如在 `useState(() => loadFromStorage())` 里），HTML 与服务器不一致 — React 19 会报 hydration 失败。

侧栏「继续上次行程」卡片、语言切换器曾属于同一类问题。

## 决策

**V1 用浏览器存储；仅在 mount 后的 `useEffect` 中读取。**

### 存储键

| 键 | 存储 | 内容 |
|----|------|------|
| `xingai-travel-trip-context` | `sessionStorage` | `TripContext` + locale |
| `xingai-travel-compare-result` | `sessionStorage` | `CompareResult` |
| `xingai-travel-plan-result` | `sessionStorage` | `PlanResult`（可能异步到达） |
| `xingai-travel-inspire-prefs` | `sessionStorage` | 帮我选模式的氛围 / 飞行范围 / 优先项 |
| `xingai-travel-regenerate` | `sessionStorage` | 一次性标记：`/result` 请 `/decide` 用当前语言重新生成某个模式 |
| `xingai-travel-locale` | `localStorage` | `en` \| `zh` \| `ko` \| `es` |
| `theme` | `localStorage` | `light` \| `dark` \| `system` |
| `xingai-travel-trip-history` | `localStorage` | `/trips` 的最近决策（最多 12 条），见 [ADR 0007](./0007-local-trip-history.zh.md) |
| `xingai-travel-city-map` | `localStorage` | 已上线城市指南的「想去 / 去过」标记（仅本浏览器；不是排名）— 软填规则见 [ADR 0010](./0010-city-map-soft-fill-decide.zh.md) |

###  hydration 安全写法

```tsx
// ✅ 服务端与首次客户端渲染一致
const [trip, setTrip] = useState(defaultTrip)
const [ready, setReady] = useState(false)

useEffect(() => {
  const raw = sessionStorage.getItem(TRIP_STORAGE)
  if (raw) setTrip(JSON.parse(raw))
  setReady(true)
}, [])

useEffect(() => {
  if (!ready) return
  sessionStorage.setItem(TRIP_STORAGE, JSON.stringify(trip))
}, [trip, ready])
```

```tsx
// ❌ 不要在客户端组件里这样写
const [trip] = useState(() =>
  typeof window === "undefined" ? defaultTrip : readSession()
)
```

### 其他规则

- 写入 compare 结果后派发 `xingai-travel-compare-updated`，更新 `AppChrome` 侧栏。
- `sitemap.ts` 排除 `/result` — 不可爬、随 session 变化。
- decide 页 compare 成功后后台请求 `/api/plan`；result 页轮询直至有 plan 或 15s 超时 → mock plan。
- 主题：自定义 `ThemeProvider`（不用 `next-themes` 内联 script）；SSR 默认 `<html class="light">`；在 `useEffect` 应用已存主题。React 树内不用阻塞式 `<script>`（React 19 警告）。

## 后果

**正面**

- V1 无持久化后端成本。
- 遵循模式后 hydration 稳定。
- 重新规划快 — 回 `/decide` 可恢复表单。

**负面**

- 短暂闪烁：英文 → 已存语言、默认表单 → 已存行程、探索卡片 → 上次行程链接。
- 无跨设备同步、无可分享的结果 URL。
- 关标签页 `sessionStorage` 即清空。

## 曾考虑的替代方案

- **Cookie 做 theme/locale SSR** — 暂缓；V1 可接受闪烁。
- **URL 编码 compare 状态** — 否决；体积大、Referer 泄露风险。
- **V1 上 Supabase/DB** — 否决；产品未验证前范围过大。

## 相关

- `components/decide-page.tsx`、`components/result-page.tsx`、`components/app-chrome.tsx`
- `components/locale-provider.tsx`、`components/theme-provider.tsx`
- `lib/city-map.ts` — 城市地图 Want/Been（[ADR 0010](./0010-city-map-soft-fill-decide.zh.md)）
- [ADR 0001](./0001-compare-first-product-scope.zh.md) · [ADR 0007](./0007-local-trip-history.zh.md) · [ADR 0010](./0010-city-map-soft-fill-decide.zh.md)
