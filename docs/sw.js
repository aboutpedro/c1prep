/* The old address's offline helper, replaced: it removes its saved copies and itself, so the old pages always
   forward to futureperfectenglish.com. Written by generator/moving.py. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.map((k) => caches.delete(k))))
    .then(() => self.registration.unregister()));
});
