import type { Locale } from "@/lib/i18n/types"

type L = Record<Locale, string>

const t = (en: string, zh: string, ko: string, es: string): L => ({ en, zh, ko, es })

export type HomeLink = {
  id: string
  href: string
  label: L
}

export const homeCopy = {
  headline: t(
    "Don’t just search for a trip. Make a better travel decision.",
    "不只是搜索旅行信息，而是帮助你做出更好的旅行决定。",
    "여행 검색에서 멈추지 마세요. 더 나은 여행 결정을 하세요.",
    "No te quedes en la búsqueda. Toma una mejor decisión de viaje."
  ),
  headlineLead: t(
    "Don’t just search for a trip.",
    "不只是搜索旅行信息，",
    "여행 검색에서 멈추지 마세요.",
    "No te quedes en la búsqueda."
  ),
  headlineAccent: t(
    "Make a better travel decision.",
    "而是帮助你做出更好的旅行决定。",
    "더 나은 여행 결정을 하세요.",
    "Toma una mejor decisión de viaje."
  ),
  heroTagline1: t("Real places.", "真实的地方。", "진짜 장소.", "Lugares reales."),
  heroTagline2: t("Smarter decisions.", "更聪明的决定。", "더 현명한 결정.", "Decisiones más inteligentes."),
  heroTagline3: t("Better trips.", "更好的旅程。", "더 나은 여행.", "Mejores viajes."),
  heroPlace: t("Hong Kong", "香港", "홍콩", "Hong Kong"),
  heroPlaceDetail: t("Victoria Harbour", "维多利亚港", "빅토리아 하버", "Victoria Harbour"),
  heroPlaceTokyo: t("Tokyo", "东京", "도쿄", "Tokio"),
  heroPlaceTokyoDetail: t("Tokyo Bay · Fuji", "东京湾 · 富士山", "도쿄만 · 후지산", "Bahía de Tokio · Fuji"),
  heroPlaceSeoul: t("Seoul", "首尔", "서울", "Seúl"),
  heroPlaceSeoulDetail: t("Han River · Namsan", "汉江 · 南山", "한강 · 남산", "Río Han · Namsan"),
  heroPlaceCabo: t("Los Cabos", "洛斯卡沃斯", "로스카보스", "Los Cabos"),
  heroPlaceCaboDetail: t("El Arco", "拱门岩", "엘 아르코", "El Arco"),
  support: t(
    "Tell us where you're going, who you're traveling with, what matters to you, and what you want to avoid. XingAI Travel helps you compare your options, understand the trade-offs, and decide what fits you best.",
    "告诉我们你要去哪、和谁一起、在意什么、想避开什么。XingAI Travel 帮你比较选项、看清取舍，再决定哪一个更适合你。",
    "어디를 가는지, 누구와 함께인지, 무엇을 중시하는지, 무엇을 피하고 싶은지 알려 주세요. XingAI Travel이 선택지를 비교하고 트레이드오프를 보여 준 뒤, 당신에게 맞는 쪽을 고르게 합니다.",
    "Cuéntanos a dónde vas, con quién viajas, qué te importa y qué quieres evitar. XingAI Travel compara opciones, muestra las concesiones y te ayuda a elegir lo que encaja contigo."
  ),
  primaryCta: t("Make My Travel Decision", "做我的旅行决定", "여행 결정하기", "Tomar mi decisión de viaje"),
  secondaryCta: t("Explore Travel Ideas", "看看旅行想法", "여행 아이디어 보기", "Explorar ideas de viaje"),
  heroAlt: t(
    "A traveler looks across Victoria Harbour and the Hong Kong skyline at sunset",
    "一位旅行者望向黄昏中的维多利亚港和香港天际线",
    "여행자가 해 질 녘 빅토리아 하버와 홍콩 스카이라인을 바라본다",
    "Una viajera mira Victoria Harbour y el horizonte de Hong Kong al atardecer"
  ),
  heroHarbourAlt: t(
    "Victoria Harbour and the Hong Kong skyline at sunset",
    "黄昏中的维多利亚港和香港天际线",
    "해 질 녘 빅토리아 하버와 홍콩 스카이라인",
    "Victoria Harbour y el horizonte de Hong Kong al atardecer"
  ),
  heroTokyoAlt: t(
    "Tokyo at sunset with cherry blossoms, Tokyo Tower, and Mount Fuji",
    "黄昏中的东京：樱花、东京塔与富士山",
    "해 질 녘 도쿄: 벚꽃, 도쿄 타워, 후지산",
    "Tokio al atardecer con cerezos, Tokyo Tower y el monte Fuji"
  ),
  heroSeoulAlt: t(
    "Seoul at sunset with cherry blossoms, the Han River, and Namsan Tower",
    "黄昏中的首尔：樱花、汉江与南山塔",
    "해 질 녘 서울: 벚꽃, 한강, 남산타워",
    "Seúl al atardecer con cerezos, el río Han y la torre de Namsan"
  ),
  heroLosCabosAlt: t(
    "Los Cabos, Mexico — El Arco and the bay at sunset",
    "墨西哥洛斯卡沃斯：日落中的石拱与海湾",
    "멕시코 로스카보스 — 해 질 녘 엘 아르코와 만",
    "Los Cabos, México: El Arco y la bahía al atardecer"
  ),
  control: t(
    "We help you make a better-informed decision. You stay in control.",
    "我们帮你把决定做清楚。最后选什么，还是你说了算。",
    "더 잘 알고 결정하도록 돕습니다. 최종 선택은 당신의 몫입니다.",
    "Te ayudamos a decidir con mejor información. Tú sigues al mando."
  ),
  heroChipCompare: t("Compare first", "先比较", "먼저 비교", "Compara primero"),
  heroChipTradeoffs: t("Clear trade-offs", "清晰取舍", "명확한 트레이드오프", "Trade-offs claros"),
  heroChipYouDecide: t("You decide", "你来定", "당신이 결정", "Tú decides"),
  demoLabel: t("How a decision looks", "一次决定长这样", "결정은 이렇게 보입니다", "Así se ve una decisión"),
  demoTell: t("Tell us", "告诉我们", "말하기", "Cuéntanos"),
  demoTellHint: t("Dates, budget, style", "日期、预算、风格", "날짜·예산·스타일", "Fechas, presupuesto, estilo"),
  demoCompare: t("Compare", "比较", "비교", "Comparar"),
  demoCompareHint: t("Trade-offs, not a wall of options", "看取舍，不是选项墙", "옵션 벽이 아니라 트레이드오프", "Trade-offs, no un muro de opciones"),
  demoWinner: t("Winner", "首选", "추천", "Ganador"),
  demoWinnerHint: t("One fit — you still decide", "一个更合适的——最终你定", "맞는 하나 — 결정은 당신", "Una opción — tú decides"),
  introTitle: t(
    "Travel planning is full of choices. We help you make them.",
    "旅行计划里全是选择。我们帮你做这些选择。",
    "여행 계획은 선택으로 가득합니다. 그 선택을 돕습니다.",
    "Planear un viaje está lleno de elecciones. Te ayudamos a hacerlas."
  ),
  introLead: t(
    "Choosing a destination is only the beginning.",
    "选目的地只是开头。",
    "목적지를 고르는 것은 시작일 뿐입니다.",
    "Elegir el destino es solo el principio."
  ),
  introClose: t(
    "XingAI Travel turns those questions into a personalized decision.",
    "XingAI Travel 把这些问题收成一个适合你的决定。",
    "XingAI Travel은 그 질문들을 당신에게 맞는 결정으로 바꿉니다.",
    "XingAI Travel convierte esas preguntas en una decisión personal."
  ),
  introCta: t("Start with my trip", "从我的旅行开始", "내 여행부터 시작", "Empezar con mi viaje"),
  diffTitle: t(
    "Other travel sites help you search. We help you decide.",
    "别的旅行网站帮你搜索。我们帮你做决定。",
    "다른 여행 사이트는 검색을 돕습니다. 우리는 결정을 돕습니다.",
    "Otros sitios de viaje te ayudan a buscar. Nosotros te ayudamos a decidir."
  ),
  searchLabel: t("Traditional travel sites", "常见旅行网站", "일반적인 여행 사이트", "Sitios de viaje habituales"),
  decideLabel: t("XingAI Travel", "XingAI Travel", "XingAI Travel", "XingAI Travel"),
  howTitle: t("How XingAI Travel works", "XingAI Travel 怎么用", "XingAI Travel은 이렇게 씁니다", "Cómo funciona XingAI Travel"),
  howCta: t("Start My Travel Decision", "开始我的旅行决定", "여행 결정 시작하기", "Empezar mi decisión de viaje"),
  questionsTitle: t("Real questions, real travel decisions", "真实的问题，真实的旅行决定", "실제 질문, 실제 여행 결정", "Preguntas reales, decisiones reales"),
  questionsMore: t("Explore more questions", "看更多问题", "질문 더 보기", "Ver más preguntas"),
  questionsNote: t(
    "Written pages open that page. A question without a page opens the decision form. Nothing here is a dead link.",
    "有文章的问题会打开那一页。还没有文章的问题会打开决策表单。这里没有空链接。",
    "글이 있는 질문은 그 페이지로 갑니다. 글이 없는 질문은 결정 양식으로 갑니다. 빈 링크는 없습니다.",
    "Si hay una página escrita, se abre. Si no, se abre el formulario de decisión. Aquí no hay enlaces rotos."
  ),
  featuresLabel: t("What you can do here", "在这里能做什么", "여기서 할 수 있는 일", "Qué puedes hacer aquí"),
  placesTitle: t("Popular destinations", "热门目的地", "인기 여행지", "Destinos populares"),
  placesNote: t(
    "Hong Kong, Tokyo, Seoul, Taipei, and Los Cabos have live city guides. See all ten on the Cities page — more coming.",
    "香港、东京、首尔、台北、洛斯卡沃斯已有城市指南。十座城市总目录在 Cities 页，还会继续加。",
    "홍콩·도쿄·서울·타이베이·로스카보스 가이드가 열려 있습니다. 열 개 도시 목록은 Cities 페이지에서 — 계속 늘어납니다.",
    "Hong Kong, Tokio, Seúl, Taipéi y Los Cabos ya tienen guía. Las diez ciudades están en Cities — y habrá más."
  ),
  placesAllCta: t("All city guides", "全部城市指南", "모든 도시 가이드", "Todas las guías de ciudad"),
  soon: t("Coming soon", "即将推出", "곧 제공", "Próximamente"),
  hkTitle: t("Start with Hong Kong", "先从香港看起", "홍콩부터 보기", "Empieza por Hong Kong"),
  hkBody: t(
    "Hong Kong is the first city with a written guide: neighborhoods, places, and reference routes. It does not book a hotel for you.",
    "香港是第一座有写成指南的城市：街区、地点、参考路线。它不会替你订酒店。",
    "홍콩은 글로 된 가이드가 있는 첫 도시입니다. 동네, 장소, 참고 코스가 있습니다. 호텔을 대신 예약하지는 않습니다.",
    "Hong Kong es la primera ciudad con una guía escrita: barrios, lugares y rutas de referencia. No reserva un hotel por ti."
  ),
  hkPrimaryCta: t("Open Hong Kong city guide", "打开香港城市指南", "홍콩 도시 가이드 열기", "Abrir guía de Hong Kong"),
  whyTitle: t("Why XingAI Travel?", "为什么用 XingAI Travel？", "왜 XingAI Travel인가요?", "¿Por qué XingAI Travel?"),
  whyEyebrow: t("Why XingAI Travel?", "为什么用 XingAI Travel？", "왜 XingAI Travel인가요?", "¿Por qué XingAI Travel?"),
  whyHeadlineLead: t("Other travel sites help you search.", "别的旅行网站帮你搜索。", "다른 여행 사이트는 검색을 돕습니다.", "Otros sitios de viaje te ayudan a buscar."),
  whyHeadlineAccent: t("We help you decide.", "我们帮你做决定。", "우리는 결정을 돕습니다.", "Nosotros te ayudamos a decidir."),
  whyBody: t(
    "We combine AI, real travel notes, and trusted sources to help you make a better-informed decision — so you spend less time researching and more time on the trip. You stay in control.",
    "我们把 AI、真实旅行笔记和可靠来源合在一起，帮你把决定做清楚，少花时间查，多花时间在路上。最后选什么，还是你说了算。",
    "AI, 실제 여행 메모, 믿을 수 있는 자료를 모아 더 잘 알고 결정하도록 돕습니다. 조사에 덜 쓰고, 여행에 더 쓰게. 최종 선택은 당신의 몫입니다.",
    "Combinamos IA, notas reales de viaje y fuentes fiables para decidir con mejor información: menos tiempo investigando, más tiempo en el viaje. Tú sigues al mando."
  ),
  whyPhotoAlt: t(
    "A traveler looks out over a city from a rocky overlook",
    "一位旅行者从岩石高处看向城市",
    "여행자가 바위 언덕에서 도시를 바라본다",
    "Una viajera mira una ciudad desde un mirador rocoso"
  ),
  faqTitle: t("Questions about XingAI Travel", "关于 XingAI Travel", "XingAI Travel에 대한 질문", "Preguntas sobre XingAI Travel"),
  finalTitle: t("Ready to make your travel decision?", "准备好做旅行决定了吗？", "여행 결정을 할 준비가 되었나요?", "¿Listo para tomar tu decisión de viaje?"),
  finalBody: t(
    "Tell us about your trip and we'll help you work through the choices.",
    "说说这次旅行，我们帮你把选项过一遍。",
    "여행에 대해 알려 주시면, 선택지를 함께 정리합니다.",
    "Cuéntanos tu viaje y te ayudamos a recorrer las opciones."
  ),
}

