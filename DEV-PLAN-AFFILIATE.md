# XingAI Travel AI — Affiliate 变现开发计划

> 专注于"优先预订"模块的联盟佣金变现。零摩擦，用户不感知，V1 上线即可收入。

---

## 变现逻辑

```
用户选定目的地（里斯本）
    ↓
AI 生成"优先预订"清单：机票 / 酒店 / 一日游
    ↓
每个预订项带 affiliate tag 跳转合作平台
    ↓
用户完成预订 → 平台付给我们佣金
```

用户体验：**正常点击预订链接，完全感知不到 affiliate 机制。**

---

## 联盟计划注册清单

| 平台 | 佣金 | 注册地址 | 审核时间 |
|---|---|---|---|
| **Skyscanner Affiliate** | 机票点击佣金 ~$0.15–0.50/click | partners.skyscanner.net | 3–5天 |
| **Booking.com Affiliate** | 酒店预订佣金 ~4% | affiliate.booking.com | 即时 |
| **Hotels.com / Expedia (HCOM)** | 酒店佣金 ~4–6% | affiliates.expediagroup.com | 3–7天 |
| **Viator (TripAdvisor)** | 活动/一日游佣金 ~8% | partnerapi.viator.com | 3–5天 |
| **GetYourGuide** | 活动佣金 ~8% | getyourguide.com/partner | 3–5天 |
| **Kayak Affiliate** | 机票+酒店佣金 | kayak.com/affiliate | 5–7天 |

**优先注册顺序：** Booking.com（即时审核）→ Skyscanner → Viator → Expedia

---

## 技术架构

```
AI 推荐目的地（里斯本）
    ↓
lib/affiliate.ts — 根据目的地生成带 tag 的链接
    ↓
BookFirst 组件 — 渲染可点击的预订卡片
    ↓
/api/track — 记录点击（可选，用于分析）
    ↓
用户跳转合作平台
```

---

## 项目结构

```
xingai-travel-ai/
├── lib/
│   ├── affiliate.ts          # 核心：生成所有联盟链接
│   ├── affiliate-config.ts   # 各平台的 affiliate ID 配置
│   └── types.ts              # BookItem, AffiliateLink 类型
├── components/
│   ├── BookFirst.tsx         # 优先预订卡片列表
│   ├── BookCard.tsx          # 单个预订卡片（图标+标题+平台+按钮）
│   └── AffiliateDisclosure.tsx  # 合规披露文字
├── app/
│   └── api/
│       └── track/
│           └── route.ts      # 点击追踪（可选）
└── .env.local                # affiliate IDs（不提交 git）
```

---

## Phase 1 — 注册 + 配置（Day 1）

### 任务清单

```
1-1  注册 Booking.com Affiliate → 获取 affiliate_id
1-2  注册 Skyscanner Affiliate → 获取 partner_id
1-3  注册 Viator Affiliate → 获取 partner_id
1-4  注册 Expedia Affiliate → 获取 cid
1-5  注册 GetYourGuide Affiliate → 获取 partner_id
1-6  创建 .env.local 存储所有 ID
1-7  在 Vercel 环境变量中添加所有 affiliate ID
```

### .env.local

```env
# Affiliate IDs — 不提交到 git
NEXT_PUBLIC_BOOKING_AFFILIATE_ID=your_id_here
NEXT_PUBLIC_SKYSCANNER_PARTNER_ID=your_id_here
NEXT_PUBLIC_VIATOR_PARTNER_ID=your_id_here
NEXT_PUBLIC_EXPEDIA_CID=your_id_here
NEXT_PUBLIC_GETYOURGUIDE_PARTNER_ID=your_id_here
NEXT_PUBLIC_KAYAK_AFFILIATE_ID=your_id_here
```

> ⚠️ 所有 affiliate ID 加入 `.gitignore`，不能暴露在 git 历史中。

---

## Phase 2 — lib/affiliate.ts（Day 2）

**目标：** 根据目的地信息，自动生成各平台的带 tag 链接。

### lib/affiliate-config.ts

```typescript
export const AFFILIATE_CONFIG = {
  booking: {
    affiliateId: process.env.NEXT_PUBLIC_BOOKING_AFFILIATE_ID || '',
    baseUrl: 'https://www.booking.com',
  },
  skyscanner: {
    partnerId: process.env.NEXT_PUBLIC_SKYSCANNER_PARTNER_ID || '',
    baseUrl: 'https://www.skyscanner.com',
  },
  viator: {
    partnerId: process.env.NEXT_PUBLIC_VIATOR_PARTNER_ID || '',
    baseUrl: 'https://www.viator.com',
  },
  expedia: {
    cid: process.env.NEXT_PUBLIC_EXPEDIA_CID || '',
    baseUrl: 'https://www.expedia.com',
  },
  getyourguide: {
    partnerId: process.env.NEXT_PUBLIC_GETYOURGUIDE_PARTNER_ID || '',
    baseUrl: 'https://www.getyourguide.com',
  },
}
```

