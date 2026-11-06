/* References. Work Noor likes but did not make.

   The thirteen claims in data.js were read off his own pictures:
   paintings, collages, photographs. Nine of them came back marked
   "nearly", and the reason was that the engine had read frequency as
   preference. A thing that recurs in a body of work is not thereby a
   rule of that work.

   This file exists to test the claims against a different kind of
   evidence. These are built artefacts, chosen rather than made:
   posters, boards, spreads, diagrams, maps, two actual websites. If a
   claim holds here as well as in the corpus, it is about taste. If it
   holds only in the corpus, it was about his hand.

   Read 6 November 2026. `says` is what the piece is. `tags` is the
   structural read, and only the structure, because what the engine
   needs from these is how a page is organised, not what it depicts.

   Nothing in this file is a preference. Counts are counts. The
   candidate claims at the bottom carry their counts so they can be
   argued with.                                                      */

const REFS = [
  /* ---- print, posters, boards, spreads ------------------------- */
  { id:'P01', file:'references/print/02ddf3062025a05d8a6adb2f84031980.jpg', kind:'print',
    says:'Humble Administrator’s Garden, Smell Map. A garden plan with soft colour blooms where the smells are, and a swatch legend along the foot.',
    tags:['map','plan','legend strip','soft colour','paper ground','dense small text'] },
  { id:'P02', file:'references/print/1d9713359babea6764062081e051bd3d.jpg', kind:'print',
    says:'A goldfish photograph with a lattice of labelled data cells built out of it and over it.',
    tags:['data over image','labelled cells','grid overlay','numbered','white ground'] },
  { id:'P03', file:'references/print/2970cb21d1e08c0dc86a2d6b3a24b450.jpg', kind:'print',
    says:'Swiss editorial board. Photographs placed at angles, a yellow wedge and a grey wedge cutting across, justified German text at top and bottom.',
    tags:['board','photo placement','colour wedge','dense small text','off grid','yellow accent'] },
  { id:'P04', file:'references/print/2ebd40a17dd69791fa8a79d139048d8b.jpg', kind:'print',
    says:'Thirty-odd small architectural specimens in a numbered grid, registration crosses at the intersections.',
    tags:['specimen grid','numbered','registration marks','white ground','many small plates'] },
  { id:'P05', file:'references/print/30ec69dbba2777f29cb371d347e5c994.jpg', kind:'print',
    says:'Meme Evolution. A radial infographic, blue spokes on the left, a red fan on the right, thumbnails pinned round the arc.',
    tags:['radial diagram','infographic','legend','thumbnails','paper ground','dense small text'] },
  { id:'P06', file:'references/print/53224c2218fabc68ce9b046421a6bc41.jpg', kind:'print',
    says:'Dense typed monospace with blocks of colour struck through it, printed rather than filtered.',
    tags:['dense small text','overprint','monospace','paper ground','process texture'] },
  { id:'P07', file:'references/print/53be2b63420caf7a55827ad5c400e788.jpg', kind:'print',
    says:'Red silhouetted cows laid over a photograph of a field, script lettering top and bottom, a letterspaced line through the middle.',
    tags:['flat colour over photo','silhouette','script type','two panel','letterspaced line'] },
  { id:'P08', file:'references/print/53d9c4596aab8728b1297b91fac5fc98.jpg', kind:'print',
    says:'Nine hand-painted posters in a three by three grid inside a black frame.',
    tags:['grid of plates','hand drawn','flat colour','many small plates'] },
  { id:'P09', file:'references/print/5586f21e1fc33b27c8baaf4d3aade67f.jpg', kind:'print',
    says:'The Solar System. Orbital rings on parchment with the labels set along the curves and a data legend at the foot.',
    tags:['diagram','type on path','paper ground','data legend','very sparse'] },
  { id:'P10', file:'references/print/64ce323475f882bb484f112f51cc8d73.gif', kind:'print',
    says:'Photographs arranged on the surface of a sphere that is not drawn, white all round them.',
    tags:['photo field','implied 3d','white ground','many small plates','no frame'] },
  { id:'P11', file:'references/print/660b06dfb29727aa29cb0ad7348e7f2f.jpg', kind:'print',
    says:'BLUE in sync. Riso poster, blue and brown panels, an orange starburst, doodles, and the poem repeated upside down.',
    tags:['riso','panels','hand drawn','rotated text','flat colour','poem'] },
  { id:'P12', file:'references/print/6af6a0f8b46ddaf9a9e202fae58f9c09.jpg', kind:'print',
    says:'Entwicklung des Vereins 1979 to 2010. A timeline drawn as overlapping fans of fine lines with dated nodes.',
    tags:['diagram','timeline','lines carry data','paper ground','soft colour'] },
  { id:'P13', file:'references/print/800ac4abe7a6af6f399b2871c2780a5c.jpg', kind:'print',
    says:'Fifty artworks arranged as a ring with the caption alone in the middle.',
    tags:['ring layout','many small plates','centred caption','very sparse'] },
  { id:'P14', file:'references/print/8a8a9c5cdc5d611d82801e8c48c26f5b.jpg', kind:'print',
    says:'The geosocial universe. A bubble diagram with labelled pills and the numbers in them.',
    tags:['diagram','bubbles','labelled cells','white ground','numbered'] },
  { id:'P15', file:'references/print/91XOGvyIHhL._AC_SY300_SX300_QL70_FMwebp_.webp', kind:'print',
    says:'A tiled grid of printed and embossed paper swatches, muted.',
    tags:['swatch grid','material','many small plates','process texture'] },
  { id:'P16', file:'references/print/9fffd981790d749903ce647c4a5af741.jpg', kind:'print',
    says:'A grid of ink dots, one colour per cell, soaking into the paper.',
    tags:['specimen grid','colour chart','paper ground','many small plates','process texture'] },
  { id:'P17', file:'references/print/Super_Riso_2_-_Hero_0.1.webp', kind:'print',
    says:'Super Riso 2. Magenta into yellow, green display type over it, the border scribbled in pencil.',
    tags:['riso','overprint','hand drawn','display type','flat colour','active border'] },
  { id:'P18', file:'references/print/a4aecf1a8b1e287f31ff772ecee7ed6e.jpg', kind:'print',
    says:'Coloured ellipses hanging in space, tied together with red lines, annotated by hand.',
    tags:['diagram','handwriting','lines carry data','soft colour','very sparse'] },
  { id:'P19', file:'references/print/aefdaecc547f1e3a4ae29550243d1abe.jpg', kind:'print',
    says:'Three vertical portfolio panels on gradient grounds, headings in script, a word search block, pencil notes in the margins.',
    tags:['panels','handwriting','gradient ground','annotation','dense small text'] },
  { id:'P20', file:'references/print/bc402b2e3af9079e0005093b587d3f31.jpg', kind:'print',
    says:'A network of printed colour rings joined by thin curves on white.',
    tags:['node network','lines carry data','white ground','very sparse','process texture'] },
  { id:'P21', file:'references/print/bf40a77d8289ce83ff891a833797f2e2.jpg', kind:'print',
    says:'A poster held open in two hands: hundreds of tiny screenshots strung along looping routes over a halftone ground, with one typed block.',
    tags:['halftone','drawn route','many small plates','dense small text','paper ground'] },
  { id:'P22', file:'references/print/d4674b05b6e6b5e149b95332098310ed.jpg', kind:'print',
    says:'A tour poster. Pale dots scattered on cream, a small block of caps in the bottom corner.',
    tags:['very sparse','paper ground','scatter','small caps block'] },
  { id:'P23', file:'references/print/download.png', kind:'print',
    says:'A sheet of layouts pinned together: photographs, handwriting, pink and purple duotones, notes to self.',
    tags:['board','handwriting','duotone','collage','dense small text'] },

  /* ---- sites, boards, spreads ---------------------------------- */
  { id:'S01', file:'references/sites/16de3e75de8936ae6f9eac323ce80756.jpg', kind:'site',
    says:'A building in cross-section with a different scene painted in every room, landscape behind it.',
    tags:['cutaway','cross section','cell per scene','many small plates','painted'] },
  { id:'S02', file:'references/sites/1f39b4d253266302b7e1d04f1fab6b9a.jpg', kind:'site',
    says:'An axonometric cutaway of a block, with plan fragments scattered behind it on white.',
    tags:['axonometric','cutaway','architectural','white ground','hand drawn'] },
  { id:'S03', file:'references/sites/2741ef314c88c15668904ff784c84703.jpg', kind:'site',
    says:'A yellow field with halftone figures standing in it, a justified letterspaced label row, then a photograph with the people knocked out in flat yellow.',
    tags:['flat colour over photo','halftone','letterspaced line','colour field band','yellow accent'] },
  { id:'S04', file:'references/sites/4755de72520c1feb376e451af7167f20.jpg', kind:'site',
    says:'A line-drawn studio interior with photographic objects collaged into it, one centred caption underneath.',
    tags:['line drawing','collage objects','white ground','very sparse','hand drawn'] },
  { id:'S05', file:'references/sites/479537f255e78110f71a6273bb1a97bd.jpg', kind:'site',
    says:'A numbered coordinate grid, nearly empty, with a few photographs and short glossary paragraphs set on it.',
    tags:['coordinate grid','numbered','very sparse','glossary labels','paper ground','lines carry data'] },
  { id:'S06', file:'references/sites/498de74d50e3f98d8c88838ebfb22e9d.jpg', kind:'site',
    says:'A dense architectural board. Drawings, photographs, yellow highlighter shapes, text blocks dropped wherever they fit, a data strip along the bottom.',
    tags:['board','dense small text','yellow accent','mixed media','footer data strip','many small plates'] },
  { id:'S07', file:'references/sites/63a07f5e5daccbf35cafa3f7bb1f66ad.jpg', kind:'site',
    says:'One continuous contour drawing of a person taking half the page, headings handwritten, the contents as a numbered list.',
    tags:['contour drawing','handwriting','numbered','white ground','very sparse'] },
  { id:'S08', file:'references/sites/68e6b933b830867d87571a11bf8af41b.jpg', kind:'site',
    says:'A Japanese spread. Line drawings of cutlery, floor labels at 2F and 3F, two photographs, columns of small text.',
    tags:['spread','line drawing','dense small text','paper ground','glossary labels'] },
  { id:'S09', file:'references/sites/6b57687832b7a7d1e697188137faed90.jpg', kind:'site',
    says:'An architecture board in two panels: an essay column under a vertical masthead, and a green axonometric with callouts over it.',
    tags:['board','axonometric','callouts','essay column','overlay colour','dense small text'] },
  { id:'S10', file:'references/sites/7ed57592569a0ba8a1315bcaec8a68a9.jpg', kind:'site',
    says:'Object Matrix. A justified essay poured into an irregular shape on the left, a ruled matrix of photographed objects on the right.',
    tags:['object matrix','grid overlay','dense small text','lines carry data','many small plates'] },
  { id:'S11', file:'references/sites/81861dda1490d72ef841b5cd9acea61e.jpg', kind:'site',
    says:'Graph paper, almost entirely empty, a handful of tiny figures and parasols joined by dotted lines.',
    tags:['graph paper','very sparse','tiny figures','lines carry data','paper ground'] },
  { id:'S12', file:'references/sites/88dd79120f0940cf2a8b4524ca012dbf.jpg', kind:'site',
    says:'A hand-drawn city map. Place names written by hand, blue routes, a legend box in the corner.',
    tags:['map','handwriting','drawn route','legend strip','paper ground','hand drawn'] },
  { id:'S13', file:'references/sites/8932fa63303ece75892528fab53bab50.jpg', kind:'site',
    says:'An architectural perspective in outline only, one figure in colour, one black panel, measurements annotated.',
    tags:['outline drawing','one figure in colour','annotation','very sparse','architectural'] },
  { id:'S14', file:'references/sites/9af0ef608e2c860005824bc967dd6b11.jpg', kind:'site',
    says:'The Knoll archive. Thumbnails tied together by hairline connectors across the whole window, browser chrome showing.',
    tags:['node network','thumbnails','lines carry data','white ground','many small plates','archive'] },
  { id:'S15', file:'references/sites/9ee0d0d628335380117de90f651a57cc.jpg', kind:'site',
    says:'An architectural section with photographs cut into the drawing, a pink grid behind, a scale bar across the bottom and code labels at the left.',
    tags:['section collage','scale bar','numbered','grid overlay','drawn plus photo','dense small text'] },
  { id:'S16', file:'references/sites/a0dfeb9a5b0efa79e2ace3310a895da2.jpg', kind:'site',
    says:'Mapping: Play. A long drifting chain of tiny collaged fragments along drawn routes, a quote block at the foot.',
    tags:['drawn route','many small plates','quote block','white ground','collage objects'] },
  { id:'S17', file:'references/sites/ae516df536fbaf03c7a556ba340e8bf6.jpg', kind:'site',
    says:'Kraft paper crossed by two rough red lines and a red grid, tiny figures standing about, a poem set vertically.',
    tags:['paper ground','lines carry data','grid overlay','vertical type','very sparse','poem','tiny figures'] },
  { id:'S18', file:'references/sites/afda56ccc6b056dbf036549ef44f70ae.jpg', kind:'site',
    says:'A nearly empty spread. Tiny figures, scattered dots, three small photographs, one paragraph in two languages.',
    tags:['very sparse','tiny figures','scatter','spread','many small plates'] },
  { id:'S19', file:'references/sites/c179522099358b49ba0808b3ecd12e2b.jpg', kind:'site',
    says:'A cream board of duotone photographs in blue and red, script annotation in pencil, hairline connectors between the items, one red stamp.',
    tags:['board','duotone','handwriting','lines carry data','paper ground','dense small text'] },
  { id:'S20', file:'references/sites/ca573847c331db0d14b1440cec9a6a6d.jpg', kind:'site',
    says:'A grad show poster. The title letterspaced into a grid of its own, photographs placed with red annotation beside them, a fragment of a map.',
    tags:['poster','letterspaced line','annotation','map','white ground'] },
  { id:'S21', file:'references/sites/f518309ee7f4e7258ecdc7c244012174.jpg', kind:'site',
    says:'Life in a Shoebox, a newspaper page. Exploded isometric interiors drawn in orange line with callout labels all over them.',
    tags:['exploded isometric','callouts','line drawing','numbered','white ground','dense small text'] }
];

