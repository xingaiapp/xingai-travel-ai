import type { ContentSection, FaqItem, HowItWorksStep, Localized } from "@/lib/content/types"

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

/** Short AEO answer shown above the step list (visible + FAQ-aligned). */
export const howItWorksDirectAnswer = L(
  "XingAI Travel is an AI travel decision system. It compares destinations against your dates, budget, flights, weather, walkability, and travel style, then recommends one best-fit destination and two alternatives with clear trade-offs — not a long search list.",
  "XingAI Travel 是一个 AI 旅行决策系统。它按你的日期、预算、航班、天气、步行友好度和旅行风格比较目的地，给出一个最匹配的首选和两个带清晰取舍的备选——不是一长串搜索结果。",
  "XingAI Travel은 AI 여행 결정 시스템입니다. 날짜, 예산, 항공, 날씨, 도보 이동, 여행 스타일에 맞춰 목적지를 비교한 뒤, 가장 맞는 추천 1개와 명확한 trade-off가 있는 대안 2개를 제시합니다 — 긴 검색 목록이 아닙니다.",
  "XingAI Travel es un sistema de decisión de viaje con IA. Compara destinos según fechas, presupuesto, vuelos, clima, caminabilidad y estilo de viaje, y recomienda un destino más adecuado y dos alternativas con trade-offs claros — no una lista larga de búsqueda."
)

