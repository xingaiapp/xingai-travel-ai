#!/usr/bin/env node
/**
 * Export 2400×1260 JPEG Open Graph crops under public/assets/og/.
 *
 *   node scripts/export-og-jpgs.mjs
 *
 * Sources: city heroes + story episode covers. Display pages keep webp;
 * share metadata uses these JPEGs (WeChat / older crawlers).
 */

import { existsSync, mkdirSync } from "node:fs"
import path from "node:path"
import sharp from "sharp"

const root = process.cwd()
const outDir = path.join(root, "public", "assets", "og")
mkdirSync(outDir, { recursive: true })

/** @param {string} src */
function stemFromSrc(src) {
  let key = src
  if (!/\.(webp|png|jpe?g)(\?|$)/i.test(key)) key = `${key}-1600.webp`
  return key
    .replace(/^\//, "")
    .replace(/\.(webp|png)$/i, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

/** @param {string} src */
function resolveFile(src) {
  let key = src
  if (!/\.(webp|png|jpe?g)(\?|$)/i.test(key)) key = `${key}-1600.webp`
  return path.join(root, "public", key.replace(/^\//, ""))
}

const srcs = [
  "/assets/home-hero-hong-kong.webp",
  "/assets/home-hero-tokyo.webp",
  "/assets/home-hero-seoul.webp",
  "/assets/home-hero-los-cabos.webp",
  "/assets/destination-taipei-card.webp",
  "/assets/destination-shanghai-card.webp",
  "/assets/destination-lisbon-card.webp",
  "/assets/destination-new-orleans-card.webp",
  "/assets/hero-travel-decision.webp",
  "/stories/hong-kong/01/harbour-promenade-skyline",
  "/stories/hong-kong/01/red-sail-junk",
  "/stories/hong-kong/02/roast-meat-rice-eggs",
  "/stories/macau/01/londoner-big-ben",
  "/stories/macau/02/portuguese-paving-lanterns",
  "/stories/los-cabos/01/morning-by-the-sea",
  "/stories/los-cabos/01/shore-gold-sunrise",
  "/stories/los-cabos/02/a-little-time-away",
  "/stories/los-cabos/02/infinity-pool-ocean",
  "/stories/los-cabos/03/an-evening-to-savor",
  "/stories/los-cabos/03/oysters-mist-pour",
  "/stories/los-cabos/04/memories-between-the-views",
  "/stories/los-cabos/04/footprints-along-shore",
]

const W = 2400
const H = 1260
let wrote = 0
for (const src of srcs) {
  const file = resolveFile(src)
  const out = path.join(outDir, `${stemFromSrc(src)}.jpg`)
  if (!existsSync(file)) {
    console.error(`missing ${src}`)
    process.exitCode = 1
    continue
  }
  await sharp(file)
    .rotate()
    .resize({ width: W, height: H, fit: "cover", position: "centre" })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(out)
  console.log(`wrote ${path.relative(root, out)}`)
  wrote += 1
}
console.log(`done ${wrote}/${srcs.length}`)
