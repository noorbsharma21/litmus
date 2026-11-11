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
    open:['Which one: A, B, C, D, or the four running together on one screen. Not assumed. The four-up page was meant as a viewing frame, and if that is what he means it is a structure in its own right: several live worlds as territories of one sheet.'],
    answer:'The four running together on one screen. Asked 7 November 2026.',
    instance:'For the surreal artist: several live worlds side by side as territories of one sheet. The frame built for comparing directions turned out to be the design, which is what showing candidates side by side is for: it surfaced a structure I would not have proposed.',
    candidate:'Possibly a construct, several different living worlds on one sheet rather than one idea. Not promoted until it holds on an unrelated brief.',
    tension:'STANDING refuses simple conventional organised blocks, and what he liked is a regular two by two grid. My reading is that the grid passes because every cell is a different living world, so the content breaks the stereotype rather than the layout. Unconfirmed. Offspring m3 isolates exactly this: the same four worlds in uneven territories.'
  },
  { id:'cr4', of:'made/round-1, forty pages across twenty briefs, commit 24dd320', date:'2026-11-09',
    said:'while I think these are really good, I think they\u2019re all inherently the same format: loud block color and then some shapes. You need to understand that I really like these pages overall, some more than the others, of course. There are chances to be made, but I feel like, while I\u2019ll review these still, what I need you to understand is that the style of these pages is technically all the same. My taste is bigger than that. This is all flat. I would like 3D objects in one. Some, I like the reuse of realistic images and pictures as well. I feel like currently it\u2019s all just these block-colored shapes that are populating this, which makes it very... I think even the interactions are not very diverse. I think we have a bigger purview that we can hit there.',
    confirms:['He likes the pages, some more than others. The flat graphic register is in his taste. It is one register, not the whole of it.'],
    changes:[
      'Range is part of the taste. Twenty briefs varied in structure and came out in one style, and he called that the failure. Across a batch, the work has to vary in material and behaviour as well as layout.',
      'Material: real three dimensional objects in some pieces, real photographs and images in others, flat graphics in others. Every page in round one was flat shapes drawn in code.',
      'Behaviour: every page in round one mapped the pointer position to one value. Interactions need their own range: scroll, drag and throw, physics, building by clicking, typing, sound, time.',
      'Colour: all five palettes were loud and flat. Colour also has to range.'
    ],
    cause:'Mine. Each rule added to keep slop out became part of one house style: no images because his paintings were refused, everything drawn in code, five saturated palettes, one kind of interaction. The guard rails converged into a look. The universe test checked structure and never checked material or behaviour, so it passed while the style collapsed.'
  },
  { id:'cr5', of:'made/round-2, twenty pages, commit 8587b48', date:'2026-11-10',
    said:'I prefer the third versions for almost all of them. I think the only thing that\u2019s missing right now is the fonts, their placement, and their visibility, which I think can be worked upon. I\u2019m asking a few questions because I feel like just highlighting feels a bit rudimentary. These have to be cleaner and more elegant, and things kind of have to be more human. See how I added the Pinterest references about how they kind of are more cohesive? This feels very done up, like you\u2019re trying to fit information.',
    confirms:['Round two over round one on almost every brief. Real material, real photographs and varied behaviour are his taste, not range for its own sake.'],
    refuses:['Text on a solid block of colour laid over an image, the highlighting. It was my cheapest way to pass the legibility rule and it makes every page read as labelling itself.',
             'Fitting the information in: addresses, hours, prices, taglines and headings stacked onto every page.'],
    changes:['Typography follows his references, which he pointed to as the model for cohesion. See TYPE below.']
  },
  { id:'cr6', of:'made/round-2 after the type pass, twenty pages, commit 8fc4f5f', date:'2026-11-10',
    said:'Okay, I’ll leave comments for all of them. I think the first one is cool in terms of type and stuff, but I feel like it’s a bit weird. I really like the 3D elements, but I feel like the wooden stand on which it’s there still looks fake, and I don’t like that. I also feel like mix-and-matching sometimes. For example, this one is so polished, and some text which is almost written, like it’s a scratch, or with pencil, might be cool to add. I obviously don’t really like the other two versions. The third one is the best. I don’t like Arda, the second one, the chef’s tasting menu. I think it’s too basic, and the text also doesn’t work. I think we could have done something fun with the second 2A version for that, but I think currently it’s just too basic. I also don’t like the color differences between it, and I think it just doesn’t work. The scroll depth is too much. I like the third one, and I like the way the gradient and stuff changes, but I think it doesn’t do a great job at delivering information. I think the font is also good, but in general, the page, outside of the luminosity, I think it could possibly have some sort of framing. I guess it’s generally simple and nice, but I think the way the information is presented could be more creative. I think the font here could be more experimental or gothic for sure. For these, I’m talking about the new versions. Put them all like 3C because the first two are just not good, like A and B. I think the photographer’s portfolio: I don’t like the font at all, and I also think that the Polaroid looks cheap. This one I don’t like at all, and I think 4A seems to be better, except the font is lame, and the images obviously need more refinement. In terms of number 5, a weekend guide to a city in Porto, I feel like the information presentation could be better. I think I also like the journey path in 5A, but that could possibly be a part of 5C as well. I think the font is again a problem. It’s very AI-related, and while the sun is a good effect, I think there is possibly potential for other elements of the website to be more interesting in terms of framing and effects as well. I think you’re sticking to the basics. I don’t really like 06 because I feel like you’re cracking the creativeness, but I feel like this seems to be, again, too fake. The 3D seems to be too basic, and I think we can do a better job. Make it look maybe even a bit grainier in some part. Flat looks very lame, and we can make it look more analog, perhaps. 07, I don’t understand at all. I think that is just not my taste. I don’t like 08. The font, and I think that effect, doesn’t go well. Perhaps some screen printing effect, cyanotype. We should work with those as well, like texturally rich formats. Again, I’m talking about HC here. I really like the ceramics one. I just feel like the background for this and the front, the pot itself, are really good. I think the platform on which it is could maybe be covered in a print or something, so there’s some break from monotony. I also don’t like the background too much. I think the font here somewhat works, but I think, in terms of guiding the user, the information is a bit too spread out for my liking. I think 09, I didn’t like so much. It’s too basic, I think. The font is also not fun at all. I think something like the movie seat one could be cool, but at least the 10B one: the movie seats are cool, but they also are not the most visible in terms of text. I like the record player, 11C, but I think, again, the problem with your 3D drawings is that it almost looks realistic, but then it almost feels like old internet because it’s not as perfect as it could be in today’s day and time. While in some places it could look cute, like in this one, I feel like, for example, I’m not too impressed. Also, the fonts are way too consistent. I don’t like this one. It also feels a little too AI, and I don’t like how the text is almost on top of the record player again. I think the placements could be played around with. Weather report: I think I like the zoom-in effect, but I think the font does not work still. Outside of that, I like STEM and R. I get quite a bit, but I think, in terms of dictating functionality or what the movement across would add as information, I’m still a bit confused about what that would be. I am not a fan of 14, the dance company. I don’t think it’s anything special, and I think it’s too basic. I don’t like the font and the white color on top of it. The font’s color is also important. It needs to match. Something beige here might have made more sense. Again, the same problem with the 3D here: the background for 15 is too green when you close the door. There are issues with the 3D because once it almost superimposes the door when it’s gone, the 3D is not done well at all, so it looks too weird. I don’t think I love that so much. 16 Bakery is also basic, but I feel like something cool, like the Daily Die, the bread pieces, would have been cool with cooler images. Also, the font you’re possibly just taking from three fonts again and again. Keel is very cool. I think I like that one. I don’t like the tattoo artist art at all, I think, because you’re trying to show the font. Still, the skin is a small part, so it doesn’t convey what it’s supposed to do too well. The bike cycle shop has the same issue. I don’t know what the issue is with generating images here. Claude, you can do that, I believe. Do a good job, do a better job, come on. Also, you’re constantly putting text over images so that we can’t see them. Here, in 19, I can’t see bearings or whatever text you’ve written. I can’t even read it because it’s on top of the cycle. The slowars one also has the same font you’ve used and the same placements. It’s making no sense to me.',
    pages:{
      '01c':'keep the 3D bottles; the wooden shelf looks fake; mix the polish with hand: pencil or scratched writing',
      '02c':'refused: too basic, text does not work, colour changes between courses do not work, too much scroll. 02a had something fun in it',
      '03c':'keep the luminosity on hold and the face; needs framing; information presented more creatively; type could be more experimental or gothic',
      '04c':'refused: font, and the polaroids look cheap. 04a better but its font is lame and the images need refining',
      '05c':'keep the sun; bring in the journey path from 05a; font reads as AI; framing and effects stuck at the basics',
      '06c':'refused: 3D too fake and too basic; wants grain, analog, not flat',
      '07c':'refused: not their taste, did not understand it',
      '08c':'refused: font and effect. Suggests screen print, cyanotype, texturally rich formats',
      '09c':'liked: the pot. Wants a print on the wheel platform, a different background, and the information less spread out',
      '10c':'(written as 09, the description is 10) too basic, font not fun. 10b’s cinema seats are good but their text was not visible',
      '11c':'likes the record player, not impressed; 3D realistic but imperfect reads as old internet; fonts too consistent across pages; feels AI; text near or on the object again; play with placement',
      '12c':'keep the zoom; the font still does not work',
      '13c':'liked; unclear what the movement tells you',
      '14c':'refused: too basic; white type on the photograph; type colour should match the picture, a beige here',
      '15c':'refused: too green when the drawer is shut; the 3D breaks, the drawer shows through the cabinet front',
      '16c':'basic; the bread pieces idea is good with better images; same three fonts again and again',
      '17c':'liked: Keel is very cool',
      '18c':'refused: the skin is a small part of the page so the idea does not land',
      '19c':'images: expects generated images, not placeholders; text over the wheel, unreadable',
      '20c':'refused: same font and same placements as the others; does not make sense'
    },
    refuses:[
      'Half realistic 3D. Objects that reach for realism and fall short read as old internet and fake (01 shelf, 06, 11, 15). Either finished to today’s standard or pushed into a made, analog look: grain, print, photocopy. Never the middle.',
      'Flat. Even after round two, surfaces with no grain or texture look lame to them.',
      'A small set of faces reused across a batch. Spectral, Libre Caslon and Times all came back again and again.',
      'White type by default on a photograph. Type takes its colour from the picture it sits with.',
      'Text that can land on the object. Fixed type over a full screen canvas will hit the object at some window size, as 19 did on their screen.',
      'Information scattered across the edges of the page (09c: corners and a spaced line along the foot). It does not guide.'
    ],
    changes:[
      'Texture is part of the taste: screen print, cyanotype, risograph, grain, photocopy. See SURFACE.',
      'Mixing registers on one page: polished 3D with a pencil note; a gothic face over a soft photograph.',
      'Information gets a frame or a vessel: a ticket, a border it runs around, a tag, a sleeve. Creative, gathered, not scattered.',
      'Every page in a batch gets its own face, and the faces range: gothic, experimental, hand, alongside the book serifs.'
    ],
    images:'They expect generated images. I have no image model in this session; there is no API key or local model on this machine. What I can do in code is take a photograph through a print process (cyanotype, riso, screen print, photocopy) so it reads as made. A real image model needs their decision: a key for one and the cost that comes with it.',
    open:[
      '09c: "the background for this and the front, the pot itself, are really good" and then "I also don’t like the background too much". Read as: the pot is good, the blue ground is not. Not confirmed.',
      'Whether "Put them all like 3C" means drop the a and b versions from now on (my reading) or make every page like 03c.'
    ]
  }
  ,{ id:'cr7', of:'made/round-3/01d, reviewed site by site from here on', date:'2026-11-10',
    said:'fro all the them the itlaicied font tyou fo automatically gives ai / also the text is overlapping / also.i tink the bootles shoud have difeernt prints on it not just text',
    method:'From this point Noor reviews one site at a time. Each note is recorded here as said, the lesson is named back in one line for correction, the site is fixed, and the lessons so far are applied to the next site before they see it.',
    lessons:[
      'All pages: italic used automatically for the second voice (captions, addresses, subtitles, notes) reads as AI. See t11.',
      'All pages: text must never collide with other text, at any window size. See t12.',
      'Candidate construct: the objects in a scene carry their own made surfaces, a print or a drawing, not a text label standing in for one. First instance: 01, each bottle its own printed label.'
    ]
  },
  { id:'cr8', of:'made/round-3/01d after cr7', date:'2026-11-10',
    said:'this is so dumb cause the images literaly are not allligned and they are cut up weirdly and the different backgrounds dont help / also the fotn is shit / lean aWAY from the beige bakcgorunds of these stupid sights',
    lessons:[
      'Repeated things share one system. Seven labels in a row had seven layouts, seven papers and sat at seven heights; they read as misaligned and cut up. Same size, same position, same paper, same face; the variation lives inside one window. See t13.',
      'A picture is cropped around its subject and centred in its frame, never cut arbitrarily by a cover crop.',
      'All pages: no beige, cream or off white paper grounds. I kept reaching for warm paper tones (F4F3EF, EFEDE8, ECEBE6 and others) even after cr1 refused beige. Grounds are white, black, or a committed colour. See s5.',
      'The type on 01 was refused (Libre Caslon spaced capitals on the labels and page, Reenie Beanie notes). Which one was meant is not confirmed; both replaced.'
    ]
  }
];

