"use client"

import { AlertTriangle, Cloud, Info, Lock, Users, Stethoscope } from "lucide-react"
import { useLocale } from "@/components/locale-provider"
import type { TripWarning, WarningType, WarningSeverity } from "@/lib/types"
import { cn } from "@/lib/utils"

function warningIcon(type: WarningType) {
  if (type === "weather") return <Cloud className="h-4 w-4 shrink-0" aria-hidden />
  if (type === "security") return <Lock className="h-4 w-4 shrink-0" aria-hidden />
  if (type === "crowds") return <Users className="h-4 w-4 shrink-0" aria-hidden />
  if (type === "health") return <Stethoscope className="h-4 w-4 shrink-0" aria-hidden />
  return <Info className="h-4 w-4 shrink-0" aria-hidden />
}

function severityStyles(severity: WarningSeverity) {
  if (severity === "warning") return {
    wrap: "border-red-200 bg-red-50 dark:border-red-900/60 dark:bg-red-950/40",
    icon: "text-red-600 dark:text-red-400",
    title: "text-red-800 dark:text-red-300",
    body: "text-red-700 dark:text-red-400",
    badge: "bg-red-100 text-red-700 dark:bg-red-900/60 dark:text-red-300",
  }
  if (severity === "caution") return {
    wrap: "border-amber-200 bg-amber-50 dark:border-amber-900/60 dark:bg-amber-950/40",
    icon: "text-amber-600 dark:text-amber-400",
    title: "text-amber-800 dark:text-amber-300",
    body: "text-amber-700 dark:text-amber-400",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300",
  }
  return {
    wrap: "border-blue-200 bg-blue-50 dark:border-blue-900/60 dark:bg-blue-950/40",
    icon: "text-blue-600 dark:text-blue-400",
    title: "text-blue-800 dark:text-blue-300",
    body: "text-blue-700 dark:text-blue-400",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300",
  }
}

function WarningCard({ warning, label }: { warning: TripWarning; label: string }) {
  const s = severityStyles(warning.severity)
  return (
    <div className={cn("flex gap-3 rounded-md border p-3", s.wrap)}>
      <span className={cn("mt-0.5", s.icon)}>
        {warning.severity === "warning"
          ? <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden />
          : warningIcon(warning.type)}
      </span>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <span className={cn("text-sm font-bold", s.title)}>{warning.title}</span>
          <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide", s.badge)}>
            {label}
          </span>
        </div>
        <p className={cn("text-xs leading-relaxed", s.body)}>{warning.body}</p>
      </div>
    </div>
  )
}

interface TripWarningsProps {
  warnings: TripWarning[]
  destination: string
}

export function TripWarnings({ warnings, destination }: TripWarningsProps) {
  const { messages } = useLocale()
  if (!warnings.length) return null

  const severityLabel = (s: WarningSeverity) =>
    s === "warning" ? messages.result.warningSeverityWarning
    : s === "caution" ? messages.result.warningSeverityCaution
    : messages.result.warningSeverityInfo

  const hasWarning = warnings.some((w) => w.severity === "warning")
  const hasCaution = warnings.some((w) => w.severity === "caution")

  return (
    <section className="card-hover rounded-md border border-border bg-card p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex items-center gap-2">
        {hasWarning
          ? <AlertTriangle className="h-5 w-5 text-red-500" aria-hidden />
          : hasCaution
          ? <AlertTriangle className="h-5 w-5 text-amber-500" aria-hidden />
          : <Info className="h-5 w-5 text-blue-500" aria-hidden />}
        <h2 className="text-base font-extrabold">
          {messages.result.warningsTitle} · {destination.split(",")[0]}
        </h2>
      </div>
      <div className="space-y-2">
        {warnings
          .sort((a, b) => {
            const order: Record<WarningSeverity, number> = { warning: 0, caution: 1, info: 2 }
            return order[a.severity] - order[b.severity]
          })
          .map((w, i) => (
            <WarningCard key={i} warning={w} label={severityLabel(w.severity)} />
          ))}
      </div>
    </section>
  )
}
