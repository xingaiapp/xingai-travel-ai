import type { StoryEpisode, StorySeason, StoryText } from "@/lib/stories/types"

// Privacy rules for this season (see docs/stories/README.md):
// - Neighbourhood / resort-corridor level only ("Cotai", "old town"). No hotel room numbers or home address.
// - Prefer backs, distance, and sculpture; skip clear identifiable faces in crowds when possible.
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
    src: `/stories/macau/${episode}/${name}`,
    width,
    height,
    alt,
    ...(caption ? { caption } : {}),
    shot: name,
  }
}

const ep01: StoryEpisode = {
  number: 1,
  slug: "01-cotai-three-european-cities",
  status: "published",
  publishedAt: "2026-09-28",
  title: tx(
    "Cotai: Three European Cities in One Day",
    "路氹，一天逛完三座欧洲城",
    "코타이, 하루에 유럽 도시 셋",
    "Cotai: tres ciudades europeas en un día",
  ),
  dek: tx(
    "Macau has two faces. Side A is Cotai — Venice, Paris, and London on one strip. This episode is Side A.",
    "澳门有两个面。A 面在路氹：威尼斯、巴黎、伦敦，挤在一条马路两边。这篇讲 A 面。",
    "마카오에는 두 얼굴이 있다. A면은 코타이 — 베니스, 파리, 런던이 한 길에. 이 편은 A면.",
    "Macao tiene dos caras. La A es Cotai: Venecia, París y Londres en una franja. Este episodio es la A.",
  ),
  cover: shot(
    "01",
    "londoner-big-ben",
    1600,
    2133,
    tx(
      "The Big Ben replica outside The Londoner Macao on Cotai",
      "澳门路氹伦敦人酒店外的大本钟与街景",
      "코타이 런던러 호텔 앞 빅벤 복제와 거리",
      "La réplica del Big Ben frente a The Londoner Macao en Cotai",
    ),
    tx(
      "On Cotai, London sits across the street.",
      "路氹街头，伦敦就在马路对面。",
      "코타이 거리에서, 런던이 길 건너에 있다.",
      "En Cotai, Londres está al otro lado de la calle.",
    ),
  ),
  heroVideo: {
    src: "/stories/macau/01/hero.mp4",
    poster: shot(
      "01",
      "londoner-big-ben",
      1600,
      2133,
      tx(
        "The Big Ben replica outside The Londoner Macao on Cotai",
        "澳门路氹伦敦人酒店外的大本钟与街景",
        "코타이 런던러 호텔 앞 빅벤 복제와 거리",
        "La réplica del Big Ben frente a The Londoner Macao en Cotai",
      ),
    ),
  },
  blocks: [
    {
      type: "text",
      body: tx(
        "Macau has two faces. Side A is Cotai: Venice, Paris, and London packed along one corridor. This episode is Side A.",
        "澳门有两个面。A 面在路氹：威尼斯、巴黎、伦敦，挤在一条马路两边。这篇讲 A 面。",
        "마카오에는 두 얼굴이 있다. A면은 코타이: 베니스, 파리, 런던이 한 축에. 이 편은 A면.",
        "Macao tiene dos caras. La A es Cotai: Venecia, París y Londres en un corredor. Este episodio es la A.",
      ),
    },
    { type: "heading", body: tx("01 — No passport stamp needed", "01 · 不用出国", "01 · 출국 없이", "01 — Sin sellar el pasaporte") },
    {
      type: "text",
      body: tx(
        "This Cotai strip is lined with “Europe.” No visa run, no jet lag. Three cities in one day — if you keep the pace honest.",
        "路氹这条路，两边全是“欧洲”。不用签证，不用倒时差，一天逛完三座城。",
        "코타이 길은 양옆이 “유럽”이다. 비자 없고 시차 없다. 하루 세 도시 — 욕심만 덜면.",
        "Esta franja de Cotai es “Europa” a ambos lados. Sin visado ni jet lag. Tres ciudades en un día — si no te pasas de ritmo.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "01",
        "londoner-big-ben",
        1600,
        2133,
        tx(
          "The Big Ben replica outside The Londoner Macao on Cotai",
          "澳门路氹伦敦人酒店外的大本钟与街景",
          "코타이 런던러 호텔 앞 빅벤 복제와 거리",
          "La réplica del Big Ben frente a The Londoner Macao en Cotai",
        ),
        tx(
          "On Cotai, London sits across the street.",
          "路氹街头，伦敦就在马路对面。",
          "코타이 거리에서, 런던이 길 건너에 있다.",
          "En Cotai, Londres está al otro lado de la calle.",
        ),
      ),
    },
    { type: "heading", body: tx("02 — The Venetian", "02 · 威尼斯人", "02 · 베네시안", "02 — The Venetian") },
    {
      type: "text",
      body: tx(
        "First stop: The Venetian. The gold armillary in the lobby is the building’s anchor — you see it before you see anything else.",
        "第一站威尼斯人。大堂这个金色浑天仪，是整栋楼的定海神针，走到哪儿都先看见它。",
        "첫 정류장: 베네시안. 로비의 금색 혼천의가 건물의 중심 — 어디를 가도 먼저 보인다.",
        "Primera parada: The Venetian. El armilar dorado del vestíbulo ancla el edificio — lo ves antes que nada.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "01",
        "venetian-armillary",
        1600,
        2133,
        tx(
          "The golden armillary sphere in The Venetian Macao lobby",
          "威尼斯人酒店大堂中央的金色浑天仪",
          "베네시안 마카오 로비의 금색 혼천의",
          "La esfera armilar dorada en el vestíbulo de The Venetian Macao",
        ),
        tx(
          "The golden armillary — the visual centre of the Venetian lobby.",
          "金色浑天仪，威尼斯人大堂的视觉中心。",
          "금색 혼천의, 베네시안 로비의 시각 중심.",
          "El armilar dorado — el centro visual del vestíbulo.",
        ),
      ),
    },
    { type: "heading", body: tx("03 — Look up", "03 · 抬头看", "03 · 위를 보라", "03 — Mira arriba") },
    {
      type: "text",
      body: tx(
        "Inside The Venetian, look up. The dome murals carry a Renaissance flavour — phone pointed up, and the frame fills itself.",
        "在威尼斯人一定要抬头。穹顶上的壁画，全是文艺复兴的味道，手机仰拍，随手都是大片。",
        "베네시안에서는 위를 보라. 돔 벽화는 르네상스 맛 — 폰만 들어도 화면이 찬다.",
        "En The Venetian, mira arriba. Los murales de la cúpula saben a Renacimiento — el móvil hacia arriba y el encuadre se llena solo.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "01",
        "venetian-dome",
        1600,
        2133,
        tx(
          "Painted dome ceiling with gold detail inside The Venetian Macao",
          "威尼斯人室内穹顶上的彩色壁画与金色装饰",
          "베네시안 실내 돔의 색 벽화와 금 장식",
          "Cúpula pintada con detalle dorado en The Venetian Macao",
        ),
        tx(
          "Dome detail — worth stopping just to look up.",
          "穹顶细节，值得专门停下来抬头看。",
          "돔 디테일 — 올려다보려고 멈출 가치.",
          "Detalle de la cúpula — vale pararse solo para mirar arriba.",
        ),
      ),
    },
    { type: "heading", body: tx("04 — The Parisian", "04 · 巴黎人", "04 · 파리안", "04 — The Parisian") },
    {
      type: "text",
      body: tx(
        "A short walk to The Parisian. Glass-dome lobby, daylight pouring in — French scale without the flight.",
        "走两步到巴黎人。玻璃穹顶大堂，阳光洒下来，法式气派直接拉满。",
        "두어 걸음이면 파리안. 유리 돔 로비에 햇빛이 쏟아진다 — 프랑스 스케일, 비행기 없이.",
        "Unos pasos hasta The Parisian. Vestíbulo de cúpula de cristal, luz natural — escala francesa sin el vuelo.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "01",
        "parisian-lobby",
        1600,
        2133,
        tx(
          "French-style lobby under a glass dome at The Parisian Macao",
          "巴黎人酒店玻璃穹顶下的法式大堂",
          "파리안 마카오 유리 돔 아래 프렌치 로비",
          "Vestíbulo de estilo francés bajo cúpula de cristal en The Parisian Macao",
        ),
        tx(
          "The glass dome pulls daylight into The Parisian lobby.",
          "玻璃穹顶把自然光带进巴黎人大堂。",
          "유리 돔이 파리안 로비에 자연광을 넣는다.",
          "La cúpula de cristal mete luz natural en el vestíbulo.",
        ),
      ),
    },
    { type: "heading", body: tx("05 — The Londoner", "05 · 伦敦人", "05 · 런던러", "05 — The Londoner") },
    {
      type: "text",
      body: tx(
        "Further along: The Londoner. A one-to-one Big Ben replica — for a second you forget you are still in Macau.",
        "再往前，伦敦人。大本钟一比一复刻，站在这儿，你会忘了自己在澳门。",
        "더 가면 런던러. 빅벤 1:1 복제 — 잠깐은 마카오를 잊는다.",
        "Más adelante: The Londoner. Big Ben a escala 1:1 — un segundo olvidas que sigues en Macao.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "01",
        "londoner-clock",
        1600,
        2133,
        tx(
          "The Big Ben replica at The Londoner Macao",
          "澳门伦敦人酒店外的大本钟复刻建筑",
          "런던러 마카오의 빅벤 복제",
          "La réplica del Big Ben en The Londoner Macao",
        ),
        tx(
          "Big Ben on a Cotai sidewalk — scale and detail both land.",
          "大本钟立在路氹街边，比例和细节都很有存在感。",
          "코타이 인도 위 빅벤 — 비율과 디테일이 둘 다 선다.",
          "Big Ben en la acera de Cotai — escala y detalle se notan.",
        ),
      ),
    },
    { type: "heading", body: tx("06 — The kiss sculpture", "06 · 情侣打卡", "06 · 키스 조각", "06 — La escultura del beso") },
    {
      type: "text",
      body: tx(
        "Outside City of Dreams, the face-to-face kiss sculpture is the couple photo stop. Art by day; lights at night make it louder.",
        "新濠天地门口，这对亲吻雕塑，情侣必打卡。白天看是艺术，晚上灯一亮更出片。",
        "시티 오브 드림스 앞 키스 조각은 커플 필수 컷. 낮엔 예술, 밤엔 조명으로 더 세다.",
        "Fuera de City of Dreams, la escultura del beso es la foto de pareja. Arte de día; de noche, con luces, pega más.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "01",
        "city-of-dreams-kiss",
        1600,
        2133,
        tx(
          "Kiss sculpture of two facing faces outside City of Dreams Macau",
          "新濠天地门口两张相对人脸组成的亲吻雕塑",
          "시티 오브 드림스 앞 두 얼굴이 마주한 키스 조각",
          "Escultura del beso con dos caras frente a frente fuera de City of Dreams",
        ),
        tx(
          "The kiss sculpture at the City of Dreams entrance.",
          "新濠天地门口的亲吻雕塑。",
          "시티 오브 드림스 입구의 키스 조각.",
          "La escultura del beso en la entrada de City of Dreams.",
        ),
      ),
    },
    { type: "heading", body: tx("07 — Wynn from the road", "07 · 永利", "07 · 윈", "07 — Wynn desde la calle") },
    {
      type: "text",
      body: tx(
        "Wynn sits right on the road — gold facade, hard to miss. You do not have to go in. Passing by is already the shot.",
        "永利就在路边，金色楼体，老远就看见。不用进去，路过看一眼就值。",
        "윈은 길가에 있다 — 금빛 외관, 멀리서도 보인다. 들어갈 필요 없다. 지나치기만 해도 값하다.",
        "Wynn está en la carretera — fachada dorada, imposible no verla. No hace falta entrar. Pasar ya vale la foto.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "01",
        "wynn-gold-facade",
        1600,
        2133,
        tx(
          "Golden facade of Wynn Macau seen from the roadside",
          "路边看到的澳门永利金色酒店外观",
          "길가에서 본 윈 마카오 금빛 외관",
          "Fachada dorada de Wynn Macao vista desde la carretera",
        ),
        tx(
          "Wynn from the roadside — you see it while you walk past.",
          "永利外观，沿路经过就能看见。",
          "길 따라 지나가며 보이는 윈.",
          "Wynn desde la acera — se ve al pasar.",
        ),
      ),
    },
    { type: "heading", body: tx("08 — Casino, one look", "08 · 赌场一笔", "08 · 카지노 한 줄", "08 — Casino, una mirada") },
    {
      type: "text",
      body: tx(
        "I walked into a casino floor too. Slots ringing. My rule: look, don’t play. Noise for a minute, then out.",
        "赌场也进去看了。老虎机叮叮当当，我的原则：只看不玩。看个热闹就出来，挺好。",
        "카지노 플로어에도 들어갔다. 슬롯이 울린다. 원칙: 보기만, 안 한다. 한바탕 보고 나온다.",
        "También entré a una sala. Tragamonedas sonando. Mi regla: mirar, no jugar. Un rato de ruido y fuera.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "01",
        "casino-slots",
        1600,
        2133,
        tx(
          "Bright slot-machine screens on a Macau casino floor",
          "澳门赌场内色彩明亮的老虎机屏幕",
          "마카오 카지노 플로어의 밝은 슬롯 화면",
          "Pantallas de tragamonedas en una sala de Macao",
        ),
        tx(
          "Look, don’t play — enough of the buzz, then leave.",
          "只看不玩，看过热闹就出来。",
          "보기만 하고, 떠들썩함만 보고 나온다.",
          "Mirar, no jugar — el ruido basta, y se sale.",
        ),
      ),
    },
    { type: "heading", body: tx("09 — How to string it", "09 · 怎么串起来", "09 · 어떻게 이을까", "09 — Cómo encadenarlo") },
    {
      type: "text",
      body: tx(
        "These stops sit on the Cotai Strip. Walk plus free shuttles make a full day. Don’t greed-stack: one lobby done well beats three rushed check-ins.",
        "这几家全在路氹金光大道上，步行加穿梭巴士，一天刚好。别贪多，一家逛透比三家打卡强。",
        "이 정류장들은 코타이 스트립에 있다. 걷기 + 셔틀이면 하루가 된다. 욕심 내지 마라: 로비 하나 제대로가 세 곳 찍기보다 낫다.",
        "Estas paradas están en la Cotai Strip. Andar más shuttles llenan el día. No acumules: un vestíbulo bien visto gana a tres check-ins rápidos.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "01",
        "cotai-waterfront",
        1600,
        2133,
        tx(
          "Outdoor water feature and hotel buildings along Cotai",
          "路氹酒店区户外水景、绿化与相邻酒店建筑",
          "코타이 호텔 구역 야외 수경과 인접 건물",
          "Fuente exterior y hoteles a lo largo de Cotai",
        ),
        tx(
          "Hotels look close. Walking between them takes longer than the map suggests.",
          "酒店之间看着近，实际走起来比想象中远。",
          "호텔은 가까워 보여도, 걸으면 생각보다 멀다.",
          "Los hoteles parecen cerca. Andar entre ellos tarda más de lo que parece.",
        ),
      ),
    },
    { type: "heading", body: tx("10 — Closing", "10 · 结语", "10 · 맺음", "10 — Cierre") },
    {
      type: "text",
      body: tx(
        "Cotai is Macau’s Side A: loud, lit, unapologetic. Macau is more than Side A. Next episode: Side B — the old town that has been here for four hundred years.",
        "路氹是澳门的 A 面：纸醉金迷，光明正大。但澳门不止 A 面，下集带你去 B 面：四百年的老城。",
        "코타이는 마카오의 A면: 화려하고 당당하다. 마카오는 A면만이 아니다. 다음 편: B면 — 사백 년 된 구시가지.",
        "Cotai es la cara A de Macao: brillante y sin disculpas. Macao es más que la A. Siguiente: la B — el casco viejo de cuatrocientos años.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "01",
        "venetian-dome-close",
        1600,
        2133,
        tx(
          "Golden armillary under the ornate Venetian Macao lobby dome",
          "威尼斯人酒店大堂华丽穹顶下的金色浑天仪",
          "화려한 베네시안 로비 돔 아래 금색 혼천의",
          "Armilar dorado bajo la cúpula del vestíbulo de The Venetian",
        ),
        tx(
          "Side A done. Next episode: the old town.",
          "看完路氹的 A 面，下一集去澳门的老城。",
          "A면은 여기까지. 다음 편은 구시가지.",
          "Cara A lista. Siguiente: el casco viejo.",
        ),
      ),
    },
    {
      type: "verdict",
      intro: tx(
        "After Cotai — notes for a first Macau trip.",
        "逛完路氹以后，给第一次来澳门的人。",
        "코타이를 본 뒤 — 첫 마카오 여행자에게.",
        "Después de Cotai — notas para un primer viaje a Macao.",
      ),
      rows: [
        {
          label: tx("Worth it", "值不值得", "갈 만한가", "¿Merece la pena?"),
          body: tx(
            "Worth it. First time in Macau, half a day to a day on Cotai is the default.",
            "值得。第一次来澳门，路氹半天到一天是标配。",
            "갈 만하다. 첫 마카오라면 코타이 반나절~하루가 기본.",
            "Merece la pena. Primera vez en Macao: medio día a un día en Cotai es lo normal.",
          ),
        },
        {
          label: tx("Who it's for", "适合谁", "누구에게", "Para quién"),
          body: tx(
            "First-timers; parents and kids (plenty to see without entering a casino); people who like photos.",
            "第一次来澳门的人；带爸妈、带孩子的人（不进赌场也有得逛）；喜欢拍照的人。",
            "처음 오는 사람; 부모님·아이와 (카지노 안 들어가도 볼 것 많음); 사진 좋아하는 사람.",
            "Primera visita; con padres o niños (hay mucho sin entrar al casino); a quien le gusta fotografiar.",
          ),
        },
        {
          label: tx("Budget", "预算", "예산", "Presupuesto"),
          body: tx(
            "Hotel lobbies and exteriors are free. Shopping and meals inside cost extra. Many shuttle buses are free.",
            "逛酒店大堂和外观全免费；里面购物餐饮另算；穿梭巴士多为免费。",
            "호텔 로비·외관은 무료. 안쪽 쇼핑·식사는 별도. 셔틀은 대개 무료.",
            "Vestíbulos y exteriores son gratis. Compras y comidas dentro, aparte. Muchos shuttles son gratis.",
          ),
        },
        {
          label: tx("Time", "时间", "시간", "Tiempo"),
          body: tx(
            "At least half a day; a full day if you want to linger. Lights after dark photograph well — and draw more people.",
            "至少留半天，想细逛留一天；晚上灯亮后更出片，但人也更多。",
            "최소 반나절, 천천히면 하루. 밤 조명은 잘 나오지만 사람도 많다.",
            "Al menos medio día; un día si quieres ir despacio. De noche hay más luz — y más gente.",
          ),
        },
        {
          label: tx("The catch", "有什么坑", "주의할 점", "El truco"),
          body: tx(
            "Don’t get pulled into the casino floor — look, don’t play. Distances between hotels walk longer than they look — use shuttles. Holidays are packed. Food and shopping inside run pricey.",
            "别在赌场里上头，只看不玩；酒店之间步行距离比看起来远，善用穿梭巴士；节假日人多，错峰；购物餐饮价格偏高，心里有数。",
            "카지노에서 끌려가지 마라 — 보기만. 호텔 사이는 생각보다 멀다 — 셔틀 써라. 연휴는 붐빈다. 안쪽 식음·쇼핑은 비싸다.",
            "No te enganches en el casino — mira, no juegues. Entre hoteles se camina más de lo que parece — usa shuttles. Festivos, lleno. Comer y comprar dentro sale caro.",
          ),
        },
      ],
    },
  ],
}

