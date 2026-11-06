/* Litmus engine, stage one.
   Every record below came from reading the piece. Nothing here is invented.
   `read:true` means the image was looked at and tagged. `read:false` is queued. */

/* BASELINE, the list of tags any competent designer would carry, sat
   here. It existed to be subtracted from the tags the engine read off
   each piece, and those reads are gone. */

const CORPUS = [
  { id:'art-01', src:'../images/art-01.jpg', kind:'drawing', read:true,
    note:'One figure drawn once, then printed four times on four different coloured papers.',
    tags:['constructed ground','coloured paper','repeat grid','recoloured variants','ink linework','flat colour field','face','no white','limited palette','high contrast'] },

  { id:'art-04', src:'../images/art-04.jpg', kind:'drawing', read:true,
    note:'Pen portrait sitting on a field of orange halftone dots. Two colours, nothing else.',
    tags:['constructed ground','halftone','two colour','ink linework','face','figure on pattern','no white','limited palette','high contrast'] },

  { id:'art-07', src:'../images/art-07.jpg', kind:'drawing', read:true,
    note:'Digital. Title set vertically up the left edge, cropped by the frame.',
    tags:['constructed ground','deep field','type runs off edge','vertical type','mirror symmetry','face','saturated','intentional composition'] },

  { id:'art-11', src:'../images/art-11.jpg', kind:'drawing', read:true,
    note:'Painting. Checkerboard runs down both sides with objects scattered in it.',
    tags:['border is active','checkerboard','painted','figure','objects in border','no white','high contrast'] },

  { id:'art-15', src:'../images/art-15.jpg', kind:'drawing', read:true,
    note:'Mirrored on the vertical axis. Entire frame cast red.',
    tags:['mirror symmetry','whole frame colour','dense ornament','repeat motif','face','limited palette'] },

  { id:'art-18', src:'../images/art-18.jpg', kind:'drawing', read:true,
    note:'The palette is printed along the bottom as six swatches. The work shows its own recipe.',
    tags:['palette declared','swatch strip','flat illustration','muted','object centre','limited palette','considered spacing'] },

  { id:'art-21', src:'../images/art-21.jpg', kind:'drawing', read:true,
    note:'Type crosses the whole image and is cut off by both edges.',
    tags:['constructed ground','halftone','type runs off edge','two colour','object centre','saturated','high contrast'] },

  { id:'art-24', src:'../images/art-24.jpg', kind:'drawing', read:true,
    note:'Sketchbook photographed on the desk it was made on. Swatch dots along the top.',
    tags:['palette declared','swatch dots','in situ','two colour','face','sketch','limited palette'] },

  { id:'roll-01', src:'../images/roll-01.jpg', kind:'photo', read:true,
    note:'A photograph of a sunset street, matted inside a photograph of sunflowers.',
    tags:['frame is another image','constructed ground','whole frame colour','street','no faces','warm cast','high contrast'] },

  { id:'roll-05', src:'../images/roll-05.jpg', kind:'photo', read:true,
    note:'Oval mask on a flat yellow field. The man is seen from behind.',
    tags:['non rectangular mask','constructed ground','whole frame colour','person from behind','no faces','yellow cast','limited palette'] },

  { id:'roll-09', src:'../images/roll-09.jpg', kind:'photo', read:true,
    note:'Four unrelated images pinned to graph paper. The paper is doing as much as the pictures.',
    tags:['constructed ground','graph paper','collage grid','mixed media','no faces','cool cast','considered spacing'] },

  { id:'roll-13', src:'../images/roll-13.jpg', kind:'photo', read:true,
    note:'Three bands stacked. Toy animals in low lamplight, nothing lit for the camera.',
    tags:['repeat grid','three band','objects not people','low light','warm cast','no faces','high contrast'] },

  { id:'art-02', src:'../images/art-02.jpg', kind:'drawing', read:true,
    note:'Kraft paper. A totem of botanical parts, mirrored down the middle, cut off top and bottom.',
    tags:['coloured paper','constructed ground','mirror symmetry','dense ornament','runs off edge','ink linework','two colour','no faces','no white','limited palette'] },

  { id:'art-03', src:'../images/art-03.jpg', kind:'drawing', read:true,
    note:'Three figures on kraft, drawn over each other so the arms pass through the bodies.',
    tags:['coloured paper','constructed ground','overlapping layers','repeat motif','ink linework','two colour','face','runs off edge','no white','high contrast'] },

  { id:'art-05', src:'../images/art-05.jpg', kind:'drawing', read:true,
    note:'One face with the eyes and mouth drawn four times across it. Orange dots behind.',
    tags:['halftone','constructed ground','mirror symmetry','repeat motif','face','two colour','ink linework','saturated','high contrast'] },

  { id:'art-06', src:'../images/art-06.jpg', kind:'drawing', read:true,
    note:'Four vertical bands. The same drawing on red, magenta, blue and yellow paper.',
    tags:['coloured paper','constructed ground','repeat grid','recoloured variants','four band','ink linework','face','saturated','no white'] },

  { id:'art-08', src:'../images/art-08.jpg', kind:'drawing', read:true,
    note:'Flat vector on plain white. A boy, a floating red hat, nothing else. The odd one out.',
    tags:['white ground','flat illustration','pastel','figure','empty space','muted','clear hierarchy','legible type'] },

  { id:'art-09', src:'../images/art-09.jpg', kind:'drawing', read:true,
    note:'Seen from above, face covered by a bag. Plastic wrap drawn over the whole image.',
    tags:['constructed ground','whole frame colour','face hidden','objects scattered','border is active','texture over everything','saturated','digital'] },

  { id:'art-10', src:'../images/art-10.jpg', kind:'drawing', read:true,
    note:'Oil. A checkerboard of thirty odd colours fills the frame. A hand holds a brush and an eye.',
    tags:['checkerboard','constructed ground','repeat grid','painted','many colours','objects not people','no white','high contrast'] },

  { id:'art-12', src:'../images/art-12.jpg', kind:'drawing', read:true,
    note:'Two fish mirrored into one shape. Orange ground with pale dots over it.',
    tags:['mirror symmetry','constructed ground','whole frame colour','painted','repeat motif','no faces','saturated','limited palette'] },

  { id:'art-13', src:'../images/art-13.jpg', kind:'drawing', read:true,
    note:'Four quadrants. The same figure on kraft, green, green and red paper.',
    tags:['coloured paper','constructed ground','repeat grid','recoloured variants','ink linework','no white','limited palette','considered spacing'] },

  { id:'art-14', src:'../images/art-14.jpg', kind:'drawing', read:true,
    note:'Kraft. A row of one eyed figures repeated and mirrored, running off both edges.',
    tags:['coloured paper','constructed ground','mirror symmetry','repeat motif','runs off edge','ink linework','two colour','no white','high contrast'] },

  { id:'art-16', src:'../images/art-16.jpg', kind:'drawing', read:true,
    note:'Pen face on white, orange dot grid behind, hair scrubbed in red crayon.',
    tags:['halftone','white ground','face','ink linework','two colour','repeat grid','high contrast'] },

  { id:'art-17', src:'../images/art-17.jpg', kind:'drawing', read:true,
    note:'Same build as the orange one, green dots, magenta hair. A pair, not a one off.',
    tags:['halftone','white ground','face','ink linework','two colour','repeat grid','recoloured variants','saturated'] },

  { id:'art-19', src:'../images/art-19.jpg', kind:'drawing', read:true,
    note:'HANDMAIDEN set vertically up the left edge and cut by the frame. Eyes repeated down a tentacle.',
    tags:['type runs off edge','vertical type','deep field','repeat motif','face','constructed ground','saturated','no white','intentional composition'] },

  { id:'art-20', src:'../images/art-20.jpg', kind:'drawing', read:true,
    note:'Two people on a line, on a cream circle, on dusty pink. Six swatches printed in the corner.',
    tags:['palette declared','swatch strip','flat illustration','constructed ground','whole frame colour','muted','figure','considered spacing','limited palette'] },

  { id:'art-22', src:'../images/art-22.jpg', kind:'drawing', read:true,
    note:'Charcoal Lincoln, heavy grain, one face filling the whole frame. No colour at all.',
    tags:['no colour','charcoal','face','grain','deep field','high contrast','intentional composition'] },

  { id:'art-23', src:'../images/art-23.jpg', kind:'drawing', read:true,
    note:'Oil. The crop cuts the face in half. Bees and vines sit on the skin.',
    tags:['painted','face','runs off edge','dense ornament','objects scattered','saturated','whole frame colour','high contrast'] },

  { id:'roll-02', src:'../images/roll-02.jpg', kind:'photo', read:true,
    note:'Four photographs stacked edge to edge. Rock, a plate close up, sepia dancers, a meadow.',
    tags:['collage grid','full bleed band','four band','no faces','mixed sources','warm cast','no white','high contrast'] },

  { id:'roll-03', src:'../images/roll-03.jpg', kind:'photo', read:true,
    note:'Three pictures on a yellow ground with yellow left around them.',
    tags:['constructed ground','whole frame colour','yellow cast','collage grid','offset panels','no faces','saturated','considered spacing'] },

  { id:'roll-04', src:'../images/roll-04.jpg', kind:'photo', read:true,
    note:'Four bands. Paint on knees, a table of food, trees, flowers. Nothing arranged for the camera.',
    tags:['collage grid','full bleed band','four band','no faces','in situ','warm cast','no white'] },

  { id:'roll-06', src:'../images/roll-06.jpg', kind:'photo', read:true,
    note:'Four bands, all shot in low light. Two shadows, a car at dusk, trees inverted, a lit wall.',
    tags:['collage grid','full bleed band','four band','low light','person from behind','no faces','saturated','high contrast'] },

  { id:'roll-07', src:'../images/roll-07.jpg', kind:'photo', read:true,
    note:'Three photographs laid on a photograph of the sky. The sky is the page.',
    tags:['ground is an image','constructed ground','collage grid','no faces','cool cast','considered spacing'] },

  { id:'roll-08', src:'../images/roll-08.jpg', kind:'photo', read:true,
    note:'Two paintings on acid yellow, set off from each other rather than aligned.',
    tags:['constructed ground','whole frame colour','yellow cast','offset panels','no faces','saturated','high contrast'] },

  { id:'roll-10', src:'../images/roll-10.jpg', kind:'photo', read:true,
    note:'A tent ceiling, a bracket fungus, the tent ceiling again. The same picture twice with one between.',
    tags:['collage grid','full bleed band','same image twice','three band','repeat motif','no faces','muted','low light'] },

  { id:'roll-11', src:'../images/roll-11.jpg', kind:'photo', read:true,
    note:'A black and white photograph of feet, laid on a painting of sunflowers.',
    tags:['ground is an image','constructed ground','whole frame colour','yellow cast','person from behind','no faces','mixed media','high contrast'] },

  { id:'roll-12', src:'../images/roll-12.jpg', kind:'photo', read:true,
    note:'Three photographs on yellow, overlapping at the corners instead of sitting in a grid.',
    tags:['constructed ground','whole frame colour','yellow cast','offset panels','overlapping layers','no faces','in situ','saturated'] },

  { id:'roll-14', src:'../images/roll-14.jpg', kind:'photo', read:true,
    note:'A word cloud band over a photograph of a branch on water. Type and picture, no join.',
    tags:['collage grid','full bleed band','type as texture','no faces','cool cast','mixed sources','considered spacing'] },

  { id:'roll-15', src:'../images/roll-15.jpg', kind:'photo', read:true,
    note:'Pictures pinned on a blue painting, at different sizes, corners overlapping.',
    tags:['ground is an image','constructed ground','whole frame colour','cool cast','offset panels','overlapping layers','person from behind','mixed media'] },

  { id:'roll-16', src:'../images/roll-16.jpg', kind:'photo', read:true,
    note:'A rendered room tilted off square, over a photographed wall of posters and tags.',
    tags:['ground is an image','tilted panel','constructed ground','low light','deep field','no faces','mixed media','high contrast'] },


];