### lib/affiliate.ts

```typescript
import { AFFILIATE_CONFIG as CFG } from './affiliate-config'

export interface TripDates {
  checkIn: string   // YYYY-MM-DD
  checkOut: string
  nights: number
}

export interface AffiliateLinks {
  flights: FlightLink[]
  hotels: HotelLink[]
  activities: ActivityLink[]
}

export interface FlightLink {
  platform: string
  label: string
  url: string
  note?: string
}

export interface HotelLink {
  platform: string
  label: string
  url: string
  priceRange?: string
}

export interface ActivityLink {
  platform: string
  label: string
  url: string
  category: string
}

// ─── 机票链接 ───────────────────────────────────────────────

export function buildFlightLinks(
  origin: string,        // e.g. "SFO"
  destination: string,   // e.g. "LIS"
  dates: TripDates
): FlightLink[] {
  const { partnerId } = CFG.skyscanner
  const { cid } = CFG.expedia

  return [
    {
      platform: 'Skyscanner',
      label: `${origin} → ${destination} 机票`,
      url: `https://www.skyscanner.com/transport/flights/${origin}/${destination}/${dates.checkIn.replace(/-/g,'')}/?adults=2&ref=${partnerId}`,
      note: '对比多家航空，找最低价',
    },
    {
      platform: 'Google Flights',
      label: `Google Flights 搜索`,
      url: `https://www.google.com/flights?q=flights+from+${origin}+to+${destination}`,
      note: '价格透明，无佣金（流量来源）',
    },
    {
      platform: 'Expedia',
      label: `Expedia 机票`,
      url: `https://www.expedia.com/Flights-Search?trip=oneway&leg1=from%3A${origin}%2Cto%3A${destination}%2Cdeparture%3A${dates.checkIn}&cid=${cid}`,
    },
  ]
}

// ─── 酒店链接 ───────────────────────────────────────────────

export function buildHotelLinks(
  destinationCity: string,   // e.g. "Lisbon"
  destinationSlug: string,   // e.g. "lisbon" (URL-safe)
  dates: TripDates
): HotelLink[] {
  const { affiliateId } = CFG.booking
  const { cid } = CFG.expedia

  return [
    {
      platform: 'Booking.com',
      label: `${destinationCity} 酒店`,
      url: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destinationCity)}&checkin=${dates.checkIn}&checkout=${dates.checkOut}&aid=${affiliateId}`,
      priceRange: '各价位均有',
    },
    {
      platform: 'Hotels.com',
      label: `Hotels.com 搜索`,
      url: `https://www.hotels.com/search.do?q-destination=${encodeURIComponent(destinationCity)}&q-check-in=${dates.checkIn}&q-check-out=${dates.checkOut}&affiliate_id=${cid}`,
    },
    {
      platform: 'Expedia',
      label: `Expedia 酒店`,
      url: `https://www.expedia.com/Hotel-Search?destination=${encodeURIComponent(destinationCity)}&startDate=${dates.checkIn}&endDate=${dates.checkOut}&cid=${cid}`,
    },
  ]
}

// ─── 活动/一日游链接 ─────────────────────────────────────────

export function buildActivityLinks(
  destinationCity: string,
  destinationSlug: string,
  suggestedActivities: string[]   // AI 推荐的活动，e.g. ["Sintra day trip", "Alfama walking tour"]
): ActivityLink[] {
  const { partnerId: viatorId } = CFG.viator
  const { partnerId: gygId } = CFG.getyourguide

  const links: ActivityLink[] = [
    {
      platform: 'Viator',
      label: `${destinationCity} 热门活动`,
      url: `https://www.viator.com/search/${destinationSlug}?pid=${viatorId}`,
      category: 'overview',
    },
    {
      platform: 'GetYourGuide',
      label: `${destinationCity} 一日游 & 体验`,
      url: `https://www.getyourguide.com/s/?q=${encodeURIComponent(destinationCity)}&partner_id=${gygId}`,
      category: 'overview',
    },
  ]

  // 为 AI 推荐的具体活动生成深度链接
  suggestedActivities.slice(0, 2).forEach(activity => {
    links.push({
      platform: 'Viator',
      label: activity,
      url: `https://www.viator.com/search/${encodeURIComponent(activity)}?pid=${viatorId}`,
      category: 'specific',
    })
  })

  return links
}

// ─── 主函数：生成完整预订链接包 ──────────────────────────────