export const faqDirectAnswer = L(
  "XingAI Travel helps you decide where to go first. Booking sites help you buy inventory later. Enter your real constraints on /decide, compare one winner and two alternatives, then open partner search links only after the decision.",
  "XingAI Travel 先帮你决定去哪。订票网站之后才帮你买库存。在 /decide 填写真实约束，比较一个首选和两个备选，预订搜索链接只在决策之后出现。",
  "XingAI Travel은 먼저 어디로 갈지 결정하도록 돕습니다. 예약 사이트는 그다음 재고 구매를 돕습니다. /decide에 실제 조건을 입력하고, 추천 1개와 대안 2개를 비교한 뒤, 결정 이후에만 제휴 검색 링크를 엽니다.",
  "XingAI Travel te ayuda a decidir primero adónde ir. Los sitios de reserva ayudan después a comprar inventario. En /decide introduce tus restricciones reales, compara un ganador y dos alternativas, y abre enlaces de búsqueda de socios solo después de la decisión."
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

/** Method detail below the steps: inputs, scoring, data labels, limits. Keep in sync with lib/match-score.ts. */
export const howItWorksSections: ContentSection[] = [
  {
    heading: L("What goes into a comparison", "比较时用到了什么", "비교에 들어가는 것", "Qué entra en una comparación"),
    body: L(
      "Everything you enter on Decide — dates, origin, region, places in mind, budget and currency, travelers, style, pace, notes, and Avoid — is sent with the request. The model combines that with general travel knowledge to pick three destinations and describe weather for your dates, likely flight time from your origin, walkability, and trade-offs. It does not read live airline, hotel, or ticket inventory.",
      "你在 Decide 填写的所有内容——日期、出发地、区域、已有想法、预算和货币、同行人、风格、节奏、备注和「避开」——都会随请求一起发送。模型把这些和一般旅行常识结合起来，选出三个目的地，并描述你日期内的天气、从出发地出发的大致航程、步行友好度和取舍。它不读取实时的航班、酒店或门票库存。",
      "Decide에 입력한 모든 것 — 날짜, 출발지, 지역, 생각해 둔 곳, 예산과 통화, 여행자, 스타일, 속도, 메모, Avoid — 이 요청과 함께 전송됩니다. 모델은 이를 일반적인 여행 지식과 결합해 목적지 세 곳을 고르고, 날짜에 맞는 날씨, 출발지에서의 예상 비행시간, 도보 이동, trade-off를 설명합니다. 실시간 항공·호텔·티켓 재고는 읽지 않습니다.",
      "Todo lo que introduces en Decide — fechas, origen, región, lugares en mente, presupuesto y moneda, viajeros, estilo, ritmo, notas y Avoid — se envía con la solicitud. El modelo lo combina con conocimiento general de viajes para elegir tres destinos y describir el clima de tus fechas, el tiempo de vuelo probable desde tu origen, la caminabilidad y los trade-offs. No lee inventario en vivo de aerolíneas, hoteles ni entradas."
    ),
  },
  {
    heading: L("How the Match Score is built", "匹配分是怎么算的", "Match Score는 어떻게 만들어지나", "Cómo se calcula el Match Score"),
    body: L(
      "The Match Score is not a hidden model number. It is calculated the same way for every destination from three visible inputs: the overall fit stars, the confidence level, and the walkability label. When two alternatives tie, the one with the shorter flight is listed first. Scores are a way to read the comparison quickly — the trade-offs underneath explain why.",
      "匹配分不是模型藏起来的数字。它对每个目的地都用同一个公式，从三个看得见的输入算出：综合适合度星级、匹配度高低，以及步行友好度标签。两个备选同分时，航程更短的排在前面。分数是为了让你快速读懂比较结果——下面的取舍才解释了原因。",
      "Match Score는 숨겨진 모델 숫자가 아닙니다. 모든 목적지에 같은 방식으로, 눈에 보이는 세 가지 입력 — 종합 적합도 별점, 적합도 수준, 도보 이동 라벨 — 으로 계산합니다. 두 대안이 동점이면 비행시간이 짧은 쪽이 먼저 나옵니다. 점수는 비교를 빠르게 읽기 위한 것이고, 그 아래 trade-off가 이유를 설명합니다.",
      "El Match Score no es un número oculto del modelo. Se calcula igual para cada destino a partir de tres datos visibles: las estrellas de ajuste general, el nivel de confianza y la etiqueta de caminabilidad. Si dos alternativas empatan, aparece primero la de vuelo más corto. La puntuación sirve para leer rápido la comparación; los trade-offs de abajo explican el porqué."
    ),
  },
  {
    heading: L("How Avoid is enforced", "「避开」是怎么执行的", "Avoid는 어떻게 적용되나", "Cómo se aplica Avoid"),
    body: L(
      "Avoid is treated as a hard constraint, not a soft preference. If you avoid long flights on a short trip, destinations whose estimated flight is too long are demoted, given low confidence, and labeled with the reason. If every option breaks your Avoid list — for example, a four-night trip to Europe from the U.S. West Coast with no long flights — the result says so at the top and suggests what to change instead of pretending one of them fits.",
      "「避开」被当作硬约束，而不是软偏好。如果你在短途行程里要避开长途飞行，估算航程太长的目的地会被降权、标为低匹配度，并写明原因。如果所有选项都违反你的「避开」——比如从美国西海岸出发、只玩四晚又不想长途飞行却只看欧洲——结果会在最上方直接说明，并建议你改哪里，而不是假装其中某个合适。",
      "Avoid는 약한 선호가 아니라 강한 조건으로 다룹니다. 짧은 여행에서 장거리 비행을 피한다고 하면, 예상 비행시간이 너무 긴 목적지는 순위가 내려가고 낮은 적합도가 붙으며 이유가 표시됩니다. 모든 선택지가 Avoid를 어긴다면 — 예를 들어 미국 서부에서 출발해 장거리 비행 없이 4박으로 유럽만 본다면 — 결과 맨 위에 그 사실을 밝히고, 하나가 맞는 척하는 대신 무엇을 바꿀지 제안합니다.",
      "Avoid se trata como una restricción firme, no como una preferencia blanda. Si evitas vuelos largos en un viaje corto, los destinos con un vuelo estimado demasiado largo bajan de posición, reciben confianza baja y se etiquetan con el motivo. Si todas las opciones rompen tu Avoid — por ejemplo, cuatro noches en Europa desde la costa oeste de EE. UU. sin vuelos largos — el resultado lo dice arriba y sugiere qué cambiar en vez de fingir que alguna encaja."
    ),
  },
  {
    heading: L("Where the numbers come from", "数字从哪里来", "숫자는 어디서 오나", "De dónde salen los números"),
    body: L(
      "Each fact on the result is labeled. Weather, flight time, and walkability are AI estimates. The Match Score is derived from the fields above. The cost estimate is a typical range for your travelers and nights, dated the day it was produced — not a quote. Nothing on the result is live inventory, which is why every booking step tells you to check the partner's real price and availability.",
      "结果里的每条信息都有标注。天气、航程和步行友好度是 AI 估算。匹配分由上面的字段推算出来。费用估算是按你的人数和晚数给出的典型区间，并注明生成日期——不是报价。结果里没有任何实时库存，所以每个预订步骤都会提醒你去合作方核对真实价格和可订情况。",
      "결과의 모든 정보에는 라벨이 붙습니다. 날씨, 비행시간, 도보 이동은 AI 추정입니다. Match Score는 위의 항목에서 산출됩니다. 비용 추정은 인원과 숙박 수에 맞춘 일반적인 범위이며 생성 날짜가 표시됩니다 — 견적이 아닙니다. 결과에는 실시간 재고가 없으므로, 모든 예약 단계에서 제휴사의 실제 가격과 예약 가능 여부를 확인하라고 안내합니다.",
      "Cada dato del resultado está etiquetado. Clima, tiempo de vuelo y caminabilidad son estimaciones de IA. El Match Score se deriva de los campos anteriores. La estimación de costos es un rango típico para tus viajeros y noches, fechado el día en que se generó: no es una cotización. Nada del resultado es inventario en vivo; por eso cada paso de reserva te pide comprobar precio y disponibilidad reales en el sitio del socio."
    ),
  },
  {
    heading: L("What it does not do", "它不做什么", "하지 않는 것", "Lo que no hace"),
    body: L(
      "XingAI Travel does not book flights or hotels, hold inventory, or take payment. It does not decide whether you need a visa — entry rules depend on your nationality, so check official government sources. City guides and first-hand Stories are shown after the decision and never change the winner, ranking, or trade-offs, and partner links never influence them either.",
      "XingAI Travel 不预订机票或酒店，不持有库存，也不收款。它不判断你是否需要签证——入境规定取决于你的国籍，请查官方政府信息。城市指南和亲历故事在决策之后才出现，从不改变首选、排序或取舍；合作方链接也同样不影响它们。",
      "XingAI Travel은 항공권이나 호텔을 예약하지 않고, 재고를 보유하지 않으며, 결제를 받지 않습니다. 비자가 필요한지도 판단하지 않습니다 — 입국 규정은 국적에 따라 다르니 공식 정부 자료를 확인하세요. 시티 가이드와 직접 쓴 Stories는 결정 후에 보이며 추천, 순위, trade-off를 바꾸지 않고, 제휴 링크도 이에 영향을 주지 않습니다.",
      "XingAI Travel no reserva vuelos ni hoteles, no tiene inventario y no cobra pagos. No decide si necesitas visado: las normas de entrada dependen de tu nacionalidad, así que consulta fuentes oficiales. Las guías de ciudad y las Stories de primera mano se muestran después de la decisión y nunca cambian el ganador, la clasificación ni los trade-offs; los enlaces de socios tampoco."
    ),
  },
  {
    heading: L("When to trust it less", "什么时候要少信一点", "덜 믿어야 할 때", "Cuándo fiarte menos"),
    body: L(
      "Treat the result as a strong first draft, and double-check it when your origin is a small airport with few routes, when the destination is niche, when your dates overlap a major festival or holiday, or when anyone in your group has accessibility or medical needs. In those cases the general knowledge behind the estimates is thinner, and a few minutes on official sites is worth it.",
      "把结果当作一份很好的初稿。遇到这些情况时要再核实：出发地是航线很少的小机场、目的地比较冷门、日期撞上大型节庆或假期，或者同行有人有无障碍或医疗需求。这些情况下，估算背后的常识更薄弱，花几分钟查官方网站很值得。",
      "결과를 탄탄한 초안으로 보되, 다음 경우에는 다시 확인하세요: 출발지가 노선이 적은 작은 공항일 때, 목적지가 잘 알려지지 않은 곳일 때, 날짜가 큰 축제나 연휴와 겹칠 때, 일행 중 접근성이나 의료상 필요가 있는 사람이 있을 때. 이런 경우 추정의 바탕이 되는 일반 지식이 얇아지므로 공식 사이트를 몇 분 확인할 가치가 있습니다.",
      "Toma el resultado como un buen primer borrador y compruébalo cuando tu origen sea un aeropuerto pequeño con pocas rutas, el destino sea poco común, tus fechas coincidan con un gran festival o festivo, o alguien del grupo tenga necesidades de accesibilidad o médicas. En esos casos el conocimiento general detrás de las estimaciones es más débil y vale la pena dedicar unos minutos a fuentes oficiales."
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
  {
    q: L("Is XingAI Travel free?", "XingAI Travel 免费吗？", "XingAI Travel은 무료인가요?", "¿XingAI Travel es gratis?"),
    a: L(
      "Yes, it is free to use today, with no account. Because every decision runs an AI model, there is a small daily limit on decisions per network. Your trip history and travel map stay in your browser.",
      "是的，目前免费使用，也不需要注册。因为每次决策都要调用 AI 模型，每个网络每天的决策次数有一个不大的上限。你的行程历史和旅行地图保存在你自己的浏览器里。",
      "네, 현재 계정 없이 무료로 사용할 수 있습니다. 결정마다 AI 모델이 실행되기 때문에 네트워크당 하루 결정 횟수에 작은 제한이 있습니다. 여행 기록과 여행 지도는 브라우저에 저장됩니다.",
      "Sí, hoy es gratis y sin cuenta. Como cada decisión ejecuta un modelo de IA, hay un pequeño límite diario de decisiones por red. Tu historial y tu mapa de viajes se quedan en tu navegador."
    ),
  },
  {
    q: L(
      "Does it know live prices or availability?",
      "它知道实时价格或可订情况吗？",
      "실시간 가격이나 예약 가능 여부를 아나요?",
      "¿Conoce precios o disponibilidad en vivo?"
    ),
    a: L(
      "No. Weather, flight times, and costs are estimates, and each one is labeled that way on the result. After you decide, the booking links open partner search pages with your dates filled in, where you see real prices and availability.",
      "不知道。天气、航程和费用都是估算，结果里每一项都标明了。决定之后，预订链接会打开合作方的搜索页并填好你的日期，在那里才能看到真实价格和可订情况。",
      "아니요. 날씨, 비행시간, 비용은 추정이며 결과에 각각 그렇게 표시됩니다. 결정 후 예약 링크를 누르면 날짜가 입력된 제휴사 검색 페이지가 열리고, 거기서 실제 가격과 예약 가능 여부를 볼 수 있습니다.",
      "No. Clima, tiempos de vuelo y costos son estimaciones, y así se etiquetan en el resultado. Tras decidir, los enlaces de reserva abren páginas de búsqueda de socios con tus fechas, donde ves precios y disponibilidad reales."
    ),
  },
  {
    q: L(
      "Can I compare cities that do not have a city guide?",
      "没有城市指南的城市也能比较吗？",
      "시티 가이드가 없는 도시도 비교할 수 있나요?",
      "¿Puedo comparar ciudades sin guía?"
    ),
    a: L(
      "Yes. Decide can compare any destination you type in “Already have places in mind?”, or suggest options inside the region you pick. City guides exist for a growing set of cities and are optional reading after the decision; they never affect the comparison.",
      "可以。Decide 能比较你在「已有想去的地方」里输入的任何目的地，也能在你选的区域里推荐选项。城市指南只覆盖一部分城市、并在逐步增加，是决策之后的选读内容，从不影响比较结果。",
      "네. Decide는 ‘생각 중인 장소’에 입력한 어떤 목적지든 비교할 수 있고, 고른 지역 안에서 후보를 제안할 수도 있습니다. 시티 가이드는 점점 늘어나는 일부 도시에만 있으며 결정 후에 읽는 선택 자료로, 비교에는 영향을 주지 않습니다.",
      "Sí. Decide puede comparar cualquier destino que escribas en «¿Ya tienes lugares en mente?», o sugerir opciones dentro de la región que elijas. Las guías existen para un grupo creciente de ciudades y son lectura opcional tras la decisión; nunca afectan la comparación."
    ),
  },
  {
    q: L(
      "What happens if my constraints conflict?",
      "如果我的条件互相冲突会怎样？",
      "조건이 서로 충돌하면 어떻게 되나요?",
      "¿Qué pasa si mis restricciones chocan?"
    ),
    a: L(
      "The result tells you. For example, if every option breaks your Avoid list, a notice at the top explains the conflict and suggests a change — a longer trip, a closer region, or a looser Avoid — instead of presenting a weak option as a good fit.",
      "结果会直接告诉你。比如所有选项都违反你的「避开」，最上方会有提示说明冲突，并建议你改一项——延长行程、换近一点的区域，或放宽「避开」——而不是把一个勉强的选项包装成合适。",
      "결과가 알려 줍니다. 예를 들어 모든 선택지가 Avoid를 어기면 맨 위 안내가 충돌을 설명하고, 약한 선택지를 잘 맞는 것처럼 내놓는 대신 더 긴 일정, 더 가까운 지역, 더 느슨한 Avoid 같은 변경을 제안합니다.",
      "El resultado te lo dice. Por ejemplo, si todas las opciones rompen tu Avoid, un aviso arriba explica el conflicto y sugiere un cambio — un viaje más largo, una región más cercana o un Avoid más flexible — en lugar de presentar una opción débil como buena."
    ),
  },
  {
    q: L(
      "Do I need an account, and where is my data kept?",
      "需要注册吗？我的数据存在哪里？",
      "계정이 필요한가요? 데이터는 어디에 저장되나요?",
      "¿Necesito cuenta y dónde se guardan mis datos?"
    ),
    a: L(
      "No account is needed. Your recent decisions and your Want / Been travel map are stored only in this browser, and clearing site data removes them. Trip inputs are sent to our server and the AI model only when you run a comparison — the privacy policy lists exactly what is processed.",
      "不需要注册。你最近的决策和「想去 / 去过」旅行地图只保存在当前浏览器里，清除网站数据就会删除。只有在你运行比较时，行程内容才会发送到我们的服务器和 AI 模型——隐私政策列出了具体处理哪些数据。",
      "계정은 필요 없습니다. 최근 결정과 ‘가고 싶음 / 가봤음’ 여행 지도는 이 브라우저에만 저장되며, 사이트 데이터를 지우면 삭제됩니다. 여행 입력은 비교를 실행할 때만 서버와 AI 모델로 전송되며, 처리되는 항목은 개인정보 처리방침에 정확히 적혀 있습니다.",
      "No hace falta cuenta. Tus decisiones recientes y tu mapa Quiero ir / Ya fui se guardan solo en este navegador, y borrar los datos del sitio los elimina. Los datos del viaje se envían a nuestro servidor y al modelo de IA solo cuando ejecutas una comparación; la política de privacidad detalla qué se procesa."
    ),
  },
  {
    q: L(
      "Can I share a decision with someone?",
      "可以把决策结果分享给别人吗？",
      "결정 결과를 다른 사람과 공유할 수 있나요?",
      "¿Puedo compartir una decisión?"
    ),
    a: L(
      "Yes. Share this trip on the result page creates a link that opens the comparison and plan for anyone who has it. The link does not include your origin, dates, budget, or trip notes, so the other person sees the decision, not your personal inputs.",
      "可以。结果页上的「分享这趟行程」会生成一个链接，任何拿到链接的人都能打开比较结果和行程。链接里不包含你的出发地、日期、预算和旅行备注，所以对方看到的是决策本身，而不是你的个人输入。",
      "네. 결과 페이지의 ‘이 여행 공유’는 링크를 가진 누구나 비교와 일정을 열 수 있는 링크를 만듭니다. 링크에는 출발지, 날짜, 예산, 여행 메모가 포함되지 않으므로 상대는 개인 입력이 아니라 결정 자체를 보게 됩니다.",
      "Sí. Compartir este viaje, en la página de resultados, crea un enlace que abre la comparación y el plan para quien lo tenga. El enlace no incluye tu origen, fechas, presupuesto ni notas, así que la otra persona ve la decisión, no tus datos personales."
    ),
  },
  {
    q: L(
      "Which languages does XingAI Travel support?",
      "XingAI Travel 支持哪些语言？",
      "XingAI Travel은 어떤 언어를 지원하나요?",
      "¿Qué idiomas admite XingAI Travel?"
    ),
    a: L(
      "English, Chinese, Korean, and Spanish. Each language has its own pages (for example /zh/decide), and the comparison and plan are written in the language you are using.",
      "英文、中文、韩文和西班牙文。每种语言都有自己的页面（比如 /zh/decide），比较结果和行程也会用你正在使用的语言来写。",
      "영어, 중국어, 한국어, 스페인어를 지원합니다. 언어마다 별도 페이지가 있으며(예: /ko/decide), 비교와 일정도 사용 중인 언어로 작성됩니다.",
      "Inglés, chino, coreano y español. Cada idioma tiene sus propias páginas (por ejemplo /es/decide), y la comparación y el plan se escriben en el idioma que usas."
    ),
  },
]
