import type { City, CityPhoto, CityText, Cluster, Place, Source, TravelRoute } from "./types"

// Singapore city layer (ADR 0008).
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
    id: "marina-bay",
    side: "island",
    neighbours: ["gardens-east", "civic-quay", "chinatown-telok"],
    name: t("Marina Bay", "滨海湾", "마리나 베이", "Marina Bay"),
  },
  {
    id: "gardens-east",
    side: "island",
    neighbours: ["marina-bay", "sentosa-south"],
    name: t("Gardens & Bayfront", "花园与湾畔", "가든스·베이프런트", "Jardines y Bayfront"),
  },
  {
    id: "civic-quay",
    side: "island",
    neighbours: ["marina-bay", "chinatown-telok", "orchard-botanic"],
    name: t("Civic District & Quays", "市政区与码头", "시빅 지구·키", "Distrito cívico y muelles"),
  },
  {
    id: "chinatown-telok",
    side: "island",
    neighbours: ["marina-bay", "civic-quay", "little-india-kampong"],
    name: t("Chinatown & Telok Ayer", "牛车水与直落亚逸", "차이나타운·텔록 아이어", "Chinatown y Telok Ayer"),
  },
  {
    id: "little-india-kampong",
    side: "island",
    neighbours: ["chinatown-telok", "orchard-botanic"],
    name: t("Little India & Kampong Glam", "小印度与甘榜格南", "리틀 인디아·캄퐁 글램", "Little India y Kampong Glam"),
  },
  {
    id: "orchard-botanic",
    side: "island",
    neighbours: ["civic-quay", "little-india-kampong", "sentosa-south"],
    name: t("Orchard & Botanic Gardens", "乌节与植物园", "오차드·보타닉 가든", "Orchard y Jardines Botánicos"),
  },
  {
    id: "sentosa-south",
    side: "island",
    neighbours: ["gardens-east", "orchard-botanic"],
    name: t("Sentosa & South Coast", "圣淘沙与南岸", "센토사·남부 해안", "Sentosa y costa sur"),
  },
]

