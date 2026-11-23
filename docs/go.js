/* c1prep.duckdns.org is now futureperfectenglish.com. Every page here is a small page that loads this script, which
   opens the same page at the new address. Saved progress belongs to one address, so the first time, a browser that
   has some sends it along: it goes through the new site's progress page, which adds it and then opens the page.
   Written by generator/moving.py. */
(function () {
  "use strict";
  var NEW = "https://futureperfectenglish.com";
  var to = location.pathname + location.search + location.hash;
  var go = function (u) { location.replace(u); };
  var d = {}, s = {}, has = false;
  try {
    if (localStorage.getItem("fp-sent")) return go(NEW + to);
    for (var i = 0; i < localStorage.length; i++) {
      var k = localStorage.key(i);
      if (!k) continue;
      if (k.indexOf("c1p:") === 0) { try { d[k.slice(4)] = JSON.parse(localStorage.getItem(k)); has = true; } catch (e) {} }
      else if (/^c1prep-(name|theme|skin|twice|placement|queue)$/.test(k)) s[k] = localStorage.getItem(k);
    }
  } catch (e) { return go(NEW + to); }
  if (!has && !s["c1prep-name"] && !s["c1prep-placement"] && !s["c1prep-queue"]) return go(NEW + to);

  var b64 = function (bytes) {
    var t = "";
    for (var i = 0; i < bytes.length; i += 0x8000) t += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return btoa(t).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  };
  var raw = new TextEncoder().encode(JSON.stringify({ v: 1, t: Date.now(), n: s["c1prep-name"] || "", d: d, s: s }));
  var send = function (code) {
    try { localStorage.setItem("fp-sent", String(Date.now())); } catch (e) {}
    go(NEW + "/progress.html#moved=" + code + "&to=" + encodeURIComponent(to));
  };
  var late = setTimeout(function () { late = 0; send("C1P1j." + b64(raw)); }, 2500);
  var done = function (code) { if (late) { clearTimeout(late); late = 0; send(code); } };
  try {
    if (typeof CompressionStream !== "function") throw 0;
    new Response(new Blob([raw]).stream().pipeThrough(new CompressionStream("deflate-raw"))).arrayBuffer()
      .then(function (buf) { done("C1P1." + b64(new Uint8Array(buf))); }, function () { done("C1P1j." + b64(raw)); });
  } catch (e) { done("C1P1j." + b64(raw)); }
})();
