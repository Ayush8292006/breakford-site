/* BREAK FORD — coupons and gift cards
   Edit OFFERS below to create or remove codes. Full guide: COUPONS-AND-GIFT-CARDS.md */
const OFFERS={
  coupons:{
    // type 'percent' = % off the cart, type 'flat' = fixed ₹ off. Optional: min (₹ cart value), expires ('YYYY-MM-DD'), once (true = one use per browser)
    'WELCOME10':{type:'percent',value:10,label:'10% off your order'},
    'BREAK500':{type:'flat',value:500,min:5000,expires:'2026-12-31',label:'₹500 off orders over ₹5,000'}
  },
  giftCards:{
    // value = ₹ balance. A gift card pays for part or all of the order; any balance left stays on the card.
    'BFGC-1000-AAAA':{value:1000},
    'BFGC-5000-BBBB':{value:5000}
  }
};

/* ---- engine (no need to edit below) ---- */
const ls={get(k,d){try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
let applied=ls.get('bf-offers',{coupon:null,gift:null});
let used=ls.get('bf-used',{coupons:[],gift:{}});
let gameCoupon=ls.get('bf-game-coupon',null);
let codeNote='';
const saveOffers=()=>{ls.set('bf-offers',applied);ls.set('bf-used',used)};
function couponDef(code){
  if(OFFERS.coupons[code])return{code,...OFFERS.coupons[code]};
  if(gameCoupon&&gameCoupon.code===code)return{code,type:'percent',value:20,once:true,label:'Flat 20% off (game reward)'};
  return null;
}
const giftBal=code=>{const g=OFFERS.giftCards[code];return g?Math.max(0,g.value-(used.gift[code]||0)):0};
const cartSub=()=>cart.reduce((s,l)=>s+P.find(p=>p.id===l.id).price*l.qty,0);
const couponOK=(c,sub)=>c&&!(c.expires&&new Date(c.expires+'T23:59:59')<new Date())&&!(c.once&&used.coupons.includes(c.code))&&!(c.min&&sub<c.min);
function applyCode(raw){
  const code=String(raw||'').toUpperCase().replace(/\s+/g,'');
  if(!code)return{ok:false,msg:'Enter a code first.'};
  if(OFFERS.giftCards[code]){
    if(giftBal(code)<=0)return{ok:false,msg:'This gift card has no balance left.'};
    applied.gift=code;saveOffers();return{ok:true,msg:`Gift card applied. Balance ${inr(giftBal(code))}.`};
  }
  const c=couponDef(code);
  if(!c)return{ok:false,msg:'That code is not valid.'};
  if(c.expires&&new Date(c.expires+'T23:59:59')<new Date())return{ok:false,msg:'This coupon has expired.'};
  if(c.once&&used.coupons.includes(code))return{ok:false,msg:'This coupon has already been used.'};
  if(c.min&&cartSub()<c.min)return{ok:false,msg:`Add ${inr(c.min-cartSub())} more to use this coupon.`};
  applied.coupon=code;saveOffers();return{ok:true,msg:`${c.label} applied.`};
}
function discountOf(sub){
  const c=applied.coupon&&couponDef(applied.coupon);
  if(!couponOK(c,sub))return 0;
  return c.type==='percent'?Math.round(sub*c.value/100):Math.min(c.value,sub);
}
const giftOf=pre=>applied.gift?Math.min(giftBal(applied.gift),pre):0;
function consumeOffers(t){
  const c=applied.coupon&&couponDef(applied.coupon);
  if(t.disc&&c&&c.once)used.coupons.push(c.code);
  if(t.gift&&applied.gift)used.gift[applied.gift]=(used.gift[applied.gift]||0)+t.gift;
  applied={coupon:null,gift:null};saveOffers();
}
function codeBox(){
  const chip=(k,code,txt)=>`<div class="achip"><span><b>${esc(code)}</b> · ${esc(txt)}</span><button type="button" data-rc="${k}">Remove</button></div>`;
  const a=[];
  if(applied.coupon)a.push(chip('coupon',applied.coupon,(couponDef(applied.coupon)||{}).label||'Coupon'));
  if(applied.gift)a.push(chip('gift',applied.gift,'Balance '+inr(giftBal(applied.gift))));
  const n=codeNote;codeNote='';
  return `<form class="codebox" id="codeForm"><div class="crow"><input id="codeIn" placeholder="Coupon or gift card code" aria-label="Coupon or gift card code" autocomplete="off" autocapitalize="characters"><button class="btn btn-line btn-sm" type="submit">Apply</button></div><p class="cmsg" id="codeMsg" role="status">${esc(n)}</p>${a.join('')}</form>`;
}
function bindCode(){
  const f=$('#codeForm');if(!f)return;
  f.onsubmit=e=>{e.preventDefault();const r=applyCode($('#codeIn').value);codeNote=r.msg;renderDrawer()};
  $$('[data-rc]',f).forEach(b=>b.onclick=()=>{applied[b.dataset.rc]=null;saveOffers();codeNote='Removed.';renderDrawer()});
}
