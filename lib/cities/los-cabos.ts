import type { City, CityPhoto, CityText, Cluster, Place, Source, TravelRoute } from "./types"

// Los Cabos city layer (ADR 0008).
// Facts come from the linked Wikipedia articles; coordinates come from the linked Wikidata items when available.
// Visit length, best time, setting and walking effort are editorial estimates, not sourced facts.
// "xing_pick" is left for the publisher to set. It is a first-hand label and must not be inferred.

const RETRIEVED = "2026-10-05"

const t = (en: string, zh: string, ko: string, es: string): CityText => ({ en, zh, ko, es })

const wikipedia = (title: string, path: string): Source => ({
  name: `Wikipedia: ${title}`,
  url: `https://en.wikipedia.org/wiki/${path}`,
  retrievedAt: RETRIEVED,
})

const wikipediaEs = (title: string, path: string): Source => ({
  name: `Wikipedia (español): ${title}`,
  url: `https://es.wikipedia.org/wiki/${path}`,
  retrievedAt: RETRIEVED,
})

const wikidata = (qid: string): Source => ({
  name: `Wikidata ${qid} (coordinates)`,
  url: `https://www.wikidata.org/wiki/${qid}`,
  retrievedAt: RETRIEVED,
})

const clusters: Cluster[] = [
  {
    id: "lands-end",
    side: "island",
    neighbours: ["cabo-marina"],
    name: t("Land's End & El Arco", "陆地尽头与石拱", "랜즈 엔드·엘 아르코", "Fin de la Tierra y El Arco"),
  },
  {
    id: "cabo-marina",
    side: "island",
    neighbours: ["lands-end", "medano-beach"],
    name: t("Cabo San Lucas Marina", "圣卢卡斯海角码头", "카보산루카스 마리나", "Marina de Cabo San Lucas"),
  },
  {
    id: "medano-beach",
    side: "island",
    neighbours: ["cabo-marina", "the-corridor"],
    name: t("Médano Beach", "梅达诺海滩", "메다노 비치", "Playa El Médano"),
  },
  {
    id: "the-corridor",
    side: "island",
    neighbours: ["medano-beach", "san-jose-centro"],
    name: t("The Corridor", "旅游走廊", "코리도르", "El Corredor"),
  },
  {
    id: "san-jose-centro",
    side: "island",
    neighbours: ["the-corridor", "san-jose-estuary"],
    name: t("San José del Cabo Centro", "圣何塞德尔卡沃老城", "산호세델카보 시내", "Centro de San José del Cabo"),
  },
  {
    id: "san-jose-estuary",
    side: "island",
    neighbours: ["san-jose-centro"],
    name: t("San José Estuary & Galleries", "圣何塞河口与画廊区", "산호세 하구·갤러리", "Estero y galerías de San José"),
  },
]

