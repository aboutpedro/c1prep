/* C1 Prep: light/dark toggle, themes menu, header (logo, level buttons, back link) and confetti. Loaded in <head>. */
(function () {
  "use strict";
  const KEY = "c1prep-theme";
  const root = document.documentElement;
  const store = {
    get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } },
    set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  };
  const systemDark = () => window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const current = () => root.getAttribute("data-theme") || (systemDark() ? "dark" : "light");

  // Apply the saved choice before the page paints, so there is no flash.
  const saved = store.get();
  if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);

  // Themes (style.css, :root[data-skin]): [id, name, dark?, three swatch colours]. "" is the default theme,
  // which follows light/dark mode. The others have one palette each, so data-theme follows the theme while it is on.
  const SKIN_KEY = "c1prep-skin";
  const SKINS = [
    ["", "Default", null, ["#1f4e79", "#a9c9eb", "#f6f6f3"]],
    ["christmas", "Christmas", false, ["#b3262c", "#1c5b39", "#f6f1e6"]],
    ["newyear", "New Year", true, ["#0b1130", "#e8c36a", "#f5f2ea"]],
    ["thanksgiving", "Thanksgiving", false, ["#a03f1a", "#d9a21b", "#6b4f2a"]],
    ["halloween", "Halloween", true, ["#130f1a", "#ff9440", "#8f5bd6"]],
    ["valentines", "Valentine’s Day", false, ["#ad1f4d", "#f59ab5", "#fdf0f3"]],
    ["whimsical", "Whimsical", false, ["#ff6f91", "#ffc23c", "#22b8a6"]],
    ["kids", "Kids", false, ["#ef4444", "#f59e0b", "#3b82f6"]],
  ];
  const skinStore = {
    get() { try { return localStorage.getItem(SKIN_KEY) || ""; } catch (e) { return ""; } },
    set(v) { try { if (v) localStorage.setItem(SKIN_KEY, v); else localStorage.removeItem(SKIN_KEY); } catch (e) {} }
  };
  const skin = () => root.getAttribute("data-skin") || "";
  function applySkin(id) {
    const s = SKINS.find((x) => x[0] === id && id);
    if (s) {
      root.setAttribute("data-skin", id);
      root.setAttribute("data-theme", s[2] ? "dark" : "light");
    } else {
      root.removeAttribute("data-skin");
      const t = store.get();
      if (t === "light" || t === "dark") root.setAttribute("data-theme", t); else root.removeAttribute("data-theme");
    }
  }
  applySkin(skinStore.get());

  const PALETTE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.9 1.8-1.9 0-.5-.2-.9-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4c0-4.3-4-7.7-9-7.7z"/><circle cx="7.5" cy="11" r="1.1"/><circle cx="10" cy="7.2" r="1.1"/><circle cx="14.5" cy="7.2" r="1.1"/><circle cx="17" cy="11" r="1.1"/></svg>';
  const CHECK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  const SUN = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  const MOON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>';
  // Every level of the site. theme.js lives at the site root, so the level folders are found from its own address.
  const SITE = new URL(".", document.currentScript ? document.currentScript.src : location.href);
  // [code, folder, name, home page]. C1 lives at the site root, where index.html is the site's front page.
  const LEVELS = [
    ["a1", "a1/", "A1 Beginner", ""],
    ["a2", "a2/", "A2 Elementary", ""],
    ["b1", "b1/", "B1 Intermediate", ""],
    ["b2", "b2/", "B2 First", ""],
    ["c1", "", "C1 Advanced", "c1.html"],
    ["c2", "c2/", "C2 Proficiency", ""],
  ];
  // The page's level: from data-level ("B1 Intermediate" → b1). Pages without it are C1, except the
  // site-wide pages (front page, level test, privacy, 404), which carry data-site and belong to no level.
  const pageLevel = () => {
    const lv = root.getAttribute("data-level");
    if (lv) return lv.split(" ")[0].toLowerCase();
    return root.hasAttribute("data-site") ? "" : "c1";
  };

  const BACK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>';

  function makeToggle() {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "theme-toggle";
    const paint = () => {
      const dark = current() === "dark";
      // Show what you will switch to.
      b.innerHTML = dark ? SUN : MOON;
      b.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
      b.title = dark ? "Light mode" : "Dark mode";
    };
    paint();
    b.addEventListener("click", () => {
      // With a theme on, light/dark mode goes back to the default theme in the other brightness.
      const next = current() === "dark" ? "light" : "dark";
      root.classList.add("theme-anim");
      skinStore.set("");
      root.removeAttribute("data-skin");
      root.setAttribute("data-theme", next);
      store.set(next);
      paint();
      document.dispatchEvent(new Event("c1skin"));
      setTimeout(() => root.classList.remove("theme-anim"), 250);
    });
    document.addEventListener("c1skin", paint);
    return b;
  }

  // Themes button: a menu of every theme, next to light/dark mode.
  function makeSkinPicker() {
    const box = document.createElement("div");
    box.className = "skin-picker";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "icon-btn skin-btn";
    btn.setAttribute("aria-haspopup", "true");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Themes");
    btn.title = "Themes";
    btn.innerHTML = PALETTE + '<span class="skin-dot" aria-hidden="true"></span>';
    const menu = document.createElement("div");
    menu.className = "skin-menu";
    menu.setAttribute("role", "menu");
    menu.setAttribute("aria-label", "Themes");
    menu.hidden = true;
    const items = SKINS.map(([id, name, , sw]) => {
      const it = document.createElement("button");
      it.type = "button";
      it.className = "skin-item";
      it.setAttribute("role", "menuitemradio");
      it.setAttribute("tabindex", "-1");
      it.dataset.skin = id;
      it.innerHTML = '<span class="skin-sw" aria-hidden="true">' + sw.map((c) => '<i style="background:' + c + '"></i>').join("") +
        '</span><span class="skin-name"></span><span class="skin-check">' + CHECK + "</span>";
      it.querySelector(".skin-name").textContent = name;
      menu.appendChild(it);
      return it;
    });
    box.append(btn, menu);

    const paint = () => {
      const cur = skin();
      items.forEach((it) => it.setAttribute("aria-checked", it.dataset.skin === cur ? "true" : "false"));
      const s = SKINS.find((x) => x[0] === cur && cur);
      btn.classList.toggle("on", !!s);
      if (s) btn.style.setProperty("--dot", s[3][0]); else btn.style.removeProperty("--dot");
      btn.title = s ? "Themes (" + s[1] + ")" : "Themes";
    };
    const open = (focusItem) => {
      menu.hidden = false;
      btn.setAttribute("aria-expanded", "true");
      const at = items.find((it) => it.getAttribute("aria-checked") === "true") || items[0];
      if (focusItem) at.focus();
    };
    const close = (focusBtn) => {
      if (menu.hidden) return;
      menu.hidden = true;
      btn.setAttribute("aria-expanded", "false");
      if (focusBtn) btn.focus();
    };
    const choose = (id) => {
      root.classList.add("theme-anim");
      skinStore.set(id);
      applySkin(id);
      paint();
      document.dispatchEvent(new Event("c1skin"));
      setTimeout(() => root.classList.remove("theme-anim"), 250);
      close(true);
    };
    btn.addEventListener("click", () => (menu.hidden ? open(true) : close(false)));
    btn.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); open(true); }
    });
    menu.addEventListener("click", (e) => {
      const it = e.target.closest(".skin-item");
      if (it) choose(it.dataset.skin);
    });
    menu.addEventListener("keydown", (e) => {
      const i = items.indexOf(document.activeElement);
      const go = (n) => { e.preventDefault(); items[(n + items.length) % items.length].focus(); };
      if (e.key === "ArrowDown") go(i + 1);
      else if (e.key === "ArrowUp") go(i - 1);
      else if (e.key === "Home") go(0);
      else if (e.key === "End") go(items.length - 1);
      else if (e.key === "Escape") { e.preventDefault(); close(true); }
      else if (e.key === "Tab") close(false);
    });
    document.addEventListener("pointerdown", (e) => { if (!box.contains(e.target)) close(false); });
    document.addEventListener("c1skin", paint);
    paint();
    return box;
  }

  const reduced = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Confetti for a perfect score.
  window.c1Confetti = function () {
    if (reduced()) return;
    const themed = getComputedStyle(root).getPropertyValue("--confetti").trim();
    const colors = themed ? themed.split(/\s+/) : ["#1f4e79", "#8fb8e3", "#e9b949", "#2a9d8f", "#e07a5f", "#f7f5f0"];
    const layer = document.createElement("div");
    layer.className = "confetti";
    for (let i = 0; i < 70; i++) {
      const p = document.createElement("i");
      p.style.left = Math.random() * 100 + "vw";
      p.style.background = colors[i % colors.length];
      p.style.setProperty("--dx", (Math.random() * 160 - 80) + "px");
      p.style.setProperty("--rot", (Math.random() * 720 - 360) + "deg");
      p.style.animationDelay = (Math.random() * 0.35) + "s";
      p.style.animationDuration = (1.6 + Math.random() * 1.1) + "s";
      if (i % 3 === 0) p.style.borderRadius = "50%";
      layer.appendChild(p);
    }
    document.body.appendChild(layer);
    setTimeout(() => layer.remove(), 3200);
  };

  // Offline use (sw.js at the site root). The first page loads before the worker runs, so its files are sent to it.
  const local = location.hostname === "localhost" || location.hostname === "127.0.0.1";
  if ("serviceWorker" in navigator && (location.protocol === "https:" || local)) {
    window.addEventListener("load", () => {
      const fresh = !navigator.serviceWorker.controller;
      navigator.serviceWorker.register(new URL("sw.js", SITE).href)
        .then(() => navigator.serviceWorker.ready)
        .then((reg) => {
          if (!fresh || !reg.active) return;
          const urls = [location.href].concat(performance.getEntriesByType("resource").map((r) => r.name));
          reg.active.postMessage({ type: "keep", urls: urls });
        })
        .catch(() => {});
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header.site");
    if (!header) return;

    // Logo: the level's own icon, taken from the page's favicon.
    const brand = header.querySelector("a.brand");
    const icon = document.querySelector('link[rel="icon"][type="image/svg+xml"]');
    if (brand && icon && !brand.querySelector("img")) {
      const img = document.createElement("img");
      img.src = icon.getAttribute("href");
      img.alt = "";
      img.width = 28; img.height = 28;
      brand.prepend(img);
    }

    // Level buttons next to the brand: the level's logo; on a computer the name slides out on hover.
    if (brand && !header.querySelector(".level-switch")) {
      const here = pageLevel();
      const sw = document.createElement("div");
      sw.className = "level-switch";
      sw.setAttribute("role", "navigation");
      sw.setAttribute("aria-label", "Levels");
      LEVELS.forEach(([code, dir, name, page]) => {
        const a = document.createElement("a");
        a.className = "lvl";
        a.href = new URL(dir + page, SITE).href;
        a.title = name;
        if (code === here) a.setAttribute("aria-current", "page");
        const img = document.createElement("img");
        img.src = new URL(dir + "favicon.svg?v=2", SITE).href;
        img.alt = "";
        img.width = 28; img.height = 28;
        const label = document.createElement("span");
        label.className = "lvl-name";
        label.textContent = name;
        a.append(img, label);
        sw.appendChild(a);
      });
      brand.after(sw);
    }

    let nav = header.querySelector("nav");
    if (!nav) { nav = document.createElement("nav"); header.appendChild(nav); }

    // "All exercises" moves from the header to a back link above the page title.
    const home = nav.querySelector("a");
    const kicker = document.querySelector(".wrap > .kicker");
    if (home && kicker) {
      const back = document.createElement("a");
      back.className = "backlink";
      back.href = home.getAttribute("href");
      back.innerHTML = BACK + "<span>" + home.textContent + "</span>";
      kicker.before(back);
    }

    nav.append(makeSkinPicker(), makeToggle());
  });
})();
