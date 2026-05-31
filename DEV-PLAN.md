# XingAI Travel AI — End-to-End Dev Plan

> 适用于 Cursor / Claude Code / Codex 执行。每个 Phase 可独立交给 AI 完成。

---

## 产品定位一句话

用户还不知道去哪时，Travel AI 帮他们做决定——给出一个推荐目的地 + 诚实的权衡说明 + 可执行的行程计划。

---

## 技术栈

| 层 | 选型 |
|---|---|
| 框架 | Next.js 14 (App Router) |
| 语言 | TypeScript |
| 样式 | Tailwind CSS |
| AI | Anthropic Claude API (claude-sonnet) |
| 部署 | Vercel |
| 域名 | travel.xingai.app |
| 参考 | fork `xingai-cook-ai` / `xingai-meal-coach-ai` shell |

---

## 项目结构

```
xingai-travel-ai/
├── app/
│   ├── layout.tsx              # 全局 layout，i18n provider，theme
│   ├── page.tsx                # 重定向到 /decide
│   ├── decide/
│   │   └── page.tsx            # 主页面：三步流程
│   ├── result/
│   │   └── page.tsx            # 结果页：推荐 + 行程
│   └── api/
│       ├── compare/
│       │   └── route.ts        # POST /api/compare → AI 对比目的地
│       └── plan/
│           └── route.ts        # POST /api/plan → AI 生成行程
├── components/
│   ├── TripForm.tsx            # Step 1：行程表单
│   ├── StylePaceSelector.tsx   # Step 2：风格 + 节奏选择器
│   ├── TripSnapshot.tsx        # 右侧实时摘要卡片
│   ├── DestinationCompare.tsx  # 对比结果卡（带 winner badge）
│   ├── Itinerary.tsx           # 行程快照 + 优先预订
│   ├── TradeoffNote.tsx        # "为什么不选其他" 块
│   └── ConfidencePill.tsx      # 置信度标签
├── lib/
│   ├── prompts.ts              # 所有 Claude prompt 模板
│   ├── types.ts                # TypeScript 类型定义
│   ├── i18n/
│   │   ├── en.ts
│   │   ├── zh.ts
│   │   ├── ko.ts
│   │   └── es.ts
│   └── utils.ts
├── public/
│   └── assets/                 # 从 ux-v1/assets 复制
├── docs/
│   └── ux-v1/                  # 已有静态 mock（设计参考）
└── DEV-PLAN.md
```

---

## Phase 0 — 项目初始化（Day 1）

**目标：** 跑通 Next.js 框架，部署空白页到 Vercel。

### 任务清单

```
0-1  fork/copy xingai-cook-ai shell，重命名为 xingai-travel-ai
0-2  更新 package.json name、description
0-3  替换品牌色：orange → sky blue (#2563eb)，更新 tailwind.config.ts
0-4  替换 logo、favicon（从 ux-v1/assets 复制）
0-5  清空 Cook AI 业务组件，保留 layout / i18n / theme 框架
0-6  vercel.json 配置，绑定 travel.xingai.app
0-7  环境变量：ANTHROPIC_API_KEY 加入 Vercel env
0-8  本地 npm run dev 跑通，部署空白首页到 Vercel
```

### AI Prompt（给 Cursor/Claude）

```
Fork the xingai-cook-ai project. 
Rename it to xingai-travel-ai.
Replace all brand colors from orange (#f97316) to sky blue (#2563eb).
Remove all Cook AI specific components (ingredients, recipe steps).
Keep: layout.tsx, i18n system, theme toggle, header, bottom nav shell.
Update page title to "XingAI Travel AI" and tagline to "Explore Better".
```

---

## Phase 1 — 静态 UI（Day 2–3）

**目标：** 把 `ux-v1` 的 HTML mock 转成 React 组件，无 API 调用，用 mock 数据。

### 任务清单

