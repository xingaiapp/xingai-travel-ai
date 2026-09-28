import type { StoryEpisode, StorySeason, StoryText } from "@/lib/stories/types"

// Privacy rules for this season (see docs/stories/README.md):
// - Neighbourhood level only ("Island East"), never an estate or building name.
// - Family faces only with consent; otherwise backs, hands, or distance shots.
// - Every photo goes through scripts/process-story-photos.mjs (strips EXIF/GPS).

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
  slug: "01-the-hong-kong-i-called-home",
  status: "published",
  publishedAt: "2026-09-26",
  title: tx("The Hong Kong I Called Home", "我叫它家的地方", "내가 집이라 부르던 홍콩", "El Hong Kong al que llamé hogar"),
  dek: tx(
    "Six months in Hong Kong. This is the city I lived in, not the one visitors pass through.",
    "在香港住了半年。这是我住过的香港，不是游客的那个。",
    "홍콩에서 여섯 달. 관광객이 스치는 도시가 아니라, 내가 살던 도시 이야기다.",
    "Seis meses en Hong Kong. Esta es la ciudad en la que viví, no la que los visitantes atraviesan.",
  ),
  cover: {
    ...shot(
      "01",
      "waterfront-walk",
      960,
      1706,
      tx(
        "Hong Kong's waterfront promenade on a clear day",
        "晴天下的香港海滨步道",
        "맑은 날 홍콩 해안 산책로",
        "El paseo marítimo de Hong Kong en un día despejado",
      ),
      tx(
        "Hong Kong from the waterfront path. Once I lived here, this was not a sight. It was something I walked past every day.",
        "海滨步道上看到的香港。住下来以后，这不是景点，是每天路过的风景。",
        "해안 길에서 본 홍콩. 여기 살기 시작한 뒤로는 관광지가 아니라, 매일 지나치던 풍경이었다.",
        "Hong Kong desde el paseo marítimo. Cuando viví aquí, esto no era un mirador: era algo que pasaba cada día.",
      ),
    ),
  },
  blocks: [
    {
      type: "heading",
      body: tx("Prologue · The Hong Kong I Lived", "序 · The Hong Kong I Lived", "프롤로그 · 내가 살던 홍콩", "Prólogo · El Hong Kong en el que viví"),
    },
    {
      type: "text",
      body: tx(
        "A lot of my memories of Hong Kong start with a meal — but the city gave me more than food. People ask me what Hong Kong is actually like. For me it was not the visitor's Hong Kong. It was a home I lived in for half a year. Living there for six months and visiting for three days are two different cities. This episode is the one I lived in.",
        "在香港，我的很多记忆都是从一顿饭开始的——但这座城市给我的，远不止吃的。很多人问我，香港到底是什么样。对我来说，它不是游客的香港，是我住过半年的家。住半年和玩三天，看到的是两个香港。这一集，讲我住过的那个。",
        "홍콩에 대한 내 기억 많은 것이 한 끼에서 시작된다 — 하지만 이 도시는 음식 이상을 주었다. 사람들은 홍콩이 어떤 곳인지 묻는다. 나에게는 관광객의 홍콩이 아니었다. 반년을 살던 집이었다. 여섯 달 살기와 사흘 여행은 다른 도시다. 이 에피소드는 내가 살던 그쪽이다.",
        "Muchos recuerdos de Hong Kong empiezan con una comida — pero la ciudad me dio más que comida. Me preguntan cómo es Hong Kong de verdad. Para mí no era el Hong Kong del visitante: fue un hogar donde viví medio año. Seis meses viviendo y tres días de turismo son dos ciudades distintas. Este episodio es la que viví.",
      ),
    },
    { type: "heading", body: tx("01 — Fortress Hill", "01 — 炮台山 · Fortress Hill", "01 — 포트리스 힐", "01 — Fortress Hill") },
    {
      type: "text",
      body: tx(
        "I lived in Fortress Hill. Every day I came out of MTR exit B, and I walked that road for half a year. Fortress Hill is not on a visitor's itinerary, but it is quiet, convenient, and everything you need is downstairs. Stay long enough and you notice that the real feel of daily life in Hong Kong hides in places like this.",
        "我住在炮台山。每天从地铁 B 出口出来，这条路我走了半年。炮台山不在游客的行程上，但它安静、方便，楼下什么都有。住久了你会发现，香港真正的生活感，都藏在这种地方。",
        "포트리스 힐에 살았다. 매일 MTR B출구로 나와 그 길을 반년 걸었다. 포트리스 힐은 여행 일정에 없지만 조용하고 편하며, 필요한 것은 아래층에 다 있다. 오래 머물면 홍콩의 진짜 일상은 이런 곳에 숨어 있다는 걸 안다.",
        "Viví en Fortress Hill. Cada día salía por la salida B del MTR y caminaba esa calle medio año. Fortress Hill no está en la ruta turística, pero es tranquilo, práctico y abajo tienes de todo. Si te quedas, ves que la vida real de Hong Kong se esconde en sitios así.",
      ),
    },
    { type: "heading", body: tx("02 — North Point", "02 — 北角 · North Point", "02 — 노스 포인트", "02 — North Point") },
    {
      type: "text",
      body: tx(
        "North Point was my everyday. The waterfront promenade: a run in the morning, a walk at night. I covered that line on the map more times than I can count. Water on one side, towers on the other. That routine is on nobody's visitor itinerary, and it is the most real Hong Kong I saw.",
        "北角是我的日常。海滨长廊，早上跑步，晚上散步。地图上这一条线，我走了无数遍。沿着海走，一边是水，一边是楼。这种日常不在任何游客行程里，但它是我见过最真实的香港。",
        "노스 포인트가 내 일상이었다. 해안 산책로: 아침 달리기, 밤 산책. 지도 위 그 선을 셀 수 없이 걸었다. 한쪽은 바다, 다른 쪽은 빌딩. 그 루틴은 어떤 관광 일정에도 없고, 내가 본 홍콩 중 가장 진짜 같았다.",
        "North Point era mi día a día. El paseo marítimo: correr por la mañana, pasear de noche. Recorrí esa línea en el mapa más veces de las que puedo contar. Agua a un lado, torres al otro. Esa rutina no está en ningún itinerario turístico, y es el Hong Kong más real que vi.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "01",
        "north-point-boardwalk",
        960,
        1706,
        tx(
          "The wooden boardwalk along the North Point waterfront",
          "北角海滨木栈道与临海城市景色",
          "노스 포인트 해안을 따라 이어진 목재 보드워크",
          "El paseo de madera a lo largo del frente marítimo de North Point",
        ),
      ),
    },
    {
      type: "photo",
      photo: shot(
        "01",
        "north-point-map",
        960,
        1706,
        tx(
          "A waterfront map marking North Point and Causeway Bay",
          "标有北角与铜锣湾的海滨地图展板",
          "노스 포인트와 코즈웨이 베이가 표시된 해안 지도",
          "Un mapa en el paseo marítimo con North Point y Causeway Bay",
        ),
        tx(
          "The North Point waterfront, and the North Point–Causeway Bay stretch I walked over and over.",
          "北角海滨长廊，以及我走了无数次的 North Point—Causeway Bay 这一段。",
          "노스 포인트 해안, 그리고 수없이 걸었던 노스 포인트–코즈웨이 베이 구간.",
          "El frente marítimo de North Point y el tramo North Point–Causeway Bay que repetí una y otra vez.",
        ),
      ),
    },
    { type: "heading", body: tx("03 — What I Actually Ate", "03 — 真正吃过的 · What I Actually Ate", "03 — 내가 실제로 먹은 것", "03 — Lo que comí de verdad") },
    {
      type: "text",
      body: tx(
        "What I ate most in Hong Kong was not Michelin. It was the roast-meat shop downstairs. A plate of roast meat, two eggs, and that was a meal. A mixed roast platter, greens, rice — a few dozen Hong Kong dollars, filling and good. Stay a while and you learn it: the good food is not on the lists. It is downstairs.",
        "在香港，我吃得最多的不是米其林，是楼下烧味店。一份烧味饭，两个蛋，就是一顿。烧味拼盘、青菜、米饭，几十块，吃得饱也吃得好。待久了你会明白：好吃的不在榜单上，在楼下。",
        "홍콩에서 가장 많이 먹은 건 미슐랭이 아니라 아래층 훈제 고기 가게였다. 훈제 고기 한 접시, 계란 두 개면 한 끼. 모듬 훈제, 나물, 밥 — 수십 홍콩 달러로 배부르고 맛있다. 오래 있으면 알게 된다: 맛있는 건 리스트가 아니라 아래층에 있다.",
        "Lo que más comí en Hong Kong no fue Michelin. Fue la charcutería de abajo. Un plato de asado, dos huevos, y era una comida. Bandeja mixta, verduras, arroz — unas decenas de dólares de HK, lleno y bueno. Si te quedas, aprendes: lo bueno no está en las listas. Está abajo.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "01",
        "roast-meat-rice",
        1320,
        1760,
        tx(
          "Roast-meat rice with two eggs from a neighbourhood shop",
          "香港楼下烧味店的一份烧味饭和两个蛋",
          "동네 가게의 훈제 고기 덮밥과 계란 두 개",
          "Arroz con asado y dos huevos de una tienda del barrio",
        ),
      ),
    },
    {
      type: "photo",
      photo: shot(
        "01",
        "roast-platter",
        1320,
        1760,
        tx(
          "A mixed roast platter with greens and rice",
          "烧味拼盘、青菜和米饭组成的一顿日常饭",
          "나물과 밥이 곁들인 모듬 훈제 한 끼",
          "Bandeja mixta de asados con verduras y arroz",
        ),
        tx(
          "Not a restaurant from a list. Downstairs. A few dozen dollars. The meal I ate often.",
          "不是榜单上的餐厅。是楼下，几十块，常常吃的那一顿。",
          "리스트의 레스토랑이 아니다. 아래층. 수십 달러. 자주 먹던 한 끼.",
          "No un restaurante de lista. Abajo. Unas decenas de dólares. La comida que repetía.",
        ),
      ),
    },
    { type: "heading", body: tx("04 — The Harbor", "04 — 维港 · The Harbor", "04 — 항구", "04 — El puerto") },
    {
      type: "text",
      body: tx(
        "Every time I reached the harbour and saw the red-sail junk, I still stopped. I never got tired of that picture. After half a year I should have. I didn't. Some pictures just do that.",
        "但每次走到维港，看到红帆船，我还是会停下来。这个画面，看多少次都不腻。住了半年，按说早该看腻了。没有。有些画面就是有这种本事。",
        "항구에 닿아 붉은 돛 정을 볼 때마다 멈췄다. 그 장면은 질리지 않았다. 반년이면 질릴 때인데, 아니었다. 어떤 풍경은 그렇다.",
        "Cada vez que llegaba al puerto y veía el junk de vela roja, me detenía. Nunca me cansé de esa imagen. Tras medio año debería haberme pasado. No. Algunas imágenes hacen eso.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "01",
        "harbour-red-sail",
        960,
        1706,
        tx(
          "A red-sail junk on Victoria Harbour with the skyline behind it",
          "维多利亚港上的红帆船与香港城市天际线",
          "빅토리아 항구의 붉은 돛 정과 뒤편 스카이라인",
          "Un junk de vela roja en el puerto Victoria con el skyline detrás",
        ),
        tx(
          "The harbour, the red sail. Not the first time I had seen it. I stopped anyway.",
          "维港，红帆船。不是第一次看，也还是会停。",
          "항구, 붉은 돛. 처음 본 건 아니다. 그래도 멈췄다.",
          "El puerto, la vela roja. No era la primera vez. Me detuve igual.",
        ),
      ),
    },
    { type: "heading", body: tx("05 — Small Moments", "05 — 没计划的小瞬间 · Small Moments", "05 — 계획 없던 작은 순간", "05 — Pequeños momentos") },
    {
      type: "text",
      body: tx(
        "Some moments were not planned. This egret, for example, just standing there, as if it had been waiting. No itinerary lists that. Half a year later, what you still remember is often those few minutes.",
        "有些瞬间是没计划的。比如这只白鹭，就站在那儿，好像在等我。行程表上不会有这一项。但半年后你还记得的，往往就是这几分钟。",
        "계획되지 않은 순간도 있다. 예를 들어 이 백로, 마치 기다리듯 서 있었다. 일정표에는 없다. 반년 뒤에도 남는 건 종종 그 몇 분이다.",
        "Algunos momentos no estaban planeados. Esta garceta, por ejemplo, quieta, como si esperara. Ningún itinerario lo incluye. Medio año después, lo que recuerdas suele ser esos minutos.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "01",
        "egret-on-the-steps",
        960,
        1706,
        tx(
          "An egret standing alone on stone steps by the water",
          "一只白鹭独自站在海边石阶上",
          "물가 돌계단에 홀로 선 백로",
          "Una garceta sola en los escalones de piedra junto al agua",
        ),
        tx(
          "An egret on the stone steps by the sea. Nothing scheduled, and no rush.",
          "海边石阶上的白鹭。没有安排，也没赶时间。",
          "바닷가 돌계단의 백로. 일정도, 서두름도 없다.",
          "Una garceta en los escalones junto al mar. Sin agenda ni prisa.",
        ),
      ),
    },
    { type: "heading", body: tx("06 — With Family", "06 — 家人时刻 · With Family", "06 — 가족과 함께", "06 — Con la familia") },
    {
      type: "text",
      body: tx(
        "Later my family came. This huge Shiba, and we sat beside it for an afternoon. The city was the same city. With family there, it wasn't. Living alone is daily life. Family arriving is a memory.",
        "后来家人来了。这只大柴犬，我们在旁边坐了一下午。城还是那座城，有家人在，就不一样了。一个人住是生活，一家人来是记忆。",
        "나중에 가족이 왔다. 이 큰 시바견 옆에서 한 오후를 보냈다. 도시는 같은 도시였지만, 가족이 있으면 달랐다. 혼자 사는 건 일상, 가족이 오면 기억이 된다.",
        "Después vino mi familia. Este Shiba enorme, y nos sentamos a su lado una tarde. La ciudad era la misma. Con la familia, no lo era. Vivir solo es rutina. Que llegue la familia es recuerdo.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "01",
        "family-afternoon",
        1376,
        1824,
        tx(
          "A giant sleeping Shiba sculpture on a lawn",
          "一只很大的睡觉柴犬装置",
          "잔디 위 거대한 잠자는 시바견 조형물",
          "Una escultura gigante de un Shiba durmiendo en el césped",
        ),
        tx(
          "A very large sleeping Shiba, and an afternoon spent sitting down with family.",
          "一只很大的睡觉柴犬，和家人一起坐下来的一个下午。",
          "아주 큰 잠자는 시바견, 가족과 함께 앉아 보낸 오후.",
          "Un Shiba dormido muy grande, y una tarde sentados con la familia.",
        ),
      ),
    },
    { type: "heading", body: tx("07 — Hong Kong in Motion", "07 — 在路上 · Hong Kong in Motion", "07 — 움직이는 홍콩", "07 — Hong Kong en movimiento") },
    {
      type: "text",
      body: tx(
        "In Hong Kong you are always on the way. MTR, ferry, bus — the whole city moves. It does not wait for you, and you do not have to wait for it. Step on. It will take you somewhere.",
        "在香港，你一直在路上。地铁、渡轮、巴士，整座城市都是流动的。这座城市不等人，你也不用等它。跳上去，它带你去哪儿都行。",
        "홍콩에서는 항상 길 위에 있다. MTR, 페리, 버스 — 도시 전체가 움직인다. 도시는 기다려 주지 않고, 너도 기다릴 필요 없다. 타기만 하면 어디든 간다.",
        "En Hong Kong siempre vas de camino. MTR, ferry, bus — la ciudad entera se mueve. No te espera, y tú no tienes que esperarla. Súbete. Te lleva a algún sitio.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "01",
        "bridge-from-the-car",
        960,
        1706,
        tx(
          "Harbour and residential towers passing the car window from a bridge",
          "行车途中从桥上看见海港与住宅楼群",
          "다리 위 차창으로 스쳐 가는 항구와 주거 타워",
          "El puerto y torres residenciales pasando por la ventana del coche desde un puente",
        ),
        tx(
          "On the bridge, in the car, harbour and towers sliding past the window.",
          "桥上，车里，海港和楼群从窗外划过去。",
          "다리 위, 차 안, 항구와 빌딩이 창밖으로 지나간다.",
          "En el puente, en el coche, el puerto y las torres pasando por la ventana.",
        ),
      ),
    },
    {
      type: "verdict",
      intro: tx(
        "Not a guidebook conclusion. The answers left after six months of living there.",
        "不是攻略结论，是住过半年以后留下的答案。",
        "가이드북 결론이 아니다. 여섯 달 살고 남은 답이다.",
        "No es la conclusión de una guía. Son las respuestas que quedaron tras seis meses viviendo allí.",
      ),
      rows: [
        {
          label: tx("Worth it", "值不值得", "갈 만한가", "¿Merece la pena?"),
          body: tx(
            "Worth it — if you are willing to live there. Three days of sightseeing will not show you the Hong Kong in this episode.",
            "值得——但前提是你愿意住下来。打卡三天，你看不到这一集里的香港。",
            "갈 만하다 — 살 의향이 있다면. 사흘 관광으로는 이 에피소드의 홍콩을 볼 수 없다.",
            "Merece la pena — si estás dispuesto a vivir allí. Tres días de turismo no te muestran el Hong Kong de este episodio.",
          ),
        },
        {
          label: tx("Who it's for", "适合谁", "누구에게", "Para quién"),
          body: tx(
            "People who want to stay in Hong Kong for a while. Alone, working remotely, or with family for a short stay — all of these fit.",
            "想在香港住一阵子的人。一个人、远程工作、带家人小住，都合适。",
            "홍콩에 한동안 머물고 싶은 사람. 혼자, 원격 근무, 가족과 짧게 — 모두 맞는다.",
            "Quien quiera quedarse en Hong Kong un tiempo. Solo, teletrabajando o con la familia unos días — encaja.",
          ),
        },
        {
          label: tx("Budget", "预算", "예산", "Presupuesto"),
          body: tx(
            "Rent is the big cost. Plan for that. Everyday meals are not expensive: a roast-meat shop downstairs, a few dozen Hong Kong dollars a meal.",
            "房租是大头，提前做好心理准备；日常吃喝不贵，楼下烧味店几十块一顿。",
            "월세가 큰 지출이다. 미리 잡아 둬라. 일상 식사는 비싸지 않다 — 아래층 훈제 가게, 한 끼 수십 홍콩 달러.",
            "El alquiler es lo gordo. Prepáralo. Comer a diario no es caro: charcutería abajo, unas decenas de HK$ por comida.",
          ),
        },
        {
          label: tx("Time", "时间", "시간", "Tiempo"),
          body: tx(
            "Start with a month. Half a year is about right. Two or three days is not enough.",
            "一个月起步，半年刚好。三天两夜不够。",
            "한 달부터. 반년이 딱 좋다. 이삼일은 부족하다.",
            "Empieza con un mes. Medio año va bien. Dos o tres días no bastan.",
          ),
        },
        {
          label: tx("The catch", "有什么坑", "주의할 점", "El truco"),
          body: tx(
            "Don't pick a tourist district just because it is busy. It costs more and it is loud. Island East is quieter, more convenient, and easier to actually live in.",
            "别为了热闹住游客区，又贵又吵。港岛东安静、方便、生活气足，更适合住。",
            "붐비니까 관광지에 살지 마라. 비싸고 시끄럽다. 아일랜드 이스트는 조용하고 편해 실제로 살기 좋다.",
            "No elijas un barrio turístico solo porque hay movimiento. Cuesta más y hay ruido. Island East es más tranquilo, práctico y más fácil para vivir.",
          ),
        },
      ],
    },
    {
      type: "quote",
      body: tx(
        "Half a year is short. Long enough to live in a place until it feels like home.",
        "半年很短，但够把一个地方，过成家了。",
        "반년은 짧다. 그곳을 집처럼 느낄 때까지 살기엔 충분하다.",
        "Medio año es poco. Bastante para vivir un sitio hasta que se sienta como hogar.",
      ),
    },
    {
      type: "text",
      body: tx(
        "Next episode: why I kept walking back to the harbour.",
        "下一集，我跟你聊聊我为什么总往维港跑。",
        "다음 에피소드: 왜 자꾸 항구로 걸어갔는지.",
        "Próximo episodio: por qué seguía volviendo al puerto.",
      ),
    },
  ],
}