const ep02: StoryEpisode = {
  number: 2,
  slug: "02-old-town-four-hundred-years",
  status: "published",
  publishedAt: "2026-09-28",
  title: tx(
    "Old Town: Four Hundred Years Around the Corner",
    "老城，四百年没走远",
    "구시가지, 사백 년이 길 모퉁이에",
    "Casco viejo: cuatrocientos años a la vuelta",
  ),
  dek: tx(
    "Macau has two faces. Side A is Cotai. Side B is the old town. This episode is Side B.",
    "澳门有两个面。A 面在路氹，B 面在老城。这篇讲 B 面。",
    "마카오에는 두 얼굴이 있다. A면은 코타이, B면은 구시가지. 이 편은 B면.",
    "Macao tiene dos caras. La A es Cotai. La B es el casco viejo. Este episodio es la B.",
  ),
  cover: shot(
    "02",
    "portuguese-paving-lanterns",
    1600,
    2133,
    tx(
      "Portuguese wave-pattern paving and lanterns in a Macau old-town alley",
      "铺着黑白海浪纹葡式碎石路、挂着彩色灯笼的澳门小巷",
      "흑백 물결 포르투갈식 돌길과 등불이 걸린 마카오 골목",
      "Empedrado portugués de olas y farolillos en un callejón del casco viejo",
    ),
    tx(
      "Portuguese paving underfoot, lanterns overhead.",
      "葡式碎石路与头顶的灯笼。",
      "발아래 포르투갈식 돌길, 머리 위 등불.",
      "Empedrado portugués bajo los pies, farolillos arriba.",
    ),
  ),
  heroVideo: {
    src: "/stories/macau/02/hero.mp4",
    poster: shot(
      "02",
      "portuguese-paving-lanterns",
      1600,
      2133,
      tx(
        "Portuguese wave-pattern paving and lanterns in a Macau old-town alley",
        "铺着黑白海浪纹葡式碎石路、挂着彩色灯笼的澳门小巷",
        "흑백 물결 포르투갈식 돌길과 등불이 걸린 마카오 골목",
        "Empedrado portugués de olas y farolillos en un callejón del casco viejo",
      ),
    ),
  },
  blocks: [
    {
      type: "text",
      body: tx(
        "Macau has two faces. Side A is Cotai. Side B is the old town. This episode is Side B.",
        "澳门有两个面。A 面在路氹，B 面在老城。这篇讲 B 面。",
        "마카오에는 두 얼굴이 있다. A면은 코타이, B면은 구시가지. 이 편은 B면.",
        "Macao tiene dos caras. La A es Cotai. La B es el casco viejo. Este episodio es la B.",
      ),
    },
    { type: "heading", body: tx("01 — Ruins of St. Paul’s", "01 · 大三巴", "01 · 성 바오로 유적", "01 — Ruinas de San Pablo") },
    {
      type: "text",
      body: tx(
        "The Ruins of St. Paul’s are the postcard. The church burned centuries ago; the facade stayed — and became the face you remember.",
        "大三巴牌坊，澳门的地标。教堂烧了三百多年，只剩这面墙，反而成了最耐看的那一面。",
        "대삼바(성 바오로 유적)는 엽서 그 자체. 성당은 수백 년 전 탔고, 남은 파사드가 기억에 남는다.",
        "Las Ruinas de San Pablo son la postal. La iglesia ardió hace siglos; quedó la fachada — y esa es la cara que recuerdas.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "02",
        "ruins-of-st-pauls",
        1600,
        2133,
        tx(
          "The Ruins of St. Paul’s facade with people in the square below",
          "人群前方的大三巴牌坊",
          "광장 사람들 너머 성 바오로 유적 파사드",
          "Fachada de las Ruinas de San Pablo con gente en la plaza",
        ),
        tx(
          "The facade and the crowd at its feet.",
          "大三巴牌坊与牌坊下的人潮。",
          "파사드와 그 아래 인파.",
          "La fachada y la gente a sus pies.",
        ),
      ),
    },
    { type: "heading", body: tx("02 — Snack street", "02 · 人从众", "02 · 사람 바다", "02 — Calle de snacks") },
    {
      type: "text",
      body: tx(
        "Below the facade, the snack street packs tight. Almond cookies from Fengcheng — the queue is part of the tax; the box is still worth it.",
        "牌坊下面的小吃街，人挤人。凤城礼记的杏仁饼，排队也值得买一盒。",
        "파사드 아래 분식 거리는 빽빽하다. 봉성례기 아몬드 쿠키 — 줄도 값의 일부, 한 상자는 살 만하다.",
        "Bajo la fachada, la calle de snacks se aprieta. Galletas de almendra de Fengcheng — la cola es parte del precio; la caja aún vale.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "02",
        "snack-street-crowd",
        1600,
        2133,
        tx(
          "Crowded snack street below the Ruins of St. Paul’s",
          "大三巴牌坊下拥挤的小吃街",
          "성 바오로 유적 아래 붐비는 분식 거리",
          "Calle de snacks abarrotada bajo las Ruinas de San Pablo",
        ),
        tx(
          "The snack street under the facade.",
          "牌坊下面的小吃街。",
          "파사드 아래 분식 거리.",
          "La calle de snacks bajo la fachada.",
        ),
      ),
    },
    { type: "heading", body: tx("03 — Side alleys", "03 · 小巷", "03 · 골목", "03 — Callejones") },
    {
      type: "text",
      body: tx(
        "Turn into an alley and the crowd drops. Black-and-white Portuguese wave paving, lanterns overhead — that is old Macau’s texture.",
        "拐进小巷，人一下就少了。葡式碎石路，黑白两色铺出海浪纹，头顶挂着灯笼，这才是老澳门的味道。",
        "골목으로 꺾으면 사람이 줄는다. 흑백 물결 포르투갈식 돌길, 머리 위 등불 — 그게 옛 마카오 결이다.",
        "Entra en un callejón y baja la gente. Empedrado portugués en olas blanco y negro, farolillos arriba — esa es la textura del Macao viejo.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "02",
        "portuguese-paving-lanterns",
        1600,
        2133,
        tx(
          "Portuguese wave-pattern paving and lanterns in a Macau old-town alley",
          "铺着黑白海浪纹葡式碎石路、挂着彩色灯笼的澳门小巷",
          "흑백 물결 포르투갈식 돌길과 등불이 걸린 마카오 골목",
          "Empedrado portugués de olas y farolillos en un callejón del casco viejo",
        ),
        tx(
          "Portuguese paving underfoot, lanterns overhead.",
          "葡式碎石路与头顶的灯笼。",
          "발아래 포르투갈식 돌길, 머리 위 등불.",
          "Empedrado portugués bajo los pies, farolillos arriba.",
        ),
      ),
    },
    { type: "heading", body: tx("04 — Quiet old town", "04 · 安静的老城", "04 · 조용한 구시가지", "04 — Casco viejo en calma") },
    {
      type: "text",
      body: tx(
        "Walk deeper and even tourists thin out. Arcades, signs, patched walls — the old town keeps its own pace. It does not rush you.",
        "再往里走，连游客都少了。骑楼、招牌、斑驳的墙，老城有自己的节奏，不催你。",
        "더 깊이 들어가면 관광객도 준다. 아케이드, 간판, 얼룩진 벽 — 구시가지는 제 박자다. 재촉하지 않는다.",
        "Más adentro, hasta los turistas escasean. Arcadas, letreros, muros remendados — el casco viejo lleva su ritmo. No te empuja.",
      ),
    },
    {
      type: "photo",
      photo: shot(
        "02",
        "quiet-old-town",
        1600,
        2133,
        tx(
          "A quiet Macau old-town street with few visitors",
          "游客稀少的澳门老城街道",
          "방문객이 드문 마카오 구시가지 거리",
          "Calle tranquila del casco viejo de Macao con pocos visitantes",
        ),
        tx(
          "Leave the main road. Walk further into the old town.",
          "离开主路，再往老城深处走。",
          "큰길을 떠나 구시가지 더 안으로.",
          "Deja la calle principal. Entra más en el casco viejo.",
        ),
      ),
    },
    { type: "heading", body: tx("05 — How I arrived", "05 · 怎么来", "05 · 어떻게 왔나", "05 — Cómo llegué") },
    {
      type: "text",
      body: tx(
        "I came from Hong Kong on the Hong Kong–Macau Express bus, across the Hong Kong–Zhuhai–Macao Bridge, sea the whole way. I kept the ticket and route card as a bookmark.",
        "我是从香港坐港澳一号巴士来的，经港珠澳大桥，一路看海。车票和路线指引都留着，当书签了。",
        "홍콩에서 홍콩–마카오 1호 버스로 왔다. 강주아오 대교를 건너며 줄곧 바다. 표와 노선 안내를 책갈피로 남겨 뒀다.",
        "Vine de Hong Kong en el bus Express Hong Kong–Macao, por el puente Hong Kong–Zhuhai–Macao, mar todo el trayecto. Guardé el billete y la hoja de ruta como marcapáginas.",
      ),
    },
    {
      type: "pair",
      photos: [
        shot(
          "02",
          "hk-macau-bus-ticket",
          1600,
          2133,
          tx(
            "Hong Kong–Macau Express bus ticket and route card in hand",
            "手里拿着港澳一号巴士车票和路线指引",
            "손에 든 홍콩–마카오 1호 버스 표와 노선 안내",
            "Billete y hoja de ruta del bus Express Hong Kong–Macao en la mano",
          ),
        ),
        shot(
          "02",
          "hzmb-from-bus",
          1600,
          2133,
          tx(
            "Hong Kong–Zhuhai–Macao Bridge and sea from the bus window",
            "从巴士车窗望见港珠澳大桥与海面",
            "버스 창으로 본 강주아오 대교와 바다",
            "Puente Hong Kong–Zhuhai–Macao y mar desde la ventanilla",
          ),
          tx(
            "The Express ticket, and the sea from the window on the bridge.",
            "港澳一号巴士车票，以及过桥时从车窗看到的海。",
            "1호 버스 표, 그리고 다리 위 창밖 바다.",
            "El billete Express, y el mar por la ventanilla en el puente.",
          ),
        ),
      ],
    },
    { type: "heading", body: tx("06 — Closing", "06 · 结语", "06 · 맺음", "06 — Cierre") },
    {
      type: "text",
      body: tx(
        "Cotai is Side A. Old town is Side B. A day on A, half a day on B — together that is a full Macau. Mine looked like this. Yours does not have to copy it.",
        "路氹是澳门的 A 面，老城是 B 面。A 面一天，B 面半天，拼起来就是完整的澳门。我的澳门是这样，你的不必复制。",
        "코타이는 A면, 구시가지는 B면. A에 하루, B에 반나절이면 한 장의 마카오. 내 마카오는 이랬다. 네 것은 베낄 필요 없다.",
        "Cotai es la A. El casco viejo es la B. Un día en A, medio en B — juntos un Macao completo. El mío fue así. El tuyo no tiene que copiarlo.",
      ),
    },
    {
      type: "verdict",
      intro: tx(
        "Half a day in the old town — how I’d place it.",
        "老城半天，怎么安排。",
        "구시가지 반나절 — 어떻게 둘지.",
        "Medio día en el casco viejo — cómo lo colocaría.",
      ),
      rows: [
        {
          label: tx("Worth it", "值不值得", "갈 만한가", "¿Merece la pena?"),
          body: tx(
            "Worth it. Cotai and old town are different worlds — skip this and the trip feels half-built.",
            "值得，和路氹完全是两个世界，不来等于白来。",
            "갈 만하다. 코타이와는 다른 세계 — 안 오면 반쪽 여행.",
            "Merece la pena. Cotai y el casco viejo son mundos distintos — saltártelo deja el viaje a medias.",
          ),
        },
        {
          label: tx("Who it's for", "适合谁", "누구에게", "Para quién"),
          body: tx(
            "People who like old towns, city walks, and photos; parents (slower pace, less exhausting).",
            "喜欢老城、citywalk、拍照的人；带爸妈的人（节奏慢，不累）。",
            "구시가지·시티워크·사진 좋아하는 사람; 부모님과 (느린 리듬, 덜 힘듦).",
            "Quien gusta de cascos viejos, city walks y fotos; con padres (ritmo lento, menos cansancio).",
          ),
        },
        {
          label: tx("Budget", "预算", "예산", "Presupuesto"),
          body: tx(
            "Ruins of St. Paul’s are free. Snacks scale to taste — a few dozen dollars still feeds you well.",
            "大三巴免费；小吃丰俭由人，几十块也能吃好。",
            "성 바오로 유적은 무료. 분식은 취향대로 — 몇십 원이면 잘 먹는다.",
            "Las Ruinas son gratis. Los snacks, a tu gusto — unas decenas de dólares ya alimentan bien.",
          ),
        },
        {
          label: tx("Time", "时间", "시간", "Tiempo"),
          body: tx(
            "Half a day is enough. Pair with Cotai for a one- or two-day Macau.",
            "半天足够，和路氹拼成一日游或两日游。",
            "반나절이면 충분. 코타이와 붙여 하루 또는 이틀.",
            "Medio día basta. Júntalo con Cotai para uno o dos días en Macao.",
          ),
        },
        {
          label: tx("The catch", "有什么坑", "주의할 점", "El truco"),
          body: tx(
            "Holidays pack the Ruins — go early. Alleys climb; wear shoes you can walk in. Follow the Portuguese paving, not only the big-road nav. Check Express bus times before you go.",
            "节假日大三巴人挤人，尽量早去；小巷多上坡，穿好走的鞋；认准葡式碎石路面，别只跟着导航走大路；港澳一号巴士班次提前查好。",
            "연휴 유적은 붐빈다 — 일찍. 골목은 오르막, 걷기 좋은 신. 큰길 내비만 믿지 말고 포르투갈식 돌길을 따라라. 1호 버스 시간 미리 확인.",
            "En festivos las Ruinas se llenan — ve temprano. Los callejones suben; calzado cómodo. Sigue el empedrado portugués, no solo la ruta grande. Mira horarios del Express antes.",
          ),
        },
      ],
    },
    {
      type: "quote",
      body: tx(
        "My Macau looked like this. Yours does not have to copy it.",
        "我的澳门是这样，你的澳门不必复制。",
        "내 마카오는 이랬다. 네 마카오는 베낄 필요 없다.",
        "Mi Macao fue así. El tuyo no tiene que copiarlo.",
      ),
    },
  ],
}

