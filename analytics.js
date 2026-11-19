(() => {
  "use strict";

  // Enhanced Measurement is off for stream 16371130186 (confirmed by owner 2026-11-19); events are sent only by this script, after consent.
  const analyticsEnabled = true;
  if (!analyticsEnabled) return;

  const measurementId = "G-SBSRDXEF5M";
  const storageKey = "vcs-analytics-consent-v1";
  const disableKey = "ga-disable-" + measurementId;
  const language = document.documentElement.lang.toLowerCase().startsWith("en") ? "en" : "pt-BR";
  const en = language === "en";
  const copy = en ? {
    title: "Cookie preferences",
    intro: "With your permission, we use Google Analytics to understand how visitors use the site.",
    accept: "Accept", reject: "Reject", customize: "Customize", save: "Save preferences",
    analytics: "Analytics cookies", privacy: "Privacy policy", cancel: "Cancel",
  } : {
    title: "Preferências de cookies",
    intro: "Com sua permissão, usamos o Google Analytics para entender como os visitantes usam o site.",
    accept: "Aceitar", reject: "Recusar", customize: "Personalizar", save: "Salvar preferências",
    analytics: "Cookies analíticos", privacy: "Política de privacidade", cancel: "Cancelar",
  };

  let preference = null;
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored === "granted" || stored === "denied") preference = stored;
  } catch { /* Storage may be unavailable. The choice still applies to this page. */ }

  let started = false;
  let lastLocation = "";
  const advertisingDenied = { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" };
  const knownPaths = new Set([
    "/", "/videos/", "/novidades/", "/sobre/", "/privacy.html", "/terms.html", "/data-deletion.html",
    "/contact.html", "/en/", "/en/privacy.html", "/en/terms.html", "/en/data-deletion.html", "/en/contact.html",
  ]);
  const socialHosts = {
    "youtube.com": "youtube", "youtu.be": "youtube", "tiktok.com": "tiktok",
    "instagram.com": "instagram", "twitch.tv": "twitch",
  };

  function cleanLocation() {
    const pathname = location.pathname.replace(/\/index\.html$/, "/");
    const path = pathname.endsWith("/") || pathname.endsWith(".html") ? pathname : pathname + "/";
    return knownPaths.has(path) ? location.origin + path : "";
  }

  function cleanReferrer() {
    if (!document.referrer) return "";
    try {
      return new URL(document.referrer).origin;
    } catch {
      return "";
    }
  }

  function tag() {
    window.dataLayer.push(arguments);
  }

  function pageView() {
    if (preference !== "granted" || !started) return;
    const pageLocation = cleanLocation();
    if (!pageLocation || pageLocation === lastLocation) return;
    const pageReferrer = lastLocation || cleanReferrer();
    lastLocation = pageLocation;
    tag("set", { page_location: pageLocation, page_referrer: pageReferrer, language });
    tag("event", "page_view", { send_to: measurementId, page_location: pageLocation, page_referrer: pageReferrer, language });
  }

  function startAnalytics() {
    const pageLocation = cleanLocation();
    if (!pageLocation) return;
    window[disableKey] = false;
    if (started) {
      tag("consent", "update", { ...advertisingDenied, analytics_storage: "granted" });
      pageView();
      return;
    }
    started = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = tag;
    tag("consent", "default", { ...advertisingDenied, analytics_storage: "denied" });
    tag("consent", "update", { ...advertisingDenied, analytics_storage: "granted" });
    tag("js", new Date());
    tag("config", measurementId, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      page_location: pageLocation,
      page_referrer: cleanReferrer(),
      language,
    });
    pageView();

    const script = document.createElement("script");
    script.async = true;
    script.id = "vcs-ga4";
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + measurementId;
    document.head.append(script);
  }

  function clearAnalyticsCookies() {
    for (const cookie of document.cookie.split(";")) {
      const name = cookie.trim().split("=")[0];
      if (name !== "_ga" && name !== "_ga_" + measurementId.slice(2)) continue;
      document.cookie = name + "=; Max-Age=0; Path=/; Secure";
      document.cookie = name + "=; Max-Age=0; Path=/; Secure; Domain=vicecitystudio.com.br";
    }
  }

  function setPreference(next) {
    preference = next;
    let persisted = false;
    try {
      localStorage.setItem(storageKey, next);
      persisted = true;
    } catch { /* A blocked store must not prevent revocation. */ }
    banner.hidden = true;
    if (dialog.open) dialog.close();
    if (next === "granted") {
      startAnalytics();
    } else {
      window[disableKey] = true;
      lastLocation = "";
      clearAnalyticsCookies();
      if (started && persisted) location.reload();
    }
  }

  function button(label, action, primary = false) {
    const element = document.createElement("button");
    element.type = "button";
    element.textContent = label;
    if (primary) element.classList.add("vcs-cookie-primary");
    element.addEventListener("click", action);
    return element;
  }

  function actions(...buttons) {
    const row = document.createElement("div");
    row.className = "vcs-cookie-actions";
    row.append(...buttons);
    return row;
  }

  function privacyLink() {
    const link = document.createElement("a");
    link.href = en ? "/en/privacy.html" : "/privacy.html";
    link.textContent = copy.privacy;
    return link;
  }

  function intro(id) {
    const fragment = document.createDocumentFragment();
    const title = document.createElement("h2");
    title.id = id;
    title.textContent = copy.title;
    const paragraph = document.createElement("p");
    paragraph.append(copy.intro + " ", privacyLink());
    fragment.append(title, paragraph);
    return fragment;
  }

  const dialog = document.createElement("dialog");
  dialog.className = "vcs-cookie-panel";
  dialog.setAttribute("aria-labelledby", "vcs-cookie-dialog-title");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  const label = document.createElement("label");
  label.append(checkbox, copy.analytics);
  dialog.append(intro("vcs-cookie-dialog-title"), label, actions(
    button(copy.save, () => setPreference(checkbox.checked ? "granted" : "denied"), true),
    button(copy.cancel, () => dialog.close()),
  ));

  function openPreferences() {
    checkbox.checked = preference === "granted";
    dialog.showModal();
  }

  const banner = document.createElement("aside");
  banner.className = "vcs-cookie-panel vcs-cookie-banner";
  banner.setAttribute("aria-labelledby", "vcs-cookie-banner-title");
  banner.hidden = preference !== null;
  banner.append(intro("vcs-cookie-banner-title"), actions(
    button(copy.accept, () => setPreference("granted"), true),
    button(copy.reject, () => setPreference("denied")),
    button(copy.customize, openPreferences),
  ));
  document.body.append(banner, dialog);

  function attachFooter() {
    const footer = document.querySelector("footer");
    if (!footer || footer.querySelector(".vcs-cookie-footer")) return false;
    const row = document.createElement("div");
    row.className = "vcs-cookie-footer";
    row.append(button(copy.title, openPreferences));
    footer.append(row);
    return true;
  }

  if (!attachFooter()) {
    const observer = new MutationObserver(() => {
      if (attachFooter()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  window.addEventListener("storage", (event) => {
    if (event.key === storageKey && event.newValue === "denied" && preference === "granted") {
      setPreference("denied");
    }
  });

  document.addEventListener("vcs:page", pageView);
  document.addEventListener("click", (event) => {
    if (preference !== "granted" || !started || !lastLocation) return;
    const element = event.target instanceof Element ? event.target : null;
    if (element?.closest("button[data-vcs-youtube]")) {
      tag("event", "social_click", { send_to: measurementId, platform: "youtube", language });
      return;
    }
    const target = element?.closest("a[href]");
    if (!target) return;
    const url = new URL(target.href, location.href);
    const platform = socialHosts[url.hostname.replace(/^(www|m)\./, "")];
    if (platform && url.protocol === "https:") {
      tag("event", "social_click", { send_to: measurementId, platform, language });
    } else if (url.protocol === "mailto:" || url.protocol === "tel:" ||
      (url.origin === location.origin && ["/contact.html", "/en/contact.html"].includes(url.pathname))) {
      tag("event", "contact_click", { send_to: measurementId, language });
    }
  }, { capture: true });

  if (preference === "granted") startAnalytics();
  else window[disableKey] = true;
})();
