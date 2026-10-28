"use strict";

const CACHE_NAME = "samika-shell-20261028-2";
const BASE_URL = new URL("./", self.registration.scope).href;
const SHELL_FILES = [
  BASE_URL,
  new URL("index.html", BASE_URL).href,
  new URL("app.js", BASE_URL).href,
  new URL("i18n.js", BASE_URL).href,
  new URL("manifest.webmanifest", BASE_URL).href,
  new URL("icon-192.png", BASE_URL).href,
  new URL("icon-512.png", BASE_URL).href,
  new URL("apple-touch-icon.png", BASE_URL).href,
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL_FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith("samika-shell-") && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin || !url.href.startsWith(BASE_URL)) return;

  event.respondWith((async () => {
    try {
      const response = await fetch(request);
      if (response.ok && response.type === "basic") {
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, response.clone());
        return response;
      }
      const cached = await caches.match(request, { ignoreSearch: true });
      if (cached) return cached;
      if (request.mode === "navigate") return caches.match(new URL("index.html", BASE_URL).href);
      return response;
    } catch {
      const cached = await caches.match(request, { ignoreSearch: true });
      if (cached) return cached;
      if (request.mode === "navigate") return caches.match(new URL("index.html", BASE_URL).href);
      throw new Error("Samika is offline and this file is not cached.");
    }
  })());
});
