/* Litmus engine, stage one.
   Every record below came from reading the piece. Nothing here is invented.
   `read:true` means the image was looked at and tagged. `read:false` is queued. */

const BASELINE = [
  'limited palette', 'high contrast', 'considered spacing',
  'clear hierarchy', 'legible type', 'intentional composition'
];

const CORPUS = [
  { id:'art-01', src:'../images/art-01.jpg', kind:'drawing', read:true,
    note:'One figure drawn once, then printed four times on four different coloured papers.',
    tags:['constructed ground','coloured paper','repeat grid','recoloured variants','ink linework','flat colour field','face','no white','limited palette','high contrast'] },

  { id:'art-04', src:'../images/art-04.jpg', kind:'drawing', read:true,
    note:'Pen portrait sitting on a field of orange halftone dots. Two colours, nothing else.',
    tags:['constructed ground','halftone','two colour','ink linework','face','figure on pattern','no white','limited palette','high contrast'] },

  { id:'art-07', src:'../images/art-07.jpg', kind:'drawing', read:true,
    note:'Digital. Title set vertically up the left edge, cropped by the frame.',
    tags:['constructed ground','deep field','type runs off edge','vertical type','mirror symmetry','face','saturated','intentional composition'] },

  { id:'art-11', src:'../images/art-11.jpg', kind:'drawing', read:true,
    note:'Painting. Checkerboard runs down both sides with objects scattered in it.',
    tags:['border is active','checkerboard','painted','figure','objects in border','no white','high contrast'] },

  { id:'art-15', src:'../images/art-15.jpg', kind:'drawing', read:true,
    note:'Mirrored on the vertical axis. Entire frame cast red.',
    tags:['mirror symmetry','whole frame colour','dense ornament','repeat motif','face','limited palette'] },

  { id:'art-18', src:'../images/art-18.jpg', kind:'drawing', read:true,
    note:'The palette is printed along the bottom as six swatches. The work shows its own recipe.',
    tags:['palette declared','swatch strip','flat illustration','muted','object centre','limited palette','considered spacing'] },

  { id:'art-21', src:'../images/art-21.jpg', kind:'drawing', read:true,
    note:'Type crosses the whole image and is cut off by both edges.',
    tags:['constructed ground','halftone','type runs off edge','two colour','object centre','saturated','high contrast'] },

  { id:'art-24', src:'../images/art-24.jpg', kind:'drawing', read:true,
    note:'Sketchbook photographed on the desk it was made on. Swatch dots along the top.',
    tags:['palette declared','swatch dots','in situ','two colour','face','sketch','limited palette'] },

  { id:'roll-01', src:'../images/roll-01.jpg', kind:'photo', read:true,
    note:'A photograph of a sunset street, matted inside a photograph of sunflowers.',
    tags:['frame is another image','constructed ground','whole frame colour','street','no faces','warm cast','high contrast'] },

  { id:'roll-05', src:'../images/roll-05.jpg', kind:'photo', read:true,
    note:'Oval mask on a flat yellow field. The man is seen from behind.',
    tags:['non rectangular mask','constructed ground','whole frame colour','person from behind','no faces','yellow cast','limited palette'] },

  { id:'roll-09', src:'../images/roll-09.jpg', kind:'photo', read:true,
    note:'Four unrelated images pinned to graph paper. The paper is doing as much as the pictures.',
    tags:['constructed ground','graph paper','collage grid','mixed media','no faces','cool cast','considered spacing'] },

  { id:'roll-13', src:'../images/roll-13.jpg', kind:'photo', read:true,
    note:'Three bands stacked. Toy animals in low lamplight, nothing lit for the camera.',
    tags:['repeat grid','three band','objects not people','low light','warm cast','no faces','high contrast'] },

  { id:'art-02', src:'../images/art-02.jpg', kind:'drawing', read:false, tags:[] },
  { id:'art-03', src:'../images/art-03.jpg', kind:'drawing', read:false, tags:[] },
  { id:'art-05', src:'../images/art-05.jpg', kind:'drawing', read:false, tags:[] },
  { id:'art-06', src:'../images/art-06.jpg', kind:'drawing', read:false, tags:[] },
  { id:'art-08', src:'../images/art-08.jpg', kind:'drawing', read:false, tags:[] },
  { id:'art-09', src:'../images/art-09.jpg', kind:'drawing', read:false, tags:[] },
  { id:'art-10', src:'../images/art-10.jpg', kind:'drawing', read:false, tags:[] },
  { id:'art-12', src:'../images/art-12.jpg', kind:'drawing', read:false, tags:[] },
  { id:'art-13', src:'../images/art-13.jpg', kind:'drawing', read:false, tags:[] },
  { id:'art-14', src:'../images/art-14.jpg', kind:'drawing', read:false, tags:[] },
  { id:'art-16', src:'../images/art-16.jpg', kind:'drawing', read:false, tags:[] },
  { id:'art-17', src:'../images/art-17.jpg', kind:'drawing', read:false, tags:[] },
  { id:'art-19', src:'../images/art-19.jpg', kind:'drawing', read:false, tags:[] },
  { id:'art-20', src:'../images/art-20.jpg', kind:'drawing', read:false, tags:[] },
  { id:'art-22', src:'../images/art-22.jpg', kind:'drawing', read:false, tags:[] },
  { id:'art-23', src:'../images/art-23.jpg', kind:'drawing', read:false, tags:[] },
  { id:'roll-02', src:'../images/roll-02.jpg', kind:'photo', read:false, tags:[] },
  { id:'roll-03', src:'../images/roll-03.jpg', kind:'photo', read:false, tags:[] },
  { id:'roll-04', src:'../images/roll-04.jpg', kind:'photo', read:false, tags:[] },
  { id:'roll-06', src:'../images/roll-06.jpg', kind:'photo', read:false, tags:[] },
  { id:'roll-07', src:'../images/roll-07.jpg', kind:'photo', read:false, tags:[] },
  { id:'roll-08', src:'../images/roll-08.jpg', kind:'photo', read:false, tags:[] },
  { id:'roll-10', src:'../images/roll-10.jpg', kind:'photo', read:false, tags:[] },
  { id:'roll-11', src:'../images/roll-11.jpg', kind:'photo', read:false, tags:[] },
  { id:'roll-12', src:'../images/roll-12.jpg', kind:'photo', read:false, tags:[] },
  { id:'roll-14', src:'../images/roll-14.jpg', kind:'photo', read:false, tags:[] },
  { id:'roll-15', src:'../images/roll-15.jpg', kind:'photo', read:false, tags:[] },
  { id:'roll-16', src:'../images/roll-16.jpg', kind:'photo', read:false, tags:[] },
  { id:'disco',  src:'../images/disco.png', kind:'built', read:false, tags:[] },
  { id:'disco-explore', src:'../images/disco-explore.png', kind:'built', read:false, tags:[] },
  { id:'disco-about',   src:'../images/disco-about.png',   kind:'built', read:false, tags:[] }
];

