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
    pickWhenA: [
      L("You want maximum neighborhood + food variety and denser transit on foot.", "你想要最大街区与美食多样性，以及更密的步行+公交。", "동네·음식 다양성과 도보+교통 밀도를 최대로 원할 때.", "Quieres máxima variedad de barrios y comida, y tránsito denso a pie."),
      L("Japan is the priority destination, not just “Asia somewhere.”", "日本本身是优先目的地，不只是「亚洲随便哪」。", "일본 자체가 우선 목적지일 때 — ‘아시아 어딘가’가 아니라.", "Japón es el destino prioritario, no solo “Asia en algún sitio”."),
    ],
    pickWhenB: [
      L("The same budget needs more stretch for food, nights out, and hotels.", "同一预算要在餐饮、夜生活和酒店上更有弹性。", "같은 예산으로 식비·밤문화·숙소를 더 늘리고 싶을 때.", "El mismo presupuesto necesita más margen en comida, noches y hoteles."),
      L("Nightlife energy and a younger street vibe matter more than prestige dining.", "更看重夜生活与年轻街头气质，而不是精致餐饮。", "파인 다이닝보다 나이트·젊은 거리 기운이 더 중요할 때.", "La vida nocturna y el vibe joven importan más que la alta cocina."),
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
      "Tokyo can feel pricier and denser — lodging and dining add up quickly for couples who want central neighborhoods. Seoul may mean more language friction for some travelers and a different food profile (BBQ, street markets, late-night energy) than Tokyo’s quieter neighborhood evenings. Neither is “better” without your origin flight hours and Avoid list.",
      "东京可能更贵、更密——想住核心街区时住宿和餐饮涨得快。首尔对部分旅客语言门槛更高，餐饮风格也不同（烧烤、夜市、深夜活力），与东京更安静的街区夜晚不同。离开出发地航程和 Avoid，谈不上谁更好。",
      "도쿄는 더 비싸고 밀집될 수 있습니다 — 중심 동네를 원하면 숙식비가 빨리 쌓입니다. 서울은 언어 장벽과 음식 스타일(BBQ·야시장·늦은 밤)이 다를 수 있습니다. 출발 항공·Avoid 없이 ‘더 낫다’고 말하기 어렵습니다.",
      "Tokio puede ser más caro y denso — alojamiento y comida suman rápido en barrios céntricos. Seúl puede traer más fricción de idioma y otro perfil gastronómico. Sin horas de vuelo y Avoid, no hay “mejor”."
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
      {
        q: L("How many days for Tokyo vs Seoul?", "东京和首尔各要几天？", "도쿄 vs 서울 며칠?", "¿Cuántos días Tokio vs Seúl?"),
        a: L(
          "Tokyo usually rewards 5+ days if you want more than one neighborhood. Seoul can feel satisfying in 4–5 for a first pass. Shorter trips favor the city with the shorter flight from your hub — check that on /decide.",
          "若想逛多个街区，东京通常 5 天以上更值。首尔初访 4–5 天常够。更短行程应偏向出发枢纽航程更短的那座——在 /decide 核对。",
          "여러 동네를 보려면 도쿄는 보통 5일+, 서울 첫인상은 4–5일도 충분할 수 있습니다. 짧은 일정은 허브에서 항공이 짧은 쪽 — /decide에서 확인.",
          "Tokio suele pedir 5+ días si quieres más de un barrio. Seúl puede bastar en 4–5. Viajes cortos favorecen el vuelo más corto desde tu hub — mira /decide."
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
    pickWhenA: [
      L("You want big-city intensity and the widest food map in one trip.", "你想要大都市强度，以及一次行程里最广的美食地图。", "한 번에 대도시 강도와 가장 넓은 음식 지도를 원할 때.", "Quieres intensidad de gran ciudad y el mapa gastronómico más amplio."),
      L("Cooler weather is fine if the city payoff is higher.", "若城市回报更高，凉一点的天气也能接受。", "도시 보상이 크다면 더 선선한 날씨도 괜찮을 때.", "El clima más fresco vale si la ciudad compensa."),
    ],
    pickWhenB: [
      L("Warm evenings and a softer hotel/food bill matter more than scale.", "更看重暖夜与更柔的住宿/餐饮账单，而不是体量。", "규모보다 따뜻한 저녁·더 부드러운 숙식비가 중요할 때.", "Noches cálidas y una cuenta más suave importan más que la escala."),
      L("You want a shorter Asia hop from some regional hubs.", "你想从部分区域枢纽走更短的亚洲跳。", "일부 지역 허브에서 더 짧은 아시아 이동을 원할 때.", "Quieres un salto asiático más corto desde algunos hubs."),
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
      "Tokyo trips can burn budget faster once you add central hotels and transit-day food. Taipei has less global “bucket-list” fame for some travelers, which is a feature if you want softer crowds — and a drawback if your group needs globally famous landmarks every day.",
      "东京一旦加上核心酒店和全天餐饮，预算涨得更快。对部分旅客，台北的全球「必去」光环较弱——想人少是优点，若团队每天要世界级地标则是缺点。",
      "도쿄는 중심 호텔·하루 식비가 붙으면 예산이 빨리 닳습니다. 타이베이는 ‘버킷리스트’ 인지도가 덜할 수 있어 한산함에는 이득, 매일 세계급 랜드마크가 필요하면 단점입니다.",
      "Tokio puede consumir presupuesto más rápido con hoteles céntricos. Taipéi puede tener menos fama de “imprescindible” — ventaja si quieres menos muchedumbre; desventaja si el grupo necesita iconos globales cada día."
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
      {
        q: L("Which is warmer in winter?", "冬天哪个更暖？", "겨울에 어디가 더 따뜻?", "¿Cuál es más cálida en invierno?"),
        a: L(
          "Taipei is usually milder in winter evenings; Tokyo can feel sharper after dark. Still confirm your exact dates on /decide — a warm label without your months is incomplete.",
          "台北冬夜通常更温和；东京天黑后可能更冷。仍要用确切日期在 /decide 确认——没有月份的「温暖」标签不完整。",
          "타이베이 겨울 저녁이 대체로 더 온화하고, 도쿄는 해가 지면 더 쌀쌀할 수 있습니다. 정확한 날짜는 /decide에서 확인하세요.",
          "Taipéi suele ser más suave en noches de invierno; Tokio puede sentirse más cortante. Confirma fechas exactas en /decide."
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
    pickWhenA: [
      L("You only have a compact window and want harbor + street drama fast.", "你只有紧凑窗口，想快速拿到港口与街道的戏剧感。", "짧은 일정에 항구·거리 드라마를 빨리 느끼고 싶을 때.", "Tienes una ventana compacta y quieres drama puerto-calle ya."),
      L("You want to pair the trip with published XingAI Travel Stories for Hong Kong.", "你想把行程和已发布的香港 Stories 对照着看。", "게시된 홍콩 Stories와 나란히 보고 싶을 때.", "Quieres emparejar el viaje con las Stories publicadas de Hong Kong."),
    ],
    pickWhenB: [
      L("You have more days and want neighborhood variety beyond one transit hub.", "你有更多天，想要不止一个交通枢纽周边的街区多样性。", "날이 더 있어 교통 허브 하나 이상의 동네 다양성을 원할 때.", "Tienes más días y quieres variedad de barrios más allá de un hub."),
      L("A broader Japan food and culture marathon is the point of the trip.", "这次旅行的重点是更广的日本美食与文化马拉松。", "여행의 목적이 더 넓은 일본 미식·문화 마라톤일 때.", "El punto es un maratón más amplio de comida y cultura japonesa."),
    ],
    factors: [
      factor("Food", "美食", "음식", "Comida", "strong", "strong"),
      factor("Walkability", "步行友好", "도보", "Caminabilidad", "good", "strong"),
      factor("Skyline / harbor", "天际线 / 港口", "스카이라인·항구", "Skyline / puerto", "strong", "good"),
      factor("Scale", "体量", "규모", "Escala", "good", "strong"),
      factor("First-timer clarity", "初次到访者清晰度", "첫 방문 명확도", "Claridad para debutantes", "strong", "weaker"),
    ],
    verdict: L(
      "Choose Hong Kong for a compact, dramatic city-and-harbor trip (and our published Stories); choose Tokyo when you want more days of neighborhood variety.",
      "想要紧凑、港口与城市戏剧感（以及我们已发布的 Stories）选香港；想要更多天的街区多样性选东京。",
      "콤팩트한 항구 도시 드라마(그리고 게시된 Stories)면 홍콩, 더 많은 날의 동네 다양성이면 도쿄.",
      "Elige Hong Kong por un viaje compacto y dramático (y nuestras Stories); Tokio si quieres más días de variedad de barrios."
    ),
    tradeoffs: L(
      "Hong Kong can feel crowded and humid, especially in peak summer — harbor walks still work, but midday pace should slow. Tokyo needs more days to feel “done” across neighborhoods; stuffing it into a long weekend often means you only see one transit hub.",
      "香港可能更挤、更湿，盛夏尤甚——海港散步仍值得，但正午节奏要放慢。东京需要更多天才能有「玩透」感；硬塞进一个长周末往往只看到一个交通枢纽周边。",
      "홍콩은 붐비고 습할 수 있습니다 — 특히 한여름. 항구 산책은 좋지만 한낮은 속도를 낮추세요. 도쿄는 ‘다 했다’는 느낌이 나려면 날이 더 필요하고, 연휴 주말에 우겨 넣으면 교통 허브 주변만 보게 됩니다.",
      "Hong Kong puede sentirse abarrotado y húmedo — sobre todo en verano. Tokio necesita más días para sentirse “completo”; meterlo en un puente suele dejar solo un hub de tránsito."
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
      {
        q: L("Better for a 4-day trip?", "4 天行程哪个更好？", "4일 일정에는 어디?", "¿Mejor para 4 días?"),
        a: L(
          "Hong Kong’s compact map often fits 4 days better. Tokyo can work in 4 if you pick one or two wards and skip “see everything.” Confirm flight hours from your origin on /decide.",
          "香港地图更紧凑，4 天往往更合适。东京也能 4 天——若只选一两个区、不追求「全看完」。在 /decide 确认出发地航程。",
          "홍콩의 콤팩트한 지도가 4일에 더 잘 맞는 편입니다. 도쿄도 1–2개 구만 고르면 가능합니다. /decide에서 출발 항공을 확인하세요.",
          "El mapa compacto de Hong Kong suele encajar mejor en 4 días. Tokio puede funcionar si eliges uno o dos barrios. Confirma el vuelo en /decide."
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
    pickWhenA: [
      L("You want denser Cantonese / street-food intensity and skyline-harbor walks.", "你想要更密的粤菜/街头美食强度，以及天际线—港口散步。", "더  dens한 광동·길거리 음식과 스카이라인·항구 산책을 원할 때.", "Quieres más densidad cantonesa/street food y paseos skyline-puerto."),
      L("A little grit and humidity are fine if the energy is higher.", "若能量更高，挤一点、湿一点也能接受。", "기운이 세면 붐빔·습도도 감수할 때.", "Un poco de grit y humedad vale si la energía es mayor."),
    ],
    pickWhenB: [
      L("First-timer logistics and greener, calmer pacing matter most.", "新手行程与更绿、更从容的节奏最重要。", "초보 물류와 더 초록·차분한 속도가 최우선일 때.", "La logística fácil y un ritmo más verde/calmado pesan más."),
      L("You prefer polished planning over raw night-market chaos every evening.", "你更想精致好规划，而不是每晚生猛夜市。", "매일 거친 야시장보다 다듬어진 계획을 선호할 때.", "Prefieres plan pulido a caos de mercado nocturno cada noche."),
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
      "Hong Kong humidity and crowds can fatigue after long outdoor days. Singapore can feel more polished and less “raw street” for travelers who want chaotic night markets every evening — that polish is exactly why first-timers often find logistics easier.",
      "香港湿热与拥挤可能让长户外天更累。想要每晚都有狂野夜市的人，会觉得新加坡更精致、少一点「生猛街头」——而这种精致正是新手行程更好办的原因。",
      "홍콩의 습도·혼잡은 긴 야외 하루 뒤 피로를 줍니다. 매일 거친 야시장을 원하는 이에게 싱가포르는 더 다듬어져 보일 수 있고, 그 정돈이 초보 물류를 쉽게 만듭니다.",
      "La humedad y las multitudes de Hong Kong cansan. Singapur puede sentirse más pulido y menos “calle cruda” — esa misma facilidad es por la que muchos debutantes prefieren su logística."
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
      {
        q: L("Which is easier without speaking the local language?", "不太会当地语言哪个更省心？", "현지어를 못하면 어디가 수월?", "¿Cuál es más fácil sin el idioma local?"),
        a: L(
          "Singapore often feels smoother for English-first travelers. Hong Kong is still highly navigable with transit apps and English signage in core areas — your comfort with dense cities matters more than a language binary.",
          "英语优先的旅客常觉得新加坡更顺。香港在核心区仍可用公交应用和英语标识通行——你对高密度城市的适应，往往比「会不会当地语言」二分更重要。",
          "영어 우선 여행자에게는 싱가포르가 더 매끄러운 편입니다. 홍콩도 핵심 구역은 앱·영어 표지판으로 다닐 수 있습니다.",
          "Singapur suele ser más fluido para quien prioriza el inglés. Hong Kong sigue siendo navegable en zonas núcleo con apps y señalética."
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
    pickWhenA: [
      L("You want a compact hill-city trip you can “cover” in 3–4 days.", "你想要紧凑山城，3–4 天就能大致盖住。", "3–4일에 대략 커버 가능한 콤팩트 언덕 도시를 원할 때.", "Quieres una ciudad en colina compacta que se cubra en 3–4 días."),
      L("Softer crowds outside peak matter more than a beach day.", "淡季外人少比海滩日更重要。", "해변 하루보다 비성수기 한산함이 더 중요할 때.", "Menos muchedumbre fuera de pico importa más que un día de playa."),
    ],
    pickWhenB: [
      L("Beach + Gaudí-scale icons are non-negotiable on this trip.", "这次旅行海滨与高迪级地标不可少。", "이번 여행에 해변·가우디급 아이콘이 필수일 때.", "Playa e iconos a escala Gaudí son innegociables."),
      L("You can add days or accept peak crowds around the big sights.", "你能加天数，或接受大体量景点周边的旺季人流。", "날을 더하거나 대형 명소 성수기 혼잡을 감수할 수 있을 때.", "Puedes sumar días o aceptar muchedumbres en los grandes iconos."),
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
      "Lisbon hills tire legs — plan fewer “must see everything” blocks per day and budget for occasional rides. Barcelona peak seasons can feel overcrowded and pricey around iconic sights; shoulder months and early mornings help, but your Avoid list should say so if crowds are a deal-breaker.",
      "里斯本坡多费腿——少排「一天看完」的块，并预留偶尔打车。巴塞罗那旺季在标志景点附近可能过挤、更贵；肩季和清晨有帮助，若人挤是硬伤，应写进 Avoid。",
      "리스본 언덕은 다리가 힘듭니다 — 하루 ‘다 보기’를 줄이고 가끔 이동비를 예산에 넣으세요. 바르셀로나 성수기는 명소 주변이 붐비고 비쌀 수 있습니다. 혼잡이 딜브레이커면 Avoid에 적으세요.",
      "Las colinas de Lisboa cansan — menos bloques “verlo todo” y presupuesto para algún trayecto. Barcelona en temporada alta puede saturarse; si las multitudes son innegociables, dilo en Avoid."
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
      {
        q: L("Better with kids?", "带孩子哪个更合适？", "아이와 가면 어디?", "¿Mejor con niños?"),
        a: L(
          "Both can work. Lisbon’s hills and stairs need a stroller plan; Barcelona’s beach days are easier for energy resets. Put family pace and Avoid (long walks, late dinners) into /decide.",
          "都可以。里斯本坡道台阶要考虑推车；巴塞罗那海滩日更容易回血。把家庭节奏和 Avoid（少长走、勿太晚吃饭）放进 /decide。",
          "둘 다 가능. 리스본은 언덕·계단에 유모차 계획이 필요하고, 바르셀로나는 해변으로 체력을 회복하기 쉽습니다. 가족 속도와 Avoid를 /decide에 넣으세요.",
          "Ambas sirven. Lisboa pide plan de carrito por colinas; Barcelona facilita resets en la playa. Pon ritmo familiar y Avoid en /decide."
        ),
      },
    ],
  },

  {
    slug: "new-orleans-vs-los-cabos",
    title: L("New Orleans vs Los Cabos: culture city or Baja coast?", "新奥尔良 vs 洛斯卡沃斯：文化城还是下加州海岸？", "뉴올리언스 vs 로스카보스: 문화 도시 vs 바하 해안?", "Nueva Orleans vs Los Cabos: ¿ciudad cultural o costa Baja?"),
    oneLiner: L(
      "New Orleans wins for food, music, and walkable historic streets; Los Cabos wins for beach rest, marina energy, and warm-water coast days.",
      "新奥尔良胜在美食、音乐与可步行的历史街区；洛斯卡沃斯胜在海滩休息、码头活力与暖水海岸日。",
      "뉴올리언스는 음식·음악·걷기 좋은 역사 거리에서, 로스카보스는 해변 휴식·마리나·따뜻한 해안에서 앞섭니다.",
      "Nueva Orleans gana en comida, música y calles históricas caminables; Los Cabos en playa, marina y días de costa cálida."
    ),
    aName: L("New Orleans", "新奥尔良", "뉴올리언스", "Nueva Orleans"),
    bName: L("Los Cabos", "洛斯卡沃스", "로스카보스", "Los Cabos"),
    aBestFor: [
      L("Food + music city breaks", "美食 + 音乐城市短途", "음식+음악 시티브레이크", "Escapadas de comida y música"),
      L("Historic street walking", "历史街区步行", "역사 거리 걷기", "Caminar calles históricas"),
    ],
    bBestFor: [
      L("Beach and resort pacing", "海滩与度假节奏", "해변·리조트 속도", "Ritmo playa y resort"),
      L("Warm-water coast days", "暖水海岸日", "따뜻한 바다 날", "Días de costa de agua cálida"),
    ],
    pickWhenA: [
      L("You want Creole / Cajun food and evening music more than a swim-every-day trip.", "你更想克里奥尔/卡津美食与夜晚音乐，而不是天天游泳。", "매일 수영보다 크리올·케준 음식과 저녁 음악이 중요할 때.", "Quieres comida criolla/cajún y música nocturna más que nadar cada día."),
      L("Heat + walking historic cores is acceptable; beach is optional.", "能接受湿热与历史核心步行；海滩可选。", "습열·역사 중심 걷기를 감수하고 해변은 선택일 때.", "Aceptas calor y caminar el casco; la playa es opcional."),
    ],
    pickWhenB: [
      L("Rest, swim, and Corridor / Arch coast days are the point of the trip.", "休息、游泳与走廊/石拱海岸日才是旅行重点。", "휴식·수영·코리도르/아치 해안이 여행의 목적일 때.", "El punto es descanso, nadar y días de costa Corredor/Arco."),
      L("You prefer resort logistics over dense downtown evenings.", "你更喜欢度假区行程，而不是密集的市中心夜晚。", "밀집한 도심 밤보다 리조트 물류를 선호할 때.", "Prefieres logística de resort a noches densas de centro."),
    ],
    factors: [
      factor("Food", "美食", "음식", "Comida", "strong", "good"),
      factor("Beach / water", "海滩 / 海水", "해변·바다", "Playa / agua", "weaker", "strong"),
      factor("Walkability", "步行友好", "도보", "Caminabilidad", "strong", "mixed"),
      factor("Nightlife / music", "夜生活 / 音乐", "나이트·음악", "Noche / música", "strong", "good"),
      factor("Rest pacing", "休息节奏", "휴식 속도", "Ritmo de descanso", "mixed", "strong"),
    ],
    verdict: L(
      "Pick New Orleans for culture-and-food intensity; pick Los Cabos when warm-water rest is non-negotiable.",
      "要文化与美食强度选新奥尔良；暖水休息不可少选洛斯卡沃斯。",
      "문화·음식 강도면 뉴올리언스, 따뜻한 바다 휴식이 필수면 로스카보스.",
      "Elige Nueva Orleans por intensidad cultural y gastronómica; Los Cabos si el descanso en agua cálida es innegociable."
    ),
    tradeoffs: L(
      "New Orleans summers are humid and walking days need shade breaks; some evenings run late and loud. Los Cabos often needs taxis between Cabo San Lucas, the Corridor, and San José — a “one walk covers it” map is rarer.",
      "新奥尔良夏日湿热，步行日需要遮阴休息；有些夜晚又晚又吵。洛斯卡沃斯常要在圣卢卡斯、走廊与圣何塞之间打车——很少有「一趟走完」的地图。",
      "뉴올리언스 여름은 습하고 걷기 날엔 그늘 휴식이 필요합니다. 어떤 저녁은 늦고 시끄럽습니다. 로스카보스는 카보산루카스·코리도르·산호세 사이 택시가 잦아 ‘한 번에 걷기’ 지도가 드뭅니다.",
      "Los veranos de Nueva Orleans son húmedos y piden pausas a la sombra; algunas noches son largas y ruidosas. Los Cabos suele pedir taxis entre Cabo, el Corredor y San José."
    ),
    faq: [
      {
        q: L("Better for a first US trip from abroad?", "从国外第一次去美国更适合哪个？", "해외에서 첫 미국 여행에는 어디?", "¿Mejor para un primer viaje a EE.UU. desde fuera?"),
        a: L(
          "Neither is a generic “first USA” pick — both are regional. New Orleans suits food-and-culture city travelers; Los Cabos suits beach-rest travelers who accept transfers. Put your origin flight and Avoid into /decide.",
          "两者都不是通用的「第一次美国」——都偏区域。新奥尔良适合美食文化城市客；洛斯卡沃斯适合能接受换乘的海滩休息客。把出发航班和 Avoid 放进 /decide。",
          "둘 다 범용 ‘첫 미국’은 아닙니다. 뉴올리언스는 음식·문화 도시형, 로스카보스는 환승을 감수하는 해변 휴식형. 출발 항공과 Avoid를 /decide에 넣으세요.",
          "Ninguna es el “primer EE.UU.” genérico. Nueva Orleans encaja con ciudad comida-cultura; Los Cabos con playa y traslados. Mete vuelo y Avoid en /decide."
        ),
      },
    ],
    relatedCitySlugs: ["new-orleans", "los-cabos"],
  },

  {
    slug: "hong-kong-vs-macau",
    title: L("Hong Kong vs Macau: which for a short trip?", "香港 vs 澳门：短途选哪个？", "홍콩 vs 마카오: 짧은 일정엔 어디?", "Hong Kong vs Macao: ¿cuál para un viaje corto?"),
    oneLiner: L(
      "Hong Kong wins for harbor density, street food, and transit depth; Macau wins for Cotai spectacle plus old-town plazas on a compact map.",
      "香港胜在海港密度、街头美食与交通深度；澳门胜在路氹奇观加老城广场的紧凑地图。",
      "홍콩은 항구 밀도·길거리 음식·교통 깊이에서, 마카오는 코타이 스펙터클과 구시가지 광장의 콤팩트 지도에서 앞섭니다.",
      "Hong Kong gana en densidad de puerto, comida de calle y tránsito; Macao en espectáculo Cotai más plazas del casco en un mapa compacto."
    ),
    aName: L("Hong Kong", "香港", "홍콩", "Hong Kong"),
    bName: L("Macau", "澳门", "마카오", "Macao"),
    aBestFor: [
      L("Harbor + street city days", "海港 + 街道城市日", "항구+거리 도시일", "Días de puerto y calles"),
      L("Dense transit and food maps", "密集交通与美食地图", "밀집 교통·음식 지도", "Tránsito denso y mapa de comida"),
    ],
    bBestFor: [
      L("Cotai + old town in one base", "路氹 + 老城一个基地", "코타이+구시가지 한 거점", "Cotai y casco en una base"),
      L("Shorter walking loops", "更短的步行环线", "더 짧은 도보 루프", "Bucles a pie más cortos"),
    ],
    pickWhenA: [
      L("You want Victoria Harbour, steep streets, and Cantonese food density as the main story.", "你想把维港、陡街和粤菜密度当成主线。", "빅토리아 하버·가파른 거리·광둥 음식 밀도가 메인일 때.", "Quieres Victoria Harbour, calles empinadas y densidad cantonesa como historia principal."),
      L("Three days should feel like a full city — not a day-trip add-on.", "三天要像完整城市行，而不是顺路一日游。", "3일이 완전한 도시 여행이어야 할 때 — 당일 추가가 아니라.", "Tres días deben sentirse ciudad completa, no un día añadido."),
    ],
    pickWhenB: [
      L("You want Cotai “Europe strip” photos plus Senado Square lanes without splitting bases.", "你想在一个基地拍路氹「欧洲条」和议事亭前地巷弄。", "코타이 ‘유럽 스트립’과 세나두 광장 골목을 거점 하나에서 원할 때.", "Quieres Cotai y las calles de Senado sin partir bases."),
      L("Gambling floors are optional — plazas and food can fill the day.", "赌场可选——广场和美食就能填满一天。", "카지노는 선택 — 광장과 음식으로 하루가 찰 때.", "El juego es opcional — plazas y comida llenan el día."),
    ],
    factors: [
      factor("Food", "美食", "음식", "Comida", "strong", "good"),
      factor("Harbor / skyline", "海港 / 天际线", "항구·스카이라인", "Puerto / skyline", "strong", "mixed"),
      factor("Compact walking", "紧凑步行", "콤팩트 도보", "Caminar compacto", "good", "strong"),
      factor("Spectacle resorts", "奇观度假综合体", "스펙터클 리조트", "Resorts espectáculo", "mixed", "strong"),
      factor("Transit depth", "交通深度", "교통 깊이", "Profundidad de tránsito", "strong", "good"),
    ],
    verdict: L(
      "Pick Hong Kong when harbor-and-street density is the trip; pick Macau when Cotai-plus-old-town on one compact map matters more.",
      "海港与街道密度是重点选香港；更看重一个紧凑地图上的路氹+老城选澳门。",
      "항구·거리 밀도가 핵심이면 홍콩, 콤팩트 지도의 코타이+구시가지가 더 중요하면 마카오.",
      "Elige Hong Kong si manda la densidad puerto-calle; Macao si Cotai más casco en un mapa compacto importa más."
    ),
    tradeoffs: L(
      "Hong Kong hills and humidity tire some groups on short trips. Macau’s Cotai strip can feel theme-park heavy if you only want quiet lanes — and ferry or bridge logistics still matter between Hong Kong and Macau when you try both.",
      "香港的坡与潮湿会让部分人在短途里累。若你只想安静巷弄，澳门路氹可能偏主题乐园；想两地都去时，渡轮或大桥仍要算进行程。",
      "홍콩의 언덕·습도는 짧은 일정에 지칠 수 있습니다. 조용한 골목만 원하면 마카오 코타이가 테마파크처럼 느껴질 수 있고, 둘 다 가면 페리·다리 물류가 남습니다.",
      "Las cuestas y la humedad de Hong Kong cansan en viajes cortos. Cotai puede sentirse de parque temático si solo quieres callejones — y ferry o puente siguen importando si haces ambas."
    ),
    faq: [
      {
        q: L("Hong Kong or Macau for 3 days?", "香港和澳门，3 天选哪个？", "홍콩과 마카오, 3일이면 어디?", "¿Hong Kong o Macao para 3 días?"),
        a: L(
          "Most first-timers with only three days pick one base. Hong Kong fits if harbor streets and transit food are the priority; Macau fits if Cotai and old-town plazas are enough. Read /stories/hong-kong and /stories/macau, then run /decide with your origin.",
          "多数第一次来、只有三天的人只选一个基地。海港街道与交通美食优先选香港；路氹与老城广场够用选澳门。先看 /stories/hong-kong 和 /stories/macau，再用出发地跑 /decide。",
          "3일만 있는 첫 방문은 대개 거점 하나. 항구 거리·교통 음식이면 홍콩, 코타이·구시가지 광장이면 마카오. /stories/hong-kong·/stories/macau를 본 뒤 /decide.",
          "Con solo tres días, la mayoría elige una base. Hong Kong si mandan calles-puerto y comida en tránsito; Macao si bastan Cotai y plazas. Lee /stories/hong-kong y /stories/macau, luego /decide."
        ),
      },
      {
        q: L("Can I do both in one weekend?", "一个周末能两个都去吗？", "주말에 둘 다 가능할까?", "¿Puedo hacer ambas en un fin de semana?"),
        a: L(
          "Possible but rushed. Ferry or bridge transfers eat half-days. Prefer one city done well unless you already know both maps. Put real flight hours into /decide.",
          "可以但很赶。渡轮或大桥会吃掉半天。除非你已熟两地地图，否则宁可把一座看透。把真实航程放进 /decide。",
          "가능하지만 빠듯합니다. 페리·다리가 반나절을 먹습니다. 지도를 이미 아는 게 아니면 한 곳을 제대로. 실제 항공은 /decide에.",
          "Posible pero apresurado. Ferry o puente comen medias jornadas. Prefiere una ciudad bien vista. Mete horas reales en /decide."
        ),
      },
    ],
    relatedCitySlugs: ["hong-kong", "macau"],
    relatedStorySlugs: ["hong-kong", "macau"],
  },

  {
    slug: "tokyo-vs-singapore",
    title: L("Tokyo vs Singapore: which Asia hub trip fits?", "东京 vs 新加坡：哪次亚洲枢纽更合适？", "도쿄 vs 싱가포르: 어느 아시아 허브가 맞을까?", "Tokio vs Singapur: ¿qué hub de Asia encaja?"),
    oneLiner: L(
      "Tokyo wins for neighborhood depth and food marathon days; Singapore wins for planning ease, polish, and warmer evenings most of the year.",
      "东京胜在街区深度与美食马拉松；新加坡胜在规划轻松、整洁，以及一年多数时候更暖的夜晚。",
      "도쿄는 동네 깊이와 미식 마라톤에서, 싱가포르는 계획 용이·정돈·연중 더 따뜻한 저녁에서 앞섭니다.",
      "Tokio gana en profundidad de barrios y maratones de comida; Singapur en facilidad, pulido y noches más cálidas casi todo el año."
    ),
    aName: L("Tokyo", "东京", "도쿄", "Tokio"),
    bName: L("Singapore", "新加坡", "싱가포르", "Singapur"),
    aBestFor: [
      L("Neighborhood hopping by train", "坐电车跳街区", "전철로 동네 이동", "Saltar barrios en tren"),
      L("Deep food exploration", "深度吃货", "깊은 미식", "Exploración gastronómica"),
    ],
    bBestFor: [
      L("First Asia hub with easy English", "英语轻松的第一亚洲枢纽", "영어 편한 첫 아시아 허브", "Primer hub Asia con inglés fácil"),
      L("Warm evenings and garden-city pacing", "暖夜与花园城市节奏", "따뜻한 저녁·가든시티 속도", "Noches cálidas y ritmo garden-city"),
    ],
    pickWhenA: [
      L("You want maximum ward variety and Japan food depth on one trip.", "你想一次行程里拿到最大区级多样性与日本美食深度。", "한 번에 구(ward) 다양성과 일본 미식 깊이를 원할 때.", "Quieres máxima variedad de barrios y profundidad japonesa."),
      L("Cooler seasons are fine if the culture payoff is higher.", "若文化回报更高，凉一点的季节也能接受。", "문화 보상이 크면 더 선선한 계절도 괜찮을 때.", "El clima más fresco vale si la cultura compensa."),
    ],
    pickWhenB: [
      L("You want warm nights, clear signage, and lower planning friction.", "你想要暖夜、清晰标识和更低的规划摩擦。", "따뜻한 밤·명확한 표지·낮은 계획 마찰을 원할 때.", "Quieres noches cálidas, señalética clara y menos fricción."),
      L("A polished city break matters more than neighborhood marathon days.", "更看重精致城市短途，而不是街区马拉松。", "동네 마라톤보다 정돈된 시티 브레이크가 중요할 때.", "Importa más una escapada pulida que un maratón de barrios."),
    ],
    factors: [
      factor("Food depth", "美食深度", "음식 깊이", "Profundidad comida", "strong", "good"),
      factor("Planning ease", "规划轻松度", "계획 용이", "Facilidad de plan", "good", "strong"),
      factor("Warm evenings", "暖夜", "따뜻한 저녁", "Noches cálidas", "mixed", "strong"),
      factor("Neighborhood variety", "街区多样性", "동네 다양성", "Variedad de barrios", "strong", "good"),
      factor("First-timer clarity", "初次清晰度", "첫 방문 명확도", "Claridad debutante", "good", "strong"),
    ],
    verdict: L(
      "Pick Tokyo for depth and food marathon days; pick Singapore when warmth and planning ease matter more on a first hub trip.",
      "要深度与美食马拉松选东京；第一次枢纽更看重温暖与规划轻松选新加坡。",
      "깊이와 미식 마라톤이면 도쿄, 첫 허브에서 따뜻함·계획 용이면 싱가포르.",
      "Elige Tokio por profundidad; Singapur si calor y facilidad mandan en un primer hub."
    ),
    tradeoffs: L(
      "Tokyo needs more days to feel complete across wards; winter evenings are cooler. Singapore can feel costly for some travelers and less “neighborhood maze” than Tokyo — a feature if you want clarity.",
      "东京要更多天才有跨区「玩透」感；冬夜更凉。新加坡对部分人偏贵，也少一点东京式街区迷宫——想清晰反而是优点。",
      "도쿄는 구를 넘기려면 날이 더 필요하고 겨울 저녁이 더 춥습니다. 싱가포르는 비쌀 수 있고 도쿄식 미로감이 덜합니다 — 명확함을 원하면 장점.",
      "Tokio pide más días para sentirse completo; las noches de invierno son más frescas. Singapur puede salir caro y con menos laberinto de barrios — ventaja si quieres claridad."
    ),
    faq: [
      {
        q: L("Better for a first Asia trip?", "第一次去亚洲哪个更好？", "첫 아시아 여행엔 어디?", "¿Mejor para un primer viaje a Asia?"),
        a: L(
          "Singapore often feels clearer for first-timers who want English-heavy signage and warm weather. Tokyo rewards travelers ready for denser transit and neighborhood hopping. Confirm flight hours on /decide.",
          "想要英语标识多、天气更暖，新加坡往往更清晰。东京适合能接受更密交通与跳街区的人。在 /decide 确认航程。",
          "영어 표지·따뜻한 날씨를 원하면 싱가포르가 더 명확한 편. 도쿄는 밀집 교통과 동네 이동을 감수할 때. /decide에서 항공 확인.",
          "Singapur suele ser más claro para debutantes; Tokio premia a quien acepta tránsito denso. Confirma vuelos en /decide."
        ),
      },
    ],
    relatedCitySlugs: ["tokyo", "singapore"],
  },

  {
    slug: "seoul-vs-taipei",
    title: L("Seoul vs Taipei: food and short city days", "首尔 vs 台北：吃与短城市日怎么选", "서울 vs 타이베이: 음식과 짧은 도시 일정", "Seúl vs Taipéi: comida y días urbanos cortos"),
    oneLiner: L(
      "Seoul often wins for nightlife energy and Korean food density; Taipei often wins for night markets, warmer evenings, and a softer mid-range budget.",
      "首尔常在夜生活能量与韩餐密度上更强；台北常在夜市、更暖的夜晚与更柔的中档预算上占优。",
      "서울은 나이트 에너지·한식 밀도에서, 타이베이는 야시장·더 따뜻한 저녁·부드러운 중예산에서 자주 앞섭니다.",
      "Seúl suele ganar en noche y densidad coreana; Taipéi en mercados nocturnos, noches más cálidas y presupuesto medio más suave."
    ),
    aName: L("Seoul", "首尔", "서울", "Seúl"),
    bName: L("Taipei", "台北", "타이베이", "Taipéi"),
    aBestFor: [
      L("Nightlife and youth streets", "夜生活与年轻街道", "나이트·젊은 거리", "Noche y calles jóvenes"),
      L("Korean food density", "韩餐密度", "한식 밀도", "Densidad de comida coreana"),
    ],
    bBestFor: [
      L("Night markets and everyday food", "夜市与日常餐饮", "야시장·일상 식사", "Mercados nocturnos y comida diaria"),
      L("Warmer short breaks", "偏暖的短途", "따뜻한 단기", "Escapadas más cálidas"),
    ],
    pickWhenA: [
      L("Late nights, K-food, and a younger street vibe are the point.", "深夜、韩餐与年轻街头气质才是重点。", "늦은 밤·한식·젊은 거리 기운이 목적일 때.", "Noches largas, comida coreana y vibe joven son el punto."),
      L("You already compared Tokyo and still want a Korea-first city.", "你已对比过东京，仍想要韩国优先的城市。", "도쿄와 비교한 뒤에도 한국 우선 도시를 원할 때.", "Ya comparaste Tokio y aún quieres una ciudad Corea-first."),
    ],
    pickWhenB: [
      L("Night markets and mild evenings matter more than nightlife clubs.", "更看重夜市与温和夜晚，而不是夜店。", "클럽보다 야시장·온화한 저녁이 중요할 때.", "Importan más mercados nocturnos y noches suaves que clubs."),
      L("You want a softer hotel and food bill on a short Asia hop.", "你想在短途亚洲跳上更柔的住宿和餐饮账单。", "짧은 아시아 이동에서 더 부드러운 숙식비를 원할 때.", "Quieres una cuenta de hotel y comida más suave en un salto corto."),
    ],
    factors: [
      factor("Food", "美食", "음식", "Comida", "strong", "strong"),
      factor("Nightlife", "夜生活", "나이트", "Vida nocturna", "strong", "good"),
      factor("Warm evenings", "暖夜", "따뜻한 저녁", "Noches cálidas", "mixed", "strong"),
      factor("Value", "性价比", "가성비", "Valor", "good", "strong"),
      factor("Hills / walking", "坡度 / 步行", "언덕·도보", "Cuestas / caminar", "mixed", "good"),
    ],
    verdict: L(
      "Pick Seoul for nightlife and Korean food density; pick Taipei when night markets and warmer evenings stretch the same short trip.",
      "要夜生活与韩餐密度选首尔；夜市与更暖夜晚更能拉长同一次短途选台北。",
      "나이트·한식 밀도면 서울, 야시장·따뜻한 저녁이 같은 짧은 여행을 늘리면 타이베이.",
      "Elige Seúl por noche y comida coreana; Taipéi si mercados y noches cálidas estiran el mismo viaje corto."
    ),
    tradeoffs: L(
      "Seoul winters are colder; hills near some neighborhoods add effort. Taipei summers are hot and humid with typhoon risk — shoulder months feel better for walking.",
      "首尔冬天更冷；部分街区附近的坡会加体力。台北夏天湿热有台风风险——肩季更适合步行。",
      "서울 겨울이 더 춥고 일부 동네 언덕이 부담입니다. 타이베이 여름은 덥고 습하며 태풍 위험이 있어 어깨 시즌이 걷기에 낫습니다.",
      "Los inviernos de Seúl son más fríos; las cuestas suman esfuerzo. Los veranos de Taipéi son húmedos con tifones — los meses intermedios caminan mejor."
    ),
    faq: [
      {
        q: L("Seoul or Taipei for food?", "吃货选首尔还是台北？", "음식만 보면 서울 vs 타이베이?", "¿Seúl o Taipéi para comida?"),
        a: L(
          "Both excel. Seoul leans BBQ, late-night streets, and Korean classics; Taipei leans night markets and everyday excellence. Budget and weather decide as much as taste.",
          "都很强。首尔偏烧烤、深夜街道与韩式经典；台北偏夜市与日常高水准。预算和天气往往跟口味一样决定。",
          "둘 다 강합니다. 서울은 BBQ·심야 거리·한식 클래식, 타이베이는 야시장·일상 미식. 예산·날씨도 취향만큼 결정적입니다.",
          "Ambas excelentes. Seúl hacia BBQ y noches; Taipéi hacia mercados. Presupuesto y clima pesan tanto como el gusto."
        ),
      },
    ],
    relatedCitySlugs: ["seoul", "taipei"],
  },

  {
    slug: "hong-kong-vs-shanghai",
    title: L("Hong Kong vs Shanghai: which city trip fits?", "香港 vs 上海：哪次城市行更合适？", "홍콩 vs 상하이: 어디에 더 맞을까?", "Hong Kong vs Shanghái: ¿qué viaje urbano encaja?"),
    oneLiner: L(
      "Hong Kong wins for harbor drama, compact transit, and Cantonese food density; Shanghai wins for Bund-and-lane scale, mainland megacity energy, and a wider modern-China map.",
      "香港胜在海港戏剧感、紧凑交通与粤菜密度；上海胜在外滩与弄堂的体量、内地大都市能量，以及更广的现代中国地图。",
      "홍콩은 항구 드라마·콤팩트 교통·광둥 음식 밀도에서, 상하이는 Bund·골목 규모·본토 메가시티 에너지와 더 넓은 현대 중국 지도에서 앞섭니다.",
      "Hong Kong gana en drama de puerto, tránsito compacto y densidad cantonesa; Shanghái en escala Bund-callejones, energía de megaciudad y un mapa de China moderna más amplio."
    ),
    aName: L("Hong Kong", "香港", "홍콩", "Hong Kong"),
    bName: L("Shanghai", "上海", "상하이", "Shanghái"),
    aBestFor: [
      L("Harbor + street contrast on a short trip", "短途里的海港与街道反差", "짧은 일정의 항구·거리 대비", "Contraste puerto-calle en viaje corto"),
      L("Cantonese food and dense MTR days", "粤菜与密集地铁日", "광둥 음식·밀집 MTR 일정", "Comida cantonesa y días de MTR densos"),
    ],
    bBestFor: [
      L("Bund skyline + lane neighborhoods", "外滩天际线 + 弄堂街区", "Bund 스카이라인 + 골목 동네", "Skyline del Bund + callejones"),
      L("Mainland megacity first look", "第一次看内地大都市", "본토 메가시티 첫인상", "Primera mirada a megaciudad continental"),
    ],
    pickWhenA: [
      L("You want Victoria Harbour and steep-street food density without a huge mainland map.", "你想要维港与陡街美食密度，又不想啃一张超大的内地地图。", "빅토리아 하버·가파른 거리 음식 밀도를 원하면서 거대한 본토 지도는 원치 않을 때.", "Quieres Victoria Harbour y densidad de comida en cuestas sin un mapa continental enorme."),
      L("A compact 3–4 night city break is the whole trip.", "整个行程就是紧凑的 3–4 晚城市短途。", "여행 전체가 콤팩트한 3–4박 시티 브레이크일 때.", "El viaje entero es una escapada urbana compacta de 3–4 noches."),
    ],
    pickWhenB: [
      L("You want Bund nights, French Concession lanes, and a sense of Shanghai’s scale.", "你想要外滩夜晚、法租界弄堂，以及上海体量的感觉。", "Bund 밤·프랑스 조계 골목·상하이 규모감을 원할 때.", "Quieres noches del Bund, callejones de la Concesión Francesa y la escala de Shanghái."),
      L("The trip is a first mainland China megacity sample, not a Pearl River Delta hop.", "这次是第一次内地大都市采样，不是珠三角短跳。", "주강 삼각주 짧은 점프가 아니라 첫 본토 메가시티 샘플일 때.", "Es una primera muestra de megaciudad continental, no un salto del delta."),
    ],
    factors: [
      factor("Harbor / skyline", "海港 / 天际线", "항구·스카이라인", "Puerto / skyline", "strong", "strong"),
      factor("Compact walking", "紧凑步行", "콤팩트 도보", "Caminar compacto", "strong", "mixed"),
      factor("Food density", "美食密度", "음식 밀도", "Densidad comida", "strong", "strong"),
      factor("Megacity scale", "大都市体量", "메가시티 규모", "Escala megaciudad", "good", "strong"),
      factor("Short-trip fit", "短途适合度", "짧은 일정 적합", "Encaje viaje corto", "strong", "good"),
    ],
    verdict: L(
      "Pick Hong Kong for a compact harbor-and-street break; pick Shanghai when Bund scale and mainland megacity energy are the point.",
      "要紧凑的海港与街道短途选香港；外滩体量与内地大都市能量才是重点选上海。",
      "콤팩트한 항구·거리 브레이크면 홍콩, Bund 규모와 본토 메가시티 에너지가 목적이면 상하이.",
      "Elige Hong Kong por una escapada compacta puerto-calle; Shanghái si manda la escala del Bund y la energía continental."
    ),
    tradeoffs: L(
      "Hong Kong hills and humidity tire some groups. Shanghai’s metro map is huge — stuffing “see everything” into four nights usually means you only see the Bund spine. Visa and entry rules differ by passport; confirm before you book.",
      "香港的坡与潮湿会累到部分人。上海地铁地图很大——四晚硬塞「全看完」往往只剩外滩主轴。签证与入境因护照而异，订票前自行确认。",
      "홍콩 언덕·습도는 부담일 수 있습니다. 상하이 지하철 지도는 거대합니다 — 4박에 ‘다 보기’는 대개 Bund 축만 남깁니다. 비자·입국은 여권마다 다릅니다.",
      "Las cuestas y la humedad de Hong Kong cansan. El metro de Shanghái es enorme — en cuatro noches suele quedar solo el eje del Bund. Visa y entrada varían por pasaporte."
    ),
    faq: [
      {
        q: L("Hong Kong or Shanghai for 4 days?", "香港和上海，4 天选哪个？", "홍콩 vs 상하이, 4일이면 어디?", "¿Hong Kong o Shanghái para 4 días?"),
        a: L(
          "Hong Kong’s compact map often fits 4 days better. Shanghai can work if you pick one spine (Bund + one neighborhood) and skip “see the whole city.” Put your origin flight into /decide.",
          "香港地图更紧凑，4 天往往更合适。上海也能 4 天——若只选一条主轴（外滩 + 一个街区）、不追求全城。把出发航班放进 /decide。",
          "홍콩의 콤팩트 지도가 4일에 더 잘 맞는 편. 상하이도 Bund+동네 하나면 가능. 출발 항공은 /decide에.",
          "El mapa compacto de Hong Kong suele encajar mejor en 4 días. Shanghái puede funcionar con un eje (Bund + un barrio). Mete el vuelo en /decide."
        ),
      },
      {
        q: L("Which is better for food?", "吃货哪个更好？", "음식만 보면 어디?", "¿Cuál es mejor para comida?"),
        a: L(
          "Both are excellent. Hong Kong leans Cantonese, dai pai dong energy, and harbor-city density; Shanghai leans Shanghainese classics, lanes, and a wider mainland restaurant map. Budget and walking pace decide as much as taste.",
          "都很强。香港偏粤菜、大排档能量与港口城市密度；上海偏本帮菜、弄堂与更广的内地餐饮地图。预算和步行节奏往往跟口味一样关键。",
          "둘 다 강합니다. 홍콩은 광둥·노점 에너지, 상하이는 본帮·골목·더 넓은 본토 식당 지도. 예산·걷기 속도도 취향만큼 결정적입니다.",
          "Ambas excelentes. Hong Kong hacia lo cantonés; Shanghái hacia clásicos locales y callejones. Presupuesto y ritmo pesan tanto como el gusto."
        ),
      },
    ],
    relatedCitySlugs: ["hong-kong", "shanghai"],
    relatedStorySlugs: ["hong-kong"],
  },

  {
    slug: "tokyo-vs-shanghai",
    title: L("Tokyo vs Shanghai: Japan or China megacity?", "东京 vs 上海：日本还是中国大都市？", "도쿄 vs 상하이: 일본 vs 중국 메가시티?", "Tokio vs Shanghái: ¿Japón o megaciudad china?"),
    oneLiner: L(
      "Tokyo wins for neighborhood depth, transit clarity for many first-timers, and a Japan food marathon; Shanghai wins for Bund drama, lane texture, and a first mainland China megacity sample.",
      "东京胜在街区深度、许多初次访客更清晰的交通，以及日本美食马拉松；上海胜在外滩戏剧感、弄堂质感，以及第一次内地大都市采样。",
      "도쿄는 동네 깊이·많은 첫 방문객에게 더 명확한 교통·일본 미식 마라톤에서, 상하이는 Bund 드라마·골목 질감·첫 본토 메가시티 샘플에서 앞섭니다.",
      "Tokio gana en profundidad de barrios, claridad de tránsito para muchos debutantes y maratón gastronómico japonés; Shanghái en drama del Bund, textura de callejones y una primera muestra de megaciudad continental."
    ),
    aName: L("Tokyo", "东京", "도쿄", "Tokio"),
    bName: L("Shanghai", "上海", "상하이", "Shanghái"),
    aBestFor: [
      L("Neighborhood hopping by train", "坐电车跳街区", "전철로 동네 이동", "Saltar barrios en tren"),
      L("Japan food and culture depth", "日本美食与文化深度", "일본 미식·문화 깊이", "Profundidad japonesa"),
    ],
    bBestFor: [
      L("Bund + lane city contrast", "外滩 + 弄堂城市反差", "Bund + 골목 도시 대비", "Contraste Bund y callejones"),
      L("Mainland China megacity first trip", "第一次内地中国大都市", "첫 본토 중국 메가시티", "Primera megaciudad continental"),
    ],
    pickWhenA: [
      L("Japan itself is the priority destination — not “Asia somewhere.”", "日本本身是优先目的地，不只是「亚洲随便哪」。", "일본 자체가 우선 목적지일 때 — ‘아시아 어딘가’가 아니라.", "Japón es el destino prioritario, no solo “Asia en algún sitio”."),
      L("You want ward variety and denser neighborhood evenings over one skyline spine.", "你想要区级多样性与更密的街区夜晚，而不是一条天际线主轴。", "스카이라인 한 축보다 구(ward) 다양성과 더 밀한 동네 저녁을 원할 때.", "Quieres variedad de barrios y noches densas más que un solo eje de skyline."),
    ],
    pickWhenB: [
      L("You want a first look at a mainland China megacity with Bund nights.", "你想第一次看内地大都市，并有外滩夜晚。", "Bund 밤이 있는 첫 본토 메가시티를 원할 때.", "Quieres una primera mirada a una megaciudad continental con noches del Bund."),
      L("The trip is China-first, and Tokyo can wait for a later Japan window.", "这次以中国为先，东京可以留给下一次日本窗口。", "이번은 중국 우선이고 도쿄는 다음 일본 일정으로 미뤄도 될 때.", "El viaje es China-first y Tokio puede esperar a otra ventana Japón."),
    ],
    factors: [
      factor("Food depth", "美食深度", "음식 깊이", "Profundidad comida", "strong", "strong"),
      factor("Neighborhood variety", "街区多样性", "동네 다양성", "Variedad de barrios", "strong", "good"),
      factor("Skyline drama", "天际线戏剧感", "스카이라인 드라마", "Drama de skyline", "good", "strong"),
      factor("First-timer clarity", "初次清晰度", "첫 방문 명확도", "Claridad debutante", "strong", "good"),
      factor("Trip length needed", "需要的行程天数", "필요한 일정 길이", "Días que pide", "mixed", "good"),
    ],
    verdict: L(
      "Pick Tokyo when Japan depth is the trip; pick Shanghai when mainland megacity + Bund contrast is the point.",
      "日本深度才是行程选东京；内地大都市 + 外滩反差才是重点选上海。",
      "일본 깊이가 목적이면 도쿄, 본토 메가시티+Bund 대비가 목적이면 상하이.",
      "Elige Tokio si manda la profundidad japonesa; Shanghái si manda megaciudad continental + contraste Bund."
    ),
    tradeoffs: L(
      "Tokyo needs more days to feel complete across wards; winter evenings are cooler. Shanghai can feel vast and smoggy on bad air days — pick one or two districts. Entry rules and flight hours from your origin often decide more than vibes.",
      "东京要更多天才有跨区「玩透」感；冬夜更凉。上海在空气差的日子可能显得很大、灰——先选一两个区。出发地航程与入境规则往往比气质更决定。",
      "도쿄는 구를 넘기려면 날이 더 필요하고 겨울 저녁이 더 춥습니다. 상하이는 대기 나쁜 날 광활·흐릿할 수 있어 구 1–2개만 고르세요. 출발 항공·입국 규칙이 분위기보다 결정적일 때가 많습니다.",
      "Tokio pide más días; las noches de invierno son más frescas. Shanghái puede sentirse vasto — elige uno o dos distritos. Vuelos y entrada suelen pesar más que el vibe."
    ),
    faq: [
      {
        q: L("Better for a first Asia megacity?", "第一次亚洲大都市哪个更好？", "첫 아시아 메가시티엔 어디?", "¿Mejor para una primera megaciudad en Asia?"),
        a: L(
          "Tokyo often feels clearer for transit-and-neighborhood first-timers. Shanghai fits if China is the priority and you accept a bigger map. Confirm visas and flight hours on /decide — do not pick on skyline photos alone.",
          "想要交通与街区更清晰，东京往往更合适。若中国是优先且能接受更大地图，选上海。在 /decide 确认签证与航程——别只凭天际线照片选。",
          "교통·동네가 더 명확하길 원하면 도쿄가 자주 낫습니다. 중국이 우선이고 큰 지도를 감수하면 상하이. /decide에서 비자·항공 확인 — 스카이라인 사진만으로 고르지 마세요.",
          "Tokio suele ser más claro para debutantes. Shanghái encaja si China es prioritaria. Confirma visados y vuelos en /decide."
        ),
      },
    ],
    relatedCitySlugs: ["tokyo", "shanghai"],
  },

  {
    slug: "xian-vs-shanghai",
    title: L("Xi'an vs Shanghai: history China or modern coast?", "西安 vs 上海：历史中国还是现代海岸？", "시안 vs 상하이: 역사 중국 vs 현대 해안?", "Xi'an vs Shanghái: ¿China histórica o costa moderna?"),
    oneLiner: L(
      "Xi'an wins for walls, tombs, and a history-first China trip; Shanghai wins for Bund nights, lanes, and modern megacity pacing.",
      "西安胜在城墙、陵墓与以历史为主线的中国行；上海胜在外滩夜晚、弄堂与现代大都市节奏。",
      "시안은 성벽·능묘·역사 중심 중국 여행에서, 상하이는 Bund 밤·골목·현대 메가시티 속도에서 앞섭니다.",
      "Xi'an gana en murallas, tumbas y un viaje China-historia; Shanghái en noches del Bund, callejones y ritmo de megaciudad moderna."
    ),
    aName: L("Xi'an", "西安", "시안", "Xi'an"),
    bName: L("Shanghai", "上海", "상하이", "Shanghái"),
    aBestFor: [
      L("History and archaeology days", "历史与考古日", "역사·고고 일정", "Días de historia y arqueología"),
      L("City wall + old-town pacing", "城墙 + 老城节奏", "성벽 + 구시가지 속도", "Muralla + ritmo de casco"),
    ],
    bBestFor: [
      L("Modern skyline and lane food", "现代天际线与弄堂美食", "현대 스카이라인·골목 음식", "Skyline moderno y comida de callejón"),
      L("Coastal megacity energy", "沿海大都市能量", "해안 메가시티 에너지", "Energía de megaciudad costera"),
    ],
    pickWhenA: [
      L("Terracotta / wall days are the reason you came to China this time.", "兵马俑 / 城墙日才是这次来中国的理由。", "병마용·성벽 일정이 이번 중국행의 이유일 때.", "Los días de terracota/muralla son la razón de venir a China."),
      L("You want a clearer “old China” story than a Bund skyline trip.", "你想要比外滩天际线更清晰的「老中国」故事。", "Bund 스카이라인보다 더 선명한 ‘옛 중국’ 이야기를 원할 때.", "Quieres una historia de “China antigua” más clara que un viaje de skyline."),
    ],
    pickWhenB: [
      L("Bund nights, shopping streets, and modern China pacing are the point.", "外滩夜晚、购物街与现代中国节奏才是重点。", "Bund 밤·쇼핑 거리·현대 중국 속도가 목적일 때.", "El punto son noches del Bund, calles comerciales y ritmo moderno."),
      L("You prefer one coastal hub with dense metro food over tomb day-trips.", "你更喜欢一个沿海枢纽 + 密集地铁美食，而不是陵墓一日游。", "능묘 당일치기보다 해안 허브+밀집 지하철 음식을 선호할 때.", "Prefieres un hub costero con comida en metro denso a excursiones a tumbas."),
    ],
    factors: [
      factor("History depth", "历史深度", "역사 깊이", "Profundidad histórica", "strong", "mixed"),
      factor("Modern skyline", "现代天际线", "현대 스카이라인", "Skyline moderno", "weaker", "strong"),
      factor("Food variety", "餐饮多样性", "음식 다양성", "Variedad comida", "good", "strong"),
      factor("Walkable core", "可步行核心", "걷기 좋은 핵심", "Núcleo caminable", "strong", "good"),
      factor("First China story", "第一次中国故事清晰度", "첫 중국 이야기 명확도", "Claridad primera China", "strong", "good"),
    ],
    verdict: L(
      "Pick Xi'an for a history-first China trip; pick Shanghai when modern coast and Bund contrast matter more.",
      "以历史为主线的中国行选西安；更看重现代海岸与外滩反差选上海。",
      "역사 중심 중국 여행이면 시안, 현대 해안·Bund 대비가 더 중요하면 상하이.",
      "Elige Xi'an por China-historia; Shanghái si mandan costa moderna y contraste Bund."
    ),
    tradeoffs: L(
      "Xi'an day trips to major sites need early starts and transport buffers. Shanghai’s map is huge — four nights without a district plan feel unfinished. Neither replaces the other; combining both usually wants a week-plus China itinerary.",
      "西安去主要遗址需要早起和交通缓冲。上海地图很大——四晚没有分区计划会觉得没看完。两者不能互相替代；两个都去通常要一周以上的中国行程。",
      "시안 주요 유적은 이른 출발·이동 버퍼가 필요합니다. 상하이 지도는 커서 구 계획 없는 4박은 미완처럼 느껴집니다. 둘 다 가려면 대개 일주일+ 중국 일정입니다.",
      "Xi'an pide madrugones y márgenes de transporte. Shanghái es enorme sin un plan de distritos. Combinar ambas suele pedir una semana o más."
    ),
    faq: [
      {
        q: L("First trip to China — Xi'an or Shanghai?", "第一次去中国选西安还是上海？", "첫 중국 여행, 시안 vs 상하이?", "¿Primera China — Xi'an o Shanghái?"),
        a: L(
          "If history is why you came, start with Xi'an. If modern megacity nights are why you came, start with Shanghai. Many travelers eventually do both on longer China trips — run your days and Avoid on /decide.",
          "若历史是来的理由，先西安。若现代大都市夜晚是理由，先上海。更长中国行程很多人两个都会去——用天数和 Avoid 跑 /decide。",
          "역사가 이유면 시안부터, 현대 메가시티 밤이 이유면 상하이부터. 긴 중국 일정에선 둘 다 가는 경우가 많습니다 — /decide에 일수·Avoid.",
          "Si viniste por historia, Xi'an. Si por noches de megaciudad, Shanghái. En viajes largos muchos hacen ambas — usa /decide."
        ),
      },
      {
        q: L("Can I do both in one week?", "一周能两个都去吗？", "일주일에 둘 다 가능할까?", "¿Puedo hacer ambas en una semana?"),
        a: L(
          "Possible but tight: high-speed rail links them, yet each city wants real days. Prefer 3+3 or accept one shallow stop. Put exact dates into /decide.",
          "可以但紧：高铁连得上，但每座城市都要实打实的天数。最好 3+3，或接受一地只能浅看。把确切日期放进 /decide。",
          "가능하지만 빠듯합니다. 고속철은 잇지만 각 도시에 날이 필요합니다. 3+3이 낫거나 한쪽은 얕게. 정확한 날짜는 /decide에.",
          "Posible pero justo: el AVE las une, pero cada ciudad pide días reales. Prefiere 3+3. Mete fechas en /decide."
        ),
      },
    ],
    relatedCitySlugs: ["xian", "shanghai"],
  },

]

export function getCompare(slug: string) {
  return compares.find((item) => item.slug === slug)
}
