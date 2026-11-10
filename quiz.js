/* C1 Prep — shared exercise engine (A2, B1, B2, C1, C2), plus the grammar-guide tabs on A2/B1 grammar pages.
   A page defines window.SETS (an array of exercise sets) and loads this file.
   The set shown is chosen with the set menu at the top, or with #set-N in the URL.
   Answers are saved as they are typed and finished sets are remembered (progress.js).
   Exam mode and "My weak spots" build single sets themselves with window.c1Quiz.build(). */
(function () {
  "use strict";
  const SETS = window.SETS || (window.EX ? [window.EX] : null);
  const host = document.getElementById("exercise");
  const store = window.c1Store || null;

  const LETTERS = "ABCDEFGHIJ";
  const norm = (s) => String(s || "")
    .toLowerCase()
    .replace(/[‘’ʼ`]/g, "'")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[.,!?;:]+$/g, "")
    .trim();
  /* For the A2/B1 sentence sets: "doesn't" = "does not", "I'm" = "I am", etc. */
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
  };
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
      build(SETS[idx], root, idx, { sets: SETS, pageKey: pageKey, label: label, onRecord: paintPicker });
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
            const v = norm(input.value);
            const ok = it.answers.some((a) => norm(a) === v);
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

    ({
      "mc-cloze": buildCloze, "open-cloze": buildCloze, "word-form": buildCloze,
      "kwt": buildKWT, "mc-reading": buildMCReading,
      "matching": buildMatching, "gapped": buildGapped,
      "sentences": buildSentences, "mc-texts": buildShortTexts, "mixed": buildMixed,
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
    const controls = () => Array.from(root.querySelectorAll("input, select"));
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
        return { right: right, total: items.length, score: right * pts, max: items.length * pts, mistakes: mistakes, per: per };
      },
      reveal() { items.forEach((it) => it.reveal()); drawNotes(); },
      reset() { items.forEach((it) => it.reset()); if (notesBox) notesBox.hidden = true; },
      /* The answers as typed or chosen, to save and put back later. */
      snapshot() { return controls().map((c) => (c.type === "radio" ? (c.checked ? 1 : 0) : c.value)); },
      restore(v) {
        const cs = controls();
        if (!Array.isArray(v) || v.length !== cs.length) return false;
        cs.forEach((c, i) => { if (c.type === "radio") c.checked = !!v[i]; else c.value = v[i]; });
        cs.forEach((c) => { if (c.type === "radio" && c.checked) c.dispatchEvent(new Event("change", { bubbles: true })); });
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
        if (ok && d.c) { const r = ctrl.mark(); showScore(r, true); isChecked = counted = true; lastSig = logSig(r); }
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
