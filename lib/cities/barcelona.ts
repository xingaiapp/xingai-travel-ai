import type { City, CityPhoto, CityText, Cluster, Place, Source, TravelRoute } from "./types"

// Barcelona city layer (ADR 0008).
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
    id: "gothic-rambla",
    side: "island",
    neighbours: ["born-ciutadella", "barceloneta-port", "eixample-icons", "montjuic"],
    name: t("Gothic Quarter & La Rambla", "哥特区与兰布拉大道", "고딕 지구·람블라 거리", "Barrio Gótico y La Rambla"),
  },
  {
    id: "born-ciutadella",
    side: "island",
    neighbours: ["gothic-rambla", "barceloneta-port", "eixample-icons"],
    name: t("El Born & Ciutadella", "波恩区与城堡公园", "엘 본·시우타데야", "El Born y Ciutadella"),
  },
  {
    id: "barceloneta-port",
    side: "island",
    neighbours: ["gothic-rambla", "born-ciutadella"],
    name: t("Barceloneta & Port Vell", "巴塞罗内塔与旧港", "바르셀로네타·옛 항구", "Barceloneta y Port Vell"),
  },
  {
    id: "eixample-icons",
    side: "island",
    neighbours: ["gothic-rambla", "born-ciutadella", "gracia-park", "montjuic", "les-corts"],
    name: t("Eixample Icons", "扩展区地标", "에이샴플라 랜드마크", "Iconos del Eixample"),
  },
  {
    id: "gracia-park",
    side: "island",
    neighbours: ["eixample-icons"],
    name: t("Gràcia & Park Güell", "格拉西亚与桂尔公园", "그라시아·구엘 공원", "Gràcia y Park Güell"),
  },
  {
    id: "montjuic",
    side: "island",
    neighbours: ["gothic-rambla", "eixample-icons", "les-corts"],
    name: t("Montjuïc", "蒙锥克山", "몬주익", "Montjuïc"),
  },
  {
    id: "les-corts",
    side: "island",
    neighbours: ["eixample-icons", "montjuic"],
    name: t("Les Corts & Camp Nou", "莱斯科茨与诺坎普", "레스 코르츠·캄 노우", "Les Corts y Camp Nou"),
  },
]

