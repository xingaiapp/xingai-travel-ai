import Image from "next/image"
import { cn } from "@/lib/utils"

/** XingAI TRAVEL wordmark — navy type needs a light plate on dark chrome. */
export function TravelBrandMark({
  className,
  title = "XingAI Travel",
  plate = true,
}: Readonly<{
  className?: string
  title?: string
  /** Light plate so navy type stays readable in dark theme. */
  plate?: boolean
}>) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden",
        plate && "rounded-xl bg-white shadow-sm ring-1 ring-black/10 dark:ring-white/15",
        className
      )}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <Image
        src="/assets/travel-logo.png"
        alt=""
        width={128}
        height={128}
        className="h-full w-full object-contain p-[4%]"
        sizes="48px"
      />
    </span>
  )
}
