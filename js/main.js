const TARGET=new Date('2026-12-05T10:30:00-05:00'); // 10:30 hora de Lima: mismo instante para todos los países
const $=i=>document.getElementById(i),au=$('bg'),mc=$('mc');let opened=false;
const ICON_ON='<svg class="ic ic-lg" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z"/><path d="M15.5 9a4.5 4.5 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11"/></svg>';
const ICON_OFF='<svg class="ic ic-lg" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/></svg>';
function tick(){const t=Math.max(0,TARGET-Date.now()),p=n=>String(n).padStart(2,'0');
 $('d').textContent=p(Math.floor(t/864e5));$('h').textContent=p(Math.floor(t%864e5/36e5));$('m').textContent=p(Math.floor(t%36e5/6e4));$('s').textContent=p(Math.floor(t%6e4/1e3))}
tick();setInterval(tick,1000);
try{const tz=Intl.DateTimeFormat().resolvedOptions().timeZone;
 if(tz&&tz!=='America/Lima')$('local').textContent='En tu zona horaria ('+tz.replace('_',' ')+'): '+TARGET.toLocaleString('es',{weekday:'long',day:'numeric',month:'long',hour:'2-digit',minute:'2-digit'})}catch(e){}
function petals(){
  const mobile=matchMedia('(max-width:640px)').matches,N=mobile?9:15;
  const BL=['#a9c4d9','#8fb0cf','#c6d8e8','#7a9cc0','#b7cce0'],LI=['#cfc4e6','#bfb6e0'];
  const SEP='M20 21C8 19 6 7 20 3C34 7 32 19 20 21Z';
  const floret=c=>'<svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden="true"><g fill="'+c+'" stroke="rgba(70,105,150,.4)" stroke-width=".7">'+[0,90,180,270].map(a=>'<path transform="rotate('+a+' 20 20)" d="'+SEP+'"/>').join('')+'</g><circle cx="20" cy="20" r="2.8" fill="#f7f3df"/><circle cx="20" cy="20" r="1" fill="#b7a96b"/></svg>';
  const sepal=c=>'<svg viewBox="4 2 32 20" width="100%" height="100%" aria-hidden="true"><path d="'+SEP+'" fill="'+c+'" stroke="rgba(70,105,150,.4)" stroke-width=".7"/><path d="M20 19V7" stroke="rgba(255,255,255,.55)" stroke-width=".8" fill="none"/></svg>';
  for(let i=0;i<N;i++){
    const p=document.createElement('div'),pt=document.createElement('span'),
          isF=i%3!==2,pool=(i%4===3)?LI:BL,c=pool[Math.floor(Math.random()*pool.length)],
          s=isF?18+Math.random()*12:16+Math.random()*10,h=isF?s:s*.65;
    p.className='petal';
    p.style.cssText=`left:${Math.random()*100}vw;width:${s}px;height:${h}px;animation-duration:${12+Math.random()*9}s;animation-delay:${-Math.random()*14}s`;
    pt.className='pt';
    pt.style.cssText=`animation-duration:${3+Math.random()*3}s,${6+Math.random()*5}s;animation-delay:${-Math.random()*5}s`;
    pt.innerHTML=isF?floret(c):sepal(c);
    p.appendChild(pt);
    document.body.insertBefore(p,$('main'));
  }
}
function openInv(){
 if(opened)return;opened=true;
 $('env').classList.add('open');
 try{au.volume=.6;au.play().then(()=>{mc.style.display='grid'}).catch(()=>{})}catch(e){}
 setTimeout(()=>{
  $('env').classList.add('gone');document.body.classList.remove('lock');
  $('main').classList.add('show');window.scrollTo(0,0);petals();
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.rv').forEach(el=>io.observe(el));
 },3900);
}
au.addEventListener('error',()=>{mc.style.display='none'});
au.addEventListener('playing',()=>{mc.style.display='grid';mc.innerHTML=ICON_ON});
function toggleMusic(){
  if(au.paused){
    au.play().catch(()=>{});
    mc.innerHTML=ICON_ON;
    mc.setAttribute('aria-label','Silenciar música');
  }else{
    au.pause();
    mc.innerHTML=ICON_OFF;
    mc.setAttribute('aria-label','Activar música');
  }
}
