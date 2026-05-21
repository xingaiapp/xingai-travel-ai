import { cpSync, existsSync, rmSync } from "node:fs"

const src = "docs/ux-v1"
const dest = "public"

if (!existsSync(src)) {
  console.error(`Missing ${src} — cannot deploy UX static site.`)
  process.exit(1)
}

if (existsSync(dest)) rmSync(dest, { recursive: true, force: true })
cpSync(src, dest, { recursive: true })
console.log(`Travel UX V1: copied ${src}/ → ${dest}/`)
