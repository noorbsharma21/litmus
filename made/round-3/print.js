/* Round three, the print kit. From cr6: "grainier", "more analog",
   "screen printing effect, cyanotype", "texturally rich formats", "flat
   looks very lame". These take a photograph through a print process in the
   browser, so a placeholder reads as something made rather than as stock:
   cyanotype, two ink riso, screen print halftone, photocopy. Plus paper,
   grain and a pencil filter for hand written type (s4: polish and hand
   together). Photographs come from Unsplash with CORS, so the pixels can
   be read. Nothing is downloaded. */

function loadImg(src){
  return new Promise(function(res, rej){ var i = new Image(); i.crossOrigin = 'anonymous'; i.onload = function(){ res(i); }; i.onerror = rej; i.src = src; });
}
function hexRGB(h){ h = h.replace('#', ''); return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; }
function seeded(s){ var x = (s || 7) * 9301 + 49297; return function(){ x = (x * 233280 + 49297) % 233280; return x / 233280; }; }

/* smooth value noise, 0 to 1, for blotches and uneven ink */
function field(w, h, cell, seed){
  var r = seeded(seed), gw = Math.ceil(w / cell) + 2, gh = Math.ceil(h / cell) + 2, grid = new Float32Array(gw * gh), out = new Float32Array(w * h);
  for (var i = 0; i < grid.length; i++) grid[i] = r();
  for (var y = 0; y < h; y++){
    var gy = y / cell, y0 = Math.floor(gy), fy = gy - y0; fy = fy * fy * (3 - 2 * fy);
    for (var x = 0; x < w; x++){
      var gx = x / cell, x0 = Math.floor(gx), fx = gx - x0; fx = fx * fx * (3 - 2 * fx);
      var a = grid[y0 * gw + x0], b = grid[y0 * gw + x0 + 1], c = grid[(y0 + 1) * gw + x0], d = grid[(y0 + 1) * gw + x0 + 1];
      out[y * w + x] = (a + (b - a) * fx) + ((c + (d - c) * fx) - (a + (b - a) * fx)) * fy;
    }
  }
  return out;
}

