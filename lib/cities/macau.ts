import type { City, CityPhoto, CityText, Cluster, Place, Source, TravelRoute } from "./types"

// Macau city layer (ADR 0008).
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
    id: "outer-harbour",
    side: "island",
    neighbours: ["guia-hill", "lisboa-senado"],
    name: t("Outer Harbour & Ferry", "外港与码头", "외항·페리", "Puerto Exterior y ferry"),
  },
  {
    id: "guia-hill",
    side: "island",
    neighbours: ["outer-harbour", "lisboa-senado"],
    name: t("Guia Hill", "东望洋山", "기아 언덕", "Colina da Guia"),
  },
  {
    id: "lisboa-senado",
    side: "island",
    neighbours: ["outer-harbour", "guia-hill", "st-pauls-monte", "barra-tower"],
    name: t("Lisboa, Senado & Old Centre", "葡京、议事亭与旧城中心", "리스보아·세나도·구시가지", "Lisboa, Senado y centro antiguo"),
  },
  {
    id: "st-pauls-monte",
    side: "island",
    neighbours: ["lisboa-senado"],
    name: t("St. Paul's & Monte", "大三巴与大炮台", "성 바울·몬테", "San Pablo y Monte"),
  },
  {
    id: "barra-tower",
    side: "island",
    neighbours: ["lisboa-senado", "taipa-village"],
    name: t("Barra, A-Ma & Macau Tower", "妈阁、阿妈阁与澳门塔", "바라·아마·마카오 타워", "Barra, A-Ma y Torre de Macao"),
  },
  {
    id: "taipa-village",
    side: "kowloon",
    neighbours: ["barra-tower", "cotai-resorts"],
    name: t("Taipa Village", "氹仔旧城区", "타이파 빌리지", "Villa de Taipa"),
  },
  {
    id: "cotai-resorts",
    side: "kowloon",
    neighbours: ["taipa-village"],
    name: t("Cotai Resort Exteriors", "路氹度假村外观", "코타이 리조트 외관", "Exteriores de resorts de Cotai"),
  },
]

