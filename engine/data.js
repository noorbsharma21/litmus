/* Litmus engine, stage one.
   Every record below came from reading the piece. Nothing here is invented.
   `read:true` means the image was looked at and tagged. `read:false` is queued. */

const BASELINE = [
  'limited palette', 'high contrast', 'considered spacing',
  'clear hierarchy', 'legible type', 'intentional composition'
];

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

  { id:'art-02', src:'../images/art-02.jpg', kind:'drawing', read:false, tags:[] },
  { id:'art-03', src:'../images/art-03.jpg', kind:'drawing', read:false, tags:[] },
  { id:'art-05', src:'../images/art-05.jpg', kind:'drawing', read:false, tags:[] },
  { id:'art-06', src:'../images/art-06.jpg', kind:'drawing', read:false, tags:[] },
  { id:'art-08', src:'../images/art-08.jpg', kind:'drawing', read:false, tags:[] },
  { id:'art-09', src:'../images/art-09.jpg', kind:'drawing', read:false, tags:[] },
  { id:'art-10', src:'../images/art-10.jpg', kind:'drawing', read:false, tags:[] },
  { id:'art-12', src:'../images/art-12.jpg', kind:'drawing', read:false, tags:[] },
  { id:'art-13', src:'../images/art-13.jpg', kind:'drawing', read:false, tags:[] },
  { id:'art-14', src:'../images/art-14.jpg', kind:'drawing', read:false, tags:[] },
  { id:'art-16', src:'../images/art-16.jpg', kind:'drawing', read:false, tags:[] },
  { id:'art-17', src:'../images/art-17.jpg', kind:'drawing', read:false, tags:[] },
  { id:'art-19', src:'../images/art-19.jpg', kind:'drawing', read:false, tags:[] },
  { id:'art-20', src:'../images/art-20.jpg', kind:'drawing', read:false, tags:[] },
  { id:'art-22', src:'../images/art-22.jpg', kind:'drawing', read:false, tags:[] },
  { id:'art-23', src:'../images/art-23.jpg', kind:'drawing', read:false, tags:[] },
  { id:'roll-02', src:'../images/roll-02.jpg', kind:'photo', read:false, tags:[] },
  { id:'roll-03', src:'../images/roll-03.jpg', kind:'photo', read:false, tags:[] },
  { id:'roll-04', src:'../images/roll-04.jpg', kind:'photo', read:false, tags:[] },
  { id:'roll-06', src:'../images/roll-06.jpg', kind:'photo', read:false, tags:[] },
  { id:'roll-07', src:'../images/roll-07.jpg', kind:'photo', read:false, tags:[] },
  { id:'roll-08', src:'../images/roll-08.jpg', kind:'photo', read:false, tags:[] },
  { id:'roll-10', src:'../images/roll-10.jpg', kind:'photo', read:false, tags:[] },
  { id:'roll-11', src:'../images/roll-11.jpg', kind:'photo', read:false, tags:[] },
  { id:'roll-12', src:'../images/roll-12.jpg', kind:'photo', read:false, tags:[] },
  { id:'roll-14', src:'../images/roll-14.jpg', kind:'photo', read:false, tags:[] },
  { id:'roll-15', src:'../images/roll-15.jpg', kind:'photo', read:false, tags:[] },
  { id:'roll-16', src:'../images/roll-16.jpg', kind:'photo', read:false, tags:[] },
  { id:'disco',  src:'../images/disco.png', kind:'built', read:false, tags:[] },
  { id:'disco-explore', src:'../images/disco-explore.png', kind:'built', read:false, tags:[] },
  { id:'disco-about',   src:'../images/disco-about.png',   kind:'built', read:false, tags:[] }
];

/* Claims are generated from the kept tags, then written as something arguable.
   `from` lists the pieces the claim was drawn out of. */
const CLAIMS = [
  { id:'c1', colour:'#FF3E00',
    text:'The ground is always built. Never a default white, never a plain edge.',
    rule:'Choose the ground before the subject and give it a treatment of its own.',
    tags:['constructed ground','no white'], from:['art-01','art-04','art-07','art-21','roll-01','roll-05','roll-09'] },

  { id:'c2', colour:'#8EA066',
    text:'Drawings are faces. Photographs have no faces in them at all.',
    rule:'A person drawn is seen head on. A person photographed is seen from behind, or not at all.',
    tags:['face','no faces','person from behind'], from:['art-01','art-04','art-15','art-24','roll-01','roll-05','roll-13'] },

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
    tags:['halftone'], from:['art-04','art-21'] }
];
