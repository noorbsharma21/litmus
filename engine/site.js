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
var WINES = [
  ['Pét-nat, Loire',      'Chenin, 2023',     '£24'],
  ['Skin contact, Friuli','Ribolla, 2022',    '£31'],
  ['Saison, Kent',        'Farmhouse, 6.2%',  '£5'],
  ['Gamay, Beaujolais',   'Carbonic, 2024',   '£19'],
  ['Gose, Leipzig',       'Salt and coriander','£6'],
  ['Trousseau, Jura',     'Light red, 2021',  '£38']
];
var PLATES = [
  ['Kennington, March',  '2024'], ['Rai, before the rain','2023'],
  ['The long room',      '2024'], ['Sonipat, 6am',        '2022'],
  ['Window seat',        '2025'], ['Nobody at the pool',  '2023']
];
var NIGHTS = [
  ['Thu 6',  '19:30', 'Cafe OTO',        'Duo set, no support'],
  ['Fri 7',  '21:00', 'The Glove That Fits','Doors at nine'],
  ['Sat 8',  '14:00', 'Peckham Levels',  'Free, all day'],
  ['Sat 8',  '23:00', 'Ormside Projects','Late, cash on the door'],
  ['Sun 9',  '16:00', 'Brilliant Corners','Listening session'],
  ['Tue 11', '19:00', 'Moth Club',       'Two bands, one room']
];