export function buildAffiliateLinks(params: {
  originCode: string
  destinationCity: string
  destinationCode: string
  destinationSlug: string
  dates: TripDates
  suggestedActivities: string[]
}): AffiliateLinks {
  return {
    flights: buildFlightLinks(params.originCode, params.destinationCode, params.dates),
    hotels: buildHotelLinks(params.destinationCity, params.destinationSlug, params.dates),
    activities: buildActivityLinks(params.destinationCity, params.destinationSlug, params.suggestedActivities),
  }
}
```

---

## Phase 3 — BookFirst 组件（Day 3）

**目标：** 渲染"优先预订"卡片，视觉清晰，点击直接跳转。

### components/BookCard.tsx

```typescript
import { FlightLink, HotelLink, ActivityLink } from '@/lib/affiliate'

interface BookCardProps {
  icon: string          // ti-plane | ti-building | ti-map-pin
  platform: string
  label: string
  url: string
  note?: string
  badge?: string        // "最低价" | "推荐"
}

export function BookCard({ icon, platform, label, url, note, badge }: BookCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer sponsored"   // sponsored = SEO 合规
      className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 
                 hover:border-blue-300 hover:bg-blue-50 transition-all group"
    >
      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
        <i className={`ti ${icon} text-blue-600 text-lg`} aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-900 truncate">{label}</p>
        <p className="text-xs text-slate-500">{platform}{note ? ` · ${note}` : ''}</p>
      </div>
      {badge && (
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full flex-shrink-0">
          {badge}
        </span>
      )}
      <i className="ti ti-external-link text-slate-400 group-hover:text-blue-500 text-sm" aria-hidden="true" />
    </a>
  )
}
```

### components/BookFirst.tsx

```typescript
import { AffiliateLinks } from '@/lib/affiliate'
import { BookCard } from './BookCard'
import { AffiliateDisclosure } from './AffiliateDisclosure'

interface BookFirstProps {
  links: AffiliateLinks
  destinationCity: string
}

export function BookFirst({ links, destinationCity }: BookFirstProps) {
  return (
    <section aria-labelledby="book-first-title">
      <h3 id="book-first-title" className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-3">
        优先预订
      </h3>

      {/* 机票 */}
      <div className="mb-4">
        <p className="text-xs text-slate-400 mb-2">✈ 机票</p>
        <div className="space-y-2">
          {links.flights.slice(0, 2).map((f, i) => (
            <BookCard
              key={i}
              icon="ti-plane"
              platform={f.platform}
              label={f.label}
              url={f.url}
              note={f.note}
              badge={i === 0 ? '推荐' : undefined}
            />
          ))}
        </div>
      </div>

      {/* 酒店 */}
      <div className="mb-4">
        <p className="text-xs text-slate-400 mb-2">🏨 酒店</p>
        <div className="space-y-2">
          {links.hotels.slice(0, 2).map((h, i) => (
            <BookCard
              key={i}
              icon="ti-building"
              platform={h.platform}
              label={h.label}
              url={h.url}
              badge={i === 0 ? '最多选择' : undefined}
            />
          ))}
        </div>
      </div>

      {/* 活动 */}
      <div className="mb-4">
        <p className="text-xs text-slate-400 mb-2">🗺 活动 & 一日游</p>
        <div className="space-y-2">
          {links.activities.slice(0, 2).map((a, i) => (
            <BookCard
              key={i}
              icon="ti-map-pin"
              platform={a.platform}
              label={a.label}
              url={a.url}
            />
          ))}
        </div>
      </div>

      <AffiliateDisclosure />
    </section>
  )
}
```

### components/AffiliateDisclosure.tsx（合规必须）

```typescript
export function AffiliateDisclosure() {
  return (
    <p className="text-xs text-slate-400 mt-3 leading-relaxed">
      部分链接为联盟链接，点击预订后我们可能获得少量佣金，不影响您的价格。
    </p>
  )
}
```

---

## Phase 4 — AI Prompt 集成（Day 4）

**目标：** AI 在推荐目的地时，同时返回用于生成联盟链接的结构化数据。

### 更新 lib/prompts.ts — 新增字段

```typescript
// 在 buildComparePrompt 返回的 JSON 中新增：
{
  "winner": "Lisbon, Portugal",
  "winner_meta": {
    "city": "Lisbon",
    "country": "Portugal",
    "city_slug": "lisbon",
    "iata_code": "LIS",              // 目的地机场代码
    "suggested_activities": [
      "Sintra day trip",
      "Alfama walking tour",
      "Belém tower visit"
    ]
  },
  ...
}
```

### 在 /result 页面组装

```typescript
// app/result/page.tsx
import { buildAffiliateLinks } from '@/lib/affiliate'

