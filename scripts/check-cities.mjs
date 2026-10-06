#!/usr/bin/env node
// Validate city-layer data before every build (ADR 0008).
//
//   npm run check:cities
//
// Fails the build on unknown places, backtracking routes, missing reasons,
// missing sources or missing translations. Loads the TypeScript data directly
// through Node's type stripping, so lib/cities/ must not use `@/` imports.

import { existsSync } from "node:fs"
import { barcelona } from "../lib/cities/barcelona.ts"
import { hongKong } from "../lib/cities/hong-kong.ts"
import { lisbon } from "../lib/cities/lisbon.ts"
import { losCabos } from "../lib/cities/los-cabos.ts"
import { macau } from "../lib/cities/macau.ts"
import { seoul } from "../lib/cities/seoul.ts"
import { shanghai } from "../lib/cities/shanghai.ts"
import { singapore } from "../lib/cities/singapore.ts"
import { taipei } from "../lib/cities/taipei.ts"
import { tokyo } from "../lib/cities/tokyo.ts"
import { cityPhotoPaths, validateCity } from "../lib/cities/validate.ts"

const cities = [
  hongKong,
  tokyo,
  seoul,
  taipei,
  macau,
  singapore,
  losCabos,
  shanghai,
  lisbon,
  barcelona,
]
const errors = cities.flatMap((city) => [
  ...validateCity(city),
  ...cityPhotoPaths(city)
    .filter((path) => !/^https?:\/\//i.test(path))
    .filter((path) => !existsSync(new URL(`../public${path}`, import.meta.url)))
    .map((path) => `${city.slug} › photo missing on disk: public${path}`),
])

if (errors.length > 0) {
  console.error(`City data check failed (${errors.length}):`)
  for (const error of errors) console.error(`  - ${error}`)
  process.exit(1)
}

for (const city of cities) {
  console.log(`✓ ${city.slug}: ${city.places.length} places, ${city.clusters.length} clusters, ${city.routes.length} routes`)
}