const places: Place[] = [
  // -- Marina Bay --
  {
    id: "marina-bay-sands",
    name: t("Marina Bay Sands", "滨海湾金沙", "마리나 베이 샌즈", "Marina Bay Sands"),
    localName: "Marina Bay Sands",
    clusterId: "marina-bay",
    coordinates: { lat: 1.283333, lng: 103.860556, precision: "site" },
    categories: ["iconic", "photo"],
    summary: t(
      "A resort complex on Marina Bay, opened in 2010, best known for its three hotel towers joined by the rooftop SkyPark. Treat it here as an exterior landmark and viewpoint anchor rather than a shopping stop.",
      "滨海湾畔的综合度假区，2010 年开业，以三座酒店塔楼和顶部相连的空中花园最具辨识度。这里把它作为外观地标和观景锚点，而不是购物点。",
      "마리나 베이에 있는 복합 리조트로 2010년에 문을 열었고, 세 호텔 타워와 이를 잇는 옥상 스카이파크로 가장 잘 알려져 있습니다. 여기서는 쇼핑보다 외관 랜드마크와 전망 기준점으로 봅니다.",
      "Un complejo integrado frente a Marina Bay, abierto en 2010, famoso por sus tres torres de hotel unidas por el SkyPark. Aquí funciona como hito exterior y punto de vista, no como parada de compras."
    ),
    sources: [wikipedia("Marina Bay Sands", "Marina_Bay_Sands"), wikidata("Q552380")],
    visitMinutes: { min: 35, max: 75 },
    bestTime: "sunset",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "merlion-park",
    name: t("Merlion Park", "鱼尾狮公园", "멀라이언 파크", "Parque del Merlion"),
    localName: "Merlion Park",
    clusterId: "marina-bay",
    coordinates: { lat: 1.286789, lng: 103.854533, precision: "site" },
    categories: ["iconic", "photo"],
    summary: t(
      "The waterfront park holding Singapore's Merlion statue, a lion-headed fish-bodied symbol used by the tourism board. It faces Marina Bay and gives a clear line back to the skyline and Marina Bay Sands.",
      "滨水公园内有新加坡鱼尾狮雕像，这个狮头鱼身形象曾由旅游局用作城市象征。它面向滨海湾，可直接看回天际线和滨海湾金沙。",
      "싱가포르 관광청이 상징으로 사용한 사자 머리와 물고기 몸의 멀라이언 동상이 있는 수변 공원입니다. 마리나 베이를 마주해 스카이라인과 마리나 베이 샌즈를 바로 볼 수 있습니다.",
      "Parque frente al agua con la estatua del Merlion, símbolo de cuerpo de pez y cabeza de león usado por la oficina de turismo. Mira a Marina Bay y da una línea clara hacia el skyline y Marina Bay Sands."
    ),
    sources: [wikipedia("Merlion", "Merlion"), wikidata("Q860381")],
    visitMinutes: { min: 20, max: 40 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "helix-bridge",
    name: t("Helix Bridge", "螺旋桥", "헬릭스 브리지", "Puente Helix"),
    localName: "Helix Bridge",
    clusterId: "marina-bay",
    coordinates: { lat: 1.287722, lng: 103.859222, precision: "site" },
    categories: ["photo", "iconic"],
    summary: t(
      "A pedestrian bridge across the head of Marina Bay, opened in 2010. Its double-helix steel structure links Marina Centre with the Bayfront area and is strongest as a dusk or night photo walk.",
      "横跨滨海湾湾顶的人行桥，2010 年开放。双螺旋钢结构连接滨海中心与湾畔一带，黄昏或夜间步行拍照最有辨识度。",
      "마리나 베이 안쪽을 가로지르는 보행자 다리로 2010년에 개통했습니다. 이중 나선 철골 구조가 마리나 센터와 베이프런트를 잇고, 해질녘이나 밤 사진 산책에 강합니다.",
      "Puente peatonal en la cabecera de Marina Bay, abierto en 2010. Su estructura de acero en doble hélice une Marina Centre con Bayfront y funciona mejor como paseo fotográfico al anochecer."
    ),
    sources: [wikipedia("Helix Bridge", "Helix_Bridge"), wikidata("Q5706187")],
    visitMinutes: { min: 20, max: 40 },
    bestTime: "evening",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "singapore-flyer",
    name: t("Singapore Flyer", "新加坡摩天观景轮", "싱가포르 플라이어", "Singapore Flyer"),
    localName: "Singapore Flyer",
    clusterId: "marina-bay",
    coordinates: { lat: 1.289333, lng: 103.863667, precision: "site" },
    categories: ["photo", "iconic"],
    summary: t(
      "A giant observation wheel beside Marina Bay, opened to the public in 2008. Its capsules give elevated views over the bay, the downtown skyline and the Singapore Strait side of the city.",
      "滨海湾旁的大型观景摩天轮，2008 年对公众开放。座舱可俯瞰海湾、市中心天际线以及面向新加坡海峡的一侧。",
      "마리나 베이 옆의 대형 관람차로 2008년에 일반에 공개되었습니다. 캡슐에서는 베이, 도심 스카이라인, 싱가포르 해협 쪽 도시를 높이에서 볼 수 있습니다.",
      "Una gran noria de observación junto a Marina Bay, abierta al público en 2008. Sus cápsulas dan vistas elevadas de la bahía, el skyline del centro y el lado del estrecho de Singapur."
    ),
    sources: [wikipedia("Singapore Flyer", "Singapore_Flyer"), wikidata("Q170573")],
    visitMinutes: { min: 45, max: 75 },
    bestTime: "sunset",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },

  // -- Gardens & Bayfront --
  {
    id: "gardens-by-the-bay",
    name: t("Gardens by the Bay", "滨海湾花园", "가든스 바이 더 베이", "Gardens by the Bay"),
    localName: "Gardens by the Bay",
    clusterId: "gardens-east",
    coordinates: { lat: 1.281568, lng: 103.863613, precision: "area" },
    categories: ["iconic", "nature", "photo"],
    summary: t(
      "A large nature park on reclaimed land beside Marina Bay, opened in 2012. The Supertree Grove, cooled conservatories and waterfront gardens make it Singapore's clearest garden-city statement.",
      "滨海湾旁填海地上的大型自然公园，2012 年开放。擎天树丛、冷室温室和滨水花园，让这里成为新加坡「花园城市」形象最清楚的表达。",
      "마리나 베이 옆 매립지의 대형 자연 공원으로 2012년에 개장했습니다. 슈퍼트리 그로브, 냉방 온실, 수변 정원이 싱가포르의 정원 도시 이미지를 가장 선명하게 보여 줍니다.",
      "Un gran parque natural sobre terreno ganado al mar junto a Marina Bay, abierto en 2012. Supertree Grove, invernaderos climatizados y jardines frente al agua resumen la idea de ciudad jardín de Singapur."
    ),
    sources: [wikipedia("Gardens by the Bay", "Gardens_by_the_Bay"), wikidata("Q5533648")],
    visitMinutes: { min: 75, max: 150 },
    bestTime: "sunset",
    setting: "mixed",
    weatherSensitive: false,
    walking: "moderate",
  },
  {
    id: "flower-dome-cloud-forest",
    name: t("Flower Dome & Cloud Forest", "花穹与云雾林", "플라워 돔·클라우드 포레스트", "Flower Dome y Cloud Forest"),
    localName: "Flower Dome / Cloud Forest",
    clusterId: "gardens-east",
    coordinates: { lat: 1.2845, lng: 103.8644, precision: "site" },
    categories: ["nature", "photo", "culture"],
    summary: t(
      "The two cooled conservatories inside Gardens by the Bay. Flower Dome presents Mediterranean and semi-arid planting, while Cloud Forest is built around a tall indoor mountain and waterfall.",
      "滨海湾花园内的两座冷室温室。花穹展示地中海与半干旱植物景观，云雾林则围绕一座室内高山和瀑布展开。",
      "가든스 바이 더 베이 안의 두 냉방 온실입니다. 플라워 돔은 지중해와 반건조 식재를 보여 주고, 클라우드 포레스트는 높은 실내 산과 폭포를 중심으로 구성됩니다.",
      "Los dos conservatorios climatizados dentro de Gardens by the Bay. Flower Dome muestra plantas mediterráneas y semiáridas; Cloud Forest gira en torno a una montaña interior alta y una cascada."
    ),
    sources: [wikipedia("Gardens by the Bay", "Gardens_by_the_Bay"), wikidata("Q5533648")],
    visitMinutes: { min: 60, max: 120 },
    bestTime: "daytime",
    setting: "indoor",
    weatherSensitive: false,
    walking: "easy",
  },

  // -- Civic District & Quays --
  {
    id: "national-gallery-singapore",
    name: t("National Gallery Singapore", "新加坡国家美术馆", "싱가포르 국립미술관", "Galería Nacional de Singapur"),
    localName: "National Gallery Singapore",
    clusterId: "civic-quay",
    coordinates: { lat: 1.290556, lng: 103.851389, precision: "site" },
    categories: ["culture", "photo", "iconic"],
    summary: t(
      "An art museum housed in the former Supreme Court and City Hall buildings. Opened in 2015, it focuses on Singapore and Southeast Asian art and anchors the Civic District.",
      "位于前最高法院与市政厅建筑内的艺术博物馆，2015 年开放，重点收藏新加坡与东南亚艺术，是市政区的核心文化地标。",
      "옛 대법원과 시청 건물에 들어선 미술관입니다. 2015년에 개관했고 싱가포르와 동남아시아 미술에 초점을 두며 시빅 지구의 중심 문화 명소입니다.",
      "Museo de arte instalado en los antiguos edificios del Tribunal Supremo y el Ayuntamiento. Abrió en 2015, se centra en arte de Singapur y el Sudeste Asiático y ancla el distrito cívico."
    ),
    sources: [wikipedia("National Gallery Singapore", "National_Gallery_Singapore"), wikidata("Q6975389")],
    visitMinutes: { min: 75, max: 150 },
    bestTime: "daytime",
    setting: "indoor",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "asian-civilisations-museum",
    name: t("Asian Civilisations Museum", "亚洲文明博物馆", "아시아 문명 박물관", "Museo de las Civilizaciones Asiáticas"),
    localName: "Asian Civilisations Museum",
    clusterId: "civic-quay",
    coordinates: { lat: 1.2875, lng: 103.851111, precision: "site" },
    categories: ["culture", "local"],
    summary: t(
      "A museum by the Singapore River focused on the material cultures of Asia, especially ancestral cultures connected to Singapore's communities. The Empress Place building sits between the river and the Civic District.",
      "新加坡河畔的博物馆，关注亚洲物质文化，尤其是与新加坡社群祖源相关的文化。皇后坊建筑位于河流与市政区之间。",
      "싱가포르 강가의 박물관으로 아시아 물질문화, 특히 싱가포르 공동체와 연결된 조상 문화에 초점을 둡니다. 엠프레스 플레이스 건물은 강과 시빅 지구 사이에 있습니다.",
      "Museo junto al río Singapur dedicado a las culturas materiales de Asia, en especial las culturas ancestrales conectadas con las comunidades de Singapur. El edificio Empress Place se sitúa entre el río y el distrito cívico."
    ),
    sources: [wikipedia("Asian Civilisations Museum", "Asian_Civilisations_Museum"), wikidata("Q4807368")],
    visitMinutes: { min: 60, max: 120 },
    bestTime: "daytime",
    setting: "indoor",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "clarke-quay",
    name: t("Clarke Quay", "克拉码头", "클락 키", "Clarke Quay"),
    localName: "Clarke Quay",
    clusterId: "civic-quay",
    coordinates: { lat: 1.290556, lng: 103.846944, precision: "area" },
    categories: ["night", "food", "local"],
    summary: t(
      "A historical riverside quay on the Singapore River, named after Governor Andrew Clarke. Restored warehouses now hold restaurants, bars and nightlife along the water.",
      "新加坡河畔的历史码头，得名于总督 Andrew Clarke。修复后的仓库如今沿水岸聚集餐厅、酒吧与夜生活。",
      "싱가포르 강가의 역사적 부두로 앤드루 클라크 총독의 이름을 땄습니다. 복원된 창고에는 지금 식당, 바, 밤 문화 공간이 들어서 있습니다.",
      "Un muelle histórico junto al río Singapur, llamado por el gobernador Andrew Clarke. Los almacenes restaurados albergan restaurantes, bares y vida nocturna frente al agua."
    ),
    sources: [wikipedia("Clarke Quay", "Clarke_Quay"), wikidata("Q1097568")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "evening",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },

  // -- Chinatown & Telok Ayer --
  {
    id: "chinatown-singapore",
    name: t("Chinatown", "牛车水", "차이나타운", "Chinatown"),
    localName: "牛车水 / Chinatown",
    clusterId: "chinatown-telok",
    coordinates: { lat: 1.283333, lng: 103.844167, precision: "area" },
    categories: ["culture", "local", "food", "photo"],
    summary: t(
      "Singapore's historic Chinatown area, developed around Chinese immigrant settlement south of the Singapore River. It combines conserved shophouses, temples, markets and food streets in a compact grid.",
      "新加坡历史上的华人聚居区，位于新加坡河以南，围绕华人移民社群发展。这里在紧凑街区里结合了保育店屋、庙宇、市场和美食街。",
      "싱가포르 강 남쪽 중국계 이민자 정착지를 바탕으로 성장한 역사적 차이나타운입니다. 보존 상점가, 사원, 시장, 먹거리 거리가 조밀한 격자 안에 모입니다.",
      "El Chinatown histórico de Singapur, desarrollado alrededor del asentamiento chino al sur del río Singapur. Reúne shophouses conservadas, templos, mercados y calles de comida en una trama compacta."
    ),
    sources: [wikipedia("Chinatown, Singapore", "Chinatown,_Singapore"), wikidata("Q1079449")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "buddha-tooth-relic-temple",
    name: t("Buddha Tooth Relic Temple", "佛牙寺龙华院", "불아사", "Templo de la Reliquia del Diente de Buda"),
    localName: "Buddha Tooth Relic Temple and Museum",
    clusterId: "chinatown-telok",
    coordinates: { lat: 1.281475, lng: 103.844125, precision: "site" },
    categories: ["culture", "photo"],
    summary: t(
      "A Buddhist temple and museum in Chinatown, completed in 2007. Its Tang-style architecture and museum floors make it one of the area's most visible religious landmarks.",
      "牛车水的佛教寺院与博物馆，2007 年建成。唐式建筑和馆内展层让它成为这一带最醒目的宗教地标之一。",
      "차이나타운의 불교 사원 겸 박물관으로 2007년에 완공되었습니다. 당나라식 건축과 박물관 층으로 이 지역에서 가장 눈에 띄는 종교 랜드마크 중 하나입니다.",
      "Templo budista y museo en Chinatown, terminado en 2007. Su arquitectura de estilo Tang y sus plantas de museo lo hacen uno de los hitos religiosos más visibles de la zona."
    ),
    sources: [wikipedia("Buddha Tooth Relic Temple and Museum", "Buddha_Tooth_Relic_Temple_and_Museum"), wikidata("Q4982574")],
    visitMinutes: { min: 30, max: 60 },
    bestTime: "morning",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "maxwell-food-centre",
    name: t("Maxwell Food Centre", "麦士威熟食中心", "맥스웰 푸드 센터", "Maxwell Food Centre"),
    localName: "Maxwell Food Centre",
    clusterId: "chinatown-telok",
    coordinates: { lat: 1.280278, lng: 103.844722, precision: "site" },
    categories: ["food", "local", "xing_pick"],
    summary: t(
      "A hawker centre beside Chinatown and Telok Ayer, known for local cooked-food stalls. It is one of the simplest places to turn Singapore's food-centre culture into a first meal.",
      "位于牛车水与直落亚逸旁的熟食中心，以本地熟食摊位闻名。它是把新加坡小贩中心文化变成第一顿饭的最简单地点之一。",
      "차이나타운과 텔록 아이어 옆의 호커 센터로 현지 조리 음식 노점으로 알려져 있습니다. 싱가포르 푸드센터 문화를 첫 끼로 경험하기 쉬운 곳입니다.",
      "Un hawker centre junto a Chinatown y Telok Ayer, conocido por puestos de comida local cocinada. Es uno de los lugares más simples para convertir la cultura de los food centres de Singapur en una primera comida."
    ),
    sources: [wikipedia("Maxwell Food Centre", "Maxwell_Food_Centre"), wikidata("Q6796421")],
    visitMinutes: { min: 35, max: 70 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "lau-pa-sat",
    name: t("Lau Pa Sat", "老巴刹", "라우 파 삿", "Lau Pa Sat"),
    localName: "Lau Pa Sat",
    clusterId: "chinatown-telok",
    coordinates: { lat: 1.280556, lng: 103.850833, precision: "site" },
    categories: ["food", "local", "photo"],
    summary: t(
      "A historic market building in the Downtown Core, also known as Telok Ayer Market. Its cast-iron structure and central food stalls make it both a food stop and a heritage building.",
      "市中心的历史市场建筑，又称直落亚逸巴刹。铸铁结构和中央熟食摊让它既是吃饭点，也是历史建筑。",
      "다운타운 코어의 역사적 시장 건물로 텔록 아이어 마켓이라고도 합니다. 주철 구조와 중앙 음식 노점 때문에 식사 장소이자 유산 건물입니다.",
      "Edificio histórico de mercado en el Downtown Core, también llamado Telok Ayer Market. Su estructura de hierro fundido y los puestos centrales lo vuelven parada de comida y edificio patrimonial."
    ),
    sources: [wikipedia("Lau Pa Sat", "Lau_Pa_Sat"), wikidata("Q6498789")],
    visitMinutes: { min: 35, max: 70 },
    bestTime: "evening",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },

  // -- Little India & Kampong Glam --
  {
    id: "little-india",
    name: t("Little India", "小印度", "리틀 인디아", "Little India"),
    localName: "Little India",
    clusterId: "little-india-kampong",
    coordinates: { lat: 1.306667, lng: 103.849444, precision: "area" },
    categories: ["culture", "local", "food", "photo"],
    summary: t(
      "A district east of the Singapore River associated with Singapore's Indian community. Its streets around Serangoon Road are known for temples, shops, restaurants and bright shophouse facades.",
      "新加坡河以东、与印度社群联系紧密的街区。实龙岗路周边以庙宇、商店、餐馆和鲜明店屋立面闻名。",
      "싱가포르 강 동쪽의 지역으로 싱가포르 인도계 공동체와 깊게 연결되어 있습니다. 세랑군 로드 주변 거리에는 사원, 상점, 식당, 밝은 상점 건물이 많습니다.",
      "Distrito al este del río Singapur asociado a la comunidad india de la ciudad. Las calles alrededor de Serangoon Road son conocidas por templos, tiendas, restaurantes y fachadas coloridas de shophouses."
    ),
    sources: [wikipedia("Little India, Singapore", "Little_India,_Singapore"), wikidata("Q277663")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "sri-veeramakaliamman-temple",
    name: t("Sri Veeramakaliamman Temple", "维拉马卡里雅曼兴都庙", "스리 비라마칼리암만 사원", "Templo Sri Veeramakaliamman"),
    localName: "Sri Veeramakaliamman Temple",
    clusterId: "little-india-kampong",
    coordinates: { lat: 1.306944, lng: 103.852222, precision: "site" },
    categories: ["culture", "photo", "local"],
    summary: t(
      "A Hindu temple in Little India dedicated to the goddess Kali. It is one of the district's best-known temple landmarks along Serangoon Road.",
      "小印度供奉女神 Kali 的印度教寺庙，是实龙岗路沿线最知名的庙宇地标之一。",
      "리틀 인디아의 힌두 사원으로 칼리 여신에게 바쳐졌습니다. 세랑군 로드 일대에서 가장 잘 알려진 사원 랜드마크 중 하나입니다.",
      "Templo hindú en Little India dedicado a la diosa Kali. Es uno de los hitos religiosos más conocidos del distrito sobre Serangoon Road."
    ),
    sources: [wikipedia("Sri Veeramakaliamman Temple", "Sri_Veeramakaliamman_Temple"), wikidata("Q7587420")],
    visitMinutes: { min: 20, max: 40 },
    bestTime: "morning",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "kampong-glam",
    name: t("Kampong Glam", "甘榜格南", "캄퐁 글램", "Kampong Glam"),
    localName: "Kampong Glam",
    clusterId: "little-india-kampong",
    coordinates: { lat: 1.3025, lng: 103.859167, precision: "area" },
    categories: ["culture", "local", "photo", "food"],
    summary: t(
      "A historic neighbourhood north of the Singapore River associated with Malay and Muslim life in Singapore. The area around Arab Street, Bussorah Street and Haji Lane mixes mosques, shops and cafes.",
      "新加坡河以北的历史街区，与新加坡马来和穆斯林生活联系紧密。阿拉伯街、巴索拉街和哈芝巷一带混合了清真寺、商店与咖啡馆。",
      "싱가포르 강 북쪽의 역사적 동네로 말레이와 무슬림 생활과 깊게 연결되어 있습니다. 아랍 스트리트, 부소라 스트리트, 하지 레인 주변에는 모스크, 상점, 카페가 섞여 있습니다.",
      "Barrio histórico al norte del río Singapur asociado a la vida malaya y musulmana. La zona de Arab Street, Bussorah Street y Haji Lane mezcla mezquitas, tiendas y cafés."
    ),
    sources: [wikipedia("Kampong Glam", "Kampong_Glam"), wikidata("Q3547208")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "sultan-mosque",
    name: t("Sultan Mosque", "苏丹回教堂", "술탄 모스크", "Mezquita del Sultán"),
    localName: "Masjid Sultan",
    clusterId: "little-india-kampong",
    coordinates: { lat: 1.3025, lng: 103.859167, precision: "site" },
    categories: ["culture", "iconic", "photo"],
    summary: t(
      "A major mosque in Kampong Glam, built for Sultan Hussein Shah and rebuilt in the 1920s. Its golden domes and position at the end of Bussorah Street make it the neighbourhood's visual anchor.",
      "甘榜格南的重要清真寺，为 Sultan Hussein Shah 而建，并在 1920 年代重建。金色穹顶和巴索拉街尽头的位置，让它成为街区视觉中心。",
      "캄퐁 글램의 주요 모스크로 술탄 후세인 샤를 위해 세워졌고 1920년대에 재건되었습니다. 황금 돔과 부소라 스트리트 끝의 위치가 이 동네의 시각 중심을 만듭니다.",
      "Mezquita principal de Kampong Glam, construida para Sultan Hussein Shah y reconstruida en los años veinte. Sus cúpulas doradas y su posición al final de Bussorah Street la hacen el ancla visual del barrio."
    ),
    sources: [wikipedia("Sultan Mosque", "Sultan_Mosque"), wikidata("Q1810075")],
    visitMinutes: { min: 25, max: 45 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "haji-lane",
    name: t("Haji Lane", "哈芝巷", "하지 레인", "Haji Lane"),
    localName: "Haji Lane",
    clusterId: "little-india-kampong",
    coordinates: { lat: 1.30083, lng: 103.85972, precision: "area" },
    categories: ["photo", "local", "food"],
    summary: t(
      "A narrow street in Kampong Glam known for small shops, murals and cafes. It works best as a short texture stop after Sultan Mosque rather than a full neighbourhood on its own.",
      "甘榜格南的一条窄街，以小店、壁画和咖啡馆闻名。它更适合在苏丹回教堂之后作为短暂停留，而不是单独撑起一个街区行程。",
      "캄퐁 글램의 좁은 거리로 작은 상점, 벽화, 카페로 알려져 있습니다. 술탄 모스크 뒤에 짧게 질감을 보는 곳이지, 혼자 하루를 채우는 동네는 아닙니다.",
      "Calle estrecha de Kampong Glam conocida por tiendas pequeñas, murales y cafés. Funciona mejor como parada breve de textura después de la Mezquita del Sultán que como barrio completo por sí sola."
    ),
    sources: [wikipedia("Kampong Glam", "Kampong_Glam"), wikidata("Q3547208")],
    visitMinutes: { min: 20, max: 45 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },

  // -- Orchard & Botanic Gardens --
  {
    id: "singapore-botanic-gardens",
    name: t("Singapore Botanic Gardens", "新加坡植物园", "싱가포르 보타닉 가든", "Jardines Botánicos de Singapur"),
    localName: "Singapore Botanic Gardens",
    clusterId: "orchard-botanic",
    coordinates: { lat: 1.313889, lng: 103.815556, precision: "area" },
    categories: ["nature", "culture", "iconic"],
    summary: t(
      "A tropical garden founded in 1859 and inscribed as a UNESCO World Heritage Site in 2015. It is Singapore's deepest green stop inside the city, with lakes, lawns and the National Orchid Garden.",
      "1859 年创立的热带植物园，2015 年列入联合国教科文组织世界遗产。它是新加坡城市内部最深入的绿色停留点，有湖泊、草坪和国家兰花园。",
      "1859년에 세워진 열대 정원으로 2015년 유네스코 세계유산에 등재되었습니다. 호수, 잔디밭, 국립 난초원이 있는 싱가포르 도심 안의 가장 깊은 녹색 정거장입니다.",
      "Jardín tropical fundado en 1859 e inscrito como Patrimonio Mundial de la UNESCO en 2015. Es la parada verde más profunda dentro de la ciudad, con lagos, praderas y el Jardín Nacional de Orquídeas."
    ),
    sources: [wikipedia("Singapore Botanic Gardens", "Singapore_Botanic_Gardens"), wikidata("Q209808")],
    visitMinutes: { min: 75, max: 150 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "moderate",
  },
  {
    id: "orchard-road",
    name: t("Orchard Road", "乌节路", "오차드 로드", "Orchard Road"),
    localName: "Orchard Road",
    clusterId: "orchard-botanic",
    coordinates: { lat: 1.3048, lng: 103.8318, precision: "area" },
    categories: ["local", "food", "night"],
    summary: t(
      "Singapore's main shopping street, lined with malls, hotels and restaurants. It grew from a plantation road into the city's best-known retail corridor.",
      "新加坡主要购物街，两侧集中商场、酒店和餐厅。它从种植园道路发展为城市最知名的零售走廊。",
      "싱가포르의 대표 쇼핑 거리로 쇼핑몰, 호텔, 식당이 늘어서 있습니다. 농장길에서 도시에서 가장 잘 알려진 소매 축으로 성장했습니다.",
      "La principal calle comercial de Singapur, flanqueada por centros comerciales, hoteles y restaurantes. Pasó de camino de plantaciones al corredor minorista más conocido de la ciudad."
    ),
    sources: [wikipedia("Orchard Road", "Orchard_Road"), wikidata("Q746412")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "evening",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },

  // -- Sentosa & South Coast --
  {
    id: "sentosa",
    name: t("Sentosa", "圣淘沙", "센토사", "Sentosa"),
    localName: "Sentosa",
    clusterId: "sentosa-south",
    coordinates: { lat: 1.249404, lng: 103.830321, precision: "area" },
    categories: ["nature", "photo", "local"],
    summary: t(
      "An island resort south of mainland Singapore, connected by road, rail and cable car. Beaches, Fort Siloso and leisure attractions make it the easiest south-coast escape from the central city.",
      "新加坡本岛以南的度假岛，通过公路、轻轨和缆车相连。海滩、夕乐索炮台和休闲设施让它成为市中心最容易到达的南岸离城点。",
      "싱가포르 본섬 남쪽의 리조트 섬으로 도로, 철도, 케이블카로 연결됩니다. 해변, 포트 실로소, 레저 시설 때문에 도심에서 가장 쉬운 남부 해안 탈출지입니다.",
      "Isla resort al sur de la isla principal de Singapur, conectada por carretera, tren ligero y teleférico. Playas, Fort Siloso y atracciones de ocio la vuelven la escapada sur más fácil desde el centro."
    ),
    sources: [wikipedia("Sentosa", "Sentosa"), wikidata("Q185352")],
    visitMinutes: { min: 60, max: 150 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "moderate",
  },
  {
    id: "fort-siloso",
    name: t("Fort Siloso", "西乐索炮台", "포트 실로소", "Fort Siloso"),
    localName: "Fort Siloso",
    clusterId: "sentosa-south",
    coordinates: { lat: 1.257222, lng: 103.810833, precision: "site" },
    categories: ["culture", "photo"],
    summary: t(
      "A preserved coastal artillery fort on Sentosa, built by the British in the late nineteenth century. It is now a military museum and one of Sentosa's clearest historical stops.",
      "圣淘沙保存下来的海岸炮台，由英国人在十九世纪后期建造。如今它是军事博物馆，也是圣淘沙最清楚的历史停留点之一。",
      "센토사에 보존된 해안 포대로, 19세기 후반 영국이 건설했습니다. 지금은 군사 박물관이며 센토사에서 가장 뚜렷한 역사 명소 중 하나입니다.",
      "Fuerte costero de artillería conservado en Sentosa, construido por los británicos a finales del siglo XIX. Hoy es museo militar y una de las paradas históricas más claras de Sentosa."
    ),
    sources: [wikipedia("Fort Siloso", "Fort_Siloso"), wikidata("Q5471052")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "moderate",
  },
  {
    id: "siloso-beach",
    name: t("Siloso Beach", "西乐索海滩", "실로소 비치", "Playa Siloso"),
    localName: "Siloso Beach",
    clusterId: "sentosa-south",
    coordinates: { lat: 1.254, lng: 103.813, precision: "area" },
    categories: ["nature", "photo", "local"],
    summary: t(
      "A beach on Sentosa's south-western shore, close to Fort Siloso. It gives Singapore a casual sand-and-strait finish after the dense city core.",
      "圣淘沙西南岸的海滩，靠近西乐索炮台。走完密集市中心后，这里给新加坡行程一个轻松的沙滩与海峡收尾。",
      "포트 실로소와 가까운 센토사 남서쪽 해변입니다. 빽빽한 도심 뒤에 모래와 해협으로 싱가포르 일정을 가볍게 마무리합니다.",
      "Playa en la costa suroeste de Sentosa, cerca de Fort Siloso. Da a Singapur un cierre relajado de arena y estrecho tras el centro denso."
    ),
    sources: [wikipedia("Sentosa", "Sentosa"), wikidata("Q185352")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "sunset",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
]

const routePhoto = (alt: CityText): CityPhoto => ({
  src: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1600&q=85&auto=format&fit=crop",
  width: 1600,
  height: 900,
  alt,
  credit: {
    label: t("XingAI Travel", "XingAI Travel", "XingAI Travel", "XingAI Travel"),
    href: "/",
  },
})

const photos = {
  hero: routePhoto(
    t(
      "Singapore skyline across Marina Bay at dusk",
      "黄昏时隔着滨海湾看新加坡天际线",
      "해질녘 마리나 베이 너머 싱가포르 스카이라인",
      "Skyline de Singapur sobre Marina Bay al atardecer"
    )
  ),
  photo: routePhoto(
    t(
      "Singapore Marina Bay skyline used for the photo route",
      "用于拍照路线的新加坡滨海湾天际线",
      "사진 코스에 쓰는 싱가포르 마리나 베이 스카이라인",
      "Skyline de Marina Bay usado para la ruta fotográfica"
    )
  ),
  local: routePhoto(
    t(
      "Singapore city view used for the local route",
      "用于在地路线的新加坡城市景色",
      "로컬 코스에 쓰는 싱가포르 도시 전경",
      "Vista de Singapur usada para la ruta local"
    )
  ),
}

// Reference routes (ADR 0008 section 3). Hand-authored, never generated. Times are estimates.
// Reasons are editorial; any fact inside them must already be in a place summary above.
const routes: TravelRoute[] = [
  {
    id: "essentials",
    theme: "essentials",
    photo: photos.hero,
    name: t("Singapore Essentials", "新加坡经典一日", "싱가포르 핵심 코스", "Singapur esencial"),
    description: t(
      "Marina Bay icons first, the Civic District by midday, then hawker food and Chinatown before the heat or rain takes over.",
      "先看滨海湾地标，中午转进市政区，再用小贩中心和牛车水收尾，赶在暑热或阵雨完全接管之前。",
      "먼저 마리나 베이의 아이콘을 보고, 한낮에는 시빅 지구로 옮긴 뒤 호커 음식과 차이나타운으로 마무리합니다. 더위나 소나기가 장악하기 전입니다.",
      "Iconos de Marina Bay primero, distrito cívico al mediodía, luego hawker food y Chinatown antes de que el calor o la lluvia manden."
    ),
    estimatedDurationMinutes: 405,
    stops: [
      {
        placeId: "merlion-park",
        order: 1,
        estimatedVisitMinutes: 25,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Start with the city symbol while the waterfront is cooler and the line back to Marina Bay Sands is clean.",
          "趁滨水还凉快，从城市符号开始，也能清楚看回滨海湾金沙。",
          "수변이 아직 선선하고 마리나 베이 샌즈가 선명할 때 도시 상징부터 시작합니다.",
          "Empieza con el símbolo de la ciudad mientras el borde del agua está más fresco y la vista a Marina Bay Sands es limpia."
        ),
      },
      {
        placeId: "marina-bay-sands",
        order: 2,
        estimatedVisitMinutes: 45,
        estimatedTravelMinutesFromPrevious: 15,
        transportMode: "walk",
        reason: t(
          "Walk around the bay to read the three towers and SkyPark from outside before the indoor detours tempt you.",
          "绕湾步行看清三座塔楼和空中花园，先把外观读完，再考虑室内绕路。",
          "베이를 따라 걸으며 세 타워와 스카이파크의 외관을 먼저 봅니다. 실내 동선에 끌리기 전입니다.",
          "Camina alrededor de la bahía para leer las tres torres y el SkyPark desde fuera antes de caer en desvíos interiores."
        ),
      },
      {
        placeId: "gardens-by-the-bay",
        order: 3,
        estimatedVisitMinutes: 85,
        estimatedTravelMinutesFromPrevious: 15,
        transportMode: "walk",
        reason: t(
          "Continue into the garden-city set piece: Supertrees, waterfront paths and cooled conservatories if the day turns harsh.",
          "继续走进花园城市的代表场景：擎天树、滨水步道，天气太硬就进冷室温室。",
          "정원 도시의 대표 장면으로 이어갑니다. 슈퍼트리, 수변 길, 날씨가 거칠면 냉방 온실까지.",
          "Sigue al gran gesto de ciudad jardín: Supertrees, senderos de agua y conservatorios frescos si el día aprieta."
        ),
      },
      {
        placeId: "national-gallery-singapore",
        order: 4,
        estimatedVisitMinutes: 75,
        estimatedTravelMinutesFromPrevious: 20,
        transportMode: "mtr",
        reason: t(
          "Move to the Civic District for art inside the former court and city hall buildings.",
          "转到市政区，在前法院与市政厅建筑里看艺术。",
          "시빅 지구로 이동해 옛 법원과 시청 건물 안의 미술을 봅니다.",
          "Pasa al distrito cívico para ver arte dentro de los antiguos edificios de tribunal y ayuntamiento."
        ),
      },
      {
        placeId: "maxwell-food-centre",
        order: 5,
        estimatedVisitMinutes: 50,
        estimatedTravelMinutesFromPrevious: 15,
        transportMode: "mtr",
        reason: t(
          "Use Maxwell as the first hawker-centre meal: practical, central and close to Chinatown.",
          "把麦士威当第一顿小贩中心饭：实用、居中，也靠近牛车水。",
          "맥스웰을 첫 호커 센터 식사로 둡니다. 실용적이고 중심에 있으며 차이나타운과 가깝습니다.",
          "Usa Maxwell como primera comida de hawker centre: práctico, céntrico y cerca de Chinatown."
        ),
      },
      {
        placeId: "chinatown-singapore",
        order: 6,
        estimatedVisitMinutes: 55,
        estimatedTravelMinutesFromPrevious: 5,
        transportMode: "walk",
        reason: t(
          "Finish in the compact grid of shophouses, temples and food streets without adding another long transfer.",
          "在店屋、庙宇和美食街紧凑交织的街区收尾，不再增加长距离换乘。",
          "상점가, 사원, 먹거리 거리가 촘촘한 격자에서 마무리합니다. 긴 이동을 더하지 않습니다.",
          "Termina en la trama compacta de shophouses, templos y calles de comida sin sumar otro traslado largo."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "It teaches Singapore's first-visit shape: bay icon, garden-city, civic core, hawker food.",
        "它讲清第一次来新加坡的结构：海湾地标、花园城市、市政核心、小贩中心。",
        "첫 방문의 형태를 보여 줍니다. 베이 아이콘, 정원 도시, 시빅 코어, 호커 음식.",
        "Enseña la forma de una primera visita: icono de la bahía, ciudad jardín, centro cívico y hawker food."
      ),
      t(
        "The route moves west from Bayfront to Chinatown instead of bouncing between neighbourhoods.",
        "路线从湾畔一路向西到牛车水，不在街区之间来回跳。",
        "베이프런트에서 차이나타운까지 서쪽으로 움직이며 동네 사이를 튕기지 않습니다.",
        "Avanza hacia el oeste desde Bayfront hasta Chinatown sin saltar de barrio en barrio."
      ),
      t(
        "Indoor breaks are built in at Gardens and the National Gallery for heat or rain.",
        "滨海湾花园和国家美术馆自带室内缓冲，能应对暑热或下雨。",
        "가든스와 국립미술관에 실내 휴식이 있어 더위나 비에 대응합니다.",
        "Incluye pausas cubiertas en Gardens y la National Gallery para calor o lluvia."
      ),
    ],
    goodFor: [
      t("First visit with one full day", "第一次来、有一整天", "첫 방문, 하루 종일", "Primera visita con un día completo"),
      t("Landmarks plus hawker food", "地标和小贩中心都要", "랜드마크와 호커 음식", "Hitos y hawker food"),
      t("Travellers staying near the centre", "住在市中心附近的人", "도심 근처에 머무는 여행자", "Quien se aloja cerca del centro"),
    ],
    tradeoffs: [
      t(
        "Sentosa and Orchard are not here; this day stays in the central city.",
        "不去圣淘沙和乌节；这一天留在中心城区。",
        "센토사와 오차드는 없습니다. 이날은 도심에 머뭅니다.",
        "Sentosa y Orchard no entran; este día se queda en el centro."
      ),
      t(
        "Gardens by the Bay can easily take longer if you enter both conservatories.",
        "如果花穹和云雾林都进，滨海湾花园很容易超时。",
        "두 온실을 모두 들어가면 가든스 바이 더 베이가 쉽게 길어집니다.",
        "Gardens by the Bay puede alargarse mucho si entras en ambos conservatorios."
      ),
      t(
        "Waterfront walking is exposed. Bring shade and treat storms seriously.",
        "滨水步行无遮蔽。带遮阳，也认真对待雷阵雨。",
        "수변 걷기는 노출됩니다. 그늘 대책을 챙기고 폭풍을 가볍게 보지 마세요.",
        "La caminata frente al agua queda expuesta. Lleva sombra y toma en serio las tormentas."
      ),
    ],
  },
  {
    id: "photo",
    theme: "photo",
    photo: photos.photo,
    name: t("Photo Singapore", "拍照新加坡", "사진으로 보는 싱가포르", "Singapur en foto"),
    description: t(
      "Bay geometry, Supertrees and skyline height, then a south-coast finish on Sentosa.",
      "拍海湾几何、擎天树和天际线高度，再到圣淘沙南岸收尾。",
      "베이의 기하, 슈퍼트리, 스카이라인 높이를 찍고 센토사 남부 해안에서 마무리합니다.",
      "Geometría de la bahía, Supertrees y altura del skyline, con cierre en la costa sur de Sentosa."
    ),
    estimatedDurationMinutes: 415,
    stops: [
      {
        placeId: "helix-bridge",
        order: 1,
        estimatedVisitMinutes: 30,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Start on the pedestrian bridge for steel curves and bay reflections before the promenade fills.",
          "从人行桥开始，趁步道还没满，拍钢结构曲线和海湾倒影。",
          "산책로가 붐비기 전 보행자 다리에서 철골 곡선과 베이 반사를 찍습니다.",
          "Empieza en el puente peatonal: curvas de acero y reflejos de la bahía antes de que se llene el paseo."
        ),
      },
      {
        placeId: "singapore-flyer",
        order: 2,
        estimatedVisitMinutes: 55,
        estimatedTravelMinutesFromPrevious: 10,
        transportMode: "walk",
        reason: t(
          "Add a high view over the bay and the strait side while still staying inside the Marina Bay cluster.",
          "还在滨海湾片区内时，补一个俯瞰海湾和海峡方向的高视角。",
          "아직 마리나 베이 클러스터 안에 있을 때 베이와 해협 쪽을 내려다보는 높은 시점을 더합니다.",
          "Añade una vista alta sobre la bahía y el lado del estrecho mientras sigues dentro del clúster de Marina Bay."
        ),
      },
      {
        placeId: "marina-bay-sands",
        order: 3,
        estimatedVisitMinutes: 45,
        estimatedTravelMinutesFromPrevious: 15,
        transportMode: "walk",
        reason: t(
          "Shift to the three towers for the most readable exterior silhouette in the city.",
          "移到三塔下方，拍这座城市最容易辨认的外部轮廓。",
          "세 타워 쪽으로 옮겨 도시에서 가장 읽기 쉬운 외관 실루엣을 잡습니다.",
          "Muévete a las tres torres para la silueta exterior más reconocible de la ciudad."
        ),
      },
      {
        placeId: "gardens-by-the-bay",
        order: 4,
        estimatedVisitMinutes: 80,
        estimatedTravelMinutesFromPrevious: 20,
        transportMode: "walk",
        reason: t(
          "Use the Supertrees and waterfront paths for the garden-city frame after the hotel geometry.",
          "在酒店几何之后，用擎天树和滨水步道拍花园城市的画面。",
          "호텔 기하 뒤에 슈퍼트리와 수변 길로 정원 도시 프레임을 만듭니다.",
          "Usa los Supertrees y senderos frente al agua para el encuadre de ciudad jardín tras la geometría del hotel."
        ),
      },
      {
        placeId: "fort-siloso",
        order: 5,
        estimatedVisitMinutes: 60,
        estimatedTravelMinutesFromPrevious: 35,
        transportMode: "mtr",
        reason: t(
          "Move south to Sentosa for a different texture: preserved coastal defence instead of glass skyline.",
          "南下圣淘沙换一种质感：从玻璃天际线切到保存下来的海岸防御遗迹。",
          "남쪽 센토사로 이동해 다른 질감을 봅니다. 유리 스카이라인 대신 보존된 해안 방어 시설입니다.",
          "Baja a Sentosa por otra textura: defensa costera conservada en lugar de skyline de vidrio."
        ),
      },
      {
        placeId: "siloso-beach",
        order: 6,
        estimatedVisitMinutes: 55,
        estimatedTravelMinutesFromPrevious: 10,
        transportMode: "walk",
        reason: t(
          "End on sand and the Singapore Strait, far enough from the bay to feel like a second face of the city.",
          "在沙滩和新加坡海峡边收尾，离滨海湾足够远，像看到城市的另一面。",
          "모래와 싱가포르 해협에서 마무리합니다. 베이에서 충분히 멀어 도시의 또 다른 얼굴처럼 느껴집니다.",
          "Termina en arena y el estrecho de Singapur, lo bastante lejos de la bahía para sentir otra cara de la ciudad."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "It keeps the bay sequence tight before making one deliberate jump to Sentosa.",
        "先把海湾段拍紧凑，再明确跳到圣淘沙一次。",
        "베이 구간을 촘촘히 묶은 뒤 센토사로 한 번만 의도적으로 이동합니다.",
        "Mantiene compacta la secuencia de la bahía antes de un salto deliberado a Sentosa."
      ),
      t(
        "The frames change from bridge lines to towers, gardens, height, fort and beach.",
        "画面从桥线条到塔楼、花园、高处、炮台和海滩逐步变化。",
        "프레임이 다리 선, 타워, 정원, 높이, 요새, 해변으로 바뀝니다.",
        "Los encuadres cambian de líneas de puente a torres, jardines, altura, fuerte y playa."
      ),
      t(
        "No Chinatown stop here; that street texture belongs to Essentials or Local.",
        "这条不放牛车水；街道质感留给经典或在地路线。",
        "여기에는 차이나타운을 넣지 않습니다. 거리 질감은 핵심 또는 로컬 코스 몫입니다.",
        "No incluye Chinatown; esa textura de calle queda para Essentials o Local."
      ),
    ],
    goodFor: [
      t("Travelling with a camera", "带相机出门", "카메라를 들고 다니는 여행", "Viajar con cámara"),
      t("Skyline and waterfront light", "想拍天际线与水岸光线", "스카이라인과 수변 빛", "Skyline y luz de agua"),
      t("A second day after Essentials", "走过经典路线之后的第二天", "핵심 코스 다음 날", "Un segundo día después de lo esencial"),
    ],
    tradeoffs: [
      t(
        "The Sentosa leg adds transfer time. Skip it if storms are building.",
        "圣淘沙段会增加换乘时间；如果雷雨在聚集就跳过。",
        "센토사 구간은 이동 시간을 더합니다. 폭풍이 오면 건너뛰세요.",
        "El tramo de Sentosa añade traslado. Sáltalo si se forman tormentas."
      ),
      t(
        "Observation views cost time and may be weak in haze or heavy rain.",
        "观景轮会花时间；雾霾或大雨时效果会弱。",
        "관람차 전망은 시간이 들고, 연무나 폭우에는 약합니다.",
        "Las vistas de observación cuestan tiempo y pueden flojear con neblina o lluvia fuerte."
      ),
      t(
        "Food is incidental on this route; plan meals around the photo timing.",
        "这条路线吃饭不是重点；按拍照时间反推用餐。",
        "이 코스에서 음식은 부차적입니다. 사진 시간에 맞춰 식사를 잡으세요.",
        "La comida es secundaria aquí; organiza las comidas alrededor de la luz."
      ),
    ],
  },
  {
    id: "local",
    theme: "local",
    photo: photos.local,
    name: t("Local Singapore", "在地新加坡", "로컬 싱가포르", "Singapur local"),
    description: t(
      "Start green at the Botanic Gardens, pass Orchard, then spend the day in Little India, Kampong Glam and the river quays.",
      "从植物园的绿色开始，经过乌节，再把白天放在小印度、甘榜格南和河畔码头。",
      "보타닉 가든의 녹색으로 시작해 오차드를 지나 리틀 인디아, 캄퐁 글램, 강변 키에서 하루를 보냅니다.",
      "Empieza verde en los Jardines Botánicos, pasa por Orchard y dedica el día a Little India, Kampong Glam y los muelles del río."
    ),
    estimatedDurationMinutes: 405,
    stops: [
      {
        placeId: "singapore-botanic-gardens",
        order: 1,
        estimatedVisitMinutes: 85,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Begin early in the UNESCO-listed garden before humidity and crowds rise.",
          "趁湿度和人流还没升上来，先从这座世界遗产植物园开始。",
          "습도와 인파가 오르기 전 유네스코 등재 정원에서 일찍 시작합니다.",
          "Empieza temprano en el jardín UNESCO antes de que suban la humedad y las multitudes."
        ),
      },
      {
        placeId: "orchard-road",
        order: 2,
        estimatedVisitMinutes: 45,
        estimatedTravelMinutesFromPrevious: 15,
        transportMode: "mtr",
        reason: t(
          "Use Orchard as an air-conditioned reset and a look at the retail corridor between green and neighbourhood streets.",
          "把乌节当作有空调的缓冲，也看一眼绿色空间和街区生活之间的零售走廊。",
          "오차드를 냉방 리셋으로 쓰고, 녹지와 동네 거리 사이의 소매 축을 봅니다.",
          "Usa Orchard como respiro con aire acondicionado y vistazo al corredor comercial entre verde y barrios."
        ),
      },
      {
        placeId: "little-india",
        order: 3,
        estimatedVisitMinutes: 55,
        estimatedTravelMinutesFromPrevious: 15,
        transportMode: "mtr",
        reason: t(
          "Move into Serangoon Road for shops, restaurants and colour that feel lived-in rather than staged.",
          "转进实龙岗路，看商店、餐馆和色彩，重点是日常感而不是布景感。",
          "세랑군 로드로 이동해 상점, 식당, 색채를 봅니다. 꾸민 장면보다 생활감이 중요합니다.",
          "Pasa a Serangoon Road por tiendas, restaurantes y color que se sienten vividos, no montados."
        ),
      },
      {
        placeId: "sri-veeramakaliamman-temple",
        order: 4,
        estimatedVisitMinutes: 25,
        estimatedTravelMinutesFromPrevious: 8,
        transportMode: "walk",
        reason: t(
          "Pause at the Kali temple as the district's clearest religious landmark; keep the visit respectful and short.",
          "在这座 Kali 寺短暂停留，它是街区最清楚的宗教地标；保持尊重，不要拖太久。",
          "이 지역의 가장 뚜렷한 종교 랜드마크인 칼리 사원에 잠시 멈춥니다. 짧고 예의 있게 봅니다.",
          "Pausa en el templo de Kali como hito religioso más claro del distrito; visita breve y respetuosa."
        ),
      },
      {
        placeId: "sultan-mosque",
        order: 5,
        estimatedVisitMinutes: 30,
        estimatedTravelMinutesFromPrevious: 18,
        transportMode: "walk",
        reason: t(
          "Walk toward Kampong Glam and let the golden domes reset the neighbourhood story.",
          "步行到甘榜格南，用金色穹顶切换街区叙事。",
          "캄퐁 글램까지 걸어가 황금 돔으로 동네 이야기를 전환합니다.",
          "Camina hacia Kampong Glam y deja que las cúpulas doradas cambien la historia del barrio."
        ),
      },
      {
        placeId: "haji-lane",
        order: 6,
        estimatedVisitMinutes: 35,
        estimatedTravelMinutesFromPrevious: 5,
        transportMode: "walk",
        reason: t(
          "Slip into the narrow lane for murals, small shops and a slower cafe break.",
          "拐进窄巷，看壁画、小店，也放慢喝杯咖啡。",
          "좁은 골목으로 들어가 벽화, 작은 상점, 느린 카페 휴식을 봅니다.",
          "Métete en la calle estrecha por murales, tiendas pequeñas y una pausa de café más lenta."
        ),
      },
      {
        placeId: "clarke-quay",
        order: 7,
        estimatedVisitMinutes: 60,
        estimatedTravelMinutesFromPrevious: 20,
        transportMode: "mtr",
        reason: t(
          "End by the river once the restored warehouses shift into dinner and night mode.",
          "等修复仓库转入晚餐和夜间状态后，在河边收尾。",
          "복원 창고들이 저녁과 밤 모드로 바뀔 때 강가에서 마무리합니다.",
          "Termina junto al río cuando los almacenes restaurados pasan a modo cena y noche."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "It reads Singapore through everyday districts instead of only the bay postcard.",
        "它通过日常街区读新加坡，而不只看滨海湾明信片。",
        "베이 엽서만이 아니라 일상 동네를 통해 싱가포르를 읽습니다.",
        "Lee Singapur a través de barrios cotidianos, no solo la postal de la bahía."
      ),
      t(
        "The day has shade logic: garden early, malls at midday, streets later.",
        "这一天有遮阴逻辑：早上植物园，中午商场，之后再走街区。",
        "그늘의 논리가 있습니다. 아침 정원, 한낮 몰, 이후 거리.",
        "El día tiene lógica de sombra: jardín temprano, malls al mediodía y calles después."
      ),
      t(
        "Little India and Kampong Glam sit close enough to walk without forcing another transport puzzle.",
        "小印度和甘榜格南距离够近，可步行串联，不必再制造换乘难题。",
        "리틀 인디아와 캄퐁 글램은 걸어 이을 만큼 가까워 이동 퍼즐을 만들지 않습니다.",
        "Little India y Kampong Glam están lo bastante cerca para caminar sin crear otro rompecabezas de transporte."
      ),
    ],
    goodFor: [
      t("People who want neighbourhood texture", "想看街区质感的人", "동네 질감을 원하는 사람", "Quien busca textura de barrio"),
      t("Food, shops and temples", "吃饭、小店和庙宇", "음식, 상점, 사원", "Comida, tiendas y templos"),
      t("A lower-pressure day after Marina Bay", "滨海湾之后轻一点的一天", "마리나 베이 다음의 덜 빡빡한 하루", "Un día con menos presión después de Marina Bay"),
    ],
    tradeoffs: [
      t(
        "No Sentosa beach and no Marina Bay light show timing.",
        "没有圣淘沙海滩，也不卡滨海湾灯光秀时间。",
        "센토사 해변도, 마리나 베이 라이트쇼 시간도 없습니다.",
        "Sin playa de Sentosa ni horario de espectáculo de luces en Marina Bay."
      ),
      t(
        "This is not a museum-deep route; National Gallery and ACM belong to Essentials.",
        "这不是深度博物馆路线；国家美术馆和亚洲文明博物馆留给经典路线。",
        "박물관을 깊게 보는 코스가 아닙니다. 국립미술관과 아시아 문명 박물관은 핵심 코스에 둡니다.",
        "No es una ruta de museos a fondo; National Gallery y ACM quedan para Essentials."
      ),
      t(
        "Neighbourhood streets are more exposed to rain than malls or museums.",
        "街区步行比商场或博物馆更怕下雨。",
        "동네 거리는 쇼핑몰이나 박물관보다 비에 더 노출됩니다.",
        "Las calles de barrio quedan más expuestas a la lluvia que centros comerciales o museos."
      ),
    ],
  },
]

export const singapore: City = {
  slug: "singapore",
  name: t("Singapore", "新加坡", "싱가포르", "Singapur"),
  localName: "Singapore",
  country: t("Singapore", "新加坡", "싱가포르", "Singapur"),
  intro: t(
    "Singapore is compact but not one-note: Marina Bay gives the skyline, Gardens by the Bay gives the garden-city statement, Chinatown and hawker centres give the food base, and Little India, Kampong Glam, Orchard and Sentosa widen the city beyond the postcard.",
    "新加坡紧凑，但不单一：滨海湾给出天际线，滨海湾花园讲清花园城市，牛车水和小贩中心构成食物底色，小印度、甘榜格南、乌节和圣淘沙则把城市从明信片里拉开。",
    "싱가포르는 작지만 단조롭지 않습니다. 마리나 베이는 스카이라인을, 가든스 바이 더 베이는 정원 도시를, 차이나타운과 호커 센터는 음식의 기반을 보여 줍니다. 리틀 인디아, 캄퐁 글램, 오차드, 센토사는 엽서 밖의 도시를 넓혀 줍니다.",
    "Singapur es compacto, pero no plano: Marina Bay da el skyline, Gardens by the Bay explica la ciudad jardín, Chinatown y los hawker centres ponen la base de comida, y Little India, Kampong Glam, Orchard y Sentosa abren la ciudad más allá de la postal."
  ),
  hero: photos.hero,
  map: {
    // Schematic Marina Bay / Singapore Strait water, drawn south and east of plotted stops.
    // It is intentionally offset so Merlion, Bayfront and Sentosa coordinates do not sit inside the polygon.
    water: [
      [103.875, 1.276],
      [103.93, 1.27],
      [104.04, 1.248],
      [104.05, 1.225],
      [103.78, 1.225],
      [103.78, 1.242],
      [103.86, 1.252],
      [103.875, 1.276],
    ],
    waterLabel: t("Marina Bay / Singapore Strait", "滨海湾 / 新加坡海峡", "마리나 베이 / 싱가포르 해협", "Marina Bay / estrecho de Singapur"),
    waterLabelAt: [103.93, 1.245],
  },
  clusters,
  places,
  routes,
}
