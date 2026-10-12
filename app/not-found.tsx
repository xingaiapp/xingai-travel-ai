import type { Metadata } from "next"
import { AppShell } from "@/components/app-shell"
import { NotFoundView } from "@/components/not-found-view"
import { RootDocument } from "@/components/root-document"

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <RootDocument lang="en">
      <AppShell>
        <NotFoundView />
      </AppShell>
    </RootDocument>
  )
}
