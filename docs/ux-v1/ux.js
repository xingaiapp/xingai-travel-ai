;(function () {
  const STORAGE_THEME = "travel-ux-theme"
  const STORAGE_LOCALE = "travel-ux-locale"
  const DEFAULT_LOCALE = "en"
  const DEFAULT_THEME = "light"

  function getNested(obj, path) {
    return path.split(".").reduce((o, k) => (o && o[k] != null ? o[k] : null), obj)
  }

  function applyTranslations(locale) {
    const pack = window.TRAVEL_UX_MESSAGES?.[locale] || window.TRAVEL_UX_MESSAGES.en
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n")
      if (!key) return
      const val = getNested(pack, key)
      if (val == null) return
      if (el.tagName === "TEXTAREA" || el.tagName === "INPUT") {
        if (el.hasAttribute("data-i18n-placeholder")) el.placeholder = val
        else if (!el.hasAttribute("data-trip-field") || el.type === "button") el.value = val
      } else if (el.tagName === "OPTION") {
        el.textContent = val
      } else {
        el.textContent = val
      }
    })
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder")
      if (!key) return
      const val = getNested(pack, key)
      if (val != null) el.placeholder = val
    })
    document.querySelectorAll("[data-i18n-value]").forEach((el) => {
      const key = el.getAttribute("data-i18n-value")
      if (!key) return
      const val = getNested(pack, key)
      if (val != null && el.hasAttribute("data-trip-field")) el.value = val
    })
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      const key = el.getAttribute("data-i18n-alt")
      if (!key) return
      const val = getNested(pack, key)
      if (val != null) el.alt = val
    })
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria")
      if (!key) return
      const val = getNested(pack, key)
      if (val != null) el.setAttribute("aria-label", val)
    })
    document.documentElement.lang = locale === "zh" ? "zh-Hans" : locale
    document.querySelectorAll("#theme-select, [data-theme-select]").forEach((themeSel) => {
      if (themeSel.options.length >= 2 && pack.chrome) {
        if (pack.chrome.themeLight) themeSel.options[0].text = pack.chrome.themeLight
        if (pack.chrome.themeDark) themeSel.options[1].text = pack.chrome.themeDark
      }
    })
    const brandFull = pack.chrome?.brandFull
    if (brandFull) {
      document.querySelectorAll(".chrome-logo, .nav-drawer-logo, .mobile-header-logo").forEach((img) => {
        img.alt = brandFull
      })
    }
    if (typeof window.travelUxApplySeo === "function") window.travelUxApplySeo(locale)
    updateTripSnapshot()
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme)
    document.querySelectorAll(".chrome-logo, .nav-drawer-logo, .mobile-header-logo").forEach((img) => {
      const light = img.getAttribute("data-logo-light") || "assets/logo-light.png"
      const dark = img.getAttribute("data-logo-dark") || "assets/logo-dark.png"
      img.src = theme === "dark" ? dark : light
    })
  }

  function bindLocaleSelect(sel) {
    if (!sel || sel.dataset.bound) return
    sel.dataset.bound = "1"
    const saved = localStorage.getItem(STORAGE_LOCALE) || DEFAULT_LOCALE
    sel.value = saved
    sel.addEventListener("change", () => {
      localStorage.setItem(STORAGE_LOCALE, sel.value)
      document.querySelectorAll("#locale-select, [data-locale-select]").forEach((s) => {
        if (s !== sel) s.value = sel.value
      })
      applyTranslations(sel.value)
    })
  }

  function bindThemeSelect(sel) {
    if (!sel || sel.dataset.bound) return
    sel.dataset.bound = "1"
    const saved = localStorage.getItem(STORAGE_THEME) || DEFAULT_THEME
    sel.value = saved
    sel.addEventListener("change", () => {
      localStorage.setItem(STORAGE_THEME, sel.value)
      document.querySelectorAll("#theme-select, [data-theme-select]").forEach((s) => {
        if (s !== sel) s.value = sel.value
      })
      applyTheme(sel.value)
    })
  }

  function initLocaleTheme() {
    document.querySelectorAll("#locale-select, [data-locale-select]").forEach(bindLocaleSelect)
    document.querySelectorAll("#theme-select, [data-theme-select]").forEach(bindThemeSelect)
    const locale = localStorage.getItem(STORAGE_LOCALE) || DEFAULT_LOCALE
    const theme = localStorage.getItem(STORAGE_THEME) || DEFAULT_THEME
    applyTheme(theme)
    applyTranslations(locale)
  }

  function initMobileNav() {
    const drawer = document.getElementById("nav-drawer")
    const backdrop = document.getElementById("nav-backdrop")
    const openBtn = document.getElementById("menu-btn")
    const closeBtn = document.getElementById("nav-close-btn")
    if (!drawer || !backdrop) return

    function close() {
      drawer.classList.remove("is-open")
      backdrop.classList.remove("is-open")
      backdrop.hidden = true
      drawer.setAttribute("aria-hidden", "true")
      openBtn?.setAttribute("aria-expanded", "false")
      document.body.style.overflow = ""
    }

    function open() {
      drawer.classList.add("is-open")
      backdrop.classList.add("is-open")
      backdrop.hidden = false
      drawer.setAttribute("aria-hidden", "false")
      openBtn?.setAttribute("aria-expanded", "true")
      document.body.style.overflow = "hidden"
    }

    openBtn?.addEventListener("click", open)
    closeBtn?.addEventListener("click", close)
    backdrop.addEventListener("click", close)
    drawer.querySelectorAll(".nav-drawer-item").forEach((link) => {
      link.addEventListener("click", () => close())
    })
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && drawer.classList.contains("is-open")) close()
    })
  }

  function t(key, locale) {
    const loc = locale || localStorage.getItem(STORAGE_LOCALE) || DEFAULT_LOCALE
    return getNested(window.TRAVEL_UX_MESSAGES?.[loc] || window.TRAVEL_UX_MESSAGES.en, key)
  }

  function showToast(message) {
    const el = document.getElementById("ux-toast")
    if (!el || !message) return
    el.textContent = message
    el.hidden = false
    clearTimeout(showToast._tid)
    showToast._tid = setTimeout(() => {
      el.hidden = true
    }, 2800)
  }

  function setFlowStep(step) {
    document.querySelectorAll("[data-flow-step]").forEach((el) => {
      const n = Number(el.getAttribute("data-flow-step"))
      el.classList.toggle("active", n === step)
      el.classList.toggle("is-done", n < step)
    })
  }

  function fieldValue(idPrefix) {
    const el =
      document.getElementById(idPrefix) ||
      document.getElementById(idPrefix + "-d") ||
      document.querySelector(`[id^="${idPrefix}"]`)
    return el?.value?.trim() || ""
  }

  function updateTripSnapshot() {
    const from = fieldValue("field-from") || t("landing.fieldFromValue")
    const budget = fieldValue("field-budget") || t("landing.fieldBudgetValue")
    const travelers = fieldValue("field-travelers") || t("landing.fieldTravelersValue")
    const notes = fieldValue("field-notes") || ""

    let vibe = t("landing.snapshotVibeVal")
    let avoid = t("landing.snapshotAvoidVal")
    if (notes) {
      const parts = notes.split(/[,，·]/).map((s) => s.trim()).filter(Boolean)
      if (parts.length) vibe = parts.slice(0, 2).join(", ")
      const lower = notes.toLowerCase()
      if (lower.includes("avoid") || lower.includes("long flight") || notes.includes("避免")) {
        avoid = notes.match(/avoid[^,，]*/i)?.[0] || notes.match(/避免[^,，]*/)?.[0] || avoid
      }
    }

    const map = { origin: from, budget: budget.replace(" total", "").replace("总计", ""), travelers, vibe, avoid }
    Object.entries(map).forEach(([key, val]) => {
      document.querySelectorAll(`[data-snapshot="${key}"]`).forEach((node) => {
        node.textContent = val
      })
    })
  }

  function initTripSnapshot() {
    document.querySelectorAll("[data-trip-field]").forEach((el) => {
      el.addEventListener("input", updateTripSnapshot)
      el.addEventListener("change", updateTripSnapshot)
    })
    updateTripSnapshot()

    const pasteBtn = document.getElementById("btn-paste-trip")
    const loading = document.getElementById("context-loading")
    pasteBtn?.addEventListener("click", () => {
      if (loading) {
        loading.hidden = false
        loading.classList.remove("is-hidden")
      }
      pasteBtn.disabled = true
      setTimeout(() => {
        const loc = localStorage.getItem(STORAGE_LOCALE) || DEFAULT_LOCALE
        document.querySelectorAll("[data-i18n-value]").forEach((el) => {
          const key = el.getAttribute("data-i18n-value")
          const val = getNested(window.TRAVEL_UX_MESSAGES?.[loc] || window.TRAVEL_UX_MESSAGES.en, key)
          if (val != null) el.value = val
        })
        const notes = document.getElementById("field-notes") || document.getElementById("field-notes-d")
        if (notes) {
          notes.value =
            loc === "zh"
              ? "温暖、可步行、美食、避免长途飞行"
              : "Warm, walkable, food-focused, avoid long flights"
        }
        updateTripSnapshot()
        setFlowStep(2)
        if (loading) {
          loading.hidden = true
          loading.classList.add("is-hidden")
        }
        pasteBtn.disabled = false
      }, 900)
    })
  }

  function setCadenceChipState(chip, on) {
    chip.classList.toggle("selected", on)
    chip.setAttribute("aria-pressed", on ? "true" : "false")
  }

  function initStyleAndPace() {
    document.querySelectorAll(".pace-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        document.querySelectorAll(".pace-chip").forEach((c) => setCadenceChipState(c, c === chip))
      })
    })

    document.querySelectorAll(".style-slot[data-style]").forEach((slot) => {
      slot.addEventListener("click", () => {
        document.querySelectorAll(".style-slot[data-style]").forEach((s) => {
          s.classList.remove("selected")
          s.setAttribute("aria-pressed", "false")
        })
        slot.classList.add("selected")
        slot.setAttribute("aria-pressed", "true")
      })
    })
  }

  function initRecommend() {
    const btn = document.getElementById("btn-recommend")
    if (!btn) return
    const overlay = document.getElementById("ux-loading")
    const href = btn.getAttribute("href") || "mobile-result.html"
    btn.addEventListener("click", (e) => {
      e.preventDefault()
      if (overlay) overlay.hidden = false
      setFlowStep(3)
      setTimeout(() => {
        window.location.href = href
      }, 1400)
    })
  }

  function initNavSoon() {
    const msg = () => t("chrome.toastSoon")
    document.querySelectorAll("[data-nav-soon]").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault()
        showToast(msg())
      })
    })
  }

  function initPlanStepMode() {
    const simpleBtn = document.getElementById("step-mode-simple")
    const detailBtn = document.getElementById("step-mode-detail")
    const simpleList = document.getElementById("plan-steps-simple")
    const detailList = document.getElementById("plan-steps-detail")
    if (!simpleBtn || !detailBtn) return

    function setMode(mode) {
      const isDetail = mode === "detail"
      simpleBtn.classList.toggle("active", !isDetail)
      detailBtn.classList.toggle("active", isDetail)
      simpleBtn.setAttribute("aria-pressed", (!isDetail).toString())
      detailBtn.setAttribute("aria-pressed", isDetail.toString())
      if (simpleList) simpleList.hidden = isDetail
      if (detailList) detailList.hidden = !isDetail
    }

    simpleBtn.addEventListener("click", () => setMode("simple"))
    detailBtn.addEventListener("click", () => setMode("detail"))
    document.querySelectorAll('[data-i18n="result.ctaAnother"]').forEach((btn) => {
      btn.addEventListener("click", () => showToast(t("result.loadingTitle")))
    })
    setMode("simple")
  }

  function initResultFolds() {
    document.querySelectorAll("[data-result-fold]").forEach((fold) => {
      const trigger = fold.querySelector(".result-fold-trigger")
      const panel = fold.querySelector(".result-fold-panel")
      if (!trigger || !panel) return

      trigger.addEventListener("click", () => {
        const open = fold.classList.toggle("is-open")
        trigger.setAttribute("aria-expanded", open ? "true" : "false")
        panel.hidden = !open
      })
    })
  }

  function initInputPage() {
    if (!document.querySelector("[data-context-section]")) return
    setFlowStep(1)
    initTripSnapshot()
    initStyleAndPace()
    initRecommend()
    initNavSoon()
  }

  function init() {
    initLocaleTheme()
    initMobileNav()
    initInputPage()
    initPlanStepMode()
    initResultFolds()
    if (document.querySelector(".winner-hero") && !document.querySelector("[data-context-section]")) {
      setFlowStep(3)
      initNavSoon()
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init)
  } else {
    init()
  }
})()