/* Candidate claims read off the references, with their counts.

   These are not in the file yet and not in the move pool. They are
   written the way the thirteen were written so they can be marked
   true, nearly or false the same way. The counts are there so a
   "nearly" has something to push against.

   `holds` lists the references it was drawn from. `breaks` lists the
   references in the same set that contradict it. A claim with no
   counter-example has not been looked at hard enough.                */
const RCLAIMS = [
  { id:'r1',
    text:'A page is a map, a plan or a diagram before it is a stack of sections.',
    rule:'Work out the structure of the thing being described, then draw that. Do not reach for a sequence of bands down a page.',
    holds:['P01','P02','P05','P09','P12','P14','P18','P20','P21','S02','S05','S09','S10','S12','S13','S14','S15','S16','S21'],
    breaks:['P08','P17','S07'], n:19 },

  { id:'r2',
    text:'Density goes to one end or the other. Either everything is on the page and indexed, or the page is nearly empty.',
    rule:'Pick the extreme. A page that is two thirds full is the failure state.',
    holds:['P02','P03','P05','P06','P21','S06','S09','S10','S15','S19','P19','P23','S12',
           'P09','P10','P13','P16','P20','P22','S04','S07','S11','S17','S18','S05'],
    breaks:['P14','S20'], n:25 },

  { id:'r3',
    text:'The small label is a graphic element in its own right: numbers, coordinates, codes, legends, scale bars.',
    rule:'Number things. Label them. Put a legend or a scale somewhere. The annotation is part of the picture, not administration.',
    holds:['P01','P02','P04','P05','P09','P12','P14','S05','S06','S08','S09','S10','S12','S15','S20','S21'],
    breaks:['P08','P13','P22'], n:16 },

  { id:'r4',
    text:'The hand is visible. A drawn line, handwriting, pencil in the margin.',
    rule:'Something on the page should be made by hand, and look it. Not a handwriting typeface.',
    holds:['S04','S07','S12','S13','S16','S19','S21','S02','P11','P17','P18','P19','P23','P08'],
    breaks:['P14','S14','S20'], n:14 },

  { id:'r5',
    text:'Lines are everywhere, and every one of them carries something: a route, a connector, an orbit, a grid, a scale.',
    rule:'A line is allowed when it says where something goes or how big it is. A line that only separates two blocks is not.',
    holds:['P09','P12','P18','P20','P21','S05','S10','S11','S14','S15','S16','S17','S19','P01','S12'],
    breaks:[], n:15 },

  { id:'r6',
    text:'Flat colour gets laid over a photograph as though it were overprinted on it.',
    rule:'Knock a shape out of a photograph in one flat colour, or print a colour over it. Do not tint the whole image.',
    holds:['S03','P07','P17','S09','S15','S19','P23'], breaks:[], n:7 },

  { id:'r7',
    text:'Nothing here is dark. Across forty-four pieces not one page has a dark ground.',
    rule:'The ground is paper, cream, kraft, graph paper or white. A dark page has to be argued for from scratch.',
    /* Fourteen are paper, cream, kraft or graph paper. Twelve are white.
       The rest are a photograph or a drawing edge to edge. P08 has a
       black frame round nine bright plates, which is a frame and not a
       ground, so it is not a counter-example. */
    holds:['P01','P06','P09','P12','P22','S05','S08','S11','S17','S19','S18','P04','P10','P14','P20','S02','S04','S07','S14','S16','S20'],
    breaks:[], n:44 },

  { id:'r8',
    text:'Space gets drawn in projection: axonometric, isometric, cut away, in section.',
    rule:'When the subject occupies a space, draw the space in projection and cut it open rather than photographing it.',
    holds:['S01','S02','S09','S13','S15','S21','P01'], breaks:[], n:7 },

  { id:'r9',
    text:'Many small things beat one big thing. A set gets arranged as a set: a grid, a ring, a sphere, a chain.',
    rule:'When there is more than one of something, show all of them at once in an arrangement that has a shape.',
    holds:['P04','P08','P10','P13','P15','P16','P21','S10','S14','S16','S18','S01'],
    breaks:['P17','S04','S07'], n:12 },

  { id:'r10',
    text:'Yellow turns up again here, in work he did not make.',
    rule:'Unresolved. Yellow was marked "not necessarily" on the corpus. It recurs in the references too, which makes it a fact about what he is drawn to rather than a habit of his hand.',
    holds:['S03','S06','S09','P03','P05','P11','P17'], breaks:[], n:7 },

  { id:'r11',
    text:'Not one of these is a landing page. No hero, no call to action, no sections down a scroll.',
    rule:'A brief that asks for a landing page is asking for the one form this set contains no example of. Build it as a board, a map, a diagram or an index instead, and let the page say what it is at the top without performing.',
    holds:[], breaks:[], n:0, negative:true }
];

