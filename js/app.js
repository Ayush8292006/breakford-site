document.documentElement.classList.add('js');
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const inr=n=>'₹'+Math.round(n).toLocaleString('en-IN');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;



/* ================= CATALOGUE =================
   Four categories, in the order the brand presents them.
   To add real photography, give a product an `img` path, e.g. img:'assets/products/obsidian-cue.jpg'.
   Products without a photo show a neutral placeholder, never an invented picture. */
const CATS=[
 {key:'cues',name:'Cues',blurb:'Pool, snooker and premium cues, sorted by type, weight and tip size.',subs:['Pool Cues','Club Cues','Snooker Cues','Premium Cues']},
 {key:'cases',name:'Cases & Bags',blurb:'Protection for your cue, chosen by where it comes apart.',subs:['Single Joint Cases','3/4 Joint Cases','Half Joint Cases']},
 {key:'tables',name:'Tables',blurb:'Snooker, pool and French billiards tables, delivered and installed.',subs:['Snooker Tables','Pool Tables','French Billiards Tables']},
 {key:'accessories',name:'Accessories',blurb:'Gloves, tips, chalk, ball sets and care equipment.',subs:['Gloves','Cue Tips','Chalk','Ball Sets','Cleaning Equipment']}
];
const catOf=k=>CATS.find(c=>c.key===k);

const P=[];let pid=0;
function mk(o){
  o.id='p'+(++pid); o.facets=o.facets||{}; o.brand=o.brand==='Breakford'?'BREAK FORD':o.brand;
  o.name=o.name.replace(/^Breakford /,'BREAK FORD ');
  if(o.cat==='cues'){const w=parseFloat(o.specs.Weight),t=parseFloat(o.specs['Tip size']);
    o.facets.WeightBand=w<18?'Under 18 oz':w<19?'18 – 19 oz':w<20?'19 – 20 oz':'20 oz and over';
    o.facets.TipBand=t<10?'Under 10 mm':t<12?'10 – 12 mm':'12 mm and over';
    o.facets.Material=o.specs['Shaft'];}
  if(o.cat==='tables')o.facets.Size=o.specs['Table size'];
  if(o.cat==='cases')o.facets.Capacity=o.specs['Capacity'];
  P.push(o);return o;
}
const clothV={name:'Cloth colour',opts:['Championship Green','Tournament Blue','Burgundy']};
const woodV={name:'Wood finish',opts:['Mahogany','American Walnut','Ebony']};
// Tables
mk({name:'Halden Crucible 12ft Championship Snooker Table',cat:'tables',sub:'Snooker Tables',brand:'Halden & Sons',price:685000,stock:3,tier:'Premium',art:{k:'table',g:'snooker',felt:'#1d6b3c',wood:'#5a2617'},
 specs:{'Table size':'12 ft','Playing area':'3569 × 1778 mm','Slate':'45 mm, 5-piece Italian','Cloth':'Worsted 6811-grade','Cushion':'Steel-block, championship profile','Pockets':'86 mm template','Weight':'≈ 1,450 kg','Installation':'Included, with levelling'},
 variants:[clothV,woodV],desc:'Built to the dimensions used in professional snooker: a 12ft frame carrying five pieces of 45 mm slate, steel-block cushions and pocket openings cut to the 86 mm template. Our fitters level it to within half a millimetre on site.'});
mk({name:'Ashgrove Club 10ft Snooker Table',cat:'tables',sub:'Snooker Tables',brand:'Ashgrove',price:340000,stock:6,tier:'Pro',art:{k:'table',g:'snooker',felt:'#1f6a3f',wood:'#6b3a20'},
 specs:{'Table size':'10 ft','Playing area':'2946 × 1473 mm','Slate':'38 mm, 3-piece','Cloth':'Worsted club-grade','Cushion':'Rubber, club profile','Pockets':'89 mm','Weight':'≈ 900 kg','Installation':'Included'},
 variants:[clothV,woodV],desc:'The club-room workhorse. Three-piece slate on a solid hardwood frame, sized for rooms that cannot take a full 12ft table.'});
mk({name:'Kestrel Home 6ft Snooker Table',cat:'tables',sub:'Snooker Tables',brand:'Kestrel',price:78500,stock:12,tier:'Club',art:{k:'table',g:'snooker',felt:'#22744a',wood:'#7b4a2a'},
 specs:{'Table size':'6 ft','Playing area':'1727 × 864 mm','Bed':'19 mm slate','Cloth':'Speed cloth','Cushion':'Rubber','Pockets':'Drop pockets with nets','Weight':'≈ 160 kg','Installation':'Self-assembly guide included'},
 variants:[clothV],desc:'A compact slate-bed table for home games and practice routines, with leather-trimmed net pockets.'});
mk({name:'Halden Regent 12ft Tournament Snooker Table',cat:'tables',sub:'Snooker Tables',brand:'Halden & Sons',price:520000,stock:0,tier:'Premium',art:{k:'table',g:'snooker',felt:'#1a5d36',wood:'#3d1d12'},
 specs:{'Table size':'12 ft','Playing area':'3569 × 1778 mm','Slate':'45 mm, 5-piece','Cloth':'Worsted 6811-grade','Cushion':'Steel-block','Pockets':'86 mm template','Weight':'≈ 1,380 kg','Installation':'Included'},
 variants:[clothV,woodV],desc:'Turned legs and a plain rail line for clubs that prefer a traditional look. Next production batch is open for pre-order.'});
mk({name:'Corvex Pro 9ft Pool Table',cat:'tables',sub:'Pool Tables',brand:'Corvex',price:245000,stock:4,tier:'Pro',art:{k:'table',g:'pool',felt:'#1f5f8a',wood:'#2b2b2e'},
 specs:{'Table size':'9 ft','Playing area':'2540 × 1270 mm','Slate':'25 mm, 3-piece','Cloth':'Worsted tournament speed','Cushion':'K66 profile','Pockets':'Leather drop, 114 mm','Weight':'≈ 520 kg','Installation':'Included'},
 variants:[{name:'Cloth colour',opts:['Tournament Blue','Championship Green','Charcoal']},{name:'Wood finish',opts:['Graphite','American Walnut']}],desc:'Regulation 9ft playing surface with tournament-speed worsted cloth. The size used for 9-ball and 10-ball events.'});
mk({name:'Breakford Signature 8ft Pool Table',cat:'tables',sub:'Pool Tables',brand:'Breakford',price:189000,stock:2,tier:'Premium',art:{k:'table',g:'pool',felt:'#1d6b3c',wood:'#5a2617'},
 specs:{'Table size':'8 ft','Playing area':'2235 × 1118 mm','Slate':'25 mm, 3-piece','Cloth':'Worsted speed','Cushion':'K66 profile','Pockets':'Leather drop','Weight':'≈ 430 kg','Installation':'Included'},
 variants:[clothV,woodV],desc:'Our own table: brass corner castings, a solid mahogany rail and a slate bed that fits a standard Indian living room with space to cue.'});
mk({name:'Ashgrove Tavern 7ft Pool Table',cat:'tables',sub:'Pool Tables',brand:'Ashgrove',price:118000,stock:9,tier:'Club',art:{k:'table',g:'pool',felt:'#7a1f2b',wood:'#6b3a20'},
 specs:{'Table size':'7 ft','Playing area':'1981 × 991 mm','Slate':'19 mm, 1-piece','Cloth':'Club speed','Cushion':'Rubber','Pockets':'Ball-return system','Weight':'≈ 280 kg','Installation':'Included'},
 variants:[{name:'Cloth colour',opts:['Burgundy','Championship Green','Tournament Blue']}],desc:'A bar-box table with ball return, built for heavy daily play in cafés and lounges.'});
mk({name:'Kestrel Fold 6ft Pool Table',cat:'tables',sub:'Pool Tables',brand:'Kestrel',price:54900,stock:0,tier:'Club',art:{k:'table',g:'pool',felt:'#22744a',wood:'#8a5a34'},
 specs:{'Table size':'6 ft','Playing area':'1727 × 864 mm','Bed':'MDF, 25 mm','Cloth':'Wool blend','Cushion':'Rubber','Pockets':'Drop pockets','Weight':'≈ 90 kg','Installation':'Folds for storage'},
 variants:[clothV],desc:'A folding pool table on castors for rooms that need to change use. Back in stock soon.'});
mk({name:'Vernier Carom 10ft Match Table',cat:'tables',sub:'French Billiards Tables',brand:'Vernier',price:410000,stock:2,tier:'Premium',art:{k:'table',g:'carom',felt:'#1f5f8a',wood:'#3d1d12'},
 specs:{'Table size':'10 ft','Playing area':'2840 × 1420 mm','Slate':'45 mm, heated','Cloth':'Carom napless','Cushion':'Carom profile, 37 mm','Pockets':'None (carom)','Weight':'≈ 1,000 kg','Installation':'Included, with heating'},
 variants:[{name:'Cloth colour',opts:['Tournament Blue','Championship Green']},woodV],desc:'Match-size pocketless table for three-cushion and libre. A heated slate keeps the napless cloth fast and the cushions consistent.'});
mk({name:'Vernier Salon 9ft Carom Table',cat:'tables',sub:'French Billiards Tables',brand:'Vernier',price:295000,stock:5,tier:'Pro',art:{k:'table',g:'carom',felt:'#1d6b3c',wood:'#6b3a20'},
 specs:{'Table size':'9 ft','Playing area':'2540 × 1270 mm','Slate':'38 mm','Cloth':'Carom napless','Cushion':'Carom profile','Pockets':'None (carom)','Weight':'≈ 650 kg','Installation':'Included'},
 variants:[{name:'Cloth colour',opts:['Championship Green','Tournament Blue']}],desc:'A smaller carom table for home salons and training rooms.'});
// Cues
const cueV=(w,t,l)=>[{name:'Weight',opts:w},{name:'Tip size',opts:t},{name:'Length',opts:l}];
mk({name:'Corvex Velocity Pool Cue',cat:'cues',sub:'Pool Cues',brand:'Corvex',price:14500,stock:14,tier:'Pro',art:{k:'cue',a:'#2a2a2e',b:'#b98a55',wrap:'#111'},
 specs:{'Weight':'19 oz','Tip size':'12.75 mm','Length':'58 in','Shaft':'Maple','Butt':'Birdseye maple','Joint':'Half joint, radial pin','Tip':'Layered, medium'},variants:cueV(['18.5 oz','19 oz','19.5 oz'],['12.5 mm','12.75 mm'],['58 in']),desc:'Low-deflection maple shaft on a two-piece radial-pin butt. Linen wrap, medium layered tip.'});
