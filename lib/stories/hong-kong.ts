import type { StoryEpisode, StorySeason, StoryText } from "@/lib/stories/types"

// Privacy rules for this season (see docs/stories/README.md):
// - Neighbourhood / waterfront level only. No estate or building numbers.
// - Family: backs and distance OK; no clear child faces. Note card shows handwriting only.
// - Every photo goes through scripts/process-story-photos.mjs (strips EXIF/GPS).
// Source: my-hong-kong-ep01.html / my-hong-kong-ep02.html (Macau-style short episodes).

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
    src: `/stories/hong-kong/${episode}/${name}`,
    width,
    height,
    alt,
    ...(caption ? { caption } : {}),
    shot: name,
  }
}

const ep01: StoryEpisode = {
  number: 1,
  slug: "01-victoria-harbour-start-with-the-sea",
  status: "published",
  publishedAt: "2026-09-28",
  title: tx(
    "Victoria Harbour: Start With the Sea",
    "维港，先看海",
    "빅토리아 항구, 바다부터",
    "Puerto Victoria: empieza por el mar",
  ),
  dek: tx(
    "Hong Kong’s face is on the water. Red sails, skyline, night lights — first stop, look at the sea.",
    "香港的脸在海上。红帆船、天际线、夜晚的灯火——来香港，第一站先看海。",
    "홍콩의 얼굴은 바다에 있다. 붉은 돛, 스카이라인, 밤의 불빛 — 첫 정류장은 바다.",
    "La cara de Hong Kong está en el agua. Velas rojas, skyline, luces de noche — primera parada, mira el mar.",
  ),
  cover: shot(
    "01",
    "harbour-promenade-skyline",
    1600,
    2133,
    tx(
      "Waterfront promenade facing the Victoria Harbour skyline",
      "海滨栈道，对岸是维港的天际线",
      "빅토리아 항구 스카이라인을 마주한 해안 산책로",
      "Paseo marítimo frente al skyline del puerto Victoria",
    ),
    tx(
      "The waterfront path — the skyline across the harbour.",
      "海滨栈道，对岸是维港的天际线。",
      "해안 길, 건너편 항구 스카이라인.",
      "El paseo marítimo, el skyline al otro lado.",
    ),
  ),
  heroVideo: {
    src: "/stories/hong-kong/01/hero.mp4",
    poster: shot(
      "01",
      "harbour-promenade-skyline",
      1600,
      2133,
      tx(
        "Waterfront promenade facing the Victoria Harbour skyline",
        "海滨栈道，对岸是维港的天际线",
        "빅토리아 항구 스카이라인을 마주한 해안 산책로",
        "Paseo marítimo frente al skyline del puerto Victoria",
      ),
    ),
  },
  blocks: [
    {
      type: "text",
      body: tx(
        "Hong Kong’s face is on the water. Red sails, skyline, night lights — first stop, look at the sea.",
        "香港的脸在海上。红帆船、天际线、夜晚的灯火——来香港，第一站先看海。",
        "홍콩의 얼굴은 바다에 있다. 붉은 돛, 스카이라인, 밤의 불빛 — 첫 정류장은 바다.",
        "La cara de Hong Kong está en el agua. Velas rojas, skyline, luces de noche — primera parada, mira el mar.",
      ),
    },
    { type: "heading", body: tx("01 — Start with the sea", "01 · 先看海", "01 · 바다부터", "01 — Empieza por el mar") },
    {
      type: "text",
      body: tx(
        "First thing in Hong Kong: look at the sea. Victoria Harbour is this city’s face.",
        "来香港，第一件事，先看海。维多利亚港，是这座城的脸。",
        "홍콩에서 첫일: 바다를 보라. 빅토리아 항구가 이 도시의 얼굴이다.",
        "Lo primero en Hong Kong: mira el mar. El puerto Victoria es la cara de esta ciudad.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "01",
        "harbour-promenade-skyline",
        1600,
        2133,
        tx(
          "Waterfront promenade facing the Victoria Harbour skyline",
          "海滨栈道，对岸是维港的天际线",
          "빅토리아 항구 스카이라인을 마주한 해안 산책로",
          "Paseo marítimo frente al skyline del puerto Victoria",
        ),
        tx(
          "The waterfront path — the skyline across the harbour.",
          "海滨栈道，对岸是维港的天际线。",
          "해안 길, 건너편 항구 스카이라인.",
          "El paseo marítimo, el skyline al otro lado.",
        ),
      ),
    },
    { type: "heading", body: tx("02 — The boardwalk", "02 · 海滨栈道", "02 · 해안 보드워크", "02 — El paseo de madera") },
    {
      type: "text",
      body: tx(
        "Daytime on the boardwalk: towers in a line across the water, wind that makes the clouds take their time.",
        "白天站在海滨栈道上，对岸的高楼一字排开，海风把云吹得很慢。",
        "낮 보드워크: 건너 빌딩이 한 줄, 바람이 구름을 느리게 민다.",
        "De día en el paseo: torres en fila al otro lado, viento que hace que las nubes vayan despacio.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "01",
        "boardwalk-to-harbour",
        1600,
        2133,
        tx(
          "Wooden boardwalk extending toward Victoria Harbour",
          "木栈道向海里延伸，视野正对维港",
          "빅토리아 항구를 정면으로 보는 목재 보드워크",
          "Paseo de madera hacia el puerto Victoria",
        ),
        tx(
          "The boardwalk runs out toward the harbour — the view is straight on.",
          "木栈道向海里延伸，视野正对维港。",
          "보드워크가 바다로 뻗고, 시선은 항구를 정면으로.",
          "El paseo se alarga hacia el mar — la vista de frente al puerto.",
        ),
      ),
    },
    { type: "heading", body: tx("03 — Red sails", "03 · 红帆船", "03 · 붉은 돛", "03 — Velas rojas") },
    {
      type: "text",
      body: tx(
        "A red-sail junk slides past — a postcard that still moves. One of Hong Kong’s classic frames.",
        "红帆船从前面慢慢开过去，像一张活过来的明信片。这是香港最经典的画面之一。",
        "붉은 돛 정크가 천천히 지나간다 — 살아 움직이는 엽서. 홍콩의 고전 프레임.",
        "Un junk de vela roja pasa despacio — una postal que aún se mueve. Uno de los encuadres clásicos de Hong Kong.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "01",
        "red-sail-junk",
        1600,
        2133,
        tx(
          "Red-sail junk crossing Victoria Harbour with towers behind",
          "红帆船经过维港，背后是高楼群",
          "붉은 돛 정크가 항구를 지나고 뒤는 빌딩",
          "Junk de vela roja cruzando el puerto con torres detrás",
        ),
        tx(
          "Red sails on the harbour, towers behind.",
          "红帆船经过维港，背后是高楼群。",
          "항구의 붉은 돛, 뒤의 빌딩.",
          "Velas rojas en el puerto, torres detrás.",
        ),
      ),
    },
    { type: "heading", body: tx("04 — Cargo and piers", "04 · 货船与码头", "04 · 화물선과 부두", "04 — Carga y muelles") },
    {
      type: "text",
      body: tx(
        "Cargo ships in and out, piers busy. This city grew up on this water.",
        "货船进进出出，码头人来人往。这座城，就是靠这片海长大的。",
        "화물선이 드나들고 부두는 바쁘다. 이 도시는 이 바다로 자랐다.",
        "Barcos de carga van y vienen, muelles ajetreados. Esta ciudad creció sobre este mar.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "01",
        "cargo-ship-skyline",
        1600,
        2133,
        tx(
          "Cargo ship on Victoria Harbour under a wide skyline",
          "货船驶过，海天之间全是城市的轮廓",
          "화물선이 지나가고 바다와 하늘 사이 도시의 윤곽",
          "Barco de carga en el puerto bajo el perfil de la ciudad",
        ),
        tx(
          "A freighter passes — city outline between sea and sky.",
          "货船驶过，海天之间全是城市的轮廓。",
          "화물선이 지난다 — 바다와 하늘 사이 도시 윤곽.",
          "Pasa un freighter — el perfil de la ciudad entre mar y cielo.",
        ),
      ),
    },
    { type: "heading", body: tx("05 — Night by the water", "05 · 夜晚的海边", "05 · 밤의 바닷가", "05 — Noche junto al agua") },
    {
      type: "text",
      body: tx(
        "At night the waterfront changes face. Neon comes on; lights settle into the water.",
        "到了晚上，海边换了一副样子。霓虹灯亮起来，灯火倒映在水里。",
        "밤이 되면 해안이 얼굴을 바꾼다. 네온이 켜지고, 불빛이 물에 앉는다.",
        "De noche el frente marítimo cambia de cara. Enciende el neón; las luces se asientan en el agua.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "01",
        "harbour-night-neon",
        1600,
        2133,
        tx(
          "Victoria Harbour at night as neon lights come on",
          "夜晚的维港，霓虹灯次第亮起",
          "네온이 켜지는 밤의 빅토리아 항구",
          "Puerto Victoria de noche con neón encendiéndose",
        ),
        tx(
          "Night harbour — neon lighting up one building at a time.",
          "夜晚的维港，霓虹灯次第亮起。",
          "밤 항구 — 네온이 차례로 켜진다.",
          "Puerto de noche — el neón se enciende poco a poco.",
        ),
      ),
    },
    { type: "heading", body: tx("06 — Lights on the water", "06 · 灯火", "06 · 불빛", "06 — Luces en el agua") },
    {
      type: "text",
      body: tx(
        "Lights rock with the small waves. People say Hong Kong is crowded, fast, expensive — on the waterfront for a few minutes, the wind is slow.",
        "灯火跟着波浪轻轻地晃。有人说香港很挤、很快、很贵，但站在海边的这几分钟，风是慢的。",
        "불빛이 잔물결과 함께 흔들린다. 홍콩은 붐비고 빠르고 비싸다고들 한다 — 해안에서 몇 분은, 바람이 느리다.",
        "Las luces se mecen con las olas chicas. Dicen que Hong Kong es apretado, rápido, caro — unos minutos en el frente, el viento va despacio.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "01",
        "victoria-sign-night",
        1600,
        2133,
        tx(
          "VICTORIA HARBOUR sign glowing at night on the waterfront",
          "VICTORIA HARBOUR 灯牌夜景",
          "밤에 빛나는 VICTORIA HARBOUR 간판",
          "Letrero VICTORIA HARBOUR brillando de noche en el paseo",
        ),
        tx(
          "The VICTORIA HARBOUR sign — night lights on the promenade.",
          "VICTORIA HARBOUR 灯牌，夜晚的海滨。",
          "VICTORIA HARBOUR 간판 — 밤 해안의 불빛.",
          "El letrero VICTORIA HARBOUR — luces nocturnas en el paseo.",
        ),
      ),
    },
    { type: "heading", body: tx("07 — Closing", "07 · 结语", "07 · 맺음", "07 — Cierre") },
    {
      type: "text",
      body: tx(
        "If you come to Hong Kong, don’t start at a mall. Start at the water. You’ll see why so many people arrive — and don’t want to leave.",
        "如果你也来香港，第一站别去商场，先来海边，看看这张脸。你会明白，为什么这么多人，来了，就不想走。",
        "홍콩에 오면 첫 정류장을 쇼핑몰로 두지 마라. 바다부터. 왜 많은 사람이 와서 떠나기 싫어하는지 알 것이다.",
        "Si vienes a Hong Kong, no empieces en un centro comercial. Empieza en el agua. Entenderás por qué tanta gente llega — y no quiere irse.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "01",
        "harbour-night-reflection",
        1600,
        2133,
        tx(
          "Victoria Harbour night lights reflected on the water",
          "维港夜景，灯火倒映在水里",
          "물에 비친 빅토리아 항구 밤 불빛",
          "Luces nocturnas del puerto Victoria reflejadas en el agua",
        ),
        tx(
          "Night harbour — lights sitting in the water.",
          "维港夜景，灯火倒映在水里。",
          "밤 항구 — 불빛이 물에 앉는다.",
          "Puerto de noche — luces asentadas en el agua.",
        ),
      ),
    },
    {
      type: "verdict",
      intro: tx(
        "After the harbour — notes for a first Hong Kong trip.",
        "走完维港以后，给第一次来香港的人。",
        "항구를 본 뒤 — 첫 홍콩 여행자에게.",
        "Después del puerto — notas para un primer viaje a Hong Kong.",
      ),
      rows: [
        {
          label: tx("Worth it", "值不值得", "갈 만한가", "¿Merece la pena?"),
          body: tx(
            "Worth it. The waterfront is the first stop that doesn’t cost money and still fills the frame.",
            "值得。来香港，海滨是必去的第一站，不花钱，风景管够。",
            "갈 만하다. 해안은 돈 안 들이고도 화면을 채우는 첫 정류장.",
            "Merece la pena. El frente marítimo es la primera parada que no cuesta y aún llena el encuadre.",
          ),
        },
        {
          label: tx("Who it's for", "适合谁", "누구에게", "Para quién"),
          body: tx(
            "First-timers; people who like sea, photos, and sitting still; families walking with kids or parents.",
            "第一次来香港的人；喜欢看海、拍照、发呆的人；带爸妈孩子散步的人。",
            "처음 오는 사람; 바다·사진·멍 때리기 좋아하는 사람; 부모님·아이와 걷는 사람.",
            "Primera visita; quien gusta del mar, fotos y quedarse quieto; familias paseando con niños o padres.",
          ),
        },
        {
          label: tx("Budget", "预算", "예산", "Presupuesto"),
          body: tx(
            "The promenade is free. Night harbour cruises cost extra — spend as much or as little as you want.",
            "海滨步道全免费；夜游船另收费，丰俭由人。",
            "해안 산책로는 무료. 야간 유람선은 별도 — 얼마든 당신 몫.",
            "El paseo es gratis. Los cruceros nocturnos cuestan aparte — gasta lo que quieras.",
          ),
        },
        {
          label: tx("Time", "时间", "시간", "Tiempo"),
          body: tx(
            "Skyline by day, lights by night. Around sunset photographs best — leave at least half a day.",
            "白天看天际线，晚上看灯火；日落前后最出片，至少留半天。",
            "낮엔 스카이라인, 밤엔 불빛. 해질 무렵이 제일 잘 나온다 — 최소 반나절.",
            "Skyline de día, luces de noche. Alrededor del atardecer sale mejor — deja al menos medio día.",
          ),
        },
        {
          label: tx("The catch", "有没有坑", "주의할 점", "El truco"),
          body: tx(
            "Holidays pack the waterfront — shift your hours. Wind picks up at night — bring a layer. Watch your step while you shoot.",
            "节假日海滨人多，可错峰；晚上风大，带件外套；边走边拍注意脚下。",
            "연휴 해안은 붐빈다 — 시간 비껴라. 밤바람 세다 — 겉옷. 찍으며 발밑 조심.",
            "En festivos el frente se llena — cambia la hora. De noche hay viento — lleva capa. Cuidado al andar y disparar.",
          ),
        },
      ],
    },
    {
      type: "text",
      body: tx(
        'BGM: "Dream Culture" by Kevin MacLeod (incompetech.com), CC BY 4.0.',
        "BGM：Dream Culture by Kevin MacLeod (incompetech.com)，CC BY 4.0。",
        'BGM: "Dream Culture" by Kevin MacLeod (incompetech.com), CC BY 4.0.',
        'BGM: "Dream Culture" by Kevin MacLeod (incompetech.com), CC BY 4.0.',
      ),
    },
  ],
}

