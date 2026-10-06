import type { City, CityPhoto, CityText, Cluster, Place, Source, TravelRoute } from "./types"

// Lisbon city layer (ADR 0008).
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
    id: "baixa-chiado",
    side: "island",
    neighbours: ["alfama-castle", "bairro-cais", "avenida-parque"],
    name: t("Baixa & Chiado", "拜沙与希亚多", "바이샤·시아두", "Baixa y Chiado"),
  },
  {
    id: "alfama-castle",
    side: "island",
    neighbours: ["baixa-chiado", "graca-viewpoints"],
    name: t("Alfama & Castle Hill", "阿尔法玛与城堡山", "알파마·성 언덕", "Alfama y colina del castillo"),
  },
  {
    id: "graca-viewpoints",
    side: "island",
    neighbours: ["alfama-castle"],
    name: t("Graca Viewpoints", "格拉萨观景台", "그라사 전망대", "Miradores de Graca"),
  },
  {
    id: "bairro-cais",
    side: "island",
    neighbours: ["baixa-chiado", "alcantara-lx"],
    name: t("Bairro Alto & Cais do Sodre", "上城区与苏德雷码头", "바이후 알투·카이스 두 소드레", "Bairro Alto y Cais do Sodre"),
  },
  {
    id: "alcantara-lx",
    side: "island",
    neighbours: ["bairro-cais", "belem"],
    name: t("Alcantara & LX", "阿尔坎塔拉与 LX", "알칸타라·LX", "Alcantara y LX"),
  },
  {
    id: "belem",
    side: "island",
    neighbours: ["alcantara-lx"],
    name: t("Belem Riverfront", "贝伦河岸", "벨렝 강변", "Ribera de Belem"),
  },
  {
    id: "avenida-parque",
    side: "island",
    neighbours: ["baixa-chiado", "parque-nacoes"],
    name: t("Avenida & Park Museums", "自由大道与公园博物馆", "아베니다·공원 박물관", "Avenida y museos del parque"),
  },
  {
    id: "parque-nacoes",
    side: "island",
    neighbours: ["avenida-parque"],
    name: t("Parque das Nacoes", "万国公园", "파르크 다스 나소에스", "Parque das Nacoes"),
  },
]

