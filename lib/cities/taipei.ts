import type { City, CityPhoto, CityText, Cluster, Place, Source, TravelRoute } from "./types"

// Taipei city layer (mirrors hong-kong.ts / ADR 0008).
// Facts come from the linked Wikipedia articles; coordinates come from the linked Wikidata items.
// Visit length, best time, setting and walking effort are editorial estimates, not sourced facts.
// "xing_pick" is left for the publisher to set. It is a first-hand label and must not be inferred.

const RETRIEVED = "2026-10-05"

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
    id: "ximending-main",
    side: "island",
    neighbours: ["zhongzheng-cks", "dihua-dadaocheng"],
    name: t("Taipei Main & Ximending", "台北车站与西门町", "타이베이역·시먼딩", "Estación Central y Ximending"),
  },
  {
    id: "zhongzheng-cks",
    side: "island",
    neighbours: ["ximending-main", "daan-huashan"],
    name: t("Zhongzheng & Chiang Kai-shek", "中正与中正纪念堂", "중정·중정기념당", "Zhongzheng y Chiang Kai-shek"),
  },
  {
    id: "daan-huashan",
    side: "island",
    neighbours: ["zhongzheng-cks", "xinyi-101"],
    name: t("Da'an & Huashan", "大安与华山", "다안·화산", "Da'an y Huashan"),
  },
  {
    id: "xinyi-101",
    side: "island",
    neighbours: ["daan-huashan", "songshan-raohe"],
    name: t("Taipei 101 & Xinyi", "台北 101 与信义", "타이베이 101·신이", "Taipei 101 y Xinyi"),
  },
  {
    id: "songshan-raohe",
    side: "island",
    neighbours: ["xinyi-101"],
    name: t("Songshan & Raohe", "松山与饶河", "쑹산·라오허", "Songshan y Raohe"),
  },
  {
    id: "dihua-dadaocheng",
    side: "island",
    neighbours: ["ximending-main", "shilin-beitou"],
    name: t("Dihua & Dadaocheng", "迪化街与大稻埕", "디화·다다오청", "Dihua y Dadaocheng"),
  },
  {
    id: "shilin-beitou",
    side: "island",
    neighbours: ["dihua-dadaocheng"],
    name: t("Shilin & Beitou", "士林与北投", "스린·베이터우", "Shilin y Beitou"),
  },
]