mk({name:'Breakford Breaker Jump Cue',cat:'cues',sub:'Pool Cues',brand:'Breakford',price:9800,stock:7,tier:'Pro',art:{k:'cue',a:'#5a2617',b:'#c9a265',wrap:'#1a1a1a'},
 specs:{'Weight':'20 oz','Tip size':'13 mm','Length':'58 in (41 in jump)','Shaft':'Maple','Butt':'Maple, removable section','Joint':'Half joint, quick release','Tip':'Phenolic, hard'},variants:cueV(['20 oz','21 oz'],['13 mm'],['58 in']),desc:'A hard phenolic tip for the break shot and a removable butt section that turns it into a jump cue.'});
mk({name:'Kestrel Bar Pool Cue',cat:'cues',sub:'Pool Cues',brand:'Kestrel',price:3200,stock:40,tier:'Club',art:{k:'cue',a:'#2d4b6e',b:'#d8b98a',wrap:'#2d4b6e'},
 specs:{'Weight':'19 oz','Tip size':'13 mm','Length':'57 in','Shaft':'Ash','Butt':'Hardwood','Joint':'Half joint','Tip':'Glue-on, medium'},variants:cueV(['18 oz','19 oz','20 oz'],['13 mm'],['57 in']),desc:'Honest two-piece cue for lounges and first-time players.'});
mk({name:'Ashgrove Club Cue',cat:'cues',sub:'Club Cues',brand:'Ashgrove',price:2400,stock:60,tier:'Club',art:{k:'cue',a:'#3b1d12',b:'#d6b07a',wrap:'#3b1d12'},
 specs:{'Weight':'18 oz','Tip size':'10 mm','Length':'57 in','Shaft':'Ash','Butt':'Ramin','Joint':'One piece','Tip':'Screw-on, medium'},variants:cueV(['17.5 oz','18 oz','18.5 oz'],['10 mm'],['57 in']),desc:'One-piece ash rack cue. Clubs buy these in tens.'});
mk({name:'Kestrel House Club Cue',cat:'cues',sub:'Club Cues',brand:'Kestrel',price:1650,stock:110,tier:'Club',art:{k:'cue',a:'#1c1c1c',b:'#cfa877',wrap:'#1c1c1c'},
 specs:{'Weight':'18 oz','Tip size':'11 mm','Length':'57 in','Shaft':'Ash','Butt':'Hardwood','Joint':'One piece','Tip':'Glue-on'},variants:cueV(['18 oz','19 oz'],['11 mm'],['57 in']),desc:'The lowest-cost cue we stock that still plays straight.'});
mk({name:'Halden Club Pro Cue',cat:'cues',sub:'Club Cues',brand:'Halden & Sons',price:4900,stock:3,tier:'Pro',art:{k:'cue',a:'#2a1208',b:'#d8b98a',wrap:'#2a1208'},
 specs:{'Weight':'18.5 oz','Tip size':'10 mm','Length':'57 in','Shaft':'Ash','Butt':'Ebony veneer','Joint':'One piece','Tip':'Layered, medium'},variants:cueV(['18 oz','18.5 oz','19 oz'],['9.5 mm','10 mm'],['57 in']),desc:'A step up for club regulars: hand-planed ash shaft and an ebony-veneered butt.'});
mk({name:'Halden Heritage Snooker Cue',cat:'cues',sub:'Snooker Cues',brand:'Halden & Sons',price:18500,stock:5,tier:'Premium',art:{k:'cue',a:'#130907',b:'#e3c48f',wrap:'#130907',splice:true},
 specs:{'Weight':'18 oz','Tip size':'9.5 mm','Length':'57 in','Shaft':'Ash','Butt':'Ebony, 4-point splice','Joint':'3/4 joint, brass','Tip':'Layered, medium-hard'},variants:cueV(['17.5 oz','18 oz','18.5 oz'],['9.5 mm','10 mm'],['57 in','58 in']),desc:'Straight-grain ash on a solid ebony butt with a four-point splice. Comes with a mini butt extension.'});
mk({name:'Corvex Century Snooker Cue',cat:'cues',sub:'Snooker Cues',brand:'Corvex',price:11200,stock:8,tier:'Pro',art:{k:'cue',a:'#3b1d12',b:'#dcc093',wrap:'#3b1d12'},
 specs:{'Weight':'18.5 oz','Tip size':'10 mm','Length':'57 in','Shaft':'Ash','Butt':'Rosewood','Joint':'3/4 joint','Tip':'Layered, medium'},variants:cueV(['18 oz','18.5 oz','19 oz'],['9.5 mm','10 mm'],['57 in']),desc:'A balanced 3/4 jointed cue with a slim rosewood butt. Telescopic extension included.'});
mk({name:'Ashgrove Match Snooker Cue',cat:'cues',sub:'Snooker Cues',brand:'Ashgrove',price:6800,stock:2,tier:'Club',art:{k:'cue',a:'#4a2217',b:'#e0c08c',wrap:'#4a2217'},
 specs:{'Weight':'17.5 oz','Tip size':'9.8 mm','Length':'57 in','Shaft':'Ash','Butt':'Hardwood','Joint':'One piece','Tip':'Layered, soft'},variants:cueV(['17 oz','17.5 oz','18 oz'],['9.8 mm'],['57 in']),desc:'One-piece match cue for players moving off club cues.'});
mk({name:'Breakford Obsidian Hand-Spliced Cue',cat:'cues',sub:'Premium Cues',brand:'Breakford',price:68000,stock:2,tier:'Premium',art:{k:'cue',a:'#0b0b0c',b:'#e7c88f',wrap:'#0b0b0c',splice:true,inlay:'#c9a265'},
 specs:{'Weight':'18 oz','Tip size':'9.5 mm','Length':'57 in','Shaft':'Ash, hand-selected','Butt':'Ebony, 8-point splice','Joint':'3/4 joint, stainless','Tip':'Layered, medium'},variants:cueV(['17.5 oz','18 oz','18.5 oz'],['9 mm','9.5 mm','10 mm'],['57 in','58 in']),desc:'Made to order in our workshop. Eight hand-cut splices, brass inlays and a shaft chosen from straight-grain ash. Six-week build time.'});
mk({name:'Halden Masterwork 8-Point Cue',cat:'cues',sub:'Premium Cues',brand:'Halden & Sons',price:112000,stock:1,tier:'Premium',art:{k:'cue',a:'#2a0f0a',b:'#f0dcb4',wrap:'#2a0f0a',splice:true,inlay:'#f0e9db'},
 specs:{'Weight':'18 oz','Tip size':'9.5 mm','Length':'57.5 in','Shaft':'Ash, 30-year seasoned','Butt':'Snakewood & ebony','Joint':'3/4 joint, brass','Tip':'Layered, medium-hard'},variants:cueV(['18 oz'],['9.5 mm'],['57.5 in']),desc:'Snakewood and ebony butt, eight splices and a long-seasoned ash shaft. One available.'});
mk({name:'Corvex Carbon Stealth Cue',cat:'cues',sub:'Premium Cues',brand:'Corvex',price:54000,stock:6,tier:'Premium',art:{k:'cue',a:'#151618',b:'#2f3236',wrap:'#151618',carbon:true},
 specs:{'Weight':'19 oz','Tip size':'12.4 mm','Length':'58 in','Shaft':'Carbon composite','Butt':'Carbon & maple','Joint':'Half joint, uni-loc','Tip':'Layered, medium'},variants:cueV(['18.5 oz','19 oz','19.5 oz'],['11.8 mm','12.4 mm'],['58 in']),desc:'Carbon composite shaft for very low deflection, with no warping from humidity.'});