export const introQuestions: L[] = [
  t("Where should you stay?", "住哪？", "어디에 묵을까?", "¿Dónde te quedas?"),
  t("What should you do?", "做什么？", "무엇을 할까?", "¿Qué haces?"),
  t("What fits your budget?", "预算够不够？", "예산에 맞을까?", "¿Cabe en el presupuesto?"),
  t("What works for your family?", "适不适合家人？", "가족에게 맞을까?", "¿Funciona para tu familia?"),
  t("What should you skip?", "哪些可以跳过？", "무엇을 건너뛸까?", "¿Qué puedes saltarte?"),
]

export const searchSteps: L[] = [
  t("Search", "搜索", "검색", "Buscar"),
  t("Browse", "浏览", "둘러보기", "Mirar"),
  t("Compare", "自己比较", "직접 비교", "Comparar"),
  t("Read", "再读", "더 읽기", "Leer"),
  t("Choose for yourself", "自己做决定", "스스로 고르기", "Elegir por tu cuenta"),
]

export const decideSteps: L[] = [
  t("Tell us what matters", "告诉我们什么重要", "중요한 것을 말하기", "Decirnos qué importa"),
  t("Understand your options", "看清选项", "선택지 이해하기", "Entender las opciones"),
  t("See the trade-offs", "看见取舍", "트레이드오프 보기", "Ver las concesiones"),
  t("Get a recommendation", "拿到一个建议", "추천 받기", "Recibir una recomendación"),
  t("Make your decision", "你来做决定", "직접 결정하기", "Tomar tu decisión"),
]