const places: Place[] = [
  // Gothic Quarter & La Rambla
  {
    id: "gothic-quarter",
    name: t("Gothic Quarter", "哥特区", "고딕 지구", "Barrio Gótico"),
    localName: "Barri Gòtic",
    clusterId: "gothic-rambla",
    coordinates: { lat: 41.3839, lng: 2.1764, precision: "area" },
    categories: ["culture", "local", "photo", "iconic"],
    summary: t(
      "Barcelona's historic Gothic Quarter sits inside the old city, with medieval streets around the cathedral and the former Roman town. It is the densest first-walk area, but the lanes work best slowly rather than as a checklist sprint.",
      "巴塞罗那历史老城的哥特区位于旧城核心，围绕主教座堂和古罗马城镇遗迹展开，中世纪街巷很密。第一次步行最容易从这里看懂城市，但适合慢走，不适合打卡冲刺。",
      "바르셀로나 구시가지 중심의 고딕 지구는 대성당과 옛 로마 도시 주변의 중세 골목으로 이루어져 있습니다. 첫 산책으로 도시를 이해하기 좋지만, 체크리스트처럼 뛰기보다 천천히 걸을 때 좋습니다.",
      "El Barrio Gótico ocupa el núcleo histórico de Barcelona, con calles medievales alrededor de la catedral y la antigua ciudad romana. Es la zona más densa para un primer paseo, pero funciona mejor despacio que como lista de puntos."
    ),
    sources: [wikipedia("Gothic Quarter, Barcelona", "Gothic_Quarter,_Barcelona"), wikidata("Q163021")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "barcelona-cathedral",
    name: t("Barcelona Cathedral", "巴塞罗那主教座堂", "바르셀로나 대성당", "Catedral de Barcelona"),
    localName: "Catedral de la Santa Creu i Santa Eulàlia",
    clusterId: "gothic-rambla",
    coordinates: { lat: 41.383889, lng: 2.176389, precision: "site" },
    categories: ["culture", "iconic", "photo"],
    summary: t(
      "The Gothic cathedral of Barcelona, dedicated to the Holy Cross and Saint Eulalia. Most of the present structure was built from the thirteenth to fifteenth centuries, with the neo-Gothic facade finished later.",
      "巴塞罗那的哥特式主教座堂，奉献给圣十字与圣欧拉利娅。现存主体多建于 13 至 15 世纪，新哥特式立面则较晚完成。",
      "성 십자가와 성 에울랄리아에게 봉헌된 바르셀로나의 고딕 대성당입니다. 현재 건물의 대부분은 13-15세기에 지어졌고, 네오고딕 양식의 정면은 나중에 완성되었습니다.",
      "La catedral gótica de Barcelona, dedicada a la Santa Cruz y Santa Eulalia. La mayor parte del edificio actual se construyó entre los siglos XIII y XV, y la fachada neogótica se terminó más tarde."
    ),
    sources: [wikipedia("Barcelona Cathedral", "Barcelona_Cathedral"), wikidata("Q19170")],
    visitMinutes: { min: 30, max: 60 },
    bestTime: "morning",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "la-rambla",
    name: t("La Rambla", "兰布拉大道", "람블라 거리", "La Rambla"),
    localName: "La Rambla",
    clusterId: "gothic-rambla",
    coordinates: { lat: 41.3818, lng: 2.1724, precision: "area" },
    categories: ["iconic", "local", "photo"],
    summary: t(
      "Barcelona's famous tree-lined pedestrian boulevard runs between Plaça de Catalunya and the old port. It is central and busy by design, so use it as a spine into the old city rather than as the whole experience.",
      "巴塞罗那著名的林荫步行大道连接加泰罗尼亚广场与旧港。它本来就是城市中轴且人多，适合作为进入老城的主线，而不是把全部体验都押在这里。",
      "바르셀로나의 유명한 가로수 보행 대로로, 카탈루냐 광장과 옛 항구를 잇습니다. 원래 중심축이라 붐비므로, 이 거리 자체보다 구시가지로 들어가는 축으로 쓰는 편이 좋습니다.",
      "El famoso paseo arbolado de Barcelona une Plaça de Catalunya con el puerto antiguo. Es céntrico y concurrido por naturaleza; úsalo como eje para entrar al casco antiguo, no como toda la experiencia."
    ),
    sources: [wikipedia("La Rambla, Barcelona", "La_Rambla,_Barcelona"), wikidata("Q4032")],
    visitMinutes: { min: 25, max: 45 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "la-boqueria",
    name: t("La Boqueria", "博盖利亚市场", "라 보케리아", "La Boqueria"),
    localName: "Mercat de Sant Josep de la Boqueria",
    clusterId: "gothic-rambla",
    coordinates: { lat: 41.381667, lng: 2.171944, precision: "site" },
    categories: ["food", "local", "iconic"],
    summary: t(
      "A public market off La Rambla, officially the Mercat de Sant Josep de la Boqueria. The market has roots in open-air food stalls and is now one of Barcelona's best-known food stops.",
      "位于兰布拉大道旁的公共市场，正式名称为圣约瑟夫博盖利亚市场。它起源于露天食品摊，如今是巴塞罗那最知名的美食停靠点之一。",
      "람블라 거리 옆의 공설시장으로, 정식 명칭은 산트 조셉 데 라 보케리아 시장입니다. 노천 식품 노점에서 시작해 지금은 바르셀로나에서 가장 잘 알려진 음식 명소 중 하나입니다.",
      "Mercado público junto a La Rambla, oficialmente Mercat de Sant Josep de la Boqueria. Nació de puestos de comida al aire libre y hoy es una de las paradas gastronómicas más conocidas de Barcelona."
    ),
    sources: [wikipedia("La Boqueria", "La_Boqueria"), wikidata("Q846718")],
    visitMinutes: { min: 30, max: 60 },
    bestTime: "morning",
    setting: "indoor",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "placa-reial",
    name: t("Plaça Reial", "皇家广场", "레이알 광장", "Plaça Reial"),
    localName: "Plaça Reial",
    clusterId: "gothic-rambla",
    coordinates: { lat: 41.38, lng: 2.175, precision: "site" },
    categories: ["local", "photo", "night"],
    summary: t(
      "A nineteenth-century square just off La Rambla, known for its arcades, palms and nightlife. The lampposts in the square were early public works by Antoni Gaudí.",
      "兰布拉大道旁的 19 世纪广场，以拱廊、棕榈树和夜间氛围闻名。广场灯柱是安东尼·高迪早期的公共作品。",
      "람블라 거리 옆의 19세기 광장으로, 아케이드와 야자수, 밤 분위기로 알려져 있습니다. 광장의 가로등은 안토니 가우디의 초기 공공 작업입니다.",
      "Plaza del siglo XIX junto a La Rambla, conocida por sus arcadas, palmeras y vida nocturna. Las farolas de la plaza fueron obras públicas tempranas de Antoni Gaudí."
    ),
    sources: [wikipedia("Plaça Reial", "Pla%C3%A7a_Reial"), wikidata("Q1427997")],
    visitMinutes: { min: 20, max: 40 },
    bestTime: "evening",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },

  // El Born & Ciutadella
  {
    id: "santa-maria-del-mar",
    name: t("Santa Maria del Mar", "海上圣玛利亚教堂", "산타 마리아 델 마르", "Santa Maria del Mar"),
    localName: "Basílica de Santa Maria del Mar",
    clusterId: "born-ciutadella",
    coordinates: { lat: 41.383889, lng: 2.182222, precision: "site" },
    categories: ["culture", "iconic", "photo"],
    summary: t(
      "A Catalan Gothic basilica in the Ribera district, built in the fourteenth century. Its broad interior and neighbourhood setting make it one of the clearest architectural stops in El Born.",
      "位于里贝拉区的加泰罗尼亚哥特式教堂，建于 14 世纪。开阔的内部空间和街区位置，让它成为波恩区最清楚的建筑停靠点之一。",
      "리베라 지구에 있는 카탈루냐 고딕 양식의 바실리카로, 14세기에 지어졌습니다. 넓은 내부와 동네 속 위치 덕분에 엘 본에서 가장 이해하기 쉬운 건축 명소 중 하나입니다.",
      "Basílica gótica catalana en el barrio de la Ribera, construida en el siglo XIV. Su interior amplio y su posición de barrio la hacen una de las paradas arquitectónicas más claras de El Born."
    ),
    sources: [wikipedia("Santa Maria del Mar, Barcelona", "Santa_Maria_del_Mar,_Barcelona"), wikidata("Q572971")],
    visitMinutes: { min: 25, max: 50 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "picasso-museum",
    name: t("Picasso Museum", "毕加索博物馆", "피카소 미술관", "Museo Picasso"),
    localName: "Museu Picasso",
    clusterId: "born-ciutadella",
    coordinates: { lat: 41.385278, lng: 2.180833, precision: "site" },
    categories: ["culture", "iconic"],
    summary: t(
      "A museum in five adjoining medieval palaces on Carrer de Montcada, with one of the most extensive collections of works by Pablo Picasso. It is especially tied to Picasso's early years in Barcelona.",
      "位于蒙卡达街五座相邻中世纪宫宅中的博物馆，收藏大量巴勃罗·毕加索作品，尤其与他在巴塞罗那的早年经历相关。",
      "몬카다 거리의 서로 붙은 중세 궁전 다섯 채에 자리한 미술관으로, 파블로 피카소 작품을 폭넓게 소장합니다. 특히 피카소의 바르셀로나 초기 시절과 깊게 연결되어 있습니다.",
      "Museo situado en cinco palacios medievales contiguos de la calle Montcada, con una de las colecciones más extensas de Pablo Picasso. Está muy ligado a los primeros años de Picasso en Barcelona."
    ),
    sources: [wikipedia("Museu Picasso", "Museu_Picasso"), wikidata("Q1249371")],
    visitMinutes: { min: 60, max: 120 },
    bestTime: "daytime",
    setting: "indoor",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "palau-musica",
    name: t("Palau de la Música Catalana", "加泰罗尼亚音乐宫", "카탈루냐 음악당", "Palau de la Música Catalana"),
    localName: "Palau de la Música Catalana",
    clusterId: "born-ciutadella",
    coordinates: { lat: 41.3875, lng: 2.175278, precision: "site" },
    categories: ["culture", "photo", "iconic"],
    summary: t(
      "A concert hall by Lluís Domènech i Montaner, opened in 1908 and listed by UNESCO with the Hospital de Sant Pau. Its stained glass, ceramic work and dense ornament make it a strong indoor photo stop.",
      "由路易斯·多梅内克-蒙塔内尔设计的音乐厅，1908 年启用，并与圣保罗医院一同列入 UNESCO。彩色玻璃、陶瓷和繁密装饰让它成为很强的室内拍照点。",
      "류이스 도메네크 이 몬타네르가 설계한 콘서트홀로, 1908년에 문을 열었고 산트 파우 병원과 함께 유네스코에 등재되었습니다. 스테인드글라스와 도자 장식, 촘촘한 장식이 강한 실내 사진 포인트를 만듭니다.",
      "Sala de conciertos de Lluís Domènech i Montaner, inaugurada en 1908 y declarada por la UNESCO junto al Hospital de Sant Pau. Sus vidrieras, cerámica y ornamentación densa la hacen una parada fotográfica interior potente."
    ),
    sources: [wikipedia("Palau de la Música Catalana", "Palau_de_la_M%C3%BAsica_Catalana"), wikidata("Q208846")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "daytime",
    setting: "indoor",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "arc-de-triomf",
    name: t("Arc de Triomf", "凯旋门", "아르크 데 트리옴프", "Arc de Triomf"),
    localName: "Arc de Triomf",
    clusterId: "born-ciutadella",
    coordinates: { lat: 41.391111, lng: 2.180556, precision: "site" },
    categories: ["photo", "iconic", "culture"],
    summary: t(
      "A brick triumphal arch built as the main access gate for the 1888 Barcelona Universal Exposition. It anchors the promenade leading toward Parc de la Ciutadella.",
      "为 1888 年巴塞罗那世界博览会主入口而建的红砖凯旋门，连接通往城堡公园的林荫步道，是这一区的清晰轴线。",
      "1888년 바르셀로나 만국박람회의 주 출입문으로 세워진 붉은 벽돌 개선문입니다. 시우타데야 공원으로 이어지는 산책로의 축을 잡아 줍니다.",
      "Arco de ladrillo construido como puerta principal de la Exposición Universal de Barcelona de 1888. Marca el paseo que conduce al Parc de la Ciutadella."
    ),
    sources: [wikipedia("Arc de Triomf", "Arc_de_Triomf"), wikidata("Q925780")],
    visitMinutes: { min: 15, max: 30 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "parc-ciutadella",
    name: t("Parc de la Ciutadella", "城堡公园", "시우타데야 공원", "Parc de la Ciutadella"),
    localName: "Parc de la Ciutadella",
    clusterId: "born-ciutadella",
    coordinates: { lat: 41.388056, lng: 2.1875, precision: "area" },
    categories: ["nature", "local", "photo"],
    summary: t(
      "A large public park on the site of the former citadel, redeveloped for the 1888 Universal Exposition. It holds lawns, paths, a monumental fountain and several civic buildings.",
      "建在旧城堡遗址上的大型公共公园，为 1888 年世界博览会重新开发。园内有草坪、步道、纪念喷泉和多座公共建筑。",
      "옛 요새 터에 조성된 큰 공공 공원으로, 1888년 만국박람회를 위해 다시 개발되었습니다. 잔디, 산책로, 기념 분수와 여러 공공 건물이 있습니다.",
      "Gran parque público en el lugar de la antigua ciudadela, remodelado para la Exposición Universal de 1888. Tiene praderas, senderos, una fuente monumental y varios edificios cívicos."
    ),
    sources: [wikipedia("Parc de la Ciutadella", "Parc_de_la_Ciutadella"), wikidata("Q944046")],
    visitMinutes: { min: 40, max: 75 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },

  // Barceloneta & Port Vell
  {
    id: "barceloneta-beach",
    name: t("Barceloneta Beach", "巴塞罗内塔海滩", "바르셀로네타 해변", "Playa de la Barceloneta"),
    localName: "Platja de la Barceloneta",
    clusterId: "barceloneta-port",
    coordinates: { lat: 41.378333, lng: 2.1925, precision: "area" },
    categories: ["nature", "local", "photo", "iconic"],
    summary: t(
      "The city beach beside the Barceloneta neighbourhood, close to the old port and the Olympic seafront. It is easy to reach from the old city, which also means it is rarely quiet in good weather.",
      "巴塞罗内塔街区旁的城市海滩，靠近旧港和奥运海滨。从老城过来很方便，也意味着天气好时很少安静。",
      "바르셀로네타 동네 옆의 도시 해변으로, 옛 항구와 올림픽 해안가에 가깝습니다. 구시가지에서 접근이 쉬운 만큼, 날씨가 좋으면 조용한 경우가 드뭅니다.",
      "La playa urbana junto al barrio de la Barceloneta, cerca del puerto antiguo y el frente marítimo olímpico. Es fácil llegar desde el casco antiguo, lo que también significa que rara vez está tranquila con buen tiempo."
    ),
    sources: [wikipedia("La Barceloneta, Barcelona", "La_Barceloneta,_Barcelona"), wikidata("Q332787")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "port-vell",
    name: t("Port Vell", "旧港", "포트 벨", "Port Vell"),
    localName: "Port Vell",
    clusterId: "barceloneta-port",
    coordinates: { lat: 41.376944, lng: 2.18, precision: "area" },
    categories: ["local", "photo", "iconic"],
    summary: t(
      "Barcelona's old harbour, reshaped as a waterfront area with promenades, marina space and public attractions before the 1992 Olympics. It connects La Rambla, the Gothic edge and Barceloneta.",
      "巴塞罗那旧港在 1992 年奥运会前被改造为滨水区，包含步道、码头空间和公共设施。它连接兰布拉大道、哥特区边缘与巴塞罗内塔。",
      "바르셀로나의 옛 항구로, 1992년 올림픽 전에 산책로와 마리나, 공공 명소가 있는 해안 공간으로 바뀌었습니다. 람블라 거리, 고딕 지구 가장자리, 바르셀로네타를 잇습니다.",
      "El puerto antiguo de Barcelona, remodelado antes de los Juegos Olímpicos de 1992 con paseos, marina y atracciones públicas. Conecta La Rambla, el borde gótico y la Barceloneta."
    ),
    sources: [wikipedia("Port Vell", "Port_Vell"), wikidata("Q1777183")],
    visitMinutes: { min: 30, max: 60 },
    bestTime: "sunset",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },

  // Eixample Icons
  {
    id: "sagrada-familia",
    name: t("Sagrada Família", "圣家堂", "사그라다 파밀리아", "Sagrada Família"),
    localName: "Basílica de la Sagrada Família",
    clusterId: "eixample-icons",
    coordinates: { lat: 41.403611, lng: 2.174444, precision: "site" },
    categories: ["iconic", "culture", "photo"],
    summary: t(
      "Antoni Gaudí's large unfinished basilica and Barcelona's best-known landmark. Construction began in 1882; the building combines religious symbolism, structure and ornament on a scale that needs booked time, not a quick pass-by.",
      "安东尼·高迪的大型未完成教堂，也是巴塞罗那最知名的地标。工程始于 1882 年；它把宗教象征、结构和装饰放到很大的尺度上，需要预留入内时间，不适合只路过。",
      "안토니 가우디의 대형 미완성 바실리카이자 바르셀로나에서 가장 유명한 랜드마크입니다. 1882년에 공사가 시작되었고, 종교 상징과 구조, 장식이 큰 스케일로 결합되어 있어 지나가듯 보기보다 예약 시간을 잡는 편이 좋습니다.",
      "La gran basílica inacabada de Antoni Gaudí y el hito más conocido de Barcelona. La construcción empezó en 1882; combina simbolismo religioso, estructura y ornamento a una escala que pide tiempo reservado, no solo pasar por fuera."
    ),
    sources: [wikipedia("Sagrada Família", "Sagrada_Fam%C3%ADlia"), wikidata("Q48435")],
    visitMinutes: { min: 75, max: 150 },
    bestTime: "morning",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "casa-batllo",
    name: t("Casa Batlló", "巴特罗之家", "카사 바트요", "Casa Batlló"),
    localName: "Casa Batlló",
    clusterId: "eixample-icons",
    coordinates: { lat: 41.391667, lng: 2.165, precision: "site" },
    categories: ["culture", "photo", "iconic"],
    summary: t(
      "A Modernisme house on Passeig de Gràcia redesigned by Antoni Gaudí in the early twentieth century. Its bone-like facade and colourful roof make it one of the strongest exterior stops in the Eixample grid.",
      "格拉西亚大道上的现代主义住宅，20 世纪初由安东尼·高迪改造。骨骼般的立面和彩色屋顶让它成为扩展区网格里最醒目的外观停靠点之一。",
      "그라시아 거리의 모데르니스메 주택으로, 20세기 초 안토니 가우디가 다시 설계했습니다. 뼈 같은 입면과 색채 강한 지붕 때문에 에이샴플라 격자에서 가장 강한 외관 명소 중 하나입니다.",
      "Casa modernista en Passeig de Gràcia rediseñada por Antoni Gaudí a principios del siglo XX. Su fachada ósea y el tejado colorido la hacen una de las paradas exteriores más potentes del Eixample."
    ),
    sources: [wikipedia("Casa Batlló", "Casa_Batll%C3%B3"), wikidata("Q193601")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "casa-mila",
    name: t("Casa Milà", "米拉之家", "카사 밀라", "Casa Milà"),
    localName: "La Pedrera",
    clusterId: "eixample-icons",
    coordinates: { lat: 41.395278, lng: 2.161667, precision: "site" },
    categories: ["culture", "photo", "iconic"],
    summary: t(
      "A Gaudí-designed apartment building on Passeig de Gràcia, also called La Pedrera. Completed in the early twentieth century, it is known for its undulating stone facade and sculptural roof terrace.",
      "高迪设计的格拉西亚大道公寓楼，又称 La Pedrera。它完成于 20 世纪初，以起伏石质立面和雕塑般的屋顶平台闻名。",
      "가우디가 설계한 그라시아 거리의 아파트 건물로, 라 페드레라라고도 합니다. 20세기 초 완성되었으며 물결치는 석재 입면과 조각 같은 옥상 테라스로 알려져 있습니다.",
      "Edificio de apartamentos diseñado por Gaudí en Passeig de Gràcia, también llamado La Pedrera. Terminado a principios del siglo XX, es conocido por la fachada ondulante de piedra y la azotea escultórica."
    ),
    sources: [wikipedia("Casa Milà", "Casa_Mil%C3%A0"), wikidata("Q207694")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "hospital-sant-pau",
    name: t("Hospital de Sant Pau", "圣保罗医院", "산트 파우 병원", "Hospital de Sant Pau"),
    localName: "Recinte Modernista de Sant Pau",
    clusterId: "eixample-icons",
    coordinates: { lat: 41.412778, lng: 2.174444, precision: "site" },
    categories: ["culture", "photo"],
    summary: t(
      "A Modernisme hospital complex by Lluís Domènech i Montaner, now a cultural and institutional site. It is part of the UNESCO listing shared with the Palau de la Música Catalana.",
      "路易斯·多梅内克-蒙塔内尔设计的现代主义医院建筑群，如今是文化与机构场所。它与加泰罗尼亚音乐宫共同列入 UNESCO。",
      "류이스 도메네크 이 몬타네르가 설계한 모데르니스메 병원 단지로, 지금은 문화 및 기관 공간입니다. 카탈루냐 음악당과 함께 유네스코에 등재되어 있습니다.",
      "Complejo hospitalario modernista de Lluís Domènech i Montaner, hoy espacio cultural e institucional. Forma parte de la inscripción UNESCO compartida con el Palau de la Música Catalana."
    ),
    sources: [wikipedia("Hospital de Sant Pau", "Hospital_de_Sant_Pau"), wikidata("Q242554")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },

  // Gràcia & Park Güell
  {
    id: "park-guell",
    name: t("Park Güell", "桂尔公园", "구엘 공원", "Park Güell"),
    localName: "Park Güell",
    clusterId: "gracia-park",
    coordinates: { lat: 41.4145, lng: 2.1527, precision: "site" },
    categories: ["iconic", "photo", "nature", "culture"],
    summary: t(
      "A public park system with gardens and architectural elements by Antoni Gaudí, originally planned as a housing development. Its tiled terrace and city views are famous, but the hillside layout adds real walking effort.",
      "由安东尼·高迪设计园林与建筑元素的公共公园，最初计划为住宅开发。彩瓷平台和城市视野很有名，但山坡布局确实会增加步行强度。",
      "안토니 가우디의 정원과 건축 요소가 있는 공공 공원으로, 처음에는 주택 개발지로 계획되었습니다. 타일 테라스와 도시 전망이 유명하지만, 언덕 지형 때문에 걷는 부담이 있습니다.",
      "Sistema de parque público con jardines y elementos arquitectónicos de Antoni Gaudí, pensado originalmente como urbanización. La terraza de azulejos y las vistas son famosas, pero la ladera exige caminar de verdad."
    ),
    sources: [wikipedia("Park Güell", "Park_G%C3%BCell"), wikidata("Q167899")],
    visitMinutes: { min: 60, max: 120 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "moderate",
  },
  {
    id: "gracia",
    name: t("Gràcia", "格拉西亚", "그라시아", "Gràcia"),
    localName: "Gràcia",
    clusterId: "gracia-park",
    coordinates: { lat: 41.401389, lng: 2.158611, precision: "area" },
    categories: ["local", "food", "night"],
    summary: t(
      "A former independent municipality that became part of Barcelona in 1897. Its plazas, smaller streets and neighbourhood rhythm feel different from the formal Eixample grid just below it.",
      "曾是独立市镇，1897 年并入巴塞罗那。这里的广场、小街和社区节奏，与下方规整的扩展区网格明显不同。",
      "1897년에 바르셀로나에 편입된 옛 독립 자치체입니다. 광장과 작은 거리, 동네 리듬이 바로 아래의 정돈된 에이샴플라 격자와 다르게 느껴집니다.",
      "Antiguo municipio independiente incorporado a Barcelona en 1897. Sus plazas, calles pequeñas y ritmo de barrio se sienten distintos de la cuadrícula formal del Eixample justo debajo."
    ),
    sources: [wikipedia("Gràcia", "Gr%C3%A0cia"), wikidata("Q845605")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "evening",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "casa-vicens",
    name: t("Casa Vicens", "文森之家", "카사 비센스", "Casa Vicens"),
    localName: "Casa Vicens",
    clusterId: "gracia-park",
    coordinates: { lat: 41.403333, lng: 2.150556, precision: "site" },
    categories: ["culture", "photo"],
    summary: t(
      "An early Gaudí house in Gràcia, built for Manuel Vicens. It shows a different, more tiled and Moorish-influenced side of Gaudí before the later Eixample icons.",
      "格拉西亚的一座高迪早期住宅，为曼努埃尔·文森建造。它呈现高迪在后期扩展区地标之前，更偏彩瓷和摩尔影响的一面。",
      "그라시아에 있는 가우디 초기 주택으로, 마누엘 비센스를 위해 지어졌습니다. 훗날 에이샴플라 아이콘들보다 타일과 무어 양식 영향이 더 강한 가우디의 다른 면을 보여 줍니다.",
      "Casa temprana de Gaudí en Gràcia, construida para Manuel Vicens. Muestra un lado de Gaudí más azulejado y de influencia morisca antes de los iconos posteriores del Eixample."
    ),
    sources: [wikipedia("Casa Vicens", "Casa_Vicens"), wikidata("Q842473")],
    visitMinutes: { min: 35, max: 70 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },

  // Montjuïc
  {
    id: "mnac",
    name: t("MNAC", "加泰罗尼亚国家艺术博物馆", "카탈루냐 국립미술관", "MNAC"),
    localName: "Museu Nacional d'Art de Catalunya",
    clusterId: "montjuic",
    coordinates: { lat: 41.368333, lng: 2.153611, precision: "site" },
    categories: ["culture", "photo", "iconic"],
    summary: t(
      "The National Art Museum of Catalonia, housed in the Palau Nacional on Montjuïc. Its terrace looks back over Plaça d'Espanya, while the collection is especially known for Romanesque church paintings.",
      "加泰罗尼亚国家艺术博物馆位于蒙锥克山的国家宫内。露台可回望西班牙广场，馆藏尤其以罗马式教堂绘画闻名。",
      "몬주익의 팔라우 나시오날에 있는 카탈루냐 국립미술관입니다. 테라스에서는 에스파냐 광장을 내려다볼 수 있고, 소장품은 특히 로마네스크 교회 회화로 알려져 있습니다.",
      "El Museo Nacional de Arte de Cataluña, en el Palau Nacional de Montjuïc. Su terraza mira hacia Plaça d'Espanya, y la colección es especialmente conocida por pintura románica de iglesias."
    ),
    sources: [wikipedia("Museu Nacional d'Art de Catalunya", "Museu_Nacional_d%27Art_de_Catalunya"), wikidata("Q161806")],
    visitMinutes: { min: 60, max: 120 },
    bestTime: "sunset",
    setting: "mixed",
    weatherSensitive: false,
    walking: "moderate",
  },
  {
    id: "magic-fountain",
    name: t("Magic Fountain of Montjuïc", "蒙锥克魔法喷泉", "몬주익 마법의 분수", "Fuente Mágica de Montjuïc"),
    localName: "Font Màgica de Montjuïc",
    clusterId: "montjuic",
    coordinates: { lat: 41.371111, lng: 2.151667, precision: "site" },
    categories: ["photo", "night", "iconic"],
    summary: t(
      "A large fountain below the Palau Nacional, built for the 1929 Barcelona International Exposition. The area is a strong orientation point even when fountain shows are not running.",
      "国家宫下方的大型喷泉，为 1929 年巴塞罗那国际博览会而建。即使没有喷泉表演，这一带仍是很好的方向感停靠点。",
      "팔라우 나시오날 아래의 큰 분수로, 1929년 바르셀로나 국제박람회를 위해 세워졌습니다. 분수 공연이 없을 때도 이 일대는 방향을 잡기 좋은 지점입니다.",
      "Gran fuente bajo el Palau Nacional, construida para la Exposición Internacional de Barcelona de 1929. La zona orienta muy bien incluso cuando no hay espectáculos de agua."
    ),
    sources: [wikipedia("Magic Fountain of Montjuïc", "Magic_Fountain_of_Montju%C3%AFc"), wikidata("Q943344")],
    visitMinutes: { min: 20, max: 45 },
    bestTime: "evening",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "moderate",
  },
  {
    id: "montjuic-castle",
    name: t("Montjuïc Castle", "蒙锥克城堡", "몬주익 성", "Castillo de Montjuïc"),
    localName: "Castell de Montjuïc",
    clusterId: "montjuic",
    coordinates: { lat: 41.363333, lng: 2.166944, precision: "site" },
    categories: ["culture", "photo", "iconic"],
    summary: t(
      "A fortress on Montjuïc hill above the port, with roots in a seventeenth-century military site. It gives wide views over the harbour and city, but reaching it is a hill move rather than a casual flat walk.",
      "位于港口上方蒙锥克山顶的堡垒，源自 17 世纪军事地点。这里能看港口和城市大景，但到达它是爬山动线，不是轻松平路散步。",
      "항구 위 몬주익 언덕의 요새로, 17세기 군사 시설에 뿌리를 둡니다. 항구와 도시를 넓게 볼 수 있지만, 가는 길은 평지 산책이 아니라 언덕 이동입니다.",
      "Fortaleza en la colina de Montjuïc sobre el puerto, con origen en un sitio militar del siglo XVII. Da vistas amplias del puerto y la ciudad, pero llegar es una subida, no un paseo llano casual."
    ),
    sources: [wikipedia("Montjuïc Castle", "Montju%C3%AFc_Castle"), wikidata("Q634827")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "sunset",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "moderate",
  },

  // Les Corts & Camp Nou
  {
    id: "camp-nou",
    name: t("Camp Nou", "诺坎普", "캄 노우", "Camp Nou"),
    localName: "Camp Nou",
    clusterId: "les-corts",
    coordinates: { lat: 41.3809, lng: 2.1228, precision: "site" },
    categories: ["iconic", "local", "photo"],
    summary: t(
      "FC Barcelona's home stadium in Les Corts. For many visitors it works as an exterior football stop on a west-side route; access and construction conditions can change, so this guide treats it as optional.",
      "位于莱斯科茨的巴塞罗那足球俱乐部主场。对许多访客来说，它适合作为西侧路线上的足球外观停靠点；入内和施工情况会变化，所以本指南把它作为可选项。",
      "레스 코르츠에 있는 FC 바르셀로나의 홈 경기장입니다. 많은 방문자에게는 서쪽 동선의 축구 외관 명소로 충분합니다. 입장과 공사 상황은 바뀔 수 있어 이 가이드에서는 선택지로 둡니다.",
      "Estadio del FC Barcelona en Les Corts. Para muchos visitantes funciona como parada futbolera exterior en una ruta del oeste; el acceso y las obras pueden cambiar, así que esta guía lo trata como opcional."
    ),
    sources: [wikipedia("Camp Nou", "Camp_Nou"), wikidata("Q159848")],
    visitMinutes: { min: 20, max: 45 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
]

const heroPhoto: CityPhoto = {
  src: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1600&q=85&auto=format&fit=crop",
  width: 1600,
  height: 900,
  alt: t(
    "Barcelona skyline and Sagrada Família under Mediterranean light",
    "地中海光线下的巴塞罗那天际线与圣家堂",
    "지중해 빛 아래 바르셀로나 스카이라인과 사그라다 파밀리아",
    "Skyline de Barcelona y la Sagrada Família con luz mediterránea"
  ),
  credit: {
    label: t("Unsplash", "Unsplash", "Unsplash", "Unsplash"),
    href: "https://images.unsplash.com/photo-1583422409516-2895a77efded",
  },
}

const routePhoto = (alt: CityText): CityPhoto => ({
  ...heroPhoto,
  alt,
})

const photos = {
  essentials: routePhoto(
    t(
      "Barcelona city view for the essentials route",
      "巴塞罗那城市景色，用于经典路线",
      "핵심 코스에 쓰는 바르셀로나 도시 전경",
      "Vista de Barcelona para la ruta esencial"
    )
  ),
  photo: routePhoto(
    t(
      "Barcelona city view for the photo route",
      "巴塞罗那城市景色，用于拍照路线",
      "사진 코스에 쓰는 바르셀로나 도시 전경",
      "Vista de Barcelona para la ruta fotográfica"
    )
  ),
  local: routePhoto(
    t(
      "Barcelona city view for the local route",
      "巴塞罗那城市景色，用于在地路线",
      "로컬 코스에 쓰는 바르셀로나 도시 전경",
      "Vista de Barcelona para la ruta local"
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
    name: t("Barcelona Essentials", "巴塞罗那经典一日", "바르셀로나 핵심 코스", "Barcelona esencial"),
    description: t(
      "Old city morning, El Born and Ciutadella by foot, then a metro hop to Sagrada Família and Park Güell. It keeps the classic icons without bouncing across the map.",
      "上午走老城，步行穿过波恩区与城堡公园，再坐地铁去圣家堂和桂尔公园。经典地标都在，但不在地图上来回弹跳。",
      "아침에는 구시가지, 이어 엘 본과 시우타데야를 걸은 뒤 지하철로 사그라다 파밀리아와 구엘 공원에 갑니다. 대표 명소를 보되 지도 위를 왕복하지 않습니다.",
      "Casco antiguo por la mañana, El Born y Ciutadella a pie, luego metro a la Sagrada Família y Park Güell. Mantiene los iconos clásicos sin rebotar por el mapa."
    ),
    estimatedDurationMinutes: 425,
    stops: [
      {
        placeId: "la-boqueria",
        order: 1,
        estimatedVisitMinutes: 35,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Start early at the market while La Rambla is still usable. Breakfast first makes the old-city walk less frantic.",
          "趁兰布拉大道还好走，先从市场开始。先吃点东西，后面的老城步行会从容很多。",
          "람블라 거리가 아직 다닐 만할 때 시장에서 시작합니다. 먼저 먹으면 구시가지 산책이 덜 급해집니다.",
          "Empieza temprano en el mercado mientras La Rambla aún se deja caminar. Desayunar primero hace menos frenético el casco antiguo."
        ),
      },
      {
        placeId: "gothic-quarter",
        order: 2,
        estimatedVisitMinutes: 55,
        estimatedTravelMinutesFromPrevious: 10,
        transportMode: "walk",
        reason: t(
          "Walk into the Gothic lanes rather than staying on the boulevard. This is where the old city starts to make sense.",
          "从大道拐进哥特街巷，而不是只停在主路上。老城的结构从这里开始变清楚。",
          "대로에 머물지 말고 고딕 골목으로 들어갑니다. 구시가지의 구조가 여기서 이해되기 시작합니다.",
          "Entra caminando en las calles góticas en vez de quedarte en el bulevar. Ahí empieza a entenderse la ciudad vieja."
        ),
      },
      {
        placeId: "santa-maria-del-mar",
        order: 3,
        estimatedVisitMinutes: 30,
        estimatedTravelMinutesFromPrevious: 15,
        transportMode: "walk",
        reason: t(
          "Continue east into El Born for a clearer Gothic interior and a calmer neighbourhood pace.",
          "继续向东进波恩区，看更清楚的哥特式内部空间，也换一个更安静的街区节奏。",
          "동쪽 엘 본으로 이어가 더 또렷한 고딕 실내와 차분한 동네 속도를 봅니다.",
          "Sigue al este hacia El Born para un interior gótico más claro y un ritmo de barrio más tranquilo."
        ),
      },
      {
        placeId: "parc-ciutadella",
        order: 4,
        estimatedVisitMinutes: 40,
        estimatedTravelMinutesFromPrevious: 15,
        transportMode: "walk",
        reason: t(
          "Stay on foot to the park so the 1888 exposition axis lands naturally instead of feeling like a detour.",
          "继续步行到公园，让 1888 年博览会轴线自然接上，而不是像额外绕路。",
          "공원까지 걸어서 1888년 박람회 축이 우회처럼 느껴지지 않게 합니다.",
          "Sigue a pie hasta el parque para que el eje de 1888 caiga de forma natural, no como un desvío."
        ),
      },
      {
        placeId: "sagrada-familia",
        order: 5,
        estimatedVisitMinutes: 90,
        estimatedTravelMinutesFromPrevious: 25,
        transportMode: "mtr",
        reason: t(
          "Take the metro into the Eixample. Walking this hop wastes energy before the one interior that deserves booked time.",
          "坐地铁进扩展区。这一段硬走会浪费体力，而圣家堂才是需要预约时间入内的重点。",
          "지하철로 에이샴플라에 들어갑니다. 이 구간을 걸으면, 예약 시간을 들일 만한 실내 명소 전에 체력을 씁니다.",
          "Toma el metro al Eixample. Caminar este tramo gasta energía antes del interior que sí merece tiempo reservado."
        ),
      },
      {
        placeId: "park-guell",
        order: 6,
        estimatedVisitMinutes: 75,
        estimatedTravelMinutesFromPrevious: 30,
        transportMode: "bus",
        reason: t(
          "Use bus or taxi for the hill. Park Güell is close on a map, but the slope is the real distance.",
          "上山这段坐公交或出租车。桂尔公园在地图上不远，但真正的距离是坡度。",
          "언덕 구간은 버스나 택시를 씁니다. 구엘 공원은 지도상 가까워도 실제 거리는 경사입니다.",
          "Usa bus o taxi para la colina. Park Güell parece cerca en el mapa, pero la pendiente es la distancia real."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "It moves old city → El Born → Eixample → Gràcia, always forward through neighbouring clusters.",
        "路线按老城 → 波恩区 → 扩展区 → 格拉西亚推进，片区之间只往前走。",
        "구시가지 → 엘 본 → 에이샴플라 → 그라시아로 앞으로만 이동합니다.",
        "Avanza casco antiguo → El Born → Eixample → Gràcia, siempre hacia delante entre clústeres vecinos."
      ),
      t(
        "The long hops use metro or bus, while the old-city parts stay walkable and connected.",
        "长距离用地铁或公交，老城内部则保持步行且连贯。",
        "긴 구간은 지하철이나 버스를 쓰고, 구시가지 부분은 걷기 좋게 이어 둡니다.",
        "Los saltos largos usan metro o bus, mientras las partes del casco antiguo quedan conectadas a pie."
      ),
      t(
        "It includes the must-see Gaudí pair without turning the day into only Gaudí.",
        "包含最核心的两处高迪，但不把一整天变成只有高迪。",
        "핵심 가우디 두 곳을 넣되, 하루 전체를 가우디만으로 만들지 않습니다.",
        "Incluye la pareja Gaudí imprescindible sin convertir el día solo en Gaudí."
      ),
    ],
    goodFor: [
      t("First visit with one full day", "第一次来、有一整天", "첫 방문, 하루 종일", "Primera visita con un día completo"),
      t("Classic landmarks without backtracking", "想看经典但不想折返", "왕복 없이 대표 명소 보기", "Clásicos sin volver atrás"),
      t("Travellers comfortable booking one interior", "愿意预约一个重点室内参观的人", "주요 실내 한 곳을 예약할 여행자", "Quien reserva un interior importante"),
    ],
    tradeoffs: [
      t(
        "Casa Batlló and Casa Milà are skipped here; use the Photo route if Passeig de Gràcia facades matter more.",
        "这条线不进巴特罗之家和米拉之家；如果更在意格拉西亚大道立面，走拍照路线。",
        "이 코스에서는 카사 바트요와 카사 밀라를 뺍니다. 그라시아 거리 입면이 더 중요하면 사진 코스를 쓰세요.",
        "Aquí se omiten Casa Batlló y Casa Milà; usa la ruta Photo si importan más las fachadas de Passeig de Gràcia."
      ),
      t(
        "Park Güell's hill can feel late-day heavy. Swap it with Gràcia if heat or knees are an issue.",
        "桂尔公园的坡在一天后段会有点累。太热或膝盖不舒服时，可改走格拉西亚。",
        "구엘 공원의 언덕은 하루 후반에 무겁게 느껴질 수 있습니다. 더위나 무릎이 문제면 그라시아로 바꾸세요.",
        "La colina de Park Güell puede pesar al final del día. Cámbiala por Gràcia si el calor o las rodillas molestan."
      ),
      t(
        "No beach time. Barceloneta belongs to the Local route or a separate slow morning.",
        "没有海滩时间。巴塞罗内塔更适合在地路线，或另排一个慢上午。",
        "해변 시간은 없습니다. 바르셀로네타는 로컬 코스나 별도의 느린 아침에 어울립니다.",
        "Sin playa. Barceloneta encaja mejor en la ruta Local o en una mañana lenta aparte."
      ),
    ],
  },
  {
    id: "photo",
    theme: "photo",
    photo: photos.photo,
    name: t("Photo Barcelona", "拍照巴塞罗那", "사진으로 보는 바르셀로나", "Barcelona en fotos"),
    description: t(
      "Start with Park Güell light, descend through Sagrada Família and Passeig de Gràcia, then finish on Montjuïc for the city view.",
      "从桂尔公园的光线开始，下行到圣家堂和格拉西亚大道，最后在蒙锥克看城市视野收尾。",
      "구엘 공원의 빛으로 시작해 사그라다 파밀리아와 그라시아 거리로 내려오고, 몬주익에서 도시 전망으로 마무리합니다.",
      "Empieza con la luz de Park Güell, baja por Sagrada Família y Passeig de Gràcia, y termina en Montjuïc con la vista de la ciudad."
    ),
    estimatedDurationMinutes: 440,
    stops: [
      {
        placeId: "park-guell",
        order: 1,
        estimatedVisitMinutes: 75,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Begin high while the tiled terrace still has softer light. Starting here avoids climbing late.",
          "从高处开始，趁彩瓷平台还有较柔的光线。先上山也避免傍晚才爬坡。",
          "타일 테라스에 빛이 아직 부드러울 때 높은 곳에서 시작합니다. 먼저 올라가면 늦게 언덕을 오르지 않아도 됩니다.",
          "Empieza arriba mientras la terraza de azulejos conserva luz suave. Empezar aquí evita subir tarde."
        ),
      },
      {
        placeId: "sagrada-familia",
        order: 2,
        estimatedVisitMinutes: 80,
        estimatedTravelMinutesFromPrevious: 25,
        transportMode: "bus",
        reason: t(
          "Descend by bus to Sagrada Família. The hop is short, but the slope and traffic make a walk less useful.",
          "坐公交下到圣家堂。这段不算远，但坡度和车流让步行收益不高。",
          "버스로 사그라다 파밀리아까지 내려갑니다. 거리는 짧지만 경사와 교통 때문에 걷는 이점이 적습니다.",
          "Baja en bus a la Sagrada Família. El salto es corto, pero la pendiente y el tráfico hacen menos útil caminar."
        ),
      },
      {
        placeId: "hospital-sant-pau",
        order: 3,
        estimatedVisitMinutes: 45,
        estimatedTravelMinutesFromPrevious: 15,
        transportMode: "walk",
        reason: t(
          "Walk the neighbourhood axis to Sant Pau for Modernisme without another metro transfer.",
          "沿街区轴线步行到圣保罗医院，不用再换一次地铁也能看现代主义建筑。",
          "동네 축을 따라 산트 파우까지 걸어, 지하철 환승 없이 모데르니스메를 이어 봅니다.",
          "Camina por el eje del barrio hasta Sant Pau para ver Modernisme sin otro transbordo de metro."
        ),
      },
      {
        placeId: "casa-mila",
        order: 4,
        estimatedVisitMinutes: 40,
        estimatedTravelMinutesFromPrevious: 25,
        transportMode: "mtr",
        reason: t(
          "Metro to Passeig de Gràcia for the stone facade and roofline. This is the compact Eixample photo set.",
          "坐地铁到格拉西亚大道，拍石质立面和屋顶线。这是扩展区最紧凑的一组照片。",
          "지하철로 그라시아 거리로 가서 석재 입면과 지붕선을 찍습니다. 에이샴플라의 압축된 사진 세트입니다.",
          "Metro a Passeig de Gràcia para la fachada de piedra y la línea de azotea. Es el set fotográfico compacto del Eixample."
        ),
      },
      {
        placeId: "casa-batllo",
        order: 5,
        estimatedVisitMinutes: 35,
        estimatedTravelMinutesFromPrevious: 10,
        transportMode: "walk",
        reason: t(
          "Stay on the same avenue and walk to Casa Batlló. No cluster jump, just a better facade sequence.",
          "留在同一条大道上步行到巴特罗之家。没有换片区，只是把立面顺序拍完整。",
          "같은 거리에 머물며 카사 바트요까지 걷습니다. 클러스터 이동이 아니라 입면 순서를 완성하는 구간입니다.",
          "Sigue en la misma avenida hasta Casa Batlló. No hay salto de clúster, solo una mejor secuencia de fachadas."
        ),
      },
      {
        placeId: "mnac",
        order: 6,
        estimatedVisitMinutes: 60,
        estimatedTravelMinutesFromPrevious: 30,
        transportMode: "mtr",
        reason: t(
          "Finish on Montjuïc by metro for a terrace view back over the city instead of another street facade.",
          "最后坐地铁到蒙锥克，在露台回看城市，而不是继续拍另一面街道立面。",
          "마지막은 지하철로 몬주익에 가 도시를 내려다보는 테라스 뷰로 마무리합니다. 또 다른 거리 입면이 아닙니다.",
          "Termina en Montjuïc en metro para una vista de terraza sobre la ciudad, no otra fachada de calle."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "It descends from Gràcia into the Eixample, then moves west to Montjuïc without returning to a previous cluster.",
        "它从格拉西亚下到扩展区，再向西到蒙锥克，不回到之前片区。",
        "그라시아에서 에이샴플라로 내려온 뒤 서쪽 몬주익으로 가며 이전 클러스터로 돌아가지 않습니다.",
        "Baja de Gràcia al Eixample y luego va al oeste a Montjuïc sin volver a un clúster anterior."
      ),
      t(
        "Every long or sloped hop uses bus or metro, so the walking is saved for actual photo streets.",
        "长距离或坡路用公交/地铁，把步行留给真正值得拍的街段。",
        "길거나 경사진 구간은 버스나 지하철을 쓰고, 걷기는 실제 사진 거리로 남깁니다.",
        "Cada salto largo o con pendiente usa bus o metro, reservando la caminata para calles que sí dan fotos."
      ),
      t(
        "The route changes scale on purpose: park terrace, basilica, avenue facades, then city panorama.",
        "尺度有意变化：公园平台、教堂、街道立面，再到城市全景。",
        "공원 테라스, 바실리카, 거리 입면, 도시 파노라마로 의도적으로 스케일을 바꿉니다.",
        "Cambia de escala a propósito: terraza de parque, basílica, fachadas de avenida y panorama urbano."
      ),
    ],
    goodFor: [
      t("Travelling with a camera", "带相机出门", "카메라를 들고 다니는 여행", "Viajar con cámara"),
      t("Gaudí and city views", "高迪与城市视野都要", "가우디와 도시 전망", "Gaudí y vistas urbanas"),
      t("A second day after the old city", "走过老城后的第二天", "구시가지 다음 날", "Un segundo día tras el casco antiguo"),
    ],
    tradeoffs: [
      t(
        "This is a booked-entry kind of day. Without reservations, you may see more exteriors than interiors.",
        "这是需要预约意识的一天。没有预约时，可能会变成看外观多于入内。",
        "예약이 필요한 하루입니다. 예약이 없으면 실내보다 외관을 더 보게 될 수 있습니다.",
        "Es un día de entradas reservadas. Sin reservas, quizá veas más exteriores que interiores."
      ),
      t(
        "No beach and little food browsing. It is built around light and architecture.",
        "没有海滩，吃的闲逛也少。它围绕光线和建筑设计。",
        "해변도, 음식 골목도 거의 없습니다. 빛과 건축을 중심으로 짠 코스입니다.",
        "Sin playa y con poco paseo gastronómico. Está construida alrededor de luz y arquitectura."
      ),
      t(
        "Montjuïc at the end depends on weather; haze weakens the reward.",
        "最后的蒙锥克看天气，雾霾或阴天会削弱回报。",
        "마지막 몬주익은 날씨에 달려 있습니다. 흐리거나 뿌연 날은 보상이 약해집니다.",
        "Montjuïc al final depende del tiempo; la calima reduce la recompensa."
      ),
    ],
  },
  {
    id: "local",
    theme: "local",
    photo: photos.local,
    name: t("Local Barcelona", "在地巴塞罗那", "로컬 바르셀로나", "Barcelona local"),
    description: t(
      "A slower neighbourhood day: Gràcia plazas, one early Gaudí house, Passeig de Gràcia facades, then Born streets and the beach.",
      "更慢的街区一天：格拉西亚广场、一座早期高迪住宅、格拉西亚大道立面，再到波恩街巷和海滩。",
      "느린 동네 하루입니다. 그라시아 광장, 초기 가우디 주택 하나, 그라시아 거리 입면, 이어 엘 본 골목과 해변.",
      "Un día de barrio más lento: plazas de Gràcia, una casa temprana de Gaudí, fachadas de Passeig de Gràcia, calles de El Born y playa."
    ),
    estimatedDurationMinutes: 405,
    stops: [
      {
        placeId: "gracia",
        order: 1,
        estimatedVisitMinutes: 55,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Start in Gràcia before dinner crowds. The plazas explain local Barcelona better than another monument queue.",
          "晚餐人潮起来前先从格拉西亚开始。这里的广场比又一条纪念建筑队伍更能说明日常巴塞罗那。",
          "저녁 인파가 생기기 전 그라시아에서 시작합니다. 광장들이 또 하나의 명소 줄보다 일상 바르셀로나를 잘 설명합니다.",
          "Empieza en Gràcia antes de las cenas. Sus plazas explican la Barcelona local mejor que otra cola de monumento."
        ),
      },
      {
        placeId: "casa-vicens",
        order: 2,
        estimatedVisitMinutes: 40,
        estimatedTravelMinutesFromPrevious: 15,
        transportMode: "walk",
        reason: t(
          "Walk to Casa Vicens for early Gaudí in a neighbourhood setting, not the busiest icon corridor.",
          "步行到文森之家，看街区语境里的早期高迪，而不是最拥挤的地标走廊。",
          "카사 비센스까지 걸어 동네 속 초기 가우디를 봅니다. 가장 붐비는 아이콘 축이 아닙니다.",
          "Camina a Casa Vicens para ver Gaudí temprano en contexto de barrio, no en el corredor más saturado."
        ),
      },
      {
        placeId: "casa-batllo",
        order: 3,
        estimatedVisitMinutes: 35,
        estimatedTravelMinutesFromPrevious: 20,
        transportMode: "mtr",
        reason: t(
          "Metro down to Passeig de Gràcia; the walk is possible but the route saves legs for evening streets.",
          "坐地铁下到格拉西亚大道；这段能走，但把腿力留给傍晚街巷更值得。",
          "지하철로 그라시아 거리까지 내려갑니다. 걸을 수는 있지만 저녁 골목을 위해 다리를 아낍니다.",
          "Metro hasta Passeig de Gràcia; se puede caminar, pero la ruta guarda piernas para las calles de la tarde."
        ),
      },
      {
        placeId: "palau-musica",
        order: 4,
        estimatedVisitMinutes: 45,
        estimatedTravelMinutesFromPrevious: 25,
        transportMode: "mtr",
        reason: t(
          "Continue to the edge of El Born for a Modernisme interior that also pulls you toward the old city.",
          "继续到波恩区边缘，看一处现代主义室内，同时把动线拉向老城。",
          "엘 본 가장자리로 이어가 모데르니스메 실내를 보고, 동시에 동선을 구시가지 쪽으로 당깁니다.",
          "Sigue al borde de El Born para un interior modernista que también te acerca al casco antiguo."
        ),
      },
      {
        placeId: "picasso-museum",
        order: 5,
        estimatedVisitMinutes: 70,
        estimatedTravelMinutesFromPrevious: 15,
        transportMode: "walk",
        reason: t(
          "Walk through El Born to the museum streets. Keep the pace local: one museum, then out again.",
          "穿过波恩区走到博物馆街。节奏保持在地：看一座馆，然后回到街上。",
          "엘 본을 걸어 미술관 거리로 갑니다. 속도는 동네처럼 유지하세요. 미술관 하나 보고 다시 거리로 나옵니다.",
          "Camina por El Born hasta las calles del museo. Mantén ritmo local: un museo y de nuevo a la calle."
        ),
      },
      {
        placeId: "barceloneta-beach",
        order: 6,
        estimatedVisitMinutes: 60,
        estimatedTravelMinutesFromPrevious: 25,
        transportMode: "walk",
        reason: t(
          "End by walking to the beach. It is the honest local finish after stone lanes: open air, sand and sea.",
          "最后步行到海滩。走完石板街后，用空气、沙滩和海作一个真实的在地收尾。",
          "마지막은 해변까지 걸어갑니다. 돌길 골목 뒤에 공기와 모래, 바다로 끝내는 솔직한 로컬 마무리입니다.",
          "Termina caminando a la playa. Es el cierre local honesto tras calles de piedra: aire, arena y mar."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "It flows Gràcia → Eixample → El Born → Barceloneta, with only forward cluster moves.",
        "路线按格拉西亚 → 扩展区 → 波恩区 → 巴塞罗内塔推进，只向前换片区。",
        "그라시아 → 에이샴플라 → 엘 본 → 바르셀로네타로 흘러가며 클러스터 이동은 앞으로만 갑니다.",
        "Fluye Gràcia → Eixample → El Born → Barceloneta, solo con movimientos hacia delante."
      ),
      t(
        "It uses metro for the longer neighbourhood jumps and saves walking for connected streets.",
        "长街区跳转用地铁，把步行留给真正相连的街段。",
        "긴 동네 이동은 지하철을 쓰고, 걷기는 실제로 이어진 거리들에 남깁니다.",
        "Usa metro para saltos de barrio largos y reserva caminar para calles conectadas."
      ),
      t(
        "The day ends at the sea without making the beach carry the whole itinerary.",
        "最后到海边，但不让海滩承担整条路线的全部重量。",
        "해변으로 끝나지만 해변 하나에 하루 전체를 맡기지 않습니다.",
        "El día termina en el mar sin hacer que la playa cargue todo el itinerario."
      ),
    ],
    goodFor: [
      t("People who want neighbourhood texture", "想看街区质感的人", "동네 질감을 보고 싶은 사람", "Quien quiere textura de barrio"),
      t("Food and plazas over queues", "广场和吃喝优先于排队", "줄보다 광장과 음식", "Plazas y comida antes que colas"),
      t("A gentler second or third day", "第二或第三天的轻松路线", "둘째나 셋째 날의 느린 코스", "Un segundo o tercer día más suave"),
    ],
    tradeoffs: [
      t(
        "No Sagrada Família interior. This route assumes you have seen it already or booked it separately.",
        "不含圣家堂入内。这条线假设你已经看过，或另行预约。",
        "사그라다 파밀리아 내부는 없습니다. 이미 봤거나 따로 예약한다고 보는 코스입니다.",
        "Sin interior de Sagrada Família. La ruta asume que ya lo viste o lo reservas aparte."
      ),
      t(
        "Barceloneta is crowded in warm weather. Go early another day if you want a quiet swim.",
        "天气暖时巴塞罗内塔会很挤。若想安静游泳，另一天早上去。",
        "따뜻한 날씨에는 바르셀로네타가 붐빕니다. 조용히 수영하고 싶다면 다른 날 아침 일찍 가세요.",
        "Barceloneta se llena con buen tiempo. Ve temprano otro día si quieres nadar con calma."
      ),
      t(
        "Museum time can expand fast; cap Picasso if you still want beach light.",
        "博物馆时间很容易拉长；如果还想赶海边光线，就控制毕加索博物馆时长。",
        "미술관 시간은 빨리 늘어납니다. 해변 빛을 원하면 피카소 미술관 시간을 제한하세요.",
        "El museo puede expandirse rápido; limita Picasso si quieres luz de playa."
      ),
    ],
  },
]

export const barcelona: City = {
  slug: "barcelona",
  name: t("Barcelona", "巴塞罗那", "바르셀로나", "Barcelona"),
  localName: "Barcelona",
  country: t("Spain", "西班牙", "스페인", "España"),
  intro: t(
    "Barcelona is a compact Mediterranean city with several different first impressions: medieval lanes in the Gothic Quarter, Modernisme icons in the Eixample and Gràcia, Montjuïc above the port, and city beaches close to the old harbour. A good first visit moves by cluster, not by isolated monuments: walk the old city, use metro or bus for Eixample and hill hops, then leave time for one slow neighbourhood or the sea.",
    "巴塞罗那是一座紧凑的地中海城市，第一印象可以很不同：哥特区的中世纪街巷、扩展区与格拉西亚的现代主义地标、港口上方的蒙锥克，以及靠近旧港的城市海滩。第一次来最好按片区移动，而不是把单个纪念建筑散点串联：老城适合步行，扩展区和上坡段用地铁或公交，再给一个慢街区或海边留时间。",
    "바르셀로나는 여러 첫인상을 가진 압축적인 지중해 도시입니다. 고딕 지구의 중세 골목, 에이샴플라와 그라시아의 모데르니스메 아이콘, 항구 위 몬주익, 옛 항구 가까이의 도시 해변이 모두 있습니다. 첫 방문은 흩어진 기념물을 찍기보다 클러스터 단위로 움직이는 편이 좋습니다. 구시가지는 걷고, 에이샴플라와 언덕 이동은 지하철이나 버스를 쓰며, 느린 동네 하나나 바다에 시간을 남기세요.",
    "Barcelona es una ciudad mediterránea compacta con varias primeras impresiones: calles medievales en el Barrio Gótico, iconos modernistas en el Eixample y Gràcia, Montjuïc sobre el puerto y playas urbanas cerca del puerto antiguo. Una buena primera visita se mueve por clústeres, no por monumentos aislados: camina el casco antiguo, usa metro o bus para el Eixample y las colinas, y deja tiempo para un barrio lento o el mar."
  ),
  hero: heroPhoto,
  map: {
    // Schematic Mediterranean water east of the Barcelona shoreline. Not for navigation.
    // Kept east/southeast of every place lng (places are <= 2.1925) so no place point sits inside.
    water: [
      [2.205, 41.35],
      [2.24, 41.35],
      [2.25, 41.42],
      [2.225, 41.445],
      [2.205, 41.43],
    ],
    waterLabel: t("Mediterranean Sea", "地中海", "지중해", "Mar Mediterráneo"),
    waterLabelAt: [2.23, 41.39],
  },
  clusters,
  places,
  routes,
}
