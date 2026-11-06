/* The measured palette.

   Everything in this file was sampled off the forty-four references in
   references/, not chosen. Each colour carries the piece it came out of
   and how much of that piece it covers, so any value here can be
   checked against the image it was taken from.

   This exists because the rules were the wrong unit. "Colour can take
   the whole frame" is true of the work and tells a model nothing: it
   does not say which yellow, how saturated, how light, or what it sits
   next to. Taste at that level is a set of numbers, and the numbers
   were the part the engine had been making up.

   What the engine had before, against what the work measures:

     ground colour   was #E8C84A   hue 48  a golden amber
                     measured      hue 55 to 61, never below 48
     accent          had #8EA066   olive, saturation 21, lightness 51
     accent          had #9D70C0   mauve, saturation 38, lightness 60
                     measured      nothing in 44 pieces sits in that
                                   band at all

   Sampled 6 November 2026 by adaptive quantisation to 24 colours per
   image, then filtered: a ground is the most-covering colour, an
   accent is anything over 45% saturation holding at least 0.4% of the
   page, a dark is anything under 25% lightness holding the same.      */

const MEASURED = {

  /* Thirty-three of forty-four grounds sit at 88% lightness or higher.
     Nineteen are dead neutral, white or a true grey with no cast at
     all. Thirteen are a warm paper between hue 35 and 51. One is cool.
     That single exception is why the rule is "almost never" rather
     than "never". */
  grounds: {
    white:  { hex:'#FFFFFF', from:['P04','P05','S04','S05','S06','S07','S09','S12','S15','S16'],
              note:'19 of 44 grounds are neutral: pure white, or a grey with zero cast.' },
    grey:   { hex:'#F3F3F3', from:['P03','P13','S10'],
              note:'When it is grey it is dead neutral. No cast in either direction.' },
    paper:  { hex:'#F3EBE0', from:['P09'], hsl:[35,44,92],
              note:'The solar system parchment. The commonest warm ground in the set.' },
    card:   { hex:'#ECE5D1', from:['P06','P22'], hsl:[44,42,87] },
    kraft:  { hex:'#E4DEC9', from:['S17'], hsl:[47,33,84],
              note:'The darkest paper in the set. Below this nothing exists until the darks.' },
    cream:  { hex:'#FEFBEA', from:['S11'], hsl:[51,91,96],
              note:'Graph paper. Nearly white but unmistakably warm.' },
    colour: { hex:'#FDFF70', from:['S03'], hsl:[61,100,72],
              note:'Forty-six per cent of one page. A highlighter yellow, not a gold.' },
    dark:   { hex:null, from:[],
              note:'Zero of forty-four. There is no dark page ground to sample.' }
  },

  /* Twenty-four pieces carry a dark. Twelve of those darks are warm,
     two are cool, seven are neutral. The mean lightness is 12. So the
     dark end is a warm near-black, and a cool one would be the odd one
     out rather than the safe choice. */
  inks: {
    ink:   { hex:'#1A1614', from:['S05'], hsl:[20,13,9] },
    deep:  { hex:'#110B0A', from:['P03'], hsl:[9,26,5] },
    soft:  { hex:'#382F2C', from:['S09'], hsl:[15,12,20],
             note:'For text that should not be full strength. Still warm.' },
    flat:  { hex:'#000000', from:['P08','S07','S10'],
             note:'True black appears, but only as a frame or a drawn line, never as text on paper.' }
  },

  /* Accent hues across the set, counted: red 19, orange 15, yellow 14,
     magenta 9, blue 7, green 4, cyan 3, violet 1. Warm leads by a long
     way and cobalt is the one cool colour that recurs. */
  /* `w` is how many of the forty-four pieces carry that colour family,
     not how many swatches were sampled. Those two numbers diverge badly
     and the swatch count is the misleading one: P02 alone contributed
     twelve near-identical oranges because the whole image is a goldfish,
     and P17 contributed nine magentas because it is a riso cover.
     Counting swatches would have the engine reaching for magenta as
     often as red.

       red      7 pieces     yellow   6     orange   5
       blue     3            magenta  2     cyan     2
       green    1            violet   1                        */
  accents: [
    { hex:'#A40603', name:'oxide red',   hsl:[1,96,33],    w:3, from:['P07'], share:'10% of its page',
      note:'Cattle silhouetted flat over a photograph of a field. The darkest red in the set.' },
    { hex:'#C5242B', name:'vermilion',   hsl:[357,69,46],  w:2, from:['P05'] },
    { hex:'#F4432D', name:'bright red',  hsl:[7,90,57],    w:2, from:['P08'] },
    { hex:'#EE5884', name:'pink',        hsl:[342,82,64],  w:1, from:['P08'], share:'10% of its page' },
    { hex:'#F64FB2', name:'magenta',     hsl:[324,90,64],  w:1, from:['P17'],
      note:'Riso. Sits directly on the acid yellow below with nothing between them.' },
    { hex:'#E47937', name:'orange',      hsl:[23,76,55],   w:5, from:['P02','P09','P18','P19','S21'] },
    { hex:'#FCF02A', name:'acid yellow', hsl:[57,97,58],   w:2, from:['P17'] },
    { hex:'#FDFF70', name:'highlighter', hsl:[61,100,72],  w:3, from:['S03'] },
    { hex:'#EDD164', name:'soft yellow', hsl:[48,79,66],   w:1, from:['S06'],
      note:'The lowest hue any yellow in the set reaches. Nothing goes golden.' },
    { hex:'#072493', name:'ultramarine', hsl:[228,91,30],  w:1, from:['P08'], share:'8% of its page' },
    { hex:'#3866C1', name:'cobalt',      hsl:[220,55,49],  w:1, from:['P11'] },
    { hex:'#88B7D3', name:'pale blue',   hsl:[202,46,68],  w:1, from:['P19'] },
    { hex:'#0F6E2B', name:'bottle green',hsl:[138,76,25],  w:1, from:['P17'],
      note:'The only green in forty-four pieces that is not an olive drawn with a pencil. One piece in forty-four, so the engine should reach for it about that often.' }
  ],

  /* Absence is the strongest signal here, because it is the part no
     amount of looking at the work would have told the engine to avoid.
     Each of these was looked for and is not there. */
  absent: [
    { what:'a cool off-white ground', found:'1 of 44, P11 at hue 206',
      why:'The default page colour of generated marketing sites sits here. #F8F9FA, #FAFBFC. The set has effectively none.' },
    { what:'mid-saturation, mid-lightness colour', found:'0 of 44',
      why:'Nothing lives between 20% and 45% saturation at 45% to 60% lightness. Colour is either deep or bright. The muddy middle is the AI default and it is absent.' },
    { what:'a golden or amber yellow', found:'0 of 44 below hue 48',
      why:'Every yellow in the set is acid, between hue 48 and 61. An amber yellow is the wrong yellow.' },
    { what:'teal, mauve, pastel', found:'0 of 44',
      why:'One violet, in a riso cover. No teal at all. The cool side of the palette is cobalt and nothing else.' },
    { what:'a dark page ground', found:'0 of 44', why:'Not one page in the set is dark.' },
    { what:'a saturated mid green', found:'0 of 44',
      why:'Greens are either a dark bottle green or a pencil olive at low saturation.' }
  ]
};