/* The cross-check.

   This is what the folder was actually for. The thirteen claims in
   data.js were read off work Noor made, so at best they describe a
   hand. These forty-four are work he picked out, so they describe an
   eye. A claim that holds in both is about taste. A claim that holds
   only in the corpus is about how he happens to draw, and has no
   business telling a model how to build someone else's page.

   `for` lists the references that carry the claim. `against` lists the
   ones that do the opposite, which matters more: a claim with nothing
   against it has not been looked at hard enough, and two of these have
   more against than for.

   Read by eye on 6 November 2026, piece by piece. The tag vocabularies
   in the two files were written separately and are not matched up
   automatically, on purpose. An automatic match would agree with
   itself.                                                            */
const CROSS = {
  c1:  { for:['P01','P05','P06','P09','P12','P16','P21','P22','S05','S08','S11','S12','S17','S19'],
         against:['P02','P04','P10','P14','P20','S02','S04','S07','S14','S16','S20','S21'] },
  c3:  { for:['P11','P17','P19','S03'],
         against:['P04','P09','P16','P20','P22','S05','S10','S11','S14','S18'] },
  c4:  { for:['P04','P08','P10','P13','P15','P16','P21','S01','S10','S14','S16','S18'],
         against:['P17','S04','S07'] },
  c5:  { for:['P02','P08','P17'], against:[] },
  c6:  { for:['P01','P09','P15','P16','S12'], against:[] },
  c7:  { for:[], against:[] },
  c8:  { for:['P06','P15','P16','P17','P20','P21','S03'], against:[] },
  c9:  { for:['P03','P23','S06','S15','S19'], against:[] },
  c10: { for:['P23','S04','S06','S15','S19'], against:[] },
  c11: { for:['P03','P23','S06','S19'],
         against:['P04','P13','P16','S05','S10','S14','S21'] },
  c12: { for:['P03','P05','P11','P17','S03','S06','S09'], against:[] },
  c13: { for:[], against:[] }
};

