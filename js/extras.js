/* BREAK FORD — page transitions, live interface touches and the "Rack Match" game */
(function(){
const q=(s,r=document)=>r.querySelector(s);
const view=q('#view'),curtain=q('#curtain');

/* ---- page transitions: two panels close like doors, the destination name appears, page zooms in ---- */
curtain.innerHTML='<i class="pl"></i><i class="pr"></i><div class="ct"><small>BREAK FORD</small><span class="mask"><b id="cText"></b></span><em></em></div>';
window.tLabel=r=>r.view==='home'?'Break Barriers':r.view==='product'?P.find(p=>p.id===r.pid).name:r.q?'Search':(r.sub||catOf(r.cat).name);
window.pageOut=(cb,label)=>{
  q('#cText').textContent=label||'BREAK FORD';
  view.classList.add('zout');curtain.classList.remove('open');curtain.classList.add('on');
  setTimeout(cb,980);
};
window.pageIn=()=>{
  view.classList.remove('zout');view.classList.add('zin');
  setTimeout(()=>{curtain.classList.add('open');curtain.classList.remove('on')},120);
  setTimeout(()=>view.classList.remove('zin'),1300);
};

/* stagger product cards and page blocks as they appear */
new MutationObserver(()=>{
  let i=0;view.querySelectorAll('#grid .card:not([data-s])').forEach(c=>{c.dataset.s=1;c.style.setProperty('--i',Math.min(i++,12))});
}).observe(view,{childList:true,subtree:true});

/* scroll progress */
const prog=q('#prog');
addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-innerHeight;prog.style.transform=`scaleX(${h>0?Math.min(scrollY/h,1):0})`},{passive:true});

/* card tilt (mouse devices only) */
if(matchMedia('(hover:hover) and (pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  document.addEventListener('pointermove',e=>{
    const c=e.target.closest&&e.target.closest('.card'),p=c&&c.querySelector('.pic');
    if(!p)return;const r=p.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    p.style.setProperty('--ry',(x*7).toFixed(2)+'deg');p.style.setProperty('--rx',(-y*7).toFixed(2)+'deg');
  });
  document.addEventListener('pointerout',e=>{const c=e.target.closest&&e.target.closest('.card'),p=c&&c.querySelector('.pic');if(p&&!c.contains(e.relatedTarget)){p.style.setProperty('--rx','0deg');p.style.setProperty('--ry','0deg')}});
}

