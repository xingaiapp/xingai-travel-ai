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
      type: "text",
      body: {
        en: "The wind and waves were strong, but our Lord kept us safe on the boat and carried us on. No matter how great the storm, our Lord will bring us safely to the other side.",
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
    {
      type: "text",
      body: {
        en: "And here is the falls as I heard it — standing at its foot with nothing but the roar of the water: Thank You, God.",
      },
    },
    {
      type: "youtube",
      youtubeId: "c-S1kFGD0c0",
      title: { en: "Thank You, God — Standing At The Foot Of Niagara Falls" },
    },
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

const ep04: StoryEpisode = {
  number: 4,
  slug: "04-cabo-san-lucas-sunrise",
  status: "published",
  title: { en: "Cabo San Lucas — New Every Morning" },
  dek: { en: "A sunrise over the Pacific in Cabo — and mercies that had arrived before I did." },
  cover: cover(
    "04",
    "cabo-sunrise",
    1600,
    2844,
    "Sunrise over a Cabo San Lucas beach, footprints in the sand",
  ),
  blocks: [
    { type: "heading", body: { en: "Cabo San Lucas, Mexico" } },
    {
      type: "text",
      body: {
        en: "I stood on the sand in Cabo San Lucas before the day began, watching the sun come up over the Pacific. Nothing had gone wrong yet that day — nothing had gone right yet, either — and still His mercies were already there ahead of me, new with the morning, like they had never once been spent. I did not earn that sunrise. I just received it, with sandy feet and a quiet heart. My Lord, holy.",
      },
    },
    {
      type: "quote",
      body: {
        en: "\"It is of the LORD's mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.\" — Lamentations 3:22–23 (KJV)",
        zh: "「我們不至消滅，是出於耶和華諸般的慈愛；是因他的憐憫不至斷絕。每早晨，這都是新的；你的誠實極其廣大！」— 耶利米哀歌 3:22–23（和合本）",
      },
    },
    {
      type: "youtube",
      youtubeId: "vUQxUD6Lr0k",
      aspect: "landscape",
      title: { en: "Sunrise in Cabo San Lucas — A Moment of Prayer" },
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
  episodes: [ep01, ep02, ep03, ep04],
}
