/* Structure. The half of the engine that was missing.

   Up to now a brief picked one of five skeletons, and all five were a
   stack of bands down a page: shop, gallery, editorial, listing, page.
   Nineteen of the forty-four references are a map, a plan, a network or
   a projection, and not one of those five could produce any of them.
   The colours were wrong and got measured. This is the architecture,
   and it was wronger.

   What this file is trying to be: the decision, not the output. Given a
   brief it asks the questions Noor would ask of it, in his order, and
   the answers pick the structure. The trace is kept and shown, because
   a choice you cannot see the reasoning for is not a choice you can
   correct.

   The seven structures are read off the references rather than invented.
   Each names the pieces it came from. Where a brief fits none of them
   the engine says so instead of defaulting to a stack of bands, because
   defaulting to the stack is the failure this file exists to end.    */

/* --------------------------------------------------------------
   1. Reading the brief.

   These are not keyword matches dressed up. They are the questions
   that decide what kind of object the thing is, and the brief is only
   evidence for the answers. The order matters: a space with parts
   beats many of one kind, because a wine shop in a room and forty
   bottles on a shelf are different problems and the room wins.
   -------------------------------------------------------------- */

var SHAPE = [
  { id:'space',
    q:'Does the subject occupy a space that has parts?',
    hit:/\b(shop|store|bar|restaurant|cafe|kitchen|studio|gallery|room|house|flat|apartment|building|venue|space|floor|site|garden|museum|office|library|stall|market|hotel)\b/i,
    because:'A space with parts can be opened and drawn from above. Six references do exactly that and none of them photographs the room.' },

  { id:'place',
    q:'Is there a ground, a route, or somewhere you would have to go?',
    hit:/\b(city|neighbourhood|neighborhood|walk|route|tour|trail|map|district|street|area|borough|region|town|village|journey|where|nearby|local|guide)\b/i,
    because:'Three references lay the ground out as itself and put the places on it. A list of addresses is not a map and is the lazier object.' },

  { id:'relation',
    q:'Do the parts relate to each other in a way that matters more than the parts?',
    hit:/\b(history|timeline|evolution|network|connect|relation|between|influence|lineage|family|archive|how .* works|process|system|flow|link|over time|since|years)\b/i,
    because:'Six references draw the relations and let the things be small. P12 is a timeline drawn as fans of lines and the dates are almost incidental.' },

  { id:'many',
    q:'Is there more than one of the main thing, and do you want all of them at once?',
    hit:/\b(catalogue|catalog|collection|range|menu|index|archive|series|list|every|all of|selection|stock|library|set|bottles|dishes|prints|works|pieces|items|products)\b/i,
    because:'Twelve references arrange a set as a set, and the set is always complete: all fifty artworks, all thirty specimens, every dot.' },

  { id:'mixed',
    q:'Are there a lot of unlike things that have to sit on one sheet together?',
    hit:/\b(research|study|essay|thesis|project|process|documentation|field|notes|investigation|brief|report|proposal|case study|portfolio)\b/i,
    because:'Five references put everything on one sheet and place it by argument rather than by slot. The density is the content.' },

  { id:'words',
    q:'Is it mostly words, with pictures placed into them?',
    hit:/\b(essay|article|writing|long read|story|interview|journal|review|blog|newsletter|chapter|letter|poem|manifesto)\b/i,
    because:'Four references run small text in columns and cut the pictures into the column structure instead of stacking them between paragraphs.' },

  { id:'announce',
    q:'Is it one thing being announced, with a date on it?',
    hit:/\b(poster|show|gig|exhibition|opening|launch|night|event|screening|festival|concert|talk|flyer|announce|presents|one night)\b/i,
    because:'Five references are a single surface with one statement on it. A poster that scrolls is not a poster.' }
];

function readShape(text){
  var t = String(text || '');
  var found = {}, words = {};
  SHAPE.forEach(function(q){
    var m = t.match(q.hit);
    found[q.id] = !!m;
    if (m) words[q.id] = m[0].toLowerCase();
  });
  /* A number in the brief is strong evidence of a set, so it is read
     separately from the words. But most numbers in a brief are not
     counts. "6 November" and "1979 to 2010" and "doors at nine" were
     all being read as "six of them", which is how a poster for one gig
     came out as a floor plan of the venue. Dates, years, times and
     money are struck out before anything is counted. */
  var clean = t
    .replace(/\b\d{1,2}(st|nd|rd|th)?\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*/gi, ' ')
    .replace(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+\d{1,2}\b/gi, ' ')
    .replace(/\b(19|20)\d{2}\b/g, ' ')
    .replace(/\b\d{1,2}[:.]\d{2}\b/g, ' ')
    .replace(/[£$€]\s?\d+/g, ' ');
  var n = clean.match(/\b(\d{1,3})\b/);
  if (n && parseInt(n[1], 10) >= 4){ found.many = true; words.many = n[1] + ' of them'; }
  return { found:found, words:words, text:t };
}

/* --------------------------------------------------------------
   2. The seven structures.

   `wants` scores a shape reading. `needs` is a shape that must be
   present or the structure is out entirely, which is what stops a
   projection being drawn for something with no space in it.
   -------------------------------------------------------------- */

var STRUCTURES = {

  projection: {
    name:'Projection',
    says:'The space drawn in axonometric and cut open, with the parts called out.',
    refs:['S01','S02','S21','S13','S15','S09'],
    needs:'space',
    /* Out entirely if the thing is an announcement. A venue has a name
       and the name is usually a room, so "Cafe Oto" was reading as a
       space and turning a gig poster into a floor plan of the bar.
       Struck out rather than scored down, because no amount of other
       evidence should make a poster into a projection. */
    blockedBy:'announce',
    wants:{ space:5, many:1, mixed:1, words:-2, relation:-2 },
    because:'A space with parts gets opened and drawn from above, never photographed from the door.'
  },

  map: {
    name:'Map',
    says:'The ground laid out as itself, the places marked on it, a legend in the corner.',
    refs:['P01','S12','S20'],
    needs:'place',
    wants:{ place:5, many:2, space:1, announce:-2, words:-1 },
    because:'The ground is drawn before anything is put on it, which is the one claim of his that holds in both bodies of evidence.'
  },

  diagram: {
    name:'Diagram',
    says:'The things as nodes, the relations as the lines between them, read at a glance.',
    refs:['P12','P14','P18','P20','S14','P05'],
    needs:'relation',
    wants:{ relation:5, many:2, space:-1, announce:-3 },
    because:'Lines are allowed when they carry something. Here they carry the whole argument.'
  },

  matrix: {
    name:'Matrix',
    says:'All of them at once on a ruled grid, numbered, with the caption doing the work.',
    refs:['P04','P16','P15','S10','P08','P13'],
    needs:'many',
    wants:{ many:5, mixed:1, space:-1, words:-1, announce:-2 },
    because:'Many small things beat one big thing, and the set is shown complete rather than sampled.'
  },

  board: {
    name:'Board',
    says:'Everything on one sheet, placed by argument, dense, with a data strip along the foot.',
    refs:['P03','S06','S19','P23'],
    needs:'mixed',
    wants:{ mixed:5, many:2, relation:1, words:1, announce:-2 },
    because:'Five references put unlike things on one sheet and let the density be the content.'
  },

  spread: {
    name:'Spread',
    says:'Small text in columns with the pictures cut into the column structure, not stacked between.',
    refs:['S08','S10','S18','P06'],
    needs:'words',
    wants:{ words:5, mixed:1, many:1, space:-1, announce:-2 },
    because:'The text runs small and the pictures sit inside the measure rather than interrupting it.'
  },

  plate: {
    name:'Plate',
    says:'One surface, one statement. A flat field, the subject knocked out of it, the words in one row.',
    refs:['P07','P11','P17','P22','S03'],
    needs:'announce',
    wants:{ announce:5, space:-1, words:-2, many:-2, mixed:-2 },
    because:'A single surface with one thing on it. S03 gives forty-six per cent of the page to one yellow.'
  }
};

