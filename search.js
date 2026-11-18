/* C1 Prep: search the grammar and vocabulary exercises (search.html).
   search-index.js (window.SEARCH_INDEX) has every grammar and vocabulary page at every level: its title,
   description, set titles and guide headings, and every sentence with the answer between | marks.
   Topics match on their titles and descriptions; sentences match on their words, answer included.
   Words of 4 letters or more also match longer words (passiv → passive); shorter ones match whole words. */
(function () {
  "use strict";
  const NAMES = { a1: "A1 Beginner", a2: "A2 Elementary", b1: "B1 Intermediate", b2: "B2 First", c1: "C1 Advanced", c2: "C2 Proficiency" };
  const icon = (l) => (l === "c1" ? "" : l + "/") + "favicon.svg?v=2";
  const SUGGEST = ["present perfect", "conditionals", "phrasal verbs", "used to", "make or do", "prepositions", "passive", "rule out"];
  const STOP = new Set(["a", "an", "the", "or", "and", "of", "to", "in", "on", "at", "for", "with", "vs", "versus"]);
  const GROUPS = 15, PER_GROUP = 3;

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const MAP = { "’": "'", "‘": "'", "`": "'", "“": '"', "”": '"', "–": "-", "—": "-", "…": "." };
  /* Lower case, no accents, straight quotes, and the same length as the original, so matches can be marked in it. */
  function fold(s) {
    let o = "";
    for (const ch of s) {
      if (ch.length !== 1) { o += ch; continue; }
      let c = ch.normalize("NFD")[0].toLowerCase();
      if (c.length !== 1) c = ch;
      o += MAP[c] || c;
    }
    return o;
  }
  const isWord = (c) => c !== undefined && /[a-z0-9]/.test(c);
  /* Where a search word starts a word in the text: [start, end of that word] pairs. */
  function find(text, tok) {
    const out = [];
    const prefix = tok.length >= 4;
    let i = text.indexOf(tok);
    while (i !== -1) {
      const j = i + tok.length;
      if (!isWord(text[i - 1]) && (prefix || !isWord(text[j]))) {
        let e = j;
        while (isWord(text[e])) e++;
        out.push([i, e]);
      }
      i = text.indexOf(tok, i + 1);
    }
    return out;
  }
  /* The whole search as a phrase: the same words in a row, each one also as the start of a longer word
     (4 letters or more), so "rule out" finds "ruled out" too. */
  const phraseRe = {};
  function findPhrase(text, toks) {
    const out = [], key = toks.join(" ");
    const re = phraseRe[key] || (phraseRe[key] = new RegExp("(^|[^a-z0-9])(" + toks.map((t, i) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") +
      (t.length >= 4 ? "[a-z0-9]*" : i === toks.length - 1 ? "(?![a-z0-9])" : "")).join("[\\s,]+") + ")", "g"));
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(text))) {
      const a = m.index + m[1].length;
      out.push([a, a + m[2].length]);
      re.lastIndex = a + Math.max(1, m[2].length);
    }
    return out;
  }
  function parse(q) {
    const f = fold(q).replace(/\s+/g, " ").trim();
    const all = f.split(/[\s,;:!?()"/]+/).map((t) => t.replace(/^[.\-']+|[.']+$/g, "")).filter(Boolean);
    const main = all.filter((t) => !STOP.has(t));
    return { all, words: main.length ? main : all };
  }

  /* ---------- the index, folded once ---------- */
  let PAGES = null;
  function prepare() {
    PAGES = (window.SEARCH_INDEX || []).map((p, n) => {
      const sets = p.s.map((S) => S[1].map((raw) => {
        const a = raw.indexOf("|"), b = raw.indexOf("|", a + 1);
        const plain = raw.slice(0, a) + raw.slice(a + 1, b) + raw.slice(b + 1);
        return { plain, f: fold(plain), fill: [a, b - 1] };
      }));
      return {
        n, l: p.l, k: p.k, href: p.f, part: p.p, title: p.t, desc: p.d, sets,
        fields: [[fold(p.t), 8], [fold(p.p), 6], [fold(p.d), 4], [fold(NAMES[p.l] + " " + p.l + " " + (p.k === "g" ? "grammar" : "vocabulary")), 3],
                 [fold(p.g), 2], [fold(p.s.map((S) => S[0]).join(" · ")), 2]],
      };
    });
  }

  function search(q, level, kind) {
    const Q = parse(q);
    const pages = PAGES.filter((p) => (!level || p.l === level) && (!kind || p.k === kind));
    // Topics: every main word somewhere in the title, description, guide headings or set titles.
    const topics = [];
    pages.forEach((p) => {
      let score = 0;
      for (const w of Q.words) {
        let best = 0;
        for (const [f, wt] of p.fields) if (wt > best && find(f, w).length) best = wt;
        if (!best) return;
        score += best;
      }
      if (Q.all.length > 1) {
        if (findPhrase(p.fields[0][0], Q.all).length) score += 10;
        else if (p.fields.some(([f]) => findPhrase(f, Q.all).length)) score += 4;
      }
      topics.push({ p, score });
    });
    topics.sort((a, b) => b.score - a.score || a.p.n - b.p.n);

    // Sentences: the whole phrase if any sentence has it, otherwise every main word.
    const phraseMode = Q.all.length > 1 && pages.some((p) => p.sets.some((S) => S.some((x) => findPhrase(x.f, Q.all).length)));
    const groups = [];
    let total = 0;
    pages.forEach((p) => {
      const hits = [];
      p.sets.forEach((S, si) => S.forEach((x) => {
        let marks;
        if (phraseMode) {
          marks = findPhrase(x.f, Q.all);
          if (!marks.length) return;
        } else {
          marks = [];
          for (const w of Q.words) { const m = find(x.f, w); if (!m.length) return; marks = marks.concat(m); }
        }
        hits.push({ x, set: si + 1, marks });
      }));
      if (hits.length) { groups.push({ p, hits }); total += hits.length; }
    });
    return { topics, groups, total };
  }

  /* A sentence with the answer underlined and the matches marked. */
  function marked(x, marks) {
    const s = x.plain, flag = new Uint8Array(s.length);
    for (let i = x.fill[0]; i < x.fill[1]; i++) flag[i] |= 1;
    marks.forEach(([a, b]) => { for (let i = a; i < b; i++) flag[i] |= 2; });
    let out = "", i = 0;
    while (i < s.length) {
      let j = i;
      while (j < s.length && flag[j] === flag[i]) j++;
      const t = esc(s.slice(i, j)), f = flag[i];
      out += f === 0 ? t : f === 1 ? '<span class="fill">' + t + "</span>" : f === 2 ? "<mark>" + t + "</mark>" : '<mark class="fill">' + t + "</mark>";
      i = j;
    }
    return out;
  }
  function markText(text, words) {
    const f = fold(text);
    let marks = [];
    words.forEach((w) => { marks = marks.concat(find(f, w)); });
    if (!marks.length) return esc(text);
    return marked({ plain: text, fill: [0, 0] }, marks);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("search-form");
    const input = document.getElementById("q");
    const status = document.getElementById("search-status");
    const out = document.getElementById("search-results");
    if (!form || !input || !out) return;
    prepare();
    if (!PAGES.length) { status.textContent = "The search isn’t available right now. Please try again later."; return; }

    const radios = (name) => Array.from(form.querySelectorAll('input[name="' + name + '"]'));
    const val = (name) => { const r = form.querySelector('input[name="' + name + '"]:checked'); return r ? r.value : ""; };
    const params = new URLSearchParams(location.search);
    input.value = params.get("q") || "";
    [["level", params.get("level")], ["kind", params.get("kind")]].forEach(([name, v]) => {
      const r = radios(name).find((x) => x.value === (v || ""));
      if (r) r.checked = true;
    });

    function setUrl(q, level, kind) {
      const u = new URLSearchParams();
      if (q) u.set("q", q);
      if (level) u.set("level", level);
      if (kind) u.set("kind", kind);
      const s = u.toString();
      history.replaceState(null, "", location.pathname + (s ? "?" + s : ""));
    }

    function suggestions() {
      const box = document.createElement("div");
      box.className = "search-suggest";
      box.innerHTML = "<p>Try one of these:</p>";
      const list = document.createElement("div");
      list.className = "suggest-list";
      SUGGEST.forEach((s) => {
        const b = document.createElement("button");
        b.type = "button"; b.className = "secondary small"; b.textContent = s;
        b.addEventListener("click", () => { input.value = s; run(); input.focus(); });
        list.appendChild(b);
      });
      box.appendChild(list);
      return box;
    }

    function topicCard(t, words) {
      const p = t.p;
      return '<a href="' + esc(p.href) + '"><img src="' + icon(p.l) + '" alt="" width="36" height="36"><span>' +
        '<span class="hit-k">' + esc(p.l.toUpperCase() + " · " + p.part) + "</span>" +
        '<span class="lc-name">' + markText(p.title, words) + "</span>" +
        (p.desc ? '<span class="lc-desc">' + markText(p.desc, words) + "</span>" : "") + "</span></a>";
    }

    function groupCard(g, open) {
      const p = g.p;
      const sec = document.createElement("section");
      sec.className = "card hit-group";
      sec.innerHTML = '<a class="hg-head" href="' + esc(p.href) + '"><img src="' + icon(p.l) + '" alt="" width="28" height="28">' +
        '<span><span class="hit-k">' + esc(p.l.toUpperCase() + " · " + p.part) + '</span><span class="hg-t">' + esc(p.title) + "</span></span></a>";
      const ul = document.createElement("ul");
      ul.className = "hit-list";
      const paint = (all) => {
        ul.innerHTML = g.hits.slice(0, all ? g.hits.length : PER_GROUP).map((h) =>
          '<li><a href="' + esc(p.href) + "#set-" + h.set + '"><span class="hl-s">' + marked(h.x, h.marks) + '</span><span class="hl-set">Set ' + h.set + "</span></a></li>").join("");
      };
      paint(open);
      sec.appendChild(ul);
      if (g.hits.length > PER_GROUP && !open) {
        const more = document.createElement("button");
        more.type = "button"; more.className = "linkish hg-more";
        more.textContent = "Show all " + g.hits.length + " sentences";
        more.addEventListener("click", () => { paint(true); more.remove(); });
        sec.appendChild(more);
      }
      return sec;
    }

    function run() {
      const q = input.value.trim(), level = val("level"), kind = val("kind");
      setUrl(q, level, kind);
      out.innerHTML = "";
      if (!q || !parse(q).words.length) { status.textContent = ""; out.appendChild(suggestions()); return; }
      const r = search(q, level, kind);
      const words = parse(q).words;
      const where = (level ? " at " + NAMES[level].split(" ")[0] : "") ;
      if (!r.topics.length && !r.total) {
        status.innerHTML = "Nothing matches <b>" + esc(q) + "</b>" + esc(where) + ".";
        const tip = document.createElement("div");
        tip.className = "search-empty";
        tip.innerHTML = "<p>Check the spelling, or try a shorter search: one or two words work best.</p>";
        if (level || kind) {
          const b = document.createElement("button");
          b.type = "button"; b.className = "secondary";
          b.textContent = "Search all levels and types";
          b.addEventListener("click", () => { radios("level")[0].checked = true; radios("kind")[0].checked = true; run(); });
          tip.appendChild(b);
        }
        out.appendChild(tip);
        return;
      }
      const plural = (n, a, b) => n + " " + (n === 1 ? a : b);
      status.innerHTML = plural(r.topics.length, "topic", "topics") + " and " + plural(r.total, "sentence", "sentences") + " for <b>" + esc(q) + "</b>" + esc(where) + ".";
      if (r.topics.length) {
        const h = document.createElement("h2"); h.textContent = "Topics"; out.appendChild(h);
        const box = document.createElement("div"); box.className = "level-cards topic-hits";
        box.innerHTML = r.topics.map((t) => topicCard(t, words)).join("");
        out.appendChild(box);
      }
      if (r.total) {
        const h = document.createElement("h2"); h.textContent = "In the exercises"; out.appendChild(h);
        const list = document.createElement("div"); list.className = "hit-groups";
        out.appendChild(list);
        let shown = 0;
        const more = document.createElement("button");
        more.type = "button"; more.className = "secondary groups-more";
        const step = () => {
          r.groups.slice(shown, shown + GROUPS).forEach((g) => list.appendChild(groupCard(g, r.groups.length === 1)));
          shown = Math.min(r.groups.length, shown + GROUPS);
          if (shown < r.groups.length) more.textContent = "Show more topics (" + (r.groups.length - shown) + " left)";
          else more.remove();
        };
        more.addEventListener("click", step);
        out.appendChild(more);
        step();
      }
    }

    let timer = 0;
    input.addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(run, 150); });
    form.addEventListener("change", (e) => { if (e.target.type === "radio") run(); });
    form.addEventListener("submit", (e) => { e.preventDefault(); clearTimeout(timer); run(); input.blur(); });
    run();
    if (!input.value) input.focus();
  });
})();