const places: Place[] = [
  // Baixa & Chiado
  {
    id: "praca-comercio",
    name: t("Praca do Comercio", "商业广场", "코메르시우 광장", "Praca do Comercio"),
    localName: "Praca do Comercio",
    clusterId: "baixa-chiado",
    coordinates: { lat: 38.7075, lng: -9.1364, precision: "site" },
    categories: ["iconic", "photo", "culture"],
    summary: t(
      "Lisbon's large riverside square at the edge of Baixa, rebuilt after the 1755 earthquake on the site of the former royal palace. The open side faces the Tagus, which makes it the clearest first orientation point in the city.",
      "里斯本拜沙边缘的大型河畔广场，1755 年地震后在旧王宫原址重建。广场开口面向特茹河，是第一次到里斯本时最容易辨认方向的起点。",
      "바이샤 끝의 큰 강변 광장으로, 1755년 지진 뒤 옛 왕궁 터에 다시 세워졌습니다. 열린 면이 테주강을 향해 있어 리스본 첫 방향 잡기에 가장 쉽습니다.",
      "Gran plaza junto al Tajo en el borde de Baixa, reconstruida tras el terremoto de 1755 sobre el antiguo palacio real. Su lado abierto mira al rio y ayuda a orientarse al llegar."
    ),
    sources: [wikipedia("Praça do Comércio", "Pra%C3%A7a_do_Com%C3%A9rcio"), wikidata("Q207731")],
    visitMinutes: { min: 25, max: 45 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "rossio",
    name: t("Rossio Square", "罗西奥广场", "호시우 광장", "Plaza del Rossio"),
    localName: "Praca de D. Pedro IV",
    clusterId: "baixa-chiado",
    coordinates: { lat: 38.7139, lng: -9.1394, precision: "site" },
    categories: ["local", "culture", "photo"],
    summary: t(
      "A central Lisbon square officially named Praca de D. Pedro IV. It has been one of the city's main public gathering places since the Middle Ages, with wave-pattern paving and the National Theatre on its north side.",
      "里斯本中心广场，正式名称为佩德罗四世广场。自中世纪以来就是城市主要公共聚集地之一，地面有波浪石铺，北侧是国家剧院。",
      "공식 명칭은 동 페드루 4세 광장인 리스본 중심 광장입니다. 중세부터 주요 만남의 장소였고, 물결무늬 포장과 북쪽의 국립극장이 특징입니다.",
      "Plaza central de Lisboa, oficialmente Praca de D. Pedro IV. Desde la Edad Media ha sido lugar principal de encuentro, con pavimento ondulado y el Teatro Nacional al norte."
    ),
    sources: [wikipedia("Rossio", "Rossio"), wikidata("Q208063")],
    visitMinutes: { min: 20, max: 40 },
    bestTime: "any",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "santa-justa-lift",
    name: t("Santa Justa Lift", "圣胡斯塔升降机", "산타 주스타 엘리베이터", "Elevador de Santa Justa"),
    localName: "Elevador de Santa Justa",
    clusterId: "baixa-chiado",
    coordinates: { lat: 38.7121, lng: -9.1395, precision: "site" },
    categories: ["iconic", "photo"],
    summary: t(
      "A wrought-iron elevator linking Baixa to the higher Largo do Carmo area. It opened in the early twentieth century and remains both a transport landmark and a viewpoint over central Lisbon.",
      "连接拜沙低地与卡尔莫广场高处的铁制升降机，二十世纪初开放。它既是交通地标，也是俯看里斯本中心的观景点。",
      "바이샤 저지대와 높은 카르무 광장 일대를 잇는 철제 엘리베이터입니다. 20세기 초 문을 열었고, 교통 명소이자 도심 전망대입니다.",
      "Ascensor de hierro que une Baixa con la zona alta de Largo do Carmo. Abrió a comienzos del siglo XX y sigue siendo hito de transporte y mirador."
    ),
    sources: [wikipedia("Santa Justa Lift", "Santa_Justa_Lift"), wikidata("Q747072")],
    visitMinutes: { min: 20, max: 45 },
    bestTime: "morning",
    setting: "mixed",
    weatherSensitive: false,
    walking: "moderate",
  },
  {
    id: "chiado",
    name: t("Chiado", "希亚多", "시아두", "Chiado"),
    localName: "Chiado",
    clusterId: "baixa-chiado",
    coordinates: { lat: 38.7109, lng: -9.1426, precision: "area" },
    categories: ["local", "culture", "food"],
    summary: t(
      "A historic shopping and cultural district between Baixa and Bairro Alto. Its cafes, theatres, bookshops and rebuilt streets make it the soft handoff between Lisbon's flat grid and the western hills.",
      "拜沙与上城区之间的历史商业与文化街区。咖啡馆、剧院、书店和重建后的街道，让这里成为平坦拜沙与西侧山坡之间的自然过渡。",
      "바이샤와 바이후 알투 사이의 역사적인 쇼핑·문화 지구입니다. 카페, 극장, 서점, 다시 지어진 거리들이 평지와 서쪽 언덕을 자연스럽게 잇습니다.",
      "Barrio historico de compras y cultura entre Baixa y Bairro Alto. Cafes, teatros, librerias y calles reconstruidas lo convierten en paso natural hacia las colinas occidentales."
    ),
    sources: [wikipedia("Chiado", "Chiado"), wikidata("Q925044")],
    visitMinutes: { min: 35, max: 75 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "moderate",
  },

  // Alfama & Castle Hill
  {
    id: "alfama",
    name: t("Alfama", "阿尔法玛", "알파마", "Alfama"),
    localName: "Alfama",
    clusterId: "alfama-castle",
    coordinates: { lat: 38.7122, lng: -9.1297, precision: "area" },
    categories: ["local", "culture", "photo"],
    summary: t(
      "One of Lisbon's oldest neighbourhoods, spreading down the slope between Sao Jorge Castle and the Tagus. Narrow lanes, stairways and small squares make it rewarding but slower than it looks on a map.",
      "里斯本最古老的街区之一，从圣乔治城堡坡地一直延伸到特茹河。窄巷、阶梯和小广场让这里很值得走，但实际速度比地图上看起来慢。",
      "상 조르즈 성과 테주강 사이 비탈에 펼쳐진 리스본의 오래된 동네 중 하나입니다. 좁은 골목과 계단, 작은 광장 때문에 좋지만 지도보다 느리게 움직입니다.",
      "Uno de los barrios mas antiguos de Lisboa, bajando desde el Castelo de Sao Jorge hacia el Tajo. Sus callejones, escaleras y plazas pequenas hacen que se avance despacio."
    ),
    sources: [wikipedia("Alfama", "Alfama"), wikidata("Q925062")],
    visitMinutes: { min: 35, max: 80 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "moderate",
  },
  {
    id: "sao-jorge-castle",
    name: t("Sao Jorge Castle", "圣乔治城堡", "상 조르즈 성", "Castelo de Sao Jorge"),
    localName: "Castelo de Sao Jorge",
    clusterId: "alfama-castle",
    coordinates: { lat: 38.7139, lng: -9.1335, precision: "site" },
    categories: ["iconic", "culture", "photo"],
    summary: t(
      "A hilltop castle above central Lisbon, with fortifications associated with the medieval city. Its walls and terraces look over Baixa, the Tagus and Alfama, so the climb is part history and part orientation.",
      "位于里斯本中心上方山顶的城堡，城防与中世纪城市历史相关。城墙和平台可俯瞰拜沙、特茹河与阿尔法玛，爬上来既看历史也认城市结构。",
      "리스본 중심 위 언덕의 성으로, 중세 도시 방어와 관련이 있습니다. 성벽과 테라스에서 바이샤, 테주강, 알파마를 내려다볼 수 있습니다.",
      "Castillo en una colina sobre el centro de Lisboa, ligado a la ciudad medieval. Murallas y terrazas miran a Baixa, al Tajo y a Alfama; la subida sirve para entender la ciudad."
    ),
    sources: [wikipedia("São Jorge Castle", "S%C3%A3o_Jorge_Castle"), wikidata("Q652399")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "steep",
  },
  {
    id: "lisbon-cathedral",
    name: t("Lisbon Cathedral", "里斯本主教座堂", "리스본 대성당", "Catedral de Lisboa"),
    localName: "Se de Lisboa",
    clusterId: "alfama-castle",
    coordinates: { lat: 38.7101, lng: -9.1333, precision: "site" },
    categories: ["culture", "iconic"],
    summary: t(
      "Lisbon's cathedral, often called the Se, founded after the Christian conquest of the city in the twelfth century. Its Romanesque front sits on the route between Baixa and Alfama.",
      "里斯本主教座堂，常称 Se，十二世纪基督教重新占领城市后创建。罗曼式正立面位于拜沙通往阿尔法玛的路线上。",
      "흔히 세라고 부르는 리스본 대성당으로, 12세기 도시가 기독교 세력에 넘어간 뒤 세워졌습니다. 로마네스크 정면은 바이샤와 알파마 사이 길목에 있습니다.",
      "La catedral de Lisboa, llamada la Se, fundada tras la conquista cristiana del siglo XII. Su fachada romanica queda en la ruta entre Baixa y Alfama."
    ),
    sources: [wikipedia("Lisbon Cathedral", "Lisbon_Cathedral"), wikidata("Q836545")],
    visitMinutes: { min: 20, max: 45 },
    bestTime: "morning",
    setting: "mixed",
    weatherSensitive: false,
    walking: "moderate",
  },
  {
    id: "miradouro-santa-luzia",
    name: t("Miradouro de Santa Luzia", "圣卢西亚观景台", "산타 루지아 전망대", "Miradouro de Santa Luzia"),
    localName: "Miradouro de Santa Luzia",
    clusterId: "alfama-castle",
    coordinates: { lat: 38.7118, lng: -9.1306, precision: "site" },
    categories: ["photo", "local", "nature"],
    summary: t(
      "A terrace viewpoint on the edge of Alfama, looking over tiled roofs and the Tagus. It is close to the tram route and gives a gentler pause before or after the castle climb.",
      "阿尔法玛边缘的露台观景点，可看红瓦屋顶与特茹河。它靠近电车线路，是上城堡前后较轻松的停顿点。",
      "알파마 가장자리의 테라스 전망대로, 기와지붕과 테주강을 볼 수 있습니다. 트램 노선 가까이에 있어 성 오르내림 전후 쉬기 좋습니다.",
      "Mirador en terraza al borde de Alfama, con tejados y el Tajo. Esta cerca del tranvia y funciona como pausa suave antes o despues del castillo."
    ),
    sources: [wikipedia("Miradouro de Santa Luzia", "Miradouro_de_Santa_Luzia"), wikidata("Q10327124")],
    visitMinutes: { min: 15, max: 30 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "moderate",
  },

  // Graca Viewpoints
  {
    id: "miradouro-senhora-monte",
    name: t("Miradouro da Senhora do Monte", "圣母山观景台", "세뇨라 두 몬테 전망대", "Miradouro da Senhora do Monte"),
    localName: "Miradouro da Senhora do Monte",
    clusterId: "graca-viewpoints",
    coordinates: { lat: 38.7191, lng: -9.1327, precision: "site" },
    categories: ["photo", "nature", "iconic"],
    summary: t(
      "One of Lisbon's highest central viewpoints, above Graca. It looks back across the castle, Baixa and the river, making it a good wide-angle answer to the tighter Alfama lanes.",
      "位于格拉萨上方、里斯本中心较高的观景点之一。这里可回看城堡、拜沙与河面，是阿尔法玛窄巷之后的开阔视角。",
      "그라사 위쪽의 리스본 중심부 높은 전망대 중 하나입니다. 성, 바이샤, 강을 함께 내려다볼 수 있어 알파마 골목 뒤에 시야가 넓어집니다.",
      "Uno de los miradores centrales mas altos de Lisboa, sobre Graca. Mira hacia el castillo, Baixa y el rio, una respuesta amplia a los callejones de Alfama."
    ),
    sources: [wikipedia("Miradouro da Senhora do Monte", "Miradouro_da_Senhora_do_Monte"), wikidata("Q10328568")],
    visitMinutes: { min: 20, max: 40 },
    bestTime: "sunset",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "steep",
  },

  // Bairro Alto & Cais do Sodre
  {
    id: "bairro-alto",
    name: t("Bairro Alto", "上城区", "바이후 알투", "Bairro Alto"),
    localName: "Bairro Alto",
    clusterId: "bairro-cais",
    coordinates: { lat: 38.7132, lng: -9.1448, precision: "area" },
    categories: ["night", "local", "food"],
    summary: t(
      "A hill neighbourhood west of Baixa and Chiado, famous for compact streets that become busy at night. By day it is a slow grid of small shops, cafes and viewpoints.",
      "拜沙与希亚多以西的山坡街区，以夜间热闹的密集小街闻名。白天这里是小店、咖啡馆和观景点组成的慢节奏网格。",
      "바이샤와 시아두 서쪽 언덕 동네로, 밤에 붐비는 좁은 거리로 유명합니다. 낮에는 작은 가게, 카페, 전망대가 이어지는 느린 골목입니다.",
      "Barrio en colina al oeste de Baixa y Chiado, conocido por calles compactas que se llenan de noche. De dia es una trama lenta de tiendas, cafes y miradores."
    ),
    sources: [wikipedia("Bairro Alto", "Bairro_Alto"), wikidata("Q805589")],
    visitMinutes: { min: 35, max: 75 },
    bestTime: "evening",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "moderate",
  },
  {
    id: "miradouro-santa-catarina",
    name: t("Miradouro de Santa Catarina", "圣卡塔琳娜观景台", "산타 카타리나 전망대", "Miradouro de Santa Catarina"),
    localName: "Miradouro de Santa Catarina",
    clusterId: "bairro-cais",
    coordinates: { lat: 38.7103, lng: -9.1478, precision: "site" },
    categories: ["photo", "local", "nature"],
    summary: t(
      "A west-facing viewpoint near Bairro Alto and Bica, looking over the Tagus and the port side of Lisbon. It is useful at late day because the light falls across the water and bridge direction.",
      "靠近上城区与比卡的西向观景台，可看特茹河与里斯本港口一侧。傍晚光线会落向水面与大桥方向，很适合拍照。",
      "바이후 알투와 비카 근처의 서향 전망대입니다. 테주강과 항구 쪽을 보며, 늦은 오후 빛이 물과 다리 방향으로 떨어집니다.",
      "Mirador orientado al oeste cerca de Bairro Alto y Bica, con vistas al Tajo y al lado portuario de Lisboa. La luz de tarde cae hacia el agua y el puente."
    ),
    sources: [wikipedia("Miradouro de Santa Catarina", "Miradouro_de_Santa_Catarina"), wikidata("Q10328539")],
    visitMinutes: { min: 20, max: 40 },
    bestTime: "sunset",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "moderate",
  },
  {
    id: "time-out-market",
    name: t("Time Out Market Lisboa", "里斯本 Time Out 市场", "타임아웃 마켓 리스본", "Time Out Market Lisboa"),
    localName: "Mercado da Ribeira",
    clusterId: "bairro-cais",
    coordinates: { lat: 38.7068, lng: -9.1457, precision: "site" },
    categories: ["food", "local", "night"],
    summary: t(
      "A food hall inside the historic Mercado da Ribeira building by Cais do Sodre. The market building is older, while the Time Out food hall format brought many city restaurants under one roof.",
      "位于苏德雷码头旁历史悠久的里贝拉市场建筑内的美食大厅。市场建筑本身更早，Time Out 形式把多家城市餐厅集中到同一屋顶下。",
      "카이스 두 소드레 옆 역사적인 메르카두 다 리베이라 건물 안의 푸드홀입니다. 시장 건물은 오래되었고, 타임아웃 형식은 여러 식당을 한 지붕 아래 모았습니다.",
      "Food hall dentro del historico Mercado da Ribeira, junto a Cais do Sodre. El edificio es mas antiguo; el formato Time Out reunio restaurantes de la ciudad bajo un techo."
    ),
    sources: [wikipedia("Mercado da Ribeira", "Mercado_da_Ribeira"), wikidata("Q10323243")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "evening",
    setting: "indoor",
    weatherSensitive: false,
    walking: "easy",
  },

  // Alcantara & LX
  {
    id: "lx-factory",
    name: t("LX Factory", "LX 工厂", "LX 팩토리", "LX Factory"),
    localName: "LX Factory",
    clusterId: "alcantara-lx",
    coordinates: { lat: 38.7033, lng: -9.1784, precision: "site" },
    categories: ["local", "food", "photo", "culture"],
    summary: t(
      "A converted industrial complex in Alcantara with shops, restaurants, studios and event spaces. It sits under the approach to the 25 de Abril Bridge, so it feels separate from Baixa's older stone streets.",
      "阿尔坎塔拉一处改造后的工业建筑群，包含商店、餐厅、工作室与活动空间。它位于 4 月 25 日大桥引桥下方，氛围不同于拜沙老城石街。",
      "알칸타라의 옛 산업 단지를 바꾼 공간으로, 상점, 식당, 스튜디오, 행사 공간이 있습니다. 4월 25일 다리 진입부 아래라 바이샤와 분위기가 다릅니다.",
      "Complejo industrial reconvertido en Alcantara, con tiendas, restaurantes, estudios y eventos. Bajo el acceso al puente 25 de Abril, se siente distinto de las calles antiguas de Baixa."
    ),
    sources: [wikipedia("LX Factory", "LX_Factory"), wikidata("Q10323238")],
    visitMinutes: { min: 40, max: 90 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "alcantara",
    name: t("Alcantara", "阿尔坎塔拉", "알칸타라", "Alcantara"),
    localName: "Alcantara",
    clusterId: "alcantara-lx",
    coordinates: { lat: 38.705, lng: -9.176, precision: "area" },
    categories: ["local", "night", "food"],
    summary: t(
      "A riverside parish west of the historic centre, between Cais do Sodre and Belem. Former industrial and port areas shape much of its present nightlife, dining and creative reuse.",
      "位于历史中心以西、苏德雷码头与贝伦之间的河畔城区。旧工业与港口空间塑造了这里当下的夜生活、餐饮和再利用空间。",
      "역사 중심 서쪽, 카이스 두 소드레와 벨렝 사이의 강변 지역입니다. 옛 산업·항구 공간이 오늘날의 밤 문화, 식당, 재생 공간을 만들었습니다.",
      "Parroquia ribereña al oeste del centro historico, entre Cais do Sodre y Belem. Antiguas zonas industriales y portuarias marcan su ocio, comida y reutilizacion."
    ),
    sources: [wikipedia("Alcântara, Lisbon", "Alc%C3%A2ntara,_Lisbon"), wikidata("Q515169")],
    visitMinutes: { min: 20, max: 45 },
    bestTime: "evening",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },

  // Belem Riverfront
  {
    id: "jeronimos-monastery",
    name: t("Jeronimos Monastery", "热罗尼莫斯修道院", "제로니무스 수도원", "Monasterio de los Jeronimos"),
    localName: "Mosteiro dos Jeronimos",
    clusterId: "belem",
    coordinates: { lat: 38.6979, lng: -9.2065, precision: "site" },
    categories: ["iconic", "culture", "photo"],
    summary: t(
      "A large Manueline monastery in Belem, closely tied to Portugal's Age of Discovery. Together with Belem Tower it is part of a UNESCO World Heritage Site.",
      "贝伦的大型曼努埃尔式修道院，与葡萄牙大航海时代关系紧密。它与贝伦塔共同属于联合国教科文组织世界遗产。",
      "벨렝의 큰 마누엘 양식 수도원으로, 포르투갈 대항해 시대와 깊이 연결됩니다. 벨렝 탑과 함께 유네스코 세계유산입니다.",
      "Gran monasterio manuelino en Belem, ligado a la Era de los Descubrimientos portuguesa. Junto con la Torre de Belem forma parte de un sitio UNESCO."
    ),
    sources: [wikipedia("Jerónimos Monastery", "Jer%C3%B3nimos_Monastery"), wikidata("Q183272")],
    visitMinutes: { min: 60, max: 120 },
    bestTime: "morning",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "belem-tower",
    name: t("Belem Tower", "贝伦塔", "벨렝 탑", "Torre de Belem"),
    localName: "Torre de Belem",
    clusterId: "belem",
    coordinates: { lat: 38.6916, lng: -9.216, precision: "site" },
    categories: ["iconic", "photo", "culture"],
    summary: t(
      "A fortified tower on the Belem waterfront, built in the early sixteenth century as part of Lisbon's Tagus defence. It is one of the city's most recognised river landmarks.",
      "贝伦河岸的防御塔，十六世纪初建成，是里斯本特茹河防御体系的一部分。它是城市最容易辨认的河畔地标之一。",
      "벨렝 강변의 방어 탑으로, 16세기 초 리스본 테주강 방어 체계의 일부로 지어졌습니다. 도시에서 가장 잘 알려진 강변 명소입니다.",
      "Torre fortificada en la ribera de Belem, construida a comienzos del siglo XVI como parte de la defensa del Tajo. Es uno de los hitos fluviales mas reconocidos."
    ),
    sources: [wikipedia("Belém Tower", "Bel%C3%A9m_Tower"), wikidata("Q215901")],
    visitMinutes: { min: 30, max: 60 },
    bestTime: "sunset",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "padrao-descobrimentos",
    name: t("Padrao dos Descobrimentos", "发现者纪念碑", "발견 기념비", "Padrao dos Descobrimentos"),
    localName: "Padrao dos Descobrimentos",
    clusterId: "belem",
    coordinates: { lat: 38.6936, lng: -9.2057, precision: "site" },
    categories: ["photo", "culture", "iconic"],
    summary: t(
      "A riverside monument in Belem commemorating Portuguese maritime exploration. Its prow-like shape faces the Tagus near the monastery and Belem Tower.",
      "贝伦河畔纪念葡萄牙海上探索的纪念碑。船首形体面向特茹河，位置靠近修道院与贝伦塔。",
      "포르투갈 해양 탐험을 기념하는 벨렝 강변 기념비입니다. 뱃머리 같은 형태가 테주강을 향하며 수도원과 벨렝 탑 가까이에 있습니다.",
      "Monumento ribereno en Belem que conmemora la exploracion maritima portuguesa. Su forma de proa mira al Tajo, cerca del monasterio y de la torre."
    ),
    sources: [wikipedia("Padrão dos Descobrimentos", "Padr%C3%A3o_dos_Descobrimentos"), wikidata("Q1120124")],
    visitMinutes: { min: 20, max: 40 },
    bestTime: "sunset",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "maat",
    name: t("MAAT", "艺术、建筑与技术博物馆", "MAAT", "MAAT"),
    localName: "Museu de Arte, Arquitetura e Tecnologia",
    clusterId: "belem",
    coordinates: { lat: 38.6957, lng: -9.1944, precision: "site" },
    categories: ["culture", "photo"],
    summary: t(
      "A museum of art, architecture and technology on the Belem waterfront, next to the Central Tejo power-station building. Its low curved roof has become a contemporary riverfront photo stop.",
      "位于贝伦河岸、毗邻 Central Tejo 发电站建筑的艺术、建筑与技术博物馆。低矮弧形屋顶已成为当代河岸拍照点。",
      "벨렝 강변, 센트랄 테주 발전소 건물 옆의 예술·건축·기술 박물관입니다. 낮고 휘어진 지붕은 현대적인 강변 사진 장소가 되었습니다.",
      "Museo de arte, arquitectura y tecnologia en la ribera de Belem, junto a la antigua Central Tejo. Su cubierta baja y curva es un punto fotografico contemporaneo."
    ),
    sources: [wikipedia("Museum of Art, Architecture and Technology", "Museum_of_Art,_Architecture_and_Technology"), wikidata("Q25037505")],
    visitMinutes: { min: 35, max: 75 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },

  // Avenida & Park Museums
  {
    id: "parque-eduardo-vii",
    name: t("Parque Eduardo VII", "爱德华七世公园", "에두아르두 7세 공원", "Parque Eduardo VII"),
    localName: "Parque Eduardo VII",
    clusterId: "avenida-parque",
    coordinates: { lat: 38.7294, lng: -9.1533, precision: "area" },
    categories: ["nature", "photo", "local"],
    summary: t(
      "A large public park north of Marques de Pombal, named after Edward VII of the United Kingdom. Its long slope frames one of Lisbon's classic views back down Avenida da Liberdade toward the river.",
      "位于庞巴尔侯爵广场以北的大型公园，以英国国王爱德华七世命名。长坡形成从自由大道回望河面的经典视线。",
      "마르케스 드 폼발 북쪽의 큰 공원으로, 영국 국왕 에드워드 7세의 이름을 땄습니다. 긴 경사에서 자유대로와 강 쪽을 내려다보는 대표 전망이 나옵니다.",
      "Gran parque publico al norte de Marques de Pombal, nombrado por Eduardo VII del Reino Unido. Su pendiente enmarca una vista clasica por Avenida da Liberdade hacia el rio."
    ),
    sources: [wikipedia("Eduardo VII Park", "Eduardo_VII_Park"), wikidata("Q522764")],
    visitMinutes: { min: 25, max: 50 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "moderate",
  },
  {
    id: "gulbenkian-museum",
    name: t("Calouste Gulbenkian Museum", "古尔本基安博物馆", "칼루스트 굴벤키안 박물관", "Museo Calouste Gulbenkian"),
    localName: "Museu Calouste Gulbenkian",
    clusterId: "avenida-parque",
    coordinates: { lat: 38.7376, lng: -9.1545, precision: "site" },
    categories: ["culture", "local"],
    summary: t(
      "A museum set in a landscaped garden, built around the collection of Calouste Gulbenkian. Its galleries range from ancient art to European painting and decorative arts.",
      "位于园林中的博物馆，以卡洛斯特·古尔本基安收藏为核心。展厅涵盖古代艺术、欧洲绘画和装饰艺术。",
      "정원 안에 있는 박물관으로, 칼루스트 굴벤키안의 컬렉션을 중심으로 합니다. 고대 미술부터 유럽 회화와 장식미술까지 전시합니다.",
      "Museo en un jardin paisajistico, construido en torno a la coleccion de Calouste Gulbenkian. Sus salas van del arte antiguo a pintura europea y artes decorativas."
    ),
    sources: [wikipedia("Calouste Gulbenkian Museum", "Calouste_Gulbenkian_Museum"), wikidata("Q1028978")],
    visitMinutes: { min: 60, max: 120 },
    bestTime: "any",
    setting: "indoor",
    weatherSensitive: false,
    walking: "easy",
  },

  // Parque das Nacoes
  {
    id: "oceanario-lisboa",
    name: t("Oceanario de Lisboa", "里斯本海洋馆", "리스본 해양관", "Oceanario de Lisboa"),
    localName: "Oceanario de Lisboa",
    clusterId: "parque-nacoes",
    coordinates: { lat: 38.7636, lng: -9.0937, precision: "site" },
    categories: ["nature", "culture", "local"],
    summary: t(
      "A large public aquarium in Parque das Nacoes, built for Expo 98. Its central tank and ocean habitats make it a strong rainy-day or family stop, but it sits far east of the historic centre.",
      "位于万国公园的大型公共水族馆，为 1998 年世博会而建。中央水槽与海洋栖息地很适合雨天或亲子行程，但它在历史中心以东很远。",
      "엑스포 98을 위해 지어진 파르크 다스 나소에스의 대형 공공 수족관입니다. 중앙 수조와 해양 서식지 전시가 좋아 비 오는 날이나 가족 일정에 맞지만, 구시가지에서 멀리 동쪽입니다.",
      "Gran acuario publico en Parque das Nacoes, construido para Expo 98. Su tanque central y habitats marinos funcionan muy bien con lluvia o en familia, pero queda lejos al este del centro historico."
    ),
    sources: [wikipedia("Oceanário de Lisboa", "Ocean%C3%A1rio_de_Lisboa"), wikidata("Q1130256")],
    visitMinutes: { min: 60, max: 120 },
    bestTime: "any",
    setting: "indoor",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "parque-das-nacoes",
    name: t("Parque das Nacoes", "万国公园", "파르크 다스 나소에스", "Parque das Nacoes"),
    localName: "Parque das Nacoes",
    clusterId: "parque-nacoes",
    coordinates: { lat: 38.768, lng: -9.095, precision: "area" },
    categories: ["photo", "local", "nature"],
    summary: t(
      "A modern riverfront district developed around the Expo 98 site in eastern Lisbon. Wide promenades, contemporary buildings and transit at Oriente make it feel different from the older hill city.",
      "里斯本东部围绕 1998 年世博会场址发展出的现代河岸区。宽阔步道、当代建筑与 Oriente 交通节点，让这里与老山城气质不同。",
      "리스본 동쪽 엑스포 98 부지를 중심으로 조성된 현대 강변 지구입니다. 넓은 산책로, 현대 건축, 오리엔트 교통이 오래된 언덕 도시와 다른 분위기를 만듭니다.",
      "Distrito moderno junto al rio, desarrollado sobre el recinto de Expo 98 en el este de Lisboa. Paseos amplios, arquitectura contemporanea y transporte en Oriente lo separan de la ciudad antigua."
    ),
    sources: [wikipedia("Parque das Nações", "Parque_das_Na%C3%A7%C3%B5es"), wikidata("Q1032033")],
    visitMinutes: { min: 30, max: 70 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
]

const cardPhoto = (alt: CityText): CityPhoto => ({
  src: "/assets/destination-lisbon-card.webp",
  width: 1600,
  height: 1067,
  alt,
  credit: {
    label: t("XingAI Travel", "XingAI Travel", "XingAI Travel", "XingAI Travel"),
    href: "/",
  },
})

const photos = {
  essentials: cardPhoto(
    t(
      "Lisbon destination card view used for the essentials route",
      "里斯本目的地卡片景色，用于经典路线",
      "핵심 코스에 쓰는 리스본 목적지 카드 풍경",
      "Vista de Lisboa para la ruta esencial"
    )
  ),
  photo: cardPhoto(
    t(
      "Lisbon destination card view used for the photo route",
      "里斯本目的地卡片景色，用于拍照路线",
      "사진 코스에 쓰는 리스본 목적지 카드 풍경",
      "Vista de Lisboa para la ruta fotografica"
    )
  ),
  local: cardPhoto(
    t(
      "Lisbon destination card view used for the local route",
      "里斯本目的地卡片景色，用于在地路线",
      "로컬 코스에 쓰는 리스본 목적지 카드 풍경",
      "Vista de Lisboa para la ruta local"
    )
  ),
}

// Reference routes (ADR 0008 §3). Hand-authored, never generated. Times are estimates.
// Reasons are editorial; any fact inside them must already be in a place summary above.
// Long west/east hops use tram, metro or taxi. Walks stay within adjacent same-bank clusters.
const routes: TravelRoute[] = [
  {
    id: "essentials",
    theme: "essentials",
    photo: photos.essentials,
    name: t("Lisbon Essentials", "里斯本经典一日", "리스본 핵심 코스", "Lisboa esencial"),
    description: t(
      "Start on the Baixa river square, climb through the cathedral and castle side of Alfama, then transfer west to Belem for the monastery and tower.",
      "从拜沙河畔广场开始，经主教座堂和城堡一侧爬进阿尔法玛，再转车向西去贝伦看修道院与贝伦塔。",
      "바이샤 강변 광장에서 시작해 대성당과 성 쪽 알파마를 오른 뒤, 서쪽 벨렝으로 이동해 수도원과 탑을 봅니다.",
      "Empieza en la plaza riberenia de Baixa, sube por la catedral y el castillo de Alfama, y traslada al oeste para el monasterio y la torre de Belem."
    ),
    estimatedDurationMinutes: 380,
    stops: [
      {
        placeId: "praca-comercio",
        order: 1,
        estimatedVisitMinutes: 35,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Begin where Baixa opens to the Tagus. It gives the city grid, river edge and post-earthquake scale in one frame.",
          "从拜沙打开到特茹河的地方开始。一眼看清城市网格、河岸和地震后重建的尺度。",
          "바이샤가 테주강으로 열리는 곳에서 시작합니다. 도시 격자, 강변, 지진 뒤 재건 규모가 한눈에 보입니다.",
          "Empieza donde Baixa se abre al Tajo. Muestra la cuadricula, el borde del rio y la escala posterior al terremoto."
        ),
      },
      {
        placeId: "lisbon-cathedral",
        order: 2,
        estimatedVisitMinutes: 25,
        estimatedTravelMinutesFromPrevious: 12,
        transportMode: "walk",
        reason: t(
          "Walk into the first slope at the Se. This is the hinge between the flat centre and Alfama.",
          "步行进入第一段坡，在主教座堂停下。这里是平坦市中心与阿尔法玛之间的铰链。",
          "첫 비탈로 걸어 올라 세에서 멈춥니다. 평평한 중심부와 알파마를 잇는 지점입니다.",
          "Camina hacia la primera cuesta hasta la Se. Es la bisagra entre el centro plano y Alfama."
        ),
      },
      {
        placeId: "sao-jorge-castle",
        order: 3,
        estimatedVisitMinutes: 55,
        estimatedTravelMinutesFromPrevious: 15,
        transportMode: "walk",
        reason: t(
          "Keep climbing to the castle for the big city read: Baixa below, Alfama beside you, the Tagus beyond.",
          "继续爬到城堡，看城市大结构：拜沙在下、阿尔法玛在旁、特茹河在远处。",
          "성을 향해 더 올라 도시 구조를 봅니다. 아래에는 바이샤, 옆에는 알파마, 멀리 테주강이 있습니다.",
          "Sigue subiendo al castillo para leer la ciudad: Baixa abajo, Alfama al lado y el Tajo al fondo."
        ),
      },
      {
        placeId: "alfama",
        order: 4,
        estimatedVisitMinutes: 35,
        estimatedTravelMinutesFromPrevious: 12,
        transportMode: "walk",
        reason: t(
          "Drop into the lanes instead of treating Alfama as just a castle access road.",
          "下到巷子里走，不要把阿尔法玛只当成去城堡的通道。",
          "알파마를 성으로 가는 길로만 보지 말고 골목 안으로 내려갑니다.",
          "Baja a las calles pequenas; Alfama no es solo el camino hacia el castillo."
        ),
      },
      {
        placeId: "miradouro-senhora-monte",
        order: 5,
        estimatedVisitMinutes: 30,
        estimatedTravelMinutesFromPrevious: 18,
        transportMode: "walk",
        reason: t(
          "Walk to Graca only if the hill still feels good. The reward is a wider view back across the route you just climbed.",
          "体力还可以再走到格拉萨。回报是从更开阔的角度回看刚爬过的路线。",
          "언덕이 아직 괜찮다면 그라사까지 걷습니다. 방금 오른 길을 더 넓게 되돌아보는 전망이 보상입니다.",
          "Camina a Graca solo si la cuesta sigue bien. La recompensa es una vista amplia de la ruta que acabas de subir."
        ),
      },
      {
        placeId: "jeronimos-monastery",
        order: 6,
        estimatedVisitMinutes: 60,
        estimatedTravelMinutesFromPrevious: 30,
        transportMode: "taxi",
        reason: t(
          "Transfer west to Belem by taxi or tram/bus. Do not walk this cross-city gap after the hills.",
          "打车或坐电车/公交向西去贝伦。爬完山后不要把这段跨城距离当步行。",
          "택시나 트램·버스로 서쪽 벨렝으로 이동합니다. 언덕 뒤 이 장거리를 걷는 일정으로 만들지 마세요.",
          "Traslada al oeste a Belem en taxi o tranvia/bus. No conviertas este salto urbano en caminata tras las colinas."
        ),
      },
      {
        placeId: "belem-tower",
        order: 7,
        estimatedVisitMinutes: 35,
        estimatedTravelMinutesFromPrevious: 15,
        transportMode: "walk",
        reason: t(
          "Finish along the Belem riverfront at the tower, keeping the final walk inside the same riverside cluster.",
          "沿贝伦河岸在贝伦塔收尾，最后一段步行只留在同一河岸片区内。",
          "벨렝 강변을 따라 탑에서 마무리합니다. 마지막 걷기는 같은 강변 구역 안에 둡니다.",
          "Termina por la ribera de Belem en la torre, con la caminata final dentro del mismo cluster ribereno."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "It shows Lisbon's basic shape: river square, hill neighbourhood, viewpoint, then the western monuments.",
        "它把里斯本基本形状讲清：河畔广场、山坡街区、观景台，再到西侧纪念建筑。",
        "강변 광장, 언덕 동네, 전망대, 서쪽 기념물을 이어 리스본의 기본 형태를 보여 줍니다.",
        "Muestra la forma basica de Lisboa: plaza del rio, barrio en colina, mirador y monumentos del oeste."
      ),
      t(
        "The route moves forward by cluster: Baixa -> Alfama -> Graca -> Belem.",
        "片区只往前：拜沙 -> 阿尔法玛 -> 格拉萨 -> 贝伦。",
        "클러스터는 앞으로만 갑니다. 바이샤 -> 알파마 -> 그라사 -> 벨렝.",
        "Los clusters avanzan: Baixa -> Alfama -> Graca -> Belem."
      ),
      t(
        "The long Belem hop is transport, not a fake scenic walk.",
        "去贝伦的长距离用交通解决，不假装成风景步行。",
        "벨렝까지의 긴 이동은 교통으로 처리하며, 걷기 좋은 길로 꾸미지 않습니다.",
        "El salto largo a Belem va en transporte, no como paseo escenico falso."
      ),
    ],
    goodFor: [
      t("First Lisbon visit", "第一次去里斯本", "리스본 첫 방문", "Primera visita a Lisboa"),
      t("History and viewpoints", "历史与观景台", "역사와 전망", "Historia y miradores"),
      t("Travellers who can handle hills", "能接受坡路的人", "언덕을 괜찮아하는 여행자", "Quien aguanta cuestas"),
    ],
    tradeoffs: [
      t(
        "This is a long day with hills. Skip Graca or shorten Belem if heat or knees push back.",
        "这是一条有坡的长线。天气太热或膝盖不舒服，就跳过格拉萨或缩短贝伦。",
        "언덕이 있는 긴 하루입니다. 더위나 무릎이 부담이면 그라사를 빼거나 벨렝을 줄이세요.",
        "Es un dia largo con cuestas. Salta Graca o acorta Belem si calor o rodillas molestan."
      ),
      t(
        "No Oceanario and no deep museum day; those belong to the Local route.",
        "不去海洋馆，也不做深度博物馆日；那些留给在地路线。",
        "해양관과 긴 박물관 일정은 없습니다. 그것은 로컬 코스 몫입니다.",
        "Sin Oceanario ni dia largo de museos; eso queda para la ruta local."
      ),
      t(
        "Belem is not beside Baixa. Budget the westbound transfer instead of hoping it feels close.",
        "贝伦不在拜沙旁边。请预留向西交通时间，不要指望它很近。",
        "벨렝은 바이샤 옆이 아닙니다. 가깝다고 생각하지 말고 서쪽 이동 시간을 잡으세요.",
        "Belem no esta al lado de Baixa. Reserva el traslado al oeste en vez de pensar que queda cerca."
      ),
    ],
  },
  {
    id: "photo",
    theme: "photo",
    photo: photos.photo,
    name: t("Photo Lisbon", "拍照里斯本", "사진으로 보는 리스본", "Lisboa en fotos"),
    description: t(
      "Shoot ironwork and Chiado streets, sunset-facing Santa Catarina, LX industrial texture, then Belem's modern and historic riverfront.",
      "拍圣胡斯塔铁构与希亚多街景、西向圣卡塔琳娜、LX 工业质感，再到贝伦的现代与历史河岸。",
      "철제 엘리베이터와 시아두 거리, 서향 산타 카타리나, LX 산업 질감, 벨렝의 현대·역사 강변을 찍습니다.",
      "Fotografia hierro y calles de Chiado, Santa Catarina hacia el atardecer, textura industrial de LX y la ribera moderna e historica de Belem."
    ),
    estimatedDurationMinutes: 315,
    stops: [
      {
        placeId: "santa-justa-lift",
        order: 1,
        estimatedVisitMinutes: 25,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Start with iron geometry before queues and glare take over the lift area.",
          "先拍铁构几何，避开排队和强眩光占满升降机周边。",
          "줄과 눈부심이 생기기 전에 철제 구조부터 찍습니다.",
          "Empieza con la geometria de hierro antes de colas y reflejos fuertes."
        ),
      },
      {
        placeId: "chiado",
        order: 2,
        estimatedVisitMinutes: 35,
        estimatedTravelMinutesFromPrevious: 8,
        transportMode: "walk",
        reason: t(
          "Walk into Chiado for shopfronts, theatre streets and hill transitions around Carmo.",
          "走进希亚多，拍店面、剧院街和卡尔莫一带的坡度转换。",
          "시아두로 걸어 들어가 상점 앞, 극장 거리, 카르무 주변 언덕 전환을 봅니다.",
          "Camina a Chiado para fachadas, calles de teatro y transiciones de cuesta cerca de Carmo."
        ),
      },
      {
        placeId: "miradouro-santa-catarina",
        order: 3,
        estimatedVisitMinutes: 30,
        estimatedTravelMinutesFromPrevious: 12,
        transportMode: "walk",
        reason: t(
          "Stay on the westward hill line for a river view that suits late light.",
          "继续沿西向山坡走，找一个适合傍晚光线的河景。",
          "서쪽 언덕선을 따라 늦은 빛에 맞는 강 전망을 잡습니다.",
          "Sigue la linea de colina hacia el oeste para una vista del rio con buena luz tardia."
        ),
      },
      {
        placeId: "lx-factory",
        order: 4,
        estimatedVisitMinutes: 45,
        estimatedTravelMinutesFromPrevious: 18,
        transportMode: "tram",
        reason: t(
          "Use tram or taxi to Alcantara. The industrial frames are worth it; the long road walk is not.",
          "坐电车或打车去阿尔坎塔拉。工业画面值得拍，但长距离公路步行不值得。",
          "트램이나 택시로 알칸타라로 갑니다. 산업적 장면은 좋지만 긴 도로 걷기는 좋지 않습니다.",
          "Usa tranvia o taxi a Alcantara. Las escenas industriales valen; la caminata larga por avenida no."
        ),
      },
      {
        placeId: "maat",
        order: 5,
        estimatedVisitMinutes: 35,
        estimatedTravelMinutesFromPrevious: 15,
        transportMode: "tram",
        reason: t(
          "Continue west by tram to MAAT for contemporary curves on the riverfront.",
          "继续坐电车向西到 MAAT，拍河岸上的当代曲线。",
          "트램으로 더 서쪽 MAAT까지 가서 강변의 현대적 곡선을 찍습니다.",
          "Sigue al oeste en tranvia hasta MAAT para curvas contemporaneas junto al rio."
        ),
      },
      {
        placeId: "padrao-descobrimentos",
        order: 6,
        estimatedVisitMinutes: 25,
        estimatedTravelMinutesFromPrevious: 15,
        transportMode: "walk",
        reason: t(
          "Walk the Belem riverfront to the prow-shaped monument without leaving the cluster.",
          "沿贝伦河岸步行到船首形纪念碑，不离开同一片区。",
          "벨렝 강변을 따라 뱃머리 모양 기념비까지 걷습니다. 같은 구역 안입니다.",
          "Camina por la ribera de Belem hasta el monumento en forma de proa, sin salir del cluster."
        ),
      },
      {
        placeId: "belem-tower",
        order: 7,
        estimatedVisitMinutes: 35,
        estimatedTravelMinutesFromPrevious: 15,
        transportMode: "walk",
        reason: t(
          "End at the tower when the river light softens. This is a short same-cluster walk, not a Baixa-to-Belem walk.",
          "在河面光线变柔时到贝伦塔收尾。这是同片区短步行，不是从拜沙一路走到贝伦。",
          "강빛이 부드러워질 때 벨렝 탑에서 마무리합니다. 같은 구역의 짧은 걷기이지 바이샤부터 걷는 길이 아닙니다.",
          "Termina en la torre con luz suave sobre el rio. Es paseo corto dentro de Belem, no caminata desde Baixa."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "It moves west with the light: Baixa ironwork, Chiado streets, Alcantara texture, Belem riverfront.",
        "它跟着光线向西：拜沙铁构、希亚多街道、阿尔坎塔拉质感、贝伦河岸。",
        "빛을 따라 서쪽으로 갑니다. 바이샤 철제 구조, 시아두 거리, 알칸타라 질감, 벨렝 강변.",
        "Avanza al oeste con la luz: hierro de Baixa, calles de Chiado, textura de Alcantara y ribera de Belem."
      ),
      t(
        "No cluster backtracking: Baixa -> Bairro/Cais -> Alcantara -> Belem.",
        "不折返片区：拜沙 -> 上城区/码头 -> 阿尔坎塔拉 -> 贝伦。",
        "클러스터를 되돌아가지 않습니다. 바이샤 -> 바이후/카이스 -> 알칸타라 -> 벨렝.",
        "Sin volver atras: Baixa -> Bairro/Cais -> Alcantara -> Belem."
      ),
      t(
        "Longer hops use tram or taxi, so the walking stays photogenic instead of tiring.",
        "长距离用电车或出租车，步行留给值得拍的路段，而不是消耗体力。",
        "긴 이동은 트램이나 택시로 처리해, 걷기는 사진이 좋은 구간에 남깁니다.",
        "Los saltos largos van en tranvia o taxi; caminar queda para tramos con foto, no para agotarse."
      ),
    ],
    goodFor: [
      t("Travelling with a camera", "带相机出门", "카메라를 들고 다니는 여행", "Viajar con camara"),
      t("Architecture and river light", "建筑与河面光线", "건축과 강빛", "Arquitectura y luz de rio"),
      t("A second day after Essentials", "经典路线后的第二天", "핵심 코스 다음 날", "Un segundo dia tras lo esencial"),
    ],
    tradeoffs: [
      t(
        "Less time inside museums. This route is about exteriors, streets and light.",
        "进馆时间少。这条线重点是外观、街道和光线。",
        "박물관 내부 시간은 적습니다. 외관, 거리, 빛이 중심입니다.",
        "Poco tiempo dentro de museos. Esta ruta va de exteriores, calles y luz."
      ),
      t(
        "Belem can be windy by the river; sunset photos may need a jacket more than a tripod.",
        "贝伦河边可能有风；拍日落也许更需要外套，而不是三脚架。",
        "벨렝 강변은 바람이 불 수 있습니다. 일몰 사진에는 삼각대보다 겉옷이 더 필요할 수 있습니다.",
        "Belem puede tener viento junto al rio; para el atardecer quizas necesites mas chaqueta que tripode."
      ),
      t(
        "Skipping Alfama means fewer tiled lanes; use Essentials if that is the photo you want.",
        "不走阿尔法玛就少了瓦墙窄巷；想拍那种画面，走经典线。",
        "알파마를 빼면 타일 골목이 줄어듭니다. 그 사진을 원하면 핵심 코스를 쓰세요.",
        "Al saltar Alfama hay menos callejones de azulejo; usa Esencial si buscas esa foto."
      ),
    ],
  },
  {
    id: "local",
    theme: "local",
    photo: photos.local,
    name: t("Local Lisbon", "在地里斯本", "로컬 리스본", "Lisboa local"),
    description: t(
      "A less postcard-heavy day: Gulbenkian gardens, the Eduardo VII slope, Cais do Sodre food, LX/Alcantara, then a proper transport jump to the Expo riverfront and Oceanario.",
      "少一点明信片：古尔本基安花园、爱德华七世公园坡地、苏德雷码头吃饭、LX/阿尔坎塔拉，再坐交通去世博河岸与海洋馆。",
      "엽서 명소를 줄인 하루입니다. 굴벤키안 정원, 에두아르두 7세 공원, 카이스 두 소드레 음식, LX/알칸타라, 이후 교통으로 엑스포 강변과 해양관으로 갑니다.",
      "Un dia menos postal: jardines Gulbenkian, pendiente de Eduardo VII, comida en Cais do Sodre, LX/Alcantara y traslado real al frente Expo y Oceanario."
    ),
    estimatedDurationMinutes: 450,
    stops: [
      {
        placeId: "gulbenkian-museum",
        order: 1,
        estimatedVisitMinutes: 75,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Start away from the old centre with galleries and garden calm before the day gets noisy.",
          "从老城外开始，先用展厅和花园安静地进入这一天。",
          "구시가지 밖에서 전시실과 정원의 조용함으로 하루를 시작합니다.",
          "Empieza fuera del centro antiguo, con galerias y jardin antes de que el dia se cargue."
        ),
      },
      {
        placeId: "parque-eduardo-vii",
        order: 2,
        estimatedVisitMinutes: 35,
        estimatedTravelMinutesFromPrevious: 15,
        transportMode: "walk",
        reason: t(
          "Walk within the Avenida park cluster for the long view down toward the river.",
          "在自由大道公园片区内步行，向下看通往河面的长视线。",
          "아베니다 공원 구역 안을 걸어 강 쪽으로 내려가는 긴 전망을 봅니다.",
          "Camina dentro del cluster de parques de Avenida para mirar hacia el rio."
        ),
      },
      {
        placeId: "time-out-market",
        order: 3,
        estimatedVisitMinutes: 55,
        estimatedTravelMinutesFromPrevious: 20,
        transportMode: "mtr",
        reason: t(
          "Use metro or taxi down to Cais do Sodre for food. It is not worth forcing a cross-centre walk here.",
          "坐地铁或打车下到苏德雷码头吃饭。这段跨中心路线没必要硬走。",
          "지하철이나 택시로 카이스 두 소드레까지 내려가 식사합니다. 도심을 가로질러 억지로 걷지 않아도 됩니다.",
          "Usa metro o taxi hasta Cais do Sodre para comer. No hace falta forzar una caminata cruzando el centro."
        ),
      },
      {
        placeId: "lx-factory",
        order: 4,
        estimatedVisitMinutes: 45,
        estimatedTravelMinutesFromPrevious: 18,
        transportMode: "tram",
        reason: t(
          "Continue west by tram or bus to LX Factory for shops and reused industrial space.",
          "继续坐电车或公交向西到 LX 工厂，看商店和再利用工业空间。",
          "트램이나 버스로 서쪽 LX 팩토리로 가서 상점과 재생 산업 공간을 봅니다.",
          "Sigue al oeste en tranvia o bus a LX Factory para tiendas y espacio industrial reutilizado."
        ),
      },
      {
        placeId: "alcantara",
        order: 5,
        estimatedVisitMinutes: 25,
        estimatedTravelMinutesFromPrevious: 10,
        transportMode: "walk",
        reason: t(
          "Keep the walk short inside Alcantara so the neighbourhood reads as a place, not only a venue.",
          "只在阿尔坎塔拉内部短走，让它像一个街区，而不只是一个场馆。",
          "알칸타라 안에서 짧게 걸어 이곳이 단일 공간이 아니라 동네로 보이게 합니다.",
          "Camina poco dentro de Alcantara para leerlo como barrio, no solo como recinto."
        ),
      },
      {
        placeId: "oceanario-lisboa",
        order: 6,
        estimatedVisitMinutes: 75,
        estimatedTravelMinutesFromPrevious: 35,
        transportMode: "mtr",
        reason: t(
          "Jump east by metro or taxi to the Oceanario. This is the only sane way to connect the Expo district after Alcantara.",
          "坐地铁或打车向东去海洋馆。从阿尔坎塔拉接世博区，只有这样才合理。",
          "지하철이나 택시로 동쪽 해양관으로 이동합니다. 알칸타라 뒤 엑스포 지구를 잇는 현실적인 방법입니다.",
          "Salta al este en metro o taxi al Oceanario. Es la forma sensata de unir el distrito Expo tras Alcantara."
        ),
      },
      {
        placeId: "parque-das-nacoes",
        order: 7,
        estimatedVisitMinutes: 35,
        estimatedTravelMinutesFromPrevious: 10,
        transportMode: "walk",
        reason: t(
          "End with a short flat walk on the modern riverfront, fully inside Parque das Nacoes.",
          "在现代河岸短距离平路收尾，全程留在万国公园片区内。",
          "현대적인 강변에서 짧고 평평하게 마무리합니다. 파르크 다스 나소에스 안입니다.",
          "Termina con un paseo corto y llano en la ribera moderna, dentro de Parque das Nacoes."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "It shows the Lisbon that is not only Alfama and Belem: museums, food halls, industrial reuse and the Expo riverfront.",
        "它展示不只有阿尔法玛和贝伦的里斯本：博物馆、美食大厅、工业再利用和世博河岸。",
        "알파마와 벨렝만이 아닌 리스본을 보여 줍니다. 박물관, 푸드홀, 산업 재생, 엑스포 강변입니다.",
        "Muestra una Lisboa que no es solo Alfama y Belem: museos, mercados, reutilizacion industrial y ribera Expo."
      ),
      t(
        "The route moves by broad zones: Avenida -> Cais/LX -> Parque das Nacoes.",
        "路线按大区推进：自由大道 -> 码头/LX -> 万国公园。",
        "큰 구역으로 이동합니다. 아베니다 -> 카이스/LX -> 파르크 다스 나소에스.",
        "Avanza por zonas: Avenida -> Cais/LX -> Parque das Nacoes."
      ),
      t(
        "Oceanario is included only with a transport jump, never as an impossible walk from the west side.",
        "海洋馆只通过交通跳转纳入，绝不当成从西侧走过去的路线。",
        "해양관은 교통 이동으로만 넣습니다. 서쪽에서 걷는 비현실적인 구간이 아닙니다.",
        "El Oceanario entra solo con traslado, nunca como caminata imposible desde el oeste."
      ),
    ],
    goodFor: [
      t("A cooler museum-heavy day", "更凉快的博物馆日", "시원한 박물관 중심 하루", "Un dia mas fresco de museos"),
      t("Families considering the Oceanario", "考虑去海洋馆的亲子行程", "해양관을 고려하는 가족", "Familias que quieren Oceanario"),
      t("Travellers who already saw the old centre", "已经看过老城的人", "구시가지를 이미 본 여행자", "Quien ya vio el centro antiguo"),
    ],
    tradeoffs: [
      t(
        "This route has the largest transport jump. It is honest, but it is still a cross-city move.",
        "这条线有最大的一段交通跳转。它合理，但仍然是跨城移动。",
        "이 코스는 가장 큰 교통 이동이 있습니다. 정직하지만 여전히 도시를 가로지릅니다.",
        "Tiene el mayor salto de transporte. Es honesto, pero sigue siendo cruzar la ciudad."
      ),
      t(
        "Less classic Lisbon tile-and-tram atmosphere than Essentials.",
        "比经典路线少一些典型的瓷砖与电车氛围。",
        "핵심 코스보다 전형적인 타일·트램 분위기는 적습니다.",
        "Menos ambiente clasico de azulejo y tranvia que Esencial."
      ),
      t(
        "If you want nightlife, stop at Alcantara instead of continuing east.",
        "如果想要夜生活，就在阿尔坎塔拉停下，不必继续向东。",
        "밤 문화를 원하면 동쪽으로 계속 가지 말고 알칸타라에서 멈추세요.",
        "Si quieres noche, quedate en Alcantara en vez de seguir al este."
      ),
    ],
  },
]

export const lisbon: City = {
  slug: "lisbon",
  name: t("Lisbon", "里斯本", "리스본", "Lisboa"),
  localName: "Lisboa",
  country: t("Portugal", "葡萄牙", "포르투갈", "Portugal"),
  intro: t(
    "Lisbon is a hill city on the Tagus: Baixa gives the flat grid, Alfama gives the old slopes, Belem stretches west along the river, and Parque das Nacoes sits far east on the Expo waterfront. A good first visit uses trams, metro or taxis for the long gaps, then saves walking for the lanes, viewpoints and riverfronts that deserve it.",
    "里斯本是特茹河畔的山城：拜沙给你平坦网格，阿尔法玛给你老城坡巷，贝伦沿河向西展开，万国公园则在东侧世博河岸。第一次来，长距离用电车、地铁或出租车，步行留给真正值得慢走的巷子、观景台和河岸。",
    "리스본은 테주강가의 언덕 도시입니다. 바이샤는 평평한 격자, 알파마는 오래된 비탈, 벨렝은 서쪽 강변, 파르크 다스 나소에스는 동쪽 엑스포 강변입니다. 첫 방문은 긴 거리를 트램, 지하철, 택시로 잇고, 걸음은 골목, 전망대, 강변에 남기는 편이 좋습니다.",
    "Lisboa es una ciudad de colinas junto al Tajo: Baixa da la cuadricula plana, Alfama las cuestas antiguas, Belem se estira al oeste y Parque das Nacoes queda lejos al este. Una buena primera visita usa tranvias, metro o taxis para los saltos largos y guarda las caminatas para callejones, miradores y riberas."
  ),
  hero: cardPhoto(
    t(
      "Lisbon destination card view of hills, river and city light",
      "里斯本目的地卡片：山坡、河面与城市光线",
      "언덕, 강, 도시 빛이 있는 리스본 목적지 카드",
      "Vista de Lisboa con colinas, rio y luz urbana"
    )
  ),
  map: {
    // Schematic Tagus River south of the city. Kept below every Lisbon place so no stop falls inside water.
    water: [
      [-9.235, 38.681],
      [-9.19, 38.683],
      [-9.14, 38.685],
      [-9.09, 38.686],
      [-9.075, 38.689],
      [-9.075, 38.674],
      [-9.235, 38.674],
    ],
    waterLabel: t("Tagus River", "特茹河", "테주강", "Rio Tajo"),
    waterLabelAt: [-9.16, 38.682],
  },
  clusters,
  places,
  routes,
}