const ep02: StoryEpisode = {
  number: 2,
  slug: "02-the-harbor-i-kept-coming-back-to",
  status: "published",
  publishedAt: "2026-09-26",
  title: tx("The Harbor I Kept Coming Back To", "我一次次回来的海港", "자꾸 돌아온 항구", "El puerto al que seguía volviendo"),
  dek: tx(
    "People say Hong Kong's soul is in Victoria Harbour. After six months, I believed it. Not a guidebook — why I kept coming back.",
    "有人说，香港的魂在维港。住了半年，我信了。这篇不讲攻略，讲我为什么一次次回来。",
    "사람들은 홍콩의 영혼이 빅토리아 항구에 있다고 한다. 여섯 달 뒤 나도 믿었다. 가이드북이 아니라 — 왜 자꾸 돌아왔는지.",
    "Dicen que el alma de Hong Kong está en el puerto Victoria. Tras seis meses, lo creí. No es una guía: por qué seguía volviendo.",
  ),
  cover: {
    ...shot(
      "02",
      "cover-waterfront",
      512,
      910,
      tx(
        "Victoria Harbour waterfront promenade and the skyline across the water",
        "维多利亚港海滨长廊与远处的城市天际线",
        "빅토리아 항구 해안 산책로와 건너편 스카이라인",
        "Paseo marítimo del puerto Victoria y el skyline al otro lado del agua",
      ),
    ),
  },
  blocks: [
    { type: "heading", body: tx("01 — Tourist mindset", "01 · 游客心态", "01 · 관광객 마음", "01 · Mentalidad de turista") },
    {
      type: "text",
      body: tx(
        "The first time I went to the harbour, I was a tourist: take a photo, leave. Beautiful in the frame. That was about it.",
        "我第一次去维港，是游客心态，拍张照就走。照片里很美，但也就那样。",
        "처음 항구에 갔을 때는 관광객이었다: 사진 찍고 떠난다. 액자 속으론 아름답다. 그 정도였다.",
        "La primera vez que fui al puerto, fui turista: foto y marcha. Bonito en el encuadre. Eso era casi todo.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "02",
        "harbour-overcast",
        512,
        910,
        tx(
          "Victoria Harbour and the skyline under low cloud",
          "阴云下开阔的维多利亚港与城市天际线",
          "낮은 구름 아래 빅토리아 항구와 스카이라인",
          "El puerto Victoria y el skyline bajo nubes bajas",
        ),
      ),
    },
    { type: "heading", body: tx("02 — After I lived here", "02 · 住下来之后", "02 · 살기 시작한 뒤", "02 · Después de vivir aquí") },
    {
      type: "text",
      body: tx(
        "After I lived here, I came back again and again — not for photos. Passing by. Bringing friends. Needing wind when my head felt heavy.",
        "住下来之后才发现，我会一次次回来，不是为了拍照。是路过顺便看看，是朋友来了带他们去，是心里有点闷想吹吹风。",
        "여기 살고 나서는 자꾸 돌아왔다 — 사진 때문이 아니었다. 지나가며, 친구를 데려가며, 머리가 무거울 때 바람이 필요할 때.",
        "Después de vivir aquí, volví una y otra vez — no por fotos. De paso. Llevando amigos. Necesitando viento cuando la cabeza pesaba.",
      ),
    },
    { type: "heading", body: tx("03 — Morning on the waterfront", "03 · 早晨的海滨", "03 · 아침 해안", "03 · Mañana en el paseo") },
    {
      type: "text",
      body: tx(
        "In the morning the promenade is quiet, the water flat, the city not awake yet. That hour of the harbour belongs to locals — not crowded, calm.",
        "早上，海滨长廊没什么人，海是平的，城市还没醒。这个时间的维港是本地人的，不挤，安静。",
        "아침이면 산책로는 조용하고, 바다는 평평하고, 도시는 아직 안 깼다. 그 시간의 항구는 현지 사람 것 — 붐비지 않고 고요하다.",
        "Por la mañana el paseo está tranquilo, el agua plana, la ciudad aún dormida. Esa hora del puerto es de locales — sin aglomeraciones, calmada.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "02",
        "morning-calm",
        512,
        910,
        tx(
          "A calm morning looking out over Victoria Harbour",
          "晴朗早晨从海滨望向平静的维多利亚港",
          "맑은 아침, 빅토리아 항구를 바라본 고요한 풍경",
          "Una mañana tranquila mirando el puerto Victoria",
        ),
      ),
    },
    { type: "heading", body: tx("04 — The ferry", "04 · 渡轮", "04 · 페리", "04 · El ferry") },
    {
      type: "text",
      body: tx(
        "Ferries leave one after another. A few minutes and you are on the other side. A few dollars for a ticket — the best-value “cruise” I have taken.",
        "渡轮一班接一班，几分钟就晃到对岸。几块钱的船票，是我坐过性价比最高的“游船”。",
        "페리는 줄지어 떠난다. 몇 분이면 건너편. 몇 달러짜리 표 — 내가 탄 ‘크루즈’ 중 가성비 최고.",
        "Los ferries salen uno tras otro. Unos minutos y estás al otro lado. Unos dólares el billete — el “crucero” con mejor relación calidad-precio que he hecho.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "02",
        "ferry-crossing",
        512,
        910,
        tx(
          "A ferry crossing Victoria Harbour with towers on the far shore",
          "维多利亚港水面上的渡轮与远岸楼群",
          "빅토리아 항구를 건너는 페리와 저편 타워",
          "Un ferry cruzando el puerto Victoria con torres en la orilla lejana",
        ),
      ),
    },
    { type: "heading", body: tx("05 — The red-sail junk", "05 · 红帆船", "05 · 붉은 돛 정", "05 · El junk de vela roja") },
    {
      type: "text",
      body: tx(
        "The red-sail junk is still the same, slow, as if time costs nothing on that deck. Every time I see it, I stop and look a little longer.",
        "红帆船还是老样子，慢悠悠的，好像时间在它那儿不值钱。每次看到它，我都会停下来多看一会儿。",
        "붉은 돛 정은 여전히 같다, 느리게, 그 갑판에서는 시간이 공짜인 것처럼. 볼 때마다 멈춰 조금 더 본다.",
        "El junk de vela roja sigue igual, lento, como si el tiempo no costara nada en esa cubierta. Cada vez que lo veo, paro y miro un poco más.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "02",
        "red-sail-junk",
        512,
        910,
        tx(
          "A red-sail junk on Victoria Harbour",
          "维多利亚港上的红帆船与远处城市楼群",
          "빅토리아 항구의 붉은 돛 정",
          "Un junk de vela roja en el puerto Victoria",
        ),
      ),
    },
    { type: "heading", body: tx("06 — Everyone busy", "06 · 各忙各的", "06 · 각자 바쁘게", "06 · Cada uno a lo suyo") },
    {
      type: "text",
      body: tx(
        "Fishing boats, freighters, tour boats — each doing its own work, nobody in anyone else's way. The harbour feels like a big living room. There is room for every kind of boat.",
        "渔船、货船、游船，各忙各的，谁也不打扰谁。海港像个大客厅，什么船都有位置。",
        "어선, 화물선, 관광선 — 각자 일하고, 서로 방해하지 않는다. 항구는 큰 거실 같다. 모든 배에 자리가 있다.",
        "Barcos de pesca, cargueros, turísticos — cada uno con su trabajo, sin estorbar. El puerto parece un salón grande. Hay sitio para todo tipo de barco.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "02",
        "harbour-boats",
        512,
        910,
        tx(
          "Boats on Victoria Harbour with towers on both shores",
          "维多利亚港上的船只与两岸楼群",
          "양쪽 기슭의 타워와 빅토리아 항구의 배들",
          "Barcos en el puerto Victoria con torres en ambas orillas",
        ),
      ),
    },
    { type: "heading", body: tx("07 — Cloudy days count", "07 · 阴天也行", "07 · 흐린 날도", "07 · Los días nublados valen") },
    {
      type: "text",
      body: tx(
        "Cloudy days work too. Clouds sit low, and the harbour has more mood. Don't only come on bright days — overcast Victoria Harbour holds its own.",
        "阴天来也行，云压得很低，海港反而更有味道。别只挑大晴天来，维港阴天不输。",
        "흐린 날도 괜찮다. 구름이 낮게 깔리면 항구에 분위기가 더 있다. 맑은 날만 오지 마라 — 흐린 빅토리아 항구도 충분하다.",
        "Los días nublados también valen. Las nubes bajas dan más ambiente al puerto. No vengas solo con sol — el puerto Victoria nublado se defiende solo.",
      ),
    },
    { type: "heading", body: tx("08 — Victoria Harbour", "08 · 维多利亚港", "08 · 빅토리아 항구", "08 · Puerto Victoria") },
    {
      type: "text",
      body: tx(
        "The railing says VICTORIA HARBOUR. The name is not modest. It earns it.",
        "栏杆上刻着 VICTORIA HARBOUR，这名字起得真不客气，但也真配。它确实担得起。",
        "난간에 VICTORIA HARBOUR라고 새겨져 있다. 겸손한 이름은 아니다. 그만큼 값한다.",
        "La barandilla dice VICTORIA HARBOUR. El nombre no es modesto. Se lo gana.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "02",
        "victoria-harbour-sign",
        512,
        910,
        tx(
          "A VICTORIA HARBOUR sign on the waterfront railing",
          "海滨栏杆上的 VICTORIA HARBOUR 标识",
          "해안 난간의 VICTORIA HARBOUR 표지",
          "Un letrero VICTORIA HARBOUR en la barandilla del paseo",
        ),
      ),
    },
    { type: "heading", body: tx("09 — Bringing friends", "09 · 带朋友来", "09 · 친구 데려오기", "09 · Traer amigos") },
    {
      type: "text",
      body: tx(
        "Whenever friends visit Hong Kong, I bring them here. I don't need to say much. The harbour speaks for itself.",
        "每次有朋友来香港，我都带他们来这儿，什么都不用说。海港自己会说话。",
        "친구가 홍콩에 오면 여기 데려온다. 많이 말할 필요 없다. 항구가 스스로 말한다.",
        "Cuando vienen amigos a Hong Kong, los traigo aquí. No hace falta decir mucho. El puerto habla solo.",
      ),
    },
    { type: "heading", body: tx("10 — Sun and cloud", "10 · 晴天阴天", "10 · 맑음과 흐림", "10 · Sol y nube") },
    {
      type: "text",
      body: tx(
        "Clear days have their look. Cloudy days have theirs. I came here countless times in six months. Not once was I disappointed.",
        "晴天有晴天的看头，阴天有阴天的看头。半年里我来了无数次，没一次失望的。",
        "맑은 날엔 맑은 날의 볼거리, 흐린 날엔 흐린 날의 볼거리. 반년 동안 수없이 왔다. 한 번도 실망하지 않았다.",
        "Los días claros tienen su aspecto. Los nublados, el suyo. Vine innumerables veces en seis meses. Nunca me decepcionó.",
      ),
    },
    { type: "heading", body: tx("11 — Closing", "11 · 结语", "11 · 마무리", "11 · Cierre") },
    {
      type: "quote",
      body: tx(
        "Some places are enough once. The harbour is not. It is the kind of place you keep coming back to.",
        "有些地方去一次就够了。维港不是，它是那种你会一次次回来的地方。",
        "어떤 곳은 한 번이면 충분하다. 항구는 아니다. 자꾸 돌아오게 되는 그런 곳이다.",
        "Algunos sitios bastan una vez. El puerto no. Es de esos a los que sigues volviendo.",
      ),
    },
    {
      type: "verdict",
      intro: tx(
        "Not a guidebook conclusion. The answers left after coming back again and again.",
        "不是攻略结论，是一次次回来以后留下的答案。",
        "가이드북 결론이 아니다. 자꾸 돌아온 뒤 남은 답이다.",
        "No es la conclusión de una guía. Las respuestas que quedaron tras volver una y otra vez.",
      ),
      rows: [
        {
          label: tx("Worth it", "值不值得", "갈 만한가", "¿Merece la pena?"),
          body: tx(
            "Worth it — go, and go again. A Hong Kong trip without the harbour is half a trip.",
            "值得，一去再去。香港之行不来维港等于没来。",
            "갈 만하다 — 가고, 또 가라. 항구 없는 홍콩 여행은 반쪽이다.",
            "Merece la pena — ve, y vuelve. Un viaje a Hong Kong sin el puerto es medio viaje.",
          ),
        },
        {
          label: tx("Who it's for", "适合谁", "누구에게", "Para quién"),
          body: tx(
            "First-timers. People who live here. Anyone bringing friends or family.",
            "第一次来香港的人；住下来的人；带朋友、带家人的人。",
            "처음 온 사람. 여기 사는 사람. 친구나 가족을 데려오는 사람.",
            "Primera visita. Quien vive aquí. Cualquiera que traiga amigos o familia.",
          ),
        },
        {
          label: tx("Budget", "预算", "예산", "Presupuesto"),
          body: tx(
            "The promenade is free. Star Ferry is a few Hong Kong dollars. Red-sail tours follow the operator's price — check ahead (as of 2026).",
            "海滨散步免费；天星小轮几块钱；红帆船游船按船公司定价，提前查（2026）。",
            "산책로는 무료. 스타 페리는 몇 홍콩 달러. 붉은 돛 투어는 업체 요금 — 미리 확인(2026년 기준).",
            "El paseo es gratis. Star Ferry cuesta unos HK$. Los tours de vela roja van por tarifa del operador — mira antes (a 2026).",
          ),
        },
        {
          label: tx("Time", "时间", "시간", "Tiempo"),
          body: tx(
            "Morning is quieter. Dusk into dark, when the lights come on, is the best look. Leave at least half a day — don't rush.",
            "早晨人少安静；傍晚到天黑灯亮起来最好看；至少留半天，别赶。",
            "아침이 한적하다. 해 질 무렵 불이 켜질 때가 가장 좋다. 최소 반나절 — 서두르지 마라.",
            "Por la mañana hay menos gente. Del atardecer a la noche, cuando se encienden las luces, es lo mejor. Deja medio día como mínimo — sin prisa.",
          ),
        },
        {
          label: tx("The catch", "有没有坑", "주의할 점", "El truco"),
          body: tx(
            "Holidays and evenings are crowded — go off-peak. Windy by the water; bring a layer on cloudy days. Don't only walk the Tsim Sha Tsui side — Central and North Point waterfronts are worth it too. Red-sail sailings are limited; check times if you want to ride.",
            "节假日和晚上人多，错峰；海边风大，阴天带件外套；别只走尖沙咀一侧，对岸的中环／北角海滨也值得走；红帆船班次有限，想坐提前查时间。",
            "연휴와 저녁은 붐빈다 — 한산할 때 가라. 바닷가는 바람 — 흐린 날 겉옷. 침사추이만 걷지 마라 — 센트럴·노스 포인트 해안도 볼 만하다. 붉은 돛 운항은 제한적 — 타려면 시간 확인.",
            "Festivos y noches hay gente — ve fuera de pico. Hay viento junto al agua; capa en días nublados. No camines solo Tsim Sha Tsui — los paseos de Central y North Point también valen. Salidas de vela roja limitadas; mira horarios si quieres subir.",
          ),
        },
      ],
    },
    {
      type: "text",
      body: tx(
        "Next episode: what I actually ate in Hong Kong.",
        "下一集，讲我在香港真正吃过的东西。",
        "다음 에피소드: 홍콩에서 실제로 먹은 것.",
        "Próximo episodio: lo que comí de verdad en Hong Kong.",
      ),
    },
  ],
}

