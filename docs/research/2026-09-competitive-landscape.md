# AI 旅行规划竞品与用户信任：核实版（2026-09）

**核实日期：** 2026-09-28
**来源：** 小甜甜的站点测试 + 竞品报告（2026-09）里的市场数据，逐条对照公开来源核实。
**用法：** 写进 ADR、博客或对外材料时，只引用标 ✅ 的内容，并附上来源链接。⚠️ 表示需要改写，❌ 表示不要使用。

## 1. 竞品事实

| 报告原说法 | 结论 | 核实后的表述 | 来源 |
|---|---|---|---|
| Mindtrip 2026 年 5 月上线聊天内代理订机票（Sabre + PayPal），业内首家 | ✅ | 2026-02-12 宣布与 Sabre、PayPal 合作；2026-05-06 上线 Mindtrip Flights，在聊天里完成搜索、比较和支付，不跳转。「首家」是 Mindtrip 和 Sabre 新闻稿里的自称。 | [Sabre 新闻稿](https://www.sabre.com/resources/newsroom/mindtrip-launches-travels-first-all-in-one-agentic-ai-flight-booking-experience-powered-by-partnership-with-sabre-and-paypal/) · [Skift 2026-05-06](https://skift.com/2026/05/06/sabre-mindtrip-paypal-launch-agentic-ai-travel-booking/) |
| Mindtrip 融资 $22.5M（Capital One、United、Amex 参投） | ⚠️ | 累计融资 $22.5M 是 Capital One Ventures 和 United Airlines Ventures 入股时公布的数字，当时 Amex Ventures 已经是投资方。2025-12 又宣布三家投资，那之后的累计金额**未核实**。2023 年种子轮 $7M，产品 2024 年 5 月上线。 | [United Airlines Ventures](https://www.unitedairlinesventures.com/news/capital-one-ventures-united-airlines-ventures-invest-in-mindtrip) · [BusinessWire 2025-12-08](https://www.businesswire.com/news/home/20251208469469/en/Mindtrip-Unveils-New-AI-Travel-and-Events-Features-Announces-Investments-From-Amex-Ventures-Capital-One-Ventures-and-United-Airlines-Ventures) |
| Mindtrip 位于旧金山、2023 年成立 | ⚠️ | 没有找到官方说明，2023 是种子轮年份。对外不要写。 | — |
| Layla 位于柏林，500 万用户，2024 年收购 Roam Around | ✅ | 总部柏林；截至 2026-03 有 500 万以上用户、3,000 万条消息、200 万以上份行程，计划中的行程总价值超过 10 亿美元（均为公司自报）。2024-02 收购 Roam Around，逐步停用该品牌。 | [Layla 新闻稿 2026-03-14](https://www.manilatimes.net/2026/03/14/tmt-newswire/globenewswire/layla-surpasses-1-billion-in-trips-planned-as-global-investors-back-identity-first-travel-planning/2299863) · [TechCrunch 2024-02-12](https://techcrunch.com/2024/02/12/travel-startup-layla-acquires-flyr-backed-ai-itinerary-building-bot) · [EU-Startups](https://www.eu-startups.com/2023/11/paris-hilton-and-an-esteemed-group-of-travel-leaders-invest-e3m-in-the-berlin-based-ai-travel-planner-layla/) |
| GuideGeek 在 WhatsApp、IG、Messenger 里免费用，150 万以上用户，给 60–70 家旅游局做白标 | ⚠️ | 渠道和免费属实，不用装 App，也不用注册。用户数「超过 150 万」来自二手报道。白标客户应写成「**超过 70 家**」（某年 4 月的数字，年份需要看原文），不是 60–70。 | [Wikipedia](https://en.wikipedia.org/wiki/GuideGeek) · [Fast Company 2024](https://www.fastcompany.com/91037429/matador-network-most-innovative-companies-2024) |
| SearchSpot 定位最接近我们，展示推荐理由和淘汰原因，完全免费，靠佣金 | ✅ | 首页写明永久免费、只收联盟佣金，并展示每个候选被选中或淘汰的原因。 | [searchspot.ai](https://www.searchspot.ai/) |
| SearchSpot 的口号是 “Inspiration is easy. Decision-making is hard.” | ⚠️ | 首页和 About 页都没有这句原话，只在其博客里有相近的表述。不要当作它的原话引用。 | [About](https://www.searchspot.ai/about-us) · [博客](https://www.searchspot.ai/blog/ai-travel-planning-tools-2026) |
| Roam Around 的教训是用户讨厌按次或按 token 收费 | ⚠️ | 按 token 收费属实（一个 token 对应一份行程）。但「用户讨厌」只找到零星的差评，是推断，不是数据。 | [App Store](https://apps.apple.com/us/app/roam-around-plan-trips-ai/id6446047996) |
| Vacay 不能订机票；Wonderplan 免费并能追踪预算 | ✅ | Vacay 不能直接订机票，前 3 份计划免费，之后 $9.99/月。Wonderplan 免费，会按类别估算预算。 | [usevacay.com](https://www.usevacay.com/) · [wonderplan.ai](https://wonderplan.ai/) |

## 2. 用户信任数据（三个数字都来自同一份调查）

**调查背景：** Greetwell 委托做的线上调查，2026 年 8 月，1,000 名过去 12 个月有过度假过夜旅行的美国成年人，其中 485 人用过或试过 AI。**Greetwell 是卖真人旅行顾问服务的公司，结论对它的生意有利。** 引用时要注明这一点。
来源：[Stacker 转载 2026-09-16](https://kvia.com/entertainment/stacker-travel/2026/09/16/survey-ai-hallucinated-travel-destinations-for-1-in-6-users/)

| 报告原说法 | 结论 | 核实后的表述 |
|---|---|---|
| 六分之一的 AI 旅行者被推荐过不存在的地方 | ✅ | 在**用 AI 规划旅行的人**里，1/6 被推荐过不存在的地点、行程或活动。 |
| 55% 遇到过错误推荐 | ✅ | 在 **AI 用户**里，55% 至少遇到过一次糟糕的推荐（不一定是不存在的地方）。 |
| 只有 14% 的人用 AI 又查又订 | ⚠️ 分母错了 | 14% 是**全部受访者**里用 AI 查过并订过旅行的人，不是 AI 用户里的 14%。同一调查里 34% 只用 AI 查、不用它订。 |

补充（报告里没有，可以引用）：
- 有二手报道说，Expedia Group 2026-04 调查了 5,700 多名成年人，只有 8% 在规划旅行时依赖 AI，68% 仍然优先找成熟的旅行品牌。**没有找到原始报告，暂不引用。**
- Layla 自报：不带目的地开始规划的行程，占比从 2023 年约 12% 升到 40% 以上（[Layla 新闻稿](https://www.manilatimes.net/2026/03/14/tmt-newswire/globenewswire/layla-surpasses-1-billion-in-trips-planned-as-global-investors-back-identity-first-travel-planning/2299863)）。这可以作为「Surprise me」模式的需求依据。

## 3. 代理预订出过的事故

| 报告原说法 | 结论 | 核实后的表述 | 来源 |
|---|---|---|---|
| 代理预订出过「幽灵确认」、误扣款等事故 | ✅（二手） | 2026-06 SmartCustomer 分析消费者评价后发现：有平台把待处理的订单标成已确认、未经授权扣款、擅自取消行程。Travelport 认为根本原因是大模型给不出确定的承诺，需要走实时预订接口。原始分析没有找到，引用的是转述。 | [TechTimes 2026-07-02](https://www.techtimes.com/articles/319558/20260702/ai-travel-booking-agents-cannot-confirm-ticket-travelport-tripservices-tests-fix.htm) |

## 4. 行业趋势

| 报告原说法 | 结论 | 核实后的表述 | 来源 |
|---|---|---|---|
| 代理预订正在落地：Google AI Mode | ⚠️ 需要改写 | **只有酒店**：2026-08-27 在 AI Mode 上线代理订酒店（仅美国、英文，首批 10 家合作方）。**机票还不能在 AI Mode 里直接订**，只能比价、跟踪价格。 | [Skift 2026-08-27](https://skift.com/2026/08/27/googles-agentic-hotel-booking-tool-comes-to-ai-mode/) |
| Expedia × Muse | ✅ | Muse 是 **Meta** 的 AI 代理。Expedia 2026-09 宣布加入，先支持美国的酒店预订，Expedia 是交易主体，在 Muse 里付款。Expedia 同时已接入 Google AI Mode、ChatGPT、Claude 和 Alexa。 | [Expedia 新闻室](https://www.expedia.com/newsroom/find-your-next-stay-with-the-help-of-your-personal-ai-agent-muse/) · [TechCrunch 2026-09-23](https://techcrunch.com/2026/09/23/everything-new-coming-to-metas-ai-agent-muse/) |

## 5. 需要收回或降级的判断

- **「决策层几乎空白」要改成「有人在做，但还没有规模」。** SearchSpot 已经在做「推荐 + 淘汰理由」，而且同样免费、靠佣金。它和我们最直接竞争，需要单独做一次产品对比。
- **「所有竞品都强制注册」不成立。** GuideGeek 不需要注册，SearchSpot 是否需要注册没有核实。「无注册墙」仍是我们的优点，但不能说成独有。
- **「14% 又查又订」的分母要写对**，否则会被懂行的人一眼看出问题。

## 未核实、不要对外使用

- Mindtrip 的总部和成立年份
- Mindtrip 2025-12 之后的累计融资
- GuideGeek「150 万以上用户」的一手出处
- Expedia「8% / 68%」的原始报告