export const howSteps: { title: L; body: L }[] = [
  {
    title: t("Tell us about your trip", "说说这次旅行", "여행에 대해 말하기", "Cuéntanos tu viaje"),
    body: t(
      "Where are you going? Who are you traveling with? What do you like? What do you want to avoid?",
      "要去哪？和谁一起？喜欢什么？想避开什么？",
      "어디에 가나요? 누구와 함께인가요? 무엇을 좋아하나요? 무엇을 피하고 싶나요?",
      "¿A dónde vas? ¿Con quién viajas? ¿Qué te gusta? ¿Qué quieres evitar?"
    ),
  },
  {
    title: t("We help you compare", "我们帮你比较", "비교를 돕습니다", "Te ayudamos a comparar"),
    body: t(
      "You get the best-fit options with clear explanations, trade-offs, and practical notes.",
      "你会看到更合适的选项，以及说明、取舍和实际注意点。",
      "더 맞는 선택지와 설명, 트레이드오프, 현실적인 메모를 봅니다.",
      "Ves las opciones que mejor encajan, con explicaciones claras, concesiones y notas prácticas."
    ),
  },
  {
    title: t("Make your decision", "做出你的决定", "결정하기", "Toma tu decisión"),
    body: t(
      "Get a personalized plan with stay and activity direction, then open partner search pages. You still book.",
      "拿到一个适合你的计划，包括住和玩的方向，再打开合作方搜索页。订什么仍由你决定。",
      "맞춤 계획과 숙소·활동 방향을 받고, 파트너 검색 페이지를 엽니다. 예약은 여전히 당신이 합니다.",
      "Recibe un plan personal con dirección de alojamiento y actividades, y abre páginas de búsqueda de socios. Tú sigues reservando."
    ),
  },
]

