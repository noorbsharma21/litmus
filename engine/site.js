/* Litmus engine, sample renderer.

   Takes one run spec and draws a whole small website from it, so a
   judgment can be made on the thing itself rather than on a swatch.
   Every value here comes from a ladder step in data.js. Nothing is
   chosen by this file except how to put them together.

   The page is drawn at a real page width and scaled down afterwards,
   so 34px type looks like 34px type on a real page rather than like a
   poster. Drawing it small would have made every size read as huge. */

var PAGE_W = 900, PAGE_H = 760;

var GROUND = { white:'#FFFFFF', paper:'#F0E9D8', colour:'#E8C84A', dark:'#14130F' };
var INK    = { white:'#14130F', paper:'#14130F', colour:'#14130F', dark:'#F0E9D8' };
var MUTED  = { white:'#777777', paper:'#6B6453', colour:'#6B5A14', dark:'#9A958A' };
var LINE   = { white:'#E4E4E4', paper:'#DAD2BC', colour:'#CBAE38', dark:'#33312A' };
var ACCENT = ['#FF3E00','#151DE0','#8EA066','#9D70C0','#833405','#D0402F'];

var CASE_CSS = {
  'lower':   'text-transform:lowercase',
  'sentence':'',
  'Title':   '',
  'UPPER':   'text-transform:uppercase'
};
var ALIGN = { left:'left', right:'right', centre:'center', justified:'justify' };
var TRACK = { '-0.04em':'-.04em', '0':'0', '+0.08em':'.08em', '+0.22em':'.22em' };

function titleCase(s){
  return s.replace(/\w\S*/g, function(t){ return t.charAt(0).toUpperCase() + t.slice(1); });
}

/* turn a run array into a flat {dim: value} map */
function specFrom(run){
  var s = {};
  (run || []).forEach(function(r){ s[r.dim] = r.choice.v; });
  return s;
}

/* Two moves overrule a dimension outright. Resolve that before anything
   reads the spec, so the label under a sample describes the picture
   above it rather than the draw that went into it. */
function effectiveSpec(spec, moveIds){
  var s = {}, m = moveIds || [];
  Object.keys(spec || {}).forEach(function(k){ s[k] = spec[k]; });
  if (m.indexOf('c12') > -1) s.ground = 'colour';                  /* yellow returns */
  if (m.indexOf('c5')  > -1 && (!s.border || s.border === 'none')) s.border = 'field';
  return s;
}

/* a deterministic placeholder picture. no faces, which is what the
   corpus does, so the sample does not promise something the file refuses */
function plate(seed, h, tint){
  var r = rng(seed), a = Math.floor(r()*360), b = (a + 40 + Math.floor(r()*60)) % 360;
  return '<div style="height:' + h + 'px;position:relative;overflow:hidden;' +
    'background:linear-gradient(' + Math.floor(r()*180) + 'deg,hsl(' + a + ',24%,42%),hsl(' + b + ',30%,24%))">' +
    (tint ? '<div style="position:absolute;inset:0;background:' + tint + ';mix-blend-mode:multiply;opacity:.55"></div>' : '') +
  '</div>';
}

function halftoneCss(col){
  return 'background-image:radial-gradient(' + col + ' 2px, transparent 2.1px);background-size:14px 14px';
}

/* ---------------------------------------------------------------
   The claims, as things that can actually be drawn. A move only
   changes the page if it is in the run's chosen few.
   --------------------------------------------------------------- */
