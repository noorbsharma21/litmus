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

  { id:'k2', from:'t3', conditional:true,
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

/* My hypothesis h1, "the site is the work, not a container for the
   work", was put to him and he answered with something better. Kept
   here as a record of what was replaced, not as evidence. His version
   explains the exception mine could not: Lundgren+Lindqvist is a studio
   site, a container, and he likes it because it refuses the organised
   block layout. That is also what joins it to Olia Lialina, which was
   the open question on triad t4. */
const HYPOTHESES = [
  { id:'h1', text:'The site is the work, not a container for the work.',
    status:'replaced by his own words in STANDING, 6 November 2026' }
];

/* ---------------------------------------------------------------
   His answer to h1, in the shape he gave it. This shape is the
   universe mechanism he asked for: one rule that always holds, two
   routes to satisfy it depending on the occasion, and qualities that
   appear in some pieces and not in others. Different briefs take
   different routes and carry different qualities, so they cannot all
   come out looking the same, while all of them still break the
   stereotype.

   He wrote:
     "i like people that reject simple conventional organised blocks
      and breaks the stereotype
      i like immersive but only in some occasions
      i liek in others for it to have cool elements whcih aare
      artistivc and generated specifically for thatt website
      there is novelty freshness and this idea of pre interenet also
      in some"
   --------------------------------------------------------------- */

const STANDING = {
  id:'k4',
  good:{ words:'rejects simple conventional organised blocks and breaks the stereotype',
         exemplars:['ll','olia','jodi','bruno'] },
  bad: { words:'simple conventional organised blocks', exemplars:['feix','te'] },
  note:'His top-level construct, stated directly rather than drawn out of a triad. k1, k2 and k3 sit under it: "techy, cheap looking", "normalcy" and "basic" are all names for the organised block. The organised block is also what this engine produced for weeks, a stack of bands down a page, and the matrix structure in structure.js is a grid of numbered cells, which is at risk of being exactly this.'
};

/* Two routes. One of them carries a piece, depending on the occasion.
   The condition that decides between them has not been given, and is
   not invented here: the next step asks him to sort real briefs into
   the two, because a condition comes out when you are looking at an
   occasion, not when you are asked for one in the abstract. */
const ROUTES = [
  { id:'r-immersive', words:'immersive', when:null,
    said:'i like immersive but only in some occasions',
    exemplars:['igloo','petra','bruno','msg'],
    note:'k2 used to be a standing construct. It is a route now, held to some occasions. The first draft of this route listed only Igloo, Bruno Simon and Messenger, all three of them WebGL, and the medium check refused it: it would have taught a model that immersive means 3D. Petra Cortright is here on his own evidence, since he paired her with Igloo in t3 under "immersive and cool", and her site is not 3D.' },
  { id:'r-made', words:'cool elements which are artistic and generated specifically for that website', when:null,
    said:'i liek in others for it to have cool elements whcih aare artistivc and generated specifically for thatt website',
    exemplars:['raf','petra','jodi'],
    proposed:true,
    note:'He did not name sites for this route. Rozendaal, Petra Cortright and JODI are my proposal, because each makes the visual elements for the site rather than placing existing ones on it. Unconfirmed. It also means the structures should stop composing with his archive of old drawings: under this route the elements have to be made for the brief in front of them.' }
];

/* Present in some, not required in any. A quality is a vocabulary to
   reach for when the piece has a reason, the same as the moves held in
   reserve. */
const QUALITIES = [
  { id:'q-novelty',  words:'novelty' },
  { id:'q-fresh',    words:'freshness' },
  { id:'q-preweb',   words:'this idea of pre internet',
    unsure:'Two readings and they lead to different work. Either the early web before platforms and templates, the 1990s of Olia Lialina and JODI. Or before screens altogether, the print, riso and hand-drawn material his reference folder is full of. Not chosen on his behalf.' }
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

/* ---------------------------------------------------------------
   Critiques of things the engine made. Step three of the method: a
   concrete attempt, and his reaction to it in his own words. Each
   critique is sorted into what it refuses, what it confirms, and what
   it changes, and the raw text is kept so the sorting can be checked.
   --------------------------------------------------------------- */
const CRITIQUES = [
  { id:'cr1', of:'made/surreal-artist, first version, commit 2cd0ba0', date:'2026-11-06',
    said:'this uses AI tropes with the dot between 16 head and 03 body. The heading and the fonts are all very AI-native, very normally used in AI. I don’t like the formatting. It’s not innovative. It is very basic. I can actively see how AI sort of comes into this, and I feel like there is no interactivity. I don’t understand what type of figure 10,009,333 or 13,000 even means. That’s so stupid, and this just looks deeply horrible. There isn’t much experimentation in terms of colors. We’re not doing anything groundbreaking. I like that you’re trying to do those markers using arrows, and I like that, but I hate the font. I hate the presentation of it, and I feel like even in terms of narrative, it’s not really making sense to me. I know you put just all of this as placeholders, but it’s just very dull and dry. I also don’t like these beige backgrounds',
    refuses:['c-dot','c-font','c-count','c-beige','c-dry','c-instruct'],
    confirms:['c-markers'],
    changes:[
      'k0 is refined. The page had working interactions, press to swap, choose to send, make it whole, and he felt none of it. Clicking to change something does not count as answering you. It has to respond the moment the pointer moves.',
      'STANDING was failed by the page around the figure. A figure on the left, labels on the right and a paragraph underneath is a conventional arrangement, however unusual the figure in it.',
      'The measured grounds are demoted. Thirteen paper grounds in the references became a beige site, and he hates beige. Measurement describes the references; it does not get to choose.',
      'Colour has to be experimented with. A ground, an ink and one accent is the safe scheme and reads as basic.'
    ],
    instance:'The cadavre exquis concept did not come across as a story: "even in terms of narrative, it’s not really making sense to me". Recorded against this brief only, not as a refusal of the idea.'
  },
  { id:'cr2', of:'made/surreal-artist, second version: torn holes in a colour wall', date:'2026-11-06',
    said:'This is a little odd because I feel like, while it\u2019s cool, I really don\u2019t like the art style, and I think it\u2019s not very cohesive. I don\u2019t like the copy you\u2019re attaching to it.',
    confirms:['k0 as refined in cr1: the hole follows the pointer from the first movement and he called it cool, after calling the clickable first version as having no interactivity at all.'],
    refuses:['The colour cycling of the second version, where every rim, label and button drew a different accent at random.'],
    changes:[
      'Experimenting with colour does not mean a different colour on every element. It needs a palette chosen as one thing. Each wall now takes a combination that appears together in one reference: P17, P08, S03, P11 or P07.',
      'The pattern across cr1 and cr2: what came from evidence improved (felt interaction, markers, measured colour). What I authored on my own judgment failed every time: the type, the copy and now the art style. The engine cannot author voice or art style for him. Those have to come from him, or from the client in the brief.'
    ],
    open:[
      'Art style: the paintings themselves, which are his own corpus standing in for the artist, or the treatment of torn holes, flat walls and labels. Not guessed.',
      'The copy: invented titles in my voice, plus "write to her" and "close them". What the labels should say instead is his call.'
    ]
  },
  { id:'cr3', of:'made/surreal-artist/directions, four directions side by side, commit 900a74e', date:'2026-11-07',
    said:'this is uber cool',
    confirms:[
      'The first piece made from the file that he liked. What changed from the two he refused: every direction was built from a site he had named, his own paintings were removed, and my writing was cut to her name and plain nouns. The parts he kept liking (felt interaction, markers, palettes taken from one reference) stayed.',
      'Showing several genuinely different candidates at once got further in one round than three rounds of revising one guess.'
    ],
    open:['Which one: A, B, C, D, or the four running together on one screen. Not assumed. The four-up page was meant as a viewing frame, and if that is what he means it is a structure in its own right: several live worlds as territories of one sheet.']
  }
];
