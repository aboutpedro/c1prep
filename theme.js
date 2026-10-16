/* C1 Prep: light/dark toggle, entrance animations and confetti. Loaded in <head>. */
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

  const SUN = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><g stroke-linecap="round"><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></g></svg>';
  const MOON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1z"/></svg>';

  function makeToggle() {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "theme-toggle";
    const paint = () => {
      const dark = current() === "dark";
      b.innerHTML = '<span class="icon">' + (dark ? MOON : SUN) + "</span>";
      b.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
      b.title = dark ? "Light mode" : "Dark mode";
    };
    paint();
    b.addEventListener("click", () => {
      const next = current() === "dark" ? "light" : "dark";
      root.classList.add("theme-anim");
      root.setAttribute("data-theme", next);
      store.set(next);
      b.classList.remove("spin"); void b.offsetWidth; b.classList.add("spin");
      paint();
      setTimeout(() => root.classList.remove("theme-anim"), 450);
    });
    return b;
  }

  const reduced = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Confetti for a perfect score.
  window.c1Confetti = function () {
    if (reduced()) return;
    const colors = ["#f4a261", "#e76f51", "#2a9d8f", "#8ab6e8", "#e9c46a", "#c792ea"];
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
    if (header) {
      let nav = header.querySelector("nav");
      if (!nav) { nav = document.createElement("nav"); header.appendChild(nav); }
      nav.appendChild(makeToggle());
    }
    // Background blobs (decorative only).
    const deco = document.createElement("div");
    deco.className = "deco";
    deco.setAttribute("aria-hidden", "true");
    deco.innerHTML = "<span></span><span></span><span></span>";
    document.body.prepend(deco);

    // Staggered entrance for the main blocks.
    const blocks = document.querySelectorAll(".wrap > .kicker, .wrap > h1, .wrap > .lead, .wrap > .card, .wrap > h2, .grid .tile, .wrap > .tabs, .wrap > .tabpanel:not([hidden])");
    blocks.forEach((el, i) => { el.style.setProperty("--d", Math.min(i * 45, 600) + "ms"); el.classList.add("rise");
      el.addEventListener("animationend", function done(e) { if (e.target !== el) return; el.classList.remove("rise"); el.removeEventListener("animationend", done); });
    });
  });
})();
