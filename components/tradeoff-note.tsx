import { Info } from "lucide-react"

export function TradeoffNote({ title, children }: Readonly<{ title: string; children: React.ReactNode }>) {
  return (
    <section className="card-hover rounded-md border border-border bg-card p-4 shadow-sm">
      <div className="flex gap-3 border-l-4 border-primary pl-4">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
        <div>
          <h3 className="text-sm font-extrabold">{title}</h3>
          <div className="mt-1 text-sm leading-relaxed text-muted-foreground">{children}</div>
        </div>
      </div>
    </section>
  )
}
