import { AppShell } from "@/components/app-shell"

export default function HomeV2Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AppShell>{children}</AppShell>
}
