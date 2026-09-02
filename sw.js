// Winter Arc Tracker v3.0 — Service Worker
// Advanced caching with cache-first strategy for offline support
// All data remains in localStorage - this is for app shell caching only

const CACHE_NAME = "winter-arc-v3";
const DATA_CACHE_NAME = "winter-arc-data-v1";

const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./sw.js",
  "./README.md"
];

const ICONS_TO_CACHE = [
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png"
];

// Install event - cache assets
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => {
        return cache.addAll(ICONS_TO_CACHE);
      })
      .catch((err) => {
        console.log("Cache installation partial:", err);
      })
  );
});

// Activate event - clean old caches
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

// Fetch event - cache-first strategy for assets, network-first for data
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") return;

  // For manifest and HTML, use cache-first
  if (
    event.request.url.endsWith(".json") ||
    event.request.url.endsWith(".html") ||
    event.request.url.endsWith(".js")
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
            });
        })
        .catch(() => {
          // Fallback for offline
          if (event.request.url.endsWith(".html")) {
            return caches.match("./index.html");
          }
          return new Response("", { status: 503, statusText: "Service Unavailable" });
        })
    );
    return;
  }

  // For images and static assets, use cache-first with stale-while-revalidate
  if (
    event.request.url.includes(".png") ||
    event.request.url.includes(".jpg") ||
    event.request.url.includes(".gif") ||
    event.request.url.includes(".svg")
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
            .catch(() => cached || new Response("", { status: 408 }));
        })
    );
    return;
  }

  // Default: network-first for everything else
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

// Message handling for update notifications
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Background sync for offline changes (future enhancement)
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-data") {
    event.waitUntil(syncData());
  }
});

async function syncData() {
  // Placeholder for future sync functionality
  console.log("Background sync triggered");
}