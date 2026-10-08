/**
 * Free → Pro → Unlimited boundaries for Travel (copy + usage signal).
 * No paywall yet — path off “forever free public beta”.
 */

export type PricingTierId = "free" | "pro" | "unlimited"

export type PricingTier = {
  id: PricingTierId
  name: { en: string; zh: string; ko: string; es: string }
  dailyDecisionGuide: number | null
  bullets: { en: string[]; zh: string[]; ko: string[]; es: string[] }
}

export const TRAVEL_PRICING_TIERS: PricingTier[] = [
  {
    id: "free",
    name: { en: "Free", zh: "Free", ko: "Free", es: "Free" },
    dailyDecisionGuide: 3,
    bullets: {
      en: [
        "Compare destinations and get one best-fit trip",
        "Save trips in this browser",
        "Compare again / Plan again",
        "Soft daily decision guide (~3)",
      ],
      zh: ["对比目的地并给出一个最佳行程", "本机保存旅程", "再比一次 / 再规划", "每日约 3 次软上限"],
      ko: ["목적지 비교 후 최적 여행 1개", "이 브라우저에 저장", "다시 비교 / 다시 계획", "하루 약 3회 소프트 한도"],
      es: [
        "Compara destinos y elige el mejor viaje",
        "Guarda viajes en este navegador",
        "Comparar de nuevo / Planificar de nuevo",
        "Guía diaria suave (~3)",
      ],
    },
  },
  {
    id: "pro",
    name: { en: "Pro", zh: "Pro", ko: "Pro", es: "Pro" },
    dailyDecisionGuide: 20,
    bullets: {
      en: ["Higher daily limits", "Saved preferences", "Richer history across devices (planned)"],
      zh: ["更高每日限额", "可记住的偏好", "跨设备历史（规划中）"],
      ko: ["더 높은 일일 한도", "유지되는 선호", "기기 간 기록(예정)"],
      es: ["Límites diarios más altos", "Preferencias guardadas", "Historial entre dispositivos (previsto)"],
    },
  },
  {
    id: "unlimited",
    name: { en: "Unlimited", zh: "Unlimited", ko: "Unlimited", es: "Unlimited" },
    dailyDecisionGuide: null,
    bullets: {
      en: ["No soft daily decision guide", "Priority when capacity is tight"],
      zh: ["无每日软上限", "高峰优先生成"],
      ko: ["일일 소프트 한도 없음", "용량 부족 시 우선"],
      es: ["Sin guía diaria suave", "Prioridad cuando hay poca capacidad"],
    },
  },
]

export function currentTravelTier(): PricingTierId {
  return "free"
}

export function travelTierById(id: PricingTierId): PricingTier {
  return TRAVEL_PRICING_TIERS.find((t) => t.id === id) ?? TRAVEL_PRICING_TIERS[0]
}
