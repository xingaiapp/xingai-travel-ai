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
        else el.value = val
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
        themeSel.options[0].text = pack.chrome.themeLight
        themeSel.options[1].text = pack.chrome.themeDark
      }
    })
    const brandFull = pack.chrome?.brandFull
    if (brandFull) {
      document.querySelectorAll(".chrome-logo, .nav-drawer-logo, .mobile-header-logo").forEach((img) => {
        img.alt = brandFull
      })
    }
    if (typeof window.travelUxApplySeo === "function") window.travelUxApplySeo(locale)
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme)
    document.querySelectorAll(".chrome-logo, .nav-drawer-logo, .mobile-header-logo").forEach((img) => {
      const light = img.getAttribute("data-logo-light") || "assets/logo-light.png"
      const dark = img.getAttribute("data-logo-dark") || "assets/logo-dark.png"
      img.src = theme === "dark" ? dark : light
    })
    document.querySelectorAll(".hero-photo[data-hero-light]").forEach((img) => {
      const light = img.getAttribute("data-hero-light") || "assets/hero-photo-light.jpg"
      const dark = img.getAttribute("data-hero-dark") || "assets/hero-photo-dark.jpg"
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

  function initHelpGuide() {
    const section = document.getElementById("page-help-guide")
    const trigger = document.getElementById("help-guide-trigger")
    const panel = document.getElementById("help-guide-panel")
    if (!section || !trigger || !panel) return

    function setOpen(open) {
      section.classList.toggle("is-open", open)
      trigger.setAttribute("aria-expanded", open ? "true" : "false")
      panel.hidden = !open
    }

    trigger.addEventListener("click", () => {
      setOpen(!section.classList.contains("is-open"))
    })

    section.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", () => {
        const drawer = document.getElementById("nav-drawer")
        if (drawer?.classList.contains("is-open")) {
          document.getElementById("nav-close-btn")?.click()
        }
      })
    })
  }

  function initMobileNav() {
    const drawer = document.getElementById("nav-drawer")
    const backdrop = document.getElementById("nav-backdrop")
    const openBtn = document.getElementById("menu-btn")
    const closeBtn = document.getElementById("nav-close-btn")
    if (!drawer || !backdrop) return

    function open() {
      drawer.classList.add("is-open")
      backdrop.classList.add("is-open")
      backdrop.hidden = false
      drawer.setAttribute("aria-hidden", "false")
      openBtn?.setAttribute("aria-expanded", "true")
      document.body.style.overflow = "hidden"
    }

    function close() {
      drawer.classList.remove("is-open")
      backdrop.classList.remove("is-open")
      backdrop.hidden = true
      drawer.setAttribute("aria-hidden", "true")
      openBtn?.setAttribute("aria-expanded", "false")
      document.body.style.overflow = ""
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
    const steps = document.querySelectorAll("[data-flow-step]")
    steps.forEach((el) => {
      const n = Number(el.getAttribute("data-flow-step"))
      el.classList.toggle("active", n === step)
      el.classList.toggle("is-done", n < step)
    })
  }

  function initContext() {
    const section = document.querySelector("[data-context-section]")
    if (!section) return
    const scanBtn = document.getElementById("btn-paste-trip")
    const input = document.getElementById("context-input")
    const empty = document.getElementById("context-empty")
    const box = document.getElementById("context-box")
    const loading = document.getElementById("context-loading")
    const thumb = section.querySelector(".context-thumb")

    function revealContext() {
      if (loading) {
        loading.hidden = true
        loading.classList.add("is-hidden")
      }
      if (empty) {
        empty.classList.add("is-hidden")
        empty.hidden = true
      }
      if (box) {
        box.classList.remove("is-hidden")
        box.hidden = false
      }
      if (thumb) thumb.classList.add("has-photo")
      setFlowStep(2)
    }

    function showLoading() {
      if (loading) {
        loading.classList.remove("is-hidden")
        loading.hidden = false
      }
    }

    scanBtn?.addEventListener("click", () => {
      showLoading()
      scanBtn.disabled = true
      setTimeout(() => {
        scanBtn.disabled = false
        revealContext()
      }, 1200)
    })

    input?.addEventListener("blur", () => {
      if (input.value.trim().length >= 3) revealContext()
    })
    input?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && input.value.trim().length >= 3) revealContext()
    })
  }

  function chipLabelText(chip) {
    return chip.querySelector(".chip-label")?.textContent.trim() || chip.textContent.trim()
  }

  function setCadenceChipState(chip, on) {
    chip.classList.toggle("selected", on)
    chip.setAttribute("aria-pressed", on ? "true" : "false")
  }

  function initStyleAndPace() {
    const constraints = document.getElementById("constraints-input")
    document.querySelectorAll(".pace-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        if (chip.dataset.preset === "balanced") {
          document.querySelectorAll(".pace-chip").forEach((c) => setCadenceChipState(c, c === chip))
          if (constraints) {
            const loc = localStorage.getItem(STORAGE_LOCALE) || DEFAULT_LOCALE
            constraints.value = t("landing.presetBalanced", loc) || "City break · balanced pace · walkable"
          }
          document.querySelector('.style-slot[data-style="city"]')?.click()
          return
        }
        setCadenceChipState(chip, !chip.classList.contains("selected"))
        const selected = [...document.querySelectorAll(".pace-chip.selected")]
          .filter((c) => !c.dataset.preset)
          .map(chipLabelText)
        if (constraints && selected.length) {
          constraints.value = selected.join(" · ")
        }
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

    const city = document.querySelector('.style-slot[data-style="city"]')
    if (city && !document.querySelector(".style-slot.selected[data-style]")) {
      city.classList.add("selected")
      city.setAttribute("aria-pressed", "true")
    }
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
    document.querySelector('[data-bottom-explore]')?.addEventListener("click", (e) => {
      const target = document.getElementById("section-context")
      if (target) {
        e.preventDefault()
        target.scrollIntoView({ behavior: "smooth" })
        document.getElementById("btn-paste-trip")?.focus()
      }
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
    document.querySelectorAll(".btn-timer").forEach((btn) => {
      btn.addEventListener("click", () => {
        const loc = localStorage.getItem(STORAGE_LOCALE) || DEFAULT_LOCALE
        showToast(t("result.timerDemo", loc))
      })
    })
    document.querySelectorAll('[data-i18n="result.ctaAnother"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        const loc = localStorage.getItem(STORAGE_LOCALE) || DEFAULT_LOCALE
        showToast(t("result.loadingTitle", loc))
      })
    })
    setMode("simple")
  }

  function initInputPage() {
    if (!document.querySelector("[data-context-section]")) return
    setFlowStep(1)
    initContext()
    initStyleAndPace()
    initRecommend()
    initNavSoon()
    const constraints = document.getElementById("constraints-input")
    const chipRelaxed = document.querySelector('.pace-chip[data-pace="relaxed"]')
    const chipBalanced = document.querySelector('.pace-chip[data-pace="balanced"]')
    if (constraints && chipRelaxed && chipBalanced && !constraints.value) {
      setCadenceChipState(chipRelaxed, true)
      setCadenceChipState(chipBalanced, true)
      const loc = localStorage.getItem(STORAGE_LOCALE) || DEFAULT_LOCALE
      constraints.value = [chipLabelText(chipRelaxed), chipLabelText(chipBalanced)].join(" · ")
    }
  }

  function init() {
    initLocaleTheme()
    initHelpGuide()
    initMobileNav()
    initInputPage()
    initPlanStepMode()
    if (document.getElementById("section-plan") && !document.querySelector("[data-context-section]")) {
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
