/* Litmus engine, sample renderer.

   A wine shop and a photography site are not the same page with
   different type on it. They want different architecture: one is a
   catalogue with prices and a buy path, the other is a stack of
   pictures with almost no words. So the brief picks a skeleton, and
   the taste file styles whichever skeleton it picked. The taste is
   what makes both of them recognisably the same hand. The skeleton is
   what stops them looking like each other.

   The page is drawn at a real page width and scaled down afterwards,
   so 34px type looks like 34px type on a real page rather than like a
   poster. Drawing it small made every size read as huge. */

var PAGE_W = 900, PAGE_H = 760;

/* Every value below is sampled off the references, not chosen. See
   palette.js for which piece each one came out of and how much of that
   piece it covers.

   Three of these were wrong before and wrong in the same way. The
   yellow ground was #E8C84A, a golden amber at hue 48, when every
   yellow in forty-four pieces sits between 48 and 61 and the one that
   carries a whole page is #FDFF70. Two of the six accents, an olive at
   21% saturation and a mauve at 38%, sat in a band of the colour space
   that forty-four pieces do not touch once. They were the muddy middle,
   which is the thing being refused everywhere else in this project. */
var GROUND = { white:'#FFFFFF', paper:'#F3EBE0', colour:'#FDFF70', dark:'#1A1614' };
var INK    = { white:'#1A1614', paper:'#110B0A', colour:'#110B0A', dark:'#F3EBE0' };
var MUTED  = { white:'#382F2C', paper:'#6B6453', colour:'#4B4C2D', dark:'#9A958A' };
var LINE   = { white:'#E4E4E4', paper:'#DAD2BC', colour:'#D8DA55', dark:'#33312A' };
var ACCENT = (typeof M_ACCENT !== 'undefined') ? M_ACCENT :
             ['#A40603','#C5242B','#F4432D','#EE5884','#F64FB2','#E47937',
              '#FCF02A','#FDFF70','#EDD164','#072493','#3866C1','#88B7D3','#0F6E2B'];

var CASE_CSS = { 'lower':'text-transform:lowercase', 'sentence':'', 'Title':'',
                 'UPPER':'text-transform:uppercase' };

/* The file calls contrast non negotiable, so a sample that breaks it
   would make a liar of the thing it is demonstrating. Accents are
   filtered against the ground they will actually sit on before one is
   picked, rather than checked afterwards. */
function lum(hex){
  var c = hex.replace('#',''), v = [0,2,4].map(function(i){
    var x = parseInt(c.substr(i,2),16) / 255;
    return x <= 0.03928 ? x/12.92 : Math.pow((x+0.055)/1.055, 2.4);
  });
  return 0.2126*v[0] + 0.7152*v[1] + 0.0722*v[2];
}
function contrast(a, b){
  var x = lum(a), y = lum(b);
  return (Math.max(x,y) + 0.05) / (Math.min(x,y) + 0.05);
}
function accentsOn(bg, min){
  var ok = ACCENT.filter(function(c){ return contrast(c, bg) >= (min || 3); });
  return ok.length ? ok : [INK[bg === GROUND.dark ? 'dark' : 'paper']];
}
var ALIGN = { left:'left', right:'right', centre:'center', justified:'justify' };
var TRACK = { '-0.04em':'-.04em', '0':'0', '+0.08em':'.08em', '+0.22em':'.22em' };

function titleCase(s){
  return s.replace(/\w\S*/g, function(t){ return t.charAt(0).toUpperCase() + t.slice(1); });
}
function specFrom(run){
  var s = {};
  (run || []).forEach(function(r){ s[r.dim] = r.choice.v; });
  return s;
}

/* Two moves overrule a dimension outright. Resolve that before anything
   reads the spec, so the label under a page describes the page above it
   rather than the draw that went into it. */
function effectiveSpec(spec, moveIds){
  var s = {}, m = moveIds || [];
  Object.keys(spec || {}).forEach(function(k){ s[k] = spec[k]; });
  if (m.indexOf('c12') > -1) s.ground = 'colour';
  if (m.indexOf('c5')  > -1 && (!s.border || s.border === 'none')) s.border = 'field';
  return s;
}

/* A plate stands in for a photograph. It used to be a gradient at a
   random hue, saturation 24 to 30, lightness 24 to 42. Three separate
   problems in one line. The gradient is refused by name in the file.
   The random hue could produce teal or mauve, neither of which occurs
   in forty-four references. And that saturation and lightness band is
   the muddy middle, which nothing in the set touches once.

   What the references actually do with a photograph, every time: a flat
   colour knocked out of it, a halftone screen over it, or a duotone of
   two flat inks. P07 silhouettes cattle in oxide red. S03 knocks the
   figures out in highlighter yellow. P21 screens the whole thing. S19
   runs the photographs as a blue and red duotone. All flat, all from a
   press, never a wash. */
function plate(seed, h, tint, extra){
  var r = rng(seed);
  var pick = (typeof pickAccent === 'function') ? pickAccent(r())
                                                : ACCENT[Math.floor(r() * ACCENT.length)];
  var base = tint || pick;
  var mode = Math.floor(r() * 3);
  var over = mode === 0 ? halftoneCss('rgba(17,11,10,.38)')
           : mode === 1 ? 'background-image:repeating-linear-gradient(' +
                          (r() < 0.5 ? '90deg' : '0deg') +
                          ',rgba(17,11,10,.30) 0 1px,transparent 1px 7px)'
           : 'background-image:radial-gradient(rgba(17,11,10,.30) 1px,transparent 1.2px);background-size:7px 7px';
  return '<div style="height:' + h + 'px;position:relative;overflow:hidden;' + (extra || '') +
    'background:' + base + '">' +
    '<div style="position:absolute;inset:0;' + over + '"></div>' +
  '</div>';
}
function halftoneCss(col){
  return 'background-image:radial-gradient(' + col + ' 2px, transparent 2.1px);background-size:14px 14px';
}

/* ---------------------------------------------------------------
   The skeletons. Each one gets the same styling context and decides
   what a page of its kind is actually made of.
   --------------------------------------------------------------- */
/* Five page skeletons used to sit here: shop, gallery, editorial,
   listing, page. All five were a stack of bands down a page, with the
   sample content for each. They were superseded by the seven
   structures in structure.js and then left running anyway, so the
   generated prompt printed both and told a model to build a
   photography site and a board in the same document. The samples drew
   with these while stage 09 drew with the other set, which is how the
   engine came to show one thing and say another.

   renderSite went with them. Nothing draws a stack of bands now. */

function fitSites(root){
  var fs = (root || document).querySelectorAll('.siteframe');
  Array.prototype.forEach.call(fs, function(f){
    var sc = f.querySelector('.scaler'); if (!sc) return;
    var k = f.clientWidth / PAGE_W;
    if (!k) return;
    sc.style.transform = 'scale(' + k + ')';
    f.style.height = Math.round(PAGE_H * k) + 'px';
  });
}
var fitT;
window.addEventListener('resize', function(){
  clearTimeout(fitT); fitT = setTimeout(function(){ fitSites(); }, 120);
});

function specLine(spec){
  return ['weight','scale','case','tracking','measure','leading','section gap',
          'ground','how many colours','alignment','border']
    .filter(function(k){ return spec[k]; })
    .map(function(k){ return k + ' ' + spec[k]; }).join(', ');
}