const ep03: StoryEpisode = {
  number: 3,
  slug: "03-what-i-actually-ate",
  status: "published",
  publishedAt: "2026-09-28",
  title: tx("What I Actually Ate in Hong Kong", "我真正在香港吃的东西", "홍콩에서 내가 실제로 먹은 것", "Lo que comí de verdad en Hong Kong"),
  dek: tx(
    "Not a top-ten list — meals I actually ate, with photos: dai pai dong, double rice, steamed fish, roast meats, roujiamo.",
    "不是十大美食榜单，而是有照片为证的一顿顿饭：大排档、双拼饭、清蒸鱼、烧肉、肉夹馍。",
    "탑텐 리스트가 아니다. 사진이 있는 진짜 한 끼들: 대파이동, 더블 라이스, 찐 생선, 훈제, 러우자모.",
    "No es un top ten: comidas que sí hice, con fotos — dai pai dong, arroz doble, pescado al vapor, asados, roujiamo.",
  ),
  cover: {
    ...shot(
      "03",
      "double-rice",
      1280,
      1707,
      tx(
        "Char siu and white-cut chicken double rice",
        "叉烧白切鸡双拼饭",
        "차슈와 백절계 더블 라이스",
        "Arroz doble de char siu y pollo blanco",
      ),
    ),
  },
  heroVideo: {
    src: "/stories/hong-kong/03/hero.mp4",
    poster: shot(
      "03",
      "double-rice",
      1280,
      1707,
      tx(
        "Char siu and white-cut chicken double rice",
        "叉烧白切鸡双拼饭",
        "차슈와 백절계 더블 라이스",
        "Arroz doble de char siu y pollo blanco",
      ),
    ),
  },
  blocks: [
    {
      type: "text",
      body: tx(
        "At the gate I ate a bagel and thought: wait for me, Hong Kong. After landing — dai pai dong beer, char siu and white-cut chicken double rice, steamed fish, roujiamo — this is not a ranking. It is what I actually ate, with photos.",
        "登机前，我在机场啃 bagel，心想：等着吧，香港。落地之后，从大排档啤酒到叉烧白切鸡双拼，从清蒸鱼到肉夹馍——这篇不写榜单，写我真正吃过的东西，有照片为证。",
        "탑승구에서 베이글을 씹으며 생각했다: 기다려라, 홍콩. 착륙 뒤 — 대파이동 맥주, 차슈·백절계 더블 라이스, 찐 생선, 러우자모. 순위가 아니라, 내가 실제로 먹은 것. 사진이 있다.",
        "En la puerta comí un bagel y pensé: espérame, Hong Kong. Tras aterrizar — cerveza en dai pai dong, arroz doble de char siu y pollo blanco, pescado al vapor, roujiamo. No es un ranking. Es lo que comí de verdad, con fotos.",
      ),
    },
    { type: "heading", body: tx("01 — Bagel at the gate", "01 · 登机口的 bagel", "01 · 탑승구 베이글", "01 · Bagel en la puerta") },
    {
      type: "photo",
      photo: shot(
        "03",
        "bagel",
        1080,
        1920,
        tx("Eating a bagel at a United gate before boarding", "机场登机口啃 bagel", "유나이티드 탑승구에서 베이글", "Comiendo un bagel en la puerta de United"),
      ),
    },
    {
      type: "text",
      body: tx(
        "At United gate 27 I chewed a bagel and thought: wait for me, Hong Kong. After landing, the bagel was already a joke — the contrast was brutal.",
        "登机前，我在 United 27 号登机口啃 bagel，心想：等着吧，香港。没想到落地之后，bagel 很快就被抛在脑后了——对比太惨烈。",
        "유나이티드 27번 탑승구에서 베이글을 씹으며 생각했다: 기다려라, 홍콩. 착륙하니 베이글은 금방 잊혔다 — 대비가 너무 심했다.",
        "En la puerta 27 de United mordí un bagel y pensé: espérame, Hong Kong. Tras aterrizar, el bagel ya era una broma — el contraste fue brutal.",
      ),
    },
    { type: "heading", body: tx("02 — First meal: dai pai dong", "02 · 落地第一顿：大排档", "02 · 첫 끼: 대파이동", "02 · Primera comida: dai pai dong") },
    {
      type: "photo",
      photo: shot(
        "03",
        "dai-pai-dong",
        1080,
        1920,
        tx("Round table and beer at a dai pai dong", "大排档圆桌啤酒", "대파이동 원탁과 맥주", "Mesa redonda y cerveza en un dai pai dong"),
      ),
    },
    {
      type: "text",
      body: tx(
        "First meal after landing: dai pai dong. Round table, beer, cheers first. At places like this, friends matter more than the menu — though the food is fine too.",
        "落地第一顿，大排档走起。圆桌，啤酒，先干为敬。这种港式小店，朋友聚一块，气氛比什么都重要，菜反而是其次——当然菜也不差。",
        "착륙 후 첫 끼는 대파이동. 원탁, 맥주, 먼저 건배. 이런 가게에선 메뉴보다 친구가 중요하다 — 물론 음식도 나쁘지 않다.",
        "Primera comida tras aterrizar: dai pai dong. Mesa redonda, cerveza, brindis primero. En sitios así importan más los amigos que la carta — aunque la comida también vale.",
      ),
    },
    { type: "heading", body: tx("03 — Char siu + white-cut chicken", "03 · 叉烧白切鸡双拼", "03 · 차슈·백절계 더블", "03 · Char siu y pollo blanco") },
    {
      type: "text",
      body: tx(
        "Roast-meat rice is still my default — upgraded this time: char siu plus white-cut chicken. The chicken is silky, the char siu sweet, the rice soaked in juice. One bowl, two tastes. Honest food.",
        "烧味饭还是我的标配，不过这次升级了：叉烧加白切鸡，来个双拼。白切鸡滑，叉烧甜，饭吸饱了汁，一碗两吃，特别实在。",
        "훈제 고기 덮밥은 여전히 기본 — 이번엔 업그레이드: 차슈에 백절계. 닭은 부드럽고, 차슈는 달고, 밥이 국물을 먹는다. 한 그릇에 두 맛. 실하다.",
        "El arroz de asado sigue siendo mi base — esta vez subido: char siu más pollo blanco. El pollo seda, el char siu dulce, el arroz empapado. Un bowl, dos sabores. Comida honesta.",
      ),
    },
    { type: "heading", body: tx("04 — Steamed fish", "04 · 清蒸鱼", "04 · 찐 생선", "04 · Pescado al vapor") },
    {
      type: "photo",
      photo: shot(
        "03",
        "steamed-fish",
        1080,
        1920,
        tx("Steamed fish with scallion oil", "清蒸鱼", "파기름 찐 생선", "Pescado al vapor con aceite de cebolleta"),
      ),
    },
    {
      type: "text",
      body: tx(
        "Steamed fish, scallions hit with hot oil — the flesh barely holds on chopsticks. Steaming shows how fresh a fish is. A shop that dares to steam usually has the goods.",
        "清蒸鱼，葱丝一爆，鱼肉嫩得筷子都夹不住。清蒸最见一条鱼新不新鲜，敢清蒸的店，食材一般都有底气。",
        "찐 생선, 파에 뜨거운 기름 — 살이 젓가락에 안 잡힐 만큼 연하다. 찜은 신선도를 드러낸다. 찜을 하는 가게는 재료에 자신이 있다.",
        "Pescado al vapor, cebolleta con aceite caliente — la carne casi no se sujeta al palillo. El vapor delata frescura. Quien se atreve a vapor, suele tener materia.",
      ),
    },
    { type: "heading", body: tx("05 — Fermented-bean pepper shrimp", "05 · 豉椒炒虾", "05 · 두반장 고추 새우", "05 · Gambas al pimiento y douban") },
    {
      type: "photo",
      photo: shot(
        "03",
        "shrimp",
        1280,
        1707,
        tx("Stir-fried shrimp with fermented black bean and pepper", "豉椒炒虾", "두반장·고추 볶음 새우", "Gambas salteadas con douban y pimiento"),
      ),
    },
    {
      type: "text",
      body: tx(
        "Fermented-bean pepper shrimp with Blue Girl — each bite opens the appetite more. Half the joy of a dai pai dong is the dish; half is cold beer. Big shrimp, wok heat on the pepper.",
        "豉椒炒虾，就着 Blue Girl，越吃越开胃。大排档的快乐，一半在菜，一半在冰啤酒。虾要大只，豉椒要够镬气。",
        "두반장 고추 새우에 Blue Girl — 먹을수록 입맛이 열린다. 대파이동의 즐거움은 반이 요리, 반이 차가운 맥주. 새우는 크고, 고추는 웍 기운이 있어야 한다.",
        "Gambas al douban y pimiento con Blue Girl — cada bocado abre más el apetito. La mitad del dai pai dong es el plato; la otra, cerveza fría. Gambas grandes, fuego de wok en el pimiento.",
      ),
    },
    { type: "heading", body: tx("06 — Small plates tell the truth", "06 · 小碟见真功夫", "06 · 작은 접시가 실력", "06 · Los platos chicos dicen la verdad") },
    {
      type: "photo",
      photo: shot(
        "03",
        "cucumber",
        1280,
        1707,
        tx("Smashed cucumber cold dish", "拍黄瓜", "찍은 오이 냉채", "Pepino aplastado en frío"),
      ),
    },
    {
      type: "text",
      body: tx(
        "Don't only watch the big dishes. Smashed cucumber, garlic greens — small plates show the craft. Seasoning and heat: one cold bite tells you everything.",
        "别光盯着大菜。拍黄瓜、蒜蓉菜心，这种小碟才见真功夫。调味准不准、火候到不到位，一口凉菜全交代了。",
        "큰 요리만 보지 마라. 찍은 오이, 마늘 청경채 — 작은 접시가 실력을 보여준다. 간과 불 — 찬 한 입이 다 말한다.",
        "No mires solo los platos grandes. Pepino aplastado, verdura al ajo — los chicos muestran oficio. Sazón y fuego: un bocado frío lo dice todo.",
      ),
    },
    { type: "heading", body: tx("07 — Japanese yakiniku", "07 · 日式烧肉", "07 · 일식 야키니쿠", "07 · Yakiniku japonés") },
    {
      type: "photo",
      photo: shot(
        "03",
        "yakiniku",
        1280,
        1707,
        tx("Japanese yakiniku wagyu on the grill", "日式烧肉和牛", "그릴 위 와규 야키니쿠", "Wagyu de yakiniku japonés en la parrilla"),
      ),
    },
    {
      type: "text",
      body: tx(
        "Japanese yakiniku was on the list too. Wagyu hits the grill and sizzles. In Hong Kong you can eat almost any cuisine — Japanese, Korean, Southeast Asian. That range is the point.",
        "日式烧肉也安排过。和牛往烤盘上一放，滋滋冒油。在香港想吃什么菜系都有，日料韩料东南亚菜全得很，这就是它的好。",
        "일식 야키니쿠도 했다. 와규가 그릴에 닿으면 지글거린다. 홍콩에선 거의 모든 요리를 먹을 수 있다 — 일식, 한식, 동남아. 그 폭이 장점이다.",
        "También hubo yakiniku japonés. El wagyu toca la parrilla y chisporrotea. En Hong Kong puedes comer casi cualquier cocina — japonesa, coreana, sudeste asiático. Ese abanico es el punto.",
      ),
    },
    { type: "heading", body: tx("08 — Roujiamo and pepper pork", "08 · 肉夹馍和青椒炒肉", "08 · 러우자모와 청고추 돼지고기", "08 · Roujiamo y cerdo al pimiento") },
    {
      type: "photo",
      photo: shot(
        "03",
        "roujiamo",
        1280,
        1707,
        tx("Tongguan roujiamo", "潼关肉夹馍", "퉁관 러우자모", "Roujiamo de Tongguan"),
      ),
    },
    {
      type: "text",
      body: tx(
        "Tongguan roujiamo — perfect for a craving in Hong Kong. And green-pepper stir-fried pork, hammered wok brought to the table, full of wok heat. Hometown flavours show up everywhere; Hong Kong's range is wider than you think.",
        "潼关肉夹馍，在香港解馋一流。还有青椒炒肉，锤纹小锅直接上桌，镬气十足。家乡味在哪儿都找得到，香港的包容度比想象中大。",
        "퉁관 러우자모 — 홍콩에서 땡길 때 최고. 청고추 돼지고기볶음은 망치 무늬 웍이 그대로 나오고 웍 기운이 있다. 고향 맛은 어디서든 찾을 수 있고, 홍콩의 폭은 생각보다 크다.",
        "Roujiamo de Tongguan — ideal para un antojo en Hong Kong. Y cerdo al pimiento verde, wok martillado a la mesa, fuego de wok. Los sabores de casa aparecen en todas partes; Hong Kong abarca más de lo que crees.",
      ),
    },
    { type: "heading", body: tx("09 — Red and white", "09 · 红的白的", "09 · 빨간 것과 흰 것", "09 · Tinto y blanco") },
    {
      type: "photo",
      photo: shot(
        "03",
        "baijiu",
        1280,
        1707,
        tx("Red Star erguotou on the table", "红星二锅头", "탁자 위 홍성 얼궈터우", "Erguotou Red Star en la mesa"),
      ),
    },
    {
      type: "text",
      body: tx(
        "Red and white both showed up: Red Star erguotou at 56°, Rémy Martin cognac — anything can be talked through at the table. In Hong Kong, the meal table is the best social room. Deals and friendships happen over dinner.",
        "红的白的都上过：红星二锅头五十六度，路易老爷干邑——酒桌上什么都能聊。在香港，饭桌是最好的社交场，谈事交朋友都在一顿饭里。",
        "빨간 것과 흰 것 둘 다: 홍성 얼궈터우 56도, 레미 마틴 코냑 — 술상에서는 뭐든 이야기할 수 있다. 홍콩에서 밥상은 최고의 사교장. 일과 친구는 한 끼 안에 있다.",
        "Tinto y blanco: erguotou Red Star a 56°, cognac Rémy Martin — en la mesa se puede hablar de todo. En Hong Kong, la mesa es el mejor salón social. Negocios y amistades caben en una comida.",
      ),
    },
    { type: "heading", body: tx("10 — Noodles and taste", "10 · 汤面和味道", "10 · 국수와 맛", "10 · Fideos y sabor") },
    {
      type: "photo",
      photo: shot(
        "03",
        "noodles",
        1280,
        1707,
        tx("Home-style soup noodles with tofu and carrot", "家常汤面", "두부·당근 가정식 국수", "Fideos de caldo caseros con tofu y zanahoria"),
      ),
    },
    {
      type: "text",
      body: tx(
        "Home-style soup noodles — tofu cubes, shredded carrot — that solid kind of meal. So don't only chase lists. In Hong Kong, remembering a city starts with remembering how it tastes.",
        "家常汤面，豆腐丁胡萝卜丝，吃的是个踏实。所以别光盯着榜单——在香港，记住一座城市，是从记住它的味道开始的。",
        "가정식 국수 — 두부 알갱이, 당근 채 — 든든한 한 끼. 그러니 리스트만 쫓지 마라. 홍콩에서 도시를 기억하는 일은, 그 맛을 기억하는 일에서 시작한다.",
        "Fideos de caldo caseros — tofu en dados, zanahoria en tiras — esa comida sólida. Así que no persigas solo listas. En Hong Kong, recordar una ciudad empieza por recordar cómo sabe.",
      ),
    },
    {
      type: "verdict",
      intro: tx(
        "Not a guidebook conclusion. The answers left after eating through the city.",
        "不是攻略结论，是真正吃过以后留下的答案。",
        "가이드북 결론이 아니다. 도시를 먹어 본 뒤 남은 답이다.",
        "No es la conclusión de una guía. Las respuestas que quedaron tras comerse la ciudad.",
      ),
      rows: [
        {
          label: tx("Worth it", "值不值得", "갈 만한가", "¿Merece la pena?"),
          body: tx(
            "Worth it. Hong Kong's eating is not on the lists — it is in dai pai dongs, neighbourhood shops, and honest bowls of rice.",
            "值得。香港的“吃”不在榜单里，在大排档、街坊小店和一碗碗实在的饭里。",
            "갈 만하다. 홍콩의 ‘먹’은 리스트가 아니라 대파이동, 동네 가게, 실한 밥그릇에 있다.",
            "Merece la pena. El comer de Hong Kong no está en las listas — está en dai pai dongs, tiendas del barrio y bowls honestos.",
          ),
        },
        {
          label: tx("Who it's for", "适合谁", "누구에게", "Para quién"),
          body: tx(
            "First-timers. People who live here. Anyone who wants solid food without spending big — and anyone curious about every cuisine at once.",
            "第一次来香港的人；住下来的人；不想花大钱、想吃得实在的人；什么菜系都想试的人。",
            "처음 온 사람. 여기 사는 사람. 큰돈 없이 실하게 먹고 싶은 사람. 온갖 요리를 다 맛보고 싶은 사람.",
            "Primera visita. Quien vive aquí. Quien quiere comer bien sin gastar mucho — y quien quiera probar de todo.",
          ),
        },
        {
          label: tx("Budget", "预算", "예산", "Presupuesto"),
          body: tx(
            "Double rice and noodle bowls: a few dozen HKD. Dai pai dong: tens to a bit over a hundred per person. Yakiniku and finer roast: from about one to two hundred up. Michelin is optional, not required. (as of 2026)",
            "双拼饭、粉面几十块港币一份；大排档人均几十到一百多；烧肉、日料人均一两百起；米其林另算，但不是必须。（2026）",
            "더블 라이스·국수 한 그릇 수십 홍콩 달러. 대파이동 인당 수십~백여. 야키니쿠·고급 훈제는 백~이백부터. 미슐랭은 선택, 필수는 아니다. (2026년 기준)",
            "Arroz doble y fideos: unas decenas de HK$. Dai pai dong: de decenas a algo más de cien por persona. Yakiniku y asados mejores: desde unos cien o doscientos. Michelin es opcional. (a 2026)",
          ),
        },
        {
          label: tx("Time", "时间", "시간", "Tiempo"),
          body: tx(
            "Lunch or dinner both work. Skip the 12:00–13:00 office rush and queues shrink. Dai pai dongs get better after dark.",
            "午市晚市都行；避开 12:00–13:00 写字楼午饭高峰，排队少很多；大排档越夜越有气氛。",
            "점심·저녁 모두 괜찮다. 12:00–13:00 오피스 러시를 피하면 줄이 줄어든다. 대파이동은 밤이 더 분위기 있다.",
            "Comida o cena valen. Evita el pico de oficina 12:00–13:00 y hay menos cola. Los dai pai dong ganan de noche.",
          ),
        },
        {
          label: tx("The catch", "有没有坑", "주의할 점", "El truco"),
          body: tx(
            "Viral spots mean long queues and easy disappointment. Many street shops take cash or Octopus only — bring a way to pay. Sharing tables in cha chaan tengs is normal. Skip food that is too spicy or too raw if your stomach disagrees.",
            "网红店排队久、期望容易落空；街边小店大多只收现金或八达通，备好支付方式；茶餐厅拼桌是常态，别介意；太辣的、太生的看自己肠胃，别硬撑。",
            "바이럴 가게는 줄이 길고 기대가 쉽게 무너진다. 길거리 가게는 현금·옥토퍼스만 받는 곳이 많다. 차찬텡 합석은 일상. 너무 맵거나 날것은 위장에 맞춰라.",
            "Los sitios virales tienen cola larga y decepción fácil. Muchas tiendas de calle solo cash u Octopus. Compartir mesa en cha chaan teng es normal. Si es demasiado picante o crudo, no fuerces el estómago.",
          ),
        },
      ],
    },
    {
      type: "text",
      body: tx(
        "Next episode: Hong Kong in motion.",
        "下一集，讲流动的香港。",
        "다음 에피소드: 움직이는 홍콩.",
        "Próximo episodio: Hong Kong en movimiento.",
      ),
    },
    {
      type: "text",
      body: tx(
        "BGM: Meditation Impromptu 03 by Kevin MacLeod (incompetech.com), CC BY 4.0.",
        "BGM：Meditation Impromptu 03 by Kevin MacLeod (incompetech.com)，CC BY 4.0。",
        "BGM: Meditation Impromptu 03 by Kevin MacLeod (incompetech.com), CC BY 4.0.",
        "BGM: Meditation Impromptu 03 by Kevin MacLeod (incompetech.com), CC BY 4.0.",
      ),
    },
  ],
}

