// Service Worker for ShramKavach PWA - High Traffic Optimized
const CACHE_VERSION = 'v4.0.1';
const CACHE_NAME = `shramkavach-${CACHE_VERSION}`;
const CACHE_STATIC = `shramkavach-static-${CACHE_VERSION}`;
const CACHE_DYNAMIC = `shramkavach-dynamic-${CACHE_VERSION}`;
const CACHE_JSON = `shramkavach-json-${CACHE_VERSION}`;

// Cache duration settings (in milliseconds)
const CACHE_DURATION = {
  HTML: 1000 * 60 * 60 * 24,      // 24 hours
  JSON: 1000 * 60 * 60 * 24 * 7,  // 7 days
  STATIC: 1000 * 60 * 60 * 24 * 30, // 30 days
  CDN: 1000 * 60 * 60 * 24 * 7     // 7 days
};

// Essential resources to cache immediately
const STATIC_CACHE = [
  '/',
  '/index.html',
  '/calculators.html',
  '/prompts.html',
  '/protection.html',
  '/logo.png',
  '/manifest.json',
  '/js/common.js',
  '/js/calculators.js',
  '/js/prompt-counter.js'
];

// JSON files to cache with longer expiry
const JSON_CACHE = [
  '/data/prompts.json',
  '/data/prompts-mega.json',
  '/data/prompts-extended.json',
  '/data/translations.json'
];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_STATIC).then((cache) => cache.addAll(STATIC_CACHE)),
      caches.open(CACHE_JSON).then((cache) => cache.addAll(JSON_CACHE))
    ]).catch(() => {
      // Silent fail - don't block installation
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
          // Delete caches that don't match current version
          if (cacheName.startsWith('shramkavach-') && !cacheName.includes(CACHE_VERSION)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Helper: Check if cached response is still fresh
function isCacheFresh(cachedResponse, maxAge) {
  if (!cachedResponse) return false;
  
  const cachedDate = cachedResponse.headers.get('sw-cache-date');
  if (!cachedDate) return false;
  
  const age = Date.now() - parseInt(cachedDate);
  return age < maxAge;
}

// Helper: Add cache timestamp to response
function addCacheTimestamp(response) {
  const clonedResponse = response.clone();
  const headers = new Headers(clonedResponse.headers);
  headers.set('sw-cache-date', Date.now().toString());
  
  return clonedResponse.blob().then(body => {
    return new Response(body, {
      status: clonedResponse.status,
      statusText: clonedResponse.statusText,
      headers: headers
    });
  });
}

// Fetch event - Intelligent caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip chrome extensions and non-http(s) requests
  if (!url.protocol.startsWith('http')) return;

  // Strategy 1: Stale-While-Revalidate for HTML pages
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      caches.open(CACHE_STATIC).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        
        const fetchPromise = fetch(request)
          .then(async (networkResponse) => {
            if (networkResponse.ok) {
              const responseWithTimestamp = await addCacheTimestamp(networkResponse.clone());
              cache.put(request, responseWithTimestamp);
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        // Return cached response immediately if available, fetch in background
        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // Strategy 2: Cache First with freshness check for JSON files
  if (url.pathname.endsWith('.json')) {
    event.respondWith(
      caches.open(CACHE_JSON).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        
        // Return cached if fresh
        if (cachedResponse && isCacheFresh(cachedResponse, CACHE_DURATION.JSON)) {
          return cachedResponse;
        }

        // Fetch fresh data
        try {
          const networkResponse = await fetch(request);
          if (networkResponse.ok) {
            const responseWithTimestamp = await addCacheTimestamp(networkResponse.clone());
            cache.put(request, responseWithTimestamp);
          }
          return networkResponse;
        } catch (error) {
          // Return stale cache as fallback
          return cachedResponse || new Response('{"error": "Offline"}', {
            status: 503,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      })
    );
    return;
  }

  // Strategy 3: Cache First for static assets (JS, CSS, images, fonts)
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|webp|woff|woff2|ttf|ico)$/)) {
    event.respondWith(
      caches.open(CACHE_STATIC).then(async (cache) => {
        // If URL has version parameter, always fetch fresh (bypass cache)
        if (url.searchParams.has('v')) {
          try {
            const networkResponse = await fetch(request);
            if (networkResponse.ok) {
              const responseWithTimestamp = await addCacheTimestamp(networkResponse.clone());
              cache.put(request, responseWithTimestamp);
            }
            return networkResponse;
          } catch (error) {
            const cachedResponse = await cache.match(request);
            return cachedResponse || new Response('Resource not available', {
              status: 503
            });
          }
        }
        
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse && isCacheFresh(cachedResponse, CACHE_DURATION.STATIC)) {
          return cachedResponse;
        }

        try {
          const networkResponse = await fetch(request);
          if (networkResponse.ok) {
            const responseWithTimestamp = await addCacheTimestamp(networkResponse.clone());
            cache.put(request, responseWithTimestamp);
          }
          return networkResponse;
        } catch (error) {
          return cachedResponse || new Response('Resource not available', {
            status: 503
          });
        }
      })
    );
    return;
  }

  // Strategy 4: Network First with cache fallback for CDN resources
  if (url.hostname !== self.location.hostname) {
    event.respondWith(
      caches.open(CACHE_DYNAMIC).then(async (cache) => {
        try {
          const networkResponse = await fetch(request);
          if (networkResponse.ok) {
            const responseWithTimestamp = await addCacheTimestamp(networkResponse.clone());
            cache.put(request, responseWithTimestamp);
          }
          return networkResponse;
        } catch (error) {
          const cachedResponse = await cache.match(request);
          return cachedResponse || new Response('Offline', { status: 503 });
        }
      })
    );
    return;
  }

  // Default: Network only for everything else
  event.respondWith(fetch(request));
});