export const whyPoints: { title: L; body: L }[] = [
  {
    title: t("Personalized", "针对你这次", "이번 여행에 맞춤", "Personal"),
    body: t(
      "Your trip is not the same as everyone else's.",
      "你的旅行和别人的不一样。",
      "당신의 여행은 다른 사람의 여행과 다릅니다.",
      "Tu viaje no es el de todo el mundo."
    ),
  },
  {
    title: t("Decision-focused", "先做决定", "결정에 집중", "Centrado en la decisión"),
    body: t(
      "We help narrow choices instead of overwhelming you with them.",
      "我们帮你把选择收窄，而不是再堆更多。",
      "선택지를 더 쌓지 않고, 좁히도록 돕습니다.",
      "Ayudamos a reducir opciones, no a abrumarte con más."
    ),
  },
  {
    title: t("Explainable", "说得清为什么", "이유를 보여 줌", "Explicable"),
    body: t(
      "We show why an option may fit your needs.",
      "我们说明为什么某个选项可能适合你。",
      "어떤 선택이 왜 맞을 수 있는지 보여 줍니다.",
      "Mostramos por qué una opción puede encajar contigo."
    ),
  },
  {
    title: t("Practical", "为了做完决定", "결정을 끝내기 위해", "Práctico"),
    body: t(
      "The goal is not endless research. The goal is a better decision.",
      "目标不是没完没了地查。目标是一个更好的决定。",
      "끝없는 조사가 목표가 아닙니다. 더 나은 결정이 목표입니다.",
      "El objetivo no es investigar sin fin. El objetivo es una mejor decisión."
    ),
  },
]