const ep04: StoryEpisode = {
  number: 4,
  slug: "04-hong-kong-in-motion",
  status: "published",
  publishedAt: "2026-09-28",
  title: tx(
    "Hong Kong in Motion",
    "行走的香港：我怎样穿过这座城市",
    "움직이는 홍콩: 내가 이 도시를 가로지른 방식",
    "Hong Kong en movimiento: cómo crucé la ciudad",
  ),
  dek: tx(
    "Hong Kong is small, but I was on the road every day. Bridges, ferries, the waterfront walk — how I actually crossed the city.",
    "香港很小，但我每天都在路上。开车过桥、坐渡轮过海、沿海滨步道——地铁、渡轮、大桥和双脚，这就是我穿过香港的方式。",
    "홍콩은 작지만 매일 길 위에 있었다. 다리, 페리, 해안 산책 — 내가 실제로 도시를 가로지른 방식.",
    "Hong Kong es pequeño, pero yo iba por la calle cada día. Puentes, ferries, el paseo marítimo — cómo crucé la ciudad de verdad.",
  ),
  cover: {
    ...shot(
      "04",
      "bridge-driving",
      1080,
      1920,
      tx(
        "Driving across a Hong Kong bridge",
        "开车经过大桥",
        "홍콩 다리를 차로 건너는 장면",
        "Cruzando un puente de Hong Kong en coche",
      ),
    ),
  },
  heroVideo: {
    src: "/stories/hong-kong/04/hero.mp4",
    poster: shot(
      "04",
      "bridge-driving",
      1080,
      1920,
      tx(
        "Driving across a Hong Kong bridge",
        "开车经过大桥",
        "홍콩 다리를 차로 건너는 장면",
        "Cruzando un puente de Hong Kong en coche",
      ),
    ),
  },
  blocks: [
    {
      type: "text",
      body: tx(
        "Hong Kong is small, but I was on the road every day. MTR, ferry, bridges, and my own feet — this is not about attractions. It is how I crossed the city, and the other Hong Kong you see from the road.",
        "香港很小，但我每天都在路上。地铁、渡轮、大桥和双脚——这篇不写景点，写我穿过这座城市的方式，以及在路上看到的另一座香港。",
        "홍콩은 작지만 매일 길 위에 있었다. MTR, 페리, 다리, 두 발 — 명소 이야기가 아니다. 도시를 가로지른 방식, 그리고 길에서 본 다른 홍콩.",
        "Hong Kong es pequeño, pero yo iba por la calle cada día. MTR, ferry, puentes y mis pies — no es sobre atracciones. Es cómo crucé la ciudad, y el otro Hong Kong que se ve desde el camino.",
      ),
    },
    { type: "heading", body: tx("01 — On the road every day", "01 · 每天都在路上", "01 · 매일 길 위", "01 · En la calle cada día") },
    {
      type: "text",
      body: tx(
        "Hong Kong is small, but I was on the road every day. After I lived here I learned: touring and living run on different clocks — visitors chase sights; residents chase the next train, the next boat.",
        "香港很小，但我每天都在路上。住下来之后才发现，逛这座城市和旅游时完全是两种节奏——游客赶景点，住下来的人赶的是下一班车、下一班船。",
        "홍콩은 작지만 매일 길 위에 있었다. 여기 살고 나서 알았다: 관광과 살기는 다른 박자다 — 관광객은 명소를 쫓고, 사는 사람은 다음 차·다음 배를 쫓는다.",
        "Hong Kong es pequeño, pero yo iba por la calle cada día. Tras vivir aquí lo vi: turistear y vivir van a otro ritmo — el visitante persigue vistas; quien vive persigue el siguiente tren, el siguiente barco.",
      ),
    },
    { type: "heading", body: tx("02 — Hong Kong from the bridge", "02 · 桥上的香港", "02 · 다리 위 홍콩", "02 · Hong Kong desde el puente") },
    {
      type: "photo",
      photo: shot(
        "04",
        "cable-bridge",
        1080,
        1920,
        tx("Cable-stayed bridge and freighters on the water", "斜拉桥与海面货船", "사장교와 바다 위 화물선", "Puente atirantado y cargueros en el agua"),
      ),
    },
    {
      type: "text",
      body: tx(
        "Driving a bridge is another feeling. Once you are up, the city spreads under you: homes on this side, docks on that, hills farther out. Hong Kong has many bridges and tunnels — you often come out into a different scene.",
        "开车过桥是另一种感觉。桥一上去，城市就在脚下铺开：桥这边是住宅，那边是码头，再远一点就是山。香港的桥多，隧道也多，钻出来常常是另一番景象。",
        "다리를 차로 건너는 건 다른 감각이다. 올라가면 도시가 발밑에 펼쳐진다: 이쪽은 주택, 저쪽은 부두, 더 멀리 산. 홍콩은 다리와 터널이 많다 — 나오면 종종 다른 풍경이다.",
        "Cruzar un puente en coche es otra sensación. Arriba, la ciudad se abre bajo ti: casas a un lado, muelles al otro, montañas más lejos. Hong Kong tiene muchos puentes y túneles — sales a menudo a otra escena.",
      ),
    },
    { type: "heading", body: tx("03 — Ferry: a few minutes off", "03 · 渡轮：几分钟的假期", "03 · 페리: 몇 분의 휴가", "03 · Ferry: unos minutos libres") },
    {
      type: "photo",
      photo: shot(
        "04",
        "ferry",
        1080,
        1920,
        tx("Crossing the harbour on a ferry", "坐渡轮过海", "페리로 항구를 건너는 장면", "Cruzando el puerto en ferry"),
      ),
    },
    {
      type: "text",
      body: tx(
        "When I want a view, I take the ferry. Crossing only takes a few minutes; the towers slide back. Sit by the rail, feel the wind — a short break for the head. Probably the best-value “trip” in the whole city.",
        "想看风景的时候，我就坐渡轮。过海其实只要几分钟，船一开，两岸的楼就往后退。坐在船边吹吹风，短短几分钟，像给脑子放了个假——这大概是全香港性价比最高的“旅行”。",
        "풍경이 보고 싶으면 페리를 탄다. 건너는 데 몇 분이면 되고, 양안의 빌딩이 뒤로 밀린다. 난간에 앉아 바람 — 머리에 짧은 휴가. 아마 도시 전체에서 가성비 최고인 ‘여행’.",
        "Cuando quiero vista, cojo el ferry. Cruzar son unos minutos; las torres se van atrás. Siéntate al borde, viento — un descanso corto para la cabeza. Probablemente el “viaje” con mejor precio de toda la ciudad.",
      ),
    },
    { type: "heading", body: tx("04 — Measuring by foot", "04 · 用脚丈量", "04 · 발로 재다", "04 · Medir a pie") },
    {
      type: "photo",
      photo: shot(
        "04",
        "waterfront-walk",
        1080,
        1920,
        tx("Walking the waterfront promenade", "海滨步道", "해안 산책로를 걷는 장면", "Caminando por el paseo marítimo"),
      ),
    },
    {
      type: "text",
      body: tx(
        "On the ground I use two feet. The waterfront walk can take one or two hours — no rush, and you see more. Many “photo spots” visitors chase are just what locals see on a daily stroll.",
        "到了地面就靠两条腿。海滨步道一走就是一两个小时，不赶时间，反而看得更多。很多游客打卡的机位，其实都是本地人散步时随手看到的日常。",
        "땅에 내려오면 두 발이다. 해안 산책은 한두 시간 — 서두르지 않으면 더 보인다. 관광객이 찍는 ‘포토 스팟’ 많은 것이 현지인이 산책하다 보는 일상이다.",
        "En tierra uso dos pies. El paseo marítimo puede llevar una o dos horas — sin prisa, y ves más. Muchos “sitios de foto” que persiguen los visitantes son lo que un local ve en un paseo diario.",
      ),
    },
    { type: "heading", body: tx("05 — A layered city", "05 · 立体的城市", "05 · 입체 도시", "05 · Una ciudad en capas") },
    {
      type: "photo",
      photo: shot(
        "04",
        "overpass",
        1080,
        1920,
        tx("Urban space under an overpass", "高架桥下的城市空间", "고가 아래의 도시 공간", "Espacio urbano bajo un paso elevado"),
      ),
    },
    {
      type: "text",
      body: tx(
        "Keep walking and you notice the city is layered: skybridges, lifts, hillside paths, all linked. Under the overpass: a pitch and a playground. On a roof: a lookout. Every level has people living their day.",
        "走着走着会发现，这座城市是立体的：天桥、电梯、山路全连在一起。高架桥下是球场和游乐场，楼顶是观景台，每一层都有人在过自己的生活。",
        "걷다 보면 도시가 입체라는 걸 안다: 스카이브리지, 엘리베이터, 산길 — 다 이어져 있다. 고가 아래는 운동장과 놀이터, 옥상은 전망대. 층마다 각자의 일상이 있다.",
        "Si sigues andando ves que la ciudad es por capas: pasarelas, ascensores, caminos de ladera, todo unido. Bajo el paso elevado: campo y parque. En una azotea: un mirador. En cada nivel hay gente viviendo su día.",
      ),
    },
    { type: "heading", body: tx("06 — From the rooftop", "06 · 天台视角", "06 · 옥상 시선", "06 · Desde la azotea") },
    {
      type: "photo",
      photo: shot(
        "04",
        "rooftop",
        1080,
        1920,
        tx("City view from a rooftop lookout", "天台观景台俯瞰城市", "옥상 전망대에서 본 도시", "Vista de la ciudad desde un mirador en azotea"),
      ),
    },
    {
      type: "text",
      body: tx(
        "Sometimes I go up to a rooftop lookout. The whole city opens out, and you finally see how the roads and bridges you just crossed actually connect. Hong Kong is not large — but the density and layers only read from above.",
        "偶尔上到天台观景台，整座城市摊开在眼前，才意识到刚才穿过的那些路、那些桥，原来是这样连起来的。香港不大，但密度和层次感，站得高才看得全。",
        "가끔 옥상 전망대에 오른다. 도시 전체가 펼쳐지고, 방금 건넌 길과 다리가 어떻게 이어지는지 보인다. 홍콩은 크지 않다 — 밀도와 층은 위에서야 보인다.",
        "A veces subo a un mirador de azotea. La ciudad se abre, y ves cómo se conectan las calles y puentes que acabas de cruzar. Hong Kong no es grande — pero la densidad y las capas solo se leen desde arriba.",
      ),
    },
    { type: "heading", body: tx("07 — The industrial shore", "07 · 工业岸线的另一面", "07 · 공업 해안의 다른 면", "07 · La orilla industrial") },
    {
      type: "photo",
      photo: shot(
        "04",
        "industrial",
        1080,
        1920,
        tx("Industrial waterfront and working harbour", "工业岸线", "공업 해안과 일하는 항구", "Frente industrial y puerto en marcha"),
      ),
    },
    {
      type: "text",
      body: tx(
        "It is not only Central towers. Drive the industrial shore and the container yards — that is the other side of how the city runs. Visitors rarely come. People who live here know: Hong Kong is not only finance and shopping. It also works.",
        "不止有中环的高楼。开车经过工业岸线、货柜码头，才是这座城市运转的另一面。游客很少来，但住下来的人都知道：香港不只有金融和购物，还有实实在在干活的样子。",
        "센트럴 타워만이 아니다. 공업 해안과 컨테이너 야드를 차로 지나면 — 도시가 돌아가는 다른 면이다. 관광객은 거의 안 온다. 사는 사람은 안다: 홍콩은 금융과 쇼핑만이 아니다. 일도 한다.",
        "No son solo las torres de Central. Pasa en coche por la orilla industrial y los contenedores — esa es la otra cara de cómo funciona la ciudad. Los visitantes casi no vienen. Quien vive aquí lo sabe: Hong Kong no es solo finanzas y compras. También trabaja.",
      ),
    },
    { type: "heading", body: tx("08 — Closing", "08 · 结语", "08 · 마무리", "08 · Cierre") },
    {
      type: "text",
      body: tx(
        "MTR, ferry, bridges, feet — that is how I crossed Hong Kong, and how I remember it. Next time you come, don't only stare at the MTR map. Take one ferry. Walk one stretch of waterfront. Hong Kong will feel different.",
        "地铁、渡轮、大桥、双脚，这就是我穿过香港的方式，也是我记住它的方式。下次你来，别只盯着地铁线路图——坐一回渡轮，走一段海滨步道，香港会不一样。",
        "MTR, 페리, 다리, 두 발 — 그렇게 홍콩을 가로질렀고, 그렇게 기억한다. 다음에 오면 MTR 노선도만 보지 마라. 페리 한 번. 해안 한 구간. 홍콩이 달라 보일 것이다.",
        "MTR, ferry, puentes, pies — así crucé Hong Kong, y así lo recuerdo. La próxima vez, no mires solo el mapa del MTR. Coge un ferry. Camina un tramo de paseo. Hong Kong se sentirá distinto.",
      ),
    },
    {
      type: "verdict",
      intro: tx(
        "Not a guidebook conclusion. The answers left after crossing the city this way.",
        "不是攻略结论，是这样穿过城市以后留下的答案。",
        "가이드북 결론이 아니다. 이렇게 도시를 가로지른 뒤 남은 답이다.",
        "No es la conclusión de una guía. Las respuestas que quedaron tras cruzar la ciudad así.",
      ),
      rows: [
        {
          label: tx("Worth it", "值不值得", "갈 만한가", "¿Merece la pena?"),
          body: tx(
            "Worth it. Attractions are for visitors; the roads are for people who live here — change how you move, and you change which city you see.",
            "值得。景点是给游客的，路是给住下来的人的——换一种交通方式，等于换一座城市看。",
            "갈 만하다. 명소는 관광객용이고, 길은 사는 사람용이다 — 이동 방식을 바꾸면 보이는 도시가 바뀐다.",
            "Merece la pena. Las atracciones son para visitantes; las calles, para quien vive — cambia cómo te mueves y cambias qué ciudad ves.",
          ),
        },
        {
          label: tx("Who it's for", "适合谁", "누구에게", "Para quién"),
          body: tx(
            "Anyone who wants more than check-ins. People with time to walk slowly. Families with kids or elders who need an easier pace.",
            "不止打卡、想真正感受城市的人；时间充裕、愿意慢慢走的人；带老人小孩、需要轻松节奏的家庭。",
            "체크인만이 아니라 도시를 느끼고 싶은 사람. 천천히 걸을 시간이 있는 사람. 아이·어르신이 있어 편한 리듬이 필요한 가족.",
            "Quien quiera más que fotos de checklist. Quien tenga tiempo para ir despacio. Familias con niños o mayores que necesiten un ritmo fácil.",
          ),
        },
        {
          label: tx("Budget", "预算", "예산", "Presupuesto"),
          body: tx(
            "Harbour ferry: a few HKD — best value in town. MTR by distance: roughly a dozen to twenty in the urban area. Waterfront walks and many rooftop lookouts: free. (as of 2026)",
            "渡轮过海几块钱港币，是全城性价比最高的体验；地铁按里程计费，市区内十几二十块；海滨步道和天台观景台免费。（2026）",
            "항구 페리 몇 홍콩 달러 — 도시 최고 가성비. MTR은 거리별, 시내는 대략 십여~이십. 해안 산책과 많은 옥상 전망대는 무료. (2026년 기준)",
            "Ferry del puerto: unos HK$ — el mejor precio de la ciudad. MTR por distancia: unos diez a veinte en zona urbana. Paseos marítimos y muchos miradores: gratis. (a 2026)",
          ),
        },
        {
          label: tx("Time", "时间", "시간", "Tiempo"),
          body: tx(
            "Ferry at dusk for the best light. Leave 1–2 hours for the waterfront walk. Drive bridges off peak — otherwise you mostly see brake lights.",
            "渡轮挑傍晚，光线最好；海滨步道留 1–2 小时慢慢走；开车过桥避开早晚高峰，不然只看得到车尾灯。",
            "페리는 해 질 녘이 빛이 좋다. 해안 산책은 1–2시간. 다리는 출퇴근을 피하라 — 아니면 브레이크등만 보인다.",
            "Ferry al atardecer, mejor luz. Deja 1–2 horas para el paseo. Cruza puentes fuera de hora punta — si no, solo verás luces de freno.",
          ),
        },
        {
          label: tx("The catch", "有没有坑", "주의할 점", "El truco"),
          body: tx(
            "Ferry frequency drops at night — check the last sailing. Summer walks need water and a hat; UV is harsh. Some rooftop lookouts need a booking or a purchase — check ahead. Tunnels and bridges jam at peak; pad your time.",
            "渡轮班次晚上会减少，查好末班船时间；夏天暴走记得带水和帽子，紫外线很毒；天台观景台有的需要预约或消费，提前查；隧道和大桥堵车时段很磨人，时间预算打宽一点。",
            "페리 밤에는 줄어든다 — 막차 확인. 여름 산책은 물과 모자; 자외선이 세다. 옥상 전망대는 예약·소비가 필요한 곳 있음 — 미리 확인. 터널·다리는 피크에 막힌다; 시간을 넉넉히.",
            "De noche hay menos ferries — mira la última. En verano lleva agua y gorra; el UV pega. Algunos miradores piden reserva o consumo — mira antes. Túneles y puentes se atascan en punta; deja margen.",
          ),
        },
      ],
    },
    {
      type: "text",
      body: tx(
        "Next episode: small moments I didn't plan.",
        "下一集，讲我没计划到的小瞬间。",
        "다음 에피소드: 계획하지 않은 작은 순간.",
        "Próximo episodio: pequeños momentos que no planeé.",
      ),
    },
    {
      type: "text",
      body: tx(
        "BGM: George Street Shuffle by Kevin MacLeod (incompetech.com), CC BY 4.0.",
        "BGM：George Street Shuffle by Kevin MacLeod (incompetech.com)，CC BY 4.0。",
        "BGM: George Street Shuffle by Kevin MacLeod (incompetech.com), CC BY 4.0.",
        "BGM: George Street Shuffle by Kevin MacLeod (incompetech.com), CC BY 4.0.",
      ),
    },
  ],
}

