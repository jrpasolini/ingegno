import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
const source=await readFile(new URL('../public/sw.js',import.meta.url),'utf8');
test('PWA pré-carrega apenas arquivos existentes e preserva API, POST e apps vizinhos',async()=>{
  const events={},stored=new Map(),deleted=[],cache={
    addAll:async urls=>{for(const url of urls){const file=url==='/ingegno/'?'index.html':url.slice('/ingegno/'.length);const bytes=await readFile(new URL('../public/'+file,import.meta.url));stored.set(url,bytes);}},
    match:async url=>stored.get(url)
  };
  const context=vm.createContext({URL,self:{location:{origin:'https://example.test'},clients:{claim:async()=>{}},addEventListener:(name,fn)=>{events[name]=fn;}},caches:{open:async()=>cache,keys:async()=>['genio-shell-old','other-app'],delete:async key=>deleted.push(key)},fetch:async()=>{throw Error('offline');}});
  vm.runInContext(source,context);
  let work;events.install({waitUntil:promise=>{work=promise;}});await work;
  events.activate({waitUntil:promise=>{work=promise;}});await work;
  assert.deepEqual(deleted,['genio-shell-old']);
  let offlineResponse;
  events.fetch({request:{method:'GET',url:'https://example.test/ingegno/'},respondWith:p=>{offlineResponse=p;}});
  assert.ok((await offlineResponse).length>0);
  for(const [method,path] of [['POST','/ingegno/api/session'],['GET','/ingegno/api/health'],['GET','/pocket-oracle/'],['GET','https://outside.test/ingegno/']]){
    let intercepted=false;events.fetch({request:{method,url:new URL(path,'https://example.test').href},respondWith:()=>{intercepted=true;}});assert.equal(intercepted,false);
  }
});
