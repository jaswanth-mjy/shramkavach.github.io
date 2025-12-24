// Service Worker for ShramKavach PWA - Production Version
const CACHE_NAME = 'shramkavach-v3.1.0'; // Increment version to force cache refresh
const urlsToCache = [
  '/',
  '/index.html',
  '/calculators.html',
  '/prompts.html',
  '/protection.html',
  '/history.html',
  '/updates.html',
  '/generator.html',
  '/logo.png',
  '/manifest.json',
  '/css/styles.min.css',
  '/js/calculators.js',
  '/js/prompt-loader.js',
  '/js/common.js',
  '/data/prompts.json',
  '/data/prompts-mega.json',
  '/data/prompts-extended.json'
];

// Install event - cache essential resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .catch((error) => {
        // Silent fail in production
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - Network First for HTML, Cache First for assets
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  const { request } = event;
  const requestUrl = new URL(request.url);

  // Network First strategy for HTML pages
  if (request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone and cache the fresh response
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          // Fallback to cache if network fails
          return caches.match(request).then((response) => {
            return response || new Response('Offline - Please check your connection', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({ 'Content-Type': 'text/plain' })
            });
          });
        })
    );
    return;
  }

  // Cache First strategy for static assets (JS, CSS, images, fonts)
  event.respondWith(
    caches.match(request)
      .then((response) => {
        if (response) {
          return response;
        }

        const fetchRequest = request.clone();

        return fetch(fetchRequest).then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });

          return response;
        }).catch(() => {
          return new Response('Offline - Please check your connection', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({ 'Content-Type': 'text/plain' })
          });
        });
      })
  );
});
