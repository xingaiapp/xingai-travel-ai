import type { StoryEpisode, StorySeason, StoryText } from "@/lib/stories/types"

// Privacy rules for this season (see docs/stories/README.md):
// - Corridor / resort beach level only. No room numbers or home address.
// - Hands and distance OK; no clear child faces. Welcome-card personal name cropped out.
// - Every photo goes through scripts/process-story-photos.mjs (strips EXIF/GPS).
// Source: original phone video frames from a Grand Velas Los Cabos stay (not stock / not AI).

function tx(en: string, zh: string, ko: string, es: string): StoryText {
  return { en, zh, ko, es }
}

function shot(
  episode: string,
  name: string,
  width: number,
  height: number,
  alt: StoryText,
  caption?: StoryText,
): StoryEpisode["cover"] {
  return {
    src: `/stories/los-cabos/${episode}/${name}`,
    width,
    height,
    alt,
    ...(caption ? { caption } : {}),
    shot: name,
  }
}

const W = 1600
const H = 2844

const ep01: StoryEpisode = {
  number: 1,
  slug: "01-a-morning-by-the-sea",
  status: "published",
  publishedAt: "2026-10-10",
  title: tx(
    "A Morning by the Sea",
    "海边的清晨",
    "바다 옆의 아침",
    "Una mañana junto al mar",
  ),
  dek: tx(
    "Sunrise, waves, rocks, and the quiet before the day. First light on the shore — the opening of this Los Cabos series.",
    "日出、海浪、岩石与清晨的宁静。从海边的第一缕光开始——适合作为整个系列的开场。",
    "일출, 파도, 바위, 그리고 하루 전의 고요. 해안의 첫빛 — 이 로스카보스 시리즈의 오프닝.",
    "Amanecer, olas, rocas y la quietud de la mañana. Primera luz en la orilla — la apertura de esta serie de Los Cabos.",
  ),
  cover: shot(
    "01",
    "morning-by-the-sea",
    1024,
    576,
    tx(
      "Sunrise behind sea stacks and cliffs on a Los Cabos shore",
      "洛斯卡沃斯海岸，日出从海蚀柱与悬崖后升起",
      "로스카보스 해안, 바다 바위와 절벽 뒤로 뜨는 일출",
      "Amanecer detrás de farallones y acantilados en una orilla de Los Cabos",
    ),
    tx(
      "Series opener — first light, waves, rocks, and quiet.",
      "系列开场——第一缕光、浪、礁石与安静。",
      "시리즈 오프닝 — 첫빛, 파도, 바위, 고요.",
      "Apertura de la serie — primera luz, olas, rocas y quietud.",
    ),
  ),
  blocks: [
    {
      type: "text",
      body: tx(
        "A morning by the sea. Sunrise, waves, rocks, and the quiet before the day fills up — start the series here.",
        "海边的清晨。日出、海浪、岩石，还有白天还没挤满之前的安静——整个系列从这里开始。",
        "바다 옆의 아침. 일출, 파도, 바위, 하루가 차기 전의 고요 — 시리즈는 여기서 시작한다.",
        "Una mañana junto al mar. Amanecer, olas, rocas y la quietud antes de que el día se llene — empieza la serie aquí.",
      ),
    },
    { type: "heading", body: tx("01 — The quiet before", "01 · 安静之前", "01 · 고요한 이전", "01 — Lo quieto antes") },
    {
      type: "text",
      body: tx(
        "First thing in Cabo: get to the shore before the day fills up. The ocean is already telling the story.",
        "来卡波，第一件事：人还没涌上来时先到海边。海已经在讲故事了。",
        "카보에서 첫일: 하루가 차기 전에 해안으로. 바다는 이미 이야기를 한다.",
        "Lo primero en Cabo: llega a la orilla antes de que el día se llene. El océano ya cuenta la historia.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "01",
        "quiet-before-ocean",
        W,
        H,
        tx(
          "Beach cabana and rocks under sunrise rays on a Los Cabos shore",
          "洛斯卡沃斯海边，日出光线下的凉棚与礁石",
          "로스카보스 해변, 일출 빛살 아래 카바나와 바위",
          "Cabaña y rocas bajo rayos de amanecer en una playa de Los Cabos",
        ),
        tx(
          "Before the day gets loud — rocks, a cabana, and the sea.",
          "白天还没吵起来——礁石、凉棚、海。",
          "하루가 시끄러워지기 전 — 바위, 카바나, 바다.",
          "Antes de que el día haga ruido — rocas, una cabaña y el mar.",
        ),
      ),
    },
    { type: "heading", body: tx("02 — First light", "02 · 第一缕光", "02 · 첫빛", "02 — Primera luz") },
    {
      type: "text",
      body: tx(
        "The sun clears the horizon. Footprints in the sand look sharper than they did five minutes ago.",
        "太阳刚越过海平线。沙子上的脚印，比五分钟前更清楚。",
        "해가 수평선을 넘는다. 모래 발자국이 오 분 전보다 또렷하다.",
        "El sol sale del horizonte. Las huellas en la arena se ven más nítidas que hace cinco minutos.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "01",
        "first-light-sky",
        W,
        H,
        tx(
          "Sun just above the horizon over a footprint-marked Los Cabos beach",
          "太阳刚升出海平面，沙滩上满是脚印",
          "수평선 바로 위 해와 발자국 찍힌 로스카보스 해변",
          "Sol justo sobre el horizonte en una playa de Los Cabos con huellas",
        ),
        tx(
          "First light — the sand still keeps last night’s tracks.",
          "第一缕光——沙子还留着昨夜的脚印。",
          "첫빛 — 모래에 어젯밤 자국이 남아 있다.",
          "Primera luz — la arena aún guarda las huellas de anoche.",
        ),
      ),
    },
    { type: "heading", body: tx("03 — Waves and rocks", "03 · 浪与礁石", "03 · 파도와 바위", "03 — Olas y rocas") },
    {
      type: "text",
      body: tx(
        "Waves meet the rocks. The morning takes its time — no need to fill every minute.",
        "浪拍上礁石。清晨不着急——不必把每一分钟都排满。",
        "파도가 바위에 닿는다. 아침은 서두르지 않는다 — 매분을 채울 필요 없다.",
        "Las olas encuentran las rocas. La mañana se toma su tiempo — no hace falta llenar cada minuto.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "01",
        "waves-on-rocks",
        W,
        H,
        tx(
          "Orange sunrise over calm sea with dark rocks on a Cabo beach",
          "橙色日出，平静海面与岸边深色礁石",
          "카보 해변의 주황 일출, 잔잔한 바다와 검은 바위",
          "Amanecer naranja sobre mar en calma y rocas oscuras en Cabo",
        ),
        tx(
          "Waves on the rocks — the morning keeps its own pace.",
          "浪拍礁石——清晨有自己的节奏。",
          "바위의 파도 — 아침은 제 속도다.",
          "Olas en las rocas — la mañana lleva su propio ritmo.",
        ),
      ),
    },
    { type: "heading", body: tx("04 — A moment to stop", "04 · 停一下", "04 · 멈출 순간", "04 — Un momento para parar") },
    {
      type: "text",
      body: tx(
        "Sometimes the best plan is to stop and look. A white cabana, warm light, nothing urgent.",
        "有时候最好的计划，就是停下来看一眼。白色凉棚、暖光，没有要紧事。",
        "가끔 최고의 계획은 멈춰 보는 것. 흰 카바나, 따뜻한 빛, 급한 일 없음.",
        "A veces el mejor plan es parar y mirar. Una cabaña blanca, luz cálida, nada urgente.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "01",
        "pause-by-shore",
        W,
        H,
        tx(
          "White beach cabana and rocks facing a golden Cabo sunrise",
          "白色海边凉棚与礁石，对着金色日出",
          "황금 일출을 마주한 흰 해변 카바나와 바위",
          "Cabaña blanca y rocas frente a un amanecer dorado en Cabo",
        ),
        tx(
          "Stop here — the light does the rest.",
          "停在这里——光会把剩下的做完。",
          "여기서 멈춰라 — 빛이 나머지를 한다.",
          "Para aquí — la luz hace el resto.",
        ),
      ),
    },
    { type: "heading", body: tx("05 — Closing", "05 · 结语", "05 · 맺음", "05 — Cierre") },
    {
      type: "text",
      body: tx(
        "If you come to Los Cabos, don’t start at the pool bar. Start at the shore at sunrise. You’ll see why the quiet sticks.",
        "如果你也来洛斯卡沃斯，第一站别去泳池吧台，先去日出海边。你会明白，为什么这份安静会留下来。",
        "로스카보스에 오면 첫 정류장을 풀 바로 두지 마라. 일출 해변부터. 왜 이 고요가 남는지 알 것이다.",
        "Si vienes a Los Cabos, no empieces en el bar de la piscina. Empieza en la orilla al amanecer. Entenderás por qué se queda lo quieto.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "01",
        "morning-written-in-light",
        W,
        H,
        tx(
          "Sunrise rays over beach cabanas and textured rocks in Los Cabos",
          "日出光线穿过云层，照在凉棚与礁石上",
          "구름 사이로 비친 일출 빛살과 카바나·바위",
          "Rayos de amanecer sobre cabañas y rocas texturadas en Los Cabos",
        ),
        tx(
          "A morning written in light and sea.",
          "一个用光和海写下来的早晨。",
          "빛과 바다로 쓰인 아침.",
          "Una mañana escrita en luz y mar.",
        ),
      ),
    },
    {
      type: "verdict",
      intro: tx(
        "After the sunrise — notes for a first Los Cabos trip.",
        "看完日出以后，给第一次来洛斯卡沃斯的人。",
        "일출을 본 뒤 — 첫 로스카보스 여행자에게.",
        "Después del amanecer — notas para un primer viaje a Los Cabos.",
      ),
      rows: [
        {
          label: tx("Worth it", "值不值得", "갈 만한가", "¿Merece la pena?"),
          body: tx(
            "Worth it. The shore at first light is free and still fills the frame.",
            "值得。清晨海边不花钱，画面却够满。",
            "갈 만하다. 첫빛 해안은 공짜인데도 화면을 채운다.",
            "Merece la pena. La orilla al primer luz es gratis y aún llena el encuadre.",
          ),
        },
        {
          label: tx("Who it's for", "适合谁", "누구에게", "Para quién"),
          body: tx(
            "People who like sea, photos, and sitting still; couples or families who can wake up early once.",
            "喜欢看海、拍照、发呆的人；愿意早起一次的情侣或家庭。",
            "바다·사진·멍 때리기 좋아하는 사람; 한 번쯤 일찍 일어날 수 있는 커플·가족.",
            "Quien gusta del mar, fotos y quedarse quieto; parejas o familias que pueden madrugar una vez.",
          ),
        },
        {
          label: tx("Budget", "预算", "예산", "Presupuesto"),
          body: tx(
            "The beach walk is free. Resort daybeds and cabanas may be hotel guests only — check before you claim a seat.",
            "沙滩散步免费；度假村凉棚多半只给住客——先问清楚再坐。",
            "해변 산책은 무료. 리조트 카바나는 투숙객 전용일 수 있다 — 앉기 전에 확인.",
            "El paseo por la playa es gratis. Las cabañas del resort pueden ser solo para huéspedes — pregunta antes.",
          ),
        },
        {
          label: tx("Time", "时间", "시간", "Tiempo"),
          body: tx(
            "Arrive before the sun clears the horizon. Half an hour is enough; an hour is better.",
            "太阳越过海平线之前到。半小时够用，一小时更从容。",
            "해가 수평선을 넘기 전에. 30분이면 되고, 한 시간이면 더 좋다.",
            "Llega antes de que el sol salga del horizonte. Media hora basta; una hora es mejor.",
          ),
        },
        {
          label: tx("The catch", "有没有坑", "주의할 점", "El truco"),
          body: tx(
            "Pacific swells can be rough — swim only where the hotel marks safe. Sand and rocks are uneven; watch your step while you shoot.",
            "太平洋这边浪可能大——只在酒店标安全的区域下水。沙和礁石不平，边拍边走注意脚下。",
            "태평양 너울이 셀 수 있다 — 호텔이 안전한 곳에서만 수영. 모래·바위가 고르지 않다 — 찍으며 발밑 조심.",
            "El Pacífico puede estar fuerte — nada solo donde el hotel marque seguro. Arena y rocas irregulares; cuidado al disparar.",
          ),
        },
      ],
    },
  ],
}

