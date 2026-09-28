"use client"

import { useLocale } from "@/components/locale-provider"
import { LOCALE_NAMES } from "@/lib/i18n"
import type { TripContext } from "@/lib/types"

/** AI text keeps the language it was generated in; offer a rerun when the UI language has changed since. */
export function LanguageMismatch({
  from,
  onRegenerate,
}: Readonly<{ from: NonNullable<TripContext["locale"]>; onRegenerate: () => void }>) {
  const { messages, locale } = useLocale()
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-md border border-primary/30 bg-primary/5 px-4 py-3 text-sm">
      <span className="text-muted-foreground">{messages.result.langMismatch.replace("{lang}", LOCALE_NAMES[from])}</span>
      <button type="button" onClick={onRegenerate} className="font-extrabold text-primary hover:underline">
        {messages.result.regenerateIn.replace("{lang}", LOCALE_NAMES[locale])} →
      </button>
    </div>
  )
}
