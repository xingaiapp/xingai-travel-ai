import type { StoryEpisode, StorySeason } from "@/lib/stories/types"

// Privacy rules for this season (see docs/stories/README.md):
// - Neighbourhood level only ("Island East"), never an estate or building name.
// - Family faces only with consent; otherwise backs, hands, or distance shots.
// - Every photo goes through scripts/process-story-photos.mjs (strips EXIF/GPS).

function shot(
  name: string,
  width: number,
  height: number,
  altEn: string,
  altZh: string,
  captionEn?: string,
  captionZh?: string,
): StoryEpisode["cover"] {
  return {
    src: `/stories/hong-kong/01/${name}`,
    width,
    height,
    alt: { en: altEn, zh: altZh },
    ...(captionEn ? { caption: { en: captionEn, zh: captionZh ?? captionEn } } : {}),
    shot: name,
  }
}

const ep01: StoryEpisode = {
  number: 1,
  slug: "01-the-hong-kong-i-called-home",
  status: "draft",
  title: { en: "The Hong Kong I Called Home", zh: "我叫它家的地方" },
  dek: {
    en: "Six months in Hong Kong. This is the city I lived in, not the one visitors pass through.",
    zh: "在香港住了半年。这是我住过的香港，不是游客的那个。",
  },
  cover: {
    ...shot(
      "waterfront-walk",
      960,
      1706,
      "Hong Kong's waterfront promenade on a clear day",
      "晴天下的香港海滨步道",
      "Hong Kong from the waterfront path. Once I lived here, this was not a sight. It was something I walked past every day.",
      "海滨步道上看到的香港。住下来以后，这不是景点，是每天路过的风景。",
    ),
  },
  blocks: [
    { type: "heading", body: { en: "Opening · At the Table", zh: "开场 · At the Table" } },
    {
      type: "text",
      body: {
        en: "A lot of my memories of Hong Kong start with a meal. The city gave me more than food.",
        zh: "在香港，我的很多记忆，都是从一顿饭开始的。但这座城市给我的，远不止吃的。",
      },
    },
    {
      type: "photo",
      photo: shot(
        "at-the-table",
        960,
        1706,
        "Recording a moment at a Hong Kong restaurant before dinner",
        "在香港餐厅里对着镜头记录晚饭前的一刻",
        "This opening is a clip I shot at the table, after I had ordered, pointed at the camera.",
        "开场这段，是我在餐厅点完晚饭，随手对着镜头录的。",
      ),
    },
    { type: "heading", body: { en: "Prologue · The Hong Kong I Lived", zh: "序 · The Hong Kong I Lived" } },
    {
      type: "text",
      body: {
        en: "People ask me what Hong Kong is actually like. For me it was not the visitor's Hong Kong. It was a home I lived in for half a year. Living there for six months and visiting for three days are two different cities. This episode is the one I lived in.",
        zh: "很多人问我，香港到底是什么样。对我来说，它不是游客的香港，是我住过半年的家。住半年和玩三天，看到的是两个香港。这一集，讲我住过的那个。",
      },
    },
    { type: "heading", body: { en: "01 — Fortress Hill", zh: "01 — 炮台山 · Fortress Hill" } },
    {
      type: "text",
      body: {
        en: "I lived in Fortress Hill. Every day I came out of MTR exit B, and I walked that road for half a year. Fortress Hill is not on a visitor's itinerary, but it is quiet, convenient, and everything you need is downstairs. Stay long enough and you notice that the real feel of daily life in Hong Kong hides in places like this.",
        zh: "我住在炮台山。每天从地铁 B 出口出来，这条路我走了半年。炮台山不在游客的行程上，但它安静、方便，楼下什么都有。住久了你会发现，香港真正的生活感，都藏在这种地方。",
      },
    },
    {
      type: "photo",
      photo: {
        alt: { en: "A Fortress Hill street with no readable building name", zh: "炮台山街道，画面里没有可读的楼名" },
        shot: "Held back: the exit B frame shows the estate name on the sign. Replace it with a photo that does not name the building.",
      },
    },
    { type: "heading", body: { en: "02 — North Point", zh: "02 — 北角 · North Point" } },
    {
      type: "text",
      body: {
        en: "North Point was my everyday. The waterfront promenade: a run in the morning, a walk at night. I covered that line on the map more times than I can count. Water on one side, towers on the other. That routine is on nobody's visitor itinerary, and it is the most real Hong Kong I saw.",
        zh: "北角是我的日常。海滨长廊，早上跑步，晚上散步。地图上这一条线，我走了无数遍。沿着海走，一边是水，一边是楼。这种日常不在任何游客行程里，但它是我见过最真实的香港。",
      },
    },
    {
      type: "photo",
      photo: shot(
        "north-point-boardwalk",
        960,
        1706,
        "The wooden boardwalk along the North Point waterfront",
        "北角海滨木栈道与临海城市景色",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "north-point-map",
        960,
        1706,
        "A waterfront map marking North Point and Causeway Bay",
        "标有北角与铜锣湾的海滨地图展板",
        "The North Point waterfront, and the North Point–Causeway Bay stretch I walked over and over.",
        "北角海滨长廊，以及我走了无数次的 North Point—Causeway Bay 这一段。",
      ),
    },
    { type: "heading", body: { en: "03 — What I Actually Ate", zh: "03 — 真正吃过的 · What I Actually Ate" } },
    {
      type: "text",
      body: {
        en: "What I ate most in Hong Kong was not Michelin. It was the roast-meat shop downstairs. A plate of roast meat, two eggs, and that was a meal. A mixed roast platter, greens, rice — a few dozen Hong Kong dollars, filling and good. Stay a while and you learn it: the good food is not on the lists. It is downstairs.",
        zh: "在香港，我吃得最多的不是米其林，是楼下烧味店。一份烧味饭，两个蛋，就是一顿。烧味拼盘、青菜、米饭，几十块，吃得饱也吃得好。待久了你会明白：好吃的不在榜单上，在楼下。",
      },
    },
    {
      type: "photo",
      photo: shot(
        "roast-meat-rice",
        1320,
        1760,
        "Roast-meat rice with two eggs from a neighbourhood shop",
        "香港楼下烧味店的一份烧味饭和两个蛋",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "roast-platter",
        1320,
        1760,
        "A mixed roast platter with greens and rice",
        "烧味拼盘、青菜和米饭组成的一顿日常饭",
        "Not a restaurant from a list. Downstairs. A few dozen dollars. The meal I ate often.",
        "不是榜单上的餐厅。是楼下，几十块，常常吃的那一顿。",
      ),
    },
    { type: "heading", body: { en: "04 — The Harbor", zh: "04 — 维港 · The Harbor" } },
    {
      type: "text",
      body: {
        en: "Every time I reached the harbour and saw the red-sail junk, I still stopped. I never got tired of that picture. After half a year I should have. I didn't. Some pictures just do that.",
        zh: "但每次走到维港，看到红帆船，我还是会停下来。这个画面，看多少次都不腻。住了半年，按说早该看腻了。没有。有些画面就是有这种本事。",
      },
    },
    {
      type: "photo",
      photo: shot(
        "harbour-red-sail",
        960,
        1706,
        "A red-sail junk on Victoria Harbour with the skyline behind it",
        "维多利亚港上的红帆船与香港城市天际线",
        "The harbour, the red sail. Not the first time I had seen it. I stopped anyway.",
        "维港，红帆船。不是第一次看，也还是会停。",
      ),
    },
    { type: "heading", body: { en: "05 — Small Moments", zh: "05 — 没计划的小瞬间 · Small Moments" } },
    {
      type: "text",
      body: {
        en: "Some moments were not planned. This egret, for example, just standing there, as if it had been waiting. No itinerary lists that. Half a year later, what you still remember is often those few minutes.",
        zh: "有些瞬间是没计划的。比如这只白鹭，就站在那儿，好像在等我。行程表上不会有这一项。但半年后你还记得的，往往就是这几分钟。",
      },
    },
    {
      type: "photo",
      photo: shot(
        "egret-on-the-steps",
        960,
        1706,
        "An egret standing alone on stone steps by the water",
        "一只白鹭独自站在海边石阶上",
        "An egret on the stone steps by the sea. Nothing scheduled, and no rush.",
        "海边石阶上的白鹭。没有安排，也没赶时间。",
      ),
    },
    { type: "heading", body: { en: "06 — With Family", zh: "06 — 家人时刻 · With Family" } },
    {
      type: "text",
      body: {
        en: "Later my family came. This huge Shiba, and we sat beside it for an afternoon. The city was the same city. With family there, it wasn't. Living alone is daily life. Family arriving is a memory.",
        zh: "后来家人来了。这只大柴犬，我们在旁边坐了一下午。城还是那座城，有家人在，就不一样了。一个人住是生活，一家人来是记忆。",
      },
    },
    {
      type: "photo",
      photo: shot(
        "family-afternoon",
        1376,
        1824,
        "A giant sleeping Shiba sculpture on a lawn",
        "一只很大的睡觉柴犬装置",
        "A very large sleeping Shiba, and an afternoon spent sitting down with family.",
        "一只很大的睡觉柴犬，和家人一起坐下来的一个下午。",
      ),
    },
    { type: "heading", body: { en: "07 — Hong Kong in Motion", zh: "07 — 在路上 · Hong Kong in Motion" } },
    {
      type: "text",
      body: {
        en: "In Hong Kong you are always on the way. MTR, ferry, bus — the whole city moves. It does not wait for you, and you do not have to wait for it. Step on. It will take you somewhere.",
        zh: "在香港，你一直在路上。地铁、渡轮、巴士，整座城市都是流动的。这座城市不等人，你也不用等它。跳上去，它带你去哪儿都行。",
      },
    },
    {
      type: "photo",
      photo: shot(
        "bridge-from-the-car",
        960,
        1706,
        "Harbour and residential towers passing the car window from a bridge",
        "行车途中从桥上看见海港与住宅楼群",
        "On the bridge, in the car, harbour and towers sliding past the window.",
        "桥上，车里，海港和楼群从窗外划过去。",
      ),
    },
    {
      type: "verdict",
      intro: {
        en: "Not a guidebook conclusion. The answers left after six months of living there.",
        zh: "不是攻略结论，是住过半年以后留下的答案。",
      },
      rows: [
        {
          label: { en: "Worth it", zh: "值不值得" },
          body: {
            en: "Worth it — if you are willing to live there. Three days of sightseeing will not show you the Hong Kong in this episode.",
            zh: "值得——但前提是你愿意住下来。打卡三天，你看不到这一集里的香港。",
          },
        },
        {
          label: { en: "Who it's for", zh: "适合谁" },
          body: {
            en: "People who want to stay in Hong Kong for a while. Alone, working remotely, or with family for a short stay — all of these fit.",
            zh: "想在香港住一阵子的人。一个人、远程工作、带家人小住，都合适。",
          },
        },
        {
          label: { en: "Budget", zh: "预算" },
          body: {
            en: "Rent is the big cost. Plan for that. Everyday meals are not expensive: a roast-meat shop downstairs, a few dozen Hong Kong dollars a meal.",
            zh: "房租是大头，提前做好心理准备；日常吃喝不贵，楼下烧味店几十块一顿。",
          },
        },
        {
          label: { en: "Time", zh: "时间" },
          body: {
            en: "Start with a month. Half a year is about right. Two or three days is not enough.",
            zh: "一个月起步，半年刚好。三天两夜不够。",
          },
        },
        {
          label: { en: "The catch", zh: "有什么坑" },
          body: {
            en: "Don't pick a tourist district just because it is busy. It costs more and it is loud. Island East is quieter, more convenient, and easier to actually live in.",
            zh: "别为了热闹住游客区，又贵又吵。港岛东安静、方便、生活气足，更适合住。",
          },
        },
      ],
    },
    {
      type: "quote",
      body: {
        en: "Half a year is short. Long enough to live in a place until it feels like home.",
        zh: "半年很短，但够把一个地方，过成家了。",
      },
    },
    {
      type: "text",
      body: {
        en: "Next episode: why I kept walking back to the harbour.",
        zh: "下一集，我跟你聊聊我为什么总往维港跑。",
      },
    },
  ],
}

