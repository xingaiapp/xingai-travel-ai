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
      type: "photo",
      photo: shot(
        "03",
        "double-rice",
        1280,
        1707,
        tx("Char siu and white-cut chicken double rice", "叉烧白切鸡双拼饭", "차슈와 백절계 더블 라이스", "Arroz doble de char siu y pollo blanco"),
      ),
    },
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
      type: "photo",
      photo: shot(
        "04",
        "bridge-driving",
        1080,
        1920,
        tx("Driving across a Hong Kong bridge", "开车经过大桥", "홍콩 다리를 차로 건너는 장면", "Cruzando un puente de Hong Kong en coche"),
      ),
    },
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
      type: "photo",
      photo: shot(
        "04",
        "bridge-driving",
        1080,
        1920,
        tx("Still on the road across the bridge", "在路上", "여전히 다리 위 길에서", "Sigo en el camino sobre el puente"),
      ),
    },
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
    ep03,
    ep04,
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