```
1-1  TripForm.tsx
     - 字段：dates, from(airport), budget(金额+货币), travelers, notes textarea
     - 实时触发 onTripChange 回调更新 TripSnapshot

1-2  TripSnapshot.tsx
     - 右侧浮动卡片（桌面）/ 折叠块（移动）
     - 显示已解析的条件：origin, dates, budget, travelers, vibe, avoid
     - "Looks good" 绿色 badge 当所有必填项完整

1-3  StylePaceSelector.tsx
     - 风格 chip：City / Beach / Nature / Culture（最多选2个）
     - 节奏 chip：Relaxed / Balanced / Adventure（单选）
     - Advanced options 展开：avoid long flights, dietary, crowd avoidance

1-4  DestinationCompare.tsx（mock 数据）
     - Winner card（蓝色 border + "推荐" badge）
     - 2个 runner-up card（附 tradeoff note）
     - 对比表格：Overall fit / Budget / Weather / Flight time / Walkability

1-5  Itinerary.tsx（mock 数据 — 里斯本）
     - 行程概览：Day 1–5 列表
     - 优先预订：机票 / 酒店 / 一日游，带图标
     - Day plan toggle：简版 / 详细版

1-6  TradeoffNote.tsx
     - "为什么不选其他" 说明块
     - 蓝色左边框样式

1-7  ConfidencePill.tsx
     - High / Medium / Low 三档
     - 颜色：green / amber / gray

1-8  组装 /decide 页面
     - 桌面：左右分栏（表单左，Snapshot右）
     - 移动：单列，TripSnapshot 折叠
     - 三步进度条（Trip Context → Compare → Plan）

1-9  组装 /result 页面
     - 面包屑：Decide › Result
     - DestinationCompare + Itinerary + TradeoffNote
     - "重新规划" 按钮返回 /decide
```

### AI Prompt（给 Cursor/Claude）

```
Create TripForm.tsx component with TypeScript.
Fields: dates (date range), from (airport/city text), budget (number + currency select), 
travelers (adults count + type: solo/couple/family/group), notes (textarea optional).
On any field change, call onTripChange(tripData) prop.
Use Tailwind CSS, sky blue accent (#2563eb), match the design in docs/ux-v1/mobile-input.html.
```

---

## Phase 2 — API 层（Day 4–5）

**目标：** 接入 Claude API，实现真实的目的地对比和行程生成。

### 任务清单

```
2-1  lib/types.ts — 定义所有类型

2-2  lib/prompts.ts — 两个 prompt 模板

2-3  POST /api/compare/route.ts
     Input:  { dates, from, budget, travelers, notes, style[], pace }
     Output: { destinations: Destination[], winner: string, confidence: string }
     
2-4  POST /api/plan/route.ts  
     Input:  { destination, tripContext }
     Output: { itinerary: Day[], bookFirst: BookItem[], tradeoffNote: string }

2-5  流式输出（streaming）
     - 用 Vercel AI SDK 或 ReadableStream
     - 前端显示 loading skeleton → 逐字流式展示

2-6  错误处理
     - API 失败 → 友好错误提示
     - 超时（30s）→ 重试按钮
```

### lib/types.ts

```typescript
export interface TripContext {
  dates: { from: string; to: string; nights: number }
  origin: string
  budget: { amount: number; currency: string }
  travelers: { count: number; type: 'solo' | 'couple' | 'family' | 'group' }
  notes?: string
  style: ('city' | 'beach' | 'nature' | 'culture')[]
  pace: 'relaxed' | 'balanced' | 'adventure'
  avoid?: string
}

export interface Destination {
  name: string
  country: string
  isWinner: boolean
  confidence: 'high' | 'medium' | 'low'
  whyWins: string[]
  tradeoffs: string[]
  scores: {
    overall: number      // 1-5
    budget: string       // 'Great' | 'Fair' | 'Tight'
    weather: string
    flightTime: string
    walkability: string
  }
}

export interface ItineraryDay {
  day: number
  title: string
  simple: string
  detailed: string[]
}

export interface BookItem {
  type: 'flight' | 'hotel' | 'activity'
  label: string
  note?: string
}
```

