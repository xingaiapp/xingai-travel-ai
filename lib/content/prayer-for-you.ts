import type { Locale } from "@/lib/i18n/types"

type L = Record<Locale, string>

const t = (en: string, zh: string, ko: string, es: string): L => ({ en, zh, ko, es })

/**
 * "A Prayer For You" index (/prayer/for-you): one published film per life
 * situation. Every video id below was verified PUBLIC on the live
 * @xingaitravel channel on 2026-10-16 (YouTube oEmbed + channel/playlist
 * RSS), and every verse is quoted exactly as printed in that film's own
 * publish pack (packs in workspace/productions/xingaitravel-shorts):
 * - sleep    yCI0Wv3n7gQ — pack 2026-10-15 publish_pack_cantsleep.md,
 *            Isaiah 26:3 checked verbatim on BibleGateway 2026-10-15.
 * - anxious  D6wfaDixavQ — pack 2026-10-12 publish_pack_ep04.md (1 Peter 5:7).
 * - carrying WwWgYRVlj_E — goals pack faith-upload-pack-20261014-27.md,
 *            Matthew 11:28 checked verbatim on BibleGateway.
 * - home     40e8-lhMjW8 — pack 2026-10-14 publish_pack_night_tower.md (Ps 42:8).
 * - peace    Za5qO1DWRlA — pack 2026-10-13 publish_pack_ocean_sunset.md (Ps 4:8).
 * - strength 3mc7JCtYaUY — pack 2026-10-13 publish_pack_camp_sunrise.md (Ps 143:8).
 * - thanks   AsWmISdSJfU — pack 2026-10-12 publish_pack_cross_lake.md (Ps 107:1).
 *
 * Deliberately NOT listed yet (unverified / not yet public on 2026-10-16):
 * - "Waiting for an answer" EP05 — publish pack exists but no public video
 *   id could be verified; add only after a public id is confirmed.
 * - jK80WrHqxqc "Needs Peace Tonight (Part 1)" — scheduled 2026-10-16 23:00 CT;
 *   add to the peace cell only after it is actually public.
 * - RWOX8bR8_uI — an earlier Can't Sleep upload id that no longer resolves
 *   as public (oEmbed forbidden); never use.
 */
export interface PrayerSituation {
  key: string
  videoId: string
  videoTitle: string
  heading: L
  /** Verse text exactly as printed in the film's publish pack (English). */
  verse: string
  verseRef: string
}

export const prayerForYouCopy = {
  title: t("A Prayer For You", "為你預備的禱告", "당신을 위한 기도", "Una oración para ti"),
  lead: t(
    "Whatever tonight holds, there is a prayer here with your name on it. Every film was shot in a real place Xing has stood — if your heart needs a place to land, pick the one that sounds like you, rest your eyes on the view, and pray along.",
    "不管你今晚正在經歷什麼，這裡都有一支為你預備的禱告。每一支都是在星哥親自去過的真實地點拍的——如果你的心靈需要一個落腳的地方，挑那支最像你此刻的，眼睛歇在美景裡，跟著一起禱告。",
    "오늘 밤 어떤 시간을 보내고 있든, 당신을 위한 기도가 여기에 있습니다. 모든 영상은 Xing이 직접 서 있었던 실제 장소에서 촬영했습니다. 마음 둘 곳이 필요하다면, 지금의 당신과 가장 닮은 하나를 골라 풍경을 바라보며 함께 기도해 보세요.",
    "Sea lo que sea que traiga esta noche, aquí hay una oración con tu nombre. Cada película se grabó en un lugar real donde estuvo Xing: si tu corazón necesita un lugar donde posarse, elige la que más se parezca a ti, descansa la mirada en la vista y ora con nosotros."
  ),
  playlistsLink: t(
    "Browse the full prayer playlists",
    "看全部禱告播放清單",
    "전체 기도 재생목록 보기",
    "Ver todas las listas de oración"
  ),
}

export const prayerSituations: PrayerSituation[] = [
  {
    key: "sleep",
    videoId: "yCI0Wv3n7gQ",
    videoTitle: "A Prayer For You Who Can't Sleep 🌙🙏",
    heading: t("Can't sleep", "睡不著", "잠이 오지 않을 때", "No puedes dormir"),
    verse: "Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee.",
    verseRef: "Isaiah 26:3 (KJV)",
  },
  {
    key: "anxious",
    videoId: "D6wfaDixavQ",
    videoTitle: "A Prayer For You Who Woke Up Anxious 🌅🙏",
    heading: t("Woke up anxious", "一醒來就焦慮", "불안한 아침", "Despertaste con ansiedad"),
    verse: "Cast all your anxiety on Him — because He cares for you.",
    verseRef: "1 Peter 5:7",
  },
  {
    key: "carrying",
    videoId: "WwWgYRVlj_E",
    videoTitle: "A Prayer For You Who Is Carrying Too Much 🌅🙏",
    heading: t("Carrying too much", "扛得太多", "짐이 너무 무거울 때", "Cargas demasiado"),
    verse: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.",
    verseRef: "Matthew 11:28 (KJV)",
  },
  {
    key: "home",
    videoId: "40e8-lhMjW8",
    videoTitle: "A Prayer For You Who Miss Home Tonight 🌙🙏",
    heading: t("Missing home", "想家", "집이 그리울 때", "Extrañas tu hogar"),
    verse:
      "Yet the LORD will command his lovingkindness in the daytime, and in the night his song shall be with me, and my prayer unto the God of my life.",
    verseRef: "Psalm 42:8 (KJV)",
  },
  {
    key: "peace",
    videoId: "Za5qO1DWRlA",
    videoTitle: "A Prayer For You Who Is Worried About Tomorrow 🌅🙏",
    heading: t("Needing peace", "需要平安", "평안이 필요할 때", "Necesitas paz"),
    verse: "I will both lay me down in peace, and sleep: for thou, LORD, only makest me dwell in safety.",
    verseRef: "Psalm 4:8 (KJV)",
  },
  {
    key: "strength",
    videoId: "3mc7JCtYaUY",
    videoTitle: "A Prayer For You Who Needs Strength For Today 🌅🙏",
    heading: t("Needing strength", "需要力量", "힘이 필요할 때", "Necesitas fuerza"),
    verse: "Cause me to hear thy lovingkindness in the morning; for in thee do I trust.",
    verseRef: "Psalm 143:8 (KJV)",
  },
  {
    key: "thanks",
    videoId: "AsWmISdSJfU",
    videoTitle: "The Cross Above the Lake 🌅 A Prayer of Gratitude",
    heading: t("A thankful heart", "心懷感恩", "감사한 마음", "Un corazón agradecido"),
    verse: "Give thanks to the LORD, for he is good.",
    verseRef: "Psalm 107:1",
  },
]
