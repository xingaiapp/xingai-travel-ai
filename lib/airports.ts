/**
 * City name → main international airport (IATA) for flight search links.
 *
 * Names arrive in whatever language the model answered in ("Taipei, Taiwan", "巴塞罗那, 西班牙",
 * "타이베이", "Seúl, Corea del Sur"), so each airport lists EN / 中文 / 한국어 / ES aliases.
 * A miss returns null — never a guess. The old fallback (first three letters of the city)
 * sent Taipei to TAI (Ta'izz, Yemen) and Los Cabos to LOS (Lagos, Nigeria).
 *
 * Every live city guide must resolve here; tests/airports.test.ts enforces that.
 */
const AIRPORT_ALIASES: Record<string, string[]> = {
  // City guides
  HKG: ["hong kong", "香港", "홍콩"],
  NRT: ["tokyo", "tokio", "东京", "東京", "도쿄"],
  ICN: ["seoul", "seul", "首尔", "首爾", "서울"],
  TPE: ["taipei", "台北", "臺北", "타이베이"],
  MFM: ["macau", "macao", "澳门", "澳門", "마카오"],
  SIN: ["singapore", "singapur", "新加坡", "싱가포르"],
  SJD: ["los cabos", "cabo san lucas", "san jose del cabo", "洛斯卡沃斯", "로스카보스"],
  PVG: ["shanghai", "上海", "상하이"],
  LIS: ["lisbon", "lisboa", "里斯本", "리스본"],
  BCN: ["barcelona", "巴塞罗那", "巴塞隆納", "바르셀로나"],
  XIY: ["xi an", "xian", "西安", "시안"],
  MSY: ["new orleans", "nueva orleans", "新奥尔良", "紐奧良", "뉴올리언스"],

  // Other destinations the engine often suggests
  OPO: ["porto", "oporto", "波尔图", "포르투"],
  MAD: ["madrid", "马德里", "마드리드"],
  SVQ: ["seville", "sevilla", "塞维利亚", "세비야"],
  CDG: ["paris", "巴黎", "파리"],
  FCO: ["rome", "roma", "罗马", "로마"],
  FLR: ["florence", "florencia", "佛罗伦萨", "피렌체"],
  VCE: ["venice", "venecia", "威尼斯", "베네치아"],
  AMS: ["amsterdam", "阿姆斯特丹", "암스테르담"],
  PRG: ["prague", "praga", "布拉格", "프라하"],
  VIE: ["vienna", "viena", "维也纳", "비엔나"],
  BUD: ["budapest", "布达佩斯", "부다페스트"],
  ATH: ["athens", "atenas", "雅典", "아테네"],
  IST: ["istanbul", "estambul", "伊斯坦布尔", "이스탄불"],
  LHR: ["london", "londres", "伦敦", "런던"],
  DUB: ["dublin", "都柏林", "더블린"],
  EDI: ["edinburgh", "edimburgo", "爱丁堡", "에든버러"],
  BER: ["berlin", "柏林", "베를린"],
  ZRH: ["zurich", "苏黎世", "취리히"],
  CPH: ["copenhagen", "copenhague", "哥本哈根", "코펜하겐"],
  KEF: ["reykjavik", "雷克雅未克", "레이캬비크"],
  DXB: ["dubai", "迪拜", "두바이"],
  RAK: ["marrakech", "marrakesh", "马拉喀什", "마라케시"],
  CPT: ["cape town", "ciudad del cabo", "开普敦", "케이프타운"],
  KIX: ["osaka", "kyoto", "大阪", "京都", "오사카", "교토"],
  CJU: ["jeju", "济州", "제주"],
  PUS: ["busan", "釜山", "부산"],
  BKK: ["bangkok", "曼谷", "방콕"],
  CNX: ["chiang mai", "清迈", "치앙마이"],
  HKT: ["phuket", "普吉", "푸껫"],
  HAN: ["hanoi", "河内", "하노이"],
  SGN: ["ho chi minh", "saigon", "胡志明", "호찌민"],
  DAD: ["da nang", "danang", "岘港", "다낭"],
  KUL: ["kuala lumpur", "吉隆坡", "쿠알라룸푸르"],
  DPS: ["bali", "巴厘岛", "발리"],
  MNL: ["manila", "马尼拉", "마닐라"],
  PEK: ["beijing", "pekin", "北京", "베이징"],
  SYD: ["sydney", "sidney", "悉尼", "시드니"],
  MEL: ["melbourne", "墨尔本", "멜버른"],
  AKL: ["auckland", "奥克兰", "오클랜드"],
  HNL: ["honolulu", "檀香山", "호놀룰루"],
  MEX: ["mexico city", "ciudad de mexico", "cdmx", "墨西哥城", "멕시코시티"],
  CUN: ["cancun", "tulum", "坎昆", "칸쿤"],
  OAX: ["oaxaca", "瓦哈卡", "오악사카"],
  PVR: ["puerto vallarta", "巴亚尔塔港", "푸에르토바야르타"],
  SJU: ["san juan", "圣胡安", "산후안"],
  LIM: ["lima", "利马", "리마"],
  EZE: ["buenos aires", "布宜诺斯艾利斯", "부에노스아이레스"],
  GIG: ["rio de janeiro", "里约热内卢", "리우데자네이루"],
  JFK: ["new york", "nueva york", "纽约", "뉴욕"],
  LAX: ["los angeles", "洛杉矶", "로스앤젤레스"],
  SFO: ["san francisco", "旧金山", "샌프란시스코"],
  SEA: ["seattle", "西雅图", "시애틀"],
  ORD: ["chicago", "芝加哥", "시카고"],
  MIA: ["miami", "迈阿密", "마이애미"],
  BOS: ["boston", "波士顿", "보스턴"],
  LAS: ["las vegas", "拉斯维加斯", "라스베이거스"],
  DEN: ["denver", "丹佛", "덴버"],
  YVR: ["vancouver", "温哥华", "밴쿠버"],
  YYZ: ["toronto", "多伦多", "토론토"],
  YUL: ["montreal", "蒙特利尔", "몬트리올"],
}

/** Lowercase, strip accents and punctuation ("Xi'an" → "xi an", "Seúl" → "seul"). */
function normalize(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[,，、'’()（）.\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

const isLatin = (alias: string) => /^[a-z ]+$/.test(alias)

// Longest alias first, so "los cabos" is tried before a shorter alias could match inside it.
const ENTRIES: [string, string][] = Object.entries(AIRPORT_ALIASES)
  .flatMap(([code, aliases]) => aliases.map((alias) => [normalize(alias), code] as [string, string]))
  .sort((a, b) => b[0].length - a[0].length)

/** IATA code for a city or place string, or null when we do not know it. */
export function airportCodeFor(place: string): string | null {
  const key = ` ${normalize(place)} `
  if (key.trim() === "") return null
  for (const [alias, code] of ENTRIES) {
    // Latin aliases must match whole words ("rome" must not match inside "jerome").
    if (isLatin(alias) ? key.includes(` ${alias} `) : key.includes(alias)) return code
  }
  return null
}

/**
 * Origin airport from the Decide form's free text: an explicit "(SEA)" wins, then a bare
 * three-letter code ("sea"), then a known city name. Unknown text returns null.
 */
export function originAirportCode(origin: string): string | null {
  const explicit = origin.match(/\(([A-Za-z]{3})\)/)
  if (explicit) return explicit[1].toUpperCase()
  const bare = origin.trim().match(/^[A-Za-z]{3}$/)
  if (bare) return bare[0].toUpperCase()
  return airportCodeFor(origin)
}