const ep05: StoryEpisode = {
  number: 5,
  slug: "05-small-moments-i-didnt-plan",
  status: "published",
  publishedAt: "2026-09-28",
  title: tx(
    "Small Moments I Didn't Plan",
    "没计划的小时刻：行程表上找不到的香港",
    "계획하지 않은 작은 순간: 일정표에 없는 홍콩",
    "Pequeños momentos que no planeé",
  ),
  dek: tx(
    "Before Hong Kong I made a list. What I remember most was never on it — an egret, a cloudy harbour, horse statues, a plaque I finally read.",
    "来香港之前我列过一张清单，但现在记得最牢的，都是清单上没有的东西：白鹭、阴天、马雕像、第一次认真读的维多利亚港铭牌。",
    "홍콩 오기 전 리스트를 적었다. 가장 또렷한 건 리스트에 없었다 — 백로, 흐린 항구, 말 조각상, 처음으로 읽은 빅토리아 항구 명판.",
    "Antes de Hong Kong hice una lista. Lo que más recuerdo no estaba en ella: una garceta, un puerto nublado, estatuas de caballos, una placa que por fin leí.",
  ),
  cover: {
    ...shot(
      "05",
      "egret",
      1080,
      1920,
      tx(
        "An egret standing still on stone steps by the sea",
        "海边石阶上发呆的白鹭",
        "바닷가 돌계단에 가만히 선 백로",
        "Una garceta quieta en escalones de piedra junto al mar",
      ),
    ),
  },
  heroVideo: {
    src: "/stories/hong-kong/05/hero.mp4",
    poster: shot(
      "05",
      "egret",
      1080,
      1920,
      tx(
        "An egret standing still on stone steps by the sea",
        "海边石阶上发呆的白鹭",
        "바닷가 돌계단에 가만히 선 백로",
        "Una garceta quieta en escalones de piedra junto al mar",
      ),
    ),
  },
  blocks: [
    {
      type: "text",
      body: tx(
        "Before Hong Kong I made a list. What I remember most was never on it — egret, cloudy day, horse statues, spiral tower, and the Victoria Harbour plaque I finally read carefully. These are the small moments you cannot plan.",
        "来香港之前，我列过一张清单。但现在记得最牢的，都是清单上没有的东西——白鹭、阴天、马雕像、螺旋塔，和第一次认真读的维多利亚港铭牌。这篇写的就是这些没法计划的小时刻。",
        "홍콩 오기 전 리스트를 적었다. 가장 또렷한 건 리스트에 없었다 — 백로, 흐린 날, 말 조각상, 나선 타워, 처음으로 꼼꼼히 읽은 빅토리아 항구 명판. 계획할 수 없는 작은 순간들이다.",
        "Antes de Hong Kong hice una lista. Lo que más recuerdo no estaba: garceta, día nublado, caballos, torre en espiral y la placa del puerto Victoria que por fin leí. Son los momentos pequeños que no se planean.",
      ),
    },
    { type: "heading", body: tx("01 — Off the list", "01 · 清单之外", "01 · 리스트 밖", "01 · Fuera de la lista") },
    {
      type: "photo",
      photo: shot(
        "05",
        "glimpse",
        1080,
        1920,
        tx("A glimpse of the harbour", "海港一瞥", "항구 한 장면", "Un vistazo al puerto"),
      ),
    },
    {
      type: "text",
      body: tx(
        "Guides tell you where to go. They do not tell you which glance will make you stop. This episode is not the attractions on a list — it is the moments that bumped into me off the list.",
        "攻略只告诉你去哪，却不告诉你哪一眼会让你停下来。这篇不写清单上的景点，写那些在清单之外撞上我的瞬间。",
        "가이드는 어디로 갈지만 알려 준다. 어떤 시선이 멈출지는 말하지 않는다. 이 편은 리스트의 명소가 아니라, 리스트 밖에서 부딪힌 순간이다.",
        "Las guías dicen adónde ir. No dicen qué mirada te detiene. Este episodio no son las atracciones de una lista — son los momentos que me chocaron fuera de ella.",
      ),
    },
    { type: "heading", body: tx("02 — Egret on the steps", "02 · 石阶上的白鹭", "02 · 돌계단의 백로", "02 · Garceta en los escalones") },
    {
      type: "text",
      body: tx(
        "An egret stood on the stone steps by the sea, not moving. It looked at the water more calmly than I did. I watched it through my phone for a long time — and suddenly the schedule on my list felt less important.",
        "一只白鹭站在海边的石阶上发呆，一动不动。它看海的样子，比我还悠闲。我举着手机看了它很久，忽然觉得行程表上那点安排，好像也没那么重要了。",
        "백로 한 마리가 바닷가 돌계단에 서서 움직이지 않았다. 바다를 보는 모습이 나보다 여유롭다. 폰을 들고 오래 보다가 — 일정표의 그 약간의 계획이 덜 중요해 보였다.",
        "Una garceta en los escalones junto al mar, sin moverse. Miraba el agua con más calma que yo. La miré largo rato con el teléfono — y de pronto el horario de la lista importaba menos.",
      ),
    },
    { type: "heading", body: tx("03 — Cloudy harbour", "03 · 阴天的海港", "03 · 흐린 항구", "03 · Puerto nublado") },
    {
      type: "photo",
      photo: shot(
        "05",
        "cloudy-harbor",
        1080,
        1920,
        tx("Cloudy harbour with boats and piers", "阴天的海港，船只和码头", "흐린 항구, 배와 부두", "Puerto nublado con barcos y muelles"),
      ),
    },
    {
      type: "text",
      body: tx(
        "That day the harbour was cloudy. No postcard blue sky — the water looked veiled, boats and docks softened. Later I learned: overcast Victoria Harbour has another kind of beauty. Visitor guides rarely mention it.",
        "那天的海港是阴天。没有蓝天明信片式的风景，整座海像蒙了层纱，船只和码头都变得柔和起来。后来我才发现，阴天的维港有另一种好看，游客攻略里很少提。",
        "그날 항구는 흐렸다. 엽서 같은 파란 하늘이 없다 — 바다가 얇은 베일을 쓴 듯, 배와 부두가 부드러워졌다. 나중에 알았다: 흐린 빅토리아 항구엔 다른 아름다움이 있다. 관광 가이드엔 거의 없다.",
        "Ese día el puerto estaba nublado. Sin cielo azul de postal — el agua velada, barcos y muelles suaves. Después lo vi: el puerto Victoria nublado tiene otra belleza. Las guías de visitante casi no lo dicen.",
      ),
    },
    { type: "heading", body: tx("04 — Red-sail junk", "04 · 红帆船", "04 · 붉은 돛 정", "04 · Junk de vela roja") },
    {
      type: "photo",
      photo: shot(
        "05",
        "sail-junk",
        1080,
        1920,
        tx("A red-sail junk with residential towers behind it", "红帆船与住宅楼群", "붉은 돛 정과 뒤편 주거 타워", "Un junk de vela roja con torres residenciales detrás"),
      ),
    },
    {
      type: "text",
      body: tx(
        "A red-sail junk drifted past, dense housing towers behind it. Old and new packed into one frame, neither giving way. That contrast is not something you plan — you bump into it.",
        "一艘红帆船慢慢晃过去，远处是密密的住宅楼。新和旧就这么挤在一个画面里，谁也不让谁。这种反差，计划是计划不出来的，只能碰运气撞上。",
        "붉은 돛 정이 천천히 지나가고, 뒤엔 빽빽한 주거 타워. 새것과 옛것이 한 화면에 붙어서 양보하지 않는다. 그 대비는 계획할 수 없다 — 우연히 부딪힌다.",
        "Un junk de vela roja pasó despacio, torres densas detrás. Lo nuevo y lo viejo en el mismo encuadre, sin ceder. Ese contraste no se planea — te lo encuentras.",
      ),
    },
    { type: "heading", body: tx("05 — Horses on the corner", "05 · 街角的马", "05 · 모퉁이의 말", "05 · Caballos en la esquina") },
    {
      type: "photo",
      photo: shot(
        "05",
        "horse-statues",
        1080,
        1920,
        tx("Red and brown horse statues on a street corner", "街角的红色马雕像", "거리 모퉁이의 빨간·갈색 말 조각상", "Estatuas de caballos rojas y marrones en una esquina"),
      ),
    },
    {
      type: "text",
      body: tx(
        "Two horse statues appeared on a corner — one red, one brown — standing straight as if on guard. No queue for photos, no plaque explaining who they are. That kind of encounter makes you look twice.",
        "街角突然冒出两匹马雕像，一红一棕，站得笔直，像在站岗。没人排队拍照，也没人介绍它们是谁——但就是这种不期而遇，让人忍不住多看两眼。",
        "모퉁이에 말 조각상 두 마리가 갑자기 나왔다 — 하나 빨강, 하나 갈색 — 경비처럼 곧게 서 있다. 사진 줄도 없고, 누군지 소개도 없다. 그런 우연이 한 번 더 보게 한다.",
        "Dos estatuas de caballo en una esquina — una roja, una marrón — erguidas como de guardia. Sin cola para fotos, sin placa que diga quiénes son. Ese encuentro te hace mirar dos veces.",
      ),
    },
    { type: "heading", body: tx("06 — Spiral tower", "06 · 螺旋塔", "06 · 나선 타워", "06 · Torre en espiral") },
    {
      type: "photo",
      photo: shot(
        "05",
        "spiral-tower",
        1080,
        1920,
        tx("Looking up at a spiral tower", "螺旋塔仰拍", "나선 타워를 올려다본 장면", "Mirando hacia arriba una torre en espiral"),
      ),
    },
    {
      type: "text",
      body: tx(
        "Look up at the spiral tower from another angle and it feels almost alien. The same building from far away and from under your chin are two different things. Sometimes the view is fine — you just have not found the angle.",
        "螺旋塔换个角度抬头看，有点像外星建筑。同一栋楼，站远了看和仰着脖子看，完全是两个东西。有时候不是风景不够好，是角度没找对。",
        "나선 타워를 다른 각도로 올려다보면 외계 건물 같다. 같은 건물도 멀리서 볼 때와 목 빼고 볼 때는 다르다. 가끔 풍경이 부족한 게 아니라, 각도를 못 찾은 것이다.",
        "Mira la torre en espiral desde otro ángulo y parece casi alienígena. El mismo edificio de lejos y desde abajo son dos cosas. A veces la vista está bien — solo no has encontrado el ángulo.",
      ),
    },
    { type: "heading", body: tx("07 — The plaque I finally read", "07 · 第一次认真读的铭牌", "07 · 처음으로 읽은 명판", "07 · La placa que por fin leí") },
    {
      type: "photo",
      photo: shot(
        "05",
        "plaque",
        1080,
        1920,
        tx("Victoria Harbour railing plaque and a life ring", "维多利亚港栏杆铭牌与救生圈", "빅토리아 항구 난간 명판과 구명부환", "Placa del puerto Victoria y un salvavidas"),
      ),
    },
    {
      type: "text",
      body: tx(
        "The plaque says Victoria Harbour. I had passed it a hundred times before I read it carefully. The red-and-white life ring on the rail photographs well. After living here I got it: familiar places deserve a second look.",
        "铭牌上写着维多利亚港，我路过一百次，第一次认真读它。旁边的救生圈红白相间，挂在栏杆上特别上镜。住下来之后才懂：熟悉的地方，也值得重新看一遍。",
        "명판에는 빅토리아 항구라고 쓰여 있다. 백 번 지나치고 나서야 처음으로 꼼꼼히 읽었다. 옆 빨간·흰 구명부환이 난간에 걸려 잘 찍힌다. 여기 살고 나서야 안다: 익숙한 곳도 다시 볼 가치가 있다.",
        "La placa dice Victoria Harbour. La pasé cien veces antes de leerla con cuidado. El salvavidas rojo y blanco en la barandilla queda bien en foto. Tras vivir aquí lo entendí: lo familiar también merece otra mirada.",
      ),
    },
    { type: "heading", body: tx("08 — Closing", "08 · 结语", "08 · 마무리", "08 · Cierre") },
    {
      type: "photo",
      photo: shot(
        "05",
        "promenade",
        1080,
        1920,
        tx("Distant view along the harbour promenade", "海港远景", "항구 산책로 먼 풍경", "Vista lejana del paseo del puerto"),
      ),
    },
    {
      type: "text",
      body: tx(
        "None of these moments can be planned, and none come back the same way. So now I leave blank space on the schedule — for egret, for cloudy days, for horses that appear on a corner. The part of Hong Kong that moves you most often hides in that blank space.",
        "这些时刻都没法计划，也没法重来。所以行程表上，我现在都会留一点空白——给白鹭，给阴天，给街角突然冒出来的马。香港真正动人的部分，往往就藏在这些空白里。",
        "이 순간들은 계획할 수 없고, 같은 방식으로 다시 오지도 않는다. 그래서 이제 일정에 빈칸을 둔다 — 백로에게, 흐린 날에게, 모퉁이에 갑자기 나타난 말에게. 홍콩에서 가장 마음을 움직이는 부분은 그 빈칸에 숨는 경우가 많다.",
        "Ninguno de estos momentos se planea, y ninguno vuelve igual. Así que ahora dejo huecos en el horario — para la garceta, para días nublados, para caballos que salen en una esquina. Lo más conmovedor de Hong Kong suele esconderse en ese hueco.",
      ),
    },
    {
      type: "verdict",
      intro: tx(
        "Not a guidebook conclusion. The answers left after leaving blank space on purpose.",
        "不是攻略结论，是故意留白以后留下的答案。",
        "가이드북 결론이 아니다. 일부러 빈칸을 둔 뒤 남은 답이다.",
        "No es la conclusión de una guía. Las respuestas que quedaron tras dejar huecos a propósito.",
      ),
      rows: [
        {
          label: tx("Worth it", "值不值得", "갈 만한가", "¿Merece la pena?"),
          body: tx(
            "Worth it. A list is a floor. Memory is what surprise gives you — the blank part of the trip is often what sticks.",
            "值得。清单是用来保底的，但记忆是意外给的——留白的那部分行程，往往是整趟旅行里印象最深的。",
            "갈 만하다. 리스트는 바닥이다. 기억은 우연이 준다 — 여행의 빈칸이 종종 가장 오래 남는다.",
            "Merece la pena. La lista es el suelo. La memoria la da la sorpresa — lo en blanco del viaje suele ser lo que más queda.",
          ),
        },
        {
          label: tx("Who it's for", "适合谁", "누구에게", "Para quién"),
          body: tx(
            "People who are not rushing. Anyone staying more than a week who wants out of the visitor lens. People who like to shoot and note as they go.",
            "不赶行程、愿意慢慢逛的人；住下来超过一周、想跳出游客视角的人；喜欢随手拍、随手记录的人。",
            "일정을 서두르지 않고 천천히 걷는 사람. 일주일 넘게 머물며 관광객 시선을 벗어나고 싶은 사람. 지나가며 찍고 적는 사람.",
            "Quien no va con prisa. Quien se queda más de una semana y quiere salir del ángulo de turista. Quien gusta de disparar y anotar al paso.",
          ),
        },
        {
          label: tx("Budget", "预算", "예산", "Presupuesto"),
          body: tx(
            "Almost zero. Egret, cloudy days, corner statues take no ticket. Waterfront and piers are free to walk. (as of 2026)",
            "几乎为零。白鹭、阴天、街角雕像都不收门票；海滨步道、码头随便走，全程免费。（2026）",
            "거의 0. 백로, 흐린 날, 모퉁이 조각상은 입장료가 없다. 해안·부두는 공짜로 걷는다. (2026년 기준)",
            "Casi cero. Garceta, días nublados, estatuas de esquina no cobran. Paseo y muelles se caminan gratis. (a 2026)",
          ),
        },
        {
          label: tx("Time", "时间", "시간", "Tiempo"),
          body: tx(
            "Do not fill every day. Leave 1–2 hours of aimless time in the morning or evening. On cloudy days do not hide in the hotel — the harbour looks different then.",
            "别把每天排满，上午或傍晚留 1–2 小时“无目的时间”；阴天别躲酒店，阴天的海港有另一种好看。",
            "매일 꽉 채우지 마라. 아침이나 저녁에 1–2시간 ‘목적 없는 시간’을 남겨라. 흐린 날 호텔에 숨지 마라 — 그때 항구가 다르게 보인다.",
            "No llenes cada día. Deja 1–2 horas sin objetivo por la mañana o la tarde. En días nublados no te escondas en el hotel — el puerto se ve distinto.",
          ),
        },
        {
          label: tx("The catch", "有没有坑", "주의할 점", "El truco"),
          body: tx(
            "Blank space is not lying down — still bring an umbrella and water. Wildlife like egrets: watch, do not disturb, do not get too close. Corner statues are often in commercial streets; do not block the path for photos.",
            "留白不等于躺平，出门还是要带伞和水；白鹭这类野生动物只看不打扰，别靠太近；街角雕像多在商业区，拍照注意别挡路。",
            "빈칸이 드러누움은 아니다 — 우산과 물은 챙겨라. 백로 같은 야생동물은 보기만 하고 방해하지 말고, 너무 가까이 가지 마라. 모퉁이 조각상은 상업 거리에 많다 — 사진 찍을 때 길을 막지 마라.",
            "Hueco no es tumbarse — lleva paraguas y agua. Fauna como garcetas: mira, no molestes, no te acerques demasiado. Las estatuas de esquina suelen estar en zonas comerciales; no bloquees el paso para la foto.",
          ),
        },
      ],
    },
    {
      type: "text",
      body: tx(
        "Next episode: Hong Kong with family.",
        "下一集，讲和家人一起的香港。",
        "다음 에피소드: 가족과 함께한 홍콩.",
        "Próximo episodio: Hong Kong con la familia.",
      ),
    },
    {
      type: "text",
      body: tx(
        "BGM: Meditation Impromptu 01 by Kevin MacLeod (incompetech.com), CC BY 4.0.",
        "BGM：Meditation Impromptu 01 by Kevin MacLeod (incompetech.com)，CC BY 4.0。",
        "BGM: Meditation Impromptu 01 by Kevin MacLeod (incompetech.com), CC BY 4.0.",
        "BGM: Meditation Impromptu 01 by Kevin MacLeod (incompetech.com), CC BY 4.0.",
      ),
    },
  ],
}