function planned(number: number, slug: string, en: string, zh: string, dekEn: string, dekZh: string): StoryEpisode {
  return {
    number,
    slug,
    status: "draft",
    title: { en, zh },
    dek: { en: dekEn, zh: dekZh },
    cover: { alt: { en, zh }, shot: `Cover for EP${String(number).padStart(2, "0")}` },
    blocks: [],
  }
}

export const hongKong: StorySeason = {
  slug: "hong-kong",
  destination: "Hong Kong",
  place: { en: "Hong Kong", zh: "香港" },
  region: "asia",
  title: { en: "My Hong Kong", zh: "我的香港" },
  subtitle: { en: "Six months through my eyes", zh: "半年，用我的眼睛看" },
  intro: {
    en: "Eight short stories from six months of coming back to the same city — what I saw, what I ate, and what I'd do differently. Then a question: what should your Hong Kong look like?",
    zh: "八个短故事，来自半年里一次次回到同一座城市——我看到的、吃到的，以及我会换一种方式做的事。最后是一个问题：你的香港应该是什么样子？",
  },
  cover: shot(
    "harbour-red-sail",
    960,
    1706,
    "A red-sail junk on Victoria Harbour",
    "维多利亚港上的红帆船",
  ),
  episodes: [
    ep01,
    planned(2, "02-the-harbor-i-kept-coming-back-to", "The Harbor I Kept Coming Back To", "我一再回去的维港",
      "Skyline, red sails, ferries, and why the waterfront pulled me back every time.", "天际线、红帆船、渡轮，以及为什么海滨总把我拉回去。"),
    planned(3, "03-what-i-actually-ate", "What I Actually Ate in Hong Kong", "我在香港真正吃过的东西",
      "Not a top-ten list. Roast meats, double-egg rice, dim sum, and ordinary places.", "不是十大榜单。烧味、双蛋饭、点心，和普通的小店。"),
    planned(4, "04-hong-kong-in-motion", "Hong Kong in Motion", "流动的香港",
      "MTR, ferries, bridges, and walking — how I actually crossed the city.", "地铁、渡轮、桥和步行——我真正穿过这座城市的方式。"),
    planned(5, "05-small-moments-i-didnt-plan", "Small Moments I Didn't Plan", "我没计划到的小瞬间",
      "Egrets, mist, weather, and street corners no itinerary would list.", "白鹭、云雾、天气，以及行程表上不会出现的街角。"),
    planned(6, "06-hong-kong-with-family", "Hong Kong With Family", "和家人一起的香港",
      "What a city leaves you with is the people you shared it with.", "一座城市最后留下的，是一起经历它的人。"),
    planned(7, "07-what-id-do-again", "What I'd Do Again — and Differently", "我会再做的，和会换个方式做的",
      "Six months of judgment: would return, would skip, hidden gems, and lessons.", "半年后留下的判断：会再去、会跳过、私藏好地方，以及教训。"),
    planned(8, "08-your-hong-kong", "Your Hong Kong, Not Mine", "你的香港，不是我的",
      "My Hong Kong shouldn't be a copy for yours. Start with your own constraints.", "你的香港不该是我的复制品。从你自己的条件开始。"),
  ],
}
