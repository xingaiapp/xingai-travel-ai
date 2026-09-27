# Travel Stories — authoring guide

Stories live in `lib/stories/<season>.ts`, render at `/stories/<season>/<episode>`, and end with a link to `/decide` for the reader's own trip. Product boundary: [ADR 0006](../adr/0006-stories-after-decision.md) — stories are read after a decision, never scored.

## Publishing an episode

1. Rename originals descriptively (`harbour-dusk.heic`) in a folder **outside** the repo.
2. Process them — this strips all EXIF/GPS/camera metadata and writes 800/1600 px WebP:

   ```bash
   node scripts/process-story-photos.mjs ~/Pictures/hk-ep01 hong-kong/01
   ```

3. Paste the printed `src/width/height` snippets into the episode's photo blocks.
4. Replace every `Draft —` line with your own words.
5. Set `status: "published"` and `publishedAt: "YYYY-MM-DD"`. Drafts 404 in production (preview with `STORIES_SHOW_DRAFTS=1`); published episodes appear in `sitemap.xml` and `llms.txt`.

## Privacy rules

- **Location:** neighbourhood level only ("Island East"). Never an estate, building, street number, or anything that identifies where you live. No readable building names or door numbers in photos.
- **People:** family faces only with their consent; children's faces not at all by default. Otherwise backs, hands, or distance shots.
- **Metadata:** never commit originals; never share unprocessed originals with AI tools — run the script first.
- **Timing:** publish after you have left a place, not while you are there.

## Writing rules

- **Takes are yours.** `take`, `quote`, and "would I return" must be first-hand. AI may suggest order, alt text, and missing fields — not opinions.
- **Date anything that goes stale.** Prices, opening hours, and "best time" notes carry the month/year you saw them ("HK$120/person, Mar 2026").
- **Judgment over listing.** Each episode leaves a judgment in the publisher's own words: a `take` block (return / skip / gem / lesson), or a `verdict` with the five rows used on EP01 (worth it, who it's for, budget, time, the catch).
- **No affiliate links in stories.** Booking links belong only in `/result` (ADR 0004).

## Measuring

`/api/track` logs `[story-click]` with `story_from_result` (result page → story) and `story_to_decide` (story CTA → `/decide`). Review after two published episodes before investing in more seasons, short video, or reader contributions.
