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
  el.style.cssText = 'position:fixed;inset:-50%;pointer-events:none;z-index:50;opacity:' + (opacity || 0.08) + ';mix-blend-mode:' + (blend || 'overlay') + ';background:url(' + c.toDataURL() + ');';
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
