/* C1 Prep: exam mode (exam.html at B2, C1 and C2).
   A full Reading and Use of English paper: one set from each part (sets not done yet come first), against the clock.
   Answers are saved as they are entered; the clock keeps running if the page is closed. At the end every part is
   marked, the sets count as done, and one summary line goes to the teacher's sheet. Needs progress.js and quiz.js. */
(function () {
  "use strict";
  const store = window.c1Store, quiz = window.c1Quiz, host = document.getElementById("exercise");
  if (!store || !quiz || !host) return;

  /* part: [page, data file, task, questions, paper]. paper: R = Reading, U = Use of English, as Cambridge reports them.
     scale: Cambridge's published conversion for official practice tests, [marks, Cambridge English Scale score];
     the last pair is full marks = the top of the exam's scale. cefr: [score needed, level]. */
  const UOE = [
    ["use-of-english-1", "uoe1", "Multiple-choice cloze", 8, "R"],
    ["use-of-english-2", "uoe2", "Open cloze", 8, "U"],
    ["use-of-english-3", "uoe3", "Word formation", 8, "U"],
    ["use-of-english-4", "uoe4", "Key word transformations", 6, "U"]
  ];
  const CFG = {
    b2: {
      minutes: 75,
      parts: UOE.concat([["reading-5", "r5", "Multiple choice", 6, "R"], ["reading-6", "r6", "Gapped text", 6, "R"], ["reading-7", "r7", "Multiple matching", 10, "R"]]),
      scale: { R: [[10, 122], [16, 140], [24, 160], [37, 180], [42, 190]], U: [[7, 122], [11, 140], [18, 160], [24, 180], [28, 190]] },
      cefr: [[180, "C1"], [160, "B2"], [140, "B1"]]
    },
    c1: {
      minutes: 90,
      parts: UOE.concat([["reading-5", "r5", "Multiple choice", 6, "R"], ["reading-6", "r6", "Cross-text matching", 4, "R"], ["reading-7", "r7", "Gapped text", 6, "R"], ["reading-8", "r8", "Multiple matching", 10, "R"]]),
      scale: { R: [[17, 142], [23, 160], [32, 180], [43, 200], [50, 210]], U: [[8, 142], [11, 160], [16, 180], [23, 200], [28, 210]] },
      cefr: [[200, "C2"], [180, "C1"], [160, "B2"]]
    },
    c2: {
      minutes: 90,
      parts: UOE.concat([["reading-5", "r5", "Multiple choice", 6, "R"], ["reading-6", "r6", "Gapped text", 7, "R"], ["reading-7", "r7", "Multiple matching", 10, "R"]]),
      scale: { R: [[14, 162], [22, 180], [28, 200], [36, 220], [44, 230]], U: [[9, 162], [13, 180], [17, 200], [22, 220], [28, 230]] },
      cefr: [[200, "C2"], [180, "C1"]]
    }
  };
  const cfg = CFG[store.level];
  if (!cfg) return;
  const PARTS = cfg.parts.map((p, i) => ({ page: p[0], file: p[1], name: p[2], count: p[3], paper: p[4], no: i + 1 }));
  const QUESTIONS = PARTS.reduce((a, p) => a + p.count, 0);

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const el = (tag, attrs, html) => {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    return e;
  };
  const ICON = {
    prev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>'
  };
  const wrap = host.closest(".wrap");
  const mins = (sec) => Math.max(1, Math.round(sec / 60)) + " min";
  const clock = (sec) => { sec = Math.max(0, Math.ceil(sec)); return Math.floor(sec / 60) + ":" + String(sec % 60).padStart(2, "0"); };

  /* Marks -> approximate Cambridge English Scale score (null below the lowest score Cambridge reports). */
  function scaleScore(marks, table) {
    if (marks < table[0][0]) return null;
    for (let i = 1; i < table.length; i++) {
      if (marks <= table[i][0]) {
        const a = table[i - 1], b = table[i];
        return Math.round(a[1] + ((b[1] - a[1]) * (marks - a[0])) / (b[0] - a[0]));
      }
    }
    return table[table.length - 1][1];
  }
  function levelOf(score) {
    if (score == null) return "below " + cfg.cefr[cfg.cefr.length - 1][1];
    for (const c of cfg.cefr) if (score >= c[0]) return c[1] + " level";
    return "below " + cfg.cefr[cfg.cefr.length - 1][1];
  }

  /* ---------- loading ---------- */
  const DATA = {}, INSTR = {};
  function loadData(p) {
    if (DATA[p.page]) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "data/" + p.file + ".js";
      s.onload = () => { DATA[p.page] = window.SETS || []; window.SETS = undefined; resolve(); };
      s.onerror = () => reject(new Error("Could not load " + s.src));
      document.head.appendChild(s);
    });
  }
  /* The instructions for each part are read from that part's own page, so they are always the same text. */
  function loadInstructions(p) {
    if (INSTR[p.page] != null) return Promise.resolve();
    return fetch(p.page + ".html").then((r) => (r.ok ? r.text() : "")).then((html) => {
      const box = new DOMParser().parseFromString(html, "text/html").querySelector(".instructions");
      INSTR[p.page] = box ? box.innerHTML : "";
    }).catch(() => { INSTR[p.page] = ""; });
  }
  async function loadAll() {
    const texts = Promise.all(PARTS.map(loadInstructions));
    for (const p of PARTS) await loadData(p);    // one at a time: every data file sets window.SETS
    await texts;
    PARTS.forEach((p) => store.setCount(store.key(p.page), DATA[p.page].length));
  }
  /* A set not done yet if there is one; otherwise the one done longest ago. */
  function pickSet(p) {
    const n = DATA[p.page].length, done = store.results(store.key(p.page)).s;
    const fresh = [];
    for (let i = 0; i < n; i++) if (!done[i]) fresh.push(i);
    if (fresh.length) return fresh[Math.floor(Math.random() * fresh.length)];
    let best = 0;
    for (let i = 1; i < n; i++) if (done[i][4] < done[best][4]) best = i;
    return best;
  }

  /* ---------- small dialog (same look as the name dialog) ---------- */
  function dialog(title, text, buttons) {
    const box = el("div", { class: "name-modal" });
    const card = el("div", { class: "name-card", role: "dialog", "aria-modal": "true", "aria-labelledby": "xd-title" });
    card.appendChild(el("h2", { id: "xd-title" }, esc(title)));
    card.appendChild(el("p", null, esc(text)));
    const stack = el("div", { class: "stack" });
    buttons.forEach((b, i) => {
      const btn = el("button", { type: "button", class: b.primary ? "" : "secondary" }, esc(b.label));
      btn.addEventListener("click", () => { box.remove(); if (b.go) b.go(); });
      stack.appendChild(btn);
      if (i === 0) setTimeout(() => btn.focus(), 50);
    });
    card.appendChild(stack);
    box.appendChild(card);
    document.body.appendChild(box);
  }

  /* ---------- start page ---------- */
  function intro(message) {
    wrap.classList.remove("wide");
    host.innerHTML = "";
    if (message) host.appendChild(el("p", { class: "lead" }, esc(message)));
    host.appendChild(el("p", { class: "lead" },
      "A full Reading and Use of English paper: one set from each of the " + PARTS.length + " parts, " + QUESTIONS + " questions, " + cfg.minutes +
      " minutes. Sets you haven't done yet are chosen first."));
    const card = el("div", { class: "card" });
    card.appendChild(el("h3", null, "Before you start"));
    card.appendChild(el("ul", { class: "plain-list" },
      "<li>You can move between the parts in any order and change your answers until you finish.</li>" +
      "<li>Your answers are saved as you go. If you close the page, the clock keeps running, as it would in the exam room.</li>" +
      "<li>Nothing is marked until you press <b>Finish</b> or the time runs out. Then you see your score for each part, with the answers and explanations.</li>"));
    const go = el("button", { type: "button", class: "exam-start" }, "Start the paper");
    go.addEventListener("click", () => {
      if (window.c1RequireName && !window.c1RequireName(() => go.click())) return;
      go.disabled = true; go.textContent = "Getting the paper ready…";
      start().catch(() => { go.disabled = false; go.textContent = "Start the paper"; host.insertBefore(el("p", { class: "lead" }, "The paper could not be loaded. Check your connection and try again."), host.firstChild); });
    });
    card.appendChild(go);
    host.appendChild(card);

    const past = store.examLog();
    if (past.length) {
      host.appendChild(el("h2", null, "Your papers"));
      const c = el("div", { class: "card" });
      const rows = past.slice().reverse().map((x) => {
        const d = new Date(x.at);
        return "<tr><td>" + esc(d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })) + '</td><td class="num"><b>' + x.score + " / " + x.max +
          '</b></td><td class="num">' + Math.round((100 * x.score) / x.max) + '%</td><td class="num">' + (x.timeUp ? "time ran out" : mins(x.secs)) + "</td></tr>";
      }).join("");
      c.appendChild(el("div", { class: "table-wrap" }, '<table class="form-table result-table"><thead><tr><th>Date</th><th class="num">Marks</th><th class="num">Right</th><th class="num">Time</th></tr></thead><tbody>' + rows + "</tbody></table>"));
      host.appendChild(c);
    }
  }

  async function start() {
    await loadAll();
    const now = Date.now();
    const state = { sets: PARTS.map(pickSet), start: now, end: now + cfg.minutes * 60000, snaps: [], active: 0, spent: PARTS.map(() => 0) };
    store.saveExam(state);
    paper(state);
  }

  /* ---------- the paper ---------- */
  function paper(state) {
    host.innerHTML = "";
    const top = el("div");                       // the result goes here at the end
    const tabs = el("div", { class: "tabs exam-tabs", role: "tablist", "aria-label": "Parts of the paper" });
    host.append(top, tabs);
    const ctrls = [], panels = [], tabBtns = [];
    let finished = false, results = null;

    PARTS.forEach((p, i) => {
      const t = el("button", { type: "button", role: "tab", id: "xt" + i, "aria-controls": "xp" + i }, "<span>Part " + p.no + '</span><span class="cnt"></span>');
      t.addEventListener("click", () => show(i, false));
      t.addEventListener("keydown", (e) => {
        const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        show((i + d + PARTS.length) % PARTS.length, true);
      });
      tabs.appendChild(t); tabBtns.push(t);
      const panel = el("div", { class: "exam-part", id: "xp" + i, role: "tabpanel", "aria-labelledby": "xt" + i, hidden: "" });
      panel.appendChild(el("h2", null, "Part " + p.no + " · " + esc(p.name)));
      if (INSTR[p.page]) panel.appendChild(el("div", { class: "card instructions" }, INSTR[p.page]));
      const c = quiz.build(DATA[p.page][state.sets[i]], panel, state.sets[i], { embedded: true });
      if (state.snaps[i]) c.restore(state.snaps[i]);
      host.appendChild(panel);
      ctrls.push(c); panels.push(panel);
    });

    /* bar: clock and progress, then the buttons */
    const bar = el("div", { class: "bar exam-bar" });
    const status = el("div", { class: "status" });
    const timer = el("span", { class: "timer", role: "timer", "aria-label": "Time left" });
    const meter = el("span", { class: "meter", "aria-hidden": "true" }, "<i></i>");
    const progress = el("span", { class: "progress" });
    const total = el("span", { class: "score" });
    status.append(timer, meter, progress, total);
    const bPrev = el("button", { type: "button", class: "secondary reset", "aria-label": "Previous part", title: "Previous part" }, ICON.prev + '<span class="label">Previous part</span>');
    const bNext = el("button", { type: "button", class: "secondary" }, "Next part");
    const bEnd = el("button", { type: "button" }, "Finish");
    bar.append(status, bPrev, bNext, bEnd);
    host.appendChild(bar);

    function counts() {
      let done = 0;
      ctrls.forEach((c, i) => {
        const a = c.answered(); done += a;
        tabBtns[i].querySelector(".cnt").textContent = results ? results[i].score + "/" + results[i].max : a + "/" + c.count;
      });
      progress.textContent = done + " of " + QUESTIONS + " answered";
      meter.firstChild.style.width = (100 * done) / QUESTIONS + "%";
      return done;
    }
    function show(i, focus) {
      state.active = i;
      panels.forEach((p, k) => { p.hidden = k !== i; });
      tabBtns.forEach((t, k) => { t.setAttribute("aria-selected", k === i ? "true" : "false"); t.tabIndex = k === i ? 0 : -1; });
      wrap.classList.toggle("wide", !!panels[i].querySelector(".split"));
      bPrev.disabled = i === 0;
      bNext.disabled = i === PARTS.length - 1;
      if (focus) tabBtns[i].focus();
      if (tabBtns[i].scrollIntoView) tabBtns[i].scrollIntoView({ block: "nearest", inline: "nearest" });
    }
    function save() {
      if (finished) return;
      state.snaps = ctrls.map((c) => c.snapshot());
      store.saveExam(state);
    }
    host.oninput = host.onchange = () => { counts(); save(); };
    bPrev.addEventListener("click", () => { show(state.active - 1, false); window.scrollTo(0, 0); save(); });
    bNext.addEventListener("click", () => { show(state.active + 1, false); window.scrollTo(0, 0); save(); });

    /* clock */
    let last = Date.now();
    function tick() {
      const now = Date.now();
      state.spent[state.active] += (now - last) / 1000;
      last = now;
      const left = (state.end - now) / 1000;
      timer.textContent = clock(left);
      timer.classList.toggle("low", left <= 300);
      if (left <= 0) finish(true);
    }
    const ticker = setInterval(tick, 1000);
    window.addEventListener("pagehide", save);

    bEnd.addEventListener("click", () => {
      if (finished) { store.dropExam(); intro(); window.scrollTo(0, 0); return; }
      const done = counts(), missing = QUESTIONS - done;
      dialog("Finish the paper?", (missing ? "You have " + missing + " question" + (missing === 1 ? "" : "s") + " without an answer. " : "You have answered every question. ") +
        "Once the paper is marked you can't change your answers.",
        [{ label: "Keep working" }, { label: "Finish and mark", primary: true, go: () => finish(false) }]);
    });

    function finish(timeUp) {
      if (finished) return;
      tick0();
      finished = true;
      clearInterval(ticker);
      const secs = Math.min(cfg.minutes * 60, Math.round((Date.now() - state.start) / 1000));
      results = ctrls.map((c) => c.mark());
      const sum = { R: [0, 0], U: [0, 0] };
      let score = 0, max = 0, mistakes = [];
      PARTS.forEach((p, i) => {
        const r = results[i];
        store.record(store.key(p.page), state.sets[i], ctrls[i].sig(), r.score, r.max, r.per);
        score += r.score; max += r.max;
        sum[p.paper][0] += r.score; sum[p.paper][1] += r.max;
        mistakes = mistakes.concat(r.mistakes);
      });
      const no = store.addExam({ at: Date.now(), score: score, max: max, secs: secs, timeUp: timeUp ? 1 : 0, sets: state.sets, parts: results.map((r) => [r.score, r.max]) });
      store.dropExam();

      if (window.c1Log) {
        window.c1Log({
          part: (store.levelName ? store.levelName + " · " : "") + "Exam mode · Reading and Use of English",
          set: no, title: "Sets " + state.sets.map((s) => s + 1).join(", ") + (timeUp ? " (time ran out)" : ""),
          score: score, max: max, mistakes: mistakes, attempt: 1, revealed: false, seconds: secs
        });
      }

      /* result */
      const sR = scaleScore(sum.R[0], cfg.scale.R), sU = scaleScore(sum.U[0], cfg.scale.U);
      const low = cfg.scale.R[0][1];
      const rParts = PARTS.filter((p) => p.paper === "R").map((p) => p.no), uParts = PARTS.filter((p) => p.paper === "U").map((p) => p.no);
      const card = el("div", { class: "card exam-result" });
      card.appendChild(el("h2", null, timeUp ? "Time's up: your result" : "Your result"));
      card.appendChild(el("p", { class: "big" }, score + " / " + max + "<span>" + Math.round((100 * score) / max) + "% of the marks · " + (timeUp ? "all " + cfg.minutes + " minutes used" : "finished in " + mins(secs)) + "</span>"));
      card.appendChild(el("div", { class: "table-wrap" },
        '<table class="form-table result-table"><thead><tr><th>Part</th><th>Task</th><th class="num">Marks</th><th class="num">Time</th></tr></thead><tbody>' +
        PARTS.map((p, i) => '<tr><td class="nw">Part ' + p.no + "</td><td>" + esc(p.name) + '</td><td class="num"><b>' + results[i].score + " / " + results[i].max +
          '</b></td><td class="num">' + (state.spent[i] < 30 ? "under 1 min" : mins(state.spent[i])) + "</td></tr>").join("") + "</tbody></table>"));
      card.appendChild(el("h3", null, "A rough guide to your level"));
      const line = (name, parts, s, x) => '<tr><td><b>' + name + '</b><br><span class="muted">Parts ' + parts.join(", ") + '</span></td><td class="num">' + s[0] + " / " + s[1] +
        '</td><td class="num">' + (x == null ? "below " + low : "about " + x) + "</td><td>" + levelOf(x) + "</td></tr>";
      card.appendChild(el("div", { class: "table-wrap" },
        '<table class="form-table result-table"><thead><tr><th>Paper</th><th class="num">Marks</th><th class="num">Cambridge English Scale</th><th>Level</th></tr></thead><tbody>' +
        line("Reading", rParts, sum.R, sR) + line("Use of English", uParts, sum.U, sU) + "</tbody></table>"));
      card.appendChild(el("p", { class: "small-note" },
        "Cambridge gives Reading and Use of English separate scores. These figures use Cambridge's own conversion for official practice tests. This paper is not an official test, and here a Part 4 answer gets 2 marks or none, so treat them as a rough guide only. Go through each part below to see the answers and explanations."));
      top.appendChild(card);

      timer.hidden = meter.hidden = progress.hidden = true;
      total.textContent = "Total: " + score + " / " + max;
      bEnd.textContent = "New paper";
      counts();
      show(0, false);
      window.scrollTo(0, 0);
    }
    /* Add the time since the last tick to the part on screen. */
    function tick0() { const now = Date.now(); state.spent[state.active] += (now - last) / 1000; last = now; }

    counts();
    show(Math.min(state.active || 0, PARTS.length - 1), false);
    tick();
  }

  /* ---------- on load: carry on with a paper in progress, or show the start page ---------- */
  const saved = store.getExam();
  if (saved && Array.isArray(saved.sets) && saved.sets.length === PARTS.length) {
    host.appendChild(el("p", { class: "lead" }, "Opening your paper…"));
    loadAll().then(() => {
      if (saved.sets.some((s, i) => !DATA[PARTS[i].page][s])) { store.dropExam(); intro(); return; }
      paper(saved);
    }).catch(() => intro("Your paper could not be loaded. Check your connection and reload the page."));
  } else intro();
})();
