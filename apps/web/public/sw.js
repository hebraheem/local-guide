const CACHE_NAME = "your-local-guide-v1";
const urlsToCache = ["/", "/offline.html"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch(() => {
        console.warn("Some assets could not be cached");
      });
    }),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (
    request.method !== "GET" ||
    !request.url.startsWith("http:") ||
    !request.url.startsWith("https:")
  ) {
    return;
  }

  if (request.url.includes("/api/")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request).then((response) => {
            return (
              response ||
              new Response("Network error while fetching resource", {
                status: 408,
                type: "basic",
              })
            );
          });
        }),
    );
  } else {
    event.respondWith(
      caches.match(request).then((response) => {
        return (
          response ||
          fetch(request)
            .then((res) => {
              if (res && res.ok) {
                const responseClone = res.clone();
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(request, responseClone);
                });
              }
              return res;
            })
            .catch(() => {
              return caches.match("/offline.html");
            })
        );
      }),
    );
  }
});

self.addEventListener("push", (event) => {
  let data = {
    title: "Your Local Guide",
    body: "New notification",
    icon: "../public/icon-192x192.png",
  };

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
      badge: data.badge || "/badge-72x72.png",
      tag: data.tag || "notification",
      requireInteraction: data.requireInteraction || false,
      actions: data.actions || [],
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action) {
    event.waitUntil(
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({
            type: "notification-action",
            action: event.action,
          });
        });
      }),
    );
  } else {
    event.waitUntil(
      clients.matchAll({ type: "window" }).then((clients) => {
        if (clients.length > 0) {
          return clients[0].focus();
        }
        return self.clients.openWindow("/");
      }),
    );
  }
});