/* ---- RACK MATCH: match six pairs of balls in 40 seconds, win a flat 20% coupon ---- */
const BALLS=[['1','#e8c547'],['3','#d0443a'],['5','#e5822f'],['6','#2a9d5c'],['8','#161616'],['9','#e8c547',1]];
const ball=([n,c,s])=>`<svg viewBox="0 0 64 64" aria-hidden="true"><defs><clipPath id="c${n}"><circle cx="32" cy="32" r="29"/></clipPath></defs><circle cx="32" cy="32" r="29" fill="${s?'#f4f3ef':c}"/>${s?`<rect x="0" y="17" width="64" height="30" fill="${c}" clip-path="url(#c${n})"/>`:''}<circle cx="32" cy="32" r="13" fill="#f4f3ef"/><text x="32" y="37.5" text-anchor="middle" font-size="16" font-weight="700" fill="#0a0a0a" font-family="Archivo,Arial,sans-serif">${n}</text><ellipse cx="22" cy="18" rx="8" ry="4.5" fill="#fff" opacity=".28" transform="rotate(-30 22 18)"/></svg>`;
const G=q('#game'),body=()=>q('.gbody',G),TIME=40;
let st=null;
const show=h=>{body().innerHTML=h};
function open(){
  closeAll();G.classList.add('open');G.setAttribute('aria-hidden','false');document.body.classList.add('lock');
  gameCoupon&&!used.coupons.includes(gameCoupon.code)?reward():intro();
}
function close(){
  stop();G.classList.remove('open');G.setAttribute('aria-hidden','true');
  if(!q('#drawer.open'))document.body.classList.remove('lock');
}
const stop=()=>{if(st&&st.timer)clearInterval(st.timer)};
function intro(){
  show(`<div class="label">Rack Match</div><h3>Clear the rack.<br>Win 20% off.</h3><p>Match all six pairs of balls within ${TIME} seconds and unlock a flat 20% off coupon for your order.</p><button class="btn btn-gold" id="gStart">Start the game ${arrow}</button>`);
  q('#gStart').onclick=play;
}
function play(){
  const deck=[...BALLS,...BALLS].map(b=>({b})).sort(()=>Math.random()-.5);
  st={deck,open:[],done:0,t:TIME,timer:null,lock:false,go:false};
  show(`<div class="gstats"><span id="gT">${TIME}s</span><span id="gP">Pairs 0 / 6</span></div><div class="gbar"><i id="gB"></i></div>
   <div class="gboard">${deck.map((d,i)=>`<button class="gc" data-i="${i}" aria-label="Card ${i+1}"><span class="gf"><span class="front"><img src="assets/favicon.png" alt=""></span><span class="back">${ball(d.b)}</span></span></button>`).join('')}</div>
   <p class="ghint">Tap a card to turn it. The clock starts on your first move.</p>`);
  q('.gboard',G).onclick=e=>{
    const c=e.target.closest('.gc');if(!c||st.lock||c.classList.contains('on'))return;
    if(!st.go){st.go=true;const t0=Date.now();st.timer=setInterval(()=>{st.t=Math.max(0,TIME-(Date.now()-t0)/1000);q('#gT').textContent=Math.ceil(st.t)+'s';q('#gB').style.transform=`scaleX(${st.t/TIME})`;if(st.t<=0)lose()},100)}
    c.classList.add('on');st.open.push(c);
    if(st.open.length===2){
      const [a,b]=st.open,m=st.deck[a.dataset.i].b[0]===st.deck[b.dataset.i].b[0];st.open=[];st.lock=true;
      setTimeout(()=>{
        if(m){a.classList.add('ok');b.classList.add('ok');st.done++;q('#gP').textContent=`Pairs ${st.done} / 6`;if(st.done===6)win()}
        else{a.classList.remove('on');b.classList.remove('on')}
        st.lock=false;
      },m?350:700);
    }
  };
}
function lose(){stop();show(`<div class="label">Time is up</div><h3>So close.</h3><p>The rack is not cleared yet. Shuffle up and try again.</p><button class="btn btn-gold" id="gAgain">Play again ${arrow}</button>`);q('#gAgain').onclick=play}
function win(){
  stop();
  const ch='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  if(!gameCoupon||used.coupons.includes(gameCoupon.code)){
    gameCoupon={code:'BF20-'+Array.from({length:6},()=>ch[Math.random()*ch.length|0]).join('')};ls.set('bf-game-coupon',gameCoupon);
  }
  setTimeout(()=>{reward(true)},500);
}
function reward(fresh){
  const code=gameCoupon.code;if(applied.coupon!==code)applyCode(code);
  if(q('#drawer.open'))renderDrawer();
  show(`<div class="label">${fresh?'Rack cleared':'Your reward'}</div><h3>Flat 20% off.</h3><p>Your coupon is applied to your cart automatically. Valid for one order.</p>
   <div class="gcode"><b>${code}</b><button class="link" id="gCopy">Copy</button></div>
   <div class="btns"><button class="btn btn-gold" id="gShop" data-to="#products">Shop now ${arrow}</button><button class="btn btn-line" id="gCart">View cart</button></div>`);
  q('#gCopy').onclick=e=>{navigator.clipboard&&navigator.clipboard.writeText(code).catch(()=>{});e.target.textContent='Copied'};
  q('#gShop').addEventListener('click',close);q('#gCart').onclick=()=>{close();openDrawer('cart')};
  if(fresh&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    for(let i=0;i<28;i++){const s=document.createElement('i');s.className='conf';s.style.cssText=`--x:${(Math.random()*100).toFixed(0)}%;--d:${(1.6+Math.random()*1.4).toFixed(2)}s;--r:${(Math.random()*720-360)|0}deg;animation-delay:${(Math.random()*.5).toFixed(2)}s`;G.querySelector('.gpanel').appendChild(s);setTimeout(()=>s.remove(),3600)}
  }
}
document.addEventListener('click',e=>{
  if(e.target.closest('[data-game]')){e.preventDefault();open()}
  else if(e.target.closest('[data-gclose]'))close();
});
addEventListener('keydown',e=>{if(e.key==='Escape'&&G.classList.contains('open'))close()});
})();
