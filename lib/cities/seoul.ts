import type { City, CityPhoto, CityText, Cluster, Place, Source, TravelRoute } from "./types"

// Seoul city layer (ADR 0008).
// Facts come from the linked Wikipedia articles; coordinates come from the linked Wikidata items.
// Visit length, best time, setting and walking effort are editorial estimates, not sourced facts.
// "xing_pick" is left for the publisher to set. It is a first-hand label and must not be inferred.
// All clusters use side: "island" — Seoul has no harbour ferry model in v1; Han River crossings use mtr/bus/taxi.

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
    id: "jongno-gyeongbokgung",
    side: "island",
    neighbours: ["insadong-bukchon", "hongdae"],
    name: t("Jongno & Gyeongbokgung", "钟路与景福宫", "종로·경복궁", "Jongno y Gyeongbokgung"),
  },
  {
    id: "insadong-bukchon",
    side: "island",
    neighbours: ["jongno-gyeongbokgung", "myeongdong"],
    name: t("Insadong & Bukchon", "仁寺洞与北村", "인사동·북촌", "Insadong y Bukchon"),
  },
  {
    id: "myeongdong",
    side: "island",
    neighbours: ["insadong-bukchon", "itaewon-namsan", "dongdaemun"],
    name: t("Myeongdong", "明洞", "명동", "Myeongdong"),
  },
  {
    id: "itaewon-namsan",
    side: "island",
    neighbours: ["myeongdong", "gangnam"],
    name: t("Itaewon & Namsan", "梨泰院与南山", "이태원·남산", "Itaewon y Namsan"),
  },
  {
    id: "gangnam",
    side: "island",
    neighbours: ["itaewon-namsan"],
    name: t("Gangnam", "江南", "강남", "Gangnam"),
  },
  {
    id: "hongdae",
    side: "island",
    neighbours: ["jongno-gyeongbokgung"],
    name: t("Hongdae", "弘大", "홍대", "Hongdae"),
  },
  {
    id: "dongdaemun",
    side: "island",
    neighbours: ["myeongdong"],
    name: t("Dongdaemun", "东大门", "동대문", "Dongdaemun"),
  },
]