/* the photograph drawn to fill w by h, cropped like CSS cover, around a focus point */
function coverPixels(img, w, h, fx, fy){
  var c = document.createElement('canvas'); c.width = w; c.height = h; var g = c.getContext('2d');
  var s = Math.max(w / img.naturalWidth, h / img.naturalHeight), dw = img.naturalWidth * s, dh = img.naturalHeight * s;
  g.drawImage(img, (w - dw) * (fx === undefined ? 0.5 : fx), (h - dh) * (fy === undefined ? 0.5 : fy), dw, dh);
  return g.getImageData(0, 0, w, h);
}
function lumArr(px, contrast, lift){
  var d = px.data, n = d.length / 4, L = new Float32Array(n);
  for (var i = 0; i < n; i++){
    var l = (0.2126 * d[i * 4] + 0.7152 * d[i * 4 + 1] + 0.0722 * d[i * 4 + 2]) / 255;
    l = (l - 0.5) * (contrast || 1) + 0.5 + (lift || 0);
    L[i] = l < 0 ? 0 : l > 1 ? 1 : l;
  }
  return L;
}
function out(w, h){ var c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
function clamp(v){ return v < 0 ? 0 : v > 255 ? 255 : v; }

var PRINT = {
  /* Cyanotype: Prussian blue where the light got through, the paper left
     white where it did not, uneven where the sensitiser was brushed on, with
     a ragged brushed edge and the paper's own grain. */
  cyanotype: function(img, w, h, o){
    o = o || {};
    var px = coverPixels(img, w, h, o.fx, o.fy), L = lumArr(px, o.contrast || 1.35, o.lift || 0.04);
    var blot = field(w, h, Math.max(24, w / 14), 3), edge = field(w, h, 9, 11), fine = field(w, h, 3, 5);
    var c = out(w, h), g = c.getContext('2d'), im = g.createImageData(w, h), d = im.data;
    var paper = hexRGB(o.paper || '#F2EFE6'), deep = hexRGB(o.deep || '#0C2A63'), mid = hexRGB('#2563A8');
    var m = o.margin === undefined ? Math.round(Math.min(w, h) * 0.045) : o.margin;
    for (var y = 0; y < h; y++) for (var x = 0; x < w; x++){
      var i = y * w + x, D = Math.pow(1 - L[i], o.gamma || 0.85);
      D = D * (0.82 + 0.34 * blot[i]);
      /* the brushed edge: inside a ragged margin the coating thins out */
      var e = Math.min(x, y, w - 1 - x, h - 1 - y) - m * (0.4 + edge[i] * 1.2);
      var coat = e > 0 ? Math.min(1, e / (m * 0.6)) : 0;
      if (coat < 1) D = D * coat + (1 - coat) * (fine[i] > 0.62 ? 0.18 * coat : 0);
      D = Math.max(0, Math.min(1, D));
      var t = D < 0.5 ? D * 2 : (D - 0.5) * 2, a = D < 0.5 ? paper : mid, b = D < 0.5 ? mid : deep;
      var grain = (fine[i] - 0.5) * 18;
      d[i * 4] = clamp(a[0] + (b[0] - a[0]) * t + grain); d[i * 4 + 1] = clamp(a[1] + (b[1] - a[1]) * t + grain); d[i * 4 + 2] = clamp(a[2] + (b[2] - a[2]) * t + grain); d[i * 4 + 3] = 255;
    }
    g.putImageData(im, 0, 0); return c;
  },

  /* Riso: two inks laid one over the other, each with the grainy screen a
     risograph drum makes, and the second drum a few pixels out of register. */
  riso: function(img, w, h, o){
    o = o || {};
    var px = coverPixels(img, w, h, o.fx, o.fy), L = lumArr(px, o.contrast || 1.25, o.lift || 0);
    var r = seeded(o.seed || 4), A = hexRGB(o.a || '#1A1614'), B = hexRGB(o.b || '#F64FB2'), P = hexRGB(o.paper || '#F4F1EA');
    var dx = o.dx === undefined ? Math.round(w / 260) + 2 : o.dx, dy = o.dy === undefined ? 2 : o.dy, blot = field(w, h, Math.max(30, w / 10), 9);
    var c = out(w, h), g = c.getContext('2d'), im = g.createImageData(w, h), d = im.data;
    function sm(e0, e1, v){ var t = Math.max(0, Math.min(1, (v - e0) / (e1 - e0))); return t * t * (3 - 2 * t); }
    for (var y = 0; y < h; y++) for (var x = 0; x < w; x++){
      var i = y * w + x, xb = Math.min(w - 1, Math.max(0, x - dx)), yb = Math.min(h - 1, Math.max(0, y - dy)), j = yb * w + xb;
      var da = sm(o.aLo || 0.42, o.aHi || 0.98, 1 - L[i]), db = sm(o.bLo || 0.08, o.bHi || 0.75, 1 - L[j]) * (o.bMax || 0.9) * (0.85 + 0.3 * blot[i]);
      /* the drum's grain: density becomes the chance of ink at this point */
      da = r() < da ? 0.94 : da * 0.12; db = r() < db ? 0.9 : db * 0.15;
      var n = (r() - 0.5) * 10;
      for (var k = 0; k < 3; k++){
        var v = P[k] * (1 - db * (1 - B[k] / 255)) * (1 - da * (1 - A[k] / 255));
        d[i * 4 + k] = clamp(v + n);
      }
      d[i * 4 + 3] = 255;
    }
    g.putImageData(im, 0, 0); return c;
  },

  /* Screen print: a coarse halftone in one ink, dots swelling where the ink
     spread through the mesh, on paper. */
  screen: function(img, w, h, o){
    o = o || {};
    var px = coverPixels(img, w, h, o.fx, o.fy), L = lumArr(px, o.contrast || 1.3, o.lift || 0);
    var c = out(w, h), g = c.getContext('2d'), cell = o.cell || Math.max(5, Math.round(w / 130)), ang = (o.angle === undefined ? 22 : o.angle) * Math.PI / 180, r = seeded(o.seed || 2);
    g.fillStyle = o.paper || '#F3EFE4'; g.fillRect(0, 0, w, h);
    g.fillStyle = o.ink || '#1A1614';
    var ca = Math.cos(ang), sa = Math.sin(ang), R = Math.hypot(w, h);
    for (var v = -R; v < R; v += cell) for (var u = -R; u < R; u += cell){
      var x = w / 2 + u * ca - v * sa, y = h / 2 + u * sa + v * ca;
      if (x < -cell || y < -cell || x > w + cell || y > h + cell) continue;
      var xi = Math.min(w - 1, Math.max(0, x | 0)), yi = Math.min(h - 1, Math.max(0, y | 0));
      var D = 1 - L[yi * w + xi]; if (D < 0.04) continue;
      var rad = Math.sqrt(D) * cell * 0.62 * (0.92 + r() * 0.16);
      g.beginPath(); g.arc(x, y, rad, 0, 6.2832); g.fill();
    }
    return c;
  },

  /* Woodcut: one ink, cut. Light areas are carved away in strokes that run
     with the grain of the block, so the tone becomes lines, not dots. */
  woodcut: function(img, w, h, o){
    o = o || {};
    var px = coverPixels(img, w, h, o.fx, o.fy), L = lumArr(px, o.contrast || 1.4, o.lift || 0.02);
    var grain = field(w, h, 1, 3), long = field(w, Math.max(2, Math.round(h / (o.lines || 5))), Math.max(6, w / 60), 7);
    var c = out(w, h), g = c.getContext('2d'), im = g.createImageData(w, h), d = im.data, ink = hexRGB(o.ink || '#3B1A0E'), P = hexRGB(o.paper || '#F4F3EF'), r = seeded(o.seed || 8);
    var lh = o.lines || 5;
    for (var y = 0; y < h; y++){
      var band = (y % lh) / lh, row = Math.floor(y / lh), ly = Math.min(long.length / w - 1, row);
      for (var x = 0; x < w; x++){
        var i = y * w + x, wob = long[ly * w + x] - 0.5;
        /* the gouge: a line is cut where the tone is light; lighter, wider cut */
        var cut = Math.abs(band - 0.5 + wob * 0.5) * 2, keep = cut > L[i] * 1.15 - 0.08;
        if (r() < 0.004) keep = !keep;
        var t = keep ? 1 : 0;
        for (var k = 0; k < 3; k++) d[i * 4 + k] = clamp(P[k] + (ink[k] - P[k]) * t * (0.9 + grain[i] * 0.1) + (grain[i] - 0.5) * 10);
        d[i * 4 + 3] = 255;
      }
    }
    g.putImageData(im, 0, 0); return c;
  },

  /* Ink. From cr12 (Ulli Lust, Today Is the Last Day of the Rest of Your
     Life): a pen drawing over the photograph's shapes, one flat spot colour
     for the darkest areas the way she floods a panel with green, and hatching
     in the mid tones that wanders like a hand. Outlines come from a
     difference of two blurs (the edges a pen would follow); tone becomes
     strokes, not dots. The photograph itself never shows. */
  ink: function(img, w, h, o){
    o = o || {};
    function blurred(px){
      var c = out(w, h), g = c.getContext('2d'), s = Math.max(w / img.naturalWidth, h / img.naturalHeight), dw = img.naturalWidth * s, dh = img.naturalHeight * s;
      g.filter = 'grayscale(1) blur(' + px + 'px)';
      g.drawImage(img, (w - dw) * (o.fx === undefined ? .5 : o.fx), (h - dh) * (o.fy === undefined ? .5 : o.fy), dw, dh);
      var d = g.getImageData(0, 0, w, h).data, L = new Float32Array(w * h);
      for (var i = 0; i < L.length; i++) L[i] = d[i * 4] / 255;
      return L;
    }
    var k = w / 900, A = blurred(1.3 * k), B = blurred(3.2 * k), T = blurred(7 * k);
    /* levels: every photograph is brought to the same range first, so a dark
       stage and a bright room come out as the same kind of drawing */
    var smp = []; for (var z = 0; z < T.length; z += 37) smp.push(T[z]); smp.sort(function(p, q){ return p - q; });
    var lo = smp[Math.floor(smp.length * 0.04)], hi = smp[Math.floor(smp.length * 0.96)], sc = 1 / Math.max(0.05, hi - lo);
    [A, B, T].forEach(function(L){ for (var i = 0; i < L.length; i++) L[i] = (L[i] - lo) * sc + (o.lift || 0); });
    /* shares instead of thresholds: every drawing in a set gets the same amount
       of spot colour and of hatching, whatever the photograph was like */
    var pct = function(f){ return (smp[Math.min(smp.length - 1, Math.floor(smp.length * f))] - lo) * sc + (o.lift || 0); };
    if (o.spotShare) o.spotAt = pct(o.spotShare);
    if (o.hatchShare) o.hatchAt = pct((o.spotShare || 0) + o.hatchShare);
    var c = out(w, h), g = c.getContext('2d'), r = seeded(o.seed || 9);
    var P = hexRGB(o.paper || '#FFFFFF'), I = hexRGB(o.ink || '#141210'), S = o.spot ? hexRGB(o.spot) : null;
    /* paper, then the spot colour flooded into the darks with a soft brush edge */
    var im = g.createImageData(w, h), d = im.data, spotAt = o.spotAt || 0.3;
    for (var i = 0; i < w * h; i++){
      var f = S ? Math.max(0, Math.min(1, (spotAt - T[i]) / 0.04 + 0.5)) : 0;
      for (var q = 0; q < 3; q++) d[i * 4 + q] = P[q] + ((S ? S[q] : P[q]) - P[q]) * f;
      d[i * 4 + 3] = 255;
    }
    g.putImageData(im, 0, 0);
    /* hatching in the mid tones only: long, slightly wandering strokes, far apart */
    g.strokeStyle = 'rgb(' + I.join(',') + ')'; g.lineCap = 'round'; g.lineJoin = 'round';
    function hatch(angle, from, below, gap, wt){
      var ca = Math.cos(angle), sa = Math.sin(angle), R = Math.hypot(w, h), st = 3 * k;
      for (var v = -R; v < R; v += gap * (0.85 + r() * 0.3)){
        var wob = 0, down = false; g.beginPath(); g.lineWidth = wt * (0.8 + r() * 0.5);
        for (var u = -R; u < R; u += st){
          var x = w / 2 + u * ca - v * sa, y = h / 2 + u * sa + v * ca;
          if (x < 0 || y < 0 || x >= w || y >= h){ down = false; continue; }
          var t = T[(y | 0) * w + (x | 0)], on = t < below && t >= from;
          wob += (r() - .5) * 0.7 * k; wob *= 0.9;
          var px = x - sa * wob, py = y + ca * wob;
          if (on && !down){ g.moveTo(px, py); down = true; } else if (on) g.lineTo(px, py); else down = false;
        }
        g.stroke();
      }
    }
    hatch((o.angle || 58) * Math.PI / 180, S ? spotAt - 0.02 : 0.08, o.hatchAt || 0.55, (o.gap || 9) * k, 1.25 * k);
    /* the pen's outlines over everything; solid black only in the very darkest */
    im = g.getImageData(0, 0, w, h); d = im.data;
    var tau = o.edge || 0.035;
    for (var j = 0; j < w * h; j++){
      var e = A[j] - B[j], a = e < -tau ? Math.min(1, (-tau - e) / (tau * 0.7)) : 0;
      if (T[j] < (o.solid === undefined ? -0.02 : o.solid)) a = 1;
      if (a > 0) for (var p = 0; p < 3; p++) d[j * 4 + p] = d[j * 4 + p] + (I[p] - d[j * 4 + p]) * a;
    }
    g.putImageData(im, 0, 0);
    return c;
  },

  /* Photocopy: toner on cheap paper. Hard contrast, toner specks, the
     faint streak a drum leaves. */
  xerox: function(img, w, h, o){
    o = o || {};
    var px = coverPixels(img, w, h, o.fx, o.fy), L = lumArr(px, o.contrast || 2.1, o.lift || 0.06);
    var r = seeded(o.seed || 6), fine = field(w, h, 2, 13), streak = field(w, 1, 40, 17);
    var c = out(w, h), g = c.getContext('2d'), im = g.createImageData(w, h), d = im.data;
    var ink = hexRGB(o.ink || '#141311'), P = hexRGB(o.paper || '#EDEBE6');
    for (var y = 0; y < h; y++) for (var x = 0; x < w; x++){
      var i = y * w + x, l = L[i] + (fine[i] - 0.5) * 0.35 + (streak[x] - 0.5) * 0.08;
      var t = l < 0.45 ? 1 : l < 0.6 ? (0.6 - l) / 0.15 : 0;
      if (r() < 0.0025) t = 1;
      for (var k = 0; k < 3; k++) d[i * 4 + k] = clamp(P[k] + (ink[k] - P[k]) * t * 0.96 + (r() - 0.5) * 8);
      d[i * 4 + 3] = 255;
    }
    g.putImageData(im, 0, 0); return c;
  }
};

/* Hand-drawn lines. From cr11: "very straight lines. They have to look like
   scribbles, like hand-drawn stuff. This is too measured." A line goes down
   the way a marker puts it down: it wanders a little, runs past its ends, and
   is gone over twice, once heavy and once light, never quite on top of
   itself. No ruled CSS borders where a line is meant to be seen. */
function scribblePath(x0, y0, x1, y1, amp, r){
  var dx = x1 - x0, dy = y1 - y0, len = Math.hypot(dx, dy) || 1, nx = -dy / len, ny = dx / len;
  /* it wanders (a random walk), sags or bows a little over its length, runs past
     both ends, and the pen lifts off with a small hook */
  var over = 0.02 + r() * 0.05, n = 7 + Math.floor(r() * 4), pts = [], w = 0, bow = (r() - 0.5) * amp * 1.2;
  for (var i = 0; i <= n; i++){
    var t = -over + (1 + over * 2) * i / n; w += (r() - 0.5) * amp; w *= 0.82;
    var off = w + Math.sin(Math.PI * Math.max(0, Math.min(1, t))) * bow + (i === n ? (r() - 0.3) * amp * 1.4 : 0);
    pts.push([x0 + dx * t + nx * off, y0 + dy * t + ny * off]);
  }
  var d = 'M' + pts[0][0].toFixed(2) + ' ' + pts[0][1].toFixed(2);
  for (var k = 1; k < pts.length - 1; k++){
    var mx = (pts[k][0] + pts[k + 1][0]) / 2, my = (pts[k][1] + pts[k + 1][1]) / 2;
    d += ' Q' + pts[k][0].toFixed(2) + ' ' + pts[k][1].toFixed(2) + ' ' + mx.toFixed(2) + ' ' + my.toFixed(2);
  }
  var L = pts[pts.length - 1]; return d + ' L' + L[0].toFixed(2) + ' ' + L[1].toFixed(2);
}
function scrib(paths, view, colour, heavy, cls, widths, filter){
  return '<svg class="' + (cls || 'scrib') + '" viewBox="' + view + '" preserveAspectRatio="none" aria-hidden="true" focusable="false">' +
    paths.map(function(p, i){ var w = widths ? widths[i] : (i % 2 ? heavy * 0.55 : heavy); return '<path d="' + p + '" fill="none" stroke="' + (colour || '#141210') + '" stroke-width="' + w.toFixed(2) + '" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"' + (filter ? ' filter="url(#' + filter + ')"' : '') + ' opacity="' + (i % 2 ? 0.85 : 1) + '"/>'; }).join('') + '</svg>';
}
/* a line across a box 100 wide and 12 high, stretched to whatever it underlines */
function scribbleLine(o){
  /* drawn in two or three strokes that overlap where the hand moved on, each
     at its own slant, the first gone over once more */
  o = o || {}; var r = seeded(o.seed || 1 + Math.floor(Math.random() * 99999)), a = o.amp || 6, heavy = o.weight || 2.4;
  var parts = 2 + Math.floor(r() * 2), x = -2, paths = [], widths = [], y = 6 + (r() - 0.5) * 3;
  for (var k = 0; k < parts; k++){
    var len = (104 - x) / (parts - k) + (k < parts - 1 ? 6 + r() * 8 : 0), x1 = Math.min(103, x + len), y1 = y + (r() - 0.5) * 5;
    paths.push(scribblePath(x, y, x1, y1, a, r)); widths.push(heavy * (0.8 + r() * 0.5));
    if (k === 0){ paths.push(scribblePath(x + 3, y + 1.4, x1 - 4, y1 + 1, a, r)); widths.push(heavy * 0.5); }
    x = x1 - (5 + r() * 9); y = y1 + (r() - 0.5) * 2;
  }
  return scrib(paths, '0 0 100 12', o.colour, heavy, o.cls, widths, o.filter);
}
/* a cross, two strokes each gone over twice, running past the corners */
/* crossed out the way a hand does it: a fast zigzag back and forth over the thing */
function scribbleOut(o){
  o = o || {}; var r = seeded(o.seed || 1 + Math.floor(Math.random() * 99999)), a = o.amp || 7, paths = [], widths = [];
  var ys = [12, 26, 42, 58, 72, 88], x0 = 8 + r() * 6, x1 = 90 - r() * 6;
  for (var i = 0; i < ys.length - 1; i++){
    var fromL = i % 2 === 0, xa = fromL ? x0 + r() * 6 : x1 - r() * 6, xb = fromL ? x1 - r() * 6 : x0 + r() * 6;
    paths.push(scribblePath(xa, ys[i] + (r() - .5) * 6, xb, ys[i + 1] + (r() - .5) * 6, a, r)); widths.push((o.weight || 3.2) * (0.75 + r() * 0.5));
  }
  return scrib(paths, '0 0 100 100', o.colour, o.weight || 3.2, o.cls, widths, o.filter);
}
function scribbleX(o){
  o = o || {}; var r = seeded(o.seed || 1 + Math.floor(Math.random() * 99999)), a = o.amp || 10;
  return scrib([scribblePath(8, 10, 92, 88, a, r), scribblePath(12, 9, 89, 93, a, r), scribblePath(90, 12, 12, 90, a, r), scribblePath(86, 8, 13, 86, a, r)], '0 0 100 100', o.colour, o.weight || 3.4, o.cls);
}
/* tape with torn ends: the short sides zigzag where it was ripped off the roll */
function tornEnds(el){
  var r = seeded(Math.floor(Math.random() * 99999) + 1), L = [], R = [];
  for (var y = 0; y <= 100; y += 12.5){ L.push([r() * 6, y]); R.push([100 - r() * 6, y]); }
  el.style.clipPath = 'polygon(' + L.concat(R.reverse()).map(function(p){ return p[0].toFixed(1) + '% ' + p[1].toFixed(1) + '%'; }).join(',') + ')';
}

/* Paper: a sheet with tooth and the odd fibre, returned as a data URL to use
   as a background. */
function paperURL(tone, o){
  o = o || {};
  var w = 320, h = 320, c = out(w, h), g = c.getContext('2d'), im = g.createImageData(w, h), d = im.data, P = hexRGB(tone || '#F2EFE6');
  var r = seeded(o.seed || 21), f = field(w, h, 2, 23), F = field(w, h, 28, 29);
  for (var i = 0; i < w * h; i++){
    var n = (f[i] - 0.5) * (o.tooth || 16) + (F[i] - 0.5) * (o.cloud || 8);
    d[i * 4] = clamp(P[0] + n); d[i * 4 + 1] = clamp(P[1] + n); d[i * 4 + 2] = clamp(P[2] + n * 1.1); d[i * 4 + 3] = 255;
  }
  g.putImageData(im, 0, 0);
  g.globalAlpha = 0.07; g.strokeStyle = o.fibre || 'rgba(90,70,40,.5)'; g.lineWidth = 0.5;
  for (var k = 0; k < (o.fibres === undefined ? 8 : o.fibres); k++){ var x = r() * w, y = r() * h; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + (r() - 0.5) * 30, y + (r() - 0.5) * 30, x + (r() - 0.5) * 40, y + (r() - 0.5) * 40); g.stroke(); }
  return c.toDataURL();
}

