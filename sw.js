/* Study Buddy service worker: lets the page open without internet.
   Put this file next to index.html on GitHub Pages. */
const C="study-buddy-v5";
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(["./","manifest.webmanifest","icon-192.png","icon-512.png","azan1.mp3","azan2.mp3"])).catch(()=>{}))});
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch",e=>{
  const r=e.request;
  if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
  e.respondWith(fetch(r).then(res=>{const copy=res.clone();caches.open(C).then(c=>c.put(r,copy));return res})
    .catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match("./"))));
});
self.addEventListener("notificationclick",e=>{e.notification.close();e.waitUntil(clients.matchAll({type:"window",includeUncontrolled:true}).then(l=>l.length?l[0].focus():clients.openWindow("./")))});
