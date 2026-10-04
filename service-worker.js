const CACHE='orgo-v083-20261004';
const ASSETS=['./','./index.html','./manifest.json','./orgo-icon-v2-192.png','./orgo-icon-v2-512.png','./mountain-namsan.png','./mountain-gwanaksan.png','./mountain-bukhansan.png','./mountain-hallasan.png','./mountain-baekdusan.png','./mountain-fuji.png','./mountain-montblanc.png','./mountain-kilimanjaro.png','./mountain-everest.png','./mountains-browse.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));});
