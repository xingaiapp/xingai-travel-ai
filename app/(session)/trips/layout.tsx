import { AppShell } from "@/components/app-shell"

export default function TripsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AppShell>{children}</AppShell>
}