// Accessories
mk({name:'Breakford Three-Finger Glove',cat:'accessories',sub:'Gloves',brand:'Breakford',price:1290,stock:80,tier:'Pro',art:{k:'glove',c:'#1a1a1c',s:'#c9a265'},specs:{'Material':'Lycra, suede bridge','Hand':'Bridge hand','Closure':'Velcro wrist'},variants:[{name:'Hand',opts:['Left','Right']},{name:'Size',opts:['S','M','L','XL']}],desc:'Lets the cue slide clean on a humid evening. Suede bridge pad, ventilated back.'});
mk({name:'Corvex Pro Glove',cat:'accessories',sub:'Gloves',brand:'Corvex',price:1890,stock:4,tier:'Premium',art:{k:'glove',c:'#1f3a5a',s:'#79abd0'},specs:{'Material':'Microfibre, silicone grip','Hand':'Bridge hand','Closure':'Pull-on'},variants:[{name:'Hand',opts:['Left','Right']},{name:'Size',opts:['S','M','L']}],desc:'A thinner glove for players who feel the cloth through the bridge.'});
mk({name:'Kestrel Club Gloves, Pack of 3',cat:'accessories',sub:'Gloves',brand:'Kestrel',price:1150,stock:30,tier:'Club',art:{k:'glove',c:'#2b2b2b',s:'#a2ada6'},specs:{'Material':'Nylon blend','Hand':'Bridge hand','Pack':'3 gloves'},variants:[{name:'Size',opts:['M','L']}],desc:'Washable gloves for clubs to keep at the counter.'});
mk({name:'Kestrel Layered Tips 10 mm, Box of 10',cat:'accessories',sub:'Cue Tips',brand:'Kestrel',price:1450,stock:50,tier:'Club',art:{k:'tips',c:'#6b3a20'},specs:{'Diameter':'10 mm','Hardness':'Medium','Layers':'8 pig-skin','Pack':'10 tips'},variants:[{name:'Hardness',opts:['Soft','Medium','Hard']}],desc:'Layered tips for snooker and club cues.'});
mk({name:'Halden Elk Master Tips 9.5 mm, Box of 50',cat:'accessories',sub:'Cue Tips',brand:'Halden & Sons',price:2900,stock:12,tier:'Pro',art:{k:'tips',c:'#8a5a34'},specs:{'Diameter':'9.5 mm','Hardness':'Medium','Layers':'Single, pressed','Pack':'50 tips'},variants:[],desc:'The tip most snooker workshops fit by default.'});
mk({name:'Corvex Pro Laminated Tip 13 mm',cat:'accessories',sub:'Cue Tips',brand:'Corvex',price:890,stock:0,tier:'Premium',art:{k:'tips',c:'#2a2a2e'},specs:{'Diameter':'13 mm','Hardness':'Medium','Layers':'10 laminated','Pack':'1 tip'},variants:[{name:'Hardness',opts:['Soft','Medium','Hard']}],desc:'Premium laminated tip for pool cues.'});
mk({name:'Breakford Shaft Care Kit',cat:'accessories',sub:'Cleaning Equipment',brand:'Breakford',price:1690,stock:22,tier:'Pro',art:{k:'clean',c:'#c9a265'},specs:{'Contents':'Cleaner 100 ml, burnisher, microfibre','Use':'Cue shafts','Kit':'3 pieces'},variants:[],desc:'Removes chalk and hand oils from the shaft without raising the grain.'});
mk({name:'Ashgrove Cloth Brush & Iron Set',cat:'accessories',sub:'Cleaning Equipment',brand:'Ashgrove',price:4250,stock:5,tier:'Pro',art:{k:'clean',c:'#1d6b3c'},specs:{'Contents':'Table brush, table iron','Use':'Worsted cloth','Kit':'2 pieces'},variants:[],desc:'Brush with the nap, then iron to keep the cloth fast and flat.'});
mk({name:'Kestrel Ball Cleaner 250 ml',cat:'accessories',sub:'Cleaning Equipment',brand:'Kestrel',price:690,stock:70,tier:'Club',art:{k:'clean',c:'#79abd0'},specs:{'Contents':'250 ml liquid','Use':'Phenolic & resin balls','Kit':'1 bottle'},variants:[],desc:'Lifts chalk marks from balls before every session.'});
mk({name:'Breakford Tournament Pool Ball Set',cat:'accessories',sub:'Ball Sets',brand:'Breakford',price:8900,stock:16,tier:'Pro',art:{k:'balls',g:'pool'},specs:{'Diameter':'57.2 mm','Material':'Phenolic resin','Balls':'16 incl. cue ball'},variants:[],desc:'Phenolic resin set at 57.2 mm, the standard pool size.'});
mk({name:'Halden Championship Snooker Ball Set',cat:'accessories',sub:'Ball Sets',brand:'Halden & Sons',price:14800,stock:7,tier:'Premium',art:{k:'balls',g:'snooker'},specs:{'Diameter':'52.5 mm','Material':'Phenolic resin','Balls':'22 (15 reds, 6 colours, cue)'},variants:[],desc:'Twenty-two balls at 52.5 mm, matched for weight within a fraction of a gram.'});
mk({name:'Vernier Carom Ball Set',cat:'accessories',sub:'Ball Sets',brand:'Vernier',price:7600,stock:3,tier:'Pro',art:{k:'balls',g:'carom'},specs:{'Diameter':'61.5 mm','Material':'Phenolic resin','Balls':'3 (white, yellow, red)'},variants:[],desc:'The three-ball set for French billiards and three-cushion.'});
// Cases
mk({name:'Halden Full-Length Aluminium Case',cat:'cases',sub:'Single Joint Cases',brand:'Halden & Sons',price:3900,stock:20,tier:'Club',art:{k:'case',c:'#9aa1a6',j:'single'},specs:{'Fits':'One-piece cues to 58 in','Capacity':'1 cue','Shell':'Aluminium','Lining':'Foam'},variants:[],desc:'A hard tube for one-piece cues. Light, and stops warping in transit.'});
mk({name:'Ashgrove Leather Single Case',cat:'cases',sub:'Single Joint Cases',brand:'Ashgrove',price:6800,stock:6,tier:'Premium',art:{k:'case',c:'#5a2617',j:'single'},specs:{'Fits':'One-piece cues to 58 in','Capacity':'1 cue + extension','Shell':'Leather over wood','Lining':'Velvet'},variants:[{name:'Colour',opts:['Tan','Oxblood','Black']}],desc:'Stitched leather over a wooden frame, with a pocket for an extension.'});
mk({name:'Corvex 3/4 Jointed Hard Case',cat:'cases',sub:'3/4 Joint Cases',brand:'Corvex',price:4500,stock:11,tier:'Pro',art:{k:'case',c:'#1d1f22',j:'three'},specs:{'Fits':'3/4 jointed cues','Capacity':'1 cue + 2 extensions','Shell':'ABS','Lining':'Foam'},variants:[{name:'Colour',opts:['Black','Navy']}],desc:'Moulded ABS shell with slots for a mini butt and a telescopic extension.'});
mk({name:'Halden Twin 3/4 Leather Case',cat:'cases',sub:'3/4 Joint Cases',brand:'Halden & Sons',price:9900,stock:2,tier:'Premium',art:{k:'case',c:'#3b1d12',j:'three'},specs:{'Fits':'3/4 jointed cues','Capacity':'2 cues','Shell':'Leather over wood','Lining':'Velvet'},variants:[{name:'Colour',opts:['Oxblood','Black']}],desc:'Carries a playing cue and a spare side by side.'});
mk({name:'Breakford Half-Joint Backpack Case',cat:'cases',sub:'Half Joint Cases',brand:'Breakford',price:7400,stock:9,tier:'Premium',art:{k:'case',c:'#0f3a2d',j:'half'},specs:{'Fits':'Two-piece pool cues','Capacity':'2 butts + 4 shafts','Shell':'Nylon over foam','Lining':'Microfibre'},variants:[{name:'Colour',opts:['Baize Green','Black']}],desc:'Shoulder straps, a glove pocket and room for a break cue.'});
mk({name:'Kestrel Half-Joint Soft Case',cat:'cases',sub:'Half Joint Cases',brand:'Kestrel',price:2600,stock:0,tier:'Club',art:{k:'case',c:'#2d4b6e',j:'half'},specs:{'Fits':'Two-piece pool cues','Capacity':'1 butt + 2 shafts','Shell':'Nylon','Lining':'Foam'},variants:[],desc:'A light zip case for one cue and a spare shaft.'});
// Chalk
mk({name:'Corvex Blue Chalk, 12 Cubes',cat:'accessories',sub:'Chalk',brand:'Corvex',price:540,stock:200,tier:'Club',art:{k:'chalk',c:'#2f6fae'},specs:{'Colour':'Blue','Pack':'12 cubes','For':'Pool & snooker'},variants:[],desc:'Everyday chalk for club tables.'});
mk({name:'Halden Tournament Chalk Green, 2 Cubes',cat:'accessories',sub:'Chalk',brand:'Halden & Sons',price:780,stock:40,tier:'Pro',art:{k:'chalk',c:'#1d6b3c'},specs:{'Colour':'Green','Pack':'2 cubes','For':'Snooker'},variants:[],desc:'Fine-grain chalk that matches green cloth and marks it less.'});
mk({name:'Breakford Pro Chalk',cat:'accessories',sub:'Chalk',brand:'Breakford',price:1450,stock:3,tier:'Premium',art:{k:'chalk',c:'#79abd0'},specs:{'Colour':'Blue','Pack':'1 cube','For':'Pool & snooker'},variants:[{name:'Colour',opts:['Blue','Green','Grey']}],desc:'Low-dust chalk that holds on the tip for longer between strokes.'});
mk({name:'Kestrel Club Chalk Tub, 144 Cubes',cat:'accessories',sub:'Chalk',brand:'Kestrel',price:2100,stock:15,tier:'Club',art:{k:'chalk',c:'#556b78'},specs:{'Colour':'Grey','Pack':'144 cubes','For':'Club use'},variants:[],desc:'A gross of chalk for clubs and cafés.'});
mk({name:'Vernier Carom Chalk Red, 3 Cubes',cat:'accessories',sub:'Chalk',brand:'Vernier',price:960,stock:0,tier:'Pro',art:{k:'chalk',c:'#9c2b2b'},specs:{'Colour':'Red','Pack':'3 cubes','For':'Carom'},variants:[],desc:'For red-cloth carom tables and three-cushion.'});

/* ================= PICTOGRAMS (neutral placeholders, line only) ================= */
const PICT={
 cue:`<svg viewBox="0 0 200 120" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"><path d="M12.2 100.4 L185.6 15.1 L186.5 16.9 L15.8 107.6 Z"/><path d="M46.9 83.4 L50 89.4 M74.6 69.7 L77.2 74.9"/><path d="M98.9 57.8 L101.1 62.2" stroke="#cbb27c"/><path d="M180.2 17.9 L181.6 20.6"/></svg>`,
 table:`<svg viewBox="0 0 200 120" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="18" y="20" width="164" height="80" rx="5"/><rect x="28" y="30" width="144" height="60"/><circle cx="28" cy="30" r="5"/><circle cx="172" cy="30" r="5"/><circle cx="28" cy="90" r="5"/><circle cx="172" cy="90" r="5"/><circle cx="100" cy="28" r="4"/><circle cx="100" cy="92" r="4"/><path d="M64 30 V90" stroke-dasharray="2 4"/></svg>`,
 case:`<svg viewBox="0 0 200 120" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"><rect x="18" y="49" width="164" height="22" rx="11" transform="rotate(-22 100 60)"/><path d="M76 59 q14-22 30-12" transform="rotate(-22 100 60)"/><path d="M150 49 V71" transform="rotate(-22 100 60)"/></svg>`,
 balls:`<svg viewBox="0 0 200 120" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M100 18 L152 104 H48 Z" stroke-linejoin="round"/><circle cx="100" cy="52" r="10"/><circle cx="89" cy="71" r="10"/><circle cx="111" cy="71" r="10"/><circle cx="78" cy="90" r="10"/><circle cx="100" cy="90" r="10"/><circle cx="122" cy="90" r="10"/></svg>`,
 glove:`<svg viewBox="0 0 200 120" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"><path d="M80 108 V64 L74 30 a6 6 0 0 1 12-2 L92 56 L94 22 a6 6 0 0 1 12 0 L106 56 L114 30 a6 6 0 0 1 12 3 L118 70 L132 58 a7 7 0 0 1 10 9 L118 96 V108 Z"/><path d="M80 98 H118"/></svg>`,
 tips:`<svg viewBox="0 0 200 120" fill="none" stroke="currentColor" stroke-width="1.2"><ellipse cx="100" cy="38" rx="34" ry="10"/><path d="M66 38 V52 a34 10 0 0 0 68 0 V38"/><path d="M66 66 v14 a34 10 0 0 0 68 0 V66"/><ellipse cx="100" cy="66" rx="34" ry="10"/></svg>`,
 chalk:`<svg viewBox="0 0 200 120" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"><path d="M100 16 L146 36 L100 56 L54 36 Z"/><path d="M54 36 V82 L100 104 V56"/><path d="M146 36 V82 L100 104"/><ellipse cx="100" cy="36" rx="14" ry="6"/></svg>`,
 clean:`<svg viewBox="0 0 200 120" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"><rect x="80" y="38" width="40" height="70" rx="6"/><rect x="90" y="16" width="20" height="22" rx="2"/><path d="M88 62 H112 M88 70 H104"/></svg>`
};
const pictFor=p=>PICT[p.art&&PICT[p.art.k]?p.art.k:'balls'];
const CAT_PICT={cues:'cue',cases:'case',tables:'table',accessories:'balls'};
/* ================= PRODUCT PHOTOS =================
   Representative photos (Unsplash, free licence) chosen per sub-category, so every card shows a real image.
   Replace with BREAK FORD's own product photos by giving a product an `img` path, e.g. 'assets/products/obsidian.jpg'. */
