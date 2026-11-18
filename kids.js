/* C1 Prep Kids: picture games with sound, for the kids/ pages.
   A unit page loads its data file first (window.KIDS) and has <div id="kids-app">; the games run there,
   one at a time, chosen with the address (#listen, #spell…). The kids home page only shows the stars.
   Stars are kept in this browser (localStorage "c1p:kids": { "animals:listen": 3, … }).
   Sound comes from the browser's own voices (speech synthesis); without an English voice the words are written. */
(function () {
  "use strict";

  /* ---------- small helpers ---------- */
  const STORE = "c1p:kids";
  const read = () => { try { return JSON.parse(localStorage.getItem(STORE)) || {}; } catch (e) { return {}; } };
  const keep = (id, stars) => {
    try {
      const s = read();
      if (!(s[id] >= stars)) { s[id] = stars; localStorage.setItem(STORE, JSON.stringify(s)); }
    } catch (e) {}
  };
  const el = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (a, n) => shuffle(a.slice()).slice(0, n);
  const svg = (inner) => '<svg viewBox="0 0 24 24" aria-hidden="true">' + inner + "</svg>";
  const STAR = '<path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.5 1.2 6.4L12 17.3l-5.7 3.1 1.2-6.4-4.7-4.5 6.4-.8z"/>';
  const ICONS = {
    cards: '<rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2"/>',
    speaker: '<path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    pencil: '<path d="M4 20h4L19 9l-4-4L4 16v4z"/><path d="M13 7l4 4"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.7 2.7L16.2 9.6"/>',
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3"/>',
    back: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
    yes: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    no: '<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
  };
  const stars = (n, big) => {
    let h = '<span class="k-stars' + (big ? " big" : "") + '" role="img" aria-label="' + n + (n === 1 ? " star" : " stars") + ' of 3">';
    for (let i = 0; i < 3; i++) h += '<svg viewBox="0 0 24 24" aria-hidden="true" class="' + (i < n ? "on" : "off") + '">' + STAR + "</svg>";
    return h + "</span>";
  };
  const reduced = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const shake = (b) => { b.classList.remove("shake"); void b.offsetWidth; b.classList.add("shake"); };

  /* ---------- sound ---------- */
  const synth = "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance === "function" ? window.speechSynthesis : null;
  let voice = null, voicesKnown = false;
  function pickVoice() {
    if (!synth) return;
    const vs = synth.getVoices() || [];
    if (!vs.length) return;
    voicesKnown = true;
    const en = vs.filter((v) => /^en([-_]|$)/i.test(v.lang));
    voice = en.find((v) => /^en[-_]GB/i.test(v.lang)) || en.find((v) => /^en[-_]US/i.test(v.lang)) || en[0] || null;
    document.documentElement.classList.toggle("k-nosound", !voice);
  }
  if (synth) {
    pickVoice();
    if (synth.addEventListener) synth.addEventListener("voiceschanged", pickVoice);
    else synth.onvoiceschanged = pickVoice;
  } else {
    document.documentElement.classList.add("k-nosound");
  }
  const sound = () => !!synth && (!voicesKnown || !!voice);
  function say(text) {
    if (!sound()) return;
    try {
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = voice ? voice.lang : "en-GB";
      if (voice) u.voice = voice;
      u.rate = 0.85;
      synth.speak(u);
    } catch (e) {}
  }
  window.c1KidsSay = say;   // for the tests
  function hearButton(label, text) {
    const b = el("button", "k-hear");
    b.type = "button";
    b.innerHTML = svg(ICONS.speaker) + "<span>" + esc(label) + "</span>";
    b.addEventListener("click", () => say(text));
    return b;
  }

  /* ---------- kids home: stars on the unit cards ---------- */
  document.querySelectorAll("[data-kids-unit]").forEach((card) => {
    const unit = card.getAttribute("data-kids-unit");
    const games = card.getAttribute("data-kids-games").split(" ");
    const st = read();
    const got = games.reduce((s, g) => s + (st[unit + ":" + g] || 0), 0);
    if (!got) return;
    const p = el("span", "k-unit-stars");
    p.innerHTML = svg(STAR) + "<span>" + got + " of " + games.length * 3 + " stars</span>";
    card.querySelector(".k-unit-text").appendChild(p);
  });

  /* ---------- unit pages ---------- */
  const K = window.KIDS;
  const app = document.getElementById("kids-app");
  if (!K || !app) return;

  const GAMES = {
    learn:  { title: "Look and listen", desc: "Tap each picture to hear the word.", icon: "cards" },
    listen: { title: "Listen and tap", desc: "Listen. Then tap the right picture.", icon: "speaker" },
    read:   { title: "Read and choose", desc: "Look at the picture. Tap the right word.", icon: "eye" },
    spell:  { title: "Spell the word", desc: "Tap the letters in the right order.", icon: "pencil" },
    yesno:  { title: "Yes or no?", desc: "Look at the picture and read the sentence. Is it right?", icon: "check" },
    find:   { title: "Listen and find", desc: "Listen to the question. Tap the answer in the picture.", icon: "target" },
  };
  const PRAISE = ["Great!", "Well done!", "Yes!", "Super!", "Brilliant!", "Good job!"];
  let token = 0;   // the game now on screen; timers from an older game do nothing

  function menu() {
    token++;
    const st = read();
    app.innerHTML = "";
    const list = el("div", "k-menu");
    K.games.forEach((id) => {
      const g = GAMES[id];
      const a = el("a", "k-game");
      a.href = "#" + id;
      a.innerHTML = '<span class="k-icon">' + svg(ICONS[g.icon]) + "</span>" +
        '<span class="k-gtext"><span class="k-gname">' + g.title + '</span><span class="k-gdesc">' + g.desc + "</span>" +
        stars(st[K.unit + ":" + id] || 0) + "</span>";
      list.appendChild(a);
    });
    app.appendChild(list);
  }

  function play(id) {
    const me = ++token;
    if (synth) synth.cancel();
    const g = GAMES[id];
    app.innerHTML = "";
    const bar = el("div", "k-bar");
    const back = el("a", "k-back");
    back.href = "#";
    back.innerHTML = svg(ICONS.back) + "<span>All games</span>";
    const prog = el("span", "k-prog");
    bar.append(back, prog);
    const head = el("div", "k-ghead");
    head.innerHTML = "<h2>" + g.title + "</h2><p>" + g.desc + "</p>";
    const quiet = el("p", "k-quiet k-note", "There’s no English voice in this browser, so the words are written instead.");
    const stage = el("div", "k-stage");
    const fb = el("p", "k-fb");
    fb.setAttribute("aria-live", "polite");
    app.append(bar, head, quiet, stage, fb);
    const ctx = { id, stage, fb, prog, me, live: () => me === token };
    RUN[id](ctx);
    const top = app.getBoundingClientRect().top + window.scrollY - 76;
    if (window.scrollY > top) window.scrollTo(0, Math.max(0, top));
  }

  // A game made of rounds. render(item, api) builds one round; api.right() / api.wrong() / api.reveal(msg).
  function rounds(ctx, list, render) {
    let i = 0, good = 0;
    const next = () => {
      if (!ctx.live()) return;
      if (i >= list.length) return finish(ctx, good, list.length);
      ctx.prog.textContent = (i + 1) + " / " + list.length;
      ctx.fb.className = "k-fb"; ctx.fb.textContent = "";
      ctx.stage.innerHTML = "";
      let missed = false, done = false;
      render(list[i], {
        right() {
          if (done) return false;
          done = true;
          if (!missed) good++;
          ctx.fb.className = "k-fb k-ok";
          ctx.fb.textContent = PRAISE[Math.floor(Math.random() * PRAISE.length)];
          ctx.stage.classList.add("is-done");
          i++;
          setTimeout(next, 1100);
          return true;
        },
        wrong(msg) {
          if (done) return;
          missed = true;
          ctx.fb.className = "k-fb k-bad";
          ctx.fb.textContent = msg || "Try again!";
        },
        clear() { if (!done) { ctx.fb.className = "k-fb"; ctx.fb.textContent = ""; } },
        reveal(msg) {   // a wrong answer that is not tried again: show the right one and wait for Next
          if (done) return;
          done = true; missed = true; i++;
          ctx.stage.classList.add("is-done");
          ctx.fb.className = "k-fb k-bad";
          ctx.fb.textContent = msg + " ";
          const b = el("button", "k-next", "Next");
          b.type = "button";
          b.addEventListener("click", next);
          ctx.fb.appendChild(b);
          b.focus({ preventScroll: true });
        },
      });
      ctx.stage.classList.remove("is-done");
    };
    next();
  }

  function finish(ctx, good, n) {
    const r = good / n;
    const st = r >= 0.9 ? 3 : r >= 0.6 ? 2 : 1;
    keep(K.unit + ":" + ctx.id, st);
    const word = st === 3 ? "Fantastic!" : st === 2 ? "Well done!" : "Good try!";
    ctx.prog.textContent = "";
    ctx.fb.className = "k-fb"; ctx.fb.textContent = "";
    ctx.stage.innerHTML = "";
    const end = el("div", "k-end");
    end.innerHTML = stars(st, true) + "<h3>" + word + "</h3><p>You got " + good + " of " + n + " right the first time.</p>";
    const acts = el("div", "k-end-actions");
    const again = el("button", "secondary", "Play again");
    again.type = "button";
    again.addEventListener("click", () => play(ctx.id));
    acts.appendChild(again);
    const nx = K.games[K.games.indexOf(ctx.id) + 1];
    const go = el("a", "btn", nx ? "Next game: " + GAMES[nx].title : "All games");
    go.href = nx ? "#" + nx : "#";
    acts.appendChild(go);
    end.appendChild(acts);
    ctx.stage.appendChild(end);
    say(word);
    if (st === 3 && window.c1Confetti) window.c1Confetti();
  }

  /* ---------- the games ---------- */
  const others = (w, n) => pick(K.words.filter((x) => x !== w), n);
  const picture = (w, cls, alt) => '<img class="' + (cls || "") + '" src="' + K.img(w) + '" alt="' + esc(alt || "") + '" width="512" height="512" draggable="false">';

  const RUN = {
    learn(ctx) {
      const heard = new Set();
      const total = K.words.length;
      ctx.prog.textContent = "0 / " + total;
      const grid = el("div", "k-cards");
      K.words.forEach((w) => {
        const b = el("button", "k-card");
        b.type = "button";
        b.dataset.word = w;
        b.innerHTML = picture(w) + '<span class="k-word">' + esc(w) + "</span>";
        b.addEventListener("click", () => {
          say(w);
          if (!reduced()) { b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop"); }
          b.classList.add("heard");
          if (heard.has(w)) return;
          heard.add(w);
          ctx.prog.textContent = heard.size + " / " + total;
          if (heard.size === total) {
            keep(K.unit + ":learn", 3);
            ctx.fb.className = "k-fb k-ok";
            ctx.fb.textContent = "You heard them all! ";
            const nx = K.games[K.games.indexOf("learn") + 1];
            if (nx) { const a = el("a", "btn", "Next game: " + GAMES[nx].title); a.href = "#" + nx; ctx.fb.appendChild(a); }
            if (window.c1Confetti) window.c1Confetti();
          }
        });
        grid.appendChild(b);
      });
      ctx.stage.appendChild(grid);
    },

    listen(ctx) {
      rounds(ctx, pick(K.words, 10), (w, api) => {
        const hear = hearButton("Hear it again", w);
        const quiet = el("p", "k-quiet k-target", w);
        const opts = el("div", "k-opts");
        shuffle([w].concat(others(w, 3))).forEach((o) => {
          const b = el("button", "k-opt");
          b.type = "button";
          b.dataset.word = o;
          b.innerHTML = picture(o, "", o);
          b.addEventListener("click", () => {
            if (o === w) { if (api.right()) b.classList.add("is-ok"); }
            else { api.wrong(); shake(b); b.classList.add("is-bad"); b.disabled = true; }
          });
          opts.appendChild(b);
        });
        ctx.stage.dataset.target = w;
        ctx.stage.append(hear, quiet, opts);
        setTimeout(() => { if (ctx.live() && ctx.stage.dataset.target === w) say(w); }, 250);
      });
    },

    read(ctx) {
      rounds(ctx, pick(K.words, 10), (w, api) => {
        const pic = el("div", "k-pic");
        pic.innerHTML = picture(w);
        const words = el("div", "k-words");
        shuffle([w].concat(others(w, 2))).forEach((o) => {
          const b = el("button", "k-wordbtn", o);
          b.type = "button";
          b.dataset.word = o;
          b.addEventListener("click", () => {
            if (o === w) { if (api.right()) { b.classList.add("is-ok"); say(w); } }
            else { api.wrong(); shake(b); b.classList.add("is-bad"); b.disabled = true; }
          });
          words.appendChild(b);
        });
        ctx.stage.dataset.target = w;
        ctx.stage.append(pic, words);
      });
    },

    spell(ctx) {
      rounds(ctx, pick(K.words.filter((w) => w.length <= 7), 8), (w, api) => {
        const pic = el("div", "k-pic small");
        pic.innerHTML = picture(w);
        const hear = hearButton("Hear the word", w);
        const slots = el("div", "k-slots");
        slots.setAttribute("aria-label", "Your word");
        const boxes = w.split("").map(() => slots.appendChild(el("span", "k-slot")));
        const tiles = el("div", "k-tiles");
        let order;
        do { order = shuffle(w.split("")); } while (order.join("") === w && new Set(w).size > 1);
        let pos = 0;
        order.forEach((ch) => {
          const t = el("button", "k-tile", ch);
          t.type = "button";
          t.dataset.letter = ch;
          t.addEventListener("click", () => {
            if (t.disabled || pos >= w.length) return;
            if (ch === w[pos]) {
              boxes[pos].textContent = ch;
              boxes[pos].classList.add("filled");
              pos++;
              t.disabled = true;
              t.classList.add("used");
              api.clear();
              if (pos === w.length) { slots.classList.add("is-ok"); say(w); api.right(); }
            } else { api.wrong(); shake(t); }
          });
          tiles.appendChild(t);
        });
        ctx.stage.dataset.target = w;
        ctx.stage.append(pic, hear, slots, tiles);
      });
    },

    yesno(ctx) {
      rounds(ctx, shuffle(K.yesno.slice()), (it, api) => {
        const sc = scene();
        const line = el("div", "k-say");
        line.append(el("p", "k-sentence", it.s), hearButton("Listen", it.s));
        const row = el("div", "k-yn");
        [["Yes", true], ["No", false]].forEach(([label, val]) => {
          const b = el("button", "k-ynbtn " + (val ? "yes" : "no"));
          b.type = "button";
          b.dataset.answer = val ? "yes" : "no";
          b.innerHTML = svg(val ? ICONS.yes : ICONS.no) + "<span>" + label + "</span>";
          b.addEventListener("click", () => {
            if (val === it.a) { if (api.right()) b.classList.add("is-ok"); }
            else { b.classList.add("is-bad"); api.reveal(it.a ? "It’s yes. " + it.s : "It’s no. " + it.fix); }
          });
          row.appendChild(b);
        });
        ctx.stage.dataset.target = it.a ? "yes" : "no";
        ctx.stage.append(sc, line, row);
      });
    },

    find(ctx) {
      rounds(ctx, shuffle(K.find.slice()), (it, api) => {
        const line = el("div", "k-say");
        line.append(el("p", "k-sentence", it.q), hearButton("Listen", it.q));
        const sc = scene((id, hot, e) => {
          if (id && it.a.indexOf(id) >= 0) { if (api.right()) hot.classList.add("found"); }
          else { api.wrong(); miss(sc, hot, e); }
        });
        ctx.stage.dataset.target = it.a.join(" ");
        ctx.stage.append(line, sc);
        setTimeout(() => { if (ctx.live() && ctx.stage.contains(sc)) say(it.q); }, 250);
      });
    },
  };

  // The unit's picture. With onPick, the people and things in it can be tapped.
  function scene(onPick) {
    const S = K.scene;
    const box = el("div", "k-scene");
    box.innerHTML = '<img src="' + S.src + '" alt="' + esc(S.alt) + '" width="' + S.w + '" height="' + S.h + '" draggable="false">';
    if (!onPick) return box;
    box.classList.add("tap");
    Object.keys(S.spots).forEach((id) => {
      const [l, t, r, b] = S.spots[id].box;
      const h = el("button", "k-hot");
      h.type = "button";
      h.dataset.spot = id;
      h.setAttribute("aria-label", S.spots[id].label);
      h.style.left = (l / S.w * 100) + "%";
      h.style.top = (t / S.h * 100) + "%";
      h.style.width = ((r - l) / S.w * 100) + "%";
      h.style.height = ((b - t) / S.h * 100) + "%";
      h.addEventListener("click", (e) => { e.stopPropagation(); onPick(id, h, e); });
      box.appendChild(h);
    });
    box.addEventListener("click", (e) => { if (!e.target.closest(".k-hot")) onPick(null, null, e); });
    return box;
  }
  // A short red ring where a wrong tap landed (or on the wrong thing, from the keyboard).
  function miss(box, hot, e) {
    const r = box.getBoundingClientRect();
    let x, y;
    if (e && e.clientX) { x = e.clientX - r.left; y = e.clientY - r.top; }
    else if (hot) { const h = hot.getBoundingClientRect(); x = h.left + h.width / 2 - r.left; y = h.top + h.height / 2 - r.top; }
    else return;
    const m = el("span", "k-miss");
    m.style.left = (x / r.width * 100) + "%";
    m.style.top = (y / r.height * 100) + "%";
    box.appendChild(m);
    setTimeout(() => m.remove(), 700);
  }

  function route() {
    const id = location.hash.slice(1);
    if (K.games.indexOf(id) >= 0) play(id);
    else { if (synth) synth.cancel(); menu(); }
  }
  window.addEventListener("hashchange", route);
  route();
})();
