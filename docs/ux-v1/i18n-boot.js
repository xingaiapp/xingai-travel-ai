/** Apply TRAVEL_UX_MESSAGES before paint (sync after messages.js). */
;(function () {
  if (!window.TRAVEL_UX_MESSAGES) return
  var loc = localStorage.getItem("travel-ux-locale") || "en"
  var pack = window.TRAVEL_UX_MESSAGES[loc] || window.TRAVEL_UX_MESSAGES.en
  function g(o, p) {
    return p.split(".").reduce(function (a, k) {
      return a && a[k] != null ? a[k] : null
    }, o)
  }
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    var key = el.getAttribute("data-i18n")
    var val = g(pack, key)
    if (val == null) return
    if (el.tagName === "TEXTAREA" || el.tagName === "INPUT") {
      if (el.hasAttribute("data-i18n-placeholder")) el.placeholder = val
    } else el.textContent = val
  })
  document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
    var val = g(pack, el.getAttribute("data-i18n-placeholder"))
    if (val != null) el.placeholder = val
  })
  document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
    var val = g(pack, el.getAttribute("data-i18n-alt"))
    if (val != null) el.alt = val
  })
  document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
    var val = g(pack, el.getAttribute("data-i18n-aria"))
    if (val != null) el.setAttribute("aria-label", val)
  })
})()
