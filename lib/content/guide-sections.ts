import type { ContentSection, Localized } from "@/lib/content/types"

const L = (en: string, zh: string, ko: string, es: string): Localized => ({ en, zh, ko, es })
const S = (heading: Localized, body: Localized): ContentSection => ({ heading, body })

/**
 * Evergreen decision context per guide page. Stable patterns only — no prices, schedules, or
 * “best of” rankings (ADR 0009). Guides answer first, then send readers to /decide.
 */
export const guideSections: Record<string, ContentSection[]> = {
  "where-to-travel-in-november": [
    S(
      L("What November weather looks like by region", "十一月各地区的天气大致如何", "지역별 11월 날씨", "Cómo es el clima de noviembre por región"),
      L(
        "In northern East Asia, Tokyo and Seoul turn cool and often clear, with autumn leaves; Seoul gets properly cold by the end of the month. Subtropical cities such as Taipei and Hong Kong are mild to warm and usually drier than in summer — for Hong Kong, it is one of the best stretches of the year. In southern Europe, Lisbon and Barcelona have mild days but more rain and shorter light than in early autumn. On Mexico's Pacific coast, Los Cabos is warm and past its peak storm months.",
        "东亚北部的东京和首尔转凉，常有晴天和红叶；到月底首尔就真正冷起来了。台北、香港这类亚热带城市温和到温暖，通常比夏天干爽——对香港来说，这是一年中最好的时段之一。南欧的里斯本和巴塞罗那白天温和，但比初秋雨多、日照也更短。墨西哥太平洋沿岸的洛斯卡沃斯温暖，风暴高峰月份已过。",
        "동아시아 북부의 도쿄와 서울은 선선하고 맑은 날이 많으며 단풍이 들고, 월말이면 서울은 제법 춥습니다. 타이베이와 홍콩 같은 아열대 도시는 온화하거나 따뜻하고 보통 여름보다 건조하며, 홍콩에게는 일 년 중 가장 좋은 시기 중 하나입니다. 남유럽의 리스본과 바르셀로나는 낮은 온화하지만 초가을보다 비가 많고 해가 짧습니다. 멕시코 태평양 연안의 로스카보스는 따뜻하고 폭풍 절정기를 지났습니다.",
        "En el norte de Asia oriental, Tokio y Seúl se vuelven frescas y a menudo despejadas, con hojas de otoño; a final de mes Seúl ya hace frío de verdad. Las ciudades subtropicales como Taipéi y Hong Kong son templadas o cálidas y suelen ser más secas que en verano: para Hong Kong es uno de los mejores tramos del año. En el sur de Europa, Lisboa y Barcelona tienen días suaves pero más lluvia y menos luz que a principios de otoño. En la costa pacífica de México, Los Cabos es cálido y ya pasó sus meses de más tormentas."
      )
    ),
    S(
      L("Holidays that move crowds and prices", "影响人流和价格的节假日", "인파와 가격을 움직이는 휴일", "Fiestas que mueven multitudes y precios"),
      L(
        "U.S. Thanksgiving, on the fourth Thursday of November, pushes up domestic flight demand that week and the following weekend. In Mexico, Día de Muertos at the start of the month draws visitors to Mexico City and other cities. In Japan, the autumn-leaf season brings weekend crowds to popular gardens and temples, especially in the second half of the month. If your dates overlap one of these, add crowds to Avoid or move the trip by a few days.",
        "美国感恩节在十一月第四个星期四，那一周和随后的周末国内航班需求会上涨。墨西哥月初的亡灵节会把游客吸引到墨西哥城等城市。日本的红叶季会让热门庭园和寺庙在周末人满为患，尤其是下半月。如果你的日期撞上其中之一，就在「避开」里写上人多，或者把行程挪几天。",
        "미국 추수감사절(11월 넷째 목요일)에는 그 주와 이어지는 주말에 국내선 수요가 오릅니다. 멕시코에서는 월초의 ‘죽은 자의 날’이 멕시코시티 등으로 방문객을 끌어들입니다. 일본은 단풍철에 유명 정원과 사찰이 주말마다 붐비며, 특히 하순에 심합니다. 날짜가 이 중 하나와 겹치면 Avoid에 혼잡을 넣거나 일정을 며칠 옮기세요.",
        "El Día de Acción de Gracias en EE. UU., el cuarto jueves de noviembre, eleva la demanda de vuelos domésticos esa semana y el fin de semana siguiente. En México, el Día de Muertos a principios de mes atrae visitantes a Ciudad de México y otras ciudades. En Japón, la temporada de hojas de otoño llena jardines y templos populares los fines de semana, sobre todo en la segunda mitad del mes. Si tus fechas coinciden, añade multitudes a Avoid o mueve el viaje unos días."
      )
    ),
    S(
      L("Shorter days change the plan", "白天变短会改变行程", "짧아진 낮이 계획을 바꾼다", "Los días más cortos cambian el plan"),
      L(
        "Late in the month, the sun sets around 4:30 pm in Tokyo and a little after 5 pm in Lisbon. That leaves fewer hours for viewpoints, hikes, and outdoor photos, so put outdoor sights early and keep museums, markets, and food for the evening. Cities with good nightlife or night markets — Taipei, Hong Kong, Seoul — handle the early dark better than places where the main draw is daylight scenery.",
        "到了月底，东京下午四点半左右日落，里斯本五点刚过就天黑。看景点、徒步、户外拍照的时间变少了，所以户外景点放在上午，博物馆、市场和吃饭留到傍晚。有好夜生活或夜市的城市——台北、香港、首尔——比主要靠白天风景的地方更能适应早天黑。",
        "월말이면 도쿄는 오후 4시 반쯤, 리스본은 5시가 조금 넘어 해가 집니다. 전망대, 하이킹, 야외 사진에 쓸 시간이 줄어드니 야외 명소는 이른 시간에 두고 박물관, 시장, 식사는 저녁으로 미루세요. 타이베이, 홍콩, 서울처럼 밤 문화나 야시장이 좋은 도시는 낮 풍경이 핵심인 곳보다 이른 어둠에 잘 버팁니다.",
        "A final de mes, el sol se pone hacia las 16:30 en Tokio y poco después de las 17:00 en Lisboa. Quedan menos horas para miradores, caminatas y fotos al aire libre, así que pon lo exterior temprano y deja museos, mercados y comida para la tarde. Las ciudades con buena vida nocturna o mercados nocturnos — Taipéi, Hong Kong, Seúl — llevan mejor la oscuridad temprana que los lugares cuyo atractivo es el paisaje diurno."
      )
    ),
    S(
      L("Who November does not suit", "十一月不适合谁", "11월이 맞지 않는 사람", "A quién no le va noviembre"),
      L(
        "If you want reliable sea swimming in southern Europe, November is too late. If you want skiing, most resorts in the northern hemisphere do not open fully until December. And if the trip is really about long golden evenings outdoors, choose a destination much closer to the equator — or a different month.",
        "如果你想在南欧稳定下海游泳，十一月太晚了。如果想滑雪，北半球大多数雪场要到十二月才全面开放。如果这次旅行的重点就是户外漫长的金色傍晚，那就选离赤道近得多的地方——或者换个月份。",
        "남유럽에서 확실하게 바다 수영을 하고 싶다면 11월은 너무 늦습니다. 스키를 원한다면 북반구 스키장 대부분은 12월이 되어야 전면 개장합니다. 그리고 야외에서 긴 황금빛 저녁을 보내는 것이 목적이라면 적도에 훨씬 가까운 곳을 고르거나 다른 달을 고르세요.",
        "Si quieres bañarte con seguridad en el mar del sur de Europa, noviembre llega tarde. Si quieres esquiar, la mayoría de las estaciones del hemisferio norte no abren del todo hasta diciembre. Y si el viaje va de largas tardes doradas al aire libre, elige un destino mucho más cerca del ecuador, o otro mes."
      )
    ),
  ],

  "best-warm-destinations": [
    S(
      L("Put a number on “warm”", "给「温暖」一个数字", "‘따뜻함’에 숫자를 붙이기", "Ponle un número a “cálido”"),
      L(
        "“Warm” means different things to different people. A mild city day around 20–24°C (68–75°F) is perfect for long walks; beach heat around 28–32°C (82–90°F) is great for swimming and hard on sightseeing. Write the range you actually want in Trip notes on Decide, and say whether the warmth is for a city, a beach, or both. The comparison gets much sharper when the engine knows which kind of warm you mean.",
        "「温暖」对每个人意思不一样。20–24°C（68–75°F）的温和城市天最适合长时间步行；28–32°C（82–90°F）的海滩热很适合游泳，却会让观光很辛苦。在 Decide 的旅行备注里写下你真正想要的温度范围，并说明这份温暖是给城市、海滩还是两者都要。引擎知道你指的是哪种温暖，比较结果会精准得多。",
        "‘따뜻함’은 사람마다 다릅니다. 20–24°C(68–75°F) 정도의 온화한 도시 날씨는 오래 걷기에 완벽하고, 28–32°C(82–90°F)의 해변 더위는 수영에는 좋지만 관광에는 힘듭니다. Decide의 여행 메모에 실제로 원하는 온도 범위를 적고, 그 따뜻함이 도시용인지 해변용인지 둘 다인지 밝히세요. 엔진이 어떤 따뜻함인지 알면 비교가 훨씬 정확해집니다.",
        "“Cálido” significa cosas distintas para cada persona. Un día urbano templado de 20–24 °C (68–75 °F) es perfecto para caminar mucho; el calor de playa de 28–32 °C (82–90 °F) es ideal para nadar y duro para hacer turismo. Escribe el rango que de verdad quieres en las notas del viaje en Decide y di si el calor es para ciudad, playa o ambas. La comparación mejora mucho cuando el motor sabe a qué calor te refieres."
      )
    ),
    S(
      L("Where it stays warm, and when", "哪里温暖，什么时候温暖", "어디가, 언제 따뜻한가", "Dónde hace calor, y cuándo"),
      L(
        "Equatorial cities such as Singapore are warm all year; what changes is the rain. Subtropical cities such as Taipei and Hong Kong are mild and comfortable from autumn into spring and hot in summer. Desert coasts such as Los Cabos are warm and dry through the northern winter. In Europe, winter warmth is limited: the Canary Islands stay around 20°C, while Lisbon and Barcelona are mild rather than warm. In the southern hemisphere, summer runs from December to February.",
        "新加坡这类赤道城市全年温暖，变化的是雨量。台北、香港这类亚热带城市从秋天到春天温和舒适，夏天很热。洛斯卡沃斯这类沙漠海岸在北半球冬季温暖干燥。欧洲冬天的温暖很有限：加那利群岛保持在 20°C 左右，里斯本和巴塞罗那只能算温和而不是温暖。南半球的夏天是十二月到二月。",
        "싱가포르 같은 적도 도시는 일 년 내내 따뜻하고 달라지는 것은 비입니다. 타이베이, 홍콩 같은 아열대 도시는 가을부터 봄까지 온화하고 쾌적하며 여름은 덥습니다. 로스카보스 같은 사막 해안은 북반구 겨울 내내 따뜻하고 건조합니다. 유럽의 겨울 따뜻함은 제한적이라 카나리아 제도는 20°C 안팎을 유지하지만 리스본과 바르셀로나는 따뜻하다기보다 온화합니다. 남반구의 여름은 12월부터 2월입니다.",
        "Las ciudades ecuatoriales como Singapur son cálidas todo el año; lo que cambia es la lluvia. Las subtropicales como Taipéi y Hong Kong son templadas y cómodas de otoño a primavera y calurosas en verano. Las costas desérticas como Los Cabos son cálidas y secas durante el invierno del norte. En Europa el calor invernal es limitado: las Canarias rondan los 20 °C, mientras Lisboa y Barcelona son templadas más que cálidas. En el hemisferio sur, el verano va de diciembre a febrero."
      )
    ),
    S(
      L("When heat becomes the problem", "当炎热本身成了问题", "더위가 문제가 될 때", "Cuando el calor se vuelve el problema"),
      L(
        "Humid summer heat in East Asian and U.S. Gulf Coast cities can make midday walking exhausting, even for travelers who say they love warm weather. If extreme heat is on your Avoid list, the engine should prefer shoulder months or drier places. Plan walking for mornings and evenings, and look for cities with covered walkways, good air-conditioned transit, and indoor sights for the middle of the day.",
        "东亚和美国墨西哥湾沿岸城市夏天的湿热，会让正午步行非常累，哪怕是自称喜欢热天的人。如果「避开」里有极端炎热，引擎应该优先选肩季或更干燥的地方。步行安排在早晚，选有带顶连廊、空调完善的公共交通，以及中午可以去的室内景点的城市。",
        "동아시아와 미국 걸프 연안 도시의 습한 여름 더위는 따뜻한 날씨를 좋아한다는 여행자에게도 한낮 도보를 지치게 만듭니다. Avoid에 극심한 더위가 있다면 엔진은 어깨 시즌이나 더 건조한 곳을 우선해야 합니다. 걷기는 아침저녁에 배치하고, 지붕 있는 보행로, 냉방이 잘 된 대중교통, 한낮에 갈 실내 명소가 있는 도시를 고르세요.",
        "El calor húmedo del verano en ciudades de Asia oriental y de la costa del Golfo en EE. UU. puede agotar al caminar a mediodía, incluso a quien dice que le encanta el calor. Si el calor extremo está en tu Avoid, el motor debería preferir meses de temporada media o lugares más secos. Camina por la mañana y por la tarde, y busca ciudades con pasarelas cubiertas, buen transporte con aire acondicionado y visitas interiores para el mediodía."
      )
    ),
    S(
      L("Storm seasons to check", "要留意的风暴季", "확인해야 할 폭풍 시즌", "Temporadas de tormentas a revisar"),
      L(
        "Warm places often come with storm seasons. The Atlantic hurricane season runs from June to November, the eastern Pacific season from mid-May to November, and western Pacific typhoons peak from roughly July to October. A storm does not hit every trip, but it can cancel flights, ferries, and beach days. If your dates fall inside one of these windows, keep plans flexible and read the cancellation terms before you book.",
        "温暖的地方常伴随风暴季。大西洋飓风季是六月到十一月，东太平洋是五月中到十一月，西太平洋台风大约在七到十月最频繁。不是每次旅行都会碰上，但一旦碰上，航班、渡轮和海滩日都可能取消。如果你的日期落在这些时间段内，保持行程弹性，预订前先读清取消条款。",
        "따뜻한 곳에는 폭풍 시즌이 따라오는 경우가 많습니다. 대서양 허리케인 시즌은 6~11월, 동태평양은 5월 중순~11월, 서태평양 태풍은 대략 7~10월에 가장 잦습니다. 모든 여행이 폭풍을 만나는 것은 아니지만 만나면 항공편, 페리, 해변 일정이 취소될 수 있습니다. 날짜가 이 기간에 들어간다면 일정을 유연하게 두고 예약 전에 취소 조건을 읽으세요.",
        "Los lugares cálidos suelen traer temporadas de tormentas. La de huracanes del Atlántico va de junio a noviembre, la del Pacífico oriental de mediados de mayo a noviembre, y los tifones del Pacífico occidental alcanzan su pico aproximadamente de julio a octubre. No todos los viajes se topan con una, pero puede cancelar vuelos, ferris y días de playa. Si tus fechas caen en esas ventanas, mantén planes flexibles y lee las condiciones de cancelación antes de reservar."
      )
    ),
    S(
      L("Warm without a long flight", "不用长途飞行的温暖", "긴 비행 없이 따뜻한 곳", "Calor sin un vuelo largo"),
      L(
        "The warmest option on the map is not always the warmest option for your trip. From much of North America, Mexico and the Caribbean are often reachable in a few hours. From Europe, the Canary Islands and southern Spain and Portugal are the short-haul answers in winter. From East Asia, Taiwan, Hong Kong, and Southeast Asia are close. Put your origin and Avoid list on Decide and let flight time sit next to warmth.",
        "地图上最暖的地方，不一定是你这次行程最合适的暖和去处。从北美大部分地区出发，墨西哥和加勒比通常几小时就到。从欧洲出发，冬天的短途答案是加那利群岛以及西班牙、葡萄牙南部。从东亚出发，台湾、香港和东南亚都很近。在 Decide 填上出发地和「避开」，让航程和温暖并排比较。",
        "지도에서 가장 따뜻한 곳이 이번 여행에 가장 맞는 따뜻한 곳은 아닙니다. 북미 대부분에서는 멕시코와 카리브해가 몇 시간이면 닿습니다. 유럽에서는 겨울 단거리 답이 카나리아 제도와 스페인·포르투갈 남부입니다. 동아시아에서는 대만, 홍콩, 동남아가 가깝습니다. Decide에 출발지와 Avoid를 넣고 비행시간을 따뜻함과 나란히 보세요.",
        "La opción más cálida del mapa no siempre es la más cálida para tu viaje. Desde buena parte de Norteamérica, México y el Caribe suelen estar a pocas horas. Desde Europa, las Canarias y el sur de España y Portugal son la respuesta de corto radio en invierno. Desde Asia oriental, Taiwán, Hong Kong y el sudeste asiático están cerca. Pon tu origen y tu Avoid en Decide y deja que el tiempo de vuelo se compare junto al calor."
      )
    ),
  ],

  "best-walkable-cities": [
    S(
      L("What makes a city walkable for a visitor", "对游客来说，什么样的城市算好走", "여행자에게 걷기 좋은 도시란", "Qué hace caminable una ciudad para un visitante"),
      L(
        "For a visitor, walkable means the sights you care about sit close together, transit fills the gaps quickly, sidewalks and crossings feel safe, and there is shade or cover when the weather turns. A city can be famous for walking and still be tiring if your plan jumps across districts every day. Look at where your must-sees are, not only at the city's reputation.",
        "对游客来说，好走意味着你在意的景点离得近、公共交通能快速补上空档、人行道和过马路让人安心，天气变化时有树荫或遮蔽。一座城市可以以步行闻名，但如果你的计划每天都在不同城区之间跳，照样会很累。看你的必去景点分布在哪里，而不只是看城市的名声。",
        "여행자에게 걷기 좋다는 것은 관심 있는 명소가 서로 가깝고, 대중교통이 빈틈을 빨리 메우며, 보도와 횡단보도가 안전하게 느껴지고, 날씨가 바뀌면 그늘이나 지붕이 있다는 뜻입니다. 걷기로 유명한 도시도 매일 다른 구역을 오가는 계획이라면 피곤할 수 있습니다. 도시의 명성만이 아니라 꼭 가고 싶은 곳이 어디에 있는지 보세요.",
        "Para un visitante, caminable significa que lo que te interesa está cerca, el transporte cubre los huecos rápido, las aceras y los cruces se sienten seguros y hay sombra o cubierta cuando cambia el tiempo. Una ciudad puede ser famosa por caminarse y aun así cansar si tu plan salta de distrito cada día. Mira dónde están tus imprescindibles, no solo la fama de la ciudad."
      )
    ),
    S(
      L("Flat, hilly, or vertical", "平地、坡地还是立体城市", "평지, 언덕, 혹은 수직 도시", "Llana, con colinas o vertical"),
      L(
        "Central Barcelona is mostly flat, with a street grid that makes long walks easy. Lisbon and Seoul are hilly, so a short distance on the map can mean a steep climb. Hong Kong is vertical: escalators, footbridges, and stairs connect the streets. Tokyo is mostly flat but enormous, and long walks inside large stations add up. Match the terrain to the people in your group, not just to the itinerary.",
        "巴塞罗那市中心基本平坦，棋盘格街道让长距离步行很轻松。里斯本和首尔多坡，地图上一小段距离可能是一段陡坡。香港是立体的：扶梯、天桥和楼梯把街道连在一起。东京大体平坦但面积巨大，大车站里的长距离步行会累积起来。按同行人的情况去匹配地形，而不只是按行程。",
        "바르셀로나 중심부는 대부분 평지이고 바둑판 도로 덕분에 오래 걸어도 편합니다. 리스본과 서울은 언덕이 많아 지도상 짧은 거리가 가파른 오르막일 수 있습니다. 홍콩은 수직 도시라 에스컬레이터, 육교, 계단이 거리를 잇습니다. 도쿄는 대체로 평지지만 매우 넓고, 큰 역 안에서 걷는 거리가 쌓입니다. 일정만이 아니라 일행에게 지형을 맞추세요.",
        "El centro de Barcelona es casi llano, con una cuadrícula que facilita los paseos largos. Lisboa y Seúl tienen colinas, así que una distancia corta en el mapa puede ser una cuesta empinada. Hong Kong es vertical: escaleras mecánicas, pasarelas y escaleras conectan las calles. Tokio es casi llano pero enorme, y las caminatas dentro de las grandes estaciones se acumulan. Adapta el terreno a tu grupo, no solo al itinerario."
      )
    ),
    S(
      L("Heat, rain, and shade", "炎热、下雨与遮蔽", "더위, 비, 그늘", "Calor, lluvia y sombra"),
      L(
        "Weather changes walkability more than most rankings admit. Humid summer afternoons in East Asia, Gulf Coast heat, or a rainy week in Lisbon can cut a walking day in half. Cities with covered walkways, shopping arcades, and air-conditioned transit — Singapore and Hong Kong are good examples — keep walking possible when the weather is not. Put your real dates on Decide, because a walkable city in April may feel very different in August.",
        "天气对好不好走的影响，比大多数排行榜承认的要大。东亚夏天湿热的午后、墨西哥湾沿岸的高温，或者里斯本的一周雨天，都可能让一天的步行量减半。有带顶连廊、商场通道和空调交通的城市——新加坡和香港就是好例子——在天气不好时仍然能走。在 Decide 填真实日期，因为四月好走的城市，八月可能完全是另一回事。",
        "날씨는 대부분의 순위가 인정하는 것보다 걷기 좋음을 더 크게 바꿉니다. 동아시아의 습한 여름 오후, 걸프 연안의 더위, 리스본의 비 오는 한 주는 걷는 하루를 절반으로 줄일 수 있습니다. 지붕 있는 보행로, 쇼핑 아케이드, 냉방 대중교통이 있는 도시 — 싱가포르와 홍콩이 좋은 예 — 는 날씨가 나빠도 걷기를 이어갈 수 있게 합니다. 4월에 걷기 좋은 도시가 8월엔 전혀 다를 수 있으니 Decide에 실제 날짜를 넣으세요.",
        "El tiempo cambia la caminabilidad más de lo que admiten la mayoría de los rankings. Las tardes húmedas de verano en Asia oriental, el calor de la costa del Golfo o una semana de lluvia en Lisboa pueden reducir a la mitad un día de paseo. Las ciudades con pasarelas cubiertas, galerías comerciales y transporte con aire acondicionado — Singapur y Hong Kong son buenos ejemplos — permiten seguir caminando cuando el tiempo no acompaña. Pon tus fechas reales en Decide: una ciudad caminable en abril puede sentirse muy distinta en agosto."
      )
    ),
    S(
      L("Walking with kids, luggage, or limited mobility", "带孩子、带行李或行动不便时", "아이, 짐, 거동 불편과 함께 걷기", "Caminar con niños, equipaje o movilidad reducida"),
      L(
        "Step-free access varies a lot. Newer metro systems, such as those in Singapore, generally have elevators at stations, while many older stations in European cities still rely on stairs. Cobbled streets are charming and hard on strollers and wheelchairs. If anyone in your group needs step-free routes, write that in Avoid and check station accessibility on the operator's site before you book a hotel.",
        "无障碍通行的情况差别很大。较新的地铁系统（比如新加坡）一般各站都有电梯，而欧洲城市的不少老车站仍然主要靠楼梯。石板路很有味道，但对婴儿车和轮椅不友好。如果同行有人需要无台阶路线，就写进「避开」，订酒店前先到运营方网站查车站的无障碍设施。",
        "단차 없는 접근성은 차이가 큽니다. 싱가포르처럼 비교적 새로운 지하철은 대개 역마다 엘리베이터가 있지만, 유럽 도시의 오래된 역 상당수는 아직 계단에 의존합니다. 돌길은 매력적이지만 유모차와 휠체어에는 힘듭니다. 일행 중 단차 없는 동선이 필요한 사람이 있다면 Avoid에 적고, 호텔 예약 전에 운영사 사이트에서 역 접근성을 확인하세요.",
        "El acceso sin escalones varía mucho. Los metros más nuevos, como el de Singapur, suelen tener ascensores en las estaciones, mientras que muchas estaciones antiguas de ciudades europeas aún dependen de escaleras. Las calles empedradas son encantadoras y duras para carritos y sillas de ruedas. Si alguien del grupo necesita rutas sin escalones, escríbelo en Avoid y revisa la accesibilidad de las estaciones en la web del operador antes de reservar hotel."
      )
    ),
    S(
      L("How the cities on this site walk", "本站城市指南里的城市走起来如何", "이 사이트 도시들의 걷기 난이도", "Cómo se caminan las ciudades de este sitio"),
      L(
        "Among the cities with guides here, central Barcelona, Tokyo's neighborhoods, and New Orleans' French Quarter suit long, mostly flat walks. Lisbon, Seoul, and Hong Kong reward walking but add hills, stairs, or both. Singapore keeps walking possible in the heat thanks to covered paths and air-conditioned links. Los Cabos is the exception: towns and beaches are spread out, so plan on taxis, shuttles, or a car.",
        "本站有指南的城市里，巴塞罗那市中心、东京的各个街区和新奥尔良的法国区适合长时间、基本平坦的步行。里斯本、首尔和香港也值得走，但会多出坡道、楼梯或两者都有。新加坡靠带顶步道和空调连廊，让人在炎热中也能继续走。洛斯卡沃斯是例外：小镇和海滩分散，要准备打车、坐接驳车或开车。",
        "이 사이트에 가이드가 있는 도시 중 바르셀로나 중심부, 도쿄의 동네들, 뉴올리언스의 프렌치 쿼터는 길고 대체로 평탄한 산책에 맞습니다. 리스본, 서울, 홍콩은 걷는 보람이 있지만 언덕이나 계단, 혹은 둘 다가 더해집니다. 싱가포르는 지붕 있는 길과 냉방 연결 통로 덕분에 더위 속에서도 걷기가 가능합니다. 로스카보스는 예외로, 마을과 해변이 흩어져 있어 택시, 셔틀, 차를 계획해야 합니다.",
        "Entre las ciudades con guía en este sitio, el centro de Barcelona, los barrios de Tokio y el Barrio Francés de Nueva Orleans se prestan a paseos largos y casi llanos. Lisboa, Seúl y Hong Kong premian caminar, pero añaden cuestas, escaleras o ambas. Singapur mantiene posible caminar con calor gracias a pasos cubiertos y conexiones con aire acondicionado. Los Cabos es la excepción: pueblos y playas están dispersos, así que cuenta con taxis, traslados o coche."
      )
    ),
    S(
      L("How to tell Decide you want to walk", "怎么告诉 Decide 你想步行", "Decide에 걷고 싶다고 알리는 법", "Cómo decirle a Decide que quieres caminar"),
      L(
        "Choose the City style, pick a Relaxed or Balanced pace, and write “walkable, no car” in Trip notes. If hills or long stairs are a problem, add them to Avoid so hilly cities are explained, not hidden. After the decision, the city guide for your winner shows three day routes built around walking, each with its own trade-offs.",
        "风格选「城市」，节奏选「轻松」或「平衡」，在旅行备注里写「好走、不开车」。如果坡道或长楼梯是问题，就加进「避开」，这样多坡的城市会被明确说明，而不是被悄悄忽略。决定之后，首选城市的城市指南会给出三条以步行为主的一日路线，每条都写明了取舍。",
        "스타일은 ‘도시’, 속도는 ‘여유’나 ‘균형’을 고르고 여행 메모에 ‘걷기 좋음, 차 없음’을 적으세요. 언덕이나 긴 계단이 문제라면 Avoid에 넣어, 언덕 많은 도시가 숨겨지지 않고 설명되게 하세요. 결정 후에는 추천 도시의 시티 가이드가 걷기 중심의 하루 루트 세 가지를 각각의 trade-off와 함께 보여 줍니다.",
        "Elige el estilo Ciudad, un ritmo Relajado o Balanceado y escribe “caminable, sin coche” en las notas del viaje. Si las cuestas o las escaleras largas son un problema, añádelas a Avoid para que las ciudades con colinas se expliquen en vez de esconderse. Tras la decisión, la guía de la ciudad ganadora muestra tres rutas de un día pensadas para caminar, cada una con sus trade-offs."
      )
    ),
  ],

  "best-trips-under-2000": [
    S(
      L("Where the money usually goes", "钱通常花在哪里", "돈은 보통 어디에 쓰이나", "En qué se va normalmente el dinero"),
      L(
        "For most trips, flights and lodging take the largest share of the budget. Food varies widely with how you eat — markets and casual places versus sit-down dinners every night. Local transport is usually small in cities with good metros and larger where you need taxis or a rental car. Activities and entry fees are where a tight budget can still flex. The cost estimate on your Decide result splits the trip into these lines so you can see which one breaks the cap.",
        "对大多数行程来说，机票和住宿占预算的大头。餐饮因吃法差别很大——逛市场、吃平价店，还是每晚都正式坐下来吃。在地铁发达的城市，市内交通通常花得不多；需要打车或租车的地方就多得多。活动和门票是预算紧时还能伸缩的部分。Decide 结果里的费用估算会把行程拆成这几项，你能看出是哪一项超了上限。",
        "대부분의 여행에서 항공과 숙소가 예산의 가장 큰 몫을 차지합니다. 식비는 먹는 방식 — 시장과 캐주얼 식당이냐, 매일 밤 정식 저녁이냐 — 에 따라 크게 달라집니다. 시내 교통은 지하철이 좋은 도시에선 보통 적고, 택시나 렌터카가 필요한 곳에선 커집니다. 액티비티와 입장료는 빠듯한 예산에서도 조절 가능한 부분입니다. Decide 결과의 비용 추정은 여행을 이 항목들로 나눠 어느 줄이 상한을 넘는지 보여 줍니다.",
        "En la mayoría de los viajes, vuelos y alojamiento se llevan la mayor parte del presupuesto. La comida varía mucho según cómo comas: mercados y sitios informales o cenas en restaurante cada noche. El transporte local suele ser poco en ciudades con buen metro y más donde necesitas taxis o coche. Actividades y entradas son donde un presupuesto ajustado aún puede ceder. La estimación de costos del resultado de Decide divide el viaje en estas líneas para ver cuál rompe el tope."
      )
    ),
    S(
      L("Distance and trip length work together", "距离和天数要一起看", "거리와 일정 길이는 함께 움직인다", "Distancia y duración van juntas"),
      L(
        "A far destination needs more nights to justify the flight, both in cost and in jet lag. On a short budget trip, a closer city usually delivers more of the trip you actually want. If the flight alone takes half of a $2,000 cap, the remaining budget has to cover every night on the ground — which is why shorter-haul choices often win at this budget.",
        "远的目的地需要更多晚数才划得来，无论是机票钱还是时差。预算紧的短途行程，近一点的城市通常能给你更多真正想要的体验。如果光机票就吃掉 2000 美元上限的一半，剩下的钱要覆盖落地后的每一晚——这就是为什么在这个预算下，短途选项常常胜出。",
        "먼 목적지는 비용으로도 시차로도 항공을 정당화하려면 더 많은 숙박이 필요합니다. 예산이 빠듯한 짧은 여행이라면 더 가까운 도시가 원하는 여행을 더 많이 줍니다. 항공만으로 $2,000 상한의 절반이 나간다면 남은 돈으로 현지의 모든 밤을 감당해야 하므로, 이 예산에서는 단거리 선택이 자주 이깁니다.",
        "Un destino lejano necesita más noches para justificar el vuelo, en costo y en jet lag. En un viaje corto con presupuesto ajustado, una ciudad más cercana suele darte más del viaje que realmente quieres. Si el vuelo solo se come la mitad de un tope de $2,000, lo que queda debe cubrir cada noche en destino; por eso, con este presupuesto, las opciones de corto radio suelen ganar."
      )
    ),
    S(
      L("Dates that raise prices", "会推高价格的日期", "가격을 올리는 날짜", "Fechas que suben los precios"),
      L(
        "Big holidays move prices more than most destination choices do. Christmas and New Year, Lunar New Year in East Asia, Golden Week in Japan, summer in southern Europe, and major festivals such as Mardi Gras all push up flights and hotels. Shifting by a week, or flying midweek, often saves more than switching cities. If your dates are flexible, say so in Trip notes.",
        "大型节假日对价格的影响，往往比选哪个目的地更大。圣诞和新年、东亚的农历新年、日本的黄金周、南欧的夏天，以及狂欢节这样的大型节庆，都会推高机票和酒店。挪一周或者选工作日起飞，省下的钱常常比换城市更多。如果你的日期有弹性，就写进旅行备注。",
        "큰 휴일은 목적지 선택보다 가격을 더 크게 움직입니다. 크리스마스와 새해, 동아시아의 설, 일본의 골든위크, 남유럽의 여름, 마르디 그라 같은 대형 축제는 모두 항공과 호텔 가격을 올립니다. 일주일 옮기거나 주중에 출발하는 것이 도시를 바꾸는 것보다 더 많이 아끼는 경우가 많습니다. 날짜가 유연하다면 여행 메모에 적으세요.",
        "Las grandes fiestas mueven los precios más que la elección de destino. Navidad y Año Nuevo, el Año Nuevo Lunar en Asia oriental, la Golden Week en Japón, el verano en el sur de Europa y festivales como el Mardi Gras encarecen vuelos y hoteles. Moverte una semana o volar entre semana suele ahorrar más que cambiar de ciudad. Si tus fechas son flexibles, dilo en las notas del viaje."
      )
    ),
    S(
      L("Ways to stretch the same budget", "让同样的预算走得更远", "같은 예산을 늘리는 방법", "Cómo estirar el mismo presupuesto"),
      L(
        "Stay in one base instead of moving every two nights, so you pay for fewer transfers and lose less time. Use a transit card instead of taxis in cities with good metros. Make lunch the main meal where set lunches are common. Pick one paid highlight per day and fill the rest with neighborhoods, markets, parks, and viewpoints that cost little or nothing.",
        "只住一个落脚点，而不是每两晚换一次，这样换乘花费更少、浪费的时间也更少。在地铁发达的城市用交通卡代替打车。在午市套餐常见的地方，把午餐当正餐。每天只挑一个付费亮点，其余时间留给花费很少或免费的街区、市场、公园和观景点。",
        "이틀마다 옮기지 말고 한 곳을 거점으로 삼으면 이동비가 줄고 잃는 시간도 줄어듭니다. 지하철이 좋은 도시에서는 택시 대신 교통카드를 쓰세요. 점심 정식이 흔한 곳에서는 점심을 주식으로 하세요. 하루에 유료 하이라이트 하나만 고르고, 나머지는 돈이 거의 들지 않는 동네, 시장, 공원, 전망대로 채우세요.",
        "Quédate en una sola base en lugar de moverte cada dos noches: pagas menos traslados y pierdes menos tiempo. Usa una tarjeta de transporte en vez de taxis en ciudades con buen metro. Haz del almuerzo la comida principal donde los menús del día son comunes. Elige un plan de pago al día y llena el resto con barrios, mercados, parques y miradores que cuestan poco o nada."
      )
    ),
    S(
      L("When $2,000 honestly will not fit", "什么时候 2000 美元确实不够", "$2,000가 솔직히 맞지 않을 때", "Cuando $2,000 honestamente no alcanzan"),
      L(
        "A family of four flying long-haul in peak season, or a trip built around luxury hotels, will usually not fit $2,000 USD. That is not a failure of planning; it is a constraint conflict. When the estimate does not fit, the Decide result labels the cost “Tight” or “Likely over budget”, so you can lower expectations, shorten the trip, or pick a closer destination before you book anything.",
        "一家四口旺季长途出行，或者以豪华酒店为核心的行程，通常都装不进 2000 美元。这不是规划失败，而是约束本身冲突。估算装不下时，Decide 结果会把费用标成「偏紧」或「很可能超预算」，你可以在订任何东西之前降低预期、缩短行程，或换一个更近的目的地。",
        "성수기에 장거리로 떠나는 4인 가족이나 럭셔리 호텔 중심의 여행은 보통 $2,000 USD에 맞지 않습니다. 이는 계획 실패가 아니라 조건 충돌입니다. 추정이 맞지 않으면 Decide 결과가 비용을 ‘빠듯함’ 또는 ‘예산 초과 가능성 높음’으로 표시하므로, 무엇이든 예약하기 전에 기대를 낮추거나 일정을 줄이거나 더 가까운 목적지를 고를 수 있습니다.",
        "Una familia de cuatro volando largo radio en temporada alta, o un viaje en torno a hoteles de lujo, normalmente no cabe en $2,000 USD. No es un fallo de planificación; es un conflicto de restricciones. Cuando la estimación no cabe, el resultado de Decide marca el costo como “Justo” o “Probablemente por encima del presupuesto”, para que bajes expectativas, acortes el viaje o elijas un destino más cercano antes de reservar nada."
      )
    ),
  ],

  "best-food-cities": [
    S(
      L("Decide what kind of eating you want", "先想清楚你想怎么吃", "어떤 식사를 원하는지 정하기", "Decide qué tipo de comida quieres"),
      L(
        "Food trips split into a few styles. Street food and markets reward wandering: Taipei's night markets, Hong Kong's cha chaan teng cafés and dai pai dong, Mexico City's street stalls. Sit-down depth rewards planning: Tokyo's specialist restaurants, Lisbon's seafood houses, Barcelona's tapas bars and markets. Many cities offer both, but one usually defines the experience. Write the style you want in Trip notes so the comparison weighs the right thing.",
        "美食之旅大致分几种。街头小吃和市场适合闲逛：台北的夜市、香港的茶餐厅和大排档、墨西哥城的街边摊。正式餐厅的深度则需要规划：东京的专门店、里斯本的海鲜馆、巴塞罗那的小吃吧和市场。很多城市两者兼有，但通常有一种定义了整体体验。把你想要的吃法写进旅行备注，比较才会看重对的东西。",
        "미식 여행은 몇 가지 스타일로 나뉩니다. 길거리 음식과 시장은 돌아다닐수록 보상이 큽니다: 타이베이 야시장, 홍콩의 차찬텡과 다이파이동, 멕시코시티의 노점. 앉아서 먹는 깊이는 계획할수록 보상이 큽니다: 도쿄의 전문점, 리스본의 해산물 식당, 바르셀로나의 타파스 바와 시장. 많은 도시가 둘 다 있지만 보통 하나가 경험을 규정합니다. 원하는 스타일을 여행 메모에 적어 비교가 올바른 것을 따지게 하세요.",
        "Los viajes gastronómicos se dividen en varios estilos. La comida callejera y los mercados premian deambular: los mercados nocturnos de Taipéi, los cha chaan teng y dai pai dong de Hong Kong, los puestos de Ciudad de México. La mesa con profundidad premia planificar: los restaurantes especializados de Tokio, las marisquerías de Lisboa, los bares de tapas y mercados de Barcelona. Muchas ciudades ofrecen ambos, pero uno suele definir la experiencia. Escribe el estilo que quieres en las notas para que la comparación pese lo correcto."
      )
    ),
    S(
      L("Eat on the city's clock", "按当地的时间吃饭", "도시의 시간에 맞춰 먹기", "Come al ritmo de la ciudad"),
      L(
        "Meal times shape a food trip. In Spain, dinner often starts after 9 pm, and many kitchens are quiet in the late afternoon. Hong Kong's dim sum is a morning and lunchtime ritual. Taipei's night markets come alive after dark. In Tokyo, many popular restaurants take last orders earlier than travelers expect. Plan your days so the meals you care about land at the hours the city actually serves them.",
        "吃饭时间决定了美食之旅的节奏。在西班牙，晚餐常常九点后才开始，很多厨房下午晚些时候是空闲的。香港的点心是早上和午间的习惯。台北的夜市天黑后才热闹。在东京，很多热门餐厅最后点单的时间比游客预想的早。安排行程时，让你最在意的那几顿饭落在当地真正供应的时段。",
        "식사 시간이 미식 여행을 좌우합니다. 스페인에서는 저녁이 보통 밤 9시 이후에 시작되고, 늦은 오후에는 주방이 한산한 곳이 많습니다. 홍콩의 딤섬은 아침과 점심의 의식입니다. 타이베이 야시장은 해가 진 뒤에 살아납니다. 도쿄의 인기 식당 중 상당수는 여행자가 예상하는 것보다 일찍 마지막 주문을 받습니다. 중요하게 여기는 식사가 그 도시가 실제로 내놓는 시간에 오도록 하루를 짜세요.",
        "Los horarios marcan un viaje gastronómico. En España la cena suele empezar después de las 21:00 y muchas cocinas están tranquilas a media tarde. El dim sum de Hong Kong es un ritual de mañana y mediodía. Los mercados nocturnos de Taipéi cobran vida al anochecer. En Tokio, muchos restaurantes populares cierran pedidos antes de lo que los viajeros esperan. Organiza tus días para que las comidas que te importan caigan en las horas en que la ciudad realmente las sirve."
      )
    ),
    S(
      L("Reservations and queues", "订位和排队", "예약과 줄서기", "Reservas y colas"),
      L(
        "Some of the most talked-about restaurants in Tokyo, Barcelona, and Lisbon book out well in advance, and a few are hard to reserve without a local phone number or a booking service. Others take no reservations at all and run on queues. If two or three meals are the reason for the trip, secure them before you lock in dates — and keep the rest of the plan flexible enough to absorb a long wait.",
        "东京、巴塞罗那和里斯本一些最有名的餐厅很早就订满，少数没有当地电话或预订服务很难订到。另一些完全不接受预订，只能排队。如果这趟旅行就是为了那两三顿饭，先把它们订好再定日期——其余行程留出足够的弹性，以便消化长时间的排队。",
        "도쿄, 바르셀로나, 리스본에서 가장 화제인 식당 일부는 훨씬 전에 예약이 차고, 몇몇은 현지 전화번호나 예약 서비스 없이는 예약이 어렵습니다. 아예 예약을 받지 않고 줄로 운영하는 곳도 있습니다. 두세 끼가 여행의 이유라면 날짜를 확정하기 전에 먼저 잡아 두고, 나머지 계획은 긴 대기를 흡수할 만큼 유연하게 두세요.",
        "Algunos de los restaurantes más comentados de Tokio, Barcelona y Lisboa se llenan con mucha antelación, y unos pocos son difíciles de reservar sin un teléfono local o un servicio de reservas. Otros no aceptan reservas y funcionan con cola. Si dos o tres comidas son el motivo del viaje, asegúralas antes de cerrar fechas y deja el resto del plan lo bastante flexible para absorber una espera larga."
      )
    ),
    S(
      L("Dietary needs change the shortlist", "饮食限制会改变候选名单", "식이 제한이 후보를 바꾼다", "Las necesidades alimentarias cambian la lista"),
      L(
        "Vegetarian and vegan travel is easier in some food cities than others. Taipei has a long tradition of Buddhist vegetarian restaurants. In Japan, fish-based dashi stock appears in many dishes that look vegetarian. Spanish and Portuguese menus lean on pork and seafood. If you have allergies or strict restrictions, carry a short card in the local language, and write the restriction in Avoid so the comparison treats it as a constraint, not a footnote.",
        "素食和纯素旅行，在不同的美食城市难度差别很大。台北有悠久的佛教素食餐厅传统。在日本，很多看起来是素的菜里用了鱼熬的高汤。西班牙和葡萄牙的菜单以猪肉和海鲜为主。如果你有过敏或严格的饮食限制，随身带一张当地语言的说明卡，并把限制写进「避开」，让比较把它当成约束，而不是脚注。",
        "채식·비건 여행은 미식 도시마다 난이도가 다릅니다. 타이베이에는 불교 채식 식당의 오랜 전통이 있습니다. 일본에서는 채식처럼 보이는 많은 요리에 생선으로 낸 다시 육수가 들어갑니다. 스페인과 포르투갈 메뉴는 돼지고기와 해산물 비중이 큽니다. 알레르기나 엄격한 제한이 있다면 현지 언어로 된 짧은 카드를 챙기고, 제한 사항을 Avoid에 적어 비교가 이를 각주가 아닌 조건으로 다루게 하세요.",
        "Viajar siendo vegetariano o vegano es más fácil en unas ciudades gastronómicas que en otras. Taipéi tiene una larga tradición de restaurantes vegetarianos budistas. En Japón, el caldo dashi de pescado aparece en muchos platos que parecen vegetarianos. Las cartas españolas y portuguesas se apoyan en cerdo y marisco. Si tienes alergias o restricciones estrictas, lleva una tarjeta breve en el idioma local y escribe la restricción en Avoid para que la comparación la trate como restricción, no como nota al pie."
      )
    ),
    S(
      L("Pace a food trip like a walking trip", "像安排步行之旅一样安排美食之旅", "미식 여행은 걷기 여행처럼 속도를 조절하기", "Dosifica un viaje gastronómico como uno a pie"),
      L(
        "The best eating neighborhoods are rarely next to each other, so a food trip is also a walking and transit trip. Two or three focused eating areas per day, with walks in between, usually beat crossing the city for every meal. Choose a Balanced or Relaxed pace on Decide, and let walkability count — a great food city you can't move around comfortably is a worse fit than it looks.",
        "最好吃的街区很少挨在一起，所以美食之旅也是一趟步行加交通的旅行。每天集中吃两三个区域、中间步行，通常胜过为每顿饭横穿整座城市。在 Decide 选「平衡」或「轻松」节奏，让步行友好度也算进去——一座吃得好却走不舒服的城市，实际上没有看起来那么合适。",
        "가장 맛있는 동네들은 서로 붙어 있는 경우가 드물어서, 미식 여행은 걷기와 대중교통 여행이기도 합니다. 하루에 집중할 식사 지역 두세 곳을 정하고 그 사이를 걷는 편이 매 끼니마다 도시를 가로지르는 것보다 대개 낫습니다. Decide에서 ‘균형’이나 ‘여유’ 속도를 고르고 도보 이동도 반영하세요. 편하게 돌아다닐 수 없는 미식 도시는 보기보다 덜 맞습니다.",
        "Los mejores barrios para comer rara vez están juntos, así que un viaje gastronómico también es un viaje a pie y en transporte. Dos o tres zonas para comer al día, con paseos entre ellas, suelen ganar a cruzar la ciudad en cada comida. Elige un ritmo Balanceado o Relajado en Decide y deja que cuente la caminabilidad: una gran ciudad gastronómica en la que no te mueves con comodidad encaja peor de lo que parece."
      )
    ),
  ],
}

export function getGuideSections(slug: string): ContentSection[] {
  return guideSections[slug] ?? []
}