/* ---------------------------------------------------------------
   SURFACE. From cr6, 10 November 2026. Their words: grainier, analog,
   screen printing, cyanotype, texturally rich formats; flat looks lame.
   --------------------------------------------------------------- */
const SURFACE = [
  { id:'s1', rule:'No clean flat surface. Every page carries a material: paper grain, print texture, film grain, photocopy toner.' },
  { id:'s2', rule:'Photographs go through a process, not a filter: cyanotype, two colour riso with misregistration, screen print halftone, photocopy. The process is chosen for the brief (cyanotype for a press, riso for a record label), never the same one twice in a batch.' },
  { id:'s3', rule:'3D is either finished to today’s standard or rendered through an analog process (grain, dither, print). Never half realistic.' },
  { id:'s4', rule:'Polish and hand together: a pencil note beside a rendered object, a scratched label on a clean page.' },
  { id:'s5', rule:'No beige, cream or off white grounds, including paper tones. White, black, or a committed colour. (cr1, cr8)' }
];

/* ---------------------------------------------------------------
   TYPE. Read off the references he pointed to in cr5 (P03 P07 P09 P22
   S03 S05 S07 S08 S10 S18 S20 S21), 10 November 2026, for how type is
   handled, not what it says. Pointed to by him, so these stand.
   --------------------------------------------------------------- */