### lib/prompts.ts — Compare Prompt

```typescript
export function buildComparePrompt(ctx: TripContext): string {
  return `
You are a travel decision advisor. Given the trip constraints below, 
recommend exactly 3 destinations. Return JSON only.

Trip context:
- Dates: ${ctx.dates.from} to ${ctx.dates.to} (${ctx.dates.nights} nights)
- Origin: ${ctx.origin}
- Budget: ${ctx.budget.amount} ${ctx.budget.currency} total
- Travelers: ${ctx.travelers.count} ${ctx.travelers.type}
- Style preference: ${ctx.style.join(', ')}
- Pace: ${ctx.pace}
- Notes: ${ctx.notes || 'none'}
- Avoid: ${ctx.avoid || 'none'}

Return this exact JSON structure:
{
  "winner": "destination name",
  "confidence": "high|medium|low",
  "destinations": [
    {
      "name": "City, Country",
      "isWinner": true,
      "whyWins": ["reason 1", "reason 2", "reason 3"],
      "tradeoffs": ["tradeoff 1", "tradeoff 2"],
      "scores": {
        "overall": 5,
        "budget": "Great",
        "weather": "Mild, pleasant",
        "flightTime": "~11h (1 stop)",
        "walkability": "Excellent"
      }
    }
  ],
  "whyNotOthers": "one sentence explaining why the winner beats the other two"
}

Be honest about trade-offs. Do not recommend a destination that doesn't fit the budget.
`.trim()
}
```

### AI Prompt（给 Cursor/Claude）

```
Create app/api/compare/route.ts as a Next.js 14 App Router POST endpoint.
It receives TripContext JSON, calls Anthropic Claude API with the prompt from lib/prompts.ts,
parses the JSON response, and returns Destination[].
Use streaming with ReadableStream so the frontend can show progressive loading.
Handle errors: invalid JSON from AI → retry once, then return 500 with message.
ANTHROPIC_API_KEY comes from process.env.ANTHROPIC_API_KEY.
```

---

## Phase 3 — 连接前后端（Day 6）

**目标：** 点击"Compare destinations"真实调用 API，展示真实结果。

### 任务清单

```
3-1  /decide 页面状态机
     idle → loading → result → error
     
3-2  TripForm 提交 → 调用 /api/compare → 更新 DestinationCompare

3-3  点击某个目的地 → 调用 /api/plan → 跳转 /result 展示 Itinerary

3-4  Loading 状态
     - DestinationCompare skeleton（3个卡片骨架）
     - Itinerary skeleton（5行骨架）

3-5  "重新规划" — 返回 /decide 并保留表单数据（sessionStorage）
```

---

## Phase 4 — i18n + 主题（Day 7）

**目标：** 中文/英文/韩文/西班牙文完整可用，深色/浅色主题正常。

### 任务清单

```
4-1  从 ux-v1/messages.js 提取所有文案 → lib/i18n/en.ts / zh.ts / ko.ts / es.ts
4-2  useTranslation hook — 读取 locale，返回文案
4-3  语言切换器（右上角 select）
4-4  主题切换器（sun/moon icon）
4-5  所有 Claude API 响应根据 locale 返回对应语言
     （在 prompt 中加：Respond in {locale} language）
4-6  验证：每个语言切换后无乱码、布局不破
```

---

## Phase 5 — SEO / AEO（Day 8）

**目标：** 让 travel.xingai.app 被 Google 和 AI 搜索引擎正确索引。

### 任务清单

```
5-1  app/layout.tsx — 全局 metadata (title, description, og:image)
5-2  app/decide/page.tsx — 页面级 metadata
5-3  JSON-LD structured data (WebApplication + FAQPage)
5-4  sitemap.xml 自动生成（next-sitemap）
5-5  robots.txt
5-6  llms.txt（AI 搜索引擎友好格式）
5-7  og:image — 1200×630 静态图（Lisbon hero）
```

