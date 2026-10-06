import type { Localized } from "@/lib/content/types"
import { pickLocalized } from "@/lib/content/types"
import type { Locale } from "@/lib/i18n/types"
import type { PublicLocale } from "@/lib/public-locale"

type MetaCopy = { title: Localized; description: Localized; absoluteTitle?: boolean }

/** Static indexable routes — title/description follow URL locale. */
export const STATIC_PAGE_COPY: Record<string, MetaCopy> = {
  "/": {
    absoluteTitle: true,
    title: {
      en: "XingAI Travel — Make a better travel decision",
      zh: "XingAI Travel — 做出更好的旅行决策",
      ko: "XingAI Travel — 더 나은 여행 결정을 내리세요",
      es: "XingAI Travel — Toma una mejor decisión de viaje",
    },
    description: {
      en: "Compare trip options and trade-offs so you can decide. Other sites help you search. You stay in control. Suggestions only — verify before you book.",
      zh: "先比较目的地与取舍再决定。别的网站帮你搜，这里帮你定。建议仅供参考，预订前请自行核实。",
      ko: "목적지를 비교하고 得失을 본 뒤 결정하세요. 다른 사이트는 검색을 돕고, 여기는 결정을 돕습니다. 제안일 뿐 — 예약 전 확인하세요.",
      es: "Compara opciones y contrapartidas para decidir. Otros sitios te ayudan a buscar. Tú mantienes el control. Solo sugerencias — verifica antes de reservar.",
    },
  },
  "/decide": {
    absoluteTitle: true,
    title: {
      en: "Decide your trip · XingAI Travel",
      zh: "决定你的行程 · XingAI Travel",
      ko: "여행을 결정하세요 · XingAI Travel",
      es: "Decide tu viaje · XingAI Travel",
    },
    description: {
      en: "Describe your real constraints, compare destinations with honest trade-offs, then open partner search links to book the key pieces.",
      zh: "写下真实约束，诚实比较目的地与取舍，再打开合作方搜索链接预订关键环节。",
      ko: "실제 제약을 적고, 목적지를 솔직히 비교한 뒤, 파트너 검색 링크로 핵심을 예약하세요.",
      es: "Describe tus restricciones reales, compara destinos con contrapartidas honestas y abre enlaces de socios para reservar lo esencial.",
    },
  },
  "/how-it-works": {
    title: {
      en: "How XingAI Travel chooses your destination",
      zh: "XingAI Travel 如何选定目的地",
      ko: "XingAI Travel이 목적지를 고르는 방법",
      es: "Cómo XingAI Travel elige tu destino",
    },
    description: {
      en: "How the Travel Decision System works: constraints, comparison, one winner, two alternatives, trade-offs, evidence, then booking links.",
      zh: "旅行决策系统怎么工作：约束 → 比较 → 一个赢家 → 两个备选 → 取舍与证据 → 再给预订链接。",
      ko: "여행 결정 시스템: 제약 → 비교 → 한 승자 → 두 대안 → 得失과 근거 → 예약 링크.",
      es: "Cómo funciona el sistema: restricciones, comparación, un ganador, dos alternativas, contrapartidas, evidencia y luego enlaces de reserva.",
    },
  },
  "/faq": {
    title: {
      en: "FAQ — Travel Decision System",
      zh: "常见问题 — 旅行决策系统",
      ko: "FAQ — 여행 결정 시스템",
      es: "FAQ — Sistema de decisión de viaje",
    },
    description: {
      en: "Answers about XingAI Travel: how destinations are chosen, affiliate links, November travel, and verifying plans before booking.",
      zh: "关于 XingAI Travel：目的地如何选定、联盟链接、十一月出行，以及预订前如何核实计划。",
      ko: "XingAI Travel FAQ: 목적지 선정, 제휴 링크, 11월 여행, 예약 전 확인.",
      es: "Preguntas sobre XingAI Travel: cómo se eligen destinos, afiliados, viajes en noviembre y verificar antes de reservar.",
    },
  },
  "/stories": {
    title: {
      en: "Travel Stories",
      zh: "旅行故事",
      ko: "여행 이야기",
      es: "Historias de viaje",
    },
    description: {
      en: "First-hand Travel Stories from Hong Kong and Macau — honest takeaways from the publisher, then Decide whether the place fits your own trip. Not a user-submitted feed.",
      zh: "香港与澳门第一手旅行故事——出版者真实体会，再用 Decide 判断是否适合你的行程。不是用户投稿流。",
      ko: "홍콩·마카오 1인칭 여행 이야기 — 발행자의 솔직한 소감 후 Decide로 내 여행에 맞는지 판단. 사용자 투고 피드 아님.",
      es: "Historias de primera mano de Hong Kong y Macao — conclusiones honestas del editor; luego Decide si encaja en tu viaje. No es un feed de usuarios.",
    },
  },
  "/city": {
    title: {
      en: "City guides",
      zh: "城市指南",
      ko: "도시 가이드",
      es: "Guías de ciudad",
    },
    description: {
      en: "First-visit city guides with sourced places and three day routes: Hong Kong, Tokyo, Seoul, Taipei, Macau, Singapore, Los Cabos, Shanghai, Lisbon, Barcelona, Xi'an, New Orleans.",
      zh: "首次到访城市指南：有出处的地点与三条日间路线——香港、东京、首尔、台北、澳门、新加坡、洛斯卡沃斯、上海、里斯本、巴塞罗那、西安、新奥尔良。",
      ko: "첫 방문 도시 가이드: 출처 있는 장소와 하루 코스 3개 — 홍콩, 도쿄, 서울, 타이베이, 마카오, 싱가포르, 로스카보스, 상하이, 리스본, 바르셀로나, 시안, 뉴올리언스.",
      es: "Guías de primera visita con lugares citados y tres rutas: Hong Kong, Tokio, Seúl, Taipéi, Macao, Singapur, Los Cabos, Shanghái, Lisboa, Barcelona, Xi'an, Nueva Orleans.",
    },
  },
  "/compare": {
    title: {
      en: "Destination comparisons",
      zh: "目的地对比",
      ko: "목적지 비교",
      es: "Comparaciones de destinos",
    },
    description: {
      en: "Tokyo vs Seoul, Hong Kong vs Tokyo, Lisbon vs Barcelona, and more — decision-first comparisons with clear verdicts.",
      zh: "东京 vs 首尔、香港 vs 东京、里斯本 vs 巴塞罗那等——先给结论的决策型对比。",
      ko: "도쿄 vs 서울, 홍콩 vs 도쿄, 리스본 vs 바르셀로나 등 — 결론 중심 비교.",
      es: "Tokio vs Seúl, Hong Kong vs Tokio, Lisboa vs Barcelona y más — comparaciones con veredicto claro.",
    },
  },
  "/guides": {
    title: {
      en: "Travel decision guides",
      zh: "旅行决策指南",
      ko: "여행 결정 가이드",
      es: "Guías de decisión de viaje",
    },
    description: {
      en: "Where to travel in November, warm destinations, walkable cities, trips under $2,000, and food cities — then decide on XingAI Travel.",
      zh: "十一月去哪、温暖目的地、适合步行的城市、两千美元内行程、美食城市——再用 XingAI Travel 做决定。",
      ko: "11월 여행지, 따뜻한 곳, 걷기 좋은 도시, $2,000 이하, 미식 도시 — 그다음 XingAI Travel로 결정.",
      es: "Viajar en noviembre, destinos cálidos, ciudades caminables, viajes bajo $2,000 y ciudades gastronómicas — luego decide en XingAI Travel.",
    },
  },
  "/privacy": {
    title: {
      en: "Privacy Policy",
      zh: "隐私政策",
      ko: "개인정보 처리방침",
      es: "Política de privacidad",
    },
    description: {
      en: "What XingAI Travel collects and processes: trip inputs, OpenAI generation, IP rate limits, analytics, browser storage, and share links.",
      zh: "XingAI Travel 收集与处理的内容：行程输入、OpenAI 生成、IP 限流、分析、浏览器存储与分享链接。",
      ko: "XingAI Travel이 수집·처리하는 항목: 여행 입력, OpenAI 생성, IP 한도, 분석, 브라우저 저장, 공유 링크.",
      es: "Qué recopila XingAI Travel: entradas del viaje, generación con OpenAI, límites por IP, analítica, almacenamiento del navegador y enlaces para compartir.",
    },
  },
  "/terms": {
    title: {
      en: "Terms of Use",
      zh: "使用条款",
      ko: "이용 약관",
      es: "Términos de uso",
    },
    description: {
      en: "Terms of use for XingAI Travel — suggestions only; you stay responsible for booking and travel decisions.",
      zh: "XingAI Travel 使用条款——仅为建议；预订与出行决策由您自行负责。",
      ko: "XingAI Travel 이용 약관 — 제안일 뿐이며 예약·여행 결정은 사용자 책임입니다.",
      es: "Términos de uso de XingAI Travel — solo sugerencias; tú eres responsable de reservas y decisiones de viaje.",
    },
  },
  "/disclaimer": {
    title: {
      en: "Travel Disclaimer",
      zh: "旅行免责声明",
      ko: "여행 면책 고지",
      es: "Descargo de responsabilidad",
    },
    description: {
      en: "XingAI Travel provides suggestions and estimates, not professional advice. Verify prices, rules, and safety before you book.",
      zh: "XingAI Travel 提供建议与估算，不构成专业意见。预订前请核实价格、规定与安全信息。",
      ko: "XingAI Travel은 제안과 추정치를 제공하며 전문 자문이 아닙니다. 예약 전 가격·규정·안전을 확인하세요.",
      es: "XingAI Travel ofrece sugerencias y estimaciones, no asesoramiento profesional. Verifica precios, normas y seguridad antes de reservar.",
    },
  },
  "/affiliate-disclosure": {
    title: {
      en: "Affiliate Disclosure",
      zh: "联盟披露",
      ko: "제휴 고지",
      es: "Divulgación de afiliados",
    },
    description: {
      en: "How XingAI Travel may earn from partner search links after a decision — affiliates never influence destination ranking.",
      zh: "决策后的合作方搜索链接如何可能产生佣金——联盟从不影响目的地排名。",
      ko: "결정 후 파트너 검색 링크로 수수료가 발생할 수 있음 — 제휴는 목적지 순위에 영향 없음.",
      es: "Cómo XingAI Travel puede ganar con enlaces de socios tras la decisión — los afiliados nunca influyen en el ranking.",
    },
  },
}

