# Affiliate application — site blurbs (EN + 中文)

Use when applying to GetYourGuide, Viator, Travelpayouts, Expedia, etc.  
Keep honest: decision tool first; affiliate links only after the recommendation (ADR 0004).

## English (short)

**Site:** https://travel.xingai.app  
**Name:** XingAI Travel

XingAI Travel is an AI travel **decision** site — not an OTA. Travelers enter origin, dates, budget, and constraints; we compare a small set of destinations with honest trade-offs, then show a book-first checklist with partner search links. Affiliate links appear **after** the decision and never change rankings.

We publish sourced city guides (15–25 places each with citations), first-hand Travel Stories, and compare/guide pages. Legal pages cover Privacy, Terms, Disclaimer, and Affiliate disclosure. Supported UI languages: English, 中文, 한국어, Español.

## 中文（短）

**网站：** https://travel.xingai.app  
**名称：** XingAI Travel

XingAI Travel 是 AI **旅行决策**站，不是在线旅行社。用户填写出发地、日期、预算与约束后，我们比较少量目的地并给出诚实取舍，再在决策之后提供预订搜索入口。联盟链接只出现在推荐之后，**不影响**目的地排序。

站内有带来源的城市指南、一手旅行故事，以及对比/指南页。法律页含隐私、条款、免责与联盟披露。界面支持英 / 中 / 韩 / 西。

## After approval

Set Vercel env vars (see ADR 0004). UI switches from “not earning a commission” to the affiliate disclosure automatically when any `NEXT_PUBLIC_*` partner id is set.
