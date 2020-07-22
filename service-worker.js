const CACHE_NAME = "submission1-v1.10.1";
var urlsToCache = [
	"/",
	"/manifest.json",
	"/nav.html",
	"/index.html",
	"/pages/home.html",
	"/pages/members.html",
	"/pages/discography.html",
	"/pages/gallery.html",
	"/pages/about.html",
	"/css/materialize.min.css",
	"/js/materialize.min.js",
	"/css/custom.css", "/css/materialize-icon.css",
	"/js/nav.js",
	"/assets/images/allmember-1.jpeg",
	"/assets/images/allmember-2.jpeg",
	"/assets/images/allmember-3.jpeg",
	"/assets/images/allmember-4.jpeg",
	"/assets/images/allmember-5.jpeg",
	"/assets/images/01jiu.jpg","/assets/images/02sua.jpg","/assets/images/03siyeon.jpg","/assets/images/04handong.png","/assets/images/05yoohyeon.jpg","/assets/images/06dami.jpg","/assets/images/07gahyeon.jpg",
	"/assets/font/font.TTF", "/assets/font/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
	"/assets/logo/favicon.ico",
	"/assets/logo/icon-72x72.png","/assets/logo/icon-96x96.png","/assets/logo/icon-128x128.png","/assets/logo/icon-144x144.png","assets/logo/icon-152x152.png","/assets/logo/icon-192x192.png","/assets/logo/icon-384x384.png","/assets/logo/icon-512x512.png",
];
 
self.addEventListener("install", function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener("fetch", function(event) {
	event.respondWith(
		caches
		.match(event.request, { cacheName: CACHE_NAME })
		.then(function(response) {
			if (response) {
				console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
				return response;
			}
 
			console.log(
				"ServiceWorker: Memuat aset dari server: ",
				event.request.url
			);
			return fetch(event.request);
		})
	);
});

self.addEventListener("activate", function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName) {
					if (cacheName != CACHE_NAME) {
						console.log("ServiceWorker: cache " + cacheName + " dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});