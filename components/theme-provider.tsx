"use client"

import { createContext, useContext, useEffect, useMemo, useReducer } from "react"

type Theme = "light" | "dark" | "system"
type ResolvedTheme = "light" | "dark"

const STORAGE_KEY = "theme"
const DEFAULT_THEME: Theme = "dark"

type ThemeContextValue = {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function applyTheme(resolved: ResolvedTheme) {
  const root = document.documentElement
  root.classList.remove("light", "dark")
  root.classList.add(resolved)
  root.style.colorScheme = resolved
}

function readStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === "light" || stored === "dark" || stored === "system") return stored
  } catch {
    /* ignore */
  }
  return DEFAULT_THEME
}

function getSystemDark(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

function computeResolved(theme: Theme, systemDark: boolean): ResolvedTheme {
  return theme === "system" ? (systemDark ? "dark" : "light") : theme
}

interface ThemeState {
  theme: Theme
  systemDark: boolean
}
type ThemeAction =
  | { type: "INIT"; theme: Theme; systemDark: boolean }
  | { type: "SET"; theme: Theme }
  | { type: "SYSTEM_CHANGE"; dark: boolean }

function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case "INIT":
      return { theme: action.theme, systemDark: action.systemDark }
    case "SET":
      return { ...state, theme: action.theme }
    case "SYSTEM_CHANGE":
      return { ...state, systemDark: action.dark }
    default:
      return state
  }
}

/** Inline before paint — keeps first HTML aligned with stored/default theme. */
export const themeBootScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});var dark;if(t==="light")dark=false;else if(t==="dark"||!t)dark=true;else dark=window.matchMedia("(prefers-color-scheme: dark)").matches;var r=document.documentElement;r.classList.remove("light","dark");r.classList.add(dark?"dark":"light");r.style.colorScheme=dark?"dark":"light";}catch(e){}})();`

export function ThemeProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [state, dispatch] = useReducer(themeReducer, { theme: DEFAULT_THEME, systemDark: true })

  useEffect(() => {
    dispatch({ type: "INIT", theme: readStoredTheme(), systemDark: getSystemDark() })
  }, [])

  const resolvedTheme = computeResolved(state.theme, state.systemDark)

  useEffect(() => {
    applyTheme(resolvedTheme)
    try {
      localStorage.setItem(STORAGE_KEY, state.theme)
    } catch {
      /* ignore */
    }
  }, [state.theme, resolvedTheme])

  useEffect(() => {
    if (state.theme !== "system") return
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => dispatch({ type: "SYSTEM_CHANGE", dark: media.matches })
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [state.theme])

  const value = useMemo(
    () => ({ theme: state.theme, resolvedTheme, setTheme: (t: Theme) => dispatch({ type: "SET", theme: t }) }),
    [state.theme, resolvedTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}