const places: Place[] = [
  // ── Taipei Main & Ximending ──
  {
    id: "ximending",
    name: t("Ximending", "西门町", "시먼딩", "Ximending"),
    localName: "西門町",
    clusterId: "ximending-main",
    coordinates: { lat: 25.0426, lng: 121.508, precision: "area" },
    categories: ["local", "night", "photo"],
    summary: t(
      "A shopping and entertainment district in Wanhua District, often called the \"Harajuku of Taipei\". It grew around the historic entertainment area west of the old city gates.",
      "位于万华区的购物与娱乐商圈，常被称为「台北的原宿」。它在旧城西门一带的历史娱乐区基础上发展起来。",
      "완화구의 쇼핑·엔터테인먼트 거리로, 흔히 「타이베이의 하라주쿠」로 불립니다. 옛 성문 서쪽의 유흥 지구를 바탕으로 성장했습니다.",
      "Un distrito comercial y de ocio en el distrito de Wanhua, a menudo llamado el «Harajuku de Taipéi». Creció en torno a la zona de ocio histórica al oeste de las antiguas puertas de la ciudad."
    ),
    sources: [wikipedia("Ximending", "Ximending"), wikidata("Q63227")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "evening",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "red-house",
    name: t("Red House Theater", "西门红楼", "시먼 레드 하우스", "Teatro Red House"),
    localName: "西門紅樓",
    clusterId: "ximending-main",
    coordinates: { lat: 25.042138, lng: 121.506282, precision: "site" },
    categories: ["culture", "photo"],
    summary: t(
      "An octagonal red-brick building in Ximending, completed in 1908 as a public market during the Japanese colonial period. It later became a theater and is now a cultural venue with shops and performance space.",
      "西门町的八角形红砖建筑，1908 年日治时期建成时是公有市场，后来改为剧场，现为文化场所，设有商店与演出空间。",
      "시먼딩의 팔각형 붉은 벽돌 건물로, 1908년 일제 강점기에 공설 시장으로 완공되었습니다. 이후 극장이 되었고, 지금은 상점과 공연 공간이 있는 문화 공간입니다.",
      "Un edificio octogonal de ladrillo rojo en Ximending, terminado en 1908 como mercado público en la época colonial japonesa. Luego fue teatro y hoy es un centro cultural con tiendas y espacio para actuaciones."
    ),
    sources: [wikipedia("Red House Theater", "Red_House_Theater"), wikidata("Q7304386")],
    visitMinutes: { min: 20, max: 40 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "longshan-temple",
    name: t("Longshan Temple", "龙山寺", "룽산스", "Templo Longshan"),
    localName: "龍山寺",
    clusterId: "ximending-main",
    coordinates: { lat: 25.037223, lng: 121.499898, precision: "site" },
    categories: ["culture", "iconic", "local"],
    summary: t(
      "Also known as Bangka Lungshan Temple, a Guanyin temple in Wanhua District first built in 1738 by settlers from Fujian. It is one of Taipei's best-known temples and has been rebuilt several times after fires and earthquakes.",
      "又称艋舺龙山寺，是万华区供奉观音的庙宇，1738 年由来自福建的移民始建。它是台北最知名的寺庙之一，曾因火灾与地震多次重建。",
      "艋舺 룽산스라고도 하며, 완화구의 관음 사원입니다. 1738년 푸젠에서 온 이주민들이 처음 지었습니다. 타이베이에서 가장 잘 알려진 사원 중 하나로, 화재와 지진 뒤 여러 번 다시 지었습니다.",
      "También llamado Bangka Lungshan Temple, un templo de Guanyin en Wanhua construido por primera vez en 1738 por colonos de Fujian. Es uno de los templos más conocidos de Taipéi y se ha reconstruido varias veces tras incendios y terremotos."
    ),
    sources: [wikipedia("Longshan Temple (Taipei)", "Longshan_Temple_(Taipei)"), wikidata("Q706761")],
    visitMinutes: { min: 25, max: 45 },
    bestTime: "morning",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "taipei-main-station",
    name: t("Taipei Main Station", "台北车站", "타이베이역", "Estación Central de Taipéi"),
    localName: "臺北車站",
    clusterId: "ximending-main",
    coordinates: { lat: 25.047778, lng: 121.517222, precision: "site" },
    categories: ["iconic", "local"],
    summary: t(
      "The main railway station in Taipei, serving Taiwan Railways, Taiwan High Speed Rail and the Taipei Metro. The current station building opened in 1989.",
      "台北的主要铁路枢纽，衔接台铁、高铁与台北捷运。现站房于 1989 年启用。",
      "타이완 철도·고속철·타이베이 지하철이 모이는 타이베이의 주요 철도역입니다. 현재 역사는 1989년에 문을 열었습니다.",
      "La estación ferroviaria principal de Taipéi, con Taiwan Railways, el tren de alta velocidad y el metro. El edificio actual abrió en 1989."
    ),
    sources: [wikipedia("Taipei Main Station", "Taipei_Main_Station"), wikidata("Q700588")],
    visitMinutes: { min: 15, max: 30 },
    bestTime: "any",
    setting: "indoor",
    weatherSensitive: false,
    walking: "easy",
    transport: true,
  },

  // ── Zhongzheng & Chiang Kai-shek ──
  {
    id: "chiang-kai-shek-memorial",
    name: t("Chiang Kai-shek Memorial Hall", "中正纪念堂", "중정기념당", "Salón Conmemorativo de Chiang Kai-shek"),
    localName: "中正紀念堂",
    clusterId: "zhongzheng-cks",
    coordinates: { lat: 25.034444, lng: 121.521667, precision: "site" },
    categories: ["iconic", "culture", "photo"],
    summary: t(
      "A national monument in Zhongzheng District dedicated to Chiang Kai-shek. The white hall with a blue octagonal roof stands at the east end of Liberty Square; the complex opened on 5 April 1980.",
      "位于中正区、纪念蒋介石的国家级纪念建筑。白色殿堂配蓝色八角屋顶，在自由广场东端；整座园区于 1980 年 4 月 5 日开放。",
      "중정구에 있는 장제스를 기리는 국가 기념관입니다. 파란 팔각 지붕의 흰 건물이 자유광장 동쪽에 있으며, 단지는 1980년 4월 5일 개방되었습니다.",
      "Un monumento nacional en Zhongzheng dedicado a Chiang Kai-shek. La sala blanca con tejado octogonal azul está en el extremo este de Liberty Square; el conjunto abrió el 5 de abril de 1980."
    ),
    sources: [wikipedia("Chiang Kai-shek Memorial Hall", "Chiang_Kai-shek_Memorial_Hall"), wikidata("Q540794")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "peace-memorial-park-228",
    name: t("228 Peace Memorial Park", "二二八和平纪念公园", "228 평화기념공원", "Parque Memorial de la Paz 228"),
    localName: "二二八和平紀念公園",
    clusterId: "zhongzheng-cks",
    coordinates: { lat: 25.042222, lng: 121.515, precision: "site" },
    categories: ["culture", "nature"],
    summary: t(
      "A historic public park in Zhongzheng District, formerly Taipei New Park. It was renamed in 1996 to commemorate the February 28 Incident of 1947, and it holds the Taipei 228 Memorial Museum.",
      "中正区的历史公园，前身为台北新公园。1996 年更名以纪念 1947 年二二八事件，园内有台北二二八纪念馆。",
      "중정구의 역사 공원으로, 옛 이름은 타이베이 신공원이었습니다. 1947년 2·28 사건을 기리기 위해 1996년 이름을 바꿨고, 타이베이 228 기념관이 있습니다.",
      "Un parque público histórico en Zhongzheng, antes Taipei New Park. Se renombró en 1996 para conmemorar el Incidente del 28 de febrero de 1947, y alberga el Museo Memorial 228 de Taipéi."
    ),
    sources: [wikipedia("228 Peace Memorial Park", "228_Peace_Memorial_Park"), wikidata("Q697177")],
    visitMinutes: { min: 30, max: 60 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "national-taiwan-museum",
    name: t("National Taiwan Museum", "国立台湾博物馆", "국립대만박물관", "Museo Nacional de Taiwán"),
    localName: "國立臺灣博物館",
    clusterId: "zhongzheng-cks",
    coordinates: { lat: 25.042753, lng: 121.515039, precision: "site" },
    categories: ["culture"],
    summary: t(
      "Taiwan's oldest museum, established in 1908 during the Japanese colonial period. Its main building faces 228 Peace Memorial Park in Zhongzheng District and holds natural history and ethnographic collections.",
      "台湾历史最悠久的博物馆，1908 年日治时期创立。本馆面向中正区二二八和平纪念公园，收藏自然史与民族学展品。",
      "1908년 일제 강점기에 세워진 타이완에서 가장 오래된 박물관입니다. 본관은 중정구 228 평화기념공원을 마주보며, 자연사와 민족학 소장품을 둡니다.",
      "El museo más antiguo de Taiwán, fundado en 1908 en la época colonial japonesa. Su edificio principal mira al Parque Memorial 228 en Zhongzheng y guarda colecciones de historia natural y etnografía."
    ),
    sources: [wikipedia("National Taiwan Museum", "National_Taiwan_Museum"), wikidata("Q706692")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "any",
    setting: "indoor",
    weatherSensitive: false,
    walking: "easy",
  },

  // ── Da'an & Huashan ──
  {
    id: "huashan-1914",
    name: t("Huashan 1914 Creative Park", "华山 1914 文化创意产业园区", "화산 1914 문화창의산업단지", "Parque Creativo Huashan 1914"),
    localName: "華山1914文化創意產業園區",
    clusterId: "daan-huashan",
    coordinates: { lat: 25.044609, lng: 121.529183, precision: "site" },
    categories: ["culture", "photo", "local"],
    summary: t(
      "A cultural park on the site of a former wine and camphor factory founded in 1914. After restoration it reopened as Huashan 1914, with galleries, shops, restaurants and event spaces in Zhongzheng District.",
      "建于 1914 年的前酿酒与樟脑工厂旧址上的文化园区。整修后以华山 1914 之名重新开放，在中正区设有展览、商店、餐厅与活动空间。",
      "1914년에 세워진 옛 양조·장뇌 공장 터의 문화 단지입니다. 복원 후 화산 1914로 다시 열렸고, 중정구에 갤러리·상점·식당·행사 공간이 있습니다.",
      "Un parque cultural en la antigua fábrica de vino y alcanfor fundada en 1914. Tras la restauración reabrió como Huashan 1914, con galerías, tiendas, restaurantes y espacios para eventos en Zhongzheng."
    ),
    sources: [wikipedia("Huashan 1914 Creative Park", "Huashan_1914_Creative_Park"), wikidata("Q14594864")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },

  // ── Taipei 101 & Xinyi ──
  {
    id: "taipei-101",
    name: t("Taipei 101", "台北 101", "타이베이 101", "Taipei 101"),
    localName: "臺北101",
    clusterId: "xinyi-101",
    coordinates: { lat: 25.033611, lng: 121.564722, precision: "site" },
    categories: ["iconic", "photo"],
    summary: t(
      "A 508 m skyscraper in Xinyi District. It was the world's tallest building from its 2004 opening until 2010, and its indoor observatory is on the 89th floor.",
      "信义区一座高 508 米的摩天楼。2004 年启用后至 2010 年为世界最高建筑，室内观景台在 89 楼。",
      "신이구의 508m 마천루입니다. 2004년 개장부터 2010년까지 세계 최고층 건물이었고, 실내 전망대는 89층에 있습니다.",
      "Un rascacielos de 508 m en Xinyi. Fue el edificio más alto del mundo desde su apertura en 2004 hasta 2010; el observatorio interior está en la planta 89."
    ),
    sources: [wikipedia("Taipei 101", "Taipei_101"), wikidata("Q83101")],
    visitMinutes: { min: 60, max: 120 },
    bestTime: "sunset",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "sun-yat-sen-memorial",
    name: t("Sun Yat-sen Memorial Hall", "国父纪念馆", "국부기념관", "Salón Conmemorativo de Sun Yat-sen"),
    localName: "國父紀念館",
    clusterId: "xinyi-101",
    coordinates: { lat: 25.04, lng: 121.56, precision: "site" },
    categories: ["culture", "iconic", "photo"],
    summary: t(
      "A memorial hall in Xinyi District dedicated to Sun Yat-sen, completed in 1972. The building and surrounding Zhongshan Park are used for exhibitions, performances and public gatherings.",
      "信义区纪念孙中山的纪念馆，1972 年落成。主建筑与周边的中山公园用于展览、演出和公众活动。",
      "신이구에 있는 쑨원을 기리는 기념관으로 1972년에 완공되었습니다. 건물과 주변 중산공원은 전시·공연·공공 모임에 쓰입니다.",
      "Un salón conmemorativo en Xinyi dedicado a Sun Yat-sen, terminado en 1972. El edificio y el Parque Zhongshan se usan para exposiciones, actuaciones y actos públicos."
    ),
    sources: [wikipedia("Sun Yat-sen Memorial Hall (Taipei)", "Sun_Yat-sen_Memorial_Hall_(Taipei)"), wikidata("Q697314")],
    visitMinutes: { min: 30, max: 60 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "xiangshan",
    name: t("Xiangshan (Elephant Mountain)", "象山", "샹산 (코끼리산)", "Xiangshan (Montaña del Elefante)"),
    localName: "象山",
    clusterId: "xinyi-101",
    coordinates: { lat: 25.0269, lng: 121.57664, precision: "site" },
    categories: ["photo", "nature", "iconic"],
    summary: t(
      "A hill in the Xinyi District foothills of the Four Beasts Mountains, known in English as Elephant Mountain. Short trails lead to viewpoints overlooking Taipei 101 and the Xinyi skyline.",
      "信义区「四兽山」山脚的一座山丘，英文常称 Elephant Mountain。短程步道通往可俯瞰台北 101 与信义天际线的观景点。",
      "신이구 사수산 자락의 언덕으로, 영어로는 Elephant Mountain이라 불립니다. 짧은 등산로로 타이베이 101과 신이 스카이라인을 내려다보는 전망 포인트에 닿습니다.",
      "Una colina en las estribaciones de las Four Beasts Mountains en Xinyi, conocida en inglés como Elephant Mountain. Senderos cortos llevan a miradores sobre Taipei 101 y el skyline de Xinyi."
    ),
    sources: [wikipedia("Xiangshan, Taipei", "Xiangshan,_Taipei"), wikidata("Q15919621")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "sunset",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "steep",
  },

  // ── Songshan & Raohe ──
  {
    id: "songshan-creative-park",
    name: t("Songshan Cultural and Creative Park", "松山文创园区", "쑹산 문화창의단지", "Parque Cultural y Creativo Songshan"),
    localName: "松山文創園區",
    clusterId: "songshan-raohe",
    coordinates: { lat: 25.043611, lng: 121.5625, precision: "site" },
    categories: ["culture", "photo"],
    summary: t(
      "A cultural park on the former Songshan Tobacco Factory site in Xinyi District. The Japanese-era industrial buildings now hold exhibitions, design shops and event venues.",
      "信义区原松山烟厂旧址上的文化园区。日治时期的厂房建筑现用于展览、设计商店与活动场地。",
      "신이구 옛 쑹산 담배공장 터의 문화 단지입니다. 일제 강점기 산업 건물이 지금은 전시·디자인 숍·행사 공간으로 쓰입니다.",
      "Un parque cultural en la antigua fábrica de tabaco Songshan, en Xinyi. Los edificios industriales de la época japonesa alojan exposiciones, tiendas de diseño y eventos."
    ),
    sources: [
      wikipedia("Songshan Cultural and Creative Park", "Songshan_Cultural_and_Creative_Park"),
      wikidata("Q11104372"),
    ],
    visitMinutes: { min: 40, max: 75 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "raohe-night-market",
    name: t("Raohe Street Night Market", "饶河街观光夜市", "라오허 거리 야시장", "Mercado nocturno de Raohe"),
    localName: "饒河街觀光夜市",
    clusterId: "songshan-raohe",
    coordinates: { lat: 25.050167, lng: 121.572639, precision: "area" },
    categories: ["food", "night", "local"],
    summary: t(
      "A night market along Raohe Street in Songshan District, next to the Ciyou Temple and Songshan Station. It opened as a tourist night market in 1987 and is known for street food such as pepper buns.",
      "松山区饶河街上的夜市，紧邻慈祐宫与松山车站。1987 年开辟为观光夜市，以胡椒饼等街头小吃闻名。",
      "쑹산구 라오허 거리를 따라 있는 야시장으로, 츠유궁과 쑹산역 옆에 있습니다. 1987년 관광 야시장으로 문을 열었고 후추빵 등 길거리 음식으로 유명합니다.",
      "Un mercado nocturno en Raohe Street, Songshan, junto al templo Ciyou y la estación Songshan. Abrió como mercado turístico en 1987 y es conocido por comida callejera como los bollos de pimienta."
    ),
    sources: [wikipedia("Raohe Street Night Market", "Raohe_Street_Night_Market"), wikidata("Q707622")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "evening",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },

  // ── Dihua & Dadaocheng ──
  {
    id: "dihua-street",
    name: t("Dihua Street", "迪化街", "디화 거리", "Calle Dihua"),
    localName: "迪化街",
    clusterId: "dihua-dadaocheng",
    coordinates: { lat: 25.066552, lng: 121.509948, precision: "area" },
    categories: ["local", "culture", "photo", "food"],
    summary: t(
      "A historic street in Datong District's Dadaocheng area, long a centre for Chinese medicine, dried goods and fabrics. Many shophouses date from the late Qing and Japanese colonial periods.",
      "大同区大稻埕一带的历史街道，长期是中药、南北货与布匹交易中心。许多店屋可追溯到清末与日治时期。",
      "다퉁구 다다오청의 역사 거리로, 오래전부터 한약·건어물·원단 거래의 중심이었습니다. 많은 상점 건물이 청말·일제 강점기까지 거슬러 올라갑니다.",
      "Una calle histórica en Dadaocheng, distrito de Datong, durante mucho tiempo centro de medicina china, productos secos y tejidos. Muchas casas-comercio datan del final de la dinastía Qing y de la época colonial japonesa."
    ),
    sources: [wikipedia("Dihua Street", "Dihua_Street"), wikidata("Q5276412")],
    visitMinutes: { min: 40, max: 75 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "ningxia-night-market",
    name: t("Ningxia Night Market", "宁夏夜市", "닝샤 야시장", "Mercado nocturno de Ningxia"),
    localName: "寧夏夜市",
    clusterId: "dihua-dadaocheng",
    coordinates: { lat: 25.055376, lng: 121.515098, precision: "area" },
    categories: ["food", "night", "local"],
    summary: t(
      "A compact night market on Ningxia Road in Datong District, known for sit-down snack stalls rather than long souvenir rows. It is one of Taipei's older neighbourhood night markets.",
      "大同区宁夏路上的小型夜市，以坐下来吃的小吃摊闻名，而不是长排纪念品摊。它是台北较老的社区型夜市之一。",
      "다퉁구 닝샤로에 있는 아담한 야시장으로, 긴 기념품 골목보다 앉아서 먹는 분식 노점으로 알려져 있습니다. 타이베이에서 오래된 동네 야시장 중 하나입니다.",
      "Un mercado nocturno compacto en Ningxia Road, Datong, conocido por puestos de comida para sentarse más que por filas de souvenirs. Es uno de los mercados nocturnos de barrio más antiguos de Taipéi."
    ),
    sources: [wikipedia("Ningxia Night Market", "Ningxia_Night_Market"), wikidata("Q16926585")],
    visitMinutes: { min: 40, max: 75 },
    bestTime: "evening",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "confucius-temple",
    name: t("Taipei Confucius Temple", "台北孔庙", "타이베이 공자묘", "Templo de Confucio de Taipéi"),
    localName: "臺北孔子廟",
    clusterId: "dihua-dadaocheng",
    coordinates: { lat: 25.0729, lng: 121.5166, precision: "site" },
    categories: ["culture", "local"],
    summary: t(
      "A Confucian temple in Datong District's Dalongdong area. The present complex was completed in 1939 in a traditional southern Chinese style and remains a venue for the annual Teacher's Day ceremony.",
      "大同区大龙峒一带的孔庙。现存建筑群于 1939 年以传统闽南风格落成，至今仍是每年教师节祭孔典礼的场所。",
      "다퉁구 다룽둥에 있는 공자묘입니다. 현재 단지는 1939년 전통 남중국 양식으로 완공되었고, 매년 스승의 날 제례가 열리는 장소로 남아 있습니다.",
      "Un templo confuciano en Dalongdong, Datong. El conjunto actual se terminó en 1939 en estilo chino meridional tradicional y sigue siendo sede de la ceremonia anual del Día del Maestro."
    ),
    sources: [wikipedia("Taipei Confucius Temple", "Taipei_Confucius_Temple"), wikidata("Q136181")],
    visitMinutes: { min: 25, max: 45 },
    bestTime: "morning",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "taipei-fine-arts-museum",
    name: t("Taipei Fine Arts Museum", "台北市立美术馆", "타이베이시립미술관", "Museo de Bellas Artes de Taipéi"),
    localName: "臺北市立美術館",
    clusterId: "dihua-dadaocheng",
    coordinates: { lat: 25.0725, lng: 121.525, precision: "site" },
    categories: ["culture", "photo"],
    summary: t(
      "Taipei's municipal museum of modern and contemporary art, opened in 1983 in Zhongshan District beside the Keelung River. It was the first museum of modern art in Taiwan.",
      "台北的市立现当代美术馆，1983 年在中山区基隆河畔开馆，是台湾第一座现代美术博物馆。",
      "타이베이의 시립 근현대 미술관으로, 1983년 중산구 지룽강 옆에 개관했습니다. 타이완 최초의 현대미술관입니다.",
      "El museo municipal de arte moderno y contemporáneo de Taipéi, abierto en 1983 en Zhongshan junto al río Keelung. Fue el primer museo de arte moderno de Taiwán."
    ),
    sources: [wikipedia("Taipei Fine Arts Museum", "Taipei_Fine_Arts_Museum"), wikidata("Q697319")],
    visitMinutes: { min: 60, max: 120 },
    bestTime: "any",
    setting: "indoor",
    weatherSensitive: false,
    walking: "easy",
  },

  // ── Shilin & Beitou ──
  {
    id: "shilin-night-market",
    name: t("Shilin Night Market", "士林夜市", "스린 야시장", "Mercado nocturno de Shilin"),
    localName: "士林夜市",
    clusterId: "shilin-beitou",
    coordinates: { lat: 25.0866, lng: 121.5254, precision: "area" },
    categories: ["food", "night", "local"],
    summary: t(
      "One of Taipei's largest and best-known night markets, in Shilin District around the Yangming Theatre and neighbouring streets. It is especially known for local snacks and large evening crowds.",
      "台北规模最大、知名度最高的夜市之一，位于士林区阳明戏院周边与邻近街巷，以在地小吃和晚间人潮著称。",
      "타이베이에서 가장 크고 잘 알려진 야시장 중 하나로, 스린구 양밍 극장 일대와 옆 골목에 있습니다. 현지 간식과 저녁 인파로 특히 유명합니다.",
      "Uno de los mercados nocturnos más grandes y conocidos de Taipéi, en Shilin alrededor del Yangming Theatre y calles vecinas. Es famoso por los aperitivos locales y las grandes multitudes nocturnas."
    ),
    sources: [wikipedia("Shilin Night Market", "Shilin_Night_Market"), wikidata("Q697118")],
    visitMinutes: { min: 60, max: 120 },
    bestTime: "evening",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "grand-hotel",
    name: t("Grand Hotel Taipei", "圆山饭店", "위안산 호텔", "Grand Hotel Taipéi"),
    localName: "圓山大飯店",
    clusterId: "shilin-beitou",
    coordinates: { lat: 25.078667, lng: 121.526361, precision: "site" },
    categories: ["iconic", "photo"],
    summary: t(
      "A landmark hotel on Yuanshan in Zhongshan District, opened in 1952 and expanded with its present 14-storey main building in 1973. Its Chinese-palace exterior makes it a frequent photography subject.",
      "中山区圆山上的地标饭店，1952 年开业，1973 年扩建为现高 14 层的主楼。宫殿式外观使它常成为摄影对象。",
      "중산구 위안산의 랜드마크 호텔로, 1952년 개업했고 1973년 지금의 14층 본관으로 확장되었습니다. 중국 궁전식 외관 때문에 사진 명소로 자주 찍힙니다.",
      "Un hotel emblemático en Yuanshan, Zhongshan, abierto en 1952 y ampliado en 1973 con el edificio principal de 14 plantas. Su exterior de palacio chino lo convierte en un motivo fotográfico habitual."
    ),
    sources: [wikipedia("Grand Hotel (Taipei)", "Grand_Hotel_(Taipei)"), wikidata("Q712865")],
    visitMinutes: { min: 20, max: 40 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "moderate",
  },
  {
    id: "national-palace-museum",
    name: t("National Palace Museum", "国立故宫博物院", "국립고궁박물원", "Museo Nacional del Palacio"),
    localName: "國立故宮博物院",
    clusterId: "shilin-beitou",
    coordinates: { lat: 25.102222, lng: 121.548611, precision: "site" },
    categories: ["culture", "iconic"],
    summary: t(
      "A museum in Shilin District with one of the world's largest collections of Chinese imperial artifacts and artworks. Its Taipei site opened in 1965; many pieces were moved from the Palace Museum in Beijing.",
      "士林区的博物馆，拥有世界上最大的中国宫廷文物与艺术品收藏之一。台北馆区于 1965 年开放；许多藏品自北京故宫博物院迁来。",
      "스린구의 박물관으로, 세계에서 가장 큰 중국 궁정 유물·미술품 소장처 중 하나입니다. 타이베이 관은 1965년에 열렸고, 많은 소장품이 베이징 고궁박물원에서 옮겨 왔습니다.",
      "Un museo en Shilin con una de las mayores colecciones del mundo de artefactos y obras imperiales chinas. Su sede en Taipéi abrió en 1965; muchas piezas llegaron del Museo del Palacio de Pekín."
    ),
    sources: [wikipedia("National Palace Museum", "National_Palace_Museum"), wikidata("Q540668")],
    visitMinutes: { min: 90, max: 180 },
    bestTime: "daytime",
    setting: "indoor",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "beitou-hot-spring-museum",
    name: t("Beitou Hot Spring Museum", "北投温泉博物馆", "베이터우 온천박물관", "Museo de las Termas de Beitou"),
    localName: "北投溫泉博物館",
    clusterId: "shilin-beitou",
    coordinates: { lat: 25.136667, lng: 121.507222, precision: "site" },
    categories: ["culture", "nature", "local"],
    summary: t(
      "A museum in Beitou Hot Spring Park housed in a public bathhouse built in 1913 during the Japanese colonial period. It documents the history of Beitou's hot-spring culture.",
      "位于北投温泉公园内的博物馆，馆舍是 1913 年日治时期建造的公共浴场，讲述北投温泉文化的历史。",
      "베이터우 온천공원 안의 박물관으로, 건물은 1913년 일제 강점기에 지은 공중목욕탕입니다. 베이터우 온천 문화의 역사를 다룹니다.",
      "Un museo en el parque termal de Beitou, en una casa de baños pública de 1913 de la época colonial japonesa. Documenta la historia de la cultura termal de Beitou."
    ),
    sources: [wikipedia("Beitou Hot Spring Museum", "Beitou_Hot_Spring_Museum"), wikidata("Q10902996")],
    visitMinutes: { min: 30, max: 60 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "moderate",
  },
]

const cardPhoto = (alt: CityText): CityPhoto => ({
  src: "/assets/destination-taipei-card.webp",
  width: 1600,
  height: 1047,
  alt,
  credit: {
    label: t("XingAI Travel", "XingAI Travel", "XingAI Travel", "XingAI Travel"),
    href: "/",
  },
})

const photos = {
  essentials: cardPhoto(
    t(
      "Taipei city view used for the essentials route",
      "台北城市景色，用于经典路线",
      "핵심 코스에 쓰는 타이베이 도시 전경",
      "Vista de Taipéi para la ruta esencial"
    )
  ),
  photo: cardPhoto(
    t(
      "Taipei city view used for the photo route",
      "台北城市景色，用于拍照路线",
      "사진 코스에 쓰는 타이베이 도시 전경",
      "Vista de Taipéi para la ruta fotográfica"
    )
  ),
  local: cardPhoto(
    t(
      "Taipei city view used for the local route",
      "台北城市景色，用于在地路线",
      "로컬 코스에 쓰는 타이베이 도시 전경",
      "Vista de Taipéi para la ruta local"
    )
  ),
}

// Reference routes (ADR 0008 §3). Hand-authored, never generated. Times are estimates.
// Reasons are editorial; any fact inside them must already be in a place summary above.
// Modes used here: walk | mtr | bus | taxi (no ferry/tram in this city file).
const routes: TravelRoute[] = [
  {
    id: "essentials",
    theme: "essentials",
    photo: photos.essentials,
    name: t("Taipei Essentials", "台北经典一日", "타이베이 핵심 코스", "Lo esencial de Taipéi"),
    description: t(
      "Memorial hall and creative park by day, Taipei 101 and Elephant Mountain before dusk, then Raohe for street food.",
      "白天走纪念堂与文创园区，黄昏前上看台北 101 和象山，晚上到饶河吃小吃。",
      "낮에는 기념관과 문창 단지, 해 지기 전 타이베이 101과 샹산, 저녁에는 라오허에서 길거리 음식.",
      "Memorial y parque creativo de día, Taipei 101 y Elephant Mountain antes del anochecer, y Raohe para comer."
    ),
    estimatedDurationMinutes: 435,
    stops: [
      {
        placeId: "chiang-kai-shek-memorial",
        order: 1,
        estimatedVisitMinutes: 60,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Start at Liberty Square and the white hall with the blue roof — the city's most recognisable civic landmark.",
          "从自由广场和那座蓝顶白殿开始，这是台北最容易辨认的公共地标。",
          "자유광장과 파란 지붕의 흰 기념관에서 시작합니다. 타이베이에서 가장 잘 알아보는 공공 랜드마크입니다.",
          "Empieza en Liberty Square y la sala blanca de tejado azul: el hito cívico más reconocible de la ciudad."
        ),
      },
      {
        placeId: "huashan-1914",
        order: 2,
        estimatedVisitMinutes: 45,
        estimatedTravelMinutesFromPrevious: 15,
        transportMode: "mtr",
        reason: t(
          "One short metro hop east to the old factory yards — indoor galleries if the afternoon turns hot.",
          "坐一站捷运往东，到旧厂房院子；下午太热可以进馆里看展。",
          "지하철로 짧게 동쪽이면 옛 공장 마당입니다. 오후가 더우면 실내 전시를 보면 됩니다.",
          "Un salto corto de metro al este hasta las antiguas naves: galerías cubiertas si aprieta el calor."
        ),
      },
      {
        placeId: "taipei-101",
        order: 3,
        estimatedVisitMinutes: 75,
        estimatedTravelMinutesFromPrevious: 20,
        transportMode: "mtr",
        reason: t(
          "Continue into Xinyi for the 508 m tower and the 89th-floor observatory before the light softens.",
          "继续进信义，上 508 米高楼和 89 楼观景台，赶在光线变柔之前。",
          "신이로 이어가 508m 타워와 89층 전망대에 올라, 빛이 부드러워지기 전에 봅니다.",
          "Sigue hacia Xinyi para la torre de 508 m y el observatorio de la planta 89 antes de que baje la luz."
        ),
      },
      {
        placeId: "xiangshan",
        order: 4,
        estimatedVisitMinutes: 60,
        estimatedTravelMinutesFromPrevious: 25,
        transportMode: "walk",
        reason: t(
          "Walk to the Elephant Mountain trailheads for the classic view back at the tower you just visited.",
          "走到象山步道口，回看刚才上去过的那座塔，这是经典机位。",
          "샹산 등산로 입구까지 걸어, 방금 올랐던 타워를 다시 바라보는 클래식 전망을 봅니다.",
          "Camina hasta los accesos de Elephant Mountain para la vista clásica de la torre que acabas de subir."
        ),
      },
      {
        placeId: "songshan-creative-park",
        order: 5,
        estimatedVisitMinutes: 40,
        estimatedTravelMinutesFromPrevious: 15,
        transportMode: "mtr",
        reason: t(
          "Drop back to street level at the old tobacco factory before the night market fills up.",
          "先回平地，在旧烟厂园区歇一下，再等夜市热闹起来。",
          "야시장이 붐비기 전에 옛 담배공장 단지에서 한숨 돌립니다.",
          "Baja al nivel de calle en la antigua fábrica de tabaco antes de que el mercado nocturno se llene."
        ),
      },
      {
        placeId: "raohe-night-market",
        order: 6,
        estimatedVisitMinutes: 60,
        estimatedTravelMinutesFromPrevious: 20,
        transportMode: "walk",
        reason: t(
          "Finish on Raohe Street once the stalls are up — pepper buns and a short walk from Songshan Station.",
          "摊档摆好后再进饶河街收尾，胡椒饼很近，离松山站也不远。",
          "노점이 들어선 뒤 라오허 거리에서 마무리합니다. 후추빵이 가깝고 쑹산역에서도 가깝습니다.",
          "Termina en Raohe cuando ya hay puestos: bollos de pimienta y un corto paseo desde Songshan."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "It lines up the civic core, the skyline, a hill viewpoint and a night market without doubling back.",
        "把市政核心、天际线、山顶视角和夜市串成一条线，不走回头路。",
        "도심 공공 공간, 스카이라인, 언덕 전망, 야시장을 한 줄로 이으며 되돌아가지 않습니다.",
        "Enlaza el centro cívico, el skyline, un mirador y un mercado nocturno sin volver atrás."
      ),
      t(
        "Taipei 101 and Xiangshan answer the same question from two heights: what the basin looks like.",
        "台北 101 和象山从两个高度回答同一个问题：盆地长什么样。",
        "타이베이 101과 샹산이 두 높이에서 같은 질문에 답합니다. 분지가 어떻게 보이는지.",
        "Taipei 101 y Xiangshan responden a la misma pregunta desde dos alturas: cómo se ve la cuenca."
      ),
      t(
        "Ending at Raohe keeps dinner simple after a long outdoor climb.",
        "在饶河收尾，爬完山后不用再为晚饭绕路。",
        "라오허에서 끝내면 긴 등산 뒤 저녁을 위해 멀리 돌지 않아도 됩니다.",
        "Terminar en Raohe simplifica la cena tras una subida larga al aire libre."
      ),
    ],
    goodFor: [
      t("A first visit with one full day", "第一次来、有一整天", "첫 방문, 하루 종일", "Primera visita con un día completo"),
      t("Skyline photos without a second trip", "不想另排一天只为拍天际线", "스카이라인만 보러 하루를 더 쓰지 않을 때", "Fotos del skyline sin un segundo día"),
      t("Mixing landmarks with one night market", "地标和一座夜市都要", "명소와 야시장을 같이", "Mezclar hitos con un mercado nocturno"),
    ],
    tradeoffs: [
      t(
        "Xiangshan is steep stairs; skip it if knees or weather disagree.",
        "象山是陡阶，膝盖或天气不对就别硬上。",
        "샹산은 가파른 계단입니다. 무릎이나 날씨가 안 맞으면 건너뛰세요.",
        "Xiangshan son escaleras empinadas; sáltalo si las rodillas o el tiempo no acompañan."
      ),
      t(
        "Raohe is busiest after dark; earlier and the food stalls feel half-asleep.",
        "饶河天黑后才最热闹，去早了小吃摊会显得冷清。",
        "라오허는 해 진 뒤가 가장 붐빕니다. 너무 이르면 분식 노점이 한산합니다.",
        "Raohe está más vivo de noche; si vas pronto, los puestos parecen a medio gas."
      ),
      t(
        "Little neighbourhood browsing — that is the Local route's job.",
        "街巷闲逛不多，那是在地路线的事。",
        "골목 구경은 적습니다. 그건 로컬 코스 몫입니다.",
        "Poco deambular por barrios: eso es cosa de la ruta local."
      ),
    ],
  },
  {
    id: "photo",
    theme: "photo",
    photo: photos.photo,
    name: t("Photo Taipei", "拍照台北", "사진으로 보는 타이베이", "Taipéi en fotos"),
    description: t(
      "West-side courtyards and brick, then Dadaocheng streets, then Yuanshan and the Palace Museum grounds.",
      "先拍西门红砖与庙宇庭院，再走大稻埕街道，最后到圆山与故宫周边。",
      "서쪽 벽돌과 사원 마당을 찍고, 다다오청 거리를 지난 뒤 위안산과 고궁 일대로 갑니다.",
      "Patios y ladrillo del oeste, luego calles de Dadaocheng, y al final Yuanshan y el Palacio Nacional."
    ),
    estimatedDurationMinutes: 390,
    stops: [
      {
        placeId: "red-house",
        order: 1,
        estimatedVisitMinutes: 30,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Start with the 1908 octagon — clean brick geometry before the streets fill.",
          "从 1908 年的八角形红楼开始，趁街上人少拍干净的砖墙线条。",
          "1908년 팔각 건물부터 시작합니다. 거리가 붐비기 전에 벽돌 선을 찍으세요.",
          "Empieza con el octágono de 1908: geometría de ladrillo limpia antes de que se llene la calle."
        ),
      },
      {
        placeId: "longshan-temple",
        order: 2,
        estimatedVisitMinutes: 30,
        estimatedTravelMinutesFromPrevious: 15,
        transportMode: "walk",
        reason: t(
          "A short walk south for incense, roof ridges and courtyard frames — keep it respectful and quick.",
          "往南走一小段，拍香火、屋脊和庭院构图；保持安静，别站太久。",
          "남쪽으로 조금 걸어 향·지붕선·마당 구도를 찍습니다. 짧게, 예의를 지키세요.",
          "Un corto paseo al sur: incienso, tejados y patios. Sé respetuoso y breve."
        ),
      },
      {
        placeId: "dihua-street",
        order: 3,
        estimatedVisitMinutes: 45,
        estimatedTravelMinutesFromPrevious: 20,
        transportMode: "mtr",
        reason: t(
          "Metro north into Dadaocheng for shophouse facades and dried-goods shopfronts.",
          "坐捷运往北进大稻埕，拍店屋立面和南北货铺面。",
          "지하철로 북쪽 다다오청에 가면 상점 파사드와 건어물·약재 가게 앞이 나옵니다.",
          "Metro al norte hacia Dadaocheng: fachadas de casas-comercio y tiendas de productos secos."
        ),
      },
      {
        placeId: "taipei-fine-arts-museum",
        order: 4,
        estimatedVisitMinutes: 60,
        estimatedTravelMinutesFromPrevious: 25,
        transportMode: "walk",
        reason: t(
          "Walk toward the river for the 1980s museum block — strong exterior lines, and air-conditioning inside.",
          "往河岸走到 1980 年代的美术馆量体，外立面线条清楚，室内还有空调。",
          "강 쪽으로 걸어 1980년대 미술관 매스를 봅니다. 외관 선이 분명하고 실내는 에어컨이 있습니다.",
          "Camina hacia el río hasta el bloque del museo de los 80: líneas exteriores claras y aire acondicionado dentro."
        ),
      },
      {
        placeId: "grand-hotel",
        order: 5,
        estimatedVisitMinutes: 30,
        estimatedTravelMinutesFromPrevious: 20,
        transportMode: "mtr",
        reason: t(
          "One metro stop up to Yuanshan for the palace-style hotel facade.",
          "坐一站捷运上圆山，拍宫殿式饭店立面。",
          "지하철 한 정거장 위안산으로 올라가 궁전식 호텔 외관을 찍습니다.",
          "Un metro hasta Yuanshan para la fachada del hotel de estilo palacio."
        ),
      },
      {
        placeId: "national-palace-museum",
        order: 6,
        estimatedVisitMinutes: 90,
        estimatedTravelMinutesFromPrevious: 25,
        transportMode: "bus",
        reason: t(
          "Finish with the museum grounds and galleries — bus or taxi up the valley road.",
          "最后到故宫园区和展厅收尾；坐公交或出租车沿谷地公路上去。",
          "고궁 부지와 전시실로 마무리합니다. 버스나 택시로 계곡 길을 올라갑니다.",
          "Termina en los jardines y salas del museo; sube en bus o taxi por la carretera del valle."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "One northbound line: brick west side, shophouse streets, then Yuanshan landmarks.",
        "一条往北的线：西门红砖、大稻埕店屋，再到圆山地标。",
        "북쪽으로 한 줄입니다. 서쪽 벽돌, 상점 거리, 그리고 위안산 랜드마크.",
        "Una línea hacia el norte: ladrillo del oeste, calles de casas-comercio y luego Yuanshan."
      ),
      t(
        "It mixes outdoor street frames with two indoor museums if rain shows up.",
        "户外街景和两座室内博物馆搭配，下雨也有退路。",
        "야외 거리 구도와 실내 박물관 두 곳을 섞어, 비가 와도 피할 곳이 있습니다.",
        "Mezcla encuadres de calle con dos museos cubiertos por si llueve."
      ),
      t(
        "No Xinyi towers — that skyline is already on the Essentials route.",
        "不去信义高楼，那条天际线留给经典路线。",
        "신이 고층은 빼둡니다. 그 스카이라인은 핵심 코스에 있습니다.",
        "Sin torres de Xinyi: ese skyline ya está en la ruta esencial."
      ),
    ],
    goodFor: [
      t("Travelling with a camera", "带相机出门", "카메라를 들고 다니는 여행", "Viajar con cámara"),
      t("Architecture and street texture", "喜欢建筑和街道质感", "건축과 거리 질감", "Arquitectura y textura de calle"),
      t("A second day after Essentials", "走过经典路线之后的第二天", "핵심 코스 다음 날", "Un segundo día después de lo esencial"),
    ],
    tradeoffs: [
      t(
        "No Elephant Mountain and no Taipei 101 observatory.",
        "不上象山，也不进台北 101 观景台。",
        "샹산도, 타이베이 101 전망대도 없습니다.",
        "Sin Elephant Mountain ni el observatorio de Taipei 101."
      ),
      t(
        "Dihua and the Grand Hotel exterior need decent daylight.",
        "迪化街和圆山饭店外观都要靠白天光线。",
        "디화 거리와 위안산 호텔 외관은 낮 빛이 필요합니다.",
        "Dihua y la fachada del Grand Hotel necesitan buena luz de día."
      ),
      t(
        "The Palace Museum can swallow the afternoon if you go deep into the galleries.",
        "故宫若进馆细看，一下午会被吃掉。",
        "고궁 전시를 깊게 보면 오후가 통째로 갑니다.",
        "El Palacio Nacional puede comerse la tarde si entras a fondo en las salas."
      ),
    ],
  },
  {
    id: "local",
    theme: "local",
    photo: photos.local,
    name: t("Local Taipei", "在地台北", "로컬 타이베이", "Taipéi local"),
    description: t(
      "Temple morning in Wanhua, Ximending streets, Dadaocheng shops, then Shilin when the night market wakes up.",
      "万华庙宇清晨、西门町街巷、大稻埕店铺，晚上再到士林赶夜市。",
      "완화 사원 아침, 시먼딩 거리, 다다오청 상점, 저녁에 스린 야시장.",
      "Mañana de templo en Wanhua, calles de Ximending, tiendas de Dadaocheng y Shilin al encenderse el mercado."
    ),
    estimatedDurationMinutes: 330,
    stops: [
      {
        placeId: "longshan-temple",
        order: 1,
        estimatedVisitMinutes: 35,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Start when the courtyard is calmer — incense and everyday worship before tour groups thicken.",
          "趁庭院还安静时开始，香火和日常祭拜比旅游团先到。",
          "마당이 한산할 때 시작합니다. 관광 단체보다 향과 일상 참배가 먼저입니다.",
          "Empieza con el patio más tranquilo: incienso y culto cotidiano antes de que lleguen los grupos."
        ),
      },
      {
        placeId: "ximending",
        order: 2,
        estimatedVisitMinutes: 45,
        estimatedTravelMinutesFromPrevious: 15,
        transportMode: "walk",
        reason: t(
          "Walk into the pedestrian grid for lunch shops, side streets and the afternoon crowd.",
          "走进西门町步行街吃午饭、钻巷子，看下午人潮怎么起来。",
          "보행자 구역으로 걸어가 점심과 골목, 오후 인파가 붙는 모습을 봅니다.",
          "Entra en la zona peatonal a comer, mirar callejones y ver cómo crece la tarde."
        ),
      },
      {
        placeId: "red-house",
        order: 3,
        estimatedVisitMinutes: 25,
        estimatedTravelMinutesFromPrevious: 5,
        transportMode: "walk",
        reason: t(
          "The Red House sits inside that grid — a short cultural pause between snacks.",
          "红楼就在这片步行区里，吃吃走走之间停一下看文化空间。",
          "레드 하우스가 그 보행 구역 안에 있어, 먹는 사이 짧게 문화 공간을 봅니다.",
          "La Red House está en esa trama: una pausa cultural breve entre picoteos."
        ),
      },
      {
        placeId: "dihua-street",
        order: 4,
        estimatedVisitMinutes: 40,
        estimatedTravelMinutesFromPrevious: 20,
        transportMode: "mtr",
        reason: t(
          "Metro into Dadaocheng for dried goods, tea and fabric shops that still sell to locals.",
          "坐捷运进大稻埕，看至今仍做本地生意的南北货、茶行和布店。",
          "지하철로 다다오청에 가면 지금도 현지인이 사는 건어물·차·원단 가게가 있습니다.",
          "Metro a Dadaocheng: tiendas de secos, té y telas que siguen vendiendo a vecinos."
        ),
      },
      {
        placeId: "confucius-temple",
        order: 5,
        estimatedVisitMinutes: 25,
        estimatedTravelMinutesFromPrevious: 15,
        transportMode: "walk",
        reason: t(
          "A quiet walk north to Dalongdong before the evening food crowds start.",
          "往北走到大龙峒孔庙，赶在晚间觅食人潮起来之前安静一下。",
          "저녁 먹거리 인파가 붙기 전에 북쪽으로 다룽둥 공자묘까지 걸어 한숨 돌립니다.",
          "Un paseo tranquilo al norte hasta Dalongdong antes de que empiece la cena callejera."
        ),
      },
      {
        placeId: "shilin-night-market",
        order: 6,
        estimatedVisitMinutes: 75,
        estimatedTravelMinutesFromPrevious: 30,
        transportMode: "mtr",
        reason: t(
          "End at Shilin once the stalls are open — the city's largest everyday night-market run.",
          "摊档开齐后再到士林收尾，这是台北最大的日常夜市之一。",
          "노점이 열린 뒤 스린에서 마무리합니다. 타이베이에서 가장 큰 일상 야시장 중 하나입니다.",
          "Termina en Shilin cuando ya hay puestos: una de las vueltas de mercado nocturno más grandes de la ciudad."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "It follows a local day shape: temple, shopping streets, old wholesale street, night market.",
        "路线跟着在地一天的形状：庙、商街、老批发街、夜市。",
        "현지 하루 흐름을 따릅니다. 사원, 상점가, 옛 도매 거리, 야시장.",
        "Sigue un día local: templo, calles comerciales, calle mayorista antigua, mercado nocturno."
      ),
      t(
        "Food shows up as street life, not a tasting-menu detour.",
        "吃的是街头生活的一部分，不是另排米其林路线。",
        "음식은 거리 생활의 일부이지, 별도 테이스팅 코스가 아닙니다.",
        "La comida aparece como vida de calle, no como desvío de menú degustación."
      ),
      t(
        "One metro jump north after Dadaocheng — no harbour crossing, no backtracking.",
        "大稻埕之后只往北坐一段捷运，不过河、不回头。",
        "다다오청 이후 북쪽으로 지하철 한 번만 타며, 되돌아가지 않습니다.",
        "Tras Dadaocheng, un metro al norte: sin cruces raros ni volver atrás."
      ),
    ],
    goodFor: [
      t("Food first", "以吃为主", "먹는 게 우선", "La comida primero"),
      t("Lower spend than observatory days", "比重点观景日花钱少", "전망대 날보다 적은 비용", "Gastar menos que un día de miradores"),
      t("People who want everyday Taipei", "想看日常台北的人", "일상 타이베이를 보고 싶은 사람", "Quien quiere el Taipéi de cada día"),
    ],
    tradeoffs: [
      t(
        "No Taipei 101 and no Palace Museum deep dive.",
        "不上台北 101，也不进故宫细看。",
        "타이베이 101도, 고궁 깊은 관람도 없습니다.",
        "Sin Taipei 101 ni una visita a fondo al Palacio Nacional."
      ),
      t(
        "There is afternoon slack between Dihua and Shilin — Shilin is weak before evening.",
        "迪化街和士林之间下午会空一截；士林天黑前没什么夜市气氛。",
        "디화와 스린 사이 오후에 빈 시간이 생깁니다. 스린은 저녁 전에 야시장 분위기가 약합니다.",
        "Hay un hueco por la tarde entre Dihua y Shilin; Shilin flojea antes del anochecer."
      ),
      t(
        "Outdoor markets suffer in heavy rain.",
        "下大雨时户外夜市体验会差很多。",
        "비가 많이 오면 야외 야시장 경험이 크게 떨어집니다.",
        "Con lluvia fuerte, los mercados al aire libre pierden mucho."
      ),
    ],
  },
]

export const taipei: City = {
  slug: "taipei",
  name: t("Taipei", "台北", "타이베이", "Taipéi"),
  localName: "臺北",
  country: t("Taiwan", "台湾", "대만", "Taiwán"),
  intro: t(
    "Taipei sits in a basin crossed by the Keelung and Tamsui rivers. A clear first day usually means one civic landmark, one skyline view, and one night market — then you can fan out to Dadaocheng or Shilin–Beitou.",
    "台北位于基隆河与淡水河穿过的盆地。第一天通常看清一座公共地标、一处天际线，再去一座夜市，之后再往大稻埕或士林北投延伸。",
    "타이베이는 지룽강과 단수이강이 지나는 분지에 있습니다. 첫날은 보통 공공 랜드마크 하나, 스카이라인 하나, 야시장 하나를 보고, 이후 다다오청이나 스린·베이터우로 넓히면 됩니다.",
    "Taipéi ocupa una cuenca cruzada por los ríos Keelung y Tamsui. Un primer día claro suele ser un hito cívico, una vista del skyline y un mercado nocturno; luego puedes ampliar a Dadaocheng o Shilin–Beitou."
  ),
  // Destination card is the widest Taipei asset on disk (no home-hero-taipei). 1600×1047 as measured.
  hero: {
    src: "/assets/destination-taipei-card.webp",
    width: 1600,
    height: 1047,
    alt: t(
      "Taipei destination card view of the city",
      "台北目的地卡片上的城市景色",
      "타이베이 목적지 카드의 도시 전경",
      "Vista de Taipéi en la tarjeta de destino"
    ),
    credit: {
      label: t("XingAI Travel", "XingAI Travel", "XingAI Travel", "XingAI Travel"),
      href: "/",
    },
  },
  map: {
    // Schematic Keelung River ribbon through the basin (west near Dadaocheng → east toward Songshan).
    // Kept north of Main Station / Songshan park / Raohe and south of Dihua / Fine Arts so no place sits inside.
    water: [
      [121.505, 25.051],
      [121.52, 25.052],
      [121.54, 25.053],
      [121.56, 25.052],
      [121.575, 25.051],
      [121.585, 25.05],
      [121.585, 25.053],
      [121.575, 25.054],
      [121.56, 25.055],
      [121.54, 25.056],
      [121.52, 25.055],
      [121.505, 25.054],
    ],
    waterLabel: t("Keelung River", "基隆河", "지룽강", "Río Keelung"),
    waterLabelAt: [121.545, 25.0535],
  },
  clusters,
  places,
  routes,
}