// AI 返回 winner_meta 后：
const affiliateLinks = buildAffiliateLinks({
  originCode: tripContext.originCode,          // "SFO"
  destinationCity: winnerMeta.city,            // "Lisbon"
  destinationCode: winnerMeta.iata_code,       // "LIS"
  destinationSlug: winnerMeta.city_slug,       // "lisbon"
  dates: {
    checkIn: tripContext.dates.from,
    checkOut: tripContext.dates.to,
    nights: tripContext.dates.nights,
  },
  suggestedActivities: winnerMeta.suggested_activities,
})

// 传入 BookFirst 组件
<BookFirst links={affiliateLinks} destinationCity={winnerMeta.city} />
```

---

## Phase 5 — 点击追踪（Day 5，可选）

**目标：** 记录哪个平台点击率最高，优化排序。

### app/api/track/route.ts

```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { platform, type, destination, url } = await req.json()

  // 简单记录到 console（后期替换为 DB 或 analytics）
  console.log('[affiliate-click]', {
    platform,       // "Booking.com"
    type,           // "hotel" | "flight" | "activity"
    destination,    // "Lisbon"
    url,
    timestamp: new Date().toISOString(),
    userAgent: req.headers.get('user-agent'),
  })

  // 后期可以写入 Vercel KV / Supabase / Plausible
  return NextResponse.json({ ok: true })
}
```

### 在 BookCard 中调用

```typescript
const handleClick = async () => {
  // 非阻塞追踪，不影响跳转速度
  fetch('/api/track', {
    method: 'POST',
    body: JSON.stringify({ platform, type, destination, url }),
    headers: { 'Content-Type': 'application/json' },
  }).catch(() => {})  // 静默失败
}

<a href={url} onClick={handleClick} ...>
```

---

## Phase 6 — 合规 & SEO（Day 6）

### 合规要求（必须做）

```
6-1  所有联盟链接加 rel="noopener noreferrer sponsored"
6-2  页面底部加 Affiliate Disclosure 声明
6-3  隐私政策页面说明使用联盟链接（/privacy）
6-4  FTC 合规：不夸大佣金影响，不做虚假推荐
```

### SEO 联盟链接处理

```typescript
// 联盟链接不传 SEO 权重
rel="noopener noreferrer sponsored nofollow"
```

---

## 预期收入估算

| 平台 | 佣金类型 | 转化率估算 | 月收入（100次推荐） |
|---|---|---|---|
| Booking.com | ~4% 酒店预订 | 5–8% | $40–120 |
| Skyscanner | ~$0.30/click | 30% 点击 | $9 |
| Viator | ~8% 活动 | 3–5% | $10–25 |
| Expedia | ~4–6% | 3–5% | $15–40 |
| **合计** | | | **~$74–194/月** |

> 规模化到 1,000次推荐/月 → **$740–1,940/月**，增长线性。

---

## 给 Cursor / Claude Code 的启动 Prompt

```
Build the affiliate monetization layer for XingAI Travel AI.

Files to create:
1. lib/affiliate-config.ts — platform configs with env vars
2. lib/affiliate.ts — buildFlightLinks, buildHotelLinks, buildActivityLinks, buildAffiliateLinks
3. components/BookCard.tsx — single booking card with icon, platform, label, external link
4. components/BookFirst.tsx — renders flights/hotels/activities sections using BookCard
5. components/AffiliateDisclosure.tsx — small compliance text

Requirements:
- All affiliate links must include rel="noopener noreferrer sponsored"
- Links open in new tab (target="_blank")
- BookCard has hover state (blue border + bg)
- AffiliateDisclosure always renders below BookFirst
- All affiliate IDs come from process.env (NEXT_PUBLIC_*)
- Click tracking: non-blocking fetch to /api/track on each link click

Use TypeScript, Tailwind CSS, sky blue accent #2563eb.
Match the visual style of docs/ux-v1/mobile-result.html "Book first" section.
```

---

## 里程碑

| Phase | 内容 | 预计时间 | 验收标准 |
|---|---|---|---|
| 1 | 注册所有联盟计划 | Day 1 | 拿到所有 affiliate ID |
| 2 | lib/affiliate.ts | Day 2 | 单元测试：输入 SFO+LIS+日期 → 输出正确 URL |
| 3 | BookFirst 组件 | Day 3 | 视觉正确，所有链接可点击跳转 |
| 4 | AI Prompt 集成 | Day 4 | result 页面自动显示正确目的地的链接 |
| 5 | 点击追踪 | Day 5 | 点击后 /api/track 有日志 |
| 6 | 合规 + 上线 | Day 6 | rel 属性正确，disclosure 显示 |

**总计：6天完成联盟变现完整闭环。**
