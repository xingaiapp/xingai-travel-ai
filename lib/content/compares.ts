import type { ComparePage, Localized } from "@/lib/content/types"

const L = (en: string, zh: string, ko: string, es: string): Localized => ({ en, zh, ko, es })

function factor(en: string, zh: string, ko: string, es: string, a: ComparePage["factors"][0]["a"], b: ComparePage["factors"][0]["b"]) {
  return { name: L(en, zh, ko, es), a, b }
}

export const compares: ComparePage[] = [
  {
    slug: "tokyo-vs-seoul",
    title: L("Tokyo vs Seoul: which is better for your trip?", "东京 vs 首尔：哪次更适合你？", "도쿄 vs 서울: 어디에 더 맞을까?", "Tokio vs Seúl: ¿cuál es mejor para tu viaje?"),
    oneLiner: L(
      "Tokyo usually wins for food depth, culture density, and walkable neighborhoods; Seoul often wins for value and nightlife energy.",
      "东京通常在美食深度、文化密度和步行街区上更强；首尔常在性价比和夜生活上更胜。",
      "도쿄는 음식·문화·걷기 좋은 동네에서, 서울은 가성비·나이트라이프에서 자주 앞섭니다.",
      "Tokio suele ganar en comida, cultura y barrios caminables; Seúl en valor y vida nocturna."
    ),
    aName: L("Tokyo", "东京", "도쿄", "Tokio"),
    bName: L("Seoul", "首尔", "서울", "Seúl"),
    aBestFor: [
      L("Food-focused city trips", "以吃为主的城市行", "음식 중심 도시 여행", "Viajes urbanos centrados en comida"),
      L("First Japan trip", "第一次去日本", "첫 일본 여행", "Primer viaje a Japón"),
      L("Walkable neighborhoods", "适合步行的街区", "걷기 좋은 동네", "Barrios caminables"),
    ],
    bBestFor: [
      L("Strong value for money", "更看重性价比", "가성비를 중시할 때", "Buena relación calidad-precio"),
      L("Nightlife and youth culture", "夜生活与年轻文化", "나이트라이프·젊은 문화", "Vida nocturna y cultura joven"),
      L("Shorter long-haul budgets", "长途预算更紧时", "장거리 예산이 빠듯할 때", "Presupuestos largos más ajustados"),
    ],
    factors: [
      factor("Food", "美食", "음식", "Comida", "strong", "good"),
      factor("Walkability", "步行友好", "도보", "Caminabilidad", "strong", "good"),
      factor("Culture", "文化", "문화", "Cultura", "strong", "good"),
      factor("Value", "性价比", "가성비", "Valor", "mixed", "strong"),
      factor("Nightlife", "夜生活", "나이트라이프", "Vida nocturna", "good", "strong"),
    ],
    verdict: L(
      "Pick Tokyo if food and walkable culture matter most; pick Seoul if you want more stretch from the same budget and stronger nightlife.",
      "更看重美食与步行文化选东京；想让预算更有弹性、夜生活更强选首尔。",
      "음식·걷기 문화가 최우선이면 도쿄, 같은 예산으로 더 늘리고 나이트가 중요하면 서울.",
      "Elige Tokio si priorizas comida y cultura caminable; Seúl si quieres más valor y más vida nocturna."
    ),
    tradeoffs: L(
      "Tokyo can feel pricier and denser. Seoul may mean more language friction for some travelers and a different food profile.",
      "东京可能更贵、更密。首尔对部分旅客语言门槛更高，餐饮风格也不同。",
      "도쿄는 더 비싸고 밀집될 수 있습니다. 서울은 언어 장벽과 음식 스타일이 다를 수 있습니다.",
      "Tokio puede ser más caro y denso. Seúl puede traer más fricción de idioma y otro perfil gastronómico."
    ),
    faq: [
      {
        q: L("Is Tokyo or Seoul better for a first Asia trip?", "第一次去亚洲，东京和首尔哪个更好？", "첫 아시아 여행에 도쿄와 서울 중 어디?", "¿Tokio o Seúl para un primer viaje a Asia?"),
        a: L(
          "Both work. Tokyo often feels clearer for first-timers who want dense transit and iconic neighborhoods; Seoul can feel younger and better value. Run /decide with your origin and budget.",
          "都可以。想要密集交通与标志街区，东京往往更清晰；首尔更年轻、性价比更好。用你的出发地和预算跑 /decide。",
          "둘 다 가능. 교통·상징 동네가 명확하길 원하면 도쿄, 젊고 가성비가 중요하면 서울. 출발지·예산으로 /decide를 돌리세요.",
          "Ambos sirven. Tokio suele ser más claro para debutantes; Seúl más joven y con mejor valor. Usa /decide con tu origen y presupuesto."
        ),
      },
    ],
    relatedCitySlugs: ["tokyo", "seoul"],
  },
  {
    slug: "tokyo-vs-taipei",
    title: L("Tokyo vs Taipei: which fits your trip?", "东京 vs 台北：哪个更适合你？", "도쿄 vs 타이베이: 어디에 맞을까?", "Tokio vs Taipéi: ¿cuál encaja?"),
    oneLiner: L(
      "Tokyo wins for scale and food variety; Taipei often wins for warmth, shorter hops from some Asia hubs, and a softer budget.",
      "东京胜在体量与餐饮多样性；台北常在气候更暖、部分亚洲枢纽航程更短、预算更柔和上占优。",
      "도쿄는 규모·음식 다양성, 타이베이는 따뜻함·일부 허브에서의 짧은 이동·부드러운 예산에서 자주 앞섭니다.",
      "Tokio gana en escala y variedad gastronómica; Taipéi en clima más cálido, vuelos más cortos desde algunos hubs y presupuesto más suave."
    ),
    aName: L("Tokyo", "东京", "도쿄", "Tokio"),
    bName: L("Taipei", "台北", "타이베이", "Taipéi"),
    aBestFor: [
      L("Big-city energy", "大都市节奏", "대도시 에너지", "Energía de gran ciudad"),
      L("Deep food exploration", "深度吃货", "깊은 미식 탐험", "Exploración gastronómica"),
    ],
    bBestFor: [
      L("Warmer short breaks", "偏暖的短途", "따뜻한 단기 여행", "Escapadas más cálidas"),
      L("Gentler budgets", "预算更轻松", "더 여유로운 예산", "Presupuestos más suaves"),
    ],
    factors: [
      factor("Food", "美食", "음식", "Comida", "strong", "strong"),
      factor("Walkability", "步行友好", "도보", "Caminabilidad", "strong", "good"),
      factor("Warmth", "温暖感", "따뜻함", "Calidez", "mixed", "strong"),
      factor("Value", "性价比", "가성비", "Valor", "mixed", "strong"),
      factor("Scale", "城市体量", "규모", "Escala", "strong", "good"),
    ],
    verdict: L(
      "Choose Tokyo for maximum city-and-food intensity; choose Taipei when warmth and budget stretch matter more.",
      "要极致城市与美食密度选东京；更看重温暖与预算弹性选台北。",
      "도시·음식 강도를 최대로 원하면 도쿄, 따뜻함·예산 여유가 더 중요하면 타이베이.",
      "Elige Tokio por intensidad urbana y gastronómica; Taipéi si priorizas clima y margen de presupuesto."
    ),
    tradeoffs: L(
      "Tokyo trips can burn budget faster. Taipei has less “bucket-list” global fame for some travelers.",
      "东京更容易烧预算。对部分旅客来说，台北的全球「必去」光环较弱。",
      "도쿄는 예산이 빨리 닳을 수 있습니다. 타이베이는 일부에게 ‘버킷리스트’ 인지도가 덜할 수 있습니다.",
      "Tokio puede consumir presupuesto más rápido. Taipéi puede tener menos fama de “imprescindible”."
    ),
    faq: [
      {
        q: L("Tokyo or Taipei for food?", "吃货选东京还是台北？", "음식만 보면 도쿄 vs 타이베이?", "¿Tokio o Taipéi para comida?"),
        a: L(
          "Both are excellent. Tokyo offers broader range and prestige dining; Taipei shines for night markets and everyday excellence. Your budget and trip length decide more than “which city cooks better.”",
          "都很强。东京品类更广、精致餐饮更多；台北夜市与日常餐饮极强。预算和行程天数往往比「谁更好吃」更关键。",
          "둘 다 훌륭합니다. 도쿄는 폭과 파인 다이닝, 타이베이는 야시장·일상 미식. ‘어디가 더 맛있나’보다 예산·일정이 더 결정적입니다.",
          "Ambas excelentes. Tokio ofrece más rango y alta cocina; Taipéi brilla en mercados nocturnos y excelencia cotidiana. Presupuesto y duración pesan más."
        ),
      },
    ],
    relatedCitySlugs: ["tokyo", "taipei"],
  },
  {
    slug: "hong-kong-vs-tokyo",
    title: L("Hong Kong vs Tokyo: which should you choose?", "香港 vs 东京：该选哪个？", "홍콩 vs 도쿄: 어디를 고를까?", "Hong Kong vs Tokio: ¿cuál elegir?"),
    oneLiner: L(
      "Hong Kong is a dense harbor-and-streets city with strong food and skyline drama; Tokyo is larger, deeper for neighborhoods and culture marathon trips.",
      "香港是港口与街道交织的高密度城市，美食与天际线很强；东京更大，街区与文化马拉松更深。",
      "홍콩은 항구·거리의 고밀도 도시로 음식·스카이라인이 강하고, 도쿄는 더 크며 동네·문화 마라톤에 깊습니다.",
      "Hong Kong es densa, puerto y calles, con comida y skyline potentes; Tokio es más grande y profundo para barrios y maratones culturales."
    ),
    aName: L("Hong Kong", "香港", "홍콩", "Hong Kong"),
    bName: L("Tokyo", "东京", "도쿄", "Tokio"),
    aBestFor: [
      L("Harbor + street contrast", "海港与街道反差", "항구와 거리의 대비", "Contraste puerto y calles"),
      L("Compact city breaks", "紧凑短途", "콤팩트한 단기 여행", "Escapadas urbanas compactas"),
    ],
    bBestFor: [
      L("Longer neighborhood deep-dives", "更长的街区深潜", "긴 동네 탐험", "Inmersión larga en barrios"),
      L("Broader food map", "更广的美食地图", "더 넓은 음식 지도", "Mapa gastronómico más amplio"),
    ],
    factors: [
      factor("Food", "美食", "음식", "Comida", "strong", "strong"),
      factor("Walkability", "步行友好", "도보", "Caminabilidad", "good", "strong"),
      factor("Skyline / harbor", "天际线 / 港口", "스카이라인·항구", "Skyline / puerto", "strong", "good"),
      factor("Scale", "体量", "규모", "Escala", "good", "strong"),
      factor("First-hand stories on XingAI", "站内亲历故事", "XingAI 현장 스토리", "Historias de primera mano", "strong", "weaker"),
    ],
    verdict: L(
      "Choose Hong Kong for a compact, dramatic city-and-harbor trip (and our published Stories); choose Tokyo when you want more days of neighborhood variety.",
      "想要紧凑、港口与城市戏剧感（以及我们已发布的 Stories）选香港；想要更多天的街区多样性选东京。",
      "콤팩트한 항구 도시 드라마(그리고 게시된 Stories)면 홍콩, 더 많은 날의 동네 다양성이면 도쿄.",
      "Elige Hong Kong por un viaje compacto y dramático (y nuestras Stories); Tokio si quieres más días de variedad de barrios."
    ),
    tradeoffs: L(
      "Hong Kong can feel crowded and humid; Tokyo needs more days to feel “done.”",
      "香港可能更挤、更湿；东京需要更多天才能有「玩透」感。",
      "홍콩은 붐비고 습할 수 있고, 도쿄는 ‘다 했다’는 느낌이 나려면 날이 더 필요합니다.",
      "Hong Kong puede sentirse abarrotado y húmedo; Tokio necesita más días para sentirse “completo”."
    ),
    faq: [
      {
        q: L("Is Hong Kong worth visiting?", "香港值得去吗？", "홍콩은 가볼 만한가요?", "¿Vale la pena visitar Hong Kong?"),
        a: L(
          "Yes for many travelers who like food, transit, and harbor-city energy — but it depends on your dates, budget, and pace. Read /stories/hong-kong, then build your own decision on /decide.",
          "对喜欢美食、交通与港口城市能量的人来说往往值得——但仍取决于日期、预算与节奏。先看 /stories/hong-kong，再到 /decide。",
          "음식·교통·항구 도시 에너지를 좋아하면 많은 사람에게 가치 있습니다. 날짜·예산·속도에 달립니다. /stories/hong-kong을 본 뒤 /decide로.",
          "Sí para muchos que aman comida, tránsito y energía de ciudad-puerto — depende de fechas, presupuesto y ritmo. Lee /stories/hong-kong y luego /decide."
        ),
      },
    ],
    relatedCitySlugs: ["hong-kong", "tokyo"],
  },
  {
    slug: "hong-kong-vs-singapore",
    title: L("Hong Kong vs Singapore: which city fits?", "香港 vs 新加坡：哪个更合适？", "홍콩 vs 싱가포르: 어디가 맞을까?", "Hong Kong vs Singapur: ¿cuál encaja?"),
    oneLiner: L(
      "Hong Kong leans dramatic harbor streets and Cantonese food density; Singapore leans polish, planning ease, and garden-city calm.",
      "香港偏戏剧性的港口街道与粤菜密度；新加坡偏精致、好规划，以及花园城市的从容。",
      "홍콩은 드라마틱한 항구 거리·광동 음식 밀도, 싱가포르는 정돈·계획 용이·가든시티 여유에 가깝습니다.",
      "Hong Kong apuesta por calles-puerto dramáticas y densidad cantonesa; Singapur por pulido, facilidad de plan y calma de ciudad jardín."
    ),
    aName: L("Hong Kong", "香港", "홍콩", "Hong Kong"),
    bName: L("Singapore", "新加坡", "싱가포르", "Singapur"),
    aBestFor: [
      L("Street-food intensity", "街头美食强度", "길거리 음식 강도", "Intensidad de street food"),
      L("Harbor views + vertical city", "海港与垂直城市", "항구 전망 + 수직 도시", "Puerto + ciudad vertical"),
    ],
    bBestFor: [
      L("Easy first-timer logistics", "新手行程更好办", "초보 물류가 쉬움", "Logística fácil para debutantes"),
      L("Greener, calmer pacing", "更绿、更从容", "더 푸르고 차분한 속도", "Ritmo más verde y calmado"),
    ],
    factors: [
      factor("Food", "美食", "음식", "Comida", "strong", "strong"),
      factor("Ease", "省心程度", "수월함", "Facilidad", "good", "strong"),
      factor("Green / calm", "绿化 / 从容", "녹지·차분함", "Verde / calma", "mixed", "strong"),
      factor("Drama / skyline", "戏剧感 / 天际线", "드라마·스카이라인", "Drama / skyline", "strong", "good"),
      factor("Value", "性价比", "가성비", "Valor", "mixed", "mixed"),
    ],
    verdict: L(
      "Pick Hong Kong for grit-and-harbor energy; pick Singapore when you want smoother logistics and greener calm.",
      "要港口与街头能量选香港；要更顺的行程与更绿的从容选新加坡。",
      "항구·거리 에너지면 홍콩, 더 매끄러운 일정·초록 여유면 싱가포르.",
      "Elige Hong Kong por energía puerto-y-calle; Singapur por logística más suave y calma verde."
    ),
    tradeoffs: L(
      "Hong Kong humidity and crowds can fatigue. Singapore can feel more polished and less “raw street” for some travelers.",
      "香港湿热与拥挤可能更累。新加坡对部分人会显得更精致、少一点「生猛街头」。",
      "홍콩의 습도·혼잡은 피로를 줄 수 있습니다. 싱가포르는 더 다듬어져 ‘날것의 거리감’이 덜할 수 있습니다.",
      "La humedad y las multitudes de Hong Kong cansan. Singapur puede sentirse más pulido y menos “calle cruda”."
    ),
    faq: [
      {
        q: L("Hong Kong or Singapore for couples?", "情侣行选香港还是新加坡？", "커플 여행 홍콩 vs 싱가포르?", "¿Hong Kong o Singapur para parejas?"),
        a: L(
          "Both work. Singapore is often easier for a relaxed first trip together; Hong Kong is stronger if you want denser food and harbor walks. Confirm with your dates on /decide.",
          "都可以。轻松的第一次同行常更偏新加坡；想密集美食与海港散步更偏香港。用日期在 /decide 确认。",
          "둘 다 가능. 편안한 첫 동행은 싱가포르, 밀집 미식·항구 산책이면 홍콩. /decide에서 날짜로 확인하세요.",
          "Ambos sirven. Singapur suele ser más fácil para un primer viaje relajado; Hong Kong si quieren más comida densa y paseos al puerto. Confirma en /decide."
        ),
      },
    ],
    relatedCitySlugs: ["hong-kong"],
  },
  {
    slug: "lisbon-vs-barcelona",
    title: L("Lisbon vs Barcelona: which European city trip?", "里斯本 vs 巴塞罗那：欧洲城市怎么选？", "리스본 vs 바르셀로나: 유럽 도시는?", "Lisboa vs Barcelona: ¿qué ciudad europea?"),
    oneLiner: L(
      "Lisbon often wins for walkable hills, light, and softer crowds outside peak; Barcelona wins for beach-city energy and iconic architecture density.",
      "里斯本常在步行山城、光线、旺季外人少上更优；巴塞罗那胜在海滨城市能量与标志建筑密度。",
      "리스본은 언덕 도보·빛·성수기 밖 한산함에서, 바르셀로나는 해변 도시 에너지·상징 건축 밀도에서 자주 앞섭니다.",
      "Lisboa suele ganar en colinas caminables, luz y menos muchedumbre fuera de pico; Barcelona en energía playa-ciudad y arquitectura icónica."
    ),
    aName: L("Lisbon", "里斯本", "리스본", "Lisboa"),
    bName: L("Barcelona", "巴塞罗那", "바르셀로나", "Barcelona"),
    aBestFor: [
      L("Hills, light, compact days", "山城、光线、紧凑行程", "언덕·빛·콤팩트한 하루", "Colinas, luz, días compactos"),
      L("Slightly gentler tourist pressure off-peak", "淡季游客压力更轻", "비성수기 관광 압박이 덜함", "Menos presión turística fuera de pico"),
    ],
    bBestFor: [
      L("Beach + city in one trip", "海滨 + 城市一次搞定", "해변+도시 한 번에", "Playa + ciudad en un viaje"),
      L("Architecture bucket list", "建筑打卡清单", "건축 버킷리스트", "Lista de arquitectura"),
    ],
    factors: [
      factor("Walkability", "步行友好", "도보", "Caminabilidad", "strong", "good"),
      factor("Beach access", "近海", "해변 접근", "Acceso a playa", "weaker", "strong"),
      factor("Architecture icons", "标志建筑", "상징 건축", "Iconos arquitectónicos", "good", "strong"),
      factor("Crowds (peak)", "旺季拥挤", "성수기 혼잡", "Multitudes (pico)", "good", "weaker"),
      factor("Food", "美食", "음식", "Comida", "strong", "strong"),
    ],
    verdict: L(
      "Choose Lisbon for compact hill-city charm; choose Barcelona when beach and Gaudí-scale icons are non-negotiable.",
      "要紧凑山城气质选里斯本；海滨与高迪级地标不可少选巴塞罗那。",
      "콤팩트 언덕 도시 매력이면 리스본, 해변·가우디급 아이콘이 필수면 바르셀로나.",
      "Elige Lisboa por encanto de ciudad en colina; Barcelona si playa e iconos a escala Gaudí son innegociables."
    ),
    tradeoffs: L(
      "Lisbon hills tire legs. Barcelona peak seasons can feel overcrowded and pricey.",
      "里斯本坡多费腿。巴塞罗那旺季可能过挤、更贵。",
      "리스본 언덕은 다리가 힘듭니다. 바르셀로나 성수기는 붐비고 비쌀 수 있습니다.",
      "Las colinas de Lisboa cansan. Barcelona en temporada alta puede saturarse y encarecerse."
    ),
    faq: [
      {
        q: L("Lisbon or Barcelona for a long weekend?", "周末长假选里斯本还是巴塞罗那？", "연휴 주말에 리스본 vs 바르셀로나?", "¿Lisboa o Barcelona para un puente?"),
        a: L(
          "Lisbon is often easier to “cover” in 3–4 days. Barcelona rewards extra days if beach and big sights matter. Plug your origin flight time into /decide.",
          "3–4 天往往更好「盖住」里斯本。若海滨与大体量景点重要，巴塞罗那更值得加天。把出发地航班放进 /decide。",
          "3–4일이면 리스본을 ‘커버’하기 쉬운 편입니다. 해변·대형 명소가 중요하면 바르셀로나에 날을 더. 출발 항공을 /decide에 넣으세요.",
          "Lisboa suele cubrirse mejor en 3–4 días. Barcelona premia días extra si importan playa y grandes vistas. Mete tu vuelo en /decide."
        ),
      },
    ],
  },
]

export function getCompare(slug: string) {
  return compares.find((item) => item.slug === slug)
}