function renderSite(spec, moveIds, seed, label){
  var m   = moveIds || [];
  var s   = effectiveSpec(spec || {}, m);
  var has = function(id){ return m.indexOf(id) > -1; };
  var r   = rng(seed || 1);

  var gk    = s.ground || 'paper';
  var bg    = GROUND[gk], ink = INK[gk], muted = MUTED[gk], line = LINE[gk];
  var nCol  = parseInt(s['how many colours'] || '2', 10);
  var acc   = nCol <= 1 ? ink : ACCENT[Math.floor(r() * ACCENT.length)];

  var gap   = parseInt(s['section gap'] || '30', 10);
  var lead  = s.leading || '1.5';
  var meas  = s.measure || '26em';
  var align = ALIGN[s.alignment || 'left'] || 'left';
  var scale = parseInt(s.scale || '34', 10);

  var headCss = 'font-family:Archivo;margin:0;' +
    'font-weight:' + (s.weight || '700') + ';' +
    'font-size:' + scale + 'px;' +
    'letter-spacing:' + (TRACK[s.tracking] || '0') + ';' +
    'line-height:' + (scale > 48 ? '1.02' : '1.16') + ';' +
    CASE_CSS[s['case'] || 'sentence'] + ';color:' + ink;

  var words   = s['case'] === 'Title' ? titleCase(PHRASE) : PHRASE;
  var bodyCss = 'margin:0;font-family:Nunito;font-size:17px;line-height:' + lead +
                ';color:' + muted + ';max-width:' + meas +
                (align === 'right' ? ';margin-left:auto' : align === 'center' ? ';margin:0 auto' : '') +
                ';text-align:' + align;

  var out = [];

  /* nav */
  out.push('<div style="display:flex;justify-content:space-between;align-items:center;' +
    'padding:0 0 ' + Math.round(gap * 0.6) + 'px;border-bottom:1px solid ' + line + ';' +
    'font-family:Nunito;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:' + muted + '">' +
    '<span style="color:' + ink + ';font-weight:700">Disco</span>' +
    '<span>Cities &#183; Lists &#183; About</span></div>');

  /* hero. c7 lets the frame cut the words */
  var heroWrap = has('c7')
    ? 'margin:' + gap + 'px -56px ' + Math.round(gap * 0.45) + 'px;white-space:nowrap;overflow:hidden'
    : 'margin:' + gap + 'px 0 ' + Math.round(gap * 0.45) + 'px;text-align:' + align;
  out.push('<div style="' + heroWrap + '"><h1 style="' + headCss + '">' + words + '</h1></div>');
  out.push('<p style="' + bodyCss + '">Twenty five cities, read by people who live in them, ' +
           'not by an algorithm counting stars and reviews.</p>');

  /* c4 and c13: say it more than once */
  if (has('c4') || has('c13')){
    var n = has('c4') ? 4 : 2, cells = [];
    for (var i = 0; i < n; i++){
      var t = nCol >= 3 ? ACCENT[i % ACCENT.length] : (i % 2 ? acc : null);
      cells.push('<div style="flex:1">' + plate(seed + i * 11, 150, t) + '</div>');
    }
    out.push('<div style="display:flex;gap:10px;margin:' + gap + 'px 0 0">' + cells.join('') + '</div>');
    out.push('<p style="font-family:Nunito;font-size:13px;color:' + muted + ';margin:9px 0 0">' +
             (has('c4') ? 'The same frame, four times.' : 'The same picture, twice.') + '</p>');
  }

  /* c9: photographs arrive in stacks, full bleed */
  else if (has('c9')){
    out.push('<div style="margin:' + gap + 'px -56px 0">' +
      plate(seed + 3, 86, null) + plate(seed + 4, 86, acc) + plate(seed + 5, 86, null) + '</div>');
  }

  /* c10 and c11: a picture as the ground, panels off square */
  else if (has('c10') || has('c11')){
    var inner = has('c11')
      ? '<div style="position:absolute;left:14%;top:12%;width:52%;height:64%;transform:rotate(-4deg);' +
        'background:' + bg + ';border:1px solid ' + line + '"></div>' +
        '<div style="position:absolute;left:40%;top:30%;width:46%;height:58%;' +
        'background:' + bg + ';border:1px solid ' + line + '"></div>'
      : '<div style="position:absolute;inset:26px;background:' + bg + ';opacity:.93"></div>';
    out.push('<div style="margin:' + gap + 'px 0 0;position:relative;height:250px;overflow:hidden">' +
      plate(seed + 6, 250, has('c3') ? acc : null) +
      '<div style="position:absolute;inset:0">' + inner + '</div></div>');
  }

  else {
    out.push('<div style="margin:' + gap + 'px 0 0">' + plate(seed + 7, 210, has('c3') ? acc : null) + '</div>');
  }

  /* a list, so measure and leading are visible on more than one block */
  out.push('<div style="margin:' + gap + 'px 0 0">' +
    '<p style="font-family:Archivo;font-weight:700;font-size:' + Math.max(18, Math.round(scale * 0.5)) +
      'px;margin:0 0 ' + Math.round(gap * 0.35) + 'px;color:' + ink + ';text-align:' + align + ';' +
      CASE_CSS[s['case'] || 'sentence'] + '">Where to eat on a Tuesday</p>' +
    '<p style="' + bodyCss + '">Nothing here is ranked. The list is short because somebody had to ' +
    'walk it, and the walking is the part that takes the time.</p></div>');

  /* c6: the palette printed on the work */
  if (has('c6')){
    var sw = [];
    for (var j = 0; j < Math.max(2, nCol); j++){
      sw.push('<i style="width:26px;height:26px;display:block;background:' +
              (j === 0 ? ink : ACCENT[j % ACCENT.length]) + '"></i>');
    }
    out.push('<div style="display:flex;gap:6px;margin:' + gap + 'px 0 0">' + sw.join('') + '</div>');
  }

  /* footer */
  out.push('<div style="margin:' + gap + 'px 0 0;padding-top:16px;' +
    'border-top:1px solid ' + line + ';font-family:Nunito;font-size:13px;color:' + muted + '">' +
    'Disco &#183; built by people who go outside</div>');

  /* ground treatment. c1 builds it, c8 prints it */
  var groundCss = 'background:' + bg;
  if (has('c8')) groundCss += ';' + halftoneCss(gk === 'dark' ? 'rgba(255,255,255,.13)' : 'rgba(0,0,0,.10)');
  else if (has('c1')) groundCss += ';background-image:repeating-linear-gradient(0deg,transparent 0 37px,' +
    (gk === 'dark' ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.045)') + ' 37px 38px)';

  var page = '<div style="' + groundCss + ';padding:38px 56px 34px;width:' + PAGE_W +
             'px;min-height:' + PAGE_H + 'px;box-sizing:border-box">' + out.join('') + '</div>';

  /* the border, after everything else, because it wraps the lot */
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

/* Scale every sample to the width it was given. Called after insert,
   and again on resize, because the grid columns move with the window. */
function fitSites(root){
  var fs = (root || document).querySelectorAll('.siteframe');
  Array.prototype.forEach.call(fs, function(f){
    var sc = f.querySelector('.scaler'); if (!sc) return;
    var k = f.clientWidth / PAGE_W;
    sc.style.transform = 'scale(' + k + ')';
    f.style.height = Math.round(PAGE_H * k) + 'px';
  });
}
var fitT;
window.addEventListener('resize', function(){
  clearTimeout(fitT); fitT = setTimeout(function(){ fitSites(); }, 120);
});

/* a one line description of a spec, for the log and the pair record */
function specLine(spec){
  return ['weight','scale','case','tracking','measure','leading','section gap',
          'ground','how many colours','alignment','border']
    .filter(function(k){ return spec[k]; })
    .map(function(k){ return k + ' ' + spec[k]; }).join(', ');
}
