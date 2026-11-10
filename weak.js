/* C1 Prep: "My weak spots" (weak-spots.html at every level).
   Reads the question history kept by progress.js, groups it by what each question tests (tags.js), shows the
   skills with the lowest share of right answers, and builds practice sets from single questions:
   first the ones last answered wrong, then ones never tried. Needs progress.js, tags.js and quiz.js. */
(function () {
  "use strict";
  const store = window.c1Store, quiz = window.c1Quiz, host = document.getElementById("exercise");
  if (!store || !quiz || !host) return;
  const TAGS = window.C1TAGS || {};
  const RATED = 5;      // answers needed before a skill gets a percentage
  const WEAK = 0.8;     // below this share of right answers a skill can be a focus area
  const SIZE = 10;      // questions in a practice set

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const el = (tag, attrs, html) => {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    return e;
  };
  const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  /* ---------- skills: g = group, d = what it covers ---------- */
  const SKILLS = {
    colloc:   { g: "Vocabulary", name: "Collocations", d: "Words that go together: make a difference, fierce competition, cast doubt." },
    meaning:  { g: "Vocabulary", name: "Words with similar meanings", d: "Choosing the exact word from several that mean almost the same." },
    phrasal:  { g: "Vocabulary", name: "Phrasal verbs", d: "Verb + particle: put off, come up with, turn out." },
    fixed:    { g: "Vocabulary", name: "Fixed phrases and idioms", d: "Set expressions: at least, on the verge of, take something for granted." },
    pattern:  { g: "Grammar", name: "Word patterns", d: "The preposition or structure a word needs after it: capable of, prevent someone from doing." },
    prep:     { g: "Grammar", name: "Prepositions", d: "at, by, for, in, on, with… on their own and after verbs, nouns and adjectives." },
    linker:   { g: "Grammar", name: "Linking words", d: "although, despite, whereas, unless, however, so that." },
    pron:     { g: "Grammar", name: "Pronouns and relative clauses", d: "which, whose, what, those, one another, itself." },
    verb:     { g: "Grammar", name: "Verb forms and auxiliaries", d: "be, have, do, modals and -ing forms that complete a verb phrase." },
    det:      { g: "Grammar", name: "Articles and quantifiers", d: "a, the, such, every, many, few, another." },
    compare:  { g: "Grammar", name: "Comparisons", d: "than, as … as, the more … the more, nowhere near as." },
    emph:     { g: "Grammar", name: "Negatives, inversion and emphasis", d: "not only, no sooner, little did I know, it was not until … that." },
    passive:  { g: "Grammar", name: "Passives and causatives", d: "is said to have been, is being built, have something done." },
    cond:     { g: "Grammar", name: "Conditionals, wishes and preferences", d: "if, unless, I wish, if only, it's time, would rather." },
    modal:    { g: "Grammar", name: "Modal verbs", d: "must have, can't have, needn't have, should have, be able to." },
    report:   { g: "Grammar", name: "Reported speech and reporting verbs", d: "asked whether, accused of, denied, suggested, apologised for." },
    vpat:     { g: "Grammar", name: "Verb patterns and tenses", d: "-ing or infinitive, used to, it's ages since, the first time I have…" },
    "wf-noun":   { g: "Word formation", name: "Nouns", d: "-tion, -ment, -ness, -ity, -ance: prepare → preparation, flexible → flexibility." },
    "wf-adj":    { g: "Word formation", name: "Adjectives", d: "-able, -ive, -ous, -al, -ful, -less: persuade → persuasive." },
    "wf-adv":    { g: "Word formation", name: "Adverbs", d: "Usually two steps: environment → environmental → environmentally." },
    "wf-verb":   { g: "Word formation", name: "Verbs", d: "-ise, -en and other verb forms: prior → prioritise." },
    "wf-neg":    { g: "Word formation", name: "Negative prefixes", d: "un-, in-, im-, ir-, dis-: the sentence needs the opposite meaning." },
    "wf-pre":    { g: "Word formation", name: "Other prefixes", d: "over-, under-, re-, out-, en-: estimate → overestimate." },
    "wf-plural": { g: "Word formation", name: "Plural nouns", d: "The right noun, but the sentence needs it in the plural: critic → critics." },
    "wf-change": { g: "Word formation", name: "Spelling changes and compounds", d: "strong → strength, wise → wisdom, wide → widespread." },
    "r-detail":  { g: "Reading", name: "Multiple choice: detail", d: "What the text actually says." },
    "r-opinion": { g: "Reading", name: "Multiple choice: opinion and attitude", d: "What the writer or a person in the text thinks or feels." },
    "r-implied": { g: "Reading", name: "Multiple choice: implied meaning", d: "What the text suggests without saying it directly." },
    "r-purpose": { g: "Reading", name: "Multiple choice: purpose and main idea", d: "Why the writer mentions something, and the point of a paragraph." },
    "r-words":   { g: "Reading", name: "Multiple choice: words and references", d: "What a phrase means here, or what 'it' or 'this' refers to." },
    "r-cross":   { g: "Reading", name: "Cross-text matching", d: "Comparing what four writers think about the same points." },
    "r-gapped":  { g: "Reading", name: "Gapped text", d: "How a text fits together: putting missing paragraphs or sentences back." },
    "r-match":   { g: "Reading", name: "Multiple matching", d: "Finding which text or person each statement is about." },
    "r-short":   { g: "Reading", name: "Short texts", d: "Understanding notices, messages and emails." }
  };
  const SCHEME = {
    mc:   { c: "colloc", p: "phrasal", f: "fixed", d: "pattern", l: "linker", m: "meaning" },
    open: { r: "prep", l: "linker", v: "verb", n: "pron", a: "det", f: "fixed", p: "phrasal", k: "compare", i: "emph" },
    wf:   { n: "wf-noun", j: "wf-adj", d: "wf-adv", v: "wf-verb", x: "wf-neg", o: "wf-pre", s: "wf-plural", i: "wf-change" },
    kwt:  { a: "passive", c: "cond", i: "emph", m: "modal", r: "report", k: "compare", f: "fixed", p: "phrasal", v: "vpat", l: "linker" },
    read: { d: "r-detail", o: "r-opinion", i: "r-implied", p: "r-purpose", w: "r-words" }
  };
  const GROUPS = ["Grammar", "Vocabulary", "Word formation", "Reading"];

  /* ---------- the pages of each level ----------
     scheme: questions are tagged one by one in tags.js; skill: every question on the page tests the same thing;
     own: the page is its own skill (A2/B1 grammar and vocabulary). file: its data file, if single questions can be practised. */
  const TASK = {
    mc: "Choose the word that fits the gap.",
    open: "Write one word in the gap.",
    wf: "Change the word in capitals so that it fits the gap."
  };
  const kwtTask = (words) => "Complete the second sentence so that it means the same as the first. Use the word given, without changing it, and " + words + " words in all.";
  const uoe = (words) => [
    { page: "use-of-english-1", file: "uoe1", label: "Part 1 · Multiple-choice cloze", scheme: "mc" },
    { page: "use-of-english-2", file: "uoe2", label: "Part 2 · Open cloze", scheme: "open" },
    { page: "use-of-english-3", file: "uoe3", label: "Part 3 · Word formation", scheme: "wf" },
    { page: "use-of-english-4", file: "uoe4", label: "Part 4 · Key word transformations", scheme: "kwt", task: kwtTask(words) }
  ];
  const own = (kind, g, names) => names.map((name, i) => ({
    page: kind + "-" + (i + 1), file: kind.charAt(0) + (i + 1), label: g + " " + (i + 1) + " · " + name, own: { g: g, name: name }
  }));
  const LEVELS = {
    c1: uoe("three to six").concat([
      { page: "reading-5", label: "Part 5 · Multiple choice", scheme: "read" },
      { page: "reading-6", label: "Part 6 · Cross-text matching", skill: "r-cross" },
      { page: "reading-7", label: "Part 7 · Gapped text", skill: "r-gapped" },
      { page: "reading-8", label: "Part 8 · Multiple matching", skill: "r-match" }
    ]),
    b2: uoe("two to five").concat([
      { page: "reading-5", label: "Part 5 · Multiple choice", scheme: "read" },
      { page: "reading-6", label: "Part 6 · Gapped text", skill: "r-gapped" },
      { page: "reading-7", label: "Part 7 · Multiple matching", skill: "r-match" }
    ]),
    c2: uoe("three to eight").concat([
      { page: "reading-5", label: "Part 5 · Multiple choice", scheme: "read" },
      { page: "reading-6", label: "Part 6 · Gapped text", skill: "r-gapped" },
      { page: "reading-7", label: "Part 7 · Multiple matching", skill: "r-match" }
    ]),
    a2: own("grammar", "Grammar", ["Present simple and present continuous", "Past simple and past continuous", "Present perfect",
      "Talking about the future", "Comparatives and superlatives", "Modal verbs", "Articles", "Question forms", "Countable and uncountable nouns"])
      .concat(own("vocabulary", "Vocabulary", ["Topic vocabulary", "make, do, have, take, go, get", "Easily confused words", "Phrasal verbs"]))
      .concat([
        { page: "reading-1", label: "Reading Part 1 · Short texts", skill: "r-short" },
        { page: "reading-2", label: "Reading Part 2 · Matching", skill: "r-match" },
        { page: "reading-3", label: "Reading Part 3 · Multiple choice", scheme: "read" },
        { page: "reading-4", file: "r4", label: "Reading Part 4 · Multiple-choice cloze", scheme: "mc" },
        { page: "reading-5", file: "r5", label: "Reading Part 5 · Open cloze", scheme: "open" }
      ]),
    b1: own("grammar", "Grammar", ["Narrative tenses", "Present perfect simple and continuous", "Conditionals", "The passive", "Modal verbs",
      "-ing or to-infinitive?", "used to, be used to, get used to", "Reported speech", "Relative clauses"])
      .concat(own("vocabulary", "Vocabulary", ["Topic vocabulary", "Collocations", "Phrasal verbs", "Prepositions"]))
      .concat([
        { page: "reading-1", label: "Reading Part 1 · Short texts", skill: "r-short" },
        { page: "reading-2", label: "Reading Part 2 · Matching", skill: "r-match" },
        { page: "reading-3", label: "Reading Part 3 · Multiple choice", scheme: "read" },
        { page: "reading-4", label: "Reading Part 4 · Gapped text", skill: "r-gapped" },
        { page: "reading-5", file: "r5", label: "Reading Part 5 · Multiple-choice cloze", scheme: "mc" },
        { page: "reading-6", file: "r6", label: "Reading Part 6 · Open cloze", scheme: "open" }
      ])
  };
  const PAGES = LEVELS[store.level] || [];
  PAGES.forEach((pg) => { if (pg.own) SKILLS["pg:" + pg.page] = { g: pg.own.g, name: pg.own.name, d: "", own: true }; });

  /* The skill a question tests: (page, set, position in the set). Untagged questions fall back to their part. */
  function skillOf(pg, set, i) {
    if (pg.own) return "pg:" + pg.page;
    if (pg.skill) return pg.skill;
    const word = (TAGS[pg.page] || "").split(" ")[set];
    const id = word && SCHEME[pg.scheme][word.charAt(i)];
    if (id) return id;
    const fb = "part:" + pg.page;
    if (!SKILLS[fb]) SKILLS[fb] = { g: pg.scheme === "read" ? "Reading" : "Grammar", name: pg.label, d: "" };
    return fb;
  }

  /* ---------- what the saved answers say ---------- */
  function collect() {
    const H = store.allHistory(), stats = {};
    let total = 0;
    PAGES.forEach((pg) => {
      const hp = H[store.key(pg.page)] || {};
      Object.keys(hp).forEach((k) => {
        const p = k.split(":"), id = skillOf(pg, Number(p[0]), Number(p[1]));
        const st = stats[id] || (stats[id] = { tried: 0, right: 0 });
        st.tried++; total++;
        if (hp[k][2]) st.right++;
      });
    });
    return { stats: stats, total: total };
  }
  /* Skills that have questions at this level, in display order. */
  function skillsHere() {
    const seen = {};
    PAGES.forEach((pg) => {
      if (pg.own) seen["pg:" + pg.page] = pg;
      else if (pg.skill) seen[pg.skill] = pg;
      else (TAGS[pg.page] || "").split("").forEach((ch) => { const id = SCHEME[pg.scheme][ch]; if (id && !seen[id]) seen[id] = pg; });
    });
    return Object.keys(SKILLS).filter((id) => seen[id]);
  }
  /* Can single questions of this skill be practised here (not reading), and where? */
  function practisable(id) {
    return PAGES.some((pg) => pg.file && (pg.own ? "pg:" + pg.page === id : pg.scheme && (TAGS[pg.page] || "").split("").some((ch) => SCHEME[pg.scheme][ch] === id)));
  }
  /* For reading skills: the next set to do in the part that tests it. */
  function nextSet(id) {
    const pg = PAGES.filter((p) => !p.file).find((p) => p.skill === id || (p.scheme && Object.keys(SCHEME[p.scheme]).some((ch) => SCHEME[p.scheme][ch] === id)));
    if (!pg) return null;
    const res = store.results(store.key(pg.page));
    const n = res.n || (TAGS[pg.page] ? TAGS[pg.page].split(" ").length : 0);
    let set = 0;
    while (res.s[set] && (!n || set < n - 1)) set++;
    if (res.s[set]) {   // every set is done: go back to the one with the lowest score
      set = Object.keys(res.s).map(Number).sort((a, b) => res.s[a][0] / res.s[a][1] - res.s[b][0] / res.s[b][1])[0];
    }
    return { href: pg.page + ".html#set-" + (set + 1), text: pg.label.replace(/^Reading /, "").replace(/ · .*/, "") + " · Set " + (set + 1) };
  }

  /* ---------- data files, loaded only when a practice set is built ---------- */
  const DATA = {};
  function loadOne(pg) {
    if (DATA[pg.page]) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "data/" + pg.file + ".js";
      s.onload = () => { DATA[pg.page] = window.SETS || []; window.SETS = undefined; resolve(); };
      s.onerror = () => reject(new Error("Could not load " + s.src));
      document.head.appendChild(s);
    });
  }
  async function loadFor(ids) {
    for (const pg of PAGES) {     // one at a time: every data file sets window.SETS
      if (!pg.file) continue;
      const wanted = pg.own ? ids.indexOf("pg:" + pg.page) >= 0
        : !TAGS[pg.page] || Object.keys(SCHEME[pg.scheme]).some((ch) => ids.indexOf(SCHEME[pg.scheme][ch]) >= 0 && TAGS[pg.page].indexOf(ch) >= 0);
      if (!wanted) continue;
      await loadOne(pg);
    }
  }

  /* ---------- single questions ---------- */
  function sentences(text) {
    const out = [];
    let start = 0;
    for (let k = 0; k < text.length; k++) {
      if (text[k] !== " ") continue;
      if (/[.!?]["'”’)]?$/.test(text.slice(Math.max(0, k - 2), k)) && /["'“‘(\[A-Z]/.test(text[k + 1] || "")) { out.push(text.slice(start, k)); start = k + 1; }
    }
    out.push(text.slice(start));
    return out;
  }
  /* A gap from a cloze text, shown in its own sentence (with the sentence before it when the gap needs it). */
  function clozeItem(pg, EX, n, id) {
    const g = EX.gaps[n], mark = "[" + n + "]";
    const para = EX.text.trim().split(/\n\s*\n/).map((p) => p.replace(/\s+/g, " ").trim()).find((p) => p.indexOf(mark) >= 0);
    const parts = sentences(para);
    const k = parts.findIndex((p) => p.indexOf(mark) >= 0);
    let s = parts[k];
    const early = s.indexOf(mark) < 12;
    if (k > 0 && (early || id === "linker" || id === "pron" || id === "wf-neg" || s.length < 60)) s = parts[k - 1] + " " + s;
    s = s.replace(/\[(\d+)\]/g, (m, d) => {
      if (Number(d) === n) return "___";
      const o = EX.gaps[d];
      return o ? (o.options ? o.options[o.answer] : o.answers[0]) : m;
    });
    const it = { s: s, explain: g.explain };
    if (g.options) { it.options = g.options; it.answer = g.answer; } else it.answers = g.answers;
    if (g.stem) it.stem = g.stem;
    return it;
  }
  function makeItem(c) {
    const pg = c.pg, EX = DATA[pg.page][c.set];
    let it;
    if (EX.gaps) {
      const n = Object.keys(EX.gaps).map(Number).filter((x) => x > 0).sort((a, b) => a - b)[c.i];
      it = clozeItem(pg, EX, n, c.id);
      it.task = TASK[pg.scheme];
    } else if (EX.type === "kwt") {
      it = Object.assign({ kind: "kwt" }, EX.items[c.i]);
      it.task = pg.task;
    } else {
      const src = EX.items[c.i];
      it = Object.assign({}, src);
      it.task = EX.intro || "Complete the sentence.";
      if (EX.bank && !src.options) {   // word-bank sets: the right word and three others from the box
        const others = shuffle(EX.bank.filter((w) => src.answers.indexOf(w) < 0)).slice(0, 3);
        it.options = [src.answers[0]].concat(others); it.answer = 0; delete it.answers;
        it.task = "Choose the word that completes the sentence.";
      }
    }
    it.seed = 1 + Math.floor(Math.random() * 100000);
    it.ref = { pageKey: store.key(pg.page), set: c.set, i: c.i };
    it.source = '<span class="src">' + esc(SKILLS[c.id].own ? SKILLS[c.id].g : SKILLS[c.id].name) + ' · from <a href="' + pg.page + ".html#set-" + (c.set + 1) + '">' +
      esc(pg.label) + ", Set " + (c.set + 1) + "</a></span>";
    return it;
  }
  /* Up to SIZE questions for these skills: last answered wrong first, then never tried, then the rest. */
  function choose(ids) {
    const H = store.allHistory(), wrong = [], fresh = [], right = [];
    PAGES.forEach((pg) => {
      const S = DATA[pg.page];
      if (!S) return;
      const hp = H[store.key(pg.page)] || {};
      S.forEach((EX, set) => {
        const count = EX.gaps ? Object.keys(EX.gaps).filter((x) => x !== "0").length : (EX.items || []).length;
        for (let i = 0; i < count; i++) {
          const id = skillOf(pg, set, i);
          if (ids.indexOf(id) < 0) continue;
          const h = hp[set + ":" + i];
          (h ? (h[2] ? right : wrong) : fresh).push({ pg: pg, set: set, i: i, id: id });
        }
      });
    });
    /* Only one gap from any one text: a second gap would show the first one's answer in its sentence. */
    const used = {}, out = [];
    shuffle(wrong).concat(shuffle(fresh), shuffle(right)).forEach((c) => {
      if (out.length >= SIZE) return;
      if (DATA[c.pg.page][c.set].gaps) {
        const k = c.pg.page + ":" + c.set;
        if (used[k]) return;
        used[k] = true;
      }
      out.push(c);
    });
    return out;
  }

  /* ---------- the page ---------- */
  const view = el("div");
  host.appendChild(view);
  let round = 0;

  const pctText = (st) => Math.round((100 * st.right) / st.tried) + "%";
  function row(id, st, focus) {
    const sk = SKILLS[id], li = el("li", { class: "skill" });
    const rated = st && st.tried >= RATED;
    const stat = !st ? '<span class="sk-none">No answers yet</span>'
      : !rated ? '<span class="sk-none">' + st.right + " of " + st.tried + " right · not enough answers yet</span>"
      : '<span class="meter" aria-hidden="true"><i style="width:' + Math.round((100 * st.right) / st.tried) + '%"></i></span><b>' + pctText(st) + "</b><span>" + st.right + " of " + st.tried + " right</span>";
    li.appendChild(el("div", { class: "sk-main" },
      '<div class="sk-name">' + esc((focus && sk.g === "Word formation" ? "Word formation: " : "") + sk.name) + "</div>" +
      (sk.d ? '<div class="sk-desc">' + esc(sk.d) + "</div>" : "") + '<div class="sk-stat">' + stat + "</div>"));
    if (practisable(id)) {
      const b = el("button", { type: "button", class: "secondary small" }, "Practise");
      b.setAttribute("aria-label", "Practise: " + sk.name);
      b.addEventListener("click", () => practise([id]));
      li.appendChild(b);
    } else {
      const nx = nextSet(id);
      if (nx) li.appendChild(el("a", { class: "btn-link", href: nx.href }, esc(nx.text)));
    }
    return li;
  }

  function overview() {
    view.innerHTML = "";
    const data = collect(), stats = data.stats, ids = skillsHere();
    Object.keys(stats).forEach((id) => { if (ids.indexOf(id) < 0) ids.push(id); });
    const weak = ids.filter((id) => stats[id] && stats[id].tried >= RATED && stats[id].right / stats[id].tried < WEAK)
      .sort((a, b) => stats[a].right / stats[a].tried - stats[b].right / stats[b].tried || stats[b].tried - stats[a].tried);
    const focus = weak.slice(0, 3);
    const drill = focus.filter(practisable);
    const all = ids.filter(practisable);

    view.appendChild(el("p", { class: "lead" }, data.total
      ? "Based on the " + data.total + " question" + (data.total === 1 ? "" : "s") + " you have answered on this device. Each skill shows how many of them you got right the last time you tried them."
      : "This page fills in as you do the exercises: it shows which skills you get right and which you miss most. You haven't checked any answers on this device yet."));

    const card = el("div", { class: "card focus" });
    if (focus.length) {
      card.appendChild(el("h3", null, "Your focus areas"));
      const ul = el("ul", { class: "skill-list" });
      focus.forEach((id) => ul.appendChild(row(id, stats[id], true)));
      card.appendChild(ul);
    } else {
      card.appendChild(el("h3", null, data.total ? "No weak spots at the moment" : "Nothing to show yet"));
      card.appendChild(el("p", { class: "small-note" }, data.total
        ? "No skill with at least " + RATED + " answers is below " + Math.round(WEAK * 100) + "% right. You can still practise a mixed set."
        : "Do a few sets, or start with a mixed practice set."));
    }
    if (all.length) {
      const b = el("button", { type: "button", class: "focus-go" }, drill.length ? "Practise my weak spots" : "Practise a mixed set");
      b.addEventListener("click", () => practise(drill.length ? drill : all));
      card.appendChild(b);
    }
    view.appendChild(card);

    view.appendChild(el("h2", null, "All skills"));
    GROUPS.forEach((g) => {
      const mine = ids.filter((id) => SKILLS[id].g === g);
      if (!mine.length) return;
      const c = el("div", { class: "card" });
      c.appendChild(el("h3", null, esc(g)));
      const ul = el("ul", { class: "skill-list" });
      mine.sort((a, b) => {      // rated skills first, weakest at the top
        const ra = stats[a] && stats[a].tried >= RATED, rb = stats[b] && stats[b].tried >= RATED;
        if (ra !== rb) return ra ? -1 : 1;
        return ra ? stats[a].right / stats[a].tried - stats[b].right / stats[b].tried : 0;
      }).forEach((id) => ul.appendChild(row(id, stats[id], false)));
      c.appendChild(ul);
      view.appendChild(c);
    });
  }

  async function practise(ids) {
    view.innerHTML = "";
    view.appendChild(el("p", { class: "lead" }, "Getting your questions ready…"));
    let picked;
    try { await loadFor(ids); picked = choose(ids); }
    catch (e) { view.innerHTML = ""; view.appendChild(el("p", { class: "lead" }, "The questions could not be loaded. Check your connection and try again.")); backLink(); return; }
    view.innerHTML = "";
    backLink();
    const names = ids.length > 3 ? "Mixed practice" : ids.map((id) => SKILLS[id].name).join(", ");
    view.appendChild(el("h2", { class: "practice-title" }, esc(names)));
    if (!picked.length) { view.appendChild(el("p", { class: "lead" }, "There are no questions for this skill yet.")); return; }
    view.appendChild(el("p", { class: "lead" }, "Questions you got wrong last time come first, then ones you haven't tried. Each one says what to do."));
    quiz.build({ type: "mixed", items: picked.map(makeItem) }, view, round++, {
      onNew: () => { window.scrollTo(0, 0); practise(ids); },
      logPart: "Weak spots practice", logTitle: names
    });
    window.scrollTo(0, 0);
  }
  function backLink() {
    const a = el("a", { class: "backlink", href: "#" }, '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6"/></svg><span>Back to my weak spots</span>');
    a.addEventListener("click", (e) => { e.preventDefault(); overview(); window.scrollTo(0, 0); });
    view.appendChild(a);
  }

  overview();
})();
