/* C1 Prep: saved progress, kept in this browser only (localStorage, keys starting "c1p:").
   - answers in progress for each set, so a reload or a closed tab loses nothing
   - the score of every finished set (done marks on the home page and in the set menu)
   - whether each question was last answered right or wrong (used by "My weak spots")
   Also paints the home pages: progress on the tiles and the "Continue" link. Loaded in <head>, after log.js. */
(function () {
  "use strict";
  const P = "c1p:";
  const read = (k, d) => { try { const v = JSON.parse(localStorage.getItem(P + k)); return v == null ? d : v; } catch (e) { return d; } };
  const write = (k, v) => { try { localStorage.setItem(P + k, JSON.stringify(v)); return true; } catch (e) { return false; } };
  const drop = (k) => { try { localStorage.removeItem(P + k); } catch (e) {} };
  const keys = (prefix) => {
    const out = [];
    try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && k.indexOf(P + prefix) === 0) out.push(k.slice(P.length)); } } catch (e) {}
    return out;
  };

  const levelName = document.documentElement.getAttribute("data-level") || "";
  const level = (levelName.split(" ")[0] || "C1").toLowerCase();          // a2, b1, b2, c1, c2
  const page = (location.pathname.split("/").pop() || "").replace(/\.html?$/, "") || "index";
  const key = (pg) => level + "/" + pg;

  const store = {
    level, levelName, page, key,

    /* ----- answers in progress: {v: values, c: checked?, t: time, a: answered, of: total, l: page label, s: set label} ----- */
    getDraft(pageKey, set) { return read("d:" + pageKey + ":" + set, null); },
    saveDraft(pageKey, set, d) { d.t = Date.now(); write("d:" + pageKey + ":" + set, d); },
    dropDraft(pageKey, set) { drop("d:" + pageKey + ":" + set); },
    drafts(prefix) {
      return keys("d:" + prefix).map((k) => {
        const d = read(k, null); if (!d) return null;
        const m = k.match(/^d:(.*):(\d+)$/); if (!m) return null;
        d.pageKey = m[1]; d.set = Number(m[2]);
        return d;
      }).filter(Boolean);
    },

    /* ----- finished sets: { pageKey: { n: number of sets, s: { set: [last, max, best, tries, time, signature] } } } ----- */
    allResults() { return read("r", {}); },
    results(pageKey) { return read("r", {})[pageKey] || { s: {} }; },
    setCount(pageKey, n) {
      const R = read("r", {});
      const pg = R[pageKey] || (R[pageKey] = { s: {} });
      if (pg.n === n) return;
      pg.n = n; write("r", R);
    },

    /* ----- questions: { pageKey: { "set:position": [times right, times wrong, last answer right? 1 : 0] } } ----- */
    allHistory() { return read("h", {}); },

    /* A finished set. `sig` identifies the set's answer key: if the set has been rewritten since the last attempt,
       the old answers to it are forgotten. `per` is [{i, ok}] for every question (i = its position in the set). */
    record(pageKey, set, sig, score, max, per) {
      const R = read("r", {}), H = read("h", {});
      const pg = R[pageKey] || (R[pageKey] = { s: {} });
      const hp = H[pageKey] || (H[pageKey] = {});
      const old = pg.s[set];
      const same = !!old && old[5] === sig;
      if (old && !same) Object.keys(hp).forEach((k) => { if (k.split(":")[0] === String(set)) delete hp[k]; });
      pg.s[set] = [score, max, same ? Math.max(old[2], score) : score, same ? old[3] + 1 : 1, Date.now(), sig];
      per.forEach((p) => {
        const k = set + ":" + p.i, a = hp[k] || [0, 0, 0];
        if (p.ok) a[0]++; else a[1]++;
        a[2] = p.ok ? 1 : 0;
        hp[k] = a;
      });
      write("r", R); write("h", H);
    },
    /* Single questions answered again in a practice set: [{pageKey, set, i, ok}]. */
    recordItems(list) {
      const H = read("h", {});
      list.forEach((p) => {
        const hp = H[p.pageKey] || (H[p.pageKey] = {});
        const k = p.set + ":" + p.i, a = hp[k] || [0, 0, 0];
        if (p.ok) a[0]++; else a[1]++;
        a[2] = p.ok ? 1 : 0;
        hp[k] = a;
      });
      write("h", H);
    },

    /* ----- the set finished most recently at this level: {page, set, n, l} ----- */
    getLast() { return read("last:" + level, null); },
    setLast(v) { write("last:" + level, v); },

    /* ----- exam mode: the paper in progress, and the list of finished papers ----- */
    getExam() { return read("x:" + level, null); },
    saveExam(v) { write("x:" + level, v); },
    dropExam() { drop("x:" + level); },
    examLog() { return read("xl:" + level, []); },
    addExam(v) { const l = read("xl:" + level, []); l.push(v); write("xl:" + level, l.slice(-20)); return l.length; }
  };
  window.c1Store = store;

  /* ---------- home pages ---------- */
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function paintTiles() {
    const R = store.allResults();
    document.querySelectorAll(".grid a.tile").forEach((a) => {
      const m = (a.getAttribute("href") || "").match(/^([\w-]+)\.html$/);
      if (!m) return;
      const pg = R[key(m[1])];
      if (!pg) return;
      const sets = Object.keys(pg.s).filter((i) => !pg.n || Number(i) < pg.n);
      if (!sets.length) return;
      let got = 0, max = 0;
      sets.forEach((i) => { got += pg.s[i][0]; max += pg.s[i][1]; });
      const all = pg.n && sets.length >= pg.n;
      const box = document.createElement("div");
      box.className = "tile-progress" + (all ? " all" : "");
      const pct = pg.n ? Math.round((100 * sets.length) / pg.n) : 100;
      box.innerHTML =
        (pg.n ? '<span class="meter" aria-hidden="true"><i style="width:' + pct + '%"></i></span>' : "") +
        "<span>" + (all ? "All " + pg.n + " sets done" : sets.length + (pg.n ? " of " + pg.n : "") + (sets.length === 1 && !pg.n ? " set done" : " sets done")) +
        (max ? " · " + Math.round((100 * got) / max) + "% right" : "") + "</span>";
      a.appendChild(box);
    });
  }

  function paintContinue() {
    const anchor = document.querySelector(".wrap > .hello") || document.querySelector(".wrap > .lead");
    if (!anchor) return;
    let href = "", kind = "", title = "", sub = "";

    const exam = store.getExam();
    const drafts = store.drafts(level + "/").filter((d) => !d.c && d.a > 0 && d.l).sort((a, b) => b.t - a.t);
    const last = store.getLast();
    if (exam && exam.end > Date.now() && document.querySelector('a.tile[href="exam.html"]')) {
      href = "exam.html"; kind = "Exam in progress"; title = "Reading and Use of English paper";
      sub = Math.max(1, Math.round((exam.end - Date.now()) / 60000)) + " min left";
    } else if (drafts.length) {
      const d = drafts[0];
      href = d.pageKey.split("/")[1] + ".html#set-" + (d.set + 1);
      kind = "Continue"; title = d.l + (d.s ? " · " + d.s : ""); sub = d.a + " of " + d.of + " answered";
    } else if (last && last.set + 1 < last.n) {
      const done = store.results(key(last.page)).s;
      if (done[last.set + 1]) return;
      href = last.page + ".html#set-" + (last.set + 2);
      kind = "Next"; title = last.l + " · Set " + (last.set + 2); sub = "";
    } else return;

    const a = document.createElement("a");
    a.className = "continue";
    a.href = href;
    a.innerHTML = '<span class="c-k">' + esc(kind) + '</span><span class="c-t">' + esc(title) + "</span>" + (sub ? '<span class="c-s">' + esc(sub) + "</span>" : "");
    anchor.after(a);
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("exercise") || !document.querySelector(".grid a.tile")) return;
    paintTiles();
    paintContinue();
  });
  // Coming back with the browser's Back button: show the progress just made.
  window.addEventListener("pageshow", (e) => {
    if (!e.persisted || document.getElementById("exercise")) return;
    document.querySelectorAll(".tile-progress, a.continue").forEach((n) => n.remove());
    paintTiles(); paintContinue();
  });
})();
