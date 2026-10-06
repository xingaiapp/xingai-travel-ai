import type { Metadata } from "next"
import { AppShell } from "@/components/app-shell"
import { NotFoundView } from "@/components/not-found-view"

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <AppShell>
      <NotFoundView />
    </AppShell>
  )
}
