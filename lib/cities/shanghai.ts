import type { City, CityPhoto, CityText, Cluster, Place, Source, TravelRoute } from "./types"

// Shanghai city layer (ADR 0008).
// Facts come from the linked Wikipedia articles; coordinates come from the linked Wikidata items when available.
// Visit length, best time, setting and walking effort are editorial estimates, not sourced facts.
// "xing_pick" is left for the publisher to set. It is a first-hand label and must not be inferred.

const RETRIEVED = "2026-10-06"

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
  {
    id: "people-square",
    side: "island",
    neighbours: ["west-nanjing", "nanjing-bund", "old-city"],
    name: t("People's Square & Museums", "人民广场与博物馆", "인민광장·박물관", "People's Square y museos"),
  },
  {
    id: "nanjing-bund",
    side: "island",
    neighbours: ["people-square", "old-city", "north-bund", "lujiazui"],
    name: t("Nanjing Road & The Bund", "南京路与外滩", "난징루·와이탄", "Nanjing Road y el Bund"),
  },
  {
    id: "old-city",
    side: "island",
    neighbours: ["people-square", "nanjing-bund", "xintiandi-fuxing"],
    name: t("Old City & Yu Garden", "老城厢与豫园", "구시가지·예원", "Ciudad antigua y Jardín Yu"),
  },
  {
    id: "lujiazui",
    side: "kowloon",
    neighbours: ["nanjing-bund", "north-bund"],
    name: t("Lujiazui Skyline", "陆家嘴天际线", "루자쭈이 스카이라인", "Skyline de Lujiazui"),
  },
  {
    id: "north-bund",
    side: "island",
    neighbours: ["nanjing-bund", "lujiazui", "jade-buddha"],
    name: t("North Bund & Suzhou Creek", "北外滩与苏州河", "북와이탄·쑤저우허", "North Bund y arroyo Suzhou"),
  },
  {
    id: "xintiandi-fuxing",
    side: "island",
    neighbours: ["old-city", "ffc-tianzifang", "west-nanjing"],
    name: t("Xintiandi & Fuxing Park", "新天地与复兴公园", "신톈디·푸싱공원", "Xintiandi y Parque Fuxing"),
  },
  {
    id: "ffc-tianzifang",
    side: "island",
    neighbours: ["xintiandi-fuxing", "xuhui"],
    name: t("Former French Concession", "原法租界", "옛 프랑스 조계", "Antigua Concesión Francesa"),
  },
  {
    id: "west-nanjing",
    side: "island",
    neighbours: ["people-square", "xintiandi-fuxing", "jade-buddha"],
    name: t("Jing'an & West Nanjing", "静安与南京西路", "징안·난징시루", "Jing'an y West Nanjing"),
  },
  {
    id: "jade-buddha",
    side: "island",
    neighbours: ["west-nanjing", "north-bund"],
    name: t("Jade Buddha & M50", "玉佛寺与 M50", "위포사·M50", "Buda de Jade y M50"),
  },
  {
    id: "xuhui",
    side: "island",
    neighbours: ["ffc-tianzifang"],
    name: t("Xuhui & Longhua", "徐汇与龙华", "쉬후이·룽화", "Xuhui y Longhua"),
  },
]