const ep02: StoryEpisode = {
  number: 2,
  slug: "02-cabo-ocean-escape-a-little-time-away",
  status: "published",
  publishedAt: "2026-10-10",
  title: tx(
    "Cabo Ocean Escape",
    "卡波海景逃离",
    "카보 오션 이스케이프",
    "Escapada al océano en Cabo",
  ),
  dek: tx(
    "A little time away — ocean views, a resort that sets the pace, and the slow mood of an all-inclusive day.",
    "暂时离开一会儿——海景、定节奏的度假环境，以及全包式度假里放慢的生活。",
    "잠시 멀어지기 — 바다 전망, 속도를 정하는 리조트, 올인클루시브의 느린 하루.",
    "Un poco de tiempo lejos — vistas al océano, un resort que marca el ritmo y el ánimo lento de un día all-inclusive.",
  ),
  cover: shot(
    "02",
    "a-little-time-away",
    450,
    450,
    tx(
      "Tiered resort pools facing the Pacific at golden hour in Los Cabos",
      "洛斯卡沃斯金色时光，阶梯式度假村泳池正对太平洋",
      "로스카보스 골든아워, 태평양을 향한 계단식 리조트 풀",
      "Piscinas en terrazas del resort frente al Pacífico a la hora dorada en Los Cabos",
    ),
    tx(
      "A little time away — sea, pools, nowhere to rush.",
      "暂时离开一会儿——海、泳池，没有要赶的地方。",
      "잠시 멀어지기 — 바다, 풀, 서두를 곳 없음.",
      "Un poco de tiempo lejos — mar, piscinas, sin prisa.",
    ),
  ),
  blocks: [
    {
      type: "text",
      body: tx(
        "A little time away. Ocean in front, resort around you, and a day that does not need a long checklist — this episode is the all-inclusive slow.",
        "暂时离开一会儿。面前是海，周围是度假村，这一天不需要长清单——这篇讲全包式度假的悠闲。",
        "잠시 멀어지기. 앞은 바다, 주변은 리조트, 긴 체크리스트가 필요 없는 하루 — 이 편은 올인클루시브의 여유.",
        "Un poco de tiempo lejos. El océano delante, el resort alrededor, y un día sin lista larga — este episodio es la calma all-inclusive.",
      ),
    },
    { type: "heading", body: tx("01 — Arrive and unwind", "01 · 到了就松下来", "01 · 도착하고 풀다", "01 — Llegar y soltar") },
    {
      type: "text",
      body: tx(
        "Sea view, palm shade, lounge chairs in a line. Put the phone down — the resort already sets the pace.",
        "海景、棕榈荫、一排躺椅。把手机放下——度假村已经定好节奏。",
        "바다 전망, 야자 그늘, 일렬 선베드. 폰을 내려라 — 리조트가 이미 속도를 정한다.",
        "Vista al mar, sombra de palmeras, tumbonas en fila. Deja el teléfono — el resort ya marca el ritmo.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "02",
        "arrive-ocean-view",
        W,
        H,
        tx(
          "Resort pool with turquoise water and flowered balconies in Los Cabos",
          "洛斯卡沃斯度假村泳池，碧水与开满花的阳台",
          "로스카보스 리조트 풀, 청록 물과 꽃이 핀 발코니",
          "Piscina del resort con agua turquesa y balcones floridos en Los Cabos",
        ),
        tx(
          "Arrive, put the checklist down — the pool already sets the pace.",
          "到了就放下清单——泳池已经定好节奏。",
          "도착하면 체크리스트를 내려라 — 풀이 이미 속도를 정한다.",
          "Llega y suelta la lista — la piscina ya marca el ritmo.",
        ),
      ),
    },
    { type: "heading", body: tx("02 — The swim-up pause", "02 · 泳池里的停顿", "02 · 풀 안 멈춤", "02 — La pausa en el agua") },
    {
      type: "text",
      body: tx(
        "A thatched roof in the middle of the pool. Pink bougainvillea on every balcony. Nowhere you need to be next.",
        "泳池正中是一座茅草顶。每层阳台开着洋红叶子花。下一站暂时没有。",
        "풀 한가운데 초가지붕. 발코니마다 분홍 부겐빌레아. 다음에 갈 곳은 없다.",
        "Un techo de paja en medio de la piscina. Buganvilla rosa en cada balcón. Ningún sitio al que tengas que ir.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "02",
        "swim-up-palapa",
        W,
        H,
        tx(
          "Thatched swim-up bar in a turquoise pool under flowered resort balconies",
          "碧泳池中的茅草吧台，背后是开满花的阳台",
          "청록 풀 안 초가 스윔업 바, 뒤는 꽃이 핀 발코니",
          "Bar de paja en piscina turquesa bajo balcones floridos",
        ),
        tx(
          "Slow down — the bar is in the water, and so is the afternoon.",
          "慢一点——吧台在水里，下午也在水里。",
          "천천히 — 바도 물 속에, 오후도 물 속에.",
          "Baja el ritmo — el bar está en el agua, y la tarde también.",
        ),
      ),
    },
    { type: "heading", body: tx("03 — Closing", "03 · 结语", "03 · 맺음", "03 — Cierre") },
    {
      type: "text",
      body: tx(
        "A little time away is not a packed tour. It is ocean, resort, and permission to go slow — the all-inclusive mood done right.",
        "暂时离开一会儿，不是塞满行程。是海景、度假环境，以及允许自己放慢——全包式悠闲该有的样子。",
        "잠시 멀어지기는 빽빽한 투어가 아니다. 바다, 리조트, 느려도 되는 허가 — 올인클루시브 여유의 바른 모습.",
        "Un poco de tiempo lejos no es un tour lleno. Es océano, resort y permiso para ir despacio — el ánimo all-inclusive bien hecho.",
      ),
    },
    {
      type: "verdict",
      intro: tx(
        "After a little time away — notes for a first Los Cabos resort stay.",
        "暂时离开一会儿之后，给第一次住洛斯卡沃斯度假村的人。",
        "잠시 멀어진 뒤 — 첫 로스카보스 리조트 투숙자에게.",
        "Después de un poco de tiempo lejos — notas para una primera estancia en Los Cabos.",
      ),
      rows: [
        {
          label: tx("Worth it", "值不值得", "갈 만한가", "¿Merece la pena?"),
          body: tx(
            "Worth it if you came to rest. If you only want nightlife and marina bars, this pace will feel slow on purpose.",
            "若你是来休息的，值得。若你只想夜生活和码头酒吧，这种慢是故意的。",
            "쉬러 왔다면 갈 만하다. 나이트·마리나 바만 원하면 이 속도는 일부러 느리다.",
            "Merece la pena si viniste a descansar. Si solo quieres noche y bares de marina, este ritmo es lento a propósito.",
          ),
        },
        {
          label: tx("Who it's for", "适合谁", "누구에게", "Para quién"),
          body: tx(
            "Couples and families who want one base; people recovering from a packed city trip.",
            "想有一个基地的情侣和家庭；刚从紧凑城市行程里缓过来的人。",
            "한 거점을 원하는 커플·가족; 빡센 도시 여행 뒤 회복하는 사람.",
            "Parejas y familias con una sola base; quien se recupera de un viaje urbano denso.",
          ),
        },
        {
          label: tx("Budget", "预算", "예산", "Presupuesto"),
          body: tx(
            "All-inclusive resorts on the Corridor are not cheap (Oct 2026). Compare what is included before you book — drinks, kids’ clubs, and specialty restaurants vary.",
            "走廊一带的全包度假村不便宜（2026-10）。下订前对照包含项——酒水、儿童俱乐部、特色餐厅各家不同。",
            "코리도르 올인클루시브는 싸지 않다(2026-10). 예약 전 포함 항목 비교 — 주류·키즈클럽·스페셜티 레스토랑이 다르다.",
            "Los all-inclusive del Corridor no son baratos (oct 2026). Compara qué incluye — bebidas, kids club y restaurantes especiales varían.",
          ),
        },
        {
          label: tx("Time", "时间", "시간", "Tiempo"),
          body: tx(
            "A full pool day is the point. Save Cabo San Lucas marina for a half-day outing, not every afternoon.",
            "一整天泳池就是重点。圣卢卡斯码头留给半天出行，别每天下午都去。",
            "풀 하루가 목적. 산루카스 마리나는 반나절 나들이로 — 매일 오후마다 가지 마라.",
            "Un día entero de piscina es el punto. Deja la marina de Cabo San Lucas para media jornada, no cada tarde.",
          ),
        },
        {
          label: tx("The catch", "有没有坑", "주의할 점", "El truco"),
          body: tx(
            "Midday sun is hard — shade and water first. Specialty restaurants often need reservations even when the stay is all-inclusive.",
            "中午太阳狠——先找荫和补水。全包也不等于特色餐厅随便坐，多半要订位。",
            "한낮 햇살이 세다 — 그늘·물 먼저. 올인클루시브여도 스페셜티는 예약이 필요한 경우가 많다.",
            "El sol del mediodía pega fuerte — sombra y agua primero. Los restaurantes especiales suelen pedir reserva aunque sea all-inclusive.",
          ),
        },
      ],
    },
  ],
}

