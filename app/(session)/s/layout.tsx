import { AppShell } from "@/components/app-shell"

export default function ShareLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AppShell>{children}</AppShell>
}