/* ---------------------------------------------------------------
   The reference pole. Not Noor's work, and not admired either.
   This is what the design internet agrees on, counted rather than
   assumed, so the gap between it and the corpus above is measurable.

   Read from siteinspire's own style filter, 30 October 2026. The
   numbers are how many sites in that gallery carry each tag.
   --------------------------------------------------------------- */
const FIELD = [
  { tag:'Minimal',           n:847, stance:'avoid', mine:'build the ground before anything goes on it' },
  { tag:'Grid Layout',       n:672, stance:'avoid', mine:'offset the panels, let corners cross' },
  { tag:'Unusual Layout',    n:671, stance:null, mine:null },
  { tag:'Use of Animation',  n:457, stance:null, mine:null },
  { tag:'Black & White',     n:451, stance:'avoid', mine:'cast colour over the whole frame' },
  { tag:'Big Type',          n:391, stance:'avoid', mine:'let the frame cut the type rather than sizing it up' },
  { tag:'Unusual Navigation',n:368, stance:null, mine:null },
  { tag:'Editorial',         n:273, stance:null, mine:null },
  { tag:'Colourful',         n:267, stance:null, mine:null },
  { tag:'Illustrative',      n:204, stance:null, mine:null },
  { tag:'Corporate',         n:204, stance:null, mine:null },
  { tag:'Greyscale',         n:126, stance:null, mine:null },
  { tag:'Monochrome',        n:101, stance:null, mine:null },
  { tag:'Luxury',            n:96,  stance:null, mine:null },
  { tag:'Horizontal Layout', n:49,  stance:'lean',  mine:'stack bands edge to edge, full bleed' },
  { tag:'Retro & Vintage',   n:28,  stance:null, mine:null },
  { tag:'Pattern',           n:19,  stance:'lean',  mine:'halftone, checkerboard, repeat grid, mirrored motif' },
  { tag:'Use of Infographics',n:13, stance:null, mine:null },
  { tag:'Japanese',          n:10,  stance:null, mine:null }
];