const ep03: StoryEpisode = {
  number: 3,
  slug: "03-a-taste-of-cabo-an-evening-to-savor",
  status: "published",
  publishedAt: "2026-10-10",
  title: tx(
    "A Taste of Cabo",
    "卡波滋味",
    "카보의 맛",
    "Un sabor de Cabo",
  ),
  dek: tx(
    "An evening to savor — plates, plating, and the dining hours at Grand Velas Los Cabos.",
    "值得细品的一晚——以餐食、摆盘和用餐体验为主线，记录 Grand Velas Los Cabos 的美食时光。",
    "음미할 저녁 — 요리, 플레이팅, 그리고 Grand Velas Los Cabos의 식사 시간.",
    "Una noche para saborear — platos, emplatado y las horas de mesa en Grand Velas Los Cabos.",
  ),
  cover: shot(
    "03",
    "an-evening-to-savor",
    570,
    482,
    tx(
      "Oysters on the half shell with culinary mist as sauce is poured",
      "半壳生蚝与餐桌干冰雾，酱汁正淋上",
      "하프셸 굴과 미스트, 소스를 붓는 순간",
      "Ostras en media concha con niebla culinaria mientras vierten la salsa",
    ),
    tx(
      "An evening to savor — the pour that opens dinner.",
      "值得细品的一晚——开场的那一淋。",
      "음미할 저녁 — 디너를 여는 한 방울.",
      "Una noche para saborear — el vertido que abre la cena.",
    ),
  ),
  blocks: [
    {
      type: "text",
      body: tx(
        "An evening to savor. Food, plating, and time at the table — this episode records dining hours at Grand Velas Los Cabos.",
        "值得细品的一晚。餐食、摆盘、坐在桌边的时间——这篇记录 Grand Velas Los Cabos 的美食时光。",
        "음미할 저녁. 요리, 플레이팅, 식탁에 앉은 시간 — 이 편은 Grand Velas Los Cabos의 미식 시간을 기록한다.",
        "Una noche para saborear. Comida, emplatado y tiempo en la mesa — este episodio registra las horas de mesa en Grand Velas Los Cabos.",
      ),
    },
    { type: "heading", body: tx("01 — A plate worth the pause", "01 · 值得停住的一盘", "01 · 멈출 만한 접시", "01 — Un plato que merece la pausa") },
    {
      type: "text",
      body: tx(
        "Char on the outside, pink in the middle, rosemary and salt on black stone. Cut slow.",
        "外焦里粉，迷迭香和海盐落在黑石板上。慢慢切。",
        "겉은 숯향, 속은 분홍, 로즈메리와 소금이 검은 돌 위에. 천천히 잘라라.",
        "Marca por fuera, rosa por dentro, romero y sal sobre piedra negra. Corta despacio.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "03",
        "beautiful-plate",
        W,
        H,
        tx(
          "Hands carving a sliced steak on a black stone platter",
          "手在黑色石板上切开牛排",
          "검은 돌판 위 스테이크를 자르는 손",
          "Manos cortando un steak en bandeja de piedra negra",
        ),
        tx(
          "Color, char, and the first cut — the meal is part of the trip.",
          "颜色、焦香、第一刀——这顿饭是旅程的一部分。",
          "색, 숯향, 첫 칼질 — 이 식사는 여행의 일부.",
          "Color, marcas de fuego y el primer corte — la comida es parte del viaje.",
        ),
      ),
    },
    { type: "heading", body: tx("02 — Made to savor", "02 · 慢慢吃", "02 · 음미하도록", "02 — Hecho para saborear") },
    {
      type: "text",
      body: tx(
        "Tuna, cucumber, radish, a yellow sauce poured at the table. A meal is more than food — it is part of the journey.",
        "金枪鱼、黄瓜、萝卜，黄酱在桌边淋上。一顿饭不只是吃——是旅程的一段。",
        "참치, 오이, 무, 테이블에서 붓는 노란 소스. 식사는 음식 이상 — 여행의 한 장면.",
        "Atún, pepino, rábano, salsa amarilla en la mesa. Una comida es más que comida — es parte del viaje.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "03",
        "made-to-savor",
        W,
        H,
        tx(
          "Yellow sauce poured over plated tuna on a black oval platter",
          "黄色酱汁淋在黑色长盘上的金枪鱼上",
          "검은 타원 접시 위 참치에 노란 소스를 붓는 장면",
          "Salsa amarilla vertida sobre atún en bandeja negra ovalada",
        ),
        tx(
          "Poured at the table — eat while it still shines.",
          "在桌边淋上——趁还亮着吃。",
          "테이블에서 붓는다 — 아직 빛날 때 먹어라.",
          "Vertido en la mesa — come mientras aún brilla.",
        ),
      ),
    },
    { type: "heading", body: tx("03 — Seafood and grill", "03 · 海鲜与烧烤", "03 · 시푸드와 그릴", "03 — Mariscos y parrilla") },
    {
      type: "text",
      body: tx(
        "An evening at Velas 10 Seafood & Grill. The card on the table is enough — you already know you are staying for dinner.",
        "一晚在 Velas 10 Seafood & Grill。桌上的卡片就够了——你已经知道要留下来吃晚饭。",
        "Velas 10 Seafood & Grill의 저녁. 테이블 카드면 충분하다 — 이미 저녁에 남을 줄 안다.",
        "Una noche en Velas 10 Seafood & Grill. La tarjeta en la mesa basta — ya sabes que te quedas a cenar.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "03",
        "velas-10-logo",
        430,
        291,
        tx(
          "Velas 10 Seafood and Grill card on a wooden table",
          "木桌上的 Velas 10 Seafood & Grill 卡片",
          "나무 테이블 위 Velas 10 Seafood & Grill 카드",
          "Tarjeta Velas 10 Seafood & Grill sobre mesa de madera",
        ),
        tx(
          "Seafood and grill — the evening has a name.",
          "海鲜与烧烤——这一晚有了名字。",
          "시푸드와 그릴 — 이 저녁에 이름이 생겼다.",
          "Mariscos y parrilla — la noche ya tiene nombre.",
        ),
      ),
    },
    { type: "heading", body: tx("04 — Nowhere else to be", "04 · 无处可去", "04 · 갈 데 없음", "04 — En ningún otro sitio") },
    {
      type: "text",
      body: tx(
        "Same steak, second look — bone still on the board. Good food tastes better when there is nowhere else to be.",
        "还是这盘牛排，再看一眼——骨头还在砧板上。无处可去的时候，更好吃。",
        "같은 스테이크, 두 번째 시선 — 뼈가 아직 도마 위에. 갈 데 없을 때 더 맛있다.",
        "El mismo steak, segunda mirada — el hueso sigue en la tabla. Sabe mejor cuando no hay otro sitio al que ir.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "03",
        "nowhere-else-to-be",
        W,
        H,
        tx(
          "Tomahawk steak sliced on black stone with bone on a wooden board",
          "战斧牛排切开放在黑色石板与木板上",
          "나무 보드 위 검은 돌판의 토마호크 스테이크",
          "Tomahawk cortado en piedra negra sobre tabla de madera",
        ),
        tx(
          "Take your time — the evening is the destination.",
          "慢慢来——这一晚就是目的地。",
          "서두르지 마라 — 이 저녁이 목적지다.",
          "Tómate tu tiempo — la noche es el destino.",
        ),
      ),
    },
    { type: "heading", body: tx("05 — Closing", "05 · 结语", "05 · 맺음", "05 — Cierre") },
    {
      type: "text",
      body: tx(
        "Cabo’s face is the sea. An evening to savor, for us, was this table at Grand Velas — plate by plate.",
        "卡波的脸是海。值得细品的一晚，对我们来说，是 Grand Velas 这张桌子——一盘一盘来。",
        "카보의 얼굴은 바다. 음미할 저녁은, 우리에게, Grand Velas의 이 식탁 — 접시마다.",
        "La cara de Cabo es el mar. Una noche para saborear, para nosotros, fue esta mesa en Grand Velas — plato a plato.",
      ),
    },
    {
      type: "verdict",
      intro: tx(
        "After an evening to savor — notes for a first Grand Velas / Los Cabos food night.",
        "细品一晚之后，给第一次在 Grand Velas / 洛斯卡沃斯吃晚饭的人。",
        "음미한 저녁 뒤 — 첫 Grand Velas / 로스카보스 디너에게.",
        "Después de una noche para saborear — notas para una primera cena en Grand Velas / Los Cabos.",
      ),
      rows: [
        {
          label: tx("Worth it", "值不值得", "갈 만한가", "¿Merece la pena?"),
          body: tx(
            "Worth it. Resort specialty nights are part of why people book all-inclusive — use them.",
            "值得。度假村特色餐厅之夜，正是很多人订全包的原因——要用起来。",
            "갈 만하다. 리조트 스페셜티 밤은 올인클루시브를 잡는 이유 중 하나 — 써라.",
            "Merece la pena. Las noches specialty del resort son parte de por qué se reserva all-inclusive — úsalas.",
          ),
        },
        {
          label: tx("Who it's for", "适合谁", "누구에게", "Para quién"),
          body: tx(
            "People who travel to eat; couples celebrating; anyone tired of rushing through meals.",
            "为吃而旅行的人；想庆祝的情侣；厌倦赶着吃饭的人。",
            "먹으러 여행하는 사람; 기념하는 커플; 허겁지겁 식사에 지친 사람.",
            "Quien viaja para comer; parejas que celebran; quien está cansado de comer con prisa.",
          ),
        },
        {
          label: tx("Budget", "预算", "예산", "Presupuesto"),
          body: tx(
            "On all-inclusive, specialty restaurants may still need a reservation or a surcharge — ask the concierge the day you arrive (Oct 2026).",
            "全包不等于特色餐厅随便进——可能要订位或加收，到店当天问礼宾（2026-10）。",
            "올인클루시브여도 스페셜티는 예약·추가요금이 있을 수 있다 — 도착 당일 컨시어지에 물어라(2026-10).",
            "En all-inclusive, los specialty pueden pedir reserva o suplemento — pregunta al concierge el día que llegas (oct 2026).",
          ),
        },
        {
          label: tx("Time", "时间", "시간", "Tiempo"),
          body: tx(
            "Book early seating if you want golden light for photos. Late seating is quieter.",
            "想拍金色光线就订早场；晚场更安静。",
            "사진용 골든아워면 이른 좌석. 늦은 좌석이 더 조용하다.",
            "Reserva turno temprano si quieres luz dorada. El turno tarde es más tranquilo.",
          ),
        },
        {
          label: tx("The catch", "有没有坑", "주의할 점", "El truco"),
          body: tx(
            "Dress codes vary by restaurant. Seafood is best when you ask what came in that day — not only what the photo menu shows.",
            "着装要求各餐厅不同。海鲜先问当天到货，别只看菜单照片。",
            "드레스 코드는 식당마다 다르다. 해산은 메뉴 사진만이 아니라 그날 들어온 것을 물어라.",
            "El código de vestimenta varía. El marisco está mejor si preguntas qué llegó ese día — no solo lo del menú foto.",
          ),
        },
      ],
    },
  ],
}

