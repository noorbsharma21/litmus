/* Round one kit. Only what every page needs and nothing that decides a
   look: the palettes, contrast, a seeded random, and the marker line he
   kept from the first critique. Each page composes its own world. */

/* Palettes are combinations that appear together in one reference, so
   no page invents its own colour scheme. */
var PAL = {
  P17: { a:'#FCF02A', b:'#F64FB2', c:'#0F6E2B', from:'P17 Super Riso 2' },
  P08: { a:'#EE5884', b:'#072493', c:'#F4432D', from:'P08 nine posters' },
  S03: { a:'#FDFF70', b:'#1A1614', c:'#FDFF70', from:'S03 yellow field' },
  P11: { a:'#3866C1', b:'#E47937', c:'#88B7D3', from:'P11 BLUE in sync' },
  P07: { a:'#A40603', b:'#FFFFFF', c:'#1A1614', from:'P07 cattle in oxide red' }
};
var INK = '#1A1614', WHITE = '#FFFFFF';

function lum(h){
  var c = h.replace('#','');
  return [0,2,4].map(function(i){ var x = parseInt(c.substr(i,2),16)/255;
    return x <= .03928 ? x/12.92 : Math.pow((x+.055)/1.055, 2.4); })
    .reduce(function(a, v, i){ return a + v * [.2126,.7152,.0722][i]; }, 0);
}
function contrast(a, b){ var x = lum(a), y = lum(b); return (Math.max(x,y)+.05)/(Math.min(x,y)+.05); }
function inkOn(bg){ return contrast(bg, INK) >= contrast(bg, WHITE) ? INK : WHITE; }
function rng(seed){ var x = seed || 1; return function(){ x = (x * 1664525 + 1013904223) % 4294967296; return x / 4294967296; }; }

/* A page that starts inside a frame can be 0 wide for a moment. Every
   page waits for a real size before it draws anything that divides. */
function sized(){ return innerWidth > 0 && innerHeight > 0; }

/* The marker: a dot on the thing, a line, and a label on a solid chip,
   because text over an image needs a solid panel behind it. */
function marker(svg, x1, y1, x2, y2, colour){
  return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + colour + '" stroke-width="1.5"/>' +
         '<circle cx="' + x1 + '" cy="' + y1 + '" r="3.5" fill="' + colour + '"/>';
}