const places: Place[] = [
  // ── People's Square & Museums ──
  {
    id: "peoples-square",
    name: t("People's Square", "人民广场", "인민광장", "People's Square"),
    localName: "人民广场",
    clusterId: "people-square",
    coordinates: { lat: 31.2304, lng: 121.4737, precision: "area" },
    categories: ["iconic", "local", "culture"],
    summary: t(
      "A large public square in central Shanghai on the former Shanghai Race Club site. It sits beside major civic buildings and is the easiest place to understand how the metro, museums and Nanjing Road meet.",
      "上海市中心的大型公共广场，位于原上海跑马厅旧址一带。周边聚集市政建筑，是理解地铁、博物馆与南京路如何相接的好起点。",
      "상하이 중심의 큰 공공 광장으로, 옛 상하이 경마장 터에 자리합니다. 주요 공공 건물 옆에 있어 지하철, 박물관, 난징루가 어떻게 만나는지 보기 쉽습니다.",
      "Una gran plaza pública en el centro de Shanghái, sobre el antiguo recinto del Shanghai Race Club. Junto a edificios cívicos importantes, ayuda a entender cómo se unen metro, museos y Nanjing Road."
    ),
    sources: [wikipedia("People's Square (Shanghai)", "People%27s_Square_(Shanghai)"), wikidata("Q716496")],
    visitMinutes: { min: 20, max: 40 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "shanghai-museum",
    name: t("Shanghai Museum", "上海博物馆", "상하이 박물관", "Museo de Shanghái"),
    localName: "上海博物馆",
    clusterId: "people-square",
    coordinates: { lat: 31.230278, lng: 121.470833, precision: "site" },
    categories: ["culture", "iconic"],
    summary: t(
      "A museum on People's Square with major collections of ancient Chinese bronzes, ceramics, painting and calligraphy. The current building opened in 1996 and is shaped with a round top over a square base.",
      "人民广场上的博物馆，收藏中国古代青铜器、陶瓷、书画等重要文物。现馆舍 1996 年开放，建筑以“天圆地方”的圆顶方基为特征。",
      "인민광장에 있는 박물관으로 중국 고대 청동기, 도자기, 회화와 서예 소장품이 중요합니다. 현재 건물은 1996년에 열렸고, 원형 상부와 사각 하부 형태입니다.",
      "Museo en People's Square con grandes colecciones de bronces, cerámica, pintura y caligrafía chinas antiguas. El edificio actual abrió en 1996, con parte superior redonda sobre base cuadrada."
    ),
    sources: [wikipedia("Shanghai Museum", "Shanghai_Museum"), wikidata("Q657415")],
    visitMinutes: { min: 75, max: 150 },
    bestTime: "any",
    setting: "indoor",
    weatherSensitive: false,
    walking: "easy",
  },

  // ── Nanjing Road & The Bund ──
  {
    id: "nanjing-road",
    name: t("Nanjing Road", "南京路", "난징루", "Nanjing Road"),
    localName: "南京路",
    clusterId: "nanjing-bund",
    coordinates: { lat: 31.2356, lng: 121.4742, precision: "area" },
    categories: ["iconic", "local", "night"],
    summary: t(
      "Shanghai's best-known shopping street, running east-west from the Bund through People's Square and toward Jing'an. East Nanjing Road is pedestrian-heavy and bright after dark.",
      "上海最知名的商业街，自外滩向西经过人民广场并延伸至静安方向。南京东路行人密集，入夜后灯光最有代表性。",
      "상하이에서 가장 잘 알려진 쇼핑 거리로, 와이탄에서 인민광장을 지나 징안 쪽으로 동서로 이어집니다. 난징동루는 보행자가 많고 밤 조명이 뚜렷합니다.",
      "La calle comercial más conocida de Shanghái, de este a oeste desde el Bund por People's Square hacia Jing'an. East Nanjing Road concentra peatones y luces al anochecer."
    ),
    sources: [wikipedia("Nanjing Road", "Nanjing_Road"), wikidata("Q696283")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "evening",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "the-bund",
    name: t("The Bund", "外滩", "와이탄", "El Bund"),
    localName: "外滩",
    clusterId: "nanjing-bund",
    coordinates: { lat: 31.2402, lng: 121.4903, precision: "area" },
    categories: ["iconic", "photo", "culture"],
    summary: t(
      "The historic waterfront along the west bank of the Huangpu River, lined with early twentieth-century bank and trading-house buildings. It faces the Lujiazui skyline across the river.",
      "黄浦江西岸的历史滨水带，沿线保留二十世纪初银行与洋行建筑。隔江正对陆家嘴天际线。",
      "황푸강 서쪽 강변의 역사 지구로, 20세기 초 은행과 상사 건물이 늘어서 있습니다. 강 건너 루자쭈이 스카이라인을 마주 봅니다.",
      "El frente histórico en la orilla oeste del río Huangpu, con edificios bancarios y comerciales de principios del siglo XX. Mira al skyline de Lujiazui al otro lado del río."
    ),
    sources: [wikipedia("The Bund", "The_Bund"), wikidata("Q109470")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "sunset",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "rockbund",
    name: t("Rockbund & Yuanmingyuan Road", "洛克·外滩源与圆明园路", "록번드·위안밍위안루", "Rockbund y Yuanmingyuan Road"),
    localName: "外滩源 / 圆明园路",
    clusterId: "nanjing-bund",
    coordinates: { lat: 31.2443, lng: 121.4891, precision: "area" },
    categories: ["culture", "photo", "local"],
    summary: t(
      "A restored historic block just north of the Bund, around Yuanmingyuan Road and the former British consulate area. It keeps the Bund's stone architecture but at a slower street scale.",
      "外滩北侧的历史街区，围绕圆明园路和原英国领事馆一带更新。它保留外滩的石材建筑气质，但街道尺度更慢。",
      "와이탄 북쪽, 위안밍위안루와 옛 영국 영사관 주변의 복원된 역사 블록입니다. 와이탄의 석조 건축 분위기를 유지하지만 거리 속도는 더 느립니다.",
      "Manzana histórica restaurada al norte del Bund, alrededor de Yuanmingyuan Road y la antigua zona consular británica. Mantiene la piedra del Bund con una escala de calle más tranquila."
    ),
    sources: [wikipedia("The Bund", "The_Bund"), wikidata("Q109470")],
    visitMinutes: { min: 25, max: 50 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },

  // ── Old City & Yu Garden ──
  {
    id: "yu-garden",
    name: t("Yu Garden", "豫园", "예원", "Jardín Yu"),
    localName: "豫园",
    clusterId: "old-city",
    coordinates: { lat: 31.2272, lng: 121.492, precision: "site" },
    categories: ["iconic", "culture", "photo"],
    summary: t(
      "A classical Chinese garden in the old city of Shanghai, first built in the Ming dynasty. Pavilions, rockeries, ponds and the surrounding bazaar make it the clearest old-city stop in the core.",
      "上海老城厢内的中国古典园林，始建于明代。亭台、假山、池水与周边商市一起，构成市中心最清晰的老城体验。",
      "상하이 구시가지의 중국 고전 정원으로 명대에 처음 조성되었습니다. 정자, 가산, 연못과 주변 시장이 중심부에서 가장 분명한 구시가지 경험을 만듭니다.",
      "Jardín chino clásico en la ciudad antigua de Shanghái, construido por primera vez en la dinastía Ming. Pabellones, rocas, estanques y el bazar cercano lo hacen el punto antiguo más claro del centro."
    ),
    sources: [wikipedia("Yu Garden", "Yu_Garden"), wikidata("Q703774")],
    visitMinutes: { min: 60, max: 120 },
    bestTime: "morning",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "chenghuangmiao",
    name: t("City God Temple of Shanghai", "上海城隍庙", "상하이 성황묘", "Templo del Dios de la Ciudad"),
    localName: "上海城隍庙",
    clusterId: "old-city",
    coordinates: { lat: 31.228, lng: 121.4929, precision: "site" },
    categories: ["culture", "local", "food"],
    summary: t(
      "A Taoist temple complex beside Yu Garden in Shanghai's old city. The surrounding market streets are often bundled with Yu Garden visits for snacks, souvenirs and dense old-city crowds.",
      "上海老城厢、豫园旁的道教庙宇群。周边商市常与豫园一起游览，适合小吃、纪念品和感受老城人流。",
      "상하이 구시가지 예원 옆의 도교 사원 단지입니다. 주변 시장 거리는 간식, 기념품, 촘촘한 구시가지 인파 때문에 예원과 함께 묶이는 경우가 많습니다.",
      "Complejo taoísta junto al Jardín Yu en la ciudad antigua. Las calles comerciales cercanas suelen visitarse con Yu Garden para comida, recuerdos y multitudes de casco antiguo."
    ),
    sources: [wikipedia("City God Temple of Shanghai", "City_God_Temple_of_Shanghai"), wikidata("Q2977379")],
    visitMinutes: { min: 30, max: 60 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "yunnan-south-road",
    name: t("Yunnan South Road Food Street", "云南南路美食街", "윈난난루 음식거리", "Calle gastronómica Yunnan South Road"),
    localName: "云南南路",
    clusterId: "old-city",
    coordinates: { lat: 31.2285, lng: 121.4812, precision: "area" },
    categories: ["food", "local", "night"],
    summary: t(
      "A central food street known for old Shanghai snack shops and small restaurants. It works as a low-friction food stop between People's Square, Yu Garden and the Bund.",
      "市中心的美食街，以老上海小吃店和小餐馆见长。它位于人民广场、豫园与外滩之间，适合作为不用绕路的吃饭点。",
      "상하이 중심의 음식 거리로, 오래된 상하이 간식집과 작은 식당으로 알려져 있습니다. 인민광장, 예원, 와이탄 사이에서 부담 없이 들르기 좋습니다.",
      "Calle gastronómica céntrica conocida por tiendas de bocados shanghaineses y restaurantes pequeños. Funciona bien entre People's Square, Yu Garden y el Bund sin desvío grande."
    ),
    sources: [wikipedia("Yunnan Road", "Yunnan_Road"), wikidata("Q8059389")],
    visitMinutes: { min: 35, max: 75 },
    bestTime: "evening",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },

  // ── Lujiazui Skyline ──
  {
    id: "oriental-pearl-tower",
    name: t("Oriental Pearl Tower", "东方明珠广播电视塔", "동방명주탑", "Torre Perla Oriental"),
    localName: "东方明珠",
    clusterId: "lujiazui",
    coordinates: { lat: 31.2397, lng: 121.4997, precision: "site" },
    categories: ["iconic", "photo"],
    summary: t(
      "A television tower in Lujiazui completed in the 1990s, known for its sphere-shaped observation decks. It is one of the easiest skyline landmarks to identify from the Bund.",
      "陆家嘴的电视塔，建成于 1990 年代，以球体观景层闻名。它是从外滩最容易辨认的天际线地标之一。",
      "1990년대에 완공된 루자쭈이의 방송탑으로, 구형 전망대로 알려져 있습니다. 와이탄에서 가장 쉽게 알아보는 스카이라인 표식 중 하나입니다.",
      "Torre de televisión en Lujiazui terminada en los años 90, conocida por sus miradores esféricos. Es uno de los hitos del skyline más fáciles de reconocer desde el Bund."
    ),
    sources: [wikipedia("Oriental Pearl Tower", "Oriental_Pearl_Tower"), wikidata("Q187539")],
    visitMinutes: { min: 60, max: 120 },
    bestTime: "sunset",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "shanghai-tower",
    name: t("Shanghai Tower Viewpoint", "上海中心大厦观景", "상하이 타워 전망대", "Mirador de Shanghai Tower"),
    localName: "上海中心大厦",
    clusterId: "lujiazui",
    coordinates: { lat: 31.2335, lng: 121.5055, precision: "site" },
    categories: ["iconic", "photo"],
    summary: t(
      "A 632 m skyscraper in Lujiazui and the tallest building in China. Its public observation level makes it the high-view counterpoint to seeing the skyline from the Bund.",
      "陆家嘴 632 米高的摩天楼，也是中国最高建筑。公共观景层让它成为从高处看城市的选择，与外滩隔江看天际线形成对照。",
      "루자쭈이에 있는 632m 마천루로 중국에서 가장 높은 건물입니다. 공개 전망층은 와이탄에서 스카이라인을 보는 것과 반대 방향의 높은 시점입니다.",
      "Rascacielos de 632 m en Lujiazui y el edificio más alto de China. Su mirador público ofrece la vista alta que contrasta con mirar el skyline desde el Bund."
    ),
    sources: [wikipedia("Shanghai Tower", "Shanghai_Tower"), wikidata("Q12512")],
    visitMinutes: { min: 75, max: 150 },
    bestTime: "sunset",
    setting: "indoor",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "lujiazui-riverside",
    name: t("Lujiazui Riverside Promenade", "陆家嘴滨江", "루자쭈이 강변 산책로", "Paseo fluvial de Lujiazui"),
    localName: "陆家嘴滨江",
    clusterId: "lujiazui",
    coordinates: { lat: 31.239, lng: 121.5035, precision: "area" },
    categories: ["photo", "local", "nature"],
    summary: t(
      "The Pudong riverfront below the Lujiazui towers, facing the Bund across the Huangpu. It is useful for reverse skyline photos: colonial riverfront west, glass towers behind you.",
      "陆家嘴高楼下方的浦东滨江，隔黄浦江望向外滩。这里适合拍反向天际线：西岸历史建筑在前，玻璃高楼在身后。",
      "루자쭈이 고층 아래의 푸둥 강변으로, 황푸강 건너 와이탄을 봅니다. 서쪽 역사 강변을 앞에 두고 뒤에는 유리 타워가 있는 반대 방향 사진에 좋습니다.",
      "Ribera de Pudong bajo las torres de Lujiazui, frente al Bund al otro lado del Huangpu. Sirve para fotos inversas: frente histórico al oeste, torres de vidrio detrás."
    ),
    sources: [wikipedia("Lujiazui", "Lujiazui"), wikidata("Q581424")],
    visitMinutes: { min: 30, max: 60 },
    bestTime: "sunset",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "dongchang-road-ferry",
    name: t("Dongchang Road Ferry", "东昌路轮渡", "둥창루 페리", "Ferry de Dongchang Road"),
    localName: "东昌路轮渡",
    clusterId: "lujiazui",
    coordinates: { lat: 31.2326, lng: 121.505, precision: "site" },
    categories: ["local", "photo"],
    summary: t(
      "A Huangpu River ferry landing near Lujiazui. Shanghai's ferry network is an everyday river crossing, and this stop is a practical way to treat the river as transport instead of only scenery.",
      "陆家嘴附近的黄浦江轮渡码头。上海轮渡是日常过江交通，这一站适合把黄浦江当成交通体验，而不只是风景。",
      "루자쭈이 근처의 황푸강 페리 선착장입니다. 상하이 페리는 일상적인 강 건너 교통이며, 이 정류장은 강을 풍경뿐 아니라 이동으로 느끼게 합니다.",
      "Embarcadero de ferry del Huangpu cerca de Lujiazui. La red de ferries de Shanghái cruza el río a diario, y esta parada permite usar el río como transporte, no solo como paisaje."
    ),
    sources: [wikipedia("Shanghai Ferry", "Shanghai_Ferry"), wikidata("Q7486878")],
    visitMinutes: { min: 15, max: 30 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
    transport: true,
  },

  // ── North Bund & Suzhou Creek ──
  {
    id: "north-bund-promenade",
    name: t("North Bund Promenade", "北外滩滨江", "북와이탄 산책로", "Paseo del North Bund"),
    localName: "北外滩",
    clusterId: "north-bund",
    coordinates: { lat: 31.2512, lng: 121.4895, precision: "area" },
    categories: ["photo", "local", "nature"],
    summary: t(
      "A riverfront area north of the historic Bund in Hongkou, looking back toward both the classic Bund and the Lujiazui towers. It is quieter than the central Bund promenade.",
      "虹口区、历史外滩以北的滨江区域，可回望经典外滩与陆家嘴高楼。相比外滩核心步道，这里更安静。",
      "홍커우의 역사적 와이탄 북쪽 강변으로, 고전적 와이탄과 루자쭈이 타워를 함께 돌아볼 수 있습니다. 중심 와이탄 산책로보다 한결 조용합니다.",
      "Zona fluvial en Hongkou al norte del Bund histórico, con vistas tanto al Bund clásico como a las torres de Lujiazui. Es más tranquila que el paseo central del Bund."
    ),
    sources: [wikipedia("Hongkou District", "Hongkou_District"), wikidata("Q7486878")],
    visitMinutes: { min: 30, max: 60 },
    bestTime: "sunset",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "jewish-refugees-museum",
    name: t("Shanghai Jewish Refugees Museum", "上海犹太难民纪念馆", "상하이 유대인 난민 기념관", "Museo de Refugiados Judíos de Shanghái"),
    localName: "上海犹太难民纪念馆",
    clusterId: "north-bund",
    coordinates: { lat: 31.2544, lng: 121.506, precision: "site" },
    categories: ["culture"],
    summary: t(
      "A museum in Hongkou based around the former Ohel Moshe Synagogue. It documents the Jewish refugees who found shelter in Shanghai during the Second World War.",
      "虹口区的纪念馆，以原摩西会堂为核心，记录二战期间在上海避难的犹太难民历史。",
      "홍커우에 있는 박물관으로 옛 오헬 모셰 회당을 중심으로 합니다. 제2차 세계대전 중 상하이에 피난했던 유대인 난민의 역사를 다룹니다.",
      "Museo en Hongkou en torno a la antigua sinagoga Ohel Moshe. Documenta a los refugiados judíos que encontraron refugio en Shanghái durante la Segunda Guerra Mundial."
    ),
    sources: [wikipedia("Shanghai Jewish Refugees Museum", "Shanghai_Jewish_Refugees_Museum"), wikidata("Q7489839")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "daytime",
    setting: "indoor",
    weatherSensitive: false,
    walking: "easy",
  },

  // ── Xintiandi & Fuxing Park ──
  {
    id: "xintiandi",
    name: t("Xintiandi", "新天地", "신톈디", "Xintiandi"),
    localName: "新天地",
    clusterId: "xintiandi-fuxing",
    coordinates: { lat: 31.2206, lng: 121.4754, precision: "area" },
    categories: ["culture", "local", "night"],
    summary: t(
      "A pedestrian dining and shopping district rebuilt from shikumen lane houses. It is polished and commercial, but it remains a useful stop for reading Shanghai's lane-house architecture.",
      "由石库门里弄建筑改造而成的步行餐饮与商业街区。它很商业化，但仍适合理解上海里弄住宅的建筑语言。",
      "스쿠먼 골목 주택을 재개발한 보행자 중심 식당·쇼핑 지구입니다. 세련되고 상업적이지만, 상하이 골목 주택 건축을 읽기 좋은 지점입니다.",
      "Distrito peatonal de restaurantes y tiendas reconstruido desde casas shikumen. Es pulido y comercial, pero ayuda a leer la arquitectura de callejones de Shanghái."
    ),
    sources: [wikipedia("Xintiandi", "Xintiandi"), wikidata("Q1393046")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "evening",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "fuxing-park",
    name: t("Fuxing Park", "复兴公园", "푸싱공원", "Parque Fuxing"),
    localName: "复兴公园",
    clusterId: "xintiandi-fuxing",
    coordinates: { lat: 31.2192, lng: 121.4681, precision: "area" },
    categories: ["local", "nature", "photo"],
    summary: t(
      "A French-style public park in the former French Concession area. Morning exercise, dancing and shaded paths make it a softer stop between Xintiandi and the lane-house streets.",
      "原法租界一带的法式公共公园。晨练、跳舞与林荫小路，让它成为新天地与里弄街区之间更柔和的一站。",
      "옛 프랑스 조계 지역의 프랑스식 공원입니다. 아침 운동, 춤, 그늘진 길 덕분에 신톈디와 골목 주택 거리 사이에서 부드러운 쉼표가 됩니다.",
      "Parque público de estilo francés en la antigua Concesión Francesa. Ejercicio matinal, baile y senderos sombreados lo hacen una pausa suave entre Xintiandi y las calles de casas."
    ),
    sources: [wikipedia("Fuxing Park", "Fuxing_Park"), wikidata("Q5508387")],
    visitMinutes: { min: 30, max: 60 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },

  // ── Former French Concession ──
  {
    id: "tianzifang",
    name: t("Tianzifang", "田子坊", "톈쯔팡", "Tianzifang"),
    localName: "田子坊",
    clusterId: "ffc-tianzifang",
    coordinates: { lat: 31.2103, lng: 121.469, precision: "area" },
    categories: ["local", "culture", "photo"],
    summary: t(
      "A maze of lane houses in the former French Concession turned into small shops, cafés and studios. It is tighter and messier than Xintiandi, which makes the street texture more visible.",
      "原法租界里的里弄街区，改造成小店、咖啡馆和工作室。相比新天地，它更窄也更杂，因此街道肌理更明显。",
      "옛 프랑스 조계의 골목 주택 구역으로, 작은 상점, 카페, 작업실로 바뀌었습니다. 신톈디보다 좁고 복잡해 거리 질감이 더 잘 보입니다.",
      "Laberinto de casas de callejón en la antigua Concesión Francesa, convertido en tiendas, cafés y estudios. Es más estrecho y desordenado que Xintiandi, por eso muestra mejor la textura de calle."
    ),
    sources: [wikipedia("Tianzifang", "Tianzifang"), wikidata("Q3520782")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "wukang-road",
    name: t("Wukang Road", "武康路", "우캉루", "Wukang Road"),
    localName: "武康路",
    clusterId: "ffc-tianzifang",
    coordinates: { lat: 31.2105, lng: 121.4463, precision: "area" },
    categories: ["photo", "culture", "local"],
    summary: t(
      "A tree-lined street in the former French Concession known for historic residences and apartment buildings. Wukang Mansion at the street's northern end is one of its most photographed corners.",
      "原法租界的林荫街道，以历史住宅和公寓建筑闻名。北端的武康大楼是最常被拍摄的街角之一。",
      "옛 프랑스 조계의 가로수 거리로, 역사 주택과 아파트 건물로 알려져 있습니다. 북쪽 끝의 우캉 맨션은 가장 많이 촬영되는 모퉁이 중 하나입니다.",
      "Calle arbolada de la antigua Concesión Francesa, conocida por residencias y edificios de apartamentos históricos. Wukang Mansion, en el extremo norte, es una de sus esquinas más fotografiadas."
    ),
    sources: [wikipedia("Wukang Road", "Wukang_Road"), wikidata("Q7999466")],
    visitMinutes: { min: 35, max: 70 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "former-french-concession-streets",
    name: t("Former French Concession Streets", "原法租界街道", "옛 프랑스 조계 거리", "Calles de la antigua Concesión Francesa"),
    localName: "衡山路 / 复兴西路一带",
    clusterId: "ffc-tianzifang",
    coordinates: { lat: 31.2066, lng: 121.4525, precision: "area" },
    categories: ["local", "photo", "culture"],
    summary: t(
      "Residential streets in the former French Concession, where plane trees, garden houses and lane compounds shape a quieter Shanghai. This is an area to walk slowly, not a single monument.",
      "原法租界的住宅街区，梧桐、花园洋房与里弄共同构成更安静的上海。这里适合慢走，不是单一纪念物。",
      "옛 프랑스 조계의 주거 거리로, 플라타너스, 정원 주택, 골목 단지가 더 조용한 상하이를 만듭니다. 하나의 기념물이 아니라 천천히 걷는 지역입니다.",
      "Calles residenciales de la antigua Concesión Francesa, donde plátanos, casas con jardín y lilong forman un Shanghái más quieto. Es una zona para caminar despacio, no un monumento único."
    ),
    sources: [wikipedia("Former French Concession, Shanghai", "Former_French_Concession,_Shanghai"), wikidata("Q657567")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },

  // ── Jing'an & West Nanjing ──
  {
    id: "jing-an-temple",
    name: t("Jing'an Temple", "静安寺", "징안사", "Templo Jing'an"),
    localName: "静安寺",
    clusterId: "west-nanjing",
    coordinates: { lat: 31.2237, lng: 121.4452, precision: "site" },
    categories: ["culture", "iconic", "photo"],
    summary: t(
      "A Buddhist temple in Jing'an District with a history traditionally traced back many centuries. Its current setting is striking because the temple sits directly amid malls, roads and office towers.",
      "静安区的佛教寺院，传统上可追溯至很久以前。它最突出的城市感在于寺院直接处在商场、道路和写字楼之间。",
      "징안구의 불교 사원으로, 전통적으로 오랜 역사까지 거슬러 올라갑니다. 사원이 쇼핑몰, 도로, 사무실 타워 한가운데 있다는 점이 인상적입니다.",
      "Templo budista en el distrito de Jing'an, con una historia tradicionalmente muy antigua. Su fuerza urbana está en quedar rodeado de centros comerciales, vías y torres de oficinas."
    ),
    sources: [wikipedia("Jing'an Temple", "Jing%27an_Temple"), wikidata("Q1380677")],
    visitMinutes: { min: 35, max: 70 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "west-nanjing-road",
    name: t("West Nanjing Road", "南京西路", "난징시루", "West Nanjing Road"),
    localName: "南京西路",
    clusterId: "west-nanjing",
    coordinates: { lat: 31.2295, lng: 121.4595, precision: "area" },
    categories: ["local", "food", "night"],
    summary: t(
      "The western, higher-end stretch of Nanjing Road through Jing'an and central Shanghai. It works for shopping, cafés and a calmer contrast to the bright pedestrian section of East Nanjing Road.",
      "南京路西段穿过静安与市中心，商业档次更高。这里适合购物、咖啡，也可作为南京东路步行街灯光之外更从容的对照。",
      "난징루의 서쪽 고급 상업 구간으로 징안과 도심을 지납니다. 쇼핑, 카페, 그리고 난징동루 보행가의 밝은 분위기와 다른 차분한 대비에 좋습니다.",
      "El tramo occidental y más refinado de Nanjing Road por Jing'an y el centro. Sirve para compras, cafés y un contraste más calmado con East Nanjing Road peatonal."
    ),
    sources: [wikipedia("Nanjing Road", "Nanjing_Road"), wikidata("Q696283")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },

  // ── Jade Buddha & M50 ──
  {
    id: "jade-buddha-temple",
    name: t("Jade Buddha Temple", "玉佛寺", "위포사", "Templo del Buda de Jade"),
    localName: "玉佛寺",
    clusterId: "jade-buddha",
    coordinates: { lat: 31.2433, lng: 121.4391, precision: "site" },
    categories: ["culture", "local"],
    summary: t(
      "A Buddhist temple in Putuo District named for jade Buddha statues brought from Burma. It is a quieter temple stop than Jing'an, with more separation from the main shopping streets.",
      "普陀区的佛教寺院，因来自缅甸的玉佛造像得名。相比静安寺，这里更安静，也更远离主商业街。",
      "푸퉈구의 불교 사원으로, 버마에서 온 옥불상 때문에 이름이 붙었습니다. 징안사보다 조용하고 주요 쇼핑 거리와 더 떨어져 있습니다.",
      "Templo budista en Putuo, llamado así por estatuas de Buda de jade traídas de Birmania. Es más tranquilo que Jing'an y queda más separado de las calles comerciales principales."
    ),
    sources: [wikipedia("Jade Buddha Temple", "Jade_Buddha_Temple"), wikidata("Q716467")],
    visitMinutes: { min: 40, max: 75 },
    bestTime: "morning",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "m50",
    name: t("M50 Creative Park", "M50 创意园", "M50 창의공원", "Parque Creativo M50"),
    localName: "M50",
    clusterId: "jade-buddha",
    coordinates: { lat: 31.2505, lng: 121.445, precision: "area" },
    categories: ["culture", "photo", "local"],
    summary: t(
      "A contemporary art district on Moganshan Road, converted from former industrial buildings along Suzhou Creek. It brings galleries and studios into a rougher warehouse setting.",
      "莫干山路上的当代艺术街区，由苏州河旁旧工业建筑改造而来。画廊与工作室被放进更粗粝的仓库环境里。",
      "쑤저우허 옆 옛 산업 건물을 바꾼 모간산루의 현대미술 지구입니다. 갤러리와 작업실이 거친 창고 환경 안에 들어와 있습니다.",
      "Distrito de arte contemporáneo en Moganshan Road, adaptado desde edificios industriales junto al arroyo Suzhou. Galerías y estudios ocupan un entorno de almacenes más áspero."
    ),
    sources: [wikipedia("M50 (Shanghai)", "M50_(Shanghai)"), wikidata("Q6710666")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },

  // ── Xuhui & Longhua ──
  {
    id: "xujiahui",
    name: t("Xujiahui", "徐家汇", "서자후이", "Xujiahui"),
    localName: "徐家汇",
    clusterId: "xuhui",
    coordinates: { lat: 31.1927, lng: 121.4368, precision: "area" },
    categories: ["local", "culture", "food"],
    summary: t(
      "A major commercial and transport area in Xuhui District, historically connected with Catholic institutions and modern education. Today it mixes shopping centers, offices and older religious landmarks.",
      "徐汇区的重要商业与交通片区，历史上与天主教机构和近代教育有关。今天这里混合购物中心、办公楼和较早的宗教地标。",
      "쉬후이구의 주요 상업·교통 지역으로, 역사적으로 가톨릭 기관과 근대 교육과 연결됩니다. 오늘날 쇼핑센터, 사무실, 오래된 종교 명소가 섞여 있습니다.",
      "Área comercial y de transporte importante en Xuhui, vinculada históricamente a instituciones católicas y educación moderna. Hoy mezcla centros comerciales, oficinas e hitos religiosos antiguos."
    ),
    sources: [wikipedia("Xujiahui", "Xujiahui"), wikidata("Q701866")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "longhua-temple",
    name: t("Longhua Temple", "龙华寺", "룽화사", "Templo Longhua"),
    localName: "龙华寺",
    clusterId: "xuhui",
    coordinates: { lat: 31.1743, lng: 121.4422, precision: "site" },
    categories: ["culture", "photo", "local"],
    summary: t(
      "A Buddhist temple complex in Xuhui District known for its pagoda and long religious history. It sits south of the main tourist core, so it feels different from Bund-and-Lujiazui Shanghai.",
      "徐汇区的佛教寺院群，以塔和悠久宗教历史闻名。它位于主要游客核心以南，体验上不同于外滩与陆家嘴的上海。",
      "쉬후이구의 불교 사원 단지로 탑과 긴 종교 역사로 알려져 있습니다. 주요 관광 중심부 남쪽에 있어 와이탄·루자쭈이의 상하이와 다른 느낌입니다.",
      "Complejo budista en Xuhui, conocido por su pagoda y larga historia religiosa. Está al sur del núcleo turístico principal, con una sensación distinta del Shanghái de Bund y Lujiazui."
    ),
    sources: [wikipedia("Longhua Temple", "Longhua_Temple"), wikidata("Q1868603")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "morning",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
]

const cardPhoto = (alt: CityText): CityPhoto => ({
  src: "/assets/destination-shanghai-card.webp",
  width: 1600,
  height: 1000,
  alt,
  credit: {
    label: t("XingAI Travel", "XingAI Travel", "XingAI Travel", "XingAI Travel"),
    href: "/",
  },
})

const photos = {
  essentials: cardPhoto(
    t(
      "Shanghai destination card view used for the essentials route",
      "上海目的地卡片景色，用于经典路线",
      "핵심 코스에 쓰는 상하이 목적지 카드 전경",
      "Vista de Shanghái para la ruta esencial"
    )
  ),
  photo: cardPhoto(
    t(
      "Shanghai destination card view used for the photo route",
      "上海目的地卡片景色，用于拍照路线",
      "사진 코스에 쓰는 상하이 목적지 카드 전경",
      "Vista de Shanghái para la ruta fotográfica"
    )
  ),
  local: cardPhoto(
    t(
      "Shanghai destination card view used for the local route",
      "上海目的地卡片景色，用于在地路线",
      "로컬 코스에 쓰는 상하이 목적지 카드 전경",
      "Vista de Shanghái para la ruta local"
    )
  ),
}

// Reference routes (ADR 0008 §3). Hand-authored, never generated. Times are estimates.
// Reasons are editorial; any fact inside them must already be in a place summary above.
// Walking between clusters only uses declared neighbours; river crossings use ferry / MTR / taxi.
const routes: TravelRoute[] = [
  {
    id: "essentials",
    theme: "essentials",
    photo: photos.essentials,
    name: t("Shanghai Essentials", "上海经典一日", "상하이 핵심 코스", "Lo esencial de Shanghái"),
    description: t(
      "Start with People's Square and the museum, walk Nanjing Road to the Bund, then fold through Yu Garden before crossing to Lujiazui for the high view.",
      "从人民广场和博物馆开始，沿南京路走到外滩，再转进豫园，最后过江到陆家嘴看高处视角。",
      "인민광장과 박물관에서 시작해 난징루를 따라 와이탄까지 걷고, 예원을 거친 뒤 강을 건너 루자쭈이의 높은 전망으로 마무리합니다.",
      "Empieza en People's Square y el museo, camina Nanjing Road hasta el Bund, pasa por Yu Garden y cruza a Lujiazui para la vista alta."
    ),
    estimatedDurationMinutes: 495,
    stops: [
      {
        placeId: "peoples-square",
        order: 1,
        estimatedVisitMinutes: 25,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Start in the civic middle of the city, where metro lines, museums and Nanjing Road meet.",
          "从城市公共中心开始，地铁、博物馆和南京路都在这里交会。",
          "지하철, 박물관, 난징루가 만나는 도시의 공공 중심에서 시작합니다.",
          "Empieza en el centro cívico, donde se cruzan metro, museos y Nanjing Road."
        ),
      },
      {
        placeId: "shanghai-museum",
        order: 2,
        estimatedVisitMinutes: 90,
        estimatedTravelMinutesFromPrevious: 5,
        transportMode: "walk",
        reason: t(
          "Step inside before the shopping streets. The museum gives the day some historical weight before the skyline takes over.",
          "先在进入商业街前进馆。博物馆给这一天一点历史重量，再去看天际线。",
          "쇼핑 거리로 가기 전에 안으로 들어갑니다. 스카이라인이 주도하기 전, 박물관이 하루에 역사적 무게를 줍니다.",
          "Entra antes de las calles comerciales. El museo da peso histórico al día antes de que mande el skyline."
        ),
      },
      {
        placeId: "nanjing-road",
        order: 3,
        estimatedVisitMinutes: 55,
        estimatedTravelMinutesFromPrevious: 10,
        transportMode: "walk",
        reason: t(
          "Walk east with the crowd instead of jumping underground. This is the city's bright commercial spine.",
          "跟着人流向东走，不急着钻地铁。这是上海明亮的商业主轴。",
          "지하철로 뛰어들지 말고 인파와 함께 동쪽으로 걷습니다. 이곳이 도시의 밝은 상업 축입니다.",
          "Camina al este con la gente en vez de bajar al metro. Es el eje comercial luminoso de la ciudad."
        ),
      },
      {
        placeId: "the-bund",
        order: 4,
        estimatedVisitMinutes: 60,
        estimatedTravelMinutesFromPrevious: 25,
        transportMode: "walk",
        reason: t(
          "Arrive at the west-bank waterfront for the classic Bund and Lujiazui face-off across the Huangpu.",
          "走到西岸滨江，看外滩与陆家嘴隔黄浦江对望的经典画面。",
          "서쪽 강변에 도착해 황푸강을 사이에 둔 와이탄과 루자쭈이의 대표 장면을 봅니다.",
          "Llega a la ribera oeste para el duelo clásico entre el Bund y Lujiazui sobre el Huangpu."
        ),
      },
      {
        placeId: "yu-garden",
        order: 5,
        estimatedVisitMinutes: 75,
        estimatedTravelMinutesFromPrevious: 20,
        transportMode: "walk",
        reason: t(
          "Turn south into the old city so the day is not only glass towers and riverfront stone.",
          "向南转进老城厢，让这一天不只是玻璃高楼和滨江石建筑。",
          "남쪽 구시가지로 돌아 들어가 하루가 유리 타워와 강변 석조 건물만으로 끝나지 않게 합니다.",
          "Gira al sur hacia la ciudad antigua para que el día no sea solo vidrio y piedra junto al río."
        ),
      },
      {
        placeId: "shanghai-tower",
        order: 6,
        estimatedVisitMinutes: 90,
        estimatedTravelMinutesFromPrevious: 40,
        transportMode: "mtr",
        reason: t(
          "Cross to Lujiazui for the high view. Ending above the river helps the earlier Bund walk snap into place.",
          "过江到陆家嘴看高处视角。最后从河对岸上方回看，前面的外滩步行会更清楚。",
          "강을 건너 루자쭈이의 높은 전망으로 갑니다. 마지막에 강 위에서 돌아보면 앞선 와이탄 산책이 정리됩니다.",
          "Cruza a Lujiazui para la vista alta. Terminar sobre el río ordena la caminata previa por el Bund."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "It follows Shanghai's clearest first-day line: civic centre → shopping street → Bund → old city → skyline.",
        "它按上海第一天最清楚的线走：市政中心 → 商业街 → 外滩 → 老城 → 天际线。",
        "상하이 첫날의 가장 선명한 선을 따릅니다. 공공 중심 → 쇼핑 거리 → 와이탄 → 구시가지 → 스카이라인.",
        "Sigue la línea más clara para un primer día: centro cívico → calle comercial → Bund → ciudad antigua → skyline."
      ),
      t(
        "Most movement is on foot until the river crossing, so the city scale becomes readable.",
        "过江前大多靠步行，城市尺度会自己变清楚。",
        "강을 건너기 전까지 대부분 걸어서 이동해 도시의 크기가 자연스럽게 읽힙니다.",
        "Casi todo va a pie hasta cruzar el río, así la escala de la ciudad se entiende."
      ),
      t(
        "It gives both skyline directions: from the Bund toward Pudong, then from Pudong back over the city.",
        "它给出两个天际线方向：先从外滩看浦东，再从浦东高处回看城市。",
        "두 방향의 스카이라인을 줍니다. 와이탄에서 푸둥을 보고, 푸둥 위에서 도시를 되돌아봅니다.",
        "Da las dos direcciones del skyline: del Bund hacia Pudong y luego desde Pudong sobre la ciudad."
      ),
    ],
    goodFor: [
      t("A first visit with one full day", "第一次来、有一整天", "첫 방문, 하루 종일", "Primera visita con un día completo"),
      t("Landmarks before neighbourhoods", "先看地标再看街区", "동네보다 명소를 먼저", "Hitos antes que barrios"),
      t("Travellers okay with one long walking day", "能接受一整天多走路的人", "많이 걷는 하루가 괜찮은 여행자", "Quien acepta un día largo a pie"),
    ],
    tradeoffs: [
      t(
        "The museum can eat time. If you go deep, cut Yu Garden short rather than rush the Bund.",
        "博物馆容易耗时。若看得细，就缩短豫园，不要赶外滩。",
        "박물관은 시간을 많이 씁니다. 깊게 보면 예원을 줄이고 와이탄을 서두르지 마세요.",
        "El museo puede comerse el tiempo. Si entras a fondo, recorta Yu Garden antes que correr por el Bund."
      ),
      t(
        "Nanjing Road and Yu Garden get crowded. Start early or accept slow walking.",
        "南京路和豫园会很挤。早点开始，或接受慢慢走。",
        "난징루와 예원은 붐빕니다. 일찍 시작하거나 느린 걸음을 받아들이세요.",
        "Nanjing Road y Yu Garden se llenan. Empieza temprano o acepta caminar lento."
      ),
      t(
        "Bad visibility weakens the Shanghai Tower stop; swap to Oriental Pearl or stay river-level if the sky is grey.",
        "能见度差会削弱上海中心观景。天灰时可换东方明珠，或留在江边。",
        "시야가 나쁘면 상하이 타워 전망이 약해집니다. 하늘이 회색이면 동방명주로 바꾸거나 강변에 머무세요.",
        "La mala visibilidad debilita Shanghai Tower; cambia a Oriental Pearl o quédate junto al río si el cielo está gris."
      ),
    ],
  },
  {
    id: "photo",
    theme: "photo",
    photo: photos.photo,
    name: t("Photo Shanghai", "拍照上海", "사진으로 보는 상하이", "Shanghái en fotos"),
    description: t(
      "Work the river: Bund stone, North Bund angles, a ferry crossing, then Lujiazui towers and the Pudong riverfront at dusk.",
      "围绕黄浦江拍：外滩石建筑、北外滩角度、轮渡过江，再到陆家嘴高楼和浦东滨江黄昏。",
      "강을 중심으로 찍습니다. 와이탄 석조 건물, 북와이탄 각도, 페리 횡단, 그리고 해질녘 루자쭈이 타워와 푸둥 강변.",
      "Trabaja el río: piedra del Bund, ángulos del North Bund, cruce en ferry, torres de Lujiazui y ribera de Pudong al atardecer."
    ),
    estimatedDurationMinutes: 335,
    stops: [
      {
        placeId: "rockbund",
        order: 1,
        estimatedVisitMinutes: 35,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Start with quieter stone facades north of the main Bund before the riverfront gets crowded.",
          "先在外滩核心以北拍更安静的石建筑立面，再去人更多的滨江。",
          "강변이 붐비기 전, 중심 와이탄 북쪽의 조용한 석조 파사드에서 시작합니다.",
          "Empieza con fachadas de piedra más tranquilas al norte del Bund antes de la ribera llena."
        ),
      },
      {
        placeId: "the-bund",
        order: 2,
        estimatedVisitMinutes: 55,
        estimatedTravelMinutesFromPrevious: 15,
        transportMode: "walk",
        reason: t(
          "Walk onto the main promenade for the straight-on Lujiazui skyline and historic riverfront frame.",
          "走到主步道，拍正面的陆家嘴天际线和外滩历史滨江构图。",
          "주 산책로로 걸어가 정면 루자쭈이 스카이라인과 역사 강변 구도를 잡습니다.",
          "Camina al paseo principal para el skyline frontal de Lujiazui y el marco histórico del río."
        ),
      },
      {
        placeId: "north-bund-promenade",
        order: 3,
        estimatedVisitMinutes: 40,
        estimatedTravelMinutesFromPrevious: 20,
        transportMode: "walk",
        reason: t(
          "Move north for a wider river angle and fewer shoulder-to-shoulder tripod spots.",
          "往北走，换更宽的江面角度，也避开最拥挤的机位。",
          "북쪽으로 이동해 더 넓은 강 각도와 덜 붐비는 촬영 지점을 잡습니다.",
          "Muévete al norte para un ángulo fluvial más amplio y menos trípodes pegados."
        ),
      },
      {
        placeId: "dongchang-road-ferry",
        order: 4,
        estimatedVisitMinutes: 25,
        estimatedTravelMinutesFromPrevious: 25,
        transportMode: "ferry",
        reason: t(
          "Use the ferry as the shot, not only transport. The river crossing gives a low moving view between both banks.",
          "把轮渡本身也当成照片，而不只是交通。过江时能看到两岸之间的低位移动视角。",
          "페리 자체도 사진으로 봅니다. 강을 건너며 양안 사이의 낮은 이동 시점을 얻습니다.",
          "Usa el ferry como foto, no solo transporte. El cruce da una vista baja y móvil entre ambas orillas."
        ),
      },
      {
        placeId: "oriental-pearl-tower",
        order: 5,
        estimatedVisitMinutes: 60,
        estimatedTravelMinutesFromPrevious: 15,
        transportMode: "walk",
        reason: t(
          "After landing in Pudong, shoot the sphere tower up close before the glass canyons take over.",
          "到浦东后先近距离拍球体电视塔，再进入更密的玻璃高楼。",
          "푸둥에 내린 뒤 유리 타워 숲으로 들어가기 전 구형 방송탑을 가까이서 찍습니다.",
          "Tras llegar a Pudong, fotografía de cerca la torre de esferas antes de los cañones de vidrio."
        ),
      },
      {
        placeId: "lujiazui-riverside",
        order: 6,
        estimatedVisitMinutes: 45,
        estimatedTravelMinutesFromPrevious: 15,
        transportMode: "walk",
        reason: t(
          "Finish on the Pudong riverfront for the reverse view back to the Bund as the lights come on.",
          "在浦东滨江收尾，等灯亮起时反向看回外滩。",
          "불이 켜질 때 푸둥 강변에서 와이탄을 되돌아보며 마무리합니다.",
          "Termina en la ribera de Pudong con la vista inversa hacia el Bund cuando se encienden las luces."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "It keeps the camera on one subject, the Huangpu, instead of scattering the day across temples and malls.",
        "它把镜头集中在一个主题：黄浦江，而不是把一天分散到寺庙和商场。",
        "사원과 쇼핑몰로 흩어지지 않고 카메라를 한 주제, 황푸강에 둡니다.",
        "Mantiene la cámara en un tema, el Huangpu, en vez de dispersar el día entre templos y centros comerciales."
      ),
      t(
        "The only river crossing is intentional and photogenic: ferry, then Pudong on foot.",
        "唯一一次过江是有意安排且适合拍照：轮渡，然后在浦东步行。",
        "유일한 강 건너기는 의도적이고 사진에 좋습니다. 페리, 그리고 푸둥 도보.",
        "El único cruce del río es intencional y fotogénico: ferry y luego Pudong a pie."
      ),
      t(
        "Cluster walking stays local: Bund to North Bund, then Lujiazui stops after the ferry.",
        "片区步行保持相邻：外滩到北外滩，轮渡后只走陆家嘴。",
        "클러스터 도보는 가까운 곳만 잇습니다. 와이탄에서 북와이탄, 페리 뒤에는 루자쭈이.",
        "La caminata entre zonas es cercana: Bund a North Bund, luego paradas de Lujiazui tras el ferry."
      ),
    ],
    goodFor: [
      t("Travelling with a camera", "带相机出门", "카메라를 들고 다니는 여행", "Viajar con cámara"),
      t("Skyline and river photos", "天际线与江景照片", "스카이라인과 강 사진", "Fotos de skyline y río"),
      t("A shorter second-day route", "第二天走短一点", "둘째 날 짧은 코스", "Una ruta más corta de segundo día"),
    ],
    tradeoffs: [
      t(
        "This route skips Yu Garden and the French Concession on purpose.",
        "这条路线有意不去豫园和原法租界。",
        "이 코스는 일부러 예원과 옛 프랑스 조계를 빼둡니다.",
        "Esta ruta omite a propósito Yu Garden y la antigua Concesión Francesa."
      ),
      t(
        "Ferry service and river weather matter. If the crossing is awkward, use metro and keep the same stop order.",
        "轮渡班次和江面天气会影响体验。若过江不顺，就改地铁，但保持同样顺序。",
        "페리 운행과 강 날씨가 중요합니다. 건너기가 애매하면 지하철로 바꾸고 순서는 유지하세요.",
        "El ferry y el clima del río importan. Si el cruce complica, usa metro y conserva el orden."
      ),
      t(
        "Night tripod crowds gather fast along the central Bund.",
        "外滩核心夜间机位很快会挤满人。",
        "중심 와이탄의 야경 촬영 자리는 금방 붐빕니다.",
        "Los puntos nocturnos del Bund central se llenan rápido."
      ),
    ],
  },
  {
    id: "local",
    theme: "local",
    photo: photos.local,
    name: t("Local Shanghai", "在地上海", "로컬 상하이", "Shanghái local"),
    description: t(
      "A slower west-side day: Jing'an Temple, West Nanjing cafés, Xintiandi's shikumen, Fuxing Park, Tianzifang and Yunnan South Road for snacks.",
      "更慢的浦西一天：静安寺、南京西路咖啡、新天地石库门、复兴公园、田子坊，最后到云南南路吃小吃。",
      "느린 푸시 하루입니다. 징안사, 난징시루 카페, 신톈디 스쿠먼, 푸싱공원, 톈쯔팡, 그리고 윈난난루 간식.",
      "Un día más lento en Puxi: Jing'an, cafés de West Nanjing, shikumen de Xintiandi, Parque Fuxing, Tianzifang y bocados en Yunnan South Road."
    ),
    estimatedDurationMinutes: 395,
    stops: [
      {
        placeId: "jing-an-temple",
        order: 1,
        estimatedVisitMinutes: 45,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Start where the temple sits inside the modern city instead of away from it.",
          "从寺院被现代城市包围的地方开始，而不是从远离城市的安静处开始。",
          "사원이 현대 도시 한가운데 놓인 곳에서 시작합니다. 도시에서 떨어진 조용한 곳이 아닙니다.",
          "Empieza donde el templo está dentro de la ciudad moderna, no apartado de ella."
        ),
      },
      {
        placeId: "west-nanjing-road",
        order: 2,
        estimatedVisitMinutes: 50,
        estimatedTravelMinutesFromPrevious: 22,
        transportMode: "walk",
        reason: t(
          "Walk east into the calmer, polished shopping stretch for coffee or lunch before the lane-house part of the day.",
          "向东走进更从容的高端商业段，先喝咖啡或吃午饭，再去看里弄街区。",
          "동쪽의 차분한 고급 쇼핑 구간으로 걸어가 커피나 점심을 먹고, 골목 주택 시간으로 넘어갑니다.",
          "Camina al este por el tramo comercial más calmado para café o comida antes de las casas de callejón."
        ),
      },
      {
        placeId: "xintiandi",
        order: 3,
        estimatedVisitMinutes: 55,
        estimatedTravelMinutesFromPrevious: 20,
        transportMode: "mtr",
        reason: t(
          "Use the metro to reach shikumen blocks without forcing a long road walk through traffic.",
          "坐地铁到石库门街区，避免在车流里硬走一大段。",
          "교통 속 긴 도보를 억지로 넣지 말고 지하철로 스쿠먼 블록까지 갑니다.",
          "Usa metro para llegar a los shikumen sin forzar una caminata larga entre tráfico."
        ),
      },
      {
        placeId: "fuxing-park",
        order: 4,
        estimatedVisitMinutes: 35,
        estimatedTravelMinutesFromPrevious: 12,
        transportMode: "walk",
        reason: t(
          "Cut through the park for shade and everyday city life between the polished and the messy parts.",
          "穿过公园找阴凉和日常城市生活，连接更精致的新天地与更杂的街区。",
          "공원을 지나 그늘과 일상 도시 생활을 봅니다. 세련된 곳과 복잡한 곳 사이의 연결입니다.",
          "Cruza el parque por sombra y vida cotidiana entre la parte pulida y la más desordenada."
        ),
      },
      {
        placeId: "tianzifang",
        order: 5,
        estimatedVisitMinutes: 60,
        estimatedTravelMinutesFromPrevious: 25,
        transportMode: "walk",
        reason: t(
          "Continue into tighter lanes where the street texture is more visible than in Xintiandi.",
          "继续走进更窄的里弄，这里的街道肌理比新天地更明显。",
          "신톈디보다 거리 질감이 더 잘 보이는 좁은 골목으로 이어갑니다.",
          "Sigue hacia callejones más estrechos, donde la textura se ve más que en Xintiandi."
        ),
      },
      {
        placeId: "yunnan-south-road",
        order: 6,
        estimatedVisitMinutes: 55,
        estimatedTravelMinutesFromPrevious: 20,
        transportMode: "mtr",
        reason: t(
          "End with old-school snacks near the centre instead of another mall dinner.",
          "最后回到市中心附近吃老派小吃，而不是再进一个商场吃饭。",
          "또 다른 쇼핑몰 저녁 대신 중심 근처의 오래된 간식 거리에서 마무리합니다.",
          "Termina con bocados de vieja escuela cerca del centro, no con otra cena de centro comercial."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "It trades the skyline checklist for street scale: temple, café street, lane houses, park and food.",
        "它用街道尺度替代天际线清单：寺院、咖啡商业街、里弄、公园和小吃。",
        "스카이라인 체크리스트 대신 거리 크기를 봅니다. 사원, 카페 거리, 골목 주택, 공원, 음식.",
        "Cambia la lista de skyline por escala de calle: templo, cafés, casas de callejón, parque y comida."
      ),
      t(
        "Long jumps use metro, while walking stays inside neighbouring west-side clusters.",
        "长距离用地铁，步行只放在相邻的浦西片区里。",
        "긴 이동은 지하철을 쓰고, 걷기는 이웃한 푸시 클러스터 안에 둡니다.",
        "Los saltos largos usan metro; caminar queda dentro de zonas vecinas de Puxi."
      ),
      t(
        "Food comes at the end when Yunnan South Road makes sense, not as a forced lunch detour.",
        "云南南路放在收尾时更合理，不硬塞成午餐绕路。",
        "윈난난루는 억지 점심 우회가 아니라 마지막 음식 stop으로 더 자연스럽습니다.",
        "La comida llega al final, cuando Yunnan South Road encaja, no como desvío forzado de almuerzo."
      ),
    ],
    goodFor: [
      t("A slower day after the Bund", "外滩之后想慢一点", "와이탄 다음 날 느리게", "Un día lento tras el Bund"),
      t("Street texture and cafés", "街道质感与咖啡", "거리 질감과 카페", "Textura de calle y cafés"),
      t("Travellers who do not need another viewpoint", "不想再上观景台的人", "전망대가 더 필요 없는 여행자", "Quien no necesita otro mirador"),
    ],
    tradeoffs: [
      t(
        "No Lujiazui towers, no Bund sunset. This is a neighbourhood day.",
        "没有陆家嘴高楼，也没有外滩日落。这是街区日。",
        "루자쭈이 타워도, 와이탄 일몰도 없습니다. 동네를 보는 날입니다.",
        "Sin torres de Lujiazui ni atardecer del Bund. Es un día de barrios."
      ),
      t(
        "Tianzifang can feel touristy at peak hours; go earlier if you want the lanes without the crush.",
        "田子坊高峰时会很游客化；想安静看里弄就早点去。",
        "톈쯔팡은 피크 시간에 관광지 느낌이 강합니다. 골목을 덜 붐비게 보고 싶으면 일찍 가세요.",
        "Tianzifang puede sentirse turística en horas punta; ve antes si quieres los callejones sin apretón."
      ),
      t(
        "West-side streets are pleasant but still busy; this is not a quiet village walk.",
        "浦西街道好走，但仍然忙碌；这不是安静小镇散步。",
        "푸시 거리는 걷기 좋지만 여전히 바쁩니다. 조용한 마을 산책은 아닙니다.",
        "Las calles de Puxi son agradables pero ocupadas; no es un paseo de pueblo tranquilo."
      ),
    ],
  },
]

export const shanghai: City = {
  slug: "shanghai",
  name: t("Shanghai", "上海", "상하이", "Shanghái"),
  localName: "上海",
  country: t("China", "中国", "중국", "China"),
  intro: t(
    "Shanghai is easiest to read as a river city: old trading-house facades on the Bund, the Lujiazui skyline across the Huangpu, and west-side neighbourhoods where temples, lane houses and cafés sit inside the modern city. A strong first visit keeps the river simple, then saves the French Concession and Jing'an for a slower day.",
    "上海最好按一座江城来理解：外滩的旧银行与洋行立面、黄浦江对岸的陆家嘴天际线，以及浦西街区里与现代城市并置的寺院、里弄和咖啡馆。第一次来，先把黄浦江这条线走清楚，再把原法租界和静安留给更慢的一天。",
    "상하이는 강의 도시로 보면 가장 읽기 쉽습니다. 와이탄의 옛 은행과 상사 파사드, 황푸강 건너 루자쭈이 스카이라인, 그리고 현대 도시 안에 사원, 골목 주택, 카페가 놓인 푸시 동네들. 첫 방문은 강의 선을 단순하게 잡고, 옛 프랑스 조계와 징안은 느린 하루로 남기는 것이 좋습니다.",
    "Shanghái se entiende mejor como ciudad de río: fachadas de bancos y casas comerciales en el Bund, skyline de Lujiazui al otro lado del Huangpu y barrios de Puxi donde templos, lilong y cafés viven dentro de la ciudad moderna. Una buena primera visita simplifica el río y deja la Concesión Francesa y Jing'an para un día más lento."
  ),
  hero: {
    src: "/assets/destination-shanghai-card.webp",
    width: 1600,
    height: 1000,
    alt: t(
      "Shanghai destination card view of the Huangpu skyline",
      "上海目的地卡片上的黄浦江天际线",
      "상하이 목적지 카드의 황푸강 스카이라인",
      "Vista del skyline del Huangpu en la tarjeta de Shanghái"
    ),
    credit: {
      label: t("XingAI Travel", "XingAI Travel", "XingAI Travel", "XingAI Travel"),
      href: "/",
    },
  },
  map: {
    // Schematic Huangpu River ribbon between the Bund and Lujiazui. Not for navigation.
    // Kept between the west-bank Bund points (lng ≤ 121.4903) and Pudong points (lng ≥ 121.4997)
    // so no place marker sits inside the polygon.
    water: [
      [121.4938, 31.185],
      [121.4942, 31.205],
      [121.4945, 31.225],
      [121.4947, 31.245],
      [121.497, 31.265],
      [121.501, 31.285],
      [121.505, 31.3],
      [121.5105, 31.299],
      [121.5065, 31.282],
      [121.502, 31.262],
      [121.499, 31.242],
      [121.498, 31.222],
      [121.4972, 31.202],
      [121.496, 31.184],
    ],
    waterLabel: t("Huangpu River", "黄浦江", "황푸강", "Río Huangpu"),
    waterLabelAt: [121.501, 31.246],
  },
  clusters,
  places,
  routes,
}