/* Flattened for the renderer, which wants arrays. Dark is deliberately
   absent from the grounds: there is nothing to sample it from, so if a
   page needs one it has to be argued for rather than drawn. */
var M_GROUND = {
  white:  MEASURED.grounds.white.hex,
  paper:  MEASURED.grounds.paper.hex,
  colour: MEASURED.grounds.colour.hex,
  dark:   '#1A1614'
};
var M_ACCENT = MEASURED.accents.map(function(a){ return a.hex; });

/* The weighted bag, so a draw matches the frequency in the work rather
   than treating thirteen colours as equally likely. Bottle green is one
   ticket in twenty-four. */
var M_BAG = [];
MEASURED.accents.forEach(function(a){
  for (var i = 0; i < (a.w || 1); i++) M_BAG.push(a.hex);
});
function pickAccent(r, from){
  var pool = from && from.length ? from : M_BAG;
  if (from && from.length){
    var bag = [];
    from.forEach(function(h){
      var a = MEASURED.accents.filter(function(x){ return x.hex === h; })[0];
      for (var i = 0; i < ((a && a.w) || 1); i++) bag.push(h);
    });
    pool = bag.length ? bag : from;
  }
  return pool[Math.floor(r * pool.length) % pool.length];
}
function accentNote(hex){
  var a = MEASURED.accents.filter(function(x){ return x.hex === hex; })[0];
  return a ? (a.name + ', off ' + a.from.join(' and ')) : hex;
}
