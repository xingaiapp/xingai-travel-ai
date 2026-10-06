import type { City, CityPhoto, CityText, Cluster, Place, Source, TravelRoute } from "./types"

// New Orleans city layer (ADR 0008).
// Facts come from the linked Wikipedia articles; coordinates come from the linked Wikidata items.
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
    id: "french-quarter",
    side: "island",
    neighbours: ["riverfront-market", "treme-city-park", "arts-warehouse"],
    name: t("French Quarter Core", "法国区核心", "프렌치 쿼터 중심", "Nucleo del French Quarter"),
  },
  {
    id: "riverfront-market",
    side: "island",
    neighbours: ["french-quarter", "arts-warehouse"],
    name: t("Riverfront & French Market", "河岸与法国市场", "강변·프렌치 마켓", "Ribera y French Market"),
  },
  {
    id: "arts-warehouse",
    side: "island",
    neighbours: ["french-quarter", "riverfront-market", "garden-magazine"],
    name: t("Arts & Warehouse District", "艺术与仓库区", "아트·웨어하우스 지구", "Distrito de artes y almacenes"),
  },
  {
    id: "garden-magazine",
    side: "island",
    neighbours: ["arts-warehouse", "uptown-audubon"],
    name: t("Garden District & Magazine", "花园区与 Magazine 街", "가든 디스트릭트·매거진 거리", "Garden District y Magazine"),
  },
  {
    id: "uptown-audubon",
    side: "island",
    neighbours: ["garden-magazine"],
    name: t("Uptown & Audubon", "上城与奥杜邦", "업타운·오듀본", "Uptown y Audubon"),
  },
  {
    id: "treme-city-park",
    side: "island",
    neighbours: ["french-quarter"],
    name: t("Treme & City Park", "特雷梅与城市公园", "트레메·시티 파크", "Treme y City Park"),
  },
]

