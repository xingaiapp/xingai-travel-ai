import type { ContentSection, FaqItem, Localized } from "@/lib/content/types"

const L = (en: string, zh: string, ko: string, es: string): Localized => ({ en, zh, ko, es })
const S = (heading: Localized, body: Localized): ContentSection => ({ heading, body })

export type CityDecisionBlock = {
  sections: ContentSection[]
  faq: FaqItem[]
  /** Optional story season slug for first-hand proof. */
  relatedStorySlug?: string
  /** Optional compare page when the reader is still choosing between two places. */
  relatedCompareSlug?: string
}

/**
 * Season / who-for / FAQ blocks for live city guides.
 * Stable facts only — no live prices or hours (ADR 0009).
 */
export const cityDecisionBlocks: Record<string, CityDecisionBlock> = {
  "los-cabos": {
    relatedStorySlug: "los-cabos",
    relatedCompareSlug: "new-orleans-vs-los-cabos",
    sections: [
      S(
        L("When to go", "什么时候去", "언제 갈까", "Cuándo ir"),
        L(
          "Los Cabos is warm and dry most of the year. Peak visitor months are typically winter and spring (roughly December–April), when many North American travelers escape cold weather. Summer is hotter; the eastern Pacific hurricane season runs mid-May through November, with the highest historical risk often August–October. Shoulder weeks can feel quieter than Christmas and spring-break peaks. Always check your travel dates against current forecasts before you fly — this page does not replace that check.",
          "洛斯卡沃斯一年大部分时间温暖干燥。游客高峰多在冬春（大约 12–4 月），北美旅客常来避寒。夏天更热；东太平洋飓风季大约从 5 月中到 11 月，历史风险较高的时段常在 8–10 月。肩季往往比圣诞和春假高峰更安静。出发前请自行核对日期与预报——本页不能替代那一步。",
          "로스카보스는 연중 대부분 따뜻하고 건조합니다. 방문 피크는 대개 겨울·봄(대략 12–4월)으로, 북미에서 추위를 피해 오는 경우가 많습니다. 여름은 더 덥고, 동태평양 허리케인 시즌은 대략 5월 중순~11월이며 역사적으로 8–10월 위험이 높은 편입니다. 어깨 시즌은 크리스마스·스프링브레이크보다 한산한 경우가 많습니다. 출발 전 날짜와 예보를 직접 확인하세요 — 이 페이지가 그 확인을 대신하지 않습니다.",
          "Los Cabos es cálido y seco la mayor parte del año. Los picos de visitantes suelen ser invierno y primavera (aprox. diciembre–abril). El verano es más caluroso; la temporada de huracanes del Pacífico oriental va de mediados de mayo a noviembre, con mayor riesgo histórico a menudo en agosto–octubre. Las semanas intermedias pueden sentirse más tranquilas. Revisa siempre tus fechas frente al pronóstico actual — esta página no sustituye esa comprobación.",
        ),
      ),
      S(
        L("With parents — what usually fits", "带父母——通常怎样更合适", "부모님과 — 보통 맞는 것", "Con padres — qué suele encajar"),
        L(
          "All-inclusive or Corridor resort pacing often fits older travelers better than a marina-party night every evening. Plan shade, water, and short taxi hops between Cabo San Lucas, the Corridor, and San José. Ocean swimming on the Pacific side can be rough — use hotel-marked swim areas or calmer Sea of Cortez spots. First-hand resort and shore moments: /stories/los-cabos.",
          "全包或走廊度假节奏，往往比每晚码头派对更适合年长旅客。预留遮阴、补水，以及圣卢卡斯、走廊与圣何塞之间的短途出租车。太平洋一侧海浪可能大——用酒店标安全的游泳区，或更平静的科尔特斯海一侧。第一手度假与海边片刻：/stories/los-cabos。",
          "올인클루시브나 코리도르 리조트 속도가 매일 마리나 파티보다 연세 든 여행자에게 맞는 경우가 많습니다. 그늘·물·카보산루카스–코리도르–산호세 사이 짧은 택시를 계획하세요. 태평양 쪽 수영은 거칠 수 있어 호텔이 표시한 구역이나 더 잔잔한 코르테스 해를 쓰세요. 현장 리조트·해안 순간: /stories/los-cabos.",
          "El ritmo all-inclusive o del Corredor suele encajar mejor con viajeros mayores que una noche de marina cada día. Planea sombra, agua y taxis cortos entre Cabo, el Corredor y San José. El Pacífico puede ser fuerte — usa zonas de baño marcadas o el Mar de Cortés más calmado. Momentos de primera mano: /stories/los-cabos.",
        ),
      ),
    ],
    faq: [
      {
        q: L(
          "Taking parents to Los Cabos — which season is best?",
          "带父母去 Cabo，什么季节最合适？",
          "부모님과 로스카보스, 어느 계절이 좋을까?",
          "¿Con padres a Los Cabos — qué temporada es mejor?",
        ),
        a: L(
          "For most families with older parents, late autumn through spring (about November–April) is the usual comfort window: warm days, less summer heat stress. Avoid peak holiday weeks if crowds tire them; confirm hurricane-season risk if your dates fall June–October. Read /stories/los-cabos for resort pacing, then run /decide with your origin and Avoid list.",
          "对多数带年长父母的家庭，深秋到春季（大约 11–4 月）是常见舒适窗口：白天暖，少一点盛夏热负荷。若他们怕挤，避开节假高峰；日期若在 6–10 月，核对飓风季风险。先看 /stories/los-cabos 的度假节奏，再用出发地和 Avoid 跑 /decide。",
          "연세 든 부모님과라면 대개 늦가을~봄(대략 11–4월)이 쾌적한 편입니다. 혼잡이 힘들면 연휴 피크를 피하고, 6–10월이면 허리케인 시즌을 확인하세요. /stories/los-cabos로 리조트 속도를 본 뒤, 출발지·Avoid로 /decide를 돌리세요.",
          "Para muchas familias con padres mayores, finales de otoño a primavera (aprox. noviembre–abril) es la ventana cómoda. Evita semanas festivas si las multitudes cansan; confirma huracanes si viajas junio–octubre. Lee /stories/los-cabos y luego /decide con origen y Avoid.",
        ),
      },
      {
        q: L(
          "Is Los Cabos only for beach resorts?",
          "洛斯卡沃斯只适合度假村海滩吗？",
          "로스카보스는 리조트 해변만인가?",
          "¿Los Cabos es solo resorts de playa?",
        ),
        a: L(
          "No. Cabo San Lucas has marina energy; San José del Cabo is quieter with art and plaza evenings; the Corridor is the resort spine. Pick one spine for a first visit — this guide’s routes help. Compare culture-city vs Baja coast on /compare/new-orleans-vs-los-cabos if you are still choosing the trip type.",
          "不是。圣卢卡斯有码头活力；圣何塞更安静，有艺术与广场夜晚；走廊是度假主轴。第一次来先选一条主线——本指南的路线会帮你。若还在选「文化城 vs 下加州海岸」，看 /compare/new-orleans-vs-los-cabos。",
          "아닙니다. 카보산루카스는 마리나 에너지, 산호세는 더 조용한 예술·광장 저녁, 코리도르는 리조트 축입니다. 첫 방문은 한 축을 고르세요. 여행 유형을 아직 고르는 중이면 /compare/new-orleans-vs-los-cabos.",
          "No. Cabo San Lucas tiene energía de marina; San José es más quieto con arte y plaza; el Corredor es el eje resort. Elige un eje en la primera visita. Si aún eliges tipo de viaje, mira /compare/new-orleans-vs-los-cabos.",
        ),
      },
    ],
  },

  "hong-kong": {
    relatedStorySlug: "hong-kong",
    relatedCompareSlug: "hong-kong-vs-macau",
    sections: [
      S(
        L("When to go", "什么时候去", "언제 갈까", "Cuándo ir"),
        L(
          "October–December is usually the most pleasant for long walking days. Summer is hot, humid, and stormy; winter evenings can need a jacket. Typhoon season peaks in late summer into early autumn — build flexibility into outdoor plans.",
          "十月到十二月通常最适合长时间步行。夏天湿热多风暴；冬天晚上可能要外套。台风季高峰在夏末到初秋——户外计划留弹性。",
          "10–12월이 긴 도보에 가장 쾌적한 편입니다. 여름은 덥고 습하며 폭풍이 잦고, 겨울 저녁은 겉옷이 필요할 수 있습니다. 태풍 시즌은 늦여름~초가을 — 야외 일정에 여유를 두세요.",
          "Octubre–diciembre suele ser lo más agradable para caminar. El verano es caluroso, húmedo y tormentoso; las noches de invierno pueden pedir chaqueta. Los tifones pican de finales de verano a principios de otoño — deja margen en planes al aire libre.",
        ),
      ),
      S(
        L("Who it fits", "适合谁", "누구에게 맞나", "Para quién"),
        L(
          "Strong for food-first city trips, harbor walks, and dense transit. Steep streets and humidity tire some groups — put that in Avoid if it matters. First-hand harbour and street stories: /stories/hong-kong. Still choosing vs Macau for a short trip? /compare/hong-kong-vs-macau.",
          "适合以吃为主的城市行、海港散步和密集公交。陡坡与潮湿会累到部分人——重要就写进 Avoid。第一手维港与街巷故事：/stories/hong-kong。短途还在港澳之间选？/compare/hong-kong-vs-macau。",
          "음식 중심 도시 여행, 항구 산책, 밀집 교통에 강합니다. 가파른 길·습도가 힘들면 Avoid에 적으세요. 현장 이야기: /stories/hong-kong. 짧은 일정으로 마카오와 고르는 중이면 /compare/hong-kong-vs-macau.",
          "Fuerte para viajes urbanos de comida, paseos al puerto y tránsito denso. Calles empinadas y humedad cansan a algunos — dilo en Avoid. Historias: /stories/hong-kong. ¿Eligiendo vs Macao en un viaje corto? /compare/hong-kong-vs-macau.",
        ),
      ),
    ],
    faq: [],
  },

  macau: {
    relatedStorySlug: "macau",
    relatedCompareSlug: "hong-kong-vs-macau",
    sections: [
      S(
        L("When to go", "什么时候去", "언제 갈까", "Cuándo ir"),
        L(
          "Macau’s climate tracks the Pearl River Delta: autumn is often the most comfortable walking season; summer is hot and humid. Cotai and the old town are both walkable in pieces — plan shade and shorter blocks in peak heat.",
          "澳门气候贴近珠三角：秋天往往最适合步行；夏天湿热。路氹与老城都可以分段走——酷暑时预留遮阴和更短的路段。",
          "마카오 기후는 주강 삼각주에 가깝습니다. 가을이 걷기 가장 편한 편이고 여름은 덥고 습합니다. 코타이와 구시가지는 나눠 걷기 — 한여름엔 그늘과 짧은 구간을 계획하세요.",
          "El clima de Macao sigue el delta del Río de las Perlas: el otoño suele ser lo más cómodo para caminar; el verano es caluroso y húmedo. Cotai y el casco viejo se caminan a trozos — planea sombra en el calor pico.",
        ),
      ),
      S(
        L("Who it fits", "适合谁", "누구에게 맞나", "Para quién"),
        L(
          "Fits travelers who want Cotai “Europe strip” spectacle plus old-town lanes in one compact map. Gambling floors are optional — food and plazas can fill the day. Stories: /stories/macau. Three days and still choosing vs Hong Kong? /compare/hong-kong-vs-macau.",
          "适合想在紧凑地图里同时看路氹「欧洲条」与老城巷弄的人。赌场可选——美食与广场也能填满一天。故事：/stories/macau。三天还在和香港之间选？/compare/hong-kong-vs-macau。",
          "콤팩트한 지도에서 코타이 ‘유럽 스트립’과 구시가지를 함께 보고 싶은 사람에게 맞습니다. 카지노는 선택 — 음식과 광장으로도 하루가 찹니다. 이야기: /stories/macau. 3일에 홍콩과 고르는 중이면 /compare/hong-kong-vs-macau.",
          "Encaja si quieres el espectáculo Cotai y el casco viejo en un mapa compacto. El juego es opcional — comida y plazas pueden llenar el día. Historias: /stories/macau. ¿Tres días y aún eliges vs Hong Kong? /compare/hong-kong-vs-macau.",
        ),
      ),
    ],
    faq: [],
  },

  tokyo: {
    relatedCompareSlug: "tokyo-vs-singapore",
    sections: [
      S(
        L("When to go", "什么时候去", "언제 갈까", "Cuándo ir"),
        L(
          "Spring and autumn are the most comfortable for long walking days. Summer is hot and humid with a rainy stretch; late summer into early autumn carries typhoon risk. Winters are cooler than Singapore but milder than Seoul.",
          "春秋最适合长时间步行。夏天湿热并有雨季；夏末到初秋有台风风险。冬天比新加坡凉，但比首尔温和。",
          "봄·가을이 긴 도보에 가장 쾌적합니다. 여름은 덥고 습하며 장마가 있고, 늦여름~초가을 태풍 위험이 있습니다. 겨울은 싱가포르보다 시원하고 서울보다 온화합니다.",
          "Primavera y otoño son lo más cómodo para caminar. El verano es caluroso y húmedo con lluvias; finales de verano a otoño temprano traen tifones. Los inviernos son más frescos que Singapur y más suaves que Seúl.",
        ),
      ),
      S(
        L("Who it fits", "适合谁", "누구에게 맞나", "Para quién"),
        L(
          "Fits first Japan trips, food depth, and neighborhood hopping by train. On a short hub trip vs Singapore, see /compare/tokyo-vs-singapore. Vs Seoul: /compare/tokyo-vs-seoul.",
          "适合第一次日本行、美食深度、以及坐电车跳街区。短途枢纽对新加坡：/compare/tokyo-vs-singapore。对首尔：/compare/tokyo-vs-seoul。",
          "첫 일본 여행, 음식 깊이, 전철로 동네 이동에 맞습니다. 짧은 허브로 싱가포르와 비교: /compare/tokyo-vs-singapore. 서울: /compare/tokyo-vs-seoul.",
          "Encaja con un primer Japón, profundidad gastronómica y barrios en tren. Hub corto vs Singapur: /compare/tokyo-vs-singapore. Vs Seúl: /compare/tokyo-vs-seoul.",
        ),
      ),
    ],
    faq: [],
  },

  seoul: {
    relatedCompareSlug: "seoul-vs-taipei",
    sections: [
      S(
        L("When to go", "什么时候去", "언제 갈까", "Cuándo ir"),
        L(
          "Spring and autumn are usually best for walking. Summers are hot and humid; winters are colder and drier than Tokyo. Cherry blossoms often open a week or two after Tokyo’s.",
          "春秋通常最适合步行。夏天湿热；冬天比东京更冷、更干。樱花常比东京晚开一到两周。",
          "봄·가을이 걷기에 대개 가장 좋습니다. 여름은 덥고 습하고, 겨울은 도쿄보다 춥고 건조합니다. 벚꽃은 보통 도쿄보다 1–2주 늦게 핍니다.",
          "Primavera y otoño suelen ser mejores para caminar. Los veranos son calurosos y húmedos; los inviernos, más fríos y secos que Tokio. Los cerezos suelen abrir una o dos semanas después que en Tokio.",
        ),
      ),
      S(
        L("Who it fits", "适合谁", "누구에게 맞나", "Para quién"),
        L(
          "Fits value-conscious city trips, nightlife energy, and Korean food density. Short food-city choice vs Taipei: /compare/seoul-vs-taipei. Vs Tokyo: /compare/tokyo-vs-seoul.",
          "适合看重性价比的城市行、夜生活能量与韩餐密度。短途美食城对台北：/compare/seoul-vs-taipei。对东京：/compare/tokyo-vs-seoul。",
          "가성비 도시 여행, 나이트 에너지, 한식 밀도에 맞습니다. 짧은 음식 도시로 타이베이와: /compare/seoul-vs-taipei. 도쿄: /compare/tokyo-vs-seoul.",
          "Encaja con viajes urbanos de valor, energía nocturna y densidad de comida coreana. Ciudad comida corta vs Taipéi: /compare/seoul-vs-taipei. Vs Tokio: /compare/tokyo-vs-seoul.",
        ),
      ),
    ],
    faq: [],
  },
}

export function getCityDecisionBlock(slug: string) {
  return cityDecisionBlocks[slug]
}