/** Only routes that exist. Personal questions without a page go to /decide. */
export const homeQuestions: HomeLink[] = [
  { id: "hk-first", href: "/city/hong-kong", label: t("Where should I stay in Hong Kong for my first trip?", "第一次去香港，住哪一带更合适？", "홍콩 첫 여행, 어디에 묵는 게 맞을까?", "¿Dónde me quedo en Hong Kong en mi primer viaje?") },
  { id: "hk-3-days", href: "/decide", label: t("I only have 3 days in Hong Kong. What should I do?", "香港只有 3 天。我该做什么？", "홍콩에 3일밖에 없습니다. 무엇을 할까요?", "Solo tengo 3 días en Hong Kong. ¿Qué hago?") },
  { id: "hk-sides", href: "/city/hong-kong", label: t("Should I stay on Hong Kong Island or Kowloon?", "住港岛还是九龙？", "홍콩섬과 구룡 중 어디에 묵을까?", "¿Me quedo en la isla de Hong Kong o en Kowloon?") },
  { id: "hk-teens", href: "/decide", label: t("I'm traveling with teenagers. Where should we stay?", "和青少年一起旅行，住哪更合适？", "십대와 함께 여행합니다. 어디에 묵을까?", "Viajo con adolescentes. ¿Dónde nos quedamos?") },
  { id: "hk-food", href: "/city/hong-kong", label: t("I love food but don't want to walk all day. Which neighborhood fits me?", "想吃好的，但不想走一整天。哪个街区更适合？", "맛집은 원하지만 하루 종일 걷기는 싫습니다. 어떤 동네가 맞을까?", "Me gusta comer, pero no caminar todo el día. ¿Qué barrio encaja?") },
  { id: "hk-rain", href: "/decide", label: t("What should I do in Hong Kong on a rainy day?", "香港下雨天可以做什么？", "홍콩에서 비 오는 날 무엇을 할까?", "¿Qué hago en Hong Kong si llueve?") },
  { id: "hk-tokyo", href: "/compare/hong-kong-vs-tokyo", label: t("Hong Kong or Tokyo — which is better for my trip?", "香港还是东京，哪一个更适合我这次？", "홍콩과 도쿄, 이번 여행에는 어디가 나을까?", "Hong Kong o Tokio: ¿cuál encaja mejor con mi viaje?") },
  { id: "pace", href: "/decide", label: t("Should I spend more time sightseeing or exploring local neighborhoods?", "时间更多花在景点，还是当地街区？", "명소와 동네 산책 중 어디에 시간을 더 쓸까?", "¿Dedico más tiempo a ver sitios o a recorrer barrios?") },
  { id: "skip", href: "/city/hong-kong", label: t("What is worth doing in Hong Kong, and what can I skip?", "香港哪些值得做，哪些可以跳过？", "홍콩에서 할 만한 것과 건너뛸 것은?", "¿Qué vale la pena en Hong Kong y qué puedo saltarme?") },
]