const U=(id,w)=>`https://images.unsplash.com/${id}?w=${w}&q=70&auto=format&fit=crop`;
const SUBIMG={
 'Pool Cues':['photo-1776513726164-250bfef8401f','photo-1543928612-0b3a1a5d9223','photo-1575553939928-d03b21323afe'],
 'Club Cues':['photo-1761012322191-67444d1133d4','photo-1556329754-9420aeb663c5','photo-1656381836187-79f6d0ae2e57'],
 'Snooker Cues':['photo-1765375411723-9ea3d4edff26','photo-1656381836187-79f6d0ae2e57','photo-1556329754-9420aeb663c5'],
 'Premium Cues':['photo-1761012321912-f9c7f1f413ba','photo-1766345655631-7efbdda8e13a','photo-1706288456883-9013976d2154'],
 'Single Joint Cases':['photo-1711037693443-51bb889f89f6','photo-1696451355863-06fbcb892826'],
 '3/4 Joint Cases':['photo-1706288456883-9013976d2154','photo-1711037695083-e5997939dff5'],
 'Half Joint Cases':['photo-1692636561022-d0331f96892a','photo-1696451355863-06fbcb892826'],
 'Snooker Tables':['photo-1760903192559-17dc111d31e3','photo-1707916032532-0903a3cd9e59','photo-1668367274956-f17df8a5ba19','photo-1595538740791-5baed7b484ff'],
 'Pool Tables':['photo-1761591847985-2184afaab747','photo-1535066925810-38b22c6b8255','photo-1763830915739-b560abcd5fd4','photo-1544070928-135893793bdc'],
 'French Billiards Tables':['photo-1692153142537-58f4e9d00cfa','photo-1692153142893-08b56ad7d6e1'],
 'Gloves':['photo-1556329754-9420aeb663c5','photo-1761012322191-67444d1133d4','photo-1765375411723-9ea3d4edff26'],
 'Cue Tips':['photo-1661663996100-0c942adf4be2','photo-1776513726180-1e4e22b0fb19','photo-1584659886503-8f50f01cd84b'],
 'Chalk':['photo-1776513726180-1e4e22b0fb19','photo-1584659886503-8f50f01cd84b','photo-1743255044291-a85287a2ca4d','photo-1732024005661-bd64373da062','photo-1661663996100-0c942adf4be2'],
 'Ball Sets':['photo-1770802944430-3a2571c047e1','photo-1694888409336-dd51291e99b1','photo-1787095554922-5729c589a8e2'],
 'Cleaning Equipment':['photo-1611111142691-336dc4530ad0','photo-1763830915835-98ab48194d6f','photo-1580189975076-317533c0b7a6']
};
const CATIMG={cues:'photo-1761012321912-f9c7f1f413ba',cases:'photo-1706288456883-9013976d2154',tables:'photo-1761591847985-2184afaab747',accessories:'photo-1661663996100-0c942adf4be2'};
{const n={};P.forEach(p=>{const l=SUBIMG[p.sub];if(l&&!p.img){const i=(n[p.sub]=(n[p.sub]||0)+1)-1;p.photo=l[i%l.length]}})}
function media(p,cls='',w=600){
  const ph=`<div class="ph ${cls}" aria-hidden="true">${pictFor(p)}</div>`;
  if(p.img)return ph+`<img src="${p.img}" alt="${esc(p.name)}" loading="lazy" onerror="this.remove()">`;
  if(p.photo)return ph+`<img src="${U(p.photo,w)}" srcset="${U(p.photo,Math.round(w/2))} ${Math.round(w/2)}w, ${U(p.photo,w)} ${w}w, ${U(p.photo,w*2)} ${w*2}w" sizes="(max-width:620px) 50vw, 25vw" alt="${esc(p.name)}" loading="lazy" onerror="this.remove()">`;
  return ph;
}

/* ================= STATE ================= */
const S={view:'home',cat:null,sub:null,q:'',f:{},price:null,sort:'feat',pid:null,sel:{},qty:1,tab:'desc'};
let cart=[];try{cart=JSON.parse(localStorage.getItem('bf-cart')||'[]').filter(l=>P.some(p=>p.id===l.id))}catch(e){}
const saveCart=()=>{try{localStorage.setItem('bf-cart',JSON.stringify(cart))}catch(e){}};
const countIn=(c,s)=>P.filter(p=>p.cat===c&&(!s||p.sub===s)).length;
const chev=`<svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.4"><path d="m2 3.5 3 3 3-3"/></svg>`;
const arrow=`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 12h15M13 6l6 6-6 6"/></svg>`;

