import type { StoryEpisode, StorySeason } from "@/lib/stories/types"

// Privacy rules for this season (see docs/stories/README.md):
// - Neighbourhood level only ("Island East"), never an estate or building name.
// - Family faces only with consent; otherwise backs, hands, or distance shots.
// - Every photo goes through scripts/process-story-photos.mjs (strips EXIF/GPS).

function shot(
  episode: string,
  name: string,
  width: number,
  height: number,
  altEn: string,
  altZh: string,
  captionEn?: string,
  captionZh?: string,
): StoryEpisode["cover"] {
  return {
    src: `/stories/hong-kong/${episode}/${name}`,
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
  status: "published",
  publishedAt: "2026-09-26",
  title: { en: "The Hong Kong I Called Home", zh: "我叫它家的地方" },
  dek: {
    en: "Six months in Hong Kong. This is the city I lived in, not the one visitors pass through.",
    zh: "在香港住了半年。这是我住过的香港，不是游客的那个。",
  },
  cover: {
    ...shot(
      "01",
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
        "01",
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
        "01",
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
        "01",
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
        "01",
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
        "01",
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
        "01",
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
        "01",
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
        "01",
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
        "01",
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

const ep02: StoryEpisode = {
  number: 2,
  slug: "02-the-harbor-i-kept-coming-back-to",
  status: "published",
  publishedAt: "2026-09-26",
  title: { en: "The Harbor I Kept Coming Back To", zh: "我一次次回来的海港" },
  dek: {
    en: "People say Hong Kong's soul is in Victoria Harbour. After six months, I believed it. Not a guidebook — why I kept coming back.",
    zh: "有人说，香港的魂在维港。住了半年，我信了。这篇不讲攻略，讲我为什么一次次回来。",
  },
  cover: {
    ...shot(
      "02",
      "cover-waterfront",
      512,
      910,
      "Victoria Harbour waterfront promenade and the skyline across the water",
      "维多利亚港海滨长廊与远处的城市天际线",
    ),
  },
  blocks: [
    { type: "heading", body: { en: "01 — Tourist mindset", zh: "01 · 游客心态" } },
    {
      type: "text",
      body: {
        en: "The first time I went to the harbour, I was a tourist: take a photo, leave. Beautiful in the frame. That was about it.",
        zh: "我第一次去维港，是游客心态，拍张照就走。照片里很美，但也就那样。",
      },
    },
    {
      type: "photo",
      photo: shot(
        "02",
        "harbour-overcast",
        512,
        910,
        "Victoria Harbour and the skyline under low cloud",
        "阴云下开阔的维多利亚港与城市天际线",
      ),
    },
    { type: "heading", body: { en: "02 — After I lived here", zh: "02 · 住下来之后" } },
    {
      type: "text",
      body: {
        en: "After I lived here, I came back again and again — not for photos. Passing by. Bringing friends. Needing wind when my head felt heavy.",
        zh: "住下来之后才发现，我会一次次回来，不是为了拍照。是路过顺便看看，是朋友来了带他们去，是心里有点闷想吹吹风。",
      },
    },
    { type: "heading", body: { en: "03 — Morning on the waterfront", zh: "03 · 早晨的海滨" } },
    {
      type: "text",
      body: {
        en: "In the morning the promenade is quiet, the water flat, the city not awake yet. That hour of the harbour belongs to locals — not crowded, calm.",
        zh: "早上，海滨长廊没什么人，海是平的，城市还没醒。这个时间的维港是本地人的，不挤，安静。",
      },
    },
    {
      type: "photo",
      photo: shot(
        "02",
        "morning-calm",
        512,
        910,
        "A calm morning looking out over Victoria Harbour",
        "晴朗早晨从海滨望向平静的维多利亚港",
      ),
    },
    { type: "heading", body: { en: "04 — The ferry", zh: "04 · 渡轮" } },
    {
      type: "text",
      body: {
        en: "Ferries leave one after another. A few minutes and you are on the other side. A few dollars for a ticket — the best-value “cruise” I have taken.",
        zh: "渡轮一班接一班，几分钟就晃到对岸。几块钱的船票，是我坐过性价比最高的“游船”。",
      },
    },
    {
      type: "photo",
      photo: shot(
        "02",
        "ferry-crossing",
        512,
        910,
        "A ferry crossing Victoria Harbour with towers on the far shore",
        "维多利亚港水面上的渡轮与远岸楼群",
      ),
    },
    { type: "heading", body: { en: "05 — The red-sail junk", zh: "05 · 红帆船" } },
    {
      type: "text",
      body: {
        en: "The red-sail junk is still the same, slow, as if time costs nothing on that deck. Every time I see it, I stop and look a little longer.",
        zh: "红帆船还是老样子，慢悠悠的，好像时间在它那儿不值钱。每次看到它，我都会停下来多看一会儿。",
      },
    },
    {
      type: "photo",
      photo: shot(
        "02",
        "red-sail-junk",
        512,
        910,
        "A red-sail junk on Victoria Harbour",
        "维多利亚港上的红帆船与远处城市楼群",
      ),
    },
    { type: "heading", body: { en: "06 — Everyone busy", zh: "06 · 各忙各的" } },
    {
      type: "text",
      body: {
        en: "Fishing boats, freighters, tour boats — each doing its own work, nobody in anyone else's way. The harbour feels like a big living room. There is room for every kind of boat.",
        zh: "渔船、货船、游船，各忙各的，谁也不打扰谁。海港像个大客厅，什么船都有位置。",
      },
    },
    {
      type: "photo",
      photo: shot(
        "02",
        "harbour-boats",
        512,
        910,
        "Boats on Victoria Harbour with towers on both shores",
        "维多利亚港上的船只与两岸楼群",
      ),
    },
    { type: "heading", body: { en: "07 — Cloudy days count", zh: "07 · 阴天也行" } },
    {
      type: "text",
      body: {
        en: "Cloudy days work too. Clouds sit low, and the harbour has more mood. Don't only come on bright days — overcast Victoria Harbour holds its own.",
        zh: "阴天来也行，云压得很低，海港反而更有味道。别只挑大晴天来，维港阴天不输。",
      },
    },
    { type: "heading", body: { en: "08 — Victoria Harbour", zh: "08 · 维多利亚港" } },
    {
      type: "text",
      body: {
        en: "The railing says VICTORIA HARBOUR. The name is not modest. It earns it.",
        zh: "栏杆上刻着 VICTORIA HARBOUR，这名字起得真不客气，但也真配。它确实担得起。",
      },
    },
    {
      type: "photo",
      photo: shot(
        "02",
        "victoria-harbour-sign",
        512,
        910,
        "A VICTORIA HARBOUR sign on the waterfront railing",
        "海滨栏杆上的 VICTORIA HARBOUR 标识",
      ),
    },
    { type: "heading", body: { en: "09 — Bringing friends", zh: "09 · 带朋友来" } },
    {
      type: "text",
      body: {
        en: "Whenever friends visit Hong Kong, I bring them here. I don't need to say much. The harbour speaks for itself.",
        zh: "每次有朋友来香港，我都带他们来这儿，什么都不用说。海港自己会说话。",
      },
    },
    { type: "heading", body: { en: "10 — Sun and cloud", zh: "10 · 晴天阴天" } },
    {
      type: "text",
      body: {
        en: "Clear days have their look. Cloudy days have theirs. I came here countless times in six months. Not once was I disappointed.",
        zh: "晴天有晴天的看头，阴天有阴天的看头。半年里我来了无数次，没一次失望的。",
      },
    },
    { type: "heading", body: { en: "11 — Closing", zh: "11 · 结语" } },
    {
      type: "quote",
      body: {
        en: "Some places are enough once. The harbour is not. It is the kind of place you keep coming back to.",
        zh: "有些地方去一次就够了。维港不是，它是那种你会一次次回来的地方。",
      },
    },
    {
      type: "verdict",
      intro: {
        en: "Not a guidebook conclusion. The answers left after coming back again and again.",
        zh: "不是攻略结论，是一次次回来以后留下的答案。",
      },
      rows: [
        {
          label: { en: "Worth it", zh: "值不值得" },
          body: {
            en: "Worth it — go, and go again. A Hong Kong trip without the harbour is half a trip.",
            zh: "值得，一去再去。香港之行不来维港等于没来。",
          },
        },
        {
          label: { en: "Who it's for", zh: "适合谁" },
          body: {
            en: "First-timers. People who live here. Anyone bringing friends or family.",
            zh: "第一次来香港的人；住下来的人；带朋友、带家人的人。",
          },
        },
        {
          label: { en: "Budget", zh: "预算" },
          body: {
            en: "The promenade is free. Star Ferry is a few Hong Kong dollars. Red-sail tours follow the operator's price — check ahead (as of 2026).",
            zh: "海滨散步免费；天星小轮几块钱；红帆船游船按船公司定价，提前查（2026）。",
          },
        },
        {
          label: { en: "Time", zh: "时间" },
          body: {
            en: "Morning is quieter. Dusk into dark, when the lights come on, is the best look. Leave at least half a day — don't rush.",
            zh: "早晨人少安静；傍晚到天黑灯亮起来最好看；至少留半天，别赶。",
          },
        },
        {
          label: { en: "The catch", zh: "有没有坑" },
          body: {
            en: "Holidays and evenings are crowded — go off-peak. Windy by the water; bring a layer on cloudy days. Don't only walk the Tsim Sha Tsui side — Central and North Point waterfronts are worth it too. Red-sail sailings are limited; check times if you want to ride.",
            zh: "节假日和晚上人多，错峰；海边风大，阴天带件外套；别只走尖沙咀一侧，对岸的中环／北角海滨也值得走；红帆船班次有限，想坐提前查时间。",
          },
        },
      ],
    },
    {
      type: "text",
      body: {
        en: "Next episode: what I actually ate in Hong Kong.",
        zh: "下一集，讲我在香港真正吃过的东西。",
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
    "01",
    "harbour-red-sail",
    960,
    1706,
    "A red-sail junk on Victoria Harbour",
    "维多利亚港上的红帆船",
  ),
  episodes: [
    ep01,
    ep02,
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
