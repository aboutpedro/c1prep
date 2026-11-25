/* Future Perfect English: Portuguese explanations (front page, A1 and A2). Loaded in <head> on those pages only
   (generator/ptpages.py puts it there, with data-dict = the version of the level's dictionary).
   - A switch under the header turns Portuguese on or off for the whole site (c1p:pt).
   - After a set is checked, a switch next to the score turns it on or off for that page only (c1p:pt:<page>).
   - When it is on, the level's dictionary (pt/<level>.js: English text → Portuguese) is loaded, and the Portuguese
     goes under each English text it knows: set instructions, guide paragraphs, home-page notes and the answer
     explanations. Text it doesn't know stays English only. quiz.js is not changed: this file reads the page. */
(function () {
  "use strict";
  const me = document.currentScript;
  const SITE = new URL(".", me.src);
  const path = location.pathname.indexOf(SITE.pathname) === 0 ? location.pathname.slice(SITE.pathname.length) : location.pathname;
  const page = (path.replace(/index\.html$/, "") || "/");
  const level = (path.match(/^(a1|a2)\//) || [])[1] || "home";
  const KEY = "c1p:pt", PKEY = "c1p:pt:" + page;
  const get = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const set = (k, v) => { try { v === null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch (e) {} };
  const globalOn = () => get(KEY) === "1";
  const isOn = () => { const p = get(PKEY); return p === null ? globalOn() : p === "1"; };
  const root = document.documentElement;
  root.classList.toggle("pt-on", isOn());

  /* ---------- styles ---------- */
  const css = `
.pt-tr { display: none; }
html.pt-on .pt-tr { display: block; margin-top: .3em; color: var(--muted); font-style: italic; font-weight: 400; }
html.pt-on .notes-list .pt-tr, html.pt-on .explain .pt-tr { margin-top: .15em; }
.pt-bar { display: flex; justify-content: flex-end; margin: calc(var(--s3) - var(--s6)) 0 var(--s4); }
@media (max-width: 599px) { .pt-bar { margin-top: calc(var(--s2) - var(--s5)); } }
.pt-switch { display: inline-flex; align-items: center; gap: 8px; min-height: 32px; padding: 4px 10px 4px 6px;
  font: inherit; font-size: 14px; font-weight: 500; color: var(--muted); background: transparent;
  border: 1px solid transparent; border-radius: 999px; cursor: pointer; box-shadow: none; }
.pt-switch:hover { background: var(--surface-2); color: var(--text); border-color: transparent; }
.pt-switch:focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; }
.pt-track { position: relative; flex: none; width: 30px; height: 18px; border-radius: 999px;
  background: var(--surface-2); border: 1px solid var(--border-strong); transition: background .15s, border-color .15s; }
.pt-track::after { content: ""; position: absolute; top: 2px; left: 2px; width: 12px; height: 12px; border-radius: 50%;
  background: var(--border-strong); transition: transform .15s, background .15s; }
.pt-switch[aria-checked="true"] { color: var(--text); }
.pt-switch[aria-checked="true"] .pt-track { background: var(--primary); border-color: var(--primary); }
.pt-switch[aria-checked="true"] .pt-track::after { transform: translateX(12px); background: var(--on-primary); }
.bar .status .pt-switch { padding: 2px 8px 2px 4px; min-height: 28px; font-size: 13px; white-space: nowrap; }
@media print { .pt-bar, .bar .pt-switch { display: none !important; } }`;
  const st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  /* ---------- the dictionary ---------- */
  let dict = null, loading = false;
  const norm = (s) => s.replace(/\s+/g, " ").trim();
  window.FPPT_LOAD = (d) => { dict = d; loading = false; annotate(document.body); };
  function load() {
    if (dict || loading) return;
    loading = true;
    const s = document.createElement("script");
    s.src = new URL("pt/" + level + ".js?v=" + (me.dataset.dict || "1"), SITE).href;
    s.onerror = () => { loading = false; s.remove(); };
    document.head.appendChild(s);
  }
  const tr = (txt) => {
    const t = document.createElement("span");
    t.className = "pt-tr"; t.lang = "pt-BR";
    t.textContent = txt;
    return t;
  };
  /* Blocks whose whole text is translated: the Portuguese goes inside, at the end. */
  const BLOCKS = [".lead", ".sec-note", ".card.instructions p", ".cta-text p", ".lc-desc", ".tile .desc", ".q-intro",
    ".guide p:not(.ex-label)"].join(",");
  /* Text of a block for the dictionary: a tile's description leaves out its set count and anything scripts add. */
  function blockText(el) {
    if (!el.classList.contains("desc")) return norm(el.textContent);
    let s = "";
    el.childNodes.forEach((n) => {
      if (n.nodeType === 3) s += n.data;
      else if (/^(I|B|EM|STRONG|A|CODE)$/.test(n.nodeName)) s += n.textContent;
    });
    return norm(s);
  }
  /* Explanations sit in a text node of their own (quiz.js writes them with esc()): the Portuguese goes right after. */
  const EXPL = ".explain, .notes-list li, .notes-box";
  function annotate(scope) {
    if (!dict || !scope) return;
    const els = [];
    if (scope.matches && scope.matches(BLOCKS)) els.push(scope);
    scope.querySelectorAll && scope.querySelectorAll(BLOCKS).forEach((e) => els.push(e));
    els.forEach((el) => {
      if (el.querySelector(":scope > .pt-tr")) return;
      const t = dict[blockText(el)];
      if (t) el.appendChild(tr(t));
    });
    const boxes = [];
    if (scope.matches && scope.matches(EXPL)) boxes.push(scope);
    scope.querySelectorAll && scope.querySelectorAll(EXPL).forEach((e) => boxes.push(e));
    boxes.forEach((box) => {
      const walker = document.createTreeWalker(box, NodeFilter.SHOW_TEXT);
      const hits = [];
      for (let n = walker.nextNode(); n; n = walker.nextNode()) {
        if (n.parentNode.closest(".pt-tr")) continue;
        const nx = n.nextSibling;
        if (nx && nx.nodeType === 1 && nx.classList.contains("pt-tr")) continue;
        const k = norm(n.data).replace(/^—\s+/, "");   // the answers panel writes "answer — explanation"
        if (k && dict[k]) hits.push([n, dict[k]]);
      }
      hits.forEach(([n, t]) => n.after(tr(t)));
    });
  }

  /* ---------- switches ---------- */
  function makeSwitch(label, title) {
    const b = document.createElement("button");
    b.type = "button"; b.className = "pt-switch"; b.setAttribute("role", "switch");
    b.innerHTML = '<span class="pt-track" aria-hidden="true"></span><span class="pt-label"></span>';
    b.querySelector(".pt-label").textContent = label;
    if (title) b.title = title;
    return b;
  }
  const switches = [];
  function refresh() {
    const on = isOn();
    root.classList.toggle("pt-on", on);
    switches.forEach((b) => b.setAttribute("aria-checked", on ? "true" : "false"));
    if (on) load();
  }
  function topSwitch() {
    const header = document.querySelector("header.site");
    if (!header || document.querySelector(".pt-bar")) return;
    const bar = document.createElement("div");
    bar.className = "pt-bar";
    const b = makeSwitch("Explicações em português", "Mostrar as explicações também em português");
    b.addEventListener("click", () => {
      set(KEY, isOn() ? "0" : "1");
      set(PKEY, null);           // the site-wide switch also decides for this page
      refresh();
    });
    bar.appendChild(b);
    header.after(bar);
    switches.push(b);
  }
  /* Next to the score, once a set is checked: on or off for this page only. */
  function scoreSwitches() {
    document.querySelectorAll(".bar .status .score").forEach((score) => {
      let b = score.parentNode.querySelector(".pt-switch");
      if (!b) {
        b = makeSwitch("Português", "Explicações em português nesta página");
        b.addEventListener("click", () => {
          const on = !isOn();
          set(PKEY, on === globalOn() ? null : on ? "1" : "0");
          refresh();
        });
        score.after(b);
        switches.push(b);
        b.setAttribute("aria-checked", isOn() ? "true" : "false");
      }
      b.hidden = !score.textContent;
    });
  }

  function start() {
    topSwitch();
    scoreSwitches();
    refresh();
    new MutationObserver((muts) => {
      scoreSwitches();
      if (!dict) return;
      muts.forEach((m) => m.addedNodes.forEach((n) => {
        if (n.nodeType === 1 && !n.classList.contains("pt-tr")) annotate(n);
        else if (n.nodeType === 3 && n.parentElement) annotate(n.parentElement.closest(EXPL + "," + BLOCKS));
      }));
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
  /* Another tab changed the setting. */
  window.addEventListener("storage", (e) => { if (e.key === KEY || e.key === PKEY) refresh(); });
})();