const ep06: StoryEpisode = {
  number: 6,
  slug: "06-hong-kong-with-family",
  status: "published",
  publishedAt: "2026-09-28",
  title: tx(
    "Hong Kong With Family",
    "和家人的香港：一座城市好不好玩，取决于和谁一起",
    "가족과 함께한 홍콩: 도시가 재미있는지는 누구와 함께냐에 달렸다",
    "Hong Kong con la familia: si una ciudad divierte depende de con quién vas",
  ),
  dek: tx(
    "People ask where Hong Kong is most fun. I cannot name a place. I remember who held whose hand. Flip the photos — people are the subject.",
    "有人问我香港最好玩的是哪里，我想了想，还真说不上来。倒是记得谁牵着谁的手。照片翻出来一看，人才是主角。",
    "사람들이 홍콩에서 어디가 제일 재미있냐고 묻는다. 장소는 말 못 하겠다. 누가 누구 손을 잡았는지는 기억난다. 사진을 넘기면 — 사람이 주인공이다.",
    "Preguntan dónde es más divertido Hong Kong. No sé nombrar un sitio. Recuerdo quién tomó de la mano a quién. Pasa las fotos — la gente es el sujeto.",
  ),
  cover: {
    ...shot(
      "06",
      "family-photo",
      1080,
      1920,
      tx(
        "Family looking out at the harbour night view from behind",
        "家人背影看海湾夜景",
        "항구 야경을 등지고 바라보는 가족",
        "Familia de espaldas mirando la bahía de noche",
      ),
    ),
  },
  heroVideo: {
    src: "/stories/hong-kong/06/hero.mp4",
    poster: shot(
      "06",
      "family-photo",
      1080,
      1920,
      tx(
        "Family looking out at the harbour night view from behind",
        "家人背影看海湾夜景",
        "항구 야경을 등지고 바라보는 가족",
        "Familia de espaldas mirando la bahía de noche",
      ),
    ),
  },
  blocks: [
    {
      type: "text",
      body: tx(
        "People ask where Hong Kong is most fun. I think about it and cannot really say. What I remember is who held whose hand. This episode is not about attractions. It is Hong Kong with family — because what stays is never only the view.",
        "有人问我香港最好玩的是哪里，我想了想，还真说不上来。倒是记得，谁牵着谁的手。这一篇不讲景点，讲和家人一起的香港——因为最后留下来的，从来都不是风景。",
        "사람들이 홍콩에서 어디가 제일 재미있냐고 묻는다. 생각해 봐도 잘 말 못 하겠다. 기억나는 건 누가 누구 손을 잡았는지다. 이 편은 명소가 아니다. 가족과 함께한 홍콩이다 — 남는 건 풍경만이 아니니까.",
        "Preguntan dónde es más divertido Hong Kong. Lo pienso y no sé decirlo. Recuerdo quién tomó de la mano a quién. Este episodio no va de atracciones. Es Hong Kong con la familia — porque lo que queda nunca es solo el paisaje.",
      ),
    },
    { type: "heading", body: tx("01 — Where is the most fun?", "01 · 最好玩的是哪里", "01 · 어디가 제일 재미있나", "01 · ¿Dónde es más divertido?") },
    {
      type: "photo",
      photo: shot(
        "06",
        "walk-together",
        1080,
        1920,
        tx("An adult and a child walking side by side on a brick pedestrian street", "母子在步行街上并肩同行", "벽돌 보행로에서 나란히 걷는 어른과 아이", "Un adulto y un niño caminando juntos en una calle peatonal de ladrillo"),
      ),
    },
    {
      type: "text",
      body: tx(
        "People ask where Hong Kong is most fun. I cannot really say. What I remember is who held whose hand. On a brick pedestrian street, one tall and one small walking forward — you do not need to look back to know the other is there.",
        "有人问我香港最好玩的是哪里，我想了想，还真说不上来。倒是记得，谁牵着谁的手。砖砌步行街上，一大一小并肩往前走，不用回头也知道对方在。",
        "사람들이 홍콩에서 어디가 제일 재미있냐고 묻는다. 잘 말 못 하겠다. 기억나는 건 누가 누구 손을 잡았는지다. 벽돌 보행로에서 큰 사람과 작은 사람이 나란히 앞으로 — 뒤돌아보지 않아도 상대가 있다.",
        "Preguntan dónde es más divertido Hong Kong. No sé decirlo. Recuerdo quién tomó de la mano a quién. En una peatonal de ladrillo, uno alto y uno pequeño hacia delante — no hace falta mirar atrás para saber que el otro está.",
      ),
    },
    { type: "heading", body: tx("02 — An old couple, slow", "02 · 慢慢走的老夫妇", "02 · 천천히 걷는 노부부", "02 · Una pareja mayor, despacio") },
    {
      type: "photo",
      photo: shot(
        "06",
        "old-couple",
        1080,
        1920,
        tx("An older couple walking slowly on a pedestrian street, seen from behind", "老夫妇在步行街上慢慢走", "보행로에서 천천히 걷는 노부부 뒷모습", "Una pareja mayor caminando despacio por una peatonal, de espaldas"),
      ),
    },
    {
      type: "text",
      body: tx(
        "An older couple walks ahead, slow, not rushing. Hong Kong is fast, but some people keep their own pace. Watching their backs, the city feels gentler than its reputation.",
        "老夫妇在前面慢慢走，不赶时间。香港节奏快，但总有人用自己的步速过日子。看着他们的背影，会觉得这座城市其实挺温柔的。",
        "노부부가 앞에서 천천히 걷는다. 서두르지 않는다. 홍콩은 빠르지만, 자기 걸음으로 사는 사람이 있다. 그 뒷모습을 보면 도시가 생각보다 다정하다.",
        "Una pareja mayor va delante, despacio, sin prisa. Hong Kong es rápido, pero hay quien vive a su paso. Al ver sus espaldas, la ciudad se siente más suave de lo que dicen.",
      ),
    },
    { type: "heading", body: tx("03 — People in the photos", "03 · 照片里的人", "03 · 사진 속 사람", "03 · La gente en las fotos") },
    {
      type: "photo",
      photo: shot(
        "06",
        "photo-montage",
        1080,
        1920,
        tx("Daytime bay and distinctive architecture from the trip album", "白天海湾和特色建筑", "여행 앨범의 낮 항구와 개성 있는 건물", "Bahía de día y arquitectura distintiva del álbum del viaje"),
      ),
    },
    {
      type: "text",
      body: tx(
        "Flip through the photos from this stretch and people are the subject. The scenery returns every year. The people you share it with do not always. By the end of the album, what you remember is faces.",
        "这趟的照片翻出来，一张张看过去，人才是主角。风景年年都在，可一起看风景的人不常在。相册翻到最后，记住的全是人。",
        "이번 사진을 넘기다 보면 사람이 주인공이다. 풍경은 해마다 있지만, 함께 본 사람은 늘 있지 않다. 앨범 끝에서 남는 건 얼굴이다.",
        "Pasa las fotos de este tramo y la gente es el sujeto. El paisaje vuelve cada año. Quien lo comparte, no siempre. Al final del álbum, lo que queda son caras.",
      ),
    },
    { type: "heading", body: tx("04 — A child's Hong Kong", "04 · 孩子的香港", "04 · 아이의 홍콩", "04 · El Hong Kong de un niño") },
    {
      type: "photo",
      photo: shot(
        "06",
        "playground",
        1080,
        1920,
        tx("Children's playground under an overpass with a red slide", "高架桥下的儿童游乐场", "고가 아래 빨간 미끄럼틀이 있는 어린이 놀이터", "Parque infantil bajo un paso elevado con tobogán rojo"),
      ),
    },
    {
      type: "text",
      body: tx(
        "With a child, Hong Kong is a big playground. Under the overpass: a kids' park, red slide, purple mascot — laughter louder than the slide. Adults watch the city. Kids watch the fun.",
        "和孩子来，香港就是个大游乐场。高架桥下的儿童乐园，红色滑梯，紫色吉祥物——孩子的笑声比滑梯还高。大人看的是城市，孩子看的全是乐子。",
        "아이와 오면 홍콩은 큰 놀이터다. 고가 아래 어린이 공원, 빨간 미끄럼틀, 보라 마스코트 — 웃음이 미끄럼틀보다 높다. 어른은 도시를 보고, 아이는 재미만 본다.",
        "Con un niño, Hong Kong es un parque grande. Bajo el paso elevado: parque infantil, tobogán rojo, mascota púrpura — risas más altas que el tobogán. Los adultos miran la ciudad. Los niños, la diversión.",
      ),
    },
    { type: "heading", body: tx("05 — Shiba and the whole family", "05 · 柴犬和全家", "05 · 시바와 온 가족", "05 · Shiba y toda la familia") },
    {
      type: "photo",
      photo: shot(
        "06",
        "shiba",
        1080,
        1920,
        tx("A giant sleeping Shiba sculpture with family around it", "巨型睡觉柴犬和家庭场景", "거대한 잠자는 시바 조형물과 그 주변 가족", "Una escultura gigante de Shiba dormido con la familia alrededor"),
      ),
    },
    {
      type: "text",
      body: tx(
        "A giant Shiba sprawled asleep, the whole family laughing around it. The loosest moments on a trip often have nothing to do with attractions — the fun stuff is frequently off the plan.",
        "一只巨型柴犬睡得四仰八叉，全家都围着它笑。旅行里最松弛的时刻，往往和景点一点关系都没有——好玩的东西，常常是计划之外的。",
        "거대한 시바가 뻗어 자고, 온 가족이 둘러싸고 웃는다. 여행에서 가장 느슨한 순간은 명소와 무관한 경우가 많다 — 재미있는 건 종종 계획 밖이다.",
        "Un Shiba gigante dormido de cualquier manera, toda la familia riéndose alrededor. Los momentos más sueltos de un viaje casi no tienen que ver con atracciones — lo divertido suele estar fuera del plan.",
      ),
    },
    { type: "heading", body: tx("06 — Family album", "06 · 家庭相册", "06 · 가족 앨범", "06 · Álbum familiar") },
    {
      type: "text",
      body: tx(
        "In another set, the whole family raises hands for a group shot — sea and towers behind. Behind every group photo is a promise to come again together. Photos age. The promise does not.",
        "另一组照片里，全家举手合影，背后是海和对岸的楼。每张合影背后，都是一次“下次还一起来”的约定。照片会旧，约定不会。",
        "다른 묶음에선 온 가족이 손을 들고 단체 사진 — 뒤는 바다와 맞은편 빌딩. 단체 사진마다 ‘다음에 또 같이’라는 약속이 있다. 사진은 낡는다. 약속은 안 낡는다.",
        "En otro set, toda la familia levanta las manos para la foto — mar y torres detrás. Detrás de cada foto de grupo hay un “volvamos juntos”. Las fotos envejecen. La promesa no.",
      ),
    },
    { type: "heading", body: tx("07 — Closing", "07 · 结语", "07 · 마무리", "07 · Cierre") },
    {
      type: "photo",
      photo: shot(
        "06",
        "rooftop",
        1080,
        1920,
        tx("City view from a rooftop lookout", "天台观景台俯瞰城市", "옥상 전망대에서 본 도시", "Vista de la ciudad desde un mirador en azotea"),
      ),
    },
    {
      type: "text",
      body: tx(
        "Whether a city is fun really depends on who you are with. With kids, Hong Kong is a playground. With family, it is the park near home. Next time, bring the people who matter.",
        "一座城市好不好玩，真的取决于和谁一起。和孩子来，香港是游乐场；和家人来，香港就是家附近的公园。下次来，把重要的人带上。",
        "도시가 재미있는지는 정말 누구와 함께냐에 달렸다. 아이와 오면 홍콩은 놀이터. 가족과 오면 집 근처 공원. 다음에는 중요한 사람을 데려와라.",
        "Si una ciudad divierte depende de verdad de con quién vas. Con niños, Hong Kong es un parque. Con la familia, el parque cerca de casa. La próxima vez, trae a quien importa.",
      ),
    },
    {
      type: "verdict",
      intro: tx(
        "Not a guidebook conclusion. The answers left after sharing the city with family.",
        "不是攻略结论，是和家人一起走过以后留下的答案。",
        "가이드북 결론이 아니다. 가족과 도시를 나눈 뒤 남은 답이다.",
        "No es la conclusión de una guía. Las respuestas que quedaron tras compartir la ciudad con la familia.",
      ),
      rows: [
        {
          label: tx("Worth it", "值不值得", "갈 만한가", "¿Merece la pena?"),
          body: tx(
            "Worth it. Attractions get old. People do not — Hong Kong with family doubles the experience.",
            "值得。景点会看腻，人不会——和家人在一起的香港，体验是加倍的。",
            "갈 만하다. 명소는 질린다. 사람은 안 질린다 — 가족과 함께한 홍콩은 경험이 두 배다.",
            "Merece la pena. Las atracciones se gastan. La gente no — Hong Kong con la familia duplica la experiencia.",
          ),
        },
        {
          label: tx("Who it's for", "适合谁", "누구에게", "Para quién"),
          body: tx(
            "Family trips with kids or parents. Anyone who wants travel to feel like living — slow walks, not a checklist.",
            "带孩子、带父母的家庭游；想把旅行过成生活、慢慢逛的人。",
            "아이·부모님과 가는 가족 여행. 여행을 생활처럼, 천천히 걷고 싶은 사람.",
            "Viajes en familia con niños o padres. Quien quiera que el viaje se sienta como vivir — paseos lentos, no checklist.",
          ),
        },
        {
          label: tx("Budget", "预算", "예산", "Presupuesto"),
          body: tx(
            "Playgrounds and many rooftop lookouts are free or low-cost. The big spend on a family trip is food and transport — scale to taste. (as of 2026)",
            "游乐场、天台观景台大多免费或低消费；家庭出游的大头花在吃和交通上，丰俭由人。（2026）",
            "놀이터와 많은 옥상 전망대는 무료이거나 저렴하다. 가족 여행의 큰 지출은 식비와 교통 — 취향대로. (2026년 기준)",
            "Parques y muchos miradores son gratis o baratos. El gasto gordo en familia es comida y transporte — a tu gusto. (a 2026)",
          ),
        },
        {
          label: tx("Time", "时间", "시간", "Tiempo"),
          body: tx(
            "With elders or kids, slow down — one or two stops a day is enough. Playgrounds on weekdays: fewer people, more room to play.",
            "带老人小孩节奏放慢，一天一两个点就够；游乐场挑工作日去，人少玩得开。",
            "어르신·아이와 가면 속도를 낮춰라 — 하루에 한두 곳이면 충분. 놀이터는 평일 — 사람 적고 더 놀 수 있다.",
            "Con mayores o niños, baja el ritmo — uno o dos puntos al día bastan. Parques entre semana: menos gente, más espacio.",
          ),
        },
        {
          label: tx("The catch", "有没有坑", "주의할 점", "El truco"),
          body: tx(
            "Summer outdoors: sunscreen and water. With elders or kids, skip peak crowds. Check age and height limits on play gear. Do not only shoot scenery — get yourselves in the frame.",
            "夏天户外一定注意防晒和补水；带老人小孩尽量避开人流高峰；游乐设施留意年龄和身高限制；拍照别只顾着拍风景，记得自己也入镜。",
            "여름 야외: 선크림과 물. 어르신·아이와는 피크 인파를 피하라. 놀이기구 나이·키 제한 확인. 풍경만 찍지 마라 — 너희도 프레임에 넣어라.",
            "Verano al aire libre: protector y agua. Con mayores o niños, evita picos de gente. Mira límites de edad y altura en juegos. No dispares solo paisaje — entrad vosotros también.",
          ),
        },
      ],
    },
    {
      type: "text",
      body: tx(
        "Next episode: what I'd do again — and differently.",
        "下一集，讲我会再做的，和会换个方式做的。",
        "다음 에피소드: 다시 할 것, 다르게 할 것.",
        "Próximo episodio: lo que repetiría — y lo que haría distinto.",
      ),
    },
    {
      type: "text",
      body: tx(
        "BGM: Meditation Impromptu 02 by Kevin MacLeod (incompetech.com), CC BY 4.0.",
        "BGM：Meditation Impromptu 02 by Kevin MacLeod (incompetech.com)，CC BY 4.0。",
        "BGM: Meditation Impromptu 02 by Kevin MacLeod (incompetech.com), CC BY 4.0.",
        "BGM: Meditation Impromptu 02 by Kevin MacLeod (incompetech.com), CC BY 4.0.",
      ),
    },
  ],
}

