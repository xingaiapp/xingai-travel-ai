import type { GuidePage, Localized } from "@/lib/content/types"

const L = (en: string, zh: string, ko: string, es: string): Localized => ({ en, zh, ko, es })

export const guides: GuidePage[] = [
  {
    slug: "where-to-travel-in-november",
    title: L("Where should I travel in November?", "十一月适合去哪里旅行？", "11월에 어디로 여행할까?", "¿Adónde viajar en noviembre?"),
    oneLiner: L(
      "November favors mild-to-warm cities for many northern-hemisphere travelers — but the best pick still depends on your origin, budget, and pace.",
      "对许多北半球旅客，十一月更偏温和到温暖的城市——但最佳选择仍取决于出发地、预算和节奏。",
      "북반구 여행자에게 11월은 온화~따뜻한 도시가 유리한 경우가 많지만, 최적은 여전히 출발지·예산·속도에 달립니다.",
      "Noviembre favorece ciudades templadas o cálidas para muchos viajeros del norte — pero lo mejor sigue dependiendo de origen, presupuesto y ritmo."
    ),
    body: [
      L(
        "Start with weather for your exact dates, then flight time from your home airport, then budget. A best-November list without those constraints is noise.",
        "先看你确切日期的天气，再看出发机场的航程，再看预算。没有这些约束的十一月最佳清单只是噪音。",
        "정확한 날짜의 날씨 → 홈 공항 항공 시간 → 예산 순으로 보세요. 조건 없는 11월 베스트는 소음입니다.",
        "Empieza por el clima de tus fechas, luego el vuelo desde tu aeropuerto, luego el presupuesto. Una lista de noviembre sin eso es ruido."
      ),
      L(
        "Warm, walkable, food-forward cities often surface for couples and short city breaks. Shoulder season can mean softer crowds than peak summer.",
        "温暖、好走、吃货友好的城市常出现在情侣与短途城市游里。肩季人流往往比盛夏柔和。",
        "따뜻하고 걷기 좋으며 음식이 강한 도시가 커플·단기 시티브레이크에 자주 뜹니다. 어깨 시즌은 한여름보다 덜 붐빌 수 있습니다.",
        "Ciudades cálidas, caminables y gastronómicas suelen aparecer para parejas y escapadas cortas. La temporada media puede traer menos muchedumbre que el verano."
      ),
    ],
    candidates: [
      L("Taipei — warmth + food", "台北 — 温暖 + 美食", "타이베이 — 따뜻함 + 음식", "Taipéi — calor + comida"),
      L("Tokyo — city depth if you accept cooler evenings", "东京 — 能接受凉夜则深度城市", "도쿄 — 선선한 저녁을 감수하면 도시 깊이", "Tokio — profundidad urbana si aceptas noches más frescas"),
      L("Mexico City — food + culture for many US origins", "墨西哥城 — 对许多美国出发地：美食 + 文化", "멕시코시티 — 많은 미국 출발지에 음식+문화", "Ciudad de México — comida + cultura desde muchos orígenes US"),
      L("Lisbon — mild Atlantic light for Europe hops", "里斯本 — 欧洲短途的温和大西洋光线", "리스본 — 유럽 단거리에 온화한 대서양 빛", "Lisboa — luz atlántica suave para saltos europeos"),
    ],
    faq: [
      {
        q: L("Best warm destinations in November?", "十一月温暖目的地？", "11월 따뜻한 목적지는?", "¿Mejores destinos cálidos en noviembre?"),
        a: L(
          "It depends on your definition of warm and your flight budget. Use Surprise me or Compare on /decide with warm weather in notes.",
          "取决于你对温暖的定义和机票预算。在 /decide 用 Surprise me 或 Compare，并在备注写要温暖天气。",
          "따뜻한의 정의와 항공 예산에 달립니다. /decide에서 Surprise me 또는 Compare로 노트에 따뜻한 날씨를 넣으세요.",
          "Depende de qué sea cálido para ti y de tu presupuesto de vuelo. Usa Surprise me o Compare en /decide con clima cálido en notas."
        ),
      },
    ],
    relatedCompareSlugs: ["tokyo-vs-taipei", "tokyo-vs-seoul"],
  },
  {
    slug: "best-warm-destinations",
    title: L("Best warm destinations (decision guide)", "温暖目的地怎么选（决策指南）", "따뜻한 목적지 고르는 법", "Mejores destinos cálidos (guía de decisión)"),
    oneLiner: L(
      "Warm is a constraint, not a destination list. Pair it with flight length, budget, and whether you want beach or city.",
      "温暖是约束，不是清单。还要配航程、预算，以及要海滨还是城市。",
      "따뜻함은 제약이지 목록이 아닙니다. 항공 시간·예산·해변 vs 도시를 함께 보세요.",
      "Cálido es una restricción, no una lista. Combínalo con duración de vuelo, presupuesto y playa vs ciudad."
    ),
    body: [
      L(
        "Say what warm means (beach heat vs mild city). Avoid destinations that fight your avoid list (long flights, extreme heat).",
        "说清温暖指海滨酷热还是温和城市。避开与你的 Avoid 冲突的目的地（长途、极端炎热）。",
        "따뜻함이 해변 더위인지 온화한 도시인지 말하세요. Avoid(장거리·極端 더위)와 충돌하는 곳은 피하세요.",
        "Define cálido (calor de playa vs ciudad templada). Evita destinos que choquen con tu lista Avoid."
      ),
    ],
    candidates: [
      L("Taipei / southern cities for mild-warm city food trips", "台北等偏暖城市美食行", "타이베이 등 온난 도시 미식", "Taipéi y ciudades templado-cálidas gastronómicas"),
      L("Mexico City for many North America origins", "对许多北美出发地：墨西哥城", "많은 북미 출발지에 멕시코시티", "CDMX desde muchos orígenes de Norteamérica"),
      L("Island or beach picks only if pace allows transfers", "只有节奏允许转机时才选海岛", "환승을 감당할 속도일 때만 섬·해변", "Islas/playa solo si el ritmo admite traslados"),
    ],
    faq: [
      {
        q: L("Warm city without a car?", "要温暖城市又不想开车？", "차 없이 따뜻한 도시는?", "¿Ciudad cálida sin coche?"),
        a: L(
          "Prioritize walkability and transit. Mark minimal driving in Avoid / notes, then compare on /decide.",
          "优先步行友好与公共交通。在 Avoid/备注写少开车，再到 /decide 比较。",
          "도보·대중교통을 우선하세요. Avoid/노트에 운전 최소화를 넣고 /decide에서 비교하세요.",
          "Prioriza caminabilidad y transporte. Pon poco conducir en Avoid/notas y compara en /decide."
        ),
      },
    ],
    relatedCompareSlugs: ["tokyo-vs-taipei"],
  },
  {
    slug: "best-walkable-cities",
    title: L("Best walkable cities for your next trip", "下次旅行：适合步行的城市", "다음 여행에 걷기 좋은 도시", "Mejores ciudades caminables"),
    oneLiner: L(
      "Walkability is one of XingAI Travel core compare factors — great when you want fewer taxis and more street-level discovery.",
      "步行友好是 XingAI Travel 的核心比较因子之一——少打车、多在街巷发现时很重要。",
      "도보 이동은 XingAI Travel 핵심 비교 요인입니다 — 택시 줄이고 거리에서 발견하고 싶을 때.",
      "La caminabilidad es un factor clave de comparación — útil si quieres menos taxis y más descubrimiento a pie."
    ),
    body: [
      L(
        "Hills, heat, and luggage change walkable. Tell the Decision Engine your pace and avoid list, not just a vibe word.",
        "坡度、炎热和行李会改变好不好走。要告诉决策引擎节奏与 Avoid，而不只是一个 vibe 词。",
        "언덕·더위·짐이 걷기 좋음을 바꿉니다. vibe 단어만이 아니라 속도와 Avoid를 엔진에 말하세요.",
        "Colinas, calor y maletas cambian lo caminable. Di ritmo y Avoid al motor, no solo una palabra vibe."
      ),
    ],
    candidates: [
      L("Tokyo neighborhoods for dense transit + walking", "东京：密集交通 + 步行街区", "도쿄: 밀집 교통+걷기", "Barrios de Tokio: tránsito denso + caminar"),
      L("Lisbon — beautiful but hilly", "里斯本 — 美但坡多", "리스본 — 아름답지만 언덕", "Lisboa — bella pero con colinas"),
      L("Hong Kong — vertical city, strong MTR", "香港 — 垂直城市，地铁强", "홍콩 — 수직 도시, MTR 강함", "Hong Kong — ciudad vertical, MTR fuerte"),
    ],
    faq: [
      {
        q: L("Best cities without renting a car?", "不想租车去哪些城市？", "렌트카 없이 좋은 도시는?", "¿Mejores ciudades sin alquilar coche?"),
        a: L(
          "Look for strong metro/rail and compact cores. Put no car in Avoid and run /decide.",
          "找地铁/铁路强、核心区紧凑的城市。Avoid 写不租车，跑 /decide。",
          "지하철·철도가 강하고 중심이 콤팩트한 곳을 보세요. Avoid에 차 없음을 넣고 /decide.",
          "Busca metro/tren fuertes y centros compactos. Pon sin coche en Avoid y usa /decide."
        ),
      },
    ],
    relatedCompareSlugs: ["lisbon-vs-barcelona", "hong-kong-vs-tokyo"],
  },
  {
    slug: "best-trips-under-2000",
    title: L("Best trips under $2,000 (how to decide)", "两千美元内怎么选目的地", "$2,000 이하 여행 고르는 법", "Viajes por menos de $2,000"),
    oneLiner: L(
      "A budget cap is a hard constraint. The Decision Engine should prefer destinations that fit total trip cost — not just cheap hotels.",
      "预算上限是硬约束。决策引擎应优先总费用能装下的目的地——不只是便宜酒店。",
      "예산 상한은 硬约束입니다. 엔진은 호텔만이 아니라 총비용이 맞는 목적지를 선호해야 합니다.",
      "Un tope de presupuesto es una restricción dura. El motor debe preferir destinos que quepan en el costo total — no solo hoteles baratos."
    ),
    body: [
      L(
        "Include flights from your origin. A cheap city far away can blow a $2,000 cap. Use currency and traveler count on /decide.",
        "把出发地机票算进去。远处的便宜城市也能打爆 2000。在 /decide 填货币与人数。",
        "출발지 항공을 포함하세요. 먼 싼 도시도 $2,000를 깨뜨릴 수 있습니다. /decide에 통화·인원을 넣으세요.",
        "Incluye vuelos desde tu origen. Una ciudad barata lejana puede romper $2,000. Usa moneda y viajeros en /decide."
      ),
    ],
    candidates: [
      L("Shorter-haul from your hub often beats far deals", "从枢纽短途往往胜过远处特价", "허브에서 단거리가 먼 특가보다 나을 때가 많음", "Cortos desde tu hub suelen ganar a ofertas lejanas"),
      L("Shoulder season over peak", "肩季优于旺季", "성수기보다 어깨 시즌", "Temporada media mejor que pico"),
      L("City breaks over multi-island hops", "城市短途优于多岛跳岛", "도시 단거리가 다섬 홉보다", "City breaks mejor que hops multi-isla"),
    ],
    faq: [
      {
        q: L("Can I do Tokyo under $2,000?", "两千内能去东京吗？", "$2,000로 도쿄 가능?", "¿Tokio por menos de $2,000?"),
        a: L(
          "Sometimes — for short trips from nearby hubs, careful lodging, and off-peak. From long-haul US origins it is often tight. Let /decide estimate with your real dates.",
          "有时可以——邻近枢纽短途、住宿克制、淡季。从美国长途出发往往很紧。用真实日期在 /decide 估算。",
          "가끔 — 가까운 허브·짧은 일정·숙소 절제·비성수기. 미국 장거리면 빠듯한 경우가 많습니다. 실제 날짜로 /decide.",
          "A veces — viajes cortos desde hubs cercanos, alojamiento cuidadoso y fuera de pico. Desde US long-haul suele ir justo. Estima en /decide."
        ),
      },
    ],
    relatedCompareSlugs: ["tokyo-vs-seoul", "tokyo-vs-taipei"],
  },
  {
    slug: "best-food-cities",
    title: L("Best cities for food lovers (decision-first)", "吃货城市怎么选（先决策）", "미식 도시 고르기 (결정 우선)", "Mejores ciudades para foodies"),
    oneLiner: L(
      "Food-first travel still needs flights, walkability, and budget. We compare those together — not a hype ranking of restaurants.",
      "以吃为主的旅行仍需要航班、步行与预算。我们一起比较——不是餐厅炒作榜。",
      "음식 우선 여행도 항공·도보·예산이 필요합니다. 식당 하입 순위가 아니라 함께 비교합니다.",
      "Viajar por comida aún necesita vuelos, caminabilidad y presupuesto. Comparamos eso junto — no un ranking de hype."
    ),
    body: [
      L(
        "Put food in Style / notes / Surprise priority. Then look at trade-offs: crowds, cost, and how walkable the eating neighborhoods are.",
        "在风格/备注/Surprise 优先级里强调美食。再看取舍：人流、花费、吃饭街区好不好走。",
        "스타일/노트/Surprise 우선순위에 음식을 넣으세요. 그다음 혼잡·비용·미식 동네 도보를 trade-off로 보세요.",
        "Pon comida en estilo/notas/prioridad Surprise. Luego mira muchedumbres, costo y si los barrios gastronómicos son caminables."
      ),
    ],
    candidates: [
      L("Tokyo, Taipei, Hong Kong, Seoul — frequent Asia food shortlists", "东京、台北、香港、首尔 — 常见亚洲美食短名单", "도쿄·타이베이·홍콩·서울 — 흔한 아시아 미식 숏리스트", "Tokio, Taipéi, Hong Kong, Seúl — shortlists frecuentes en Asia"),
      L("Mexico City — strong from many US gateways", "墨西哥城 — 对许多美国门户很强", "멕시코시티 — 많은 미국 관문에서 강함", "CDMX — fuerte desde muchos hubs US"),
      L("Lisbon / Barcelona — European food + walk cities", "里斯本 / 巴塞罗那 — 欧洲美食 + 步行城市", "리스본/바르셀로나 — 유럽 미식+걷기", "Lisboa / Barcelona — comida + caminar en Europa"),
    ],
    faq: [
      {
        q: L("Tokyo vs Seoul for food?", "吃货：东京还是首尔？", "음식으로 도쿄 vs 서울?", "¿Tokio o Seúl para comida?"),
        a: L(
          "Both excellent. See /compare/tokyo-vs-seoul, then run your budget and dates on /decide.",
          "都很强。见 /compare/tokyo-vs-seoul，再用预算和日期跑 /decide。",
          "둘 다 훌륭합니다. /compare/tokyo-vs-seoul을 본 뒤 예산·날짜로 /decide.",
          "Ambas excelentes. Mira /compare/tokyo-vs-seoul y luego /decide con presupuesto y fechas."
        ),
      },
    ],
    relatedCompareSlugs: ["tokyo-vs-seoul", "hong-kong-vs-tokyo", "tokyo-vs-taipei"],
  },
]

export function getGuide(slug: string) {
  return guides.find((item) => item.slug === slug)
}
