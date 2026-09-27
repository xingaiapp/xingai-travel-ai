#!/usr/bin/env node
// Turn original travel photos into publishable story images.
//
//   node scripts/process-story-photos.mjs <input-dir> <season>/<episode> [--force]
//   node scripts/process-story-photos.mjs ~/Pictures/hk-ep01 hong-kong/01
//
// For every JPEG/PNG/WebP/HEIC in <input-dir> it writes, under public/stories/<season>/<episode>/:
//   <name>-800.webp and <name>-1600.webp  (orientation applied, ALL metadata stripped: EXIF, GPS, camera)
// then prints a `src/width/height` snippet to paste into lib/stories/<season>.ts.
// Rename originals to something descriptive first (harbour-dusk.heic); the file name becomes the URL.
// Originals never enter the repo. Each output is re-read to prove it carries no EXIF.

import { execFileSync } from "node:child_process"
import { mkdtempSync, mkdirSync, readdirSync, rmSync, existsSync } from "node:fs"
import { tmpdir } from "node:os"
import path from "node:path"
import sharp from "sharp"

const WIDTHS = [800, 1600]
const INPUT_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif"])

const args = process.argv.slice(2)
const force = args.includes("--force")
const [inputDir, target] = args.filter((arg) => !arg.startsWith("--"))

if (!inputDir || !target || !/^[a-z0-9-]+\/[a-z0-9-]+$/.test(target)) {
  console.error("Usage: node scripts/process-story-photos.mjs <input-dir> <season>/<episode> [--force]")
  process.exit(1)
}

const outDir = path.join(process.cwd(), "public", "stories", target)
mkdirSync(outDir, { recursive: true })
const scratch = mkdtempSync(path.join(tmpdir(), "story-photos-"))

function slugify(file) {
  return path
    .parse(file)
    .name.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

// sharp's prebuilt libvips cannot decode HEIC; macOS sips can.
function readable(file) {
  const ext = path.extname(file).toLowerCase()
  if (ext !== ".heic" && ext !== ".heif") return file
  const jpg = path.join(scratch, `${path.parse(file).name}.jpg`)
  execFileSync("sips", ["-s", "format", "jpeg", file, "--out", jpg], { stdio: "ignore" })
  return jpg
}

const files = readdirSync(inputDir)
  .filter((file) => INPUT_EXT.has(path.extname(file).toLowerCase()))
  .sort()

if (files.length === 0) {
  console.error(`No photos found in ${inputDir}`)
  process.exit(1)
}

const manifest = []
const seen = new Set()
try {
  for (const file of files) {
    const name = slugify(file)
    if (seen.has(name)) throw new Error(`Two inputs map to "${name}" — rename one of them.`)
    seen.add(name)

    const largest = path.join(outDir, `${name}-${WIDTHS.at(-1)}.webp`)
    if (existsSync(largest) && !force) {
      console.log(`skip  ${file} (exists; --force to redo)`)
      continue
    }

    const source = readable(path.join(inputDir, file))
    let size = null
    for (const width of WIDTHS) {
      const out = path.join(outDir, `${name}-${width}.webp`)
      // sharp drops all metadata unless withMetadata() is called; rotate() bakes in EXIF orientation first.
      const info = await sharp(source).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out)
      const meta = await sharp(out).metadata()
      if (meta.exif || meta.xmp || meta.iptc) throw new Error(`${out} still has metadata — refusing to continue.`)
      size = { width: info.width, height: info.height }
    }
    manifest.push({ src: `/stories/${target}/${name}`, ...size, from: file })
    console.log(`ok    ${file} → ${name} (${size.width}×${size.height}, metadata stripped)`)
  }
} finally {
  rmSync(scratch, { recursive: true, force: true })
}

if (manifest.length > 0) {
  console.log("\nPaste into the story file:\n")
  for (const item of manifest) {
    console.log(`  src: "${item.src}", width: ${item.width}, height: ${item.height}, // ${item.from}`)
  }
}
