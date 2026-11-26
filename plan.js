/* Future Perfect English: study plan (plan.html at A2, B1, B2, C1 and C2).
   The student gives the date of the exam and the time they have each week; the plan is a list of tasks for every
   week from today until the exam, made once and kept in this browser (localStorage "c1p:plan:<level>", so
   "Move my progress" carries it along). Tasks are sets (ticked when the set is checked after the plan was made),
   timed papers in exam mode (ticked by papers finished since then, in order), and writing and speaking tasks, which
   the student ticks. The pages and their numbers of sets come from window.PLAN, written by generator/planpages.py
   from the level's home page. Needs progress.js. */
(function () {
  "use strict";
  const store = window.c1Store, host = document.getElementById("plan"), CFG = window.PLAN;
  if (!store || !host || !CFG) return;

  const KEY = "c1p:plan:" + store.level, DAY = 864e5;
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } };
  const write = (v) => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const el = (tag, attrs, html) => {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    return e;
  };
  const PAGES = {};
  CFG.pages.forEach((p) => { PAGES[p.h] = p; });
  const byKind = (k) => CFG.pages.filter((p) => p.k === k);
  /* Time a week: [label, tasks a week]. A timed paper counts as two tasks. */
  const TIME = [["About 1 hour", 3], ["About 2 hours", 5], ["3 hours or more", 8]];

  /* ---------- dates (local days) ---------- */
  const today = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d.getTime(); };
  const parseDay = (s) => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ""); if (!m) return null; return new Date(+m[1], +m[2] - 1, +m[3]).getTime(); };
  const iso = (t) => { const d = new Date(t); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
  const short = (t) => new Date(t).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  const long = (t) => new Date(t).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  /* Whole days from a to b, safe across clock changes. */
  const days = (a, b) => Math.round((b - a) / DAY);
  const addDays = (t, n) => { const d = new Date(t); d.setDate(d.getDate() + n); return d.getTime(); };
  /* A plan has at most 52 weeks, so the exam can be at most 52 weeks away (364 days). */
  const LAST = 364;
  /* The plan's weeks are over but the exam is still ahead (only plans made before the 52-week limit). */
  const ended = (plan) => Math.floor(days(plan.s, today()) / 7) >= plan.w.length;

  /* ---------- making a plan ---------- */
  function make(examDay, perWeek) {
    const start = today(), total = days(start, examDay);
    const W = Math.min(52, Math.ceil(total / 7));
    const R = store.allResults();
    const taken = {};                                     // "page|set" already in the plan
    const isDone = (h, s) => !!((R[store.key(h)] || { s: {} }).s[s]);
    const best = (h, s) => { const r = (R[store.key(h)] || { s: {} }).s[s]; return r && r[1] ? r[2] / r[1] : 1; };
    const ptr = { part: 0, grammar: 0, vocab: 0, speak: 0 };
    /* The next set of this kind: the pages take turns; on each, the first set not done and not planned yet. When
       every set of the kind is done, the one with the lowest best score comes back, once. */
    function nextSet(kind) {
      const list = byKind(kind);
      if (!list.length) return null;
      for (let tries = 0; tries < list.length; tries++) {
        const p = list[ptr[kind]++ % list.length];
        for (let s = 0; s < p.n; s++) {
          if (!isDone(p.h, s) && !taken[p.h + "|" + s]) { taken[p.h + "|" + s] = 1; return ["s", p.h, s]; }
        }
      }
      let pick = null, low = 2;
      list.forEach((p) => { for (let s = 0; s < p.n; s++) if (!taken[p.h + "|" + s] && best(p.h, s) < low) { low = best(p.h, s); pick = [p.h, s]; } });
      if (!pick) return null;
      taken[pick[0] + "|" + pick[1]] = 1;
      return ["s", pick[0], pick[1], 1];                  // 1: done before, so this is a second go
    }
    const ORDER = ["part", "part", "grammar", "vocab"];
    let turn = 0;
    const weeks = [];
    for (let i = 0; i < W; i++) {
      const left = i === W - 1 ? total - 7 * i : 7;       // the last week can be short
      let units = Math.max(1, Math.round((perWeek * Math.min(7, left)) / 7));
      const fromEnd = W - 1 - i, tasks = [];
      if (CFG.mock && fromEnd % 4 === 0 && units >= 2) { tasks.push(["m"]); units -= 2; }
      if (units > 0 && (perWeek >= 5 || fromEnd % 2 === 0) && byKind("write").length) { tasks.push(["w"]); units--; }
      if (units > 0 && perWeek >= 5 && fromEnd % 2 === 1 && byKind("speak").length) {
        const sp = byKind("speak"); tasks.push(["p", sp[ptr.speak++ % sp.length].h]); units--;
      }
      let guard = 0;
      while (units > 0 && guard++ < 40) {
        const kind = ORDER[turn++ % ORDER.length];
        const t = nextSet(kind);
        if (t) { tasks.push(t); units--; }
      }
      /* Sets first, then the longer tasks. */
      tasks.sort((a, b) => (a[0] === "s" ? 0 : 1) - (b[0] === "s" ? 0 : 1));
      weeks.push(tasks);
    }
    return { v: 1, d: iso(examDay), u: perWeek, t: Date.now(), s: start, w: weeks, k: {} };
  }

  /* ---------- what is done ---------- */
  function status(plan) {
    const R = store.allResults();
    const papers = store.examLog().filter((x) => x.at >= plan.t).length;
    let mocks = 0;
    return plan.w.map((tasks, wi) => tasks.map((t, ti) => {
      const id = wi + "-" + ti;
      if (t[0] === "s") {
        const p = PAGES[t[1]];
        if (!p || t[2] >= p.n) return null;              // the page or the set is gone
        const r = (R[store.key(t[1])] || { s: {} }).s[t[2]];
        return { t: t, id: id, done: !!(r && r[4] >= plan.t), auto: true };
      }
      if (t[0] === "m") return { t: t, id: id, done: papers > mocks++, auto: true };
      if (t[0] === "p" && !PAGES[t[1]]) return null;
      return { t: t, id: id, done: !!plan.k[id], auto: false };
    }).filter(Boolean));
  }

  /* ---------- drawing ---------- */
  function label(t) {
    if (t[0] === "s") {
      const p = PAGES[t[1]];
      return { href: t[1] + ".html#set-" + (t[2] + 1), text: p.t + " · Set " + (t[2] + 1) + (t[3] ? " again" : ""), kind: p.g };
    }
    if (t[0] === "m") return { href: "exam.html", text: "Timed paper: Reading and Use of English, " + CFG.minutes + " minutes", kind: "Exam mode" };
    if (t[0] === "w") return { href: "writing.html", text: "One writing task, timed, then check it with the checklist", kind: "Writing" };
    const p = PAGES[t[1]];
    return { href: t[1] + ".html", text: p.t + ", with a partner", kind: "Speaking" };
  }
  function item(task, plan, onTick) {
    const L = label(task.t);
    const li = el("li", { class: "plan-task" + (task.done ? " done" : "") });
    if (task.auto) {
      li.appendChild(el("span", { class: "plan-mark", "aria-hidden": "true" }, task.done ? "✓" : ""));
    } else {
      const box = el("input", { type: "checkbox", class: "plan-check", "aria-label": "Done: " + L.text });
      box.checked = task.done;
      box.addEventListener("change", () => {
        if (box.checked) plan.k[task.id] = 1; else delete plan.k[task.id];
        write(plan); onTick();
      });
      li.appendChild(box);
    }
    const body = el("div", { class: "plan-body" });
    body.appendChild(el("span", { class: "plan-kind" }, esc(L.kind)));
    body.appendChild(el("a", { href: L.href }, esc(L.text)));
    if (task.done) body.appendChild(el("span", { class: "sr-only" }, " (done)"));
    li.appendChild(body);
    return li;
  }
  function list(tasks, plan, onTick) {
    const ul = el("ul", { class: "plan-list" });
    tasks.forEach((t) => ul.appendChild(item(t, plan, onTick)));
    return ul;
  }
  const weekDates = (plan, i) => {
    const a = addDays(plan.s, 7 * i), b = Math.min(addDays(a, 6), addDays(parseDay(plan.d), -1));
    return a === b ? short(a) : short(a) + "–" + short(b);
  };

  function showPlan(plan) {
    host.innerHTML = "";
    const examDay = parseDay(plan.d), now = today(), toGo = days(now, examDay);
    if (toGo <= 0) { showForm(plan, toGo === 0 ? "Your exam is today. Good luck! After it, you can make a new plan for your next goal." : "Your exam date has passed. Make a new plan for your next goal."); return; }
    if (ended(plan)) { showForm(plan, "The weeks in your plan are over, but your exam is still ahead. Make a new plan for the time that is left."); return; }
    const st = status(plan), W = plan.w.length;
    const cur = Math.min(W - 1, Math.max(0, Math.floor(days(plan.s, now) / 7)));
    const all = [].concat.apply([], st), done = all.filter((t) => t.done).length;
    const redraw = () => showPlan(plan);

    /* summary */
    const top = el("div", { class: "card plan-top" });
    top.appendChild(el("p", { class: "plan-when" }, esc(CFG.exam ? CFG.exam + " exam" : "Your exam") + ": <b>" + esc(long(examDay)) + "</b>"));
    top.appendChild(el("p", { class: "plan-count" }, (toGo === 1 ? "Tomorrow" : toGo < 14 ? toGo + " days to go" : Math.floor(toGo / 7) + " weeks to go") +
      '<span class="plan-meter" aria-hidden="true"><i style="width:' + (all.length ? Math.round((100 * done) / all.length) : 0) + '%"></i></span>' +
      "<span>" + done + " of " + all.length + " tasks done</span>"));
    const leftovers = [].concat.apply([], st.slice(0, cur)).filter((t) => !t.done);
    const next = st[cur].concat(leftovers).find((t) => !t.done);
    if (next) {
      const L = label(next.t);
      top.appendChild(el("a", { class: "btn plan-next", href: L.href }, "Next: " + esc(L.text)));
    }
    host.appendChild(top);

    /* this week */
    host.appendChild(el("h2", null, (cur === W - 1 ? "Exam week" : "This week") + " <span class=\"plan-dates\">" + esc(weekDates(plan, cur)) + "</span>"));
    const wk = el("div", { class: "card" });
    const wDone = st[cur].filter((t) => t.done).length;
    wk.appendChild(el("p", { class: "plan-sub" }, st[cur].length ? (wDone === st[cur].length ? "All done this week. Well done!" : wDone + " of " + st[cur].length + " done") : "A light week: rest before the exam."));
    if (st[cur].length) wk.appendChild(list(st[cur], plan, redraw));
    if (cur === W - 1) wk.appendChild(el("p", { class: "small-note" }, "Keep the day before the exam light: read over your notes and get a good night’s sleep."));
    if (leftovers.length) {
      wk.appendChild(el("h3", null, "Still to do from earlier weeks"));
      wk.appendChild(list(leftovers, plan, redraw));
    }
    host.appendChild(wk);

    /* the other weeks */
    const later = st.slice(cur + 1), earlier = st.slice(0, cur);
    if (later.length) {
      host.appendChild(el("h2", null, "Coming up"));
      const box = el("div", { class: "plan-weeks" });
      later.forEach((tasks, k) => {
        const i = cur + 1 + k;
        const d = el("details", { class: "plan-week" });
        d.appendChild(el("summary", null, (i === W - 1 ? "Exam week" : "Week " + (i + 1)) + ' <span class="plan-dates">' + esc(weekDates(plan, i)) + "</span>" +
          '<span class="plan-n">' + tasks.length + (tasks.length === 1 ? " task" : " tasks") + "</span>"));
        d.appendChild(list(tasks, plan, redraw));
        box.appendChild(d);
      });
      host.appendChild(box);
    }
    if (earlier.length) {
      host.appendChild(el("h2", null, "Earlier weeks"));
      const box = el("div", { class: "plan-weeks" });
      earlier.forEach((tasks, i) => {
        const n = tasks.filter((t) => t.done).length;
        const d = el("details", { class: "plan-week" });
        d.appendChild(el("summary", null, "Week " + (i + 1) + ' <span class="plan-dates">' + esc(weekDates(plan, i)) + "</span>" +
          '<span class="plan-n">' + n + " of " + tasks.length + " done</span>"));
        d.appendChild(list(tasks, plan, redraw));
        box.appendChild(d);
      });
      host.appendChild(box);
    }

    const acts = el("div", { class: "move-actions" });
    const change = el("button", { type: "button", class: "secondary" }, "Change the date or the time");
    change.addEventListener("click", () => showForm(plan, ""));
    acts.appendChild(change);
    host.appendChild(acts);
    host.appendChild(el("p", { class: "small-note" }, "Sets and timed papers tick themselves when you finish them. Tick writing and speaking yourself. Your plan is kept in this browser; " +
      '<a href="progress.html">Move my progress</a> takes it to another phone or computer.'));
  }

  function showForm(old, message) {
    host.innerHTML = "";
    if (message) host.appendChild(el("p", { class: "lead" }, esc(message)));
    else if (!old) host.appendChild(el("p", { class: "lead" }, "Tell us when your exam is and how much time you have each week. You get a list of sets for every week until the exam, and they are ticked off as you do them."));
    const card = el("form", { class: "card plan-form", novalidate: "" });
    const min = addDays(today(), 1), max = addDays(today(), LAST);
    const keep = old && parseDay(old.d) > today() ? old.d : "";
    card.innerHTML =
      '<label class="plan-label" for="plan-date">Date of your exam' + (CFG.exam ? " (" + esc(CFG.exam) + ")" : "") + "</label>" +
      '<input type="date" id="plan-date" required min="' + iso(min) + '" max="' + iso(max) + '" value="' + keep + '">' +
      '<fieldset><legend class="plan-label">Time for practice each week</legend><div class="opts">' +
      TIME.map((t, i) => '<label><input type="radio" name="plan-time" value="' + t[1] + '"' + ((old ? old.u === t[1] : i === 1) ? " checked" : "") + "><span>" + esc(t[0]) +
        '<span class="plan-hint"> · ' + t[1] + " tasks a week</span></span></label>").join("") +
      "</div></fieldset>" +
      '<p class="plan-error" role="alert" hidden></p>' +
      '<div class="move-actions"><button type="submit">' + (old ? "Make a new plan" : "Make my plan") + "</button></div>" +
      (old ? '<p class="small-note">A new plan starts from today. Sets you have done stay done.</p>' : "");
    card.addEventListener("submit", (e) => {
      e.preventDefault();
      const err = card.querySelector(".plan-error");
      const d = parseDay(card.querySelector("#plan-date").value);
      const u = Number((card.querySelector('input[name="plan-time"]:checked') || {}).value || 5);
      let msg = "";
      if (d == null) msg = "Choose the date of your exam.";
      else if (d <= today()) msg = "Choose a date after today.";
      else if (d > max) msg = "Choose a date within a year from today: a plan covers up to 52 weeks.";
      if (msg) { err.textContent = msg; err.hidden = false; card.querySelector("#plan-date").focus(); return; }
      const plan = make(d, u);
      write(plan);
      showPlan(plan);
      window.scrollTo(0, 0);
    });
    host.appendChild(card);
    if (old && parseDay(old.d) > today() && !ended(old)) {
      const back = el("button", { type: "button", class: "secondary plan-back" }, "Keep my plan");
      back.addEventListener("click", () => showPlan(old));
      card.querySelector(".move-actions").appendChild(back);
    }
  }

  const saved = read();
  if (saved && saved.v === 1 && Array.isArray(saved.w) && parseDay(saved.d)) showPlan(saved);
  else showForm(null, "");
  /* Back from a set: show the ticks just earned. */
  window.addEventListener("pageshow", (e) => { if (e.persisted) { const p = read(); if (p && p.v === 1) showPlan(p); } });
})();
