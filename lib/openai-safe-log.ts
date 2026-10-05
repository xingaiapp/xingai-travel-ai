/**
 * Safe server logs for OpenAI-backed routes.
 * Never log API keys, prompts, trip free text, or raw model payloads.
 */

export type ModelFailRoute = "compare" | "inspire" | "plan"

export function logDecisionModelFailure(
  route: ModelFailRoute,
  err: unknown,
  extra?: {
    finish_reason?: string | null
    content_len?: number
    attempt?: number
  }
): void {
  const record = err as { status?: unknown; code?: unknown; name?: unknown }
  const status = typeof record.status === "number" ? record.status : undefined
  const code = typeof record.code === "string" ? record.code : undefined
  const type = err instanceof Error ? err.name : typeof err
  const message = err instanceof Error ? err.message.slice(0, 160) : undefined
  console.error(`[${route}] model_fail`, {
    status,
    code,
    type,
    message,
    finish_reason: extra?.finish_reason ?? undefined,
    content_len: extra?.content_len,
    attempt: extra?.attempt,
  })
}
