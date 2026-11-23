/* C1 Prep — shared exercise engine (A2, B1, B2, C1, C2), plus the grammar-guide tabs on A2/B1 grammar pages.
   A page defines window.SETS (an array of exercise sets) and loads this file.
   The set shown is chosen with the set menu at the top, or with #set-N in the URL.
   Answers are saved as they are typed and finished sets are remembered (progress.js).
   Exam mode and "My weak spots" build single sets themselves with window.c1Quiz.build().
   Listening pages (type "listening") use the audio player below and drag-and-drop matching; listening.css styles them.
   Grammar pages also get their topic from topics.js: a link to the topic at every level, and the level up / level down after a set. */
(function () {
  "use strict";
  const SETS = window.SETS || (window.EX ? [window.EX] : null);
  const host = document.getElementById("exercise");
  const store = window.c1Store || null;

  /* Grammar topics (topics.js, written by generator/topics.py). On a level's grammar page: a link under the title to
     the topic at every level, and after a set is checked, the same topic one level up and one level down (never further). */
  const SITE = new URL(".", document.currentScript ? document.currentScript.src : location.href);
  const gKey = (() => {
    const p = location.pathname, base = SITE.pathname;
    const m = p.indexOf(base) === 0 && p.slice(base.length).match(/^(?:(a1|a2|b1|b2|c2)\/)?grammar-(\d+)\.html$/);
    return m ? (m[1] || "c1") + ":" + m[2] : "";
  })();
  let topics = null;
  const onTopics = [];
  if (gKey && SETS && host) {
    const s = document.createElement("script");
    s.src = new URL("topics.js", SITE).href;
    s.onload = () => {
      topics = window.FPTOPICS && window.FPTOPICS.p[gKey] ? window.FPTOPICS : null;
      if (topics) { topicLink(); onTopics.splice(0).forEach((f) => f()); }
    };
    document.head.appendChild(s);
  }
  const siteHref = (path) => new URL(path, SITE).href;
  const topicHref = (slug) => siteHref("grammar/" + slug + ".html");
  function topicLink() {
    const slug = topics.p[gKey][0], t = topics.t[slug], h1 = document.querySelector("h1");
    if (!h1 || t[1] < 2) return;
    const p = el("p", { class: "topic-link" }, '<a href="' + topicHref(slug) + '">' + esc(t[0]) + " at every level</a>");
    h1.after(p);
  }
  /* After a set is checked: the page with the same topic one level up and one level down, if the topic is there.
     A score of 80% or more puts the level up first; a lower one puts the level down first. */
  function nextLevels(root, after, r) {
    const old = root.querySelector(".next-levels");
    if (old) old.remove();
    if (!topics) { if (gKey) onTopics.push(() => { if (root.isConnected && root.querySelector(".score").textContent) nextLevels(root, after, r); }); return; }
    const [slug, up, down] = topics.p[gKey];
    if (!up && !down) return;
    const good = r.total > 0 && r.right / r.total >= 0.8;
    const card = (k, dir) => {
      const lv = k.split(":")[0], L = topics.l[lv];
      return '<a href="' + siteHref(L[1] + "grammar-" + k.split(":")[1] + ".html") + '" data-level="' + lv + '">' +
        '<img src="' + siteHref(L[1] + "favicon.svg?v=" + topics.i) + '" alt="" width="40" height="40">' +
        '<span><span class="nl-k">' + (dir > 0 ? "One level up" : "One level down") + " · " + esc(L[0]) + "</span>" +
        '<span class="nl-t">' + esc(topics.n[k] || "") + "</span></span></a>";
    };
    const links = good ? [up && card(up, 1), down && card(down, -1)] : [down && card(down, -1), up && card(up, 1)];
    const head = good && up ? "Good score! Ready to try this topic one level up?"
      : !good && down ? "Want more practice? Try this topic one level down, then come back."
      : "Practise this topic at another level";
    const box = el("div", { class: "next-levels" },
      '<p class="nl-head">' + head + "</p>" +
      '<div class="nl-links">' + links.filter(Boolean).join("") + "</div>" +
      '<p class="nl-topic"><a href="' + topicHref(slug) + '">' + esc(topics.t[slug][0]) + " at every level</a></p>");
    after.after(box);
  }

  const LETTERS = "ABCDEFGHIJ";
  const norm = (s) => String(s || "")
    .toLowerCase()
    .replace(/[‘’ʼ`]/g, "'")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[.,!?;:]+$/g, "")
    .trim();
  /* For typed sentence answers and key word transformations: "doesn't" = "does not", "I'm" = "I am", etc. */
  const CONTR = [[/\bcan't\b/g, "cannot"], [/\bcan not\b/g, "cannot"], [/\bwon't\b/g, "will not"], [/\bshan't\b/g, "shall not"],
    [/n't\b/g, " not"], [/'m\b/g, " am"], [/'re\b/g, " are"], [/'ve\b/g, " have"], [/'ll\b/g, " will"]];
  const loose = (s) => { let t = norm(s); CONTR.forEach(([re, to]) => { t = t.replace(re, to); }); return t.replace(/\s+/g, " ").trim(); };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const el = (tag, attrs, html) => {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    return e;
  };
  const paras = (text) => text.trim().split(/\n\s*\n/).map((p) => p.trim());

  const ICON = {
    prev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>',
    next: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>',
    reset: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg>',
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path class="fill" d="M8 5.5v13l10.5-6.5z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path class="fill" d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/></svg>',
  };

  /* ---------- listening: one audio player ----------
     A play/pause button, a position bar and the time. With "play twice" on (the exam way), the recording
     starts again by itself after a 5-second pause, then stops. Only one recording plays at a time.
     A file that can't be loaded shows "Recording coming soon". Its controls carry data-ui, so they are
     not saved with the answers. */
  const TWICE_KEY = "c1prep-twice";
  const twiceOn = () => { try { return localStorage.getItem(TWICE_KEY) !== "0"; } catch (e) { return true; } };
  const players = [];
  const mmss = (t) => { t = Math.max(0, Math.floor(t || 0)); return Math.floor(t / 60) + ":" + String(t % 60).padStart(2, "0"); };
  function audioPlayer(src, name) {
    const box = el("div", { class: "player" });
    const btn = el("button", { type: "button", class: "play", "data-ui": "", "aria-label": "Play " + name }, ICON.play);
    const bar = el("input", { type: "range", min: "0", max: "1000", value: "0", step: "1", "data-ui": "", "aria-label": "Position in " + name });
    const time = el("span", { class: "time" }, "0:00");
    const note = el("span", { class: "pnote", "aria-live": "polite" });
    const info = el("div", { class: "pinfo" });
    info.append(time, note);
    box.append(btn, bar, info);
    const audio = new Audio();
    audio.preload = "metadata";
    let listens = 0, wait = null, count = 0, dragging = false;
    const total = () => (isFinite(audio.duration) ? audio.duration : 0);
    const paint = () => {
      const d = total();
      if (!dragging) bar.value = d ? String(Math.round((1000 * audio.currentTime) / d)) : "0";
      time.textContent = mmss(audio.currentTime) + (d ? " / " + mmss(d) : "");
      bar.style.setProperty("--pos", (bar.value / 10) + "%");
    };
    const stopWait = () => { if (wait) { clearInterval(wait); wait = null; } };
    const setNote = (t) => { note.textContent = t; };
    const p = {
      audio: audio,
      stop() { stopWait(); audio.pause(); },
    };
    players.push(p);
    function start() {
      players.forEach((o) => { if (o !== p) o.stop(); });
      stopWait();
      const r = audio.play();
      if (r && r.catch) r.catch(() => {});
    }
    btn.addEventListener("click", () => {
      if (box.classList.contains("missing")) return;
      if (wait) { audio.currentTime = 0; setNote("Second listening"); start(); return; }
      if (audio.paused) {
        if (audio.ended || (total() && audio.currentTime >= total() - 0.05)) { audio.currentTime = 0; listens = 0; }
        start();
      } else audio.pause();
    });
    audio.addEventListener("play", () => { btn.innerHTML = ICON.pause; btn.setAttribute("aria-label", "Pause " + name); box.classList.add("on"); });
    audio.addEventListener("pause", () => { btn.innerHTML = ICON.play; btn.setAttribute("aria-label", (wait ? "Start the second listening of " : "Play ") + name); box.classList.remove("on"); });
    audio.addEventListener("timeupdate", paint);
    audio.addEventListener("loadedmetadata", paint);
    audio.addEventListener("ended", () => {
      listens++;
      if (twiceOn() && listens === 1) {
        count = 5;
        setNote("Second listening in " + count + "…");
        wait = setInterval(() => {
          count--;
          if (count > 0) { setNote("Second listening in " + count + "…"); return; }
          stopWait(); audio.currentTime = 0; setNote("Second listening"); start();
        }, 1000);
      } else {
        listens = 0;
        setNote(twiceOn() ? "Played twice" : "");
      }
    });
    audio.addEventListener("error", () => {
      box.classList.add("missing");
      btn.disabled = true; bar.disabled = true;
      time.textContent = "";
      setNote("Recording coming soon");
    });
    bar.addEventListener("input", () => {
      dragging = true;
      const d = total();
      if (d) audio.currentTime = (bar.value / 1000) * d;
      bar.style.setProperty("--pos", (bar.value / 10) + "%");
    });
    bar.addEventListener("change", () => { dragging = false; paint(); });
    audio.src = src;
    return box;
  }
  const setLabel = (sets, i) => "Set " + (i + 1) + (sets[i].textTitle ? " · " + sets[i].textTitle : "");
  const hash = (s) => { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36); };

  window.c1Quiz = { build: build };
  if (SETS && host) startPage();

  /* ---------- an exercise page: set navigation (previous / dropdown / next) and the set itself ---------- */
  function startPage() {
    const kick = document.querySelector(".kicker"), h1 = document.querySelector("h1");
    const label = (kick ? kick.textContent.replace(/^.*·\s*/, "") + " · " : "") + (h1 ? h1.textContent : "");
    const pageKey = store ? store.key(store.page) : "";
    if (store) store.setCount(pageKey, SETS.length);

    const nav = el("div", { class: "setnav" });
    const bPrev = el("button", { type: "button", class: "icon-btn", "aria-label": "Previous set", title: "Previous set" }, ICON.prev);
    const pickWrap = el("div", { class: "select-wrap" });
    const pick = el("select", { class: "setselect", "aria-label": "Choose a set" });
    SETS.forEach((s, i) => pick.appendChild(el("option", { value: String(i + 1) }, esc(setLabel(SETS, i)))));
    pickWrap.appendChild(pick);
    const bNext = el("button", { type: "button", class: "icon-btn", "aria-label": "Next set", title: "Next set" }, ICON.next);
    const count = el("span", { class: "setcount" }, SETS.length + " sets");
    nav.append(bPrev, pickWrap, bNext, count);
    const root = el("div");
    if (SETS.length > 1) host.appendChild(nav);
    host.appendChild(root);

    /* Finished sets show their last score in the menu. */
    function paintPicker() {
      if (!store) return;
      const res = store.results(pageKey).s;
      let done = 0;
      SETS.forEach((s, i) => {
        const r = res[i];
        if (r) done++;
        pick.options[i].textContent = setLabel(SETS, i) + (r ? "  ·  " + r[0] + "/" + r[1] + (r[0] === r[1] ? " ✓" : "") : "");
      });
      count.textContent = SETS.length + " sets" + (done ? " · " + done + " done" : "");
    }

    function currentIndex() {
      const m = location.hash.match(/set-(\d+)/);
      const i = m ? Number(m[1]) - 1 : 0;
      return i >= 0 && i < SETS.length ? i : 0;
    }
    function go(n) { if (n >= 1 && n <= SETS.length) location.hash = "set-" + n; }
    pick.addEventListener("change", () => go(Number(pick.value)));
    bPrev.addEventListener("click", () => go(currentIndex()));
    bNext.addEventListener("click", () => go(currentIndex() + 2));
    window.addEventListener("hashchange", render);
    paintPicker();
    render();

    function render() {
      const idx = currentIndex();
      pick.value = String(idx + 1);
      bPrev.disabled = idx === 0;
      bNext.disabled = idx === SETS.length - 1;
      root.innerHTML = "";
      root.classList.remove("set-enter"); void root.offsetWidth; root.classList.add("set-enter");
      build(SETS[idx], root, idx, { sets: SETS, pageKey: pageKey, label: label, onRecord: paintPicker, nextLevels: !!gKey });
    }
  }

  /* ---------- one set ----------
     opt.sets      all the sets on the page (for the previous / next links)
     opt.pageKey   where answers and results are saved; without it nothing is saved for the set
     opt.embedded  no action bar: the caller marks the set itself with the returned controller (exam mode)
     opt.onNew     the "Start again" button becomes "New set" and calls this (weak spots practice)
     Returns a controller: { items, count, max, answered(), mark(), reveal(), reset(), snapshot(), restore(v), sig() }. */
  function build(EX, mount, setIndex, opt) {
    opt = opt || {};
    const root = el("div", { class: "set-view" });
    mount.appendChild(root);
    const startedAt = Date.now();
    let revealed = false;
    let lastSig = null;
    const items = [];       // {check(): bool, reveal(), reset()}
    const notes = [];       // {n, answer, explain, state} for the explanations panel
    let notesBox = null;
    const onShow = [];      // called with true when the set is marked or the answers are shown, false on reset
    const onRestore = [];   // called after saved answers are put back (drag-and-drop answers redraw themselves)

    if (EX.intro) root.appendChild(el("p", { class: "lead" }, esc(EX.intro)));

    /* Reading parts: text on the left, questions on the right on wide screens (stacked otherwise). */
    function makeSplit() {
      const s = el("div", { class: "split" });
      const main = el("div", { class: "pane-main" });
      const side = el("div", { class: "pane-side" });
      s.append(main, side);
      root.appendChild(s);
      const w = mount.closest(".wrap");
      if (w && !opt.embedded) w.classList.add("wide");
      return { main, side };
    }
    const qRange = (first, n) => "Questions " + first + "–" + (first + n - 1);

    function addNote(n, answer, explain) {
      const rec = { n, answer, explain, ok: null };
      notes.push(rec);
      return rec;
    }
    function drawNotes() {
      if (!notesBox) return;
      notesBox.hidden = false;
      const list = notesBox.querySelector("ol");
      list.innerHTML = "";
      notes.forEach((r) => {
        const mark = r.ok === true ? '<span class="tick">✓</span>' : r.ok === false ? '<span class="cross">✗</span>' : "";
        list.appendChild(el("li", null,
          '<span class="n">' + r.n + "</span>" + mark + "<b>" + esc(r.answer) + "</b>" + (r.explain ? " — " + esc(r.explain) : "")));
      });
    }
    function makeNotesBox() {
      notesBox = el("div", { class: "card notes", hidden: "" });
      notesBox.appendChild(el("h3", { style: "margin-top:0" }, "Answers and explanations"));
      notesBox.appendChild(el("ol", { class: "notes-list" }));
      return notesBox;
    }

    /* Parts 1–3 */
    function buildCloze() {
      const card = el("div", { class: "card" });
      if (EX.textTitle) card.appendChild(el("p", { class: "text-title" }, esc(EX.textTitle)));
      if (EX.textSub) card.appendChild(el("p", { class: "text-sub" }, esc(EX.textSub)));
      const body = el("div", { class: "text" });
      paras(EX.text).forEach((p) => {
        const pe = el("p");
        p.split(/\[(\d+)\]/).forEach((chunk, i) => {
          if (i % 2 === 0) { pe.appendChild(document.createTextNode(chunk)); return; }
          const n = Number(chunk);
          const g = EX.gaps[n];
          if (!g) throw new Error("Missing gap " + n);
          const wrap = el("span", { class: "gapwrap" });
          wrap.appendChild(el("span", { class: "gapnum" }, String(n)));
          if (n === 0) {
            wrap.appendChild(el("b", null, esc(EX.type === "mc-cloze" ? g.options[g.answer] : g.answers[0])));
            if (EX.type === "word-form") wrap.appendChild(el("span", { class: "stem" }, " (" + esc(g.stem) + ")"));
            pe.appendChild(wrap);
            return;
          }
          let input;
          if (EX.type === "mc-cloze") {
            input = el("select", { class: "gap", "aria-label": "Gap " + n });
            input.appendChild(el("option", { value: "" }, "—"));
            g.options.forEach((o, k) => input.appendChild(el("option", { value: String(k) }, LETTERS[k] + "  " + esc(o))));
          } else {
            input = el("input", { class: "gap", type: "text", autocomplete: "off", autocapitalize: "off", spellcheck: "false", "aria-label": "Gap " + n });
          }
          wrap.appendChild(input);
          if (EX.type === "word-form") wrap.appendChild(el("span", { class: "stem" }, " (" + esc(g.stem) + ")"));
          pe.appendChild(wrap);
          const right = EX.type === "mc-cloze" ? LETTERS[g.answer] + " " + g.options[g.answer] : g.answers.join(" / ");
          const note = addNote(n, right, g.explain);
          items.push({
            info() {
              const given = EX.type === "mc-cloze" ? (input.value === "" ? "" : LETTERS[+input.value] + " " + g.options[+input.value]) : input.value.trim();
              return { n, given, correct: right };
            },
            check() {
              const ok = EX.type === "mc-cloze"
                ? input.value === String(g.answer)
                : g.answers.some((a) => norm(a) === norm(input.value));
              input.classList.remove("ok", "bad"); void input.offsetWidth;
              input.classList.add(ok ? "ok" : "bad");
              note.ok = ok;
              return ok;
            },
            reveal() {},
            reset() { input.value = ""; input.classList.remove("ok", "bad"); note.ok = null; },
          });
        });
        body.appendChild(pe);
      });
      card.appendChild(body);
      root.appendChild(card);
      root.appendChild(makeNotesBox());
    }

    /* Part 4: one key word transformation. `after` is extra HTML for the end of the explanation. */
    function kwtItem(it, n, card, after) {
        const q = el("div", { class: "q" });
        q.appendChild(el("p", { class: "prompt" }, '<span class="n">' + n + "</span>" + esc(it.first)));
        q.appendChild(el("div", { class: "kwt-key" }, esc(it.key)));
        const row = el("div", { class: "kwt-row" });
        row.appendChild(document.createTextNode(it.before + " "));
        const input = el("input", { class: "kwt", type: "text", autocomplete: "off", autocapitalize: "off", spellcheck: "false", "aria-label": "Answer " + n });
        row.appendChild(input);
        row.appendChild(document.createTextNode(" " + it.after));
        q.appendChild(row);
        const ex = el("div", { class: "explain" });
        const html = "<b>Answer:</b> " + esc(it.answers[0]) +
          (it.answers.length > 1 ? ' <span class="also">(also accepted: ' + esc(it.answers.slice(1).join("; ")) + ")</span>" : "") +
          (it.explain ? "<br>" + esc(it.explain) : "") + (after || "");
        q.appendChild(ex);
        card.appendChild(q);
        items.push({
          info() { return { n, given: input.value.trim(), correct: it.answers[0] }; },
          check() {
            // contractions count as the full form: didn't = did not (both are two words in the exam)
            const v = loose(input.value);
            const ok = it.answers.some((a) => loose(a) === v);
            input.classList.toggle("ok", ok);
            input.classList.toggle("bad", !ok);
            ex.innerHTML = html;
            q.classList.add("checked");
            return ok;
          },
          reveal() { ex.innerHTML = html; q.classList.add("checked"); },
          reset() { input.value = ""; input.classList.remove("ok", "bad"); q.classList.remove("checked"); },
        });
        return q;
    }
    function buildKWT() {
      const card = el("div", { class: "card" });
      EX.items.forEach((it, idx) => kwtItem(it, (EX.startAt || 25) + idx, card));
      root.appendChild(card);
    }

    function textCard(title, sub, text, label) {
      const card = el("div", { class: "card" });
      if (label) card.appendChild(el("p", { class: "text-title" }, '<span class="sec-badge">' + esc(label) + "</span>" + (title ? esc(title) : "")));
      else if (title) card.appendChild(el("p", { class: "text-title" }, esc(title)));
      if (sub) card.appendChild(el("p", { class: "text-sub" }, esc(sub)));
      const body = el("div", { class: "text" });
      paras(text).forEach((p) => body.appendChild(el("p", null, esc(p))));
      card.appendChild(body);
      return card;
    }

    /* Part 5 */
    function buildMCReading() {
      const sp = makeSplit();
      sp.main.appendChild(textCard(EX.textTitle, EX.textSub, EX.text));
      const card = el("div", { class: "card" });
      card.appendChild(el("h3", null, qRange(EX.startAt || 31, EX.questions.length)));
      EX.questions.forEach((qq, idx) => {
        const n = (EX.startAt || 31) + idx;
        const q = el("div", { class: "q" });
        q.appendChild(el("p", { class: "prompt" }, '<span class="n">' + n + "</span>" + esc(qq.q)));
        const opts = el("div", { class: "opts" });
        const labels = [];
        qq.options.forEach((o, k) => {
          const lab = el("label");
          lab.innerHTML = '<input type="radio" name="q' + n + '" value="' + k + '"><span class="letter">' + LETTERS[k] + "</span><span>" + esc(o) + "</span>";
          opts.appendChild(lab);
          labels.push(lab);
        });
        q.appendChild(opts);
        const ex = el("div", { class: "explain" });
        const html = "<b>Answer: " + LETTERS[qq.answer] + ".</b> " + (qq.explain ? esc(qq.explain) : "");
        q.appendChild(ex);
        card.appendChild(q);
        items.push({
          info() {
            const sel = q.querySelector("input:checked");
            return { n, given: sel ? LETTERS[+sel.value] + " " + qq.options[+sel.value] : "", correct: LETTERS[qq.answer] + " " + qq.options[qq.answer] };
          },
          check() {
            const sel = q.querySelector("input:checked");
            const v = sel ? Number(sel.value) : -1;
            labels.forEach((l, k) => { l.classList.remove("ok", "bad"); if (k === qq.answer) l.classList.add("ok"); else if (k === v) l.classList.add("bad"); });
            ex.innerHTML = html;
            q.classList.add("checked");
            return v === qq.answer;
          },
          reveal() { labels[qq.answer].classList.add("ok"); ex.innerHTML = html; q.classList.add("checked"); },
          reset() { q.querySelectorAll("input").forEach((i) => (i.checked = false)); labels.forEach((l) => l.classList.remove("ok", "bad")); q.classList.remove("checked"); },
        });
      });
      sp.side.appendChild(card);
    }

    /* Parts 6 & 8 */
    function buildMatching() {
      const letters = EX.sections.map((s) => s.label);
      const sp = makeSplit();
      EX.sections.forEach((s) => sp.main.appendChild(textCard(s.title, s.sub, s.text, s.label)));
      const card = el("div", { class: "card" });
      card.appendChild(el("h3", null, qRange(EX.startAt || 1, EX.questions.length)));
      if (EX.questionsIntro) card.appendChild(el("p", { class: "q-intro" }, esc(EX.questionsIntro)));
      EX.questions.forEach((qq, idx) => {
        const n = (EX.startAt || 1) + idx;
        const row = el("div", { class: "match-row" });
        row.appendChild(el("span", { class: "n" }, String(n)));
        row.appendChild(el("span", { class: "stmt" }, esc(qq.q)));
        const sel = el("select", { class: "choice", "aria-label": "Question " + n });
        sel.appendChild(el("option", { value: "" }, "—"));
        letters.forEach((L) => sel.appendChild(el("option", { value: L }, L)));
        row.appendChild(sel);
        card.appendChild(row);
        const note = addNote(n, qq.answer, qq.explain);
        items.push({
          info() { return { n, given: sel.value, correct: qq.answer }; },
          check() {
            const ok = sel.value === qq.answer;
            sel.classList.toggle("ok", ok); sel.classList.toggle("bad", !ok);
            note.ok = ok;
            return ok;
          },
          reveal() {},
          reset() { sel.value = ""; sel.classList.remove("ok", "bad"); note.ok = null; },
        });
      });
      sp.side.appendChild(card);
      sp.side.appendChild(makeNotesBox());
    }

    /* Part 7 (C1: whole paragraphs removed). Also B2 Part 6, where single sentences are
       removed inside paragraphs: set unit: "sentence" and put [[n]] in the middle of a paragraph. */
    function buildGapped() {
      const keys = Object.keys(EX.paragraphs).sort();
      const unit = EX.unit || "paragraph";
      const Unit = unit.charAt(0).toUpperCase() + unit.slice(1);
      const gapSelect = (n) => {
        const sel = el("select", { class: "choice", "aria-label": "Gap " + n });
        sel.appendChild(el("option", { value: "" }, "—"));
        keys.forEach((L) => sel.appendChild(el("option", { value: L }, L)));
        const ans = EX.answers[n];
        const note = addNote(n, ans, EX.explain && EX.explain[n]);
        items.push({
          info() { return { n, given: sel.value, correct: ans }; },
          check() {
            const ok = sel.value === ans;
            sel.classList.toggle("ok", ok); sel.classList.toggle("bad", !ok);
            note.ok = ok;
            return ok;
          },
          reveal() {},
          reset() { sel.value = ""; sel.classList.remove("ok", "bad"); note.ok = null; },
        });
        return sel;
      };
      const card = el("div", { class: "card" });
      if (EX.textTitle) card.appendChild(el("p", { class: "text-title" }, esc(EX.textTitle)));
      if (EX.textSub) card.appendChild(el("p", { class: "text-sub" }, esc(EX.textSub)));
      const body = el("div", { class: "text" });
      paras(EX.text).forEach((p) => {
        const m = p.match(/^\[\[(\d+)\]\]$/);
        if (m) {
          const n = Number(m[1]);
          const slot = el("div", { class: "slot" });
          slot.appendChild(el("span", { class: "gapnum" }, String(n)));
          slot.appendChild(el("span", null, Unit + ":"));
          slot.appendChild(gapSelect(n));
          body.appendChild(slot);
          return;
        }
        if (!/\[\[\d+\]\]/.test(p)) { body.appendChild(el("p", null, esc(p))); return; }
        const pe = el("p");
        p.split(/\[\[(\d+)\]\]/).forEach((chunk, i) => {
          if (i % 2 === 0) { pe.appendChild(document.createTextNode(chunk)); return; }
          const n = Number(chunk);
          const wrap = el("span", { class: "gapwrap" });
          wrap.appendChild(el("span", { class: "gapnum" }, String(n)));
          wrap.appendChild(gapSelect(n));
          pe.appendChild(wrap);
        });
        body.appendChild(pe);
      });
      card.appendChild(body);
      const sp = makeSplit();
      sp.main.appendChild(card);

      const bank = el("div", { class: "card para-bank" });
      bank.appendChild(el("h3", { style: "margin-top:0" }, Unit + "s"));
      keys.forEach((L) => bank.appendChild(el("div", { class: "para" }, "<b>" + L + "</b>" + esc(EX.paragraphs[L]))));
      sp.side.appendChild(bank);
      const nb = makeNotesBox();
      if (EX.extra) {
        notesBox.appendChild(el("p", { style: "margin:10px 0 0" }, "<b>Extra " + unit + (EX.extra.label.length > 1 ? "s" : "") + ": " + esc(EX.extra.label) + ".</b> " + esc(EX.extra.explain)));
      }
      sp.side.appendChild(nb);
    }

    /* A2/B1 grammar and vocabulary: one sentence per item, with a typed gap (answers) or a choice (options + answer).
       Mark the gap with ___ in `s`. An optional word bank (`bank`) is shown above the sentences. */
    function sentItem(it, n, card, shuffle, after) {
        const q = el("div", { class: "q sent" });
        const prompt = el("p", { class: "prompt" });
        prompt.appendChild(el("span", { class: "n" }, String(n)));
        const line = el("span", { class: "s" });
        const parts = it.s.split(/_{3,}/);
        if (parts.length !== 2) throw new Error("Item " + n + " needs exactly one ___ gap");
        line.appendChild(document.createTextNode(parts[0]));
        const wrap = el("span", { class: "gapwrap" });
        let input = null, blank = null;
        const choice = Array.isArray(it.options);
        if (choice) {
          blank = el("span", { class: "blank" }, "\u2003\u2003\u2003");
          wrap.appendChild(blank);
        } else {
          input = el("input", { class: "gap", type: "text", autocomplete: "off", autocapitalize: "off", spellcheck: "false", "aria-label": "Answer " + n });
          if (it.width) input.style.width = it.width + "ch";
          wrap.appendChild(input);
        }
        if (it.stem) wrap.appendChild(el("span", { class: "stem" }, " (" + esc(it.stem) + ")"));
        line.appendChild(wrap);
        line.appendChild(document.createTextNode(parts[1]));
        prompt.appendChild(line);
        q.appendChild(prompt);
        let labels = [];
        if (choice) {
          const chips = el("div", { class: "chips", role: "radiogroup", "aria-label": "Options for " + n });
          // shuffle: true on a set mixes the order of the options (the same order every time); a number is used as the seed.
          const order = it.options.map((o, k) => k);
          if (shuffle) {
            let seed = (typeof shuffle === "number" ? shuffle : (setIndex + 1) * 7919) + n * 104729;
            const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
            for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
          }
          order.forEach((k) => {
            const lab = el("label");
            lab.innerHTML = '<input type="radio" name="s' + n + '" value="' + k + '"><span>' + esc(it.options[k]) + "</span>";
            chips.appendChild(lab);
            labels[k] = lab;
          });
          chips.addEventListener("change", () => {
            const sel = chips.querySelector("input:checked");
            blank.textContent = sel ? it.options[+sel.value] : "\u2003\u2003\u2003";
            blank.classList.toggle("filled", !!sel);
          });
          q.appendChild(chips);
        }
        const correct = choice ? it.options[it.answer] : it.answers[0];
        const ex = el("div", { class: "explain" });
        const html = "<b>Answer:</b> " + esc(correct) +
          (!choice && it.answers.length > 1 ? ' <span class="also">(also accepted: ' + esc(it.answers.slice(1).join("; ")) + ")</span>" : "") +
          (it.explain ? "<br>" + esc(it.explain) : "") + (after || "");
        q.appendChild(ex);
        card.appendChild(q);
        const given = () => {
          if (!choice) return input.value.trim();
          const sel = q.querySelector("input:checked");
          return sel ? it.options[+sel.value] : "";
        };
        items.push({
          info() { return { n, given: given(), correct }; },
          check() {
            let ok;
            if (choice) {
              const sel = q.querySelector("input:checked");
              const v = sel ? Number(sel.value) : -1;
              ok = v === it.answer;
              labels.forEach((l, k) => { l.classList.remove("ok", "bad"); if (k === it.answer) l.classList.add("ok"); else if (k === v) l.classList.add("bad"); });
              blank.classList.toggle("ok", ok); blank.classList.toggle("bad", !ok);
            } else {
              const v = loose(input.value);
              ok = it.answers.some((a) => loose(a) === v);
              input.classList.toggle("ok", ok); input.classList.toggle("bad", !ok);
            }
            ex.innerHTML = html;
            q.classList.add("checked");
            return ok;
          },
          reveal() { if (choice) labels[it.answer].classList.add("ok"); ex.innerHTML = html; q.classList.add("checked"); },
          reset() {
            if (choice) {
              q.querySelectorAll("input").forEach((i) => (i.checked = false));
              labels.forEach((l) => l.classList.remove("ok", "bad"));
              blank.textContent = "\u2003\u2003\u2003"; blank.classList.remove("filled", "ok", "bad");
            } else { input.value = ""; input.classList.remove("ok", "bad"); }
            q.classList.remove("checked");
          },
        });
        return q;
    }
    function buildSentences() {
      if (EX.bank) {
        const bank = el("div", { class: "card bank" });
        bank.appendChild(el("p", { class: "bank-label" }, esc(EX.bankLabel || "Word bank")));
        const list = el("div", { class: "bank-words" });
        EX.bank.forEach((w) => list.appendChild(el("span", null, esc(w))));
        bank.appendChild(list);
        root.appendChild(bank);
      }
      const card = el("div", { class: "card sentences" });
      EX.items.forEach((it, idx) => sentItem(it, (EX.startAt || 1) + idx, card, EX.shuffle));
      root.appendChild(card);
    }

    /* Weak spots practice: single questions taken from different sets. Each item is a key word transformation
       (kind: "kwt") or a sentence with one gap, with a `task` line above it, `source` HTML added to its
       explanation, and `ref` saying which question it is ({pageKey, set, i}). Options are always mixed. */
    function buildMixed() {
      const card = el("div", { class: "card sentences mixed" });
      EX.items.forEach((it, idx) => {
        const q = it.kind === "kwt" ? kwtItem(it, idx + 1, card, it.source) : sentItem(it, idx + 1, card, it.seed || 1, it.source);
        if (it.task) q.insertBefore(el("p", { class: "task-kind" }, esc(it.task)), q.firstChild);
        items[items.length - 1].ref = it.ref;
      });
      root.appendChild(card);
    }

    /* A2 Key / B1 Preliminary Part 1: several short texts (notices, messages), one question each. */
    function buildShortTexts() {
      const card = el("div", { class: "card" });
      EX.items.forEach((it, idx) => {
        const n = (EX.startAt || 1) + idx;
        const q = el("div", { class: "q short" });
        const box = el("div", { class: "short-text st-" + (it.kind || "message") });
        if (it.head) box.appendChild(el("p", { class: "st-head" }, esc(it.head)));
        if (it.title) box.appendChild(el("p", { class: "st-title" }, esc(it.title)));
        it.text.trim().split(/\n\s*\n/).forEach((p) => box.appendChild(el("p", null, esc(p.trim()).replace(/\n/g, "<br>"))));
        q.appendChild(el("p", { class: "prompt" }, '<span class="n">' + n + "</span>" + (it.q ? "<span>" + esc(it.q) + "</span>" : "")));
        const side = el("div", { class: "short-q" });
        const opts = el("div", { class: "opts" });
        const labels = [];
        it.options.forEach((o, k) => {
          const lab = el("label");
          lab.innerHTML = '<input type="radio" name="t' + n + '" value="' + k + '"><span class="letter">' + LETTERS[k] + "</span><span>" + esc(o) + "</span>";
          opts.appendChild(lab);
          labels.push(lab);
        });
        side.appendChild(opts);
        const grid = el("div", { class: "short-grid" });
        grid.append(box, side);
        q.appendChild(grid);
        const ex = el("div", { class: "explain" });
        const html = "<b>Answer: " + LETTERS[it.answer] + ".</b> " + (it.explain ? esc(it.explain) : "");
        q.appendChild(ex);
        card.appendChild(q);
        items.push({
          info() {
            const sel = q.querySelector("input:checked");
            return { n, given: sel ? LETTERS[+sel.value] + " " + it.options[+sel.value] : "", correct: LETTERS[it.answer] + " " + it.options[it.answer] };
          },
          check() {
            const sel = q.querySelector("input:checked");
            const v = sel ? Number(sel.value) : -1;
            labels.forEach((l, k) => { l.classList.remove("ok", "bad"); if (k === it.answer) l.classList.add("ok"); else if (k === v) l.classList.add("bad"); });
            ex.innerHTML = html;
            q.classList.add("checked");
            return v === it.answer;
          },
          reveal() { labels[it.answer].classList.add("ok"); ex.innerHTML = html; q.classList.add("checked"); },
          reset() { q.querySelectorAll("input").forEach((i) => (i.checked = false)); labels.forEach((l) => l.classList.remove("ok", "bad")); q.classList.remove("checked"); },
        });
      });
      root.appendChild(card);
    }

    /* Listening (B2, C1). EX.blocks: one recording each = {audio, label, context, transcript, questions};
       a question is {q, options, answer, explain} (multiple choice) or {s: "… ___ …", answers, explain} (a word or
       short phrase heard in the recording). EX.tasks: multiple matching under the recording, one row per speaker =
       {title, intro, options: [[letter, text]], answers: [letter per speaker], explain: [one per speaker]}.
       transcript: [[speaker, text]], ["#", heading] for a heading, ["", text] for another paragraph by the same speaker.
       The transcript opens under each recording once the set is checked or the answers are shown. */
    function buildListening() {
      players.splice(0).forEach((o) => o.stop());   // a set shown before this one stops playing
      let n = EX.startAt || 1;
      const twice = el("label", { class: "twice" });
      twice.innerHTML = '<input type="checkbox" data-ui=""><span>Play each recording twice, with a short pause, as in the exam</span>';
      const tbox = twice.querySelector("input");
      tbox.checked = twiceOn();
      tbox.addEventListener("change", () => { try { localStorage.setItem(TWICE_KEY, tbox.checked ? "1" : "0"); } catch (e) {} });
      root.appendChild(twice);
      const lastBlock = EX.blocks.length - 1;
      EX.blocks.forEach((b, bi) => {
        const card = el("div", { class: "card listen" });
        const name = b.label || "the recording";
        if (b.label) card.appendChild(el("p", { class: "text-title" }, esc(b.label)));
        if (b.context) card.appendChild(el("p", { class: "listen-context" }, esc(b.context)));
        card.appendChild(audioPlayer(b.audio, name));
        (b.questions || []).forEach((qq) => { if (qq.options) mcItem(qq, n++, card); else gapItem(qq, n++, card); });
        root.appendChild(card);
        if (bi === lastBlock && EX.tasks) EX.tasks.forEach((t) => { n = matchTask(t, n); });
        if (b.transcript && b.transcript.length) {
          const tr = el("details", { class: "card transcript", hidden: "" });
          tr.appendChild(el("summary", null, "Transcript" + (b.label ? " · " + esc(b.label) : "")));
          const body = el("div", { class: "tr-body" });
          b.transcript.forEach((line) => {
            if (line[0] === "#") { body.appendChild(el("h4", null, esc(line[1]))); return; }
            body.appendChild(el("p", null, (line[0] ? "<b>" + esc(line[0]) + ":</b> " : "") + esc(line[1])));
          });
          tr.appendChild(body);
          root.appendChild(tr);
          onShow.push((on) => { tr.hidden = !on; if (!on) tr.open = false; });
        }
      });
      if (EX.tasks) root.appendChild(makeNotesBox());
    }
    function mcItem(qq, n, card) {
      const q = el("div", { class: "q" });
      q.appendChild(el("p", { class: "prompt" }, '<span class="n">' + n + "</span>" + esc(qq.q)));
      const opts = el("div", { class: "opts" });
      const labels = [];
      qq.options.forEach((o, k) => {
        const lab = el("label");
        lab.innerHTML = '<input type="radio" name="q' + n + '" value="' + k + '"><span class="letter">' + LETTERS[k] + "</span><span>" + esc(o) + "</span>";
        opts.appendChild(lab);
        labels.push(lab);
      });
      q.appendChild(opts);
      const ex = el("div", { class: "explain" });
      const html = "<b>Answer: " + LETTERS[qq.answer] + ".</b> " + (qq.explain ? esc(qq.explain) : "");
      q.appendChild(ex);
      card.appendChild(q);
      items.push({
        info() {
          const sel = q.querySelector("input:checked");
          return { n, given: sel ? LETTERS[+sel.value] + " " + qq.options[+sel.value] : "", correct: LETTERS[qq.answer] + " " + qq.options[qq.answer] };
        },
        check() {
          const sel = q.querySelector("input:checked");
          const v = sel ? Number(sel.value) : -1;
          labels.forEach((l, k) => { l.classList.remove("ok", "bad"); if (k === qq.answer) l.classList.add("ok"); else if (k === v) l.classList.add("bad"); });
          ex.innerHTML = html;
          q.classList.add("checked");
          return v === qq.answer;
        },
        reveal() { labels[qq.answer].classList.add("ok"); ex.innerHTML = html; q.classList.add("checked"); },
        reset() { q.querySelectorAll("input").forEach((i) => (i.checked = false)); labels.forEach((l) => l.classList.remove("ok", "bad")); ex.innerHTML = ""; q.classList.remove("checked"); },
      });
    }
    function gapItem(it, n, card) {
      const q = el("div", { class: "q sent" });
      const prompt = el("p", { class: "prompt" });
      prompt.appendChild(el("span", { class: "n" }, String(n)));
      const line = el("span", { class: "s" });
      const parts = it.s.split(/_{3,}/);
      if (parts.length !== 2) throw new Error("Question " + n + " needs exactly one ___ gap");
      line.appendChild(document.createTextNode(parts[0]));
      const wrap = el("span", { class: "gapwrap" });
      const input = el("input", { class: "gap", type: "text", autocomplete: "off", autocapitalize: "off", spellcheck: "false", "aria-label": "Answer " + n });
      input.style.width = Math.max(12, Math.min(22, Math.max.apply(null, it.answers.map((a) => a.length)) + 4)) + "ch";
      wrap.appendChild(input);
      line.appendChild(wrap);
      line.appendChild(document.createTextNode(parts[1]));
      prompt.appendChild(line);
      q.appendChild(prompt);
      const ex = el("div", { class: "explain" });
      const html = "<b>Answer:</b> " + esc(it.answers[0]) +
        (it.answers.length > 1 ? ' <span class="also">(also accepted: ' + esc(it.answers.slice(1).join("; ")) + ")</span>" : "") +
        (it.explain ? "<br>" + esc(it.explain) : "");
      q.appendChild(ex);
      card.appendChild(q);
      items.push({
        info() { return { n, given: input.value.trim(), correct: it.answers[0] }; },
        check() {
          const v = norm(input.value);
          const ok = it.answers.some((a) => norm(a) === v);
          input.classList.toggle("ok", ok); input.classList.toggle("bad", !ok);
          ex.innerHTML = html;
          q.classList.add("checked");
          return ok;
        },
        reveal() { ex.innerHTML = html; q.classList.add("checked"); },
        reset() { input.value = ""; input.classList.remove("ok", "bad"); ex.innerHTML = ""; q.classList.remove("checked"); },
      });
    }
    /* Multiple matching under a recording (B2 Part 3, C1 Part 4): drag and drop, as in the digital exam since
       November 2025. Each answer can be used once in a task. Ways to place one:
         · drag it onto a speaker (with a mouse; on a touch screen, press and hold it, then drag);
         · tap or click it, then tap a speaker (Enter or Space does the same from the keyboard; Escape cancels).
       Placing an answer on a speaker that already has one sends the old one back to the list, or swaps the two
       when the new one came from another speaker. A placed answer can be dragged or tapped again to move it;
       × (or Delete on the speaker) takes it off; dragging it back onto the list does the same.
       Each speaker keeps a hidden <select> with its letter, so drafts, marking and results work as for other sets. */
    let dndSay = null;
    function matchTask(t, n) {
      const card = el("div", { class: "card match-task" });
      const first = n, last = n + t.answers.length - 1;
      card.appendChild(el("h3", null, (t.title ? esc(t.title) + " · " : "") + "Questions " + first + "–" + last));
      if (t.intro) card.appendChild(el("p", { class: "q-intro" }, esc(t.intro)));
      card.appendChild(el("p", { class: "dnd-hint" }, "Drag each answer to a speaker, or tap an answer and then a speaker. You can use each answer once."));
      if (!dndSay) {
        const live = el("div", { class: "sr-only", "aria-live": "polite" });
        root.appendChild(live);
        dndSay = (s) => { live.textContent = ""; setTimeout(() => { live.textContent = s; }, 30); };
      }
      const say = dndSay;
      const text = {};
      t.options.forEach((o) => { text[o[0]] = o[1]; });
      const dnd = el("div", { class: "dnd" });
      const pool = el("ul", { class: "dnd-pool", "aria-label": "Answers for questions " + first + "–" + last });
      const spk = el("div", { class: "dnd-speakers" });
      dnd.append(pool, spk);
      card.appendChild(dnd);

      const chips = {};
      t.options.forEach((o) => {
        const li = el("li");
        const b = el("button", { type: "button", class: "dnd-chip", "data-letter": o[0], "aria-pressed": "false" },
          "<b>" + esc(o[0]) + '</b><span class="t">' + esc(o[1]) + '</span><span class="where"></span>');
        li.appendChild(b);
        pool.appendChild(li);
        chips[o[0]] = b;
      });

      const zones = [];
      let picked = null;           // the letter picked up by a tap, waiting for a speaker
      const where = (L) => zones.findIndex((z) => z.sel.value === L);
      const setZone = (k, L) => {
        const s = zones[k].sel;
        if (s.value === L) return;
        s.value = L;
        s.dispatchEvent(new Event("change", { bubbles: true }));
      };
      function place(L, k) {
        const from = where(L), old = zones[k].sel.value;
        picked = null;
        if (from === k) { render(); return; }
        if (from >= 0) setZone(from, old);
        setZone(k, L);
        render();
        say(L + " placed for Speaker " + (k + 1) + (old ? (from >= 0 ? ". " + old + " moved to Speaker " + (from + 1) : ". " + old + " is back in the list") : "") + ".");
      }
      function unplace(k) {
        const old = zones[k].sel.value;
        if (!old) return;
        picked = null;
        setZone(k, "");
        render();
        say(old + " taken off Speaker " + (k + 1) + ".");
      }
      function pick(L) {
        picked = picked === L ? null : L;
        render();
        say(picked ? "Answer " + L + " picked up. Now choose a speaker." : "Cancelled.");
      }
      function render() {
        zones.forEach((z, k) => {
          const L = z.sel.value;
          z.zone.innerHTML = L ? "<b>" + esc(L) + '</b><span class="t">' + esc(text[L]) + "</span>"
            : '<span class="ph">' + (picked ? "Place " + esc(picked) + " here" : "Drop an answer here") + "</span>";
          z.zone.classList.toggle("filled", !!L);
          z.zone.classList.toggle("ok", z.sel.classList.contains("ok"));
          z.zone.classList.toggle("bad", z.sel.classList.contains("bad"));
          z.zone.setAttribute("aria-label", "Question " + z.num + ", Speaker " + (k + 1) + ": " + (L ? "answer " + L + ", " + text[L] : "no answer yet") +
            (picked && picked !== L ? ". Press to place " + picked + " here" : ""));
          z.clear.hidden = !L;
        });
        Object.keys(chips).forEach((L) => {
          const at = where(L), c = chips[L];
          c.classList.toggle("used", at >= 0);
          c.querySelector(".where").textContent = at >= 0 ? "Speaker " + (at + 1) : "";
          c.setAttribute("aria-pressed", picked === L ? "true" : "false");
          c.setAttribute("aria-label", "Answer " + L + ": " + text[L] + (at >= 0 ? ", placed for Speaker " + (at + 1) : ""));
        });
        card.classList.toggle("picking", !!picked);
      }

      t.answers.forEach((ans, k) => {
        const num = n + k;
        const row = el("div", { class: "match-row dnd-row" });
        row.appendChild(el("span", { class: "n" }, String(num)));
        const body = el("div", { class: "dnd-body" });
        body.appendChild(el("span", { class: "stmt" }, "Speaker " + (k + 1)));
        const slot = el("div", { class: "dnd-slot" });
        body.appendChild(slot);
        const zone = el("button", { type: "button", class: "dnd-zone", "data-k": String(k) });
        const clear = el("button", { type: "button", class: "dnd-clear", "aria-label": "Take the answer off Speaker " + (k + 1), hidden: "" }, "×");
        const sel = el("select", { class: "choice dnd-src", hidden: "", "aria-label": "Question " + num + ", Speaker " + (k + 1) });
        sel.appendChild(el("option", { value: "" }, "—"));
        t.options.forEach((o) => sel.appendChild(el("option", { value: o[0] }, o[0])));
        slot.append(zone, clear);
        row.append(body, sel);
        spk.appendChild(row);
        zones.push({ zone, clear, sel, num });
        sel.addEventListener("change", render);   // also when a test or a restore sets the value directly
        zone.addEventListener("click", () => {
          if (picked) place(picked, k);
          else if (sel.value) pick(sel.value);
          else say("Choose an answer first, then this speaker.");
        });
        zone.addEventListener("keydown", (e) => {
          if ((e.key === "Delete" || e.key === "Backspace") && sel.value) { e.preventDefault(); unplace(k); }
        });
        clear.addEventListener("click", () => { unplace(k); zone.focus(); });
        zone.addEventListener("pointerdown", (e) => { if (sel.value) grab(e, sel.value, zone); });
        const note = addNote(num, ans + " · " + text[ans], t.explain && t.explain[k]);
        items.push({
          info() { return { n: num, given: sel.value, correct: ans }; },
          check() {
            const ok = sel.value === ans;
            sel.classList.toggle("ok", ok); sel.classList.toggle("bad", !ok);
            note.ok = ok;
            render();
            return ok;
          },
          reveal() {},
          reset() { sel.value = ""; sel.classList.remove("ok", "bad"); note.ok = null; picked = null; render(); },
        });
      });

      Object.keys(chips).forEach((L) => {
        chips[L].addEventListener("click", () => pick(L));
        chips[L].addEventListener("pointerdown", (e) => grab(e, L, chips[L]));
      });
      card.addEventListener("keydown", (e) => { if (e.key === "Escape" && picked) { picked = null; render(); say("Cancelled."); } });

      /* Dragging. A mouse drag starts after a few pixels; a touch drag after holding still for a moment, so a
         finger on an answer can still scroll the page. While dragging, the page scrolls near the top and bottom. */
      function grab(e, L, src) {
        if (e.button > 0 || !e.isPrimary) return;
        const touch = e.pointerType !== "mouse";
        const g = { L, src, x: e.clientX, y: e.clientY, x0: e.clientX, y0: e.clientY, on: false, ghost: null, over: null, timer: 0, raf: 0 };
        const from = () => where(L);
        const stopScroll = (ev) => { if (g.on) ev.preventDefault(); };
        const target = () => {
          const hit = document.elementFromPoint(g.x, g.y);
          if (!hit) return null;
          const z = hit.closest(".dnd-zone");
          if (z && spk.contains(z)) return z;
          if (hit.closest(".dnd-pool") && pool === hit.closest(".dnd-pool")) return pool;
          return null;
        };
        const begin = () => {
          g.on = true;
          picked = null;
          render();
          g.ghost = el("div", { class: "dnd-ghost", "aria-hidden": "true" }, "<b>" + esc(L) + '</b><span class="t">' + esc(text[L]) + "</span>");
          g.ghost.style.width = Math.min(src.getBoundingClientRect().width, 320) + "px";
          document.body.appendChild(g.ghost);
          src.classList.add("lifted");
          card.classList.add("dragging");
          if (touch && navigator.vibrate) { try { navigator.vibrate(8); } catch (err) {} }
          follow();
          const tick = () => {
            if (!g.on) return;
            // scroll only when the answer has been moved towards an edge; the edges are inside the sticky header and action bar
            const edge = 56, h = window.innerHeight;
            let top = 0, bottom = h;
            const hd = document.querySelector("header.site"), ab = root.querySelector(".bar");
            if (hd && getComputedStyle(hd).position === "sticky") top = Math.max(0, Math.min(h / 3, hd.getBoundingClientRect().bottom));
            if (ab) { const r = ab.getBoundingClientRect(); if (r.top > h / 2 && r.top < h) bottom = r.top; }
            if (g.y < top + edge && g.y < g.y0 - 16) window.scrollBy(0, -Math.min(14, Math.ceil((top + edge - g.y) / 4)));
            else if (g.y > bottom - edge && g.y > g.y0 + 16) window.scrollBy(0, Math.min(14, Math.ceil((g.y - (bottom - edge)) / 4)));
            mark();
            g.raf = requestAnimationFrame(tick);
          };
          g.raf = requestAnimationFrame(tick);
        };
        const follow = () => { if (g.ghost) g.ghost.style.transform = "translate(" + (g.x + 12) + "px," + (g.y - 18) + "px)"; };
        const mark = () => {
          const tg = target();
          if (tg === g.over) return;
          if (g.over) g.over.classList.remove("over");
          g.over = tg;
          if (tg) tg.classList.add("over");
        };
        const move = (ev) => {
          if (ev.pointerId !== e.pointerId) return;
          g.x = ev.clientX; g.y = ev.clientY;
          if (!g.on) {
            const far = Math.abs(g.x - g.x0) + Math.abs(g.y - g.y0) > (touch ? 10 : 5);
            if (far && touch) { end(); return; }        // the finger moved before the hold: it's a scroll
            if (far) begin();
            return;
          }
          ev.preventDefault();
          follow();
          mark();
        };
        const up = (ev) => {
          if (ev.pointerId !== e.pointerId) return;
          if (g.on) {
            g.x = ev.clientX; g.y = ev.clientY;
            const tg = target();
            // the click that follows this pointerup is part of the drag, not a tap
            const kill = (ev) => { ev.stopPropagation(); ev.preventDefault(); };
            window.addEventListener("click", kill, true);
            setTimeout(() => window.removeEventListener("click", kill, true), 0);
            if (tg && tg !== pool) place(L, +tg.getAttribute("data-k"));
            else if (tg === pool && from() >= 0) unplace(from());
          }
          end();
        };
        const end = () => {
          clearTimeout(g.timer);
          cancelAnimationFrame(g.raf);
          g.on = false;
          if (g.ghost) g.ghost.remove();
          if (g.over) g.over.classList.remove("over");
          src.classList.remove("lifted");
          card.classList.remove("dragging");
          window.removeEventListener("pointermove", move);
          window.removeEventListener("pointerup", up);
          window.removeEventListener("pointercancel", cancel);
          document.removeEventListener("touchmove", stopScroll);
          document.removeEventListener("contextmenu", noMenu, true);
        };
        const cancel = (ev) => { if (ev.pointerId === e.pointerId) end(); };
        const noMenu = (ev) => { if (g.on || touch) ev.preventDefault(); };
        window.addEventListener("pointermove", move, { passive: false });
        window.addEventListener("pointerup", up);
        window.addEventListener("pointercancel", cancel);
        document.addEventListener("touchmove", stopScroll, { passive: false });
        document.addEventListener("contextmenu", noMenu, true);
        if (touch) g.timer = setTimeout(begin, 280);
      }

      onRestore.push(render);
      render();
      root.appendChild(card);
      return n + t.answers.length;
    }

    ({
      "mc-cloze": buildCloze, "open-cloze": buildCloze, "word-form": buildCloze,
      "kwt": buildKWT, "mc-reading": buildMCReading,
      "matching": buildMatching, "gapped": buildGapped,
      "sentences": buildSentences, "mc-texts": buildShortTexts, "mixed": buildMixed, "listening": buildListening,
    })[EX.type]();

    /* Previous / next set links at the end of the set. */
    if (opt.sets && opt.sets.length > 1) {
      const pager = el("nav", { class: "set-pager", "aria-label": "More sets" });
      const link = (i, cls, dir) => {
        const a = el("a", { href: "#set-" + (i + 1), class: cls }, '<span class="dir">' + dir + '</span><span class="t">' + esc(setLabel(opt.sets, i)) + "</span>");
        a.addEventListener("click", () => window.scrollTo(0, 0));
        return a;
      };
      if (setIndex > 0) pager.appendChild(link(setIndex - 1, "prev", "← Previous"));
      if (setIndex < opt.sets.length - 1) pager.appendChild(link(setIndex + 1, "next", "Next →"));
      root.appendChild(pager);
    }

    const pts = EX.pointsEach || 1;
    const answered = () => items.filter((it) => it.info().given !== "").length;
    const controls = () => Array.from(root.querySelectorAll("input:not([data-ui]), select:not([data-ui])"));
    const ctrl = {
      root: root, items: items, count: items.length, max: items.length * pts,
      answered: answered,
      /* Identifies the answer key, so saved results can tell when a set has been rewritten. */
      sig() { return hash(items.map((it) => it.info().correct).join("|")); },
      /* Marks every question and shows the answers and explanations. */
      mark() {
        let right = 0;
        const mistakes = [], per = [];
        items.forEach((it, i) => {
          const ok = it.check(), inf = it.info();
          if (ok) right++; else mistakes.push(inf);
          per.push({ n: inf.n, i: i, ok: ok, ref: it.ref });
        });
        drawNotes();
        onShow.forEach((f) => f(true));
        return { right: right, total: items.length, score: right * pts, max: items.length * pts, mistakes: mistakes, per: per };
      },
      reveal() { items.forEach((it) => it.reveal()); drawNotes(); onShow.forEach((f) => f(true)); },
      reset() { items.forEach((it) => it.reset()); if (notesBox) notesBox.hidden = true; onShow.forEach((f) => f(false)); },
      /* The answers as typed or chosen, to save and put back later. */
      snapshot() { return controls().map((c) => (c.type === "radio" ? (c.checked ? 1 : 0) : c.value)); },
      restore(v) {
        const cs = controls();
        if (!Array.isArray(v) || v.length !== cs.length) return false;
        cs.forEach((c, i) => { if (c.type === "radio") c.checked = !!v[i]; else c.value = v[i]; });
        cs.forEach((c) => { if (c.type === "radio" && c.checked) c.dispatchEvent(new Event("change", { bubbles: true })); });
        onRestore.forEach((f) => f());
        return true;
      }
    };
    if (opt.embedded) return ctrl;

    /* Action bar: progress, then the score. */
    const bar = el("div", { class: "bar" });
    const status = el("div", { class: "status" });
    const meter = el("span", { class: "meter", "aria-hidden": "true" }, "<i></i>");
    const progress = el("span", { class: "progress" });
    const score = el("span", { class: "score", "aria-live": "polite" });
    status.append(meter, progress, score);
    const resetLabel = opt.onNew ? "New set" : "Start again";
    const bReset = el("button", { type: "button", class: "secondary reset", "aria-label": resetLabel, title: resetLabel }, ICON.reset + '<span class="label">' + resetLabel + "</span>");
    const bShow = el("button", { type: "button", class: "secondary" }, "Show answers");
    const bCheck = el("button", { type: "button" }, "Check answers");
    bar.append(status, bReset, bShow, bCheck);
    root.appendChild(bar);
    if (window.c1Report) {   // log.js: anyone can report a mistake in this set
      const rep = el("p", { class: "report-line" }, 'Something wrong in this set? <button type="button" class="linkish">Report a problem</button>');
      rep.querySelector("button").addEventListener("click", () => window.c1Report({ set: setIndex + 1, title: opt.logTitle || EX.textTitle || "", part: opt.logPart || "" }));
      root.appendChild(rep);
    }

    const pageKey = opt.pageKey || "";
    let isChecked = false;   // the set is showing its marks
    let counted = false;     // this attempt is already in the saved results
    let peeked = false;      // "Show answers" was used before checking, so the attempt doesn't count
    let restoring = false;

    function updateProgress() {
      const done = answered();
      progress.textContent = done + " of " + items.length + " answered";
      meter.firstChild.style.width = (items.length ? (100 * done) / items.length : 0) + "%";
      progress.hidden = meter.hidden = !!score.textContent;
    }
    function saveDraft() {
      if (!store || !pageKey || restoring) return;
      const a = answered();
      if (!a && !isChecked) { store.dropDraft(pageKey, setIndex); return; }
      store.saveDraft(pageKey, setIndex, {
        v: ctrl.snapshot(), c: isChecked ? 1 : 0, a: a, of: items.length,
        l: opt.label || "", s: opt.sets ? setLabel(opt.sets, setIndex) : ""
      });
    }
    root.addEventListener("input", () => { updateProgress(); saveDraft(); });
    root.addEventListener("change", () => { updateProgress(); saveDraft(); });

    function showScore(r, quiet) {
      score.textContent = "Score: " + r.score + " / " + r.max;
      progress.hidden = meter.hidden = true;
      score.classList.remove("bump", "perfect");
      if (!quiet) { void score.offsetWidth; score.classList.add("bump"); }
      if (r.right === r.total) { score.classList.add("perfect"); if (!quiet && window.c1Confetti) window.c1Confetti(); }
    }
    const logSig = (r) => r.right + "|" + JSON.stringify(r.mistakes.map((m) => m.given));

    bCheck.addEventListener("click", () => {
      if (window.c1RequireName && !window.c1RequireName(() => bCheck.click())) return;
      const r = ctrl.mark();
      showScore(r, false);
      if (opt.nextLevels) nextLevels(root, bar, r);
      isChecked = true;
      if (store && !peeked && !counted) {
        counted = true;
        if (pageKey) {
          store.record(pageKey, setIndex, ctrl.sig(), r.score, r.max, r.per);
          store.setLast({ page: pageKey.split("/")[1], set: setIndex, n: opt.sets ? opt.sets.length : 1, l: opt.label || "" });
          if (opt.onRecord) opt.onRecord();
        } else {
          store.recordItems(r.per.filter((p) => p.ref).map((p) => ({ pageKey: p.ref.pageKey, set: p.ref.set, i: p.ref.i, ok: p.ok })));
        }
      }
      saveDraft();
      const sig = logSig(r);
      if (window.c1Log && sig !== lastSig) {
        lastSig = sig;
        const key = "c1-attempt:" + location.pathname + ":" + (opt.logPart || "") + setIndex;
        let attempt = 1;
        try { attempt = (+sessionStorage.getItem(key) || 0) + 1; sessionStorage.setItem(key, attempt); } catch (e) {}
        const h1 = document.querySelector("h1");
        const level = document.documentElement.getAttribute("data-level");
        window.c1Log({
          part: (level ? level + " · " : "") + (opt.logPart || ((document.querySelector(".kicker") ? document.querySelector(".kicker").textContent.replace(/^.*·\s*/, "") + " · " : "") + (h1 ? h1.textContent : ""))),
          set: setIndex + 1,
          title: opt.logTitle || EX.textTitle || "",
          score: r.score, max: r.max,
          mistakes: r.mistakes, attempt, revealed,
          seconds: Math.round((Date.now() - startedAt) / 1000)
        });
      }
    });
    bShow.addEventListener("click", () => { revealed = true; if (!isChecked) peeked = true; ctrl.reveal(); if (notesBox) notesBox.scrollIntoView({ behavior: "smooth", block: "start" }); });
    bReset.addEventListener("click", () => {
      if (opt.onNew) { opt.onNew(); return; }
      ctrl.reset();
      score.textContent = "";
      if (root.querySelector(".next-levels")) root.querySelector(".next-levels").remove();
      score.classList.remove("bump", "perfect");
      isChecked = counted = peeked = false;
      if (store && pageKey) store.dropDraft(pageKey, setIndex);
      updateProgress();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* Put back the answers saved for this set; if it had been checked, show the marks again. */
    if (store && pageKey) {
      const d = store.getDraft(pageKey, setIndex);
      if (d) {
        restoring = true;
        const ok = ctrl.restore(d.v);
        if (ok && d.c) { const r = ctrl.mark(); showScore(r, true); if (opt.nextLevels) nextLevels(root, bar, r); isChecked = counted = true; lastSig = logSig(r); }
        restoring = false;
        if (!ok) store.dropDraft(pageKey, setIndex);
      }
    }
    updateProgress();
    return ctrl;
  }
})();

/* A2/B1 grammar pages: the Exercises / Grammar guide tabs under the title. */
(function () {
  "use strict";
  const bar = document.querySelector(".page-tabs");
  if (!bar) return;
  const tabs = Array.from(bar.querySelectorAll('[role="tab"]'));
  function select(tab, focus) {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute("aria-controls"));
      if (panel) panel.hidden = !on;
    });
    if (focus) tab.focus();
  }
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => select(t));
    t.addEventListener("keydown", (e) => {
      const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      select(tabs[(i + d + tabs.length) % tabs.length], true);
    });
  });
})();