const places: Place[] = [
  // ── Outer Harbour & Ferry ──
  {
    id: "outer-harbour-ferry-terminal",
    name: t("Outer Harbour Ferry Terminal", "外港客运码头", "마카오 외항 페리 터미널", "Terminal Marítima del Puerto Exterior"),
    localName: "外港客運碼頭",
    clusterId: "outer-harbour",
    coordinates: { lat: 22.1974, lng: 113.5585, precision: "site" },
    categories: ["local"],
    summary: t(
      "A passenger ferry terminal on the Macau Peninsula's Outer Harbour. It connects Macau with Hong Kong and mainland Pearl River Delta ports, and is one of the city's practical arrival points.",
      "位于澳门半岛外港的客运码头，连接澳门与香港及珠三角内地港口，是进入澳门的实用到达点之一。",
      "마카오 반도 외항에 있는 여객 페리 터미널입니다. 마카오와 홍콩, 주강 삼각주 본토 항구를 잇는 실용적인 도착 지점 중 하나입니다.",
      "Terminal de pasajeros en el Puerto Exterior de la península de Macao. Conecta Macao con Hong Kong y puertos del delta del río Perla, y es uno de los puntos prácticos de llegada."
    ),
    sources: [wikipedia("Outer Harbour Ferry Terminal", "Outer_Harbour_Ferry_Terminal")],
    visitMinutes: { min: 15, max: 30 },
    bestTime: "any",
    setting: "indoor",
    weatherSensitive: false,
    walking: "easy",
    transport: true,
  },
  {
    id: "macau-fishermans-wharf",
    name: t("Macau Fisherman's Wharf", "澳门渔人码头", "마카오 피셔맨스 워프", "Macau Fisherman's Wharf"),
    localName: "澳門漁人碼頭",
    clusterId: "outer-harbour",
    coordinates: { lat: 22.1909, lng: 113.5576, precision: "area" },
    categories: ["photo", "local"],
    summary: t(
      "A themed waterfront complex beside Macau's Outer Harbour, with entertainment, dining and hotel spaces. Its setting makes it a visual bridge between the ferry terminal and the casino-hotel skyline.",
      "外港旁的主题海滨综合体，包含娱乐、餐饮与酒店空间。位置上连接码头动线与赌场酒店天际线。",
      "마카오 외항 옆의 테마형 해안 복합 공간으로, 엔터테인먼트·식당·호텔 공간이 있습니다. 페리 터미널 동선과 카지노 호텔 스카이라인을 시각적으로 이어 줍니다.",
      "Complejo temático frente al agua junto al Puerto Exterior, con ocio, restaurantes y hoteles. Su ubicación enlaza visualmente el ferry con el skyline de hoteles-casino."
    ),
    sources: [wikipedia("Macau Fisherman's Wharf", "Macau_Fisherman%27s_Wharf")],
    visitMinutes: { min: 30, max: 60 },
    bestTime: "evening",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },

  // ── Guia Hill ──
  {
    id: "guia-fortress",
    name: t("Guia Fortress", "东望洋炮台", "기아 요새", "Fortaleza da Guia"),
    localName: "Fortaleza da Guia / 東望洋炮台",
    clusterId: "guia-hill",
    coordinates: { lat: 22.1964, lng: 113.5497, precision: "site" },
    categories: ["culture", "iconic", "photo"],
    summary: t(
      "A seventeenth-century military fort, chapel and lighthouse complex on Guia Hill. It forms part of the Historic Centre of Macau, which is listed as a UNESCO World Heritage Site.",
      "位于东望洋山的十七世纪军事炮台、圣堂与灯塔建筑群，是列入联合国教科文组织世界遗产的澳门历史城区组成部分。",
      "기아 언덕 위의 17세기 군사 요새, 예배당, 등대 복합지입니다. 유네스코 세계유산인 마카오 역사 지구의 일부입니다.",
      "Complejo del siglo XVII con fortaleza militar, capilla y faro en la colina da Guia. Forma parte del Centro Histórico de Macao, inscrito como Patrimonio Mundial de la UNESCO."
    ),
    sources: [wikipedia("Guia Fortress", "Guia_Fortress"), wikidata("Q3121089")],
    visitMinutes: { min: 35, max: 70 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "steep",
  },
  {
    id: "guia-lighthouse",
    name: t("Guia Lighthouse", "东望洋灯塔", "기아 등대", "Faro da Guia"),
    localName: "Farol da Guia / 東望洋燈塔",
    clusterId: "guia-hill",
    coordinates: { lat: 22.1965, lng: 113.5498, precision: "site" },
    categories: ["iconic", "photo", "culture"],
    summary: t(
      "A lighthouse within Guia Fortress, first lit in the nineteenth century. It is often described as the first modern lighthouse on the Chinese coast.",
      "东望洋炮台内的灯塔，十九世纪首次启用，常被描述为中国海岸第一座现代灯塔。",
      "기아 요새 안의 등대로, 19세기에 처음 불을 밝혔습니다. 중국 해안의 첫 근대식 등대로 자주 설명됩니다.",
      "Faro dentro de la Fortaleza da Guia, encendido por primera vez en el siglo XIX. A menudo se describe como el primer faro moderno de la costa china."
    ),
    sources: [wikipedia("Guia Fortress", "Guia_Fortress"), wikidata("Q5614816")],
    visitMinutes: { min: 20, max: 40 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "steep",
  },
  {
    id: "flora-garden",
    name: t("Flora Garden", "二龙喉公园", "플로라 가든", "Jardín Flora"),
    localName: "Jardim da Flora / 二龍喉公園",
    clusterId: "guia-hill",
    coordinates: { lat: 22.1987, lng: 113.5502, precision: "area" },
    categories: ["nature", "local"],
    summary: t(
      "A public garden at the foot of Guia Hill, historically linked with the Flora Palace grounds. It is one of the green approaches to the Guia Hill area.",
      "东望洋山脚下的公共花园，历史上与 Flora Palace 园地有关，是进入东望洋山一带的绿化入口之一。",
      "기아 언덕 아래의 공원으로, 역사적으로 플로라 궁전 정원과 연결됩니다. 기아 언덕 일대로 들어가는 녹지 접근로 중 하나입니다.",
      "Jardín público al pie de la colina da Guia, vinculado históricamente a los terrenos del Palacio Flora. Es uno de los accesos verdes a la zona de Guia."
    ),
    sources: [wikipedia("Flora Garden", "Flora_Garden")],
    visitMinutes: { min: 20, max: 40 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "moderate",
  },

  // ── Lisboa, Senado & Old Centre ──
  {
    id: "senado-square",
    name: t("Senado Square", "议事亭前地", "세나도 광장", "Largo do Senado"),
    localName: "Largo do Senado / 議事亭前地",
    clusterId: "lisboa-senado",
    coordinates: { lat: 22.1935, lng: 113.5398, precision: "site" },
    categories: ["iconic", "culture", "photo"],
    summary: t(
      "A paved public square in the Historic Centre of Macau, named after the Leal Senado building. It is part of the UNESCO-listed centre and is one of the city's best-known civic spaces.",
      "澳门历史城区内的铺石公共广场，得名于民政总署大楼，是联合国教科文组织世界遗产城区的一部分，也是澳门最知名的公共空间之一。",
      "마카오 역사 지구의 포장된 공공 광장으로, 레알 세나도 건물에서 이름이 왔습니다. 유네스코 등재 중심지의 일부이며 도시에서 가장 잘 알려진 시민 공간 중 하나입니다.",
      "Plaza pública pavimentada del Centro Histórico de Macao, llamada así por el edificio del Leal Senado. Forma parte del centro UNESCO y es uno de los espacios cívicos más conocidos de la ciudad."
    ),
    sources: [wikipedia("Senado Square", "Senado_Square"), wikidata("Q7463710")],
    visitMinutes: { min: 30, max: 60 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "holy-house-of-mercy",
    name: t("Holy House of Mercy", "仁慈堂大楼", "성 자비의 집", "Santa Casa da Misericórdia"),
    localName: "Santa Casa da Misericórdia / 仁慈堂大樓",
    clusterId: "lisboa-senado",
    coordinates: { lat: 22.1938, lng: 113.54, precision: "site" },
    categories: ["culture", "photo"],
    summary: t(
      "A white neoclassical building on Senado Square associated with Macau's historic charitable institution, the Santa Casa da Misericórdia. It is included in the Historic Centre of Macau.",
      "议事亭前地旁的白色新古典建筑，与澳门历史慈善机构仁慈堂有关，属于澳门历史城区的一部分。",
      "세나도 광장의 흰색 신고전주의 건물로, 마카오의 역사적 자선 기관인 산타 카사 다 미제리코르디아와 관련됩니다. 마카오 역사 지구에 포함됩니다.",
      "Edificio neoclásico blanco en el Largo do Senado, asociado a la histórica institución benéfica Santa Casa da Misericórdia. Está incluido en el Centro Histórico de Macao."
    ),
    sources: [wikipedia("Holy House of Mercy", "Holy_House_of_Mercy")],
    visitMinutes: { min: 15, max: 30 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "st-dominics-church",
    name: t("St. Dominic's Church", "玫瑰堂", "성 도미니크 성당", "Iglesia de Santo Domingo"),
    localName: "Igreja de São Domingos / 玫瑰堂",
    clusterId: "lisboa-senado",
    coordinates: { lat: 22.1948, lng: 113.5408, precision: "site" },
    categories: ["culture", "photo"],
    summary: t(
      "A Catholic church near Senado Square, founded by Spanish Dominican priests in the sixteenth century. It is part of the Historic Centre of Macau World Heritage listing.",
      "议事亭前地附近的天主教教堂，由西班牙道明会神父于十六世纪创立，是澳门历史城区世界遗产的一部分。",
      "세나도 광장 근처의 가톨릭 성당으로, 16세기에 스페인 도미니코회 신부들이 세웠습니다. 마카오 역사 지구 세계유산의 일부입니다.",
      "Iglesia católica cerca del Largo do Senado, fundada por dominicos españoles en el siglo XVI. Forma parte del Centro Histórico de Macao inscrito como Patrimonio Mundial."
    ),
    sources: [wikipedia("St. Dominic's Church, Macau", "St._Dominic%27s_Church,_Macau")],
    visitMinutes: { min: 20, max: 40 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "leal-senado-building",
    name: t("Leal Senado Building", "民政总署大楼", "레알 세나도 빌딩", "Edificio del Leal Senado"),
    localName: "Edifício do Leal Senado / 民政總署大樓",
    clusterId: "lisboa-senado",
    coordinates: { lat: 22.1933, lng: 113.5397, precision: "site" },
    categories: ["culture", "photo"],
    summary: t(
      "The former municipal chamber building facing Senado Square. The name Leal Senado reflects the Portuguese title granted to Macau's municipal senate.",
      "面向议事亭前地的前市政议会建筑。Leal Senado 之名来自葡萄牙授予澳门市政议会的称号。",
      "세나도 광장을 마주 보는 옛 시정 회의 건물입니다. 레알 세나도라는 이름은 포르투갈이 마카오 시정 의회에 부여한 칭호에서 왔습니다.",
      "Antigua cámara municipal frente al Largo do Senado. El nombre Leal Senado refleja el título portugués concedido al senado municipal de Macao."
    ),
    sources: [wikipedia("Leal Senado Building", "Leal_Senado_Building")],
    visitMinutes: { min: 15, max: 30 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "grand-lisboa-viewpoint",
    name: t("Grand Lisboa Area Viewpoint", "新葡京一带观景点", "그랜드 리스보아 일대 전망", "Mirador de la zona Grand Lisboa"),
    localName: "Grand Lisboa / 新葡京",
    clusterId: "lisboa-senado",
    coordinates: { lat: 22.1906, lng: 113.5453, precision: "area" },
    categories: ["iconic", "photo", "night"],
    summary: t(
      "The street-level area around Grand Lisboa, a hotel and casino known for its lotus-like tower form. It is a useful exterior viewpoint for the modern casino skyline near the old centre.",
      "新葡京周边的街面区域；新葡京是以莲花状塔楼外形著称的酒店与娱乐场。这里适合从旧城附近看澳门现代赌场天际线外观。",
      "연꽃 같은 타워 형태로 알려진 호텔·카지노 그랜드 리스보아 주변의 거리 공간입니다. 구시가지 근처에서 현대 카지노 스카이라인 외관을 보기 좋은 지점입니다.",
      "Zona a nivel de calle alrededor del Grand Lisboa, hotel y casino conocido por su torre con forma de loto. Sirve como mirador exterior del skyline moderno de casinos junto al centro antiguo."
    ),
    sources: [wikipedia("Grand Lisboa", "Grand_Lisboa"), wikidata("Q1545763")],
    visitMinutes: { min: 20, max: 40 },
    bestTime: "evening",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },

  // ── St. Paul's & Monte ──
  {
    id: "ruins-of-st-pauls",
    name: t("Ruins of St. Paul's", "大三巴牌坊", "성 바울 성당 유적", "Ruinas de San Pablo"),
    localName: "Ruínas de São Paulo / 大三巴牌坊",
    clusterId: "st-pauls-monte",
    coordinates: { lat: 22.1976, lng: 113.5409, precision: "site" },
    categories: ["iconic", "culture", "photo"],
    summary: t(
      "The stone facade and stairway remains of the former Church of Mater Dei and St. Paul's College. The site is part of the Historic Centre of Macau and is one of the city's signature landmarks.",
      "原天主之母教堂与圣保禄学院留下的石造立面和台阶遗迹，属于澳门历史城区，是澳门最具代表性的地标之一。",
      "옛 마터 데이 성당과 성 바울 대학의 석조 정면과 계단 유적입니다. 마카오 역사 지구의 일부이며 도시를 대표하는 랜드마크 중 하나입니다.",
      "Fachada de piedra y escalinata que quedan de la antigua Iglesia de Mater Dei y el Colegio de San Pablo. Forma parte del Centro Histórico de Macao y es uno de sus hitos emblemáticos."
    ),
    sources: [wikipedia("Ruins of Saint Paul's", "Ruins_of_Saint_Paul%27s"), wikidata("Q2659182")],
    visitMinutes: { min: 35, max: 70 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "moderate",
  },
  {
    id: "monte-fort",
    name: t("Monte Fort", "大炮台", "몬테 요새", "Fortaleza do Monte"),
    localName: "Fortaleza do Monte / 大炮台",
    clusterId: "st-pauls-monte",
    coordinates: { lat: 22.1978, lng: 113.5421, precision: "site" },
    categories: ["culture", "photo"],
    summary: t(
      "A seventeenth-century fort built by the Jesuits above the old city. It stands beside the Ruins of St. Paul's and now shares the hilltop with the Macau Museum.",
      "耶稣会在旧城上方建造的十七世纪炮台，位于大三巴牌坊旁，如今山顶同时有澳门博物馆。",
      "예수회가 구시가지 위에 세운 17세기 요새입니다. 성 바울 성당 유적 옆에 있으며, 지금은 마카오 박물관과 같은 언덕 위에 있습니다.",
      "Fortaleza del siglo XVII construida por los jesuitas sobre la ciudad antigua. Está junto a las Ruinas de San Pablo y comparte la colina con el Museo de Macao."
    ),
    sources: [wikipedia("Fortaleza do Monte", "Fortaleza_do_Monte")],
    visitMinutes: { min: 25, max: 50 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "moderate",
  },
  {
    id: "macau-museum",
    name: t("Macau Museum", "澳门博物馆", "마카오 박물관", "Museo de Macao"),
    localName: "Museu de Macau / 澳門博物館",
    clusterId: "st-pauls-monte",
    coordinates: { lat: 22.1975, lng: 113.5423, precision: "site" },
    categories: ["culture"],
    summary: t(
      "A museum inside the Monte Fort area presenting Macau's history and culture. It opened in 1998 on the fort's hilltop site.",
      "位于大炮台范围内、展示澳门历史与文化的博物馆，1998 年在炮台山顶地点开放。",
      "몬테 요새 구역 안에 있는 박물관으로 마카오의 역사와 문화를 전시합니다. 1998년에 요새 언덕 위에서 문을 열었습니다.",
      "Museo dentro del área de la Fortaleza do Monte que presenta la historia y la cultura de Macao. Abrió en 1998 en la cima de la fortaleza."
    ),
    sources: [wikipedia("Macau Museum", "Macau_Museum")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "daytime",
    setting: "indoor",
    weatherSensitive: false,
    walking: "moderate",
  },

  // ── Barra, A-Ma & Macau Tower ──
  {
    id: "a-ma-temple",
    name: t("A-Ma Temple", "妈阁庙", "아마 사원", "Templo de A-Má"),
    localName: "Templo de A-Má / 媽閣廟",
    clusterId: "barra-tower",
    coordinates: { lat: 22.1864, lng: 113.5317, precision: "site" },
    categories: ["iconic", "culture", "local"],
    summary: t(
      "A temple dedicated to the sea goddess Mazu on the southwestern slope of the Macau Peninsula. It predates the Portuguese city and is included in the Historic Centre of Macau.",
      "位于澳门半岛西南坡、供奉海神妈祖的庙宇，早于葡萄牙城市形成，并被列入澳门历史城区。",
      "마카오 반도 남서쪽 비탈에 있는 바다 여신 마조 사원입니다. 포르투갈 도시보다 앞선 장소이며 마카오 역사 지구에 포함됩니다.",
      "Templo dedicado a la diosa del mar Mazu en la ladera suroeste de la península de Macao. Es anterior a la ciudad portuguesa y está incluido en el Centro Histórico de Macao."
    ),
    sources: [wikipedia("A-Ma Temple", "A-Ma_Temple"), wikidata("Q4657026")],
    visitMinutes: { min: 30, max: 60 },
    bestTime: "morning",
    setting: "mixed",
    weatherSensitive: false,
    walking: "moderate",
  },
  {
    id: "mandarin-house",
    name: t("Mandarin's House", "郑家大屋", "만다린 하우스", "Casa do Mandarim"),
    localName: "Casa do Mandarim / 鄭家大屋",
    clusterId: "barra-tower",
    coordinates: { lat: 22.1867, lng: 113.5347, precision: "site" },
    categories: ["culture", "photo"],
    summary: t(
      "A large traditional Chinese residential compound associated with Zheng Guanying. It is one of the Historic Centre of Macau sites and shows the scale of a nineteenth-century merchant house.",
      "与郑观应有关的大型传统中式宅第，是澳门历史城区组成部分之一，体现十九世纪商人宅邸的尺度。",
      "정관잉과 관련된 대형 전통 중국식 주거 단지입니다. 마카오 역사 지구의 일부이며 19세기 상인 저택의 규모를 보여 줍니다.",
      "Gran conjunto residencial chino tradicional asociado a Zheng Guanying. Forma parte del Centro Histórico de Macao y muestra la escala de una casa mercantil del siglo XIX."
    ),
    sources: [wikipedia("Mandarin's House", "Mandarin%27s_House")],
    visitMinutes: { min: 30, max: 60 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "macau-tower",
    name: t("Macau Tower", "澳门旅游塔", "마카오 타워", "Torre de Macao"),
    localName: "Torre de Macau / 澳門旅遊塔",
    clusterId: "barra-tower",
    coordinates: { lat: 22.18, lng: 113.5365, precision: "site" },
    categories: ["iconic", "photo"],
    summary: t(
      "A 338 m tower on the Macau Peninsula waterfront, with observation decks and entertainment facilities. It is one of Macau's modern skyline landmarks.",
      "位于澳门半岛海滨的 338 米高塔，设有观景层与娱乐设施，是澳门现代天际线地标之一。",
      "마카오 반도 해안에 있는 338m 타워로, 전망대와 엔터테인먼트 시설을 갖췄습니다. 마카오 현대 스카이라인의 랜드마크 중 하나입니다.",
      "Torre de 338 m en el frente marítimo de la península de Macao, con miradores e instalaciones de ocio. Es uno de los hitos modernos del skyline de la ciudad."
    ),
    sources: [wikipedia("Macau Tower", "Macau_Tower"), wikidata("Q670137")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "sunset",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },

  // ── Taipa Village ──
  {
    id: "taipa-houses",
    name: t("Taipa Houses", "龙环葡韵住宅式博物馆", "타이파 하우스", "Casas de Taipa"),
    localName: "Casas da Taipa / 龍環葡韻住宅式博物館",
    clusterId: "taipa-village",
    coordinates: { lat: 22.1538, lng: 113.5579, precision: "site" },
    categories: ["culture", "photo"],
    summary: t(
      "A row of green Portuguese-style houses in Taipa, now used as museum and exhibition spaces. The houses are among Macau's best-known colonial-era architectural views.",
      "氹仔一排绿色葡式住宅，现作博物馆与展览空间使用，是澳门最知名的殖民时期建筑景观之一。",
      "타이파의 초록색 포르투갈식 주택 열로, 지금은 박물관과 전시 공간으로 쓰입니다. 마카오에서 잘 알려진 식민지 시대 건축 풍경 중 하나입니다.",
      "Fila de casas verdes de estilo portugués en Taipa, hoy usadas como museo y salas de exposición. Están entre las vistas arquitectónicas coloniales más conocidas de Macao."
    ),
    sources: [wikipedia("Taipa Houses–Museum", "Taipa_Houses%E2%80%93Museum")],
    visitMinutes: { min: 30, max: 60 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "taipa-village",
    name: t("Taipa Village", "氹仔旧城区", "타이파 빌리지", "Villa de Taipa"),
    localName: "氹仔舊城區",
    clusterId: "taipa-village",
    coordinates: { lat: 22.1534, lng: 113.556, precision: "area" },
    categories: ["local", "food", "photo"],
    summary: t(
      "The older village core of Taipa, with narrow streets, food shops and heritage buildings. It sits between the Taipa Houses area and the Cotai resort strip.",
      "氹仔较旧的村镇核心，有窄街、食店与历史建筑，位于龙环葡韵一带与路氹度假村带之间。",
      "좁은 거리, 음식점, 역사 건물이 있는 타이파의 오래된 마을 중심입니다. 타이파 하우스 일대와 코타이 리조트 지대 사이에 있습니다.",
      "Núcleo antiguo de Taipa, con calles estrechas, tiendas de comida y edificios patrimoniales. Está entre las Casas de Taipa y la franja de resorts de Cotai."
    ),
    sources: [wikipedia("Taipa", "Taipa")],
    visitMinutes: { min: 40, max: 75 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "our-lady-of-carmel",
    name: t("Our Lady of Carmel Church", "嘉模圣母堂", "카르멜 성모 성당", "Iglesia de Nuestra Señora del Carmen"),
    localName: "Igreja de Nossa Senhora do Carmo / 嘉模聖母堂",
    clusterId: "taipa-village",
    coordinates: { lat: 22.1534, lng: 113.5578, precision: "site" },
    categories: ["culture", "photo"],
    summary: t(
      "A Catholic church on Taipa near the Taipa Houses area. Its hill-edge position overlooks the reclaimed land and resort area toward Cotai.",
      "位于氹仔、靠近龙环葡韵一带的天主教堂，山边位置可望向填海地与路氹度假村区域。",
      "타이파 하우스 근처의 가톨릭 성당입니다. 언덕 가장자리 위치에서 매립지와 코타이 리조트 구역을 바라봅니다.",
      "Iglesia católica en Taipa, cerca de las Casas de Taipa. Su posición en la ladera mira hacia los terrenos ganados al mar y la zona de resorts de Cotai."
    ),
    sources: [wikipedia("Our Lady of Carmel Church, Macau", "Our_Lady_of_Carmel_Church,_Macau")],
    visitMinutes: { min: 15, max: 30 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "rua-do-cunha",
    name: t("Rua do Cunha", "官也街", "쿤하 거리", "Rua do Cunha"),
    localName: "Rua do Cunha / 官也街",
    clusterId: "taipa-village",
    coordinates: { lat: 22.1534, lng: 113.5565, precision: "area" },
    categories: ["food", "local", "photo"],
    summary: t(
      "A short pedestrian street in Taipa known for food shops and souvenir snacks. It is one of the best-known visitor streets in the old Taipa village area.",
      "氹仔一条短步行街，以食品店与伴手礼小吃闻名，是氹仔旧城区最知名的游客街道之一。",
      "타이파의 짧은 보행자 거리로, 음식점과 기념 간식 가게로 알려져 있습니다. 옛 타이파 마을에서 가장 잘 알려진 방문객 거리 중 하나입니다.",
      "Calle peatonal corta de Taipa conocida por tiendas de comida y dulces de recuerdo. Es una de las calles más conocidas para visitantes en la zona antigua de Taipa."
    ),
    sources: [wikipedia("Rua do Cunha", "Rua_do_Cunha")],
    visitMinutes: { min: 25, max: 50 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },

  // ── Cotai Resort Exteriors ──
  {
    id: "venetian-macao-exterior",
    name: t("The Venetian Macao Exterior", "澳门威尼斯人外观", "베네시안 마카오 외관", "Exterior de The Venetian Macao"),
    localName: "The Venetian Macao / 澳門威尼斯人",
    clusterId: "cotai-resorts",
    coordinates: { lat: 22.1487, lng: 113.5606, precision: "area" },
    categories: ["photo", "iconic"],
    summary: t(
      "The exterior area of The Venetian Macao, a large Cotai resort themed on Venice. This stop treats the building as a resort exterior and photo landmark, not as an endorsement of casino activity.",
      "澳门威尼斯人外部区域，是路氹一座以威尼斯为主题的大型度假村。本停留点只把建筑作为度假村外观与拍照地标，不视为赌场活动推荐。",
      "베네치아를 테마로 한 코타이의 대형 리조트 베네시안 마카오 외부 구역입니다. 이 정류장은 건물을 리조트 외관과 사진 랜드마크로 다루며, 카지노 활동 추천이 아닙니다.",
      "Zona exterior de The Venetian Macao, un gran resort de Cotai inspirado en Venecia. Esta parada trata el edificio como exterior de resort e hito fotográfico, no como recomendación de juego."
    ),
    sources: [wikipedia("The Venetian Macao", "The_Venetian_Macao")],
    visitMinutes: { min: 25, max: 50 },
    bestTime: "evening",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "parisian-macao-exterior",
    name: t("The Parisian Macao Exterior", "澳门巴黎人外观", "파리지앵 마카오 외관", "Exterior de The Parisian Macao"),
    localName: "The Parisian Macao / 澳門巴黎人",
    clusterId: "cotai-resorts",
    coordinates: { lat: 22.145, lng: 113.5625, precision: "area" },
    categories: ["photo", "iconic"],
    summary: t(
      "The exterior area of The Parisian Macao, a Cotai resort with a half-scale Eiffel Tower replica. The stop is for resort exterior photography and the skyline context.",
      "澳门巴黎人外部区域，是路氹一座带有半比例埃菲尔铁塔复制品的度假村。本点用于拍摄度假村外观与天际线环境。",
      "절반 크기 에펠탑 복제품이 있는 코타이 리조트 파리지앵 마카오의 외부 구역입니다. 이 정류장은 리조트 외관 사진과 스카이라인 맥락을 위한 곳입니다.",
      "Zona exterior de The Parisian Macao, resort de Cotai con una réplica de la Torre Eiffel a media escala. La parada es para fotografiar el exterior del resort y el contexto del skyline."
    ),
    sources: [wikipedia("The Parisian Macao", "The_Parisian_Macao")],
    visitMinutes: { min: 20, max: 45 },
    bestTime: "evening",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "londoner-macao-exterior",
    name: t("The Londoner Macao Exterior", "澳门伦敦人外观", "런더너 마카오 외관", "Exterior de The Londoner Macao"),
    localName: "The Londoner Macao / 澳門倫敦人",
    clusterId: "cotai-resorts",
    coordinates: { lat: 22.1462, lng: 113.5632, precision: "area" },
    categories: ["photo", "iconic"],
    summary: t(
      "The exterior area of The Londoner Macao, a Cotai integrated resort with London-themed facades. This stop is a resort exterior photo stop and does not present the site as a cultural monument.",
      "澳门伦敦人外部区域，是路氹一座带伦敦主题立面的综合度假村。本点是度假村外观拍照点，不把它表述为文化古迹。",
      "런던 테마 파사드를 갖춘 코타이 복합 리조트 런더너 마카오의 외부 구역입니다. 이 정류장은 리조트 외관 사진 지점이며 문화유산으로 설명하지 않습니다.",
      "Zona exterior de The Londoner Macao, resort integrado de Cotai con fachadas temáticas de Londres. Es una parada fotográfica de exterior de resort, no un monumento cultural."
    ),
    sources: [wikipedia("The Londoner Macao", "The_Londoner_Macao")],
    visitMinutes: { min: 25, max: 50 },
    bestTime: "evening",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
]

const heroPhoto: CityPhoto = {
  src: "/stories/macau/01/londoner-big-ben",
  width: 1600,
  height: 2133,
  alt: t(
    "The Londoner Macao exterior used as the Macau city guide hero",
    "澳门伦敦人外观，用作澳门城市指南主图",
    "마카오 도시 가이드 히어로로 쓰는 런더너 마카오 외관",
    "Exterior de The Londoner Macao usado como imagen principal de la guía de Macao"
  ),
  credit: {
    label: t("XingAI Travel Story", "XingAI Travel 故事", "XingAI Travel 스토리", "Historia de XingAI Travel"),
    href: "/stories/macau",
  },
}

const photos = {
  essentials: heroPhoto,
  photo: heroPhoto,
  local: heroPhoto,
}

// Reference routes (ADR 0008 §3). Hand-authored, never generated. Times are estimates.
// Reasons are editorial; any fact inside them must already be in a place summary above.
// Modes used here: walk | bus | taxi (no MTR/tram/ferry route leg is needed inside this city file).
const routes: TravelRoute[] = [
  {
    id: "essentials",
    theme: "essentials",
    photo: photos.essentials,
    name: t("Macau Essentials", "澳门经典一日", "마카오 핵심 코스", "Lo esencial de Macao"),
    description: t(
      "A first Macau line from the ferry side up to Guia, through Senado and St. Paul's, then south to A-Ma and Macau Tower.",
      "第一次到澳门，从外港一侧上东望洋，再走议事亭与大三巴，最后向南到妈阁和澳门塔。",
      "첫 마카오 동선입니다. 페리 쪽에서 기아 언덕으로 올라가고, 세나도와 성 바울을 지나 남쪽의 아마 사원과 마카오 타워로 갑니다.",
      "Una primera línea por Macao: desde el lado del ferry hasta Guia, luego Senado y San Pablo, y al sur hacia A-Má y la Torre de Macao."
    ),
    estimatedDurationMinutes: 346,
    stops: [
      {
        placeId: "outer-harbour-ferry-terminal",
        order: 1,
        estimatedVisitMinutes: 20,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Start at a real arrival point. It sets the city as a ferry-and-harbour place before the old centre.",
          "从真实到达点开始，先把澳门看成码头与港湾城市，再进旧城。",
          "실제 도착 지점에서 시작합니다. 구시가지 전에 마카오가 페리와 항구의 도시임을 먼저 잡습니다.",
          "Empieza en un punto real de llegada. Sitúa Macao como ciudad de ferry y puerto antes del centro antiguo."
        ),
      },
      {
        placeId: "guia-lighthouse",
        order: 2,
        estimatedVisitMinutes: 45,
        estimatedTravelMinutesFromPrevious: 13,
        transportMode: "walk",
        reason: t(
          "Walk up to Guia for the lighthouse and fort complex while the day is still cooler.",
          "趁天气还没太热，步行上东望洋看灯塔与炮台建筑群。",
          "날이 아직 덜 더울 때 기아로 걸어 올라 등대와 요새 복합지를 봅니다.",
          "Sube caminando a Guia para el faro y la fortaleza cuando el día aún está más fresco."
        ),
      },
      {
        placeId: "senado-square",
        order: 3,
        estimatedVisitMinutes: 45,
        estimatedTravelMinutesFromPrevious: 20,
        transportMode: "walk",
        reason: t(
          "Drop into the civic old centre. The square gives you the UNESCO street pattern before the St. Paul's stairs.",
          "下到旧城公共中心，在去大三巴台阶前先看世界遗产街区的尺度。",
          "구시가지 시민 중심으로 내려갑니다. 성 바울 계단 전에 유네스코 거리 구조를 먼저 봅니다.",
          "Baja al centro cívico antiguo. La plaza muestra la trama UNESCO antes de las escaleras de San Pablo."
        ),
      },
      {
        placeId: "ruins-of-st-pauls",
        order: 4,
        estimatedVisitMinutes: 55,
        estimatedTravelMinutesFromPrevious: 10,
        transportMode: "walk",
        reason: t(
          "Continue uphill to the stone facade, the city's most recognisable historic image.",
          "继续上坡到石造立面，这是澳门最容易辨认的历史画面。",
          "도시에서 가장 잘 알아보는 역사적 장면인 석조 정면까지 언덕을 이어 갑니다.",
          "Sigue cuesta arriba hasta la fachada de piedra, la imagen histórica más reconocible de la ciudad."
        ),
      },
      {
        placeId: "a-ma-temple",
        order: 5,
        estimatedVisitMinutes: 35,
        estimatedTravelMinutesFromPrevious: 25,
        transportMode: "bus",
        reason: t(
          "Move south to the older sea-temple side of Macau rather than staying only around Senado.",
          "向南到更早的海神庙一侧，不把澳门只停留在议事亭周边。",
          "세나도 주변에만 머물지 않고, 더 오래된 바다 사원 쪽 남부로 이동합니다.",
          "Muévete al sur hacia el lado del antiguo templo del mar, no te quedes solo en Senado."
        ),
      },
      {
        placeId: "macau-tower",
        order: 6,
        estimatedVisitMinutes: 60,
        estimatedTravelMinutesFromPrevious: 18,
        transportMode: "walk",
        reason: t(
          "End with a modern high point on the waterfront. It contrasts cleanly with the temple and old centre.",
          "在海边现代高点收尾，与妈阁和旧城形成清楚对照。",
          "해안의 현대적 높은 지점에서 마무리합니다. 사원과 구시가지와 선명하게 대비됩니다.",
          "Termina en un punto alto moderno junto al agua. Contrasta con claridad con el templo y el centro antiguo."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "It explains Macau as three layers: harbour arrival, old Portuguese-Chinese centre, and modern tower skyline.",
        "它把澳门讲成三层：港口到达、葡中旧城中心、现代塔楼天际线。",
        "마카오를 세 층으로 보여 줍니다. 항구 도착, 포르투갈-중국 구시가지, 현대 타워 스카이라인.",
        "Explica Macao en tres capas: llegada por puerto, centro luso-chino antiguo y skyline moderno."
      ),
      t(
        "Walking segments stay between neighbouring clusters; the longer north-south move uses bus.",
        "步行段只发生在相邻片区之间；较长的南北移动用公交。",
        "도보 구간은 이웃 클러스터 사이에만 두고, 긴 남북 이동은 버스로 처리합니다.",
        "Los tramos a pie quedan entre clústeres vecinos; el salto norte-sur más largo va en bus."
      ),
      t(
        "It includes both St. Paul's and A-Ma, so the day is not just one postcard staircase.",
        "它同时包含大三巴与妈阁，不把一天变成单一明信片台阶。",
        "성 바울과 아마 사원을 모두 넣어, 하루를 엽서 같은 계단 하나로 끝내지 않습니다.",
        "Incluye San Pablo y A-Má, así el día no se reduce a una sola escalera de postal."
      ),
    ],
    goodFor: [
      t("First visit to Macau", "第一次来澳门", "마카오 첫 방문", "Primera visita a Macao"),
      t("Historic centre plus one skyline view", "旧城加一个天际线视角", "구시가지와 스카이라인 하나", "Centro histórico y una vista del skyline"),
      t("Travellers arriving by ferry", "坐船抵达的人", "페리로 도착하는 여행자", "Quien llega en ferry"),
    ],
    tradeoffs: [
      t(
        "Guia has uphill walking. Skip or taxi closer if heat, rain or knees make that a bad idea.",
        "东望洋有上坡路；天气热、下雨或膝盖不适时，可以跳过或打车靠近。",
        "기아는 오르막이 있습니다. 더위, 비, 무릎 상태가 안 좋으면 건너뛰거나 택시로 가까이 가세요.",
        "Guia tiene subida. Sáltalo o acércate en taxi si calor, lluvia o rodillas lo complican."
      ),
      t(
        "Cotai resorts are not on this route; use Photo if you want the exterior light show.",
        "这条线不去路氹度假村；想拍外观灯光请走拍照路线。",
        "이 코스에는 코타이 리조트가 없습니다. 외관 조명을 원하면 사진 코스를 쓰세요.",
        "Los resorts de Cotai no están aquí; usa Foto si quieres exteriores iluminados."
      ),
      t(
        "The old centre can be crowded around St. Paul's. Earlier is better.",
        "大三巴一带容易拥挤，越早越好。",
        "성 바울 주변은 붐빌 수 있습니다. 이를수록 좋습니다.",
        "El entorno de San Pablo puede llenarse. Mejor temprano."
      ),
    ],
  },
  {
    id: "photo",
    theme: "photo",
    photo: photos.photo,
    name: t("Photo Macau", "拍照澳门", "사진으로 보는 마카오", "Macao en fotos"),
    description: t(
      "Old-centre frames first, then Taipa's green houses, then Cotai resort exteriors after the light turns theatrical.",
      "先拍旧城构图，再到氹仔绿色葡式房子，最后等路氹度假村外观进入戏剧性灯光。",
      "먼저 구시가지 프레임을 찍고, 타이파의 초록 주택으로 간 뒤, 빛이 극적으로 바뀔 때 코타이 리조트 외관으로 갑니다.",
      "Primero encuadres del centro antiguo, luego las casas verdes de Taipa y al final exteriores de Cotai cuando la luz se vuelve teatral."
    ),
    estimatedDurationMinutes: 310,
    stops: [
      {
        placeId: "grand-lisboa-viewpoint",
        order: 1,
        estimatedVisitMinutes: 25,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Start with the modern lotus-like skyline near the old centre while traffic is still readable.",
          "先拍旧城旁莲花状现代天际线，趁街面交通还容易处理。",
          "구시가지 근처의 연꽃형 현대 스카이라인부터 시작합니다. 거리 흐름이 아직 읽기 쉬울 때입니다.",
          "Empieza con el skyline moderno de forma de loto junto al centro antiguo, cuando la calle aún se lee bien."
        ),
      },
      {
        placeId: "senado-square",
        order: 2,
        estimatedVisitMinutes: 35,
        estimatedTravelMinutesFromPrevious: 10,
        transportMode: "walk",
        reason: t(
          "Walk into Senado for pavement patterns, facades and the civic old-centre scale.",
          "步行进议事亭，拍铺地纹样、立面和旧城公共空间尺度。",
          "세나도로 걸어가 포장 패턴, 파사드, 구시가지 시민 공간의 규모를 찍습니다.",
          "Camina a Senado por el pavimento, las fachadas y la escala cívica del centro antiguo."
        ),
      },
      {
        placeId: "ruins-of-st-pauls",
        order: 3,
        estimatedVisitMinutes: 45,
        estimatedTravelMinutesFromPrevious: 10,
        transportMode: "walk",
        reason: t(
          "Climb to St. Paul's for the facade and steps before leaving the peninsula.",
          "离开半岛前，上到大三巴拍立面与台阶。",
          "반도를 떠나기 전에 성 바울로 올라가 정면과 계단을 찍습니다.",
          "Sube a San Pablo para la fachada y las escaleras antes de dejar la península."
        ),
      },
      {
        placeId: "taipa-houses",
        order: 4,
        estimatedVisitMinutes: 35,
        estimatedTravelMinutesFromPrevious: 30,
        transportMode: "taxi",
        reason: t(
          "Jump to Taipa for the green Portuguese-style houses, a softer palette than the stone facade.",
          "跳到氹仔拍绿色葡式房子，色调比石造立面更柔和。",
          "타이파로 넘어가 초록 포르투갈식 주택을 찍습니다. 석조 정면보다 부드러운 색감입니다.",
          "Salta a Taipa por las casas verdes portuguesas, una paleta más suave que la fachada de piedra."
        ),
      },
      {
        placeId: "venetian-macao-exterior",
        order: 5,
        estimatedVisitMinutes: 30,
        estimatedTravelMinutesFromPrevious: 15,
        transportMode: "walk",
        reason: t(
          "Walk from village edge toward Cotai and treat the Venetian as an exterior resort photo stop.",
          "从旧城边缘步行往路氹，把威尼斯人作为度假村外观拍照点。",
          "마을 가장자리에서 코타이로 걸어가 베네시안을 리조트 외관 사진 지점으로 봅니다.",
          "Camina desde el borde de la villa hacia Cotai y trata el Venetian como parada fotográfica exterior de resort."
        ),
      },
      {
        placeId: "parisian-macao-exterior",
        order: 6,
        estimatedVisitMinutes: 25,
        estimatedTravelMinutesFromPrevious: 10,
        transportMode: "walk",
        reason: t(
          "Keep moving along Cotai for the Eiffel Tower replica and broader resort skyline.",
          "沿路氹继续走，拍埃菲尔铁塔复制品与更完整的度假村天际线。",
          "코타이를 따라 계속 걸어 에펠탑 복제품과 더 넓은 리조트 스카이라인을 찍습니다.",
          "Sigue por Cotai para la réplica de la Torre Eiffel y un skyline de resorts más amplio."
        ),
      },
      {
        placeId: "londoner-macao-exterior",
        order: 7,
        estimatedVisitMinutes: 30,
        estimatedTravelMinutesFromPrevious: 8,
        transportMode: "walk",
        reason: t(
          "Finish at the London-themed exterior after dusk, when the resort facades do what they are designed to do visually.",
          "天色暗后在伦敦主题外观收尾，此时度假村立面最能发挥视觉效果。",
          "해가 진 뒤 런던 테마 외관에서 마무리합니다. 리조트 파사드가 시각적으로 가장 잘 작동하는 시간입니다.",
          "Termina en el exterior de tema londinense al anochecer, cuando las fachadas hacen visualmente lo que buscan hacer."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "It keeps old Macau and Cotai separate instead of pretending they are the same kind of landmark.",
        "它把旧澳门与路氹分开处理，不假装它们是同一种地标。",
        "옛 마카오와 코타이를 같은 종류의 랜드마크처럼 다루지 않고 분리합니다.",
        "Separa el Macao antiguo de Cotai en vez de fingir que son el mismo tipo de hito."
      ),
      t(
        "The sequence follows the light: old centre by day, resort exteriors near evening.",
        "顺序跟着光线走：白天旧城，傍晚后度假村外观。",
        "빛을 따라갑니다. 낮에는 구시가지, 저녁에는 리조트 외관.",
        "El orden sigue la luz: centro antiguo de día, exteriores de resorts al atardecer."
      ),
      t(
        "Walking in Cotai stays within neighbouring clusters after the taxi jump from St. Paul's.",
        "从大三巴打车跳转后，路氹步行只在相邻片区内进行。",
        "성 바울에서 택시로 이동한 뒤 코타이 도보는 이웃 클러스터 안에서만 이어집니다.",
        "Tras el salto en taxi desde San Pablo, las caminatas en Cotai quedan entre clústeres vecinos."
      ),
    ],
    goodFor: [
      t("Travelling with a camera", "带相机出门", "카메라를 들고 다니는 여행", "Viajar con cámara"),
      t("Old streets plus Cotai exteriors", "旧街与路氹外观都想拍", "옛 거리와 코타이 외관", "Calles antiguas y exteriores de Cotai"),
      t("A second day after Essentials", "经典路线后的第二天", "핵심 코스 다음 날", "Un segundo día tras lo esencial"),
    ],
    tradeoffs: [
      t(
        "Cotai is staged architecture, not old heritage. Treat it as resort exterior photography.",
        "路氹是舞台化建筑，不是老遗产；请把它当作度假村外观摄影。",
        "코타이는 연출된 건축이지 오래된 유산이 아닙니다. 리조트 외관 사진으로 보세요.",
        "Cotai es arquitectura escenográfica, no patrimonio antiguo. Tómalo como fotografía de exteriores de resort."
      ),
      t(
        "This route skips A-Ma Temple and Macau Tower to keep the photo arc clean.",
        "这条线跳过妈阁庙与澳门塔，以保持拍照节奏清楚。",
        "사진 흐름을 깔끔하게 유지하려고 아마 사원과 마카오 타워는 뺍니다.",
        "Omite el templo A-Má y la Torre de Macao para mantener limpio el arco fotográfico."
      ),
      t(
        "Evening glare and crowds around Cotai can be hard to control.",
        "路氹傍晚眩光与人流不好控制。",
        "코타이 저녁의 눈부심과 인파는 제어하기 어렵습니다.",
        "El brillo nocturno y las multitudes de Cotai pueden ser difíciles de controlar."
      ),
    ],
  },
  {
    id: "local",
    theme: "local",
    photo: photos.local,
    name: t("Local Macau", "在地澳门", "로컬 마카오", "Macao local"),
    description: t(
      "A slower day through A-Ma, a merchant house, Senado lanes and Taipa food streets, with fewer casino exteriors.",
      "更慢的一天：妈阁、郑家大屋、议事亭街巷与氹仔食街，减少赌场外观。",
      "느린 하루입니다. 아마 사원, 상인 저택, 세나도 골목, 타이파 먹거리 거리를 지나며 카지노 외관은 줄입니다.",
      "Un día más lento por A-Má, una casa mercantil, callejones de Senado y comida en Taipa, con menos exteriores de casino."
    ),
    estimatedDurationMinutes: 275,
    stops: [
      {
        placeId: "a-ma-temple",
        order: 1,
        estimatedVisitMinutes: 35,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Start with the sea-temple side of Macau before the old-centre crowds thicken.",
          "先从澳门的海神庙一侧开始，避开旧城人潮变厚前的时段。",
          "구시가지 인파가 많아지기 전에 마카오의 바다 사원 쪽에서 시작합니다.",
          "Empieza por el lado del templo del mar antes de que crezcan las multitudes del centro antiguo."
        ),
      },
      {
        placeId: "mandarin-house",
        order: 2,
        estimatedVisitMinutes: 35,
        estimatedTravelMinutesFromPrevious: 12,
        transportMode: "walk",
        reason: t(
          "Walk to a residential heritage compound so the day is not only temples and squares.",
          "步行到住宅遗产建筑，让这一天不只是庙和广场。",
          "사원과 광장만 보는 하루가 되지 않도록 주거 유산 단지까지 걸어갑니다.",
          "Camina a un conjunto residencial patrimonial para que el día no sea solo templos y plazas."
        ),
      },
      {
        placeId: "leal-senado-building",
        order: 3,
        estimatedVisitMinutes: 25,
        estimatedTravelMinutesFromPrevious: 20,
        transportMode: "walk",
        reason: t(
          "Continue north into the civic centre and anchor the old streets at the former municipal chamber.",
          "继续向北进公共中心，用前市政议会建筑把旧街区定位清楚。",
          "북쪽 시민 중심으로 이어가 옛 시정 회의 건물을 기준으로 구시가지를 잡습니다.",
          "Sigue al norte hacia el centro cívico y ancla las calles antiguas en la antigua cámara municipal."
        ),
      },
      {
        placeId: "st-dominics-church",
        order: 4,
        estimatedVisitMinutes: 25,
        estimatedTravelMinutesFromPrevious: 5,
        transportMode: "walk",
        reason: t(
          "A short old-centre walk adds a church interior and a quieter pause near Senado.",
          "在旧城短走，补一个教堂室内和议事亭附近较安静的停顿。",
          "구시가지 짧은 도보로 성당 내부와 세나도 근처의 조용한 쉼을 더합니다.",
          "Un paseo corto por el centro añade interior de iglesia y una pausa más tranquila cerca de Senado."
        ),
      },
      {
        placeId: "rua-do-cunha",
        order: 5,
        estimatedVisitMinutes: 40,
        estimatedTravelMinutesFromPrevious: 30,
        transportMode: "bus",
        reason: t(
          "Move to Taipa for food shops and snack streets instead of another casino lobby.",
          "转到氹仔看食店和小吃街，而不是再进一个赌场大堂。",
          "또 다른 카지노 로비 대신 타이파로 이동해 음식점과 간식 거리를 봅니다.",
          "Pasa a Taipa por tiendas de comida y calles de snacks en vez de otro vestíbulo de casino."
        ),
      },
      {
        placeId: "taipa-houses",
        order: 6,
        estimatedVisitMinutes: 35,
        estimatedTravelMinutesFromPrevious: 10,
        transportMode: "walk",
        reason: t(
          "Finish at the green Taipa houses for heritage architecture without the St. Paul's crowd.",
          "在绿色氹仔葡式房子收尾，看没有大三巴人潮的历史建筑。",
          "성 바울 인파 없이 유산 건축을 볼 수 있는 초록 타이파 주택에서 마무리합니다.",
          "Termina en las casas verdes de Taipa: arquitectura patrimonial sin la multitud de San Pablo."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "It favours lived-in streets, food lanes and residential heritage over the biggest icons.",
        "它优先选择日常街道、食街和住宅遗产，而不是最大地标。",
        "가장 큰 아이콘보다 생활 거리, 먹거리 골목, 주거 유산을 우선합니다.",
        "Prioriza calles vividas, comida y patrimonio residencial sobre los iconos más grandes."
      ),
      t(
        "The peninsula walk stays linear from Barra to Senado, then uses one bus jump to Taipa.",
        "半岛步行从妈阁到议事亭保持线性，然后用一次公交跳到氹仔。",
        "반도 도보는 바라에서 세나도까지 한 줄로 두고, 버스 한 번으로 타이파에 갑니다.",
        "La caminata peninsular va lineal de Barra a Senado, luego un salto en bus a Taipa."
      ),
      t(
        "Food appears as part of the neighbourhood, not as a separate tasting checklist.",
        "吃饭作为街区的一部分出现，而不是单独的打卡清单。",
        "음식은 별도 시식 체크리스트가 아니라 동네의 일부로 나옵니다.",
        "La comida aparece como parte del barrio, no como una lista separada de degustación."
      ),
    ],
    goodFor: [
      t("Travellers who dislike casino-first days", "不想以赌场为主的人", "카지노 중심 하루를 싫어하는 여행자", "Quien no quiere un día centrado en casinos"),
      t("Food and heritage streets", "食街与历史街巷", "먹거리와 유산 거리", "Comida y calles patrimoniales"),
      t("A slower Macau day", "节奏更慢的澳门一天", "느린 마카오 하루", "Un día más lento en Macao"),
    ],
    tradeoffs: [
      t(
        "No Cotai exteriors and no Macau Tower view.",
        "不含路氹外观，也不上澳门塔视角。",
        "코타이 외관과 마카오 타워 전망은 없습니다.",
        "Sin exteriores de Cotai ni vista desde la Torre de Macao."
      ),
      t(
        "Some old-centre lanes are narrow and crowded; patience matters more than speed.",
        "旧城部分街巷狭窄拥挤，耐心比速度重要。",
        "구시가지 일부 골목은 좁고 붐빕니다. 속도보다 인내가 중요합니다.",
        "Algunas calles del centro son estrechas y llenas; importa más la paciencia que la velocidad."
      ),
      t(
        "The bus jump to Taipa can vary with traffic; keep the schedule loose.",
        "去氹仔的公交会受交通影响；行程要留松。",
        "타이파로 가는 버스는 교통 상황에 따라 달라질 수 있습니다. 일정을 느슨하게 두세요.",
        "El salto en bus a Taipa puede variar con el tráfico; deja margen."
      ),
    ],
  },
]

export const macau: City = {
  slug: "macau",
  name: t("Macau", "澳门", "마카오", "Macao"),
  localName: "澳門",
  country: t("China", "中国", "중국", "China"),
  intro: t(
    "Macau is a compact Pearl River Delta city with a UNESCO-listed old centre, ferry arrivals on the peninsula, hilltop forts, sea-temple heritage, and Cotai resort exteriors across the water. A good first day keeps the old centre and Cotai separate: walk the peninsula for history, then choose Taipa or Cotai only when the route has time.",
    "澳门是珠三角一座紧凑城市，有列入世界遗产的旧城中心、半岛码头到达点、山顶炮台、海神庙遗产，以及隔水相对的路氹度假村外观。第一次来，最好把旧城与路氹分开：先步行理解半岛历史，再在时间允许时选择氹仔或路氹。",
    "마카오는 주강 삼각주의 작은 도시로, 유네스코 등재 구시가지, 반도의 페리 도착 지점, 언덕 위 요새, 바다 사원 유산, 물 건너 코타이 리조트 외관이 함께 있습니다. 첫 방문은 구시가지와 코타이를 분리하는 편이 좋습니다. 반도를 걸어 역사를 이해한 뒤, 시간이 될 때 타이파나 코타이를 고르세요.",
    "Macao es una ciudad compacta del delta del río Perla, con centro antiguo UNESCO, llegadas en ferry en la península, fortalezas en colinas, patrimonio de templo marinero y exteriores de resorts en Cotai al otro lado del agua. Una primera visita funciona mejor separando centro antiguo y Cotai: camina la península para la historia y elige Taipa o Cotai solo si hay tiempo."
  ),
  hero: heroPhoto,
  map: {
    // Schematic Inner Harbour water west of the Macau Peninsula. Not for navigation.
    // Kept west of every place lng (places are >= about 113.531) so none fall inside the polygon.
    water: [
      [113.515, 22.18],
      [113.526, 22.183],
      [113.529, 22.192],
      [113.528, 22.205],
      [113.523, 22.216],
      [113.516, 22.212],
      [113.512, 22.198],
    ],
    waterLabel: t("Inner Harbour", "内港", "내항", "Puerto Interior"),
    waterLabelAt: [113.521, 22.199],
  },
  clusters,
  places,
  routes,
}