const ep02: StoryEpisode = {
  number: 2,
  slug: "02-streets-food-and-people",
  status: "published",
  publishedAt: "2026-09-28",
  title: tx(
    "Back Into the City: Streets, Food and People",
    "街巷，再进城",
    "다시 도심: 골목, 음식, 사람",
    "De vuelta a la ciudad: calles, comida y gente",
  ),
  dek: tx(
    "After the harbour, go inland. Roast-meat rice, street murals, and family on the waterfront — that is Hong Kong’s inside.",
    "看完海，进城。烧味饭、街头涂鸦和家人的背影，才是香港的里子。",
    "바다를 본 뒤 도심으로. 훈제 덮밥, 거리 벽화, 해안의 가족 등 — 그게 홍콩의 속이다.",
    "Tras el puerto, entra. Arroz de asados, murales y familia en el frente — esa es la cara interior de Hong Kong.",
  ),
  cover: shot(
    "02",
    "roast-meat-rice-eggs",
    1600,
    2133,
    tx(
      "Char siu and roast-duck rice with soft-yolk eggs",
      "叉烧烧鸭饭配流心蛋",
      "차슈·훈제오리 덮밥과 반숙 계란",
      "Arroz de char siu y pato asado con huevos de yema blanda",
    ),
    tx(
      "Char siu and roast duck over rice — two soft eggs on top.",
      "叉烧烧鸭饭配流心蛋。",
      "차슈·훈제오리 덮밥, 위에 반숙 계란 둘.",
      "Char siu y pato asado sobre arroz — dos huevos blandos encima.",
    ),
  ),
  heroVideo: {
    src: "/stories/hong-kong/02/hero.mp4",
    poster: shot(
      "02",
      "roast-meat-rice-eggs",
      1600,
      2133,
      tx(
        "Char siu and roast-duck rice with soft-yolk eggs",
        "叉烧烧鸭饭配流心蛋",
        "차슈·훈제오리 덮밥과 반숙 계란",
        "Arroz de char siu y pato asado con huevos de yema blanda",
      ),
    ),
  },
  blocks: [
    {
      type: "text",
      body: tx(
        "After the harbour, go inland. Roast-meat rice, street murals, and people you walk with — that is Hong Kong’s inside.",
        "看完海，进城。烧味饭、街头涂鸦和家人的背影，才是香港的里子。",
        "바다를 본 뒤 도심으로. 훈제 덮밥, 거리 벽화, 함께 걷는 사람들 — 그게 홍콩의 속이다.",
        "Tras el puerto, entra. Arroz de asados, murales y con quien caminas — esa es la cara interior de Hong Kong.",
      ),
    },
    { type: "heading", body: tx("01 — Into the city", "01 · 进城", "01 · 도심으로", "01 — Entrar a la ciudad") },
    {
      type: "text",
      body: tx(
        "Harbour done. Go inland. Hong Kong’s inside lives in the streets.",
        "看完海，进城。香港的里子，藏在街巷里。",
        "바다 끝. 도심으로. 홍콩의 속은 골목에 있다.",
        "Puerto visto. Entra. El interior de Hong Kong vive en las calles.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "02",
        "bridge-pillar-mural",
        1600,
        2133,
        tx(
          "Painted bridge pillars along a single-lane road under an overpass",
          "桥底单车道，彩绘柱子很有意思",
          "고가 아래 단차선 도로의 채색 기둥",
          "Pilares pintados bajo un paso elevado en un carril único",
        ),
        tx(
          "Under the bridge — one lane, painted pillars with a quiet joke.",
          "桥底单车道，彩绘柱子很有意思。",
          "다리 아래 — 단차선, 웃음을 숨긴 채색 기둥.",
          "Bajo el puente — un carril, pilares pintados con humor quieto.",
        ),
      ),
    },
    { type: "heading", body: tx("02 — Murals under the bridge", "02 · 桥底涂鸦", "02 · 다리 아래 벽화", "02 — Murales bajo el puente") },
    {
      type: "text",
      body: tx(
        "Graffiti under the overpass, colour on a single-lane road — the city’s private humour.",
        "桥底下的涂鸦，单车道上的颜色，是这座城偷偷的幽默。",
        "고가 아래 그래피티, 단차선 위의 색 — 도시의 몰래 유머.",
        "Grafiti bajo el paso, color en un carril — el humor privado de la ciudad.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "02",
        "mural-detail",
        1600,
        2133,
        tx(
          "Close-up of painted mural detail on a bridge pillar",
          "涂鸦柱子近看，细节拉满",
          "다리 기둥 벽화 디테일 클로즈업",
          "Detalle de mural pintado en un pilar",
        ),
        tx(
          "Closer — the pillar mural is packed with detail.",
          "涂鸦柱子近看，细节拉满。",
          "가까이 — 기둥 벽화에 디테일이 가득.",
          "De cerca — el mural del pilar está lleno de detalle.",
        ),
      ),
    },
    { type: "heading", body: tx("03 — Roast platter", "03 · 烧味拼盘", "03 · 훈제 플래터", "03 — Tabla de asados") },
    {
      type: "text",
      body: tx(
        "A mixed roast platter, glossy with oil. The knife work hasn’t changed in decades.",
        "烧味拼盘，油光发亮。师傅的刀工，几十年没变过。",
        "훈제 모둠, 기름이 반짝. 칼 솜씨는 수십 년째 같다.",
        "Tabla mixta de asados, brillante de aceite. El corte no ha cambiado en décadas.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "02",
        "roast-platter",
        1600,
        2133,
        tx(
          "Mixed roast platter with char siu and roast duck",
          "烧味拼盘，叉烧烧鸭双拼",
          "차슈와 훈제오리 모둠 플래터",
          "Tabla mixta de char siu y pato asado",
        ),
        tx(
          "Char siu and roast duck on one plate.",
          "烧味拼盘，叉烧烧鸭双拼。",
          "한 접시에 차슈와 훈제오리.",
          "Char siu y pato asado en un plato.",
        ),
      ),
    },
    { type: "heading", body: tx("04 — Roast-meat rice", "04 · 叉烧烧鸭饭", "04 · 차슈·오리 덮밥", "04 — Arroz de asados") },
    {
      type: "text",
      body: tx(
        "A bowl of char siu and roast-duck rice, two soft eggs — a worker’s top-tier lunch.",
        "一碗叉烧烧鸭饭，加两只流心蛋，是打工人的顶配。",
        "차슈·훈제오리 덮밥에 반숙 계란 둘 — 직장인 최상 런치.",
        "Un bowl de arroz con char siu y pato asado, dos huevos blandos — el almuerzo top del que trabaja.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "02",
        "roast-meat-rice-eggs",
        1600,
        2133,
        tx(
          "Char siu and roast-duck rice with soft-yolk eggs",
          "叉烧烧鸭饭配流心蛋",
          "차슈·훈제오리 덮밥과 반숙 계란",
          "Arroz de char siu y pato asado con huevos de yema blanda",
        ),
        tx(
          "Char siu and roast duck over rice — two soft eggs on top.",
          "叉烧烧鸭饭配流心蛋。",
          "차슈·훈제오리 덮밥, 위에 반숙 계란 둘.",
          "Char siu y pato asado sobre arroz — dos huevos blandos encima.",
        ),
      ),
    },
    { type: "heading", body: tx("05 — Steamed fish", "05 · 清蒸鱼", "05 · 찐 생선", "05 — Pescado al vapor") },
    {
      type: "text",
      body: tx(
        "Steamed fish while it’s hot. Black-bean sauce and spring onion — Cantonese stubbornness in a good way.",
        "清蒸鱼要趁热。豉汁的鲜，是老广的执念。",
        "찐 생선은 뜨거울 때. 두치 소스와 쪽파 — 광둥의 고집, 좋은 쪽.",
        "Pescado al vapor en caliente. Salsa de judía negra y cebolleta — terquedad cantonesa, la buena.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "02",
        "steamed-fish",
        1600,
        2133,
        tx(
          "Steamed fish with black-bean sauce and spring onion",
          "清蒸鱼，豉汁葱丝",
          "두치 소스와 쪽파를 올린 찐 생선",
          "Pescado al vapor con salsa de judía negra y cebolleta",
        ),
        tx(
          "Steamed fish — black bean and scallion.",
          "清蒸鱼，豉汁葱丝。",
          "찐 생선 — 두치와 쪽파.",
          "Pescado al vapor — judía negra y cebolleta.",
        ),
      ),
    },
    { type: "heading", body: tx("06 — Night by the water", "06 · 夜晚的海边", "06 · 밤의 바닷가", "06 — Noche junto al agua") },
    {
      type: "text",
      body: tx(
        "At night by the water, family walks ahead — soft light in the harbour. The softest minute of the trip, shot from behind.",
        "奶奶在夜晚的海边笑，皱纹里全是光。那是这趟旅行里，最柔软的一分钟。",
        "밤 해안에서 가족이 앞서 걷는다 — 항구에 부드러운 빛. 이 여행에서 가장 부드러운 1분, 등 뒤에서.",
        "De noche junto al agua, la familia camina delante — luz blanda en el puerto. El minuto más suave del viaje, de espaldas.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "02",
        "harbour-night-family",
        1600,
        2133,
        tx(
          "Family walking the waterfront at night with harbour lights across the water",
          "夜晚的维港，灯火倒映在水里",
          "밤 해안을 걷는 가족 등과 건너편 항구 불빛",
          "Familia de espaldas en el paseo nocturno con luces del puerto",
        ),
        tx(
          "Night harbour — lights sitting in the water.",
          "夜晚的维港，灯火倒映在水里。",
          "밤 항구 — 불빛이 물에 앉는다.",
          "Puerto de noche — luces asentadas en el agua.",
        ),
      ),
    },
    { type: "heading", body: tx("07 — To Grandmother", "07 · 致祖母", "07 · 할머니께", "07 — A la abuela") },
    {
      type: "text",
      body: tx(
        "That day a child wrote four characters: 致祖母 — To Grandmother. Four characters, one heart.",
        "那天，孩子写了四个字：致祖母。四个字，一颗心。",
        "그날 아이가 네 글자를 썼다: 致祖母 — 할머니께. 네 글자, 하트 하나.",
        "Ese día un niño escribió cuatro caracteres: 致祖母 — A la abuela. Cuatro signos, un corazón.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "02",
        "note-to-grandmother",
        1600,
        2133,
        tx(
          "Handwritten note reading To Grandmother with a drawn heart",
          "孩子写给祖母的字",
          "아이가 쓴 ‘할머니께’와 하트",
          "Nota manuscrita: A la abuela, con un corazón dibujado",
        ),
        tx(
          "Four characters. One heart.",
          "孩子写给祖母的字。",
          "네 글자. 하트 하나.",
          "Cuatro caracteres. Un corazón.",
        ),
      ),
    },
    { type: "heading", body: tx("08 — Closing", "08 · 结语", "08 · 맺음", "08 — Cierre") },
    {
      type: "text",
      body: tx(
        "Hong Kong’s face is the harbour. Hong Kong’s heart is these people — and this meal.",
        "香港的脸是维港，香港的心，是这些人，和这顿饭。",
        "홍콩의 얼굴은 항구. 홍콩의 마음은 이 사람들 — 그리고 이 한 끼.",
        "La cara de Hong Kong es el puerto. El corazón son estas personas — y esta comida.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "02",
        "harbour-day-close",
        1600,
        2133,
        tx(
          "Victoria Harbour by day with sea meeting sky",
          "白天再看维港，海天一色",
          "낮에 다시 본 빅토리아 항구, 바다와 하늘이 한색",
          "Puerto Victoria de día, mar y cielo del mismo tono",
        ),
        tx(
          "Daylight harbour again — sea and sky in one colour.",
          "白天再看维港，海天一色。",
          "낮 항구를 다시 — 바다와 하늘이 한색.",
          "Otra vez el puerto de día — mar y cielo del mismo tono.",
        ),
      ),
    },
    {
      type: "verdict",
      intro: tx(
        "After eating into the city — notes for a first Hong Kong trip.",
        "吃进老城以后，给第一次来香港的人。",
        "도심을 먹어 본 뒤 — 첫 홍콩 여행자에게.",
        "Después de comer la ciudad — notas para un primer viaje a Hong Kong.",
      ),
      rows: [
        {
          label: tx("Worth it", "值不值得", "갈 만한가", "¿Merece la pena?"),
          body: tx(
            "Worth it. Hong Kong’s taste is not in malls — it is in neighbourhood shops.",
            "值得。香港的味道不在商场里，在街边小店里。",
            "갈 만하다. 홍콩 맛은 쇼핑몰이 아니라 골목 가게에 있다.",
            "Merece la pena. El sabor de Hong Kong no está en malls — está en tiendas de barrio.",
          ),
        },
        {
          label: tx("Who it's for", "适合谁", "누구에게", "Para quién"),
          body: tx(
            "People who love to eat; who want local life; who bring family for the human warmth, not only the skyline.",
            "爱吃的人；想体验本地生活的人；带家人来找“人情味”的人。",
            "먹는 걸 좋아하는 사람; 로컬 삶을 보고 싶은 사람; 스카이라인만이 아니라 人情을 찾으러 가족을 데려오는 사람.",
            "Quien ama comer; quien quiere vida local; quien trae familia por el calor humano, no solo el skyline.",
          ),
        },
        {
          label: tx("Budget", "预算", "예산", "Presupuesto"),
          body: tx(
            "Cha chaan teng and roast shops: a few dozen Hong Kong dollars per person. Some old places take cash only — keep some.",
            "茶餐厅、烧味店人均几十港币；有些老店只收现金，备一点。",
            "차찬팅·훈제집: 인당 수십 홍콩 달러. 어떤 오래된 집은 현금만 — 조금 챙겨라.",
            "Cha chaan teng y asados: unas decenas de HK$ por persona. Algunos locales viejos solo cash — lleva algo.",
          ),
        },
        {
          label: tx("Time", "时间", "시간", "Tiempo"),
          body: tx(
            "Lunch and dinner rushes are the loudest. Weekend noon is packed — shift if you can.",
            "中午和晚上饭点最热闹；周末中午人多，可错峰。",
            "점심·저녁 피크가 제일 시끌. 주말 점심은 붐빈다 — 비낄 수 있으면 비켜라.",
            "Almuerzo y cena son lo más ruidoso. El mediodía del finde se llena — cambia si puedes.",
          ),
        },
        {
          label: tx("The catch", "有没有坑", "주의할 점", "El truco"),
          body: tx(
            "Don’t let viral queues decide for you — neighbourhood shops are often more honest. Ask the seafood price before you order.",
            "别被网红店排队绑架，街边老店往往更地道；海鲜先问价再点。",
            "바이럴 줄에 끌려가지 마라 — 골목 가게가 더 정직한 경우가 많다. 해산은 시키고 나서가 아니라 시키기 전에 가격 물어라.",
            "No dejes que las colas virales decidan — los locales de barrio suelen ser más sinceros. Pregunta el precio del marisco antes de pedir.",
          ),
        },
      ],
    },
    {
      type: "text",
      body: tx(
        'BGM: "Dream Culture" by Kevin MacLeod (incompetech.com), CC BY 4.0.',
        "BGM：Dream Culture by Kevin MacLeod (incompetech.com)，CC BY 4.0。",
        'BGM: "Dream Culture" by Kevin MacLeod (incompetech.com), CC BY 4.0.',
        'BGM: "Dream Culture" by Kevin MacLeod (incompetech.com), CC BY 4.0.',
      ),
    },
  ],
}