var ARCH = {

  /* ---- a shop. a catalogue with a price on everything ---- */
  shop: {
    label:'shop',
    match:['shop','store','wine','beer','bottle','brewery','bar','buy','product','cart',
           'retail','grocer','merch','price','shelf','off licence','deli','market'],
    note:'A catalogue. The job is to let someone find a bottle and buy it, so the grid, the prices and the stock line outrank the headline.',
    bias:{ scale:'low', 'section gap':'low', measure:'low' },
    build:function(c){
      var out = [];
      out.push(c.nav('Cart (0)'));
      out.push('<div style="margin:' + c.gap + 'px 0 ' + Math.round(c.gap*0.4) + 'px;text-align:' + c.align + '">' +
        '<h1 style="' + c.headCss + '">Bottles worth the shelf</h1></div>');
      out.push('<p style="' + c.bodyCss + '">Forty odd things in at any time. Everything here has been ' +
        'drunk by somebody who works here, which is the only filter.</p>');

      var cells = WINES.map(function(w, i){
        return '<div>' +
          plate(c.seed + i * 29, 132, c.has('c3') ? c.acc : null) +
          '<p style="font-family:Archivo;font-weight:700;font-size:15px;margin:10px 0 2px;color:' + c.ink + ';' +
            c.caseCss + '">' + w[0] + '</p>' +
          '<p style="font-family:Nunito;font-size:13px;margin:0;color:' + c.muted + '">' + w[1] + '</p>' +
          '<p style="font-family:Archivo;font-weight:700;font-size:14px;margin:6px 0 0;color:' +
            (c.nCol > 1 ? c.acc : c.ink) + '">' + w[2] + '</p></div>';
      });
      out.push('<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin:' + c.gap + 'px 0 0">' +
        cells.join('') + '</div>');

      out.push('<div style="margin:' + Math.round(c.gap * 1.9) + 'px 0 0;display:flex;gap:28px;align-items:flex-start">' +
        '<p style="' + c.bodyCss + ';flex:1">Delivery Tuesday and Friday inside the M25. ' +
        'Everything else goes by courier, packed in straw.</p>' +
        '<p style="font-family:Archivo;font-weight:700;font-size:14px;margin:0;color:' + c.ink + '">In stock today</p></div>');
      return out;
    }
  },

  /* ---- photography. pictures first, words almost absent ---- */
  gallery: {
    label:'photography site',
    match:['photograph','photography','photo','portfolio','gallery','pictures','images',
           'my work','artist','painter','film','darkroom','prints','series'],
    note:'The pictures are the content and the type is a caption. No hero sentence, no explaining. The first thing on the page is an image and the name sits small.',
    bias:{ scale:'low', 'how many colours':'low', 'section gap':'high', measure:'low' },
    build:function(c){
      var out = [];
      out.push('<div style="display:flex;justify-content:space-between;align-items:baseline;' +
        'font-family:Archivo;font-size:14px;color:' + c.ink + '">' +
        '<span style="font-weight:700;' + c.caseCss + '">Noor Sharma</span>' +
        '<span style="font-family:Nunito;font-size:12px;color:' + c.muted + '">Index &#183; Contact</span></div>');

      /* the first thing is a picture, full width, no words over it */
      out.push('<div style="margin:' + Math.round(c.gap*0.8) + 'px -56px 0">' +
        plate(c.seed + 2, 330, c.has('c3') ? c.acc : null) + '</div>');
      out.push('<p style="font-family:Nunito;font-size:12px;color:' + c.muted +
        ';margin:8px 0 0">' + PLATES[0][0] + ', ' + PLATES[0][1] + '</p>');

      /* a stagger, because a grid would be the gallery default */
      out.push('<div style="display:flex;gap:18px;align-items:flex-start;margin:' + c.gap + 'px 0 0">' +
        '<div style="flex:3">' + plate(c.seed + 3, 210, null) +
          '<p style="font-family:Nunito;font-size:12px;color:' + c.muted + ';margin:7px 0 0">' +
          PLATES[1][0] + ', ' + PLATES[1][1] + '</p></div>' +
        '<div style="flex:2;padding-top:' + Math.round(c.gap*1.2) + 'px">' + plate(c.seed + 4, 150, c.nCol > 1 ? c.acc : null) +
          '<p style="font-family:Nunito;font-size:12px;color:' + c.muted + ';margin:7px 0 0">' +
          PLATES[2][0] + ', ' + PLATES[2][1] + '</p></div></div>');

      /* the only paragraph on the page, and it is low down */
      out.push('<p style="' + c.bodyCss + ';margin-top:' + c.gap + 'px">Pictures from walking, mostly. ' +
        'Nobody is looking at the camera in any of them.</p>');
      return out;
    }
  },

  /* ---- a long read. measure and leading are the whole design ---- */
  editorial: {
    label:'long read',
    match:['essay','article','blog','journal','magazine','long read','longread','story',
           'documentation','docs','report','paper','newsletter','writing','piece'],
    note:'One column, no furniture. The measure and the leading are doing all of the work and there is almost nothing to look at, which is the point.',
    bias:{ measure:'low', leading:'high', scale:'low', 'how many colours':'low', weight:'low' },
    build:function(c){
      var out = [];
      out.push('<div style="display:flex;justify-content:space-between;font-family:Nunito;font-size:11px;' +
        'letter-spacing:.14em;text-transform:uppercase;color:' + c.muted + '">' +
        '<span>Essays</span><span>No. 14 &#183; November</span></div>');

      out.push('<p style="font-family:Nunito;font-size:12px;letter-spacing:.1em;text-transform:uppercase;' +
        'color:' + (c.nCol > 1 ? c.acc : c.muted) + ';margin:' + c.gap + 'px 0 10px">On walking</p>');
      out.push('<h1 style="' + c.headCss + ';max-width:' + c.meas + '">The city you only get at three miles an hour</h1>');
      out.push('<p style="font-family:Nunito;font-size:13px;color:' + c.muted + ';margin:12px 0 0">' +
        'Noor Sharma &#183; 2 November 2026 &#183; 11 minutes</p>');

      var para = function(t, first){
        /* lead-in runs to a word boundary, never mid word */
        var cut = first ? t.indexOf(' ', 26) : -1;
        if (cut < 0) cut = 28;
        return '<p style="' + c.bodyCss + ';margin-top:' + Math.round(c.gap*0.7) + 'px">' +
          (first ? '<span style="font-family:Archivo;font-weight:700;color:' + c.ink + '">' +
            t.slice(0, cut) + '</span>' + t.slice(cut) : t) + '</p>';
      };
      out.push(para('Everything worth knowing about a place is at the speed you can stop at. ' +
        'A car gives you the route and takes the street, and the street is where it all is.', true));
      out.push('<blockquote style="margin:' + c.gap + 'px 0 0;padding-left:18px;border-left:2px solid ' +
        (c.nCol > 1 ? c.acc : c.ink) + ';font-family:Archivo;font-weight:700;font-size:' +
        Math.max(17, Math.round(c.scale*0.52)) + 'px;line-height:1.3;color:' + c.ink +
        ';max-width:' + c.meas + '">You cannot be told a city. You have to be bored in it first.</blockquote>');
      out.push(para('The argument against this is time, and the argument is fair. Nobody has a ' +
        'free afternoon. But an hour spent going nowhere in particular will give you more than ' +
        'a weekend spent arriving at things.'));
      return out;
    }
  },

  /* ---- a listing. repetition, small type, structure ---- */
  listing: {
    label:'listing',
    match:['event','events','night','nights','show','gig','listing','listings','guide',
           'weekly','this week','weekend','tonight','calendar','what is on','whats on',
           'club','programme','schedule','diary','opening times','drop'],
    note:'A repeating row is the unit. Everything is date, time, place and one line, set small and often, so the structure is what you read before any single entry.',
    bias:{ scale:'low', 'section gap':'low', measure:'low', weight:'low' },
    build:function(c){
      var out = [];
      out.push(c.nav('This week'));
      out.push('<div style="margin:' + c.gap + 'px 0 ' + Math.round(c.gap*0.4) + 'px;text-align:' + c.align + '">' +
        '<h1 style="' + c.headCss + '">Six nights, 6 to 11 November</h1></div>');
      out.push('<p style="' + c.bodyCss + '">Everything here has somebody behind it who will be ' +
        'in the room. Nothing is sponsored and nothing is ranked.</p>');

      out.push('<div style="margin:' + c.gap + 'px 0 0">' + NIGHTS.map(function(n, i){
        return '<div style="display:flex;gap:18px;align-items:baseline;padding:' +
          Math.round(c.gap * 0.42) + 'px 0">' +
          '<span style="font-family:Archivo;font-weight:700;font-size:14px;width:62px;flex:none;color:' +
            (c.nCol > 1 && i % 2 === 0 ? c.acc : c.ink) + '">' + n[0] + '</span>' +
          '<span style="font-family:Nunito;font-size:13px;width:52px;flex:none;color:' + c.muted + '">' + n[1] + '</span>' +
          '<span style="font-family:Archivo;font-weight:700;font-size:14px;flex:1;color:' + c.ink + ';' +
            c.caseCss + '">' + n[2] + '</span>' +
          '<span style="font-family:Nunito;font-size:13px;flex:1;color:' + c.muted + '">' + n[3] + '</span></div>';
      }).join('') + '</div>');

      if (c.has('c9') || c.has('c4')){
        out.push('<div style="display:flex;gap:8px;margin:' + c.gap + 'px -56px 0">' +
          plate(c.seed+11, 92, null) + plate(c.seed+12, 92, c.acc) + plate(c.seed+13, 92, null) + '</div>');
      }
      return out;
    }
  },

  /* ---- anything else ---- */
  page: {
    label:'page',
    match:[],
    note:'No kind detected, so this is a plain page: a statement, some words, a picture and a list.',
    bias:{},
    build:function(c){
      var out = [];
      out.push(c.nav('Cities &#183; Lists &#183; About'));
      var heroWrap = c.has('c7')
        ? 'margin:' + c.gap + 'px -56px ' + Math.round(c.gap*0.45) + 'px;white-space:nowrap;overflow:hidden'
        : 'margin:' + c.gap + 'px 0 ' + Math.round(c.gap*0.45) + 'px;text-align:' + c.align;
      out.push('<div style="' + heroWrap + '"><h1 style="' + c.headCss + '">' + c.words + '</h1></div>');
      out.push('<p style="' + c.bodyCss + '">Twenty five cities, read by people who live in them, ' +
        'not by an algorithm counting stars and reviews.</p>');
      out.push('<div style="margin:' + c.gap + 'px 0 0">' + plate(c.seed + 7, 210, c.has('c3') ? c.acc : null) + '</div>');
      out.push('<div style="margin:' + c.gap + 'px 0 0">' +
        '<p style="font-family:Archivo;font-weight:700;font-size:' + Math.max(18, Math.round(c.scale*0.5)) +
          'px;margin:0 0 ' + Math.round(c.gap*0.35) + 'px;color:' + c.ink + ';text-align:' + c.align + ';' +
          c.caseCss + '">Where to eat on a Tuesday</p>' +
        '<p style="' + c.bodyCss + '">Nothing here is ranked. The list is short because somebody had to ' +
        'walk it, and the walking is the part that takes the time.</p></div>');
      return out;
    }
  }
};

