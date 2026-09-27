import type { TripRegion } from "@/lib/types"

/** Story copy is written in English first; zh is optional and ko/es fall back to en. */
export type StoryText = { en: string; zh?: string }

export interface StoryPhoto {
  /** Base path without size suffix, e.g. "/stories/hong-kong/01/harbour-dusk". Omit until the photo is processed. */
  src?: string
  width?: number
  height?: number
  alt: StoryText
  caption?: StoryText
  /** Shot-list note shown in the placeholder while `src` is missing (dev only). */
  shot: string
}

export type TakeKind = "return" | "skip" | "gem" | "lesson"

export type StoryBlock =
  | { type: "text"; body: StoryText }
  | { type: "heading"; body: StoryText }
  | { type: "photo"; photo: StoryPhoto; wide?: boolean }
  | { type: "pair"; photos: [StoryPhoto, StoryPhoto] }
  | { type: "quote"; body: StoryText }
  | { type: "take"; items: { kind: TakeKind; text: StoryText }[] }
  | { type: "verdict"; intro: StoryText; rows: { label: StoryText; body: StoryText }[] }

export interface StoryEpisode {
  number: number
  slug: string
  status: "draft" | "published"
  publishedAt?: string
  title: StoryText
  dek: StoryText
  cover: StoryPhoto
  blocks: StoryBlock[]
}

export interface StorySeason {
  slug: string
  /** Destination passed to /decide when a reader wants their own version of this trip. */
  destination: string
  /** Reader-facing place name. `destination` stays the query value used to match comparisons. */
  place: StoryText
  region: TripRegion
  title: StoryText
  subtitle: StoryText
  intro: StoryText
  cover: StoryPhoto
  episodes: StoryEpisode[]
}
