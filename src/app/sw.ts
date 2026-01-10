import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist';

import {
    Serwist,
    CacheFirst,
    NetworkOnly,
    NetworkFirst,
    ExpirationPlugin,
    RangeRequestsPlugin,
    StaleWhileRevalidate,
} from 'serwist';
import { PAGES_CACHE_NAME } from '@serwist/turbopack/worker';

declare global {
    interface WorkerGlobalScope extends SerwistGlobalConfig {
        // Change this attribute's name to your `injectionPoint`.
        // `injectionPoint` is an InjectManifest option.
        // See https://serwist.pages.dev/docs/build/configuring
        __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
    }
}

declare const self: ServiceWorkerGlobalScope;

self.addEventListener('push', function (event) {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: data.icon || '/icon.png',
            badge: '/badge.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: '2',
            },
        };
        event.waitUntil(self.registration.showNotification(data.title, options));
    }
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();

    event.waitUntil(self.clients.openWindow(''));
});

const serwist = new Serwist({
    precacheEntries: self.__SW_MANIFEST,
    skipWaiting: true,
    clientsClaim: true,
    navigationPreload: true,
    runtimeCaching: [
        {
            matcher: ({ request }) => request.mode === 'navigate',
            handler: new NetworkFirst(),
        },
        {
            matcher: ({ url }) => url.pathname.startsWith('/messages'),
            handler: new StaleWhileRevalidate(),
        },
        {
            matcher: /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
            handler: new CacheFirst({
                cacheName: 'google-fonts-webfonts',
                plugins: [
                    new ExpirationPlugin({
                        maxEntries: 4,
                        maxAgeSeconds: 365 * 24 * 60 * 60, // 365 days
                        maxAgeFrom: 'last-used',
                    }),
                ],
            }),
        },
        {
            matcher: /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
            handler: new StaleWhileRevalidate({
                cacheName: 'google-fonts-stylesheets',
                plugins: [
                    new ExpirationPlugin({
                        maxEntries: 4,
                        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
                        maxAgeFrom: 'last-used',
                    }),
                ],
            }),
        },
        {
            matcher: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
            handler: new StaleWhileRevalidate({
                cacheName: 'static-font-assets',
                plugins: [
                    new ExpirationPlugin({
                        maxEntries: 4,
                        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
                        maxAgeFrom: 'last-used',
                    }),
                ],
            }),
        },
        {
            matcher: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
            handler: new StaleWhileRevalidate({
                cacheName: 'static-image-assets',
                plugins: [
                    new ExpirationPlugin({
                        maxEntries: 64,
                        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                        maxAgeFrom: 'last-used',
                    }),
                ],
            }),
        },
        {
            matcher: /\/_next\/static.+\.js$/i,
            handler: new CacheFirst({
                cacheName: 'next-static-js-assets',
                plugins: [
                    new ExpirationPlugin({
                        maxEntries: 64,
                        maxAgeSeconds: 24 * 60 * 60, // 24 hours
                        maxAgeFrom: 'last-used',
                    }),
                ],
            }),
        },
        {
            matcher: /\/_next\/image\?url=.+$/i,
            handler: new StaleWhileRevalidate({
                cacheName: 'next-image',
                plugins: [
                    new ExpirationPlugin({
                        maxEntries: 64,
                        maxAgeSeconds: 24 * 60 * 60, // 24 hours
                        maxAgeFrom: 'last-used',
                    }),
                ],
            }),
        },
        {
            matcher: /\.(?:mp3|wav|ogg)$/i,
            handler: new CacheFirst({
                cacheName: 'static-audio-assets',
                plugins: [
                    new ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 24 * 60 * 60, // 24 hours
                        maxAgeFrom: 'last-used',
                    }),
                    new RangeRequestsPlugin(),
                ],
            }),
        },
        {
            matcher: /\.(?:mp4|webm)$/i,
            handler: new CacheFirst({
                cacheName: 'static-video-assets',
                plugins: [
                    new ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 24 * 60 * 60, // 24 hours
                        maxAgeFrom: 'last-used',
                    }),
                    new RangeRequestsPlugin(),
                ],
            }),
        },
        {
            matcher: /\.(?:js)$/i,
            handler: new StaleWhileRevalidate({
                cacheName: 'static-js-assets',
                plugins: [
                    new ExpirationPlugin({
                        maxEntries: 48,
                        maxAgeSeconds: 24 * 60 * 60, // 24 hours
                        maxAgeFrom: 'last-used',
                    }),
                ],
            }),
        },
        {
            matcher: /\.(?:css|less)$/i,
            handler: new StaleWhileRevalidate({
                cacheName: 'static-style-assets',
                plugins: [
                    new ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 24 * 60 * 60, // 24 hours
                        maxAgeFrom: 'last-used',
                    }),
                ],
            }),
        },
        {
            matcher: /\/_next\/data\/.+\/.+\.json$/i,
            handler: new NetworkFirst({
                cacheName: 'next-data',
                plugins: [
                    new ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 24 * 60 * 60, // 24 hours
                        maxAgeFrom: 'last-used',
                    }),
                ],
            }),
        },
        {
            matcher: /\.(?:json|xml|csv)$/i,
            handler: new NetworkFirst({
                cacheName: 'static-data-assets',
                plugins: [
                    new ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 24 * 60 * 60, // 24 hours
                        maxAgeFrom: 'last-used',
                    }),
                ],
            }),
        },
        {
            // Exclude /api/auth/* to fix auth callback
            // https://github.com/serwist/serwist/discussions/28
            matcher: /\/api\/auth\/.*/,
            handler: new NetworkOnly({
                networkTimeoutSeconds: 10, // fallback to cache if API does not response within 10 seconds
            }),
        },
        {
            matcher: ({ sameOrigin, url: { pathname } }) =>
                sameOrigin && pathname.startsWith('/api/'),
            method: 'GET',
            handler: new NetworkFirst({
                cacheName: 'apis',
                plugins: [
                    new ExpirationPlugin({
                        maxEntries: 16,
                        maxAgeSeconds: 24 * 60 * 60, // 24 hours
                        maxAgeFrom: 'last-used',
                    }),
                ],
                networkTimeoutSeconds: 10, // fallback to cache if API does not response within 10 seconds
            }),
        },
        {
            matcher: ({ request, url: { pathname }, sameOrigin }) =>
                request.headers.get('RSC') === '1' &&
                request.headers.get('Next-Router-Prefetch') === '1' &&
                sameOrigin &&
                !pathname.startsWith('/api/'),
            handler: new NetworkFirst({
                cacheName: PAGES_CACHE_NAME.rscPrefetch,
                plugins: [
                    new ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 24 * 60 * 60, // 24 hours
                    }),
                ],
            }),
        },
        {
            matcher: ({ request, url: { pathname }, sameOrigin }) =>
                request.headers.get('RSC') === '1' && sameOrigin && !pathname.startsWith('/api/'),
            handler: new NetworkFirst({
                cacheName: PAGES_CACHE_NAME.rsc,
                plugins: [
                    new ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 24 * 60 * 60, // 24 hours
                    }),
                ],
            }),
        },
        {
            matcher: ({ request, url: { pathname }, sameOrigin }) =>
                request.headers.get('Content-Type')?.includes('text/html') &&
                sameOrigin &&
                !pathname.startsWith('/api/'),
            handler: new NetworkFirst({
                cacheName: PAGES_CACHE_NAME.html,
                plugins: [
                    new ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 24 * 60 * 60, // 24 hours
                    }),
                ],
            }),
        },
        {
            matcher: ({ url: { pathname }, sameOrigin }) =>
                sameOrigin && !pathname.startsWith('/api/'),
            handler: new NetworkFirst({
                cacheName: 'others',
                plugins: [
                    new ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 24 * 60 * 60, // 24 hours
                    }),
                ],
            }),
        },
        {
            matcher: ({ sameOrigin }) => !sameOrigin,
            handler: new NetworkFirst({
                cacheName: 'cross-origin',
                plugins: [
                    new ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 60 * 60, // 1 hour
                    }),
                ],
                networkTimeoutSeconds: 10,
            }),
        },
    ],
    fallbacks: {
        entries: [
            {
                url: '/~offline',
                matcher({ request }) {
                    return request.destination === 'document';
                },
            },
        ],
    },
});

serwist.addEventListeners();
