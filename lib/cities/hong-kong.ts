import type { City, CityPhoto, CityText, Cluster, Place, Source, TravelRoute } from "./types"

// Hong Kong reference city (ADR 0008).
// Facts come from the linked Wikipedia articles; coordinates come from the linked Wikidata items.
// Visit length, best time, setting and walking effort are editorial estimates, not sourced facts.
// "xing_pick" is left for the publisher to set. It is a first-hand label and must not be inferred.

const RETRIEVED = "2026-09-30"

const t = (en: string, zh: string, ko: string, es: string): CityText => ({ en, zh, ko, es })

const wikipedia = (title: string, path: string): Source => ({
  name: `Wikipedia: ${title}`,
  url: `https://en.wikipedia.org/wiki/${path}`,
  retrievedAt: RETRIEVED,
})

const wikidata = (qid: string): Source => ({
  name: `Wikidata ${qid} (coordinates)`,
  url: `https://www.wikidata.org/wiki/${qid}`,
  retrievedAt: RETRIEVED,
})

const clusters: Cluster[] = [
  { id: "central-sheung-wan", side: "island", neighbours: ["the-peak", "wan-chai-causeway-bay", "kennedy-town", "tsim-sha-tsui"], name: t("Central & Sheung Wan", "中环与上环", "센트럴·성완", "Central y Sheung Wan") },
  { id: "the-peak", side: "island", neighbours: ["central-sheung-wan"], name: t("The Peak", "山顶", "더 피크", "The Peak") },
  { id: "wan-chai-causeway-bay", side: "island", neighbours: ["central-sheung-wan", "eastern-island"], name: t("Wan Chai & Causeway Bay", "湾仔与铜锣湾", "완차이·코즈웨이베이", "Wan Chai y Causeway Bay") },
  { id: "eastern-island", side: "island", neighbours: ["wan-chai-causeway-bay"], name: t("Eastern Hong Kong Island", "港岛东", "홍콩섬 동부", "Este de la isla de Hong Kong") },
  { id: "kennedy-town", side: "island", neighbours: ["central-sheung-wan"], name: t("Kennedy Town", "坚尼地城", "케네디타운", "Kennedy Town") },
  { id: "tsim-sha-tsui", side: "kowloon", neighbours: ["central-sheung-wan", "jordan-yau-ma-tei"], name: t("Tsim Sha Tsui & West Kowloon", "尖沙咀与西九龙", "침사추이·서구룡", "Tsim Sha Tsui y Kowloon Oeste") },
  { id: "jordan-yau-ma-tei", side: "kowloon", neighbours: ["tsim-sha-tsui", "mong-kok"], name: t("Jordan & Yau Ma Tei", "佐敦与油麻地", "조던·야우마테이", "Jordan y Yau Ma Tei") },
  { id: "mong-kok", side: "kowloon", neighbours: ["jordan-yau-ma-tei"], name: t("Mong Kok", "旺角", "몽콕", "Mong Kok") },
]

