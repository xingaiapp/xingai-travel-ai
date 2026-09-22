"use client"

import { useState } from "react"
import { Check, Share2 } from "lucide-react"
import { track } from "@vercel/analytics"
import { useLocale } from "@/components/locale-provider"
import { encodeSharedTrip } from "@/lib/share-codec"
import type { CompareResult, PlanResult } from "@/lib/types"

/** Shares the comparison and plan only. TripContext (origin, dates, budget) never leaves the device. */
export function ShareTripButton({ compare, plan, title }: { compare: CompareResult; plan: PlanResult | null; title: string }) {
  const { messages } = useLocale()
  const r = messages.result
  const [state, setState] = useState<"idle" | "busy" | "copied" | "failed">("idle")

  async function share() {
    if (state === "busy") return
    setState("busy")
    try {
      const url = `${window.location.origin}/s?d=${await encodeSharedTrip(compare, plan)}`
      if (typeof navigator.share === "function") {
        try {
          await navigator.share({ title, text: `${title} — ${r.sharedFrom}`, url })
          track("share", { app: "travel", method: "native" })
          setState("idle")
          return
        } catch (err) {
          if (err instanceof DOMException && err.name === "AbortError") {
            setState("idle")
            return
          }
        }
      }
      await navigator.clipboard.writeText(url)
      track("share", { app: "travel", method: "copy" })
      setState("copied")
      window.setTimeout(() => setState("idle"), 2500)
    } catch {
      setState("failed")
      window.setTimeout(() => setState("idle"), 2500)
    }
  }

  const label = state === "copied" ? r.shareCopied : state === "failed" ? r.shareFailed : r.share
  return (
    <button
      type="button"
      onClick={() => void share()}
      disabled={state === "busy"}
      aria-live="polite"
      className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-4 text-sm font-extrabold text-primary-foreground shadow-sm disabled:opacity-60"
    >
      {state === "copied" ? <Check className="h-4 w-4" aria-hidden /> : <Share2 className="h-4 w-4" aria-hidden />}
      {label}
    </button>
  )
}
