/**
 * Last real content change per page family, used for sitemap `lastmod`.
 * Bump the matching date when you edit that content — never stamp "now" at build time.
 * Use real UTC clock times (not a shared midnight) so lastmod is not one batch stamp.
 */
export const SHELL_CONTENT_DATE = new Date("2026-10-12T15:20:00.000Z") // chrome / decide / home / legal hubs
export const CITY_CONTENT_DATE = new Date("2026-10-12T18:05:00.000Z")
export const COMPARE_CONTENT_DATE = new Date("2026-10-12T19:40:00.000Z") // bump when shipping new /compare/*
export const GUIDE_CONTENT_DATE = new Date("2026-10-07T16:30:00.000Z")
export const STORIES_INDEX_DATE = new Date("2026-10-10T21:15:00.000Z")