export const hongKong: StorySeason = {
  slug: "hong-kong",
  destination: "Hong Kong",
  place: tx("Hong Kong", "香港", "홍콩", "Hong Kong"),
  region: "asia",
  title: tx("My Hong Kong", "我的香港", "나의 홍콩", "Mi Hong Kong"),
  subtitle: tx(
    "Harbour first, then the streets",
    "先看海，再进城",
    "바다 먼저, 그다음 골목",
    "Primero el puerto, luego las calles",
  ),
  intro: tx(
    "Two short stories from one Hong Kong — Victoria Harbour as the city’s face, then streets, food, and people as its inside.",
    "一次香港里的两个短故事——维港是这座城的脸，街巷、饭和人是里子。",
    "한 홍콩에서 나온 두 짧은 이야기 — 빅토리아 항구가 얼굴, 골목·밥·사람이 속.",
    "Dos relatos cortos de un Hong Kong — el puerto Victoria como cara, calles, comida y gente como interior.",
  ),
  cover: shot(
    "01",
    "red-sail-junk",
    1600,
    2133,
    tx(
      "Red-sail junk crossing Victoria Harbour with towers behind",
      "红帆船经过维港，背后是高楼群",
      "붉은 돛 정크가 항구를 지나고 뒤는 빌딩",
      "Junk de vela roja cruzando el puerto con torres detrás",
    ),
  ),
  episodes: [ep01, ep02],
}
