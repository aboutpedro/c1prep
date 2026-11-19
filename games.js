/* C1 Prep games, at every level: Sentence scramble, Memory pairs (phrasal verbs), Odd one out, Word of the day,
   Error hunt, Hangman, Crosswords and Escape room.
   A game page has <div id="game" data-game="…" data-level="…"> and loads its level's content first (window.GAMES,
   from data/games.js); Word of the day also loads games-words.js (window.GAME_DICT, the valid guesses).
   Best scores and today's word are kept in this browser (localStorage "c1p:games"):
   { "a1:scramble": 8, "a1:odd": 10, "a1:pairs": 9 (fewest tries), "a1:word": { day, guesses, played, won },
     "a1:errors": 17 (points of 20), "a1:hangman": 4 (words of 5),
     "a1:cw": { last: puzzle, p: { 0: { g: letters ("." = empty), s: 1 if solved } } },
     "a1:escape": { room, done: [rooms], hints: [rooms], t: seconds, started, finished, best } }. */
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

  /* An on-screen QWERTY keyboard. extra: true adds Enter and Delete, "del" only Delete. Keys don't take the focus. */
  function keyboard(onKey, extra) {
    const keys = el("div", "g-keys"), byLetter = {};
    ["qwertyuiop", "asdfghjkl", extra === true ? "+zxcvbnm-" : extra === "del" ? "zxcvbnm-" : "zxcvbnm"].forEach((line) => {
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
  /* Letters and digits typed on a real keyboard (not into a field, and not Enter/Space on a focused button). */
  function typing(onKey) {
    const h = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.target;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (t && t.tagName === "BUTTON" && (e.key === "Enter" || e.key === " ")) return;   // a focused button does its own thing
      if (e.key === "Enter" || e.key === "Backspace") { e.preventDefault(); onKey(e.key); }
      else if (/^[a-z0-9]$/i.test(e.key)) onKey(e.key.toLowerCase());
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);   // stop listening
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

    typing((k) => (k === "Enter" ? submit() : k === "Backspace" ? back() : /^[a-z]$/.test(k) ? type(k) : null));

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

  /* ================= Crosswords ================= */
  function crossword() {
    const P = G.crosswords;
    const store = get("cw") || { last: 0, p: {} };
    const save = () => put("cw", store);
    let pi = Math.min(store.last || 0, P.length - 1);

    const chips = el("div", "g-chips");
    chips.setAttribute("aria-label", "Puzzles");
    const holder = el("div", "g-cw-wrap");
    root.replaceChildren(chips, holder, live);
    let cleanup = null;

    function drawChips() {
      chips.replaceChildren();
      P.forEach((pz, k) => {
        const b = button("", "g-chip-btn");
        b.append(el("span", "g-chip-n", String(k + 1)), " " + pz.t);
        if (store.p[k] && store.p[k].s) b.append(el("span", "g-tick", " ✓"));
        b.setAttribute("aria-pressed", k === pi ? "true" : "false");
        b.addEventListener("click", () => { if (k !== pi) { pi = k; open(); } });
        chips.append(b);
      });
    }

    function open() {
      if (cleanup) cleanup();
      store.last = pi; save();
      drawChips();
      const pz = P[pi], W = pz.w, H = pz.h;
      const st = store.p[pi] || (store.p[pi] = { g: "" });
      const at = (x, y) => y * W + x;
      // squares: answer letter, the entries through it, the number
      const sq = new Map();
      pz.e.forEach((en, k) => {
        for (let i = 0; i < en.a.length; i++) {
          const x = en.d === "a" ? en.x + i : en.x, y = en.d === "a" ? en.y : en.y + i;
          const c = sq.get(at(x, y)) || { x, y, ans: en.a[i], a: null, d: null, n: null };
          c[en.d] = k;
          if (i === 0) c.n = en.n;
          sq.set(at(x, y), c);
        }
      });
      const letters = Array.from({ length: W * H }, (_, k) => (st.g[k] && st.g[k] !== "." ? st.g[k] : ""));
      const marks = {};                                   // index -> "wrong" | "shown"
      const keep = () => { st.g = letters.map((l) => l || ".").join(""); save(); };

      holder.replaceChildren();
      const bar = el("div", "g-cluebar");
      const prev = button("", "g-iconbtn"), next = button("", "g-iconbtn");
      prev.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>';
      next.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>';
      prev.setAttribute("aria-label", "Previous clue"); next.setAttribute("aria-label", "Next clue");
      const clueText = el("p", "g-cluetext");
      clueText.setAttribute("aria-live", "polite");
      bar.append(prev, clueText, next);

      const grid = el("div", "g-cw");
      grid.style.gridTemplateColumns = "repeat(" + W + ", minmax(0, 1fr))";
      grid.style.maxWidth = W * 44 + "px";
      grid.setAttribute("role", "group");
      grid.setAttribute("aria-label", "Crossword grid, " + W + " by " + H);
      const cellEl = {};
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        const c = sq.get(at(x, y));
        if (!c) { grid.append(el("span", "g-void")); continue; }
        const d = el("span", "g-sq");
        if (c.n) d.append(el("span", "g-num", String(c.n)));
        d.append(el("span", "g-let"));
        d.addEventListener("click", () => select(x, y, true));
        grid.append(d);
        cellEl[at(x, y)] = d;
      }

      const msg = el("p", "g-msg");
      msg.setAttribute("aria-live", "polite");
      const kb = keyboard((k) => key(k), "del");
      const actions = el("div", "g-actions g-cw-actions");
      const check = button("Check", "secondary"), reveal = button("Show this word", "secondary"), clear = button("Clear", "secondary");
      actions.append(check, reveal, clear);

      const lists = el("div", "g-cluelists");
      const clueBtn = {};
      [["a", "Across"], ["d", "Down"]].forEach(([dir, name]) => {
        const box = el("div", "g-cluelist");
        box.append(el("h3", null, name));
        const ol = el("ol");
        pz.e.forEach((en, k) => {
          if (en.d !== dir) return;
          const li = el("li");
          const b = button("", "g-cl");
          b.append(el("b", null, String(en.n)), " " + en.c + " (" + en.a.length + ")");
          b.addEventListener("click", () => { cur.dir = dir; select(en.x, en.y, false, dir); grid.scrollIntoView({ block: "nearest" }); });
          li.append(b); ol.append(li);
          clueBtn[k] = b;
        });
        box.append(ol);
        lists.append(box);
      });

      const layout = el("div", "g-cw-layout");
      const left = el("div", "g-cw-main");
      left.append(bar, grid, msg, kb.keys, actions);
      layout.append(left, lists);
      holder.append(layout);

      const cur = { x: 0, y: 0, dir: "a" };
      const entryOf = (x, y, dir) => { const c = sq.get(at(x, y)); return c ? (c[dir] != null ? c[dir] : c[dir === "a" ? "d" : "a"]) : null; };
      const cellsOf = (k) => { const en = pz.e[k]; return Array.from(en.a, (_, i) => (en.d === "a" ? [en.x + i, en.y] : [en.x, en.y + i])); };

      function paint() {
        const k = entryOf(cur.x, cur.y, cur.dir);
        const word = new Set(cellsOf(k).map(([x, y]) => at(x, y)));
        sq.forEach((c, i) => {
          const d = cellEl[i];
          d.querySelector(".g-let").textContent = letters[i] ? letters[i].toUpperCase() : "";
          d.className = "g-sq" + (word.has(i) ? " inword" : "") + (i === at(cur.x, cur.y) ? " here" : "") + (marks[i] ? " " + marks[i] : "");
        });
        const en = pz.e[k];
        clueText.replaceChildren(el("b", null, en.n + " " + (en.d === "a" ? "across" : "down")), " " + en.c + " (" + en.a.length + ")");
        Object.entries(clueBtn).forEach(([j, b]) => {
          b.classList.toggle("on", Number(j) === k);
          b.classList.toggle("done", cellsOf(Number(j)).every(([x, y]) => letters[at(x, y)]));
        });
      }
      function select(x, y, tapped, dir) {
        const c = sq.get(at(x, y));
        if (!c) return;
        if (dir) cur.dir = dir;
        else if (tapped && cur.x === x && cur.y === y && c.a != null && c.d != null) cur.dir = cur.dir === "a" ? "d" : "a";
        else if (c[cur.dir] == null) cur.dir = cur.dir === "a" ? "d" : "a";
        cur.x = x; cur.y = y;
        paint();
      }
      function step(delta) {
        const cells = cellsOf(entryOf(cur.x, cur.y, cur.dir));
        const i = cells.findIndex(([x, y]) => x === cur.x && y === cur.y);
        const j = i + delta;
        if (j >= 0 && j < cells.length) { cur.x = cells[j][0]; cur.y = cells[j][1]; return true; }
        return false;
      }
      function moveClue(delta) {
        const order = pz.e.map((en, k) => k).sort((a, b) => (pz.e[a].d === pz.e[b].d ? pz.e[a].n - pz.e[b].n : pz.e[a].d === "a" ? -1 : 1));
        const k = entryOf(cur.x, cur.y, cur.dir);
        const en = pz.e[order[(order.indexOf(k) + delta + order.length) % order.length]];
        select(en.x, en.y, false, en.d);
        // start at the first empty square of that word, if there is one
        const empty = cellsOf(order[(order.indexOf(k) + delta + order.length) % order.length]).find(([x, y]) => !letters[at(x, y)]);
        if (empty) { cur.x = empty[0]; cur.y = empty[1]; paint(); }
      }
      function key(k) {
        const i = at(cur.x, cur.y);
        if (k === "Backspace") {
          if (letters[i]) letters[i] = "";
          else if (step(-1)) letters[at(cur.x, cur.y)] = "";
          delete marks[at(cur.x, cur.y)];
        } else if (/^[a-z]$/.test(k)) {
          letters[i] = k; delete marks[i];
          step(1);
        } else return;
        keep(); paint(); done();
      }
      function arrow(e) {
        const m = { ArrowLeft: [-1, 0, "a"], ArrowRight: [1, 0, "a"], ArrowUp: [0, -1, "d"], ArrowDown: [0, 1, "d"] }[e.key];
        if (!m) return;
        const t = e.target;
        if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
        if (t && t.tagName === "BUTTON" && !t.classList.contains("g-key")) return;
        e.preventDefault();
        let x = cur.x + m[0], y = cur.y + m[1];
        while (x >= 0 && y >= 0 && x < W && y < H && !sq.get(at(x, y))) { x += m[0]; y += m[1]; }
        if (sq.get(at(x, y))) { cur.x = x; cur.y = y; }
        const c = sq.get(at(cur.x, cur.y));
        if (c[m[2]] != null) cur.dir = m[2];
        paint();
      }
      document.addEventListener("keydown", arrow);
      const off = typing((k) => (k === "Enter" ? moveClue(1) : key(k)));
      cleanup = () => { document.removeEventListener("keydown", arrow); off(); };
      prev.addEventListener("click", () => moveClue(-1));
      next.addEventListener("click", () => moveClue(1));

      function done() {
        let filled = true, right = true;
        sq.forEach((c, i) => { if (!letters[i]) filled = false; else if (letters[i] !== c.ans) right = false; });
        if (filled && right) {
          msg.className = "g-msg g-good";
          msg.textContent = "✓ Solved! Well done.";
          if (!st.s) { st.s = 1; save(); drawChips(); confetti(); }
        } else if (filled) {
          msg.className = "g-msg";
          msg.textContent = "Every square is filled, but some letters are wrong. Press Check to see them.";
        } else if (msg.classList.contains("g-good")) { msg.className = "g-msg"; msg.textContent = ""; }
      }
      check.addEventListener("click", () => {
        let wrong = 0, empty = 0;
        sq.forEach((c, i) => {
          if (!letters[i]) empty++;
          else if (letters[i] !== c.ans) { marks[i] = "wrong"; wrong++; }
        });
        paint();
        msg.className = "g-msg" + (wrong ? " g-wrong" : "");
        msg.textContent = wrong ? "✗ " + wrong + (wrong === 1 ? " letter is wrong" : " letters are wrong") + " (in red)." + (empty ? " " + empty + " squares are still empty." : "")
                                : empty ? "✓ Everything so far is right. " + empty + (empty === 1 ? " square is" : " squares are") + " still empty." : msg.textContent;
        done();
      });
      reveal.addEventListener("click", () => {
        cellsOf(entryOf(cur.x, cur.y, cur.dir)).forEach(([x, y]) => {
          const i = at(x, y);
          if (letters[i] !== sq.get(i).ans) { letters[i] = sq.get(i).ans; marks[i] = "shown"; }
        });
        keep(); paint(); done();
      });
      let sure = null;
      clear.addEventListener("click", () => {
        if (!sure) {
          clear.textContent = "Clear every letter?";
          sure = setTimeout(() => { clear.textContent = "Clear"; sure = null; }, 3000);
          return;
        }
        clearTimeout(sure); sure = null; clear.textContent = "Clear";
        letters.fill(""); Object.keys(marks).forEach((k) => delete marks[k]);
        st.s = 0; keep(); drawChips(); paint();
        msg.className = "g-msg"; msg.textContent = "";
      });

      const first = pz.e.find((en) => en.d === "a") || pz.e[0];
      select(first.x, first.y, false, first.d);
      done();
    }
    open();
  }

  /* ================= Escape room ================= */
  function escapeRoom() {
    const LIST = G.escapes || [G.escape];
    const keyOf = (k) => (k ? "escape-" + (k + 1) : "escape");      // the first story keeps the original key
    const mmss = (t) => Math.floor(t / 60) + ":" + String(t % 60).padStart(2, "0");
    if (LIST.length === 1) return escapeStory(LIST[0], keyOf(0), null);
    chooser();

    /* Several stories at this level: a list to choose from, with each one's progress */
    function chooser() {
      root.replaceChildren();
      const list = el("div", "g-esc-list");
      LIST.forEach((E, k) => {
        const st = get(keyOf(k)) || {};
        const b = button("", "g-esc-card");
        const text = el("span", "g-esc-card-text");
        text.append(el("span", "g-esc-card-title", E.title), el("span", "g-esc-card-intro", E.intro.split(/(?<=[.!?])\s/)[0]));
        const status = st.finished ? "✓ Escaped · best time " + mmss(st.best || st.t)
                     : st.started ? "In progress · " + mmss(st.t || 0) : "Not started yet";
        text.append(el("span", "g-esc-card-status" + (st.finished ? " done" : ""), status));
        b.append(el("span", "g-esc-card-n", String(k + 1)), text);
        b.addEventListener("click", () => escapeStory(E, keyOf(k), chooser));
        list.append(b);
      });
      root.append(el("p", "g-question", "Choose an escape room."), list, live);
    }
  }

  /* One escape room: five rooms, a timer and hints. back: a function that returns to the list, or null. */
  function escapeStory(E, KEY, back) {
    const R = E.rooms, N = R.length;
    const fresh = () => ({ room: 0, done: [], hints: [], t: 0, started: false, finished: false, best: (get(KEY) || {}).best || null });
    let S = Object.assign(fresh(), get(KEY) || {});
    const save = () => put(KEY, S);
    const mmss = (t) => Math.floor(t / 60) + ":" + String(t % 60).padStart(2, "0");
    let timer = null, view = S.room, off = null;
    function backButton() {
      const b = button("All escape rooms", "secondary g-esc-back");
      b.addEventListener("click", () => { stop(); if (off) { off(); off = null; } back(); });
      return b;
    }
    const norm2 = (s) => norm(s).replace(/[.!?,"“”]/g, "").replace(/-/g, " ").replace(/\s+/g, " ").trim();

    const DOOR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17"/><path d="M3 21h18"/><circle cx="14.5" cy="12" r="1"/></svg>';
    const OPEN = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17"/><path d="M3 21h18"/><path d="M6 3l7 2.5V21"/></svg>';

    function tick() {
      if (timer) return;
      timer = setInterval(() => {
        if (document.hidden || !S.started || S.finished) return;
        S.t++;
        const c = root.querySelector(".g-clock");
        if (c) c.textContent = mmss(S.t);
        if (S.t % 5 === 0) save();
      }, 1000);
    }
    function stop() { clearInterval(timer); timer = null; }

    function startScreen() {
      stop();
      if (off) { off(); off = null; }
      root.replaceChildren();
      const card = el("div", "card g-esc-start");
      card.append(el("p", "g-label", "Escape room"), el("h2", null, E.title), el("p", "g-story", E.intro));
      const row = el("div", "g-actions");
      if (S.started && !S.finished) {
        const go = button("Carry on (" + mmss(S.t) + ")");
        go.addEventListener("click", () => { view = S.room; game(); });
        const again = button("Start again", "secondary");
        again.addEventListener("click", () => { S = fresh(); S.started = true; save(); view = 0; game(); });
        row.append(go, again);
      } else {
        const go = button("Go in");
        go.addEventListener("click", () => { S = fresh(); S.started = true; save(); view = 0; game(); });
        row.append(go);
      }
      card.append(row);
      if (S.best) card.append(el("p", "g-best", "Your best time: " + mmss(S.best)));
      root.append(card, live);
      if (back) root.append(backButton());
      card.querySelector("button").focus();
    }

    function game() {
      if (off) { off(); off = null; }
      tick();
      root.replaceChildren();
      const top = el("div", "g-esc-top");
      const doors = el("div", "g-doors");
      doors.setAttribute("aria-label", "Rooms");
      R.forEach((r, k) => {
        const open = S.done.includes(k);
        const b = button("", "g-door" + (open ? " open" : "") + (k === S.room ? " now" : "") + (k === view ? " viewing" : ""));
        b.innerHTML = (open ? OPEN : DOOR) + '<span class="g-door-n">' + (k + 1) + "</span>";
        b.setAttribute("aria-label", "Room " + (k + 1) + ": " + r.name + (open ? ", open" : k === S.room ? ", you are here" : ", locked"));
        if (k === view) b.setAttribute("aria-current", "true");
        b.disabled = !(open || k === S.room);
        b.addEventListener("click", () => { view = k; game(); });
        doors.append(b);
      });
      const clock = el("span", "g-clock", mmss(S.t));
      clock.setAttribute("aria-label", "Time");
      const meta = el("div", "g-esc-meta");
      meta.append(clock, el("span", "g-hintcount", S.hints.length + (S.hints.length === 1 ? " hint" : " hints")));
      if (back) {
        const t = button("", "g-esc-titlebtn");
        t.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>';
        t.append(E.title);
        t.setAttribute("aria-label", E.title + ": back to all escape rooms (your progress is kept)");
        t.addEventListener("click", () => { save(); stop(); if (off) { off(); off = null; } back(); });
        top.prepend(t);
      }
      top.append(doors, meta);

      const r = R[view], solved = S.done.includes(view);
      const card = el("div", "card g-room");
      card.append(el("p", "g-label", "Room " + (view + 1) + " of " + N), el("h2", null, r.name), el("p", "g-story", r.text));
      const area = el("div", "g-puzzle");
      const feedback = el("div", "g-feedback");
      const after = el("div", "g-actions");
      card.append(area, feedback);

      const hintBox = el("div", "g-hintbox");
      if (!solved) {
        if (S.hints.includes(view)) hintBox.append(el("p", "g-hint", "Hint: " + r.hint));
        else {
          const hb = button("Show a hint", "secondary g-hintbtn");
          hb.addEventListener("click", () => {
            S.hints.push(view); save();
            hintBox.replaceChildren(el("p", "g-hint", "Hint: " + r.hint));
            meta.querySelector(".g-hintcount").textContent = S.hints.length + (S.hints.length === 1 ? " hint" : " hints");
          });
          hintBox.append(hb);
        }
      }
      card.append(hintBox, after);
      root.append(top, card, live);

      function opened() {
        if (!S.done.includes(view)) S.done.push(view);
        const last = S.done.length === N;
        if (!last) S.room = Math.min(...R.map((x, k) => k).filter((k) => !S.done.includes(k)));
        save();
        hintBox.replaceChildren();
        feedback.replaceChildren(el("p", "g-good g-opened", "✓ Click! The door opens."));
        say("The door opens.");
        doors.querySelectorAll(".g-door")[view].classList.add("open");
        doors.querySelectorAll(".g-door")[view].innerHTML = OPEN + '<span class="g-door-n">' + (view + 1) + "</span>";
        const b = button(last ? "Step outside" : "Go to the next room");
        b.addEventListener("click", () => { if (last) finish(); else { view = S.room; game(); } });
        after.replaceChildren(b);
        b.focus();
      }
      function fail(text, target) {
        feedback.replaceChildren(el("p", "g-wrong", "✗ " + text));
        say(text);
        if (target) shake(target);
      }
      if (solved && view !== S.room && S.done.length < N) {
        const b = button("Back to room " + (S.room + 1), "secondary");
        b.addEventListener("click", () => { view = S.room; game(); });
        after.append(b);
      } else if (solved && S.done.length === N) {
        const b = button("Step outside");
        b.addEventListener("click", finish);
        after.append(b);
      }
      ({ code: codeRoom, match: matchRoom, word: wordRoom, order: orderRoom, final: finalRoom })[r.type](r, area, solved, opened, fail);
    }

    /* Room: answers give the digits of the code */
    function codeRoom(r, area, solved, opened, fail) {
      const picks = r.qs.map(() => null);
      r.qs.forEach((q, n) => {
        const box = el("div", "g-esc-q");
        box.append(el("p", "g-esc-s", (n + 1) + ". " + q[0]));
        const opts = el("div", "g-esc-opts");
        shuffle(q[1].map((o, k) => k)).forEach((k) => {
          const b = button("", "g-esc-opt");
          b.append(el("span", "g-dig", String(q[2][k])), q[1][k]);
          b.setAttribute("aria-pressed", "false");
          if (solved) { b.disabled = true; if (k === 0) b.setAttribute("aria-pressed", "true"); }
          b.addEventListener("click", () => {
            picks[n] = k;
            opts.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", x === b ? "true" : "false"));
          });
          opts.append(b);
        });
        box.append(opts);
        area.append(box);
      });
      const lock = el("div", "g-lock");
      lock.append(el("p", "g-label", "The lock"));
      const slots = el("div", "g-codeslots");
      const cells = Array.from({ length: r.code.length }, () => { const c = el("span", "g-codeslot"); slots.append(c); return c; });
      let typed = solved ? r.code : "";
      const draw = () => cells.forEach((c, k) => { c.textContent = typed[k] || ""; c.classList.toggle("on", !!typed[k]); });
      const pad = el("div", "g-keypad");
      "1234567890".split("").forEach((d) => {
        const b = button(d, "g-padkey");
        b.addEventListener("click", () => digit(d));
        b.addEventListener("mousedown", (e) => e.preventDefault());
        pad.append(b);
      });
      const del = button("", "g-padkey");
      del.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5h11v14H9l-6-7z"/><path d="M12 9.5l5 5M17 9.5l-5 5"/></svg>';
      del.setAttribute("aria-label", "Delete");
      del.addEventListener("click", () => { typed = typed.slice(0, -1); draw(); });
      del.addEventListener("mousedown", (e) => e.preventDefault());
      pad.append(del);
      const go = button("Open the door");
      lock.append(slots, pad, go);
      area.append(lock);
      draw();
      function digit(d) { if (typed.length < r.code.length) { typed += d; draw(); } }
      if (solved) { pad.querySelectorAll("button").forEach((b) => { b.disabled = true; }); go.remove(); slots.classList.add("open"); return; }
      off = typing((k) => (/^[0-9]$/.test(k) ? digit(k) : k === "Backspace" ? (typed = typed.slice(0, -1), draw()) : k === "Enter" ? go.click() : null));
      go.addEventListener("click", () => {
        if (typed.length < r.code.length) return fail("Type all " + r.code.length + " numbers first.", slots);
        if (typed === r.code) { slots.classList.add("open"); pad.querySelectorAll("button").forEach((b) => { b.disabled = true; }); go.remove(); off(); off = null; opened(); }
        else { fail("The door won't open. Check your answers and try again.", slots); typed = ""; draw(); }
      });
    }

    /* Room: tap two halves that go together */
    function matchRoom(r, area, solved, opened, fail) {
      const leftCol = el("div", "g-match-col"), rightCol = el("div", "g-match-col");
      const grid = el("div", "g-match");
      grid.append(leftCol, rightCol);
      area.append(grid);
      let pick = null, got = 0;
      const L = shuffle(r.pairs.map((p, k) => k)), Rr = shuffle(r.pairs.map((p, k) => k));
      const lb = {}, rb = {};
      L.forEach((k) => { const b = button(r.pairs[k][0], "g-match-item"); lb[k] = b; leftCol.append(b); b.addEventListener("click", () => choose("l", k, b)); });
      Rr.forEach((k) => { const b = button(r.pairs[k][1], "g-match-item"); rb[k] = b; rightCol.append(b); b.addEventListener("click", () => choose("r", k, b)); });
      const pairUp = (k) => {
        got++;
        [lb[k], rb[k]].forEach((b) => { b.classList.remove("picked"); b.classList.add("matched"); b.disabled = true; b.prepend(el("span", "g-pairno", String(got))); });
      };
      if (solved) { r.pairs.forEach((p, k) => pairUp(k)); return; }
      function choose(side, k, b) {
        if (!pick || pick.side === side) {
          if (pick) pick.b.classList.remove("picked");
          pick = { side, k, b }; b.classList.add("picked");
          return;
        }
        const other = pick; pick = null;
        if (other.k === k) {
          pairUp(k);
          feedback(true);
          if (got === r.pairs.length) opened();
        } else {
          other.b.classList.remove("picked");
          fail("Those two don't go together.");
          shake(other.b); shake(b);
        }
      }
      function feedback() { area.parentNode.querySelector(".g-feedback").replaceChildren(el("p", "g-good", "✓ " + got + " of " + r.pairs.length + " matched.")); }
    }

    /* Room: the first letters of the right answers spell the password */
    function wordRoom(r, area, solved, opened, fail) {
      r.qs.forEach((q, n) => {
        const box = el("div", "g-esc-q");
        box.append(el("p", "g-esc-s", (n + 1) + ". " + q[0]));
        const opts = el("div", "g-esc-opts");
        shuffle(q[1].map((o, k) => k)).forEach((k) => {
          const b = button(q[1][k], "g-esc-opt");
          b.setAttribute("aria-pressed", solved && k === 0 ? "true" : "false");
          if (solved) b.disabled = true;
          b.addEventListener("click", () => opts.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", x === b ? "true" : "false")));
          opts.append(b);
        });
        box.append(opts);
        area.append(box);
      });
      const L = r.password.length, A = "abcdefghijklmnopqrstuvwxyz";
      const lock = el("div", "g-lock");
      lock.append(el("p", "g-label", "The lock"));
      const wheels = el("div", "g-wheels");
      const val = solved ? r.password.split("").map((c) => A.indexOf(c)) : Array(L).fill(0);
      let focus = 0;
      const shows = [];
      for (let w = 0; w < L; w++) {
        const col = el("div", "g-wheel");
        const up = button("", "g-wheel-btn"), dn = button("", "g-wheel-btn");
        up.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 15l6-6 6 6"/></svg>';
        dn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
        up.setAttribute("aria-label", "Letter " + (w + 1) + " up"); dn.setAttribute("aria-label", "Letter " + (w + 1) + " down");
        const show = el("span", "g-wheel-l");
        up.addEventListener("click", () => turn(w, -1)); dn.addEventListener("click", () => turn(w, 1));
        show.addEventListener("click", () => { focus = w; draw(); });
        col.append(up, show, dn);
        wheels.append(col);
        shows.push(show);
        if (solved) { up.disabled = dn.disabled = true; }
      }
      function turn(w, d) { val[w] = (val[w] + d + 26) % 26; focus = w; draw(); }
      function draw() { shows.forEach((s, w) => { s.textContent = A[val[w]].toUpperCase(); s.classList.toggle("focus", !solved && w === focus); }); }
      const go = button("Open the door");
      lock.append(wheels, el("p", "g-small", "Turn the wheels, or type the letters."), go);
      area.append(lock);
      draw();
      if (solved) { go.remove(); wheels.classList.add("open"); return; }
      off = typing((k) => {
        if (/^[a-z]$/.test(k)) { val[focus] = A.indexOf(k); focus = Math.min(focus + 1, L - 1); draw(); }
        else if (k === "Backspace") { focus = Math.max(focus - 1, 0); draw(); }
        else if (k === "Enter") go.click();
      });
      go.addEventListener("click", () => {
        const word = val.map((v) => A[v]).join("");
        if (word === r.password) { wheels.classList.add("open"); wheels.querySelectorAll("button").forEach((b) => { b.disabled = true; }); go.remove(); off(); off = null; opened(); }
        else fail("The lock doesn't open. Check your answers and the first letters.", wheels);
      });
    }

    /* Room: put the lines in order */
    function orderRoom(r, area, solved, opened, fail) {
      const placed = el("ol", "g-order");
      placed.setAttribute("aria-label", "Your order");
      const bank = el("div", "g-order-bank");
      const go = button("Check the order");
      const built = [];
      let order = shuffle(r.lines.map((l, k) => k));
      for (let t = 0; t < 5 && order.every((v, k) => v === k); t++) order = shuffle(order);
      const bb = {};
      order.forEach((k) => {
        const b = button(r.lines[k], "g-line");
        b.addEventListener("click", () => { built.push(k); b.hidden = true; draw(); });
        bb[k] = b; bank.append(b);
      });
      function draw() {
        placed.replaceChildren();
        if (!built.length) placed.append(el("li", "g-placeholder g-noline", "Tap the lines below in the right order."));
        built.forEach((k, pos) => {
          const li = el("li");
          const b = button(r.lines[k], "g-line placed");
          b.setAttribute("aria-label", r.lines[k] + " (tap to take it out)");
          b.addEventListener("click", () => { built.splice(pos, 1); bb[k].hidden = false; draw(); });
          if (solved) b.disabled = true;
          li.append(b); placed.append(li);
        });
        go.disabled = built.length !== r.lines.length;
      }
      area.append(el("p", "g-label", "Your order"), placed, bank, go);
      if (solved) { r.lines.forEach((l, k) => { built.push(k); bb[k].hidden = true; }); draw(); go.remove(); placed.classList.add("open"); return; }
      draw();
      go.addEventListener("click", () => {
        const right = built.filter((k, pos) => k === pos).length;
        if (right === r.lines.length) { placed.classList.add("open"); placed.querySelectorAll("button").forEach((b) => { b.disabled = true; }); go.remove(); opened(); }
        else fail(right + " of " + r.lines.length + " lines are in the right place. Tap a line to take it out.", placed);
      });
    }

    /* Room: read the note, type the answer */
    function finalRoom(r, area, solved, opened, fail) {
      const note = el("div", "g-note");
      r.note.split("\n").forEach((line) => note.append(el("p", null, line)));
      const form = el("form", "g-final");
      const id = "esc-answer";
      const lab = el("label", "g-esc-s", r.question);
      lab.setAttribute("for", id);
      const input = el("input");
      input.id = id; input.type = "text"; input.autocomplete = "off"; input.spellcheck = false;
      input.setAttribute("autocapitalize", "none");
      const go = button("Open the door"); go.type = "submit";
      const row = el("div", "g-final-row");
      row.append(input, go);
      form.append(lab, row);
      area.append(note, form);
      if (solved) { input.value = r.answers[0]; input.disabled = true; go.remove(); return; }
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const a = norm2(input.value);
        if (!a) return fail("Type your answer first.", input);
        if (r.answers.some((x) => norm2(x) === a)) { input.disabled = true; go.remove(); input.classList.add("ok"); opened(); }
        else fail("Nothing happens. Read the note again.", input);
      });
    }

    function finish() {
      stop();
      if (off) { off(); off = null; }
      if (!S.finished) { S.finished = true; if (!S.best || S.t < S.best) S.best = S.t; save(); confetti(); }
      root.replaceChildren();
      const card = el("div", "card g-end g-esc-end");
      card.append(el("h2", null, "You escaped!"), el("p", "g-story", E.outro),
        el("p", "g-end-line", "Your time: " + mmss(S.t) + (S.hints.length ? " · " + S.hints.length + (S.hints.length === 1 ? " hint" : " hints") : " · no hints")),
        el("p", "g-best", "Your best time: " + mmss(S.best)));
      const b = button("Play again");
      b.addEventListener("click", () => { S = fresh(); save(); startScreen(); });
      card.append(b);
      root.append(card, live);
      if (back) root.append(backButton());
      say("You escaped in " + mmss(S.t) + ".");
      b.focus();
    }

    if (S.finished) finish();
    else startScreen();
  }

  ({ scramble, pairs, odd, word, errors, hangman, crossword, escape: escapeRoom }[KIND] || (() => {}))();
})();
