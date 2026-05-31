# Bilingual ADRs (EN + 中文)

Architecture decisions in `docs/adr/` ship as **two files per ADR**: English (`.md`) and Simplified Chinese (`.zh.md`). Same facts in both; cross-linked in the header.

Tech blog posts use the same pattern under `docs/tech-blog/` (`slug.md` + `slug.zh.md`).

## Naming

| Language | File pattern | Example |
|----------|--------------|---------|
| English | `000N-slug.md` | `0001-compare-first-product-scope.md` |
| 中文 | `000N-slug.zh.md` | `0001-compare-first-product-scope.zh.md` |

## English file header

```markdown
# ADR 000N: English title

**Status:** Accepted
**Date:** YYYY-MM-DD
**Author:** Xing @ XingAI
**Supersedes:** —
**Superseded by:** —
**Also available:** [中文](000N-slug.zh.md)

## Context
…
```

## 中文 file header

```markdown
# ADR 000N：中文标题

**状态：** Accepted
**日期：** YYYY-MM-DD
**作者：** Xing @ XingAI
**取代：** —
**被取代：** —
**语言：** [English](000N-slug.md) · 中文

## 背景
…
```

## Section map

| English | 中文 |
|---------|------|
| Context | 背景 |
| Decision | 决策 |
| Consequences | 后果 |
| Alternatives considered | 曾考虑的替代方案 |
| Related | 相关 |
| Env reference | 环境变量 |

## Rules

1. **Two files per ADR** — keep `000N-slug.md` and `000N-slug.zh.md` in sync in the same PR.
2. **Same decision** — status, dates, env names, code paths, and external links must match.
3. **Cross-links** — English file links to `.zh.md`; 中文 file links to `.md`.
4. **Index** — [README.md](./README.md) lists both files per row.
