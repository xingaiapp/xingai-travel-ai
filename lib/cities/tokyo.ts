import type { City, CityPhoto, CityText, Cluster, Place, Source, TravelRoute } from "./types"

// Tokyo city layer (ADR 0008).
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

const wikipediaJa = (title: string, path: string): Source => ({
  name: `Wikipedia (日本語): ${title}`,
  url: `https://ja.wikipedia.org/wiki/${path}`,
  retrievedAt: RETRIEVED,
})

const wikidata = (qid: string): Source => ({
  name: `Wikidata ${qid} (coordinates)`,
  url: `https://www.wikidata.org/wiki/${qid}`,
  retrievedAt: RETRIEVED,
})

const clusters: Cluster[] = [
  {
    id: "asakusa",
    side: "island",
    neighbours: ["ueno"],
    name: t("Asakusa", "浅草", "아사쿠사", "Asakusa"),
  },
  {
    id: "ueno",
    side: "island",
    neighbours: ["asakusa", "akihabara"],
    name: t("Ueno", "上野", "우에노", "Ueno"),
  },
  {
    id: "akihabara",
    side: "island",
    neighbours: ["ueno", "ginza-marunouchi"],
    name: t("Akihabara", "秋叶原", "아키하바라", "Akihabara"),
  },
  {
    id: "ginza-marunouchi",
    side: "island",
    neighbours: ["akihabara", "shibuya"],
    name: t("Ginza & Tokyo Station", "银座与东京站", "긴자·도쿄역", "Ginza y Estación de Tokio"),
  },
  {
    id: "shibuya",
    side: "island",
    neighbours: ["ginza-marunouchi", "shinjuku"],
    name: t("Shibuya & Harajuku", "涩谷与原宿", "시부야·하라주쿠", "Shibuya y Harajuku"),
  },
  {
    id: "shinjuku",
    side: "island",
    neighbours: ["shibuya"],
    name: t("Shinjuku", "新宿", "신주쿠", "Shinjuku"),
  },
]

