import type { Localized } from "@/lib/content/types"

const L = (en: string, zh: string, ko: string, es: string): Localized => ({ en, zh, ko, es })

/** Search-shaped decision questions that land on evergreen /compare or /city — not the form. */
export type ScenarioQuestion = {
  id: string
  question: Localized
  href: string
}

export const scenarioQuestions: ScenarioQuestion[] = [
  {
    id: "hk-shanghai-4-days",
    question: L(
      "Hong Kong or Shanghai for 4 days — which city?",
      "香港和上海，4 天选哪个？",
      "홍콩 vs 상하이, 4일이면 어디?",
      "¿Hong Kong o Shanghái para 4 días?",
    ),
    href: "/compare/hong-kong-vs-shanghai",
  },
  {
    id: "tokyo-vs-shanghai",
    question: L(
      "Tokyo or Shanghai — Japan or China megacity?",
      "东京还是上海——日本还是中国大都市？",
      "도쿄 vs 상하이 — 일본 vs 중국 메가시티?",
      "¿Tokio o Shanghái — Japón o megaciudad china?",
    ),
    href: "/compare/tokyo-vs-shanghai",
  },
  {
    id: "xian-vs-shanghai",
    question: L(
      "Xi'an or Shanghai — history China or modern coast?",
      "西安还是上海——历史中国还是现代海岸？",
      "시안 vs 상하이 — 역사 중국 vs 현대 해안?",
      "¿Xi'an o Shanghái — China histórica o costa moderna?",
    ),
    href: "/compare/xian-vs-shanghai",
  },
  {
    id: "hk-macau-3-days",
    question: L(
      "Hong Kong or Macau for 3 days — which one?",
      "香港和澳门，3 天选哪个？",
      "홍콩과 마카오, 3일이면 어디?",
      "¿Hong Kong o Macao para 3 días?",
    ),
    href: "/compare/hong-kong-vs-macau",
  },
  {
    id: "cabo-season-parents",
    question: L(
      "Taking parents to Los Cabos — which season fits?",
      "带父母去 Cabo，什么季节最合适？",
      "부모님과 로스카보스, 어느 계절이 맞을까?",
      "¿Con padres a Los Cabos — qué temporada encaja?",
    ),
    href: "/city/los-cabos",
  },
  {
    id: "nola-vs-cabo",
    question: L(
      "New Orleans or Los Cabos — culture city or Baja coast?",
      "新奥尔良还是洛斯卡沃斯——文化城还是下加州海岸？",
      "뉴올리언스 vs 로스카보스 — 문화 도시 vs 바하 해안?",
      "¿Nueva Orleans o Los Cabos — ciudad cultural o costa Baja?",
    ),
    href: "/compare/new-orleans-vs-los-cabos",
  },
  {
    id: "tokyo-vs-seoul",
    question: L(
      "Tokyo or Seoul — which city trip fits you?",
      "东京还是首尔——哪次城市行更适合你？",
      "도쿄 vs 서울 — 어디에 더 맞을까?",
      "¿Tokio o Seúl — qué viaje urbano te encaja?",
    ),
    href: "/compare/tokyo-vs-seoul",
  },
  {
    id: "tokyo-vs-singapore",
    question: L(
      "Tokyo or Singapore for a first Asia hub trip?",
      "第一次去亚洲枢纽，东京还是新加坡？",
      "첫 아시아 허브 여행, 도쿄 vs 싱가포르?",
      "¿Tokio o Singapur para un primer hub en Asia?",
    ),
    href: "/compare/tokyo-vs-singapore",
  },
  {
    id: "seoul-vs-taipei",
    question: L(
      "Seoul or Taipei for food and short city days?",
      "首尔还是台北——吃与短城市日怎么选？",
      "서울 vs 타이베이 — 음식과 짧은 도시 일정?",
      "¿Seúl o Taipéi para comida y días urbanos cortos?",
    ),
    href: "/compare/seoul-vs-taipei",
  },
]

export const scenarioIntro = L(
  "Real decision questions — read the compare or city page first, then run Decide with your own dates.",
  "真人会搜的决策问句——先读对比或城市页，再用你自己的日期跑 Decide。",
  "실제로 검색하는 결정 질문 — 먼저 비교·도시 페이지를 읽고, 그다음 내 날짜로 Decide.",
  "Preguntas de decisión reales — lee primero compare o city, luego Decide con tus fechas.",
)