/* Claims are generated from the kept tags, then written as something arguable.
   `from` lists the pieces the claim was drawn out of. */
const CLAIMS = [
  { id:'c1', colour:'#FF3E00',
    text:'The ground is always built. Never a default white, never a plain edge.',
    rule:'Choose the ground before the subject and give it a treatment of its own.',
    tags:['constructed ground','no white'], from:['art-01','art-04','art-07','art-21','roll-01','roll-05','roll-09'] },

  { id:'c2', colour:'#8EA066',
    text:'Drawings are faces. Photographs have no faces in them at all.',
    rule:'A person drawn is seen head on. A person photographed is seen from behind, or not at all.',
    tags:['face','no faces','person from behind'], from:['art-01','art-04','art-15','art-24','roll-01','roll-05','roll-13'] },

  { id:'c3', colour:'#151DE0',
    text:'Colour arrives as a cast over the whole frame, not as an accent on one element.',
    rule:'Flood the field. Never pick one element out in colour against a neutral.',
    tags:['whole frame colour','warm cast','yellow cast','cool cast','two colour'], from:['art-15','roll-01','roll-05','roll-09','art-21'] },

  { id:'c4', colour:'#9D70C0',
    text:'The work repeats itself: grids, mirrors, the same figure recoloured.',
    rule:'Say it more than once. Four of the same beats one of each.',
    tags:['repeat grid','mirror symmetry','repeat motif','recoloured variants','three band'], from:['art-01','art-15','art-07','roll-13'] },

  { id:'c5', colour:'#833405',
    text:'The frame is active. A border holds another image, a mask, or objects of its own.',
    rule:'The border is part of the work, not the space left over.',
    tags:['frame is another image','border is active','non rectangular mask','graph paper'], from:['art-11','roll-01','roll-05','roll-09'] },

  { id:'c6', colour:'#404C25',
    text:'The palette gets declared inside the work, as swatches on the piece itself.',
    rule:'Show the recipe. Put the colours used somewhere in the frame.',
    tags:['palette declared','swatch strip','swatch dots'], from:['art-18','art-24'] },

  { id:'c7', colour:'#D0402F',
    text:'Type is laid over the image and allowed to run off the edge.',
    rule:'Do not fit the words inside the picture. Let the frame cut them.',
    tags:['type runs off edge','vertical type'], from:['art-07','art-21'] },

  { id:'c8', colour:'#FF3E00',
    text:'Halftone dots recur as a texture, carried over from print.',
    rule:'Texture comes from a printing process, not a filter laid on top.',
    tags:['halftone'], from:['art-04','art-21'] }
];

