import type { Locale } from "@/lib/i18n/types"

type L = Record<Locale, string>

const t = (en: string, zh: string, ko: string, es: string): L => ({ en, zh, ko, es })

/**
 * Situation keyword map for /prayer/for-you — the ONE place that teaches the
 * page how to file a new "A Prayer For You" film automatically.
 *
 * HOW IT WORKS
 * The page reads the channel's public feeds (uploads + the two prayer
 * playlists) on a 30-minute ISR cycle. Every film whose title belongs to the
 * series is tested against the rows below, top to bottom: the first row with
 * a keyword appearing in the title wins, and the film is filed into that
 * situation's cell (newest first, max 3 per cell). A series film that matches
 * NO row lands in the "Latest prayers" strip at the bottom of the page, so a
 * new episode is never lost — it just waits there until it gets a row here.
 *
 * HOW TO ADD A NEW SITUATION (one row, nothing else to edit)
 * Add ONE row to prayerKeywordMap: a unique `key`, the title keywords that
 * should route a film to it (copy the phrasing the titles actually use), and
 * the four-locale `heading`. Put more specific rows above broader ones —
 * matching stops at the first hit. The new cell appears on the page by
 * itself the next time a matching film shows up in the feeds.
 *
 * Curated cells in lib/content/prayer-for-you.ts keep priority: a curated
 * film is never duplicated by the feed, and when a curated cell exists for a
 * key its hand-checked heading and verse are the ones shown (the heading
 * below is only the fallback for feed-only situations).
 */
export interface PrayerSituationRule {
  key: string
  /** Title substrings (case-insensitive) that route a film to this situation. */
  keywords: string[]
  /** Fallback heading, used when no curated cell exists for this key. */
  heading: L
}

export const prayerKeywordMap: PrayerSituationRule[] = [
  {
    key: "sleep",
    keywords: ["Can't Sleep", "Can’t Sleep", "Wake Up At 3am", "Sleepless"],
    heading: t("Can't sleep", "睡不著", "잠이 오지 않을 때", "No puedes dormir"),
  },
  {
    key: "carrying",
    keywords: ["Carrying Too Much", "Weary"],
    heading: t("Carrying too much", "扛得太多", "짐이 너무 무거울 때", "Cargas demasiado"),
  },
  {
    key: "anxious",
    keywords: ["Woke Up Anxious", "Anxious", "Anxiety"],
    heading: t("Woke up anxious", "一醒來就焦慮", "불안한 아침", "Despertaste con ansiedad"),
  },
  {
    key: "tomorrow",
    keywords: ["Worried About Tomorrow"],
    heading: t("Worried about tomorrow", "為明天擔心", "내일이 걱정될 때", "Te preocupa el mañana"),
  },
  {
    key: "waiting",
    keywords: ["Waiting For An Answer"],
    heading: t("Waiting for an answer", "等答案", "응답을 기다릴 때", "Esperando una respuesta"),
  },
  {
    key: "grief",
    keywords: ["Lost Someone", "Lost A Loved One", "Lost My"],
    heading: t("Lost someone you love", "失去摯愛的人", "사랑하는 사람을 잃었을 때", "Perdiste a alguien que amas"),
  },
  {
    key: "home",
    keywords: ["Miss Home", "Far From Home", "Homesick"],
    heading: t("Missing home", "想家", "집이 그리울 때", "Extrañas tu hogar"),
  },
  {
    key: "starting",
    keywords: ["Starting Over"],
    heading: t("Starting over", "重新開始", "다시 시작할 때", "Empezando de nuevo"),
  },
  {
    key: "strength",
    keywords: ["Needs Strength", "Strength For Today"],
    heading: t("Needing strength", "需要力量", "힘이 필요할 때", "Necesitas fuerza"),
  },
  {
    key: "peace",
    keywords: ["Needs Peace", "In Peace", "Perfect Peace"],
    heading: t("Needing peace", "需要平安", "평안이 필요할 때", "Necesitas paz"),
  },
  {
    key: "thanks",
    keywords: ["Gratitude", "Thankful", "Give Thanks"],
    heading: t("A thankful heart", "心懷感恩", "감사한 마음", "Un corazón agradecido"),
  },
]