/* What the galleries put in the search box as a suggestion, which is
   the clearest statement of house style they make. Land-book, same day. */
const FIELD_PROMPTS = [
  'SaaS dashboard', 'Gradient in background', 'Outline Illustration', 'Big blue button'
];

/* Claims are generated from the kept tags, then written as something arguable.
   `from` lists the pieces the claim was drawn out of. `against` lists the
   pieces in the same corpus that break it. A claim with no counter-example
   has not been tested hard enough. */
const CLAIMS = [
  { id:'c1', colour:'#FF3E00',
    text:'The ground is built before anything is put on it. Rarely a default white.',
    rule:'Choose the ground before the subject and give it a treatment of its own.',
    tags:['constructed ground','no white'],
    from:['art-01','art-02','art-04','art-06','art-07','art-13','art-21','roll-01','roll-05','roll-09'],
    against:['art-08','art-16','art-17'] },


  { id:'c3', colour:'#151DE0',
    text:'Colour arrives as a cast over the whole frame, not as an accent on one element.',
    rule:'Flood the field. Never pick one element out in colour against a neutral.',
    tags:['whole frame colour','warm cast','yellow cast','cool cast','two colour'], from:['art-15','roll-01','roll-05','roll-09','art-21'] },

  { id:'c4', colour:'#9D70C0',
    text:'The work repeats itself: grids, mirrors, the same figure recoloured.',
    rule:'Say it more than once. Four of the same beats one of each.',
    tags:['repeat grid','mirror symmetry','repeat motif','recoloured variants','three band'], from:['art-01','art-15','art-07','roll-13'] },

  { id:'c5', colour:'#833405',
    text:'The frame is active. A border holds another image, a mask, or objects of its own.',
    rule:'The border is part of the work, not the space left over.',
    tags:['frame is another image','border is active','non rectangular mask','graph paper'], from:['art-11','roll-01','roll-05','roll-09'] },

  { id:'c6', colour:'#404C25',
    text:'The palette gets declared inside the work, as swatches on the piece itself.',
    rule:'Show the recipe. Put the colours used somewhere in the frame.',
    tags:['palette declared','swatch strip','swatch dots'], from:['art-18','art-24'] },

  { id:'c7', colour:'#D0402F',
    text:'Type is laid over the image and allowed to run off the edge.',
    rule:'Do not fit the words inside the picture. Let the frame cut them.',
    tags:['type runs off edge','vertical type'], from:['art-07','art-21'] },

  { id:'c8', colour:'#FF3E00',
    text:'Halftone dots recur as a texture, carried over from print.',
    rule:'Texture comes from a printing process, not a filter laid on top.',
    tags:['halftone'], from:['art-04','art-05','art-16','art-17','art-21'],
    against:['art-09'] },

  { id:'c9', colour:'#151DE0',
    text:'Photographs are never shown one at a time. They arrive in stacks of three or four.',
    rule:'Put several images together. One picture on its own is not a composition.',
    tags:['collage grid','full bleed band','four band','three band'],
    from:['roll-02','roll-04','roll-06','roll-09','roll-10','roll-14'], against:[] },

  { id:'c10', colour:'#8EA066',
    text:'The ground under a picture is often another picture, not a colour.',
    rule:'When you need a backdrop, reach for an image before you reach for a fill.',
    tags:['ground is an image','frame is another image'],
    from:['roll-01','roll-07','roll-11','roll-15','roll-16'], against:['roll-03','roll-08'] },

  { id:'c11', colour:'#D0402F',
    text:'Nothing sits square. Panels are offset, tilted, or overlapping at the corners.',
    rule:'Break the alignment on purpose. Let edges cross instead of meeting.',
    tags:['offset panels','tilted panel','overlapping layers'],
    from:['roll-03','roll-08','roll-12','roll-15','roll-16','art-03'],
    against:['roll-02','roll-04','art-13'] },

  { id:'c12', colour:'#833405',
    text:'Yellow keeps returning as the ground, more than any other colour.',
    rule:'When a flat colour has to carry the page, try yellow first.',
    tags:['yellow cast'],
    from:['roll-03','roll-05','roll-08','roll-11','roll-12','art-05','art-16'], against:[] },

  { id:'c13', colour:'#9D70C0',
    text:'The same image appears twice inside one piece, recoloured or plain repeated.',
    rule:'Reuse the asset in the same frame. Repetition is the finish, not laziness.',
    tags:['same image twice','recoloured variants','repeat motif'],
    from:['art-01','art-06','art-13','art-17','roll-10','art-05'], against:[] }
];

/* The judgment deck used to sit here: 50 specimens, 44 ladders, 94
   cards, 24 corpus assumptions, and the weights for scoring answers to
   them. Noor killed the method outright: "again these are too specific
   we want more general rules". None of the 94 was ever judged, and the
   24 assumptions were driving THE FIELD in every prompt the engine
   produced, which means the field was my guesses wearing his name.

   What replaced it is in compare.js. Nothing enters the file now unless
   he chose between two things that are both well made and said why. */

const PHRASE = 'The long way round';
