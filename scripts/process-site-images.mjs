#!/usr/bin/env node
/**
 * Keep public site imagery at publishable resolution.
 *
 *   node scripts/process-site-images.mjs [--check] [--force]
 *
 * --check  Exit 1 if any wired asset is below minimum width.
 * --force  Re-export even when output already meets minimum.
 *
 * Wired assets only (referenced from app/components/lib). Stories use
 * scripts/process-story-photos.mjs.
 */

import { existsSync, mkdtempSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import path from "node:path"
import sharp from "sharp"

const root = process.cwd()
const assets = path.join(root, "public", "assets")
const stories = path.join(root, "public", "stories")

/** @type {{ out: string, minWidth: number, build: () => Promise<sharp.Sharp> }[]} */
const jobs = [
  {
    out: "dest-hong-kong-v2.webp",
    minWidth: 1600,
    build: () => cardFromHero("home-hero-hong-kong.webp"),
  },
  {
    out: "dest-tokyo-v2.webp",
    minWidth: 1600,
    build: () => cardFromHero("home-hero-tokyo.webp"),
  },
  {
    out: "dest-seoul-v2.webp",
    minWidth: 1600,
    build: () => cardFromHero("home-hero-seoul.webp"),
  },
  {
    out: "dest-los-cabos-v2.webp",
    minWidth: 1600,
    build: () => cardFromHero("home-hero-los-cabos.webp"),
  },
  {
    out: "footer-traveler-hong-kong.webp",
    minWidth: 2400,
    build: () => coverWidth(path.join(assets, "footer-traveler-hong-kong.webp"), 2560),
  },
  {
    out: "home-hero-harbour-v2.webp",
    minWidth: 1920,
    build: () =>
      hero169FromFile(
        path.join(stories, "hong-kong/01/harbour-promenade-skyline-1600.webp"),
        2560
      ),
  },
  {
    out: "hero-travel-decision.webp",
    minWidth: 2400,
    build: () => coverWidth(path.join(assets, "hero-travel-decision.png"), 2560),
  },
  {
    out: "destination-lisbon-card.webp",
    source: "destination-lisbon-card.webp",
    minWidth: 1600,
    build: () => coverWidth(path.join(assets, "destination-lisbon-card.webp"), 1600),
  },
  {
    out: "destination-taipei-card.webp",
    source: "destination-taipei-card.webp",
    minWidth: 1600,
    build: () => coverWidth(path.join(assets, "destination-taipei-card.webp"), 1600),
  },
  {
    out: "destination-shanghai-card.webp",
    source: "destination-shanghai-card.webp",
    minWidth: 1600,
    build: () => coverWidth(path.join(assets, "destination-shanghai-card.webp"), 1600),
  },
  {
    out: "destination-new-orleans-card.webp",
    source: "destination-new-orleans-card.webp",
    minWidth: 1600,
    build: () => coverWidth(path.join(assets, "destination-new-orleans-card.webp"), 1600),
  },
  {
    out: "destination-lisbon-thumb.webp",
    minWidth: 800,
    build: async () => {
      const card = path.join(assets, "destination-lisbon-card.webp")
      return sharp(card).rotate().resize({ width: 800, withoutEnlargement: false }).webp({ quality: 86 })
    },
  },
]

const scratch = mkdtempSync(path.join(tmpdir(), "travel-site-img-"))

async function writeJob(job, pipeline) {
  const outPath = path.join(assets, job.out)
  const temp = path.join(scratch, job.out)
  await pipeline.toFile(temp)
  const { renameSync } = await import("node:fs")
  renameSync(temp, outPath)
}

async function cardFromHero(file) {
  const src = path.join(assets, file)
  return sharp(src)
    .rotate()
    .resize({ width: 1600, height: 1000, fit: "cover", position: "centre" })
    .webp({ quality: 88 })
}

async function hero169FromFile(srcPath, width) {
  const height = Math.round((width * 9) / 16)
  return sharp(srcPath)
    .rotate()
    .resize({ width, height, fit: "cover", position: "centre", withoutEnlargement: false })
    .webp({ quality: 88 })
}

async function coverWidth(srcPath, width) {
  if (!existsSync(srcPath)) throw new Error(`Missing source: ${srcPath}`)
  return sharp(srcPath)
    .rotate()
    .resize({ width, withoutEnlargement: false })
    .webp({ quality: 88 })
}

async function widthOf(file) {
  const meta = await sharp(file).metadata()
  return meta.width ?? 0
}

const checkOnly = process.argv.includes("--check")
const force = process.argv.includes("--force")

const failures = []

for (const job of jobs) {
  const outPath = path.join(assets, job.out)
  const current = existsSync(outPath) ? await widthOf(outPath) : 0
  if (checkOnly) {
    if (current < job.minWidth) failures.push(`${job.out}: ${current}px (need ≥${job.minWidth})`)
    continue
  }
  if (!force && current >= job.minWidth) {
    console.log(`ok    ${job.out} (${current}px)`)
    continue
  }
  const pipeline = await job.build()
  await writeJob(job, pipeline)
  const next = await widthOf(outPath)
  console.log(`wrote ${job.out} → ${next}px`)
  if (next < job.minWidth) failures.push(`${job.out}: ${next}px after export`)
}

/** Hero carousel — must stay 2560×1440 */
const heroNames = ["home-hero-hong-kong.webp", "home-hero-tokyo.webp", "home-hero-seoul.webp", "home-hero-los-cabos.webp"]
for (const name of heroNames) {
  const p = path.join(assets, name)
  if (!existsSync(p)) {
    failures.push(`${name}: missing`)
    continue
  }
  const w = await widthOf(p)
  if (w < 2400) failures.push(`${name}: ${w}px (hero carousel need ≥2400)`)
  else if (!checkOnly) console.log(`ok    ${name} (${w}px)`)
}

if (failures.length) {
  console.error("\nBelow minimum:")
  for (const line of failures) console.error(`  - ${line}`)
  process.exit(1)
}

if (checkOnly) console.log("All wired site assets meet minimum width.")

rmSync(scratch, { recursive: true, force: true })