const places: Place[] = [
  // ── Land's End & El Arco ──
  {
    id: "el-arco",
    name: t("El Arco", "埃尔阿科石拱", "엘 아르코", "El Arco"),
    localName: "El Arco de Cabo San Lucas",
    clusterId: "lands-end",
    coordinates: { lat: 22.876, lng: -109.89453, precision: "site" },
    categories: ["iconic", "photo", "nature"],
    summary: t(
      "A granite natural arch at the southern tip of Cabo San Lucas, where the Pacific Ocean and the Gulf of California meet. It is locally called El Arco and is the municipality's best-known landmark; the clearest views are usually from the water.",
      "圣卢卡斯海角南端的花岗岩天然拱门，太平洋与加利福尼亚湾在此交汇。当地称 El Arco，是洛斯卡沃斯最具辨识度的地标；最清楚的视角通常要从海上看。",
      "카보산루카스 남단의 화강암 천연 아치로, 태평양과 캘리포니아 만이 만나는 지점입니다. 현지에서는 엘 아르코라 부르며 시에서 가장 유명한 랜드마크입니다. 가장 선명한 모습은 대개 배 위에서 보입니다.",
      "Arco natural de granito en la punta sur de Cabo San Lucas, donde se encuentran el Pacífico y el Golfo de California. Se llama El Arco y es el hito más conocido del municipio; las vistas más claras suelen ser desde el agua."
    ),
    sources: [wikipedia("Arch of Cabo San Lucas", "Arch_of_Cabo_San_Lucas"), wikidata("Q2997060")],
    visitMinutes: { min: 30, max: 60 },
    bestTime: "sunset",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "moderate",
  },
  {
    id: "lands-end",
    name: t("Land's End", "陆地尽头", "랜즈 엔드", "Fin de la Tierra"),
    localName: "Fin de la Tierra",
    clusterId: "lands-end",
    coordinates: { lat: 22.87625, lng: -109.89552, precision: "area" },
    categories: ["iconic", "photo", "nature"],
    summary: t(
      "The rocky tip of the Baja California Peninsula at Cabo San Lucas, often called Land's End. The Arch sits here among granite stacks; boat tours and shoreline viewpoints are how most visitors approach it.",
      "下加利福尼亚半岛在圣卢卡斯海角的岩石尽头，常称 Land's End。石拱与花岗岩礁石在此集中；多数访客靠游船或岸边观景点接近。",
      "바하칼리포르니아 반도가 카보산루카스에서 끝나는 바위 끝자락으로, 흔히 랜즈 엔드라 부릅니다. 아치와 화강암 바위가 모여 있으며, 대부분 유람선이나 해안 전망 지점으로 접근합니다.",
      "La punta rocosa de la península de Baja California en Cabo San Lucas, conocida como Fin de la Tierra. El Arco está entre farallones de granito; la mayoría llega en lancha o desde miradores costeros."
    ),
    sources: [wikipedia("Arch of Cabo San Lucas", "Arch_of_Cabo_San_Lucas"), wikidata("Q2997060")],
    visitMinutes: { min: 25, max: 50 },
    bestTime: "sunset",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "moderate",
  },
  {
    id: "lovers-beach",
    name: t("Lover's Beach", "情人海滩", "러버스 비치", "Playa del Amor"),
    localName: "Playa del Amor",
    clusterId: "lands-end",
    coordinates: { lat: 22.877, lng: -109.896, precision: "site" },
    categories: ["photo", "nature", "iconic"],
    summary: t(
      "A small beach at Land's End surrounded by dramatic rock shapes. Los Cabos guides list it among Cabo San Lucas's most popular beaches; reaching the sand usually means a short boat ride rather than a simple shore walk.",
      "陆地尽头一处被陡峭岩形环绕的小海滩。洛斯卡沃斯介绍里常把它列为圣卢卡斯最受欢迎的海滩之一；到沙滩通常要坐一小段船，而不是简单沿岸步行。",
      "랜즈 엔드의 작은 해변으로 극적인 바위 지형에 둘러싸여 있습니다. 로스카보스 안내에서는 카보산루카스에서 가장 인기 있는 해변 중 하나로 꼽히며, 모래사장까지는 대개 짧은 보트가 필요하고 해안 도보만으로는 어렵습니다.",
      "Pequeña playa en Fin de la Tierra rodeada de rocas espectaculares. Las guías de Los Cabos la citan entre las más populares de Cabo San Lucas; llegar a la arena suele exigir un corto trayecto en lancha, no un paseo fácil por la orilla."
    ),
    sources: [wikipedia("Los Cabos", "Los_Cabos"), wikidata("Q2997060")],
    visitMinutes: { min: 40, max: 75 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "moderate",
  },
  {
    id: "faro-cabo-falso",
    name: t("Faro Cabo Falso", "假角旧灯塔", "카보 팔소 등대", "Faro Cabo Falso"),
    localName: "Faro Viejo",
    clusterId: "lands-end",
    coordinates: { lat: 22.873777, lng: -109.964041, precision: "site" },
    categories: ["photo", "culture", "nature"],
    summary: t(
      "A former lighthouse southwest of Cabo San Lucas at Cabo Falso, built in the early twentieth century. Local histories note it as a historic monument known as the Faro Viejo, set above the Pacific rather than the marina.",
      "圣卢卡斯海角西南、假角（Cabo Falso）上的旧灯塔，建于二十世纪初。地方史称其为历史纪念物 Faro Viejo，面向太平洋而非码头一侧。",
      "카보산루카스 남서쪽 카보 팔소에 있는 옛 등대로, 20세기 초에 세워졌습니다. 현지에서는 파로 비에호라는 역사 기념물로 불리며, 마리나보다 태평양 쪽 절벽에 있습니다.",
      "Antiguo faro al suroeste de Cabo San Lucas en Cabo Falso, de principios del siglo XX. La historia local lo registra como monumento histórico (Faro Viejo), sobre el Pacífico y no junto a la marina."
    ),
    sources: [wikipedia("Los Cabos", "Los_Cabos"), wikidata("Q28375141")],
    visitMinutes: { min: 30, max: 60 },
    bestTime: "sunset",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "steep",
  },

  // ── Cabo San Lucas Marina ──
  {
    id: "marina-cabo-san-lucas",
    name: t("Cabo San Lucas Marina", "圣卢卡斯海角码头", "카보산루카스 마리나", "Marina de Cabo San Lucas"),
    localName: "Marina Cabo San Lucas",
    clusterId: "cabo-marina",
    coordinates: { lat: 22.8825, lng: -109.9105, precision: "area" },
    categories: ["iconic", "local", "night"],
    summary: t(
      "The harbour and entertainment core of Cabo San Lucas. Unlike many Mexican towns centred on a plaza and cathedral, the city grew around this marina; it also handles cruise-ship calls alongside leisure boats.",
      "圣卢卡斯海角的港湾与娱乐核心。与许多以广场和大教堂为中心的墨西哥城镇不同，这座城围绕码头发展；除游艇外也接待邮轮靠泊。",
      "카보산루카스의 항구이자 유흥 중심입니다. 광장과 성당이 중심인 많은 멕시코 도시와 달리, 이 도시는 마리나를 중심으로 성장했으며 유람선도 기항합니다.",
      "El puerto y el núcleo de ocio de Cabo San Lucas. A diferencia de muchos pueblos mexicanos centrados en plaza y catedral, la ciudad creció alrededor de esta marina; también recibe cruceros además de embarcaciones de recreo."
    ),
    sources: [wikipedia("Los Cabos", "Los_Cabos"), wikidata("Q1020776")],
    visitMinutes: { min: 30, max: 60 },
    bestTime: "evening",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "puerto-paraiso",
    name: t("Puerto Paraíso", "天堂港购物中心", "푸에르토 파라이소", "Puerto Paraíso"),
    localName: "Puerto Paraíso",
    clusterId: "cabo-marina",
    coordinates: { lat: 22.886944, lng: -109.909444, precision: "site" },
    categories: ["local", "food", "xing_pick"],
    summary: t(
      "A downtown Cabo San Lucas mall opened in late 2001, also called Plaza Puerto Paraíso. It sits by the marina and includes shops, dining, a bowling alley and a movie theater.",
      "圣卢卡斯市中心商场，2001 年末开业，也称 Plaza Puerto Paraíso。紧邻码头，内有店铺、餐饮、保龄球馆和电影院。",
      "카보산루카스 시내 쇼핑몰로 2001년 말 개장했으며, 플라사 푸에르토 파라이소라고도 합니다. 마리나 옆에 있으며 상점, 식당, 볼링장, 영화관이 있습니다.",
      "Centro comercial en el centro de Cabo San Lucas abierto a finales de 2001, también llamado Plaza Puerto Paraíso. Está junto a la marina y reúne tiendas, comida, boliche y cine."
    ),
    sources: [wikipedia("Puerto Paraíso", "Puerto_Para%C3%ADso"), wikidata("Q139564284")],
    visitMinutes: { min: 25, max: 50 },
    bestTime: "daytime",
    setting: "indoor",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "plaza-amelia-wilkes",
    name: t("Plaza Amelia Wilkes", "阿梅利亚·威尔克斯广场", "아멜리아 윌키스 광장", "Plaza Amelia Wilkes"),
    localName: "Plaza Amelia Wilkes",
    clusterId: "cabo-marina",
    coordinates: { lat: 22.882686, lng: -109.914434, precision: "site" },
    categories: ["local", "photo", "culture"],
    summary: t(
      "A public square in central Cabo San Lucas near the marina district. It is one of the few plaza-style gathering spots in a town that otherwise orients around the harbour rather than a traditional zócalo.",
      "圣卢卡斯市中心、靠近码头区的公共广场。在这座以港湾而非传统主广场为中心的城里，它是少数广场式聚集点之一。",
      "카보산루카스 시내, 마리나 지구 근처의 광장입니다. 전통 중앙광장보다 항구가 중심인 이 도시에서 드문 광장형 모임 장소입니다.",
      "Plaza pública en el centro de Cabo San Lucas, cerca del distrito de la marina. Es uno de los pocos puntos de encuentro tipo plaza en una ciudad orientada al puerto más que a un zócalo tradicional."
    ),
    sources: [wikipedia("Cabo San Lucas", "Cabo_San_Lucas"), wikidata("Q131291890")],
    visitMinutes: { min: 15, max: 30 },
    bestTime: "any",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "cabo-wabo",
    name: t("Cabo Wabo Cantina", "卡波瓦波酒吧", "카보 와보", "Cabo Wabo Cantina"),
    localName: "Cabo Wabo Cantina",
    clusterId: "cabo-marina",
    coordinates: { lat: 22.88365, lng: -109.9132, precision: "site" },
    categories: ["night", "food", "iconic"],
    summary: t(
      "A nightclub, restaurant and bar in Cabo San Lucas founded in 1990 by rock musicians including Sammy Hagar and members of Van Halen. It sits in the marina entertainment district and remains one of the city's best-known venues.",
      "圣卢卡斯的夜总会、餐厅与酒吧，1990 年由 Sammy Hagar 及 Van Halen 成员等摇滚乐手创办。位于码头娱乐区，仍是城里最知名的场所之一。",
      "카보산루카스의 나이트클럽·식당·바로, 1990년 새미 헤이거와 밴 헤일런 멤버 등 록 뮤지션이 설립했습니다. 마리나 유흥 지구에 있으며 도시에서 가장 잘 알려진 장소 중 하나입니다.",
      "Discoteca, restaurante y bar en Cabo San Lucas fundado en 1990 por músicos de rock, entre ellos Sammy Hagar y miembros de Van Halen. Está en el distrito de ocio de la marina y sigue siendo uno de los locales más conocidos de la ciudad."
    ),
    sources: [wikipedia("Cabo Wabo", "Cabo_Wabo"), wikidata("Q1024899")],
    visitMinutes: { min: 40, max: 90 },
    bestTime: "evening",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },

  // ── Médano Beach ──
  {
    id: "el-medano",
    name: t("El Médano Beach", "梅达诺海滩", "엘 메다노", "Playa El Médano"),
    localName: "Playa El Médano",
    clusterId: "medano-beach",
    coordinates: { lat: 22.89506, lng: -109.89362, precision: "area" },
    categories: ["nature", "photo", "local"],
    summary: t(
      "The long public beach east of Cabo San Lucas marina on the Sea of Cortez side. Tourism writing on Los Cabos describes the city's beach strip as oriented to sand-top restaurants and low-rise resorts rather than high-rises.",
      "圣卢卡斯码头以东、科尔特斯海一侧的长公共海滩。洛斯卡沃斯旅游记述里，这一带以沙滩餐厅和低层度假设施为主，而非高层建筑。",
      "카보산루카스 마리나 동쪽, 코르테스 해 쪽의 긴 공공 해변입니다. 로스카보스 관광 서술에서는 고층보다 모래 위 식당과 저층 리조트 중심으로 묘사됩니다.",
      "La larga playa pública al este de la marina de Cabo San Lucas, en el lado del Mar de Cortés. Las descripciones turísticas de Los Cabos sitúan la franja playera en restaurantes sobre la arena y resorts bajos, no en torres altas."
    ),
    sources: [wikipedia("Los Cabos", "Los_Cabos"), wikidata("Q131196647")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "medano-beach-restaurants",
    name: t("Médano Beach Restaurants", "梅达诺沙滩餐厅", "메다노 비치 식당가", "Restaurantes de El Médano"),
    localName: "Restaurantes en la playa",
    clusterId: "medano-beach",
    coordinates: { lat: 22.8925, lng: -109.898, precision: "area" },
    categories: ["food", "local", "night"],
    summary: t(
      "The sand-top restaurant strip along Cabo San Lucas's main beach area. Municipal tourism history notes that development here favoured beach dining and resorts over high-rise construction.",
      "圣卢卡斯主海滩沿线的沙滩餐厅带。市政旅游史指出，这里的发展侧重沙滩餐饮与度假村，而非高层建设。",
      "카보산루카스 주요 해변을 따라 있는 모래사장 식당 거리입니다. 시 관광사에서는 고층보다 해변 식사와 리조트를 중심으로 발전했다고 적습니다.",
      "La franja de restaurantes sobre la arena en la playa principal de Cabo San Lucas. La historia turística municipal señala que aquí se favoreció la comida en la playa y los resorts frente a la construcción en altura."
    ),
    sources: [wikipedia("Los Cabos", "Los_Cabos"), wikidata("Q1020776")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "evening",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },

  // ── The Corridor ──
  {
    id: "chileno-bay",
    name: t("Chileno Bay", "奇莱诺湾", "칠레노 베이", "Bahía Chileno"),
    localName: "Bahía Chileno",
    clusterId: "the-corridor",
    coordinates: { lat: 22.9244, lng: -109.822, precision: "area" },
    categories: ["nature", "photo", "local"],
    summary: t(
      "A Corridor beach east of Cabo San Lucas frequently used for snorkeling. Cabo San Lucas tourism notes describe tropical fish, sea turtles and clear water among the reasons visitors stop here.",
      "圣卢卡斯以东走廊上常去浮潜的海滩。圣卢卡斯旅游记述提到热带鱼、海龟和较清的海水，是访客停留的原因。",
      "카보산루카스 동쪽 코리도르의 해변으로 스노클링에 자주 쓰입니다. 카보산루카스 관광 안내에서는 열대어, 바다거북, 맑은 물을 찾는 이유로 소개합니다.",
      "Playa del Corredor al este de Cabo San Lucas, frecuente para snorkel. Las notas turísticas de Cabo San Lucas citan peces tropicales, tortugas y agua clara entre los motivos para parar aquí."
    ),
    sources: [wikipedia("Cabo San Lucas", "Cabo_San_Lucas"), wikidata("Q6682541")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "santa-maria-beach",
    name: t("Santa María Beach", "圣玛丽亚海滩", "산타마리아 비치", "Playa Santa María"),
    localName: "Playa Santa María",
    clusterId: "the-corridor",
    coordinates: { lat: 22.9297, lng: -109.8162, precision: "area" },
    categories: ["nature", "photo"],
    summary: t(
      "A Corridor cove near Chileno Bay known for clear water and diving or snorkeling. Spanish-language guides to San José del Cabo list Santa María with Chileno among the better-known swim spots on the coast between the two towns.",
      "奇莱诺湾附近走廊上的小海湾，以较清海水和浮潜/潜水闻名。圣何塞德尔卡沃的西语介绍常把圣玛丽亚与奇莱诺并列为两城之间较知名的游泳点。",
      "칠레노 베이 근처 코리도르의 작은 만으로, 맑은 물과 다이빙·스노클링으로 알려졌습니다. 산호세델카보 스페인어 안내에서는 칠레노와 함께 두 도시 사이 해안에서 잘 알려진 수영 장소로 꼽습니다.",
      "Cala del Corredor junto a Bahía Chileno, conocida por el agua clara y el buceo o snorkel. Guías en español de San José del Cabo la nombran con Chileno entre las playas más conocidas entre las dos ciudades."
    ),
    sources: [
      wikipediaEs("San José del Cabo", "San_Jos%C3%A9_del_Cabo"),
      wikidata("Q6682541"),
    ],
    visitMinutes: { min: 40, max: 75 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "palmilla-beach",
    name: t("Palmilla Beach", "帕米利亚海滩", "팔미야 비치", "Playa Palmilla"),
    localName: "Playa Palmilla",
    clusterId: "the-corridor",
    coordinates: { lat: 23.0136, lng: -109.718, precision: "area" },
    categories: ["nature", "photo", "local"],
    summary: t(
      "A beach on the San José side of the Corridor, near the historic Hotel Palmilla area. Early tourism policy in the region used Palmilla as one of the first large resort hotels on this coast.",
      "走廊靠圣何塞一侧的海滩，邻近历史上的帕米利亚酒店一带。该地区早期旅游政策把帕米利亚作为这条海岸首批大型度假酒店之一。",
      "코리도르의 산호세 쪽 해변으로, 역사적인 호텔 팔미야 일대 근처입니다. 이 지역 초기 관광 정책에서 팔미야는 이 해안의 첫 대형 리조트 호텔 중 하나로 쓰였습니다.",
      "Playa del lado de San José del Corredor, cerca del histórico Hotel Palmilla. La política turística temprana de la región usó Palmilla como uno de los primeros grandes hoteles de esta costa."
    ),
    sources: [
      wikipediaEs("San José del Cabo", "San_Jos%C3%A9_del_Cabo"),
      wikidata("Q6682541"),
    ],
    visitMinutes: { min: 40, max: 70 },
    bestTime: "sunset",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "los-cabos-corridor",
    name: t("Los Cabos Corridor", "洛斯卡沃斯走廊", "로스카보스 코리도르", "Corredor Turístico de Los Cabos"),
    localName: "Corredor Turístico",
    clusterId: "the-corridor",
    coordinates: { lat: 22.9701, lng: -109.7898, precision: "area" },
    categories: ["local", "photo"],
    summary: t(
      "The roughly 30 km tourist strip along Highway 1 between San José del Cabo and Cabo San Lucas, facing the Gulf of California. It holds many of the region's beach resorts, golf courses and sport-fishing bases.",
      "圣何塞德尔卡沃与圣卢卡斯海角之间、沿 1 号公路约 30 公里、面向加利福尼亚湾的旅游带。区内集中了许多海滩度假村、高尔夫球场和海钓基地。",
      "산호세델카보와 카보산루카스 사이 1번 고속도로를 따라 약 30km, 캘리포니아 만을 바라보는 관광 벨트입니다. 해변 리조트, 골프장, 스포츠 낚시 기지가 많이 모여 있습니다.",
      "La franja turística de unos 30 km sobre la Carretera 1 entre San José del Cabo y Cabo San Lucas, frente al Golfo de California. Concentra muchos resorts de playa, campos de golf y bases de pesca deportiva."
    ),
    sources: [wikipedia("Los Cabos Corridor", "Los_Cabos_Corridor"), wikidata("Q6682541")],
    visitMinutes: { min: 20, max: 40 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },

  // ── San José del Cabo Centro ──
  {
    id: "plaza-mijares",
    name: t("Plaza Mijares", "米哈雷斯广场", "미하레스 광장", "Plaza Mijares"),
    localName: "Plaza Mijares",
    clusterId: "san-jose-centro",
    coordinates: { lat: 23.06211, lng: -109.6948, precision: "site" },
    categories: ["local", "culture", "photo"],
    summary: t(
      "The main square in historic San José del Cabo, named after José Antonio Mijares. Spanish-language local coverage notes a Thursday cultural tianguis here with artisans and regional products.",
      "圣何塞德尔卡沃老城主广场，得名于 José Antonio Mijares。西语地方介绍提到每周四在此有文化市集，有手工艺人与本地产品。",
      "산호세델카보 역사 지구 중앙 광장으로, 호세 안토니오 미하레스의 이름을 땄습니다. 스페인어 현지 소개에서는 목요일마다 장인·지역 상품이 모이는 문화 시장이 열린다고 합니다.",
      "La plaza principal del centro histórico de San José del Cabo, llamada así por José Antonio Mijares. Cobertura local en español menciona un tianguis cultural los jueves con artesanos y productos regionales."
    ),
    sources: [
      wikipediaEs("San José del Cabo", "San_Jos%C3%A9_del_Cabo"),
      wikidata("Q2088134"),
    ],
    visitMinutes: { min: 20, max: 45 },
    bestTime: "evening",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "mission-san-jose",
    name: t("Mission San José del Cabo", "圣何塞德尔卡沃传教站", "산호세델카보 선교소", "Misión de San José del Cabo"),
    localName: "Misión Estero de las Palmas de San José del Cabo Añuití",
    clusterId: "san-jose-centro",
    coordinates: { lat: 23.0621, lng: -109.6956, precision: "site" },
    categories: ["culture", "iconic", "photo"],
    summary: t(
      "The southernmost Jesuit mission on the Baja California peninsula, founded in 1730 on the edge of what is now San José del Cabo. The parish church facade carries a tile mural of founder Nicolás Tamaral.",
      "下加利福尼亚半岛最南端的耶稣会传教站，1730 年建于今圣何塞德尔卡沃一带。堂区教堂立面有创始人 Nicolás Tamaral 的瓷砖壁画。",
      "바하칼리포르니아 반도 최남단 예수회 선교소로, 1730년 오늘날 산호세델카보 가장자리에 세워졌습니다. 본당 정면에는 설립자 니콜라스 타마랄을 그린 타일 벽화가 있습니다.",
      "La misión jesuita más meridional de la península de Baja California, fundada en 1730 en el borde de la actual San José del Cabo. La fachada de la parroquia tiene un mural de azulejos del fundador Nicolás Tamaral."
    ),
    sources: [
      wikipedia(
        "Misión Estero de las Palmas de San José del Cabo Añuití",
        "Misi%C3%B3n_Estero_de_las_Palmas_de_San_Jos%C3%A9_del_Cabo_A%C3%B1uit%C3%AD"
      ),
      wikidata("Q6018549"),
    ],
    visitMinutes: { min: 25, max: 45 },
    bestTime: "morning",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "san-jose-art-walk",
    name: t("San José Art District", "圣何塞艺术街区", "산호세 아트 디스트릭트", "Distrito de arte de San José"),
    localName: "Galerías del centro",
    clusterId: "san-jose-centro",
    coordinates: { lat: 23.0605, lng: -109.6975, precision: "area" },
    categories: ["culture", "local", "photo", "xing_pick"],
    summary: t(
      "Streets around historic San José del Cabo where nineteenth-century houses hold restaurants, craft shops and art galleries. Los Cabos municipal history describes a developed art scene driven by tourism and vacation-home residents.",
      "圣何塞德尔卡沃老城一带，十九世纪宅邸里开着餐厅、手工艺店与画廊。洛斯卡沃斯市政史称，旅游与度假屋居民推动了这里成熟的艺术氛围。",
      "산호세델카보 역사 지구 거리로, 19세기 가옥에 식당·공예점·갤러리가 들어 있습니다. 로스카보스 시사에서는 관광과 별장 거주자가 만든 미술 장면을 적습니다.",
      "Calles del centro histórico de San José del Cabo donde casas del siglo XIX alojan restaurantes, artesanías y galerías. La historia municipal de Los Cabos describe una escena artística impulsada por el turismo y residentes de casas de vacaciones."
    ),
    sources: [wikipedia("Los Cabos", "Los_Cabos"), wikidata("Q2088134")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "evening",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "san-jose-centro-food",
    name: t("San José Centro Dining", "圣何塞老城餐饮", "산호세 시내 식당가", "Comer en el centro de San José"),
    localName: "Restaurantes del centro",
    clusterId: "san-jose-centro",
    coordinates: { lat: 23.0612, lng: -109.6968, precision: "area" },
    categories: ["food", "local"],
    summary: t(
      "Restaurant and café streets in San José del Cabo's quiet historic centre. The town kept large malls and chain stores limited in the core, so dining stays in converted houses and small local rooms around the plaza.",
      "圣何塞德尔卡沃安静老城里的餐厅与咖啡馆街。镇中心限制大型商场与连锁店，餐饮多在广场周边改建老宅与小店里。",
      "산호세델카보의 조용한 역사 지구 식당·카페 거리입니다. 시내는 대형 몰과 체인을 제한해, 식사는 광장 주변 개조 가옥과 작은 로컬 공간에 남아 있습니다.",
      "Calles de restaurantes y cafés en el centro histórico tranquilo de San José del Cabo. El pueblo limitó grandes centros comerciales y cadenas en el núcleo, así que se come en casas reconvertidas y locales pequeños alrededor de la plaza."
    ),
    sources: [wikipedia("Los Cabos", "Los_Cabos"), wikidata("Q2088134")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "evening",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },

  // ── San José Estuary ──
  {
    id: "estero-san-jose",
    name: t("San José Estuary", "圣何塞河口", "산호세 하구", "Estero de San José"),
    localName: "Estero de San José del Cabo",
    clusterId: "san-jose-estuary",
    coordinates: { lat: 23.055, lng: -109.685, precision: "area" },
    categories: ["nature", "photo", "local"],
    summary: t(
      "A shallow coastal estuary on the edge of San José del Cabo where the desert meets wetlands. Los Cabos tourism lists estuary tours among the area's ecotourism options alongside boat trips to El Arco.",
      "圣何塞德尔卡沃边缘的浅海河口湿地，沙漠与沼泽在此相接。洛斯卡沃斯旅游把河口游览与石拱游船并列为生态体验选项。",
      "산호세델카보 가장자리의 얕은 하구 습지로, 사막과 습지가 만납니다. 로스카보스 관광에서는 엘 아르코 유람과 함께 하구 투어를 생태 관광 옵션으로 꼽습니다.",
      "Estero costero poco profundo al borde de San José del Cabo, donde el desierto encuentra humedales. El turismo de Los Cabos lista paseos por el estero entre las opciones de ecoturismo, junto a las lanchas a El Arco."
    ),
    sources: [wikipedia("Los Cabos", "Los_Cabos"), wikidata("Q2088134")],
    visitMinutes: { min: 40, max: 75 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "playa-del-estero",
    name: t("Estero Beach", "河口海滩", "에스테로 비치", "Playa del Estero"),
    localName: "Playa del Estero",
    clusterId: "san-jose-estuary",
    coordinates: { lat: 23.05216, lng: -109.67862, precision: "area" },
    categories: ["nature", "local", "photo"],
    summary: t(
      "The beach beside San José del Cabo's estuary, quieter than Médano in Cabo San Lucas. San José sits on a shallow bay about a kilometre from the historic centre, with this shoreline as the town's closest open sand.",
      "圣何塞德尔卡沃河口旁的海滩，比圣卢卡斯的梅达诺更安静。圣何塞坐落在距老城约一公里的浅湾边，这段海岸是离镇中心最近的开阔沙滩。",
      "산호세델카보 하구 옆 해변으로, 카보산루카스의 메다노보다 조용합니다. 산호세는 역사 지구에서 약 1km 떨어진 얕은 만에 있으며, 이 해안이 시내에서 가장 가까운 열린 모래사장입니다.",
      "La playa junto al estero de San José del Cabo, más tranquila que El Médano en Cabo San Lucas. San José se asienta en una bahía poco profunda a unos un kilómetro del centro histórico, y esta orilla es la arena abierta más cercana al pueblo."
    ),
    sources: [
      wikipediaEs("San José del Cabo", "San_Jos%C3%A9_del_Cabo"),
      wikidata("Q2088134"),
    ],
    visitMinutes: { min: 30, max: 60 },
    bestTime: "sunset",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
]

const photos = {
  heroReuse: {
    src: "/assets/home-hero-los-cabos.webp",
    width: 2560,
    height: 1440,
    alt: t(
      "Los Cabos coastline with Sea of Cortez light",
      "科尔特斯海光线下的洛斯卡沃斯海岸",
      "코르테스 해 빛이 있는 로스카보스 해안",
      "Costa de Los Cabos con luz del Mar de Cortés"
    ),
    credit: {
      label: t("XingAI Travel", "XingAI Travel", "XingAI Travel", "XingAI Travel"),
      href: "/",
    },
  } satisfies CityPhoto,
  destCard: {
    src: "/assets/dest-los-cabos-v2.webp",
    width: 1600,
    height: 1000,
    alt: t(
      "Los Cabos destination card photo of coast and sky",
      "洛斯卡沃斯目的地卡片：海岸与天空",
      "해안과 하늘이 있는 로스카보스 목적지 카드 사진",
      "Foto de destino de Los Cabos con costa y cielo"
    ),
    credit: {
      label: t("XingAI Travel", "XingAI Travel", "XingAI Travel", "XingAI Travel"),
      href: "/",
    },
  } satisfies CityPhoto,
}

// Reference routes (ADR 0008 §3). Hand-authored, never generated. Times are estimates.
// Reasons are editorial; any fact inside them must already be in a place summary above.
const routes: TravelRoute[] = [
  {
    id: "essentials",
    theme: "essentials",
    photo: photos.heroReuse,
    name: t("Essentials Los Cabos", "经典洛斯卡沃斯", "로스카보스 핵심", "Los Cabos esencial"),
    description: t(
      "A first Cabo San Lucas day: marina and downtown, Médano Beach, then Land's End for El Arco light. Expect heat, taxis, and that the best arch views usually need a boat.",
      "圣卢卡斯的第一天：码头与市中心、梅达诺海滩，再到陆地尽头看石拱光线。会热、要打车，而石拱最好的视角通常得坐船。",
      "카보산루카스 첫날입니다. 마리나·시내, 메다노 비치, 이어서 랜즈 엔드에서 엘 아르코 빛을 봅니다. 더위와 택시, 그리고 아치의 가장 좋은 장면은 대개 배가 필요합니다.",
      "Un primer día en Cabo San Lucas: marina y centro, Playa El Médano, luego Fin de la Tierra para la luz de El Arco. Habrá calor, taxis, y las mejores vistas del arco suelen pedir lancha."
    ),
    estimatedDurationMinutes: 305,
    stops: [
      {
        placeId: "marina-cabo-san-lucas",
        order: 1,
        estimatedVisitMinutes: 40,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Start at the harbour that actually centres Cabo. Get your bearings before the beach heat builds.",
          "从真正撑起卡波的港湾开始。趁海滩还没最热，先认方向。",
          "카보를 실제로 지탱하는 항구에서 시작합니다. 해변 더위가 오르기 전에 방향을 잡으세요.",
          "Empieza en el puerto que de verdad centra Cabo. Oriéntate antes de que suba el calor de la playa."
        ),
      },
      {
        placeId: "puerto-paraiso",
        order: 2,
        estimatedVisitMinutes: 25,
        estimatedTravelMinutesFromPrevious: 8,
        transportMode: "walk",
        reason: t(
          "A short walk into the marina mall for shade, bathrooms and a cold drink before the sand.",
          "走到码头商场，先找阴凉、厕所和冷饮，再上沙滩。",
          "마리나 몰까지 짧게 걸어 그늘, 화장실, 시원한 음료를 챙긴 뒤 모래사장으로 갑니다.",
          "Un corto paseo al mall de la marina por sombra, baños y algo frío antes de la arena."
        ),
      },
      {
        placeId: "el-medano",
        order: 3,
        estimatedVisitMinutes: 55,
        estimatedTravelMinutesFromPrevious: 35,
        transportMode: "walk",
        reason: t(
          "Walk east to the long public beach. Swim or sit under an umbrella; this is the easy Cabo shoreline, not the rock tip.",
          "向东走到长公共海滩。游泳或遮阳伞下坐着——这是好走的卡波岸线，不是礁石尽头。",
          "동쪽으로 긴 공공 해변까지 걷습니다. 수영하거나 파라솔 아래 앉으세요. 바위 끝이 아니라 편한 카보 해안입니다.",
          "Camina al este hasta la playa pública larga. Nada o siéntate con sombra: es la orilla fácil de Cabo, no la punta de roca."
        ),
      },
      {
        placeId: "el-arco",
        order: 4,
        estimatedVisitMinutes: 50,
        estimatedTravelMinutesFromPrevious: 25,
        transportMode: "taxi",
        reason: t(
          "Taxi toward Land's End for late-day light on El Arco. If you want the postcard angle, budget a boat; shore viewpoints are honest but narrower.",
          "打车去陆地尽头赶傍晚石拱光线。想要明信片角度就预留游船；岸上观景点真实但视野更窄。",
          "택시를 타고 랜즈 엔드로 가 저녁 빛에 엘 아르코를 봅니다. 엽서 각도를 원하면 보트를 잡고, 해안 전망은 정직하지만 시야가 좁습니다.",
          "Taxi hacia Fin de la Tierra para la luz tardía sobre El Arco. Si quieres el ángulo de postal, reserva lancha; los miradores de orilla son honestos pero más estrechos."
        ),
      },
      {
        placeId: "lovers-beach",
        order: 5,
        estimatedVisitMinutes: 45,
        estimatedTravelMinutesFromPrevious: 20,
        transportMode: "taxi",
        reason: t(
          "Finish at Playa del Amor if boat access is running. Same rock amphitheatre as the Arch; do not treat it as a casual walk from the marina.",
          "若游船还在跑，就在情人海滩收尾。与石拱同一片岩壁剧场；别把它当成从码头随走随到。",
          "보트가 운행 중이면 플레이아 델 아모르에서 마무리합니다. 아치와 같은 바위 극장입니다. 마리나에서 가볍게 걸어가는 곳으로 생각하지 마세요.",
          "Termina en Playa del Amor si hay lanchas. Es el mismo anfiteatro de roca que el Arco; no lo trates como un paseo fácil desde la marina."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "It teaches Cabo's real shape in one day: marina town, swim beach, then the rock tip.",
        "一天里把卡波的真实结构讲清：码头城、可游泳滩、再是礁石尽头。",
        "하루에 카보의 실제 구조를 보여 줍니다. 마리나 타운, 수영 해변, 바위 끝.",
        "En un día enseña la forma real de Cabo: pueblo-marina, playa para nadar, luego la punta de roca."
      ),
      t(
        "Clusters only move forward: marina → Médano → Land's End.",
        "片区只往前：码头 → 梅达诺 → 陆地尽头。",
        "클러스터는 앞으로만 갑니다. 마리나 → 메다노 → 랜즈 엔드.",
        "Los clústeres solo avanzan: marina → Médano → Fin de la Tierra."
      ),
      t(
        "It is honest about boats: El Arco is the icon, but water access is what makes the photo.",
        "对船很诚实：石拱是标志，但水上接近才出那张照片。",
        "보트에 대해 솔직합니다. 엘 아르코가 아이콘이지만, 그 사진은 물 위 접근이 만듭니다.",
        "Es honesto con las lanchas: El Arco es el icono, pero el acceso por agua hace la foto."
      ),
    ],
    goodFor: [
      t("First visit to Cabo San Lucas", "第一次去圣卢卡斯海角", "카보산루카스 첫 방문", "Primera visita a Cabo San Lucas"),
      t("Beach and harbour in one day", "一天兼顾海滩与港湾", "하루에 해변과 항구", "Playa y puerto en un día"),
      t("Travellers who will take a taxi", "愿意打车的人", "택시를 탈 여행자", "Quien acepta taxi"),
    ],
    tradeoffs: [
      t(
        "Midday heat on Médano is real. Bring shade, water and a slower pace.",
        "梅达诺正午很热。带遮阳、水和更慢的节奏。",
        "메다노 한낮 더위는 진짜입니다. 그늘, 물, 느린 속도를 챙기세요.",
        "El calor de mediodía en El Médano es real. Sombra, agua y ritmo más lento."
      ),
      t(
        "San José del Cabo is not on this route — use Local for the art town and estuary.",
        "这条线不含圣何塞德尔卡沃——艺术小镇与河口走「在地」路线。",
        "산호세델카보는 이 코스에 없습니다. 예술 마을과 하구는 로컬 코스를 쓰세요.",
        "San José del Cabo no está en esta ruta: usa Local para el pueblo de arte y el estero."
      ),
      t(
        "Without a boat, El Arco and Lover's Beach are weaker than the postcard. Plan the water leg or accept shore-only views.",
        "没有船，石拱与情人海滩会弱于明信片。安排水上行程，或接受仅岸上视角。",
        "보트 없이 엘 아르코와 러버스 비치는 엽서보다 약합니다. 수상 구간을 잡거나 해안 전망만 받아들이세요.",
        "Sin lancha, El Arco y Playa del Amor quedan por debajo de la postal. Planifica el tramo en agua o acepta solo miradores de orilla."
      ),
    ],
  },
  {
    id: "photo",
    theme: "photo",
    photo: photos.destCard,
    name: t("Photo Los Cabos", "拍照洛斯卡沃斯", "로스카보스 포토", "Los Cabos en foto"),
    description: t(
      "Chase El Arco light, then Corridor coves and a quieter Palmilla sunset. More taxi than walk; less nightlife.",
      "追石拱光线，再到走廊海湾与更安静的帕米利亚日落。打车多于步行；夜生活很少。",
      "엘 아르코 빛을 쫓은 뒤 코리도르 만과 더 조용한 팔미야 일몰로 갑니다. 걷기보다 택시가 많고, 밤 유흥은 적습니다.",
      "Persigue la luz de El Arco, luego calas del Corredor y un atardecer más quieto en Palmilla. Más taxi que caminata; poca vida nocturna."
    ),
    estimatedDurationMinutes: 290,
    stops: [
      {
        placeId: "el-arco",
        order: 1,
        estimatedVisitMinutes: 45,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Begin at the granite arch while the morning angle is clean. Water access still wins if you can arrange it early.",
          "趁早晨角度干净，从花岗岩拱门开始。若能一早安排，水上接近仍然更赢。",
          "아침 각도가 맑을 때 화강암 아치에서 시작합니다. 일찍 잡을 수 있다면 수상 접근이 여전히 유리합니다.",
          "Empieza en el arco de granito con el ángulo de mañana limpio. El acceso por agua sigue ganando si lo puedes arreglar temprano."
        ),
      },
      {
        placeId: "lands-end",
        order: 2,
        estimatedVisitMinutes: 30,
        estimatedTravelMinutesFromPrevious: 5,
        transportMode: "walk",
        reason: t(
          "Shift a few steps for wider stacks and horizon lines that a single Arch frame misses.",
          "再挪几步，拍石拱单帧拍不到的礁石群与地平线。",
          "몇 걸음만 옮겨, 아치 한 장에 안 담기는 바위군과 수평선을 잡습니다.",
          "Muévete unos pasos para farallones y horizontes que un solo encuadre del Arco no da."
        ),
      },
      {
        placeId: "chileno-bay",
        order: 3,
        estimatedVisitMinutes: 50,
        estimatedTravelMinutesFromPrevious: 30,
        transportMode: "taxi",
        reason: t(
          "Taxi into the Corridor for turquoise water and snorkel-clear shallows — a different colour palette from Land's End rock.",
          "打车进走廊，拍绿松石色浅水——和陆地尽头的岩色完全不同。",
          "택시로 코리도르에 들어가 청록 얕은 물을 찍습니다. 랜즈 엔드 바위와는 다른 색감입니다.",
          "Taxi al Corredor por agua turquesa y bajos claros: otra paleta que la roca de Fin de la Tierra."
        ),
      },
      {
        placeId: "santa-maria-beach",
        order: 4,
        estimatedVisitMinutes: 40,
        estimatedTravelMinutesFromPrevious: 15,
        transportMode: "walk",
        reason: t(
          "A short walk to the next cove for tighter rock-and-water frames before the highway stretch east.",
          "再走一小段到下个小湾，在东去公路长段之前拍更紧的礁石与海水。",
          "다음 만까지 짧게 걸어, 동쪽으로 긴 도로 구간 전에 더 조밀한 바위·물 프레임을 잡습니다.",
          "Un corto paseo a la siguiente cala para encuadres más cerrados de roca y agua antes del tramo largo de carretera."
        ),
      },
      {
        placeId: "palmilla-beach",
        order: 5,
        estimatedVisitMinutes: 45,
        estimatedTravelMinutesFromPrevious: 30,
        transportMode: "taxi",
        reason: t(
          "End farther east for a softer San José-side sunset. Less party noise than Médano; more sky and long shore.",
          "再往东收尾，拍圣何塞一侧更柔的日落。比梅达诺少派对噪音，更多天空与长岸线。",
          "더 동쪽에서 산호세 쪽의 부드러운 일몰로 마무리합니다. 메다노보다 파티 소음이 적고, 하늘과 긴 해안이 많습니다.",
          "Termina más al este con un atardecer más suave del lado de San José. Menos ruido de fiesta que El Médano; más cielo y orilla larga."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "It separates rock iconography from Corridor colour instead of forcing both into one cluster.",
        "把礁石标志与走廊水色分开拍，而不是塞进同一个片区。",
        "바위 아이콘과 코리도르 색감을 한 클러스터에 억지로 넣지 않고 나눕니다.",
        "Separa la iconografía de roca del color del Corredor en lugar de forzar ambos en un solo clúster."
      ),
      t(
        "Light order matches the day: hard morning on El Arco, blue water midday, softer east-coast sunset.",
        "光线顺序跟白天走：早晨硬光石拱、中午蓝水、傍晚东岸柔光。",
        "빛의 순서가 하루와 맞습니다. 아침 엘 아르코의 강한 빛, 한낮 푸른 물, 저녁 동해안 부드러운 빛.",
        "El orden de luz sigue el día: mañana dura en El Arco, agua azul al mediodía, atardecer más suave al este."
      ),
      t(
        "No cluster backtracking: Land's End → Corridor only.",
        "不折返片区：只从陆地尽头到走廊。",
        "클러스터를 되돌아가지 않습니다. 랜즈 엔드 → 코리도르만.",
        "Sin volver atrás: solo Fin de la Tierra → Corredor."
      ),
    ],
    goodFor: [
      t("Travelling with a camera", "带相机出门", "카메라를 들고 다니는 여행", "Viajar con cámara"),
      t("Coast and rock more than nightlife", "要海岸礁石多于夜生活", "나이트라이프보다 해안·바위", "Costa y roca más que noche"),
      t("A second day after Essentials", "走过经典路线之后的第二天", "핵심 코스 다음 날", "Un segundo día después de la ruta esencial"),
    ],
    tradeoffs: [
      t(
        "Long taxi legs on the Corridor. This is not a walking city day.",
        "走廊上出租车段很长。这不是步行城市日。",
        "코리도르 택시 구간이 깁니다. 걷는 도시 하루가 아닙니다.",
        "Tramos largos en taxi por el Corredor. No es un día de ciudad a pie."
      ),
      t(
        "Skips San José galleries and the marina party strip.",
        "不去圣何塞画廊，也不去码头派对带。",
        "산호세 갤러리와 마리나 파티 거리는 빠집니다.",
        "Omite las galerías de San José y la franja de fiesta de la marina."
      ),
      t(
        "Outdoor all day. Wind, glare and sudden Pacific swell can wipe a frame.",
        "全天户外。风、眩光和太平洋突浪都能毁一张片子。",
        "하루 종일 야외입니다. 바람, 눈부심, 갑작스러운 태평양 너울이 한 장을 망칠 수 있습니다.",
        "Todo el día al aire libre. Viento, destello y oleaje del Pacífico pueden matar un encuadre."
      ),
    ],
  },
  {
    id: "local",
    theme: "local",
    photo: photos.destCard,
    name: t("Local Los Cabos", "在地洛斯卡沃斯", "로컬 로스카보스", "Los Cabos local"),
    description: t(
      "Spend the day in quieter San José del Cabo: plaza, mission, gallery streets, then the estuary and its beach.",
      "一天放在更安静的圣何塞德尔卡沃：广场、传教堂、画廊街，再到河口与海滩。",
      "더 조용한 산호세델카보에서 하루를 보냅니다. 광장, 선교소, 갤러리 거리, 이어서 하구와 해변.",
      "Pasa el día en la San José del Cabo más quieta: plaza, misión, calles de galerías, luego el estero y su playa."
    ),
    estimatedDurationMinutes: 305,
    stops: [
      {
        placeId: "plaza-mijares",
        order: 1,
        estimatedVisitMinutes: 30,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Start on the main square while the centre is still cool. This is the zócalo Cabo San Lucas mostly skipped.",
          "趁老城还凉快，从主广场开始。这是圣卢卡斯基本跳过的那种主广场。",
          "시내가 아직 시원할 때 중앙 광장에서 시작합니다. 카보산루카스가 대체로 건너뛴 그 소칼로입니다.",
          "Empieza en la plaza principal mientras el centro aún está fresco. Es el zócalo que Cabo San Lucas casi no tiene."
        ),
      },
      {
        placeId: "mission-san-jose",
        order: 2,
        estimatedVisitMinutes: 30,
        estimatedTravelMinutesFromPrevious: 5,
        transportMode: "walk",
        reason: t(
          "Walk to the mission parish for the tile mural and a short indoor break from the sun.",
          "走到传教堂区，看瓷砖壁画，并进屋躲一会太阳。",
          "선교 본당까지 걸어 타일 벽화를 보고, 햇볕을 피할 실내 휴식을 짧게 가집니다.",
          "Camina a la parroquia de la misión por el mural de azulejos y un breve respiro bajo techo."
        ),
      },
      {
        placeId: "san-jose-art-walk",
        order: 3,
        estimatedVisitMinutes: 55,
        estimatedTravelMinutesFromPrevious: 10,
        transportMode: "walk",
        reason: t(
          "Loop the gallery streets in converted houses. This is San José's quiet counterweight to Cabo's marina volume.",
          "在改建老宅的画廊街里转。这是圣何塞对卡波码头喧闹的安静对位。",
          "개조 가옥 갤러리 거리를 돕니다. 카보 마리나 소음에 대한 산호세의 조용한 균형입니다.",
          "Recorre las calles de galerías en casas reconvertidas. Es el contrapeso quieto de San José frente al volumen de la marina de Cabo."
        ),
      },
      {
        placeId: "san-jose-centro-food",
        order: 4,
        estimatedVisitMinutes: 50,
        estimatedTravelMinutesFromPrevious: 5,
        transportMode: "walk",
        reason: t(
          "Eat in the centre before leaving for the estuary. Local rooms beat rushing back to Cabo for dinner.",
          "去河口之前先在老城吃饭。本地小馆比赶回卡波吃晚饭更值得。",
          "하구로 나가기 전에 시내에서 먹습니다. 저녁을 먹으러 카보로 서두르는 것보다 로컬 공간이 낫습니다.",
          "Come en el centro antes del estero. Los locales del pueblo ganan a volver corriendo a Cabo a cenar."
        ),
      },
      {
        placeId: "estero-san-jose",
        order: 5,
        estimatedVisitMinutes: 45,
        estimatedTravelMinutesFromPrevious: 30,
        transportMode: "walk",
        reason: t(
          "Walk or slow-roll toward the wetlands. Birds and shallow water replace Arch drama on purpose.",
          "走向湿地。有意用鸟与浅水，替换石拱的戏剧感。",
          "습지 쪽으로 걷거나 천천히 이동합니다. 일부러 아치의 드라마 대신 새와 얕은 물을 둡니다.",
          "Camina o ve despacio hacia el humedal. Aves y agua poco profunda sustituyen a propósito el drama del Arco."
        ),
      },
      {
        placeId: "playa-del-estero",
        order: 6,
        estimatedVisitMinutes: 35,
        estimatedTravelMinutesFromPrevious: 10,
        transportMode: "walk",
        reason: t(
          "End on the estuary beach for a low-key shoreline close to town — no Médano volume required.",
          "在河口海滩收尾，靠近镇上却低调的岸线——不必梅达诺的音量。",
          "하구 해변에서 마무리합니다. 시내에서 가깝지만 조용한 해안입니다. 메다노의 볼륨은 필요 없습니다.",
          "Termina en la playa del estero: orilla discreta cerca del pueblo, sin el volumen de El Médano."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "It shows the other Cabo: plaza, mission, art streets and estuary instead of marina volume.",
        "展示另一个卡波：广场、传教堂、艺术街与河口，而不是码头音量。",
        "다른 카보를 보여 줍니다. 마리나 볼륨 대신 광장, 선교소, 예술 거리, 하구.",
        "Muestra el otro Cabo: plaza, misión, calles de arte y estero en lugar del volumen de la marina."
      ),
      t(
        "Food and galleries sit in the middle so you are not starving on the wetland path.",
        "餐饮与画廊放在中间，免得湿地路上饿着。",
        "식당과 갤러리를 중간에 두어 습지길에서 배고프지 않게 합니다.",
        "Comida y galerías van en el medio para no llegar con hambre al humedal."
      ),
      t(
        "Clusters only advance: centro → estuary.",
        "片区只向前：老城 → 河口。",
        "클러스터는 앞으로만 갑니다. 시내 → 하구.",
        "Los clústeres solo avanzan: centro → estero."
      ),
    ],
    goodFor: [
      t("People who want quieter streets", "想走更安静街道的人", "더 조용한 거리를 원하는 사람", "Quien quiere calles más quietas"),
      t("Art and food first", "艺术与吃饭优先", "예술과 식사를 우선", "Arte y comida primero"),
      t("A day without El Arco logistics", "不想折腾石拱行程的一天", "엘 아르코 동선 없이 하루", "Un día sin logística de El Arco"),
    ],
    tradeoffs: [
      t(
        "No El Arco, no Médano party beach, no Corridor snorkel coves.",
        "没有石拱、没有梅达诺派对滩、没有走廊浮潜湾。",
        "엘 아르코도, 메다노 파티 해변도, 코리도르 스노클링 만도 없습니다.",
        "Sin El Arco, sin playa de fiesta de El Médano ni calas de snorkel del Corredor."
      ),
      t(
        "Getting here from Cabo San Lucas usually means a taxi or bus along the Corridor — build that transfer outside this stop list.",
        "从圣卢卡斯过来通常要沿走廊打车或坐公交——那段换乘不在本站列表里。",
        "카보산루카스에서 오려면 대개 코리도르를 따라 택시나 버스가 필요합니다. 그 환승은 이 정류 목록 밖입니다.",
        "Llegar desde Cabo San Lucas suele pedir taxi o bus por el Corredor: ese traslado queda fuera de esta lista de paradas."
      ),
      t(
        "Gallery evenings are seasonal; a quiet afternoon still works, but Thursday energy is stronger.",
        "画廊夜市偏季节性；安静的下午也值得走，但周四气氛更强。",
        "갤러리 저녁은 계절성이 있습니다. 조용한 오후도 괜찮지만, 목요일 기운이 더 셉니다.",
        "Las noches de galerías son estacionales; una tarde quieta sigue valiendo, pero el jueves tiene más energía."
      ),
    ],
  },
]

export const losCabos: City = {
  slug: "los-cabos",
  name: t("Los Cabos", "洛斯卡沃斯", "로스카보스", "Los Cabos"),
  localName: "Los Cabos",
  country: t("Mexico", "墨西哥", "멕시코", "México"),
  intro: t(
    "Los Cabos is two towns and a coast between them: loud marina Cabo San Lucas, quieter plaza San José del Cabo, and the Corridor resorts facing the Sea of Cortez. A good first visit picks one spine — swim-and-arch in Cabo, or art-and-estuary in San José — and budgets taxis for the rest. Heat is constant; the postcard Arch usually wants a boat.",
    "洛斯卡沃斯是两座城和中间一段海岸：热闹码头的圣卢卡斯、更安静广场的圣何塞，以及面向科尔特斯海的走廊度假带。第一次来，最好先选一条主线——卡波的游泳与石拱，或圣何塞的艺术与河口——其余用出租车补。热是常态；明信片上的石拱通常得坐船。",
    "로스카보스는 두 도시와 그 사이 해안입니다. 시끄러운 마리나 카보산루카스, 더 조용한 광장의 산호세델카보, 코르테스 해를 보는 코리도르 리조트. 첫 방문은 한 축을 고르세요. 카보의 수영·아치, 또는 산호세의 예술·하구. 나머지는 택시로 잇고, 더위는 기본값입니다. 엽서 속 아치는 대개 배가 필요합니다.",
    "Los Cabos son dos pueblos y una costa entre ellos: la marina ruidosa de Cabo San Lucas, la plaza más quieta de San José del Cabo y los resorts del Corredor frente al Mar de Cortés. Una buena primera visita elige un eje —playa y arco en Cabo, o arte y estero en San José— y reserva taxis para lo demás. El calor es constante; el Arco de postal casi siempre pide lancha."
  ),
  hero: {
    src: "/assets/home-hero-los-cabos.webp",
    width: 2560,
    height: 1440,
    alt: t(
      "Los Cabos coast under clear desert-sea light",
      "沙漠与海交界的洛斯卡沃斯海岸",
      "사막과 바다가 만나는 로스카보스의 맑은 빛",
      "Costa de Los Cabos con luz clara de desierto y mar"
    ),
    credit: {
      label: t("XingAI Travel", "XingAI Travel", "XingAI Travel", "XingAI Travel"),
      href: "/",
    },
  },
  map: {
    // Schematic Sea of Cortez water east of the Corridor / San José shoreline. Not for navigation.
    // Kept east of every place lng (places are ≤ about -109.678) so none fall inside the polygon.
    water: [
      [-109.65, 22.88],
      [-109.58, 22.92],
      [-109.54, 23.0],
      [-109.55, 23.08],
      [-109.6, 23.11],
      [-109.65, 23.06],
      [-109.66, 22.96],
    ],
    waterLabel: t("Sea of Cortez", "科尔特스海", "코르테스 해", "Mar de Cortés"),
    waterLabelAt: [-109.6, 23.0],
  },
  clusters,
  places,
  routes,
}