const places: Place[] = [
  // ── Asakusa ──
  {
    id: "senso-ji",
    name: t("Sensō-ji", "浅草寺", "센소지", "Sensō-ji"),
    localName: "浅草寺",
    clusterId: "asakusa",
    coordinates: { lat: 35.714722, lng: 139.79675, precision: "site" },
    categories: ["iconic", "culture", "photo"],
    summary: t(
      "Tokyo's oldest Buddhist temple, in Asakusa. Tradition holds that it was founded in 628 after fishermen found a statue of Kannon in the Sumida River; the present main hall was rebuilt after World War II.",
      "东京最古老的佛教寺院，位于浅草。相传公元 628 年渔民在隅田川捞到观音像后创建；现存本堂在二战后重建。",
      "도쿄에서 가장 오래된 불교 사원으로 아사쿠사에 있습니다. 전설에 따르면 628년 어부들이 스미다강에서 관음상을 건진 뒤 창건했으며, 지금의 본당은 제2차 세계대전 이후 다시 지었습니다.",
      "El templo budista más antiguo de Tokio, en Asakusa. La tradición dice que se fundó en 628 tras hallar una estatua de Kannon en el río Sumida; el salón principal actual se reconstruyó tras la Segunda Guerra Mundial."
    ),
    sources: [wikipedia("Sensō-ji", "Sens%C5%8D-ji"), wikidata("Q615183")],
    visitMinutes: { min: 40, max: 75 },
    bestTime: "morning",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "kaminarimon",
    name: t("Kaminarimon", "雷门", "가미나리몬", "Kaminarimon"),
    localName: "雷門",
    clusterId: "asakusa",
    coordinates: { lat: 35.711111, lng: 139.796389, precision: "site" },
    categories: ["iconic", "photo"],
    summary: t(
      "The outer gate of Sensō-ji on Nakamise-dōri, known for a large red chōchin lantern. The present gate dates from a 1960 reconstruction; the lantern is replaced periodically.",
      "浅草寺在仲见世通上的外门，以巨大的红色提灯闻名。现存门楼为 1960 年重建；提灯会定期更换。",
      "나카미세도리에 있는 센소지 외문으로, 거대한 빨간 초친 등으로 유명합니다. 지금의 문은 1960년 재건이며, 등은 주기적으로 교체됩니다.",
      "La puerta exterior de Sensō-ji en Nakamise-dōri, conocida por un gran farol chōchin rojo. La puerta actual es de 1960; el farol se renueva periódicamente."
    ),
    sources: [wikipedia("Kaminarimon", "Kaminarimon"), wikidata("Q2378708")],
    visitMinutes: { min: 10, max: 20 },
    bestTime: "any",
    setting: "outdoor",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "nakamise-dori",
    name: t("Nakamise-dōri", "仲见世通", "나카미세도리", "Nakamise-dōri"),
    localName: "仲見世通り",
    clusterId: "asakusa",
    coordinates: { lat: 35.712521, lng: 139.796517, precision: "area" },
    categories: ["local", "food", "photo"],
    summary: t(
      "The approach street between Kaminarimon and Sensō-ji's inner gate, lined with shops selling snacks and souvenirs. It is among the oldest shopping streets tied to a temple approach in Japan.",
      "连接雷门与浅草寺内门的参道商店街，售卖小吃和纪念品，是日本历史最久的寺庙参道商店街之一。",
      "가미나리몬과 센소지 내문 사이를 잇는 참배길로, 간식과 기념품 가게가 늘어서 있습니다. 일본에서 사찰 참배길과 연결된 가장 오래된 상점가 중 하나입니다.",
      "La calle de acceso entre Kaminarimon y la puerta interior de Sensō-ji, con tiendas de snacks y souvenirs. Es una de las calles comerciales de acceso a un templo más antiguas de Japón."
    ),
    sources: [wikipediaJa("仲見世通り", "%E4%BB%B2%E8%A6%8B%E4%B8%96%E9%80%9A%E3%82%8A"), wikidata("Q107583845")],
    visitMinutes: { min: 20, max: 40 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "tokyo-skytree",
    name: t("Tokyo Skytree", "东京晴空塔", "도쿄 스카이트리", "Tokyo Skytree"),
    localName: "東京スカイツリー",
    clusterId: "asakusa",
    coordinates: { lat: 35.710054, lng: 139.810714, precision: "site" },
    categories: ["iconic", "photo"],
    summary: t(
      "A broadcasting and observation tower in Sumida, completed in 2012. At 634 m it is the tallest structure in Japan; the two public observation decks are at about 350 m and 450 m.",
      "位于墨田区的广播电视与观景塔，2012 年竣工，高 634 米，是日本最高建筑；两个对公众开放的观景台约在 350 米和 450 米。",
      "스미다구에 있는 방송·전망 타워로 2012년에 완공되었습니다. 높이 634m로 일본에서 가장 높은 구조물이며, 일반 전망대는 약 350m와 450m에 있습니다.",
      "Torre de radiodifusión y observación en Sumida, terminada en 2012. Con 634 m es la estructura más alta de Japón; las dos cubiertas públicas están a unos 350 m y 450 m."
    ),
    sources: [wikipedia("Tokyo Skytree", "Tokyo_Skytree"), wikidata("Q57965")],
    visitMinutes: { min: 60, max: 120 },
    bestTime: "sunset",
    setting: "indoor",
    weatherSensitive: false,
    walking: "easy",
  },

  // ── Ueno ──
  {
    id: "ueno-park",
    name: t("Ueno Park", "上野公园", "우에노 공원", "Parque Ueno"),
    localName: "上野公園",
    clusterId: "ueno",
    coordinates: { lat: 35.715292, lng: 139.773828, precision: "site" },
    categories: ["nature", "culture", "local"],
    summary: t(
      "A public park in Taitō opened in 1873 on the former grounds of Kaneiji temple. It holds several major museums and a zoo, and is one of Tokyo's best-known cherry-blossom spots.",
      "位于台东区的公园，1873 年在宽永寺旧址开放，园内有多座大型博物馆和动物园，也是东京最著名的赏樱地之一。",
      "다이토구의 공원으로, 1873년 가네이지 옛터에 문을 열었습니다. 주요 박물관들과 동물원이 있고, 도쿄에서 가장 유명한 벚꽃 명소 중 하나입니다.",
      "Parque público en Taitō abierto en 1873 en los antiguos terrenos del templo Kaneiji. Alberga varios museos importantes y un zoo, y es uno de los lugares de cerezos más conocidos de Tokio."
    ),
    sources: [wikipedia("Ueno Park", "Ueno_Park"), wikidata("Q746216")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "tokyo-national-museum",
    name: t("Tokyo National Museum", "东京国立博物馆", "도쿄국립박물관", "Museo Nacional de Tokio"),
    localName: "東京国立博物館",
    clusterId: "ueno",
    coordinates: { lat: 35.719045, lng: 139.775968, precision: "site" },
    categories: ["culture"],
    summary: t(
      "Japan's oldest and largest national museum, in Ueno Park. It opened in 1872 and holds a collection of more than 100,000 objects spanning Japanese and Asian art and archaeology.",
      "日本历史最久、规模最大的国立博物馆，位于上野公园。1872 年开馆，藏品逾十万件，涵盖日本与亚洲的艺术与考古。",
      "일본에서 가장 오래되고 규모가 큰 국립박물관으로 우에노 공원에 있습니다. 1872년 개관했으며, 일본·아시아 미술과 고고학 유물 10만 점 이상을 소장합니다.",
      "El museo nacional más antiguo y grande de Japón, en el parque Ueno. Abrió en 1872 y guarda más de 100.000 piezas de arte y arqueología de Japón y Asia."
    ),
    sources: [wikipedia("Tokyo National Museum", "Tokyo_National_Museum"), wikidata("Q653433")],
    visitMinutes: { min: 90, max: 150 },
    bestTime: "daytime",
    setting: "indoor",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "ameya-yokocho",
    name: t("Ameya-Yokochō", "阿美横丁", "아메요코", "Ameya-Yokochō"),
    localName: "アメヤ横丁",
    clusterId: "ueno",
    coordinates: { lat: 35.710024, lng: 139.774541, precision: "area" },
    categories: ["food", "local"],
    summary: t(
      "A market street under and beside the Yamanote Line tracks between Ueno and Okachimachi. It grew from a postwar black market into a dense strip of food, clothing and grocery stalls.",
      "上野与御徒町之间、山手线高架下及两侧的市集街。由战后黑市发展而来，如今以食品、服装和日用杂货摊位密集闻名。",
      "우에노와 오카치마치 사이 야마노테선 선로 아래·옆에 있는 시장 거리입니다. 전후 암시장에서 시작해 지금처럼 먹거리·옷·식료품 노점이 촘촘한 거리가 되었습니다.",
      "Calle mercado bajo y junto a las vías de la Yamanote entre Ueno y Okachimachi. Creció a partir de un mercado negro de posguerra hasta un denso tramo de comida, ropa y ultramarinos."
    ),
    sources: [wikipedia("Ameya-Yokochō", "Ameya-Yokoch%C5%8D"), wikidata("Q864815")],
    visitMinutes: { min: 30, max: 60 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "moderate",
  },
  {
    id: "nezu-shrine",
    name: t("Nezu Shrine", "根津神社", "네즈 신사", "Santuario Nezu"),
    localName: "根津神社",
    clusterId: "ueno",
    coordinates: { lat: 35.720214, lng: 139.760694, precision: "site" },
    categories: ["culture", "photo", "local"],
    summary: t(
      "A Shinto shrine in Bunkyō, relocated to its present site in 1706 by the fifth Tokugawa shōgun. Its vermilion torii tunnel and azalea garden are among its best-known features.",
      "位于文京区的神社，1706 年由第五代德川将军迁至现址。朱红鸟居隧道和杜鹃园是其最知名的景观。",
      "분쿄구의 신사로, 1706년 도쿠가와 5대 쇼군이 지금 자리로 옮겼습니다. 주홍색 도리이 터널과 진달래 정원이 가장 잘 알려진 볼거리입니다.",
      "Santuario sintoísta en Bunkyō, trasladado a su emplazamiento actual en 1706 por el quinto shōgun Tokugawa. Su túnel de torii bermellón y el jardín de azaleas son sus rasgos más conocidos."
    ),
    sources: [wikipedia("Nezu Shrine", "Nezu_Shrine"), wikidata("Q335612")],
    visitMinutes: { min: 30, max: 50 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "moderate",
  },

  // ── Akihabara ──
  {
    id: "akihabara",
    name: t("Akihabara", "秋叶原", "아키하바라", "Akihabara"),
    localName: "秋葉原",
    clusterId: "akihabara",
    coordinates: { lat: 35.698894, lng: 139.774042, precision: "area" },
    categories: ["local", "photo"],
    summary: t(
      "A district in Chiyoda known since the postwar years as Tokyo's centre for electronics retail, later also for anime, manga and gaming shops concentrated around Akihabara Station.",
      "位于千代田区的街区，战后起以电器零售闻名，后来也成为秋叶原站周边动漫、漫画和游戏商店的集中地。",
      "지요다구의 지구로, 전후부터 도쿄의 전자제품 판매 중심지로 알려졌고, 이후 아키하바라역 주변에 애니메이션·만화·게임 가게가 몰린 곳이 되었습니다.",
      "Distrito de Chiyoda conocido desde la posguerra como centro de electrónica de Tokio y, más tarde, también de tiendas de anime, manga y juegos alrededor de la estación de Akihabara."
    ),
    sources: [wikipedia("Akihabara", "Akihabara"), wikidata("Q418096")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "moderate",
  },

  // ── Ginza & Tokyo Station ──
  {
    id: "tokyo-station",
    name: t("Tokyo Station", "东京站", "도쿄역", "Estación de Tokio"),
    localName: "東京駅",
    clusterId: "ginza-marunouchi",
    coordinates: { lat: 35.681236, lng: 139.767125, precision: "site" },
    categories: ["iconic", "photo", "culture"],
    summary: t(
      "The central railway station in Marunouchi, opened in 1914. Its restored red-brick Marunouchi façade faces the Imperial Palace gardens; the station is a major hub for Shinkansen and local lines.",
      "位于丸之内的中央车站，1914 年开通。修复后的红砖丸之内站房面向皇居外苑；车站是新干线与多条市内线路的枢纽。",
      "마루노우치의 중심 철도역으로 1914년에 개업했습니다. 복원된 붉은 벽돌 마루노우치 역사는 황거 정원을 바라보며, 신칸센과 시내선이 모이는 주요 허브입니다.",
      "La estación central de Marunouchi, abierta en 1914. Su fachada de ladrillo rojo restaurada mira a los jardines del Palacio Imperial; es un gran nudo de Shinkansen y líneas locales."
    ),
    sources: [wikipedia("Tokyo Station", "Tokyo_Station"), wikidata("Q283196")],
    visitMinutes: { min: 20, max: 40 },
    bestTime: "any",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "imperial-palace-east-gardens",
    name: t("Imperial Palace East Gardens", "皇居东御苑", "황거 동어원", "Jardines del Este del Palacio Imperial"),
    localName: "皇居東御苑",
    clusterId: "ginza-marunouchi",
    coordinates: { lat: 35.686701, lng: 139.757396, precision: "site" },
    categories: ["nature", "culture", "photo"],
    summary: t(
      "The public gardens on the east side of the Tokyo Imperial Palace grounds, opened to visitors in 1968. They occupy part of the former Edo Castle inner compound, including foundations of the tenshu keep.",
      "东京皇居东侧对公众开放的庭园，1968 年开放。园址是江户城本丸一带，仍可见天守台基址。",
      "도쿄 황거 동쪽에 있는 공개 정원으로 1968년 개방되었습니다. 옛 에도성 혼마루 자리의 일부이며, 천수대 기단이 남아 있습니다.",
      "Los jardines públicos al este del Palacio Imperial de Tokio, abiertos en 1968. Ocupan parte del antiguo recinto interior del castillo de Edo, con los cimientos del tenshu."
    ),
    sources: [wikipediaJa("皇居東御苑", "%E7%9A%87%E5%B1%85%E6%9D%B1%E5%BE%A1%E8%8B%91"), wikidata("Q6631907")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "moderate",
  },
  {
    id: "ginza",
    name: t("Ginza", "银座", "긴자", "Ginza"),
    localName: "銀座",
    clusterId: "ginza-marunouchi",
    coordinates: { lat: 35.671217, lng: 139.765007, precision: "area" },
    categories: ["iconic", "photo", "local"],
    summary: t(
      "A district in Chūō known for upscale retail and department stores along Chūō-dōri. It was rebuilt as a brick town after the 1872 fire and remains one of Tokyo's main commercial centres.",
      "位于中央区、以中央通沿线高端零售与百货闻名的街区。1872 年大火后改建为砖造街区，至今仍是东京主要商业中心之一。",
      "주오구의 지구로, 주오도리를 따라 고급 소매점과 백화점으로 유명합니다. 1872년 화재 이후 벽돌 거리로 다시 지어졌고, 지금도 도쿄의 주요 상업 중심지 중 하나입니다.",
      "Distrito de Chūō conocido por el comercio de lujo y los grandes almacenes de Chūō-dōri. Se reconstruyó en ladrillo tras el incendio de 1872 y sigue siendo uno de los centros comerciales principales de Tokio."
    ),
    sources: [wikipedia("Ginza", "Ginza"), wikidata("Q746052")],
    visitMinutes: { min: 40, max: 75 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "tsukiji-outer-market",
    name: t("Tsukiji Outer Market", "筑地场外市场", "쓰키지 장소 시장", "Mercado exterior de Tsukiji"),
    localName: "築地場外市場",
    clusterId: "ginza-marunouchi",
    coordinates: { lat: 35.665388, lng: 139.770473, precision: "area" },
    categories: ["food", "local"],
    summary: t(
      "The retail and restaurant streets that remained around the former Tsukiji wholesale fish market after the wholesale halls moved to Toyosu in 2018. Stalls still sell seafood, produce and prepared food.",
      "2018 年批发市场迁往丰洲后，留在原筑地一带的零售与餐饮街。摊位仍售海鲜、蔬果和现成食品。",
      "2018년 도매 시장이 도요스로 옮긴 뒤에도 옛 쓰키지 주변에 남은 소매·식당 거리입니다. 노점에서는 여전히 해산물, 채소, 조리 음식을 팝니다.",
      "Las calles de tiendas y restaurantes que quedaron en torno al antiguo mercado mayorista de Tsukiji tras su traslado a Toyosu en 2018. Los puestos siguen vendiendo marisco, productos frescos y comida preparada."
    ),
    sources: [wikipedia("Tsukiji fish market", "Tsukiji_fish_market"), wikidata("Q859471")],
    visitMinutes: { min: 40, max: 75 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "moderate",
  },

  // ── Shibuya & Harajuku ──
  {
    id: "shibuya-crossing",
    name: t("Shibuya Crossing", "涩谷十字路口", "시부야 스크램블 교차로", "Cruce de Shibuya"),
    localName: "渋谷スクランブル交差点",
    clusterId: "shibuya",
    coordinates: { lat: 35.6595, lng: 139.70055, precision: "site" },
    categories: ["iconic", "photo", "night"],
    summary: t(
      "The scramble crossing in front of Shibuya Station's Hachikō Exit, where pedestrians from all directions cross at once. It is one of Tokyo's most filmed street scenes.",
      "涩谷站八公口前的行人全向过街路口，各方向行人同时穿行，是东京被拍摄最多的街景之一。",
      "시부야역 하치코 출구 앞의 스크램블 교차로로, 사방에서 보행자가 한꺼번에 건넙니다. 도쿄에서 가장 많이 촬영된 거리 풍경 중 하나입니다.",
      "El cruce peatonal frente a la salida Hachikō de la estación de Shibuya, donde cruzan a la vez peatones de todas las direcciones. Es una de las escenas callejeras más filmadas de Tokio."
    ),
    sources: [wikipedia("Shibuya Crossing", "Shibuya_Crossing"), wikidata("Q21083961")],
    visitMinutes: { min: 15, max: 30 },
    bestTime: "evening",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "meiji-jingu",
    name: t("Meiji Shrine", "明治神宫", "메이지 신궁", "Santuario Meiji"),
    localName: "明治神宮",
    clusterId: "shibuya",
    coordinates: { lat: 35.676111, lng: 139.699167, precision: "site" },
    categories: ["iconic", "culture", "nature"],
    summary: t(
      "A Shinto shrine in Shibuya dedicated to Emperor Meiji and Empress Shōken, established in 1920. The shrine forest was planted with roughly 100,000 trees donated from across Japan.",
      "位于涩谷区、供奉明治天皇与昭宪皇太后的神社，1920 年创建。神宫森林由全国捐赠的约十万棵树栽成。",
      "시부야구에 있는 신토 신사로 메이지 천황과 쇼켄 황후를 모시며 1920년에 세워졌습니다. 신궁 숲은 일본 전역에서 기증받은 나무 약 10만 그루로 조성되었습니다.",
      "Santuario sintoísta en Shibuya dedicado al emperador Meiji y la emperatriz Shōken, fundado en 1920. El bosque del santuario se plantó con unos 100.000 árboles donados de todo Japón."
    ),
    sources: [wikipedia("Meiji Shrine", "Meiji_Shrine"), wikidata("Q287165")],
    visitMinutes: { min: 40, max: 75 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "moderate",
  },
  {
    id: "takeshita-street",
    name: t("Takeshita Street", "竹下通", "다케시타거리", "Calle Takeshita"),
    localName: "竹下通り",
    clusterId: "shibuya",
    coordinates: { lat: 35.67125, lng: 139.70481, precision: "area" },
    categories: ["local", "food", "photo"],
    summary: t(
      "A pedestrian shopping street in Harajuku between Harajuku Station and Meiji-dōri, known since the 1970s–80s for youth fashion, crepes and small specialty shops.",
      "原宿站与明治通之间的步行商店街，自 1970–80 年代起以年轻人时尚、可丽饼和小店闻名。",
      "하라주쿠역과 메이지도리 사이의 보행자 상점가로, 1970~80년대부터 젊은이 패션, 크레페, 작은 전문점으로 유명합니다.",
      "Calle peatonal comercial en Harajuku entre la estación de Harajuku y Meiji-dōri, conocida desde los años 70–80 por la moda juvenil, los crepes y las tiendas especializadas."
    ),
    sources: [wikipediaJa("竹下通り", "%E7%AB%B9%E4%B8%8B%E9%80%9A%E3%82%8A"), wikidata("Q3179287")],
    visitMinutes: { min: 30, max: 60 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "moderate",
  },

  // ── Shinjuku ──
  {
    id: "shinjuku-gyoen",
    name: t("Shinjuku Gyoen", "新宿御苑", "신주쿠 어원", "Shinjuku Gyoen"),
    localName: "新宿御苑",
    clusterId: "shinjuku",
    coordinates: { lat: 35.685072, lng: 139.709547, precision: "site" },
    categories: ["nature", "photo"],
    summary: t(
      "A national garden in Shinjuku and Shibuya wards, opened to the public in 1949 on former imperial garden land. It combines Japanese traditional, French formal and English landscape garden styles.",
      "横跨新宿区与涩谷区的国营庭园，1949 年在旧皇室花园基础上对公众开放，融合日式、法式与英式造园风格。",
      "신주쿠구와 시부야구에 걸친 국립 정원으로, 옛 황실 정원 터에 1949년 일반에 개방되었습니다. 일본 전통, 프랑스식, 영국식 정원 양식을 함께 갖추고 있습니다.",
      "Jardín nacional en los barrios de Shinjuku y Shibuya, abierto al público en 1949 sobre antiguos jardines imperiales. Combina estilos japonés tradicional, francés formal e inglés paisajista."
    ),
    sources: [wikipedia("Shinjuku Gyo-en", "Shinjuku_Gyo-en"), wikidata("Q776863")],
    visitMinutes: { min: 60, max: 120 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "tokyo-metropolitan-government",
    name: t("Tokyo Metropolitan Government Building", "东京都厅", "도쿄도청", "Ayuntamiento Metropolitano de Tokio"),
    localName: "東京都庁舎",
    clusterId: "shinjuku",
    coordinates: { lat: 35.689496, lng: 139.691709, precision: "site" },
    categories: ["iconic", "photo", "night"],
    summary: t(
      "The twin-tower headquarters of the Tokyo Metropolitan Government in Nishi-Shinjuku, designed by Kenzo Tange and completed in 1991. Free observation decks on the north and south towers overlook the city.",
      "位于西新宿的东京都政府双塔总部，丹下健三设计，1991 年竣工。南北塔设有免费观景台，可俯瞰市区。",
      "니시신주쿠에 있는 도쿄도 청사 쌍둥이 타워로, 단게 겐조가 설계해 1991년에 완공되었습니다. 북탑·남탑의 무료 전망대에서 시내를 내려다볼 수 있습니다.",
      "La sede de torres gemelas del Gobierno Metropolitano de Tokio en Nishi-Shinjuku, diseñada por Kenzo Tange y terminada en 1991. Miradores gratuitos en las torres norte y sur miran sobre la ciudad."
    ),
    sources: [wikipedia("Tokyo Metropolitan Government Building", "Tokyo_Metropolitan_Government_Building"), wikidata("Q111973")],
    visitMinutes: { min: 40, max: 75 },
    bestTime: "sunset",
    setting: "indoor",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "omoide-yokocho",
    name: t("Omoide Yokocho", "回忆横丁", "오모이데 요코초", "Omoide Yokocho"),
    localName: "思い出横丁",
    clusterId: "shinjuku",
    coordinates: { lat: 35.693069, lng: 139.699502, precision: "area" },
    categories: ["food", "local", "night"],
    summary: t(
      "A dense alley of small yakitori and drinking stalls by Shinjuku Station's west exit, part of the Nishi-Shinjuku shopping streets that rebuilt after wartime fires. Many stalls seat only a handful of people.",
      "新宿站西口一带的密集烤串与小酒馆巷，属于战后重建的西新宿商店街。许多摊位只能坐几个人。",
      "신주쿠역 서쪽 출구 옆의 좁은 야키토리·술집 골목으로, 전시 화재 이후 다시 들어선 니시신주쿠 상점가의 일부입니다. 많은 가게가 겨우 몇 명만 앉을 수 있습니다.",
      "Un callejón denso de yakitori y bares junto a la salida oeste de Shinjuku, en las calles comerciales de Nishi-Shinjuku reconstruidas tras los incendios de guerra. Muchos puestos apenas caben unas pocas personas."
    ),
    sources: [wikipediaJa("新宿西口商店街", "%E6%96%B0%E5%AE%BF%E8%A5%BF%E5%8F%A3%E5%95%86%E5%BA%97%E8%A1%97"), wikidata("Q11501868")],
    visitMinutes: { min: 40, max: 70 },
    bestTime: "evening",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "golden-gai",
    name: t("Golden Gai", "黄金街", "골든가이", "Golden Gai"),
    localName: "新宿ゴールデン街",
    clusterId: "shinjuku",
    coordinates: { lat: 35.6939, lng: 139.7047, precision: "area" },
    categories: ["night", "local"],
    summary: t(
      "A compact network of narrow alleys east of Kabukichō with hundreds of tiny bars, many seating fewer than ten people. The wooden buildings largely date from the decades after World War II.",
      "歌舞伎町东侧一片密集窄巷，有数百家极小的酒吧，许多只能坐不到十人。木造建筑大多建于二战后数十年间。",
      "가부키초 동쪽의 좁은 골목망으로, 좌석이 열 명도 안 되는 작은 바가 수백 곳 있습니다. 목조 건물은 대부분 제2차 세계대전 이후 수십 년 사이에 지어졌습니다.",
      "Una red compacta de callejones al este de Kabukichō con cientos de bares diminutos, muchos con menos de diez asientos. Los edificios de madera datan en gran parte de las décadas posteriores a la Segunda Guerra Mundial."
    ),
    sources: [wikipediaJa("新宿ゴールデン街", "%E6%96%B0%E5%AE%BF%E3%82%B4%E3%83%BC%E3%83%AB%E3%83%87%E3%83%B3%E8%A1%97"), wikidata("Q5363705")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "evening",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
]

const photos = {
  heroReuse: {
    src: "/assets/home-hero-tokyo.webp",
    width: 2560,
    height: 1440,
    alt: t(
      "Tokyo cityscape with towers and evening light",
      "东京城市天际线与暮色灯光",
      "타워와 저녁 빛이 있는 도쿄 도심 풍경",
      "Skyline de Tokio con torres y luz de atardecer"
    ),
    credit: {
      label: t("XingAI Travel", "XingAI Travel", "XingAI Travel", "XingAI Travel"),
      href: "/",
    },
  } satisfies CityPhoto,
  destCard: {
    src: "/assets/dest-tokyo-v2.webp",
    width: 1600,
    height: 900,
    alt: t(
      "Tokyo street scene used as a destination card photo",
      "用作目的地卡片的东京街景照片",
      "목적지 카드로 쓰인 도쿄 거리 사진",
      "Escena callejera de Tokio usada como foto de destino"
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
    name: t("Essentials Tokyo", "经典东京", "도쿄 핵심", "Tokio esencial"),
    description: t(
      "One east-to-west first day: temple and tower in Asakusa, the brick station façade, then Shibuya's crossing and Meiji Shrine.",
      "由东向西的一天：浅草的寺庙与晴空塔、东京站红砖站房，再到涩谷路口与明治神宫。",
      "동쪽에서 서쪽으로 가는 첫날입니다. 아사쿠사의 사찰과 스카이트리, 붉은 벽돌 도쿄역, 시부야 교차로와 메이지 신궁.",
      "Un primer día de este a oeste: templo y torre en Asakusa, la fachada de ladrillo de la estación, luego el cruce de Shibuya y el santuario Meiji."
    ),
    estimatedDurationMinutes: 345,
    stops: [
      {
        placeId: "senso-ji",
        order: 1,
        estimatedVisitMinutes: 50,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Start at Tokyo's oldest temple while the lane is still manageable. The main hall and courtyard set the tone for the day.",
          "趁人还不算太挤，从东京最古老的寺庙开始。本堂和院子能定下这一天的节奏。",
          "아직 감당할 만한 시간에 도쿄에서 가장 오래된 사찰에서 시작합니다. 본당과 마당이 하루의 톤을 잡습니다.",
          "Empieza en el templo más antiguo de Tokio mientras la calle aún es manejable. El salón principal y el patio marcan el día."
        ),
      },
      {
        placeId: "nakamise-dori",
        order: 2,
        estimatedVisitMinutes: 25,
        estimatedTravelMinutesFromPrevious: 5,
        transportMode: "walk",
        reason: t(
          "Walk the approach street back toward Kaminarimon for snacks and the classic lantern view.",
          "沿参道往雷门方向走，买点小吃，再看一眼经典提灯。",
          "참배길을 따라 가미나리몬 쪽으로 걸으며 간식을 사고, 그 유명한 등 풍경을 봅니다.",
          "Camina la calle de acceso hacia Kaminarimon por un snack y la vista clásica del farol."
        ),
      },
      {
        placeId: "tokyo-skytree",
        order: 3,
        estimatedVisitMinutes: 60,
        estimatedTravelMinutesFromPrevious: 20,
        transportMode: "walk",
        reason: t(
          "A short walk across the Sumida area to the 634 m tower. Go up if the sky is clear; otherwise the base and streets still fix your bearings.",
          "穿过隅田一带走到 634 米高塔。天晴就上去；天不好，塔底和周边街道也够你认方向。",
          "스미다 일대를 조금 걸어 634m 타워로 갑니다. 하늘이 맑으면 올라가고, 아니면 하단과 거리만으로도 방향을 잡을 수 있습니다.",
          "Un corto paseo por la zona del Sumida hasta la torre de 634 m. Sube si el cielo está claro; si no, la base y las calles ya orientan."
        ),
      },
      {
        placeId: "tokyo-station",
        order: 4,
        estimatedVisitMinutes: 25,
        estimatedTravelMinutesFromPrevious: 30,
        transportMode: "mtr",
        reason: t(
          "One subway hop west to Marunouchi. The restored red-brick façade is the landmark; treat it as a short stop, not a tour of the platforms.",
          "坐一程地铁向西到丸之内。修复后的红砖站房就是地标；当作短停，不必钻进站台迷宫。",
          "지하철로 서쪽 마루노우치까지 한 번 이동합니다. 복원된 붉은 벽돌 외관이 랜드마크이니, 승강장 탐방은 말고 짧게 보세요.",
          "Un salto de metro al oeste hasta Marunouchi. La fachada de ladrillo es el hito; hazlo breve, sin recorrer los andenes."
        ),
      },
      {
        placeId: "shibuya-crossing",
        order: 5,
        estimatedVisitMinutes: 25,
        estimatedTravelMinutesFromPrevious: 25,
        transportMode: "mtr",
        reason: t(
          "Continue west to the scramble in front of Shibuya Station. Watch one or two light cycles from the scramble edge, then move on.",
          "继续向西到涩谷站前的全向路口。在路口边看一两轮红绿灯就够，然后离开。",
          "서쪽으로 시부야역 앞 스크램블로 이어갑니다. 가장자리에서 신호 한두 번만 보고 이동합니다.",
          "Sigue al oeste hasta el scramble frente a Shibuya. Mira uno o dos ciclos de semáforo desde el borde y sigue."
        ),
      },
      {
        placeId: "meiji-jingu",
        order: 6,
        estimatedVisitMinutes: 50,
        estimatedTravelMinutesFromPrevious: 30,
        transportMode: "walk",
        reason: t(
          "End under the shrine forest. It is quieter than the crossing you just left, and closes the day without another long train.",
          "在神宫森林收尾。比刚才的路口安静，也不用再坐很长的电车。",
          "신궁 숲에서 하루를 마무리합니다. 방금 교차로보다 조용하고, 긴 전철을 또 타지 않아도 됩니다.",
          "Termina bajo el bosque del santuario. Es más tranquilo que el cruce que acabas de dejar, y cierra el día sin otro tren largo."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "It covers the three first-visit poles most people mean by “Tokyo”: Asakusa, the central station axis, and Shibuya.",
        "覆盖多数人说「东京」时想到的三个第一天锚点：浅草、中央车站轴线、涩谷。",
        "많은 사람이 “도쿄”라고 할 때 떠올리는 첫날 세 축을 담습니다. 아사쿠사, 중앙역 축, 시부야.",
        "Cubre los tres polos de una primera visita que la gente suele llamar “Tokio”: Asakusa, el eje de la estación central y Shibuya."
      ),
      t(
        "Clusters run east to west with no backtracking: Asakusa → Tokyo Station → Shibuya.",
        "片区由东向西，不走回头路：浅草 → 东京站 → 涩谷。",
        "클러스터가 동에서 서로 이어지며 되돌아가지 않습니다. 아사쿠사 → 도쿄역 → 시부야.",
        "Los clústeres van de este a oeste sin volver atrás: Asakusa → Estación de Tokio → Shibuya."
      ),
      t(
        "You get both a temple courtyard and a modern observation tower before the city densifies westward.",
        "在城市向西变密之前，先看到寺庙庭院和现代观景塔。",
        "도시가 서쪽으로 더 촘촘해지기 전에 사찰 마당과 현대 전망 타워를 함께 봅니다.",
        "Ves un patio de templo y una torre de observación moderna antes de que la ciudad se densifique hacia el oeste."
      ),
    ],
    goodFor: [
      t("A first visit with one day", "第一次来、只有一天", "첫 방문, 하루 일정", "Primera visita con un solo día"),
      t("Getting your bearings before exploring on your own", "先认清方向，再自己探索", "혼자 다니기 전에 방향 감각 익히기", "Orientarte antes de explorar por tu cuenta"),
      t("Mix of temple, skyline and street energy", "寺庙、天际线与街头气氛都要", "사찰, 스카이라인, 거리 분위기 모두", "Mezcla de templo, skyline y energía callejera"),
    ],
    tradeoffs: [
      t(
        "These are the city's best-known stops, so expect queues at Skytree and crowds at the crossing.",
        "都是东京最知名的站点，晴空塔可能排队，路口也会很挤。",
        "모두 도쿄에서 가장 유명한 곳이라 스카이트리는 줄이 길고, 교차로도 붐빕니다.",
        "Son las paradas más conocidas: espera cola en Skytree y gente en el cruce."
      ),
      t(
        "It skips Shinjuku nightlife and Ueno's museums entirely.",
        "完全不去新宿夜生活和上野的博物馆。",
        "신주쿠 밤 분위기와 우에노 박물관은 완전히 빠집니다.",
        "Deja fuera la vida nocturna de Shinjuku y los museos de Ueno."
      ),
      t(
        "Four stops are outdoors. Heavy rain dulls Nakamise, the crossing and the shrine forest.",
        "四站在户外。大雨会让仲见世、路口和神宫森林都少很多味道。",
        "네 곳이 야외입니다. 폭우가 오면 나카미세, 교차로, 신궁 숲의 매력이 크게 줄어듭니다.",
        "Cuatro paradas son al aire libre. Con lluvia fuerte, Nakamise, el cruce y el bosque del santuario pierden mucho."
      ),
    ],
  },
  {
    id: "photo",
    theme: "photo",
    photo: photos.destCard,
    name: t("Photo Tokyo", "拍照东京", "사진으로 보는 도쿄", "Tokio en fotos"),
    description: t(
      "Chase contrast: palace gardens and Ginza daylight, then scramble crowds, Harajuku colour, and a free Shinjuku skyline at dusk.",
      "追对比：皇居东御苑与银座白天，再到涩谷人潮、原宿色彩，黄昏在新宿免费看天际线。",
      "대비를 쫓습니다. 황거 동어원과 긴자의 낮, 스크램블 인파와 하라주쿠 색감, 해 질 녘 신주쿠 무료 스카이라인.",
      "Busca contraste: jardines del palacio y Ginza de día, luego el scramble, el color de Harajuku y el skyline gratis de Shinjuku al atardecer."
    ),
    estimatedDurationMinutes: 305,
    stops: [
      {
        placeId: "imperial-palace-east-gardens",
        order: 1,
        estimatedVisitMinutes: 55,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Start with open sky and stone foundations from Edo Castle. Morning light is kinder for photos, and the gardens open earlier than most museums.",
          "从开阔天空和江户城石基开始。早晨光线更适合拍照，而且庭园开门比多数博物馆早。",
          "탁 트인 하늘과 에도성 석축에서 시작합니다. 아침 빛이 사진에 낫고, 정원은 대부분의 박물관보다 일찍 엽니다.",
          "Empieza con cielo abierto y cimientos de piedra del castillo de Edo. La luz matinal ayuda, y los jardines abren antes que muchos museos."
        ),
      },
      {
        placeId: "ginza",
        order: 2,
        estimatedVisitMinutes: 40,
        estimatedTravelMinutesFromPrevious: 25,
        transportMode: "walk",
        reason: t(
          "Walk south into Ginza for clean storefront lines and wide sidewalks — a different Tokyo from the gardens.",
          "往南走进银座，拍干净的橱窗线条和宽人行道——和庭园完全不同的东京。",
          "남쪽 긴자로 걸어가 깔끔한 쇼윈도와 넓은 보도를 담습니다. 정원과는 다른 도쿄입니다.",
          "Camina al sur hacia Ginza por escaparates limpios y aceras anchas: otro Tokio distinto de los jardines."
        ),
      },
      {
        placeId: "shibuya-crossing",
        order: 3,
        estimatedVisitMinutes: 30,
        estimatedTravelMinutesFromPrevious: 25,
        transportMode: "mtr",
        reason: t(
          "Metro west for the scramble. One elevated vantage near the station exits is enough; do not block the crosswalk.",
          "地铁向西到全向路口。在车站出口附近找一个略高的角度就够，别挡行人。",
          "지하철로 서쪽 스크램블로 갑니다. 역 출구 근처 약간 높은 각도면 충분하고, 횡단보도를 막지 마세요.",
          "Metro al oeste hasta el scramble. Bastan un par de ángulos elevados junto a las salidas; no bloquees el paso."
        ),
      },
      {
        placeId: "takeshita-street",
        order: 4,
        estimatedVisitMinutes: 35,
        estimatedTravelMinutesFromPrevious: 20,
        transportMode: "walk",
        reason: t(
          "A short walk into Harajuku for colour, signs and narrow-street depth that the scramble does not give you.",
          "再走一小段进原宿，拍色彩、招牌和窄街纵深——路口给不了这些。",
          "조금 걸어 하라주쿠로 들어가면 색감, 간판, 좁은 거리의 깊이가 나옵니다. 스크램블에서는 안 나오는 것들입니다.",
          "Un corto paseo a Harajuku por color, letreros y profundidad de calle estrecha que el scramble no da."
        ),
      },
      {
        placeId: "tokyo-metropolitan-government",
        order: 5,
        estimatedVisitMinutes: 50,
        estimatedTravelMinutesFromPrevious: 25,
        transportMode: "mtr",
        reason: t(
          "End at the free observation decks in Nishi-Shinjuku. Aim for late afternoon so the city lights come up while you are still upstairs.",
          "在西新宿免费观景台收尾。尽量赶下午较晚，楼上还能赶上灯火亮起。",
          "니시신주쿠 무료 전망대에서 마무리합니다. 오후 늦게 맞춰 올라가면 시내 불빛이 켜지는 장면을 볼 수 있습니다.",
          "Termina en los miradores gratis de Nishi-Shinjuku. Llega a última hora de la tarde para ver encenderse la ciudad."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "It moves from quiet gardens to dense streets to a high viewpoint, without repeating a cluster.",
        "从安静庭园到密集街道再到高处观景，不重复片区。",
        "조용한 정원에서 촘촘한 거리, 높은 전망으로 이어지며 클러스터를 반복하지 않습니다.",
        "Pasa de jardines tranquilos a calles densas y a un mirador alto, sin repetir clúster."
      ),
      t(
        "Daylight architecture first, crowd energy second, skyline last — the order matches the light.",
        "先拍白天建筑，再拍人潮，最后拍天际线——顺序跟着光线走。",
        "낮 건축, 인파, 스카이라인 순서로 빛의 흐름에 맞춥니다.",
        "Primero arquitectura de día, luego energía de gente, skyline al final: el orden sigue la luz."
      ),
      t(
        "The last stop does not need a ticket for the main observation levels on typical open days.",
        "最后一站在通常开放日不需要另买主观景层门票。",
        "마지막 장소는 일반적인 개방일에 주요 전망층 별도 표가 필요 없습니다.",
        "La última parada no suele pedir entrada para los miradores principales en días normales."
      ),
    ],
    goodFor: [
      t("Travelling with a camera", "带相机出门", "카메라를 들고 다니는 여행", "Viajar con cámara"),
      t("Architecture and street scenes", "喜欢建筑和街景", "건축과 거리 풍경", "Arquitectura y escenas de calle"),
      t("A second day after Essentials", "走过经典路线之后的第二天", "핵심 코스 다음 날", "Un segundo día después de la ruta esencial"),
    ],
    tradeoffs: [
      t(
        "It skips Asakusa temples and Skytree — use Essentials if those are your must-sees.",
        "不去浅草寺庙和晴空塔——若那些是必看，走经典路线。",
        "아사쿠사 사찰과 스카이트리는 빠집니다. 그게 필수라면 핵심 코스를 가세요.",
        "Omite los templos de Asakusa y Skytree: usa Essentials si son imprescindibles."
      ),
      t(
        "Most of the middle is outdoors and crowded. Rain or a closed observation deck changes the ending.",
        "中间大半在户外且人多。下雨或观景台关闭会改变收尾。",
        "중간은 대부분 야외이고 붐빕니다. 비나 전망대 폐쇄면 마무리가 달라집니다.",
        "Casi todo el tramo medio es exterior y lleno. Lluvia o mirador cerrado cambian el final."
      ),
      t(
        "Little dedicated food time — eat between stops or pair with the Local route another day.",
        "几乎没有专门吃饭的时间——站与站之间解决，或另日走在地路线。",
        "식사에 따로 둔 시간이 거의 없습니다. 이동 사이에 먹거나 다른 날 로컬 코스를 잡으세요.",
        "Poco tiempo solo para comer: come entre paradas o combina otro día con la ruta local."
      ),
    ],
  },
  {
    id: "local",
    theme: "local",
    photo: photos.destCard,
    name: t("Local Tokyo", "在地东京", "로컬 도쿄", "Tokio local"),
    description: t(
      "Follow a day that still feels like work and neighbourhood life: Ueno market, a side-street shrine, Tsukiji stalls, then Shinjuku alleys at night.",
      "跟着仍像日常与邻里的一天：上野市场、巷弄神社、筑地摊位，夜里进新宿小巷。",
      "일과 동네 생활이 느껴지는 하루입니다. 우에노 시장, 골목 신사, 쓰키지 노점, 저녁에는 신주쿠 골목.",
      "Sigue un día que aún parece trabajo y barrio: mercado de Ueno, un santuario lateral, puestos de Tsukiji y callejones de Shinjuku de noche."
    ),
    estimatedDurationMinutes: 360,
    stops: [
      {
        placeId: "ameya-yokocho",
        order: 1,
        estimatedVisitMinutes: 45,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Start under the Yamanote tracks while stalls are open for the morning. This is a working market street, not a theme park.",
          "趁早市还开着，在山手线高架下开始。这是仍在营业的市集街，不是主题乐园。",
          "오전 노점이 열려 있을 때 야마노테선 선로 아래에서 시작합니다. 테마파크가 아니라 실제로 움직이는 시장 거리입니다.",
          "Empieza bajo las vías de la Yamanote mientras los puestos de mañana están abiertos. Es un mercado que trabaja, no un parque temático."
        ),
      },
      {
        placeId: "nezu-shrine",
        order: 2,
        estimatedVisitMinutes: 40,
        estimatedTravelMinutesFromPrevious: 25,
        transportMode: "walk",
        reason: t(
          "Walk west into a quieter shrine neighbourhood. The torii tunnel is the photo, but the side streets are the point.",
          "往西走进更安静的神社街区。鸟居隧道适合拍照，但真正值得走的是旁边的巷子。",
          "서쪽으로 더 조용한 신사 동네까지 걷습니다. 도리이 터널이 사진 명소지만, 핵심은 옆 골목입니다.",
          "Camina al oeste hacia un santuario más tranquilo. El túnel de torii es la foto; las calles laterales son el sentido."
        ),
      },
      {
        placeId: "tsukiji-outer-market",
        order: 3,
        estimatedVisitMinutes: 55,
        estimatedTravelMinutesFromPrevious: 35,
        transportMode: "mtr",
        reason: t(
          "Metro south to the outer market streets that stayed after the wholesale halls moved to Toyosu. Eat here; do not rush.",
          "地铁向南到批发市场迁走后留下的场外街。在这里吃饭，别赶。",
          "지하철로 남쪽, 도매동이 도요스로 옮긴 뒤 남은 장소 시장으로 갑니다. 여기서 먹고, 서두르지 마세요.",
          "Metro al sur hasta las calles del mercado exterior que quedaron tras el traslado a Toyosu. Come aquí; no corras."
        ),
      },
      {
        placeId: "omoide-yokocho",
        order: 4,
        estimatedVisitMinutes: 50,
        estimatedTravelMinutesFromPrevious: 35,
        transportMode: "mtr",
        reason: t(
          "Jump west to Shinjuku's west-exit alleys for yakitori and standing bars once evening starts.",
          "向西跳到新宿西口小巷，傍晚开始吃烤串、站着喝酒。",
          "서쪽으로 신주쿠 서쪽 출구 골목으로 넘어가, 저녁이 되면 야키토리와 스탠딩 바로 이어갑니다.",
          "Salta al oeste a los callejones de la salida oeste de Shinjuku para yakitori y bares de pie al anochecer."
        ),
      },
      {
        placeId: "golden-gai",
        order: 5,
        estimatedVisitMinutes: 55,
        estimatedTravelMinutesFromPrevious: 10,
        transportMode: "walk",
        reason: t(
          "End a few blocks east in Golden Gai's tiny bars. Pick one room that fits; many seat fewer than ten.",
          "再往东几条街，在黄金街的小酒吧收尾。选一间坐得下的；很多只能坐不到十人。",
          "동쪽으로 몇 블록, 골든가이의 작은 바에서 마무리합니다. 들어갈 수 있는 방을 고르세요. 많은 곳이 열 명도 안 됩니다.",
          "Termina unas calles al este en los bares diminutos de Golden Gai. Elige un local que quepa; muchos tienen menos de diez asientos."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "It follows a day people who live here still recognise: market morning, shrine side street, seafood lunch, night alleys.",
        "顺序接近本地人仍熟悉的一天：早市、巷弄神社、海鲜午餐、夜里小巷。",
        "여기 사는 사람들도 아는 하루 흐름입니다. 아침 시장, 골목 신사, 해산물 점심, 밤 골목.",
        "Sigue un día que quien vive aquí aún reconoce: mercado por la mañana, santuario lateral, marisco al mediodía, callejones de noche."
      ),
      t(
        "Food is the spine — Ameya-Yokochō, Tsukiji Outer Market and Omoide Yokocho — not a landmark checklist.",
        "主线是吃——阿美横丁、筑地场外、回忆横丁——不是打卡清单。",
        "축은 먹거리입니다. 아메요코, 쓰키지 장소, 오모이데 요코초. 명소 체크리스트가 아닙니다.",
        "La comida es el eje — Ameya-Yokochō, Tsukiji Outer Market y Omoide Yokocho — no una lista de hitos."
      ),
      t(
        "Clusters only move forward: Ueno → Ginza/Tsukiji → Shinjuku.",
        "片区只往前走：上野 → 银座/筑地 → 新宿。",
        "클러스터는 앞으로만 갑니다. 우에노 → 긴자/쓰키지 → 신주쿠.",
        "Los clústeres solo avanzan: Ueno → Ginza/Tsukiji → Shinjuku."
      ),
    ],
    goodFor: [
      t("Food first", "以吃为主", "먹는 게 우선", "La comida primero"),
      t("People who want everyday Tokyo, not only towers", "想看日常东京，不只是高塔", "타워보다 일상의 도쿄를 보고 싶은 사람", "Quien quiere el Tokio cotidiano, no solo torres"),
      t("Evening energy without a club crawl", "要夜晚气氛，但不是夜店连打", "클럽 순회 없이 저녁 분위기", "Energía nocturna sin tour de discotecas"),
    ],
    tradeoffs: [
      t(
        "No Skytree, no scramble viewpoint, no palace gardens — this is not the postcard day.",
        "没有晴空塔、没有路口观景、没有皇居庭园——这不是明信片那天。",
        "스카이트리도, 스크램블 전망도, 황거 정원도 없습니다. 엽서 같은 하루가 아닙니다.",
        "Sin Skytree, sin mirador del scramble ni jardines del palacio: no es el día de postal."
      ),
      t(
        "There is a gap after lunch before the Shinjuku alleys wake up. Plan a café or a slow walk.",
        "午餐之后、新宿小巷热闹之前有空档。可以找家咖啡或慢慢走。",
        "점심 이후 신주쿠 골목이 살아나기 전에 빈 시간이 있습니다. 카페나 천천히 걷기를 잡으세요.",
        "Hay un hueco tras el almuerzo antes de que despierten los callejones de Shinjuku. Café o paseo lento."
      ),
      t(
        "Markets and alleys are outdoors or semi-open; heavy rain makes them much less pleasant.",
        "市场和小巷多在户外或半开放，大雨时体验差很多。",
        "시장과 골목은 야외·반개방이라 폭우면 훨씬 불편합니다.",
        "Mercados y callejones son exteriores o semicubiertos; con lluvia fuerte son mucho menos agradables."
      ),
    ],
  },
]

export const tokyo: City = {
  slug: "tokyo",
  name: t("Tokyo", "东京", "도쿄", "Tokio"),
  localName: "東京",
  country: t("Japan", "日本", "일본", "Japón"),
  intro: t(
    "Tokyo's first-visit centre is a long east–west strip: temple streets in Asakusa, museums and markets around Ueno, the Marunouchi–Ginza core, then Shibuya and Shinjuku. A good first day is choosing which stretch of that line to walk, and which to skip.",
    "东京第一次参观的核心是一条东西向长带：浅草的寺庙街、上野一带的博物馆与市场、丸之内–银座核心，再到涩谷与新宿。第一天的关键，是决定这条线上走哪一段、跳过哪一段。",
    "도쿄 첫 방문의 중심은 긴 동서 축입니다. 아사쿠사 사찰 거리, 우에노의 박물관과 시장, 마루노우치–긴자 핵심, 그리고 시부야와 신주쿠. 첫날은 이 선의 어디를 걷고 어디를 건너뛸지 정하는 일입니다.",
    "El centro de una primera visita a Tokio es una franja larga este–oeste: calles de templo en Asakusa, museos y mercados en Ueno, el núcleo Marunouchi–Ginza, luego Shibuya y Shinjuku. Un buen primer día es elegir qué tramo de esa línea caminar y cuál saltar."
  ),
  hero: {
    src: "/assets/home-hero-tokyo.webp",
    width: 2560,
    height: 1440,
    alt: t(
      "Tokyo towers and streets in soft evening light",
      "暮色柔光中的东京高楼与街道",
      "부드러운 저녁 빛 속 도쿄의 타워와 거리",
      "Torres y calles de Tokio con luz suave de atardecer"
    ),
    credit: {
      label: t("XingAI Travel", "XingAI Travel", "XingAI Travel", "XingAI Travel"),
      href: "/",
    },
  },
  map: {
    // Schematic Tokyo Bay water south of Tsukiji / Ginza. Not for navigation.
    // Kept south of place latitudes (~35.66+) so no place falls inside the polygon.
    water: [
      [139.77, 35.64],
      [139.79, 35.635],
      [139.82, 35.63],
      [139.85, 35.635],
      [139.855, 35.655],
      [139.83, 35.66],
      [139.8, 35.658],
      [139.775, 35.65],
    ],
    waterLabel: t("Tokyo Bay", "东京湾", "도쿄만", "Bahía de Tokio"),
    waterLabelAt: [139.81, 35.645],
  },
  clusters,
  places,
  routes,
}