const ep04: StoryEpisode = {
  number: 4,
  slug: "04-little-moments-the-memories-between-the-views",
  status: "published",
  publishedAt: "2026-10-10",
  title: tx(
    "Little Moments in Cabo",
    "卡波里的小瞬间",
    "카보의 작은 순간들",
    "Pequeños momentos en Cabo",
  ),
  dek: tx(
    "The memories between the views — sand details, a minute by the water, and what the trip still feels like later.",
    "风景之间的记忆——用沙滩细节、海边片刻和旅行感悟讲述个人记忆。这一集更偏情感与故事。",
    "풍경 사이의 기억 — 모래 디테일, 바닷가의 한순간, 나중에 남는 여행의 느낌. 이 편은 감정과 이야기에 더 가깝다.",
    "Los recuerdos entre las vistas — detalles de arena, un minuto junto al agua y lo que el viaje aún siente después. Este episodio es más emoción e historia.",
  ),
  cover: shot(
    "04",
    "memories-between-the-views",
    1024,
    680,
    tx(
      "Golden light on small waves washing over wet Cabo sand",
      "金色光线下，小波浪冲上潮湿的卡波沙滩",
      "금빛 아래 젖은 카보 모래를 씻는 잔물결",
      "Luz dorada sobre olas chicas lavando arena húmeda en Cabo",
    ),
    tx(
      "The memories between the views — foam, gold light, one quiet shore.",
      "风景之间的记忆——泡沫、金色光、安静的一岸。",
      "풍경 사이의 기억 — 거품, 금빛, 고요한 해안 하나.",
      "Los recuerdos entre las vistas — espuma, luz dorada, una orilla quieta.",
    ),
  ),
  blocks: [
    {
      type: "text",
      body: tx(
        "The memories between the views. Not the landmark shot — the sand, the shore minute, and the feeling you bring home. This episode is more story than checklist.",
        "风景之间的记忆。不是地标大片——是沙滩细节、海边片刻，和你带回家的感觉。这一集更偏故事，不像清单。",
        "풍경 사이의 기억. 랜드마크 컷이 아니라 — 모래, 해안의 1분, 집으로 가져가는 느낌. 이 편은 체크리스트보다 이야기에 가깝다.",
        "Los recuerdos entre las vistas. No el disparo del monumento — la arena, el minuto en la orilla y lo que te llevas a casa. Este episodio es más historia que lista.",
      ),
    },
    { type: "heading", body: tx("01 — Sand through fingers", "01 · 指缝里的沙", "01 · 손가락 사이 모래", "01 — Arena entre los dedos") },
    {
      type: "text",
      body: tx(
        "A fist of sand, then it runs out. The beach stays; the grains don’t.",
        "一把沙子，然后它自己溜走。沙滩还在，沙粒不会留下。",
        "한 줌 모래, 그리고 흘러내린다. 해변은 남고, 알갱이는 남지 않는다.",
        "Un puño de arena, y se escapa. La playa se queda; los granos no.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "04",
        "sand-through-fingers",
        W,
        H,
        tx(
          "Hand letting coarse beach sand fall with ocean blurred behind",
          "手让粗糙沙滩沙粒落下，背景是虚化的海",
          "거친 모래를 흘리는 손, 뒤는 흐린 바다",
          "Mano dejando caer arena gruesa con el mar desenfocado detrás",
        ),
        tx(
          "Sometimes the smallest moment stays the longest.",
          "有时候最小的瞬间，留得最久。",
          "가끔 가장 작은 순간이 가장 오래 남는다.",
          "A veces el momento más pequeño se queda más tiempo.",
        ),
      ),
    },
    { type: "heading", body: tx("02 — Sun on the rocks", "02 · 礁石上的太阳", "02 · 바위 위 해", "02 — Sol en las rocas") },
    {
      type: "text",
      body: tx(
        "Same beach, different minute. The sun sits on the water; the rocks hold the heat.",
        "同一片沙滩，不同的一分钟。太阳坐在水面上，礁石留着热。",
        "같은 해변, 다른 1분. 해가 물 위에 앉고, 바위가 열을 붙잡는다.",
        "Misma playa, otro minuto. El sol se sienta en el agua; las rocas guardan el calor.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "04",
        "sun-on-the-rocks",
        W,
        H,
        tx(
          "Golden sunrise over Cabo rocks and white beach cabanas",
          "金色日出照在卡波礁石与白色凉棚上",
          "카보 바위와 흰 카바나 위 황금 일출",
          "Amanecer dorado sobre rocas y cabañas blancas en Cabo",
        ),
        tx(
          "Just be here — no schedule for this frame.",
          "就在这里——这一帧没有日程。",
          "그냥 여기 — 이 프레임엔 일정이 없다.",
          "Solo estate aquí — este encuadre no tiene agenda.",
        ),
      ),
    },
    { type: "heading", body: tx("03 — Closing", "03 · 结语", "03 · 맺음", "03 — Cierre") },
    {
      type: "text",
      body: tx(
        "Years later you may forget the hotel name. You will still remember light on the foam — the memories between the views.",
        "多年以后你可能忘了酒店名字。你仍会记得泡沫上的光——风景之间的那些记忆。",
        "몇 년 뒤 호텔 이름은 잊어도. 거품 위의 빛은 남을 것이다 — 풍경 사이의 기억.",
        "Años después puedes olvidar el nombre del hotel. Seguirás recordando la luz en la espuma — los recuerdos entre las vistas.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "04",
        "rays-over-cabanas",
        W,
        H,
        tx(
          "Crepuscular rays over empty beach cabanas and rocks in Los Cabos",
          "空无一人的凉棚与礁石上方的日出光柱",
          "빈 카바나와 바위 위로 퍼지는 일출 빛살",
          "Rayos crepusculares sobre cabañas vacías y rocas en Los Cabos",
        ),
        tx(
          "Empty cabanas, full sky — enough.",
          "空凉棚，满天空——够了。",
          "빈 카바나, 가득한 하늘 — 충분하다.",
          "Cabañas vacías, cielo lleno — basta.",
        ),
      ),
    },
    {
      type: "verdict",
      intro: tx(
        "After the memories between the views — notes for packing a Los Cabos trip with room to feel.",
        "这些风景之间的记忆之后，给想留感受空间的洛斯卡沃斯行程。",
        "풍경 사이 기억 뒤 — 느낄 틈을 남긴 로스카보스 일정에게.",
        "Después de los recuerdos entre las vistas — notas para un viaje a Los Cabos con espacio para sentir.",
      ),
      rows: [
        {
          label: tx("Worth it", "值不值得", "갈 만한가", "¿Merece la pena?"),
          body: tx(
            "Worth it. The trip gets warmer when you leave blank hours on purpose — that is where the story lives.",
            "值得。故意留白的小时，会让这趟旅行更有温度——故事就住在那里。",
            "갈 만하다. 일부러 빈 시간을 남기면 여행이 더 따뜻해진다 — 이야기가 거기 산다.",
            "Merece la pena. El viaje se calienta cuando dejas horas en blanco a propósito — ahí vive la historia.",
          ),
        },
        {
          label: tx("Who it's for", "适合谁", "누구에게", "Para quién"),
          body: tx(
            "Anyone burned out on packed itineraries; people who travel for feeling, not only photos; parents who need one quiet hour.",
            "被排满行程折磨过的人；为感受而不只是拍照旅行的人；需要一小时安静的家长。",
            "빽빽한 일정에 지친 사람; 사진만이 아니라 느낌을 위해 여행하는 사람; 고요한 한 시간이 필요한 부모.",
            "Quien está quemado de itinerarios llenos; quien viaja por sentir, no solo por fotos; padres que necesitan una hora quieta.",
          ),
        },
        {
          label: tx("Budget", "预算", "예산", "Presupuesto"),
          body: tx(
            "These moments cost nothing. The catch is opportunity cost — every booked tour steals one of them.",
            "这些瞬间不花钱。真正的成本是机会——每多订一个团，就少一个这样的时刻。",
            "이 순간들은 공짜다. 대가는 기회비용 — 투어를 하나 더 잡으면 이런 순간이 하나 줄어든다.",
            "Estos momentos no cuestan. El truco es el coste de oportunidad — cada tour robado es uno menos.",
          ),
        },
        {
          label: tx("Time", "时间", "시간", "Tiempo"),
          body: tx(
            "Protect one sunrise or one late afternoon with no plans. Put it on the calendar like a reservation.",
            "守住一个没有安排的日出或傍晚。像订餐厅一样写进日程。",
            "계획 없는 일출이나 늦은 오후를 하나 지켜라. 예약처럼 달력에 넣어라.",
            "Protege un amanecer o una tarde sin planes. Ponlo en el calendario como una reserva.",
          ),
        },
        {
          label: tx("The catch", "有没有坑", "주의할 점", "El truco"),
          body: tx(
            "Phone cameras eat the minute if you only shoot. Take the frame, then put the phone away and stay.",
            "只顾拍，手机会吃掉那一分钟。拍完收起来，再站一会儿。",
            "찍기만 하면 폰이 그 1분을 먹는다. 찍고 폰을 치운 뒤 남아라.",
            "El teléfono se come el minuto si solo disparas. Haz el encuadre, guarda el móvil y quédate.",
          ),
        },
      ],
    },
  ],
}

