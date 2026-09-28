import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function unsplash(id: string): string {
  return `https://images.unsplash.com/${id}?w=640&q=75`
}

/**
 * City → card image. Keys are matched with `includes` against a normalized
 * "name + country" string, so add EN / 中文 / 한국어 / ES aliases for cities
 * we recommend often. Never map every miss to Lisbon.
 */
export const CITY_IMAGES: Record<string, string> = {
  // Europe
  lisbon: "/assets/destination-lisbon-card.webp",
  lisboa: "/assets/destination-lisbon-card.webp",
  里斯本: "/assets/destination-lisbon-card.webp",
  리스본: "/assets/destination-lisbon-card.webp",
  porto: unsplash("photo-1555881400-74d7acaacd8b"),
  波尔图: unsplash("photo-1555881400-74d7acaacd8b"),
  barcelona: unsplash("photo-1583422409516-2895a77efded"),
  巴塞罗那: unsplash("photo-1583422409516-2895a77efded"),
  madrid: unsplash("photo-1543785734-4b6e564642f8"),
  马德里: unsplash("photo-1543785734-4b6e564642f8"),
  paris: unsplash("photo-1502602898657-3e91760cbb34"),
  巴黎: unsplash("photo-1502602898657-3e91760cbb34"),
  파리: unsplash("photo-1502602898657-3e91760cbb34"),
  rome: unsplash("photo-1552832230-c0197dd311b5"),
  roma: unsplash("photo-1552832230-c0197dd311b5"),
  罗马: unsplash("photo-1552832230-c0197dd311b5"),
  amsterdam: unsplash("photo-1534351590666-13e3e96b5017"),
  prague: unsplash("photo-1541849546-216549ae216d"),
  vienna: unsplash("photo-1516550893923-42d28e5677af"),
  athens: unsplash("photo-1555993539-1732b0258235"),
  istanbul: unsplash("photo-1524231757912-21f4fe3a7200"),
  伊斯坦布尔: unsplash("photo-1524231757912-21f4fe3a7200"),

  // Asia
  "hong kong": "/stories/hong-kong/01/red-sail-junk-800.webp",
  hongkong: "/stories/hong-kong/01/red-sail-junk-800.webp",
  香港: "/stories/hong-kong/01/red-sail-junk-800.webp",
  홍콩: "/stories/hong-kong/01/red-sail-junk-800.webp",
  "victoria harbour": "/stories/hong-kong/01/harbour-promenade-skyline-800.webp",
  维港: "/stories/hong-kong/01/harbour-promenade-skyline-800.webp",
  macau: "/stories/macau/01/londoner-big-ben-800.webp",
  macao: "/stories/macau/01/londoner-big-ben-800.webp",
  澳门: "/stories/macau/01/londoner-big-ben-800.webp",
  마카오: "/stories/macau/01/londoner-big-ben-800.webp",
  cotai: "/stories/macau/01/londoner-big-ben-800.webp",
  路氹: "/stories/macau/01/londoner-big-ben-800.webp",
  tokyo: unsplash("photo-1540959733332-eab4deabeeaf"),
  东京: unsplash("photo-1540959733332-eab4deabeeaf"),
  東京: unsplash("photo-1540959733332-eab4deabeeaf"),
  도쿄: unsplash("photo-1540959733332-eab4deabeeaf"),
  bangkok: unsplash("photo-1508009603885-50cf7c579365"),
  曼谷: unsplash("photo-1508009603885-50cf7c579365"),
  방콕: unsplash("photo-1508009603885-50cf7c579365"),
  bali: unsplash("photo-1537996194471-e657df975ab4"),
  巴厘: unsplash("photo-1537996194471-e657df975ab4"),
  singapore: unsplash("photo-1525625293386-3f8f99389edd"),
  新加坡: unsplash("photo-1525625293386-3f8f99389edd"),
  seoul: unsplash("photo-1517154421773-0529f29ea451"),
  首尔: unsplash("photo-1517154421773-0529f29ea451"),
  서울: unsplash("photo-1517154421773-0529f29ea451"),
  taipei: "/assets/destination-taipei-card.webp",
  台北: "/assets/destination-taipei-card.webp",
  臺北: "/assets/destination-taipei-card.webp",
  타이베이: "/assets/destination-taipei-card.webp",
  shanghai: "/assets/destination-shanghai-card.webp",
  上海: "/assets/destination-shanghai-card.webp",
  beijing: unsplash("photo-1508804185872-d7badad00f7d"),
  北京: unsplash("photo-1508804185872-d7badad00f7d"),
  osaka: unsplash("photo-1590559899731-a382839e5549"),
  大阪: unsplash("photo-1590559899731-a382839e5549"),
  dubai: unsplash("photo-1512453979798-5ea266f8880c"),
  迪拜: unsplash("photo-1512453979798-5ea266f8880c"),

  // Americas
  "new york": unsplash("photo-1496442226666-8d4d0e62e6e9"),
  "new orleans": "/assets/destination-new-orleans-card.webp",
  "mexico city": unsplash("photo-1518105779142-d975f22f1b0a"),
  "ciudad de méxico": unsplash("photo-1518105779142-d975f22f1b0a"),
  "ciudad de mexico": unsplash("photo-1518105779142-d975f22f1b0a"),
  墨西哥城: unsplash("photo-1518105779142-d975f22f1b0a"),
  멕시코시티: unsplash("photo-1518105779142-d975f22f1b0a"),
  "panama city": unsplash("photo-1587595431973-160d0d94add1"),
  巴拿马: unsplash("photo-1587595431973-160d0d94add1"),
  "buenos aires": unsplash("photo-1589909202802-8f4aadce1849"),
  vancouver: unsplash("photo-1559511260-66a654ae982a"),
  montreal: unsplash("photo-1519178614-68673b201f36"),

  // Africa / Oceania
  "cape town": unsplash("photo-1580060839134-75a5edca2e99"),
  sydney: unsplash("photo-1506973035872-a4ec16b8e8d9"),
  悉尼: unsplash("photo-1506973035872-a4ec16b8e8d9"),
  auckland: unsplash("photo-1507699622108-4be3abd695ad"),
}

