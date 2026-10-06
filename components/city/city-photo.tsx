"use client"

import Link from "next/link"
import { useLocale } from "@/components/locale-provider"
import { StoryImage } from "@/components/story-view"
import { cityText } from "@/lib/cities"
import type { CityPhoto as CityPhotoData } from "@/lib/cities/types"
import { cn } from "@/lib/utils"

/** A cropped, full-bleed photo with its credit. Reuses the story image pipeline (800/1600 webp). */
export function CityPhoto({
  photo,
  className,
  sizes,
  priority = false,
  showCredit = true,
  /** Prefer always-on 1600w for city heroes / route cards (sharper on retina). */
  hires = true,
}: Readonly<{
  photo: CityPhotoData
  className?: string
  sizes?: string
  priority?: boolean
  showCredit?: boolean
  hires?: boolean
}>) {
  const { locale, messages } = useLocale()
  return (
    <figure className={cn("relative overflow-hidden bg-muted", className)}>
      <StoryImage
        photo={{ ...photo, shot: "" }}
        sizes={sizes}
        priority={priority}
        hires={hires}
        className="h-full max-h-none w-full rounded-none object-cover"
      />
      {showCredit && (
        <figcaption className="absolute bottom-0 right-0 rounded-tl-md bg-background/80 px-2 py-0.5 text-[0.6875rem] text-muted-foreground backdrop-blur">
          {messages.city.photoFrom}:{" "}
          <Link href={photo.credit.href} className="font-semibold hover:text-primary">
            {cityText(photo.credit.label, locale)}
          </Link>
        </figcaption>
      )}
    </figure>
  )
}