/* Grain over a whole page: fine moving noise, the way film or a print has
   it. Sits above everything and takes no pointer. */
function grainOver(opacity, blend){
  var c = out(256, 256), g = c.getContext('2d'), im = g.createImageData(256, 256), d = im.data, r = seeded(31);
  for (var i = 0; i < d.length; i += 4){ var v = r() * 255; d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255; }
  g.putImageData(im, 0, 0);
  var el = document.createElement('div');
  el.setAttribute('aria-hidden', 'true');
  el.style.cssText = 'position:fixed;inset:-256px;pointer-events:none;z-index:50;opacity:' + (opacity || 0.08) + ';mix-blend-mode:' + (blend || 'overlay') + ';background:url(' + c.toDataURL() + ');';
  document.body.appendChild(el);
  var t = 0;
  (function move(){ t++; if (t % 3 === 0) el.style.transform = 'translate(' + ((t * 37) % 256) + 'px,' + ((t * 71) % 256) + 'px)'; requestAnimationFrame(move); })();
  return el;
}

/* A pencil: type set in a hand face, then roughened and broken up the way
   graphite catches on paper. Use with style="filter:url(#pencil)". */
function pencilFilter(){
  if (document.getElementById('pencil')) return;
  var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  s.setAttribute('width', '0'); s.setAttribute('height', '0'); s.setAttribute('aria-hidden', 'true'); s.style.position = 'absolute';
  s.innerHTML = '<filter id="pencil" x="-5%" y="-10%" width="110%" height="120%">' +
    '<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="n"/>' +
    '<feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" xChannelSelector="R" yChannelSelector="G" result="d"/>' +
    '<feTurbulence type="fractalNoise" baseFrequency="1.9" numOctaves="1" seed="9" result="g"/>' +
    '<feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -2.6 0 0 0 2.05" result="m"/>' +
    '<feComposite in="d" in2="m" operator="in"/></filter>';
  document.body.appendChild(s);
}
