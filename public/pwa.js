const strip=document.getElementById('install-strip'),button=document.getElementById('install-app');
const dialog=document.getElementById('install-help'),instructions=document.getElementById('install-instructions');
const standalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
let deferredPrompt=null;
function syncInstall(){strip.hidden=standalone()||!('serviceWorker' in navigator)||!isSecureContext;}
syncInstall();
matchMedia('(display-mode: standalone)').addEventListener('change',syncInstall);
addEventListener('beforeinstallprompt',event=>{event.preventDefault();deferredPrompt=event;syncInstall();});
addEventListener('appinstalled',()=>{deferredPrompt=null;strip.hidden=true;dialog.close();});
button.addEventListener('click',async()=>{
  if(deferredPrompt){
    const prompt=deferredPrompt;deferredPrompt=null;
    try{await prompt.prompt();const choice=await prompt.userChoice;if(choice.outcome==='accepted')strip.hidden=true;}catch{showHelp();}
  }else showHelp();
});
function showHelp(){
  const apple=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  instructions.textContent=apple?'No Safari, toque em Compartilhar e em “Adicionar à Tela de Início”. Confirme em “Adicionar”.':
    'Abra o menu do navegador e procure “Instalar aplicativo” ou “Adicionar à tela inicial”. Se essa opção não aparecer, continue estudando pelo navegador.';
  dialog.showModal();
}
document.getElementById('close-install-help').addEventListener('click',()=>dialog.close());
if('serviceWorker' in navigator&&isSecureContext){
  addEventListener('load',()=>navigator.serviceWorker.register('./sw.js',{scope:'./',updateViaCache:'none'}).then(()=>navigator.serviceWorker.ready).then(()=>{
    document.getElementById('install-description').textContent='Pratique também sem internet, com questões demonstrativas.';
  }).catch(()=>{
    // Installation is optional: a failed worker must not interrupt a quiz.
  }));
}
