import type { City, CityPhoto, CityText, Cluster, Place, Source, TravelRoute } from "./types"

// Xi'an city layer (ADR 0008).
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
    id: "bell-drum-core",
    side: "island",
    neighbours: ["muslim-quarter", "city-wall-steles"],
    name: t("Bell & Drum Tower Core", "钟鼓楼核心", "종루·고루 중심", "Nucleo de Torre de la Campana y Tambor"),
  },
  {
    id: "muslim-quarter",
    side: "island",
    neighbours: ["bell-drum-core"],
    name: t("Muslim Quarter & Great Mosque", "回民街与化觉巷清真大寺", "무슬림 거리·대청진사", "Barrio musulman y Gran Mezquita"),
  },
  {
    id: "city-wall-steles",
    side: "island",
    neighbours: ["bell-drum-core", "small-yanta"],
    name: t("City Wall & Stone Steles", "城墙与碑林", "성벽·비림", "Muralla y bosque de estelas"),
  },
  {
    id: "small-yanta",
    side: "island",
    neighbours: ["city-wall-steles", "qujiang-yanta"],
    name: t("Small Wild Goose & Xi'an Museum", "小雁塔与西安博物院", "소안탑·시안박물원", "Pequena Pagoda y Museo de Xi'an"),
  },
  {
    id: "qujiang-yanta",
    side: "island",
    neighbours: ["small-yanta", "east-parks", "lintong-east"],
    name: t("Qujiang & Big Wild Goose Pagoda", "曲江与大雁塔", "취장·대안탑", "Qujiang y Gran Pagoda del Ganso Salvaje"),
  },
  {
    id: "east-parks",
    side: "island",
    neighbours: ["qujiang-yanta", "lintong-east"],
    name: t("East Xi'an Parks & Banpo", "西安东部公园与半坡", "시안 동부 공원·반포", "Parques del este y Banpo"),
  },
  {
    id: "lintong-east",
    side: "island",
    neighbours: ["qujiang-yanta", "east-parks"],
    name: t("Lintong Heritage", "临潼遗产片区", "린퉁 유산 지구", "Patrimonio de Lintong"),
  },
]

