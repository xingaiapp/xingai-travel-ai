import type { StoryEpisode, StorySeason } from "@/lib/stories/types"

// My Lord, Holy — Places That Made Me Pray (Faith Through Travel sub-series).
// Not a single-destination season: Xing's own words from places across his travels
// where the view itself led him into worship. No `destination` — the decide CTA and
// destination matching are skipped for cross-place seasons (see types.ts).
// Covers are stills from Xing's own Faith Shorts, run through
// scripts/process-story-photos.mjs (EXIF stripped). Verses: en KJV (public domain),
// zh 和合本 (verified wording); ko/es verses and prose are TODO — never machine-translated.

function cover(
  episode: string,
  name: string,
  width: number,
  height: number,
  altEn: string,
): StoryEpisode["cover"] {
  return {
    src: `/stories/my-lord-holy/${episode}/${name}`,
    width,
    height,
    alt: { en: altEn },
    shot: name,
  }
}

const niagaraCover = cover(
  "01",
  "niagara-falls",
  576,
  1024,
  "Niagara Falls in the mist, seen from the boat",
)

const ep01: StoryEpisode = {
  number: 1,
  slug: "01-niagara-falls",
  status: "published",
  title: { en: "Niagara Falls — The Water Never Stops" },
  dek: { en: "Standing in the mist of the falls, feeling very small — and very kept." },
  cover: niagaraCover,
  blocks: [
    { type: "heading", body: { en: "Niagara Falls, Canada" } },
    {
      type: "text",
      body: {
        en: "I stood in the mist at Niagara and felt very small. The water never stops — not at noon, not at midnight — it just keeps pouring, and pouring, and pouring. I stood there soaked and laughing, and my heart was so full it ached, because if His mercy is anything like this water, then it has never once run dry on me. Not on my best days. Not on my worst. I did not have a speech ready. I just whispered it under the roar, the only words that fit: My Lord, holy.",
      },
    },
    {
      type: "quote",
      body: {
        en: "\"The LORD on high is mightier than the noise of many waters, yea, than the mighty waves of the sea.\" — Psalm 93:4 (KJV)",
        zh: "「耶和華在高處大有能力，勝過諸水的響聲，洋海的大浪。」— 詩篇 93:4（和合本）",
      },
    },
    { type: "youtube", youtubeId: "LjFRkfgBtxM", title: { en: "The Power of God at Niagara Falls" } },
  ],
}

const ep02: StoryEpisode = {
  number: 2,
  slug: "02-hong-kong-harbour-night",
  status: "published",
  title: { en: "Hong Kong — The Ferry Still Crosses at 3am" },
  dek: { en: "Awake and anxious at 3am, watching the harbour — and remembering who never sleeps." },
  cover: cover(
    "02",
    "harbour-night-ferry",
    720,
    1280,
    "Victoria Harbour at night, a ferry crossing the dark water",
  ),
  blocks: [
    { type: "heading", body: { en: "Victoria Harbour, Hong Kong" } },
    {
      type: "text",
      body: {
        en: "That night, I was the one still awake at 3am — anxious, worn out, carrying worries I could not put down — watching a ferry cross Victoria Harbour in the dark. The whole city was asleep, but that little ferry was still crossing, back and forth, quiet and faithful in the middle of the night. And something tight in me finally let go. He never sleeps, so I can. I do not have to hold the whole world together until morning. He is awake. He is watching. I can rest. My Lord, holy.",
      },
    },
    {
      type: "quote",
      body: {
        en: "\"Behold, he that keepeth Israel shall neither slumber nor sleep.\" — Psalm 121:4 (KJV)",
        zh: "「保護以色列的，也不打盹，也不睡覺。」— 詩篇 121:4（和合本）",
      },
    },
    { type: "youtube", youtubeId: "g2hUROL-9y4", title: { en: "A Prayer For When You Wake Up At 3am" } },
  ],
}

const ep03: StoryEpisode = {
  number: 3,
  slug: "03-highland-lakes-camp",
  status: "published",
  title: { en: "Highland Lakes Camp — Mercies Before Breakfast" },
  dek: { en: "Sunrise over the camp, before anyone had done a single thing to earn it." },
  cover: cover(
    "03",
    "camp-sunrise",
    1080,
    1920,
    "Sunrise over the cabins and tower at Highland Lakes Camp",
  ),
  blocks: [
    { type: "heading", body: { en: "Highland Lakes Camp, Texas" } },
    {
      type: "text",
      body: {
        en: "Morning at the camp. The sun came up over the cabins and the tower like it had been sent on purpose, just for us. Nobody had done anything yet — no work, no striving, nothing to earn it, nothing to prove — and His mercies were already there, ahead of us, poured out over the grass with the light. I just stood there, empty-handed and grateful, and received it. Grace before breakfast. Grace before anything. My Lord, holy.",
      },
    },
    {
      type: "quote",
      body: {
        en: "\"Cause me to hear thy lovingkindness in the morning; for in thee do I trust.\" — Psalm 143:8 (KJV)",
        zh: "「求你使我清晨得聽你慈愛之言，因我倚靠你。」— 詩篇 143:8（和合本）",
      },
    },
    {
      type: "youtube",
      youtubeId: "3mc7JCtYaUY",
      title: { en: "A Prayer For You Who Needs Strength For Today" },
    },
  ],
}

export const myLordHoly: StorySeason = {
  slug: "my-lord-holy",
  region: "anywhere",
  place: { en: "Places that made me pray" },
  title: { en: "My Lord, Holy" },
  subtitle: { en: "Places That Made Me Pray" },
  introLead: { en: "Where Your Soul Comes Home" },
  introLeadSub: { en: "The once-in-a-lifetime places that wash a weary heart clean." },
  intro: {
    en: "In a world that never stops worrying, every heart needs a place to land. These are the places where mine did. Every scene here is real, somewhere I have stood myself, in the wind, in the light — and every time, God was already there, walking beside me, letting me take in His beautiful world with a quiet heart. This is what a journey means to me: not just seeing beautiful places, but walking through life with Him, one beautiful stop at a time, until the journey is complete. May these places give your heart a place to land, too. 🙏",
  },
  cover: niagaraCover,
  episodes: [ep01, ep02, ep03],
}