/** Generic city photos (not Lisbon) for unknown destinations — hashed so the same city stays stable. */
const FALLBACK_PHOTOS = [
  unsplash("photo-1488085061387-422e29b40080"), // airplane window city
  unsplash("photo-1469854523086-cc02fe5d8800"), // road trip overlook
  unsplash("photo-1476514525535-07fb3b4ae5f1"), // lake mountains
  unsplash("photo-1507525428034-b723cf961d3e"), // beach
  unsplash("photo-1493246507139-91e8fad9978e"), // mountain lake
  unsplash("photo-1520250497591-112f2f40a3f4"), // tropical resort
  unsplash("photo-1514565131-fce0801e5785"), // night city
  unsplash("photo-1449824913935-59a10b8d2000"), // urban street
]

function normalizePlace(value: string): string {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[,，、]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function hashPlace(value: string): number {
  let hash = 2166136261
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

export function getCityImage(cityName: string): string {
  const key = normalizePlace(cityName)
  if (!key) return FALLBACK_PHOTOS[0]

  // Longer aliases first so "mexico city" wins over a future "mexico" key.
  const aliases = Object.keys(CITY_IMAGES).sort((a, b) => b.length - a.length)
  for (const city of aliases) {
    if (key.includes(normalizePlace(city))) return CITY_IMAGES[city]
  }

  return FALLBACK_PHOTOS[hashPlace(key) % FALLBACK_PHOTOS.length]
}

/** Help entry points link to /decide#how-to-use; this event expands the panel when already on /decide. */
export const HELP_ANCHOR = "how-to-use"
export const OPEN_HELP_EVENT = "travel:open-help"

export function openHelp() {
  window.dispatchEvent(new Event(OPEN_HELP_EVENT))
}
