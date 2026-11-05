/* C1 Prep: light/dark toggle, header (logo + back link) and confetti. Loaded in <head>. */
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

  const SUN = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  const MOON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>';
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
      const next = current() === "dark" ? "light" : "dark";
      root.classList.add("theme-anim");
      root.setAttribute("data-theme", next);
      store.set(next);
      paint();
      setTimeout(() => root.classList.remove("theme-anim"), 250);
    });
    return b;
  }

  const reduced = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Confetti for a perfect score.
  window.c1Confetti = function () {
    if (reduced()) return;
    const colors = ["#1f4e79", "#8fb8e3", "#e9b949", "#2a9d8f", "#e07a5f", "#f7f5f0"];
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

  document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header.site");
    if (!header) return;

    // Logo: the level's own icon (c1, b2, c2), taken from the page's favicon.
    const brand = header.querySelector("a.brand");
    const icon = document.querySelector('link[rel="icon"][type="image/svg+xml"]');
    if (brand && icon && !brand.querySelector("img")) {
      const img = document.createElement("img");
      img.src = icon.getAttribute("href");
      img.alt = "";
      img.width = 28; img.height = 28;
      brand.prepend(img);
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

    nav.appendChild(makeToggle());
  });
})();
