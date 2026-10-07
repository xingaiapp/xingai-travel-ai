import type { ContentSection, Localized } from "@/lib/content/types"

const L = (en: string, zh: string, ko: string, es: string): Localized => ({ en, zh, ko, es })
const S = (heading: Localized, body: Localized): ContentSection => ({ heading, body })

/**
 * Evergreen decision context per compare page: seasons, getting there, where to stay, who should skip.
 * Stable facts only — no prices, opening hours, or schedules that go stale (ADR 0009).
 */
export const compareSections: Record<string, ContentSection[]> = {
  "tokyo-vs-seoul": [
    S(
      L("When to go", "什么时候去", "언제 갈까", "Cuándo ir"),
      L(
        "Both cities have four clear seasons. Spring (late March to April) and autumn (October to November) are the most comfortable for long walking days; Seoul's cherry blossoms usually open a week or two after Tokyo's. Summer is hot and humid in both, with a rainy season in June and July, and Tokyo carries typhoon risk from late summer into early autumn. Seoul's winters are noticeably colder and drier than Tokyo's, so if you dislike cold, a December or January trip favors Tokyo.",
        "两座城市四季分明。春季（三月底到四月）和秋季（十月到十一月）最适合整天步行；首尔的樱花通常比东京晚一到两周开。两地夏季都湿热，六七月是雨季，东京从夏末到初秋还有台风风险。首尔的冬天明显比东京更冷、更干——如果你怕冷，十二月或一月出行更偏向东京。",
        "두 도시 모두 사계절이 뚜렷합니다. 하루 종일 걷기에는 봄(3월 말~4월)과 가을(10~11월)이 가장 편하고, 서울의 벚꽃은 보통 도쿄보다 1~2주 늦게 핍니다. 여름은 두 곳 모두 덥고 습하며 6~7월은 장마철이고, 도쿄는 늦여름부터 초가을까지 태풍 위험이 있습니다. 서울의 겨울은 도쿄보다 확연히 춥고 건조하므로, 추위가 싫다면 12월이나 1월 여행은 도쿄가 유리합니다.",
        "Ambas ciudades tienen cuatro estaciones claras. La primavera (finales de marzo a abril) y el otoño (octubre a noviembre) son las más cómodas para días largos a pie; los cerezos de Seúl suelen florecer una o dos semanas después que los de Tokio. El verano es caluroso y húmedo en ambas, con lluvias en junio y julio, y Tokio tiene riesgo de tifones de finales del verano a principios del otoño. Los inviernos de Seúl son bastante más fríos y secos: si no te gusta el frío, diciembre o enero favorecen a Tokio."
      )
    ),
    S(
      L("Getting there — and doing both", "怎么去，能不能两个都去", "가는 법 — 둘 다 갈 수 있을까", "Cómo llegar — y hacer las dos"),
      L(
        "Both are major long-haul hubs. Tokyo has two airports: Haneda is close to the city, while Narita is an hour or more away by train. Seoul's Incheon sits on an island west of the city, about an hour from the center by airport rail. The flight between Tokyo and Seoul is roughly two and a half hours, so combining both is realistic on a trip of eight nights or more. On a shorter trip, one city seen properly usually beats two half-seen ones.",
        "两地都是重要的长途航空枢纽。东京有两个机场：羽田离市区近，成田坐火车要一小时以上。首尔的仁川机场在城市西边的岛上，坐机场快线到市中心约一小时。东京和首尔之间飞行约两个半小时，所以八晚以上的行程可以两个都去。行程更短时，把一座城市看透，通常胜过两座都只看一半。",
        "두 도시 모두 주요 장거리 허브입니다. 도쿄에는 공항이 두 곳 있는데, 하네다는 시내와 가깝고 나리타는 기차로 1시간 이상 걸립니다. 서울의 인천공항은 도시 서쪽 섬에 있으며 공항철도로 도심까지 약 1시간입니다. 도쿄–서울 비행은 약 2시간 반이라 8박 이상이면 두 도시를 함께 묶을 만합니다. 일정이 짧다면 한 도시를 제대로 보는 편이 두 도시를 반씩 보는 것보다 대개 낫습니다.",
        "Ambas son grandes hubs de largo radio. Tokio tiene dos aeropuertos: Haneda está cerca de la ciudad y Narita a una hora o más en tren. Incheon, el aeropuerto de Seúl, está en una isla al oeste, a una hora del centro en tren. El vuelo entre Tokio y Seúl dura unas dos horas y media, así que combinar ambas es realista con ocho noches o más. En un viaje más corto, una ciudad bien vista suele ganar a dos vistas a medias."
      )
    ),
    S(
      L("Where to base yourself", "住在哪里", "어디에 묵을까", "Dónde alojarte"),
      L(
        "In Tokyo, a hotel near a station on or close to the JR Yamanote loop — Shinjuku, Shibuya, Ueno, or around Tokyo Station — keeps most neighborhoods a short ride away. In Seoul, first-timers often stay in Jung-gu around Myeongdong or City Hall for palaces and markets, in Hongdae for nightlife and a younger crowd, or in Gangnam if business or shopping comes first. Hills are part of Seoul's map, so check how far your hotel is from the subway exit.",
        "在东京，住在 JR 山手线沿线或附近的车站旁——新宿、涩谷、上野或东京站一带——大多数街区都只需短程换乘。在首尔，第一次去的人常住中区的明洞或市厅一带（方便去宫殿和市场），想要夜生活和年轻氛围就住弘大，以商务或购物为主就住江南。首尔地形有坡，订酒店前看一下离地铁出口有多远。",
        "도쿄에서는 JR 야마노테선 위나 근처 역 — 신주쿠, 시부야, 우에노, 도쿄역 주변 — 에 묵으면 대부분의 동네가 가깝습니다. 서울 첫 방문이라면 궁궐·시장 접근이 좋은 중구 명동·시청 일대, 나이트라이프와 젊은 분위기를 원하면 홍대, 비즈니스나 쇼핑이 우선이면 강남을 많이 고릅니다. 서울은 언덕이 많으니 호텔이 지하철 출구에서 얼마나 먼지 확인하세요.",
        "En Tokio, un hotel junto a una estación de la línea JR Yamanote o cerca — Shinjuku, Shibuya, Ueno o la zona de la estación de Tokio — deja casi todos los barrios a un trayecto corto. En Seúl, quien va por primera vez suele alojarse en Jung-gu, cerca de Myeongdong o el Ayuntamiento, para palacios y mercados; en Hongdae para vida nocturna y ambiente joven; o en Gangnam si mandan los negocios o las compras. Seúl tiene cuestas: mira a qué distancia está tu hotel de la salida del metro."
      )
    ),
    S(
      L("Who should skip both", "什么人两个都不适合", "둘 다 맞지 않는 경우", "Quién debería saltarse ambas"),
      L(
        "If the trip is mainly about beaches, resort rest, or warm winter weather, neither city is the right first answer. From a long-haul origin, trips of four nights or fewer lose a large share to jet lag in either city. And if crowds are on your Avoid list, both cities' cherry-blossom and autumn-leaf peaks will test it — run your real dates on Decide before you commit to either.",
        "如果这次主要是想去海滩、度假放松或冬天找温暖，两座城市都不是首选。从长途出发地过去，四晚或更短的行程会被时差吃掉一大块。如果你的「避开」里写了人多，两地的樱花季和红叶季高峰都会让你难受——先用真实日期在 Decide 跑一遍再定。",
        "해변, 리조트 휴식, 따뜻한 겨울 날씨가 목적이라면 두 도시 모두 첫 답이 아닙니다. 장거리 출발지에서 4박 이하라면 어느 쪽이든 시차에 많은 시간을 잃습니다. Avoid에 혼잡이 있다면 두 도시의 벚꽃·단풍 성수기가 부담이 됩니다 — 결정하기 전에 실제 날짜로 Decide를 돌려 보세요.",
        "Si el viaje va sobre todo de playa, descanso en resort o calor en invierno, ninguna de las dos es la primera respuesta. Desde un origen de largo radio, los viajes de cuatro noches o menos pierden mucho al jet lag en cualquiera de ellas. Y si las multitudes están en tu lista Avoid, los picos de cerezos y hojas de otoño la pondrán a prueba: usa tus fechas reales en Decide antes de elegir."
      )
    ),
  ],

  "tokyo-vs-taipei": [
    S(
      L("When to go", "什么时候去", "언제 갈까", "Cuándo ir"),
      L(
        "Taipei is subtropical: summers are hot and humid with afternoon storms, and typhoon season runs roughly from July to September. Winters are mild but often grey and damp. October to December and March to April are usually the most comfortable months. Tokyo is cooler overall, with a June–July rainy season and cold but often sunny winters. If you want warm evenings in December, Taipei has the edge; if you want crisp autumn colors, Tokyo in November is hard to beat.",
        "台北属亚热带气候：夏天湿热、午后常有雷阵雨，台风季大约在七到九月。冬天温和，但常常阴冷潮湿。十月到十二月、三月到四月通常最舒服。东京整体更凉，六七月是雨季，冬天冷但多晴天。想在十二月有温暖的夜晚，台北更占优；想看秋天的红叶，十一月的东京很难被超越。",
        "타이베이는 아열대 기후입니다. 여름은 덥고 습하며 오후 소나기가 잦고, 태풍 시즌은 대략 7~9월입니다. 겨울은 온화하지만 흐리고 눅눅한 날이 많습니다. 보통 10~12월과 3~4월이 가장 쾌적합니다. 도쿄는 전반적으로 더 서늘하며 6~7월 장마가 있고, 겨울은 춥지만 맑은 날이 많습니다. 12월에 따뜻한 저녁을 원하면 타이베이, 선명한 가을 단풍을 원하면 11월의 도쿄가 강합니다.",
        "Taipéi es subtropical: veranos calurosos y húmedos con tormentas por la tarde, y temporada de tifones aproximadamente de julio a septiembre. Los inviernos son suaves pero a menudo grises y húmedos. De octubre a diciembre y de marzo a abril suelen ser los meses más agradables. Tokio es más fresco en general, con lluvias en junio y julio e inviernos fríos pero a menudo soleados. Si quieres noches templadas en diciembre, gana Taipéi; si quieres colores de otoño, Tokio en noviembre es difícil de superar."
      )
    ),
    S(
      L("Getting there and between them", "怎么去，两地之间怎么走", "가는 법과 두 도시 사이 이동", "Cómo llegar y moverse entre ambas"),
      L(
        "Taipei has two airports: Taoyuan, about 40 minutes from Taipei Main Station on the airport MRT express, and Songshan, inside the city, which handles regional routes including flights to Tokyo Haneda. The flight between the two cities takes about three to four hours. From North America, Tokyo usually has more nonstop options; from parts of Southeast Asia, Taipei can be the shorter hop.",
        "台北有两个机场：桃园机场坐机场捷运直达车到台北车站约 40 分钟；松山机场就在市区，主要飞区域航线，包括飞东京羽田。两城之间飞行约三到四小时。从北美出发，东京的直飞选择通常更多；从东南亚部分地区出发，台北可能更近。",
        "타이베이에는 공항이 두 곳 있습니다. 타오위안 공항은 공항 MRT 직통으로 타이베이역까지 약 40분이고, 시내에 있는 쑹산 공항은 도쿄 하네다행을 포함한 지역 노선을 운항합니다. 두 도시 간 비행은 약 3~4시간입니다. 북미에서는 보통 도쿄 직항이 더 많고, 동남아 일부 지역에서는 타이베이가 더 가까울 수 있습니다.",
        "Taipéi tiene dos aeropuertos: Taoyuan, a unos 40 minutos de la estación central en el MRT exprés, y Songshan, dentro de la ciudad, con rutas regionales que incluyen vuelos a Tokio Haneda. El vuelo entre ambas ciudades dura de tres a cuatro horas. Desde Norteamérica, Tokio suele tener más vuelos directos; desde partes del sudeste asiático, Taipéi puede ser el salto más corto."
      )
    ),
    S(
      L("Where to stay and day trips", "住哪里，周边一日游", "숙소와 당일치기", "Dónde alojarte y excursiones"),
      L(
        "Taipei's MRT makes a base around Taipei Main Station, Zhongshan, or Da'an practical, and the city is compact enough to reach most night markets in under half an hour. Easy day or half-day trips include the hot springs of Beitou, Tamsui at the river mouth, and the hillside town of Jiufen. From Tokyo, classic day trips include Kamakura, Nikko, and Hakone — longer rides, but a very different side of Japan.",
        "台北捷运很方便，住在台北车站、中山或大安一带都实用；城市够紧凑，大多数夜市半小时内就能到。轻松的一日或半日游有北投温泉、淡水河口和山城九份。从东京出发，经典一日游有镰仓、日光和箱根——车程更长，但能看到日本很不一样的一面。",
        "타이베이는 MRT가 편리해 타이베이역, 중산, 다안 일대를 거점으로 삼기 좋고, 도시가 작아 대부분의 야시장에 30분 안에 닿습니다. 가벼운 당일·반나절 코스로는 베이터우 온천, 강 하구의 단수이, 산비탈 마을 지우펀이 있습니다. 도쿄에서는 가마쿠라, 닛코, 하코네가 대표적인 당일치기로, 이동은 길지만 일본의 전혀 다른 얼굴을 보여 줍니다.",
        "El MRT de Taipéi hace práctico alojarse cerca de la estación central, Zhongshan o Da'an, y la ciudad es tan compacta que la mayoría de los mercados nocturnos quedan a menos de media hora. Excursiones fáciles de un día o medio día: las aguas termales de Beitou, Tamsui en la desembocadura del río y el pueblo de montaña de Jiufen. Desde Tokio, las clásicas son Kamakura, Nikko y Hakone: trayectos más largos, pero otra cara de Japón."
      )
    ),
    S(
      L("How the budget usually behaves", "预算通常怎么花", "예산은 보통 어떻게 쓰일까", "Cómo suele comportarse el presupuesto"),
      L(
        "Without quoting prices: Taipei usually stretches a mid-range budget further, especially on food, because night markets and casual restaurants are central to the experience. Tokyo hotel rooms tend to be small, and central rates climb quickly in peak weeks, though everyday food can be good value. If the flights cost about the same from your origin, Taipei tends to leave room for an extra night or two.",
        "不报具体价格的话：台北通常能让中等预算走得更远，尤其是吃饭，因为夜市和平价餐馆本身就是体验的核心。东京的酒店房间普遍偏小，旺季时市中心房价涨得很快，不过日常餐饮可以很划算。如果从你的出发地飞两地的机票差不多，台北往往能多留出一两晚的预算。",
        "가격을 말하지 않더라도: 타이베이는 야시장과 캐주얼 식당이 경험의 중심이라 중간 예산이 특히 식비에서 더 오래 갑니다. 도쿄 호텔 객실은 작은 편이고 성수기 도심 요금이 빠르게 오르지만, 일상 식사는 가성비가 좋을 수 있습니다. 출발지에서 항공권 가격이 비슷하다면 타이베이가 하루이틀 더 묵을 여유를 남기는 경우가 많습니다.",
        "Sin citar precios: Taipéi suele estirar más un presupuesto medio, sobre todo en comida, porque los mercados nocturnos y los restaurantes informales son el centro de la experiencia. Las habitaciones de hotel en Tokio suelen ser pequeñas y las tarifas céntricas suben rápido en semanas pico, aunque la comida diaria puede salir bien de precio. Si los vuelos cuestan lo mismo desde tu origen, Taipéi suele dejar margen para una o dos noches más."
      )
    ),
  ],

  "hong-kong-vs-tokyo": [
    S(
      L("When to go", "什么时候去", "언제 갈까", "Cuándo ir"),
      L(
        "Hong Kong is most comfortable from October to December, when humidity drops and skies are often clearer for harbour views. Spring can be foggy and humid, and summer brings heat, heavy rain, and typhoon signals that can pause ferries and outdoor plans. Tokyo is at its best in spring and autumn, has a rainy season in June and July, and stays cold but bright in winter. In December, Hong Kong is mild while Tokyo needs a proper coat.",
        "香港最舒服的是十月到十二月，湿度下降，看维港的天空也更通透。春天常有雾、很潮湿；夏天炎热多雨，台风信号可能让渡轮和户外计划暂停。东京最好的季节是春秋两季，六七月是雨季，冬天冷但晴朗。十二月去，香港温和，东京则需要一件像样的大衣。",
        "홍콩은 습도가 내려가고 항구 전망이 맑아지는 10~12월이 가장 쾌적합니다. 봄은 안개가 끼고 습하며, 여름은 덥고 비가 많고 태풍 신호로 페리와 야외 일정이 멈출 수 있습니다. 도쿄는 봄과 가을이 가장 좋고 6~7월은 장마철이며 겨울은 춥지만 맑습니다. 12월이라면 홍콩은 온화하고 도쿄는 제대로 된 코트가 필요합니다.",
        "Hong Kong es más agradable de octubre a diciembre, cuando baja la humedad y el cielo suele estar más limpio para ver la bahía. La primavera puede ser brumosa y húmeda, y el verano trae calor, lluvias fuertes y alertas de tifón que pueden detener ferris y planes al aire libre. Tokio está en su mejor momento en primavera y otoño, tiene lluvias en junio y julio y un invierno frío pero luminoso. En diciembre, Hong Kong es templado y Tokio pide un buen abrigo."
      )
    ),
    S(
      L("How many days each city needs", "各需要几天", "도시별로 며칠이 필요할까", "Cuántos días pide cada ciudad"),
      L(
        "Hong Kong is compact: three to four days covers the harbour, the Peak, a few Kowloon and Island neighborhoods, and one outlying island or hiking trail. Tokyo rewards five days or more, because each district — Asakusa, Shibuya, Shinjuku, Ginza, the western neighborhoods — feels like its own trip. If you only have a long weekend, Hong Kong usually gives the more complete picture.",
        "香港很紧凑：三到四天就能看维港、山顶、几个九龙和港岛的街区，再加一个离岛或一条行山径。东京值得五天以上，因为每个区——浅草、涩谷、新宿、银座、西边的住宅街区——都像一趟独立的旅行。如果只有一个长周末，香港通常能给你更完整的印象。",
        "홍콩은 작습니다. 3~4일이면 항구, 피크, 구룡과 홍콩섬의 몇몇 동네, 그리고 외딴섬 하나나 하이킹 코스 하나를 볼 수 있습니다. 도쿄는 5일 이상이 좋습니다. 아사쿠사, 시부야, 신주쿠, 긴자, 서쪽 주택가 등 지역마다 별개의 여행처럼 느껴지기 때문입니다. 긴 주말뿐이라면 보통 홍콩이 더 완성된 그림을 줍니다.",
        "Hong Kong es compacto: tres o cuatro días cubren la bahía, el Peak, algunos barrios de Kowloon y de la Isla, y una isla exterior o un sendero. Tokio pide cinco días o más, porque cada distrito — Asakusa, Shibuya, Shinjuku, Ginza, los barrios del oeste — se siente como un viaje propio. Si solo tienes un fin de semana largo, Hong Kong suele dar la imagen más completa."
      )
    ),
    S(
      L("Getting around", "市内交通", "시내 이동", "Moverse por la ciudad"),
      L(
        "Hong Kong's Airport Express reaches Central in under half an hour, and the MTR, trams, and Star Ferry cover most first-trip routes; an Octopus card works across almost all of them. Tokyo's rail network is larger and run by several companies, but a rechargeable IC card such as Suica or PASMO handles almost every train and bus. Expect more transfers and longer station walks in Tokyo.",
        "香港机场快线到中环不到半小时，港铁、电车和天星小轮能覆盖第一次来的大多数路线，一张八达通几乎通用。东京的铁路网更大、由多家公司运营，但一张 Suica 或 PASMO 这类可充值 IC 卡几乎能搭所有电车和巴士。在东京要预期更多换乘和更长的站内步行。",
        "홍콩 공항철도(Airport Express)는 30분 안에 센트럴에 닿고, MTR·트램·스타페리로 첫 여행 동선 대부분을 커버하며 옥토퍼스 카드 하나로 거의 다 됩니다. 도쿄 철도망은 더 크고 여러 회사가 운영하지만, Suica나 PASMO 같은 충전식 IC 카드로 거의 모든 열차와 버스를 탈 수 있습니다. 도쿄에서는 환승과 역 안 도보가 더 많다고 보세요.",
        "El Airport Express de Hong Kong llega a Central en menos de media hora, y el MTR, los tranvías y el Star Ferry cubren casi todas las rutas de un primer viaje; la tarjeta Octopus sirve en casi todos. La red ferroviaria de Tokio es mayor y la operan varias compañías, pero una tarjeta IC recargable como Suica o PASMO sirve en casi todos los trenes y autobuses. Cuenta con más transbordos y caminatas dentro de las estaciones en Tokio."
      )
    ),
    S(
      L("Doing both — and who should skip", "两个都去，以及什么人不适合", "둘 다 가기 — 그리고 맞지 않는 경우", "Hacer las dos — y quién debería saltárselas"),
      L(
        "The flight between Hong Kong and Tokyo takes roughly four to five hours, so pairing them works best on trips of nine nights or more. Skip Hong Kong if steep stairs, crowds, and humidity are on your Avoid list. Skip Tokyo if the trip is very short from a long-haul origin and you will spend most of it adjusting to the time zone.",
        "香港和东京之间飞行约四到五小时，所以九晚以上的行程才比较适合两地连玩。如果你的「避开」里有陡坡楼梯、人多和潮湿，就别选香港。如果从长途出发地过去、行程又很短、大半时间都在倒时差，就别选东京。",
        "홍콩–도쿄 비행은 약 4~5시간이라 9박 이상일 때 두 도시를 묶기 좋습니다. Avoid에 가파른 계단, 혼잡, 습도가 있다면 홍콩은 건너뛰세요. 장거리 출발에 일정이 아주 짧아 대부분을 시차 적응에 쓰게 된다면 도쿄는 건너뛰세요.",
        "El vuelo entre Hong Kong y Tokio dura unas cuatro o cinco horas, así que combinarlas funciona mejor con nueve noches o más. Sáltate Hong Kong si las escaleras empinadas, las multitudes y la humedad están en tu lista Avoid. Sáltate Tokio si el viaje es muy corto desde un origen lejano y pasarás la mayor parte adaptándote al horario."
      )
    ),
  ],

  "hong-kong-vs-singapore": [
    S(
      L("When to go", "什么时候去", "언제 갈까", "Cuándo ir"),
      L(
        "Singapore sits near the equator: hot and humid all year, with heavy showers that usually pass quickly, and a wetter northeast monsoon from about December to early March. There is no cool season to wait for. Hong Kong has real seasons: October to December is the most pleasant, summer is hot and stormy, and winter evenings can be cool enough for a jacket. If your dates fall in Hong Kong's autumn, it usually wins on comfort.",
        "新加坡靠近赤道：全年湿热，阵雨大但通常很快过去，大约十二月到三月初是较潮湿的东北季风期。那里没有凉爽的季节可等。香港则四季分明：十月到十二月最舒服，夏天炎热多风暴，冬天晚上可能要穿外套。如果你的日期落在香港的秋天，舒适度上香港通常胜出。",
        "싱가포르는 적도 근처라 일 년 내내 덥고 습하며, 소나기가 세지만 대개 금방 지나가고, 대략 12월부터 3월 초까지는 비가 많은 북동 몬순 시기입니다. 기다릴 만한 선선한 계절은 없습니다. 홍콩은 계절이 뚜렷해 10~12월이 가장 쾌적하고, 여름은 덥고 폭풍이 잦으며, 겨울 저녁에는 겉옷이 필요할 수 있습니다. 날짜가 홍콩의 가을이라면 쾌적함에서는 보통 홍콩이 이깁니다.",
        "Singapur está cerca del ecuador: calor y humedad todo el año, chubascos fuertes que suelen pasar rápido y un monzón del noreste más lluvioso de diciembre a principios de marzo, aproximadamente. No hay estación fresca que esperar. Hong Kong sí tiene estaciones: de octubre a diciembre es lo más agradable, el verano es caluroso y tormentoso y las noches de invierno pueden pedir chaqueta. Si tus fechas caen en el otoño de Hong Kong, suele ganar en comodidad."
      )
    ),
    S(
      L("Getting around and the first day", "交通和第一天", "이동과 첫날", "Moverse y el primer día"),
      L(
        "Both cities are easy without a car. Singapore's MRT is clean and clearly signed, and Changi Airport is roughly 30 to 40 minutes from the center by train or taxi. Hong Kong's MTR, trams, and ferries are just as efficient, but the city is more vertical — stairs, escalators, and footbridges are part of every walk. Travelers with heavy luggage or limited mobility often find Singapore's first day smoother.",
        "两座城市不开车都很方便。新加坡地铁干净、指示清楚，樟宜机场坐地铁或出租车到市中心约 30 到 40 分钟。香港的港铁、电车和渡轮同样高效，但城市更「立体」——楼梯、扶梯和天桥是每段步行的一部分。拖着重行李或行动不便的旅客，通常会觉得新加坡的第一天更顺。",
        "두 도시 모두 차 없이 편합니다. 싱가포르 MRT는 깨끗하고 안내가 명확하며, 창이 공항에서 도심까지 기차나 택시로 약 30~40분입니다. 홍콩의 MTR, 트램, 페리도 똑같이 효율적이지만 도시가 더 입체적이라 계단, 에스컬레이터, 육교가 모든 도보의 일부입니다. 짐이 무겁거나 거동이 불편한 여행자는 대개 싱가포르의 첫날이 더 수월하다고 느낍니다.",
        "Ambas ciudades son fáciles sin coche. El MRT de Singapur es limpio y está bien señalizado, y Changi queda a unos 30 o 40 minutos del centro en tren o taxi. El MTR, los tranvías y los ferris de Hong Kong son igual de eficientes, pero la ciudad es más vertical: escaleras, escaleras mecánicas y pasarelas forman parte de cada paseo. Quien lleva equipaje pesado o tiene movilidad limitada suele encontrar más fácil el primer día en Singapur."
      )
    ),
    S(
      L("Two different food cultures", "两种不同的饮食文化", "서로 다른 두 음식 문화", "Dos culturas gastronómicas distintas"),
      L(
        "Singapore's everyday food centers on hawker centres, where many cuisines share one roof and ordering is straightforward. Hong Kong's strength is Cantonese depth: dim sum, roast meats, cha chaan teng cafés, and dense street-level eating in neighborhoods such as Mong Kok, Sham Shui Po, or Sheung Wan. Choose by the kind of eating you enjoy, not by which city is “better for food.”",
        "新加坡的日常饮食以小贩中心为核心，多种菜系集中在一个屋檐下，点餐也简单。香港的长处是粤菜的深度：点心、烧味、茶餐厅，以及旺角、深水埗、上环这些街区里密集的街头饮食。按你喜欢的吃法来选，而不是看哪座城市「更好吃」。",
        "싱가포르의 일상 음식은 여러 요리가 한 지붕 아래 모인 호커센터가 중심이고 주문도 쉽습니다. 홍콩의 강점은 광둥 요리의 깊이로, 딤섬, 구운 고기, 차찬텡, 그리고 몽콕, 삼수이포, 셩완 같은 동네의 빽빽한 길거리 식문화입니다. 어느 도시가 ‘더 맛있나’가 아니라 좋아하는 먹는 방식으로 고르세요.",
        "La comida diaria de Singapur gira en torno a los hawker centres, donde muchas cocinas comparten techo y pedir es sencillo. La fuerza de Hong Kong es la profundidad cantonesa: dim sum, carnes asadas, cafés cha chaan teng y comida callejera densa en barrios como Mong Kok, Sham Shui Po o Sheung Wan. Elige por el tipo de comida que disfrutas, no por qué ciudad es “mejor para comer”."
      )
    ),
    S(
      L("Doing both — and who should skip", "两个都去，以及什么人不适合", "둘 다 가기 — 그리고 맞지 않는 경우", "Hacer las dos — y quién debería saltárselas"),
      L(
        "The flight between the two takes about four hours, so they combine well on a week-long trip in the region. Skip Singapore if you want rough edges and late-night street energy every evening. Skip Hong Kong if humidity, stairs, and crowds are firm Avoid items. For families with young children, Singapore's parks and easy logistics often settle the decision.",
        "两地之间飞行约四小时，一周左右的区域行程可以两地连玩。如果你每天晚上都想要粗粝的街头夜生活，就别选新加坡。如果潮湿、楼梯和人多是你明确要避开的，就别选香港。带小孩的家庭，新加坡的公园和省心的交通常常直接决定了结果。",
        "두 도시 사이 비행은 약 4시간이라 일주일 정도의 지역 여행에서 함께 묶기 좋습니다. 매일 밤 거친 길거리 에너지를 원한다면 싱가포르는 건너뛰세요. 습도, 계단, 혼잡이 확실한 Avoid 항목이라면 홍콩은 건너뛰세요. 어린 자녀가 있는 가족이라면 싱가포르의 공원과 편한 동선이 결정을 정해 주는 경우가 많습니다.",
        "El vuelo entre ambas dura unas cuatro horas, así que se combinan bien en un viaje de una semana por la región. Sáltate Singapur si quieres aristas y energía callejera nocturna cada noche. Sáltate Hong Kong si la humedad, las escaleras y las multitudes son elementos firmes de tu Avoid. Para familias con niños pequeños, los parques y la logística fácil de Singapur suelen decidir."
      )
    ),
  ],

  "lisbon-vs-barcelona": [
    S(
      L("When to go", "什么时候去", "언제 갈까", "Cuándo ir"),
      L(
        "Both cities are pleasant from April to June and from September to October. July and August bring the biggest crowds and the highest hotel demand, and Barcelona's beaches and headline sights feel it most. Lisbon's winters are mild but wetter, with fewer visitors; Barcelona's winters are mild and often sunnier. If you dislike crowds, the shoulder months matter more in Barcelona than in Lisbon.",
        "两座城市四到六月、九到十月都很舒服。七八月人最多、酒店最紧，巴塞罗那的海滩和热门景点感受最明显。里斯本冬天温和但雨水更多，游客也更少；巴塞罗那冬天温和，晴天往往更多。如果你怕人多，选肩季对巴塞罗那比对里斯本更重要。",
        "두 도시 모두 4~6월과 9~10월이 쾌적합니다. 7~8월은 인파와 숙소 수요가 가장 많고, 바르셀로나의 해변과 대표 명소가 특히 붐빕니다. 리스본의 겨울은 온화하지만 비가 더 많고 방문객이 적으며, 바르셀로나의 겨울은 온화하고 맑은 날이 더 많은 편입니다. 혼잡이 싫다면 어깨 시즌의 중요성은 리스본보다 바르셀로나에서 더 큽니다.",
        "Ambas ciudades son agradables de abril a junio y de septiembre a octubre. Julio y agosto traen las mayores multitudes y la mayor demanda hotelera, y las playas y monumentos estrella de Barcelona son los que más lo notan. Los inviernos de Lisboa son suaves pero más lluviosos y con menos visitantes; los de Barcelona, suaves y a menudo más soleados. Si no te gustan las multitudes, la temporada media importa más en Barcelona que en Lisboa."
      )
    ),
    S(
      L("Getting around", "市内交通", "시내 이동", "Moverse por la ciudad"),
      L(
        "Lisbon's airport is unusually close to the center — roughly 20 to 30 minutes by metro or taxi. Barcelona's El Prat is about 30 to 40 minutes away by train, bus, or taxi. Lisbon is hilly: trams, funiculars, and street elevators help, but expect steep cobbled streets. Central Barcelona is mostly flat, and the Eixample's grid makes long walks easy.",
        "里斯本机场离市中心特别近，坐地铁或出租车大约 20 到 30 分钟。巴塞罗那的普拉特机场坐火车、巴士或出租车约 30 到 40 分钟。里斯本多坡：有轨电车、缆索铁路和街头升降机能帮忙，但要预期陡峭的石板路。巴塞罗那市中心基本平坦，扩展区的棋盘格街道让长距离步行很轻松。",
        "리스본 공항은 도심과 유난히 가까워 지하철이나 택시로 약 20~30분입니다. 바르셀로나 엘프라트 공항은 기차, 버스, 택시로 약 30~40분입니다. 리스본은 언덕이 많아 트램, 푸니쿨라, 거리 엘리베이터가 도움이 되지만 가파른 돌길을 각오하세요. 바르셀로나 중심부는 대체로 평지이고 에이샴플레의 바둑판 도로 덕분에 오래 걸어도 편합니다.",
        "El aeropuerto de Lisboa está muy cerca del centro: unos 20 o 30 minutos en metro o taxi. El Prat, en Barcelona, queda a unos 30 o 40 minutos en tren, autobús o taxi. Lisboa tiene colinas: tranvías, funiculares y ascensores urbanos ayudan, pero cuenta con calles empedradas empinadas. El centro de Barcelona es casi llano, y la cuadrícula del Eixample hace fáciles los paseos largos."
      )
    ),
    S(
      L("Food and evenings", "吃饭和夜晚", "음식과 저녁", "Comida y noches"),
      L(
        "Lisbon's food leans on grilled fish, seafood, and pastry shops, and dinner starts a little earlier than in Spain; neighborhoods such as Bairro Alto get lively late. Barcelona eats later — dinner after 9 pm is normal — and its markets and tapas bars make grazing through the evening easy. If your group prefers early dinners, Lisbon fits more naturally; if you like long, late evenings out, Barcelona does.",
        "里斯本的饮食以烤鱼、海鲜和糕点店为主，晚饭比西班牙稍早开始；上城区这样的街区到深夜才热闹。巴塞罗那吃得更晚——九点后吃晚饭很正常——市场和小吃吧让整晚边走边吃很容易。如果你们习惯早点吃晚饭，里斯本更自然；如果喜欢在外面待到很晚，巴塞罗那更合适。",
        "리스본 음식은 생선구이, 해산물, 제과점이 중심이고 저녁 식사는 스페인보다 조금 이르게 시작하며, 바이루 알투 같은 동네는 늦게까지 활기찹니다. 바르셀로나는 더 늦게 먹어 밤 9시 이후 저녁이 보통이고, 시장과 타파스 바 덕분에 저녁 내내 조금씩 먹으며 다니기 쉽습니다. 일행이 이른 저녁을 선호하면 리스본이, 늦게까지 밖에 있는 걸 좋아하면 바르셀로나가 더 자연스럽습니다.",
        "La comida de Lisboa se apoya en pescado a la parrilla, marisco y pastelerías, y la cena empieza algo antes que en España; barrios como el Bairro Alto se animan tarde. Barcelona cena más tarde — después de las 21:00 es lo normal — y sus mercados y bares de tapas facilitan picar toda la noche. Si tu grupo prefiere cenar pronto, Lisboa encaja mejor; si te gustan las noches largas, Barcelona."
      )
    ),
    S(
      L("Day trips and doing both", "周边一日游，以及两个都去", "당일치기와 두 도시 묶기", "Excursiones y hacer las dos"),
      L(
        "From Lisbon, Sintra and Cascais are easy day trips by train. From Barcelona, Montserrat and Girona are the popular choices. The two cities are about a two-hour flight apart, so pairing them works on a trip of seven nights or more; overland, the journey is long and rarely worth it on a short trip.",
        "从里斯本出发，坐火车去辛特拉和卡斯凯什都是轻松的一日游。从巴塞罗那出发，蒙特塞拉特和赫罗纳最受欢迎。两城之间飞行约两小时，七晚以上的行程适合两地连玩；走陆路耗时很长，短途行程很少值得。",
        "리스본에서는 기차로 신트라와 카스카이스에 쉽게 당일치기할 수 있습니다. 바르셀로나에서는 몬세라트와 지로나가 인기입니다. 두 도시는 비행기로 약 2시간 거리라 7박 이상이면 함께 묶을 만하고, 육로는 오래 걸려 짧은 일정에서는 거의 가치가 없습니다.",
        "Desde Lisboa, Sintra y Cascais son excursiones fáciles en tren. Desde Barcelona, Montserrat y Girona son las más populares. Las dos ciudades están a unas dos horas de vuelo, así que combinarlas funciona con siete noches o más; por tierra el trayecto es largo y rara vez compensa en un viaje corto."
      )
    ),
    S(
      L("Who should skip which", "什么人该跳过哪一个", "누가 어느 쪽을 건너뛸까", "Quién debería saltarse cuál"),
      L(
        "Skip Lisbon if steep hills are a real problem for someone in your group. Skip Barcelona if peak-season crowds are on your Avoid list and your dates fall in summer. Neither city is the right pick if you want reliable swimming weather between November and March.",
        "如果同行有人确实爬不了陡坡，就别选里斯本。如果你的「避开」里有旺季人潮、日期又在夏天，就别选巴塞罗那。如果你想在十一月到三月之间稳定地下海游泳，两座城市都不合适。",
        "일행 중 가파른 언덕이 정말 힘든 사람이 있다면 리스본은 건너뛰세요. Avoid에 성수기 인파가 있고 날짜가 여름이라면 바르셀로나는 건너뛰세요. 11월부터 3월 사이에 확실한 수영 날씨를 원한다면 두 도시 모두 맞지 않습니다.",
        "Sáltate Lisboa si las cuestas empinadas son un problema real para alguien del grupo. Sáltate Barcelona si las multitudes de temporada alta están en tu Avoid y tus fechas caen en verano. Ninguna de las dos es la elección correcta si quieres tiempo fiable para bañarte entre noviembre y marzo."
      )
    ),
  ],

  "new-orleans-vs-los-cabos": [
    S(
      L("When to go", "什么时候去", "언제 갈까", "Cuándo ir"),
      L(
        "New Orleans is most comfortable from late October to April; summers are hot and very humid, and Atlantic hurricane season runs from June to November. Mardi Gras (February or early March, depending on the year) brings huge crowds and higher hotel demand. Los Cabos is warm and dry most of the year, with the most visitors in winter and spring; the Pacific hurricane season runs from mid-May to November, with the highest risk from August to October.",
        "新奥尔良最舒服的是十月下旬到四月；夏天炎热且非常潮湿，大西洋飓风季是六月到十一月。狂欢节（按年份在二月或三月初）会带来巨大人潮和更紧的酒店。洛斯卡沃斯大部分时间温暖干燥，冬春两季游客最多；太平洋飓风季从五月中到十一月，八到十月风险最高。",
        "뉴올리언스는 10월 말부터 4월까지가 가장 쾌적합니다. 여름은 덥고 매우 습하며, 대서양 허리케인 시즌은 6~11월입니다. 마르디 그라(해마다 2월 또는 3월 초)에는 엄청난 인파와 높은 숙소 수요가 몰립니다. 로스카보스는 연중 대부분 따뜻하고 건조하며 겨울과 봄에 방문객이 가장 많고, 태평양 허리케인 시즌은 5월 중순부터 11월까지로 8~10월에 위험이 가장 큽니다.",
        "Nueva Orleans es más agradable de finales de octubre a abril; los veranos son calurosos y muy húmedos, y la temporada de huracanes del Atlántico va de junio a noviembre. El Mardi Gras (febrero o principios de marzo, según el año) trae enormes multitudes y más demanda hotelera. Los Cabos es cálido y seco casi todo el año, con más visitantes en invierno y primavera; la temporada de huracanes del Pacífico va de mediados de mayo a noviembre, con el mayor riesgo de agosto a octubre."
      )
    ),
    S(
      L("Getting there and around", "怎么去，怎么走", "가는 법과 이동", "Cómo llegar y moverse"),
      L(
        "New Orleans' main airport is about 25 to 40 minutes from the French Quarter by car. Many first-time visitors stay in or near the French Quarter, the Marigny, or the Garden District and get around on foot or by streetcar. Los Cabos International sits near San José del Cabo; Cabo San Lucas is roughly 45 minutes away, and most trips need taxis, shuttles, or a rental car to move between the two towns and the hotel Corridor.",
        "新奥尔良主机场开车到法国区约 25 到 40 分钟。很多第一次来的人住在法国区、马里尼区或花园区附近，步行或坐有轨电车出行。洛斯卡沃斯国际机场在圣何塞德尔卡沃附近，到卡沃圣卢卡斯约 45 分钟；大多数行程需要出租车、接驳车或租车，才能在两个小镇和酒店走廊区之间移动。",
        "뉴올리언스 주 공항은 차로 프렌치 쿼터까지 약 25~40분입니다. 첫 방문객은 프렌치 쿼터, 마리니, 가든 디스트릭트 근처에 묵고 걷거나 스트리트카로 다니는 경우가 많습니다. 로스카보스 국제공항은 산호세델카보 근처에 있고 카보산루카스까지는 약 45분이며, 두 마을과 호텔 코리도르 사이를 오가려면 대부분 택시, 셔틀, 렌터카가 필요합니다.",
        "El aeropuerto principal de Nueva Orleans está a unos 25 a 40 minutos del Barrio Francés en coche. Muchos visitantes primerizos se alojan en el Barrio Francés, el Marigny o el Garden District y se mueven a pie o en tranvía. El aeropuerto de Los Cabos está cerca de San José del Cabo; Cabo San Lucas queda a unos 45 minutos, y la mayoría de los viajes necesitan taxis, traslados o coche de alquiler para moverse entre los dos pueblos y el Corredor hotelero."
      )
    ),
    S(
      L("What kind of trip each one is", "两地分别适合什么样的行程", "각각 어떤 여행인가", "Qué tipo de viaje es cada una"),
      L(
        "New Orleans fits a three-to-four-night city break built around food, music, and walking. Los Cabos fits a slower stay of four nights or more, where the hotel or the beach is part of the point. Swimming conditions vary a lot: some Cabo beaches have strong surf and currents, so check which beaches are safe for swimming before you plan water days.",
        "新奥尔良适合三到四晚、以美食、音乐和步行为主的城市短途。洛斯卡沃斯适合四晚以上的慢节奏度假，酒店和海滩本身就是目的的一部分。各海滩的游泳条件差别很大：卡沃有些海滩浪大、暗流强，安排下水那天之前先查清哪些海滩适合游泳。",
        "뉴올리언스는 음식, 음악, 걷기를 중심으로 한 3~4박 도시 여행에 맞습니다. 로스카보스는 호텔이나 해변 자체가 목적인 4박 이상의 느린 여행에 맞습니다. 수영 조건은 해변마다 크게 다릅니다. 카보의 일부 해변은 파도와 조류가 강하니 물놀이 일정을 잡기 전에 수영 가능한 해변인지 확인하세요.",
        "Nueva Orleans encaja en una escapada urbana de tres o cuatro noches centrada en comida, música y caminar. Los Cabos encaja en una estancia más lenta de cuatro noches o más, donde el hotel o la playa son parte del objetivo. Las condiciones para nadar varían mucho: algunas playas de Cabo tienen oleaje y corrientes fuertes, así que comprueba cuáles son aptas para el baño antes de planear días de agua."
      )
    ),
    S(
      L("Who should skip which", "什么人该跳过哪一个", "누가 어느 쪽을 건너뛸까", "Quién debería saltarse cuál"),
      L(
        "Skip New Orleans if late nights, noise, and summer humidity are on your Avoid list, or if your dates fall in peak hurricane months and your plans cannot move. Skip Los Cabos if you want to walk everywhere without a car, or if the trip is mainly about museums and city culture.",
        "如果你的「避开」里有熬夜、吵闹和夏季潮湿，或者日期落在飓风高发月份而行程又无法调整，就别选新奥尔良。如果你想不开车全程步行，或者这次主要是看博物馆和城市文化，就别选洛斯卡沃斯。",
        "Avoid에 늦은 밤, 소음, 여름 습도가 있거나, 날짜가 허리케인 절정기인데 일정을 바꿀 수 없다면 뉴올리언스는 건너뛰세요. 차 없이 어디든 걸어 다니고 싶거나 여행 목적이 주로 박물관과 도시 문화라면 로스카보스는 건너뛰세요.",
        "Sáltate Nueva Orleans si las noches largas, el ruido y la humedad del verano están en tu Avoid, o si tus fechas caen en los meses fuertes de huracanes y no puedes mover el viaje. Sáltate Los Cabos si quieres ir a pie a todas partes sin coche, o si el viaje va sobre todo de museos y cultura urbana."
      )
    ),
  ],
}

export function getCompareSections(slug: string): ContentSection[] {
  return compareSections[slug] ?? []
}
