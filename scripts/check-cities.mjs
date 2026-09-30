#!/usr/bin/env node
// Validate city-layer data before every build (ADR 0008).
//
//   npm run check:cities
//
// Fails the build on unknown places, backtracking routes, missing reasons,
// missing sources or missing translations. Loads the TypeScript data directly
// through Node's type stripping, so lib/cities/ must not use `@/` imports.

import { existsSync } from "node:fs"
import { hongKong } from "../lib/cities/hong-kong.ts"
import { cityPhotoPaths, validateCity } from "../lib/cities/validate.ts"

const cities = [hongKong]
const errors = cities.flatMap((city) => [
  ...validateCity(city),
  ...cityPhotoPaths(city)
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