/* The verdict is derived, not written down, so it cannot drift away
   from the counts above when a reference is added or a claim changes.

   "corpus only" is the one that matters most. It means the claim was
   true of everything he made and appears in nothing he chose, which
   makes it a description of his hand. A hand does not transfer. Those
   claims should not be instructing a model about someone else's page.

   A claim is contested when the references push back about as hard as
   they carry it, at half the count or more. Twelve for and three
   against is not contested, it is carried. Fourteen for and twelve
   against is a claim that has not decided what it is yet.            */
function crossOf(id){
  var x = CROSS[id];
  if (!x) return null;
  var f = x.for.length, a = x.against.length;
  if (f === 0 && a === 0) return { f:f, a:a, verdict:'corpus only' };
  if (a >= f / 2)         return { f:f, a:a, verdict:'contested' };
  if (f <= 3)             return { f:f, a:a, verdict:'thin' };
  return { f:f, a:a, verdict:'cross-validated' };
}

/* Facts about the set rather than claims about taste. These go into
   the file as evidence because they are counts, and a count cannot be
   marked "nearly". */
const REF_FACTS = [
  'Forty-four pieces. Twenty-three print, twenty-one chosen as sites, though only two of the twenty-one are actually web pages.',
  'Dark grounds: zero.',
  'Rounded corners, soft shadows, cards: zero.',
  'Hero sections with a call to action: zero.',
  'Pieces organised as a map, plan, diagram or network: nineteen.',
  'Pieces carrying numbers, coordinates, codes, legends or a scale bar: sixteen.',
  'Pieces where something is drawn or written by hand: fourteen.',
  'Pieces that are either very dense or very sparse, with little in between: twenty-five.'
];
