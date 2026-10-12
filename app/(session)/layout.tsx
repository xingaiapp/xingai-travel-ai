import { RootDocument } from "@/components/root-document"

/** Session / lab routes stay English-chrome; not in the public locale URL set. */
export default function SessionLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument lang="en">{children}</RootDocument>
}
