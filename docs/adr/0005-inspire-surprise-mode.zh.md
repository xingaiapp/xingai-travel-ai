# ADR 0005：Inspire / 帮我选模式

**状态：** Accepted  
**日期：** 2026-05-31  
**作者：** Xing @ XingAI  
**取代：** —  
**被取代：** —  
**语言：** [English](0005-inspire-surprise-mode.md) · 中文

## 背景

很多用户打开 Travel AI 时 **心里没有目的地**。主流程默认他们能在备注里写出候选城市 — 仍有摩擦。

需要一条可选路径，贴合标题「这次到底该去哪？」，又不能把产品做成随机目的地转盘。

## 决策

**在 `/decide` 增加模式切换；两条路径汇入同一套 `CompareResult` UI。**

| 模式 | UI | API |
|------|-----|-----|
| **我知道想去哪** | 完整 `TripForm` + `StylePaceSelector` | `POST /api/compare` |
| **帮我选 / Surprise me** | `InspireForm`（氛围、飞行距离、优先级 chip） | `POST /api/inspire` |

规则：

1. **同一套结果组件** — `DestinationCompare`、`/result`；inspire 不是第二个产品面。
2. **inspire 模式下展示法律提示** — 仅为建议；去哪由用户决定；链到 `/disclaimer`。四语言文案 `inspireLegal`。
3. **视觉区分** — surprise 标签页金色/琥珀样式（`surprise-tab-idle` / active），表明可选、非默认。
4. **预算/人数** — 切换模式时继承 trip 表单默认；若已填日期/出发地，可带入 inspire payload。
5. **Prompt** — `buildInspirePrompt()` 根据偏好推荐 3 个目的地，JSON 结构与 compare 相同。

对比表照片预览（点列头）两种模式均可用；推荐文案仍以首选为准。

## 后果

**正面**

- 覆盖「不知道去哪」而不做第二个 app。
- result 渲染与联盟「先订」共用一条代码路径。
- 对开放式 AI 建议有明确法律边界。

**负面**

- 需维护两套 prompt；inspire 温度略高（0.5 vs 0.3）— 需观察一致性。
- 用户或误以为 inspire 可以跳过 trade-off — 文案须强调仍是比较，不是盲盒。

## 曾考虑的替代方案

- **独立 `/inspire` 路由** — 否决；拆分统计与壳层。
- **随机目的地按钮** — 否决；无约束匹配、无 trade-off。
- **对话式 chat UI** — V1 否决；与「减少标签过载」目标冲突。

## 相关

- `components/decide-page.tsx`、`components/inspire-form.tsx`
- `app/api/inspire/route.ts`、`lib/prompts.ts`（`buildInspirePrompt`）
- [ADR 0001](./0001-compare-first-product-scope.zh.md)、[ADR 0002](./0002-openai-json-api-fallback.zh.md)
