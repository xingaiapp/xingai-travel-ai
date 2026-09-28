"use client"

import { Printer } from "lucide-react"
import { useLocale } from "@/components/locale-provider"

/** Opens the system print dialog — Save as PDF works in every modern browser. */
export function PrintTripButton() {
  const { messages } = useLocale()

  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-card px-4 text-sm font-extrabold text-primary shadow-sm no-print"
    >
      <Printer className="h-4 w-4" aria-hidden />
      {messages.result.printPdf}
    </button>
  )
}
