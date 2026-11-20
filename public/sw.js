const CACHE='genio-shell-v4';
const ROOT='/ingegno/';
const SHELL=[ROOT,ROOT+'app.js',ROOT+'styles.css',ROOT+'bank.js',ROOT+'periods.js',ROOT+'networks.js',ROOT+'programming.js',ROOT+'comportamento.js',ROOT+'poo.js',ROOT+'performance.js',ROOT+'pwa.js',
  ROOT+'manifest.webmanifest',ROOT+'assets/einstein-matricial-original.png',ROOT+'assets/gradiente-msx-polaroid.webp',
  ROOT+'assets/icon-192.png',ROOT+'assets/icon-512.png',ROOT+'assets/icon-maskable-512.png',ROOT+'assets/apple-touch-icon.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL))));
// Do not force an update while a student has an active exam.
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  for(const key of await caches.keys())if(key.startsWith('genio-shell-')&&key!==CACHE)await caches.delete(key);
  await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
  const request=event.request,url=new URL(request.url);
  // Never intercept APIs, POSTs, external assets or sibling apps on this domain.
  if(request.method!=='GET'||url.origin!==self.location.origin||!SHELL.includes(url.pathname))return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    // Prefer current releases online; use the stored shell only without a network.
    try{
      const response=await fetch(request);
      if(response.ok)await cache.put(url.pathname,response.clone());
      return response;
    }catch(error){
      const cached=await cache.match(url.pathname);
      if(cached)return cached;
      throw error;
    }
  })());
});
