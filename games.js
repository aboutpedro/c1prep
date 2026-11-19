/* C1 Prep games, at every level: Sentence scramble, Memory pairs (phrasal verbs), Odd one out, Word of the day,
   Error hunt and Hangman.
   A game page has <div id="game" data-game="…" data-level="…"> and loads its level's content first (window.GAMES,
   from data/games.js); Word of the day also loads games-words.js (window.GAME_DICT, the valid guesses).
   Best scores and today's word are kept in this browser (localStorage "c1p:games"):
   { "a1:scramble": 8, "a1:odd": 10, "a1:pairs": 9 (fewest tries), "a1:word": { day, guesses, played, won },
     "a1:errors": 17 (points of 20), "a1:hangman": 4 (words of 5) }. */
(function () {
  "use strict";
  const root = document.getElementById("game");
  const G = window.GAMES;
  if (!root || !G) return;
  const LEVEL = root.getAttribute("data-level");
  const KIND = root.getAttribute("data-game");

  /* ---------- helpers ---------- */
  const STORE = "c1p:games";
  const read = () => { try { return JSON.parse(localStorage.getItem(STORE)) || {}; } catch (e) { return {}; } };
  const get = (k) => read()[LEVEL + ":" + k];
  const put = (k, v) => { try { const s = read(); s[LEVEL + ":" + k] = v; localStorage.setItem(STORE, JSON.stringify(s)); } catch (e) {} };
  const el = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  };
  const button = (text, cls) => { const b = el("button", cls, text); b.type = "button"; return b; };
  const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (a, n) => shuffle(a.slice()).slice(0, n);
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const norm = (s) => s.toLowerCase().replace(/’/g, "'").replace(/\s+/g, " ").trim();
  const confetti = () => { if (window.c1Confetti) window.c1Confetti(); };
  const live = el("p", "sr-only");
  live.setAttribute("aria-live", "polite");
  const say = (t) => { live.textContent = ""; setTimeout(() => { live.textContent = t; }, 30); };
  const shake = (e) => { e.classList.remove("g-shake"); void e.offsetWidth; e.classList.add("g-shake"); };

  /* The status line above a game: "Sentence 3 of 10" on the left, the score on the right. */
  function statusBar() {
    const bar = el("div", "g-status");
    const left = el("span", "g-step"), right = el("span", "g-score");
    bar.append(left, right);
    return { bar, set(l, r) { left.textContent = l; right.textContent = r; } };
  }

  /* The card at the end of a round: the result, the best so far, and Play again. */
  function endCard(title, line, best, extra, again) {
    const card = el("div", "card g-end");
    card.append(el("h2", null, title), el("p", "g-end-line", line));
    if (best) card.append(el("p", "g-best", best));
    if (extra) card.append(extra);
    const b = button("Play again");
    b.addEventListener("click", again);
    card.append(b);
    return card;
  }

  /* An on-screen QWERTY keyboard. extra: true adds Enter and Delete. Keys don't take the focus when tapped. */
  function keyboard(onKey, extra) {
    const keys = el("div", "g-keys"), byLetter = {};
    ["qwertyuiop", "asdfghjkl", extra ? "+zxcvbnm-" : "zxcvbnm"].forEach((line) => {
      const r = el("div", "g-krow");
      line.split("").forEach((ch) => {
        let b;
        if (ch === "+") b = button("Enter", "g-key wide");
        else if (ch === "-") {
          b = button("", "g-key wide");
          b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5h11v14H9l-6-7z"/><path d="M12 9.5l5 5M17 9.5l-5 5"/></svg>';
          b.setAttribute("aria-label", "Delete");
        } else { b = button(ch, "g-key"); byLetter[ch] = b; }
        b.addEventListener("click", () => onKey(ch === "+" ? "Enter" : ch === "-" ? "Backspace" : ch));
        b.addEventListener("mousedown", (e) => e.preventDefault());   // a tap or click doesn't take the focus, so Enter keeps working
        r.append(b);
      });
      keys.append(r);
    });
    return { keys, byLetter };
  }
  /* Letters typed on a real keyboard (not while a button or field has the focus and Enter/Space is pressed). */
  function typing(onKey) {
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.target;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (t && t.tagName === "BUTTON" && (e.key === "Enter" || e.key === " ")) return;   // a focused button does its own thing
      if (e.key === "Enter" || e.key === "Backspace") { e.preventDefault(); onKey(e.key); }
      else if (/^[a-z]$/i.test(e.key)) onKey(e.key.toLowerCase());
    });
  }

  /* ================= Sentence scramble ================= */
  function scramble() {
    const ROUND = 10;
    let items, i, right;
    function start() { items = pick(G.scramble, ROUND); i = 0; right = 0; show(); }
    function show() {
      root.replaceChildren();
      const st = statusBar();
      st.set("Sentence " + (i + 1) + " of " + items.length, right + " right");
      const it = items[i];
      const words = it.w;
      let order = shuffle(words.map((w, k) => k));
      for (let t = 0; t < 5 && order.every((v, k) => words[v] === words[k]); t++) order = shuffle(order);
      const built = [];                                  // indexes into words, in the order tapped

      const answer = el("div", "g-answer");
      answer.setAttribute("aria-label", "Your sentence");
      const bank = el("div", "g-bank");
      bank.setAttribute("aria-label", "Words");
      const chips = order.map((k) => {
        const b = button(words[k], "g-chip");
        b.addEventListener("click", () => { if (done) return; built.push(k); b.disabled = true; b.classList.add("used"); draw(); });
        bank.append(b);
        return { k, b };
      });
      const feedback = el("div", "g-feedback");
      const actions = el("div", "g-actions");
      const check = button("Check"), clear = button("Start again", "secondary");
      actions.append(check, clear);
      let done = false;

      function draw() {
        answer.replaceChildren();
        if (!built.length) answer.append(el("span", "g-placeholder", "Tap the words in order"));
        built.forEach((k, pos) => {
          const b = button(pos === 0 ? cap(words[k]) : words[k], "g-chip placed");
          b.setAttribute("aria-label", words[k] + ", remove");
          b.addEventListener("click", () => {
            if (done) return;
            built.splice(pos, 1);
            const c = chips.find((c) => c.k === k && c.b.disabled);
            c.b.disabled = false; c.b.classList.remove("used");
            draw();
            c.b.focus();
          });
          answer.append(b);
        });
        if (built.length) answer.append(el("span", "g-end-mark", it.p));
        check.disabled = built.length !== words.length;
        clear.disabled = !built.length;
      }
      clear.addEventListener("click", () => {
        built.length = 0;
        chips.forEach((c) => { c.b.disabled = false; c.b.classList.remove("used"); });
        draw();
      });
      check.addEventListener("click", () => {
        done = true;
        const got = norm(built.map((k) => words[k]).join(" "));
        const ok = got === norm(words.join(" ")) || (it.alt || []).some((a) => norm(a) === got);
        if (ok) right++;
        answer.classList.add(ok ? "ok" : "bad");
        answer.querySelectorAll("button").forEach((b) => { b.disabled = true; });
        bank.hidden = bankLabel.hidden = true;                         // every word is in the sentence now
        feedback.replaceChildren();
        const line = el("p", ok ? "g-good" : "g-wrong", ok ? "✓ Right!" : "✗ Not quite. The sentence is:");
        feedback.append(line);
        if (!ok) feedback.append(el("p", "g-correct", cap(words.join(" ")) + it.p));
        say(ok ? "Right!" : "Not quite. The sentence is: " + cap(words.join(" ")) + it.p);
        st.set("Sentence " + (i + 1) + " of " + items.length, right + " right");
        const next = button(i + 1 < items.length ? "Next sentence" : "See your score");
        next.addEventListener("click", () => { i++; i < items.length ? show() : end(); });
        actions.replaceChildren(next);
        next.focus();
      });

      const bankLabel = el("p", "g-label", "Words");
      root.append(st.bar, el("p", "g-label", "Your sentence"), answer, bankLabel, bank, feedback, actions, live);
      draw();
    }
    function end() {
      root.replaceChildren();
      const prev = get("scramble");
      if (!(prev >= right)) put("scramble", right);
      const best = Math.max(prev || 0, right);
      if (right === items.length) confetti();
      root.append(endCard(right === items.length ? "Perfect!" : "Round finished",
        "You got " + right + " of " + items.length + " sentences right.",
        "Your best: " + best + " of " + items.length, null, start), live);
      say("Round finished. You got " + right + " of " + items.length + " right.");
      root.querySelector(".g-end button").focus();
    }
    start();
  }

  /* ================= Memory pairs ================= */
  function pairs() {
    const N = 6;
    let set, cards, open, tries, found, busy;
    function start() {
      set = pick(G.pairs, N);
      cards = shuffle(set.flatMap((p, k) => [{ k, text: p[0], verb: true }, { k, text: p[1], verb: false }]));
      open = []; tries = 0; found = 0; busy = false;
      root.replaceChildren();
      const st = statusBar();
      const grid = el("div", "g-cards");
      cards.forEach((c, n) => {
        const b = button("", "g-card");
        b.innerHTML = '<span class="g-back" aria-hidden="true"></span><span class="g-face"></span>';
        b.querySelector(".g-face").textContent = c.text;
        if (c.verb) b.classList.add("verb");
        c.b = b;
        label(c, n);
        b.addEventListener("click", () => flip(c, n, st));
        grid.append(b);
      });
      st.set("Pairs found: 0 of " + N, "Tries: 0");
      root.append(st.bar, grid, live);
    }
    function label(c, n) {
      const state = c.matched ? c.text + ", matched" : c.up ? c.text : "face down";
      c.b.setAttribute("aria-label", "Card " + (n + 1) + ": " + state);
    }
    function flip(c, n, st) {
      if (busy || c.up || c.matched) return;
      c.up = true; c.b.classList.add("up"); label(c, n);
      open.push([c, n]);
      if (open.length < 2) { say(c.text); return; }
      tries++;
      const [[a, an], [b, bn]] = open;
      open = [];
      if (a.k === b.k) {
        a.matched = b.matched = true;
        [a, b].forEach((x) => { x.b.classList.add("matched"); x.b.setAttribute("aria-disabled", "true"); });
        label(a, an); label(b, bn);
        found++;
        say(c.text + ". A pair: " + set[a.k][0] + ", " + set[a.k][1] + ".");
        st.set("Pairs found: " + found + " of " + N, "Tries: " + tries);
        if (found === N) setTimeout(end, 700);
      } else {
        busy = true;
        say(c.text + ". Not a pair.");
        st.set("Pairs found: " + found + " of " + N, "Tries: " + tries);
        [a, b].forEach((x) => x.b.classList.add("miss"));
        setTimeout(() => {
          [[a, an], [b, bn]].forEach(([x, xn]) => { x.up = false; x.b.classList.remove("up", "miss"); label(x, xn); });
          busy = false;
        }, 1100);
      }
    }
    function end() {
      root.replaceChildren();
      const prev = get("pairs");
      if (!(prev <= tries)) put("pairs", tries);
      const best = Math.min(prev || Infinity, tries);
      if (tries === N) confetti();
      const list = el("dl", "g-pairlist");
      set.forEach((p) => { list.append(el("dt", null, p[0]), el("dd", null, p[1])); });
      root.append(endCard(tries === N ? "Perfect memory!" : "All pairs found",
        "You found all " + N + " pairs in " + tries + " tries.",
        "Your best: " + best + " tries", list, start), live);
      say("All pairs found in " + tries + " tries.");
      root.querySelector(".g-end button").focus();
    }
    start();
  }

  /* ================= Odd one out ================= */
  function odd() {
    const ROUND = 10;
    let items, i, right;
    function start() { items = pick(G.odd, ROUND); i = 0; right = 0; show(); }
    function show() {
      root.replaceChildren();
      const it = items[i];
      const st = statusBar();
      st.set("Group " + (i + 1) + " of " + items.length, right + " right");
      const q = el("p", "g-question");
      if (it.q) { q.append("Which one doesn’t go with "); q.append(el("b", null, it.q)); q.append("?"); }
      else q.textContent = "Which one doesn’t belong?";
      const opts = el("div", "g-options");
      const words = shuffle(it.w.concat([it.x]));
      const feedback = el("div", "g-feedback");
      const actions = el("div", "g-actions");
      const btns = words.map((w) => {
        const b = button(w, "g-option");
        b.addEventListener("click", () => answer(w, b));
        opts.append(b);
        return b;
      });
      function answer(w, b) {
        const ok = w === it.x;
        if (ok) right++;
        btns.forEach((x) => {
          x.disabled = true;
          if (x.textContent === it.x) { x.classList.add("ok"); x.prepend(el("span", "g-mark", "✓ ")); }
          else if (x === b) { x.classList.add("bad"); x.prepend(el("span", "g-mark", "✗ ")); }
        });
        feedback.replaceChildren(el("p", ok ? "g-good" : "g-wrong", ok ? "✓ Right!" : "✗ The odd one out is " + it.x + "."),
                                 el("p", "g-why", it.why));
        say((ok ? "Right! " : "The odd one out is " + it.x + ". ") + it.why);
        st.set("Group " + (i + 1) + " of " + items.length, right + " right");
        const next = button(i + 1 < items.length ? "Next group" : "See your score");
        next.addEventListener("click", () => { i++; i < items.length ? show() : end(); });
        actions.replaceChildren(next);
        next.focus();
      }
      root.append(st.bar, q, opts, feedback, actions, live);
    }
    function end() {
      root.replaceChildren();
      const prev = get("odd");
      if (!(prev >= right)) put("odd", right);
      const best = Math.max(prev || 0, right);
      if (right === items.length) confetti();
      root.append(endCard(right === items.length ? "Perfect!" : "Round finished",
        "You got " + right + " of " + items.length + " right.",
        "Your best: " + best + " of " + items.length, null, start), live);
      say("Round finished. You got " + right + " of " + items.length + " right.");
      root.querySelector(".g-end button").focus();
    }
    start();
  }

  /* ================= Word of the day ================= */
  function word() {
    const LEN = 5, ROWS = 6;
    const now = new Date();
    const pad = (n) => (n < 10 ? "0" : "") + n;
    const today = now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate());
    // Everyone at this level gets the same word on the same date; the list is already in a fixed random order.
    const dayNo = Math.round((Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) - Date.UTC(2026, 10, 1)) / 864e5);
    const list = G.words;
    const answer = list[((dayNo % list.length) + list.length) % list.length];
    const valid = new Set(String(window.GAME_DICT || "").split(" "));
    list.forEach((w) => valid.add(w));

    let saved = get("word") || {};
    if (saved.day !== today) saved = { day: today, guesses: [], played: saved.played || 0, won: saved.won || 0 };
    const guesses = saved.guesses.slice();
    let current = "", over = false;

    root.replaceChildren();
    const board = el("div", "g-board");
    board.setAttribute("role", "group");
    board.setAttribute("aria-label", "Guesses");
    const rows = [];
    for (let r = 0; r < ROWS; r++) {
      const row = el("div", "g-row");
      const tiles = [];
      for (let c = 0; c < LEN; c++) { const t = el("span", "g-tile"); row.append(t); tiles.push(t); }
      board.append(row); rows.push({ row, tiles });
    }
    const msg = el("p", "g-msg");
    msg.setAttribute("aria-live", "polite");
    const kb = keyboard((k) => (k === "Enter" ? submit() : k === "Backspace" ? back() : type(k)), true);
    const keys = kb.keys, keyEls = kb.byLetter;
    const legend = el("p", "g-legend");
    legend.innerHTML = '<span class="g-li"><span class="g-tile mini right">✓</span> right place</span>' +
      '<span class="g-li"><span class="g-tile mini near">↔</span> in the word, another place</span>' +
      '<span class="g-li"><span class="g-tile mini none"></span> not in the word</span>';
    const after = el("div", "g-after");
    root.append(board, msg, keys, legend, after);

    // Wordle colouring, with repeated letters counted properly.
    function score(guess) {
      const res = Array(LEN).fill("none"), left = {};
      for (let k = 0; k < LEN; k++) {
        if (guess[k] === answer[k]) res[k] = "right";
        else left[answer[k]] = (left[answer[k]] || 0) + 1;
      }
      for (let k = 0; k < LEN; k++) {
        if (res[k] === "right") continue;
        if (left[guess[k]]) { res[k] = "near"; left[guess[k]]--; }
      }
      return res;
    }
    const RANK = { none: 1, near: 2, right: 3 };
    const NAMES = { right: "right place", near: "in the word, another place", none: "not in the word" };
    function paint(r, guess, animate) {
      const res = score(guess);
      rows[r].tiles.forEach((t, k) => {
        t.textContent = guess[k];
        t.className = "g-tile filled " + res[k] + (animate ? " reveal" : "");
        if (animate) t.style.animationDelay = k * 90 + "ms";
        t.setAttribute("aria-label", guess[k].toUpperCase() + ", " + NAMES[res[k]]);
        const kb = keyEls[guess[k]];
        const was = kb.getAttribute("data-state");
        if (!was || RANK[res[k]] > RANK[was]) kb.setAttribute("data-state", res[k]);
      });
      rows[r].row.setAttribute("aria-label", "Guess " + (r + 1) + ": " + guess.toUpperCase());
      return res;
    }
    function drawCurrent() {
      const r = guesses.length;
      if (r >= ROWS) return;
      rows[r].tiles.forEach((t, k) => {
        t.textContent = current[k] || "";
        t.className = "g-tile" + (current[k] ? " typed" : "");
        t.removeAttribute("aria-label");
      });
    }
    function type(ch) {
      if (over || current.length >= LEN) return;
      current += ch; msg.textContent = ""; drawCurrent();
    }
    function back() {
      if (over || !current.length) return;
      current = current.slice(0, -1); msg.textContent = ""; drawCurrent();
    }
    function submit() {
      if (over) return;
      const r = guesses.length;
      if (current.length < LEN) { msg.textContent = "Not enough letters."; shake(rows[r].row); return; }
      if (!valid.has(current)) { msg.textContent = "That word isn’t in the word list."; shake(rows[r].row); return; }
      const g = current;
      guesses.push(g); current = "";
      const res = paint(r, g, true);
      const spoken = g.toUpperCase().split("").map((ch, k) => ch + " " + NAMES[res[k]]).join(", ");
      const won = g === answer, lost = !won && guesses.length === ROWS;
      saved.guesses = guesses;
      if (won || lost) { saved.played = (saved.played || 0) + 1; if (won) saved.won = (saved.won || 0) + 1; saved.done = true; }
      put("word", saved);
      msg.textContent = spoken;
      if (won || lost) setTimeout(() => finish(won, true), 600);
    }
    function finish(won, fresh) {
      over = true;
      const n = guesses.length;
      msg.textContent = won ? (n === 1 ? "Got it in one!" : "You got it in " + n + " tries!") : "The word was " + answer.toUpperCase() + ".";
      if (won && fresh) confetti();
      after.replaceChildren();
      const card = el("div", "card g-end");
      card.append(el("h2", null, won ? "Well done!" : "Better luck tomorrow"));
      card.append(el("p", "g-end-line", "Today’s word: " + answer.toUpperCase()));
      card.append(el("p", "g-best", "Played " + (saved.played || 0) + " · Won " + (saved.won || 0)));
      card.append(el("p", "g-why", "Come back tomorrow for a new word."));
      after.append(card);
    }

    typing((k) => (k === "Enter" ? submit() : k === "Backspace" ? back() : type(k)));

    guesses.forEach((g, r) => paint(r, g, false));
    const won = guesses[guesses.length - 1] === answer;
    if (won || guesses.length >= ROWS) finish(won, false);
    else drawCurrent();
  }

  /* ================= Error hunt ================= */
  function errors() {
    const ROUND = 10;
    let items, i, points;
    const split = (t) => { const m = t.match(/^([^\w']*)(.*?)([^\w'’-]*)$/); return m ? [m[1], m[2], m[3]] : ["", t, ""]; };
    function start() { items = pick(G.errors, ROUND); i = 0; points = 0; show(); }
    function show() {
      root.replaceChildren();
      const it = items[i], max = items.length * 2;
      const st = statusBar();
      const status = () => st.set("Sentence " + (i + 1) + " of " + items.length, points + " of " + max + " points");
      status();
      const q = el("p", "g-question", "Tap the word that’s wrong.");
      const sent = el("p", "g-sentence");
      const toks = it.s.split(" ").map((t, k) => {
        const b = button(t, "g-word");
        b.addEventListener("click", () => tap(k));
        sent.append(b, " ");
        return b;
      });
      const step2 = el("div", "g-step2");
      const feedback = el("div", "g-feedback");
      const actions = el("div", "g-actions");
      function tap(k) {
        toks.forEach((b) => { b.disabled = true; });
        const found = k === it.i;
        const err = toks[it.i];
        err.classList.add("err");
        err.prepend(el("span", "g-mark", "✗ "));
        const word = split(it.s.split(" ")[it.i])[1];
        let line;
        if (found) { points++; line = el("p", "g-good", "✓ Yes, “" + word + "” is wrong."); }
        else {
          toks[k].classList.add("fine");
          line = el("p", "g-wrong", "✗ “" + split(toks[k].textContent)[1] + "” is fine. The wrong word is “" + word + "”.");
        }
        status();
        const opts = el("div", "g-options");
        const btns = shuffle([it.fix].concat(it.no)).map((o) => {
          const b = button(o, "g-option");
          b.addEventListener("click", () => fix(o));
          opts.append(b);
          return b;
        });
        step2.replaceChildren(line, el("p", "g-question", "Choose the correction:"), opts);
        say(line.textContent + " Choose the correction.");
        btns[0].focus();
        function fix(o) {
          const ok = o === it.fix;
          if (ok) points++;
          btns.forEach((x) => {
            x.disabled = true;
            if (x.textContent === it.fix) { x.classList.add("ok"); x.prepend(el("span", "g-mark", "✓ ")); }
            else if (x.textContent === o) { x.classList.add("bad"); x.prepend(el("span", "g-mark", "✗ ")); }
          });
          const [pre, , post] = split(it.s.split(" ")[it.i]);
          err.replaceChildren(el("span", "g-mark", "✓ "), pre + it.fix + post);
          err.classList.remove("err"); err.classList.add("fixed");
          feedback.replaceChildren(el("p", ok ? "g-good" : "g-wrong", ok ? "✓ Right!" : "✗ The correction is “" + it.fix + "”."),
                                   el("p", "g-why", it.why));
          say((ok ? "Right! " : "The correction is " + it.fix + ". ") + it.why);
          status();
          const next = button(i + 1 < items.length ? "Next sentence" : "See your score");
          next.addEventListener("click", () => { i++; i < items.length ? show() : end(); });
          actions.replaceChildren(next);
          next.focus();
        }
      }
      root.append(st.bar, q, sent, step2, feedback, actions, live);
    }
    function end() {
      root.replaceChildren();
      const max = items.length * 2;
      const prev = get("errors");
      if (!(prev >= points)) put("errors", points);
      const best = Math.max(prev || 0, points);
      if (points === max) confetti();
      root.append(endCard(points === max ? "Perfect!" : "Round finished",
        "You scored " + points + " of " + max + " points.",
        "One point for finding the wrong word, one for fixing it. Your best: " + best + " of " + max, null, start), live);
      say("Round finished. You scored " + points + " of " + max + " points.");
      root.querySelector(".g-end button").focus();
    }
    start();
  }

  /* ================= Hangman ================= */
  function hangman() {
    const ROUND = 5, MAX = 6;
    let items, i, solved, cur;
    const PARTS = ['<circle cx="140" cy="52" r="14"/>', '<path d="M140 66v46"/>', '<path d="M140 78l-20 18"/>',
                   '<path d="M140 78l20 18"/>', '<path d="M140 112l-18 26"/>', '<path d="M140 112l18 26"/>'];
    function start() { items = pick(G.hangman, ROUND); i = 0; solved = 0; show(); }
    function show() {
      root.replaceChildren();
      const [word, clue] = items[i];
      cur = { word, got: new Set(), wrong: 0, over: false, guess: (k) => guess(k) };
      const st = statusBar();
      st.set("Word " + (i + 1) + " of " + items.length, solved + " solved");
      const c = el("p", "g-clue");
      c.append(el("span", "g-label", "Clue"), el("span", null, cap(clue)));
      const pic = el("div", "g-hang");
      pic.innerHTML = '<svg viewBox="0 0 200 160" aria-hidden="true"><path class="g-gallows" d="M20 150h90M45 150V12h95v26"/><g class="g-man"></g></svg>';
      const man = pic.querySelector(".g-man");
      const left = el("p", "g-left");
      const slots = el("div", "g-slots");
      slots.setAttribute("aria-label", word.length + " letters");
      const cells = word.split("").map(() => { const x = el("span", "g-slot"); slots.append(x); return x; });
      const msg = el("p", "g-msg");
      msg.setAttribute("aria-live", "polite");
      const kb = keyboard((k) => guess(k), false);
      const actions = el("div", "g-actions");
      const lives = () => { left.textContent = "Wrong guesses: " + cur.wrong + " of " + MAX; };
      lives();
      function guess(ch) {
        if (cur.over || !/^[a-z]$/.test(ch) || cur.got.has(ch)) return;
        cur.got.add(ch);
        const key = kb.byLetter[ch];
        if (word.includes(ch)) {
          key.setAttribute("data-state", "right");
          word.split("").forEach((w, k) => { if (w === ch) { cells[k].textContent = w; cells[k].classList.add("on"); } });
          const n = word.split("").filter((w) => w === ch).length;
          msg.textContent = ch.toUpperCase() + ": yes, " + n + (n === 1 ? " letter." : " letters.");
          if (word.split("").every((w) => cur.got.has(w))) done(true);
        } else {
          key.setAttribute("data-state", "none");
          man.insertAdjacentHTML("beforeend", PARTS[cur.wrong]);
          cur.wrong++;
          lives();
          msg.textContent = ch.toUpperCase() + ": not in the word.";
          if (cur.wrong >= MAX) done(false);
        }
      }
      function done(won) {
        cur.over = true;
        if (won) solved++;
        else word.split("").forEach((w, k) => { if (!cells[k].textContent) { cells[k].textContent = w; cells[k].classList.add("missed"); } });
        slots.classList.add(won ? "won" : "lost");
        msg.textContent = won ? "✓ Well done! The word is " + word.toUpperCase() + "." : "✗ The word was " + word.toUpperCase() + ".";
        st.set("Word " + (i + 1) + " of " + items.length, solved + " solved");
        const next = button(i + 1 < items.length ? "Next word" : "See your score");
        next.addEventListener("click", () => { i++; i < items.length ? show() : end(); });
        actions.replaceChildren(next);
        next.focus();
      }
      root.append(st.bar, c, pic, left, slots, msg, kb.keys, actions, live);
    }
    typing((k) => { if (cur && cur.guess) cur.guess(k); });
    function end() {
      root.replaceChildren();
      cur = null;
      const prev = get("hangman");
      if (!(prev >= solved)) put("hangman", solved);
      const best = Math.max(prev || 0, solved);
      if (solved === items.length) confetti();
      root.append(endCard(solved === items.length ? "Perfect!" : "Round finished",
        "You solved " + solved + " of " + items.length + " words.",
        "Your best: " + best + " of " + items.length, null, start), live);
      say("Round finished. You solved " + solved + " of " + items.length + " words.");
      root.querySelector(".g-end button").focus();
    }
    start();
  }

  ({ scramble, pairs, odd, word, errors, hangman }[KIND] || (() => {}))();
})();