var STRUCT_ORDER = ['projection','map','diagram','matrix','board','spread','plate'];

/* --------------------------------------------------------------
   3. Choosing, with the reasoning kept.
   -------------------------------------------------------------- */

function chooseStructure(text){
  var sh = readShape(text);
  var scored = STRUCT_ORDER.map(function(k){
    var S = STRUCTURES[k], score = 0, for_ = [], against = [];
    Object.keys(S.wants).forEach(function(q){
      if (!sh.found[q]) return;
      score += S.wants[q];
      var line = SHAPE.filter(function(x){ return x.id === q; })[0].q +
                 '  "' + (sh.words[q] || q) + '"';
      (S.wants[q] > 0 ? for_ : against).push(line);
    });
    var short = S.needs && !sh.found[S.needs];
    var struck = S.blockedBy && sh.found[S.blockedBy];
    var blocked = short || struck;
    return { key:k, name:S.name, score:blocked ? -99 : score,
             blocked:blocked, struck:struck,
             needs: struck ? ('struck out: this brief is an announcement') : S.needs,
             for_:for_, against:against };
  }).sort(function(a, b){ return b.score - a.score; });

  var top = scored[0];
  var live = scored.filter(function(x){ return !x.blocked; });
  var runner = live[1] || null;

  /* Nothing fitting is a real answer and the engine says it rather than
     quietly falling back to a stack of bands, which is what it used to
     do and what produced four pages that looked like each other. */
  var none = !live.length || top.score <= 0;

  return {
    shape: sh,
    pick: none ? null : top.key,
    scored: scored,
    runnerUp: runner,
    none: none,
    trace: traceOf(sh, scored, none)
  };
}

function traceOf(sh, scored, none){
  var out = [];
  out.push('WHAT I READ IN IT');
  SHAPE.forEach(function(q){
    out.push('  ' + (sh.found[q.id] ? 'yes' : 'no ') + '   ' + q.q +
      (sh.found[q.id] ? '   <- "' + (sh.words[q.id] || '') + '"' : ''));
  });
  out.push('');
  if (none){
    out.push('WHAT I CHOSE');
    out.push('  Nothing. None of the seven structures has what it needs in this brief.');
    out.push('  The old engine would have made a stack of bands here. That is the thing');
    out.push('  it did for every brief, and it is why four samples looked like each other.');
    out.push('  Say more about what the thing actually is and this gets an answer.');
    return out.join('\n');
  }
  var top = scored[0], S = STRUCTURES[top.key];
  out.push('WHAT I CHOSE   ' + S.name);
  out.push('  ' + S.says);
  out.push('  Why: ' + S.because);
  out.push('  Off: ' + S.refs.join(', '));
  if (top.for_.length){
    out.push('');
    out.push('  Carried by');
    top.for_.forEach(function(l){ out.push('    ' + l); });
  }
  if (top.against.length){
    out.push('  Pulled against by');
    top.against.forEach(function(l){ out.push('    ' + l); });
  }
  var live = scored.filter(function(x){ return !x.blocked; });
  if (live.length > 1){
    out.push('');
    out.push('WHAT I TURNED DOWN');
    live.slice(1, 4).forEach(function(x){
      out.push('  ' + (STRUCTURES[x.key].name + '        ').slice(0,12) +
               'scored ' + x.score + ', against ' + top.score);
    });
  }
  var dead = scored.filter(function(x){ return x.blocked; });
  if (dead.length){
    out.push('  Out entirely, nothing in the brief to hang them on:');
    dead.forEach(function(x){
      out.push('    ' + (STRUCTURES[x.key].name + '        ').slice(0,12) +
               'needs ' + x.needs);
    });
  }
  return out.join('\n');
}

/* --------------------------------------------------------------
   4. Drawing them.

   Three primitives the old renderer did not have, all of them taken
   straight off the references: a coordinate rule, a numbered label, and
   a leader line into a drawing. All three are lines that carry
   something, which is the only kind the file permits.
   -------------------------------------------------------------- */

function sRule(n, len, vertical, col, from){
  var t = [], step = len / n;
  for (var i = 0; i <= n; i++){
    var p = Math.round(i * step), big = i % 5 === 0;
    t.push(vertical
      ? '<line x1="0" y1="' + p + '" x2="' + (big ? 9 : 5) + '" y2="' + p + '" stroke="' + col + '" stroke-width="1"/>'
      : '<line x1="' + p + '" y1="0" x2="' + p + '" y2="' + (big ? 9 : 5) + '" stroke="' + col + '" stroke-width="1"/>');
    if (big) t.push(vertical
      ? '<text x="13" y="' + (p + 4) + '" font-family="Nunito" font-size="9" fill="' + col + '">' + ((from || 0) + i * 10) + '</text>'
      : '<text x="' + (p + 3) + '" y="18" font-family="Nunito" font-size="9" fill="' + col + '">' + ((from || 0) + i * 10) + '</text>');
  }
  return t.join('');
}

function sTag(num, text, col, ink){
  return '<span style="font-family:Nunito;font-size:10px;letter-spacing:.06em;color:' + col + '">' +
    String(num).padStart(2, '0') + '</span> ' +
    '<span style="font-family:Nunito;font-size:11px;color:' + ink + '">' + text + '</span>';
}