export const homeFeatures: { title: L; body: L }[] = [
  {
    title: t("Personalized recommendations", "按你的情况来建议", "상황에 맞춘 제안", "Recomendaciones personales"),
    body: t(
      "Based on your travel style, budget, and interests.",
      "依据旅行风格、预算和兴趣。",
      "여행 스타일, 예산, 관심사에 맞춥니다.",
      "Según tu estilo de viaje, presupuesto e intereses."
    ),
  },
  {
    title: t("Compare your options", "比较你的选项", "선택지 비교", "Compara tus opciones"),
    body: t(
      "See the trade-offs, so you can choose.",
      "看见取舍，再由你来选。",
      "트레이드오프를 보고 직접 고릅니다.",
      "Ves las concesiones y eliges tú."
    ),
  },
  {
    title: t("A day-by-day plan", "一天一天的计划", "하루 단위 계획", "Un plan día por día"),
    body: t(
      "After the decision, a plan for where to stay and what to do. Not a reservation.",
      "决定之后，给出住哪、做什么的方向。不是已经订好的订单。",
      "결정 뒤에 어디서 묵고 무엇을 할지 정리합니다. 예약은 아닙니다.",
      "Después de decidir, un plan de dónde quedarte y qué hacer. No es una reserva."
    ),
  },
  {
    title: t("Search, then book", "再去搜索预订", "검색한 뒤 예약", "Buscar y luego reservar"),
    body: t(
      "Opens partner sites for stays and activities. You check the price and book there.",
      "打开合作方网站查找住宿和活动。价格和预订在他们的网站上完成。",
      "숙소와 액티비티는 파트너 사이트로 엽니다. 가격 확인과 예약은 그 사이트에서 합니다.",
      "Abre sitios de socios para alojamiento y actividades. Tú compruebas el precio y reservas allí."
    ),
  },
]

