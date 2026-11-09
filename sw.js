self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  const act=(e.notification.data&&e.notification.data.act)||'';
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{
    if(cs.length){cs[0].postMessage({act:act});return cs[0].focus();}
    return self.clients.openWindow('./?act='+act);
  }));
});