/* ---------------------------------------------------------------
   Judgment deck. 50 specimens across seven categories, shown one at
   a time. Yes or no, plus an optional reason.

   A rejection counts for more than an acceptance. This follows the
   negative-preference work: a no draws a boundary round the answer,
   a yes only marks a point inside it.
   --------------------------------------------------------------- */

const REJECT_WEIGHT = 1.0;
const ACCEPT_WEIGHT = 0.55;
const PHRASE = 'Places for the particular';

const CATS = {
  type:   'Type',
  layout: 'Layout',
  colour: 'Colour',
  space:  'Spacing',
  texture:'Texture',
  image:  'Imagery',
  voice:  'Voice'
};

const SPECIMENS = [

/* ---- TYPE ---- 9 */
{id:'t1', cat:'type', tags:['grotesque','heavy','uppercase','tight tracking'],
 t:'type', css:'font-family:Archivo;font-weight:900;font-size:40px;letter-spacing:-.04em;text-transform:uppercase;line-height:.95'},
{id:'t2', cat:'type', tags:['display serif','light','generous'],
 t:'type', css:'font-family:"Instrument Serif";font-size:50px;line-height:1.02'},
{id:'t3', cat:'type', tags:['editorial serif','italic','light'],
 t:'type', css:'font-family:Newsreader;font-weight:300;font-style:italic;font-size:40px;line-height:1.14'},
{id:'t4', cat:'type', tags:['mono','technical','wide tracking'],
 t:'type', css:'font-family:"Space Mono";font-size:26px;line-height:1.35'},
{id:'t5', cat:'type', tags:['condensed caps','heavy','poster'],
 t:'type', css:'font-family:"Bebas Neue";font-size:56px;letter-spacing:.015em;line-height:.98'},
{id:'t6', cat:'type', tags:['high contrast serif','classical'],
 t:'type', css:'font-family:"Playfair Display";font-weight:500;font-size:40px;line-height:1.14'},
{id:'t7', cat:'type', tags:['handwriting','informal'],
 t:'type', css:'font-family:Caveat;font-size:46px;line-height:1.12'},
{id:'t8', cat:'type', tags:['neutral sans','centred','grey text','generic'],
 t:'type', css:'font-family:"DM Sans";font-size:31px;line-height:1.25;text-align:center;color:#6B7280'},
{id:'t9', cat:'type', tags:['rounded sans','light','soft'],
 t:'type', css:'font-family:Nunito;font-weight:300;font-size:36px;line-height:1.22'},

/* ---- COLOUR ---- 8 */
{id:'c1', cat:'colour', tags:['two colour','high contrast','ink on paper'],
 t:'swatch', cols:['#14130F','#F0E9D8'], note:'Two. Ink and paper.'},
{id:'c2', cat:'colour', tags:['whole frame colour','saturated','single cast'],
 t:'swatch', cols:['#E8C84A','#E8C84A','#E8C84A','#14130F'], note:'One colour taking the whole field.'},
{id:'c3', cat:'colour', tags:['accent colour','neutral ground','restrained'],
 t:'swatch', cols:['#FFFFFF','#F4F4F4','#14130F','#FF3E00'], note:'Neutral, with one accent.'},
{id:'c4', cat:'colour', tags:['pastel','soft','low contrast'],
 t:'swatch', cols:['#F7E6E9','#E6EEF7','#EAF2E6','#F7F0E6'], note:'Pastels, low contrast.'},
{id:'c5', cat:'colour', tags:['purple gradient','tech','generic'],
 t:'swatch', cols:['#6366F1','#8B5CF6','#A855F7','#EC4899'], note:'The indigo to pink run.'},
{id:'c6', cat:'colour', tags:['earth','muted','analogue'],
 t:'swatch', cols:['#8EA066','#833405','#D0402F','#404C25'], note:'Earth, muted, printed.'},
{id:'c7', cat:'colour', tags:['monochrome','grey scale','no colour'],
 t:'swatch', cols:['#111111','#555555','#999999','#DDDDDD'], note:'No colour at all.'},
{id:'c8', cat:'colour', tags:['clashing','loud','primary'],
 t:'swatch', cols:['#151DE0','#FF3E00','#E8C84A','#14130F'], note:'Primaries, clashing on purpose.'},

/* ---- SPACING ---- 6 */
{id:'s1', cat:'space', tags:['dense','tight leading','small text','narrow measure'],
 t:'space', size:12, lh:1.42, measure:'22em', gap:7},
{id:'s2', cat:'space', tags:['airy','generous','large text','wide measure'],
 t:'space', size:17, lh:1.85, measure:'34em', gap:26},
{id:'s3', cat:'space', tags:['dense','small text','wide measure'],
 t:'space', size:12, lh:1.5, measure:'40em', gap:10},
{id:'s4', cat:'space', tags:['airy','large text','narrow measure'],
 t:'space', size:19, lh:1.6, measure:'18em', gap:22},
{id:'s5', cat:'space', tags:['very dense','packed','tiny text'],
 t:'space', size:10.5, lh:1.35, measure:'26em', gap:4},
{id:'s6', cat:'space', tags:['airy','very generous','sparse'],
 t:'space', size:15, lh:2.1, measure:'30em', gap:38},

/* ---- TEXTURE ---- 6 */
{id:'x1', cat:'texture', tags:['halftone','print','intrinsic texture'],
 t:'tex', css:'background-image:radial-gradient(circle,#14130F 1.6px,transparent 1.9px);background-size:7px 7px', note:'Halftone dots.'},
{id:'x2', cat:'texture', tags:['grain overlay','applied texture','noise'],
 t:'tex', css:'background-color:#E8E4DA;background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'120\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'120\' height=\'120\' filter=\'url(%23n)\' opacity=\'0.5\'/%3E%3C/svg%3E")', note:'Grain laid over the top.'},
{id:'x3', cat:'texture', tags:['graph paper','grid','drawn on'],
 t:'tex', css:'background-color:#fff;background-image:linear-gradient(#D8DEE4 1px,transparent 1px),linear-gradient(90deg,#D8DEE4 1px,transparent 1px);background-size:14px 14px', note:'Graph paper.'},
{id:'x4', cat:'texture', tags:['glassmorphism','blur','translucent','generic'],
 t:'tex', css:'background:linear-gradient(135deg,#C7D2FE,#F5D0FE);position:relative', inner:'<div style="position:absolute;inset:18%;background:rgba(255,255,255,.55);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.8);border-radius:16px"></div>', note:'Frosted glass panel.'},
{id:'x5', cat:'texture', tags:['flat','no texture','plain ground'],
 t:'tex', css:'background:#F0E9D8', note:'Nothing at all. Flat colour.'},
{id:'x6', cat:'texture', tags:['checkerboard','pattern','graphic'],
 t:'tex', css:'background-color:#fff;background-image:linear-gradient(45deg,#14130F 25%,transparent 25%,transparent 75%,#14130F 75%),linear-gradient(45deg,#14130F 25%,transparent 25%,transparent 75%,#14130F 75%);background-size:22px 22px;background-position:0 0,11px 11px', note:'Checkerboard.'},

/* ---- IMAGERY ---- 6 */
{id:'i1', cat:'image', tags:['full bleed','edge to edge','no frame'],
 t:'img', mode:'bleed', note:'Image running to every edge.'},
{id:'i2', cat:'image', tags:['border is active','coloured ground','image inside a field'],
 t:'img', mode:'matted', note:'Image set inside a coloured field.'},
{id:'i3', cat:'image', tags:['rounded corners','drop shadow','card','generic'],
 t:'img', mode:'card', note:'Rounded, floating, with a shadow.'},
{id:'i4', cat:'image', tags:['non rectangular mask','cut out','shaped'],
 t:'img', mode:'oval', note:'Masked to an oval.'},
{id:'i5', cat:'image', tags:['repeat grid','index','numbered'],
 t:'img', mode:'grid', note:'Repeated in a numbered grid.'},
{id:'i6', cat:'image', tags:['tilted','perspective','3d mockup','generic'],
 t:'img', mode:'tilt', note:'Tilted in fake perspective.'},

/* ---- VOICE ---- 6 */
{id:'v1', cat:'voice', tags:['plain','concrete','stated'],
 t:'copy', text:'Thursdays, seven, Meyerson B3. Anyone can come.'},
{id:'v2', cat:'voice', tags:['selling','benefit language','generic'],
 t:'copy', text:'Unlock your full creative potential and ship beautiful work, effortlessly.'},
{id:'v3', cat:'voice', tags:['position','opinionated','short'],
 t:'copy', text:'Places for the particular.'},
{id:'v4', cat:'voice', tags:['explanatory','long','hedged'],
 t:'copy', text:'We believe that great design is ultimately about understanding the needs of your users and delivering experiences that resonate.'},
{id:'v5', cat:'voice', tags:['refusal','negative','boundary'],
 t:'copy', text:'No ratings. No listicles. No stars.'},
{id:'v6', cat:'voice', tags:['playful','informal','aside'],
 t:'copy', text:'Most of it is not finished, and that is sort of the point.'},

/* ---- LAYOUT ---- 9 */
{id:'l1', cat:'layout', tags:['centred','white ground','rounded corners','cards','pill badge','drop shadow','airy','generic'],
 t:'raw', html:'<div style="text-align:center;padding:6px 12px">'+
  '<span style="display:inline-block;font-size:9px;padding:4px 10px;border-radius:999px;background:#EEF2FF;color:#4F46E5;margin-bottom:12px">Introducing</span>'+
  '<p style="font-size:20px;font-weight:800;letter-spacing:-.02em;margin:0 0 7px;color:#111">Places for the particular</p>'+
  '<p style="font-size:10px;color:#9CA3AF;margin:0 auto 13px;max-width:74%">The all in one platform for discovering places you will actually like.</p>'+
  '<span style="display:inline-block;font-size:10px;color:#fff;background:#6366F1;padding:7px 18px;border-radius:9px;box-shadow:0 6px 16px rgba(99,102,241,.35);margin-bottom:14px">Get started</span>'+
  '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:7px">'+
  '<div style="border:1px solid #E5E7EB;border-radius:11px;padding:9px 6px"><div style="width:15px;height:15px;border-radius:6px;background:#EEF2FF;margin:0 auto 6px"></div><div style="height:4px;background:#eee;width:70%;margin:0 auto 4px"></div><div style="height:4px;background:#f3f3f3;width:84%;margin:0 auto"></div></div>'.repeat(3)+
  '</div></div>'},

{id:'l2', cat:'layout', tags:['left aligned','white ground','hairline rules','dense','numbers visible'],
 t:'raw', html:'<div style="padding:6px 12px">'+
  '<p style="font-size:17px;font-weight:700;margin:0 0 10px">Places for the particular</p>'+
  '<div style="display:flex;gap:10px;padding:6px 0;border-top:1px solid #ddd;font-size:11px"><span style="color:#999;font-size:9px;letter-spacing:.1em">01</span><span>Thursdays, seven, Meyerson B3</span></div>'+
  '<div style="display:flex;gap:10px;padding:6px 0;border-top:1px solid #ddd;font-size:11px"><span style="color:#999;font-size:9px;letter-spacing:.1em">02</span><span>Anyone can come, no portfolio</span></div>'+
  '<div style="display:flex;gap:10px;padding:6px 0;border-top:1px solid #ddd;font-size:11px"><span style="color:#999;font-size:9px;letter-spacing:.1em">03</span><span>Two hours, then we show it</span></div>'+
  '<div style="display:flex;gap:10px;padding:6px 0;border-top:1px solid #ddd;font-size:11px"><span style="color:#999;font-size:9px;letter-spacing:.1em">04</span><span>Most of it is not finished</span></div>'+
  '</div>'},

{id:'l3', cat:'layout', tags:['image ground','type over image','whole frame colour','dense'],
 t:'raw', html:'<div style="position:relative;height:100%;background:linear-gradient(160deg,#3F5134,#1E2A1C);padding:22px 18px">'+
  '<p style="font-size:21px;font-weight:700;color:#F2EFE6;margin:0 0 7px;line-height:1.1">Places for the particular</p>'+
  '<p style="font-size:10px;color:rgba(242,239,230,.7);margin:0">Twenty five cities, read by people who live in them.</p></div>'},

{id:'l4', cat:'layout', tags:['left aligned','index grid','numbers visible','dense'],
 t:'raw', html:'<div style="padding:6px 12px">'+
  '<p style="font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#888;margin:0 0 10px">Plate one &#183; 01 to 08</p>'+
  '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">'+
  [1,2,3,4,5,6,7,8].map(function(n){return '<div><span style="font-size:8px;color:#aaa;display:block;margin-bottom:3px">0'+n+'</span><div style="aspect-ratio:1;background:#ececec"></div></div>';}).join('')+
  '</div></div>'},

{id:'l5', cat:'layout', tags:['coloured ground','border is active','whole frame colour','dense'],
 t:'raw', html:'<div style="height:100%;background:#E8C84A;padding:18px;display:flex;align-items:center">'+
  '<div style="background:#fff;padding:18px 16px;width:100%">'+
  '<p style="font-size:17px;font-weight:700;margin:0 0 7px">Places for the particular</p>'+
  '<p style="font-size:10px;color:#555;margin:0;line-height:1.5">Twenty five cities, read by people who live in them.</p></div></div>'},

{id:'l6', cat:'layout', tags:['centred','airy','generous','quiet','light'],
 t:'raw', html:'<div style="text-align:center;padding:34px 26px">'+
  '<p style="font-size:19px;font-weight:300;line-height:1.45;margin:0;color:#222">Places for the particular</p>'+
  '<p style="font-size:10px;color:#aaa;margin:16px 0 0;letter-spacing:.12em;text-transform:uppercase">Est. 2026</p></div>'},

{id:'l7', cat:'layout', tags:['asymmetric','left aligned','image beside text'],
 t:'raw', html:'<div style="display:grid;grid-template-columns:38% 1fr;gap:14px;padding:6px 12px;align-items:start">'+
  '<div style="aspect-ratio:3/4;background:#ddd"></div>'+
  '<div><p style="font-size:15px;font-weight:700;margin:0 0 7px;line-height:1.2">Places for the particular</p>'+
  '<p style="font-size:10px;color:#555;line-height:1.6;margin:0">Twenty five cities, read by people who live in them. No ratings, no listicles, no stars.</p></div></div>'},

{id:'l8', cat:'layout', tags:['centred','gradient','cards','rounded corners','generic'],
 t:'raw', html:'<div style="text-align:center;padding:20px 14px">'+
  '<p style="font-size:23px;font-weight:800;letter-spacing:-.02em;margin:0 0 12px;background:linear-gradient(95deg,#6366F1,#A855F7);-webkit-background-clip:text;background-clip:text;color:transparent">Places for the particular</p>'+
  '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">'+
  '<div style="border-radius:13px;background:linear-gradient(180deg,#fff,#F8F7FF);border:1px solid #EEF0F8;padding:13px 8px"><div style="height:5px;background:#EEF2FF;width:60%;margin:0 auto 6px"></div><div style="height:4px;background:#F3F4F6;width:80%;margin:0 auto"></div></div>'.repeat(2)+
  '</div></div>'},

{id:'l9', cat:'layout', tags:['left aligned','coloured ground','no white','dense','whole frame colour'],
 t:'raw', html:'<div style="height:100%;background:#F0E9D8;padding:22px 18px">'+
  '<p style="font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#8A8070;margin:0 0 10px">Disco &#183; No. 01</p>'+
  '<p style="font-size:19px;font-weight:700;margin:0 0 8px;line-height:1.15;color:#1A1714">Places for the particular</p>'+
  '<div style="border-top:1px solid #D5CBBB;padding-top:8px"><p style="font-size:10px;color:#5C5248;margin:0;line-height:1.55">Twenty five cities, read by people who live in them.</p></div></div>'}
];