function sCallout(x, y, tx, ty, text, col){
  return '<line x1="' + x + '" y1="' + y + '" x2="' + tx + '" y2="' + ty +
    '" stroke="' + col + '" stroke-width="0.8"/>' +
    '<circle cx="' + x + '" cy="' + y + '" r="2" fill="' + col + '"/>' +
    '<text x="' + (tx + 4) + '" y="' + (ty + 3) + '" font-family="Nunito" font-size="10" fill="' + col + '">' +
    text + '</text>';
}

/* Content the structures draw. A brief fills these in; without one they
   fall back to something plausible so a sample can be looked at. */
/* The brief is an instruction and the title is not the instruction.
   "A landing page for a wine and beer shop in Peckham" was being set
   across the top of the page at 26px, which is the engine reciting the
   request back rather than making the thing. The artefact words are
   stripped off the front and what is left is the subject. */
var ARTEFACT = 'landing\\s+page|web\\s*page|web\\s*site|website|home\\s*page|poster|flyer|menu|portfolio|guide|spread|design|documentation|brochure|deck|leaflet|zine|identity|site|page|card|brand';

function sTitle(brief){
  var first = String(brief || '').trim().split(/[.\n]/)[0];
  var t = first
    .replace(/^\s*(a|an|the|my|our)\s+/i, '')
    .replace(new RegExp('^(' + ARTEFACT + ')\\b\\s*', 'i'), '')
    .replace(/^\s*(for|of|about|to)\s+/i, '')
    .replace(/^\s*(a|an|the|my|our|personal)\s+/i, '')
    /* and off the back, because "a personal photography website" puts
       the artefact word at the end rather than the front */
    .replace(new RegExp('\\s*\\b(' + ARTEFACT + ')\\s*$', 'i'), '')
    .replace(/[,;:\s]+$/, '')
    .trim();

  /* "A menu for a chef" leaves "chef", which is the client and not the
     subject. When stripping leaves a person or almost nothing, the
     brief's own first clause is the better title. */
  if (t.length < 8 || /^(chef|photographer|artist|designer|band|writer|client|friend|me|us|them)$/i.test(t)){
    t = first.replace(/^\s*(a|an|the)\s+/i, '').replace(/[,;:\s]+$/, '');
  }
  if (!t) t = 'Places for the particular';
  if (t.length > 46){
    /* A clause break is a better place to stop than a word break, so a
       comma inside the limit wins over the last space before it. */
    var comma = t.indexOf(',');
    var cut = (comma > 14 && comma <= 46) ? comma : t.lastIndexOf(' ', 46);
    t = t.slice(0, cut > 14 ? cut : 46).replace(/[,;:\s]+$/, '');
  }
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function sContent(brief, n){
  var t = String(brief || '').trim();
  var title = sTitle(brief);
  var items = [];
  var stock = ['Pét-nat, Loire','Skin contact, Friuli','Saison, Kent','Gamay, Beaujolais',
    'Gose, Leipzig','Trousseau, Jura','Riesling, Mosel','Cider, Hereford','Mezcal, Oaxaca',
    'Vermouth, Turin','Lambic, Payottenland','Sherry, Jerez','Grüner, Kamptal','Pilsner, Plzeň',
    'Rosé, Bandol','Sake, Niigata','Cava, Penedès','Port, Douro'];
  var notes = ['2023, 11.5%','no sulphur','draught only','one case left','on the shelf since March',
    'magnum','cloudy, on purpose','keeping until spring','drink cold','last of the vintage'];
  for (var i = 0; i < (n || 12); i++){
    items.push({ name: stock[i % stock.length], note: notes[i % notes.length],
                 meta: '£' + (6 + ((i * 7) % 44)) });
  }
  return { title:title, items:items };
}

/* --------------------------------------------------------------
   5. The seven renderers.

   Shared context first, so the measured palette and the spec reach
   measured palette and the spec reach every structure the same way.
   -------------------------------------------------------------- */

function sctx(spec, moveIds, seed, brief){
  var m = moveIds || [], s = effectiveSpec(spec || {}, m), r = rng(seed || 1);
  var gk = (s.ground && s.ground !== 'paper') ? s.ground : 'white';
  var bg = GROUND[gk], ink = INK[gk], muted = MUTED[gk];
  var nCol = parseInt(s['how many colours'] || '2', 10);
  var pool = accentsOn(bg, 3);
  var acc = nCol <= 1 ? ink : pool[Math.floor(r() * pool.length)];
  var acc2 = pool.length > 1 ? pool[(Math.floor(r() * pool.length) + 1) % pool.length] : acc;
  return {
    s:s, gk:gk, bg:bg, ink:ink, muted:muted, acc:acc, acc2:acc2, nCol:nCol, r:r,
    seed:seed || 1,
    has: function(id){ return m.indexOf(id) > -1; },
    gap: parseInt(s['section gap'] || '30', 10),
    scale: parseInt(s.scale || '34', 10),
    caseCss: CASE_CSS[s['case'] || 'sentence'],
    d: sContent(brief, 24),
    /* Every structure opens the same way, because all 44 references
       say what they are in small type before they perform. */
    head: function(kicker, right){
      return '<div style="display:flex;justify-content:space-between;align-items:baseline;' +
        'font-family:Nunito;font-size:11px;letter-spacing:.14em;text-transform:uppercase;' +
        'color:' + muted + '"><span style="color:' + ink + '">' + kicker + '</span>' +
        '<span>' + (right || '') + '</span></div>';
    },
    foot: function(bits){
      return '<div style="display:flex;gap:26px;font-family:Nunito;font-size:10px;' +
        'letter-spacing:.08em;text-transform:uppercase;color:' + muted + '">' +
        bits.map(function(b){ return '<span>' + b + '</span>'; }).join('') + '</div>';
    }
  };
}

/* --------------------------------------------------------------
   5. The seven renderers.

   The first version of these drew pictograms. A wireframe box with
   stick figures in it is a diagram of a projection, not a projection,
   and the reason is that it was made of <line> and <circle> while every
   reference is made of actual material. S21 has drawn interiors with
   furniture and thirty callouts. P21 has several hundred real
   screenshots strung along looping routes. P13 is fifty real artworks
   in a ring. S06 is fifty fragments on one sheet.

   Two things follow. The material is the forty-three pieces in the
   corpus, which are Noor's own drawings and photographs, so the hand on
   the page is literally his. And the element counts go up by an order
   of magnitude, because the density is not decoration in those
   references, it is the content.
   -------------------------------------------------------------- */

/* The corpus, as material to compose with rather than evidence to read.
   Drawings and photographs are kept apart because they behave
   differently on a page: a drawing can be cut out and a photograph
   wants its own edge. */
/* Thumbnails, not the originals. A board draws twenty-eight pieces and
   three seeds are shown at once, so the first version asked the browser
   for eighty-four full-size photographs, tens of megabytes, and the
   page sat there with coloured rectangles where the pictures should be.
   images/thumb holds the same 48 files at 320px, 16KB each. The plate
   is the one structure that still wants an original, because it prints
   one picture across the full width. */
function thumbOf(src){
  return src.replace(/^\.\.\/images\//, '../images/thumb/').replace(/\.(png|jpeg)$/i, '.jpg');
}
/* The three `built` records are screenshots of pages Noor made, and
   they are evidence, not material. Left in the pool, one of them came
   up as the subject of a gig poster, so the poster carried a filled
   button next to a ghost button: a pattern refused by name in the file,
   put on the page by the engine that refuses it. Drawings and
   photographs only from here. */
function isMaterial(c){ return c.kind === 'drawing' || c.kind === 'photo'; }
var MAT = (typeof CORPUS !== 'undefined')
  ? CORPUS.filter(isMaterial).map(function(c){ return thumbOf(c.src); }) : [];
var MAT_DRAW = (typeof CORPUS !== 'undefined')
  ? CORPUS.filter(function(c){ return c.kind === 'drawing'; }).map(function(c){ return thumbOf(c.src); }) : [];
var MAT_PHOTO = (typeof CORPUS !== 'undefined')
  ? CORPUS.filter(function(c){ return c.kind === 'photo'; }).map(function(c){ return c.src; }) : [];
var MAT_NOTE = {};
if (typeof CORPUS !== 'undefined') CORPUS.forEach(function(c){
  MAT_NOTE[c.src] = c.note || '';
  MAT_NOTE[thumbOf(c.src)] = c.note || '';
});

function mat(i, pool){
  var p = (pool && pool.length) ? pool : MAT;
  return p.length ? p[((i % p.length) + p.length) % p.length] : '';
}

/* An image on the page. `cut` knocks it to flat colour the way P07 and
   S03 do, `screen` puts a press texture over it, neither of which is a
   filter laid on top in the sense the file refuses: both are what a
   printer does to a photograph. */
function img(src, w, h, o){
  o = o || {};
  var s = 'display:block;width:' + w + 'px;height:' + h + 'px;object-fit:cover';
  /* Grayscale at contrast 2.4 was turning half the corpus into noise.
     A duotone is what S19 actually does to a photograph: the mid tones
     collapse onto one ink, they do not blow out. */
  if (o.flat) s += ';filter:grayscale(1) contrast(1.35) brightness(1.02)';
  var wrap = 'position:relative;width:' + w + 'px;height:' + h + 'px;overflow:hidden' +
             (o.extra || '');
  var over = '';
  if (o.tint) over += '<div style="position:absolute;inset:0;background:' + o.tint +
                      ';mix-blend-mode:' + (o.blend || 'multiply') + '"></div>';
  if (o.screen) over += '<div style="position:absolute;inset:0;' +
                        'background-image:radial-gradient(rgba(17,11,10,.42) 1px,transparent 1.2px);' +
                        'background-size:6px 6px"></div>';
  return '<div style="' + wrap + '"><img src="' + src + '" alt="" loading="lazy" style="' + s + '">' +
         over + '</div>';
}

var SBUILD = {

  /* All of them at once, numbered, on a ruled grid. P04 is thirty-odd
     specimens with registration crosses at the intersections. P13 is
     fifty. P16 is a hundred and twenty ink dots. Twenty-four flat
     rectangles was not a matrix, it was a product grid. */
  matrix: function(c){
    var o = [], cols = 9, rows = 5, n = cols * rows;
    o.push('<div style="display:flex;justify-content:space-between;align-items:flex-end;margin:0 0 14px">' +
      '<div><div style="font-family:Nunito;font-size:10px;letter-spacing:.16em;text-transform:uppercase;' +
        'color:' + c.muted + '">Matrix &#183; ' + n + ' of them, complete</div>' +
      '<h1 style="font-family:Archivo;font-weight:700;font-size:' + Math.min(c.scale, 26) +
        'px;margin:3px 0 0;color:' + c.ink + ';' + c.caseCss + '">' + c.d.title + '</h1></div>' +
      '<p style="font-family:Nunito;font-size:9.5px;line-height:1.6;color:' + c.muted +
        ';margin:0;max-width:21em;text-align:justify">Nothing is a highlight and nothing is ' +
        'hidden. The grid is the argument: this is the whole of it and you can see the shape ' +
        'of the whole. Numbers run left to right. Anything missing is missing on purpose.</p></div>');

    var cells = [];
    for (var i = 0; i < n; i++){
      var src = mat(i * 3 + c.seed, MAT);
      cells.push('<div style="position:relative">' +
        '<div style="position:absolute;left:-6px;top:-6px;width:11px;height:11px;' +
          'background:linear-gradient(' + c.ink + ',' + c.ink + ') center/11px 1px no-repeat,' +
          'linear-gradient(' + c.ink + ',' + c.ink + ') center/1px 11px no-repeat;opacity:.45;z-index:2"></div>' +
        img(src, 72, 72, { screen: c.has('c8') && i % 3 === 0,
                           tint: (i % 11 === 0 && c.nCol > 1) ? c.acc : null, blend:'multiply' }) +
        '<div style="font-family:Nunito;font-size:8.5px;letter-spacing:.04em;color:' + c.muted +
          ';margin:3px 0 0">' + String(i + 1).padStart(2, '0') + '</div></div>');
    }
    o.push('<div style="display:grid;grid-template-columns:repeat(' + cols + ',72px);' +
      'gap:13px 11px;justify-content:space-between">' + cells.join('') + '</div>');

    /* the key, which is what makes a specimen grid readable and what
       P01 and P16 both put along the foot */
    var keys = [];
    for (var k = 0; k < 7; k++){
      keys.push('<span style="display:inline-flex;align-items:center;gap:4px">' +
        '<i style="width:9px;height:9px;display:block;background:' +
          (typeof M_ACCENT !== 'undefined' ? M_ACCENT[k % M_ACCENT.length] : c.acc) + '"></i>' +
        '<span>' + ['drawing','photograph','print','collage','screen','paper','ink'][k] + '</span></span>');
    }
    o.push('<div style="display:flex;gap:16px;flex-wrap:wrap;font-family:Nunito;font-size:9px;' +
      'letter-spacing:.06em;text-transform:uppercase;color:' + c.muted + ';margin:16px 0 0">' +
      keys.join('') + '</div>');
    o.push('<div style="margin:8px 0 0">' +
      c.foot([n + ' shown', 'complete at time of printing', 'numbered left to right', 'sheet 1 of 1']) + '</div>');
    return o;
  },

  /* Everything on one sheet, placed by argument. S06 drops fifty
     fragments wherever they fit under yellow highlighter shapes and
     runs a data strip along the foot. Eleven plates in neat rows was a
     moodboard. */
  board: function(c){
    var o = [], r = c.r, bits = [];
    o.push(c.head('Board', 'one sheet, everything on it'));

    /* the colour arrives as a wedge, which is what P03 does, laid down
       before the material so the material sits on top of it */
    bits.push('<svg width="788" height="560" viewBox="0 0 788 560" style="position:absolute;left:0;top:0">' +
      '<polygon points="402,0 788,74 788,0" fill="' + c.acc + '" opacity="0.9"/>' +
      '<polygon points="0,520 288,560 0,560" fill="' + c.acc2 + '" opacity="0.55"/>' +
      '<polygon points="196,214 420,188 404,268 180,286" fill="' + c.acc + '" opacity="0.4"/></svg>');

    /* Twenty-eight pieces on a jittered grid rather than at random.
       Pure random left two seeds with an empty bottom third and pushed
       a third one off the sheet. S06 drifts, but it covers: the
       irregularity is in how far each piece wanders off its slot, not
       in whether the sheet gets filled. */
    var GX = 7, GY = 4, CW = 788 / GX, CH = 548 / GY;
    for (var i = 0; i < GX * GY; i++){
      var gx = i % GX, gy = Math.floor(i / GX);
      var w = 56 + Math.floor(r() * 86), h = Math.round(w * (0.62 + r() * 0.72));
      var x = Math.round(gx * CW + (r() * 2 - 1) * 30);
      var y = Math.round(gy * CH + (r() * 2 - 1) * 26);
      x = Math.max(-18, Math.min(788 - w + 18, x));
      y = Math.max(-14, Math.min(548 - h + 14, y));
      var rot = (r() * 6 - 3).toFixed(1);
      bits.push('<div style="position:absolute;left:' + x + 'px;top:' + y + 'px;' +
        'transform:rotate(' + rot + 'deg);z-index:' + (2 + (i % 5)) + '">' +
        img(mat(i * 5 + c.seed, MAT), w, h,
            { screen: i % 4 === 0, flat: i % 7 === 0,
              tint: (i % 9 === 0 && c.nCol > 1) ? c.acc2 : null }) +
        (i % 3 === 0 ? '<div style="font-family:Nunito;font-size:8px;color:' + c.ink +
          ';background:' + c.bg + ';padding:1px 3px;display:inline-block">' +
          String(i + 1).padStart(2, '0') + '</div>' : '') + '</div>');
    }

    /* the connectors, which is S19: hairlines between the items that
       belong together, drawn over the top of everything */
    var cn = '';
    for (var j = 0; j < 9; j++){
      cn += '<line x1="' + Math.floor(r() * 788) + '" y1="' + Math.floor(r() * 540) +
            '" x2="' + Math.floor(r() * 788) + '" y2="' + Math.floor(r() * 540) +
            '" stroke="' + c.ink + '" stroke-width="0.6" opacity="0.55"/>';
    }
    bits.push('<svg width="788" height="560" viewBox="0 0 788 560" style="position:absolute;left:0;top:0;' +
      'pointer-events:none;z-index:8">' + cn + '</svg>');

    bits.push('<p style="position:absolute;left:0;top:0;width:186px;z-index:9;font-family:Nunito;' +
      'font-size:9px;line-height:1.5;text-align:justify;color:' + c.ink + ';background:' + c.bg +
      ';padding:6px 7px;margin:0">' + c.d.title + '. Everything here is on one sheet because the ' +
      'argument is the arrangement. Nothing has been promoted to a hero and nothing relegated to ' +
      'a footer. What you do with it is look across it, find the two things sitting next to each ' +
      'other for a reason, and work out what the reason was.</p>');
    bits.push('<p style="position:absolute;right:0;bottom:0;width:168px;z-index:9;font-family:Nunito;' +
      'font-size:9px;line-height:1.5;text-align:justify;color:' + c.ink + ';background:' + c.bg +
      ';padding:6px 7px;margin:0">The density is not decoration. A sheet two thirds full is the ' +
      'failure state: it has neither the argument of a full one nor the nerve of an empty one.</p>');

    o.push('<div style="position:relative;height:566px;margin:10px 0 0;overflow:hidden">' +
      bits.join('') + '</div>');
    o.push(c.foot(['28 plates', 'placed 6 November 2026', 'sheet 03 of 04', 'nothing here is to scale']));
    return o;
  },

  /* The ground as itself with the material pinned along the route. P21
     strings several hundred screenshots along looping paths over a
     halftone ground. S16 runs a drifting chain of fragments. Nine dots
     on a zigzag was a transit map. */
  map: function(c){
    var W = 788, H = 520, r = c.r, col = c.muted;
    /* one long route, drawn first because the ground is built before
       anything is put on it */
    var pts = [];
    for (var i = 0; i <= 26; i++){
      var t = i / 26;
      pts.push([40 + t * (W - 90),
                150 + Math.sin(t * 5.4) * 118 + Math.sin(t * 13) * 26]);
    }
    var path = 'M' + pts.map(function(p, i){
      return (i ? 'L' : '') + p[0].toFixed(0) + ' ' + p[1].toFixed(0); }).join(' ');

    var g = '<g transform="translate(14,10)">' + sRule(10, 740, false, col, 0) + '</g>';
    g += '<g transform="translate(14,10)">' + sRule(6, 440, true, col, 0) + '</g>';
    g += '<path d="' + path + '" fill="none" stroke="' + c.acc + '" stroke-width="1.8" stroke-linejoin="round"/>';
    g += '<path d="M30 ' + (H - 96) + ' C 250 ' + (H - 190) + ', 470 ' + (H - 34) + ', ' + (W - 40) +
         ' ' + (H - 150) + '" fill="none" stroke="' + col + '" stroke-width="0.9" stroke-dasharray="5 4"/>';

    var names = ['Rai','Kundli','Murthal','Sonipat','Narela','Alipur','Bawana','Siraspur',
                 'Khera Kalan','Bakhtawarpur','Jahangirpuri','Majnu ka Tila','Kashmere Gate'];
    var pins = [];
    /* the material pinned along it, small and many, which is the whole
       texture of P21 */
    for (var k = 0; k < 24; k++){
      var p = pts[Math.min(pts.length - 1, Math.round((k / 23) * 26))];
      var sz = 26 + Math.floor(r() * 24);
      var up = k % 2 === 0;
      pins.push('<div style="position:absolute;left:' + Math.round(p[0] - sz / 2) + 'px;top:' +
        Math.round(p[1] + (up ? -sz - 16 : 16)) + 'px;transform:rotate(' + (r() * 8 - 4).toFixed(1) +
        'deg)">' + img(mat(k * 7 + c.seed, MAT), sz, sz, { screen: k % 3 === 0 }) + '</div>');
    }
    names.forEach(function(nm, k){
      var p = pts[Math.min(pts.length - 1, Math.round((k / (names.length - 1)) * 26))];
      pins.push('<div style="position:absolute;left:' + Math.round(p[0] + 7) + 'px;top:' +
        Math.round(p[1] - 5) + 'px;font-family:Nunito;font-size:9.5px;color:' + c.ink +
        ';white-space:nowrap"><b style="font-weight:700">' + nm + '</b> ' +
        '<span style="color:' + col + '">' + String(k + 1).padStart(2, '0') + ' &#183; ' +
        (9 + k * 6) + '&#8242;</span></div>');
    });

    var o = [];
    o.push(c.head('Map', 'an hour and a bit from the gate'));
    o.push('<h1 style="font-family:Archivo;font-weight:700;font-size:' + Math.min(c.scale, 24) +
      'px;margin:6px 0 8px;color:' + c.ink + ';' + c.caseCss + '">' + c.d.title + '</h1>');
    o.push('<div style="position:relative;height:' + H + 'px">' +
      '<svg width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H +
        '" style="position:absolute;left:0;top:0">' + g + '</svg>' +
      pins.join('') +
      '<div style="position:absolute;right:0;bottom:4px;width:172px;background:' + c.bg +
        ';padding:8px 10px;border:1px solid ' + c.muted + ';z-index:5">' +
        '<p style="font-family:Nunito;font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;' +
          'margin:0 0 5px;color:' + c.ink + '">Legend</p>' +
        '<p style="font-family:Nunito;font-size:9.5px;line-height:1.75;margin:0;color:' + c.muted + '">' +
          '<b style="color:' + c.acc + '">&#8212;</b> the way you would walk it<br>' +
          '<b>- -</b> the bus, if it comes<br>' +
          'each picture is pinned where it was taken<br>' +
          'minutes are to the next stop</p></div></div>');
    o.push('<div style="margin:6px 0 0">' +
      c.foot(['13 stops', '24 pictures', 'walked 2 November', 'not to scale north of Murthal']) + '</div>');
    return o;
  },

  /* The things as nodes and the relations as the lines. S14 ties real
     thumbnails together with hairline connectors across the whole
     window. P20 is nothing but nodes and the curves between them. */
  diagram: function(c){
    var W = 788, H = 540, r = c.r;
    var nodes = [], n = 26;
    for (var i = 0; i < n; i++){
      var ang = (i / n) * Math.PI * 2 + r() * 0.3;
      var rad = 90 + r() * 170;
      nodes.push([394 + Math.cos(ang) * rad * 1.5, 268 + Math.sin(ang) * rad * 0.86]);
    }
    var g = '';
    /* many connectors, not a tidy tree, because what is being read is
       the mesh rather than any one link */
    for (var a = 0; a < n; a++){
      for (var b = a + 1; b < n; b++){
        if (r() > 0.11) continue;
        g += '<line x1="' + nodes[a][0].toFixed(0) + '" y1="' + nodes[a][1].toFixed(0) +
             '" x2="' + nodes[b][0].toFixed(0) + '" y2="' + nodes[b][1].toFixed(0) +
             '" stroke="' + c.ink + '" stroke-width="0.5" opacity="0.5"/>';
      }
    }
    var pins = [];
    nodes.forEach(function(p, i){
      var sz = 30 + Math.floor(r() * 30);
      pins.push('<div style="position:absolute;left:' + Math.round(p[0] - sz / 2) + 'px;top:' +
        Math.round(p[1] - sz / 2) + 'px;z-index:3">' +
        img(mat(i * 11 + c.seed, MAT), sz, sz, { tint: i % 8 === 0 && c.nCol > 1 ? c.acc : null }) +
        '<div style="font-family:Nunito;font-size:8px;color:' + c.ink + ';background:' + c.bg +
          ';display:inline-block;padding:0 2px">' + (1979 + i) + '</div></div>');
    });

    var o = [];
    o.push(c.head('Diagram', 'the lines are the content'));
    o.push('<div style="position:relative;height:' + H + 'px;margin:6px 0 0">' +
      '<svg width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H +
        '" style="position:absolute;left:0;top:0">' + g + '</svg>' + pins.join('') +
      '<div style="position:absolute;left:276px;top:214px;width:236px;background:' + c.bg +
        ';padding:9px 11px;z-index:9">' +
        '<h1 style="font-family:Archivo;font-weight:400;font-size:17px;margin:0 0 6px;color:' +
          c.ink + ';line-height:1.25">' + c.d.title + '</h1>' +
        '<p style="font-family:Nunito;font-size:9.5px;line-height:1.6;color:' + c.muted +
          ';margin:0;text-align:justify">Twenty-six years, one picture each, and every line is ' +
          'somebody who worked on both. The individual link is not the point. What you are ' +
          'reading is how thick the mesh gets in the middle.</p></div></div>');
    o.push(c.foot(['26 nodes', '1979 to 2004', 'lines are shared hands', 'drawn 6 November 2026']));
    return o;
  },

  /* The space opened and drawn from above, with the rooms filled. S01
     paints a different scene into every room of a cross-section. S21
     draws the furniture and labels all of it. */
  projection: function(c){
    var W = 760, H = 520, col = c.ink, a = c.acc, r = c.r;
    var k = 0.5;
    function X(px, py){ return 210 + px - py * k; }
    function Y(px, py, pz){ return 300 + py * k * 0.62 - pz; }
    function shell(w, d, h, oy){
      var p = [[0,0],[w,0],[w,d],[0,d]], s = '';
      s += '<polygon points="' + p.map(function(q){
        return X(q[0], q[1]) + ',' + (Y(q[0], q[1], 0) - oy); }).join(' ') +
        '" fill="none" stroke="' + col + '" stroke-width="1"/>';
      p.forEach(function(q){
        s += '<line x1="' + X(q[0],q[1]) + '" y1="' + (Y(q[0],q[1],0) - oy) +
             '" x2="' + X(q[0],q[1]) + '" y2="' + (Y(q[0],q[1],h) - oy) +
             '" stroke="' + col + '" stroke-width="0.7"/>';
      });
      s += '<polyline points="' + [[0,0],[w,0],[w,d]].map(function(q){
        return X(q[0],q[1]) + ',' + (Y(q[0],q[1],h) - oy); }).join(' ') +
        '" fill="none" stroke="' + col + '" stroke-width="0.7"/>';
      return s;
    }
    var g = shell(300, 200, 150, 0) + shell(300, 200, 120, 168);
    var WALLY = 190;
    for (var i = 0; i < 8; i++){
      var z = 10 + i * 17;
      g += '<line x1="' + X(10, WALLY) + '" y1="' + Y(10, WALLY, z) +
           '" x2="' + X(290, WALLY) + '" y2="' + Y(290, WALLY, z) +
           '" stroke="' + a + '" stroke-width="1.3"/>';
      for (var b = 0; b < 16; b++){
        var bx = 18 + b * 17;
        g += '<line x1="' + X(bx, WALLY) + '" y1="' + Y(bx, WALLY, z) +
             '" x2="' + X(bx, WALLY) + '" y2="' + Y(bx, WALLY, z + 12) +
             '" stroke="' + (b % 4 === 0 ? c.acc2 : col) + '" stroke-width="0.9"/>';
      }
    }
    g += '<polygon points="' + [[18,148],[150,148],[150,184],[18,184]].map(function(q){
      return X(q[0], q[1]) + ',' + Y(q[0], q[1], 32); }).join(' ') +
      '" fill="none" stroke="' + col + '" stroke-width="1"/>';
    [[178,116],[228,116],[178,166],[228,166]].forEach(function(q){
      g += '<circle cx="' + X(q[0], q[1]) + '" cy="' + Y(q[0], q[1], 18) + '" r="6" fill="none" stroke="' +
           col + '" stroke-width="0.9"/>';
    });
    g += '<ellipse cx="' + X(203, 141) + '" cy="' + Y(203, 141, 20) + '" rx="30" ry="14" fill="none" stroke="' +
         col + '" stroke-width="0.9"/>';
    g += sCallout(X(84, 166), Y(84, 166, 32), 120, 470, 'counter', col);
    g += sCallout(X(150, WALLY), Y(150, WALLY, 80), 470, 150, 'the shelf, floor to ceiling, 128 facing out', a);
    g += sCallout(X(205, 58), Y(205, 58, 92), 480, 420, 'cold room', col);
    g += sCallout(X(205, 141), Y(205, 141, 20), 400, 486, 'tasting table, four seats', col);
    g += '<text x="8" y="' + (H - 4) + '" font-family="Nunito" font-size="9" fill="' + c.muted +
         '">AXONOMETRIC  1:50  SECTION LOOKING NORTH</text>';
    g += '<g transform="translate(560,' + (H - 26) + ')">' +
         '<line x1="0" y1="0" x2="120" y2="0" stroke="' + col + '" stroke-width="1"/>' +
         '<line x1="0" y1="-4" x2="0" y2="4" stroke="' + col + '" stroke-width="1"/>' +
         '<line x1="60" y1="-3" x2="60" y2="3" stroke="' + col + '" stroke-width="1"/>' +
         '<line x1="120" y1="-4" x2="120" y2="4" stroke="' + col + '" stroke-width="1"/>' +
         '<text x="0" y="13" font-family="Nunito" font-size="9" fill="' + c.muted + '">0</text>' +
         '<text x="110" y="13" font-family="Nunito" font-size="9" fill="' + c.muted + '">5m</text></g>';

    /* what is on the walls, which is S01's whole move: a real picture in
       every room rather than an empty volume */
    var walls = [];
    [[196,96,54],[262,112,44],[318,72,58],[136,208,50],[214,230,62],[300,196,46],
     [158,300,44],[246,322,54]].forEach(function(q, i){
      walls.push('<div style="position:absolute;left:' + q[0] + 'px;top:' + q[1] +
        'px;transform:skewY(17.2deg);z-index:3">' +
        img(mat(i * 9 + c.seed, MAT_DRAW.length ? MAT_DRAW : MAT), q[2], Math.round(q[2] * 1.2),
            { screen: i % 3 === 0 }) + '</div>');
    });

    var o = [];
    o.push(c.head('Projection', 'drawn, not photographed'));
    o.push('<div style="display:flex;gap:22px;align-items:flex-start;margin:10px 0 0">' +
      '<div style="width:186px;flex:none">' +
        '<h1 style="font-family:Archivo;font-weight:700;font-size:23px;margin:0 0 7px;color:' +
          c.ink + ';line-height:1.12;' + c.caseCss + '">' + c.d.title + '</h1>' +
        '<p style="font-family:Nunito;font-size:10px;line-height:1.6;color:' + c.muted +
          ';margin:0 0 10px;text-align:justify">The room is the argument. You come in at the ' +
          'counter, the shelf runs the full height of the long wall, the table at the back is ' +
          'where the thing actually happens, and there is a picture in every room. A photograph ' +
          'taken from the door would show you none of it.</p>' +
        ['counter','the shelf','cold room','tasting table','upstairs'].map(function(t, i){
          return '<div>' + sTag(i + 1, t, c.acc, c.ink) + '</div>'; }).join('') +
        '<svg width="186" height="128" viewBox="0 0 186 128" style="margin:12px 0 0;display:block">' +
          '<rect x="2" y="12" width="80" height="54" fill="none" stroke="' + c.muted + '" stroke-width="0.8"/>' +
          '<rect x="10" y="22" width="28" height="34" fill="none" stroke="' + c.muted + '" stroke-width="0.6"/>' +
          '<rect x="98" y="2" width="66" height="40" fill="none" stroke="' + c.muted + '" stroke-width="0.8"/>' +
          '<rect x="30" y="80" width="106" height="44" fill="none" stroke="' + c.muted + '" stroke-width="0.8"/>' +
          '<line x1="30" y1="92" x2="136" y2="92" stroke="' + a + '" stroke-width="1.2"/>' +
          '<text x="2" y="8" font-family="Nunito" font-size="7.5" fill="' + c.muted + '">PLAN, GROUND</text>' +
          '<text x="98" y="52" font-family="Nunito" font-size="7.5" fill="' + c.muted + '">PLAN, FIRST</text>' +
          '<text x="30" y="134" font-family="Nunito" font-size="7.5" fill="' + c.muted + '">SHELF ELEVATION</text></svg>' +
      '</div>' +
      '<div style="position:relative;width:' + W + 'px;flex:none;margin-right:-176px">' +
        '<svg width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '">' + g + '</svg>' +
        walls.join('') + '</div></div>');
    o.push('<div style="margin:4px 0 0">' +
      c.foot(['128 bottles facing', '8 pictures on the walls', 'scale 1:50 at A2', 'north is up the page']) + '</div>');
    return o;
  },

  /* Small text in columns with the pictures cut into them. S08 runs
     columns of small type with line drawings of cutlery between them.
     S18 leaves most of the sheet empty and puts three small
     photographs in it. */
  spread: function(c){
    var o = [], r = c.r;
    var para = 'The street is the only part of a city you can read at the speed you walk. A car ' +
      'gives you the route and takes the street, and the street is where it all is. ';
    o.push(c.head('Spread', 'the pictures sit inside the measure'));
    o.push('<div style="display:flex;justify-content:space-between;align-items:baseline;margin:8px 0 12px">' +
      '<h1 style="font-family:Archivo;font-weight:400;font-size:' + Math.min(c.scale, 25) +
        'px;margin:0;color:' + c.ink + ';' + c.caseCss + '">' + c.d.title + '</h1>' +
      '<span style="font-family:Nunito;font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;' +
        'color:' + c.muted + '">no. 14 &#183; page 118</span></div>');

    function col4(ci, floor, label, imgAt){
      var blocks = ['<div style="display:flex;gap:6px;align-items:baseline;margin:0 0 8px">' +
        '<span style="font-family:Archivo;font-weight:700;font-size:14px;color:' + c.ink + '">' + floor + '</span>' +
        '<span style="font-family:Nunito;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:' +
          c.muted + '">' + label + '</span></div>'];
      for (var i = 0; i < 6; i++){
        if (imgAt.indexOf(i) > -1){
          var src = mat(ci * 13 + i * 3 + c.seed, MAT);
          blocks.push('<div style="margin:0 0 7px">' + img(src, 166, 108, { screen: i % 2 === 0 }) +
            '<p style="font-family:Nunito;font-size:8px;color:' + c.muted + ';margin:2px 0 0">fig. ' +
            (ci * 2 + imgAt.indexOf(i) + 1) + ' &#183; ' +
            (MAT_NOTE[src] || '').slice(0, 44) + '</p></div>');
        }
        blocks.push('<p style="font-family:Nunito;font-size:9.5px;line-height:1.7;color:' + c.muted +
          ';margin:0 0 6px;text-align:justify">' + para + para.slice(0, 90) + '</p>');
      }
      return '<div style="width:166px;flex:none">' + blocks.join('') + '</div>';
    }
    o.push('<div style="display:flex;gap:22px;align-items:flex-start">' +
      col4(0, '1F', 'ground', [1, 4]) + col4(1, '2F', 'first', [0, 3]) +
      col4(2, '3F', 'second', [2, 5]) + col4(3, '4F', 'roof', [0]) +
      '<div style="width:52px;flex:none">' +
        '<p style="font-family:Nunito;font-size:8.5px;line-height:1.7;color:' + c.muted +
        ';margin:0;writing-mode:vertical-rl;text-orientation:mixed;height:430px">' +
        'Notes taken standing up, 2 November 2026, between the market and the bridge, ' +
        'in the forty minutes before it got dark</p></div></div>');
    o.push('<div style="margin:' + Math.round(c.gap * 0.6) + 'px 0 0">' +
      c.foot(['4 columns', '7 figures', '11 minutes', 'page 118']) + '</div>');
    return o;
  },

  /* One surface, one statement. S03 gives nearly half the page to one
     yellow and knocks the figures out of a photograph in it. P07 puts
     the cattle in flat red over the field. */
  plate: function(c){
    var field = c.nCol <= 1 ? c.ink : c.acc;
    var o = [], src = mat(c.seed * 3, MAT_PHOTO.length ? MAT_PHOTO : MAT);
    o.push('<div style="margin:-38px -56px 0;background:' + field + ';padding:26px 56px 0;position:relative">' +
      '<div style="display:flex;justify-content:space-between;font-family:Nunito;font-size:9.5px;' +
        'letter-spacing:.3em;text-transform:uppercase;color:' + c.bg + '">' +
        '<span>one night</span><span>doors at nine</span><span>no support</span></div>' +
      /* the subject, printed large in the one colour, over the field */
      '<div style="margin:18px 0 0;mix-blend-mode:screen;filter:grayscale(1) contrast(3.2)">' +
        img(src, 788, 300, {}) + '</div>' +
      '<div style="display:flex;justify-content:space-between;font-family:Archivo;font-weight:700;' +
        'font-size:15px;text-transform:uppercase;color:' + c.bg + ';padding:16px 0 20px">' +
        c.d.title.toUpperCase().slice(0, 28).split('').map(function(ch){
          return '<span>' + (ch === ' ' ? '&nbsp;' : ch) + '</span>'; }).join('') +
      '</div></div>');
    /* and the same picture again below, the right way up, because the
       same image twice in one frame is the one thing he marked true */
    o.push('<div style="margin:0 -56px;position:relative">' +
      img(src, 900, 250, { screen:true }) +
      '<div style="position:absolute;left:56px;bottom:14px;font-family:Nunito;font-size:9.5px;' +
        'letter-spacing:.22em;text-transform:uppercase;color:' + c.bg + ';background:' + field +
        ';padding:3px 8px">' + (MAT_NOTE[src] || 'the room, an hour before').slice(0, 54) + '</div></div>');
    o.push('<div style="margin:12px 0 0">' +
      c.foot(['thursday 6 november', 'cafe oto, dalston', '£12 on the door', 'one night only']) + '</div>');
    return o;
  }
};

/* Draws a structure at page size, in the frame the scaler expects, so
   the two can sit side by side and be compared honestly. */
function renderStructure(key, spec, moveIds, seed, brief, label){
  var K = SBUILD[key] ? key : 'matrix';
  var c = sctx(spec, moveIds, seed, brief);
  var out = K === 'plate' ? SBUILD[K](c) : SBUILD[K](c);

  var groundCss = 'background:' + c.bg;
  if (c.has('c8')) groundCss += ';' + halftoneCss(c.gk === 'dark' ? 'rgba(255,255,255,.13)' : 'rgba(0,0,0,.10)');

  var page = '<div style="' + groundCss + ';padding:38px 56px 34px;width:' + PAGE_W +
             'px;min-height:' + PAGE_H + 'px;box-sizing:border-box;overflow:hidden">' +
             out.join('') + '</div>';
  return '<div class="siteframe"' + (label ? ' data-label="' + label + '"' : '') + '>' +
           '<div class="scaler">' + page + '</div></div>';
}
