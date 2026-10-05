import type { FaqItem, HowItWorksStep, Localized } from "@/lib/content/types"

const L = (en: string, zh: string, ko: string, es: string): Localized => ({ en, zh, ko, es })

export const howItWorksTitle = L(
  "How XingAI Travel chooses your best destination",
  "XingAI Travel 如何选出最适合你的目的地",
  "XingAI Travel이 최적 목적지를 고르는 방법",
  "Cómo XingAI Travel elige tu mejor destino"
)

export const howItWorksLead = L(
  "A Travel Decision System: constraints first, one winner, two alternatives, clear trade-offs — then booking links.",
  "旅行决策系统：先约束，一个首选、两个备选、清晰取舍——然后再给预订链接。",
  "여행 결정 시스템: 조건 먼저, 추천 1개·대안 2개·명확한 trade-off — 그다음 예약 링크.",
  "Sistema de decisión: primero restricciones, un ganador, dos alternativas, trade-offs claros — luego enlaces de reserva."
)

export const howItWorksSteps: HowItWorksStep[] = [
  {
    title: L("1. Understand your constraints", "1. 理解你的约束", "1. 조건 이해하기", "1. Entender tus restricciones"),
    body: L(
      "Dates, origin, budget, travelers, style, pace, and what you want to avoid.",
      "日期、出发地、预算、同行人、风格、节奏，以及你想避免的事。",
      "날짜, 출발지, 예산, 여행자, 스타일, 속도, 피하고 싶은 것.",
      "Fechas, origen, presupuesto, viajeros, estilo, ritmo y lo que quieres evitar."
    ),
  },
  {
    title: L("2. Evaluate destinations", "2. 评估目的地", "2. 목적지 평가", "2. Evaluar destinos"),
    body: L(
      "We compare weather for your dates, flight friction from your origin, walkability, budget fit, and pace.",
      "比较你出行日期的天气、从出发地的航班摩擦、步行友好度、预算匹配和节奏。",
      "일정 날씨, 출발지 항공 부담, 도보 이동, 예산 적합, 속도를 비교합니다.",
      "Comparamos clima para tus fechas, fricción de vuelo desde tu origen, caminabilidad, presupuesto y ritmo."
    ),
  },
  {
    title: L("3. Rank and name a winner", "3. 排序并给出首选", "3. 순위를 매기고 추천을 고름", "3. Clasificar y nombrar un ganador"),
    body: L(
      "Exactly three options max. One best overall match — not a wall of unranked ideas.",
      "最多三个选项。一个综合最匹配的首选——不是一堆未排序的点子。",
      "최대 3개. 종합적으로 가장 맞는 하나 — 정렬 없는 목록이 아닙니다.",
      "Máximo tres opciones. Un mejor ajuste general — no una pared de ideas sin orden."
    ),
  },
  {
    title: L("4. Explain trade-offs", "4. 说明取舍", "4. trade-off 설명", "4. Explicar trade-offs"),
    body: L(
      "The winner is not always the cheapest or most popular. Alternatives get honest “why not” reasons.",
      "首选不一定最便宜或最热门。备选会写清楚「为什么不是它」。",
      "추천이 항상 제일 싸거나 인기 있는 곳은 아닙니다. 대안에는 솔직한 “왜 아닌가”가 있습니다.",
      "El ganador no siempre es el más barato o popular. Las alternativas incluyen un “por qué no” honesto."
    ),
  },
  {
    title: L("5. Evidence, then book", "5. 依据，再预订", "5. 근거 후 예약", "5. Evidencia, luego reservar"),
    body: L(
      "Match Score and factor notes are labeled as estimates. Partner booking links appear only after the decision.",
      "匹配分与因子说明会标成估算。合作方预订链接只在决策之后出现。",
      "Match Score와 요인 설명은 추정으로 표시됩니다. 제휴 예약 링크는 결정 후에만 나타납니다.",
      "Match Score y notas de factores se etiquetan como estimaciones. Los enlaces de reserva aparecen después de la decisión."
    ),
  },
]