const places: Place[] = [
  // ── Central & Sheung Wan ──
  {
    id: "tai-kwun",
    name: t("Tai Kwun", "大馆", "대관 (타이쿤)", "Tai Kwun"),
    localName: "大館",
    clusterId: "central-sheung-wan",
    coordinates: { lat: 22.281262, lng: 114.154045, precision: "site" },
    categories: ["culture", "photo"],
    summary: t(
      "The former Central Police Station compound: three declared monuments (the police station, the Central Magistracy and Victoria Prison). It reopened on 29 May 2018 as a centre for heritage and arts.",
      "前中区警署建筑群，包含三项法定古迹：前中区警署、前中央裁判司署和域多利监狱。2018 年 5 月 29 日活化后重新开放，成为古迹及艺术中心。",
      "옛 중앙경찰서 단지로, 옛 경찰서·중앙치안법원·빅토리아 교도소 세 곳의 법정 기념물로 이루어져 있습니다. 2018년 5월 29일 문화유산·예술 센터로 다시 문을 열었습니다.",
      "El antiguo complejo de la Comisaría Central: tres monumentos declarados (la comisaría, la Magistratura Central y la Prisión Victoria). Reabrió el 29 de mayo de 2018 como centro de patrimonio y arte."
    ),
    sources: [wikipedia("Tai Kwun", "Tai_Kwun"), wikidata("Q10871919")],
    visitMinutes: { min: 60, max: 90 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "pmq",
    name: t("PMQ", "元创方 (PMQ)", "PMQ", "PMQ"),
    localName: "元創方",
    clusterId: "central-sheung-wan",
    coordinates: { lat: 22.283354, lng: 114.151862, precision: "site" },
    categories: ["culture", "photo"],
    summary: t(
      "The former Police Married Quarters, on the site of the original Queen's College (1889). A Grade III historic building since 2010, it opened to the public in 2014 as an arts and design venue with studios and shops.",
      "前已婚警察宿舍，原址是 1889 年建成的中央书院。自 2010 年起列为三级历史建筑，2014 年作为设计与创意场地对外开放，设有工作室和商店。",
      "옛 기혼 경찰관 숙소로, 1889년 세워진 옛 퀸스 칼리지 자리에 있습니다. 2010년부터 3급 역사 건축물이며, 2014년 스튜디오와 상점이 있는 예술·디자인 공간으로 개방되었습니다.",
      "Las antiguas viviendas para policías casados, en el solar del primer Queen's College (1889). Edificio histórico de grado III desde 2010, abrió al público en 2014 como espacio de arte y diseño con estudios y tiendas."
    ),
    sources: [wikipedia("PMQ (Hong Kong)", "PMQ_(Hong_Kong)"), wikidata("Q16922815")],
    visitMinutes: { min: 45, max: 75 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "moderate",
  },
  {
    id: "man-mo-temple",
    name: t("Man Mo Temple", "文武庙", "만모 사원", "Templo Man Mo"),
    localName: "文武廟",
    clusterId: "central-sheung-wan",
    coordinates: { lat: 22.283982, lng: 114.150239, precision: "site" },
    categories: ["culture", "iconic"],
    summary: t(
      "The best-known of Hong Kong's Man Mo temples, in Sheung Wan. It honours Man Tai, god of literature, and Kwan Tai, the martial god; scholars prayed to both for success in the civil examinations.",
      "香港多座文武庙中最著名的一座，位于上环。供奉文昌帝君和关帝，旧时读书人会来祈求科举顺利。",
      "홍콩의 여러 만모 사원 가운데 가장 잘 알려진 곳으로 성완에 있습니다. 문학의 신 문창제군과 무신 관제를 모시며, 옛 선비들이 과거 급제를 빌던 곳입니다.",
      "El más conocido de los templos Man Mo de Hong Kong, en Sheung Wan. Honra a Man Tai, dios de la literatura, y a Kwan Tai, dios marcial; los eruditos rezaban a ambos por éxito en los exámenes imperiales."
    ),
    sources: [wikipedia("Man Mo temples in Hong Kong", "Man_Mo_temples_in_Hong_Kong"), wikidata("Q30963154")],
    visitMinutes: { min: 20, max: 40 },
    bestTime: "any",
    setting: "indoor",
    weatherSensitive: false,
    walking: "moderate",
  },
  {
    id: "mid-levels-escalator",
    name: t("Central–Mid-Levels Escalator", "中环至半山自动扶梯", "센트럴–미드레벨 에스컬레이터", "Escaleras mecánicas Central–Mid-Levels"),
    localName: "中環至半山自動扶梯",
    clusterId: "central-sheung-wan",
    coordinates: { lat: 22.28101, lng: 114.15251, precision: "area" },
    categories: ["local", "iconic"],
    summary: t(
      "Opened in 1993, this covered outdoor escalator and walkway system runs over 800 m and climbs over 135 m between Central and the Mid-Levels. It is the second-longest system of its kind in the world.",
      "1993 年启用的有盖户外扶梯及行人道系统，全长 800 多米，连接中环与半山，高差超过 135 米，是世界第二长的户外有盖扶梯系统。",
      "1993년에 개통한 지붕 덮인 옥외 에스컬레이터·보행로로, 800m 넘게 이어지며 센트럴과 미드레벨 사이 135m 이상을 오릅니다. 같은 종류로는 세계에서 두 번째로 깁니다.",
      "Inaugurado en 1993, este sistema cubierto de escaleras mecánicas y pasarelas al aire libre recorre más de 800 m y sube más de 135 m entre Central y Mid-Levels. Es el segundo más largo de su tipo en el mundo."
    ),
    sources: [wikipedia("Central–Mid-Levels escalator", "Central%E2%80%93Mid-Levels_escalator"), wikidata("Q859404")],
    visitMinutes: { min: 20, max: 40 },
    bestTime: "any",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "graham-street-market",
    name: t("Graham Street Market", "嘉咸街街市", "그레이엄 스트리트 마켓", "Mercado de Graham Street"),
    localName: "嘉咸街",
    clusterId: "central-sheung-wan",
    coordinates: { lat: 22.28283, lng: 114.15331, precision: "area" },
    categories: ["local", "food"],
    summary: t(
      "A street in Central and home to Graham Street Market, one of the oldest continuously operating street markets in Hong Kong.",
      "中环的一条街道，嘉咸街街市就在这里，是香港历史最悠久、一直持续经营的街市之一。",
      "센트럴의 거리로, 홍콩에서 가장 오래 쉬지 않고 운영되어 온 거리 시장 중 하나인 그레이엄 스트리트 마켓이 있습니다.",
      "Una calle de Central donde está el mercado de Graham Street, uno de los mercados callejeros en funcionamiento continuo más antiguos de Hong Kong."
    ),
    sources: [wikipedia("Graham Street", "Graham_Street"), wikidata("Q5593290")],
    visitMinutes: { min: 20, max: 40 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "moderate",
  },
  {
    id: "lan-fong-yuen",
    name: t("Lan Fong Yuen", "兰芳园", "란퐁위엔", "Lan Fong Yuen"),
    localName: "蘭芳園",
    clusterId: "central-sheung-wan",
    coordinates: { lat: 22.28269, lng: 114.15379, precision: "site" },
    categories: ["food", "local"],
    summary: t(
      "A cha chaan teng on Gage Street in Central, founded in 1952 as a dai pai dong. Its street-side stall is one of the few dai pai dong left in Hong Kong, and it is known for Hong Kong-style milk tea.",
      "位于中环结志街的茶餐厅，1952 年创办，起初以大牌档形式经营。街边档口至今保留，是香港仅存的大牌档之一，以港式奶茶闻名。",
      "센트럴 게이지 스트리트의 차찬텡으로, 1952년 다이파이동(노천 식당)으로 시작했습니다. 길가 노점은 홍콩에 몇 남지 않은 다이파이동 중 하나이며, 홍콩식 밀크티로 유명합니다.",
      "Un cha chaan teng en Gage Street, Central, fundado en 1952 como dai pai dong. Su puesto en la calle es uno de los pocos dai pai dong que quedan en Hong Kong, y es conocido por el té con leche al estilo de Hong Kong."
    ),
    sources: [
      { name: "Wikipedia (中文): 蘭芳園", url: "https://zh.wikipedia.org/wiki/%E8%98%AD%E8%8A%B3%E5%9C%92", retrievedAt: RETRIEVED },
      wikidata("Q15921803"),
    ],
    visitMinutes: { min: 30, max: 45 },
    bestTime: "morning",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "central-harbourfront",
    name: t("Central Harbourfront & Observation Wheel", "中环海滨与摩天轮", "센트럴 하버프런트·관람차", "Paseo marítimo de Central y noria"),
    localName: "中環海濱",
    clusterId: "central-sheung-wan",
    coordinates: { lat: 22.2853, lng: 114.1617, precision: "site" },
    categories: ["photo", "iconic"],
    summary: t(
      "The 60 m Hong Kong Observation Wheel stands on the Central Harbourfront. It has 42 air-conditioned gondolas, and a ride of two to three rotations takes about 15 minutes.",
      "60 米高的香港摩天轮位于中环海滨，共有 42 个空调车厢，每次乘坐转两到三圈，约 15 分钟。",
      "높이 60m의 홍콩 관람차가 센트럴 하버프런트에 있습니다. 냉방되는 곤돌라 42개가 있고, 한 번 타면 2~3바퀴를 돌며 약 15분이 걸립니다.",
      "La noria de Hong Kong, de 60 m, está en el paseo marítimo de Central. Tiene 42 góndolas climatizadas y un viaje de dos o tres vueltas dura unos 15 minutos."
    ),
    sources: [wikipedia("Hong Kong Observation Wheel", "Hong_Kong_Observation_Wheel"), wikidata("Q18119458")],
    visitMinutes: { min: 30, max: 60 },
    bestTime: "sunset",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "star-ferry",
    name: t("Star Ferry (Central Pier)", "天星小轮（中环码头）", "스타페리 (센트럴 부두)", "Star Ferry (muelle de Central)"),
    localName: "中環天星碼頭",
    clusterId: "central-sheung-wan",
    coordinates: { lat: 22.2872, lng: 114.161, precision: "site" },
    categories: ["iconic", "photo"],
    summary: t(
      "The Star Ferry, founded in 1888, carries passengers across Victoria Harbour between Hong Kong Island and Kowloon. Despite rail and road tunnels, it remains a scenic way to cross the harbour.",
      "天星小轮公司创立于 1888 年，渡轮往返维多利亚港两岸，连接港岛与九龙。虽然已有铁路和海底隧道，它仍是欣赏海港景色的过海方式。",
      "1888년에 설립된 스타페리는 빅토리아 하버를 건너 홍콩섬과 구룡을 잇습니다. 철도와 해저터널이 생긴 지금도 항구 풍경을 보며 건너는 방법으로 남아 있습니다.",
      "El Star Ferry, fundado en 1888, cruza el puerto Victoria entre la isla de Hong Kong y Kowloon. Aunque hay túneles ferroviarios y de carretera, sigue siendo una forma pintoresca de cruzar el puerto."
    ),
    sources: [wikipedia("Star Ferry", "Star_Ferry"), wikidata("Q7600710")],
    visitMinutes: { min: 15, max: 25 },
    bestTime: "any",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",

    transport: true,
  },

  // ── The Peak ──
  {
    id: "the-peak",
    name: t("The Peak", "山顶", "빅토리아 피크", "The Peak (Cumbre Victoria)"),
    localName: "山頂",
    clusterId: "the-peak",
    coordinates: { lat: 22.2715, lng: 114.15, precision: "site" },
    categories: ["iconic", "nature", "photo"],
    summary: t(
      "Victoria Peak (552 m) is the tallest hill on Hong Kong Island; its summit is closed, so visitors go to the area around the Peak Tower at 396 m. The Peak Tram, running since 1888 and the first funicular in Asia, ends inside the tower. The views take in Central, Victoria Harbour and Lamma Island.",
      "太平山高 552 米，是港岛最高的山，山顶本身不对外开放，游客去的是海拔 396 米的凌霄阁一带。1888 年通车、亚洲第一条缆索铁路山顶缆车，终点就在凌霄阁内。从这里可以看到中环、维多利亚港和南丫岛。",
      "빅토리아 피크(552m)는 홍콩섬에서 가장 높은 산이지만 정상은 출입할 수 없어, 방문객은 해발 396m 피크 타워 일대로 갑니다. 1888년 개통한 아시아 최초의 푸니쿨라 피크 트램이 타워 안에서 끝납니다. 센트럴, 빅토리아 하버, 라마섬이 내려다보입니다.",
      "La Cumbre Victoria (552 m) es la colina más alta de la isla de Hong Kong; la cima está cerrada, así que se visita la zona de la Peak Tower, a 396 m. El Peak Tram, en servicio desde 1888 y primer funicular de Asia, termina dentro de la torre. Las vistas abarcan Central, el puerto Victoria y la isla de Lamma."
    ),
    sources: [
      wikipedia("Victoria Peak", "Victoria_Peak"),
      wikipedia("Peak Tower", "Peak_Tower"),
      wikipedia("Peak Tram", "Peak_Tram"),
      wikidata("Q842535"),
    ],
    visitMinutes: { min: 90, max: 150 },
    bestTime: "sunset",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },

  // ── Wan Chai & Causeway Bay ──
  {
    id: "blue-house",
    name: t("Blue House", "蓝屋", "블루 하우스", "Casa Azul (Blue House)"),
    localName: "藍屋",
    clusterId: "wan-chai-causeway-bay",
    coordinates: { lat: 22.2739, lng: 114.174, precision: "site" },
    categories: ["culture", "photo"],
    summary: t(
      "A four-storey balcony-type tenement (tong lau) at 72–74A Stone Nullah Lane, Wan Chai, named for its blue walls. It is one of the few surviving examples of its type and a Grade I historic building.",
      "位于湾仔石水渠街 72–74A 号的四层骑楼式唐楼，因外墙漆成蓝色得名，是香港少数现存的同类建筑之一，列为一级历史建筑。",
      "완차이 스톤 널라 레인 72–74A번지의 4층짜리 발코니형 통라우(옛 주상복합 건물)로, 파란 외벽 때문에 이런 이름이 붙었습니다. 같은 유형으로는 몇 남지 않은 건물이며 1급 역사 건축물입니다.",
      "Un edificio de viviendas (tong lau) de cuatro plantas con balcones, en 72–74A Stone Nullah Lane, Wan Chai, llamado así por sus paredes azules. Es uno de los pocos ejemplos que quedan de su tipo y edificio histórico de grado I."
    ),
    sources: [wikipedia("Blue House (Hong Kong)", "Blue_House_(Hong_Kong)"), wikidata("Q4929255")],
    visitMinutes: { min: 20, max: 30 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: false,
    walking: "moderate",
  },
  {
    id: "pak-tai-temple",
    name: t("Pak Tai Temple", "湾仔北帝庙", "완차이 북제묘", "Templo Pak Tai"),
    localName: "灣仔北帝廟",
    clusterId: "wan-chai-causeway-bay",
    coordinates: { lat: 22.272876, lng: 114.173823, precision: "site" },
    categories: ["culture", "local"],
    summary: t(
      "Also known as Yuk Hui Kung, on Lung On Street in Wan Chai. Built by locals in 1863, it houses a 3 m Ming dynasty statue of Pak Tai made in 1603.",
      "又名玉虚宫，位于湾仔隆安街，1863 年由街坊兴建，庙内供奉一尊 1603 年铸造、高 3 米的明代北帝像。",
      "옥허궁이라고도 하며 완차이 룽온 스트리트에 있습니다. 1863년 주민들이 지었고, 1603년에 만든 높이 3m의 명나라 북제상이 모셔져 있습니다.",
      "También llamado Yuk Hui Kung, en Lung On Street, Wan Chai. Lo construyeron los vecinos en 1863 y alberga una estatua de Pak Tai de 3 m, de la dinastía Ming, hecha en 1603."
    ),
    sources: [wikipedia("Wan Chai Pak Tai Temple", "Wan_Chai_Pak_Tai_Temple"), wikidata("Q2412536")],
    visitMinutes: { min: 20, max: 30 },
    bestTime: "any",
    setting: "indoor",
    weatherSensitive: false,
    walking: "moderate",
  },
  {
    id: "victoria-park",
    name: t("Victoria Park", "维多利亚公园", "빅토리아 공원", "Parque Victoria"),
    localName: "維多利亞公園",
    clusterId: "wan-chai-causeway-bay",
    coordinates: { lat: 22.281944, lng: 114.188056, precision: "site" },
    categories: ["nature", "local"],
    summary: t(
      "A public park of about 19 hectares in Causeway Bay, named after Queen Victoria, whose statue stands inside. It first opened in 1957.",
      "位于铜锣湾的公共公园，面积约 19 公顷，以维多利亚女王命名，园内立有她的雕像。1957 年首次开放。",
      "코즈웨이베이에 있는 약 19헥타르의 공원으로, 빅토리아 여왕의 이름을 땄고 공원 안에 여왕 동상이 있습니다. 1957년에 처음 개방했습니다.",
      "Un parque público de unas 19 hectáreas en Causeway Bay, con el nombre de la reina Victoria, cuya estatua está dentro. Abrió por primera vez en 1957."
    ),
    sources: [wikipedia("Victoria Park (Hong Kong)", "Victoria_Park_(Hong_Kong)"), wikidata("Q1859090")],
    visitMinutes: { min: 30, max: 60 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },

  // ── Eastern Hong Kong Island ──
  {
    id: "monster-building",
    name: t("Monster Building", "怪兽大厦（益昌大厦）", "몬스터 빌딩", "Monster Building"),
    localName: "益昌大廈",
    clusterId: "eastern-island",
    coordinates: { lat: 22.28423, lng: 114.21231, precision: "site" },
    categories: ["photo"],
    summary: t(
      "Five connected residential blocks on King's Road, Quarry Bay, home to around 10,000 people. It is a popular photography spot and has inspired several filming locations.",
      "位于鲗鱼涌英皇道的五座相连住宅楼，约有一万人居住。这里是热门拍照地点，也为多部电影的取景提供了灵感。",
      "쿼리베이 킹스 로드에 있는 서로 연결된 주거용 건물 다섯 동으로, 약 1만 명이 살고 있습니다. 인기 사진 명소이며 여러 영화 촬영지에 영감을 주었습니다.",
      "Cinco bloques residenciales conectados en King's Road, Quarry Bay, donde viven unas 10.000 personas. Es un lugar popular para fotografiar y ha inspirado varias localizaciones de rodaje."
    ),
    sources: [wikipedia("Monster Building", "Monster_Building"), wikidata("Q16888858")],
    visitMinutes: { min: 20, max: 30 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },

  // ── Kennedy Town ──
  {
    id: "kennedy-town",
    name: t("Kennedy Town", "坚尼地城", "케네디타운", "Kennedy Town"),
    localName: "堅尼地城",
    clusterId: "kennedy-town",
    coordinates: { lat: 22.28, lng: 114.125, precision: "area" },
    categories: ["local", "photo"],
    summary: t(
      "A neighbourhood at the western end of Hong Kong Island, named after the 7th governor, Arthur Edward Kennedy. The MTR reached it in 2014, and the area has changed quickly since.",
      "位于港岛西端的社区，以第七任港督坚尼地命名。港铁 2014 年通到这里之后，社区面貌变化很快。",
      "홍콩섬 서쪽 끝의 동네로, 제7대 총독 아서 에드워드 케네디의 이름을 땄습니다. 2014년 MTR이 들어온 뒤 빠르게 변하고 있습니다.",
      "Un barrio en el extremo occidental de la isla de Hong Kong, con el nombre del séptimo gobernador, Arthur Edward Kennedy. El MTR llegó en 2014 y la zona ha cambiado rápido desde entonces."
    ),
    sources: [wikipedia("Kennedy Town", "Kennedy_Town"), wikidata("Q3497036")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "sunset",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },

  // ── Tsim Sha Tsui & West Kowloon ──
  {
    id: "clock-tower",
    name: t("Tsim Sha Tsui Clock Tower", "尖沙咀钟楼", "침사추이 시계탑", "Torre del Reloj de Tsim Sha Tsui"),
    localName: "尖沙咀鐘樓",
    clusterId: "tsim-sha-tsui",
    coordinates: { lat: 22.293581, lng: 114.16955, precision: "site" },
    categories: ["iconic", "culture", "photo"],
    summary: t(
      "A 44 m tower of red brick and granite on the southern shore of Tsim Sha Tsui. It is the only remnant of the original Kowloon station of the Kowloon–Canton Railway.",
      "位于尖沙咀南岸、以红砖和花岗岩建成的 44 米高钟楼，是九广铁路旧九龙站唯一留下的部分。",
      "침사추이 남쪽 해안에 있는 붉은 벽돌과 화강암으로 된 44m 높이의 탑으로, 구룡–광저우 철도 옛 구룡역에서 유일하게 남은 부분입니다.",
      "Una torre de 44 m de ladrillo rojo y granito en la orilla sur de Tsim Sha Tsui. Es lo único que queda de la antigua estación de Kowloon del ferrocarril Kowloon–Cantón."
    ),
    sources: [wikipedia("Clock Tower, Hong Kong", "Clock_Tower,_Hong_Kong"), wikidata("Q692288")],
    visitMinutes: { min: 10, max: 20 },
    bestTime: "any",
    setting: "outdoor",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "avenue-of-stars",
    name: t("Avenue of Stars", "星光大道", "스타의 거리", "Avenida de las Estrellas"),
    localName: "星光大道",
    clusterId: "tsim-sha-tsui",
    coordinates: { lat: 22.2931, lng: 114.175, precision: "site" },
    categories: ["iconic", "photo", "night"],
    summary: t(
      "A promenade along the Victoria Harbour waterfront in Tsim Sha Tsui, modelled on the Hollywood Walk of Fame. It honours stars of the Hong Kong film industry.",
      "尖沙咀维多利亚港海旁的步道，仿照好莱坞星光大道而建，用来纪念香港电影业的明星。",
      "침사추이 빅토리아 하버 해안을 따라 난 산책로로, 할리우드 명예의 거리를 본떠 만들었습니다. 홍콩 영화계 스타들을 기립니다.",
      "Un paseo junto al puerto Victoria en Tsim Sha Tsui, inspirado en el Paseo de la Fama de Hollywood. Rinde homenaje a las estrellas del cine de Hong Kong."
    ),
    sources: [wikipedia("Avenue of Stars, Hong Kong", "Avenue_of_Stars,_Hong_Kong"), wikidata("Q782876")],
    visitMinutes: { min: 30, max: 60 },
    bestTime: "evening",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "museum-of-art",
    name: t("Hong Kong Museum of Art", "香港艺术馆", "홍콩 예술관", "Museo de Arte de Hong Kong"),
    localName: "香港藝術館",
    clusterId: "tsim-sha-tsui",
    coordinates: { lat: 22.293547, lng: 114.172025, precision: "site" },
    categories: ["culture"],
    summary: t(
      "Hong Kong's first and main art museum, on Salisbury Road in Tsim Sha Tsui. The public museum holds a collection of almost 20,000 items.",
      "香港第一座、也是最主要的艺术博物馆，位于尖沙咀梳士巴利道，是公营博物馆，藏品近两万件。",
      "홍콩 최초이자 대표 미술관으로 침사추이 솔즈베리 로드에 있습니다. 공립 박물관이며 소장품이 2만 점 가까이 됩니다.",
      "El primer y principal museo de arte de Hong Kong, en Salisbury Road, Tsim Sha Tsui. Es un museo público con una colección de casi 20.000 piezas."
    ),
    sources: [wikipedia("Hong Kong Museum of Art", "Hong_Kong_Museum_of_Art"), wikidata("Q908216")],
    visitMinutes: { min: 60, max: 120 },
    bestTime: "any",
    setting: "indoor",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "m-plus",
    name: t("M+", "M+ 博物馆", "M+ 미술관", "M+"),
    localName: "M+",
    clusterId: "tsim-sha-tsui",
    coordinates: { lat: 22.300958, lng: 114.159645, precision: "site" },
    categories: ["culture"],
    summary: t(
      "A museum of 20th- and 21st-century art, design and architecture, and moving image in the West Kowloon Cultural District. It opened on 12 November 2021.",
      "位于西九文化区的博物馆，展出二十和二十一世纪的艺术、设计与建筑以及流动影像，2021 年 11 月 12 日开幕。",
      "서구룡 문화지구에 있는 미술관으로 20~21세기 미술, 디자인·건축, 영상 작품을 전시합니다. 2021년 11월 12일 개관했습니다.",
      "Un museo de arte, diseño y arquitectura e imagen en movimiento de los siglos XX y XXI, en el Distrito Cultural de Kowloon Oeste. Abrió el 12 de noviembre de 2021."
    ),
    sources: [wikipedia("M+", "M%2B"), wikidata("Q10851500")],
    visitMinutes: { min: 90, max: 150 },
    bestTime: "any",
    setting: "indoor",
    weatherSensitive: false,
    walking: "easy",
  },

  // ── Jordan & Yau Ma Tei ──
  {
    id: "temple-street",
    name: t("Temple Street Night Market", "庙街夜市", "템플 스트리트 야시장", "Mercado nocturno de Temple Street"),
    localName: "廟街",
    clusterId: "jordan-yau-ma-tei",
    coordinates: { lat: 22.30767, lng: 114.17029, precision: "area" },
    categories: ["night", "food", "local"],
    summary: t(
      "A street in Jordan and Yau Ma Tei known for its night market, one of the busiest in Hong Kong, selling cheap goods and food. It is named after the nearby Tin Hau temple complex.",
      "位于佐敦和油麻地的街道，以夜市闻名，是香港最热闹的夜市之一，售卖廉价商品和小吃。街名来自附近的天后庙。",
      "조던과 야우마테이에 걸친 거리로, 홍콩에서 가장 붐비는 야시장 중 하나가 열리며 저렴한 물건과 먹거리를 팝니다. 이름은 근처 틴하우 사원 단지에서 왔습니다.",
      "Una calle entre Jordan y Yau Ma Tei conocida por su mercado nocturno, uno de los más concurridos de Hong Kong, con productos baratos y comida. Debe su nombre al cercano complejo del templo Tin Hau."
    ),
    sources: [
      wikipedia("Temple Street, Hong Kong", "Temple_Street,_Hong_Kong"),
      wikipedia("Tin Hau Temple Complex, Yau Ma Tei", "Tin_Hau_Temple_Complex,_Yau_Ma_Tei"),
      wikidata("Q7698673"),
    ],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "evening",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "tin-hau-temple-ymt",
    name: t("Yau Ma Tei Tin Hau Temple", "油麻地天后庙", "야우마테이 틴하우 사원", "Templo Tin Hau de Yau Ma Tei"),
    localName: "油麻地天后廟",
    clusterId: "jordan-yau-ma-tei",
    coordinates: { lat: 22.30983, lng: 114.17077, precision: "site" },
    categories: ["culture", "local"],
    summary: t(
      "A row of five adjacent buildings in Yau Ma Tei, including a Tin Hau Temple, a Shing Wong Temple and a Kwun Yum temple. Temple Street takes its name from it.",
      "位于油麻地的一排五座相连建筑，包括天后庙、城隍庙和观音庙等，庙街就是因它得名。",
      "야우마테이에 나란히 선 다섯 채의 건물로, 틴하우 사원·성황묘·관음묘 등이 있습니다. 템플 스트리트라는 이름이 여기서 나왔습니다.",
      "Una hilera de cinco edificios contiguos en Yau Ma Tei, entre ellos un templo de Tin Hau, uno de Shing Wong y uno de Kwun Yum. Temple Street toma su nombre de él."
    ),
    sources: [wikipedia("Tin Hau Temple Complex, Yau Ma Tei", "Tin_Hau_Temple_Complex,_Yau_Ma_Tei"), wikidata("Q7807758")],
    visitMinutes: { min: 20, max: 30 },
    bestTime: "any",
    setting: "indoor",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "fruit-market",
    name: t("Yau Ma Tei Fruit Market", "油麻地果栏", "야우마테이 과일 시장", "Mercado de frutas de Yau Ma Tei"),
    localName: "油麻地果欄",
    clusterId: "jordan-yau-ma-tei",
    coordinates: { lat: 22.3122, lng: 114.168, precision: "site" },
    categories: ["local", "photo"],
    summary: t(
      "Officially the Yau Ma Tei Wholesale Fruit Market, a working wholesale fruit market in Kowloon.",
      "正式名称为油麻地批发果栏，是九龙一个仍在运作的水果批发市场。",
      "정식 명칭은 야우마테이 도매 과일 시장으로, 지금도 운영 중인 구룡의 과일 도매 시장입니다.",
      "Oficialmente el Mercado Mayorista de Frutas de Yau Ma Tei, un mercado mayorista de fruta en funcionamiento en Kowloon."
    ),
    sources: [wikipedia("Yau Ma Tei Fruit Market", "Yau_Ma_Tei_Fruit_Market"), wikidata("Q8050312")],
    visitMinutes: { min: 15, max: 30 },
    bestTime: "any",
    setting: "outdoor",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "australia-dairy",
    name: t("Australia Dairy Company", "澳洲牛奶公司", "오스트레일리아 데어리 컴퍼니", "Australia Dairy Company"),
    localName: "澳洲牛奶公司",
    clusterId: "jordan-yau-ma-tei",
    coordinates: { lat: 22.304613, lng: 114.170594, precision: "site" },
    categories: ["food", "local"],
    summary: t(
      "A cha chaan teng in Jordan founded in 1970, known for steamed milk pudding, scrambled eggs and toast.",
      "位于佐敦的茶餐厅，1970 年创立，以炖奶、炒蛋和多士闻名。",
      "조던에 있는 차찬텡으로 1970년에 문을 열었고, 우유 푸딩, 스크램블드 에그, 토스트로 유명합니다.",
      "Un cha chaan teng en Jordan fundado en 1970, conocido por su pudin de leche al vapor, huevos revueltos y tostadas."
    ),
    sources: [wikipedia("Australia Dairy Company", "Australia_Dairy_Company"), wikidata("Q13359551")],
    visitMinutes: { min: 30, max: 45 },
    bestTime: "morning",
    setting: "indoor",
    weatherSensitive: false,
    walking: "easy",
  },

  // ── Mong Kok ──
  {
    id: "ladies-market",
    name: t("Ladies' Market (Tung Choi Street)", "女人街（通菜街）", "레이디스 마켓 (퉁초이 스트리트)", "Ladies' Market (Tung Choi Street)"),
    localName: "通菜街",
    clusterId: "mong-kok",
    coordinates: { lat: 22.32125, lng: 114.17016, precision: "area" },
    categories: ["local", "night"],
    summary: t(
      "Tung Choi Street in Mong Kok is one of Hong Kong's best-known street markets. Its southern section, the Ladies' Market, sells low-priced goods; its northern section is known as Goldfish Street.",
      "旺角通菜街是香港最有名的街市之一。南段俗称女人街，售卖各种价格低廉的商品；北段则被称为金鱼街。",
      "몽콕의 퉁초이 스트리트는 홍콩에서 가장 잘 알려진 거리 시장 중 하나입니다. 남쪽 구간인 레이디스 마켓에서는 저렴한 물건을 팔고, 북쪽 구간은 금붕어 거리로 불립니다.",
      "Tung Choi Street, en Mong Kok, es uno de los mercados callejeros más conocidos de Hong Kong. Su tramo sur, el Ladies' Market, vende productos baratos; el tramo norte se conoce como la calle de los peces de colores."
    ),
    sources: [wikipedia("Tung Choi Street", "Tung_Choi_Street"), wikidata("Q4115280")],
    visitMinutes: { min: 45, max: 75 },
    bestTime: "evening",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
]

// First-hand photos from the "My Hong Kong" Travel Story. They set the mood for a route;
// they do not claim to show any particular stop.
const storyCredit = {
  label: t("From the story “My Hong Kong”", "出自故事《我的香港》", "이야기 「나의 홍콩」에서", "De la historia «Mi Hong Kong»"),
  href: "/stories/hong-kong",
}

const storyPhoto = (episode: string, name: string, width: number, height: number, alt: CityText): CityPhoto => ({
  src: `/stories/hong-kong/${episode}/${name}`,
  width,
  height,
  alt,
  credit: storyCredit,
})

const photos = {
  promenade: storyPhoto(
    "01",
    "harbour-promenade-skyline",
    720,
    1280,
    t(
      "Waterfront promenade facing the Victoria Harbour skyline",
      "面向维多利亚港天际线的海滨长廊",
      "빅토리아 하버 스카이라인을 마주한 해안 산책로",
      "Paseo marítimo frente al perfil del puerto Victoria"
    )
  ),
  harbourNight: storyPhoto(
    "01",
    "harbour-night-reflection",
    720,
    1280,
    t(
      "Victoria Harbour night lights reflected on the water",
      "维多利亚港的夜灯倒映在水面上",
      "물 위에 비친 빅토리아 하버의 밤 불빛",
      "Luces nocturnas del puerto Victoria reflejadas en el agua"
    )
  ),
  mural: storyPhoto(
    "02",
    "bridge-pillar-mural",
    720,
    1280,
    t(
      "Painted bridge pillars along a single-lane road under an overpass",
      "天桥下单行道旁彩绘的桥墩",
      "고가도로 아래 1차선 도로를 따라 그림이 그려진 교각",
      "Pilares de un paso elevado pintados junto a una calle de un carril"
    )
  ),
  roastRice: storyPhoto(
    "02",
    "roast-meat-rice-eggs",
    880,
    1173,
    t(
      "Char siu and roast-duck rice with soft-yolk eggs",
      "叉烧烧鸭饭配溏心蛋",
      "반숙 달걀을 곁들인 차슈·오리구이 덮밥",
      "Arroz con char siu y pato asado con huevos de yema blanda"
    )
  ),
}

// Reference routes (ADR 0008 §3). Hand-authored, never generated. Times are estimates.
// Reasons are editorial; any fact inside them must already be in a place summary above.
const routes: TravelRoute[] = [
  {
    id: "essentials",
    theme: "essentials",
    photo: photos.harbourNight,
    name: t("Hong Kong Essentials", "香港经典一日", "홍콩 핵심 코스", "Lo esencial de Hong Kong"),
    description: t(
      "See the city from above, then cross the harbour and end the day looking back at the skyline.",
      "先从高处看清整座城市，再渡海，傍晚回望港岛天际线。",
      "높은 곳에서 도시를 먼저 보고, 항구를 건넌 뒤 해 질 녘 스카이라인을 바라보며 하루를 마칩니다.",
      "Ve la ciudad desde arriba, cruza el puerto y termina el día mirando el perfil de la isla."
    ),
    estimatedDurationMinutes: 310,
    stops: [
      {
        placeId: "the-peak",
        order: 1,
        estimatedVisitMinutes: 90,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Start high. Take the Peak Tram up from Garden Road and see how the island, the harbour and Kowloon fit together before you walk them.",
          "从高处开始。在花园道搭山顶缆车上山，先看清港岛、维港和九龙的位置关系，再下去走。",
          "높은 곳에서 시작합니다. 가든 로드에서 피크 트램을 타고 올라가, 걸어 다니기 전에 홍콩섬·항구·구룡의 위치를 한눈에 봅니다.",
          "Empieza desde arriba. Sube en el Peak Tram desde Garden Road y mira cómo encajan la isla, el puerto y Kowloon antes de recorrerlos."
        ),
      },
      {
        placeId: "central-harbourfront",
        order: 2,
        estimatedVisitMinutes: 30,
        estimatedTravelMinutesFromPrevious: 35,
        transportMode: "peak_tram",
        reason: t(
          "Come back down and walk to the water. The same harbour you saw from the top, now at eye level.",
          "下山后走到海边，刚才在山顶看到的维港，现在就在眼前。",
          "내려와서 물가까지 걸어갑니다. 정상에서 본 그 항구를 이제 눈높이에서 봅니다.",
          "Baja y camina hasta el agua. El mismo puerto que viste desde arriba, ahora a tu altura."
        ),
      },
      {
        placeId: "star-ferry",
        order: 3,
        estimatedVisitMinutes: 10,
        estimatedTravelMinutesFromPrevious: 5,
        transportMode: "walk",
        reason: t(
          "The pier is next to the waterfront. Crossing by ferry instead of the MTR is the point: you see both shores on the way.",
          "码头就在海滨旁边。选渡轮而不是地铁过海，是因为一路能看到两岸。",
          "부두는 하버프런트 바로 옆입니다. MTR 대신 페리로 건너는 이유는 가는 동안 양쪽 해안을 다 볼 수 있어서입니다.",
          "El muelle está junto al paseo. Cruzar en ferry y no en metro es la idea: ves las dos orillas por el camino."
        ),
      },
      {
        placeId: "clock-tower",
        order: 4,
        estimatedVisitMinutes: 15,
        estimatedTravelMinutesFromPrevious: 10,
        transportMode: "ferry",
        reason: t(
          "The first landmark you meet off the ferry in Tsim Sha Tsui, and all that is left of the old railway terminus.",
          "在尖沙咀下船后第一眼看到的地标，也是旧火车总站唯一留下的部分。",
          "침사추이에서 페리를 내리면 처음 만나는 랜드마크이자, 옛 기차 종착역에서 유일하게 남은 부분입니다.",
          "El primer hito al bajar del ferry en Tsim Sha Tsui, y lo único que queda de la antigua terminal de tren."
        ),
      },
      {
        placeId: "museum-of-art",
        order: 5,
        estimatedVisitMinutes: 60,
        estimatedTravelMinutesFromPrevious: 5,
        transportMode: "walk",
        reason: t(
          "An indoor stop right on the waterfront, useful for the hottest part of the afternoon or a shower.",
          "就在海旁的室内一站，适合避开下午最热的时候，或者躲一阵雨。",
          "해안 바로 앞의 실내 코스로, 오후 가장 더운 시간이나 소나기를 피하기 좋습니다.",
          "Una parada cubierta junto al agua, útil en la hora más calurosa de la tarde o si llueve."
        ),
      },
      {
        placeId: "avenue-of-stars",
        order: 6,
        estimatedVisitMinutes: 45,
        estimatedTravelMinutesFromPrevious: 5,
        transportMode: "walk",
        reason: t(
          "Finish on the Kowloon side at dusk, facing the island skyline you looked down on in the morning.",
          "傍晚在九龙这边收尾，对面就是早上从山顶俯瞰过的港岛天际线。",
          "해 질 녘 구룡 쪽에서 마무리합니다. 아침에 내려다본 홍콩섬 스카이라인이 맞은편에 있습니다.",
          "Termina en el lado de Kowloon al atardecer, frente al perfil de la isla que viste desde arriba por la mañana."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "It covers the two views that define Hong Kong: from the Peak and across the harbour.",
        "一天看全香港最具代表性的两种景观：山顶俯瞰和隔海相望。",
        "홍콩을 대표하는 두 풍경, 피크에서 내려다보는 모습과 항구 건너편 모습을 모두 봅니다.",
        "Cubre las dos vistas que definen Hong Kong: desde el Peak y de orilla a orilla."
      ),
      t(
        "It crosses the harbour once, in one direction, with no backtracking.",
        "只过一次海，一路向前，不走回头路。",
        "항구는 한 번만, 한 방향으로 건너며 되돌아가지 않습니다.",
        "Cruza el puerto una sola vez, en un sentido, sin volver atrás."
      ),
      t(
        "Two of the rides are sights in themselves: the Peak Tram and the Star Ferry, both running since the 1880s.",
        "山顶缆车和天星小轮本身就是景点，两者都始于 1880 年代。",
        "피크 트램과 스타페리는 그 자체로 볼거리이며, 둘 다 1880년대부터 운행해 왔습니다.",
        "Dos de los trayectos son atracciones en sí: el Peak Tram y el Star Ferry, ambos desde la década de 1880."
      ),
    ],
    goodFor: [
      t("A first visit with one day", "第一次来、只有一天", "첫 방문, 하루 일정", "Primera visita con un solo día"),
      t("Easy walking", "走路不多", "걷기 부담이 적음", "Caminar poco"),
      t("Getting your bearings before exploring on your own", "先认清方向，再自己探索", "혼자 다니기 전에 방향 감각 익히기", "Orientarte antes de explorar por tu cuenta"),
    ],
    tradeoffs: [
      t(
        "These are the city's best-known sights, so expect other visitors at every stop.",
        "这些都是香港最知名的景点，每一站都会有不少游客。",
        "모두 홍콩에서 가장 유명한 명소라 가는 곳마다 관광객이 많습니다.",
        "Son los lugares más conocidos de la ciudad, así que habrá visitantes en cada parada."
      ),
      t(
        "Four of six stops are outdoors. Rain or haze takes away most of what the Peak and the harbour are for.",
        "六站里有四站在户外。下雨或有雾霾时，山顶和海港的景色大打折扣。",
        "6곳 중 4곳이 야외입니다. 비나 스모그가 있으면 피크와 항구 풍경의 매력이 크게 줄어듭니다.",
        "Cuatro de las seis paradas son al aire libre. Con lluvia o bruma, el Peak y el puerto pierden casi todo su sentido."
      ),
      t(
        "Little street life or local food. Pair it with the Local route on another day.",
        "街头生活和本地美食不多，可以另找一天走在地路线。",
        "거리 풍경이나 현지 음식은 적습니다. 다른 날 로컬 코스와 함께 하세요.",
        "Poca vida de barrio y poca comida local. Combínala otro día con la ruta local."
      ),
    ],
  },
  {
    id: "photo",
    theme: "photo",
    photo: photos.mural,
    name: t("Photo Hong Kong", "拍照香港", "사진으로 보는 홍콩", "Hong Kong en fotos"),
    description: t(
      "Cross Hong Kong Island from east to west: dense housing, old tenements, heritage courtyards and a western sunset.",
      "从东到西横穿港岛：密集楼群、老唐楼、历史建筑，最后看西边的日落。",
      "홍콩섬을 동쪽에서 서쪽으로 가로지릅니다. 빽빽한 아파트, 옛 통라우, 역사 건축물을 지나 서쪽 노을로 끝납니다.",
      "Cruza la isla de Hong Kong de este a oeste: viviendas densas, edificios antiguos, patios históricos y la puesta de sol."
    ),
    estimatedDurationMinutes: 330,
    stops: [
      {
        placeId: "monster-building",
        order: 1,
        estimatedVisitMinutes: 25,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Start with five connected residential blocks, a well-known photography spot. People live here, so keep it quick and quiet.",
          "从五座相连的住宅楼开始，这里是有名的拍照地点。楼里有人居住，拍照要快、要安静。",
          "잘 알려진 사진 명소인, 서로 연결된 주거 건물 다섯 동에서 시작합니다. 실제로 사람이 사는 곳이니 조용히, 짧게 머무세요.",
          "Empieza con cinco bloques residenciales conectados, un conocido lugar para fotografiar. Aquí vive gente, así que hazlo rápido y en silencio."
        ),
      },
      {
        placeId: "blue-house",
        order: 2,
        estimatedVisitMinutes: 25,
        estimatedTravelMinutesFromPrevious: 25,
        transportMode: "mtr",
        reason: t(
          "A few MTR stops west: one of the last balcony-type tenements, and a strong contrast with the towers you just left.",
          "坐几站港铁向西，就到香港仅存的几座骑楼式唐楼之一，和刚才的高楼形成强烈对比。",
          "MTR로 몇 정거장 서쪽으로 가면 몇 남지 않은 발코니형 통라우가 나옵니다. 방금 본 고층 건물과 뚜렷하게 대비됩니다.",
          "Unas paradas de metro al oeste: uno de los últimos edificios de balcones, en fuerte contraste con las torres que acabas de dejar."
        ),
      },
      {
        placeId: "tai-kwun",
        order: 3,
        estimatedVisitMinutes: 60,
        estimatedTravelMinutesFromPrevious: 30,
        transportMode: "tram",
        reason: t(
          "Ride the tram west into Central, then walk up to Tai Kwun.",
          "坐电车往西进中环，再走上大馆。",
          "트램을 타고 서쪽 센트럴로 간 뒤 대관까지 걸어 올라갑니다.",
          "Toma el tranvía hacia el oeste hasta Central y sube a pie a Tai Kwun."
        ),
      },
      {
        placeId: "mid-levels-escalator",
        order: 4,
        estimatedVisitMinutes: 25,
        estimatedTravelMinutesFromPrevious: 5,
        transportMode: "walk",
        reason: t(
          "The escalator runs right past Tai Kwun. Ride a section for the stacked street views on both sides.",
          "扶梯就在大馆旁边。搭一段，拍两侧层层叠叠的街景。",
          "에스컬레이터가 대관 바로 옆을 지납니다. 한 구간을 타면서 양옆으로 층층이 쌓인 거리 풍경을 찍어 보세요.",
          "Las escaleras pasan junto a Tai Kwun. Sube un tramo para fotografiar las calles escalonadas a ambos lados."
        ),
      },
      {
        placeId: "pmq",
        order: 5,
        estimatedVisitMinutes: 45,
        estimatedTravelMinutesFromPrevious: 10,
        transportMode: "walk",
        reason: t(
          "A short walk uphill: former police quarters turned into studios, with courtyards and walkways to frame.",
          "往上走一小段就到：由警察宿舍改成的创意空间，庭院和走廊都很适合构图。",
          "오르막을 조금 걸으면 옛 경찰 숙소를 바꾼 스튜디오 공간이 나옵니다. 안뜰과 복도가 구도 잡기 좋습니다.",
          "Un corto paseo cuesta arriba: antiguas viviendas policiales convertidas en estudios, con patios y pasarelas para encuadrar."
        ),
      },
      {
        placeId: "kennedy-town",
        order: 6,
        estimatedVisitMinutes: 60,
        estimatedTravelMinutesFromPrevious: 20,
        transportMode: "mtr",
        reason: t(
          "End at the western end of the island, facing west for the sunset.",
          "在港岛最西端收尾，面向西边看日落。",
          "홍콩섬 서쪽 끝에서 서쪽을 바라보며 노을로 마무리합니다.",
          "Termina en el extremo oeste de la isla, mirando al oeste para la puesta de sol."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "One line across Hong Kong Island, east to west, following the MTR and tram. No backtracking.",
        "沿着港铁和电车，从东到西一条线横穿港岛，不走回头路。",
        "MTR과 트램을 따라 홍콩섬을 동쪽에서 서쪽으로 한 줄로 가로지르며, 되돌아가지 않습니다.",
        "Una sola línea por la isla de Hong Kong, de este a oeste, siguiendo el metro y el tranvía. Sin volver atrás."
      ),
      t(
        "It moves through very different buildings: a dense housing estate, a tenement, a heritage compound, converted police quarters.",
        "一路经过风格截然不同的建筑：密集住宅、唐楼、历史建筑群、改造后的警察宿舍。",
        "밀집 주거 단지, 통라우, 역사 건축군, 개조한 경찰 숙소 등 전혀 다른 건물들을 차례로 지납니다.",
        "Recorre edificios muy distintos: un conjunto de viviendas denso, un tong lau, un complejo histórico y antiguas viviendas policiales."
      ),
      t(
        "It ends where the island ends, at the right time of day to face west.",
        "终点就在港岛尽头，时间刚好适合面向西边。",
        "섬이 끝나는 곳에서, 서쪽을 바라보기 좋은 시간에 끝납니다.",
        "Termina donde termina la isla, a la hora justa para mirar al oeste."
      ),
    ],
    goodFor: [
      t("Travelling with a camera", "带相机出门", "카메라를 들고 다니는 여행", "Viajar con cámara"),
      t("Architecture and street scenes", "喜欢建筑和街景", "건축과 거리 풍경", "Arquitectura y escenas de calle"),
      t("A second day after the Essentials route", "走过经典路线之后的第二天", "핵심 코스 다음 날", "Un segundo día después de la ruta esencial"),
    ],
    tradeoffs: [
      t(
        "It skips Kowloon and the harbour crossing entirely.",
        "完全不去九龙，也不过海。",
        "구룡과 항구 횡단은 완전히 빠집니다.",
        "Deja fuera Kowloon y el cruce del puerto."
      ),
      t(
        "Most of it is outdoors, and the sunset needs a clear evening.",
        "大部分在户外，日落要看天晴。",
        "대부분 야외이고, 노을은 맑은 저녁이어야 볼 수 있습니다.",
        "Casi todo es al aire libre y la puesta de sol necesita una tarde despejada."
      ),
      t(
        "It ends at the far west of the island, a longer ride back if you stay in Kowloon.",
        "终点在港岛最西边，如果住在九龙，回程会比较远。",
        "섬 서쪽 끝에서 끝나므로, 구룡에 묵는다면 돌아가는 길이 깁니다.",
        "Termina en el extremo oeste de la isla: si te alojas en Kowloon, la vuelta es más larga."
      ),
    ],
  },
  {
    id: "local",
    theme: "local",
    photo: photos.roastRice,
    name: t("Local Hong Kong", "在地香港", "로컬 홍콩", "Hong Kong local"),
    description: t(
      "Follow an everyday rhythm: breakfast at a cha chaan teng, an old market, a temple, the ferry, and a night market.",
      "跟着本地人的日常节奏走：茶餐厅早餐、老街市、庙宇、渡轮，最后是夜市。",
      "현지인의 하루 리듬을 따라갑니다. 차찬텡 아침, 오래된 시장, 사원, 페리, 그리고 야시장.",
      "Sigue el ritmo cotidiano: desayuno en un cha chaan teng, un mercado antiguo, un templo, el ferry y un mercado nocturno."
    ),
    estimatedDurationMinutes: 295,
    stops: [
      {
        placeId: "lan-fong-yuen",
        order: 1,
        estimatedVisitMinutes: 40,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Start the way many people in Central do: a cha chaan teng breakfast with milk tea. There is often a queue.",
          "像很多中环人一样，用茶餐厅早餐和一杯奶茶开始一天。门外常有人排队。",
          "센트럴의 많은 사람처럼 차찬텡 아침과 밀크티로 하루를 시작합니다. 문 앞에 줄이 서 있는 경우가 많습니다.",
          "Empieza como mucha gente en Central: desayuno en un cha chaan teng con té con leche. Suele haber cola."
        ),
      },
      {
        placeId: "graham-street-market",
        order: 2,
        estimatedVisitMinutes: 25,
        estimatedTravelMinutesFromPrevious: 3,
        transportMode: "walk",
        reason: t(
          "Around the corner: one of the oldest street markets in the city. Go while it is still morning.",
          "拐个弯就到：香港历史最悠久的街市之一，趁早上去。",
          "모퉁이만 돌면 도시에서 가장 오래된 거리 시장 중 하나가 있습니다. 아침 시간에 들르세요.",
          "A la vuelta de la esquina: uno de los mercados callejeros más antiguos de la ciudad. Ve mientras aún es por la mañana."
        ),
      },
      {
        placeId: "man-mo-temple",
        order: 3,
        estimatedVisitMinutes: 30,
        estimatedTravelMinutesFromPrevious: 10,
        transportMode: "walk",
        reason: t(
          "Walk west into Sheung Wan for the city's best-known Man Mo temple.",
          "往西走进上环，去看香港最有名的文武庙。",
          "서쪽으로 걸어 성완에 들어가면 홍콩에서 가장 유명한 만모 사원이 있습니다.",
          "Camina al oeste hasta Sheung Wan para ver el templo Man Mo más conocido de la ciudad."
        ),
      },
      {
        placeId: "star-ferry",
        order: 4,
        estimatedVisitMinutes: 10,
        estimatedTravelMinutesFromPrevious: 25,
        transportMode: "walk",
        reason: t(
          "Walk down to the Central pier and cross the harbour the way people have since 1888.",
          "走到中环码头，用 1888 年以来人们一直在用的方式过海。",
          "센트럴 부두까지 걸어가 1888년부터 사람들이 해 온 방식대로 항구를 건넙니다.",
          "Baja a pie hasta el muelle de Central y cruza el puerto como se hace desde 1888."
        ),
      },
      {
        placeId: "fruit-market",
        order: 5,
        estimatedVisitMinutes: 20,
        estimatedTravelMinutesFromPrevious: 35,
        transportMode: "ferry",
        reason: t(
          "After the ferry, take the MTR north to Yau Ma Tei. The wholesale fruit market is still a working market, not a showpiece.",
          "下船后坐港铁往北到油麻地。这里的水果批发市场至今仍在营业，不是摆给游客看的。",
          "페리에서 내려 MTR로 북쪽 야우마테이까지 갑니다. 이 과일 도매 시장은 보여 주기용이 아니라 지금도 운영 중인 시장입니다.",
          "Tras el ferry, toma el metro al norte hasta Yau Ma Tei. El mercado mayorista de fruta sigue funcionando; no es un decorado."
        ),
      },
      {
        placeId: "tin-hau-temple-ymt",
        order: 6,
        estimatedVisitMinutes: 25,
        estimatedTravelMinutesFromPrevious: 7,
        transportMode: "walk",
        reason: t(
          "A short walk south to the temple complex that gave Temple Street its name.",
          "往南走一小段，就是庙街得名的那组庙宇。",
          "남쪽으로 조금 걸으면 템플 스트리트라는 이름을 준 사원 단지가 있습니다.",
          "Un corto paseo al sur hasta el conjunto de templos que da nombre a Temple Street."
        ),
      },
      {
        placeId: "temple-street",
        order: 7,
        estimatedVisitMinutes: 60,
        estimatedTravelMinutesFromPrevious: 5,
        transportMode: "walk",
        reason: t(
          "End at the night market right next door, once the stalls are up in the evening.",
          "最后到隔壁的夜市，傍晚摊档摆好后再来。",
          "저녁에 노점이 들어서면 바로 옆 야시장에서 마무리합니다.",
          "Termina en el mercado nocturno de al lado, cuando los puestos ya están montados por la tarde."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "It follows how the day actually runs here: breakfast, market, temple, ferry, night market.",
        "路线顺序就是本地人一天的节奏：早餐、街市、庙宇、渡轮、夜市。",
        "현지의 하루 흐름 그대로입니다. 아침, 시장, 사원, 페리, 야시장.",
        "Sigue cómo transcurre de verdad el día aquí: desayuno, mercado, templo, ferry, mercado nocturno."
      ),
      t(
        "Most stops have been part of daily life for decades, such as a breakfast place from 1952 and one of the oldest street markets.",
        "大部分地方已经是几十年的日常生活，比如 1952 年开业的茶餐厅和最老的街市之一。",
        "1952년에 문을 연 차찬텡이나 가장 오래된 거리 시장처럼, 대부분 수십 년째 일상의 일부인 곳입니다.",
        "Casi todas las paradas llevan décadas en la vida diaria, como un desayuno de 1952 y uno de los mercados más antiguos."
      ),
      t(
        "It crosses the harbour once, by ferry, and never goes back.",
        "只坐一次渡轮过海，不走回头路。",
        "페리로 한 번만 항구를 건너고, 되돌아가지 않습니다.",
        "Cruza el puerto una vez, en ferry, y no vuelve atrás."
      ),
    ],
    goodFor: [
      t("Food first", "以吃为主", "먹는 게 우선", "La comida primero"),
      t("Low cost", "花费不多", "적은 비용", "Bajo coste"),
      t("People who want everyday Hong Kong, not only landmarks", "想看日常香港，不只是地标", "명소보다 일상의 홍콩을 보고 싶은 사람", "Quien quiere ver el Hong Kong cotidiano, no solo monumentos"),
    ],
    tradeoffs: [
      t(
        "No Peak and no big skyline views.",
        "不上山顶，也没有大场面的天际线景观。",
        "피크도, 큰 스카이라인 풍경도 없습니다.",
        "Sin Peak ni grandes vistas del perfil urbano."
      ),
      t(
        "There is a gap in the day: the morning stops finish around midday, and Temple Street is at its best in the evening, when it is often crowded.",
        "中间有空档：上午的几站中午前后就走完了，庙街要到傍晚才最热闹，那时也常常很挤。",
        "중간에 빈 시간이 생깁니다. 오전 코스는 정오쯤 끝나고, 템플 스트리트는 저녁에 가장 활기차며 그때는 붐비는 경우가 많습니다.",
        "Hay un hueco en el día: las paradas de la mañana terminan hacia mediodía y Temple Street luce más por la tarde, cuando suele estar lleno."
      ),
      t(
        "The markets are outdoors; heavy rain makes them much less pleasant.",
        "街市都在户外，下大雨时体验会差很多。",
        "시장은 야외라 비가 많이 오면 훨씬 불편합니다.",
        "Los mercados son al aire libre; con lluvia fuerte son mucho menos agradables."
      ),
    ],
  },
]

export const hongKong: City = {
  slug: "hong-kong",
  name: t("Hong Kong", "香港", "홍콩", "Hong Kong"),
  localName: "香港",
  country: t("China", "中国", "중국", "China"),
  intro: t(
    "Hong Kong's city centre sits on two shores facing each other across Victoria Harbour: Hong Kong Island to the south, Kowloon to the north. A good first day comes down to which parts of each side you see, and crossing the harbour once.",
    "香港市中心分布在维多利亚港两岸：南边是港岛，北边是九龙。第一次来，关键是决定两边各看哪些地方，然后过一次海。",
    "홍콩 도심은 빅토리아 하버를 사이에 두고 마주 보는 두 해안에 있습니다. 남쪽이 홍콩섬, 북쪽이 구룡입니다. 첫날은 양쪽에서 어디를 볼지 정하고 항구를 한 번 건너는 것이 핵심입니다.",
    "El centro de Hong Kong ocupa dos orillas frente a frente en el puerto Victoria: la isla de Hong Kong al sur y Kowloon al norte. Un buen primer día se reduce a elegir qué ver en cada lado y cruzar el puerto una vez."
  ),
  // 2560×1440 site hero — sharper than story -1600 stills for the city page band.
  hero: {
    src: "/assets/home-hero-hong-kong.webp",
    width: 2560,
    height: 1440,
    alt: t(
      "A traveler looks across Victoria Harbour and the Hong Kong skyline at sunset",
      "一位旅行者望向黄昏中的维多利亚港和香港天际线",
      "여행자가 해 질 녘 빅토리아 하버와 홍콩 스카이라인을 바라본다",
      "Una viajera mira Victoria Harbour y el horizonte de Hong Kong al atardecer"
    ),
    credit: {
      label: t("XingAI Travel", "XingAI Travel", "XingAI Travel", "XingAI Travel"),
      href: "/",
    },
  },
  map: {
    // Rough outline of Victoria Harbour between Kennedy Town and Quarry Bay. Schematic only.
    water: [
      [114.119, 22.283],
      [114.1255, 22.2845],
      [114.14, 22.2885],
      [114.15, 22.2893],
      [114.16, 22.2878],
      [114.166, 22.2845],
      [114.1735, 22.2855],
      [114.185, 22.2855],
      [114.197, 22.293],
      [114.212, 22.2895],
      [114.218, 22.29],
      [114.218, 22.312],
      [114.205, 22.308],
      [114.19, 22.302],
      [114.18, 22.2948],
      [114.175, 22.2926],
      [114.172, 22.2928],
      [114.166, 22.2935],
      [114.162, 22.2965],
      [114.157, 22.299],
      [114.152, 22.304],
      [114.14, 22.31],
      [114.125, 22.318],
      [114.119, 22.322],
    ],
    waterLabel: t("Victoria Harbour", "维多利亚港", "빅토리아 하버", "Puerto Victoria"),
    waterLabelAt: [114.182, 22.2895],
  },
  clusters,
  places,
  routes,
}