export const macau: StorySeason = {
  slug: "macau",
  destination: "Macau",
  place: tx("Macau", "澳门", "마카오", "Macao"),
  region: "asia",
  title: tx("My Macau", "我的澳门", "나의 마카오", "Mi Macao"),
  subtitle: tx(
    "Side A Cotai, Side B old town",
    "A 面路氹，B 面老城",
    "A면 코타이, B면 구시가지",
    "Cara A Cotai, cara B casco viejo",
  ),
  intro: tx(
    "Two short stories from one Macau trip — the Cotai strip that sells Europe in a day, and the old town that has been around the corner for four hundred years. Then a question: what should your Macau look like?",
    "一次澳门行程里的两个短故事——一天逛完“欧洲”的路氹，以及拐个弯就四百年的老城。最后是一个问题：你的澳门应该是什么样子？",
    "한 번의 마카오 여행에서 나온 두 짧은 이야기 — 하루에 “유럽”을 파는 코타이, 길 모퉁이에 사백 년이 있는 구시가지. 마지막 질문: 당신의 마카오는 어떤 모습이어야 할까?",
    "Dos relatos cortos de un viaje a Macao — la franja Cotai que vende Europa en un día, y el casco viejo que lleva cuatrocientos años a la vuelta. Luego una pregunta: ¿cómo debería ser tu Macao?",
  ),
  cover: shot(
    "01",
    "londoner-big-ben",
    1600,
    2133,
    tx(
      "The Big Ben replica outside The Londoner Macao on Cotai",
      "澳门路氹伦敦人酒店外的大本钟与街景",
      "코타이 런던러 호텔 앞 빅벤 복제와 거리",
      "La réplica del Big Ben frente a The Londoner Macao en Cotai",
    ),
  ),
  episodes: [ep01, ep02],
}
