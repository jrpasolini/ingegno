import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
const source=await readFile(new URL('../public/pwa.js',import.meta.url),'utf8');
function setup({apple=false,standalone=false}={}){
  const nodes=new Map(),events={};let registration;
  for(const id of ['install-strip','install-app','install-help','install-instructions','close-install-help','install-description'])nodes.set(id,{hidden:false,handlers:{},addEventListener(name,handler){this.handlers[name]=handler;},showModal(){this.open=true;},close(){this.open=false;}});
  const context=vm.createContext({document:{getElementById:id=>nodes.get(id)},navigator:{userAgent:apple?'iPhone':'Chrome',platform:apple?'iPhone':'Win32',maxTouchPoints:0,serviceWorker:{register:async(url,options)=>{registration={url,options};},ready:Promise.resolve({})}},matchMedia:()=>({matches:standalone,addEventListener(){}}),isSecureContext:true,addEventListener:(name,handler)=>{events[name]=handler;}});
  vm.runInContext(source,context);return {nodes,events,getRegistration:()=>registration};
}
test('PWA registra no escopo correto e mostra orientação de instalação no iPhone',async()=>{
  const {nodes,events,getRegistration}=setup({apple:true});
  await events.load();assert.equal(getRegistration().url,'./sw.js');assert.equal(getRegistration().options.scope,'./');
  assert.match(nodes.get('install-description').textContent,/sem internet/);
  await nodes.get('install-app').handlers.click();assert.equal(nodes.get('install-help').open,true);
  assert.match(nodes.get('install-instructions').textContent,/Safari.*Compartilhar.*Tela de Início/);
  nodes.get('close-install-help').handlers.click();assert.equal(nodes.get('install-help').open,false);
});
test('PWA respeita a escolha nativa e oculta a opção quando instalado',async()=>{
  const {nodes,events}=setup();let prompted=false,prevented=false;
  events.beforeinstallprompt({preventDefault(){prevented=true;},prompt:async()=>{prompted=true;},userChoice:Promise.resolve({outcome:'dismissed'})});
  await nodes.get('install-app').handlers.click();assert.ok(prompted&&prevented);assert.equal(nodes.get('install-strip').hidden,false);
  events.appinstalled();assert.equal(nodes.get('install-strip').hidden,true);
  assert.equal(setup({standalone:true}).nodes.get('install-strip').hidden,true);
});