const TYPE = [
  { id:'t1', rule:'No block behind type. Type sits in clear space beside the image, or at a seam where two areas meet. Where it has to cross a picture, the picture is cropped or placed so the type lands on a calm part of it.',
    from:['S08','S18','S20','S21','S03','P07'] },
  { id:'t2', rule:'Small and few. Most type is caption size. At most one large element, and a large element behaves as image (cropped, running off the edge, script) rather than as a headline.',
    from:['P22','S05','P09','P07'] },
  { id:'t3', rule:'Type is placed on the composition\u2019s own geometry: a grid cell, a seam, an orbit, a margin, a corner. Aligned precisely, with air around it.',
    from:['S05','P09','S03','S20'] },
  { id:'t4', rule:'The photograph keeps its edges. Images are placed with margins and the type lives in the margins, the way a printed page holds a picture.',
    from:['S08','S18','S20','P03'] },
  { id:'t5', rule:'Say less. Keep what a visitor needs to act; let the rest go or sit in one quiet block. A line set across the full width, word spaced, can carry a whole set of facts.',
    from:['S03','P07','S21'] },
  { id:'t6', rule:'Human over corporate: italics for voice, page numbers and folios, captions like a book, the occasional hand.',
    from:['S07','S18','S08'] },
  /* added from cr6 */
  { id:'t7', rule:'One face per page, and no face twice in a batch. The range runs from book serifs to gothic, experimental and hand.', from:['cr6'] },
  { id:'t8', rule:'Type takes its colour from the picture it sits with (a beige from warm stage light), never white by default.', from:['cr6'] },
  { id:'t9', rule:'Information is gathered into one vessel that guides: a ticket, a tag, a frame it runs around, a sleeve. Corners plus a spread line is scattered. This qualifies t5.', from:['cr6'] },
  { id:'t10', rule:'Type that must stay readable gets space reserved for it in the layout. A canvas sits in a frame beside the type, so no window size can put the object under the words.', from:['cr6'] },
  { id:'t11', rule:'No automatic italics. Captions, addresses, subtitles and notes are set roman. Italic only where a face was chosen for its italic.', from:['cr7'] },
  { id:'t12', rule:'Text never collides with text. Anything placed against objects is measured against its neighbours at every window size, and wraps or shrinks before it touches.', from:['cr7'] },
  { id:'t13', rule:'Repeated elements share one system: same size, same position, same ground, same face, aligned. Variation lives inside the frame, not in the frame.', from:['cr8'] }
];