export const homePlaces: (HomeLink & { detail: L; image?: string; soon?: boolean })[] = [
  {
    id: "hong-kong",
    href: "/city/hong-kong",
    image: "/assets/dest-hong-kong-v2.webp",
    label: t("Hong Kong", "香港", "홍콩", "Hong Kong"),
    detail: t("Food, culture, city and nature", "美食、城市与自然", "음식, 도시, 자연", "Comida, ciudad y naturaleza"),
  },
  {
    id: "tokyo",
    href: "/city/tokyo",
    image: "/assets/dest-tokyo-v2.webp",
    label: t("Tokyo", "东京", "도쿄", "Tokio"),
    detail: t("Modern city, rich tradition", "现代城市，传统也在", "현대 도시, 깊은 전통", "Ciudad moderna, tradición rica"),
  },
  {
    id: "seoul",
    href: "/city/seoul",
    image: "/assets/dest-seoul-v2.webp",
    label: t("Seoul", "首尔", "서울", "Seúl"),
    detail: t("Food, neighborhoods, and shopping", "美食、街区和购物", "음식, 동네, 쇼핑", "Comida, barrios y compras"),
  },
  {
    id: "taipei",
    href: "/city/taipei",
    image: "/assets/destination-taipei-card.webp",
    label: t("Taipei", "台北", "타이베이", "Taipei"),
    detail: t("Night markets, temples, and hills", "夜市、庙宇与山城", "야시장, 사원, 언덕", "Mercados nocturnos, templos y colinas"),
  },
  {
    id: "los-cabos",
    href: "/city/los-cabos",
    image: "/assets/dest-los-cabos-v2.webp",
    label: t("Los Cabos", "洛斯卡沃斯", "로스카보스", "Los Cabos"),
    detail: t("Beaches, rest, and the coast", "海滩、休息和海岸", "해변, 휴식, 해안", "Playas, descanso y costa"),
  },
]

export const hongKongEntries: HomeLink[] = [
  { id: "hk-guide", href: "/city/hong-kong", label: t("Hong Kong city guide", "香港城市指南", "홍콩 도시 가이드", "Guía de Hong Kong") },
  { id: "hk-vs-tokyo", href: "/compare/hong-kong-vs-tokyo", label: t("Hong Kong vs Tokyo", "香港对比东京", "홍콩 대 도쿄", "Hong Kong frente a Tokio") },
  { id: "hk-vs-sg", href: "/compare/hong-kong-vs-singapore", label: t("Hong Kong vs Singapore", "香港对比新加坡", "홍콩 대 싱가포르", "Hong Kong frente a Singapur") },
  { id: "hk-stories", href: "/stories/hong-kong", label: t("Hong Kong stories", "香港故事", "홍콩 이야기", "Historias de Hong Kong") },
]

