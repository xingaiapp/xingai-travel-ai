import { describe, expect, it } from "vitest"
import { prayerSituations } from "@/lib/content/prayer-for-you"
import {
  buildPrayerPageData,
  extractVerse,
  isPrayerSeriesTitle,
  matchSituationKey,
  type FeedPrayerVideo,
} from "@/lib/prayer-match"

/**
 * Fixtures mirror the live channel feeds as read on 2026-10-16 (uploads +
 * "My Lord, Holy" / "With You Tonight" playlist RSS): real titles, real
 * description shapes — quoted verse + reference in the publish-pack format.
 */
const feedVideo = (partial: Partial<FeedPrayerVideo> & { id: string; title: string }): FeedPrayerVideo => ({
  published: "2026-10-15T00:00:00+00:00",
  description: "",
  ...partial,
})

const CARRYING_FEED_COPY = feedVideo({
  id: "WwWgYRVlj_E", // same id as the curated carrying cell
  title: "A Prayer For You Who Is Carrying Too Much 🌅🙏",
  published: "2026-10-16T00:00:00+00:00",
  description: 'If you are carrying too much tonight, this minute is for you.\n\n"Come unto me, all ye that labour and are heavy laden, and I will give you rest." — Matthew 11:28 (KJV)',
})

const WEARY = feedVideo({
  id: "6noJw3LaOoI",
  title: "A Prayer For You Who Is Weary 🌅🙏",
  published: "2026-10-15T12:00:00+00:00",
  description:
    'A prayer for you, carrying more than you can hold tonight.\n\n"Come unto me, all ye that labour and are heavy laden, and I will give you rest." — Matthew 11:28 (KJV)',
})

const AT_3AM = feedVideo({
  id: "g2hUROL-9y4",
  title: "A Prayer For When You Wake Up At 3am 🌙🙏",
  published: "2026-10-14T00:00:00+00:00",
  description:
    'If you\'re watching this at 3am, this prayer is for you.\n\n"I will both lay me down in peace, and sleep: for thou, LORD, only makest me dwell in safety." — Psalm 4:8 (KJV)',
})

const LOST_SOMEONE = feedVideo({
  id: "tH1TMDph8k8",
  title: "A Prayer For You Who Lost Someone 🌅🙏",
  published: "2026-10-13T00:00:00+00:00",
  description: "A prayer for you, missing someone tonight. The Lord is close to the brokenhearted — you do not grieve alone. (Psalm 34:18) 🌅🙏",
})

const STARTING_OVER = feedVideo({
  id: "6PYjVQE7OoA",
  title: "A Prayer For You Who Is Starting Over 🌅🙏",
  published: "2026-10-15T00:00:00+00:00",
  description: "A prayer for you, starting over today. His mercies never come to an end — they are new every morning. (Lamentations 3:22–23) 🌅🙏",
})

const UNKNOWN_SITUATION = feedVideo({
  id: "surgeryFixture1",
  title: "A Prayer For You Who Is Facing Surgery 🌅🙏",
  published: "2026-10-16T06:00:00+00:00",
  description: "A prayer for you, facing surgery tomorrow.",
})

const NON_SERIES = feedVideo({
  id: "JJemSURcd0Y",
  title: "A Slow Morning in Cabo: Lagoons, a Serenity Pool & Palms in the Water 🌴",
  published: "2026-10-14T00:00:00+00:00",
})

describe("isPrayerSeriesTitle", () => {
  it("accepts the series banner and its sibling phrasing", () => {
    expect(isPrayerSeriesTitle("A Prayer For You Who Can't Sleep 🌙🙏")).toBe(true)
    expect(isPrayerSeriesTitle("A Prayer For When You Wake Up At 3am 🌙🙏")).toBe(true)
  })

  it("rejects non-series films, even prayer-adjacent ones", () => {
    expect(isPrayerSeriesTitle("A Slow Morning in Cabo 🌴")).toBe(false)
    expect(isPrayerSeriesTitle("Thank You, God — Face To Face With Niagara Falls 🌊🙏")).toBe(false)
    expect(isPrayerSeriesTitle("The Cross Above the Lake 🌅 A Prayer of Gratitude")).toBe(false)
  })
})

describe("matchSituationKey", () => {
  it("routes known titles to their situations", () => {
    expect(matchSituationKey("A Prayer For You Who Can't Sleep 🌙🙏")).toBe("sleep")
    expect(matchSituationKey("A Prayer For When You Wake Up At 3am 🌙🙏")).toBe("sleep")
    expect(matchSituationKey("A Prayer For You Who Is Carrying Too Much 🌅🙏")).toBe("carrying")
    expect(matchSituationKey("A Prayer For You Who Is Weary 🌅🙏")).toBe("carrying")
    expect(matchSituationKey("A Prayer For You Who Woke Up Anxious 🌅🙏")).toBe("anxious")
    expect(matchSituationKey("A Prayer For You Who Is Worried About Tomorrow 🌅🙏")).toBe("tomorrow")
    expect(matchSituationKey("A Prayer For You Who Is Waiting For An Answer 🌅🙏")).toBe("waiting")
    expect(matchSituationKey("A Prayer For You Who Lost Someone 🌅🙏")).toBe("grief")
    expect(matchSituationKey("A Prayer For You Who Miss Home Tonight 🌙🙏")).toBe("home")
    expect(matchSituationKey("A Prayer For You Who Is Starting Over 🌅🙏")).toBe("starting")
    expect(matchSituationKey("A Prayer For You Who Needs Strength For Today 🌅🙏")).toBe("strength")
    expect(matchSituationKey("A Prayer For You Who Needs Peace Tonight 🌙🙏 (Part 1)")).toBe("peace")
  })

  it("returns null for a situation nobody has added a keyword row for yet", () => {
    expect(matchSituationKey("A Prayer For You Who Is Facing Surgery 🌅🙏")).toBeNull()
  })
})

