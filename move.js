/* C1 Prep: "Move my progress" (progress.html at every level).
   Saved progress lives in one browser only (localStorage keys starting "c1p:", see progress.js), plus the student's
   name (log.js). This page packs all of it into a link, so a student can carry on from another phone or computer:
     code = "C1P1." + base64url(deflate-raw(JSON))   or "C1P1j." + base64url(JSON) where the browser can't compress
     link = this page + "#code=" + code
   Adding a code never deletes anything: it is merged with what is already saved here, and adding the same code
   twice changes nothing the second time. Nothing is sent anywhere. */
(function () {
  "use strict";
  const P = "c1p:", NAME_KEY = "c1prep-name";
  const host = document.getElementById("move");
  if (!host) return;

  /* ---------- storage ---------- */
  const ls = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } }
  };
  function collect() {
    const d = {};
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (!k || k.indexOf(P) !== 0) continue;
        try { d[k.slice(P.length)] = JSON.parse(localStorage.getItem(k)); } catch (e) {}
      }
    } catch (e) {}
    return d;
  }
  const getName = () => (ls.get(NAME_KEY) || "").trim();

  /* ---------- packing ---------- */
  const enc = new TextEncoder(), dec = new TextDecoder();
  function b64(bytes) {
    let s = "";
    for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  function unb64(s) {
    s = s.replace(/-/g, "+").replace(/_/g, "/");
    while (s.length % 4) s += "=";
    const bin = atob(s), out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }
  const through = (bytes, stream) => new Response(new Blob([bytes]).stream().pipeThrough(stream)).arrayBuffer().then((b) => new Uint8Array(b));

  async function pack(bundle) {
    const raw = enc.encode(JSON.stringify(bundle));
    if (typeof CompressionStream === "function") {
      try { return "C1P1." + b64(await through(raw, new CompressionStream("deflate-raw"))); } catch (e) {}
    }
    return "C1P1j." + b64(raw);
  }
  /* The code out of whatever was pasted: the whole link, the code alone, with spaces or line breaks. */
  function findCode(text) {
    const t = String(text || "").replace(/\s+/g, "");
    const m = t.match(/C1P1j?\.[A-Za-z0-9_-]+/);
    return m ? m[0] : "";
  }
  async function unpack(code) {
    const z = code.indexOf("C1P1.") === 0, body = code.slice(z ? 5 : 6);
    let bytes;
    try { bytes = unb64(body); } catch (e) { throw new Error("bad"); }
    if (z) {
      if (typeof DecompressionStream !== "function") throw new Error("old");
      try { bytes = await through(bytes, new DecompressionStream("deflate-raw")); } catch (e) { throw new Error("bad"); }
    }
    let b;
    try { b = JSON.parse(dec.decode(bytes)); } catch (e) { throw new Error("bad"); }
    if (!b || b.v !== 1 || typeof b.d !== "object" || !b.d) throw new Error("bad");
    return b;
  }

  /* ---------- merging ---------- */
  const isObj = (o) => o && typeof o === "object" && !Array.isArray(o);
  function merge(L, I) {
    const M = Object.assign({}, L);
    const now = Date.now();
    const copy = (o) => JSON.parse(JSON.stringify(o));
    /* Finished sets: { pageKey: { n, s: { set: [last, max, best, tries, time, signature] } } }.
       mode["pageKey|set"] says whose answers to trust for that set:
         inc / loc   same answer key on both devices; the incoming / local attempt is the newer one
         incOnly     the set was rewritten between the attempts and the incoming one is newer: its answers replace ours
         locOnly     the same, but ours is newer: the incoming answers are left out */
    const rL = isObj(L.r) ? L.r : {}, rI = isObj(I.r) ? I.r : {};
    const rM = copy(rL), mode = {};
    Object.keys(rI).forEach((pk) => {
      const b = rI[pk];
      if (!isObj(b) || !isObj(b.s)) return;
      const a = isObj(rM[pk]) ? rM[pk] : (rM[pk] = { s: {} });
      if (!isObj(a.s)) a.s = {};
      if (!a.n && b.n) a.n = b.n;
      Object.keys(b.s).forEach((set) => {
        const x = a.s[set], y = b.s[set], id = pk + "|" + set;
        if (!Array.isArray(y)) return;
        if (!Array.isArray(x)) { a.s[set] = y.slice(); mode[id] = "inc"; return; }
        const incNewer = (y[4] || 0) > (x[4] || 0), newer = incNewer ? y : x;
        if (x[5] === y[5]) {
          a.s[set] = [newer[0], newer[1], Math.max(x[2], y[2]), Math.max(x[3], y[3]), newer[4], newer[5]];
          mode[id] = incNewer ? "inc" : "loc";
        } else {
          a.s[set] = newer.slice();
          mode[id] = incNewer ? "incOnly" : "locOnly";
        }
      });
    });
    if (Object.keys(rM).length) M.r = rM;
    /* Questions: { pageKey: { "set:position": [times right, times wrong, last answer right] } }.
       Counts take the larger of the two (so adding the same link twice counts nothing twice); "last answer right"
       comes from the newer attempt. */
    const hL = isObj(L.h) ? L.h : {}, hI = isObj(I.h) ? I.h : {};
    const hM = copy(hL);
    Object.keys(hI).forEach((pk) => {
      const b = hI[pk];
      if (!isObj(b)) return;
      const a = isObj(hM[pk]) ? hM[pk] : (hM[pk] = {});
      Object.keys(a).forEach((k) => { if (mode[pk + "|" + k.split(":")[0]] === "incOnly") delete a[k]; });
      Object.keys(b).forEach((k) => {
        const y = b[k], m = mode[pk + "|" + k.split(":")[0]];
        if (!Array.isArray(y) || m === "locOnly") return;
        const x = a[k];
        if (!Array.isArray(x)) { a[k] = y.slice(); return; }
        const incNewer = m ? (m === "inc" || m === "incOnly") : (y[0] + y[1]) > (x[0] + x[1]);
        a[k] = [Math.max(x[0], y[0]), Math.max(x[1], y[1]), incNewer ? y[2] : x[2]];
      });
    });
    if (Object.keys(hM).length) M.h = hM;
    /* Everything else. */
    Object.keys(I).forEach((k) => {
      if (k === "r" || k === "h") return;
      const y = I[k], x = L[k];
      if (k.indexOf("d:") === 0) {                       // answers in progress: the newer one
        if (!x || (y && (y.t || 0) > (x.t || 0))) M[k] = y;
      } else if (k.indexOf("x:") === 0) {                // an exam paper in progress: one that hasn't run out
        const live = (e) => e && e.end > now;
        if (!live(x) && live(y)) M[k] = y;
      } else if (k.indexOf("xl:") === 0) {               // finished exam papers: both lists, no repeats
        const seen = {}, out = [];
        [].concat(Array.isArray(x) ? x : [], Array.isArray(y) ? y : []).forEach((e) => {
          const s = JSON.stringify(e);
          if (!seen[s]) { seen[s] = 1; out.push(e); }
        });
        out.sort((p, q) => ((p && p.at) || 0) - ((q && q.at) || 0));
        M[k] = out.slice(-20);
      } else if (x === undefined) {                      // anything else (the last set done…): keep ours if we have one
        M[k] = y;
      }
    });
    return M;
  }

  /* ---------- what a set of progress holds ---------- */
  const ORDER = ["a1", "a2", "b1", "b2", "c1", "c2"];
  function summary(d) {
    let sets = 0, qs = 0;
    const lv = {};
    if (isObj(d.r)) Object.keys(d.r).forEach((pk) => {
      const pg = d.r[pk];
      if (!isObj(pg) || !isObj(pg.s)) return;
      const n = Object.keys(pg.s).filter((i) => !pg.n || Number(i) < pg.n).length;
      if (n) { sets += n; lv[pk.split("/")[0]] = 1; }
    });
    if (isObj(d.h)) Object.keys(d.h).forEach((pk) => {
      const n = isObj(d.h[pk]) ? Object.keys(d.h[pk]).length : 0;
      if (n) { qs += n; lv[pk.split("/")[0]] = 1; }
    });
    const levels = ORDER.filter((l) => lv[l]).map((l) => l.toUpperCase());
    return { sets, qs, levels };
  }
  const plural = (n, one, many) => n + " " + (n === 1 ? one : many);
  function describe(s) {
    if (!s.sets && !s.qs) return "";
    return plural(s.sets, "set", "sets") + " done · " + plural(s.qs, "question", "questions") + " answered" +
      (s.levels.length ? " (" + s.levels.join(", ") + ")" : "");
  }
  const when = (t) => {
    try { return new Date(t).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }); }
    catch (e) { return ""; }
  };

  /* ---------- page ---------- */
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function toast(msg) {
    const t = document.createElement("div");
    t.className = "toast";
    t.setAttribute("role", "status");
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.classList.add("out"), 2600);
    setTimeout(() => t.remove(), 3100);
  }
  async function copy(text) {
    try { await navigator.clipboard.writeText(text); return true; } catch (e) {}
    const ta = document.createElement("textarea");
    ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (e) {}
    ta.remove();
    return ok;
  }
  const canShare = typeof navigator.share === "function";
  const pageUrl = () => location.href.split("#")[0];

  host.innerHTML =
    '<p class="lead">Your answers and scores are saved on this phone or computer only. To carry on somewhere else, send your progress to your other device and open it there.</p>' +
    '<section class="card move-in" id="move-in" hidden>' +
      '<h2>Add progress from another device</h2>' +
      '<p class="move-from" id="move-from"></p>' +
      '<div class="move-actions"><button type="button" id="move-add">Add to this device</button></div>' +
      '<p class="move-msg" id="move-in-msg" role="status"></p>' +
    "</section>" +
    '<section class="card">' +
      '<h2>Send your progress</h2>' +
      '<p id="move-here"></p>' +
      '<div class="move-actions">' +
        (canShare ? '<button type="button" id="move-share">Send to my other device</button>' : "") +
        '<button type="button" id="move-copy"' + (canShare ? ' class="secondary"' : "") + ">Copy link</button>" +
      "</div>" +
      '<p class="small-note">Open the link on your other phone or computer. Anyone with the link can see your scores, so only send it to yourself.</p>' +
    "</section>" +
    '<section class="card">' +
      '<h2>Paste a link</h2>' +
      '<p>Got a link from your other device? Paste it here.</p>' +
      '<label class="sr-only" for="move-paste">Link from your other device</label>' +
      '<textarea id="move-paste" class="code-in" rows="3" spellcheck="false" autocomplete="off" autocapitalize="off" placeholder="Paste the link here"></textarea>' +
      '<div class="move-actions"><button type="button" id="move-paste-add">Add to this device</button></div>' +
      '<p class="move-msg" id="move-paste-msg" role="status"></p>' +
    "</section>";

  const here = document.getElementById("move-here");
  function paintHere() {
    const s = describe(summary(collect()));
    here.textContent = s ? "On this device: " + s + "." : "Nothing is saved on this device yet. Do a few sets first.";
    const has = !!s;
    ["move-share", "move-copy"].forEach((id) => { const b = document.getElementById(id); if (b) b.disabled = !has; });
  }
  paintHere();

  async function link() {
    const bundle = { v: 1, t: Date.now(), n: getName(), d: collect() };
    return pageUrl() + "#code=" + (await pack(bundle));
  }
  const bShare = document.getElementById("move-share"), bCopy = document.getElementById("move-copy");
  if (bShare) bShare.addEventListener("click", async () => {
    const url = await link();
    try { await navigator.share({ title: "My progress", text: "My English practice progress", url: url }); }
    catch (e) { if (e && e.name !== "AbortError") { if (await copy(url)) toast("Link copied"); } }
  });
  bCopy.addEventListener("click", async () => {
    toast((await copy(await link())) ? "Link copied. Now open it on your other device." : "Couldn’t copy. Try again.");
  });

  /* Adding: shows the result under the button that was pressed. */
  async function add(code, msg, btn) {
    msg.className = "move-msg"; msg.textContent = "";
    if (!code) { msg.classList.add("bad"); msg.textContent = "That doesn’t look like a progress link. Copy the whole link again and paste it here."; return false; }
    let b;
    try { b = await unpack(code); }
    catch (e) {
      msg.classList.add("bad");
      msg.textContent = e.message === "old"
        ? "This browser is too old to open the link. Update it, or open the link in another browser."
        : "That link is incomplete or broken. Copy the whole link again and paste it here.";
      return false;
    }
    const L = collect(), before = summary(L);
    const M = merge(L, b.d);
    let ok = true;
    Object.keys(M).forEach((k) => {
      if (JSON.stringify(M[k]) !== JSON.stringify(L[k])) ok = ls.set(P + k, JSON.stringify(M[k])) && ok;
    });
    let named = "";
    if (b.n && !getName()) { ls.set(NAME_KEY, b.n); named = b.n; }
    if (!ok) { msg.classList.add("bad"); msg.textContent = "There isn’t enough space in this browser to save everything."; return false; }
    const after = summary(collect());
    const newSets = after.sets - before.sets, newQs = after.qs - before.qs;
    msg.classList.add("ok");
    msg.innerHTML = esc(newSets || newQs
      ? "Done! Added " + plural(newSets, "set", "sets") + " and " + plural(newQs, "question", "questions") + ". This device now has " + describe(after) + "."
      : "Done! This device already had all of that progress.") +
      (named ? " Your name (" + esc(named) + ") was added too." : "") +
      ' <a href="' + (document.documentElement.hasAttribute("data-level") ? "./" : "c1.html") + '">Go to the exercises</a>';
    if (btn) btn.disabled = true;
    paintHere();
    return true;
  }

  /* Opened from a link: say what it holds, and add it when asked. */
  const fromHash = findCode(decodeURIComponent(location.hash || ""));
  if (fromHash) {
    const box = document.getElementById("move-in"), from = document.getElementById("move-from");
    const bAdd = document.getElementById("move-add"), msg = document.getElementById("move-in-msg");
    box.hidden = false;
    unpack(fromHash).then((b) => {
      const s = describe(summary(b.d));
      from.textContent = "This link has progress from your other device" + (b.n ? " (" + b.n + ")" : "") +
        (b.t ? ", saved " + when(b.t) : "") + ": " + (s || "nothing saved yet") + ".";
    }).catch((e) => {
      from.textContent = e.message === "old"
        ? "This browser is too old to open the link. Update it, or open the link in another browser."
        : "This link is incomplete or broken. Copy the whole link again on your other device.";
      bAdd.disabled = true;
    });
    bAdd.addEventListener("click", async () => {
      if (await add(fromHash, msg, bAdd)) {
        try { history.replaceState(null, "", pageUrl()); } catch (e) {}
      }
    });
  }
  const paste = document.getElementById("move-paste");
  document.getElementById("move-paste-add").addEventListener("click", async () => {
    if (await add(findCode(paste.value), document.getElementById("move-paste-msg"), null)) paste.value = "";
  });

  window.c1Move = { pack, unpack, merge, summary, collect, findCode };
})();