const places: Place[] = [
  // ── Jongno & Gyeongbokgung ──
  {
    id: "gyeongbokgung",
    name: t("Gyeongbokgung Palace", "景福宫", "경복궁", "Palacio Gyeongbokgung"),
    localName: "경복궁",
    clusterId: "jongno-gyeongbokgung",
    coordinates: { lat: 37.579884, lng: 126.9768, precision: "site" },
    categories: ["iconic", "culture", "photo"],
    summary: t(
      "The largest of the Five Grand Palaces of the Joseon dynasty, built in 1395 in what is now Jongno-gu. It served as the main royal palace and has been restored in stages since the late twentieth century.",
      "朝鲜王朝五大宫殿中规模最大的一座，1395 年建于今钟路区，曾是主要王宫，二十世纪后期起分阶段修复。",
      "조선의 5대 궁궐 중 가장 큰 궁궐로, 1395년 지금의 종로구에 세워졌습니다. 주요 왕궁으로 쓰였으며 20세기 후반부터 단계적으로 복원되었습니다.",
      "El mayor de los Cinco Grandes Palacios de Joseon, construido en 1395 en el actual Jongno-gu. Fue el palacio real principal y se ha restaurado por fases desde finales del siglo XX."
    ),
    sources: [wikipedia("Gyeongbokgung", "Gyeongbokgung"), wikidata("Q482485")],
    visitMinutes: { min: 60, max: 120 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "changdeokgung",
    name: t("Changdeokgung Palace", "昌德宫", "창덕궁", "Palacio Changdeokgung"),
    localName: "창덕궁",
    clusterId: "jongno-gyeongbokgung",
    coordinates: { lat: 37.57944444, lng: 126.99277778, precision: "site" },
    categories: ["culture", "iconic", "nature"],
    summary: t(
      "A Joseon royal palace built in 1405 east of Gyeongbokgung. Its rear garden (Huwon / Secret Garden) is part of the site inscribed on the UNESCO World Heritage List in 1997.",
      "1405 年建于景福宫以东的朝鲜王宫。后苑（秘苑）是 1997 年列入联合国教科文组织世界遗产的组成部分。",
      "1405년 경복궁 동쪽에 세워진 조선 왕궁입니다. 후원(비원)은 1997년 유네스코 세계유산에 등재된 유적의 일부입니다.",
      "Palacio real de Joseon construido en 1405 al este de Gyeongbokgung. Su jardín trasero (Huwon / Jardín Secreto) forma parte del sitio inscrito en la Lista del Patrimonio Mundial de la UNESCO en 1997."
    ),
    sources: [wikipedia("Changdeokgung", "Changdeokgung"), wikidata("Q477157")],
    visitMinutes: { min: 60, max: 120 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "moderate",
  },
  {
    id: "jogyesa",
    name: t("Jogyesa Temple", "曹溪寺", "조계사", "Templo Jogyesa"),
    localName: "조계사",
    clusterId: "jongno-gyeongbokgung",
    coordinates: { lat: 37.57391389, lng: 126.98190278, precision: "site" },
    categories: ["culture", "local"],
    summary: t(
      "The chief temple of the Jogye Order of Korean Buddhism, in Jongno-gu near Insadong. The main hall dates from a 1937 reconstruction on this urban site.",
      "韩国佛教曹溪宗的本山，位于钟路区、靠近仁寺洞。现址大雄殿建于 1937 年重建。",
      "한국 불교 조계종의 총본산으로, 종로구 인사동 근처에 있습니다. 현재 자리의 대웅전은 1937년 중건된 것입니다.",
      "Templo principal de la Orden Jogye del budismo coreano, en Jongno-gu cerca de Insadong. La sala principal data de una reconstrucción de 1937 en este emplazamiento urbano."
    ),
    sources: [wikipedia("Jogyesa", "Jogyesa"), wikidata("Q488824")],
    visitMinutes: { min: 20, max: 40 },
    bestTime: "any",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },

  // ── Insadong & Bukchon ──
  {
    id: "bukchon-hanok-village",
    name: t("Bukchon Hanok Village", "北村韩屋村", "북촌 한옥마을", "Pueblo hanok de Bukchon"),
    localName: "북촌 한옥마을",
    clusterId: "insadong-bukchon",
    coordinates: { lat: 37.58305556, lng: 126.98361111, precision: "area" },
    categories: ["photo", "culture", "iconic"],
    summary: t(
      "A neighbourhood of traditional Korean hanok houses between Gyeongbokgung, Changdeokgung and the Jongno area. Many houses are still lived in; alley viewpoints looking toward modern Seoul are widely photographed.",
      "位于景福宫、昌德宫与钟路一带之间的传统韩屋街区。许多房屋仍有人居住；巷弄里望向现代首尔的视角常被拍摄。",
      "경복궁·창덕궁·종로 사이 전통 한옥이 모인 동네입니다. 많은 집이 지금도 사람이 살고 있으며, 골목에서 현대 서울을 바라보는 전망이 자주 사진에 담깁니다.",
      "Un barrio de casas hanok tradicionales entre Gyeongbokgung, Changdeokgung y la zona de Jongno. Muchas casas siguen habitadas; los callejones con vistas hacia el Seúl moderno se fotografían mucho."
    ),
    sources: [wikipedia("Bukchon Hanok Village", "Bukchon_Hanok_Village"), wikidata("Q490981")],
    visitMinutes: { min: 40, max: 75 },
    bestTime: "morning",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "moderate",
  },
  {
    id: "insadong",
    name: t("Insadong", "仁寺洞", "인사동", "Insadong"),
    localName: "인사동",
    clusterId: "insadong-bukchon",
    coordinates: { lat: 37.572972, lng: 126.98618, precision: "area" },
    categories: ["local", "culture", "food"],
    summary: t(
      "A street and neighbourhood in Jongno-gu known for galleries, craft shops and teahouses dealing in traditional Korean arts. The main lane is partly pedestrianised.",
      "钟路区的一条街道与街区，以经营韩国传统艺术的画廊、工艺店和茶馆闻名，主街部分路段为步行街。",
      "종로구의 거리·동네로, 한국 전통 예술 관련 갤러리·공예품점·찻집으로 알려져 있습니다. 주요 길은 일부 구간이 보행자 전용입니다.",
      "Calle y barrio de Jongno-gu conocidos por galerías, tiendas de artesanía y casas de té de arte tradicional coreano. El tramo principal es en parte peatonal."
    ),
    sources: [wikipedia("Insa-dong", "Insa-dong"), wikidata("Q488678")],
    visitMinutes: { min: 40, max: 75 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },

  // ── Myeongdong ──
  {
    id: "myeongdong",
    name: t("Myeongdong", "明洞", "명동", "Myeongdong"),
    localName: "명동",
    clusterId: "myeongdong",
    coordinates: { lat: 37.5637, lng: 126.984, precision: "area" },
    categories: ["local", "night", "food"],
    summary: t(
      "A central shopping and entertainment district in Jung-gu, long one of Seoul's busiest commercial streets, with dense retail, street food stalls and cosmetics shops.",
      "位于中区的市中心购物与娱乐区，长期是首尔最热闹的商业街之一，零售、街头小吃和美妆店密集。",
      "중구의 중심 쇼핑·유흥 지구로, 오래도록 서울에서 가장 붐비는 상업 거리 중 하나이며 소매점·길거리 음식·화장품 가게가 빼곡합니다.",
      "Distrito comercial y de ocio en Jung-gu, durante mucho tiempo una de las calles comerciales más concurridas de Seúl, con tiendas, puestos de comida callejera y cosmética."
    ),
    sources: [wikipedia("Myeong-dong", "Myeong-dong"), wikidata("Q484407")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "evening",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "myeongdong-cathedral",
    name: t("Myeongdong Cathedral", "明洞圣堂", "명동성당", "Catedral de Myeongdong"),
    localName: "명동성당",
    clusterId: "myeongdong",
    coordinates: { lat: 37.5633, lng: 126.9873, precision: "site" },
    categories: ["culture", "photo"],
    summary: t(
      "The cathedral church of the Archdiocese of Seoul, a Gothic Revival brick building consecrated in 1898. It is a landmark of the Myeongdong district and a major Catholic site in Korea.",
      "首尔总教区的主教座堂，哥特复兴式砖砌建筑，1898 年祝圣。它是明洞地标，也是韩国重要的天主教场所。",
      "서울대교구의 주교좌성당으로, 1898년에 축성된 고딕 리바이벌 벽돌 건물입니다. 명동의 랜드마크이자 한국의 주요 가톨릭 성지입니다.",
      "Iglesia catedral de la arquidiócesis de Seúl, edificio neogótico de ladrillo consagrado en 1898. Es un hito de Myeongdong y un lugar católico importante en Corea."
    ),
    sources: [wikipedia("Myeongdong Cathedral", "Myeongdong_Cathedral"), wikidata("Q487036")],
    visitMinutes: { min: 20, max: 40 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "namdaemun-market",
    name: t("Namdaemun Market", "南大门市场", "남대문시장", "Mercado Namdaemun"),
    localName: "남대문시장",
    clusterId: "myeongdong",
    coordinates: { lat: 37.55944444, lng: 126.97741667, precision: "area" },
    categories: ["food", "local"],
    summary: t(
      "A large traditional market next to Sungnyemun (Namdaemun) in Jung-gu. It is among Seoul's oldest continuously operating markets and sells clothing, household goods and prepared food.",
      "位于中区崇礼门（南大门）旁的大型传统市场，是首尔持续经营最久的市场之一，售服装、日用品和熟食。",
      "중구 숭례문(남대문) 옆의 대형 전통시장으로, 서울에서 가장 오래 이어져 온 시장 중 하나이며 의류·생활용품·먹거리를 팝니다.",
      "Gran mercado tradicional junto a Sungnyemun (Namdaemun) en Jung-gu. Es de los mercados en funcionamiento continuo más antiguos de Seúl y vende ropa, artículos del hogar y comida preparada."
    ),
    sources: [wikipedia("Namdaemun Market", "Namdaemun_Market"), wikidata("Q494687")],
    visitMinutes: { min: 30, max: 60 },
    bestTime: "morning",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "sungnyemun",
    name: t("Sungnyemun (Namdaemun)", "崇礼门（南大门）", "숭례문 (남대문)", "Sungnyemun (Namdaemun)"),
    localName: "숭례문",
    clusterId: "myeongdong",
    coordinates: { lat: 37.56, lng: 126.97527778, precision: "site" },
    categories: ["iconic", "culture", "photo"],
    summary: t(
      "The southern gate of the old Seoul City Wall, also called Namdaemun. It is a National Treasure of South Korea; after a 2008 fire it was restored and reopened in 2013.",
      "旧首尔城墙的南门，又称南大门，是韩国国宝。2008 年火灾后修复，2013 年重新开放。",
      "옛 서울 성곽의 남문으로 남대문이라고도 합니다. 대한민국의 국보이며, 2008년 화재 이후 복원되어 2013년에 다시 열렸습니다.",
      "Puerta sur de la antigua muralla de Seúl, también llamada Namdaemun. Es Tesoro Nacional de Corea del Sur; tras un incendio en 2008 se restauró y reabrió en 2013."
    ),
    sources: [wikipedia("Sungnyemun", "Sungnyemun"), wikidata("Q465345")],
    visitMinutes: { min: 15, max: 30 },
    bestTime: "any",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },

  // ── Itaewon & Namsan ──
  {
    id: "n-seoul-tower",
    name: t("N Seoul Tower", "N首尔塔", "N서울타워", "N Seoul Tower"),
    localName: "N서울타워",
    clusterId: "itaewon-namsan",
    coordinates: { lat: 37.551216, lng: 126.988276, precision: "site" },
    categories: ["iconic", "photo", "night"],
    summary: t(
      "A communication and observation tower on Namsan, opened to the public in 1980. At 236.7 m from the base of the tower structure, it is a widely recognised skyline landmark of Seoul.",
      "位于南山的通信与观光塔，1980 年对公众开放。塔身高度 236.7 米，是首尔天际线的标志性建筑。",
      "남산에 있는 통신·전망 타워로 1980년에 일반에 개방되었습니다. 타워 구조물 기준 높이 236.7m로, 서울 스카이라인을 상징하는 랜드마크입니다.",
      "Torre de comunicaciones y observación en Namsan, abierta al público en 1980. Con 236,7 m desde la base de la estructura, es un hito reconocible del horizonte de Seúl."
    ),
    sources: [wikipedia("Namsan Seoul Tower", "Namsan_Seoul_Tower"), wikidata("Q69134")],
    visitMinutes: { min: 60, max: 100 },
    bestTime: "sunset",
    setting: "mixed",
    weatherSensitive: true,
    walking: "moderate",
  },
  {
    id: "itaewon",
    name: t("Itaewon", "梨泰院", "이태원", "Itaewon"),
    localName: "이태원",
    clusterId: "itaewon-namsan",
    coordinates: { lat: 37.53333333, lng: 126.98333333, precision: "area" },
    categories: ["local", "night", "food"],
    summary: t(
      "A neighbourhood in Yongsan-gu long associated with international restaurants, bars and shops, near the former U.S. Army garrison area and south of Namsan.",
      "龙山区的街区，长期以国际餐厅、酒吧和商店闻名，靠近昔日美军营地一带，位于南山之南。",
      "용산구의 동네로, 오래전부터 국제적인 식당·바·상점이 모이기로 알려져 있으며 옛 미군 기지 인근·남산 남쪽에 있습니다.",
      "Barrio de Yongsan-gu asociado desde hace tiempo a restaurantes internacionales, bares y tiendas, cerca de la antigua zona de la guarnición estadounidense y al sur de Namsan."
    ),
    sources: [wikipedia("Itaewon", "Itaewon"), wikidata("Q495646")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "evening",
    setting: "outdoor",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "national-museum-of-korea",
    name: t("National Museum of Korea", "国立中央博物馆", "국립중앙박물관", "Museo Nacional de Corea"),
    localName: "국립중앙박물관",
    clusterId: "itaewon-namsan",
    coordinates: { lat: 37.5239, lng: 126.9803, precision: "site" },
    categories: ["culture"],
    summary: t(
      "South Korea's flagship history and art museum, in Yongsan Family Park since 2005. Its collection covers archaeology and fine arts from prehistoric Korea through the modern period.",
      "韩国国家级历史与艺术博物馆，2005 年起位于龙山家族公园。藏品涵盖史前至近现代的考古与美术。",
      "대한민국을 대표하는 역사·미술 박물관으로, 2005년부터 용산가족공원에 있습니다. 선사 시대부터 근현대까지 고고·미술 자료를 소장합니다.",
      "Museo principal de historia y arte de Corea del Sur, en el Parque Familiar de Yongsan desde 2005. Su colección abarca arqueología y bellas artes desde la Corea prehistórica hasta la época moderna."
    ),
    sources: [wikipedia("National Museum of Korea", "National_Museum_of_Korea"), wikidata("Q494407")],
    visitMinutes: { min: 90, max: 150 },
    bestTime: "any",
    setting: "indoor",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "war-memorial",
    name: t("War Memorial of Korea", "战争纪念馆", "전쟁기념관", "Memorial de la Guerra de Corea"),
    localName: "전쟁기념관",
    clusterId: "itaewon-namsan",
    coordinates: { lat: 37.5365, lng: 126.9771, precision: "site" },
    categories: ["culture"],
    summary: t(
      "A museum in Yongsan-gu documenting Korean military history, opened in 1994 on the site of the former army headquarters. Outdoor exhibits include aircraft and memorial sculptures.",
      "位于龙山区的军事历史博物馆，1994 年在原陆军总部旧址开放，户外展出飞机与纪念雕塑等。",
      "용산구의 군사 역사 박물관으로, 1994년 옛 육군본부 자리에 개관했습니다. 야외에는 항공기와 기념 조형 등이 있습니다.",
      "Museo en Yongsan-gu sobre la historia militar de Corea, abierto en 1994 en el antiguo cuartel general del ejército. En el exterior hay aviones y esculturas conmemorativas."
    ),
    sources: [wikipedia("War Memorial of Korea", "War_Memorial_of_Korea"), wikidata("Q489764")],
    visitMinutes: { min: 60, max: 120 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },

  // ── Hongdae ──
  {
    id: "hongdae",
    name: t("Hongdae", "弘大", "홍대", "Hongdae"),
    localName: "홍대",
    clusterId: "hongdae",
    coordinates: { lat: 37.55527778, lng: 126.92333333, precision: "area" },
    categories: ["local", "night", "food"],
    summary: t(
      "The area around Hongik University in Mapo-gu, known for indie music venues, street performances, cafés and nightlife that grew with the university's arts scene.",
      "麻浦区弘益大学一带，以独立音乐场地、街头表演、咖啡馆和夜生活闻名，与大学艺术氛围一同发展起来。",
      "마포구 홍익대학교 일대로, 인디 음악 공연장·거리 공연·카페·나이트라이프로 알려져 있으며 대학의 예술 분위기와 함께 성장했습니다.",
      "Zona alrededor de la Universidad Hongik en Mapo-gu, conocida por salas de música indie, actuaciones callejeras, cafés y vida nocturna ligadas a la escena artística universitaria."
    ),
    sources: [wikipedia("Hongdae (area)", "Hongdae_(area)"), wikidata("Q5895772")],
    visitMinutes: { min: 60, max: 120 },
    bestTime: "evening",
    setting: "outdoor",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "gyeongui-line-forest-park",
    name: t("Gyeongui Line Forest Park", "京义线森林公园", "경의선숲길", "Parque Forestal de la Línea Gyeongui"),
    localName: "경의선숲길",
    clusterId: "hongdae",
    coordinates: { lat: 37.5593, lng: 126.9248, precision: "area" },
    categories: ["nature", "photo", "local"],
    summary: t(
      "A linear park built on a disused section of the Gyeongui Line railway through northwestern Seoul, including stretches near Hongdae and Yeonnam-dong used as a pedestrian greenway.",
      "建在京义线废弃路段上的带状公园，穿过首尔西北部，弘大与延南洞一带成为步行绿道。",
      "경의선 폐선 구간에 조성된 선형 공원으로, 서울 북서부를 지나며 홍대·연남동 일대가 보행 녹지로 쓰입니다.",
      "Parque lineal sobre un tramo en desuso del ferrocarril Gyeongui en el noroeste de Seúl, con tramos peatonales cerca de Hongdae y Yeonnam-dong."
    ),
    sources: [wikipedia("Gyeongui Line Forest Park", "Gyeongui_Line_Forest_Park"), wikidata("Q24861751")],
    visitMinutes: { min: 30, max: 60 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },

  // ── Dongdaemun ──
  {
    id: "dongdaemun-design-plaza",
    name: t("Dongdaemun Design Plaza", "东大门设计广场", "동대문디자인플라자", "Dongdaemun Design Plaza"),
    localName: "동대문디자인플라자",
    clusterId: "dongdaemun",
    coordinates: { lat: 37.5669, lng: 127.0094, precision: "site" },
    categories: ["photo", "culture", "iconic"],
    summary: t(
      "A Zaha Hadid–designed cultural and exhibition complex in the Dongdaemun area, opened in 2014 on the site of the former Dongdaemun Stadium. Its curved aluminium exterior is a frequent photography subject.",
      "扎哈·哈迪德设计的文化与展览综合体，2014 年在东大门运动场旧址开放，曲面铝制外观常被拍摄。",
      "자하 하디드가 설계한 문화·전시 복합시설로, 2014년 옛 동대문운동장 자리에 개관했습니다. 곡선 알루미늄 외관이 자주 사진에 담깁니다.",
      "Complejo cultural y de exposiciones diseñado por Zaha Hadid en Dongdaemun, abierto en 2014 en el antiguo estadio Dongdaemun. Su exterior curvo de aluminio se fotografía a menudo."
    ),
    sources: [wikipedia("Dongdaemun Design Plaza", "Dongdaemun_Design_Plaza"), wikidata("Q5295847")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "daytime",
    setting: "mixed",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "dongdaemun-market",
    name: t("Dongdaemun Market", "东大门市场", "동대문시장", "Mercado Dongdaemun"),
    localName: "동대문시장",
    clusterId: "dongdaemun",
    coordinates: { lat: 37.57041, lng: 127.00896, precision: "area" },
    categories: ["local", "night"],
    summary: t(
      "A large wholesale and retail shopping district around Dongdaemun Gate, known for clothing wholesale malls that stay open late into the night.",
      "东大门一带的大型批零购物区，以营业至深夜的服装批发商场闻名。",
      "동대문 일대의 대형 도소매 쇼핑 지구로, 밤늦게까지 여는 의류 도매 쇼핑몰로 유명합니다.",
      "Gran distrito mayorista y minorista en torno a la puerta Dongdaemun, conocido por centros de ropa al por mayor que abren hasta tarde."
    ),
    sources: [wikipedia("Dongdaemun Market", "Dongdaemun_Market"), wikidata("Q492127")],
    visitMinutes: { min: 30, max: 60 },
    bestTime: "evening",
    setting: "indoor",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "gwangjang-market",
    name: t("Gwangjang Market", "广藏市场", "광장시장", "Mercado Gwangjang"),
    localName: "광장시장",
    clusterId: "dongdaemun",
    coordinates: { lat: 37.57, lng: 126.999, precision: "area" },
    categories: ["food", "local"],
    summary: t(
      "One of Seoul's oldest surviving private markets, opened in 1905 in Jongno-gu. It is known for bindaetteok, mayak gimbap and other market foods sold in covered aisles.",
      "首尔现存最古老的民营市场之一，1905 年在钟路区开业，以绿豆煎饼、麻药紫菜包饭等廊内小吃闻名。",
      "1905년 종로구에 문을 연, 서울에서 가장 오래된 사설 시장 중 하나입니다. 빈대떡·마약김밥 등 지붕 덮인 통로 음식점으로 유명합니다.",
      "Uno de los mercados privados más antiguos que quedan en Seúl, abierto en 1905 en Jongno-gu. Es conocido por bindaetteok, mayak gimbap y otras comidas de pasillo cubierto."
    ),
    sources: [wikipedia("Gwangjang Market", "Gwangjang_Market"), wikidata("Q12585067")],
    visitMinutes: { min: 40, max: 75 },
    bestTime: "morning",
    setting: "indoor",
    weatherSensitive: false,
    walking: "easy",
  },
  {
    id: "cheonggyecheon",
    name: t("Cheonggyecheon", "清溪川", "청계천", "Cheonggyecheon"),
    localName: "청계천",
    clusterId: "dongdaemun",
    coordinates: { lat: 37.57, lng: 127.00638889, precision: "area" },
    categories: ["nature", "photo", "local"],
    summary: t(
      "A restored urban stream running through central Seoul, uncovered and landscaped in a major project completed in 2005 after decades under a road and elevated highway.",
      "穿过首尔市中心的修复城市溪流。在被道路与高架桥覆盖数十年后，2005 年完成揭盖与景观工程。",
      "서울 도심을 가로지르는 복원 도시 하천으로, 도로·고가도로 아래에 수십 년 묻혀 있다 2005년 복개 철거와 조경 공사가 끝났습니다.",
      "Arroyo urbano restaurado que atraviesa el centro de Seúl; tras décadas bajo una carretera y un viaducto, el proyecto de recuperación terminó en 2005."
    ),
    sources: [wikipedia("Cheonggyecheon", "Cheonggyecheon"), wikidata("Q495437")],
    visitMinutes: { min: 30, max: 60 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },

  // ── Gangnam ──
  {
    id: "bongeunsa",
    name: t("Bongeunsa Temple", "奉恩寺", "봉은사", "Templo Bongeunsa"),
    localName: "봉은사",
    clusterId: "gangnam",
    coordinates: { lat: 37.51555556, lng: 127.05722222, precision: "site" },
    categories: ["culture", "photo"],
    summary: t(
      "A Buddhist temple of the Jogye Order in Gangnam-gu, founded in 794 during the Silla period. It sits opposite the COEX complex and contrasts modern towers with a wooded temple precinct.",
      "江南区曹溪宗寺院，新罗时期 794 年创建，与 COEX 综合体隔街相对，木构寺院与现代高楼形成对照。",
      "강남구의 조계종 사찰로, 신라 시대인 794년에 창건되었습니다. COEX 단지 맞은편에 있어 숲이 있는 경내와 현대 고층 건물이 대비됩니다.",
      "Templo budista de la Orden Jogye en Gangnam-gu, fundado en 794 en la época de Silla. Frente al complejo COEX, contrasta el recinto arbolado con las torres modernas."
    ),
    sources: [wikipedia("Bongeunsa", "Bongeunsa"), wikidata("Q135709")],
    visitMinutes: { min: 30, max: 60 },
    bestTime: "daytime",
    setting: "outdoor",
    weatherSensitive: true,
    walking: "easy",
  },
  {
    id: "coex",
    name: t("COEX", "COEX", "코엑스", "COEX"),
    localName: "코엑스",
    clusterId: "gangnam",
    coordinates: { lat: 37.51194444, lng: 127.05888889, precision: "site" },
    categories: ["local", "photo"],
    summary: t(
      "A convention, exhibition and shopping complex in Samseong-dong, Gangnam-gu, attached to the Korea World Trade Center. It includes a large underground mall and public spaces used for exhibitions and events.",
      "位于江南区三成洞的会展与购物综合体，毗邻韩国世界贸易中心，含大型地下商场及展览活动公共空间。",
      "강남구 삼성동의 컨벤션·전시·쇼핑 복합단지이며 한국종합무역센터와 연결됩니다. 대형 지하몰과 전시·행사 공간이 있습니다.",
      "Complejo de congresos, exposiciones y compras en Samseong-dong, Gangnam-gu, unido al Korea World Trade Center. Incluye un gran centro comercial subterráneo y espacios públicos para ferias y eventos."
    ),
    sources: [wikipedia("COEX", "COEX"), wikidata("Q485389")],
    visitMinutes: { min: 45, max: 90 },
    bestTime: "any",
    setting: "indoor",
    weatherSensitive: false,
    walking: "easy",
  },
]

const travelCredit = {
  label: t("XingAI Travel", "XingAI Travel", "XingAI Travel", "XingAI Travel"),
  href: "/",
}

const destPhoto = (alt: CityText): CityPhoto => ({
  src: "/assets/dest-seoul-v2.webp",
  width: 1600,
  height: 1000,
  alt,
  credit: travelCredit,
})

const photos = {
  essentials: destPhoto(
    t(
      "Seoul skyline mood with river and towers",
      "汉江与高楼勾勒的首尔天际线氛围",
      "한강과 타워가 있는 서울 스카이라인 분위기",
      "Ambiente del horizonte de Seúl con río y torres"
    )
  ),
  photo: destPhoto(
    t(
      "Seoul streets and landmarks for a photo day",
      "适合拍照的一天：首尔街景与地标",
      "사진 하루에 맞는 서울 거리와 랜드마크",
      "Calles e hitos de Seúl para un día de fotos"
    )
  ),
  local: destPhoto(
    t(
      "Everyday Seoul markets and neighbourhood energy",
      "日常首尔：市场与街区气息",
      "일상 서울의 시장과 동네 분위기",
      "Mercados y energía de barrio del Seúl cotidiano"
    )
  ),
}

// Reference routes (ADR 0008 §3). Hand-authored, never generated. Times are estimates.
// Reasons are editorial; any fact inside them must already be in a place summary above.
const routes: TravelRoute[] = [
  {
    id: "essentials",
    theme: "essentials",
    photo: photos.essentials,
    name: t("Seoul Essentials", "首尔经典一日", "서울 핵심 코스", "Lo esencial de Seúl"),
    description: t(
      "Palace courtyards, hanok lanes, a busy shopping street, then the city from Namsan at dusk.",
      "先走宫殿与韩屋巷，再进热闹商街，傍晚从南山看整座城市。",
      "궁궐 마당과 한옥 골목, 붐비는 쇼핑 거리를 지나 해 질 녘 남산에서 도시를 봅니다.",
      "Patios de palacio, callejones hanok, una calle comercial y la ciudad desde Namsan al anochecer."
    ),
    estimatedDurationMinutes: 331,
    stops: [
      {
        placeId: "gyeongbokgung",
        order: 1,
        estimatedVisitMinutes: 75,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Start with the largest Joseon palace while the courtyards are quieter in the morning.",
          "从朝鲜最大王宫开始，趁早上游人较少。",
          "아침에 한산할 때 조선 최대 궁궐에서 시작합니다.",
          "Empieza en el mayor palacio de Joseon, cuando los patios están más tranquilos por la mañana."
        ),
      },
      {
        placeId: "bukchon-hanok-village",
        order: 2,
        estimatedVisitMinutes: 45,
        estimatedTravelMinutesFromPrevious: 15,
        transportMode: "walk",
        reason: t(
          "A short walk east into living hanok lanes between the palaces — keep voices down; people live here.",
          "往东走一小段，进入宫殿之间仍有人居住的韩屋巷，请放轻脚步和声音。",
          "동쪽으로 조금 걸어 궁궐 사이 사람이 사는 한옥 골목으로 갑니다. 주민이 있으니 목소리를 낮추세요.",
          "Un corto paseo al este hacia callejones hanok habitados entre palacios; baja la voz: aquí vive gente."
        ),
      },
      {
        placeId: "insadong",
        order: 3,
        estimatedVisitMinutes: 40,
        estimatedTravelMinutesFromPrevious: 16,
        transportMode: "walk",
        reason: t(
          "Drop south into galleries and teahouses before the shopping crowds further down.",
          "再往南进画廊与茶馆，后面商街会更挤。",
          "남쪽으로 내려가 갤러리와 찻집을 보고, 더 아래 쇼핑 인파 전에 숨 고릅니다.",
          "Baja al sur hacia galerías y casas de té antes de las multitudes de compras más abajo."
        ),
      },
      {
        placeId: "myeongdong",
        order: 4,
        estimatedVisitMinutes: 45,
        estimatedTravelMinutesFromPrevious: 15,
        transportMode: "walk",
        reason: t(
          "The city's densest commercial street — street food and shops between the old centre and Namsan.",
          "首尔最密集的商业街之一，连着旧城中心与南山，小吃和店铺都在路上。",
          "도심과 남산 사이, 서울에서 가장 밀집한 상업 거리입니다. 길거리 음식과 상점이 이어집니다.",
          "La calle comercial más densa: comida callejera y tiendas entre el centro antiguo y Namsan."
        ),
      },
      {
        placeId: "n-seoul-tower",
        order: 5,
        estimatedVisitMinutes: 60,
        estimatedTravelMinutesFromPrevious: 20,
        transportMode: "walk",
        reason: t(
          "Finish on Namsan for the observation deck as the light softens — the same city you walked, now from above.",
          "最后上南山，趁光线柔和时上观光塔，俯瞰白天走过的城区。",
          "마지막은 남산. 빛이 부드러워질 때 전망대에서, 낮에 걸은 도시를 위에서 봅니다.",
          "Termina en Namsan, en el mirador cuando la luz baja: la misma ciudad que recorriste, ahora desde arriba."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "It covers the three images first-timers come for: palace, hanok lanes, and the Namsan view.",
        "一天覆盖初次来首尔最想见的三类画面：宫殿、韩屋巷和南山眺望。",
        "첫 방문자가 기대하는 세 장면, 궁궐·한옥 골목·남산 전망을 하루에 담습니다.",
        "Cubre las tres imágenes del primer viaje: palacio, callejones hanok y la vista desde Namsan."
      ),
      t(
        "One line south through neighbouring clusters — no backtracking and no river crossing.",
        "沿相邻街区一路向南，不走回头路，也不过汉江。",
        "이웃 클러스터를 따라 남쪽으로만 이동해 되돌아가지 않고, 한강도 건너지 않습니다.",
        "Una línea hacia el sur por clusters vecinos, sin volver atrás ni cruzar el Han."
      ),
      t(
        "Walking between stops keeps the day readable: you feel how the old centre sits against the hill.",
        "站与站之间步行，能直观感到旧城中心如何贴着南山排布。",
        "정류장 사이를 걸어가면 옛 도심이 남산에 어떻게 붙는지 몸으로 느껴집니다.",
        "Caminar entre paradas deja claro cómo el centro antiguo se apoya contra la colina."
      ),
    ],
    goodFor: [
      t("A first visit with one day", "第一次来、只有一天", "첫 방문, 하루 일정", "Primera visita con un solo día"),
      t("Clear landmarks without a long metro day", "地标清楚、少坐地铁", "랜드마크 위주, 긴 지하철 이동은 적음", "Hitos claros sin un día largo de metro"),
      t("Getting your bearings before exploring on your own", "先认清方向，再自己探索", "혼자 다니기 전에 방향 감각 익히기", "Orientarte antes de explorar por tu cuenta"),
    ],
    tradeoffs: [
      t(
        "These are busy sights. Expect queues at the palace and tower, and crowded lanes in Bukchon.",
        "都是热门点：宫殿和塔可能排队，北村巷弄也常拥挤。",
        "모두 붐비는 명소입니다. 궁궐·타워 줄과 북촌 골목 혼잡을 예상하세요.",
        "Son lugares concurridos: colas en el palacio y la torre, y callejones llenos en Bukchon."
      ),
      t(
        "Most of the day is outdoors. Rain or haze cuts the Namsan payoff hard.",
        "大半天在户外。下雨或雾霾时，南山景色会差很多。",
        "하루 대부분 야외입니다. 비나 스모그가 있으면 남산 전망의 가치가 크게 떨어집니다.",
        "Casi todo el día es al aire libre. Lluvia o bruma restan mucho a Namsan."
      ),
      t(
        "Little deep food culture. Pair it with the Local route on another day.",
        "深度美食不多，可另找一天走在地路线。",
        "깊은 먹거리 코스는 적습니다. 다른 날 로컬 코스와 함께 하세요.",
        "Poca comida en profundidad. Combínala otro día con la ruta local."
      ),
    ],
  },
  {
    id: "photo",
    theme: "photo",
    photo: photos.photo,
    name: t("Photo Seoul", "拍照首尔", "사진으로 보는 서울", "Seúl en fotos"),
    description: t(
      "From a palace garden to hanok roofs, a brick cathedral, Cheonggyecheon, then DDP's curves.",
      "从宫殿庭园到韩屋顶、砖砌圣堂、清溪川，再到东大门设计广场的曲面。",
      "궁궐 정원에서 한옥 지붕, 벽돌 성당, 청계천을 지나 DDP의 곡선까지.",
      "Del jardín del palacio a tejados hanok, una catedral de ladrillo, Cheonggyecheon y las curvas del DDP."
    ),
    estimatedDurationMinutes: 313,
    stops: [
      {
        placeId: "changdeokgung",
        order: 1,
        estimatedVisitMinutes: 70,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Start where courtyards and trees frame cleaner shots than the busiest palace next door.",
          "从庭园与树木更好构图的昌德宫开始，比隔壁最热闹的宫殿更适合拍。",
          "가장 붐비는 옆 궁궐보다 정원과 나무로 구도 잡기 좋은 창덕궁에서 시작합니다.",
          "Empieza donde patios y árboles enmarcan mejor que en el palacio más concurrido de al lado."
        ),
      },
      {
        placeId: "bukchon-hanok-village",
        order: 2,
        estimatedVisitMinutes: 50,
        estimatedTravelMinutesFromPrevious: 13,
        transportMode: "walk",
        reason: t(
          "Walk into the hanok roofs and alley sightlines — stay on public paths and keep it brief.",
          "走入韩屋顶与巷弄视线，只走公共路径，拍照要快。",
          "한옥 지붕과 골목 시선으로 걸어 들어갑니다. 공용 길만 쓰고 짧게 머무세요.",
          "Entra en tejados hanok y ejes de callejón; usa solo caminos públicos y sé breve."
        ),
      },
      {
        placeId: "myeongdong-cathedral",
        order: 3,
        estimatedVisitMinutes: 30,
        estimatedTravelMinutesFromPrevious: 30,
        transportMode: "walk",
        reason: t(
          "A Gothic brick façade against commercial towers — strong contrast after the walk south.",
          "往南走到哥特式砖墙贴着商业高楼的圣堂，反差很强。",
          "남쪽으로 걸어가면 상업 타워 앞 고딕 벽돌 파사드가 나옵니다. 대비가 뚜렷합니다.",
          "Una fachada gótica de ladrillo frente a torres comerciales: fuerte contraste tras el paseo al sur."
        ),
      },
      {
        placeId: "cheonggyecheon",
        order: 4,
        estimatedVisitMinutes: 35,
        estimatedTravelMinutesFromPrevious: 20,
        transportMode: "mtr",
        reason: t(
          "Metro east to the restored stream — water, bridges and walkways for a quieter mid-afternoon set.",
          "坐地铁往东到修复后的溪流，水、桥和步道适合下午拍一组安静画面。",
          "지하철로 동쪽 복원 하천으로 갑니다. 물·다리·산책로로 오후 조용한 컷을 잡기 좋습니다.",
          "Metro al este hasta el arroyo restaurado: agua, puentes y paseos para un set más calmado."
        ),
      },
      {
        placeId: "dongdaemun-design-plaza",
        order: 5,
        estimatedVisitMinutes: 55,
        estimatedTravelMinutesFromPrevious: 10,
        transportMode: "walk",
        reason: t(
          "End on the curved aluminium shell next to the stream — best when the light hits the metal.",
          "在溪流旁的铝制曲面建筑收尾，光线打在金属上时最好拍。",
          "하천 옆 곡선 알루미늄 외관에서 마무리합니다. 빛이 금속에 닿을 때가 가장 좋습니다.",
          "Termina en la cáscara de aluminio curva junto al arroyo; mejor cuando la luz pega en el metal."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "Architecture changes every stop: palace wood, hanok tile, brick church, stream, then parametric metal.",
        "每一站建筑语言都不同：宫殿木构、韩屋瓦顶、砖砌教堂、溪流，再到参数化金属。",
        "정류장마다 건축이 바뀝니다. 궁궐 목재, 한옥 기와, 벽돌 성당, 하천, 그리고 파라메트릭 금속.",
        "La arquitectura cambia en cada parada: madera de palacio, teja hanok, iglesia de ladrillo, arroyo y metal paramétrico."
      ),
      t(
        "Eastward only through neighbouring areas after the walk south — no cluster backtracking.",
        "先南走再向东，只经过相邻街区，不回到已离开的区域。",
        "남쪽으로 걸은 뒤 동쪽으로만 이동해, 떠난 클러스터로 되돌아가지 않습니다.",
        "Solo hacia el este tras el tramo a pie al sur, sin volver a un cluster ya dejado."
      ),
      t(
        "Indoor options at the cathedral and DDP if a shower hits mid-route.",
        "中途若下雨，圣堂与 DDP 都有室内可躲。",
        "도중에 비가 오면 성당과 DDP에서 실내로 피할 수 있습니다.",
        "Si llueve a mitad, la catedral y el DDP ofrecen interior."
      ),
    ],
    goodFor: [
      t("Travelling with a camera", "带相机出门", "카메라를 들고 다니는 여행", "Viajar con cámara"),
      t("Architecture and street frames", "喜欢建筑和街景构图", "건축과 거리 구도", "Arquitectura y encuadres de calle"),
      t("A second day after Essentials", "走过经典路线之后的第二天", "핵심 코스 다음 날", "Un segundo día después de lo esencial"),
    ],
    tradeoffs: [
      t(
        "It skips Namsan Tower and the Han River south side entirely.",
        "完全不上南山塔，也不去汉江南岸。",
        "남산타워와 한강 남쪽은 완전히 빠집니다.",
        "Deja fuera la torre de Namsan y la orilla sur del Han."
      ),
      t(
        "Bukchon is residential. Tripods and loud groups wear out locals quickly.",
        "北村是居住区，脚架和大嗓门很快打扰居民。",
        "북촌은 주거지입니다. 삼각대와 큰 목소리는 주민을 빨리 지치게 합니다.",
        "Bukchon es residencial: trípodes y grupos ruidosos cansan pronto a los vecinos."
      ),
      t(
        "Cheonggyecheon and DDP need decent light; grey drizzle flattens both.",
        "清溪川和 DDP 都需要像样的光线，灰蒙蒙的小雨会让画面发闷。",
        "청계천과 DDP는 괜찮은 빛이 필요합니다. 회색 이슬비면 둘 다 밋밋해집니다.",
        "Cheonggyecheon y el DDP necesitan buena luz; la llovizna gris los aplana."
      ),
    ],
  },
  {
    id: "local",
    theme: "local",
    photo: photos.local,
    name: t("Local Seoul", "在地首尔", "로컬 서울", "Seúl local"),
    description: t(
      "Market food first, then a city temple, tea-street browsing, and Hongdae's evening streets.",
      "先吃市场小吃，再进市区寺庙与茶街，晚上落到弘大的街道。",
      "시장 음식으로 시작해 도심 사찰과 찻거리를 보고, 저녁에는 홍대 거리로.",
      "Primero comida de mercado, luego un templo urbano, calles de té y las calles nocturnas de Hongdae."
    ),
    estimatedDurationMinutes: 330,
    stops: [
      {
        placeId: "gwangjang-market",
        order: 1,
        estimatedVisitMinutes: 50,
        estimatedTravelMinutesFromPrevious: 0,
        reason: t(
          "Start hungry. Bindaetteok and mayak gimbap in covered aisles beat waiting for a dinner reservation.",
          "空腹开始。廊里的绿豆煎饼和麻药紫菜包饭，比晚上订位更贴近日常吃法。",
          "배고픈 채로 시작합니다. 지붕 통로의 빈대떡·마약김밥이 저녁 예약보다 일상적인 먹거리에 가깝습니다.",
          "Empieza con hambre. Bindaetteok y mayak gimbap en pasillos cubiertos ganan a una reserva de cena."
        ),
      },
      {
        placeId: "dongdaemun-market",
        order: 2,
        estimatedVisitMinutes: 25,
        estimatedTravelMinutesFromPrevious: 12,
        transportMode: "walk",
        reason: t(
          "A short walk to the wholesale clothing halls — daytime here is quieter than the late-night rush.",
          "走一小段到服装批发商场；白天比深夜档口高峰安静一些。",
          "의류 도매 상가까지 짧게 걷습니다. 낮이 심야 피크보다 한산합니다.",
          "Un corto paseo a los centros mayoristas de ropa; de día está más calmado que de madrugada."
        ),
      },
      {
        placeId: "namdaemun-market",
        order: 3,
        estimatedVisitMinutes: 40,
        estimatedTravelMinutesFromPrevious: 25,
        transportMode: "mtr",
        reason: t(
          "Metro west to another working market by the old south gate — snacks and stalls, not a showpiece mall.",
          "坐地铁往西到旧南门旁的另一座仍在营业的市场，吃小吃逛摊，不是观光商场。",
          "지하철로 서쪽 옛 남문 옆 또 다른 현업 시장으로 갑니다. 쇼피스 몰이 아니라 간식과 좌판입니다.",
          "Metro al oeste a otro mercado en activo junto a la antigua puerta sur: puestos y snacks, no un centro turístico."
        ),
      },
      {
        placeId: "jogyesa",
        order: 4,
        estimatedVisitMinutes: 30,
        estimatedTravelMinutesFromPrevious: 18,
        transportMode: "mtr",
        reason: t(
          "Metro a few stops north to the Jogye Order's city temple — incense and a courtyard between office blocks.",
          "坐地铁往北几站到曹溪宗市区本山：写字楼之间的香火与庭院。",
          "지하철로 북쪽 몇 정거장, 조계종 도심 총본산으로 갑니다. 사무실 건물 사이 향과 마당이 있습니다.",
          "Metro unas pocas paradas al norte hasta el templo urbano de la Orden Jogye: incienso y un patio entre oficinas."
        ),
      },
      {
        placeId: "insadong",
        order: 5,
        estimatedVisitMinutes: 35,
        estimatedTravelMinutesFromPrevious: 10,
        transportMode: "walk",
        reason: t(
          "Tea and craft shops on the pedestrian lane — slower than Myeongdong, still central.",
          "步行街上的茶馆与工艺店，比明洞慢一拍，但仍在市中心。",
          "보행자 거리의 찻집·공예품점. 명동보다 느긋하지만 여전히 도심입니다.",
          "Té y artesanía en el tramo peatonal: más lento que Myeongdong, aún céntrico."
        ),
      },
      {
        placeId: "hongdae",
        order: 6,
        estimatedVisitMinutes: 60,
        estimatedTravelMinutesFromPrevious: 25,
        transportMode: "mtr",
        reason: t(
          "Metro west for evening streets around the arts university — cafés, buskers and late food.",
          "坐地铁往西，到艺术大学一带的夜街：咖啡馆、街头艺人和宵夜。",
          "지하철로 서쪽 예술 대학 일대 저녁 거리로 갑니다. 카페·버스킹·늦은 음식.",
          "Metro al oeste a las calles nocturnas junto a la universidad de arte: cafés, músicos y comida tardía."
        ),
      },
    ],
    whyThisRoute: [
      t(
        "Food and ordinary streets lead; landmarks only appear when they sit on the way.",
        "以吃和日常街道为主，地标只在顺路时出现。",
        "먹거리와 일상 거리가 앞이고, 랜드마크는 길 위에 있을 때만 들릅니다.",
        "Mandan la comida y las calles corrientes; los hitos solo salen si están de camino."
      ),
      t(
        "Two real markets bookend the morning before the evening shifts to Hongdae.",
        "上午两座仍在营业的市场收尾后，晚上再转到弘大。",
        "오전에 현업 시장 두 곳을 보고, 저녁은 홍대로 분위기가 바뀝니다.",
        "Dos mercados de verdad cierran la mañana; la noche cambia a Hongdae."
      ),
      t(
        "Westward finish by metro — no return to Dongdaemun or Myeongdong after you leave them.",
        "最后坐地铁往西收尾，离开东大门和明洞后不再折返。",
        "마지막은 지하철로 서쪽 마무리. 동대문·명동을 떠난 뒤 되돌아가지 않습니다.",
        "Cierre al oeste en metro, sin volver a Dongdaemun o Myeongdong una vez dejados."
      ),
    ],
    goodFor: [
      t("Food first", "以吃为主", "먹는 게 우선", "La comida primero"),
      t("Lower cost than palace-and-tower days", "比宫殿观景日花费更低", "궁궐·타워 데이보다 적은 비용", "Menos gasto que un día de palacio y torre"),
      t("People who want everyday Seoul, not only landmarks", "想看日常首尔，不只是地标", "명소보다 일상의 서울을 보고 싶은 사람", "Quien quiere el Seúl cotidiano, no solo monumentos"),
    ],
    tradeoffs: [
      t(
        "No Namsan view and no Gangnam skyline stop.",
        "没有南山眺望，也不去江南天际线那一站。",
        "남산 전망도, 강남 스카이라인 정류장도 없습니다.",
        "Sin vista de Namsan ni parada en el horizonte de Gangnam."
      ),
      t(
        "Markets are busy and can feel chaotic; go early for Gwangjang.",
        "市场人多、节奏乱，广藏市场请尽量早去。",
        "시장은 붐비고 정신없을 수 있습니다. 광장시장은 일찍 가세요.",
        "Los mercados están ajetreados; ve temprano a Gwangjang."
      ),
      t(
        "Hongdae at night is loud. If you want quiet temples only, this finish is the wrong tone.",
        "弘大夜晚很吵。若只想安静寺庙，这个收尾气氛不对。",
        "홍대 밤은 시끄럽습니다. 조용한 사찰만 원하면 이 마무리는 톤이 맞지 않습니다.",
        "Hongdae de noche es ruidoso. Si solo quieres templos tranquilos, este final no encaja."
      ),
    ],
  },
]

export const seoul: City = {
  slug: "seoul",
  name: t("Seoul", "首尔", "서울", "Seúl"),
  localName: "서울",
  country: t("South Korea", "韩国", "대한민국", "Corea del Sur"),
  intro: t(
    "Seoul's historic core sits north of the Han River: palaces and hanok lanes in Jongno, shopping around Myeongdong, and Namsan above them. Gangnam and the river parks lie south; the metro ties both sides together.",
    "首尔历史核心在汉江以北：钟路的宫殿与韩屋巷、明洞一带的购物，以及南山上的俯瞰。江南与江边公园在南岸，地铁把两岸连在一起。",
    "서울의 역사 중심은 한강 북쪽에 있습니다. 종로의 궁궐·한옥 골목, 명동 쇼핑, 그 위의 남산. 강남과 강변 공원은 남쪽이며, 지하철이 양쪽을 잇습니다.",
    "El núcleo histórico de Seúl está al norte del río Han: palacios y callejones hanok en Jongno, compras en Myeongdong y Namsan encima. Gangnam y los parques del río quedan al sur; el metro une ambas orillas."
  ),
  hero: {
    src: "/assets/home-hero-seoul.webp",
    width: 2560,
    height: 1440,
    alt: t(
      "Seoul at sunset with cherry blossoms, the Han River, and Namsan Tower",
      "黄昏中的首尔：樱花、汉江与南山塔",
      "해 질 녘 서울: 벚꽃, 한강, 남산타워",
      "Seúl al atardecer con cerezos, el río Han y la torre de Namsan"
    ),
    credit: {
      label: t("XingAI Travel", "XingAI Travel", "XingAI Travel", "XingAI Travel"),
      href: "/",
    },
  },
  map: {
    // Schematic Han River channel only — not for navigation. Kept thin so place pins stay on land.
    water: [
      [126.91, 37.519],
      [126.95, 37.5175],
      [126.99, 37.5165],
      [127.03, 37.5175],
      [127.07, 37.5205],
      [127.09, 37.523],
      [127.09, 37.526],
      [127.07, 37.524],
      [127.03, 37.5215],
      [126.99, 37.5205],
      [126.95, 37.5215],
      [126.91, 37.5235],
    ],
    waterLabel: t("Han River", "汉江", "한강", "Río Han"),
    waterLabelAt: [126.99, 37.521],
  },
  clusters,
  places,
  routes,
}
