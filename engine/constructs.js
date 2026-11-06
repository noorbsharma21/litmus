/* Constructs. The unit of evidence after the rebuild.

   A construct is a quality with two ends, written in Noor's words, with
   the sites that anchor each end. It comes from a triad: three pieces of
   excellent work, which two belong together, and what the third does
   instead. That is Kelly's repertory grid, and it exists because pairs
   only tell you which way someone leans on a dimension you chose for
   them. Triads let the dimension come from them.

   Two rules hold this file honest.

   Construct and instance are kept apart. A construct has to carry over
   to any brief: a wine shop, a menu, a show poster. An instance is a
   choice that is right for one brief only. Refining one prompt must not
   turn into "this is what Noor's work looks like", or every future brief
   comes back as a surreal artist's website.

   No construct may name a medium. If a construct says "3D" every brief
   converges on a WebGL world, which is one look. mediumSpread() checks
   that the end he prefers is anchored by sites in at least two different
   media. Every construct from round one passes, and that is a finding in
   itself: what he likes spans plain HTML net art and WebGL games, so his
   taste is not a technology.                                         */

const SITES = {
  bruno:  { name:'Bruno Simon',         url:'https://bruno-simon.com',        medium:'webgl' },
  raf:    { name:'Rafaël Rozendaal', url:'https://www.newrafael.com',      medium:'net art' },
  lando:  { name:'Lando Norris',        url:'https://landonorris.com',        medium:'cinematic scroll' },
  msg:    { name:'Messenger',           url:'https://messenger.abeto.co',     medium:'webgl' },
  laurel: { name:'Laurel Schwulst',     url:'https://laurelschwulst.com',     medium:'html' },
  jodi:   { name:'JODI',                url:'https://jodi.org',               medium:'net art' },
  petra:  { name:'Petra Cortright',     url:'https://www.petracortright.com', medium:'net art' },
  feix:   { name:'Studio Feixen',       url:'https://www.studiofeixen.ch',    medium:'motion graphics' },
  igloo:  { name:'Igloo Inc',           url:'https://www.igloo.inc',          medium:'webgl' },
  olia:   { name:'Olia Lialina',        url:'https://art.teleportacia.org',   medium:'net art' },
  ll:     { name:'Lundgren+Lindqvist',  url:'https://www.lundgrenlindqvist.se', medium:'html' },
  lusion: { name:'Lusion',              url:'https://lusion.co',              medium:'webgl' },
  arena:  { name:'Are.na',              url:'https://www.are.na',             medium:'html' },
  te:     { name:'Teenage Engineering', url:'https://teenage.engineering',    medium:'product commerce' },
  ig:     { name:'Immersive Garden',    url:'https://immersive-g.com',        medium:'webgl' }
};

/* Round one, 6 November 2026, for the surreal artist's website. His
   answers are quoted as he wrote them. */
const TRIADS = [
  { id:'t1', sites:['bruno','raf','lando'], together:['raf','bruno'], third:'lando',
    said:'i really like rafael and bruno is world building but i dont like lando at all its too techy cheap loojinh' },
  { id:'t2', sites:['msg','laurel','jodi'], together:['msg','jodi'], third:'laurel',
    said:'messenger is also ber cool / i love the effectd of jodi as well it is bery goriundbreaking / Jodi is basic i jate it',
    unsure:'He wrote "Jodi is basic" right after calling JODI groundbreaking. Read as Laurel Schwulst, the third site in the triad and the only one he did not otherwise mention. Unconfirmed.' },
  { id:'t3', sites:['petra','feix','igloo'], together:['petra','igloo'], third:'feix',
    said:'Ia lso enjuoy petra cortright / igloo is immersive and cool ireally liek it , hate the normalcy of studio feixen' },
  { id:'t4', sites:['olia','ll','lusion'], together:['olia','ll'], third:'lusion',
    said:'i really liekd 4 Olia Lialina / Lundgren+Lindqvist both of thse',
    unsure:'What joins Olia and Lundgren+Lindqvist was not said, and nothing was said about Lusion. Liked, not yet understood.' },
  { id:'t5', sites:['arena','te','ig'], together:null, third:'te',
    said:'i hate teenager engineering',
    unsure:'Only the refusal is known. Nothing on Are.na or Immersive Garden.' }
];

const CONSTRUCTS = [
  { id:'k1', from:'t1',
    good:{ words:'world building', exemplars:['raf','bruno'] },
    bad: { words:'too techy, cheap looking', exemplars:['lando'] },
    note:'Lando is the most expensive-looking site in the set and he called it cheap. Polish of the conventional kind reads as cheap to him. In round one of the pairs he also said he "liked lando’s 3d designs". Next to Rozendaal instead of only Bruno, that went to "dont like at all". The context changed the verdict, which is what triads are for.' },

  { id:'k2', from:'t3',
    good:{ words:'immersive', exemplars:['igloo','petra'] },
    bad: { words:'normalcy', exemplars:['feix'] },
    note:'Feixen beat Are.na in pair x2 on motion graphics, and here it is the normal one. Both are true. Winning a pair says better than that one site, never good. A pair result is stored as a ranking against its opponent and nothing more.' },

  { id:'k3', from:'t2',
    good:{ words:'groundbreaking', exemplars:['jodi','msg'] },
    bad: { words:'basic', exemplars:['laurel'] },
    note:'Rests on reading "Jodi is basic" as Laurel. If that reading is wrong, this construct is wrong.' , unsure:true }
];

/* f1 from the pairs, restated as a construct so all of it lives in one
   shape. It was the only finding before the triads and it still holds:
   nothing in round one contradicts it. */
const F1_AS_CONSTRUCT = {
  id:'k0', from:'x1 x2 x3',
  good:{ words:'a system that answers you', exemplars:['bruno','ll'] },
  bad: { words:'a sequence that plays at you', exemplars:['lando'] }
};

/* A hypothesis across all five triads. Written by me, so it is not a
   construct and does not go in the hard part of the file until he says
   yes or no to it. Every site he liked is either an artwork that is a
   website (Rozendaal, JODI, Petra, Olia) or a world you enter (Bruno,
   Messenger, Igloo). Every site he refused is a well made container for
   something else: a driver, a studio’s output, a product range, a
   designer’s projects. Lundgren+Lindqvist is the exception, a studio
   site he likes, and Lusion is a studio he passed over in silence. */
const HYPOTHESES = [
  { id:'h1', text:'The site is the work, not a container for the work.',
    holds:['raf','jodi','petra','olia','bruno','msg','igloo'],
    breaks:['ll'], status:'mine, unconfirmed' }
];

/* Instance answers for one brief. These are never read as taste. */
const INSTANCES = {
  'surreal-artist': {
    brief:'A personal website for a surreal artist.',
    closest:{},
    note:'He did not answer "closest for the surreal artist" for any triad. Nothing is recorded as instance yet, rather than guessed.'
  }
};

function mediumSpread(k){
  var m = {};
  (k.good.exemplars || []).forEach(function(s){ if (SITES[s]) m[SITES[s].medium] = 1; });
  return Object.keys(m);
}
function constructPasses(k){
  return mediumSpread(k).length >= 2;
}
