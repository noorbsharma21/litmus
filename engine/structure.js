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

   Shared context first, mirroring the one renderSite builds, so the
   measured palette and the spec reach every structure the same way.
   -------------------------------------------------------------- */

function sctx(spec, moveIds, seed, brief){
  var m = moveIds || [], s = effectiveSpec(spec || {}, m), r = rng(seed || 1);
  var gk = s.ground || 'paper';
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

var SBUILD = {

  /* All of them at once, on a ruled grid, numbered. P04 and P16 put the
     registration marks at the intersections and let the caption carry
     the information, which is why the cells can be small. */
  matrix: function(c){
    var o = [], it = c.d.items, cols = 6, rows = 4;
    o.push(c.head('Matrix', it.length + ' of them, all shown'));
    o.push('<h1 style="font-family:Archivo;font-weight:700;font-size:' + Math.min(c.scale, 30) +
      'px;margin:10px 0 2px;color:' + c.ink + ';' + c.caseCss + '">' + c.d.title + '</h1>');
    o.push('<p style="font-family:Nunito;font-size:12px;color:' + c.muted +
      ';margin:0 0 16px;max-width:30em">Nothing is a highlight and nothing is hidden. ' +
      'The grid is the argument: this is the whole of it, and you can see the shape of the whole.</p>');

    var cells = [];
    for (var i = 0; i < cols * rows; i++){
      var w = it[i % it.length];
      cells.push('<div style="position:relative">' +
        '<div style="position:absolute;left:-7px;top:-7px;width:13px;height:13px;' +
          'background:linear-gradient(' + c.ink + ',' + c.ink + ') center/13px 1px no-repeat,' +
          'linear-gradient(' + c.ink + ',' + c.ink + ') center/1px 13px no-repeat;opacity:.4"></div>' +
        plate(c.seed + i * 29, 74) +
        '<div style="margin:5px 0 0">' + sTag(i + 1, w.name, c.acc, c.ink) + '</div>' +
        '<p style="font-family:Nunito;font-size:10px;color:' + c.muted + ';margin:1px 0 0">' +
          w.note + ' &#183; ' + w.meta + '</p></div>');
    }
    o.push('<div style="display:grid;grid-template-columns:repeat(' + cols + ',1fr);' +
      'gap:16px 13px">' + cells.join('') + '</div>');
    o.push('<div style="margin:' + Math.round(c.gap * 1.4) + 'px 0 0">' +
      c.foot(['24 shown', 'complete at time of printing', 'prices include duty', 'no 03 is on the shelf']) + '</div>');
    return o;
  },

  /* The space opened and drawn from above. S02 scatters the plan
     fragments behind it on white and S21 calls out every part of the
     interior in one colour of line. */
  projection: function(c){
    var W = 788, H = 596, col = c.ink, a = c.acc;
    function box(x, y, w, d, h){
      var k = 0.5, X = function(px, py){ return x + px - py * k; },
                   Y = function(px, py, pz){ return y + py * k * 0.62 - pz; };
      var p = [[0,0],[w,0],[w,d],[0,d]];
      var fl = p.map(function(q){ return X(q[0], q[1]) + ',' + Y(q[0], q[1], 0); }).join(' ');
      var s = '<polygon points="' + fl + '" fill="none" stroke="' + col + '" stroke-width="1"/>';
      p.forEach(function(q){
        s += '<line x1="' + X(q[0],q[1]) + '" y1="' + Y(q[0],q[1],0) +
             '" x2="' + X(q[0],q[1]) + '" y2="' + Y(q[0],q[1],h) +
             '" stroke="' + col + '" stroke-width="0.7"/>';
      });
      s += '<polyline points="' + [[0,0],[w,0],[w,d]].map(function(q){
            return X(q[0],q[1]) + ',' + Y(q[0],q[1],h); }).join(' ') +
           '" fill="none" stroke="' + col + '" stroke-width="0.7"/>';
      return s;
    }
    var g = '';
    g += box(220, 400, 300, 200, 150);
    g += box(220, 232, 300, 200, 120);

    /* The interior, which is the whole reason for drawing it this way.
       S21 fills every cut-open room with the furniture and labels all of
       it. A wireframe box with nothing in it is a diagram of a box. */
    var k = 0.5, X = function(px, py, ox, oy){ return (ox||220) + px - py * k; },
                 Y = function(px, py, pz, ox, oy){ return (oy||400) + py * k * 0.62 - pz; };
    /* Floor to ceiling against the back wall, so depth stays fixed and
       the height is what changes. Running it down the depth axis laid
       the whole shelf flat on the floor. */
    var WALLY = 190;
    for (var i = 0; i < 7; i++){
      var z = 12 + i * 19;
      g += '<line x1="' + X(14, WALLY) + '" y1="' + Y(14, WALLY, z) +
           '" x2="' + X(286, WALLY) + '" y2="' + Y(286, WALLY, z) +
           '" stroke="' + a + '" stroke-width="1.4"/>';
      for (var b = 0; b < 14; b++){
        var bx = 22 + b * 19;
        g += '<line x1="' + X(bx, WALLY) + '" y1="' + Y(bx, WALLY, z) +
             '" x2="' + X(bx, WALLY) + '" y2="' + Y(bx, WALLY, z + 13) +
             '" stroke="' + (b % 4 === 0 ? c.acc2 : col) + '" stroke-width="1"/>';
      }
    }
    g += '<polygon points="' + [[20,150],[150,150],[150,186],[20,186]].map(function(q){
      return X(q[0], q[1]) + ',' + Y(q[0], q[1], 34); }).join(' ') +
      '" fill="none" stroke="' + col + '" stroke-width="1"/>';     /* counter */
    [[180,120],[230,120],[180,170],[230,170]].forEach(function(q){  /* table, four seats */
      g += '<circle cx="' + X(q[0], q[1]) + '" cy="' + Y(q[0], q[1], 20) + '" r="6" fill="none" stroke="' + col + '" stroke-width="0.9"/>';
    });
    g += '<rect x="' + (X(200, 60) - 30) + '" y="' + (Y(200, 60, 96)) +
         '" width="60" height="78" fill="none" stroke="' + col + '" stroke-width="0.9" stroke-dasharray="3 3"/>';

    /* Leaders land inside the sheet. They were aimed at 600 and 620 on a
       788 box that is pulled 150 to the right, so four of the five
       labels were sitting off the paper. */
    g += sCallout(X(84, 168), Y(84, 168, 34), 150, 560, 'counter', col);
    g += sCallout(X(160, WALLY), Y(160, WALLY, 88), 430, 300, 'the shelf, floor to ceiling, 98 facing out', a);
    g += sCallout(X(205, 60), Y(205, 60, 96), 450, 480, 'cold room', col);
    g += sCallout(X(205, 145), Y(205, 145, 20), 400, 540, 'tasting table, four seats', col);
    g += sCallout(X(150, 100, 220, 232), Y(150, 100, 60, 220, 232), 420, 120, 'upstairs, by appointment', col);
    g += '<text x="12" y="' + (H - 6) + '" font-family="Nunito" font-size="9" fill="' + c.muted +
         '">AXONOMETRIC  1:50  SECTION LOOKING NORTH</text>';
    g += '<g transform="translate(560,' + (H - 34) + ')">' +
         '<line x1="0" y1="0" x2="120" y2="0" stroke="' + col + '" stroke-width="1"/>' +
         '<line x1="0" y1="-4" x2="0" y2="4" stroke="' + col + '" stroke-width="1"/>' +
         '<line x1="60" y1="-3" x2="60" y2="3" stroke="' + col + '" stroke-width="1"/>' +
         '<line x1="120" y1="-4" x2="120" y2="4" stroke="' + col + '" stroke-width="1"/>' +
         '<text x="0" y="14" font-family="Nunito" font-size="9" fill="' + c.muted + '">0</text>' +
         '<text x="112" y="14" font-family="Nunito" font-size="9" fill="' + c.muted + '">5m</text></g>';

    var o = [];
    o.push(c.head('Projection', 'drawn, not photographed'));
    o.push('<div style="display:flex;gap:30px;align-items:flex-start;margin:12px 0 0">' +
      '<div style="width:210px;flex:none">' +
        '<h1 style="font-family:Archivo;font-weight:700;font-size:26px;margin:0 0 8px;color:' +
          c.ink + ';line-height:1.1;' + c.caseCss + '">' + c.d.title + '</h1>' +
        '<p style="font-family:Nunito;font-size:11.5px;line-height:1.6;color:' + c.muted + ';margin:0">' +
          'The room is the argument. You come in at the counter, the shelf runs the full ' +
          'height of the long wall, and the table at the back is where the thing actually ' +
          'happens. A photograph taken from the door would show you none of that.</p>' +
        '<div style="margin:14px 0 0">' + sTag(1, 'counter', c.acc, c.ink) + '</div>' +
        '<div>' + sTag(2, 'the shelf', c.acc, c.ink) + '</div>' +
        '<div>' + sTag(3, 'cold room', c.acc, c.ink) + '</div>' +
        '<div>' + sTag(4, 'tasting table', c.acc, c.ink) + '</div>' +
        '<div>' + sTag(5, 'upstairs', c.acc, c.ink) + '</div>' +
        /* S02 scatters the plan fragments behind the projection. Here
           they go under the text column, which is the quiet part of the
           sheet and the only place left with room. */
        '<svg width="200" height="150" viewBox="0 0 200 150" style="margin:16px 0 0;display:block">' +
          '<rect x="2" y="14" width="86" height="58" fill="none" stroke="' + c.muted + '" stroke-width="0.8"/>' +
          '<rect x="12" y="24" width="30" height="38" fill="none" stroke="' + c.muted + '" stroke-width="0.6"/>' +
          '<rect x="104" y="2" width="70" height="44" fill="none" stroke="' + c.muted + '" stroke-width="0.8"/>' +
          '<rect x="34" y="88" width="112" height="50" fill="none" stroke="' + c.muted + '" stroke-width="0.8"/>' +
          '<line x1="34" y1="100" x2="146" y2="100" stroke="' + a + '" stroke-width="1.2"/>' +
          '<text x="2" y="8" font-family="Nunito" font-size="8" fill="' + c.muted + '">PLAN, GROUND</text>' +
          '<text x="104" y="56" font-family="Nunito" font-size="8" fill="' + c.muted + '">PLAN, FIRST</text>' +
          '<text x="34" y="148" font-family="Nunito" font-size="8" fill="' + c.muted + '">SHELF ELEVATION</text></svg>' +
      '</div>' +
      '<svg width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H +
        '" style="flex:none;margin-right:-210px">' + g + '</svg></div>');
    o.push('<div style="margin:6px 0 0">' +
      c.foot(['84 bottles facing', 'drawn 6 November 2026', 'scale 1:50 at A2', 'north is up the page']) + '</div>');
    return o;
  },

  /* The ground as itself with the places on it. P01 blooms the colour
     where the smells are and keys it along the foot. S12 writes the
     place names by hand and runs the routes in one blue. */
  map: function(c){
    var W = 788, H = 430, col = c.muted, a = c.acc, a2 = c.acc2;
    var pts = [], r = c.r;
    for (var i = 0; i < 9; i++){
      pts.push([70 + Math.floor(r() * (W - 180)), 50 + Math.floor(r() * (H - 150))]);
    }
    var g = '';
    /* the route first, because the ground is built before anything is
       put on it, and the route is the ground here */
    var dAttr = 'M' + pts.map(function(p, i){
      return (i ? 'L' : '') + p[0] + ' ' + p[1];
    }).join(' ');
    g += '<path d="' + dAttr + '" fill="none" stroke="' + a + '" stroke-width="1.6" stroke-linejoin="round"/>';
    g += '<path d="M40 ' + (H - 70) + ' C 240 ' + (H - 160) + ', 420 ' + (H - 20) + ', ' + (W - 60) + ' ' + (H - 120) +
         '" fill="none" stroke="' + col + '" stroke-width="0.9" stroke-dasharray="5 4"/>';
    var names = ['Rai','Kundli','Murthal','Sonipat','Narela','Alipur','Bawana','Siraspur','Khera Kalan'];
    pts.forEach(function(p, i){
      g += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (4 + (i % 3) * 2) + '" fill="' + a2 + '"/>';
      g += '<text x="' + (p[0] + 9) + '" y="' + (p[1] + 4) + '" font-family="Nunito" font-size="11" fill="' +
           c.ink + '">' + names[i] + '</text>';
      g += '<text x="' + (p[0] + 9) + '" y="' + (p[1] + 16) + '" font-family="Nunito" font-size="9" fill="' +
           col + '">' + String(i + 1).padStart(2, '0') + ' &#183; ' + (12 + i * 7) + ' min</text>';
    });
    g += '<g transform="translate(16,16)">' + sRule(8, 740, false, col, 0) + '</g>';
    g += '<g transform="translate(16,16)">' + sRule(5, 380, true, col, 0) + '</g>';

    var o = [];
    o.push(c.head('Map', 'an hour and a bit from the gate'));
    o.push('<h1 style="font-family:Archivo;font-weight:700;font-size:' + Math.min(c.scale, 28) +
      'px;margin:8px 0 10px;color:' + c.ink + ';' + c.caseCss + '">' + c.d.title + '</h1>');
    o.push('<div style="position:relative"><svg width="' + W + '" height="' + H + '" viewBox="0 0 ' +
      W + ' ' + H + '">' + g + '</svg>' +
      '<div style="position:absolute;right:0;bottom:8px;width:168px;background:' + c.bg +
        ';padding:9px 11px;border:1px solid ' + c.muted + '">' +
        '<p style="font-family:Nunito;font-size:10px;letter-spacing:.12em;text-transform:uppercase;' +
          'margin:0 0 5px;color:' + c.ink + '">Legend</p>' +
        '<p style="font-family:Nunito;font-size:10px;line-height:1.7;margin:0;color:' + c.muted + '">' +
          '<b style="color:' + a + '">&#8212;</b> the way you would walk it<br>' +
          '<b style="color:' + c.muted + '">- -</b> the bus, if it comes<br>' +
          '<b style="color:' + a2 + '">&#9679;</b> somewhere worth the stop<br>' +
          'size of dot = how long you stay</p></div></div>');
    o.push('<div style="margin:10px 0 0">' +
      c.foot(['9 stops', 'walked 2 November', 'times are to the next stop', 'not to scale north of Murthal']) + '</div>');
    return o;
  },

  /* The relations drawn, the things left small. P12 is fans of fine
     lines with the dates almost incidental. P20 is nothing but nodes
     and the curves between them. */
  diagram: function(c){
    var W = 788, H = 450, cx = 300, cy = 225, col = c.muted;
    var g = '', r = c.r, n = 11;
    var years = ['1979','1982','1985','1995','1999','2001','2003','2006','2008','2009','2010'];
    var nodes = [];
    for (var i = 0; i < n; i++){
      var ang = (-0.55 + (i / (n - 1)) * 2.1) * Math.PI;
      var rad = 90 + i * 16;
      nodes.push([cx + Math.cos(ang) * rad * 1.5, cy + Math.sin(ang) * rad * 0.82]);
    }
    /* the fan: many fine lines from each node, which is the whole
       texture of P12 and the reason the dates can be small */
    nodes.forEach(function(p, i){
      var spread = 18 + i * 3, lines = 16 + i * 2;
      for (var k = 0; k < lines; k++){
        var th = (k / lines) * Math.PI * 2;
        g += '<line x1="' + p[0].toFixed(1) + '" y1="' + p[1].toFixed(1) +
             '" x2="' + (p[0] + Math.cos(th) * spread).toFixed(1) +
             '" y2="' + (p[1] + Math.sin(th) * spread * 0.8).toFixed(1) +
             '" stroke="' + (i % 3 === 0 ? c.acc : c.acc2) + '" stroke-width="0.45" opacity="0.5"/>';
      }
    });
    g += '<polyline points="' + nodes.map(function(p){
      return p[0].toFixed(0) + ',' + p[1].toFixed(0); }).join(' ') +
      '" fill="none" stroke="' + c.ink + '" stroke-width="0.8" stroke-dasharray="3 3"/>';
    nodes.forEach(function(p, i){
      g += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="2.2" fill="' + c.ink + '"/>';
      g += '<text x="' + (p[0] - 12).toFixed(0) + '" y="' + (p[1] - (i % 2 ? 26 : -32)).toFixed(0) +
           '" font-family="Archivo" font-style="italic" font-size="13" fill="' + c.ink + '">' + years[i] + '</text>';
    });

    var o = [];
    o.push(c.head('Diagram', 'the lines are the content'));
    o.push('<div style="position:relative;margin:6px 0 0">' +
      '<svg width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '">' + g + '</svg>' +
      '<div style="position:absolute;right:0;top:10px;width:200px">' +
        '<h1 style="font-family:Archivo;font-weight:400;font-size:21px;margin:0 0 8px;color:' +
          c.ink + ';line-height:1.2">' + c.d.title + '</h1>' +
        '<p style="font-family:Nunito;font-size:11px;line-height:1.65;color:' + c.muted + ';margin:0">' +
          'Each year is one dot and the fan round it is how much happened. ' +
          'The dot is almost nothing to look at, which is the point: what you ' +
          'are reading is the spread, not the date.</p></div></div>');
    o.push('<div style="text-align:center;margin:-6px 0 0">' +
      '<p style="font-family:Archivo;font-size:14px;letter-spacing:.06em;color:' + c.ink +
      ';margin:0">' + years[0] + ' &#8212; ' + years[n - 1] + '</p></div>');
    return o;
  },

  /* Everything on one sheet, placed by argument. P03 puts photographs
     at angles under a yellow wedge with justified text top and bottom.
     S06 drops text blocks wherever they fit and runs a data strip
     along the foot. */
  board: function(c){
    var o = [], r = c.r;
    o.push(c.head('Board', 'one sheet, everything on it'));
    var items = [];
    var pos = [[0,34,210,150,-2],[232,12,150,110,1.5],[402,64,180,130,-1],
               [600,20,180,124,2],[70,214,160,112,1],[256,186,210,146,-1.5],
               [496,222,140,100,0.5],[660,180,120,160,-2],[150,370,180,120,1],
               [360,360,150,108,-1],[536,348,210,140,1.5]];
    pos.forEach(function(p, i){
      items.push('<div style="position:absolute;left:' + p[0] + 'px;top:' + p[1] + 'px;width:' + p[2] +
        'px;transform:rotate(' + p[4] + 'deg)">' + plate(c.seed + i * 17, p[3]) +
        '<div style="margin:4px 0 0">' + sTag(i + 1, c.d.items[i].name, c.acc, c.ink) + '</div></div>');
    });
    /* the colour arrives as a wedge, which is what P03 does, not as a
       cast over the whole frame */
    items.push('<svg width="788" height="500" viewBox="0 0 788 500" style="position:absolute;left:0;top:0;' +
      'pointer-events:none"><polygon points="430,0 788,86 788,0" fill="' + c.acc + '" opacity="0.85"/>' +
      '<polygon points="0,470 300,500 0,500" fill="' + c.acc2 + '" opacity="0.5"/></svg>');
    items.push('<p style="position:absolute;left:0;top:0;width:200px;font-family:Nunito;font-size:9.5px;' +
      'line-height:1.55;text-align:justify;color:' + c.muted + ';margin:0">' +
      'Everything here is on one sheet because the argument is the arrangement. ' +
      'Nothing has been promoted to a hero and nothing has been relegated to a footer. ' +
      'What you do with it is look across it, find the two things that sit next to each ' +
      'other for a reason, and work out what the reason was.</p>');
    items.push('<p style="position:absolute;right:0;bottom:46px;width:160px;font-family:Nunito;' +
      'font-size:9.5px;line-height:1.55;text-align:justify;color:' + c.muted + ';margin:0">' +
      'The density is not decoration. A sheet two thirds full is the failure state, ' +
      'because it has neither the argument of a full one nor the nerve of an empty one.</p>');
    o.push('<div style="position:relative;height:510px;margin:10px 0 0">' + items.join('') + '</div>');
    o.push(c.foot(['11 plates', 'placed 6 November 2026', 'sheet 03 of 04', 'nothing here is to scale']));
    return o;
  },

  /* Small text in columns with the pictures cut into them. S08 labels
     the floors 2F and 3F and draws the cutlery in line instead of
     photographing it. */
  spread: function(c){
    var o = [];
    var para = 'The street is the only part of a city you can read at the speed you walk. ' +
      'A car gives you the route and takes the street, and the street is where it all is. ' +
      'Everything worth knowing about a place is at the speed you can stop at. ';
    function col(label, floor, imgAt){
      var blocks = [];
      blocks.push('<div style="display:flex;gap:8px;align-items:baseline;margin:0 0 10px">' +
        '<span style="font-family:Archivo;font-weight:700;font-size:15px;color:' + c.ink + '">' + floor + '</span>' +
        '<span style="font-family:Nunito;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:' +
          c.muted + '">' + label + '</span></div>');
      for (var i = 0; i < 4; i++){
        if (i === imgAt) blocks.push('<div style="margin:0 0 9px">' + plate(c.seed + i * 13 + floor.length, 118) +
          '<p style="font-family:Nunito;font-size:9px;color:' + c.muted + ';margin:3px 0 0">' +
          'fig. ' + (imgAt + 1) + ' &#183; ' + c.d.items[i].name + '</p></div>');
        blocks.push('<p style="font-family:Nunito;font-size:10.5px;line-height:1.72;color:' + c.muted +
          ';margin:0 0 7px;text-align:justify">' + para + '</p>');
      }
      return '<div style="flex:1">' + blocks.join('') + '</div>';
    }
    o.push(c.head('Spread', 'the pictures sit inside the measure'));
    o.push('<h1 style="font-family:Archivo;font-weight:400;font-size:' + Math.min(c.scale, 27) +
      'px;margin:10px 0 14px;color:' + c.ink + ';' + c.caseCss + '">' + c.d.title + '</h1>');
    o.push('<div style="display:flex;gap:26px;align-items:flex-start">' +
      col('ground', '1F', 2) + col('first', '2F', 0) + col('second', '3F', 3) +
      '<div style="width:96px;flex:none">' +
        '<p style="font-family:Nunito;font-size:9px;line-height:1.7;color:' + c.muted +
        ';margin:0;writing-mode:vertical-rl;text-orientation:mixed;height:300px">' +
        'Notes taken standing up, 2 November 2026, between the market and the bridge</p></div></div>');
    o.push('<div style="margin:' + c.gap + 'px 0 0">' +
      c.foot(['3 columns', '11 minutes', 'figures 1 to 3', 'page 118']) + '</div>');
    return o;
  },

  /* One surface, one statement. S03 gives nearly half the page to one
     yellow and knocks the figures out of a photograph in it. P07 puts
     the cattle in flat red over the field. */
  plate: function(c){
    var field = c.nCol <= 1 ? c.ink : c.acc;
    var o = [];
    var figs = '';
    for (var i = 0; i < 5; i++){
      var x = 90 + i * 150, h = 150 + (i % 3) * 34;
      figs += '<g transform="translate(' + x + ',' + (330 - h) + ')" fill="' + c.bg + '">' +
        '<circle cx="24" cy="18" r="17"/>' +
        '<path d="M6 40 h36 v' + (h - 86) + ' l-7 46 h-10 l-2 -40 l-2 40 h-10 l-7 -46 z"/></g>';
    }
    o.push('<div style="margin:-38px -56px 0;background:' + field + ';padding:30px 56px 0;position:relative">' +
      '<div style="display:flex;justify-content:space-between;font-family:Nunito;font-size:10px;' +
        'letter-spacing:.3em;text-transform:uppercase;color:' + c.bg + '">' +
        '<span>one night</span><span>doors at nine</span><span>no support</span></div>' +
      '<svg width="788" height="340" viewBox="0 0 788 340" style="display:block">' + figs + '</svg>' +
      /* the one row of words, letterspaced to the full measure, which is
         what S03 does between the field and the photograph */
      '<div style="display:flex;justify-content:space-between;font-family:Archivo;font-weight:700;' +
        'font-size:15px;text-transform:uppercase;color:' + c.bg + ';padding:0 0 22px">' +
        c.d.title.toUpperCase().slice(0, 30).split('').map(function(ch){
          return '<span>' + (ch === ' ' ? '&nbsp;' : ch) + '</span>'; }).join('') +
      '</div></div>');
    o.push('<div style="margin:0 -56px;position:relative">' + plate(c.seed + 5, 260) +
      '<svg width="900" height="260" viewBox="0 0 900 260" style="position:absolute;left:0;top:0">' +
      '<g fill="' + field + '"><circle cx="150" cy="70" r="26"/>' +
      '<path d="M122 104 h56 v96 l-11 58 h-15 l-3 -52 l-3 52 h-15 l-11 -58 z"/>' +
      '<circle cx="700" cy="58" r="22"/>' +
      '<path d="M678 86 h44 v84 l-9 50 h-12 l-2 -44 l-2 44 h-12 l-9 -50 z"/></g></svg></div>');
    o.push('<div style="margin:14px 0 0">' +
      c.foot(['thursday 6 november', 'cafe oto, dalston', '£12 on the door', 'one night only']) + '</div>');
    return o;
  }
};

/* Draws a structure at page size, same frame and scaler as renderSite so
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
