/* C1 Prep — shared exercise engine.
   A page defines window.SETS (an array of exercise sets) and loads this file.
   The set shown is chosen with the buttons at the top, or with #set-N in the URL. */
(function () {
  "use strict";
  const SETS = window.SETS || (window.EX ? [window.EX] : null);
  const host = document.getElementById("exercise");
  if (!SETS || !host) return;

  const LETTERS = "ABCDEFGHIJ";
  const norm = (s) => String(s || "")
    .toLowerCase()
    .replace(/[‘’ʼ`]/g, "'")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[.,!?;:]+$/g, "")
    .trim();
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const el = (tag, attrs, html) => {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    return e;
  };
  const paras = (text) => text.trim().split(/\n\s*\n/).map((p) => p.trim());

  /* ---------- set picker ---------- */
  const picker = el("div", { class: "tabs setpicker", role: "tablist", "aria-label": "Exercise sets" });
  const root = el("div");
  if (SETS.length > 1) host.appendChild(picker);
  host.appendChild(root);

  function currentIndex() {
    const m = location.hash.match(/set-(\d+)/);
    const i = m ? Number(m[1]) - 1 : 0;
    return i >= 0 && i < SETS.length ? i : 0;
  }
  SETS.forEach((s, i) => {
    const b = el("button", { type: "button", role: "tab" }, "Set " + (i + 1));
    b.addEventListener("click", () => { location.hash = "set-" + (i + 1); });
    picker.appendChild(b);
  });
  window.addEventListener("hashchange", render);
  render();

  function render() {
    const idx = currentIndex();
    [...picker.children].forEach((b, i) => b.setAttribute("aria-selected", i === idx ? "true" : "false"));
    root.innerHTML = "";
    root.classList.remove("set-enter"); void root.offsetWidth; root.classList.add("set-enter");
    build(SETS[idx], root);
  }

  /* ---------- one set ---------- */
  function build(EX, root) {
    const items = [];       // {check(): bool, reveal(), reset()}
    const notes = [];       // {n, answer, explain, state} for the explanations panel
    let notesBox = null;

    if (EX.intro) root.appendChild(el("p", { class: "lead" }, esc(EX.intro)));

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

    /* Part 4 */
    function buildKWT() {
      const card = el("div", { class: "card" });
      EX.items.forEach((it, idx) => {
        const n = (EX.startAt || 25) + idx;
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
          (it.explain ? "<br>" + esc(it.explain) : "");
        q.appendChild(ex);
        card.appendChild(q);
        items.push({
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
      });
      root.appendChild(card);
    }

    function textCard(title, sub, text) {
      const card = el("div", { class: "card" });
      if (title) card.appendChild(el("p", { class: "text-title" }, esc(title)));
      if (sub) card.appendChild(el("p", { class: "text-sub" }, esc(sub)));
      const body = el("div", { class: "text" });
      paras(text).forEach((p) => body.appendChild(el("p", null, esc(p))));
      card.appendChild(body);
      return card;
    }

    /* Part 5 */
    function buildMCReading() {
      root.appendChild(textCard(EX.textTitle, EX.textSub, EX.text));
      const card = el("div", { class: "card" });
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
      root.appendChild(card);
    }

    /* Parts 6 & 8 */
    function buildMatching() {
      const letters = EX.sections.map((s) => s.label);
      EX.sections.forEach((s) => root.appendChild(textCard(s.title ? s.label + "  " + s.title : s.label, s.sub, s.text)));
      const card = el("div", { class: "card" });
      if (EX.questionsIntro) card.appendChild(el("p", { class: "lead", style: "margin-bottom:6px" }, esc(EX.questionsIntro)));
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
      root.appendChild(card);
      root.appendChild(makeNotesBox());
    }

    /* Part 7 */
    function buildGapped() {
      const keys = Object.keys(EX.paragraphs).sort();
      const card = el("div", { class: "card" });
      if (EX.textTitle) card.appendChild(el("p", { class: "text-title" }, esc(EX.textTitle)));
      if (EX.textSub) card.appendChild(el("p", { class: "text-sub" }, esc(EX.textSub)));
      const body = el("div", { class: "text" });
      paras(EX.text).forEach((p) => {
        const m = p.match(/^\[\[(\d+)\]\]$/);
        if (!m) { body.appendChild(el("p", null, esc(p))); return; }
        const n = Number(m[1]);
        const slot = el("div", { class: "slot" });
        slot.appendChild(el("span", { class: "gapnum" }, String(n)));
        slot.appendChild(el("span", null, "Paragraph:"));
        const sel = el("select", { class: "choice", "aria-label": "Gap " + n });
        sel.appendChild(el("option", { value: "" }, "—"));
        keys.forEach((L) => sel.appendChild(el("option", { value: L }, L)));
        slot.appendChild(sel);
        body.appendChild(slot);
        const ans = EX.answers[n];
        const note = addNote(n, ans, EX.explain && EX.explain[n]);
        items.push({
          check() {
            const ok = sel.value === ans;
            sel.classList.toggle("ok", ok); sel.classList.toggle("bad", !ok);
            note.ok = ok;
            return ok;
          },
          reveal() {},
          reset() { sel.value = ""; sel.classList.remove("ok", "bad"); note.ok = null; },
        });
      });
      card.appendChild(body);
      root.appendChild(card);

      const bank = el("div", { class: "card para-bank" });
      bank.appendChild(el("h3", { style: "margin-top:0" }, "Paragraphs"));
      keys.forEach((L) => bank.appendChild(el("div", { class: "para" }, "<b>" + L + "</b>" + esc(EX.paragraphs[L]))));
      root.appendChild(bank);
      const nb = makeNotesBox();
      if (EX.extra) {
        notesBox.appendChild(el("p", { style: "margin:10px 0 0" }, "<b>Extra paragraph: " + esc(EX.extra.label) + ".</b> " + esc(EX.extra.explain)));
      }
      root.appendChild(nb);
    }

    ({
      "mc-cloze": buildCloze, "open-cloze": buildCloze, "word-form": buildCloze,
      "kwt": buildKWT, "mc-reading": buildMCReading,
      "matching": buildMatching, "gapped": buildGapped,
    })[EX.type]();

    const bar = el("div", { class: "bar" });
    const bCheck = el("button", { type: "button" }, "Check answers");
    const bShow = el("button", { type: "button", class: "secondary" }, "Show answers");
    const bReset = el("button", { type: "button", class: "secondary" }, "Start again");
    const score = el("span", { class: "score", "aria-live": "polite" });
    bar.append(bCheck, bShow, bReset, score);
    root.appendChild(bar);

    const pts = EX.pointsEach || 1;
    bCheck.addEventListener("click", () => {
      let right = 0;
      items.forEach((it) => { if (it.check()) right++; });
      drawNotes();
      score.textContent = "Score: " + right * pts + " / " + items.length * pts;
      score.classList.remove("bump", "perfect"); void score.offsetWidth; score.classList.add("bump");
      if (right === items.length) { score.classList.add("perfect"); if (window.c1Confetti) window.c1Confetti(); }
    });
    bShow.addEventListener("click", () => { items.forEach((it) => it.reveal()); drawNotes(); if (notesBox) notesBox.scrollIntoView({ behavior: "smooth", block: "start" }); });
    bReset.addEventListener("click", () => {
      items.forEach((it) => it.reset());
      if (notesBox) notesBox.hidden = true;
      score.textContent = "";
      score.classList.remove("bump", "perfect");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