const ep07: StoryEpisode = {
  number: 7,
  slug: "07-what-id-do-again-and-differently",
  status: "published",
  publishedAt: "2026-09-28",
  title: tx(
    "What I'd Do Again — and Differently",
    "再来一次，我会…：半年香港的 verdict",
    "다시 한다면…: 반년 홍콩의 verdict",
    "Lo que repetiría — y lo que haría distinto",
  ),
  dek: tx(
    "After six months in Hong Kong: would return (harbour, dai pai dong, waterfront), would skip (viral queues), surprises, and advice for whoever comes next.",
    "在香港住满半年，终于敢说几句大实话：还会再来的维港、大排档、海滨步道；不会再去的排长队网红店；以及白鹭、阴天这些意外之喜。",
    "홍콩에서 반년을 산 뒤: 다시 갈 곳(항구, 대파이동, 해안), 건너뛸 곳(바이럴 줄), 뜻밖의 기쁨, 나중에 올 사람을 위한 조언.",
    "Tras seis meses en Hong Kong: volvería (puerto, dai pai dong, paseo), saltaría (colas virales), sorpresas y consejos para quien venga después.",
  ),
  cover: {
    ...shot(
      "07",
      "harbor-night",
      640,
      1138,
      tx("Victoria Harbour at night", "夜色中的维港", "밤의 빅토리아 항구", "Puerto Victoria de noche"),
    ),
  },
  heroVideo: {
    src: "/stories/hong-kong/07/hero.mp4",
    poster: shot(
      "07",
      "harbor-night",
      640,
      1138,
      tx("Victoria Harbour at night", "夜色中的维港", "밤의 빅토리아 항구", "Puerto Victoria de noche"),
    ),
  },
  blocks: [
    {
      type: "text",
      body: tx(
        "After six months living in Hong Kong, I finally dare a few plain truths. This episode is not attractions — it is judgment: what I would return to, what I would skip, surprises I did not plan, and advice for whoever comes next.",
        "在香港住满半年，终于敢说几句大实话。这一集不讲景点，讲判断：还会再来的、不会再去的、没想到的惊喜，还有给后来人的建议。",
        "홍콩에서 반년을 산 뒤, 드디어 몇 마디 솔직한 말을 할 수 있다. 이 편은 명소가 아니다 — 판단이다: 다시 갈 것, 건너뛸 것, 계획에 없던 놀라움, 나중에 올 사람을 위한 조언.",
        "Tras seis meses viviendo en Hong Kong, por fin me atrevo a unas verdades planas. Este episodio no es atracciones — es juicio: a qué volvería, qué saltaría, sorpresas no planeadas y consejos para quien venga después.",
      ),
    },
    { type: "heading", body: tx("01 — Straight talk", "01 · 大实话时间", "01 · 솔직한 시간", "01 · Hablar claro") },
    {
      type: "text",
      body: tx(
        "Stay long enough and your view changes. At first everything is new. After half a year you can tell what you actually like from what was only novelty. This episode is that half-year verdict.",
        "住得久了，看法会变。刚来的时候什么都新鲜，住满半年之后，反而能分清楚：哪些是真的喜欢，哪些只是图个新鲜。这一集，就是这半年的 verdict。",
        "오래 살면 시선이 바뀐다. 처음엔 전부 새롭다. 반년이 지나면 진짜 좋아하는 것과 새로움만인 것을 가른다. 이 편이 그 반년의 verdict다.",
        "Si te quedas, la mirada cambia. Al principio todo es nuevo. Tras medio año separas lo que de verdad te gusta de lo que solo era novedad. Este episodio es ese veredicto de medio año.",
      ),
    },
    { type: "heading", body: tx("02 — Would return: the harbour", "02 · 还会再来：维港", "02 · 다시 갈 곳: 항구", "02 · Volvería: el puerto") },
    {
      type: "photo",
      photo: shot(
        "07",
        "harbor-pan",
        640,
        1138,
        tx("Night view across both shores of Victoria Harbour", "维港两岸夜景", "빅토리아 항구 양안 야경", "Vista nocturna de ambas orillas del puerto Victoria"),
      ),
    },
    {
      type: "text",
      body: tx(
        "Would return: Victoria Harbour first. Clear days for light on the water. Cloudy days for low cloud. I never get tired of it — probably the place I went most in Hong Kong.",
        "还会再来的，维港排第一个。晴天去，看阳光洒在海面上；阴天也去，看云压得很低。怎么看都不腻——这大概是我在香港去得最多的地方。",
        "다시 갈 곳: 빅토리아 항구가 첫 번째. 맑은 날은 수면 위 빛. 흐린 날은 낮은 구름. 질리지 않는다 — 홍콩에서 가장 많이 간 곳일 것이다.",
        "Volvería: puerto Victoria el primero. Días claros, luz en el agua. Días nublados, nubes bajas. Nunca me canso — probablemente el sitio al que más fui en Hong Kong.",
      ),
    },
    { type: "heading", body: tx("03 — Would return: smoke and the walk", "03 · 还会再来：烟火气与步道", "03 · 다시 갈 곳: 연기와 산책로", "03 · Volvería: humo y paseo") },
    {
      type: "photo",
      photo: shot(
        "07",
        "food-street",
        640,
        1138,
        tx("Pier and boats along the working waterfront", "码头与船只", "부두와 배들", "Muelle y barcos en el frente de trabajo"),
      ),
    },
    {
      type: "text",
      body: tx(
        "Dai pai dong — sit on a plastic stool and the street energy comes back. The waterfront walk is the same: go when you need air, costs nothing. One feeds the stomach. One feeds the head.",
        "大排档，塑料凳一坐，烟火气就全回来了。海滨步道也一样，想散心就去走一段，不花一分钱。这两样，一个管胃，一个管心。",
        "대파이동 — 플라스틱 의자에 앉으면 연기와 사람 기운이 돌아온다. 해안 산책도 같다: 마음이 답답할 때 가면 되고, 공짜다. 하나는 배를, 하나는 머리를 먹인다.",
        "Dai pai dong — te sientas en un taburete de plástico y vuelve el humo de la calle. El paseo marítimo igual: vas cuando necesitas aire, no cuesta nada. Uno alimenta el estómago. Otro, la cabeza.",
      ),
    },
    { type: "heading", body: tx("04 — Would skip: viral queues", "04 · 不会再去：排长队的网红店", "04 · 건너뛸 곳: 바이럴 줄", "04 · Lo saltaría: colas virales") },
    {
      type: "photo",
      photo: shot(
        "07",
        "city-blocks",
        640,
        1138,
        tx("Dense blocks of city towers", "城市里的楼群", "빽빽한 도시 타워 군", "Bloques densos de torres urbanas"),
      ),
    },
    {
      type: "text",
      body: tx(
        "Would not go again: viral spots with long queues. Forty minutes in line, then one bite — fame belongs to someone else; the stomach is yours. Fame is not the same as liking the food. That lesson came from standing in line.",
        "不会再去的：排长队的网红店。排了四十分钟，吃进嘴里才发现——名气是别人的，胃是自己的。名气大不等于对胃口，这个道理是排队排出来的。",
        "다시 안 갈 곳: 줄 긴 바이럴 가게. 사십 분 줄 서서 한 입 — 유명은 남의 것, 위장은 내 것. 유명하다고 입에 맞는 건 아니다. 그 교훈은 줄에서 나왔다.",
        "No volvería: sitios virales con cola larga. Cuarenta minutos en fila, un bocado — la fama es de otro; el estómago es tuyo. Fama no es lo mismo que que te guste. Esa lección salió de la cola.",
      ),
    },
    { type: "heading", body: tx("05 — Surprise: the egret", "05 · 意外之喜：白鹭", "05 · 뜻밖의 기쁨: 백로", "05 · Sorpresa: la garceta") },
    {
      type: "photo",
      photo: shot(
        "07",
        "egret",
        640,
        1138,
        tx("An egret standing on a shallow shore", "浅滩上的白鹭", "얕은 물가에 선 백로", "Una garceta en la orilla baja"),
      ),
    },
    {
      type: "text",
      body: tx(
        "The surprises were never on the itinerary. One egret on the shallows stuck with me more than many attractions. The less you plan, the more often you bump into moments like that.",
        "意外之喜，都是没在行程表上的东西。一只白鹭，站在浅滩上，比很多景点都让我难忘。越是没计划，越容易撞见这种时刻。",
        "뜻밖의 기쁨은 일정표에 없었다. 얕은 물가의 백로 한 마리가 많은 명소보다 오래 남았다. 계획할수록 덜, 그런 순간에 더 자주 부딪힌다.",
        "Las sorpresas no estaban en el itinerario. Una garceta en lo bajo me quedó más que muchas atracciones. Cuanto menos planeas, más a menudo te topas con momentos así.",
      ),
    },
    { type: "heading", body: tx("06 — Surprise: cloudy days", "06 · 意外之喜：阴天", "06 · 뜻밖의 기쁨: 흐린 날", "06 · Sorpresa: días nublados") },
    {
      type: "photo",
      photo: shot(
        "07",
        "cloudy-harbor",
        640,
        1138,
        tx("Harbour under low cloud", "阴天下的海港", "낮은 구름 아래 항구", "Puerto bajo nubes bajas"),
      ),
    },
    {
      type: "text",
      body: tx(
        "And cloudy days. Before Hong Kong I thought travel needed sun. Then I found cloudy Hong Kong has another taste: cloud low, fewer people, the city half a beat slower.",
        "还有阴天。没来香港之前，我以为旅行一定要晴天。后来发现，阴天的香港有另一种味道：云很低，人很少，整座城市慢了半拍。",
        "그리고 흐린 날. 홍콩 오기 전엔 여행엔 해가 필요하다고 생각했다. 그러다 흐린 홍콩엔 다른 맛이 있다는 걸 알았다: 구름이 낮고, 사람이 적고, 도시가 반 박자 느리다.",
        "Y los días nublados. Antes de Hong Kong creía que viajar pedía sol. Luego vi que el Hong Kong nublado tiene otro sabor: nubes bajas, menos gente, la ciudad medio tiempo más lenta.",
      ),
    },
    { type: "heading", body: tx("07 — Lesson: leave blank space", "07 · 教训：留白", "07 · 교훈: 빈칸 남기기", "07 · Lección: deja hueco") },
    {
      type: "photo",
      photo: shot(
        "07",
        "keep-space",
        640,
        1138,
        tx("A sailboat on open water", "海上的帆船", "바다 위 요트", "Un velero en aguas abiertas"),
      ),
    },
    {
      type: "text",
      body: tx(
        "Lesson: do not pack the schedule. The fuller it is, the easier you miss what was never planned. Leave blank space if you want to bump into surprise — I believe that now.",
        "教训也有：行程千万别排太满。排得越满，越容易错过那些计划外的好东西。留白，才能撞见惊喜——这句话我现在是真信了。",
        "교훈도 있다: 일정을 너무 꽉 채우지 마라. 찰수록 계획에 없던 좋은 것을 놓치기 쉽다. 빈칸을 남겨야 놀라움에 부딪힌다 — 이제 진짜 믿는다.",
        "Lección: no llenes el horario. Cuanto más lleno, más fácil perder lo no planeado. Deja hueco si quieres toparte con sorpresa — ahora sí lo creo.",
      ),
    },
    { type: "heading", body: tx("08 — Closing: one line", "08 · 结语：一句话总结", "08 · 마무리: 한 줄", "08 · Cierre: una línea") },
    {
      type: "photo",
      photo: shot(
        "07",
        "pier",
        640,
        1138,
        tx("Harbour and boats from the pier", "海港与船只", "부두에서 본 항구와 배", "Puerto y barcos desde el muelle"),
      ),
    },
    {
      type: "text",
      body: tx(
        "One line: Hong Kong is worth it — but at your own pace, slow. Other people's guides are theirs. Your Hong Kong only shows up after you walk it yourself.",
        "一句话总结：香港值得，但要用自己的节奏，慢慢来。别人的攻略是别人的，你的香港，得自己走一遍才知道。",
        "한 줄: 홍콩은 갈 만하다 — 단 네 박자로, 천천히. 남의 가이드는 남의 것. 네 홍콩은 네가 걸어 봐야 안다.",
        "Una línea: Hong Kong merece la pena — pero a tu ritmo, despacio. Las guías de otros son de otros. Tu Hong Kong solo aparece cuando lo caminas tú.",
      ),
    },
    {
      type: "verdict",
      intro: tx(
        "Not a guidebook conclusion. Six months of judgment, plain.",
        "不是攻略结论，是住满半年之后留下的判断。",
        "가이드북 결론이 아니다. 반년을 산 뒤 남은 판단이다.",
        "No es la conclusión de una guía. Seis meses de juicio, en claro.",
      ),
      rows: [
        {
          label: tx("Would return", "还会再来", "다시 갈 것", "Volvería"),
          body: tx(
            "Victoria Harbour — clear or cloudy, I never tire of it. Dai pai dong: plastic stool, street energy back. Waterfront walk: go when you need air, free.",
            "维港——晴天阴天都去，怎么看都不腻；大排档，塑料凳一坐烟火气全回来；海滨步道，想散心就去走一段，不花一分钱。",
            "빅토리아 항구 — 맑든 흐리든 질리지 않는다. 대파이동: 플라스틱 의자, 연기와 사람 기운. 해안 산책: 답답할 때 가면 되고, 공짜.",
            "Puerto Victoria — claro o nublado, no me canso. Dai pai dong: taburete de plástico, vuelve el humo. Paseo marítimo: ve cuando necesites aire, gratis.",
          ),
        },
        {
          label: tx("Would skip", "不会再去", "건너뛸 것", "Lo saltaría"),
          body: tx(
            "Viral spots with long queues. Forty minutes later you learn: fame is someone else's; the stomach is yours — fame is not the same as liking the food.",
            "排长队的网红店。排了四十分钟才明白：名气是别人的，胃是自己的——名气大不等于对胃口。",
            "줄 긴 바이럴 가게. 사십 분 뒤에 안다: 유명은 남의 것, 위장은 내 것 — 유명하다고 입에 맞는 건 아니다.",
            "Sitios virales con cola larga. Tras cuarenta minutos lo ves: la fama es de otro; el estómago es tuyo — fama no es que te guste.",
          ),
        },
        {
          label: tx("Surprises", "意外之喜", "뜻밖의 기쁨", "Sorpresas"),
          body: tx(
            "An egret on the shallows stuck more than many sights. Cloudy Hong Kong has another taste. Corner things that were never on the list.",
            "一只站在浅滩上的白鹭，比很多景点都难忘；阴天的香港有另一种味道；街角那些没在行程表上的小东西。",
            "얕은 물가의 백로가 많은 명소보다 오래 남았다. 흐린 홍콩엔 다른 맛이 있다. 일정표에 없던 모퉁이 것들.",
            "Una garceta en lo bajo me quedó más que muchas vistas. El Hong Kong nublado tiene otro sabor. Cosas de esquina que nunca estaban en la lista.",
          ),
        },
        {
          label: tx("Time", "时间建议", "시간 제안", "Tiempo"),
          body: tx(
            "Do not pack the schedule — blank space is how you meet surprise. Harbour at dusk is best. Leave a full one or two hours for the waterfront walk.",
            "行程千万别排太满，留白才能撞见惊喜。维港傍晚去最好；海滨步道留出完整的一两个小时慢慢走。",
            "일정을 너무 채우지 마라 — 빈칸이 있어야 놀라움에 부딪힌다. 항구는 해 질 녘이 최고. 해안 산책은 온전한 한두 시간을 남겨라.",
            "No llenes el horario — el hueco es cómo te topas con sorpresa. El puerto al atardecer es lo mejor. Deja una o dos horas enteras para el paseo.",
          ),
        },
        {
          label: tx("The catch", "给后来人的坑", "나중에 올 사람을 위한 함정", "El truco"),
          body: tx(
            "Do not let queue length decide for you — the longer the wait, the higher the hope, the easier the letdown. Do not stuff the itinerary; blank space is not wasted time. On cloudy days do not hide in the hotel — cloudy Hong Kong is worth seeing.",
            "别被排队长度绑架，排得越长期望越高，越容易失望；别把行程塞满，留白不是浪费时间；阴天别躲在酒店，出来走走，香港的阴天值得看。",
            "줄 길이에 끌려가지 마라 — 기다릴수록 기대가 커지고, 실망도 쉽다. 일정을 가득 채우지 마라. 빈칸은 낭비 시간이 아니다. 흐린 날 호텔에 숨지 마라 — 흐린 홍콩도 볼 만하다.",
            "No dejes que la longitud de la cola decida — cuanto más esperas, más esperas, más fácil la decepción. No atestes el itinerario; el hueco no es tiempo perdido. En días nublados no te escondas en el hotel — el Hong Kong nublado merece verse.",
          ),
        },
      ],
    },
    {
      type: "text",
      body: tx(
        "Next episode: your Hong Kong, not mine.",
        "下一集，讲你的香港，不是我的。",
        "다음 에피소드: 당신의 홍콩, 내 것이 아닌.",
        "Próximo episodio: tu Hong Kong, no el mío.",
      ),
    },
    {
      type: "text",
      body: tx(
        "BGM: Meditation Impromptu 01 by Kevin MacLeod (incompetech.com), CC BY 4.0.",
        "BGM：Meditation Impromptu 01 by Kevin MacLeod (incompetech.com)，CC BY 4.0。",
        "BGM: Meditation Impromptu 01 by Kevin MacLeod (incompetech.com), CC BY 4.0.",
        "BGM: Meditation Impromptu 01 by Kevin MacLeod (incompetech.com), CC BY 4.0.",
      ),
    },
  ],
}