var ARCH_ORDER = ['shop','gallery','editorial','listing'];

/* which skeleton a brief is asking for. most specific wins on hit count. */
function readArch(text){
  var t = (text || '').toLowerCase(), best = null, bestN = 0, bestHits = [];
  ARCH_ORDER.forEach(function(k){
    var hits = ARCH[k].match.filter(function(w){ return t.indexOf(w) > -1; });
    if (hits.length > bestN){ best = k; bestN = hits.length; bestHits = hits; }
  });
  return { key: best || 'page', hits: bestHits };
}

/* ---------------------------------------------------------------
   One page.
   --------------------------------------------------------------- */
function renderSite(spec, moveIds, seed, label, archKey){
  var m   = moveIds || [];
  var s   = effectiveSpec(spec || {}, m);
  var has = function(id){ return m.indexOf(id) > -1; };
  var r   = rng(seed || 1);
  var A   = ARCH[archKey] || ARCH.page;

  var gk    = s.ground || 'paper';
  var bg    = GROUND[gk], ink = INK[gk], muted = MUTED[gk], line = LINE[gk];
  var nCol  = parseInt(s['how many colours'] || '2', 10);
  var pool  = accentsOn(bg, 3);
  var acc   = nCol <= 1 ? ink : pool[Math.floor(r() * pool.length)];
  var gap   = parseInt(s['section gap'] || '30', 10);
  var scale = parseInt(s.scale || '34', 10);
  var align = ALIGN[s.alignment || 'left'] || 'left';
  var meas  = s.measure || '26em';
  var caseCss = CASE_CSS[s['case'] || 'sentence'];

  var headCss = 'font-family:Archivo;margin:0;font-weight:' + (s.weight || '700') +
    ';font-size:' + scale + 'px;letter-spacing:' + (TRACK[s.tracking] || '0') +
    ';line-height:' + (scale > 48 ? '1.02' : '1.16') + ';' + caseCss + ';color:' + ink;
  var bodyCss = 'margin:0;font-family:Nunito;font-size:17px;line-height:' + (s.leading || '1.5') +
    ';color:' + muted + ';max-width:' + meas +
    (align === 'right' ? ';margin-left:auto' : align === 'center' ? ';margin:0 auto' : '') +
    ';text-align:' + align;

  var ctx = {
    s:s, has:has, seed:seed || 1, ink:ink, bg:bg, muted:muted, line:line, acc:acc,
    nCol:nCol, gap:gap, scale:scale, align:align, meas:meas, caseCss:caseCss,
    headCss:headCss, bodyCss:bodyCss,
    words: s['case'] === 'Title' ? titleCase(PHRASE) : PHRASE,
    nav: function(right){
      return '<div style="display:flex;justify-content:space-between;align-items:center;' +
        'padding:0 0 ' + Math.round(gap*0.6) + 'px;' +
        'font-family:Nunito;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:' + muted + '">' +
        '<span style="color:' + ink + ';font-weight:700">Index</span><span>' + right + '</span></div>';
    }
  };

  var out = A.build(ctx);

  /* moves that apply whatever the skeleton is */
  if (has('c6')){
    var sw = [];
    for (var j = 0; j < Math.max(2, nCol); j++){
      sw.push('<i style="width:26px;height:26px;display:block;background:' +
              (j === 0 ? ink : ACCENT[j % ACCENT.length]) + '"></i>');
    }
    out.push('<div style="display:flex;gap:6px;margin:' + gap + 'px 0 0">' + sw.join('') + '</div>');
  }
  out.push('<div style="margin:' + Math.round(gap * 2.2) + 'px 0 0;' +
    'font-family:Nunito;font-size:13px;color:' + muted + '">Set and printed, November 2026</div>');

  var groundCss = 'background:' + bg;
  if (has('c8')) groundCss += ';' + halftoneCss(gk === 'dark' ? 'rgba(255,255,255,.13)' : 'rgba(0,0,0,.10)');
  else if (has('c1')) groundCss += ';background-image:repeating-linear-gradient(0deg,transparent 0 37px,' +
    (gk === 'dark' ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.045)') + ' 37px 38px)';

  var page = '<div style="' + groundCss + ';padding:38px 56px 34px;width:' + PAGE_W +
             'px;min-height:' + PAGE_H + 'px;box-sizing:border-box">' + out.join('') + '</div>';

  var bd = s.border || 'none';
  if (bd === 'hairline') page = '<div style="background:' + bg + ';padding:18px;width:' + PAGE_W +
    'px;box-sizing:border-box"><div style="border:1px solid ' + ink + '">' + page + '</div></div>';
  if (bd === 'field') page = '<div style="background:' + acc + ';padding:26px;width:' + PAGE_W +
    'px;box-sizing:border-box">' + page + '</div>';
  if (bd === 'mat') page = '<div style="background:linear-gradient(140deg,#8A5A2B,#C98A3C);padding:26px;' +
    'width:' + PAGE_W + 'px;box-sizing:border-box">' + page + '</div>';

  return '<div class="siteframe"' + (label ? ' data-label="' + label + '"' : '') + '>' +
           '<div class="scaler">' + page + '</div></div>';
}

/* Scale every sample to the width it was given. Called after insert and
   on resize, because the grid columns move with the window. */
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