export const homeFaq: { q: L; a: L }[] = [
  {
    q: t("What is XingAI Travel?", "XingAI Travel 是什么？", "XingAI Travel은 무엇인가요?", "¿Qué es XingAI Travel?"),
    a: t(
      "XingAI Travel is a travel decision experience. It helps you understand your options and make a better-informed decision. It does not book the trip for you.",
      "XingAI Travel 是一个旅行决策体验。它帮你看清选项，做出更清楚的决定。它不会替你把行程订掉。",
      "XingAI Travel은 여행 결정 경험입니다. 선택지를 이해하고 더 잘 알고 결정하도록 돕습니다. 여행을 대신 예약하지는 않습니다.",
      "XingAI Travel es una experiencia de decisión de viaje. Te ayuda a entender las opciones y a decidir con mejor información. No reserva el viaje por ti."
    ),
  },
  {
    q: t("How is XingAI Travel different from Google?", "它和 Google 有什么不同？", "Google과 어떻게 다른가요?", "¿En qué se diferencia de Google?"),
    a: t(
      "Google helps you find information. XingAI Travel is built to turn that kind of information into a decision for your trip.",
      "Google 帮你找到信息。XingAI Travel 用来把这类信息收成你这次旅行的一个决定。",
      "Google은 정보를 찾게 합니다. XingAI Travel은 그 정보를 이번 여행의 결정으로 바꾸도록 만들어졌습니다.",
      "Google te ayuda a encontrar información. XingAI Travel está hecho para convertir ese tipo de información en una decisión para tu viaje."
    ),
  },
  {
    q: t("How is it different from traditional travel websites?", "它和常见旅行网站有什么不同？", "일반 여행 사이트와 어떻게 다른가요?", "¿En qué se diferencia de los sitios de viaje habituales?"),
    a: t(
      "Traditional travel sites often give you many choices. XingAI Travel focuses on which choices fit your situation, and why.",
      "常见旅行网站常常给你很多选择。XingAI Travel 关注哪些选择适合你的情况，以及为什么。",
      "일반 여행 사이트는 선택지를 많이 줍니다. XingAI Travel은 당신의 상황에 무엇이 맞는지, 그리고 왜 맞는지에 집중합니다.",
      "Los sitios habituales suelen darte muchas opciones. XingAI Travel se centra en cuáles encajan con tu situación, y por qué."
    ),
  },
  {
    q: t("Can I use XingAI Travel for a family trip?", "可以用来做家庭旅行的决定吗？", "가족 여행에도 쓸 수 있나요?", "¿Puedo usarlo para un viaje en familia?"),
    a: t(
      "Yes. Your trip context can include who is traveling, interests, budget, and practical limits.",
      "可以。旅行背景可以包括和谁一起、兴趣、预算和实际限制。",
      "네. 여행 맥락에 동행, 관심사, 예산, 현실적인 제한을 넣을 수 있습니다.",
      "Sí. El contexto puede incluir con quién viajas, intereses, presupuesto y límites prácticos."
    ),
  },
  {
    q: t("Does XingAI make the decision for me?", "XingAI 会替我做决定吗？", "XingAI가 대신 결정하나요?", "¿XingAI decide por mí?"),
    a: t(
      "No. XingAI Travel helps you evaluate options and make a better-informed decision. You remain in control.",
      "不会。XingAI Travel 帮你评估选项，做出更清楚的决定。决定权在你。",
      "아닙니다. XingAI Travel은 선택지를 평가하고 더 잘 알고 결정하도록 돕습니다. 결정권은 당신에게 있습니다.",
      "No. XingAI Travel te ayuda a evaluar opciones y a decidir con mejor información. Tú sigues al mando."
    ),
  },
  {
    q: t("Can I use it for a specific city?", "可以针对一座城市用吗？", "특정 도시에도 쓸 수 있나요?", "¿Puedo usarlo para una ciudad concreta?"),
    a: t(
      "Yes, where a city guide or a comparison exists. Hong Kong has a city guide. Other cities may appear only inside a comparison.",
      "可以，在已有城市指南或比较的地方。香港有城市指南。其他城市可能只出现在比较里。",
      "도시 가이드나 비교가 있는 곳에서 가능합니다. 홍콩에는 도시 가이드가 있습니다. 다른 도시는 비교 안에만 나올 수 있습니다.",
      "Sí, donde exista una guía o una comparación. Hong Kong tiene guía de ciudad. Otras ciudades pueden aparecer solo dentro de una comparación."
    ),
  },
]

const site = "https://travel.xingai.app"

export const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${site}/#webpage`,
      url: `${site}/`,
      name: "XingAI Travel — Make a better travel decision",
      description:
        "XingAI Travel helps you compare trip options and trade-offs so you can decide. Other travel sites help you search. You stay in control.",
      isPartOf: { "@id": `${site}/#website` },
      about: { "@id": `${site}/#app` },
      inLanguage: "en",
      primaryImageOfPage: `${site}/assets/home-hero-hong-kong.webp`,
    },
    {
      "@type": "FAQPage",
      "@id": `${site}/#home-faq`,
      isPartOf: { "@id": `${site}/#webpage` },
      mainEntity: homeFaq.map((item) => ({
        "@type": "Question",
        name: item.q.en,
        acceptedAnswer: { "@type": "Answer", text: item.a.en },
      })),
    },
  ],
}

export const homeJsonLdHtml = JSON.stringify(homeJsonLd).replace(/</g, "\\u003c")