export const faqItems: FaqItem[] = [
  {
    q: L(
      "How is XingAI Travel different from booking sites?",
      "XingAI Travel 和订票网站有什么不同？",
      "XingAI Travel은 예약 사이트와 무엇이 다른가요?",
      "¿En qué se diferencia XingAI Travel de los sitios de reserva?"
    ),
    a: L(
      "Booking sites help you buy inventory. XingAI Travel helps you decide where to go first by comparing destinations against your constraints, then shows search links.",
      "订票网站帮你买库存。XingAI Travel 先按你的约束比较目的地、帮你决定去哪，再给搜索链接。",
      "예약 사이트는 재고 구매를 돕습니다. XingAI Travel은 조건에 맞춰 목적지를 비교해 먼저 어디로 갈지 결정하게 한 뒤 검색 링크를 보여줍니다.",
      "Los sitios de reserva ayudan a comprar inventario. XingAI Travel te ayuda a decidir adónde ir primero comparando destinos con tus restricciones, y luego muestra enlaces de búsqueda."
    ),
  },
  {
    q: L(
      "How does XingAI choose a destination?",
      "XingAI 如何选择目的地？",
      "XingAI는 목적지를 어떻게 고르나요?",
      "¿Cómo elige XingAI un destino?"
    ),
    a: L(
      "It compares weather, budget, flights, walkability, and trip pace against what you said matters, then ranks one winner and two alternatives with trade-offs.",
      "它会按你说的重点，比较天气、预算、航班、步行友好度和节奏，再给出一个首选和两个带取舍的备选。",
      "날씨, 예산, 항공, 도보 이동, 여행 속도를 당신이 말한 우선순위와 비교한 뒤, 추천 1개와 trade-off가 있는 대안 2개를 제시합니다.",
      "Compara clima, presupuesto, vuelos, caminabilidad y ritmo con lo que te importa, y clasifica un ganador y dos alternativas con trade-offs."
    ),
  },
  {
    q: L(
      "Do affiliate links affect recommendations?",
      "联盟链接会影响推荐吗？",
      "제휴 링크가 추천에 영향을 주나요?",
      "¿Los enlaces de afiliados afectan las recomendaciones?"
    ),
    a: L(
      "No. Winners, rankings, confidence, and trade-offs are based on trip fit. Affiliate links may appear after the decision.",
      "不会。首选、排序、匹配度与取舍基于行程匹配。联盟链接可能在决策之后出现。",
      "아니요. 추천·순위·적합도·trade-off는 여행 적합도에 기반합니다. 제휴 링크는 결정 후에 나타날 수 있습니다.",
      "No. Ganadores, rankings, confianza y trade-offs se basan en el ajuste del viaje. Los enlaces de afiliados pueden aparecer después de la decisión."
    ),
  },
  {
    q: L(
      "Where should I travel in November?",
      "十一月适合去哪里？",
      "11월에는 어디로 여행해야 하나요?",
      "¿Adónde viajar en noviembre?"
    ),
    a: L(
      "It depends on origin, budget, weather preference, and pace. Warm, walkable, food-forward cities are often strong — use /guides/where-to-travel-in-november, then run your own decision on /decide.",
      "取决于出发地、预算、天气偏好和节奏。温暖、好走、吃货友好的城市往往不错——见指南，再到 /decide 做你自己的决策。",
      "출발지, 예산, 날씨 선호, 속도에 달립니다. 따뜻하고 걷기 좋으며 음식이 강한 도시가 자주 후보입니다 — 가이드를 본 뒤 /decide에서 직접 결정하세요.",
      "Depende del origen, presupuesto, clima y ritmo. Ciudades cálidas, caminables y con buena comida suelen ser fuertes — lee la guía y luego ejecuta tu decisión en /decide."
    ),
  },
  {
    q: L(
      "Should I verify the plan before booking?",
      "预订前需要核实计划吗？",
      "예약 전에 계획을 확인해야 하나요?",
      "¿Debo verificar el plan antes de reservar?"
    ),
    a: L(
      "Yes. Always verify live prices, entry rules, safety conditions, cancellation policies, and availability before you pay.",
      "需要。付款前请务必核实实时价格、入境规定、安全情况、取消政策和可用性。",
      "네. 결제 전 실시간 요금, 입국 규정, 안전, 취소 정책, 가능 여부를 항상 확인하세요.",
      "Sí. Verifica siempre precios en vivo, requisitos de entrada, seguridad, cancelaciones y disponibilidad antes de pagar."
    ),
  },
]