const places: Place[] = [
  // French Quarter Core
  {
    id: "jackson-square",
    name: t("Jackson Square", "杰克逊广场", "잭슨 스퀘어", "Jackson Square"),
    localName: "Jackson Square",
    clusterId: "french-quarter",
    coordinates: { lat: 29.9574, lng: -90.0632, precision: "site" },
    categories: ["iconic", "culture", "photo"],
    summary: t(
      "A historic park in the French Quarter, named for Andrew Jackson and framed by civic and religious landmarks. It is the easiest first orientation point for the old city because the square, cathedral and riverfront sit close together.",
      "法国区的历史广场公园，以安德鲁·杰克逊命名，周边围绕着城市与宗教地标。第一次到新奥尔良老城时，这里最容易认方向，因为广场、主教座堂和河岸彼此很近。",
      "프렌치 쿼터의 역사적인 광장 공원으로, 앤드루 잭슨의 이름을 땄고 시민·종교 랜드마크가 둘러싸고 있습니다. 광장, 대성당, 강변이 가까워 구시가지 첫 방향 잡기에 좋습니다.",
      "Parque historico del French Quarter, llamado por Andrew Jackson y rodeado de hitos civicos y religiosos. Es el punto mas claro para orientarse porque plaza, catedral y ribera quedan juntos."
    ),
    sources: [wikipedia("Jackson Square (New Orleans)", "Jackson_Square_(New_Orleans)"), wikidata("Q611928")],
    visitMinutes: { min: 30, max: 60 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "st-louis-cathedral",
    name: t("St. Louis Cathedral", "圣路易主教座堂", "세인트루이스 대성당", "Catedral de San Luis"),
    localName: "Cathedral-Basilica of Saint Louis, King of France",
    clusterId: "french-quarter",
    coordinates: { lat: 29.9581, lng: -90.0631, precision: "site" },
    categories: ["iconic", "culture", "photo"],
    summary: t(
      "The cathedral facing Jackson Square is the seat of the Roman Catholic Archdiocese of New Orleans. Its central position makes it one of the defining architectural markers of the French Quarter.",
      "面向杰克逊广场的主教座堂，是罗马天主教新奥尔良总教区的主教座堂。它位于广场正中，是法国区最清楚的建筑标记之一。",
      "잭슨 스퀘어를 마주한 대성당으로, 로마 가톨릭 뉴올리언스 대교구의 주교좌입니다. 프렌치 쿼터를 인식하게 해 주는 중심 건축물입니다.",
      "La catedral frente a Jackson Square es sede de la arquidiocesis catolica romana de Nueva Orleans. Su posicion central la convierte en una marca arquitectonica clave del French Quarter."
    ),
    sources: [wikipedia("St. Louis Cathedral (New Orleans)", "St._Louis_Cathedral_(New_Orleans)"), wikidata("Q7599499")],
    visitMinutes: { min: 20, max: 45 },
    bestTime: "morning",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "bourbon-street",
    name: t("Bourbon Street", "波旁街", "버번 스트리트", "Bourbon Street"),
    localName: "Bourbon Street",
    clusterId: "french-quarter",
    coordinates: { lat: 29.9584, lng: -90.0644, precision: "area" },
    categories: ["iconic", "night", "local"],
    summary: t(
      "A historic street in the French Quarter, widely known for bars, nightlife and public-facing entertainment. It is central to the visitor image of New Orleans, but works best as one layer of the Quarter, not the whole city.",
      "法国区内的历史街道，以酒吧、夜生活和街面娱乐闻名。它很代表游客眼中的新奥尔良，但最好把它当作法国区的一层体验，而不是整座城市。",
      "프렌치 쿼터의 역사적인 거리로, 바와 밤 문화, 거리 엔터테인먼트로 유명합니다. 뉴올리언스의 관광 이미지에서 크지만 도시 전체로 보지는 않는 편이 좋습니다.",
      "Calle historica del French Quarter, conocida por bares, vida nocturna y entretenimiento de calle. Define mucho la imagen turistica, pero conviene verla como una capa del barrio, no toda la ciudad."
    ),
    sources: [wikipedia("Bourbon Street", "Bourbon_Street"), wikidata("Q1105882")],
    visitMinutes: { min: 25, max: 60 },
    bestTime: "evening",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "royal-street",
    name: t("Royal Street", "皇家街", "로열 스트리트", "Royal Street"),
    localName: "Royal Street",
    clusterId: "french-quarter",
    coordinates: { lat: 29.9572, lng: -90.0648, precision: "area" },
    categories: ["culture", "local", "photo"],
    summary: t(
      "A French Quarter street known for galleries, antique shops, balconies and old-city street life. It offers a quieter architectural read of the Quarter than the nightlife image of Bourbon Street.",
      "法国区的一条街，以画廊、古董店、阳台和老城街景闻名。相比波旁街的夜生活形象，它更适合看法国区的建筑与日常街面。",
      "갤러리, 골동품점, 발코니와 구시가지 거리 분위기로 알려진 프렌치 쿼터의 거리입니다. 버번 스트리트의 밤 이미지보다 조용하게 건축과 거리를 볼 수 있습니다.",
      "Calle del French Quarter conocida por galerias, antiguedades, balcones y vida urbana antigua. Da una lectura arquitectonica mas tranquila que la imagen nocturna de Bourbon Street."
    ),
    sources: [wikipedia("Royal Street, New Orleans", "Royal_Street,_New_Orleans"), wikidata("Q7373320")],
    visitMinutes: { min: 30, max: 70 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },

  // Riverfront & French Market
  {
    id: "cafe-du-monde",
    name: t("Cafe du Monde", "Cafe du Monde 咖啡馆", "카페 뒤 몽드", "Cafe du Monde"),
    localName: "Cafe du Monde",
    clusterId: "riverfront-market",
    coordinates: { lat: 29.9575, lng: -90.061, precision: "site" },
    categories: ["food", "iconic", "local"],
    summary: t(
      "A New Orleans coffee stand best known for cafe au lait and beignets, located by the French Market area. It is a food stop rather than a museum stop, so the value is in timing and appetite.",
      "新奥尔良知名咖啡店，以欧蕾咖啡和贝涅饼闻名，位于法国市场一带。它是美食停靠点，不是博物馆停靠点，重点在时间和胃口。",
      "카페 오레와 베녜로 유명한 뉴올리언스의 커피 스탠드로, 프렌치 마켓 근처에 있습니다. 박물관이 아니라 음식 정차점이라 시간과 식욕이 중요합니다.",
      "Cafe de Nueva Orleans conocido por cafe au lait y beignets, junto al area del French Market. Es una parada gastronomica, no museistica: importan el horario y el apetito."
    ),
    sources: [wikipedia("Café du Monde", "Caf%C3%A9_du_Monde"), wikidata("Q2933012")],
    visitMinutes: { min: 20, max: 45 },
    bestTime: "morning",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "french-market",
    name: t("French Market", "法国市场", "프렌치 마켓", "French Market"),
    localName: "French Market",
    clusterId: "riverfront-market",
    coordinates: { lat: 29.9587, lng: -90.059, precision: "area" },
    categories: ["food", "local", "culture"],
    summary: t(
      "A market district in the French Quarter that traces its identity to long-running public market activity. Today it works as an easy river-adjacent food and browsing stop after Jackson Square.",
      "法国区的市场街区，其身份来自长期延续的公共市场活动。今天这里适合在杰克逊广场之后顺路吃点东西、慢慢逛。",
      "오랫동안 이어진 공설시장 활동에서 정체성이 나온 프렌치 쿼터의 시장 구역입니다. 지금은 잭슨 스퀘어 뒤에 강변 가까이에서 먹고 둘러보기 좋습니다.",
      "Distrito de mercado del French Quarter, ligado a una larga actividad de mercado publico. Hoy funciona como parada facil de comida y paseo cerca del rio tras Jackson Square."
    ),
    sources: [wikipedia("French Market", "French_Market"), wikidata("Q5500240")],
    visitMinutes: { min: 30, max: 70 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "woldenberg-park",
    name: t("Mississippi Riverfront / Moon Walk", "密西西比河岸 / Moon Walk", "미시시피 강변·문 워크", "Ribera del Mississippi / Moon Walk"),
    localName: "Woldenberg Park and Moon Walk",
    clusterId: "riverfront-market",
    coordinates: { lat: 29.9537, lng: -90.0616, precision: "area" },
    categories: ["photo", "nature", "local"],
    summary: t(
      "A public riverfront park and promenade area along the Mississippi near the French Quarter. It gives a simple open-air counterpoint to the denser streets behind Jackson Square.",
      "法国区附近密西西比河沿岸的公共公园与步道区域。走完杰克逊广场后方密集街巷后，这里提供一个开阔的户外对照。",
      "프렌치 쿼터 가까이 미시시피강을 따라 이어지는 공공 강변 공원과 산책로입니다. 잭슨 스퀘어 뒤의 빽빽한 거리와 대비되는 열린 공간입니다.",
      "Parque y paseo publico junto al Mississippi cerca del French Quarter. Da un contrapunto abierto a las calles densas detras de Jackson Square."
    ),
    sources: [wikipedia("Woldenberg Park", "Woldenberg_Park"), wikidata("Q8030849")],
    visitMinutes: { min: 25, max: 50 },
    bestTime: "sunset",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },

  // Arts & Warehouse District
  {
    id: "contemporary-arts-center",
    name: t("Contemporary Arts Center", "当代艺术中心", "컨템퍼러리 아트 센터", "Centro de Arte Contemporaneo"),
    localName: "Contemporary Arts Center, New Orleans",
    clusterId: "arts-warehouse",
    coordinates: { lat: 29.943, lng: -90.0703, precision: "site" },
    categories: ["culture", "local", "photo"],
    summary: t(
      "A contemporary arts institution in the Warehouse District, presenting visual and performing arts. It anchors a different New Orleans texture from the French Quarter: galleries, museums and converted urban blocks.",
      "仓库区的当代艺术机构，展示视觉与表演艺术。它代表了不同于法国区的新奥尔良质感：画廊、博物馆和再利用城市街区。",
      "웨어하우스 지구의 현대예술 기관으로, 시각예술과 공연예술을 선보입니다. 프렌치 쿼터와 다른 뉴올리언스의 질감, 즉 갤러리와 박물관, 전환된 도시 블록을 보여 줍니다.",
      "Institucion de arte contemporaneo en el Warehouse District, con artes visuales y escenicas. Ancla otra textura de Nueva Orleans: galerias, museos y manzanas urbanas reutilizadas."
    ),
    sources: [wikipedia("Contemporary Arts Center, New Orleans", "Contemporary_Arts_Center,_New_Orleans"), wikidata("Q5165124")],
    visitMinutes: { min: 35, max: 75 },
    bestTime: "daytime",
    setting: "indoor",
    weatherSensitive: false,
    walking: "easy",
  },

  // Garden District & Magazine
  {
    id: "garden-district",
    name: t("Garden District", "花园区", "가든 디스트릭트", "Garden District"),
    localName: "Garden District",
    clusterId: "garden-magazine",
    coordinates: { lat: 29.9286, lng: -90.0844, precision: "area" },
    categories: ["culture", "photo", "local"],
    summary: t(
      "A historic New Orleans neighbourhood known for nineteenth-century residences, gardens and oak-lined streets. It is a good counterweight to the French Quarter because the scale is residential and slower.",
      "新奥尔良历史街区，以 19 世纪住宅、花园和橡树街道闻名。它和法国区形成很好的对照：尺度更居住化，节奏也更慢。",
      "19세기 주택, 정원, 참나무가 늘어선 거리로 알려진 뉴올리언스의 역사 동네입니다. 프렌치 쿼터와 달리 주거 스케일이고 속도가 느립니다.",
      "Barrio historico de Nueva Orleans conocido por residencias del siglo XIX, jardines y calles con robles. Equilibra el French Quarter con una escala residencial y mas lenta."
    ),
    sources: [wikipedia("Garden District, New Orleans", "Garden_District,_New_Orleans"), wikidata("Q5523421")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "lafayette-cemetery-one",
    name: t("Lafayette Cemetery No. 1", "拉法耶特一号公墓", "라파예트 묘지 1번", "Cementerio Lafayette No. 1"),
    localName: "Lafayette Cemetery No. 1",
    clusterId: "garden-magazine",
    coordinates: { lat: 29.9288, lng: -90.086, precision: "site" },
    categories: ["culture", "photo"],
    summary: t(
      "A historic cemetery in the Garden District, known for above-ground tombs. Access conditions can change, so it is best treated as a context stop for the neighbourhood rather than the only reason to go.",
      "花园区内的历史公墓，以地上墓室闻名。开放情况可能变化，因此最好把它视为理解街区的背景停靠点，而不是唯一目的。",
      "가든 디스트릭트의 역사 묘지로, 지상식 무덤으로 알려져 있습니다. 접근 상황은 바뀔 수 있어 이곳만을 목적지로 삼기보다 동네 맥락으로 보는 편이 좋습니다.",
      "Cementerio historico del Garden District, conocido por tumbas sobre tierra. El acceso puede cambiar, asi que conviene verlo como contexto del barrio, no como unico motivo."
    ),
    sources: [wikipedia("Lafayette Cemetery No. 1", "Lafayette_Cemetery_No._1"), wikidata("Q58826198")],
    visitMinutes: { min: 20, max: 45 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "magazine-street",
    name: t("Magazine Street", "Magazine 街", "매거진 스트리트", "Magazine Street"),
    localName: "Magazine Street",
    clusterId: "garden-magazine",
    coordinates: { lat: 29.922, lng: -90.097, precision: "area" },
    categories: ["local", "food", "photo"],
    summary: t(
      "A long New Orleans street running through Uptown and Garden District-adjacent areas, known for shops, restaurants and neighbourhood browsing. Because it is long, pick a segment instead of trying to walk the whole street.",
      "新奥尔良一条很长的街，穿过上城及花园区周边，以商店、餐厅和街区闲逛闻名。它真的很长，适合选一段走，不适合硬走全程。",
      "업타운과 가든 디스트릭트 주변을 지나는 긴 거리로, 상점과 식당, 동네 산책으로 알려져 있습니다. 길이가 길기 때문에 전부 걷기보다 한 구간을 고르는 편이 좋습니다.",
      "Calle larga de Nueva Orleans por Uptown y zonas cercanas al Garden District, conocida por tiendas, restaurantes y paseo de barrio. Es larga de verdad: elige un tramo, no toda la calle."
    ),
    sources: [wikipedia("Magazine Street", "Magazine_Street"), wikidata("Q6730934")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },

  // Uptown & Audubon
  {
    id: "audubon-park",
    name: t("Audubon Park", "奥杜邦公园", "오듀본 공원", "Audubon Park"),
    localName: "Audubon Park",
    clusterId: "uptown-audubon",
    coordinates: { lat: 29.9329, lng: -90.1301, precision: "area" },
    categories: ["nature", "local", "photo"],
    summary: t(
      "A public park in Uptown New Orleans named for John James Audubon. Lawns, lagoons, live oaks and paths make it a slower outdoor stop after Magazine Street or the streetcar ride.",
      "位于新奥尔良上城的公共公园，以约翰·詹姆斯·奥杜邦命名。草地、湖面、橡树和步道让它适合接在 Magazine 街或有轨电车之后放慢节奏。",
      "존 제임스 오듀본의 이름을 딴 업타운 뉴올리언스의 공공 공원입니다. 잔디, 석호, 라이브 오크와 산책로가 있어 매거진 거리나 스트리트카 뒤에 속도를 낮추기 좋습니다.",
      "Parque publico de Uptown Nueva Orleans llamado por John James Audubon. Praderas, lagunas, robles y senderos lo vuelven una parada lenta tras Magazine Street o el tranvia."
    ),
    sources: [wikipedia("Audubon Park (New Orleans)", "Audubon_Park_(New_Orleans)"), wikidata("Q482024")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },

  // Treme & City Park
  {
    id: "congo-square",
    name: t("Congo Square", "刚果广场", "콩고 스퀘어", "Congo Square"),
    localName: "Congo Square",
    clusterId: "treme-city-park",
    coordinates: { lat: 29.9619, lng: -90.0673, precision: "site" },
    categories: ["culture", "iconic", "photo"],
    summary: t(
      "A historic open space in what is now Louis Armstrong Park, closely associated with African and African American music and gathering traditions in New Orleans. It sits just outside the French Quarter edge.",
      "现位于路易斯·阿姆斯特朗公园内的历史开放空间，与新奥尔良非洲及非裔美国音乐和聚会传统关系密切。它就在法国区边缘之外。",
      "현재 루이 암스트롱 공원 안에 있는 역사적인 열린 공간으로, 뉴올리언스의 아프리카 및 아프리카계 미국인 음악·모임 전통과 깊게 연결됩니다. 프렌치 쿼터 가장자리 바로 밖입니다.",
      "Espacio historico abierto, hoy dentro de Louis Armstrong Park, ligado a tradiciones musicales y de reunion africanas y afroamericanas en Nueva Orleans. Queda justo fuera del borde del French Quarter."
    ),
    sources: [wikipedia("Congo Square", "Congo_Square"), wikidata("Q1121638")],
    visitMinutes: { min: 25, max: 50 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "city-park",
    name: t("City Park", "城市公园", "시티 파크", "City Park"),
    localName: "City Park",
    clusterId: "treme-city-park",
    coordinates: { lat: 29.9862, lng: -90.0934, precision: "area" },
    categories: ["nature", "local", "photo"],
    summary: t(
      "A large public park in New Orleans with lagoons, paths and live oak scenery. It is north of the French Quarter, so it should be a planned bus, taxi or streetcar move rather than an accidental add-on.",
      "新奥尔良大型公共公园，有湖汊、步道和橡树景观。它在法国区以北，适合用公交、出租车或有轨电车专门前往，不适合作为随手加的步行点。",
      "석호, 산책로, 라이브 오크 풍경이 있는 뉴올리언스의 큰 공공 공원입니다. 프렌치 쿼터 북쪽에 있어 버스, 택시, 스트리트카로 계획해서 가는 편이 좋습니다.",
      "Gran parque publico de Nueva Orleans con lagunas, senderos y robles. Queda al norte del French Quarter, asi que debe ser traslado previsto en bus, taxi o tranvia, no añadido casual."
    ),
    sources: [wikipedia("City Park (New Orleans)", "City_Park_(New_Orleans)"), wikidata("Q1093861")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "new-orleans-museum-of-art",
    name: t("New Orleans Museum of Art", "新奥尔良艺术博物馆", "뉴올리언스 미술관", "Museo de Arte de Nueva Orleans"),
    localName: "New Orleans Museum of Art",
    clusterId: "treme-city-park",
    coordinates: { lat: 29.9865, lng: -90.0933, precision: "site" },
    categories: ["culture", "photo", "local"],
    summary: t(
      "The city's main art museum sits inside City Park. Pairing the museum with the park keeps the north-side move coherent instead of treating it as a single isolated building.",
      "这座城市的主要艺术博物馆位于城市公园内。把博物馆和公园一起安排，能让北侧移动更连贯，而不是只去一栋孤立建筑。",
      "도시의 주요 미술관으로 시티 파크 안에 있습니다. 공원과 함께 보면 북쪽 이동이 하나의 동선이 되어, 건물 하나만 따로 찍는 느낌이 줄어듭니다.",
      "El principal museo de arte de la ciudad esta dentro de City Park. Juntarlo con el parque hace coherente el traslado al norte, no una visita aislada a un edificio."
    ),
    sources: [wikipedia("New Orleans Museum of Art", "New_Orleans_Museum_of_Art"), wikidata("Q1471572")],
    visitMinutes: { min: 60, max: 120 },
    bestTime: "daytime",
    setting: "indoor",
    weatherSensitive: false,
    walking: "easy",
  },
]

const cardPhoto = (alt: CityText): CityPhoto => ({
  src: "/assets/destination-new-orleans-card.webp",
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
      "New Orleans destination card view used for the essentials route",
      "新奥尔良目的地卡片景色，用于经典路线",
      "핵심 코스에 쓰는 뉴올리언스 목적지 카드 풍경",
      "Vista de Nueva Orleans para la ruta esencial"
    )
  ),
  photo: cardPhoto(
    t(
      "New Orleans destination card view used for the photo route",
      "新奥尔良目的地卡片景色，用于拍照路线",
      "사진 코스에 쓰는 뉴올리언스 목적지 카드 풍경",
      "Vista de Nueva Orleans para la ruta fotografica"
    )
  ),
  local: cardPhoto(
    t(
      "New Orleans destination card view used for the local route",
      "新奥尔良目的地卡片景色，用于在地路线",
      "로컬 코스에 쓰는 뉴올리언스 목적지 카드 풍경",
      "Vista de Nueva Orleans para la ruta local"
    )
  ),
}

// Reference routes (ADR 0008 §3). Hand-authored, never generated. Times are estimates.
// Streetcar legs use "tram"; longer cross-town moves use bus or taxi.
const routes: TravelRoute[] = [
  {
    id: "essentials",
    theme: "essentials",
    photo: photos.essentials,
    name: t("New Orleans Essentials", "新奥尔良经典一日", "뉴올리언스 핵심 코스", "Nueva Orleans esencial"),
    description: t(
      "Start with the French Quarter square and cathedral, eat near the market, touch the Mississippi, then ride the streetcar toward the Garden District.",
      "从法国区广场和主教座堂开始，在市场附近吃点东西，走到密西西比河边，再坐有轨电车去花园区。",
      "프렌치 쿼터의 광장과 대성당에서 시작해 시장 근처에서 먹고, 미시시피 강변을 본 뒤 스트리트카로 가든 디스트릭트로 갑니다.",
      "Empieza con la plaza y la catedral del French Quarter, come cerca del mercado, toca el Mississippi y toma el tranvia hacia el Garden District."
    ),
    estimatedDurationMinutes: 305,
    stops: [
      {
        placeId: "jackson-square",
        order: 1,
        estimatedVisitMinutes: 45,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Begin where the French Quarter gives you a square, church front and river direction in one compact frame.",
          "从法国区最容易认方向的地方开始：广场、教堂正面和河岸方向都在同一个小范围里。",
          "광장, 대성당 정면, 강 방향이 한 프레임에 들어오는 프렌치 쿼터의 중심에서 시작합니다.",
          "Empieza donde el French Quarter reune plaza, fachada de iglesia y orientacion al rio en un marco compacto."
        ),
      },
      {
        placeId: "st-louis-cathedral",
        order: 2,
        estimatedVisitMinutes: 30,
        estimatedTravelMinutesFromPrevious: 5,
        transportMode: "walk",
        reason: t(
          "Step from the square into the cathedral edge before the day becomes only street wandering.",
          "从广场走到主教座堂边缘，先把核心地标看清，再进入街巷闲逛。",
          "거리 산책만 하기 전에 광장에서 대성당 쪽으로 걸어가 핵심 지점을 잡습니다.",
          "Pasa de la plaza al borde de la catedral antes de que el dia sea solo callejeo."
        ),
      },
      {
        placeId: "cafe-du-monde",
        order: 3,
        estimatedVisitMinutes: 25,
        estimatedTravelMinutesFromPrevious: 5,
        transportMode: "walk",
        reason: t(
          "Keep the first food stop close. Beignets make more sense here than after crossing town.",
          "第一段吃的就近解决。贝涅饼适合在这里吃，不适合跨城后再补。",
          "첫 음식 정차는 가까이 둡니다. 베녜는 도시를 가로지른 뒤보다 여기서 먹는 편이 맞습니다.",
          "Mantén cerca la primera parada de comida. Los beignets tienen mas sentido aqui que tras cruzar la ciudad."
        ),
      },
      {
        placeId: "french-market",
        order: 4,
        estimatedVisitMinutes: 35,
        estimatedTravelMinutesFromPrevious: 8,
        transportMode: "walk",
        reason: t(
          "Continue into the market district while staying inside the same riverfront cluster.",
          "继续走进市场街区，仍然留在同一个河岸片区里。",
          "같은 강변 클러스터 안에서 시장 구역으로 이어갑니다.",
          "Sigue al distrito del mercado sin salir del mismo cluster ribereno."
        ),
      },
      {
        placeId: "woldenberg-park",
        order: 5,
        estimatedVisitMinutes: 30,
        estimatedTravelMinutesFromPrevious: 12,
        transportMode: "walk",
        reason: t(
          "Use the riverfront as the open-air reset after the dense market and Quarter streets.",
          "走完密集的市场和法国区街巷后，用河岸作为开阔的重置点。",
          "시장과 프렌치 쿼터의 빽빽한 거리 뒤에 강변을 열린 휴식점으로 씁니다.",
          "Usa la ribera como pausa abierta tras el mercado y las calles densas del Quarter."
        ),
      },
      {
        placeId: "garden-district",
        order: 6,
        estimatedVisitMinutes: 50,
        estimatedTravelMinutesFromPrevious: 30,
        transportMode: "tram",
        reason: t(
          "Ride the streetcar west instead of forcing a long walk. The Garden District should feel like a new chapter, not a tired extension.",
          "坐有轨电车向西，不硬走长距离。花园区应该像新章节，而不是疲惫的延长线。",
          "긴 거리를 억지로 걷지 말고 스트리트카로 서쪽으로 갑니다. 가든 디스트릭트는 지친 연장이 아니라 새 장이어야 합니다.",
          "Toma el tranvia al oeste en vez de forzar una caminata larga. El Garden District debe sentirse como otro capitulo, no una extension cansada."
        ),
      },
      {
        placeId: "lafayette-cemetery-one",
        order: 7,
        estimatedVisitMinutes: 25,
        estimatedTravelMinutesFromPrevious: 8,
        transportMode: "walk",
        reason: t(
          "Finish with a short neighbourhood walk to the cemetery context, keeping the last move inside the Garden District.",
          "最后在街区内短走到公墓背景点，把收尾留在花园区内部。",
          "마지막은 동네 안에서 묘지 맥락까지 짧게 걷습니다. 가든 디스트릭트 안에서 끝납니다.",
          "Termina con una caminata corta al contexto del cementerio, dentro del Garden District."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "It moves French Quarter -> riverfront -> Garden District, with no return to a previous cluster.",
        "路线按法国区 -> 河岸 -> 花园区推进，不回到已经离开的片区。",
        "프렌치 쿼터 -> 강변 -> 가든 디스트릭트로 이동하며 이전 클러스터로 돌아가지 않습니다.",
        "Avanza French Quarter -> ribera -> Garden District, sin volver a un cluster anterior."
      ),
      t(
        "The compact old-city stops stay walkable; the westward move uses the streetcar.",
        "老城内部保持步行，向西的长距离用有轨电车解决。",
        "압축된 구시가지 구간은 걷고, 서쪽 장거리는 스트리트카를 씁니다.",
        "Las paradas compactas del casco antiguo van a pie; el salto oeste usa tranvia."
      ),
      t(
        "It balances the postcard core with one slower residential district.",
        "它把明信片式核心和一个更慢的居住街区放在同一天里。",
        "엽서 같은 중심부와 느린 주거 동네 하나를 균형 있게 넣습니다.",
        "Equilibra el nucleo de postal con un barrio residencial mas lento."
      ),
    ],
    goodFor: [
      t("First visit with one full day", "第一次来、有一整天", "첫 방문, 하루 종일", "Primera visita con un dia completo"),
      t("French Quarter plus Garden District", "法国区加花园区", "프렌치 쿼터와 가든 디스트릭트", "French Quarter y Garden District"),
      t("Travellers who want food and history", "想兼顾吃和历史的人", "음식과 역사를 함께 원하는 여행자", "Quien quiere comida e historia"),
    ],
    tradeoffs: [
      t(
        "City Park is skipped here; use the Photo or Local route if you want the north-side park and museum.",
        "这条线不去城市公园；如果想看北侧公园和博物馆，走拍照或在地路线。",
        "이 코스에서는 시티 파크를 뺍니다. 북쪽 공원과 미술관을 원하면 사진 또는 로컬 코스를 쓰세요.",
        "City Park queda fuera; usa Photo o Local si quieres el parque y museo del norte."
      ),
      t(
        "Bourbon Street is not the focus. Add it at night if that scene matters.",
        "波旁街不是这条线的重点。如果你在意夜生活，可晚上另加。",
        "버번 스트리트는 중심이 아닙니다. 밤 분위기가 중요하면 저녁에 따로 더하세요.",
        "Bourbon Street no es el foco. Anadela de noche si esa escena importa."
      ),
      t(
        "Cemetery access can change, so the Garden District walk still needs to work without going inside.",
        "公墓开放情况可能变化，所以花园区步行即使不入内也要成立。",
        "묘지 접근은 바뀔 수 있어, 내부에 들어가지 않아도 가든 디스트릭트 산책이 성립해야 합니다.",
        "El acceso al cementerio puede cambiar; el paseo por Garden District debe funcionar sin entrar."
      ),
    ],
  },
  {
    id: "photo",
    theme: "photo",
    photo: photos.photo,
    name: t("Photo New Orleans", "拍照新奥尔良", "사진으로 보는 뉴올리언스", "Nueva Orleans en fotos"),
    description: t(
      "Start with City Park and the museum setting, move through Congo Square, then photograph Royal Street, Bourbon Street, Jackson Square and the riverfront.",
      "从城市公园和博物馆环境开始，经刚果广场，再拍皇家街、波旁街、杰克逊广场和河岸。",
      "시티 파크와 미술관 주변에서 시작해 콩고 스퀘어를 지나 로열 스트리트, 버번 스트리트, 잭슨 스퀘어와 강변을 찍습니다.",
      "Empieza con City Park y el museo, pasa por Congo Square y fotografia Royal Street, Bourbon Street, Jackson Square y la ribera."
    ),
    estimatedDurationMinutes: 330,
    stops: [
      {
        placeId: "new-orleans-museum-of-art",
        order: 1,
        estimatedVisitMinutes: 60,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Begin with the museum and park setting while the north-side light is still easier.",
          "从博物馆和公园环境开始，趁北侧光线还比较好处理。",
          "북쪽의 빛이 아직 편할 때 미술관과 공원 환경에서 시작합니다.",
          "Empieza con el museo y el parque mientras la luz del norte aun es manejable."
        ),
      },
      {
        placeId: "city-park",
        order: 2,
        estimatedVisitMinutes: 45,
        estimatedTravelMinutesFromPrevious: 10,
        transportMode: "walk",
        reason: t(
          "Stay in City Park for oaks, water and slower frames before moving back toward the old city.",
          "留在城市公园内拍橡树、水面和更慢的画面，再往老城方向移动。",
          "구시가지로 돌아가기 전에 시티 파크 안에서 참나무, 물, 느린 장면을 봅니다.",
          "Quedate en City Park para robles, agua y encuadres mas lentos antes de volver al casco antiguo."
        ),
      },
      {
        placeId: "congo-square",
        order: 3,
        estimatedVisitMinutes: 30,
        estimatedTravelMinutesFromPrevious: 20,
        transportMode: "bus",
        reason: t(
          "Use bus or taxi toward Treme. Congo Square bridges the park side and the French Quarter edge.",
          "坐公交或打车往特雷梅。刚果广场把公园一侧和法国区边缘接起来。",
          "버스나 택시로 트레메 쪽으로 갑니다. 콩고 스퀘어가 공원 쪽과 프렌치 쿼터 가장자리를 잇습니다.",
          "Usa bus o taxi hacia Treme. Congo Square une el lado del parque con el borde del French Quarter."
        ),
      },
      {
        placeId: "royal-street",
        order: 4,
        estimatedVisitMinutes: 35,
        estimatedTravelMinutesFromPrevious: 15,
        transportMode: "walk",
        reason: t(
          "Walk into the French Quarter through the calmer balcony-and-gallery street before the louder blocks.",
          "先从更安静、有阳台和画廊的街走进法国区，再进入更热闹的街段。",
          "더 시끄러운 블록 전에 발코니와 갤러리가 있는 조용한 거리로 프렌치 쿼터에 들어갑니다.",
          "Entra caminando al French Quarter por la calle mas tranquila de balcones y galerias antes de los bloques ruidosos."
        ),
      },
      {
        placeId: "bourbon-street",
        order: 5,
        estimatedVisitMinutes: 25,
        estimatedTravelMinutesFromPrevious: 8,
        transportMode: "walk",
        reason: t(
          "Cross to Bourbon for the contrast, but keep it short so it does not flatten the whole photo day.",
          "横切到波旁街看对比，但时间控制短一点，避免整天照片都被同一种氛围覆盖。",
          "대비를 위해 버번 스트리트로 건너가되, 하루 사진이 한 분위기로만 굳지 않게 짧게 둡니다.",
          "Cruza a Bourbon para el contraste, pero mantenlo corto para que no domine todo el dia fotografico."
        ),
      },
      {
        placeId: "jackson-square",
        order: 6,
        estimatedVisitMinutes: 35,
        estimatedTravelMinutesFromPrevious: 8,
        transportMode: "walk",
        reason: t(
          "Return to a cleaner civic frame at the square before ending by the water.",
          "到河边收尾前，先回到广场这个更清晰的城市画面。",
          "물가에서 끝내기 전에 광장의 더 정돈된 도시 프레임으로 돌아옵니다.",
          "Vuelve a un encuadre civico mas limpio en la plaza antes de cerrar junto al agua."
        ),
      },
      {
        placeId: "woldenberg-park",
        order: 7,
        estimatedVisitMinutes: 30,
        estimatedTravelMinutesFromPrevious: 10,
        transportMode: "walk",
        reason: t(
          "End on the Mississippi side for open sky and river light after the dense streets.",
          "在密西西比河边收尾，用开阔天空和河面光线结束密集街巷。",
          "빽빽한 거리 뒤에 열린 하늘과 강빛이 있는 미시시피 쪽에서 마무리합니다.",
          "Termina junto al Mississippi con cielo abierto y luz de rio tras las calles densas."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "It moves north park -> Treme -> French Quarter -> riverfront without returning to City Park.",
        "路线从北侧公园 -> 特雷梅 -> 法国区 -> 河岸推进，不回到城市公园。",
        "북쪽 공원 -> 트레메 -> 프렌치 쿼터 -> 강변으로 이동하며 시티 파크로 돌아가지 않습니다.",
        "Avanza parque norte -> Treme -> French Quarter -> ribera sin volver a City Park."
      ),
      t(
        "The route changes visual scale: park, cultural square, balconies, nightlife street, civic square and river.",
        "视觉尺度有变化：公园、文化广场、阳台街、夜生活街、城市广场和河岸。",
        "공원, 문화 광장, 발코니 거리, 밤 문화 거리, 시민 광장, 강변으로 시각 스케일이 바뀝니다.",
        "Cambia de escala visual: parque, plaza cultural, balcones, calle nocturna, plaza civica y rio."
      ),
      t(
        "Longer north-side movement uses bus or taxi; walking is saved for connected old-city blocks.",
        "北侧较长移动用公交或出租车，步行留给真正相连的老城街段。",
        "북쪽의 긴 이동은 버스나 택시로 처리하고, 걷기는 이어진 구시가지 블록에 남깁니다.",
        "El movimiento largo del norte usa bus o taxi; caminar queda para bloques conectados del casco antiguo."
      ),
    ],
    goodFor: [
      t("Travelling with a camera", "带相机出门", "카메라를 들고 다니는 여행", "Viajar con camara"),
      t("Park light plus French Quarter texture", "公园光线加法国区质感", "공원 빛과 프렌치 쿼터 질감", "Luz de parque y textura del French Quarter"),
      t("A second day after the classic route", "经典路线后的第二天", "핵심 코스 다음 날", "Un segundo dia tras lo clasico"),
    ],
    tradeoffs: [
      t(
        "This route gives less time to the Garden District. Use Essentials or Local if that is the priority.",
        "这条线给花园区的时间少。如果它是重点，走经典或在地路线。",
        "이 코스는 가든 디스트릭트 시간이 적습니다. 그곳이 우선이면 핵심 또는 로컬 코스를 쓰세요.",
        "Da menos tiempo al Garden District. Usa Esencial o Local si eso es prioridad."
      ),
      t(
        "Bourbon Street can overwhelm the quieter frames. Treat it as contrast, not the main set.",
        "波旁街容易压过安静画面。把它当对比，不要当主片场。",
        "버번 스트리트는 조용한 장면을 압도할 수 있습니다. 메인 세트가 아니라 대비로 보세요.",
        "Bourbon Street puede dominar los encuadres tranquilos. Usala como contraste, no como set principal."
      ),
      t(
        "Rain weakens the park and riverfront stops; the museum still gives an indoor anchor.",
        "下雨会削弱公园和河岸，但博物馆仍能撑住室内部分。",
        "비가 오면 공원과 강변이 약해지지만, 미술관이 실내 중심을 잡아 줍니다.",
        "La lluvia reduce parque y ribera; el museo aun da un ancla interior."
      ),
    ],
  },
  {
    id: "local",
    theme: "local",
    photo: photos.local,
    name: t("Local New Orleans", "在地新奥尔良", "로컬 뉴올리언스", "Nueva Orleans local"),
    description: t(
      "A slower day outside the postcard core: Warehouse District art, Garden District houses, Magazine Street browsing, Audubon Park, then City Park and NOMA.",
      "少一点明信片核心：仓库区艺术、花园区住宅、Magazine 街闲逛、奥杜邦公园，再到城市公园和新奥尔良艺术博物馆。",
      "엽서 같은 중심부를 조금 벗어난 느린 하루입니다. 웨어하우스 지구 예술, 가든 디스트릭트 주택, 매거진 거리, 오듀본 공원, 시티 파크와 미술관.",
      "Un dia mas lento fuera del nucleo postal: arte del Warehouse District, casas del Garden District, Magazine Street, Audubon Park, City Park y NOMA."
    ),
    estimatedDurationMinutes: 420,
    stops: [
      {
        placeId: "contemporary-arts-center",
        order: 1,
        estimatedVisitMinutes: 45,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Start with the arts side of the city before moving into residential neighbourhoods.",
          "先从城市的艺术一面开始，再进入居住街区。",
          "주거 동네로 이동하기 전에 도시의 예술 쪽에서 시작합니다.",
          "Empieza con el lado artistico de la ciudad antes de pasar a barrios residenciales."
        ),
      },
      {
        placeId: "garden-district",
        order: 2,
        estimatedVisitMinutes: 55,
        estimatedTravelMinutesFromPrevious: 25,
        transportMode: "tram",
        reason: t(
          "Use the streetcar toward the Garden District; the ride is part of the neighbourhood handoff.",
          "坐有轨电车去花园区；这段车程本身就是街区切换的一部分。",
          "스트리트카로 가든 디스트릭트 쪽으로 갑니다. 이 이동 자체가 동네 전환입니다.",
          "Usa el tranvia hacia el Garden District; el trayecto tambien cambia el barrio."
        ),
      },
      {
        placeId: "magazine-street",
        order: 3,
        estimatedVisitMinutes: 55,
        estimatedTravelMinutesFromPrevious: 15,
        transportMode: "bus",
        reason: t(
          "Take a short bus or rideshare hop to the Magazine segment you actually want to browse.",
          "短程坐公交或打车到你真正想逛的 Magazine 街段。",
          "실제로 둘러볼 매거진 거리 구간까지 짧게 버스나 차량 이동을 합니다.",
          "Toma un bus corto o coche al tramo de Magazine que de verdad quieres recorrer."
        ),
      },
      {
        placeId: "audubon-park",
        order: 4,
        estimatedVisitMinutes: 55,
        estimatedTravelMinutesFromPrevious: 20,
        transportMode: "bus",
        reason: t(
          "Continue Uptown for green space instead of stretching Magazine Street until it becomes tiring.",
          "继续去上城的绿地，不把 Magazine 街硬走到疲惫。",
          "매거진 거리를 지칠 때까지 늘리지 말고 업타운의 녹지로 이어갑니다.",
          "Sigue a Uptown para espacio verde en vez de alargar Magazine Street hasta cansarte."
        ),
      },
      {
        placeId: "city-park",
        order: 5,
        estimatedVisitMinutes: 50,
        estimatedTravelMinutesFromPrevious: 30,
        transportMode: "taxi",
        reason: t(
          "Make the cross-town park jump honestly by taxi or rideshare. It is too far to pretend it is a walk.",
          "跨城去城市公园就老实打车或叫车，这段太远，不适合假装成步行。",
          "시티 파크로 가는 도시 횡단은 택시나 차량으로 처리합니다. 걷기처럼 꾸미기엔 너무 멉니다.",
          "Haz el salto a City Park en taxi o coche. Esta demasiado lejos para fingir que es paseo."
        ),
      },
      {
        placeId: "new-orleans-museum-of-art",
        order: 6,
        estimatedVisitMinutes: 60,
        estimatedTravelMinutesFromPrevious: 10,
        transportMode: "walk",
        reason: t(
          "End inside the same park cluster at NOMA, giving the day an indoor finish after long outdoor blocks.",
          "在同一公园片区内走到 NOMA 收尾，让一整天户外之后有一个室内终点。",
          "같은 공원 클러스터 안의 NOMA에서 마무리해 긴 야외 구간 뒤 실내 끝점을 둡니다.",
          "Termina en NOMA dentro del mismo cluster de parque, con cierre interior tras mucho exterior."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "It moves Warehouse District -> Garden/Magazine -> Audubon -> City Park, always forward.",
        "路线按仓库区 -> 花园/Magazine -> 奥杜邦 -> 城市公园推进，只往前走。",
        "웨어하우스 지구 -> 가든/매거진 -> 오듀본 -> 시티 파크로 앞으로만 이동합니다.",
        "Avanza Warehouse District -> Garden/Magazine -> Audubon -> City Park, siempre hacia delante."
      ),
      t(
        "It uses transit or taxi for the real gaps and keeps walking inside places that reward it.",
        "真实距离用公交、有轨电车或出租车，步行留给值得慢走的地点内部。",
        "실제 거리 차이는 대중교통이나 택시로 처리하고, 걷기는 걸을 가치가 있는 장소 안에 둡니다.",
        "Usa transporte o taxi para los huecos reales y deja caminar para lugares que lo merecen."
      ),
      t(
        "The day is less about icons and more about neighbourhood rhythm, parks and museums.",
        "这一天少一点地标，多一点街区节奏、公园和博物馆。",
        "이 하루는 랜드마크보다 동네 리듬, 공원, 미술관에 가깝습니다.",
        "El dia trata menos de iconos y mas de ritmo de barrio, parques y museos."
      ),
    ],
    goodFor: [
      t("A slower second or third day", "第二或第三天的慢路线", "둘째나 셋째 날의 느린 코스", "Un segundo o tercer dia lento"),
      t("Neighbourhood browsing and parks", "街区闲逛与公园", "동네 산책과 공원", "Barrios y parques"),
      t("Travellers who already saw the French Quarter", "已经看过法国区的人", "프렌치 쿼터를 이미 본 여행자", "Quien ya vio el French Quarter"),
    ],
    tradeoffs: [
      t(
        "This has the biggest cross-town jump. It is manageable, but only if you accept the taxi leg.",
        "这条线有最大的一段跨城移动。可行，但前提是接受打车那一段。",
        "이 코스는 가장 큰 도시 횡단 이동이 있습니다. 택시 구간을 받아들이면 괜찮습니다.",
        "Tiene el mayor salto urbano. Funciona si aceptas el tramo en taxi."
      ),
      t(
        "It does not include Jackson Square. Use Essentials if this is your first New Orleans walk.",
        "它不包含杰克逊广场。如果这是你第一次走新奥尔良，先用经典线。",
        "잭슨 스퀘어는 없습니다. 뉴올리언스 첫 산책이라면 핵심 코스를 쓰세요.",
        "No incluye Jackson Square. Usa Esencial si es tu primer paseo por Nueva Orleans."
      ),
      t(
        "Magazine Street can expand endlessly; pick one segment and protect time for the parks.",
        "Magazine 街可以无限延长；选一段就好，把时间留给公园。",
        "매거진 거리는 끝없이 늘어날 수 있습니다. 한 구간만 고르고 공원 시간을 지키세요.",
        "Magazine Street puede alargarse sin fin; elige un tramo y protege tiempo para los parques."
      ),
    ],
  },
]

export const newOrleans: City = {
  slug: "new-orleans",
  name: t("New Orleans", "新奥尔良", "뉴올리언스", "Nueva Orleans"),
  localName: "New Orleans",
  country: t("United States", "美国", "미국", "Estados Unidos"),
  intro: t(
    "New Orleans is easiest to read by clusters: the French Quarter gives the old-city core, the French Market and Mississippi riverfront open it out, the Garden District and Magazine Street slow the pace westward, and City Park anchors the north-side museum-and-oak landscape. A good first visit walks the compact Quarter, then uses streetcars, buses or taxis for the longer moves.",
    "新奥尔良最好按片区理解：法国区是老城核心，法国市场与密西西比河岸把空间打开，花园区和 Magazine 街把节奏向西放慢，城市公园则承接北侧的博物馆与橡树景观。第一次来，法国区适合步行，较长移动用有轨电车、公交或出租车。",
    "뉴올리언스는 클러스터로 볼 때 이해하기 쉽습니다. 프렌치 쿼터는 구시가지 중심, 프렌치 마켓과 미시시피 강변은 열린 가장자리, 가든 디스트릭트와 매거진 거리는 서쪽의 느린 리듬, 시티 파크는 북쪽의 미술관과 참나무 풍경입니다. 첫 방문은 압축된 쿼터를 걷고, 긴 이동은 스트리트카, 버스, 택시를 쓰는 편이 좋습니다.",
    "Nueva Orleans se entiende mejor por clusters: el French Quarter da el nucleo antiguo, el French Market y la ribera del Mississippi lo abren, Garden District y Magazine Street bajan el ritmo hacia el oeste, y City Park ancla el norte de museos y robles. En una primera visita, camina el Quarter compacto y usa tranvias, buses o taxis para saltos largos."
  ),
  hero: cardPhoto(
    t(
      "New Orleans destination card view with French Quarter texture and warm city light",
      "新奥尔良目的地卡片：法国区质感与温暖城市光线",
      "프렌치 쿼터 질감과 따뜻한 도시 빛이 있는 뉴올리언스 목적지 카드",
      "Vista de Nueva Orleans con textura del French Quarter y luz calida"
    )
  ),
  map: {
    // Schematic Mississippi River edge near the French Quarter. Not for navigation.
    // Kept south/east of the riverfront stops so no place point sits inside water.
    water: [
      [-90.066, 29.942],
      [-90.058, 29.947],
      [-90.05, 29.952],
      [-90.046, 29.955],
      [-90.045, 29.949],
      [-90.057, 29.943],
      [-90.065, 29.939],
    ],
    waterLabel: t("Mississippi River", "密西西比河", "미시시피강", "Rio Mississippi"),
    waterLabelAt: [-90.056, 29.948],
  },
  clusters,
  places,
  routes,
}