const ep08: StoryEpisode = {
  number: 8,
  slug: "08-your-hong-kong",
  status: "published",
  publishedAt: "2026-09-28",
  title: tx("Your Hong Kong, Not Mine", "你的香港，不是我的", "당신의 홍콩, 내 것이 아닌", "Tu Hong Kong, no el mío"),
  dek: tx(
    "The first seven episodes were my Hong Kong. This one passes the mic: where you fly from, who comes, your budget, what you care about — then build your own decision.",
    "前七集，我讲的是我的香港。这一集，把话筒递给你：你从哪座城市出发？和谁一起？预算多少？你在乎的是吃，是景，还是慢下来？",
    "앞 일곱 편은 내 홍콩이었다. 이번엔 마이크를 넘긴다: 어디서 출발하나, 누구와, 예산, 무엇을 중시하나 — 그다음 네 결정을 만들어라.",
    "Los primeros siete episodios fueron mi Hong Kong. Este pasa el micrófono: desde dónde vuelas, quién viene, presupuesto, qué te importa — y construye tu decisión.",
  ),
  cover: {
    ...shot(
      "08",
      "skyline",
      720,
      1280,
      tx(
        "City skyline from the waterfront promenade",
        "海滨步道看城市天际线",
        "해안 산책로에서 본 스카이라인",
        "Skyline desde el paseo marítimo",
      ),
    ),
  },
  heroVideo: {
    src: "/stories/hong-kong/08/hero.mp4",
    poster: shot(
      "08",
      "skyline",
      720,
      1280,
      tx(
        "City skyline from the waterfront promenade",
        "海滨步道看城市天际线",
        "해안 산책로에서 본 스카이라인",
        "Skyline desde el paseo marítimo",
      ),
    ),
  },
  blocks: [
    {
      type: "text",
      body: tx(
        "The first seven episodes were my Hong Kong: wind on the harbour, boats at the pier, a late bowl of noodles. This episode hands you the mic — because your Hong Kong should not be a copy of mine.",
        "前七集，我讲的是我的香港：维港的风、码头的船、深夜的一碗面。这一集，把话筒递给你——因为你的香港，不该是我的复制品。",
        "앞 일곱 편은 내 홍콩이었다: 항구의 바람, 부두의 배, 늦은 국수 한 그릇. 이번엔 마이크를 넘긴다 — 네 홍콩은 내 것의 복사본이 아니어야 하니까.",
        "Los primeros siete fueron mi Hong Kong: viento en el puerto, barcos en el muelle, un bowl de fideos de noche. Este episodio te pasa el micrófono — porque tu Hong Kong no debería ser una copia del mío.",
      ),
    },
    { type: "heading", body: tx("01 — Looking back: my Hong Kong", "01 · 回顾：我的香港", "01 · 돌아보기: 내 홍콩", "01 · Mirar atrás: mi Hong Kong") },
    {
      type: "text",
      body: tx(
        "Seven episodes later, my Hong Kong looks about like this: skyline from the waterfront walk, a red-sail junk heading out, lights on both shores at night. Scenery is what Hong Kong never lacks — but after living here you learn scenery is only the base layer.",
        "七集走下来，我的香港大概就是这样：海滨步道上的天际线，出海的红帆船，夜里两岸的灯。风景是香港最不缺的东西，但住下来才发现，风景只是底色。",
        "일곱 편을 지나니 내 홍콩은 대략 이렇다: 해안 산책의 스카이라인, 나가는 붉은 돛 정, 밤 양안의 불. 풍경은 홍콩에 가장 부족한 게 아니다 — 여기 살고 나서야 풍경은 바탕색일 뿐이라는 걸 안다.",
        "Tras siete episodios, mi Hong Kong es más o menos esto: skyline desde el paseo, un junk de vela roja saliendo, luces en ambas orillas de noche. Paisaje es lo que a Hong Kong no le falta — pero tras vivir aquí ves que el paisaje es solo la base.",
      ),
    },
    { type: "heading", body: tx("02 — Night harbour, never tired", "02 · 夜维港，看不腻", "02 · 밤 항구, 질리지 않음", "02 · Puerto de noche, sin cansancio") },
    {
      type: "photo",
      photo: shot(
        "08",
        "night-harbor",
        720,
        1280,
        tx("Victoria Harbour at night", "夜晚的维多利亚港", "밤의 빅토리아 항구", "Puerto Victoria de noche"),
      ),
    },
    {
      type: "text",
      body: tx(
        "I have shot the night harbour many times. The angle is usually similar — and it still feels worth it. Some views work like that: visitors check in once; people who live here look a hundred times.",
        "夜维港我拍过很多次，每次角度都差不多，但每次看还是觉得值。有些风景就是这样：游客打卡一次，住下来的人看一百次。",
        "밤 항구를 여러 번 찍었다. 각도는 비슷한데, 볼 때마다 값하다. 어떤 풍경은 그렇다: 관광객은 한 번 체크인하고, 사는 사람은 백 번 본다.",
        "He fotografiado el puerto de noche muchas veces. El ángulo suele ser parecido — y sigue valiendo. Hay vistas así: el visitante hace check-in una vez; quien vive mira cien.",
      ),
    },
    { type: "heading", body: tx("03 — Small moments and family", "03 · 小时刻和家人", "03 · 작은 순간과 가족", "03 · Momentos chicos y familia") },
    {
      type: "photo",
      photo: shot(
        "08",
        "egret",
        720,
        1280,
        tx("An egret skimming over the water", "白鹭掠过水面", "수면 위를 스치는 백로", "Una garceta rozando el agua"),
      ),
    },
    {
      type: "text",
      body: tx(
        "Besides the big views there are small moments: an egret over the water, family laughter, the Shiba that never runs far. The city is large. What you remember is often these small things.",
        "除了大风景，还有小时刻：白鹭掠过水面，家人的笑声，那只总跑不远的柴犬。城市很大，记住它的往往是这些很小的东西。",
        "큰 풍경 말고도 작은 순간이 있다: 수면 위 백로, 가족 웃음, 멀리 안 뛰는 시바. 도시는 크다. 기억하는 건 종종 이런 작은 것들이다.",
        "Además de las grandes vistas hay momentos chicos: una garceta sobre el agua, risas de familia, el Shiba que nunca corre lejos. La ciudad es grande. Lo que recuerdas suele ser esto pequeño.",
      ),
    },
    { type: "heading", body: tx("04 — Turn: your turn", "04 · 转向：该你了", "04 · 전환: 네 차례", "04 · Giro: te toca") },
    {
      type: "photo",
      photo: shot(
        "08",
        "pier-day",
        720,
        1280,
        tx("Daytime view from the pier", "码头日景", "부두 낮 풍경", "Vista diurna desde el muelle"),
      ),
    },
    {
      type: "text",
      body: tx(
        "This was my list, my pace, my Hong Kong. When you come, do not copy my list. No matter how detailed someone else's guide is, it cannot answer one question: what kind of trip do you actually want?",
        "这是我的清单，我的节奏，我的香港。但你来，不该照抄我的清单。别人的攻略再详细，也回答不了一个问题：你到底想要一趟什么样的旅行？",
        "이건 내 리스트, 내 박자, 내 홍콩이다. 네가 올 때는 내 리스트를 베끼지 마라. 남의 가이드가 아무리 자세해도 한 질문엔 답 못 한다: 너는 어떤 여행을 원하는가?",
        "Esta fue mi lista, mi ritmo, mi Hong Kong. Cuando vengas, no copies mi lista. Por detallada que sea la guía de otro, no responde una pregunta: ¿qué viaje quieres de verdad?",
      ),
    },
    { type: "heading", body: tx("05 — Four questions", "05 · 四个问题", "05 · 네 가지 질문", "05 · Cuatro preguntas") },
    {
      type: "photo",
      photo: shot(
        "08",
        "victoria-night",
        720,
        1280,
        tx("Victoria Harbour at night", "夜维港", "밤의 빅토리아 항구", "Puerto Victoria de noche"),
      ),
    },
    {
      type: "text",
      body: tx(
        "Do not rush the itinerary. Answer four questions first: Which city do you fly from? Who is coming? What is the budget? Do you care most about food, views, or slowing down? Honest answers to these beat ten guide articles.",
        "别急着做行程，先回答四个问题：你从哪座城市出发？和谁一起？预算多少？你在乎的是吃，是景，还是慢下来？诚实回答这四个，比看十篇攻略都有用。",
        "일정을 서두르지 마라. 먼저 네 가지에 답하라: 어느 도시에서 출발하나? 누구와? 예산은? 가장 중요한 게 먹거리, 풍경, 아니면 천천히인가? 이 넷에 솔직히 답하는 게 가이드 열 편보다 낫다.",
        "No apresures el itinerario. Responde primero cuatro: ¿Desde qué ciudad vuelas? ¿Quién viene? ¿Cuál es el presupuesto? ¿Te importa más la comida, la vista o ir despacio? Respuestas honestas a esto ganan a diez guías.",
      ),
    },
    { type: "heading", body: tx("06 — Your story starts now", "06 · 你的故事，该开始了", "06 · 네 이야기는 지금부터", "06 · Tu historia empieza ahora") },
    {
      type: "photo",
      photo: shot(
        "08",
        "fishing-boat",
        720,
        1280,
        tx("Fishing boats in the harbour", "海港渔船", "항구의 어선", "Barcos de pesca en el puerto"),
      ),
    },
    {
      type: "text",
      body: tx(
        "Tell XingAI those answers. It will build a Hong Kong decision for you — not a copy of mine, but one from your departure city, companions, budget, and preferences. My story is done. Yours should start.",
        "把这些告诉星AI，它会帮你生成一份属于你的香港决策——不是复制我的，是按你的出发城市、同行的人、预算和偏好算出来的。我的故事讲完了，你的故事，该开始了。",
        "그 답을 별AI에 알려라. 네 홍콩 결정을 만들어 줄 것이다 — 내 것의 복사가 아니라, 출발 도시·동행·예산·선호로 계산한 것. 내 이야기는 끝났다. 네 이야기가 시작될 때다.",
        "Cuéntale eso a XingAI. Hará una decisión de Hong Kong para ti — no una copia de la mía, sino desde tu ciudad de salida, compañía, presupuesto y preferencias. Mi historia terminó. La tuya debería empezar.",
      ),
    },
    {
      type: "verdict",
      intro: tx(
        "Before you book anything — answer these four.",
        "出发前，先回答这四个问题。",
        "출발 전에 — 이 넷에 답하라.",
        "Antes de reservar nada — responde estas cuatro.",
      ),
      rows: [
        {
          label: tx("Where from", "你从哪出发", "어디서 출발", "Desde dónde"),
          body: tx(
            "Your departure city sets flight time and price, and how many days you really have. Lock this first, then talk itinerary.",
            "出发城市决定了航班时长和价格，也决定了你有几天可玩。先定这个，再谈行程。",
            "출발 도시가 비행 시간과 가격, 그리고 실제로 며칠 있는지를 정한다. 먼저 이걸 잠그고, 그다음 일정.",
            "La ciudad de salida fija duración y precio del vuelo, y cuántos días tienes de verdad. Fija esto primero, luego el itinerario.",
          ),
        },
        {
          label: tx("Who with", "和谁一起", "누구와", "Con quién"),
          body: tx(
            "Solo, two people, elders or kids — the pace is completely different. Who comes decides the speed of the trip.",
            "一个人、两个人、带老人小孩，节奏完全不一样。同行的人，决定了这趟旅行的速度。",
            "혼자, 둘, 어르신·아이 — 박자가 완전히 다르다. 동행이 여행의 속도를 정한다.",
            "Solo, dos, mayores o niños — el ritmo es otro. Quien viene decide la velocidad del viaje.",
          ),
        },
        {
          label: tx("Budget", "预算多少", "예산", "Presupuesto"),
          body: tx(
            "Hong Kong can be expensive or thrifty. Set a total first, then split stay, food, transport, and play — each has its own way to open.",
            "香港可贵可省。先定总预算，再分配给住、吃、行、玩，每一项都有对应的打开方式。",
            "홍콩은 비쌀 수도 알뜰할 수도 있다. 총액을 먼저 정하고, 숙·식·교·놀이에 나눠라 — 항목마다 여는 방식이 있다.",
            "Hong Kong puede ser caro o ahorrado. Fija un total, luego reparte alojamiento, comida, transporte y ocio — cada uno tiene su forma de abrirse.",
          ),
        },
        {
          label: tx("What matters", "你在乎什么", "무엇을 중시하나", "Qué te importa"),
          body: tx(
            "Food, views, or slowing down? Prioritise one first. Clear priority keeps the itinerary from biting off more than it can chew.",
            "吃，是景，还是慢下来？只能先顾一个。想清楚优先级，行程才不会贪多嚼不烂。",
            "먹거리, 풍경, 아니면 천천히? 하나만 먼저 챙겨라. 우선순위가 분명해야 일정이 욕심을 덜 부린다.",
            "¿Comida, vistas o ir despacio? Prioriza uno primero. Con prioridad clara el itinerario no muerde más de lo que puede.",
          ),
        },
        {
          label: tx("Next step", "下一步", "다음 단계", "Siguiente paso"),
          body: tx(
            "Give XingAI these four answers and build your Hong Kong decision.",
            "把这四个答案告诉星AI，生成我的香港决策。",
            "이 네 답을 별AI에 주고, 네 홍콩 결정을 만들어라.",
            "Dale a XingAI estas cuatro respuestas y construye tu decisión sobre Hong Kong.",
          ),
        },
      ],
    },
    {
      type: "quote",
      body: tx(
        "My story is done. Yours should start.",
        "我的故事讲完了，你的故事，该开始了。",
        "내 이야기는 끝났다. 네 이야기가 시작될 때다.",
        "Mi historia terminó. La tuya debería empezar.",
      ),
    },
    {
      type: "text",
      body: tx(
        "BGM: George Street Shuffle by Kevin MacLeod (incompetech.com), CC BY 4.0.",
        "BGM：George Street Shuffle by Kevin MacLeod (incompetech.com)，CC BY 4.0。",
        "BGM: George Street Shuffle by Kevin MacLeod (incompetech.com), CC BY 4.0.",
        "BGM: George Street Shuffle by Kevin MacLeod (incompetech.com), CC BY 4.0.",
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
  subtitle: tx("Six months through my eyes", "半年，用我的眼睛看", "여섯 달, 내 눈으로", "Seis meses con mis ojos"),
  intro: tx(
    "Eight short stories from six months of coming back to the same city — what I saw, what I ate, and what I'd do differently. Then a question: what should your Hong Kong look like?",
    "八个短故事，来自半年里一次次回到同一座城市——我看到的、吃到的，以及我会换一种方式做的事。最后是一个问题：你的香港应该是什么样子？",
    "같은 도시로 여섯 달 동안 돌아오며 쓴 여덟 편의 짧은 이야기 — 본 것, 먹은 것, 다르게 할 것. 마지막 질문: 당신의 홍콩은 어떤 모습이어야 할까?",
    "Ocho relatos cortos de seis meses volviendo a la misma ciudad — lo que vi, lo que comí y lo que haría distinto. Luego una pregunta: ¿cómo debería ser tu Hong Kong?",
  ),
  cover: shot(
    "01",
    "harbour-red-sail",
    960,
    1706,
    tx(
      "A red-sail junk on Victoria Harbour",
      "维多利亚港上的红帆船",
      "빅토리아 항구의 붉은 돛 정",
      "Un junk de vela roja en el puerto Victoria",
    ),
  ),
  episodes: [
    ep01,
    ep02,
    ep03,
    ep04,
    ep05,
    ep06,
    ep07,
    ep08,
  ],
}