/* ---------------------------------------------------------------
   Round two. Ladders.

   Round one asks broad questions across categories. These vary one
   dimension at a time and nothing else, so a yes or no lands on a
   single variable instead of a whole look. This is where close
   calls get separated.
   --------------------------------------------------------------- */

function ladder(base, cat, dim, steps){
  return steps.map(function(st, n){
    return {
      id: base + (n+1), cat: cat, dim: dim, round: 2,
      tags: [dim + ': ' + st.v].concat(st.tags || []),
      note: st.note || (dim + ', ' + st.v),
      t: st.t || 'type', css: st.css, cols: st.cols, html: st.html,
      size: st.size, lh: st.lh, measure: st.measure, gap: st.gap, text: st.text
    };
  });
}

var TYPE_BASE = 'font-family:Archivo;font-size:34px;line-height:1.2;';

const LADDERS = [].concat(

  ladder('w','type','weight', [
    {v:'300', tags:['light'],      css:TYPE_BASE+'font-weight:300'},
    {v:'400', tags:['regular'],    css:TYPE_BASE+'font-weight:400'},
    {v:'700', tags:['bold'],       css:TYPE_BASE+'font-weight:700'},
    {v:'900', tags:['heavy'],      css:TYPE_BASE+'font-weight:900'}
  ]),

  ladder('k','type','tracking', [
    {v:'-0.04em', tags:['tight tracking'], css:TYPE_BASE+'font-weight:700;letter-spacing:-.04em'},
    {v:'0',       tags:['normal tracking'],css:TYPE_BASE+'font-weight:700;letter-spacing:0'},
    {v:'+0.08em', tags:['open tracking'],  css:TYPE_BASE+'font-weight:700;letter-spacing:.08em'},
    {v:'+0.22em', tags:['wide tracking'],  css:'font-family:Archivo;font-size:22px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;line-height:1.5'}
  ]),

  ladder('cs','type','case', [
    {v:'lower',    tags:['lowercase'],  css:TYPE_BASE+'font-weight:700;text-transform:lowercase'},
    {v:'sentence', tags:['sentence case'], css:TYPE_BASE+'font-weight:700'},
    {v:'Title',    tags:['title case'], css:TYPE_BASE+'font-weight:700', text:'Places For The Particular'},
    {v:'UPPER',    tags:['uppercase'],  css:TYPE_BASE+'font-weight:700;text-transform:uppercase'}
  ]),

  ladder('sc','type','scale', [
    {v:'22px', tags:['small display'],  css:'font-family:Archivo;font-weight:700;font-size:22px;line-height:1.25'},
    {v:'34px', tags:['medium display'], css:'font-family:Archivo;font-weight:700;font-size:34px;line-height:1.18'},
    {v:'50px', tags:['large display'],  css:'font-family:Archivo;font-weight:700;font-size:50px;line-height:1.05'},
    {v:'72px', tags:['huge display'],   css:'font-family:Archivo;font-weight:900;font-size:72px;line-height:.95;letter-spacing:-.04em'}
  ]),

  ladder('m','space','measure', [
    {v:'18em', tags:['narrow measure'], t:'space', size:14, lh:1.6, measure:'18em', gap:14},
    {v:'26em', tags:['medium measure'], t:'space', size:14, lh:1.6, measure:'26em', gap:14},
    {v:'34em', tags:['wide measure'],   t:'space', size:14, lh:1.6, measure:'34em', gap:14},
    {v:'46em', tags:['very wide measure'], t:'space', size:14, lh:1.6, measure:'46em', gap:14}
  ]),

  ladder('lh','space','leading', [
    {v:'1.25', tags:['tight leading'],   t:'space', size:14, lh:1.25, measure:'28em', gap:14},
    {v:'1.5',  tags:['normal leading'],  t:'space', size:14, lh:1.5,  measure:'28em', gap:14},
    {v:'1.8',  tags:['open leading'],    t:'space', size:14, lh:1.8,  measure:'28em', gap:14},
    {v:'2.1',  tags:['very open leading'],t:'space',size:14, lh:2.1,  measure:'28em', gap:14}
  ]),

  ladder('g','space','section gap', [
    {v:'14px', tags:['packed sections'], t:'space', size:14, lh:1.5, measure:'28em', gap:14},
    {v:'30px', tags:['normal sections'], t:'space', size:14, lh:1.5, measure:'28em', gap:30},
    {v:'56px', tags:['loose sections'],  t:'space', size:14, lh:1.5, measure:'28em', gap:56},
    {v:'90px', tags:['very loose sections'], t:'space', size:14, lh:1.5, measure:'28em', gap:90}
  ]),

  ladder('gr','colour','ground', [
    {v:'white',  tags:['white ground'],   t:'swatch', cols:['#FFFFFF'], note:'Pure white.'},
    {v:'paper',  tags:['paper ground'],   t:'swatch', cols:['#F0E9D8'], note:'Warm off white.'},
    {v:'colour', tags:['coloured ground'],t:'swatch', cols:['#E8C84A'], note:'A colour taking the ground.'},
    {v:'dark',   tags:['dark ground'],    t:'swatch', cols:['#14130F'], note:'Near black.'}
  ]),

  ladder('n','colour','how many colours', [
    {v:'1', tags:['one colour'],    t:'swatch', cols:['#14130F'], note:'Ink only.'},
    {v:'2', tags:['two colour'],    t:'swatch', cols:['#14130F','#F0E9D8'], note:'Two.'},
    {v:'3', tags:['three colour'],  t:'swatch', cols:['#14130F','#F0E9D8','#FF3E00'], note:'Three.'},
    {v:'6', tags:['many colours'],  t:'swatch', cols:['#FF3E00','#8EA066','#151DE0','#9D70C0','#833405','#E8C84A'], note:'Six.'}
  ]),

  ladder('al','layout','alignment', [
    {v:'left',      tags:['left aligned'], t:'raw', html:'<div style="padding:26px 28px;text-align:left"><p style="font-size:20px;font-weight:700;margin:0 0 8px">Places for the particular</p><p style="font-size:12px;color:#666;margin:0;max-width:26em;line-height:1.6">Twenty five cities, read by people who live in them.</p></div>'},
    {v:'centre',    tags:['centred'],      t:'raw', html:'<div style="padding:26px 28px;text-align:center"><p style="font-size:20px;font-weight:700;margin:0 0 8px">Places for the particular</p><p style="font-size:12px;color:#666;margin:0 auto;max-width:26em;line-height:1.6">Twenty five cities, read by people who live in them.</p></div>'},
    {v:'right',     tags:['right aligned'],t:'raw', html:'<div style="padding:26px 28px;text-align:right"><p style="font-size:20px;font-weight:700;margin:0 0 8px">Places for the particular</p><p style="font-size:12px;color:#666;margin:0 0 0 auto;max-width:26em;line-height:1.6">Twenty five cities, read by people who live in them.</p></div>'},
    {v:'justified', tags:['justified'],    t:'raw', html:'<div style="padding:26px 28px"><p style="font-size:20px;font-weight:700;margin:0 0 8px">Places for the particular</p><p style="font-size:12px;color:#666;margin:0;max-width:26em;line-height:1.6;text-align:justify">Twenty five cities, read by people who live in them, not by an algorithm counting stars and reviews.</p></div>'}
  ]),

  ladder('bd','layout','border', [
    {v:'none',    tags:['no border','edge to edge'], t:'raw', html:'<div style="height:100%;background:#D9D4C6"></div>'},
    {v:'hairline',tags:['hairline border'], t:'raw', html:'<div style="height:100%;padding:16px"><div style="height:100%;border:1px solid #14130F"></div></div>'},
    {v:'field',   tags:['colour field border','border is active'], t:'raw', html:'<div style="height:100%;background:#E8C84A;padding:34px"><div style="height:100%;background:#D9D4C6"></div></div>'},
    {v:'mat',     tags:['image mat','border is active'], t:'raw', html:'<div style="height:100%;background:linear-gradient(140deg,#8A5A2B,#C98A3C);padding:34px"><div style="height:100%;background:#D9D4C6"></div></div>'}
  ])
);

/* every specimen the engine can ask about */
SPECIMENS.forEach(function(s){ if (!s.round) s.round = 1; });
const DECK = SPECIMENS.concat(LADDERS);
