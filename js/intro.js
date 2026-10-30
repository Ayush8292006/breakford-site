/* BREAK FORD — opening break shot (canvas, no external video)
   A coloured rack on dark baize, a slow cue pull-back, the strike, a slow-motion break,
   then the table softens and blurs while the logo rises in.
   Usage: BFIntro.start(introElement, {brand: fn, end: fn}) */
(function(){
'use strict';
var TAU=Math.PI*2;
var SOLID=['#f6c90e','#1f5fe0','#e5262d','#7a2fc0','#f77f1b','#12a15f','#9a1f33'];
var RACK=[1,10,3,12,8,5,14,2,11,7,15,4,13,6,9];
var T={cue0:.45,pull:1.55,hold:1.85,strike:1.95,brand:4.3,end:6.2};
function ease(x){x=x<0?0:x>1?1:x;return x*x*(3-2*x)}
function lerp(a,b,k){return a+(b-a)*k}

function start(intro,cb){
  var cv=intro.querySelector('#introCanvas');
  if(!cv||!cv.getContext)throw new Error('no canvas');
  var ctx=cv.getContext('2d');
  if(!ctx)throw new Error('no 2d context');
  var W,H,Wd,Hd,dpr,portrait,r,pr,L,R,Tp,B,balls,cue,pockets,noise;
  var t=0,t0=null,last=null,ti=-1,ix=0,iy=0,struck=false,brandFired=false,ended=false;

  function mk(n,x,y){
    return {n:n,x:x,y:y,vx:0,vy:0,rot:Math.random()*TAU,sunk:false,s:0,px:0,py:0,
      stripe:n>8,col:n===0?'#f4f1e8':n===8?'#151515':n<8?SOLID[n-1]:SOLID[n-9]};
  }
  function build(){
    dpr=Math.min(window.devicePixelRatio||1,2);W=innerWidth;H=innerHeight;
    cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);
    portrait=H>W*1.05;Wd=portrait?H:W;Hd=portrait?W:H;
    r=Math.max(11,Math.min(Hd*.04,Wd*.026));pr=r*1.55;
    L=Wd*.05;R=Wd*.95;Tp=Hd*.13;B=Hd*.87;
    pockets=[[L,Tp],[R,Tp],[L,B],[R,B],[Wd/2,Tp],[Wd/2,B]];
    balls=[];
    var ax=Wd*.64,cy=Hd/2,dx=r*1.732+.4,i=0;
    for(var row=0;row<5;row++)for(var j=0;j<=row;j++)balls.push(mk(RACK[i++],ax+row*dx,cy+(j-row/2)*(2*r+.4)));
    cue=mk(0,Wd*.25,cy);balls.push(cue);
    noise=null;
    if(typeof document!=='undefined'){try{
      var nc=document.createElement('canvas');nc.width=nc.height=160;var nx=nc.getContext('2d'),k;
      for(k=0;k<2600;k++){nx.fillStyle=Math.random()<.5?'rgba(255,255,255,.07)':'rgba(0,0,0,.12)';nx.fillRect(Math.random()*160,Math.random()*160,1.4,1.4)}
      noise=ctx.createPattern(nc,'repeat');
    }catch(e){noise=null}}
  }

  function step(h){
    var i,j,a,b,f=Math.exp(-.75*h);
    for(i=0;i<balls.length;i++){
      a=balls[i];if(a.sunk)continue;
      a.x+=a.vx*h;a.y+=a.vy*h;
      a.vx*=f;a.vy*=f;
      var sp=Math.hypot(a.vx,a.vy);
      if(sp<10){a.vx=a.vy=0}else a.rot+=sp*h/r*.5;
      if(a.x<L+r){a.x=L+r;a.vx=Math.abs(a.vx)*.88}
      if(a.x>R-r){a.x=R-r;a.vx=-Math.abs(a.vx)*.88}
      if(a.y<Tp+r){a.y=Tp+r;a.vy=Math.abs(a.vy)*.88}
      if(a.y>B-r){a.y=B-r;a.vy=-Math.abs(a.vy)*.88}
      if(a!==cue){
        for(j=0;j<6;j++){
          if(Math.hypot(a.x-pockets[j][0],a.y-pockets[j][1])<pr){a.sunk=true;a.s=0;a.px=a.x;a.py=a.y;a.tx=pockets[j][0];a.ty=pockets[j][1];break}
        }
      }
    }
    for(i=0;i<balls.length;i++){
      a=balls[i];if(a.sunk)continue;
      for(j=i+1;j<balls.length;j++){
        b=balls[j];if(b.sunk)continue;
        var dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy);
        if(d>=2*r||d===0)continue;
        var nx=dx/d,ny=dy/d,ov=(2*r-d)/2;
        a.x-=nx*ov;a.y-=ny*ov;b.x+=nx*ov;b.y+=ny*ov;
        var rel=(a.vx-b.vx)*nx+(a.vy-b.vy)*ny;
        if(rel>0){
          var imp=(1+.97)/2*rel;
          a.vx-=imp*nx;a.vy-=imp*ny;b.vx+=imp*nx;b.vy+=imp*ny;
          if(ti<0&&(a===cue||b===cue)){ti=t;ix=(a.x+b.x)/2;iy=(a.y+b.y)/2}
        }
      }
    }
  }

  function drawBall(b,x,y,sc,al){
    var rr=r*sc;if(rr<.5)return;
    ctx.save();ctx.globalAlpha=al;
    ctx.fillStyle='rgba(0,0,0,.35)';ctx.beginPath();ctx.ellipse(x+rr*.22,y+rr*.3,rr*1.02,rr*.96,0,0,TAU);ctx.fill();
    ctx.beginPath();ctx.arc(x,y,rr,0,TAU);ctx.clip();
    ctx.translate(x,y);ctx.rotate(b.rot);
    if(b.stripe){ctx.fillStyle='#f4f1e8';ctx.fillRect(-rr,-rr,2*rr,2*rr);ctx.fillStyle=b.col;ctx.fillRect(-rr,-rr*.52,2*rr,rr*1.04)}
    else{ctx.fillStyle=b.col;ctx.fillRect(-rr,-rr,2*rr,2*rr)}
    if(b.n>0){
      ctx.fillStyle='#f4f1e8';ctx.beginPath();ctx.arc(0,0,rr*.44,0,TAU);ctx.fill();
      ctx.fillStyle='#111';ctx.font='700 '+Math.round(rr*.55)+'px Archivo,Arial,sans-serif';
      ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(String(b.n),0,rr*.04);
    }
    ctx.rotate(-b.rot);
    var g=ctx.createRadialGradient(-rr*.35,-rr*.4,rr*.05,0,0,rr);
    g.addColorStop(0,'rgba(255,255,255,.65)');g.addColorStop(.35,'rgba(255,255,255,0)');
    g.addColorStop(.75,'rgba(0,0,0,.15)');g.addColorStop(1,'rgba(0,0,0,.6)');
    ctx.fillStyle=g;ctx.fillRect(-rr,-rr,2*rr,2*rr);
    ctx.restore();
  }

  function drawCue(gap,al){
    var tx=cue.x-r-gap,ty=cue.y,len=Wd*.62,tw=r*.3,bw=r*.62;
    ctx.save();ctx.globalAlpha=al;
    function poly(ox,oy){ctx.beginPath();ctx.moveTo(tx+ox,ty-tw+oy);ctx.lineTo(tx-len+ox,ty-bw+oy);ctx.lineTo(tx-len+ox,ty+bw+oy);ctx.lineTo(tx+ox,ty+tw+oy);ctx.closePath()}
    poly(r*.25,r*.45);ctx.fillStyle='rgba(0,0,0,.28)';ctx.fill();
    var g=ctx.createLinearGradient(tx,0,tx-len,0);
    g.addColorStop(0,'#8fc4f5');g.addColorStop(.012,'#f2eee3');g.addColorStop(.05,'#f2eee3');g.addColorStop(.06,'#ecd29c');
    g.addColorStop(.55,'#d4a96a');g.addColorStop(.56,'#cbb27c');g.addColorStop(.575,'#cbb27c');g.addColorStop(.58,'#1f110b');g.addColorStop(1,'#0d0705');
    poly(0,0);ctx.fillStyle=g;ctx.fill();
    ctx.strokeStyle='rgba(255,255,255,.25)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(tx,ty-tw*.4);ctx.lineTo(tx-len,ty-bw*.4);ctx.stroke();
    ctx.restore();
  }

  function draw(){
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);
    ctx.save();
    if(portrait){ctx.translate(W,0);ctx.rotate(Math.PI/2)}
    var dec=ti>0?Math.exp(-(t-ti)*5):0;
    var z=t<T.strike?1.3-.04*ease(t/T.strike):1.26-.26*ease((t-T.strike)/3.4);
    z+=.05*dec;
    var fx=lerp(Wd*.52,Wd*.5,ease((t-1.6)/2.4)),fy=Hd/2;
    var shx=(Math.random()-.5)*16*dec,shy=(Math.random()-.5)*16*dec;
    ctx.translate(Wd/2+shx,Hd/2+shy);ctx.scale(z,z);ctx.translate(-fx,-fy);

    // rail + felt
    ctx.fillStyle='#0e0704';ctx.fillRect(-Wd,-Hd,3*Wd,3*Hd);
    var pad=r*1.8;
    var rg=ctx.createLinearGradient(0,Tp-pad,0,B+pad);
    rg.addColorStop(0,'#4a2314');rg.addColorStop(.5,'#2a130b');rg.addColorStop(1,'#4a2314');
    ctx.fillStyle=rg;ctx.fillRect(L-pad,Tp-pad,R-L+2*pad,B-Tp+2*pad);
    ctx.strokeStyle='rgba(203,178,124,.28)';ctx.lineWidth=1.5;ctx.strokeRect(L-pad*.55,Tp-pad*.55,R-L+pad*1.1,B-Tp+pad*1.1);
    var fg=ctx.createRadialGradient(Wd*.55,Hd/2,Hd*.1,Wd*.5,Hd/2,Wd*.62);
    fg.addColorStop(0,'#1c9a5e');fg.addColorStop(.6,'#126b40');fg.addColorStop(1,'#08301a');
    ctx.fillStyle=fg;ctx.fillRect(L,Tp,R-L,B-Tp);
    if(noise){ctx.fillStyle=noise;ctx.fillRect(L,Tp,R-L,B-Tp)}
    ctx.strokeStyle='rgba(0,0,0,.55)';ctx.lineWidth=7;ctx.strokeRect(L,Tp,R-L,B-Tp);
    ctx.fillStyle='rgba(255,255,255,.12)';ctx.beginPath();ctx.arc(Wd*.64,Hd/2,3,0,TAU);ctx.fill();
    for(var p=0;p<6;p++){
      var px=pockets[p][0],py=pockets[p][1],pg=ctx.createRadialGradient(px,py,0,px,py,pr*.8);
      pg.addColorStop(0,'#000');pg.addColorStop(.7,'#050302');pg.addColorStop(1,'#1d1209');
      ctx.fillStyle=pg;ctx.beginPath();ctx.arc(px,py,pr*.8,0,TAU);ctx.fill();
      ctx.strokeStyle='rgba(203,178,124,.55)';ctx.lineWidth=2.5;ctx.stroke();
    }

    // balls
    var i,b;
    for(i=0;i<balls.length;i++){
      b=balls[i];
      if(b.sunk){
        var k=ease(b.s);if(b.s>=1)continue;
        drawBall(b,lerp(b.px,b.tx,k),lerp(b.py,b.ty,k),1-k*.7,1-k);continue;
      }
      var sp=Math.hypot(b.vx,b.vy);
      if(sp>700){
        for(var g=3;g>=1;g--)drawBall(b,b.x-b.vx*.011*g,b.y-b.vy*.011*g,1,.13);
      }
      drawBall(b,b.x,b.y,1,1);
    }

    // cue
    var gap=0,ca=1,g0=r*.9,g1=r*3.6;
    if(t<T.cue0){gap=g0;ca=ease(t/T.cue0)}
    else if(t<T.pull){gap=g0+(g1-g0)*ease((t-T.cue0)/(T.pull-T.cue0))}
    else if(t<T.hold){gap=g1+Math.sin(t*60)*1.2}
    else if(t<T.strike){var q0=(t-T.hold)/(T.strike-T.hold);gap=g1*(1-q0*q0)}
    else{var q1=t-T.strike;gap=-r*.9*ease(q1/.15);ca=1-ease((q1-.1)/.5)}
    if(ca>.01)drawCue(gap,ca);

    // impact flash
    if(ti>0){
      var fa=Math.exp(-(t-ti)*6)*.9;
      if(fa>.02){
        var fl=ctx.createRadialGradient(ix,iy,0,ix,iy,r*8);
        fl.addColorStop(0,'rgba(255,244,214,'+fa+')');fl.addColorStop(1,'rgba(255,244,214,0)');
        ctx.fillStyle=fl;ctx.fillRect(ix-r*8,iy-r*8,r*16,r*16);
      }
    }
    ctx.restore();
    var vg=ctx.createRadialGradient(W/2,H/2,Math.min(W,H)*.3,W/2,H/2,Math.max(W,H)*.72);
    vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.62)');
    ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
    var fade=1-ease(t/.7);
    if(fade>0){ctx.fillStyle='rgba(0,0,0,'+fade+')';ctx.fillRect(0,0,W,H)}
  }

  function frame(ts){
    if(t0===null){t0=ts;last=ts}
    var real=Math.min((ts-last)/1000,.05);last=ts;t=(ts-t0)/1000;
    var sc=1;
    if(ti>0){var q=t-ti;sc=q<.55?.2:.2+.8*ease((q-.55)/1.3)}
    if(!struck&&t>=T.strike){struck=true;cue.vx=Wd*2.5}
    var dts=real*sc,steps=Math.max(1,Math.ceil(dts/(1/240))),h=dts/steps;
    for(var s=0;s<steps;s++)step(h);
    for(var i=0;i<balls.length;i++)if(balls[i].sunk&&balls[i].s<1)balls[i].s+=real/.28;
    draw();
    if(!brandFired&&t>=T.brand){brandFired=true;cb.brand&&cb.brand()}
    if(!ended&&t>=T.end){ended=true;cb.end&&cb.end()}
    if(t<T.end+1.8)requestAnimationFrame(frame);
  }

  build();
  requestAnimationFrame(frame);
}
window.BFIntro={start:start};
})();