export function staticPageMetaCopy(path: string, locale: Locale | PublicLocale) {
  const copy = STATIC_PAGE_COPY[path]
  if (!copy) return null
  return {
    title: pickLocalized(copy.title, locale as Locale),
    description: pickLocalized(copy.description, locale as Locale),
    absoluteTitle: copy.absoluteTitle,
  }
}

export function cityGuideMeta(cityName: string, places: number, routes: number, locale: Locale | PublicLocale) {
  const L = locale as Locale
  const title: Localized = {
    en: `First time in ${cityName}?`,
    zh: `第一次来${cityName}？`,
    ko: `${cityName}, 처음이신가요?`,
    es: `¿Primera vez en ${cityName}?`,
  }
  const description: Localized = {
    en: `${places} sourced places and ${routes} first-visit day routes for ${cityName} — with why, who it suits, and trade-offs.`,
    zh: `${cityName}：${places} 个有出处的地点与 ${routes} 条首次到访日间路线——含为何去、适合谁、取舍。`,
    ko: `${cityName}: 출처 있는 장소 ${places}곳, 첫 방문 하루 코스 ${routes}개 — 이유, 누구에게 맞는지, 得失 포함.`,
    es: `${places} lugares con fuentes y ${routes} rutas de un día para ${cityName} — por qué, a quién le encaja y contrapartidas.`,
  }
  return {
    title: pickLocalized(title, L),
    description: pickLocalized(description, L),
  }
}

/** Schema.org / Open Graph language tags for a public locale. */
export function schemaInLanguage(locale: Locale | PublicLocale): "en" | "zh-CN" | "ko" | "es" {
  if (locale === "zh") return "zh-CN"
  if (locale === "ko") return "ko"
  if (locale === "es") return "es"
  return "en"
}
