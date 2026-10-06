# ADR 0015：条件冲突提示、隐私实质披露、Decide 漏翻

**状态：** 已接受  
**日期：** 2026-10-06  
**作者：** Xing @ XingAI  
**英文版：** [English](0015-constraint-conflict-privacy-i18n.md)

## 背景

ADR 0014 之后的第三轮线上复评发现：

1. SFO → 欧洲 + 短途 +「避开长途」会把**全部**候选降权，但页面仍写「最佳匹配」，没有明确冲突。
2. Match Score 下限 52 把降权城市挤成同一分，步行加分看不见。
3. `/privacy` 未写 OpenAI、IP/Redis 限流、Analytics、浏览器地图/Trips、`/s` 编码；中韩文说明误抄自免责声明。
4. Decide 快照 `(nights)`、Avoid/备注占位仍是英文。

## 决策

1. **`CompareResult.constraintConflict`。** 当 Avoid（长途）降权全部目的地时，归一化写入本地化冲突文案；结果区顶部展示，并把标题改为「冲突中相对较好」，不再假装干净最佳匹配。
2. **`confidence: "low"` 时 Match Score 下限改为 28**（原为 52），降权同伴仍可用步行分拉开。
3. **补全隐私政策**（真实处理方与存储面），各法律页使用各自的中韩文摘要，并加生效日与 `contact@xingai.app`。
4. **Decide i18n：** 晚数单位、Avoid/备注占位、日期 `aria-label`、空出发地 `aria-invalid`。

## 后果

- 条件互相打架时产品会说清楚——这是决策系统该做的事。
- 隐私页与生产行为对齐。
- 中文（及 ko/es）Decide 不再在这些字段漏英文。
- 联盟申请、GSC、扩写薄 compare 页不在本 ADR 范围。

## 相关

- `lib/compare-normalize.ts`、`lib/match-score.ts`、`lib/types.ts`
- `components/destination-compare.tsx`、`components/legal-page.tsx`、`components/trip-form.tsx`、`components/trip-snapshot.tsx`
- [ADR 0012](./0012-decide-trust-avoid-hard.zh.md) · [ADR 0014](./0014-score-parity-og-hires.zh.md)
