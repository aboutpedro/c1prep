/* Future Perfect English: offline use (service worker, registered by theme.js). Pages and files you have opened are kept on
   this device, so they still work without internet. Written by generator/sitepages.py.
   - Files with a version in the address (style.css?v=14, data/g1.js?v=2, …) never change: cache first.
   - Pages and everything else: network first, keeping a copy; the copy when offline.
   - Offline, on a page never opened here: offline.html.
   Requests to other sites (the teacher's sheet) are left alone. */
"use strict";
const CACHE = "c1prep-c92b9e86";
const CORE = ["offline.html", "style.css?v=21", "theme.js?v=11", "favicon.svg?v=2", "favicon.ico?v=2", "fp-icon.svg?v=2", "fp-icon.ico?v=2", "manifest.webmanifest", "fonts/inter-latin.woff2?v=1"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k.startsWith("c1prep-") && k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

/* A newer version of a file replaces the older ones (style.css?v=14 replaces ?v=13). */
async function prune(cache, url) {
  const u = new URL(url);
  for (const req of await cache.keys()) {
    const k = new URL(req.url);
    if (k.pathname === u.pathname && k.search !== u.search) await cache.delete(req);
  }
}
async function keep(cache, req, res) {
  if (!res || !res.ok || res.redirected || res.type === "opaqueredirect") return;
  await cache.put(req, res);
  if (new URL(req.url || req).searchParams.has("v")) await prune(cache, req.url || req);
}
async function cacheFirst(req) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  keep(cache, req, res.clone());
  return res;
}
async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetch(req);
    if (res.ok && res.type !== "opaqueredirect") keep(cache, req, res.clone());
    return res;
  } catch (err) {
    const nav = req.mode === "navigate";
    const hit = await cache.match(req, { ignoreSearch: nav });
    if (hit) return hit;
    if (nav) { const off = await cache.match("offline.html"); if (off) return off; }
    throw err;
  }
}
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (/\.(mp3|m4a|ogg|wav)$/i.test(url.pathname)) return;   // recordings stream straight from the network (range requests)
  e.respondWith(url.searchParams.has("v") ? cacheFirst(req) : networkFirst(req));
});

/* The first page a browser opens loads before the worker is running: theme.js then sends its address and files,
   and they are kept here, so that page works offline too. */
self.addEventListener("message", (e) => {
  const d = e.data;
  if (!d || d.type !== "keep" || !Array.isArray(d.urls)) return;
  e.waitUntil(caches.open(CACHE).then(async (cache) => {
    for (const u of d.urls) {
      let url;
      try { url = new URL(u); } catch (err) { continue; }
      if (url.origin !== self.location.origin) continue;
      url.hash = "";
      if (await cache.match(url.href)) continue;
      try { await keep(cache, new Request(url.href), await fetch(url.href)); } catch (err) {}
    }
  }));
});