### JSON-LD 模板

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "XingAI Travel AI",
  "url": "https://travel.xingai.app",
  "description": "AI travel decision tool — compare destinations with honest trade-offs and get one bookable itinerary.",
  "applicationCategory": "TravelApplication",
  "offers": { "@type": "Offer", "price": "0" }
}
```

---

## Phase 6 — 测试 + 上线（Day 9–10）

### 任务清单

```
6-1  手动测试矩阵
     - 5个不同行程输入（预算高/低，人数不同，不同风格）
     - 验证 AI 输出 JSON 格式始终正确
     - 验证移动端 375px / 390px 布局正常
     - 验证深色模式颜色无问题

6-2  Edge cases
     - 预算极低（$500）→ AI 应推荐合适目的地，不乱推
     - 出发地不常见城市 → 应有合理的飞行时间估算
     - 非英文笔记输入 → 应正常处理

6-3  性能
     - API 响应 < 8s（Claude streaming 首字节 < 2s）
     - Lighthouse 移动端 Performance > 85

6-4  上线
     - 更新 xingai-dot-app apps.ts → comingSoon: false
     - 添加 travel.xingai.app 到 xingai-dot-app 导航
     - 发布 announcement（social / blog）
```

---

## 快速启动命令（给 AI 工具）

### 给 Cursor 的第一条指令

```
I'm building XingAI Travel AI — a trip decision tool that helps users 
pick a destination before they book.

Tech stack: Next.js 14 App Router, TypeScript, Tailwind CSS, Anthropic Claude API.
Design reference: docs/ux-v1/mobile-input.html and desktop-input.html.
Brand color: sky blue #2563eb.

Start with Phase 0: 
1. Initialize the project by copying the structure from xingai-cook-ai
2. Replace all orange brand colors with sky blue #2563eb  
3. Remove Cook AI specific components, keep layout/i18n/theme shell
4. Create a blank /decide page that renders "XingAI Travel AI" as h1
5. Confirm npm run dev works with no errors
```

### 给 Claude Code 的 Phase 1 指令

```
Build the static UI for XingAI Travel AI /decide page.
No API calls yet — use mock data from lib/mock-data.ts.

Components to build:
1. TripForm (dates, origin, budget, travelers, notes)
2. TripSnapshot (right panel, real-time summary)  
3. StylePaceSelector (City/Beach/Nature/Culture chips + Relaxed/Balanced/Adventure)
4. DestinationCompare with mock Lisbon/Barcelona/Porto data
5. Itinerary with mock 5-day Lisbon plan

Layout: desktop = 2-col (form left, snapshot right), mobile = single column.
Progress bar at top: Trip Context → Compare Destinations → Bookable Plan.
Match design in docs/ux-v1/ as closely as possible.
```

---

## 里程碑总览

| Phase | 内容 | 预计时间 | 验收标准 |
|---|---|---|---|
| 0 | 项目初始化 | Day 1 | `npm run dev` 跑通，Vercel 部署成功 |
| 1 | 静态 UI | Day 2–3 | 所有组件渲染正确，与 ux-v1 视觉一致 |
| 2 | API 层 | Day 4–5 | Postman 测试 `/api/compare` 返回正确 JSON |
| 3 | 前后端连接 | Day 6 | 点击按钮返回真实 AI 推荐 |
| 4 | i18n + 主题 | Day 7 | 4语言切换无误，深色模式正常 |
| 5 | SEO/AEO | Day 8 | Lighthouse SEO 100，sitemap 正确 |
| 6 | 测试 + 上线 | Day 9–10 | travel.xingai.app 可公开访问 |

**总计：约 10 个工作日完成 V1。**

---

## 参考资源

- UX mock: `docs/ux-v1/`
- 产品流程: `docs/ux-v1/PRODUCT-FLOW.md`
- 参考代码: `../xingai-cook-ai/` `../xingai-meal-coach-ai/`
- 品牌规范: `../xingai-dot-app/docs/marketing-site-standards.md`
- Anthropic API: https://docs.anthropic.com
- 部署: https://vercel.com/docs
