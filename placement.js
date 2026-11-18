/* C1 Prep: level test (placement.html).
   Six parts of 8 questions, one per level from A1 to C2, each harder than the last. A part with 6 or more
   right opens the next one; the test ends at the first part with fewer, and suggests that part's level
   (C2 when every part is passed). Nothing is sent anywhere: the result stays in this browser. */
(function () {
  "use strict";
  const KEY = "c1prep-placement";
  const PASS = 6;
  const LEVELS = [
    { code: "a1", name: "A1 Beginner", href: "a1/" },
    { code: "a2", name: "A2 Elementary", href: "a2/" },
    { code: "b1", name: "B1 Intermediate", href: "b1/" },
    { code: "b2", name: "B2 First", href: "b2/" },
    { code: "c1", name: "C1 Advanced", href: "c1.html" },
    { code: "c2", name: "C2 Proficiency", href: "c2/" },
  ];

  /* s: the sentence (___ is the gap); o: the options, the right one first (they are mixed on screen); e: why. */
  const PARTS = [
    [ // A1
      { s: "My sister ___ a teacher.", o: ["is", "are", "am", "be"], e: "With he, she, it or one person (my sister), use is." },
      { s: "___ you like coffee?", o: ["Do", "Does", "Are", "Is"], e: "Present simple questions with you start with Do: Do you like…?" },
      { s: "There ___ two cats in the garden.", o: ["are", "is", "be", "am"], e: "Two cats is plural, so: there are." },
      { s: "I get up ___ seven o’clock.", o: ["at", "in", "on", "to"], e: "Use at with a time: at seven o’clock." },
      { s: "This is Tom. ___ brother is a doctor.", o: ["His", "He", "Him", "He’s"], e: "His means “belonging to him”: Tom’s brother is his brother." },
      { s: "Peter ___ to work by bus every day.", o: ["goes", "go", "going", "is go"], e: "Present simple with he, she or it adds -s or -es: go → goes." },
      { s: "My father’s mother is my ___.", o: ["grandmother", "aunt", "sister", "daughter"], e: "Your father’s or mother’s mother is your grandmother." },
      { s: "It’s very cold today. Put on your ___.", o: ["coat", "sandals", "shorts", "sunglasses"], e: "A coat keeps you warm when it’s cold." },
    ],
    [ // A2
      { s: "We ___ to the beach last weekend.", o: ["went", "go", "have gone", "were go"], e: "Last weekend is finished time, so use the past simple: go → went." },
      { s: "This book is ___ than the film.", o: ["more interesting", "interestinger", "most interesting", "as interesting"], e: "Long adjectives make the comparative with more: more interesting than." },
      { s: "Look! ___ outside.", o: ["It’s raining", "It rains", "It rain", "It raining"], e: "Look! means it is happening now: present continuous (it is raining)." },
      { s: "There isn’t ___ milk in the fridge.", o: ["any", "some", "many", "a"], e: "Use any in negatives. Milk is uncountable, so not many or a." },
      { s: "You ___ wear a uniform at my school. It’s a rule.", o: ["have to", "has to", "must to", "should to"], e: "have to = it is necessary (a rule). With you it is have to, and must and should have no to." },
      { s: "Have you ever ___ sushi?", o: ["eaten", "ate", "eat", "eating"], e: "Present perfect: have + past participle (eat → ate → eaten)." },
      { s: "I’m going to ___ a photo of the castle.", o: ["take", "make", "do", "play"], e: "In English we take a photo." },
      { s: "My brother is very ___. He always helps people.", o: ["kind", "angry", "lazy", "boring"], e: "Someone who always helps people is kind." },
    ],
    [ // B1
      { s: "I’ve lived in this city ___ 2019.", o: ["since", "for", "from", "ago"], e: "since + a point in time (2019); for + a length of time (for six years)." },
      { s: "If it ___ tomorrow, we’ll stay at home.", o: ["rains", "will rain", "rained", "would rain"], e: "First conditional: if + present simple, then will + verb." },
      { s: "This bridge ___ in 1890.", o: ["was built", "built", "is built", "has built"], e: "The bridge didn’t build anything: it is passive. In the past: was + past participle." },
      { s: "When I was a child, I ___ climb trees in the park.", o: ["used to", "use to", "was used to", "am used to"], e: "used to + verb for past habits that have stopped. be used to means “be accustomed to”." },
      { s: "The woman ___ lives next door is a nurse.", o: ["who", "which", "whose", "what"], e: "Use who (or that) for people in relative clauses." },
      { s: "I’m really looking forward to ___ you.", o: ["seeing", "see", "to see", "saw"], e: "In look forward to, to is a preposition, so the verb takes -ing." },
      { s: "Can you ___ the music down? I’m trying to sleep.", o: ["turn", "put", "take", "get"], e: "turn down = make quieter (turn off = stop completely)." },
      { s: "She ___ her driving test the first time she took it.", o: ["passed", "succeeded", "won", "achieved"], e: "You pass a test or an exam. succeed goes with in: she succeeded in passing." },
    ],
    [ // B2
      { s: "If I ___ about the traffic, I would have left earlier.", o: ["had known", "knew", "have known", "would know"], e: "Third conditional: if + past perfect, would have + past participle." },
      { s: "I wish I ___ so much money last month.", o: ["hadn’t spent", "didn’t spend", "haven’t spent", "wouldn’t spend"], e: "Regrets about the past: wish + past perfect." },
      { s: "By the time we arrived, the film ___.", o: ["had already started", "already started", "has already started", "already starts"], e: "The film started before we arrived: past perfect for the earlier past action." },
      { s: "You ___ told me earlier! Now it’s too late to change the booking.", o: ["should have", "must have", "should", "had to"], e: "should have + past participle criticises something that didn’t happen in the past." },
      { s: "I’m going to ___ my hair cut tomorrow.", o: ["have", "make", "let", "do"], e: "have something done: someone else does it for you (get my hair cut is also correct)." },
      { s: "___ the heavy rain, the match went ahead.", o: ["Despite", "Although", "However", "Even"], e: "Despite + a noun (the heavy rain). Although needs a clause: although it rained heavily." },
      { s: "The company ___ a profit for the first time last year.", o: ["made", "did", "took", "won"], e: "The collocation is make a profit (or a loss)." },
      { s: "It took him months to ___ the death of his dog.", o: ["get over", "give up", "put off", "take after"], e: "get over = recover from something sad or difficult." },
    ],
    [ // C1
      { s: "___ you need any help, just give me a call.", o: ["Should", "Had", "Were", "Would"], e: "Should you need… = If you happen to need… (formal). With Were you would need to: Were you to need…" },
      { s: "It’s high time the government ___ something about the traffic.", o: ["did", "does", "will do", "has done"], e: "It’s high time + past simple, for something that should already be happening." },
      { s: "I’d rather you ___ anyone about this yet.", o: ["didn’t tell", "don’t tell", "won’t tell", "not tell"], e: "would rather + another person + past simple: I’d rather you didn’t…" },
      { s: "___ had she sat down than the phone rang.", o: ["No sooner", "Hardly", "Not only", "Scarcely"], e: "No sooner goes with than. Hardly and scarcely go with when." },
      { s: "___ I need right now is a long holiday.", o: ["What", "That", "Which", "It"], e: "A cleft sentence for emphasis: What I need is… = The thing that I need is…" },
      { s: "Rising sea levels ___ a serious threat to coastal towns.", o: ["pose", "make", "put", "give"], e: "The collocation is pose a threat (or a risk)." },
      { s: "He seemed completely ___ to the danger he was in.", o: ["oblivious", "unaware", "ignorant", "unconscious"], e: "oblivious to. Unaware, ignorant and unconscious all take of." },
      { s: "The police haven’t ___ the possibility that the fire was started deliberately.", o: ["ruled out", "put off", "turned down", "called off"], e: "rule out = decide that something is not possible." },
    ],
    [ // C2
      { s: "___ it not for her quick thinking, the whole project would have failed.", o: ["Were", "Had", "Should", "Was"], e: "Were it not for… = If it weren’t for… (Had it not been for… is also correct, but it needs been)." },
      { s: "Little ___ that his decision would change the company’s history.", o: ["did he know", "he knew", "he did know", "knew he"], e: "A negative word like little at the start of the sentence brings inversion: Little did he know…" },
      { s: "___ as it may seem, the cheapest option turned out to be the best.", o: ["Strange", "Strangely", "However strange", "So strange"], e: "Adjective + as + subject + may… = although it may seem strange." },
      { s: "The two companies are said ___ secret talks for several months.", o: ["to have been holding", "to hold", "having held", "that they held"], e: "be said + perfect continuous infinitive, for something that has been going on until now." },
      { s: "The results were nothing ___ of remarkable.", o: ["short", "less", "other", "more"], e: "nothing short of = really, truly (nothing less than means the same, but it takes than)." },
      { s: "The finished film is a far ___ from the first draft of the script.", o: ["cry", "shout", "call", "way"], e: "a far cry from = very different from." },
      { s: "With exams ___ the offing, students are spending more time in the library.", o: ["in", "on", "at", "off"], e: "in the offing = coming soon." },
      { s: "The talks went on all night; the ___ was that both sides agreed to a pay freeze.", o: ["upshot", "outset", "outlet", "uptake"], e: "the upshot = the final result of a situation." },
    ],
  ];
  const PER = 8;

  const ls = {
    get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function el(tag, attrs, html) {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    return e;
  }
  const reduced = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const when = (t) => new Date(t).toLocaleDateString("en-GB", { day: "numeric", month: "long" });

  // The same mixed order every time for each question.
  function order(n, len) {
    const o = Array.from({ length: len }, (_, k) => k);
    let seed = 7919 + n * 104729;
    const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    for (let i = len - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [o[i], o[j]] = [o[j], o[i]]; }
    return o;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const host = document.getElementById("placement");
    if (!host) return;
    let answers = [];   // answers[part][i] = option index chosen (0 = right)
    let part = 0;
    let prevLink = null;

    function scrollUp() {
      const y = host.getBoundingClientRect().top + window.scrollY - 90;
      if (window.scrollY > y) window.scrollTo({ top: Math.max(0, y), behavior: reduced() ? "auto" : "smooth" });
    }

    /* One question: the sentence with a gap that the chosen option fills, and the options as chips. */
    function question(it, n, chosen, review) {
      const q = el("div", { class: "q sent" });
      const prompt = el("p", { class: "prompt" });
      prompt.appendChild(el("span", { class: "n" }, String(n)));
      const [a, b] = it.s.split("___");
      const line = el("span", { class: "s" });
      line.appendChild(document.createTextNode(a));
      const gap = el("span", { class: "gapwrap" });
      const blank = el("span", { class: "blank" }, "   ");
      gap.appendChild(blank);
      line.appendChild(gap);
      line.appendChild(document.createTextNode(b));
      prompt.appendChild(line);
      q.appendChild(prompt);
      const chips = el("div", { class: "chips", role: "radiogroup", "aria-label": "Options for question " + n });
      order(n, it.o.length).forEach((k) => {
        const lab = el("label");
        lab.innerHTML = '<input type="radio" name="p' + n + '" value="' + k + '"' + (review ? " disabled" : "") + (chosen === k ? " checked" : "") + "><span>" + esc(it.o[k]) + "</span>";
        if (review && k === 0) lab.classList.add("ok");
        if (review && k === chosen && k !== 0) lab.classList.add("bad");
        chips.appendChild(lab);
      });
      const fill = (k) => { blank.textContent = k == null ? "   " : it.o[k]; blank.classList.toggle("filled", k != null); };
      fill(chosen);
      q.appendChild(chips);
      if (review) {
        blank.classList.add(chosen === 0 ? "ok" : "bad");
        q.appendChild(el("div", { class: "explain" }, "<b>Answer:</b> " + esc(it.o[0]) + "<br>" + esc(it.e)));
        q.classList.add("checked");
      } else {
        chips.addEventListener("change", () => {
          const sel = chips.querySelector("input:checked");
          fill(sel ? Number(sel.value) : null);
          onChange();
        });
      }
      return q;
    }

    let onChange = () => {};

    function showPart() {
      host.innerHTML = "";
      const head = el("div", { class: "place-head" });
      head.appendChild(el("span", null, "<b>Part " + (part + 1) + "</b> of " + PARTS.length));
      head.appendChild(el("span", null, part === 0 ? "Each part is a little harder" : "Well done. This part is harder"));
      host.appendChild(head);
      const steps = el("div", { class: "place-steps", "aria-hidden": "true" });
      PARTS.forEach((_, i) => steps.appendChild(el("i", { class: i < part ? "done" : i === part ? "now" : "" })));
      host.appendChild(steps);

      const card = el("div", { class: "card sentences place-part" });
      const mine = answers[part] = answers[part] || [];
      PARTS[part].forEach((it, i) => card.appendChild(question(it, part * PER + i + 1, mine[i], false)));
      host.appendChild(card);

      const foot = el("div", { class: "place-next" });
      const count = el("span", { class: "place-count", "aria-live": "polite" });
      const btn = el("button", { type: "button" }, part === PARTS.length - 1 ? "See my result" : "Next part");
      foot.append(count, btn);
      host.appendChild(foot);

      const read = () => {
        card.querySelectorAll(".q").forEach((q, i) => {
          const sel = q.querySelector("input:checked");
          mine[i] = sel ? Number(sel.value) : undefined;
        });
        return PARTS[part].filter((_, i) => mine[i] != null).length;
      };
      const paint = () => {
        count.classList.remove("bad");
        count.textContent = read() + " of " + PER + " answered";
      };
      onChange = paint;
      paint();
      btn.addEventListener("click", () => {
        const done = read();
        if (done < PER) {
          count.classList.add("bad");
          count.textContent = "Answer every question to go on (" + (PER - done) + " left)";
          const first = Array.from(card.querySelectorAll(".q")).find((q, i) => mine[i] == null);
          if (first) { first.scrollIntoView({ block: "center", behavior: reduced() ? "auto" : "smooth" }); const r = first.querySelector("input"); if (r) r.focus({ preventScroll: true }); }
          return;
        }
        const right = mine.filter((k) => k === 0).length;
        if (right >= PASS && part < PARTS.length - 1) { part++; showPart(); scrollUp(); }
        else finish();
      });
    }

    function finish() {
      const scores = answers.map((a) => a.filter((k) => k === 0).length);
      const last = scores.length - 1;
      const passedAll = scores[last] >= PASS;       // only possible after the last part
      const idx = passedAll ? LEVELS.length - 1 : last;
      const lv = LEVELS[idx];
      ls.set(KEY, { code: lv.code, at: Date.now(), scores: scores });
      if (prevLink) { prevLink.remove(); prevLink = null; }

      host.innerHTML = "";
      const card = el("div", { class: "card place-result" });
      card.appendChild(el("p", { class: "kicker" }, "Your result"));
      card.appendChild(el("h2", null, "Start with " + esc(lv.name)));
      let why;
      if (passedAll) why = "You did well in every part, even the hardest one. " + esc(lv.name) + " is the level for you.";
      else if (last === 0) why = "Part 1 was hard for you, so " + esc(lv.name) + " is the best place to start. Every A1 grammar page has a short guide.";
      else why = "You did well up to " + esc(LEVELS[last - 1].name) + ". Part " + (last + 1) + " was harder, so " + esc(lv.name) + " is the right level to practise now.";
      card.appendChild(el("p", null, why));
      const acts = el("div", { class: "cta-actions" });
      acts.appendChild(el("a", { class: "btn", href: lv.href }, "Go to " + esc(lv.name)));
      const again = el("button", { type: "button", class: "secondary" }, "Take the test again");
      again.addEventListener("click", () => { answers = []; part = 0; showPart(); scrollUp(); });
      acts.appendChild(again);
      card.appendChild(acts);
      if (!passedAll && last > 0 && scores[last] <= 3) {
        const lower = LEVELS[last - 1];
        card.appendChild(el("p", { class: "small-note" }, "Finding it too hard? Try <a href=\"" + lower.href + "\">" + esc(lower.name) + "</a> first."));
      }
      const list = el("ul", { class: "place-break" });
      PARTS.forEach((_, i) => {
        const s = scores[i];
        const li = el("li", { class: s == null ? "skip" : s >= PASS ? "pass" : "stop" });
        li.appendChild(el("span", null, "Part " + (i + 1) + " · " + esc(LEVELS[i].name)));
        li.appendChild(el("span", { class: "pts" }, s == null ? "Not needed" : s + " of " + PER));
        list.appendChild(li);
      });
      card.appendChild(list);
      card.appendChild(el("p", { class: "small-note" }, "A short test like this gives a rough guide, not an official level. If the exercises feel too easy or too hard, move up or down a level."));
      host.appendChild(card);

      host.appendChild(el("h2", null, "Your answers"));
      const rev = el("div", { class: "card sentences place-review" });
      answers.forEach((a, p) => PARTS[p].forEach((it, i) => rev.appendChild(question(it, p * PER + i + 1, a[i], true))));
      host.appendChild(rev);
      scrollUp();
    }

    // A result from before: a link to that level above the test.
    const saved = ls.get(KEY);
    const prevLv = saved && LEVELS.find((l) => l.code === saved.code);
    if (prevLv) {
      prevLink = el("a", { class: "continue", href: prevLv.href },
        '<span class="c-k">Last result</span><span class="c-t">' + esc(prevLv.name) + '</span><span class="c-s">' + esc(when(saved.at)) + "</span>");
      host.before(prevLink);
    }
    showPart();
  });
})();
