import type { CityText } from "./types"
import { cities, getCity } from "./index.ts"
import { resolveCityImageSrc } from "./share-image.ts"

/**
 * Planned city-guide directory (ADR 0008).
 * Live guides come from the `cities` registry; the rest show as Coming soon on `/city`.
 * Add a row here when a city is on the roadmap; ship the full data file when ready.
 */

const t = (en: string, zh: string, ko: string, es: string): CityText => ({ en, zh, ko, es })

export type CityCatalogRegion = "asia" | "europe" | "americas"

/** Editorial trip-style tags for /city filters — not rankings. */
export type CityCatalogIntent = "first-city" | "beach" | "food" | "culture"

export type CityCatalogPlan = {
  slug: string
  name: CityText
  localName: string
  country: CityText
  blurb: CityText
  region: CityCatalogRegion
  intents: readonly CityCatalogIntent[]
  /** Card image under public/ (or story -1600). */
  image: string
}

/** Top roadmap — order = display order on `/city`. Append for future cities. */
export const cityCatalogPlan: readonly CityCatalogPlan[] = [
  {
    slug: "hong-kong",
    name: t("Hong Kong", "香港", "홍콩", "Hong Kong"),
    localName: "香港",
    country: t("China", "中国", "중국", "China"),
    blurb: t(
      "Harbor shores, street food, and three first-day routes.",
      "港口两岸、街头美食，以及三种第一天玩法。",
      "항구와 길거리 음식, 그리고 첫날 코스 세 가지.",
      "Orillas del puerto, comida callejera y tres rutas de primer día.",
    ),
    region: "asia",
    intents: ["first-city", "food", "culture"],
    image: "/assets/dest-hong-kong-v2.webp",
  },
  {
    slug: "tokyo",
    name: t("Tokyo", "东京", "도쿄", "Tokio"),
    localName: "東京",
    country: t("Japan", "日本", "일본", "Japón"),
    blurb: t(
      "Temples, crossings, and neighborhood food in one dense city.",
      "寺庙、十字路口与街区美食，集中在一座高密度城市。",
      "사찰, 교차로, 동네 음식이 한 도시에 모여 있습니다.",
      "Templos, cruces y comida de barrio en una ciudad densa.",
    ),
    region: "asia",
    intents: ["first-city", "food", "culture"],
    image: "/assets/dest-tokyo-v2.webp",
  },
  {
    slug: "seoul",
    name: t("Seoul", "首尔", "서울", "Seúl"),
    localName: "서울",
    country: t("South Korea", "韩国", "대한민국", "Corea del Sur"),
    blurb: t(
      "Palaces, markets, and hill views across the Han.",
      "宫殿、市场，以及汉江两岸的山城视野。",
      "궁궐, 시장, 한강 너머 언덕 전망.",
      "Palacios, mercados y vistas desde las colinas sobre el Han.",
    ),
    region: "asia",
    intents: ["first-city", "food", "culture"],
    image: "/assets/dest-seoul-v2.webp",
  },
  {
    slug: "taipei",
    name: t("Taipei", "台北", "타이베이", "Taipei"),
    localName: "臺北",
    country: t("Taiwan", "台湾", "대만", "Taiwán"),
    blurb: t(
      "Night markets, temples, and a skyline over the basin.",
      "夜市、庙宇，以及盆地里的天际线。",
      "야시장, 사원, 분지 위 스카이라인.",
      "Mercados nocturnos, templos y un skyline sobre la cuenca.",
    ),
    region: "asia",
    intents: ["food", "culture"],
    image: "/assets/destination-taipei-card.webp",
  },
  {
    slug: "macau",
    name: t("Macau", "澳门", "마카오", "Macao"),
    localName: "澳門",
    country: t("China", "中国", "중국", "China"),
    blurb: t(
      "Old streets, plazas, and a harbor city next to Hong Kong.",
      "老街、广场，以及紧挨香港的港口城市。",
      "옛 거리와 광장, 홍콩 옆의 항구 도시.",
      "Calles antiguas, plazas y una ciudad puerto junto a Hong Kong.",
    ),
    region: "asia",
    intents: ["food", "culture"],
    image: "/stories/macau/01/londoner-big-ben-1600.webp",
  },
  {
    slug: "singapore",
    name: t("Singapore", "新加坡", "싱가포르", "Singapur"),
    localName: "新加坡",
    country: t("Singapore", "新加坡", "싱가포르", "Singapur"),
    blurb: t(
      "Garden city, food courts, and easy first-day planning.",
      "花园城市、食阁，以及好规划的第一天。",
      "가든시티, 푸드코트, 계획하기 쉬운 첫날.",
      "Ciudad jardín, food courts y un primer día fácil de planear.",
    ),
    region: "asia",
    intents: ["first-city", "food"],
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1600&q=85&auto=format&fit=crop",
  },
  {
    slug: "los-cabos",
    name: t("Los Cabos", "洛斯卡沃斯", "로스카보스", "Los Cabos"),
    localName: "Los Cabos",
    country: t("Mexico", "墨西哥", "멕시코", "México"),
    blurb: t(
      "Beaches, rest, and the Baja coast between two towns.",
      "两座城之间的海滩、休息与下加州海岸。",
      "두 도시 사이 해변, 휴식, 바하 해안.",
      "Playas, descanso y la costa de Baja entre dos pueblos.",
    ),
    region: "americas",
    intents: ["beach"],
    image: "/assets/dest-los-cabos-v2.webp",
  },
  {
    slug: "shanghai",
    name: t("Shanghai", "上海", "상하이", "Shanghái"),
    localName: "上海",
    country: t("China", "中国", "중국", "China"),
    blurb: t(
      "Bund views, lanes, and a river city at night.",
      "外滩、里弄，以及夜里的江城。",
      "번드 전망, 골목, 밤의 강변 도시.",
      "El Bund, callejones y una ciudad fluvial de noche.",
    ),
    region: "asia",
    intents: ["first-city", "culture"],
    image: "/assets/destination-shanghai-card.webp",
  },
  {
    slug: "lisbon",
    name: t("Lisbon", "里斯本", "리스본", "Lisboa"),
    localName: "Lisboa",
    country: t("Portugal", "葡萄牙", "포르투갈", "Portugal"),
    blurb: t(
      "Hills, trams, and Atlantic light on a first Europe city day.",
      "山城、有轨电车与大西洋的光——欧洲城市第一天。",
      "언덕, 트램, 대서양 빛 — 유럽 도시 첫날.",
      "Colinas, tranvías y luz atlántica en un primer día europeo.",
    ),
    region: "europe",
    intents: ["first-city", "culture"],
    image: "/assets/destination-lisbon-card.webp",
  },
  {
    slug: "barcelona",
    name: t("Barcelona", "巴塞罗那", "바르셀로나", "Barcelona"),
    localName: "Barcelona",
    country: t("Spain", "西班牙", "스페인", "España"),
    blurb: t(
      "Beach, Gothic lanes, and food markets.",
      "海滩、哥特区小巷与美食市场。",
      "해변, 고딕 골목, 음식 시장.",
      "Playa, callejones góticos y mercados de comida.",
    ),
    region: "europe",
    intents: ["first-city", "beach", "culture", "food"],
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1600&q=85&auto=format&fit=crop",
  },
  {
    slug: "xian",
    name: t("Xi'an", "西安", "시안", "Xi'an"),
    localName: "西安",
    country: t("China", "中国", "중국", "China"),
    blurb: t(
      "City walls, Tang pagodas, and the Terracotta Army in Shaanxi — not Shanxi.",
      "城墙、唐塔与兵马俑——在陕西，不是山西。",
      "성벽, 당탑, 병마용 — 산시(陝西)이며 산시(山西)가 아닙니다.",
      "Muralla, pagodas Tang y el Ejército de Terracota en Shaanxi — no Shanxi.",
    ),
    region: "asia",
    intents: ["culture", "food"],
    image: "https://images.unsplash.com/photo-1586016413664-864c0dd76f53?auto=format&fit=crop&w=1600&q=80",
  },
]

export type CityCatalogItem = CityCatalogPlan & {
  status: "live" | "soon"
  places?: number
  routes?: number
}

/** Directory rows for `/city`: planned order, live stats when published. */
export function listCityCatalog(): CityCatalogItem[] {
  return cityCatalogPlan.map((plan) => {
    const live = getCity(plan.slug)
    if (!live) return { ...plan, status: "soon" as const }
    return {
      ...plan,
      status: "live" as const,
      name: live.name,
      localName: live.localName,
      country: live.country,
      places: live.places.length,
      routes: live.routes.length,
      image: resolveCityImageSrc(live.hero.src),
    }
  })
}

/** Live guides only (sitemap / JSON-LD already use `cities`). */
export function liveCityCount(): number {
  return cities.length
}