/* ================= ROUTER (hash based, so Back and Forward work) ================= */
const enc=encodeURIComponent;
function href(r){
  if(r.view==='shop'){if(r.q)return '#/search/'+enc(r.q);return '#/c/'+r.cat+(r.sub?'/'+enc(r.sub):'')}
  if(r.view==='product')return '#/p/'+r.pid;
  return '#/';
}
function parse(){
  const h=decodeURIComponent(location.hash.replace(/^#\/?/,'')).split('/');
  if(h[0]==='c'&&catOf(h[1]))return{view:'shop',cat:h[1],sub:catOf(h[1]).subs.includes(h[2])?h[2]:null,q:''};
  if(h[0]==='search'&&h[1])return{view:'shop',cat:null,sub:null,q:h.slice(1).join('/')};
  if(h[0]==='p'&&P.some(p=>p.id===h[1]))return{view:'product',pid:h[1]};
  return{view:'home'};
}
let pendingScroll=null;
function go(r,scrollTo){
  pendingScroll=scrollTo||null;
  const h=href(r);
  if(location.hash===h||(h==='#/'&&!location.hash.replace(/^#\/?/,''))){route();return}
  location.hash=h;
}
function route(){
  const r=parse(),v=$('#view'),same=S.view===r.view&&S.cat===(r.cat||null)&&S.sub===(r.sub||null)&&S.pid===(r.pid||null)&&S.q===(r.q||'');
  closeAll();
  const apply=()=>{
    Object.assign(S,{cat:null,sub:null,q:'',pid:null},r);
    if(r.view==='shop'){S.f={};S.price=null;S.sort='feat'}
    if(r.view==='product'){S.sel={};S.qty=1;S.tab='desc'}
    render();
    if(pendingScroll){const t=pendingScroll;pendingScroll=null;requestAnimationFrame(()=>scrollToEl(t))}
    else window.scrollTo(0,0);
    v.classList.remove('swap');
  };
  if(same&&v.children.length){if(pendingScroll){const t=pendingScroll;pendingScroll=null;scrollToEl(t)}return}
  if(RM||!v.children.length){apply();return}
  v.classList.add('swap');setTimeout(apply,220);
}
/* Update the address without re-rendering. Works on a normal web server, from a local file,
   and inside sandboxed previews (where replaceState can be blocked). */
function setHashQuiet(h){
  try{history.replaceState(null,'',location.href.split('#')[0]+h)}
  catch(e){quietHash=h;try{location.replace(h)}catch(e2){quietHash=null}}
}
let quietHash=null;
function scrollToEl(sel){const e=$(sel);if(!e)return;window.scrollTo({top:e.getBoundingClientRect().top+scrollY-$('#hdr').offsetHeight-8,behavior:RM?'auto':'smooth'})}
addEventListener('hashchange',()=>{if(quietHash&&location.hash===quietHash){quietHash=null;return}quietHash=null;route()});
function goHomeTo(sel){if(S.view==='home'){closeAll();scrollToEl(sel)}else go({view:'home'},sel)}

/* ================= NAV ================= */
function buildNav(){
  $('#nav').innerHTML=CATS.map(c=>`<div class="nav-item"><button class="nav-btn" aria-haspopup="true" aria-expanded="false" data-cat="${c.key}">${c.name}${chev}</button>
   <div class="drop">${c.subs.map(s=>`<button data-go="${c.key}|${s}"><span>${s}</span><span>${countIn(c.key,s)}</span></button>`).join('')}
   <button class="all" data-go="${c.key}|"><span>View all ${c.name}</span><span>${arrow}</span></button></div></div>`).join('');
  $('#mCats').innerHTML=CATS.map(c=>`<div class="m-cat"><button>${c.name}${chev}</button><div class="m-subs"><div>${c.subs.map(s=>`<button data-go="${c.key}|${s}">${s}</button>`).join('')}<button class="all" data-go="${c.key}|">View all ${c.name}</button></div></div></div>`).join('');
  $('#footShop').innerHTML=CATS.map(c=>`<li><button data-go="${c.key}|">${c.name}</button></li>`).join('');
  $$('.nav-btn').forEach(b=>b.addEventListener('click',e=>{
    const it=b.parentElement,o=!it.classList.contains('open');
    $$('.nav-item').forEach(n=>{n.classList.remove('open');n.firstElementChild.setAttribute('aria-expanded','false')});
    if(o){it.classList.add('open');b.setAttribute('aria-expanded','true')}e.stopPropagation()}));
  $$('.m-cat>button').forEach(b=>b.addEventListener('click',()=>b.parentElement.classList.toggle('open')));
}
function markNav(){$$('.nav-btn').forEach(b=>b.setAttribute('aria-current',String(S.view!=='home'&&(S.cat===b.dataset.cat||(S.view==='product'&&P.find(p=>p.id===S.pid)?.cat===b.dataset.cat)))))}
function closeAll(){
  $$('.nav-item').forEach(n=>n.classList.remove('open'));
  $('#mnav').classList.remove('open');$('#mnav').setAttribute('aria-hidden','true');
  $('#searchRow').classList.remove('open');$('#searchBtn').setAttribute('aria-expanded','false');
  document.body.classList.remove('lock');
}
document.addEventListener('click',e=>{
  if(!e.target.closest('.nav-item'))$$('.nav-item').forEach(n=>n.classList.remove('open'));
  const g=e.target.closest('[data-go]');
  if(g){e.preventDefault();const [c,s]=g.dataset.go.split('|');go({view:'shop',cat:c,sub:s||null});return}
  const to=e.target.closest('[data-to]');
  if(to){e.preventDefault();goHomeTo(to.dataset.to);return}
  const en=e.target.closest('[data-enquire]');
  if(en){e.preventDefault();enquire(en.dataset.enquire||'');return}
  const pc=e.target.closest('[data-pid]');
  if(pc){go({view:'product',pid:pc.dataset.pid});return}
  if(e.target.closest('[data-home]')){e.preventDefault();go({view:'home'})}
});
$('#homeLink').onclick=e=>{e.preventDefault();if(S.view==='home'){closeAll();window.scrollTo({top:0,behavior:RM?'auto':'smooth'})}else go({view:'home'})};
$('#burger').onclick=()=>{$('#mnav').classList.add('open');$('#mnav').setAttribute('aria-hidden','false');document.body.classList.add('lock')};
$$('#mnav [data-close]').forEach(b=>b.onclick=closeAll);
$('#searchBtn').onclick=()=>{const r=$('#searchRow'),o=!r.classList.contains('open');closeAll();if(o){r.classList.add('open');$('#searchBtn').setAttribute('aria-expanded','true');$('#q').focus()}};
const doSearch=v=>{v=v.trim();if(!v)return;go({view:'shop',q:v})};
$('#searchForm').onsubmit=e=>{e.preventDefault();doSearch($('#q').value)};
$('#mSearch').onsubmit=e=>{e.preventDefault();doSearch($('#mq').value)};
document.addEventListener('keydown',e=>{
  if(e.key==='Enter'&&e.target.matches('.card'))go({view:'product',pid:e.target.dataset.pid});
  if(e.key==='Escape'){closeAll();closeDrawer();$('.filters')?.classList.remove('open')}
});

/* ================= RENDER ================= */
function render(){
  const v=$('#view');
  if(S.view==='home'){v.innerHTML=homeHTML();initHome()}
  else if(S.view==='shop'){v.innerHTML=shopHTML();initShop()}
  else{v.innerHTML=pdpHTML();initPdp()}
  markNav();observe();
  document.title=S.view==='home'?'BREAK FORD — Break Barriers. Cross Boundaries.':S.view==='product'?P.find(p=>p.id===S.pid).name+' — BREAK FORD':(S.q?'Search':S.sub||catOf(S.cat).name)+' — BREAK FORD';
}
function card(p){
  const tag=p.stock===0?'<span class="tag">Out of stock</span>':p.stock<=3?`<span class="tag low">Only ${p.stock} left</span>`:'';
  return `<article class="card" data-pid="${p.id}" tabindex="0" aria-label="${esc(p.name)}">
   <div class="pic">${media(p)}${tag}</div>
   <div class="body"><div class="meta">${esc(p.brand)}</div><h4>${esc(p.name)}</h4><div class="price">${inr(p.price)}</div></div></article>`;
}


/* ================= ATMOSPHERE PHOTOS =================
   Placeholder photography (Unsplash, free licence), darkened so it sits on the black and charcoal palette.
   Replace with BREAK FORD's own photography when available: change the URLs in PHOTO. */
const PHOTO={
  hero:'https://images.unsplash.com/photo-1595538740791-5baed7b484ff',
  about:'https://images.unsplash.com/photo-1707916032532-0903a3cd9e59',
  band:'https://images.unsplash.com/photo-1533142865700-cc8721215664'
};
const photo=(k,alt,w=1600)=>`<img class="photo" src="${PHOTO[k]}?w=${w}&q=70&auto=format&fit=crop" srcset="${PHOTO[k]}?w=${Math.round(w/2)}&q=70&auto=format&fit=crop ${Math.round(w/2)}w, ${PHOTO[k]}?w=${w}&q=70&auto=format&fit=crop ${w}w, ${PHOTO[k]}?w=${w*1.5}&q=65&auto=format&fit=crop ${w*1.5}w" sizes="100vw" alt="${alt}" loading="${k==='hero'?'eager':'lazy'}" onerror="this.remove()">`;

/* ================= HOME ================= */
const SIZES=[
 {k:'7 ft',use:'Pool · bar box',w:1981,h:991},
 {k:'8 ft',use:'Pool · home',w:2235,h:1118},
 {k:'9 ft',use:'Pool · tournament',w:2540,h:1270},
 {k:'10 ft',use:'Carom · match',w:2840,h:1420},
 {k:'12 ft',use:'Snooker · championship',w:3569,h:1778}];
function featured(){
  const pick=[];CATS.forEach(c=>{const l=P.filter(p=>p.cat===c.key&&p.stock>0).sort((a,b)=>(b.brand==='BREAK FORD')-(a.brand==='BREAK FORD')||b.price-a.price);pick.push(...l.slice(0,2))});
  return pick;
}
function homeHTML(){
  return `
  <section class="hero"><div class="hero-media" aria-hidden="true">${photo('hero','',2000)}</div><div class="wrap">
    <span class="rule-g" data-in="1"></span>
    <h1 data-in="2"><span>Break barriers.</span><span>Cross boundaries.</span></h1>
    <p class="lede" data-in="3">Equipment for players who value precision, control and consistency.</p>
    <div class="btns" data-in="4"><button class="btn btn-gold" data-to="#products">Explore products ${arrow}</button><button class="btn btn-line" data-enquire>Enquire now</button></div>
  </div>
  <div class="wrap" data-in="5"><div class="hero-foot">
    <div><b>Precision</b><span>Measured, matched and checked before it reaches you.</span></div>
    <div><b>Purpose</b><span>Every piece earns its place on the table.</span></div>
    <div><b>Progress</b><span>Equipment that keeps pace as your game develops.</span></div>
  </div></div></section>

  <section id="products"><div class="wrap">
    <div class="sec-head" data-r><div><h2>Four categories.<br>One standard.</h2></div><p>Choose a category, then narrow it by game, joint type, weight or tip size.</p></div>
    <div class="cats" data-r>${CATS.map((c,i)=>`<button class="cat" data-go="${c.key}|"><span class="n">${countIn(c.key)} products</span><div class="cimg"><img src="${U(CATIMG[c.key],700)}" srcset="${U(CATIMG[c.key],400)} 400w, ${U(CATIMG[c.key],700)} 700w, ${U(CATIMG[c.key],1100)} 1100w" sizes="(max-width:620px) 100vw, 25vw" alt="" loading="lazy" onerror="this.remove()"></div><h3>${c.name}</h3><ul>${c.subs.map(s=>`<li>${s}</li>`).join('')}</ul><span class="go">Explore ${arrow}</span></button>`).join('')}</div>
  </div></section>

  <section class="band-img" aria-label="BREAK FORD">${photo('band','',2000)}<div class="wrap" data-r><span class="rule-g"></span><p class="band-q">Built for players who prepare.</p></div></section>

  <section id="about" class="charcoal"><div class="wrap principles">
    <div class="about-media" data-r>${photo('about','A billiards table under low light',1200)}</div>
    <div data-r>
      <div class="label" style="margin-bottom:18px">About BREAK FORD</div><h2 style="margin-bottom:28px"><span>Precision.</span> <span>Purpose.</span> <span>Progress.</span></h2>
      <p class="lede" style="max-width:56ch;margin-bottom:36px">BREAK FORD exists for players who prepare. Every cue, case, table and accessory we offer is chosen for how it performs under pressure — not for how loudly it is sold.</p>
      <div class="p-list">
        <div><div><h3>Precision</h3><p>Straightness, weight, balance and level are checked, not assumed. The details that decide a frame are the details we measure.</p></div></div>
        <div><div><h3>Purpose</h3><p>A focused range with nothing added for show. Each product has a clear job and does it reliably, session after session.</p></div></div>
        <div><div><h3>Progress</h3><p>From a first serious cue to a championship table, we help players and clubs take the next step with confidence.</p></div></div>
      </div>
    </div>
  </div></section>

  <section><div class="wrap">
    <div class="sec-head" data-r><div><h2>Chosen for performance.</h2></div><button class="link" data-go="cues|">View all products ${arrow}</button></div>
    <div class="grid" data-r>${featured().map(card).join('')}</div>
  </div></section>

  <section id="sizes" class="charcoal"><div class="wrap guide">
    <div data-r>
      <div class="label" style="margin-bottom:18px">Table size guide</div>
      <h2>Will it fit your room?</h2>
      <p style="color:var(--muted);max-width:44ch;margin-top:18px">Allow a full cue length — about 1.5 m — on every side of the playing area so you can cue freely off the cushion.</p>
      <div class="size-tabs" id="sizeTabs">${SIZES.map((s,i)=>`<button aria-pressed="${i===2}" data-i="${i}">${s.k}</button>`).join('')}</div>
      <div class="size-read" id="sizeRead"></div>
      <div style="margin-top:28px"><button class="link" id="sizeShop">See tables in this size ${arrow}</button></div>
    </div>
    <div data-r><svg class="room" id="roomSvg" viewBox="0 0 700 460" role="img" aria-label="Room size diagram"></svg></div>
  </div></section>

  <section id="joints"><div class="wrap">
    <div class="sec-head" data-r><div><div class="label">Cue case guide</div><h2>Where does your cue<br>come apart?</h2></div><p>A case is chosen by where the cue splits. Check yours, then choose the case to match.</p></div>
    <div class="joints" data-r>
    ${[['Single Joint Cases','Single joint','One-piece cues that never come apart. Needs a full-length case, around 58 in.',null],['3/4 Joint Cases','3/4 joint','The split sits three-quarters of the way down from the tip. Standard for snooker cues.',.75],['Half Joint Cases','Half joint','Splits in the middle into two equal halves. Most pool cues are built this way.',.5]].map(([sub,t,d,j])=>`
     <button class="joint" data-go="cases|${sub}"><svg viewBox="0 0 300 50">${jointCue(j)}</svg><h3>${t}</h3><p>${d}</p><span class="link">${countIn('cases',sub)} cases ${arrow}</span></button>`).join('')}
    </div>
  </div></section>

  <section class="charcoal"><div class="wrap">
    <div class="sec-head" data-r><div><h2>Supported after the sale.</h2></div></div>
    <div class="services" data-r>
     <div><h3>Delivery</h3><p>Tables travel crated, with slate packed separately.</p></div>
     <div><h3>Installation</h3><p>Slate seams waxed and levelled to ±0.5 mm on site.</p></div>
     <div><h3>Cue workshop</h3><p>Tips, ferrules and extensions fitted in 48 hours.</p></div>
     <div><h3>Aftercare</h3><p>Re-clothing and table servicing by appointment.</p></div>
    </div>
  </div></section>

  <section id="enquire"><div class="wrap enq">
    <div data-r>
      <div class="label" style="margin-bottom:18px">Enquiries</div>
      <h2>Enquire now.</h2>
      <p class="lede">Tell us what you play and what you need. A member of the BREAK FORD team will respond with options, availability and pricing.</p>
      <div class="enq-points"><div><i></i>Product advice for players and clubs</div><div><i></i>Table delivery, installation and servicing</div><div><i></i>Bulk and club orders</div></div>
    </div>
    <div data-r id="enqBox">${enqForm()}</div>
  </div></section>`;
}
function enqForm(pre){
  const p=pre&&P.find(x=>x.id===pre);
  return `<form class="form" id="enqForm" novalidate>
    <div class="two"><label>Full name<input name="name" required autocomplete="name"></label><label>Phone<input name="phone" required inputmode="tel" autocomplete="tel"></label></div>
    <div class="two"><label>Email<input name="email" type="email" autocomplete="email"></label><label>City<input name="city" autocomplete="address-level2"></label></div>
    <label>Interested in<select name="interest" id="enqInterest">${CATS.map(c=>`<option ${p&&p.cat===c.key?'selected':''}>${c.name}</option>`).join('')}<option>Club or bulk order</option><option>Servicing</option></select></label>
    <label>Message<textarea name="msg" id="enqMsg" placeholder="Tell us about your game, room size or the product you are considering.">${p?esc(`I would like to know more about the ${p.name}.`):''}</textarea></label>
    <p class="note">We use your details only to reply to this enquiry.</p>
    <button class="btn btn-gold" type="submit">Send enquiry ${arrow}</button>
  </form>`;
}
function bindEnq(){
  const f=$('#enqForm');if(!f)return;
  f.onsubmit=e=>{e.preventDefault();
    const req=[...f.querySelectorAll('[required]')].find(i=>!i.value.trim());
    if(req){req.focus();req.style.borderColor='#c9776a';setTimeout(()=>req.style.borderColor='',1600);return}
    const n=f.name.value.trim().split(' ')[0];
    $('#enqBox').innerHTML=`<div class="sent"><div class="label">Enquiry received</div><h3>Thank you, ${esc(n)}.</h3><p>Your enquiry has been noted. The BREAK FORD team will be in touch shortly.</p></div>`};
}
function enquire(pid){
  const fill=()=>{const b=$('#enqBox');if(b&&pid){b.innerHTML=enqForm(pid);bindEnq()}};
  if(S.view==='home'){fill();closeAll();scrollToEl('#enquire')}
  else{pendingEnq=pid;go({view:'home'},'#enquire')}
}
let pendingEnq='';
function jointCue(j){
  const shaft='rgba(244,243,239,.55)',butt='rgba(244,243,239,.22)';
  if(!j)return `<rect x="10" y="22" width="280" height="6" rx="3" fill="${shaft}"/><rect x="10" y="20" width="120" height="10" rx="5" fill="${butt}"/><text x="150" y="10" text-anchor="middle" fill="#77746d" font-size="9" letter-spacing="2" font-family="Archivo, sans-serif">NO JOINT</text>`;
  const x=290-280*j;
  return `<rect x="10" y="22" width="${x-10}" height="6" rx="3" fill="${shaft}"/><rect x="10" y="20" width="${Math.min(120,x-10)}" height="10" rx="5" fill="${butt}"/><rect x="${x-2}" y="19" width="2" height="12" fill="#cbb27c"/>
   <g class="cut" style="transition:transform .6s var(--ease)"><rect x="${x+3}" y="22" width="${290-x-3}" height="6" rx="3" fill="${shaft}"/>${x<130?`<rect x="${x+3}" y="20" width="${130-x}" height="10" rx="5" fill="${butt}"/>`:''}</g>
   <text x="${x}" y="10" text-anchor="middle" fill="#cbb27c" font-size="9" letter-spacing="2" font-family="Archivo, sans-serif">JOINT</text>`;
}
function initHome(){
  let si=2;const svgEl=$('#roomSvg');
  const drawRoom=()=>{
    const s=SIZES[si],rw=s.w+3000,rh=s.h+3000,maxW=8400,maxH=5200,sc=Math.min(640/maxW,400/maxH);
    const RW=rw*sc,RH=rh*sc,TW=s.w*sc,TH=s.h*sc,ox=(700-RW)/2,oy=(460-RH)/2;
    if(!svgEl.dataset.init){svgEl.innerHTML=`<rect class="tbl" id="rmR" fill="none" stroke="#cbb27c" stroke-opacity=".6" stroke-dasharray="4 6"/><rect class="tbl" id="rmT" fill="#262626" rx="6"/><rect class="tbl" id="rmF" fill="#0f0f0f" rx="2"/>
      <text id="rmTx" fill="#cbb27c" font-size="11" letter-spacing="2" font-family="Archivo,sans-serif" text-anchor="middle"></text><text id="rmTy" fill="#a9a69e" font-size="12" letter-spacing="1" font-family="Archivo,sans-serif" text-anchor="middle"></text>`;svgEl.dataset.init=1}
    const set=(id,x,y,w,h)=>{const e=$('#'+id,svgEl);e.style.x=x+'px';e.style.y=y+'px';e.style.width=w+'px';e.style.height=h+'px';e.setAttribute('x',x);e.setAttribute('y',y);e.setAttribute('width',w);e.setAttribute('height',h)};
    set('rmR',ox,oy,RW,RH);const tx=350-TW/2,ty=230-TH/2;set('rmT',tx-7,ty-7,TW+14,TH+14);set('rmF',tx,ty,TW,TH);
    const a=$('#rmTx',svgEl);a.setAttribute('x',350);a.setAttribute('y',oy-12);a.textContent=`MINIMUM ROOM ${(rw/1000).toFixed(1)} × ${(rh/1000).toFixed(1)} M`;
    const b=$('#rmTy',svgEl);b.setAttribute('x',350);b.setAttribute('y',ty+TH/2+4);b.textContent=`${s.k.toUpperCase()} TABLE`;
    $('#sizeRead').innerHTML=`<div><span>Playing area</span><b>${s.w} × ${s.h} mm</b></div><div><span>Minimum room</span><b>${(rw/1000).toFixed(1)} × ${(rh/1000).toFixed(1)} m</b></div><div><span>Used for</span><b>${s.use}</b></div><div><span>Tables available</span><b>${P.filter(p=>p.cat==='tables'&&p.specs['Table size']===s.k&&p.stock).length}</b></div>`;
  };
  drawRoom();
  $$('#sizeTabs button').forEach(b=>b.onclick=()=>{si=+b.dataset.i;$$('#sizeTabs button').forEach(x=>x.setAttribute('aria-pressed',x===b));drawRoom()});
  $('#sizeShop').onclick=()=>{pendingFilter={Size:[SIZES[si].k]};go({view:'shop',cat:'tables'})};
  $$('.joint').forEach(j=>{j.onmouseenter=()=>{const c=$('.cut',j);if(c)c.style.transform='translateX(12px)'};j.onmouseleave=()=>{const c=$('.cut',j);if(c)c.style.transform=''}});
  if(pendingEnq){$('#enqBox').innerHTML=enqForm(pendingEnq);pendingEnq=''}
  bindEnq();
}
let pendingFilter=null;

/* ================= SHOP ================= */
function baseList(){
  let l=P;
  if(S.q){const q=S.q.toLowerCase();l=l.filter(p=>(p.name+' '+p.brand+' '+p.sub+' '+catOf(p.cat).name+' '+Object.values(p.specs).join(' ')).toLowerCase().includes(q))}
  if(S.cat)l=l.filter(p=>p.cat===S.cat);
  return l;
}
const val=(p,k)=>k==='sub'?p.sub:k==='brand'?p.brand:k==='avail'?(p.stock?'In stock':'Out of stock'):k==='tier'?p.tier:p.facets[k];
function groupsFor(){
  const sp={tables:[['sub','Game type'],['Size','Table size']],cues:[['sub','Cue type'],['WeightBand','Weight'],['TipBand','Tip size'],['Material','Shaft']],cases:[['sub','Joint type'],['Capacity','Capacity']],accessories:[['sub','Product type']]};
  return [...(S.cat?sp[S.cat]:[['sub','Product type']]),['brand','Brand'],['tier','Level'],['avail','Availability']];
}
const ORDER={Size:['6 ft','7 ft','8 ft','9 ft','10 ft','12 ft'],WeightBand:['Under 18 oz','18 – 19 oz','19 – 20 oz','20 oz and over'],TipBand:['Under 10 mm','10 – 12 mm','12 mm and over'],tier:['Club','Pro','Premium'],avail:['In stock','Out of stock']};
function filtered(){
  let l=baseList();
  if(S.sub)l=l.filter(p=>p.sub===S.sub);
  for(const [k,vs] of Object.entries(S.f))if(vs.length)l=l.filter(p=>vs.includes(val(p,k)));
  if(S.price)l=l.filter(p=>p.price>=S.price[0]&&p.price<=S.price[1]);
  l=[...l];const s=S.sort;
  if(s==='lo')l.sort((a,b)=>a.price-b.price);else if(s==='hi')l.sort((a,b)=>b.price-a.price);else if(s==='az')l.sort((a,b)=>a.name.localeCompare(b.name));else l.sort((a,b)=>(b.stock>0)-(a.stock>0));
  return l;
}
function crumbs(){
  const c=S.cat&&catOf(S.cat);
  return `<button data-home>Home</button><span>/</span>${c?(S.sub?`<button data-go="${c.key}|">${c.name}</button><span>/</span><span>${S.sub}</span>`:`<span>${c.name}</span>`):'<span>Search</span>'}`;
}
function shopHTML(){
  const c=S.cat&&catOf(S.cat);
  const title=S.q?`Results for “${esc(S.q)}”`:S.sub||c.name;
  return `<div class="wrap shop-head">
   <div class="crumbs" id="crumbs">${crumbs()}</div>
   <h1 id="shopTitle">${title}</h1>
   <p>${c?c.blurb:'Search across cues, cases & bags, tables and accessories.'}</p>
   ${c?`<div class="chips">${['',...c.subs].map(s=>`<button class="chip" data-sub="${s}" aria-pressed="${(S.sub||'')===s}">${s||'All'}<span>${countIn(c.key,s||null)}</span></button>`).join('')}</div>`:''}
  </div>
  <div class="wrap"><div class="cat-tabs" role="navigation" aria-label="Categories">${CATS.map(k=>`<button data-go="${k.key}|" aria-current="${S.cat===k.key}">${k.name}</button>`).join('')}</div></div>
  <div class="wrap shop">
   <aside class="filters" id="filters" aria-label="Filters"></aside>
   <div>
     <div class="toolbar"><span class="count" id="count"></span><div style="display:flex;gap:10px;align-items:center"><button class="btn btn-line btn-sm fbtn" id="openF">Filters</button>
     <select id="sort" aria-label="Sort products"><option value="feat">Sort: Featured</option><option value="lo">Price: low to high</option><option value="hi">Price: high to low</option><option value="az">Name: A to Z</option></select></div></div>
     <div class="active-f" id="activeF"></div>
     <div class="grid" id="grid"></div>
   </div>
  </div>`;
}
function renderFilters(){
  const el=$('#filters');if(!el)return;
  const base=baseList().filter(p=>!S.sub||p.sub===S.sub);
  const shut=new Set($$('.fgroup.shut',el).map(g=>g.dataset.k));
  const prices=base.map(p=>p.price),mn=Math.min(...prices,0),mx=Math.max(...prices,1);
  const lo=S.price?S.price[0]:mn,hi=S.price?S.price[1]:mx;
  let h=`<div class="f-top"><span class="label dim">Filter</span><button class="link" id="clearF" style="font-size:10.5px">Clear all</button></div>
  <div class="fgroup ${shut.has('price')?'shut':''}" data-k="price"><button>Price ${chev}</button><div class="fbody"><div>
    <div class="range-vals"><span id="pLo">${inr(lo)}</span><span id="pHi">${inr(hi)}</span></div>
    <div class="range"><div class="trk"></div><div class="fill" id="pFill"></div><input type="range" id="rLo" min="${mn}" max="${mx}" step="100" value="${lo}" aria-label="Minimum price"><input type="range" id="rHi" min="${mn}" max="${mx}" step="100" value="${hi}" aria-label="Maximum price"></div>
  </div></div></div>`;
  for(const [k,label] of groupsFor()){
    if(k==='sub'&&S.sub)continue;
    let vals=[...new Set(base.map(p=>val(p,k)).filter(Boolean))];
    if(ORDER[k])vals.sort((a,b)=>ORDER[k].indexOf(a)-ORDER[k].indexOf(b));else vals.sort();
    if(vals.length<2&&!(S.f[k]||[]).length)continue;
    h+=`<div class="fgroup ${shut.has(k)?'shut':''}" data-k="${k}"><button>${label} ${chev}</button><div class="fbody"><div>${vals.map((v,i)=>{const id=`f-${k}-${i}`;return `<label class="opt" for="${id}"><input type="checkbox" id="${id}" data-fk="${k}" value="${esc(v)}" ${(S.f[k]||[]).includes(v)?'checked':''}>${esc(v)}<span class="c">${base.filter(p=>val(p,k)===v).length}</span></label>`}).join('')}</div></div></div>`;
  }
  h+=`<div class="fdone"><button class="btn btn-gold" id="doneF" style="width:100%">Show results</button></div>`;
  el.innerHTML=h;
  const rl=$('#rLo'),rh=$('#rHi'),fill=()=>{const a=+rl.value,b=+rh.value,span=mx-mn||1;$('#pFill').style.left=((Math.min(a,b)-mn)/span*100)+'%';$('#pFill').style.width=(Math.abs(b-a)/span*100)+'%';$('#pLo').textContent=inr(Math.min(a,b));$('#pHi').textContent=inr(Math.max(a,b))};
  fill();
  [rl,rh].forEach(r=>{r.oninput=fill;r.onchange=()=>{const a=+rl.value,b=+rh.value;S.price=[Math.min(a,b),Math.max(a,b)];renderGrid()}});
  $$('.fgroup>button',el).forEach(b=>b.onclick=()=>b.parentElement.classList.toggle('shut'));
  $$('input[data-fk]',el).forEach(i=>i.onchange=()=>{const k=i.dataset.fk;S.f[k]=S.f[k]||[];if(i.checked)S.f[k].push(i.value);else S.f[k]=S.f[k].filter(v=>v!==i.value);renderGrid();renderFilters()});
  $('#clearF').onclick=()=>{S.f={};S.price=null;renderFilters();renderGrid()};
  $('#doneF').onclick=()=>el.classList.remove('open');
  $('.fdone',el).hidden=innerWidth>860;
}
function renderGrid(){
  const l=filtered(),g=$('#grid');if(!g)return;
  $('#count').textContent=`${l.length} ${l.length===1?'product':'products'}`;
  g.innerHTML=l.length?l.map(card).join(''):`<div class="empty"><h3>No matches</h3><p>No products match these filters. Remove one or clear them all.</p><button class="btn btn-line btn-sm" id="clr2" style="margin-top:20px">Clear filters</button></div>`;
  $('#clr2')&&($('#clr2').onclick=()=>{S.f={};S.price=null;renderFilters();renderGrid()});
  const chips=[];for(const [k,vs] of Object.entries(S.f))vs.forEach(v=>chips.push([k,v]));
  $('#activeF').innerHTML=chips.map(([k,v])=>`<button data-rk="${k}" data-rv="${esc(v)}">${esc(v)} ✕</button>`).join('')+(S.price?`<button data-rp>${inr(S.price[0])} – ${inr(S.price[1])} ✕</button>`:'');
  $$('#activeF [data-rk]').forEach(b=>b.onclick=()=>{S.f[b.dataset.rk]=S.f[b.dataset.rk].filter(v=>v!==b.dataset.rv);renderGrid();renderFilters()});
  $('#activeF [data-rp]')&&($('#activeF [data-rp]').onclick=()=>{S.price=null;renderGrid();renderFilters()});
  const n=chips.length+(S.price?1:0);$('#openF').textContent=`Filters${n?` (${n})`:''}`;
}
function initShop(){
  if(pendingFilter){S.f=pendingFilter;pendingFilter=null}
  renderFilters();renderGrid();
  $('#sort').value=S.sort;$('#sort').onchange=e=>{S.sort=e.target.value;renderGrid()};
  $$('.chip').forEach(b=>b.onclick=()=>{const s=b.dataset.sub||null;setHashQuiet(href({view:'shop',cat:S.cat,sub:s}));
    S.sub=s;S.f={};S.price=null;$$('.chip').forEach(x=>x.setAttribute('aria-pressed',x===b));
    $('#shopTitle').textContent=S.sub||catOf(S.cat).name;$('#crumbs').innerHTML=crumbs();renderFilters();renderGrid()});
  $('#openF').onclick=()=>$('#filters').classList.add('open');
}

/* ================= PRODUCT ================= */
function pdpHTML(){
  const p=P.find(x=>x.id===S.pid);
  if(!Object.keys(S.sel).length)S.sel=Object.fromEntries(p.variants.map(v=>[v.name,v.opts[0]]));
  const c=catOf(p.cat),related=P.filter(x=>x.cat===p.cat&&x.id!==p.id).sort((a,b)=>(b.sub===p.sub)-(a.sub===p.sub)).slice(0,4);
  const st=p.stock===0?['out','Out of stock']:p.stock<=3?['low',`Only ${p.stock} left`]:['','In stock'];
  return `<div class="wrap" style="padding-top:32px"><div class="crumbs"><button data-home>Home</button><span>/</span><button data-go="${c.key}|">${c.name}</button><span>/</span><button data-go="${c.key}|${p.sub}">${p.sub}</button></div></div>
  <div class="wrap pdp">
   <div class="gallery"><div class="pstage">${media(p,'',1000)}${p.img?'':'<span class="ph-note">Representative image</span>'}</div></div>
   <div class="pinfo">
     <div class="label">${esc(p.brand)} · ${p.sub}</div>
     <h1>${esc(p.name)}</h1>
     <div class="by"><span class="stock ${st[0]}"><i></i>${st[1]}</span><span>Level: ${p.tier}</span><span>SKU BF-${p.id.slice(1).padStart(4,'0')}</span></div>
     <div class="pprice"><span class="price">${inr(p.price)}</span><small>Inclusive of GST. ${p.cat==='tables'?'Delivery, installation and levelling included.':'Free delivery on orders over ₹2,000.'}</small></div>
     ${p.variants.map(v=>`<div class="var"><span class="t">${v.name}<b data-vl="${v.name}">${S.sel[v.name]}</b></span><div class="vopts">${v.opts.map(o=>`<button data-vn="${v.name}" data-vo="${o}" aria-pressed="${S.sel[v.name]===o}">${o}</button>`).join('')}</div></div>`).join('')}
     <div class="buy">
       <div class="qty"><button id="qm" aria-label="Decrease quantity">−</button><output id="qv">${S.qty}</output><button id="qp" aria-label="Increase quantity">+</button></div>
       <button class="btn btn-line" id="addC" ${p.stock?'':'disabled'}>Add to cart</button>
       <button class="btn btn-gold" id="buyN" ${p.stock?'':'disabled'}>Buy now ${arrow}</button>
     </div>
     <div class="enq-line">${p.stock?'Prefer to talk first?':'Want to be told when it is back?'} <button data-enquire="${p.id}">Enquire about this product</button></div>
     <div class="perks">
       <div>${ico('truck')} ${p.cat==='tables'?'Crated freight, 10–14 days, installed on site':'Ships in 1–2 working days'}</div>
       <div>${ico('shield')} ${p.cat==='tables'?'10-year frame and slate warranty':'7-day returns on unused items'}</div>
       <div>${ico('wrench')} ${p.cat==='cues'?'Free first re-tip at our workshop':'Advice from our team before you buy'}</div>
     </div>
     <div class="tabs" role="tablist"><button role="tab" data-tab="desc" aria-selected="${S.tab==='desc'}">Description</button><button role="tab" data-tab="spec" aria-selected="${S.tab==='spec'}">Specifications</button><button role="tab" data-tab="ship" aria-selected="${S.tab==='ship'}">Delivery</button></div>
     <div id="tabpane"></div>
   </div>
  </div>
  <section class="charcoal" style="padding-block:96px"><div class="wrap">
   <div class="sec-head" data-r><div><div class="label">${c.name}</div><h2>You may also consider.</h2></div><button class="link" data-go="${c.key}|">View all ${c.name} ${arrow}</button></div>
   <div class="grid" data-r>${related.map(card).join('')}</div>
  </div></section>`;
}
function ico(n){const d={truck:'M3 7h11v9H3zM14 10h4l3 3v3h-7zM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',shield:'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',wrench:'M14 6a4 4 0 0 0 5 5l-9 9-3-3 9-9a4 4 0 0 0-2-2z'}[n];return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#cbb27c" stroke-width="1.3"><path d="${d}"/></svg>`}
function initPdp(){
  const p=P.find(x=>x.id===S.pid);
  const tab=()=>{const t=S.tab;$('#tabpane').innerHTML=`<div class="tabpane">${t==='desc'?`<p>${p.desc}</p><p>${p.cat==='cues'?'Every cue is checked for straightness on a rolling bench before it ships.':p.cat==='tables'?'Our fitters level the slate on installation and re-check the cushions a month later.':'Questions about fit or compatibility? Our team will confirm before dispatch.'}</p>`:t==='spec'?`<table class="specs">${Object.entries({Brand:p.brand,Category:p.sub,Level:p.tier,...p.specs}).map(([k,v])=>`<tr><th>${k}</th><td>${v}</td></tr>`).join('')}</table>`:`<p>${p.cat==='tables'?'Tables ship crated with the slate packed separately. A two-person team assembles, levels and clothes the table in your room, usually in one visit of 4–6 hours.':'Orders placed before 2 pm ship the same working day. Metro cities 2–4 days, rest of India 4–7 days.'}</p>`}</div>`};
  tab();
  $$('[data-tab]').forEach(b=>b.onclick=()=>{S.tab=b.dataset.tab;$$('[data-tab]').forEach(x=>x.setAttribute('aria-selected',x===b));tab()});
  $$('[data-vn]').forEach(b=>b.onclick=()=>{S.sel[b.dataset.vn]=b.dataset.vo;$$(`[data-vn="${b.dataset.vn}"]`).forEach(x=>x.setAttribute('aria-pressed',x===b));$(`[data-vl="${b.dataset.vn}"]`).textContent=b.dataset.vo});
  const maxQ=Math.max(1,Math.min(p.stock,10));
  $('#qm').onclick=()=>{S.qty=Math.max(1,S.qty-1);$('#qv').textContent=S.qty};
  $('#qp').onclick=()=>{S.qty=Math.min(maxQ,S.qty+1);$('#qv').textContent=S.qty};
  $('#addC').onclick=()=>addToCart(p,{...S.sel},S.qty);
  $('#buyN').onclick=()=>{addToCart(p,{...S.sel},S.qty,true);openDrawer('checkout')};
}

/* ================= CART ================= */
function addToCart(p,sel,qty,silent){
  const key=p.id+'|'+JSON.stringify(sel),ex=cart.find(l=>l.key===key);
  if(ex)ex.qty=Math.min(ex.qty+qty,Math.max(p.stock,1));else cart.push({key,id:p.id,sel,qty});
  saveCart();updBadge();
  if(!silent)toast(`Added to cart — ${p.name}`);
}
function updBadge(){const n=cart.reduce((s,l)=>s+l.qty,0),e=$('#cartCount');e.textContent=n;e.hidden=!n}
let tt;function toast(m){const t=$('#toast');t.innerHTML=`<span>${esc(m)}</span><button id="tView">View cart</button>`;$('#tView').onclick=()=>{t.classList.remove('show');openDrawer('cart')};t.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('show'),3200)}
let dMode='cart';
function openDrawer(mode='cart'){dMode=mode;closeAll();renderDrawer();$('#drawer').classList.add('open');$('#drawer').setAttribute('aria-hidden','false');document.body.classList.add('lock')}
function closeDrawer(){$('#drawer').classList.remove('open');$('#drawer').setAttribute('aria-hidden','true');document.body.classList.remove('lock')}
$('#cartBtn').onclick=()=>openDrawer('cart');
$$('#drawer [data-close]').forEach(b=>b.onclick=closeDrawer);
function totals(){const sub=cart.reduce((s,l)=>s+P.find(p=>p.id===l.id).price*l.qty,0);const ship=sub===0||sub>=2000?0:149;return{sub,ship,tot:sub+ship}}
function renderDrawer(){
  const b=$('#dBody'),f=$('#dFoot'),t=totals();
  if(dMode==='done'){$('#dTitle').textContent='Order placed';b.innerHTML=`<div class="done"><div class="label">Confirmed</div><h3>Thank you.</h3><p>Order BF-${Math.floor(Math.random()*90000+10000)} has been placed. A confirmation will follow shortly.</p></div>`;f.innerHTML=`<button class="btn btn-gold" id="contShop">Continue</button>`;$('#contShop').onclick=()=>{closeDrawer();go({view:'home'})};return}
  if(!cart.length){$('#dTitle').textContent='Your cart';b.innerHTML=`<div class="done"><h3>Your cart is empty</h3><p>Explore the range to get started.</p></div>`;f.innerHTML=`<button class="btn btn-gold" data-to="#products" id="dEx">Explore products</button>`;$('#dEx').addEventListener('click',closeDrawer);return}
  const items=cart.map((l,i)=>{const p=P.find(x=>x.id===l.id);return `<div class="line-item"><div class="th">${media(p)}</div><div><h5>${esc(p.name)}</h5><small>${Object.values(l.sel).join(' · ')||esc(p.brand)}</small><div class="mini"><button data-dq="${i}|-1" aria-label="Decrease">−</button><span class="num">${l.qty}</span><button data-dq="${i}|1" aria-label="Increase">+</button><button class="rm" data-rm="${i}">Remove</button></div></div><span class="price">${inr(p.price*l.qty)}</span></div>`}).join('');
  const sum=`<div class="tot"><span>Subtotal</span><span class="num">${inr(t.sub)}</span></div><div class="tot"><span>Delivery</span><span class="num">${t.ship?inr(t.ship):'Free'}</span></div><div class="tot big"><span>Total</span><span class="num">${inr(t.tot)}</span></div>`;
  if(dMode==='checkout'){
    $('#dTitle').textContent='Checkout';
    b.innerHTML=`<form class="form co" id="coForm"><label>Full name<input id="coName" required autocomplete="name"></label><label>Phone<input id="coPhone" required inputmode="tel" autocomplete="tel"></label><label>Address<input id="coAddr" required autocomplete="street-address"></label><div class="two"><label>City<input id="coCity" required></label><label>PIN code<input id="coPin" required inputmode="numeric" pattern="[0-9]{6}"></label></div><label>Payment<select id="coPay"><option>UPI</option><option>Card</option><option>Net banking</option><option>EMI (tables only)</option></select></label></form>`+items;
    f.innerHTML=sum+`<button class="btn btn-gold" id="place">Place order · ${inr(t.tot)}</button><button class="btn btn-line" id="backCart">Back to cart</button>`;
    $('#place').onclick=()=>{const fm=$('#coForm');if(!fm.reportValidity())return;cart=[];saveCart();updBadge();dMode='done';renderDrawer()};
    $('#coForm').onsubmit=e=>e.preventDefault();
    $('#backCart').onclick=()=>{dMode='cart';renderDrawer()};
  }else{
    $('#dTitle').textContent=`Your cart (${cart.reduce((s,l)=>s+l.qty,0)})`;b.innerHTML=items;
    f.innerHTML=sum+`<button class="btn btn-gold" id="toCo">Checkout ${arrow}</button>`;$('#toCo').onclick=()=>{dMode='checkout';renderDrawer()};
  }
  $$('[data-dq]',b).forEach(x=>x.onclick=()=>{const [i,d]=x.dataset.dq.split('|').map(Number);const l=cart[i],p=P.find(q=>q.id===l.id);l.qty=Math.max(1,Math.min(l.qty+d,Math.max(p.stock,1)));saveCart();updBadge();renderDrawer()});
  $$('[data-rm]',b).forEach(x=>x.onclick=()=>{cart.splice(+x.dataset.rm,1);saveCart();updBadge();renderDrawer()});
}

/* ================= SCROLL REVEAL ================= */
let io;
function observe(){
  io&&io.disconnect();
  io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1,rootMargin:'0px 0px -5% 0px'});
  $$('[data-r]').forEach(el=>io.observe(el));
}
const hdr=$('#hdr');
addEventListener('scroll',()=>hdr.classList.toggle('solid',scrollY>10),{passive:true});
addEventListener('resize',()=>{const fd=$('.fdone');if(fd)fd.hidden=innerWidth>860});

/* ================= OPENING BREAK SHOT =================
   Drawn live on a canvas (js/intro.js): a coloured rack, the cue pulls back and strikes,
   the break plays in slow motion, then the table softens and the BREAK FORD logo rises in.
   After that the black screen splits open onto the homepage. No external video needed. */
buildNav();updBadge();route();
let introDone=false;
function endIntro(){
  if(introDone)return;introDone=true;
  const i=$('#intro');
  document.body.classList.remove('lock');
  if(!i){document.documentElement.classList.add('ready');return}
  // One continuous move: the table dissolves into the homepage while the logo flies into the header.
  const logo=$('.logo-box img',i),hl=$('.brand img');
  let moved=false;
  if(logo&&hl){
    const a=logo.getBoundingClientRect(),b=hl.getBoundingClientRect();
    if(a.width&&b.width){
      const sc=b.width/a.width;
      logo.style.transformOrigin='0 0';
      logo.style.transition='transform 1.15s cubic-bezier(.65,0,.2,1)';
      hl.style.visibility='hidden';
      void logo.offsetWidth;
      logo.style.transform=`translate(${b.left-a.left}px,${b.top-a.top}px) scale(${sc})`;
      moved=true;
    }
  }
  i.classList.add('out');
  setTimeout(()=>document.documentElement.classList.add('ready'),moved?500:150);
  setTimeout(()=>{if(hl)hl.style.visibility='';i.remove()},moved?1250:1000);
}
(function(){
  const i=$('#intro'),home=S.view==='home';
  if(RM||!home){i.remove();introDone=true;document.documentElement.classList.add('ready');return}
  document.body.classList.add('lock');
  const brand=()=>i.classList.add('brand');
  $('#skipIntro').onclick=endIntro;
  try{
    BFIntro.start(i,{brand,end:endIntro});
    setTimeout(()=>{brand();endIntro()},11000); // safety net
  }catch(e){
    // fallback: logo on black
    i.classList.add('novideo');setTimeout(brand,300);setTimeout(endIntro,3200);
  }
})();