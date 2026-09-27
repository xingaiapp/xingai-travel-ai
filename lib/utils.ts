import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Shared city → image mapping used by DestinationCompare and SideInsightCard
export const CITY_IMAGES: Record<string, string> = {
  lisbon: "/assets/destination-lisbon-card.webp",
  porto: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&q=75",
  barcelona: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&q=75",
  madrid: "https://images.unsplash.com/photo-1543785734-4b6e564642f8?w=400&q=75",
  paris: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=75",
  rome: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=75",
  tokyo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=75",
  bangkok: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&q=75",
  bali: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=75",
  amsterdam: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=400&q=75",
  prague: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=400&q=75",
  vienna: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=400&q=75",
  athens: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=400&q=75",
  istanbul: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&q=75",
  dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=75",
  singapore: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&q=75",
  "new york": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&q=75",
  "mexico city": "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=400&q=75",
  "buenos aires": "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=400&q=75",
  "cape town": "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400&q=75",
}

export function getCityImage(cityName: string): string {
  const key = cityName.toLowerCase()
  for (const [city, url] of Object.entries(CITY_IMAGES)) {
    if (key.includes(city)) return url
  }
  return "/assets/destination-lisbon-card.webp"
}

/** Help entry points link to /decide#how-to-use; this event expands the panel when already on /decide. */
export const HELP_ANCHOR = "how-to-use"
export const OPEN_HELP_EVENT = "travel:open-help"

export function openHelp() {
  window.dispatchEvent(new Event(OPEN_HELP_EVENT))
}