const places: Place[] = [
  // Bell & Drum Tower Core
  {
    id: "bell-tower",
    name: t("Bell Tower of Xi'an", "西安钟楼", "시안 종루", "Torre de la Campana de Xi'an"),
    localName: "西安钟楼",
    clusterId: "bell-drum-core",
    coordinates: { lat: 34.261, lng: 108.9464, precision: "site" },
    categories: ["iconic", "photo", "culture"],
    summary: t(
      "A Ming-dynasty bell tower at the crossing of Xi'an's main north-south and east-west streets. It is the clearest central landmark for reading the old walled city.",
      "明代钟楼，位于西安南北、东西主轴交会处。它是理解老城格局最清楚的中心地标。",
      "명대 종루로, 시안의 남북·동서 중심축이 만나는 지점에 있습니다. 옛 성곽 도시를 읽는 가장 분명한 중심 표식입니다.",
      "Torre de campana de la dinastia Ming en el cruce de los ejes norte-sur y este-oeste de Xi'an. Es el hito central mas claro para leer la ciudad amurallada."
    ),
    sources: [wikipedia("Bell Tower of Xi'an", "Bell_Tower_of_Xi%27an"), wikidata("Q812609")],
    visitMinutes: { min: 20, max: 45 },
    bestTime: "evening",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "drum-tower",
    name: t("Drum Tower of Xi'an", "西安鼓楼", "시안 고루", "Torre del Tambor de Xi'an"),
    localName: "西安鼓楼",
    clusterId: "bell-drum-core",
    coordinates: { lat: 34.2601, lng: 108.9436, precision: "site" },
    categories: ["iconic", "photo", "culture"],
    summary: t(
      "A historic drum tower just northwest of the Bell Tower. Together the Bell and Drum towers anchor the old-city centre and mark the start of many walks into the Muslim Quarter.",
      "位于钟楼西北侧的历史鼓楼。钟楼与鼓楼共同锚定老城中心，也是许多人走进回民街的起点。",
      "종루 북서쪽의 역사적인 고루입니다. 종루와 고루는 함께 구도심 중심을 잡아 주며, 무슬림 거리로 들어가는 출발점이 되곤 합니다.",
      "Torre historica del tambor al noroeste de la Torre de la Campana. Juntas fijan el centro antiguo y suelen iniciar los paseos hacia el barrio musulman."
    ),
    sources: [wikipedia("Drum Tower of Xi'an", "Drum_Tower_of_Xi%27an"), wikidata("Q5308489")],
    visitMinutes: { min: 15, max: 35 },
    bestTime: "evening",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },

  // Muslim Quarter & Great Mosque
  {
    id: "muslim-quarter",
    name: t("Muslim Quarter", "回民街", "무슬림 거리", "Barrio musulman"),
    localName: "回民街 / 北院门",
    clusterId: "muslim-quarter",
    coordinates: { lat: 34.263, lng: 108.9418, precision: "area" },
    categories: ["food", "local", "night"],
    summary: t(
      "A dense food and market area north of the Drum Tower, tied to Xi'an's Hui Muslim community. It works best as a street-food stop, not as a quiet monument visit.",
      "鼓楼以北密集的小吃与市集街区，与西安回族穆斯林社区相关。这里更适合作为街头饮食体验，而不是安静的古迹参观。",
      "고루 북쪽의 빽빽한 음식·시장 거리로, 시안의 후이족 무슬림 공동체와 이어져 있습니다. 조용한 유적보다 길거리 음식 장소로 보는 편이 맞습니다.",
      "Zona densa de comida y mercado al norte de la Torre del Tambor, ligada a la comunidad musulmana hui de Xi'an. Funciona mejor como parada de comida callejera que como monumento tranquilo."
    ),
    sources: [wikipedia("Xi'an", "Xi%27an"), wikidata("Q5826")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "evening",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "moderate",
  },
  {
    id: "great-mosque",
    name: t("Great Mosque of Xi'an", "西安化觉巷清真大寺", "시안 대청진사", "Gran Mezquita de Xi'an"),
    localName: "化觉巷清真大寺",
    clusterId: "muslim-quarter",
    coordinates: { lat: 34.2602, lng: 108.9389, precision: "site" },
    categories: ["culture", "photo", "local"],
    summary: t(
      "A historic mosque inside the Muslim Quarter, known for Chinese courtyard architecture rather than a Middle Eastern dome-and-minaret profile. It shows how Islam has been part of Xi'an's trading-city history.",
      "回民街内的历史清真寺，以中国院落式建筑闻名，而不是中东式穹顶与宣礼塔形态。它能看出伊斯兰文化如何进入西安这座贸易城市的历史。",
      "무슬림 거리 안의 역사적인 모스크로, 중동식 돔과 미나렛보다 중국식 뜰 건축으로 알려졌습니다. 이슬람 문화가 교역 도시 시안의 역사에 들어온 방식을 보여 줍니다.",
      "Mezquita historica dentro del barrio musulman, conocida por su arquitectura de patios chinos mas que por cupulas y alminares de Oriente Medio. Muestra como el islam entro en la historia comercial de Xi'an."
    ),
    sources: [wikipedia("Great Mosque of Xi'an", "Great_Mosque_of_Xi%27an"), wikidata("Q953472")],
    visitMinutes: { min: 35, max: 70 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },

  // City Wall & Stone Steles
  {
    id: "xian-city-wall",
    name: t("Fortifications of Xi'an", "西安城墙", "시안 성벽", "Muralla de Xi'an"),
    localName: "西安城墙",
    clusterId: "city-wall-steles",
    coordinates: { lat: 34.2569, lng: 108.9509, precision: "area" },
    categories: ["iconic", "photo", "culture"],
    summary: t(
      "The preserved city wall around central Xi'an, rebuilt and maintained on Ming foundations. It frames the old city and gives a rare elevated view over a Chinese city grid.",
      "环绕西安中心城区的保存城墙，主要在明代基础上重修并维护。它界定老城边界，也提供少见的中国城市棋盘格高处视角。",
      "시안 중심부를 둘러싼 보존 성벽으로, 명대 기초 위에 다시 세우고 관리해 왔습니다. 구도심의 경계를 만들며 중국 도시 격자를 높은 곳에서 볼 수 있습니다.",
      "Muralla conservada alrededor del centro de Xi'an, reconstruida y mantenida sobre bases Ming. Enmarca la ciudad antigua y ofrece una vista elevada poco comun de la cuadricula urbana china."
    ),
    sources: [wikipedia("Fortifications of Xi'an", "Fortifications_of_Xi%27an"), wikidata("Q1434884")],
    visitMinutes: { min: 60, max: 120 },
    bestTime: "sunset",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "moderate",
  },
  {
    id: "yongning-gate",
    name: t("Yongning Gate", "永宁门", "영녕문", "Puerta Yongning"),
    localName: "永宁门",
    clusterId: "city-wall-steles",
    coordinates: { lat: 34.2518, lng: 108.9472, precision: "site" },
    categories: ["photo", "culture", "iconic"],
    summary: t(
      "The south gate of the Xi'an City Wall, often used as the most convenient entry point to the wall experience. It connects the old-city grid with the north-south urban axis.",
      "西安城墙南门，常作为体验城墙最方便的入口。它把老城棋盘格与城市南北轴线连在一起。",
      "시안 성벽의 남문으로, 성벽을 체험하기 가장 편한 입구로 많이 쓰입니다. 구도심 격자와 도시 남북축을 이어 줍니다.",
      "Puerta sur de la muralla de Xi'an, a menudo el acceso mas practico para vivir la muralla. Conecta la cuadricula antigua con el eje urbano norte-sur."
    ),
    sources: [wikipedia("Fortifications of Xi'an", "Fortifications_of_Xi%27an"), wikidata("Q1434884")],
    visitMinutes: { min: 25, max: 50 },
    bestTime: "sunset",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "moderate",
  },
  {
    id: "stele-forest",
    name: t("Forest of Stone Steles Museum", "西安碑林博物馆", "시안 비림박물관", "Museo Bosque de Estelas"),
    localName: "西安碑林博物馆",
    clusterId: "city-wall-steles",
    coordinates: { lat: 34.2531, lng: 108.9531, precision: "site" },
    categories: ["culture", "photo"],
    summary: t(
      "A museum built around a major collection of stone steles, calligraphy and carved records. It is one of the best stops for seeing Xi'an as a city of written history, not only imperial ruins.",
      "以大量石碑、书法与刻石文献为核心的博物馆。它很适合把西安看成文字史之城，而不只是帝王遗址之城。",
      "많은 석비, 서예, 새겨진 기록을 중심으로 한 박물관입니다. 시안을 황제 유적만이 아니라 문자 역사 도시로 보게 해 주는 좋은 장소입니다.",
      "Museo basado en una gran coleccion de estelas, caligrafia y registros tallados. Ayuda a ver Xi'an como ciudad de historia escrita, no solo de ruinas imperiales."
    ),
    sources: [wikipedia("Stele Forest", "Stele_Forest"), wikidata("Q1210451")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },

  // Small Wild Goose & Xi'an Museum
  {
    id: "small-wild-goose-pagoda",
    name: t("Small Wild Goose Pagoda", "小雁塔", "소안탑", "Pequena Pagoda del Ganso Salvaje"),
    localName: "小雁塔",
    clusterId: "small-yanta",
    coordinates: { lat: 34.242, lng: 108.9423, precision: "site" },
    categories: ["culture", "photo", "iconic"],
    summary: t(
      "A Tang-dynasty Buddhist pagoda in the Jianfu Temple area. It is quieter and lower than the Giant Wild Goose Pagoda, which makes it a good slower counterpoint to Qujiang.",
      "荐福寺区域内的唐代佛塔。它比大雁塔更安静、更低调，适合作为曲江热闹景区之外的慢节奏对照。",
      "천복사 권역의 당대 불탑입니다. 대안탑보다 조용하고 낮아, 취장의 북적임과 다른 느린 대비가 됩니다.",
      "Pagoda budista de la dinastia Tang en el area del templo Jianfu. Es mas tranquila y baja que la Gran Pagoda, un contrapunto pausado frente a Qujiang."
    ),
    sources: [wikipedia("Small Wild Goose Pagoda", "Small_Wild_Goose_Pagoda"), wikidata("Q2298737")],
    visitMinutes: { min: 40, max: 75 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "xian-museum",
    name: t("Xi'an Museum", "西安博物院", "시안박물원", "Museo de Xi'an"),
    localName: "西安博物院",
    clusterId: "small-yanta",
    coordinates: { lat: 34.2412, lng: 108.9411, precision: "site" },
    categories: ["culture", "local"],
    summary: t(
      "A city museum beside the Small Wild Goose Pagoda, combining exhibits with the surrounding temple garden. It is useful for a calmer introduction before the larger Shaanxi History Museum.",
      "位于小雁塔旁的城市博物院，展陈与寺院园林连在一起。它适合在更大型的陕西历史博物馆之前，先做一次更从容的城市导入。",
      "소안탑 옆의 시립 박물관으로, 전시와 사찰 정원이 함께 있습니다. 더 큰 섬서역사박물관 전에 차분하게 도시를 이해하기 좋습니다.",
      "Museo de ciudad junto a la Pequena Pagoda, con salas y jardin de templo. Sirve como introduccion mas calmada antes del gran Museo de Historia de Shaanxi."
    ),
    sources: [wikipedia("Xi'an Museum", "Xi%27an_Museum"), wikidata("Q8041302")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },

  // Qujiang & Big Wild Goose Pagoda
  {
    id: "giant-wild-goose-pagoda",
    name: t("Giant Wild Goose Pagoda", "大雁塔", "대안탑", "Gran Pagoda del Ganso Salvaje"),
    localName: "大雁塔",
    clusterId: "qujiang-yanta",
    coordinates: { lat: 34.2193, lng: 108.9593, precision: "site" },
    categories: ["iconic", "culture", "photo"],
    summary: t(
      "A famous Tang-dynasty Buddhist pagoda associated with the monk Xuanzang and the translation of Buddhist scriptures. It is the anchor of Xi'an's south-side visitor district.",
      "著名唐代佛塔，与玄奘法师和佛经翻译历史相关。它是西安南部游客片区的核心锚点。",
      "현장 법사와 불경 번역 역사와 연결되는 유명한 당대 불탑입니다. 시안 남쪽 방문자 지구의 핵심 축입니다.",
      "Famosa pagoda budista Tang asociada al monje Xuanzang y la traduccion de escrituras. Es el ancla del distrito visitante del sur de Xi'an."
    ),
    sources: [wikipedia("Giant Wild Goose Pagoda", "Giant_Wild_Goose_Pagoda"), wikidata("Q591850")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "sunset",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "dacien-temple",
    name: t("Da Ci'en Temple", "大慈恩寺", "대자은사", "Templo Da Ci'en"),
    localName: "大慈恩寺",
    clusterId: "qujiang-yanta",
    coordinates: { lat: 34.2188, lng: 108.959, precision: "site" },
    categories: ["culture", "iconic"],
    summary: t(
      "The Buddhist temple complex that contains the Giant Wild Goose Pagoda. Treating the temple and pagoda together makes the site feel less like a single tower photo and more like a Tang religious landscape.",
      "大雁塔所在的佛教寺院群。把寺院与塔放在一起看，会让这里不只是单张塔照，而更像一处唐代宗教空间。",
      "대안탑을 품은 불교 사찰 단지입니다. 사찰과 탑을 함께 보면 단순한 탑 사진이 아니라 당대 종교 공간으로 느껴집니다.",
      "Complejo budista que contiene la Gran Pagoda. Ver templo y pagoda juntos evita que sea solo una foto de torre y lo convierte en paisaje religioso Tang."
    ),
    sources: [wikipedia("Da Ci'en Temple", "Da_Ci%27en_Temple"), wikidata("Q5202535")],
    visitMinutes: { min: 35, max: 70 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "shaanxi-history-museum",
    name: t("Shaanxi History Museum", "陕西历史博物馆", "섬서역사박물관", "Museo de Historia de Shaanxi"),
    localName: "陕西历史博物馆",
    clusterId: "qujiang-yanta",
    coordinates: { lat: 34.2222, lng: 108.9533, precision: "site" },
    categories: ["culture", "iconic"],
    summary: t(
      "A major provincial museum near the Giant Wild Goose Pagoda, with collections from Shaanxi and earlier capitals in the region. Book time for it; this is not a quick lobby stop.",
      "大雁塔附近的重要省级博物馆，收藏陕西及历代都城相关文物。要给它留时间；这不是进大厅看一眼就走的点。",
      "대안탑 근처의 주요 성급 박물관으로, 섬서와 이 지역 옛 수도들의 유물을 소장합니다. 로비만 보고 나오는 장소가 아니니 시간을 잡아야 합니다.",
      "Gran museo provincial cerca de la Gran Pagoda, con colecciones de Shaanxi y antiguas capitales de la region. Reserva tiempo: no es una parada rapida de vestibulo."
    ),
    sources: [wikipedia("Shaanxi History Museum", "Shaanxi_History_Museum"), wikidata("Q7487414")],
    visitMinutes: { min: 90, max: 150 },
    bestTime: "any",
    setting: "indoor",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "datang-everbright-city",
    name: t("Datang Everbright City", "大唐不夜城", "대당불야성", "Datang Everbright City"),
    localName: "大唐不夜城",
    clusterId: "qujiang-yanta",
    coordinates: { lat: 34.2165, lng: 108.965, precision: "area" },
    categories: ["night", "photo", "local"],
    summary: t(
      "A pedestrian entertainment area south of the Giant Wild Goose Pagoda, themed around Tang-style public space and evening light. Use it as an evening stroll after the museum-and-pagoda part of Qujiang.",
      "大雁塔以南的步行娱乐街区，以唐风公共空间和夜间灯光为主题。适合放在曲江博物馆与塔之后，作为傍晚散步。",
      "대안탑 남쪽의 보행자 엔터테인먼트 구역으로, 당풍 공공 공간과 야간 조명이 중심입니다. 취장의 박물관·탑 일정 뒤 저녁 산책으로 쓰기 좋습니다.",
      "Zona peatonal de ocio al sur de la Gran Pagoda, tematizada con espacio publico de estilo Tang y luces nocturnas. Encaja como paseo de tarde tras museo y pagoda."
    ),
    sources: [wikipedia("Xi'an", "Xi%27an"), wikidata("Q5826")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "evening",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "tang-paradise",
    name: t("Tang Paradise", "大唐芙蓉园", "대당부용원", "Tang Paradise"),
    localName: "大唐芙蓉园",
    clusterId: "qujiang-yanta",
    coordinates: { lat: 34.2117, lng: 108.9742, precision: "area" },
    categories: ["culture", "photo", "night"],
    summary: t(
      "A large Tang-themed cultural park in the Qujiang area, southeast of the Giant Wild Goose Pagoda. It works as a landscaped extension of the Tang-imagery district rather than a core ancient ruin.",
      "曲江区域的大型唐文化主题园，位于大雁塔东南。它更像唐风意象街区的园林延伸，而不是核心古代遗址。",
      "대안탑 남동쪽 취장 지역의 큰 당 문화 테마 공원입니다. 핵심 고대 유적이라기보다 당 이미지 지구의 조경 확장으로 보는 편이 맞습니다.",
      "Gran parque cultural de tema Tang en Qujiang, al sureste de la Gran Pagoda. Funciona como extension paisajistica del distrito de imaginario Tang, no como ruina antigua central."
    ),
    sources: [wikipedia("Tang Paradise", "Tang_Paradise"), wikidata("Q7685275")],
    visitMinutes: { min: 60, max: 120 },
    bestTime: "evening",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "moderate",
  },

  // East Xi'an Parks & Banpo
  {
    id: "xingqing-palace-park",
    name: t("Xingqing Palace Park", "兴庆宫公园", "흥경궁공원", "Parque del Palacio Xingqing"),
    localName: "兴庆宫公园",
    clusterId: "east-parks",
    coordinates: { lat: 34.2528, lng: 108.9897, precision: "area" },
    categories: ["local", "nature", "culture"],
    summary: t(
      "A public park on the site associated with Xingqing Palace of the Tang dynasty. It gives a softer, more local east-side pause between the old city and Banpo or Qujiang.",
      "与唐代兴庆宫遗址相关的公共公园。它在老城、半坡与曲江之间提供一个更日常、更柔和的东部停顿。",
      "당대 흥경궁과 관련된 자리의 공원입니다. 구도심과 반포 또는 취장 사이에서 더 일상적이고 부드러운 동쪽 쉼표가 됩니다.",
      "Parque publico en el sitio asociado al Palacio Xingqing de la dinastia Tang. Da una pausa local y suave entre la ciudad antigua, Banpo y Qujiang."
    ),
    sources: [wikipedia("Xingqing Palace", "Xingqing_Palace"), wikidata("Q8048128")],
    visitMinutes: { min: 35, max: 70 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "banpo-museum",
    name: t("Banpo Museum", "半坡博物馆", "반포박물관", "Museo Banpo"),
    localName: "半坡博物馆",
    clusterId: "east-parks",
    coordinates: { lat: 34.2794, lng: 109.056, precision: "site" },
    categories: ["culture", "local"],
    summary: t(
      "A museum at the Banpo Neolithic site east of central Xi'an. It shifts the city story earlier than the imperial capital period, toward prehistoric settlement and archaeology.",
      "位于西安城东半坡新石器时代遗址上的博物馆。它把西安故事从帝都时期往前推到史前聚落与考古。",
      "시안 동쪽 반포 신석기 유적의 박물관입니다. 시안의 이야기를 제국 수도 이전의 선사 취락과 고고학으로 앞당겨 줍니다.",
      "Museo en el sitio neolitico de Banpo, al este del centro de Xi'an. Desplaza la historia antes de la capital imperial, hacia asentamiento prehistorico y arqueologia."
    ),
    sources: [wikipedia("Banpo", "Banpo"), wikidata("Q806293")],
    visitMinutes: { min: 50, max: 90 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },

  // Lintong Heritage
  {
    id: "terracotta-army",
    name: t("Terracotta Army", "秦始皇帝陵博物院兵马俑", "병마용", "Ejercito de terracota"),
    localName: "秦始皇帝陵博物院",
    clusterId: "lintong-east",
    coordinates: { lat: 34.3841, lng: 109.2785, precision: "site" },
    categories: ["iconic", "culture", "photo"],
    summary: t(
      "The excavated terracotta soldiers and horses associated with the Mausoleum of the First Qin Emperor, in Lintong east of central Xi'an. Treat it as a bus or taxi trip from the city, not a short walk from the Bell Tower.",
      "位于西安市区以东临潼、与秦始皇陵相关的兵马俑坑。它应当按从城区公交或出租车前往的一段行程处理，不能写成从钟楼短距离步行。",
      "시안 도심 동쪽 린퉁에 있는 진시황릉 관련 병마용 갱입니다. 종루에서 짧게 걷는 곳이 아니라, 시내에서 버스나 택시로 가는 일정으로 봐야 합니다.",
      "Los soldados y caballos de terracota excavados junto al mausoleo del Primer Emperador Qin, en Lintong al este de Xi'an. Es un viaje en bus o taxi desde la ciudad, no un paseo corto desde la Torre de la Campana."
    ),
    sources: [wikipedia("Terracotta Army", "Terracotta_Army"), wikidata("Q161061")],
    visitMinutes: { min: 120, max: 180 },
    bestTime: "morning",
    setting: "mixed",
    weatherSensitive: false,
    walking: "moderate",
  },
  {
    id: "qin-mausoleum",
    name: t("Mausoleum of the First Qin Emperor", "秦始皇陵", "진시황릉", "Mausoleo del primer emperador Qin"),
    localName: "秦始皇陵",
    clusterId: "lintong-east",
    coordinates: { lat: 34.3816, lng: 109.254, precision: "area" },
    categories: ["culture", "iconic"],
    summary: t(
      "The broader mausoleum landscape of Qin Shi Huang near the Terracotta Army pits. It is important context for the museum: the warriors are part of a much larger burial complex.",
      "兵马俑坑附近更大的秦始皇陵区。它是理解博物院的重要背景：兵马俑只是更大陵寝体系的一部分。",
      "병마용 갱 근처의 더 넓은 진시황릉 경관입니다. 병마용은 훨씬 큰 능묘 복합체의 일부라는 맥락을 줍니다.",
      "Paisaje funerario mas amplio de Qin Shi Huang cerca de los fosos de terracota. Da contexto: los guerreros son parte de un complejo mucho mayor."
    ),
    sources: [wikipedia("Mausoleum of the First Qin Emperor", "Mausoleum_of_the_First_Qin_Emperor"), wikidata("Q484746")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "moderate",
  },
  {
    id: "huaqing-pool",
    name: t("Huaqing Pool", "华清池", "화청지", "Piscina Huaqing"),
    localName: "华清池 / 华清宫",
    clusterId: "lintong-east",
    coordinates: { lat: 34.3615, lng: 109.2143, precision: "area" },
    categories: ["culture", "photo", "nature"],
    summary: t(
      "A historic hot-spring palace site at the foot of Mount Li in Lintong. It pairs naturally with the Terracotta Army only by bus or taxi, not by an old-city walking route.",
      "临潼骊山脚下的历史温泉宫苑遗址。它可以与兵马俑同日安排，但应靠公交或出租车连接，而不是老城步行线。",
      "린퉁 여산 기슭의 역사적인 온천 궁원 유적입니다. 병마용과 같은 날 묶기 좋지만, 구도심 도보가 아니라 버스나 택시로 잇는 장소입니다.",
      "Sitio historico de palacio termal al pie del monte Li, en Lintong. Combina con el Ejercito de terracota por bus o taxi, no por una ruta a pie desde la ciudad antigua."
    ),
    sources: [wikipedia("Huaqing Pool", "Huaqing_Pool"), wikidata("Q829743")],
    visitMinutes: { min: 60, max: 100 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "moderate",
  },
  {
    id: "mount-li",
    name: t("Mount Li", "骊山", "여산", "Monte Li"),
    localName: "骊山",
    clusterId: "lintong-east",
    coordinates: { lat: 34.359, lng: 109.21, precision: "area" },
    categories: ["nature", "photo", "culture"],
    summary: t(
      "The mountain above Huaqing Pool in Lintong, long associated with palace and mausoleum landscapes east of Xi'an. It adds topography to a day that can otherwise feel like only museum halls.",
      "临潼华清池上方的山体，长期与西安以东的宫苑和陵寝景观相关。它能给容易变成纯展馆日的行程加入地形感。",
      "린퉁 화청지 위의 산으로, 시안 동쪽 궁원과 능묘 경관과 오래 연결되어 있습니다. 전시실만 보는 하루에 지형감을 더해 줍니다.",
      "Montana sobre Huaqing Pool en Lintong, asociada durante mucho tiempo a paisajes de palacio y mausoleo al este de Xi'an. Anade relieve a un dia que puede volverse solo museos."
    ),
    sources: [wikipedia("Mount Li", "Mount_Li"), wikidata("Q1959828")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "steep",
  },
]

const cardPhoto = (alt: CityText): CityPhoto => ({
  src: "https://images.unsplash.com/photo-1586016413664-864c0dd76f53?auto=format&fit=crop&w=1600&q=80",
  width: 1600,
  height: 1067,
  alt,
  credit: {
    label: t("Unsplash", "Unsplash", "Unsplash", "Unsplash"),
    href: "https://unsplash.com/",
  },
})

const photos = {
  essentials: cardPhoto(
    t(
      "Xi'an city guide hero image with historic Chinese architecture",
      "西安城市指南主图：历史建筑",
      "역사 건축이 있는 시안 도시 가이드 이미지",
      "Imagen guia de Xi'an con arquitectura historica china"
    )
  ),
  photo: cardPhoto(
    t(
      "Xi'an photo route image with evening historic architecture",
      "西安拍照路线图片：夜色中的历史建筑",
      "저녁 역사 건축이 있는 시안 사진 코스 이미지",
      "Imagen de ruta fotografica de Xi'an con arquitectura historica al atardecer"
    )
  ),
  local: cardPhoto(
    t(
      "Xi'an local route image for museums, parks and food streets",
      "西安在地路线图片：博物馆、公园与小吃街",
      "박물관, 공원, 음식 거리를 위한 시안 로컬 코스 이미지",
      "Imagen de ruta local de Xi'an para museos, parques y calles de comida"
    )
  ),
}

// Reference routes (ADR 0008 §3). Hand-authored, never generated. Times are estimates.
// Reasons are editorial; any fact inside them must already be in a place summary above.
// Lintong stops are intentionally bus / taxi legs from the city; they are not walkable from the Bell Tower core.
const routes: TravelRoute[] = [
  {
    id: "essentials",
    theme: "essentials",
    photo: photos.essentials,
    name: t("Xi'an Essentials", "西安经典一日", "시안 핵심 코스", "Xi'an esencial"),
    description: t(
      "Read the old city first: Bell and Drum towers, the Muslim Quarter, the city wall, the Stele Forest, then the Giant Wild Goose Pagoda in Qujiang.",
      "先读懂老城：钟鼓楼、回民街、城墙、碑林，再到曲江的大雁塔。",
      "구도심부터 읽습니다. 종루와 고루, 무슬림 거리, 성벽, 비림, 그리고 취장의 대안탑.",
      "Lee primero la ciudad antigua: torres de Campana y Tambor, barrio musulman, muralla, Bosque de Estelas y Gran Pagoda en Qujiang."
    ),
    estimatedDurationMinutes: 310,
    stops: [
      {
        placeId: "bell-tower",
        order: 1,
        estimatedVisitMinutes: 25,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Start at the old-city crossing so the grid has a centre before you enter the lanes.",
          "从老城轴线交会处开始，先给城市棋盘格找到中心，再进巷子。",
          "골목으로 들어가기 전, 구도심 축이 만나는 곳에서 시작해 도시 격자의 중심을 잡습니다.",
          "Empieza en el cruce de la ciudad antigua para que la cuadricula tenga centro antes de entrar en calles pequenas."
        ),
      },
      {
        placeId: "drum-tower",
        order: 2,
        estimatedVisitMinutes: 20,
        estimatedTravelMinutesFromPrevious: 5,
        transportMode: "walk",
        reason: t(
          "Walk to the paired tower before the food streets take over the rhythm.",
          "先走到成对的鼓楼，再让小吃街接管节奏。",
          "음식 거리가 리듬을 가져가기 전에 짝을 이루는 고루까지 걷습니다.",
          "Camina a la torre pareja antes de que las calles de comida marquen el ritmo."
        ),
      },
      {
        placeId: "great-mosque",
        order: 3,
        estimatedVisitMinutes: 45,
        estimatedTravelMinutesFromPrevious: 10,
        transportMode: "walk",
        reason: t(
          "Step from the Drum Tower into the Muslim Quarter, but anchor the stop in the courtyard mosque before snacks.",
          "从鼓楼进回民街，但先用清真寺院落给这一站定调，再吃小吃。",
          "고루에서 무슬림 거리로 들어가되, 간식 전에 뜰이 있는 모스크에서 중심을 잡습니다.",
          "Entra desde la Torre del Tambor al barrio musulman, pero ancla la parada en la mezquita antes de los snacks."
        ),
      },
      {
        placeId: "xian-city-wall",
        order: 4,
        estimatedVisitMinutes: 60,
        estimatedTravelMinutesFromPrevious: 15,
        transportMode: "taxi",
        reason: t(
          "Use a short taxi to the wall instead of forcing a cross-centre walk through traffic.",
          "短程打车到城墙，不把穿越车流的市中心硬走塞进路线。",
          "교통을 뚫고 도심을 억지로 걷지 말고 짧게 택시로 성벽까지 갑니다.",
          "Usa un taxi corto hasta la muralla en vez de forzar una caminata por trafico central."
        ),
      },
      {
        placeId: "stele-forest",
        order: 5,
        estimatedVisitMinutes: 45,
        estimatedTravelMinutesFromPrevious: 10,
        transportMode: "walk",
        reason: t(
          "Walk inside the south wall area to switch from city-scale wall to stone records and calligraphy.",
          "在南城墙内侧步行，把视角从城市尺度的城墙切到石刻与书法。",
          "남쪽 성벽 안쪽을 걸어 도시 규모의 성벽에서 석각 기록과 서예로 시점을 바꿉니다.",
          "Camina por la zona de la muralla sur para pasar de escala urbana a estelas y caligrafia."
        ),
      },
      {
        placeId: "giant-wild-goose-pagoda",
        order: 6,
        estimatedVisitMinutes: 50,
        estimatedTravelMinutesFromPrevious: 25,
        transportMode: "mtr",
        reason: t(
          "Ride south to Qujiang for the pagoda instead of backtracking in the old city.",
          "坐地铁向南到曲江看大雁塔，不在老城里折返。",
          "구도심에서 되돌지 말고 지하철로 남쪽 취장의 대안탑까지 갑니다.",
          "Toma metro al sur hacia Qujiang para la pagoda, sin volver atras por la ciudad antigua."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "It follows a clear first-day spine: centre towers, Muslim Quarter, south wall, then Qujiang.",
        "它按第一天最清楚的主线走：中心钟鼓楼、回民街、南城墙，再到曲江。",
        "첫날의 분명한 축을 따릅니다. 중심 종고루, 무슬림 거리, 남쪽 성벽, 취장.",
        "Sigue una columna clara de primer dia: torres centrales, barrio musulman, muralla sur y Qujiang."
      ),
      t(
        "Walking stays local, while longer hops use taxi or metro.",
        "步行只放在局部，长距离用出租车或地铁。",
        "걷기는 가까운 곳에 두고, 긴 이동은 택시나 지하철을 씁니다.",
        "La caminata queda local; los saltos largos usan taxi o metro."
      ),
      t(
        "It leaves Lintong for another route so the Terracotta Army is not treated as downtown.",
        "它把临潼留给另一条线，避免把兵马俑误当成市中心景点。",
        "린퉁은 다른 코스로 남겨 병마용을 도심 명소처럼 다루지 않습니다.",
        "Deja Lintong para otra ruta, para no tratar el Ejercito de terracota como centro urbano."
      ),
    ],
    goodFor: [
      t("A first visit to Xi'an", "第一次来西安", "시안 첫 방문", "Primera visita a Xi'an"),
      t("Old city plus one south-side icon", "老城加一个南部地标", "구도심과 남쪽 대표 명소", "Ciudad antigua y un icono del sur"),
      t("Travellers who want history without a museum marathon", "想看历史但不想博物馆马拉松的人", "박물관 마라톤 없이 역사를 보고 싶은 여행자", "Quien quiere historia sin maraton de museos"),
    ],
    tradeoffs: [
      t(
        "It skips the Terracotta Army because Lintong deserves its own half-day logistics.",
        "不去兵马俑，因为临潼需要单独半天交通安排。",
        "병마용은 빠집니다. 린퉁은 따로 반나절 교통 계획이 필요합니다.",
        "Omite el Ejercito de terracota porque Lintong merece su propia logistica de medio dia."
      ),
      t(
        "The Muslim Quarter is busiest at night; daytime is easier but less atmospheric.",
        "回民街晚上最热闹；白天更好走，但气氛弱一些。",
        "무슬림 거리는 밤이 가장 붐빕니다. 낮은 걷기 쉽지만 분위기는 약합니다.",
        "El barrio musulman vive mas de noche; de dia es mas facil pero menos atmosferico."
      ),
      t(
        "Bad air or rain weakens the wall stop, so keep the Stele Forest as the indoor backup.",
        "空气差或下雨会削弱城墙体验，可把碑林当作室内备选重心。",
        "공기나 비가 성벽 경험을 약하게 만들면 비림을 실내 대안으로 두세요.",
        "Mal aire o lluvia debilitan la muralla; usa el Bosque de Estelas como respaldo interior."
      ),
    ],
  },
  {
    id: "photo",
    theme: "photo",
    photo: photos.photo,
    name: t("Photo Xi'an", "拍照西安", "사진으로 보는 시안", "Xi'an en fotos"),
    description: t(
      "Work from wall and towers into quieter pagodas, then end in Qujiang as Datang Everbright City lights up.",
      "从城墙与钟鼓楼拍起，转到更安静的小雁塔，再在大唐不夜城亮灯时收尾。",
      "성벽과 종고루에서 시작해 조용한 소안탑으로 옮기고, 대당불야성 조명이 켜질 때 마무리합니다.",
      "Empieza con muralla y torres, pasa a pagodas mas tranquilas y termina en Qujiang cuando se enciende Datang Everbright City."
    ),
    estimatedDurationMinutes: 375,
    stops: [
      {
        placeId: "xian-city-wall",
        order: 1,
        estimatedVisitMinutes: 50,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Start high on the wall for rooflines and the city grid before street crowds build.",
          "先上城墙拍屋顶线和城市格局，避开街面人潮起来之后。",
          "거리 인파가 늘기 전 성벽 위에서 지붕선과 도시 격자를 봅니다.",
          "Empieza alto en la muralla por tejados y cuadricula antes de que suban las multitudes."
        ),
      },
      {
        placeId: "bell-tower",
        order: 2,
        estimatedVisitMinutes: 25,
        estimatedTravelMinutesFromPrevious: 15,
        transportMode: "walk",
        reason: t(
          "Walk north to the central tower for a clean axis shot of old Xi'an.",
          "向北走到中心钟楼，拍老西安轴线感。",
          "북쪽 중심 종루까지 걸어 옛 시안의 축을 담습니다.",
          "Camina al norte a la torre central para una toma limpia del eje antiguo."
        ),
      },
      {
        placeId: "drum-tower",
        order: 3,
        estimatedVisitMinutes: 20,
        estimatedTravelMinutesFromPrevious: 5,
        transportMode: "walk",
        reason: t(
          "Shift west for the paired tower and denser street foregrounds.",
          "向西挪到成对的鼓楼，前景街道人流更密。",
          "서쪽의 짝을 이루는 고루로 옮겨 더 빽빽한 거리 전경을 잡습니다.",
          "Muévete al oeste por la torre pareja y primeros planos de calle mas densos."
        ),
      },
      {
        placeId: "small-wild-goose-pagoda",
        order: 4,
        estimatedVisitMinutes: 40,
        estimatedTravelMinutesFromPrevious: 20,
        transportMode: "taxi",
        reason: t(
          "Taxi south to a quieter pagoda so the set is not only bright central landmarks.",
          "打车向南到更安静的小雁塔，让照片不只是一组明亮中心地标。",
          "밝은 중심 명소만 남지 않도록 택시로 남쪽의 조용한 소안탑까지 갑니다.",
          "Taxi al sur a una pagoda mas tranquila para que la serie no sea solo hitos centrales brillantes."
        ),
      },
      {
        placeId: "shaanxi-history-museum",
        order: 5,
        estimatedVisitMinutes: 60,
        estimatedTravelMinutesFromPrevious: 20,
        transportMode: "bus",
        reason: t(
          "Continue toward Qujiang for a major museum stop before the evening street lights.",
          "继续去曲江方向，在夜间街灯之前先安排一个重要博物馆点。",
          "저녁 거리 조명 전에 주요 박물관을 보러 취장 쪽으로 이어갑니다.",
          "Sigue hacia Qujiang por un gran museo antes de las luces de noche."
        ),
      },
      {
        placeId: "datang-everbright-city",
        order: 6,
        estimatedVisitMinutes: 45,
        estimatedTravelMinutesFromPrevious: 17,
        transportMode: "walk",
        reason: t(
          "Walk into the evening pedestrian strip as the Tang-themed lights take over.",
          "步行进夜间步行街，让唐风灯光接管画面。",
          "당풍 조명이 화면을 채울 때 저녁 보행 거리로 걸어 들어갑니다.",
          "Camina a la franja peatonal de tarde cuando las luces Tang toman la escena."
        ),
      },
      {
        placeId: "tang-paradise",
        order: 7,
        estimatedVisitMinutes: 45,
        estimatedTravelMinutesFromPrevious: 18,
        transportMode: "walk",
        reason: t(
          "End deeper in Qujiang for landscaped night frames instead of returning to the old city.",
          "在曲江更深处收尾，拍园林夜景，不折回老城。",
          "구도심으로 돌아가지 말고 취장 안쪽의 조경 야경으로 마무리합니다.",
          "Termina mas dentro de Qujiang con encuadres nocturnos ajardinados, sin volver a la ciudad antigua."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "It follows the light: wall texture, central towers, quiet pagoda, then Qujiang at night.",
        "顺着光线走：城墙质感、中心楼阁、安静佛塔，再到夜晚曲江。",
        "빛을 따라갑니다. 성벽 질감, 중심 누각, 조용한 탑, 밤의 취장.",
        "Sigue la luz: textura de muralla, torres centrales, pagoda tranquila y Qujiang de noche."
      ),
      t(
        "The route moves south and east without returning to a cluster.",
        "路线向南、向东推进，不回到已离开的片区。",
        "코스는 남쪽과 동쪽으로 움직이며 떠난 클러스터로 돌아가지 않습니다.",
        "La ruta avanza al sur y al este sin regresar a un cluster ya dejado."
      ),
      t(
        "Long links use taxi or bus; only close Qujiang stops are walked.",
        "长距离用出租车或公交；只有曲江近距离点步行。",
        "긴 구간은 택시나 버스, 가까운 취장 지점만 걷습니다.",
        "Los enlaces largos usan taxi o bus; solo se caminan paradas cercanas en Qujiang."
      ),
    ],
    goodFor: [
      t("Travelling with a camera", "带相机出门", "카메라를 들고 다니는 여행", "Viajar con camara"),
      t("Wall, pagoda and night-light photos", "城墙、佛塔与夜景灯光", "성벽, 탑, 야간 조명 사진", "Fotos de muralla, pagoda y luces nocturnas"),
      t("A second day after Essentials", "经典路线后的第二天", "핵심 코스 다음 날", "Un segundo dia tras la ruta esencial"),
    ],
    tradeoffs: [
      t(
        "This is an outdoor-heavy route; rain weakens the wall and Qujiang stops.",
        "这条线户外很多；下雨会削弱城墙和曲江体验。",
        "야외가 많은 코스라 비가 오면 성벽과 취장이 약해집니다.",
        "Ruta muy exterior; la lluvia debilita muralla y Qujiang."
      ),
      t(
        "It spends little time on food. Add the Muslim Quarter separately if dinner matters most.",
        "吃饭时间不多。若晚餐最重要，就另外加回民街。",
        "식사 시간이 적습니다. 저녁이 가장 중요하면 무슬림 거리를 따로 넣으세요.",
        "Dedica poco tiempo a comida. Anade el barrio musulman aparte si la cena importa mas."
      ),
      t(
        "Datang Everbright City can feel staged; that is useful for photos but less quiet for history.",
        "大唐不夜城会有较强舞台感；适合拍照，但不是安静读史。",
        "대당불야성은 연출감이 강합니다. 사진에는 좋지만 조용히 역사를 읽는 곳은 아닙니다.",
        "Datang Everbright City puede sentirse escenica; sirve para fotos, menos para historia tranquila."
      ),
    ],
  },
  {
    id: "local",
    theme: "local",
    photo: photos.local,
    name: t("Local Xi'an", "在地西安", "로컬 시안", "Xi'an local"),
    description: t(
      "A slower eastward day: Xi'an Museum and Small Wild Goose Pagoda, Xingqing Palace Park, Banpo, then a Lintong heritage pair by taxi.",
      "更慢的向东一天：西安博物院与小雁塔、兴庆宫公园、半坡，再打车去临潼串联遗产点。",
      "동쪽으로 느리게 가는 하루입니다. 시안박물원과 소안탑, 흥경궁공원, 반포, 그리고 택시로 린퉁 유산 두 곳.",
      "Un dia mas lento hacia el este: Museo de Xi'an y Pequena Pagoda, parque Xingqing, Banpo y dos paradas patrimoniales de Lintong en taxi."
    ),
    estimatedDurationMinutes: 550,
    stops: [
      {
        placeId: "xian-museum",
        order: 1,
        estimatedVisitMinutes: 60,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Start with the city museum before the bigger and busier provincial museum circuit.",
          "先从城市博物院开始，再去面对更大、更忙的省级博物馆系统。",
          "더 크고 붐비는 성급 박물관 전에 시립 박물관에서 시작합니다.",
          "Empieza por el museo de ciudad antes del circuito provincial mas grande y lleno."
        ),
      },
      {
        placeId: "small-wild-goose-pagoda",
        order: 2,
        estimatedVisitMinutes: 40,
        estimatedTravelMinutesFromPrevious: 5,
        transportMode: "walk",
        reason: t(
          "Walk next door to the quieter Tang pagoda and keep the morning calm.",
          "走到旁边更安静的唐塔，让早晨保持从容。",
          "옆의 조용한 당대 탑으로 걸어가 오전을 차분하게 유지합니다.",
          "Camina al lado a la pagoda Tang mas tranquila y conserva una manana calmada."
        ),
      },
      {
        placeId: "xingqing-palace-park",
        order: 3,
        estimatedVisitMinutes: 45,
        estimatedTravelMinutesFromPrevious: 25,
        transportMode: "taxi",
        reason: t(
          "Taxi east to a park that feels more everyday than the main visitor strip.",
          "打车向东到更日常的公园，换掉主游客带的节奏。",
          "주요 관광지 리듬에서 벗어나 동쪽의 더 일상적인 공원으로 택시 이동합니다.",
          "Taxi al este a un parque mas cotidiano que la franja turistica principal."
        ),
      },
      {
        placeId: "banpo-museum",
        order: 4,
        estimatedVisitMinutes: 60,
        estimatedTravelMinutesFromPrevious: 30,
        transportMode: "mtr",
        reason: t(
          "Continue east to Banpo so the day includes prehistoric Xi'an, not only Tang and Qin.",
          "继续向东到半坡，让这一天包含史前西安，而不只有唐与秦。",
          "동쪽 반포로 이어가 당과 진뿐 아니라 선사 시안도 넣습니다.",
          "Sigue al este a Banpo para incluir el Xi'an prehistorico, no solo Tang y Qin."
        ),
      },
      {
        placeId: "huaqing-pool",
        order: 5,
        estimatedVisitMinutes: 70,
        estimatedTravelMinutesFromPrevious: 45,
        transportMode: "taxi",
        reason: t(
          "Use a taxi for the Lintong jump. Huaqing adds palace-and-mountain context before the Qin sites.",
          "用出租车跳到临潼。华清池先给秦遗址前面加一层宫苑与山地背景。",
          "린퉁 이동은 택시를 씁니다. 화청지가 진 유적 전에 궁원과 산의 맥락을 더합니다.",
          "Usa taxi para saltar a Lintong. Huaqing aporta contexto de palacio y monte antes de los sitios Qin."
        ),
      },
      {
        placeId: "terracotta-army",
        order: 6,
        estimatedVisitMinutes: 150,
        estimatedTravelMinutesFromPrevious: 20,
        transportMode: "bus",
        reason: t(
          "Finish with the Terracotta Army as its own Lintong stop. It is the main event here, not a downtown add-on.",
          "在临潼以兵马俑收尾。它是这里的主事件，不是市中心顺手加的一站。",
          "린퉁의 병마용으로 마무리합니다. 도심에 덧붙이는 곳이 아니라 이곳의 핵심입니다.",
          "Termina con el Ejercito de terracota como parada propia de Lintong. Es el evento principal, no un anadido del centro."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "It moves steadily east: Small Wild Goose → Xingqing → Banpo → Lintong.",
        "路线稳定向东：小雁塔 → 兴庆宫 → 半坡 → 临潼。",
        "꾸준히 동쪽으로 갑니다. 소안탑 → 흥경궁 → 반포 → 린퉁.",
        "Avanza constantemente al este: Pequena Pagoda → Xingqing → Banpo → Lintong."
      ),
      t(
        "It separates local museum-and-park time from the headline Terracotta Army stop.",
        "把本地博物馆和公园时间，与兵马俑这个大标题分开安排。",
        "로컬 박물관·공원 시간과 대표 명소 병마용을 분리합니다.",
        "Separa tiempo local de museo y parque de la gran parada del Ejercito de terracota."
      ),
      t(
        "Lintong is handled by taxi and bus, which keeps the geography honest.",
        "临潼用出租车和公交连接，地理关系更诚实。",
        "린퉁은 택시와 버스로 처리해 지리를 정직하게 유지합니다.",
        "Lintong se maneja con taxi y bus, manteniendo honesta la geografia."
      ),
    ],
    goodFor: [
      t("A slower second or third day", "第二或第三天慢走", "둘째나 셋째 날 천천히", "Un segundo o tercer dia mas lento"),
      t("People who want Banpo and Lintong", "想看半坡与临潼的人", "반포와 린퉁을 보고 싶은 사람", "Quien quiere Banpo y Lintong"),
      t("Travellers comfortable with taxi legs", "能接受打车段的人", "택시 구간이 괜찮은 여행자", "Viajeros comodos con trayectos en taxi"),
    ],
    tradeoffs: [
      t(
        "This is a long day. If the Terracotta Army is the only must-see, go straight to Lintong and skip the first half.",
        "这是很长的一天。若只有兵马俑必看，就直接去临潼，跳过前半段。",
        "긴 하루입니다. 병마용만 필수라면 바로 린퉁으로 가고 앞부분은 빼세요.",
        "Es un dia largo. Si solo importa el Ejercito de terracota, ve directo a Lintong y omite la primera mitad."
      ),
      t(
        "Museum fatigue is real. Do not pair this with Shaanxi History Museum on the same day.",
        "博物馆疲劳会很真实。不要同一天再叠陕西历史博物馆。",
        "박물관 피로가 큽니다. 같은 날 섬서역사박물관까지 겹치지 마세요.",
        "La fatiga de museos es real. No lo combines el mismo dia con el Museo de Historia de Shaanxi."
      ),
      t(
        "Lintong traffic can stretch the taxi estimate, especially on holidays.",
        "临潼交通可能拉长出租车时间，节假日尤其明显。",
        "린퉁 교통은 택시 시간을 늘릴 수 있고, 특히 휴일에 그렇습니다.",
        "El trafico de Lintong puede alargar el taxi, sobre todo en festivos."
      ),
    ],
  },
]

export const xian: City = {
  slug: "xian",
  name: t("Xi'an", "西安", "시안", "Xi'an"),
  localName: "西安",
  country: t("China", "中国", "중국", "China"),
  intro: t(
    "Xi'an is the capital of Shaanxi province (陕西省), not Shanxi (山西). For travellers, the city reads in layers: the Ming city wall and Bell-Drum core, Muslim Quarter food streets, Tang-era pagodas in the south, and Lintong's Qin sites farther east by bus or taxi.",
    "西安是陕西省省会，不是山西。旅行时可按层次理解：明城墙与钟鼓楼核心、回民街小吃、城南唐代佛塔，以及更东边需要公交或出租车前往的临潼秦遗址。",
    "시안은 산시성(陕西省)의 성도이며, 산시성(山西)이 아닙니다. 여행자는 명대 성벽과 종고루 중심, 무슬림 거리 음식, 남쪽의 당대 탑, 그리고 버스나 택시로 가는 동쪽 린퉁의 진 유적으로 층을 나눠 보면 쉽습니다.",
    "Xi'an es la capital de la provincia de Shaanxi (陕西省), no de Shanxi (山西). Para viajar se lee por capas: muralla Ming y centro de torres, comida del barrio musulman, pagodas Tang al sur y sitios Qin de Lintong mas al este en bus o taxi."
  ),
  hero: {
    src: "https://images.unsplash.com/photo-1586016413664-864c0dd76f53?auto=format&fit=crop&w=1600&q=80",
    width: 1600,
    height: 1067,
    alt: t(
      "Xi'an historic architecture in warm evening light",
      "暖色夜光中的西安历史建筑",
      "따뜻한 저녁빛 속 시안 역사 건축",
      "Arquitectura historica de Xi'an con luz calida de tarde"
    ),
    credit: {
      label: t("Unsplash", "Unsplash", "Unsplash", "Unsplash"),
      href: "https://unsplash.com/",
    },
  },
  map: {
    // Small schematic Wei River ribbon north of the old city and Lintong points. Not for navigation.
    // Kept north of every place latitude so no place marker sits inside the polygon.
    water: [
      [108.86, 34.43],
      [108.94, 34.435],
      [109.04, 34.438],
      [109.16, 34.432],
      [109.28, 34.425],
      [109.28, 34.445],
      [109.16, 34.452],
      [109.04, 34.458],
      [108.94, 34.455],
      [108.86, 34.448],
    ],
    waterLabel: t("Wei River", "渭河", "웨이허", "Rio Wei"),
    waterLabelAt: [109.05, 34.446],
  },
  clusters,
  places,
  routes,
}