export const losCabos: StorySeason = {
  slug: "los-cabos",
  destination: "Los Cabos",
  place: tx("Los Cabos", "洛斯卡沃斯", "로스카보스", "Los Cabos"),
  region: "latin_america",
  title: tx("My Los Cabos", "我的洛斯卡沃斯", "나의 로스카보스", "Mi Los Cabos"),
  subtitle: tx(
    "A morning by the sea — then time away, an evening to savor, memories between the views",
    "从海边的清晨开始——再到暂时离开、细品一晚、风景之间的记忆",
    "바다 옆 아침으로 시작 — 잠시 멀어지기, 음미할 저녁, 풍경 사이의 기억",
    "Una mañana junto al mar — luego tiempo lejos, una noche para saborear, recuerdos entre las vistas",
  ),
  intro: tx(
    "Four short stories from one Los Cabos stay. Open with a morning by the sea, then a little time away, an evening to savor, and the memories between the views — the more emotional close.",
    "一次洛斯卡沃斯停留里的四个短故事。从海边的清晨开场，再到暂时离开、细品一晚，最后用风景之间的记忆收束——这一集更偏情感。",
    "한 번의 로스카보스 체류에서 나온 네 짧은 이야기. 바다 옆 아침으로 열고, 잠시 멀어지기, 음미할 저녁, 풍경 사이의 기억으로 닫는다 — 감정에 더 가까운 마무리.",
    "Cuatro relatos cortos de una estancia en Los Cabos. Abre con una mañana junto al mar, luego un poco de tiempo lejos, una noche para saborear y los recuerdos entre las vistas — el cierre más emocional.",
  ),
  cover: shot(
    "01",
    "morning-by-the-sea",
    1024,
    576,
    tx(
      "Sunrise behind sea stacks and cliffs on a Los Cabos shore",
      "洛斯卡沃斯海岸，日出从海蚀柱与悬崖后升起",
      "로스카보스 해안, 바다 바위와 절벽 뒤로 뜨는 일출",
      "Amanecer detrás de farallones y acantilados en una orilla de Los Cabos",
    ),
  ),
  episodes: [ep01, ep02, ep03, ep04],
}
