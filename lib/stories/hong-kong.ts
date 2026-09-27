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
    { type: "heading", body: tx("Opening · At the Table", "开场 · At the Table", "오프닝 · 식탁 앞에서", "Apertura · En la mesa") },
    {
      type: "text",
      body: tx(
        "A lot of my memories of Hong Kong start with a meal. The city gave me more than food.",
        "在香港，我的很多记忆，都是从一顿饭开始的。但这座城市给我的，远不止吃的。",
        "홍콩에 대한 내 기억 많은 것이 한 끼 식사에서 시작된다. 이 도시는 음식 이상을 주었다.",
        "Muchos recuerdos de Hong Kong empiezan con una comida. La ciudad me dio más que comida.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "01",
        "at-the-table",
        960,
        1706,
        tx(
          "Recording a moment at a Hong Kong restaurant before dinner",
          "在香港餐厅里对着镜头记录晚饭前的一刻",
          "저녁 전 홍콩 식당에서 순간을 담는 모습",
          "Grabando un momento en un restaurante de Hong Kong antes de cenar",
        ),
        tx(
          "This opening is a clip I shot at the table, after I had ordered, pointed at the camera.",
          "开场这段，是我在餐厅点完晚饭，随手对着镜头录的。",
          "오프닝은 주문을 마친 뒤 식탁에서 카메라를 향해 찍은 영상이다.",
          "Este inicio es un clip que grabé en la mesa, después de pedir, señalando la cámara.",
        ),
      ),
    },
    {
      type: "heading",
      body: tx("Prologue · The Hong Kong I Lived", "序 · The Hong Kong I Lived", "프롤로그 · 내가 살던 홍콩", "Prólogo · El Hong Kong en el que viví"),
    },
    {
      type: "text",
      body: tx(
        "People ask me what Hong Kong is actually like. For me it was not the visitor's Hong Kong. It was a home I lived in for half a year. Living there for six months and visiting for three days are two different cities. This episode is the one I lived in.",
        "很多人问我，香港到底是什么样。对我来说，它不是游客的香港，是我住过半年的家。住半年和玩三天，看到的是两个香港。这一集，讲我住过的那个。",
        "사람들은 홍콩이 어떤 곳인지 묻는다. 나에게는 관광객의 홍콩이 아니었다. 반년을 살던 집이었다. 여섯 달 살기와 사흘 여행은 다른 도시다. 이 에피소드는 내가 살던 그쪽이다.",
        "Me preguntan cómo es Hong Kong de verdad. Para mí no era el Hong Kong del visitante: fue un hogar donde viví medio año. Seis meses viviendo y tres días de turismo son dos ciudades distintas. Este episodio es la que viví.",
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

function planned(number: number, slug: string, title: StoryText, dek: StoryText): StoryEpisode {
  return {
    number,
    slug,
    status: "draft",
    title,
    dek,
    cover: { alt: title, shot: `Cover for EP${String(number).padStart(2, "0")}` },
    blocks: [],
  }
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
    planned(
      3,
      "03-what-i-actually-ate",
      tx("What I Actually Ate in Hong Kong", "我在香港真正吃过的东西", "홍콩에서 실제로 먹은 것", "Lo que comí de verdad en Hong Kong"),
      tx(
        "Not a top-ten list. Roast meats, double-egg rice, dim sum, and ordinary places.",
        "不是十大榜单。烧味、双蛋饭、点心，和普通的小店。",
        "탑텐 리스트가 아니다. 훈제, 계란 두 개 밥, 딤섬, 평범한 가게.",
        "No es un top ten. Asados, arroz con dos huevos, dim sum y sitios normales.",
      ),
    ),
    planned(
      4,
      "04-hong-kong-in-motion",
      tx("Hong Kong in Motion", "流动的香港", "움직이는 홍콩", "Hong Kong en movimiento"),
      tx(
        "MTR, ferries, bridges, and walking — how I actually crossed the city.",
        "地铁、渡轮、桥和步行——我真正穿过这座城市的方式。",
        "MTR, 페리, 다리, 걷기 — 내가 실제로 도시를 가로지른 방식.",
        "MTR, ferries, puentes y a pie — cómo crucé la ciudad de verdad.",
      ),
    ),
    planned(
      5,
      "05-small-moments-i-didnt-plan",
      tx("Small Moments I Didn't Plan", "我没计划到的小瞬间", "계획하지 않은 작은 순간", "Pequeños momentos que no planeé"),
      tx(
        "Egrets, mist, weather, and street corners no itinerary would list.",
        "白鹭、云雾、天气，以及行程表上不会出现的街角。",
        "백로, 안개, 날씨, 일정표에 없는 거리 모퉁이.",
        "Garzas, niebla, clima y esquinas que ningún itinerario incluiría.",
      ),
    ),
    planned(
      6,
      "06-hong-kong-with-family",
      tx("Hong Kong With Family", "和家人一起的香港", "가족과 함께한 홍콩", "Hong Kong con la familia"),
      tx(
        "What a city leaves you with is the people you shared it with.",
        "一座城市最后留下的，是一起经历它的人。",
        "도시가 남기는 것은 함께한 사람들이다.",
        "Lo que una ciudad te deja son las personas con las que la compartiste.",
      ),
    ),
    planned(
      7,
      "07-what-id-do-again",
      tx("What I'd Do Again — and Differently", "我会再做的，和会换个方式做的", "다시 할 것, 다르게 할 것", "Lo que repetiría — y lo que haría distinto"),
      tx(
        "Six months of judgment: would return, would skip, hidden gems, and lessons.",
        "半年后留下的判断：会再去、会跳过、私藏好地方，以及教训。",
        "반년의 판단: 다시 갈 곳, 건너뛸 곳, 숨은 보석, 교훈.",
        "Seis meses de juicio: volvería, saltaría, joyas escondidas y lecciones.",
      ),
    ),
    planned(
      8,
      "08-your-hong-kong",
      tx("Your Hong Kong, Not Mine", "你的香港，不是我的", "당신의 홍콩, 내 것이 아닌", "Tu Hong Kong, no el mío"),
      tx(
        "My Hong Kong shouldn't be a copy for yours. Start with your own constraints.",
        "你的香港不该是我的复制品。从你自己的条件开始。",
        "내 홍콩을 당신 것의 복사본으로 삼지 마라. 당신의 조건에서 시작하라.",
        "Mi Hong Kong no debería ser la copia del tuyo. Empieza por tus propias condiciones.",
      ),
    ),
  ],
}
