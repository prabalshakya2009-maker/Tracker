// HabitFlow v2.0 - Enhanced Service Worker
// Cache-first strategy with offline fallback
// Supports asset caching, offline mode, and push notifications

const CACHE_NAME = "habitflow-v2";
const DATA_CACHE_NAME = "habitflow-data-v2";

const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./sw.js",
  "./README.md",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png"
];

// Install
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .catch((err) => console.log("Cache installation partial:", err))
  );
});

// Activate - clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME && name !== DATA_CACHE_NAME)
            .map((name) => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch - cache-first for static assets, network-first for API
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  // For HTML, JSON, JS - use cache-first
  if (
    event.request.url.endsWith(".json") ||
    event.request.url.endsWith(".html") ||
    event.request.url.endsWith(".js") ||
    event.request.mode === "navigate"
  ) {
    event.respondWith(
      caches.match(event.request)
        .then((cached) => {
          if (cached) return cached;
          return fetch(event.request)
            .then((response) => {
              if (response && response.status === 200 && response.type === "basic") {
                const responseClone = response.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
              }
              return response;
            })
            .catch(() => {
              if (event.request.mode === "navigate") {
                return caches.match("./index.html");
              }
              return new Response("", { status: 503, statusText: "Service Unavailable" });
            });
        })
    );
    return;
  }

  // For images - cache-first with stale-while-revalidate
  if (event.request.url.includes(".png") || event.request.url.includes(".jpg") || event.request.url.includes(".gif")) {
    event.respondWith(
      caches.match(event.request)
        .then((cached) => {
          if (cached) return cached;
          return fetch(event.request)
            .then((response) => {
              if (response && response.status === 200) {
                const responseClone = response.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
              }
              return response;
            })
            .catch(() => cached || new Response("", { status: 408 }));
        })
    );
    return;
  }

  // Default: network-first
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200 && response.type === "basic") {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

// Push notifications
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "HabitFlow reminder",
    icon: "./icon-192.png",
    badge: "./icon-192.png",
    vibrate: [100, 50, 100],
    data: { dateOfArrival: Date.now(), primaryKey: 1 }
  };
  event.waitUntil(
    self.registration.showNotification("HabitFlow", options)
  );
});

// Notification click
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("./index.html?view=today"));
});

// Background sync
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-data") {
    event.waitUntil(console.log("Background sync triggered"));
  }
});