describe("extractVerse", () => {
  it("reads the dash format with KJV marker", () => {
    expect(extractVerse('"Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee." — Isaiah 26:3 (KJV)')).toEqual({
      verse: "Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee.",
      verseRef: "Isaiah 26:3 (KJV)",
    })
  })

  it("reads the parenthetical format", () => {
    expect(extractVerse('The sun rose over the camp. "Cause me to hear thy lovingkindness in the morning; for in thee do I trust." (Psalm 143:8) 🌅🙏')).toEqual({
      verse: "Cause me to hear thy lovingkindness in the morning; for in thee do I trust.",
      verseRef: "Psalm 143:8",
    })
  })

  it("returns null when the verse is paraphrased without quotes — never invents one", () => {
    expect(extractVerse(STARTING_OVER.description)).toBeNull()
    expect(extractVerse(LOST_SOMEONE.description)).toBeNull()
    expect(extractVerse("")).toBeNull()
    expect(extractVerse("No scripture here at all.")).toBeNull()
  })
})

describe("buildPrayerPageData", () => {
  it("falls back to the curated cells alone when the feeds are empty", () => {
    const data = buildPrayerPageData(prayerSituations, [])
    expect(data.cells).toHaveLength(prayerSituations.length)
    expect(data.latest).toHaveLength(0)
    for (const cell of data.cells) {
      expect(cell.videos).toHaveLength(1)
      expect(cell.videos[0].curated).toBe(true)
    }
  })

  it("never duplicates a curated film that also appears in the feed", () => {
    const data = buildPrayerPageData(prayerSituations, [CARRYING_FEED_COPY])
    const carrying = data.cells.find((c) => c.key === "carrying")
    expect(carrying?.videos).toHaveLength(1)
    expect(carrying?.videos[0].videoId).toBe("WwWgYRVlj_E")
    expect(carrying?.videos[0].curated).toBe(true)
    expect(data.latest).toHaveLength(0)
  })

  it("auto-files today's Carrying follow-ups: Weary lands in the carrying cell with its verse", () => {
    const data = buildPrayerPageData(prayerSituations, [WEARY])
    const carrying = data.cells.find((c) => c.key === "carrying")
    expect(carrying?.videos.map((v) => v.videoId)).toEqual(["WwWgYRVlj_E", "6noJw3LaOoI"])
    expect(carrying?.videos[1].verse).toContain("Come unto me")
    expect(carrying?.videos[1].verseRef).toBe("Matthew 11:28 (KJV)")
  })

  it("files the 3am film into the sleep cell (Carrying-verified auto-match path)", () => {
    const data = buildPrayerPageData(prayerSituations, [AT_3AM])
    const sleep = data.cells.find((c) => c.key === "sleep")
    expect(sleep?.videos.map((v) => v.videoId)).toEqual(["yCI0Wv3n7gQ", "g2hUROL-9y4"])
    expect(sleep?.videos[1].verseRef).toBe("Psalm 4:8 (KJV)")
  })

  it("dedupes the grief film against its curated cell (curated entry wins)", () => {
    const data = buildPrayerPageData(prayerSituations, [LOST_SOMEONE])
    const grief = data.cells.find((c) => c.key === "grief")
    expect(grief?.videos).toHaveLength(1)
    expect(grief?.videos[0].videoId).toBe("tH1TMDph8k8")
    expect(grief?.videos[0].curated).toBe(true)
    expect(grief?.videos[0].verseRef).toBe("Psalm 34:18")
  })

  it("creates new cells from the keyword map for situations without a curated entry", () => {
    const data = buildPrayerPageData(prayerSituations, [STARTING_OVER])
    const starting = data.cells.find((c) => c.key === "starting")
    expect(starting?.videos[0].videoId).toBe("6PYjVQE7OoA")
    expect(starting?.heading.en).toBe("Starting over")
    expect(starting?.videos[0].verse).toBeUndefined()
  })

  it("sends an unknown-situation episode to the Latest prayers strip, never drops it", () => {
    const data = buildPrayerPageData(prayerSituations, [UNKNOWN_SITUATION])
    expect(data.latest.map((v) => v.videoId)).toEqual(["surgeryFixture1"])
    expect(data.cells.every((c) => c.videos.every((v) => v.videoId !== "surgeryFixture1"))).toBe(true)
  })

  it("ignores non-series films entirely", () => {
    const data = buildPrayerPageData(prayerSituations, [NON_SERIES])
    expect(data.latest).toHaveLength(0)
    expect(data.cells).toHaveLength(prayerSituations.length)
  })

  it("caps a cell at 3 videos and overflows the rest to Latest, newest first", () => {
    const extra = (n: number, day: string) =>
      feedVideo({
        id: `weary${n}`,
        title: "A Prayer For You Who Is Weary 🌅🙏",
        published: `2026-10-${day}T00:00:00+00:00`,
      })
    const data = buildPrayerPageData(prayerSituations, [extra(1, "11"), extra(2, "12"), extra(3, "13"), extra(4, "14")])
    const carrying = data.cells.find((c) => c.key === "carrying")
    expect(carrying?.videos.map((v) => v.videoId)).toEqual(["WwWgYRVlj_E", "weary4", "weary3"])
    expect(data.latest.map((v) => v.videoId)).toEqual(["weary2", "weary1"])
  })
})
