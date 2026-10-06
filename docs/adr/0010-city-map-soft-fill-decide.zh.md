# ADR 0010：城市地图 Want/Been 软填 Decide（禁止浏览器重排）

**状态：** Accepted  
**日期：** 2026-10-06  
**作者：** Xing @ XingAI  
**取代：** —  
**被取代：** —  
**语言：** [English](0010-city-map-soft-fill-decide.md) · 中文

## 背景

Travel AI 以决策为先（[ADR 0001](./0001-compare-first-product-scope.zh.md)）。调研稿曾提出公开的「Life Travel 100」/ Desire Score 排行。上线那种页面等于编造没有证据的全球 Top 100，并把产品做成榜单站。

用户仍需要轻量记住「想去 / 去过」的城市。`/trips` 已保存本浏览器的**决策**历史（[ADR 0007](./0007-local-trip-history.zh.md)）。城市指南（[ADR 0008](./0008-city-layer-after-decision.zh.md)）需要另一类更小的记忆：已上线指南 slug 上的 Want / Been。

存储键 `xingai-travel-city-map` 已写入 [ADR 0003](./0003-session-storage-client-state.zh.md)。本 ADR 锁定该地图如何触达 Decide，以及城市搜索空结果如何失败关闭。

## 决策

1. **不做假 Top 100 / Desire Score / Lifetime 排行页。** 进度 UI 只相对**已上线指南目录**计数。文案不得宣称全球排名。
2. **Want / Been 仅本设备。** 与行程历史同级诚实：仅本浏览器、可清空；本 ADR 不含账号同步。
3. **Been 优先。** 同一 slug 不能同时在两列表；标 Been 会去掉 Want（反之亦然）。
4. **仅在 Decide 水合后软填。** mount 之后（hydration 安全，见 ADR 0003）：
   - `placesInMind` 为空时，用 Want 城市展示名填充；
   - Been 以 `Already visited: …` 追加到 `avoid`（若名称尚未出现）；
   - 永不覆盖非空的 URL 或 session 文本。
5. **禁止浏览器重排。** 地图标记不改 `/api/compare` 打分、置信度或结果顺序。只作表单软约束。
6. **城市搜索未命中 → Decide，不造假指南。** `/city` 空搜提供 **Decide with {q}** → `/decide?places=…`。不为错字 / 缺城发明指南页或排行行。
7. **进度条可选。** 出现在 `/`、`/city`、`/decide`（decide 仅在有标记时）。不是新导航 Tab。
8. **不是 Trips。** Want / Been 绝不出现在 `/trips`。Trips 只列出 `xingai-travel-trip-history` 里已完成的 Decide API 结果（[ADR 0007](./0007-local-trip-history.zh.md)）。用 Want 软填 Decide **不会**因此生成 Trips 行。

### 与 Your trips 的边界

| | 旅行地图（本 ADR） | Your trips（ADR 0007） |
|--|-------------------|------------------------|
| URL | `/city`（+ 首页 / decide 条） | `/trips` |
| 键 | `xingai-travel-city-map` | `xingai-travel-trip-history` |
| 用户动作 | 在已上线指南上点 Want / Been | 完成 Compare 或 Surprise me |
| 读另一套？ | 否 | 否 |

## 后果

**正面**

- 地图记忆进入决策表单，却不假装有排名。
- 空搜保持 decide-first，不做薄 SEO 页。
- 对齐 ADR 0001 / 0008：城市层不进入目的地比较逻辑。

**负面**

- 用户若已输入 places，软填不会发生，容易被忽略。
- Been → avoid 只是软降级字符串；其他约束更强时模型仍可能推荐 Been 城市。
- 容易和 `/trips` 搞混 — 文案与 ADR 0007「两套浏览器记忆」必须写清。

## 曾考虑的替代方案

- **公开 Life Travel 100 页：** 否决 — 没有诚实的排名证据集。
- **浏览器按 Want/Been 重排比较结果：** 否决 — 破坏决策引擎信任，且违反 ADR 0008「城市数据不进入比较」。
- **在 `/trips` 展示 Want：** 否决 — 会把 Trips 改成心愿单；决策历史必须诚实。
- **账号同步地图：** 延后；需独立 auth ADR 与产品信号。
- **搜索未命中自动建城页：** 否决 — 质量条对齐香港级静态指南（ADR 0008）。

## 相关

- `lib/city-map.ts`（`applyCityMapPrefill`、`CITY_MAP_STORAGE`）
- `components/decide-page.tsx`、`components/city/cities-index.tsx`
- `components/city/city-map-toggles.tsx`、`components/travel-map-progress.tsx`、`hooks/use-city-map.ts`
- `tests/city-map.test.ts`
- [ADR 0003](./0003-session-storage-client-state.zh.md) · [ADR 0007](./0007-local-trip-history.zh.md) · [ADR 0008](./0008-city-layer-after-decision.zh.md)
