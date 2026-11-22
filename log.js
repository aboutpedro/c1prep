/* Future Perfect English: class mode, and the problem reports (window.c1Report). Pedro's students join once per device with the class link (class.html), which saves their
   name; only then are finished sets sent to the teacher's results sheet. Everyone else is never asked for a name
   and nothing is sent. Students who typed a name before class mode existed simply stay in the class. */
(function () {
  "use strict";
  const ENDPOINT = "https://script.google.com/macros/s/AKfycbwuvbTw5zPsGFrT2ouLKdMJxhaNGn3Gim2-yS_Q-_LXWK8skkK0uVeUgOUG8HUPnjw/exec";
  const SITE_KEY = "c1prep-2026";
  const NAME_KEY = "c1prep-name";
  const QUEUE_KEY = "c1prep-queue";
  // log.js lives at the site root, next to the privacy page.
  const PRIVACY = new URL("privacy.html", document.currentScript ? document.currentScript.src : location.href).href;

  const ls = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  const getName = () => (ls.get(NAME_KEY) || "").trim();
  const inClass = () => !!getName();
  window.c1InClass = inClass;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- toast ---------- */
  function toast(msg, kind) {
    const t = document.createElement("div");
    t.className = "toast" + (kind ? " " + kind : "");
    t.setAttribute("role", "status");
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.classList.add("out"), 2600);
    setTimeout(() => t.remove(), 3100);
  }

  /* ---------- name dialog ---------- */
  function askName(onDone) {
    if (document.querySelector(".name-modal")) return;
    const wrap = document.createElement("div");
    wrap.className = "name-modal";
    wrap.innerHTML =
      '<form class="name-card" role="dialog" aria-modal="true" aria-labelledby="nm-title">' +
      '<h2 id="nm-title">What’s your name?</h2>' +
      '<p>Your teacher will see your results under this name. <a href="' + PRIVACY + '" target="_blank" rel="noopener">Privacy</a></p>' +
      '<label for="nm-input">First and last name</label>' +
      '<input id="nm-input" type="text" name="n" maxlength="60" autocomplete="name" required>' +
      '<button type="submit">Let’s start</button></form>';
    document.body.appendChild(wrap);
    const input = wrap.querySelector("input");
    input.value = getName();
    setTimeout(() => input.focus(), 50);
    wrap.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
      const v = input.value.trim().replace(/\s+/g, " ");
      if (v.length < 2) { input.focus(); return; }
      ls.set(NAME_KEY, v);
      wrap.classList.add("out");
      setTimeout(() => wrap.remove(), 250);
      paintNameChips();
      if (onDone) onDone();
    });
  }

  // Kept for the pages that call it: nobody has to give a name any more (class students already have one).
  window.c1RequireName = function () { return true; };

  function paintNameChips() {
    document.querySelectorAll(".name-chip").forEach((chip) => {
      const n = getName();
      chip.innerHTML = n
        ? '<span class="avatar" aria-hidden="true">' + esc(n.charAt(0).toUpperCase()) + '</span><span class="who">' + esc(n) + '</span><span class="edit">change</span>'
        : '<span class="edit">Add your name</span>';
      chip.title = n ? "Change your name" : "Add your name";
    });
    const hello = document.querySelector(".hello");
    if (hello) {
      const n = getName();
      hello.innerHTML = n
        ? "Hi, <b>" + esc(n) + "</b>! Your results go to your teacher automatically. <button type=\"button\" class=\"linkish\">Not you?</button>"
        : "<button type=\"button\" class=\"linkish\">Tell us your name</button> so your teacher can see your results.";
      hello.querySelector("button").onclick = () => askName();
    }
  }

  /* ---------- sending ---------- */
  function readQueue() { try { return JSON.parse(ls.get(QUEUE_KEY) || "[]"); } catch (e) { return []; } }
  function writeQueue(q) { ls.set(QUEUE_KEY, JSON.stringify(q.slice(-30))); }

  async function send(rec) {
    if (ENDPOINT.indexOf("http") !== 0) throw new Error("no endpoint");
    // text/plain keeps this a "simple" request, which Apps Script accepts from any site.
    await fetch(ENDPOINT, { method: "POST", mode: "no-cors", keepalive: true, headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(rec) });
  }

  async function flush() {
    const q = readQueue();
    if (!q.length) return;
    const left = [];
    for (const rec of q) { try { await send(rec); } catch (e) { left.push(rec); } }
    writeQueue(left);
  }

  window.c1Log = async function (r) {
    if (!inClass()) return;                 // not in a class: nothing leaves the browser
    const rec = Object.assign({ key: SITE_KEY, name: getName(), page: location.pathname, at: new Date().toISOString() }, r);
    rec.mistakes = (r.mistakes || []).map((m) => ({ n: m.n, given: m.given, correct: m.correct }));
    try {
      await send(rec);
      toast("✓ Result sent to your teacher", "toast-ok");
    } catch (e) {
      const q = readQueue(); q.push(rec); writeQueue(q);
      toast("Saved. It will be sent when you're back online.", "toast-warn");
    }
  };

  /* ---------- problem reports (anyone; quiz.js puts the link under every set) ----------
     Sends what the person wrote, the page, the set and the question number to the same sheet, with type "report"
     (the Apps Script puts these in the "Reports" tab). The name goes with it only for class students. */
  window.c1Report = function (info) {
    if (document.querySelector(".name-modal")) return;
    info = info || {};
    const wrap = document.createElement("div");
    wrap.className = "name-modal";
    wrap.innerHTML =
      '<form class="name-card report-card" role="dialog" aria-modal="true" aria-labelledby="rp-title">' +
      '<h2 id="rp-title">Report a problem</h2>' +
      '<p>A wrong answer, a typo, something that doesn’t work? Tell us and it will be fixed. Please don’t include personal details. <a href="' + PRIVACY + '" target="_blank" rel="noopener">Privacy</a></p>' +
      '<label for="rp-q">Question number <span class="opt">(optional)</span></label>' +
      '<input id="rp-q" type="text" name="q" maxlength="10" inputmode="numeric" autocomplete="off">' +
      '<label for="rp-msg">What’s wrong?</label>' +
      '<textarea id="rp-msg" name="m" maxlength="1000" rows="4" required></textarea>' +
      '<div class="report-actions"><button type="button" class="secondary" data-close>Cancel</button><button type="submit">Send</button></div></form>';
    document.body.appendChild(wrap);
    const form = wrap.querySelector("form"), msg = wrap.querySelector("#rp-msg");
    const opener = document.activeElement;
    const onKey = (e) => { if (e.key === "Escape") close(); };
    const close = () => {
      document.removeEventListener("keydown", onKey);
      wrap.classList.add("out");
      setTimeout(() => wrap.remove(), 160);
      if (opener && opener.focus) opener.focus();
    };
    setTimeout(() => wrap.querySelector("#rp-q").focus(), 50);
    wrap.querySelector("[data-close]").addEventListener("click", close);
    wrap.addEventListener("click", (e) => { if (e.target === wrap) close(); });
    document.addEventListener("keydown", onKey);
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const text = msg.value.trim();
      if (text.length < 3) { msg.focus(); return; }
      const h1 = document.querySelector("h1"), kicker = document.querySelector(".kicker");
      const rec = {
        key: SITE_KEY, type: "report", page: location.pathname, at: new Date().toISOString(),
        name: inClass() ? getName() : "",
        level: document.documentElement.getAttribute("data-level") || "",
        part: info.part || ((kicker ? kicker.textContent.trim() + " · " : "") + (h1 ? h1.textContent.trim() : "")),
        set: info.set || "", title: info.title || "",
        question: wrap.querySelector("#rp-q").value.trim(), message: text
      };
      close();
      try {
        await send(rec);
        toast("✓ Thank you! Your report was sent.", "toast-ok");
      } catch (err) {
        const q = readQueue(); q.push(rec); writeQueue(q);
        toast("Saved. It will be sent when you're back online.", "toast-warn");
      }
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector("header.site nav");
    const isExercise = !!document.getElementById("exercise");
    if (!inClass()) { flush(); return; }    // (queued problem reports) the name chip and banner are for class students only
    if (nav && isExercise) {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "name-chip";
      chip.addEventListener("click", () => askName());
      nav.insertBefore(chip, nav.firstChild);
    }
    const lead = document.querySelector(".wrap > .lead");
    if (!isExercise && document.querySelector(".grid") && lead) {
      const hello = document.createElement("p");
      hello.className = "hello";
      lead.after(hello);
    }
    paintNameChips();
    flush();
  });
})();
