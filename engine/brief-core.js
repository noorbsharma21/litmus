/* Litmus brief, the shared part. Used by the guided first page (../index.html)
   and the full form (brief.html), so both write the same prompt. Expects the
   engine files loaded first, and a global S holding the brief. */
const BRIEFS = { '01':'A natural wine shop', '02':'A chef’s tasting menu', '03':'A poster for one night of music', '04':'A photographer’s portfolio', '05':'A weekend guide to a city', '06':'A studio archive, 1979 to 2010',
  '07':'An architecture practice', '08':'A small press and bookshop', '09':'A ceramics studio selling pots', '10':'A film festival, one week', '11':'An independent record label', '12':'An independent magazine', '13':'A florist',
  '14':'A dance company’s season', '15':'A museum exhibition of small objects', '16':'A bakery', '17':'A typeface foundry selling one face', '18':'A tattoo artist', '19':'A bicycle repair workshop', '20':'A podcast about sleep' };
const SHAPE_SHORT = { space:'A space with parts', place:'A ground, a route, somewhere to go', relation:'Relations that matter more than the parts', many:'Many of one thing, all at once', mixed:'Lots of unlike things on one sheet', words:'Mostly words', announce:'One night, one thing, a date on it' };
function pickStructure(){
  let best = null;
  STRUCT_ORDER.forEach((k) => {
    const T = STRUCTURES[k]; if (T.needs && !(S.shape[T.needs] || {}).v) return; if (T.blockedBy && (S.shape[T.blockedBy] || {}).v) return;
    let sc = 0; Object.keys(T.wants).forEach((q) => { if ((S.shape[q] || {}).v) sc += T.wants[q]; });
    if (!best || sc > best.sc) best = { k, sc };
  });
  return best && best.sc > 0 ? STRUCTURES[best.k] : null;
}
/* scales run 0 to 100; one never moved is left to the engine. The first ten
   are how it looks, the last three how the words sound. */
const SCALES = [
  ['order', 'Ordered, on a grid', 'Messy, off the square'], ['volume', 'Quiet', 'Loud'], ['surface', 'Flat', 'Material: 3D, print, grain'],
  ['image', 'Photographs', 'Drawn by hand'], ['world', 'A normal page', 'Immersive, a world'], ['new', 'Familiar', 'Groundbreaking'],
  ['words', 'Very few words', 'Reads like a book'], ['motion', 'Still', 'Answers every move'], ['colour', 'One ink', 'Experimental colour'], ['era', 'Of now', 'Pre-internet'],
  ['tplay', 'Plain', 'Playful', 'tone'], ['tformal', 'Formal', 'Like a friend talking', 'tone'], ['tspare', 'Spare', 'Generous with detail', 'tone']
];
function scalePhrase(s, v){
  const a = s[1].toLowerCase(), b = s[2].toLowerCase();
  if (v <= 15) return 'strongly ' + a; if (v < 42) return 'leaning ' + a; if (v <= 58) return 'between ' + a + ' and ' + b;
  if (v < 85) return 'leaning ' + b; return 'strongly ' + b;
}
/* briefs saved before the scales went to 0 to 100 held 1 to 5 */
function normalizeScales(){ if (S.scalesV === 2) return; Object.keys(S.scales || {}).forEach((k) => { const v = S.scales[k]; if (v >= 1 && v <= 5) S.scales[k] = (v - 1) * 25; }); S.scalesV = 2; }
const ACTION_LABELS = { 'buy':'Buy something', 'book':'Book a table or a time', 'tickets':'Get a ticket', 'contact':'Get in touch', 'visit':'Come in or visit', 'listen':'Listen', 'read':'Read it', 'sign up':'Sign up' };
function actionList(){ const a = (S.actions && S.actions.length) ? S.actions : (S.action ? [S.action] : []); return a; }
/* pictures of the work, so references are picked by looking */
const SITE_THUMBS = { bruno:'references/sites/bruno.jpg', raf:'references/sites/raf.jpg', msg:'references/sites/msg.jpg', petra:'references/sites/petra.jpg', igloo:'references/sites/igloo.jpg', olia:'references/sites/olia.jpg', ll:'references/sites/ll.jpg', ulli:'references/sites/ulli.jpg' };
function refTitle(r){ return r.says.split(/[.:]/)[0]; }
/* The short list shown when someone picks work they love (cr14: "too many
   references, a lot of them similar; show variability and explain what's in
   the image, but more what we derive from it"). Thirteen, each pulling a
   different way: six named works for material and behaviour, seven from the
   folder, one per way of building a page. Each says what it is and what
   Litmus takes from it; the taking is what goes into the prompt. */
const PICKS = [
  { id:'bruno', tag:'A world', name:'Bruno Simon', url:'https://bruno-simon.com', img:'references/sites/bruno.jpg',
    what:'A portfolio you drive a small car around. The projects are places in a 3D world.',
    takes:'The site is a place you move through, and moving through it is the navigation. Build a world, not a page with a menu.' },
  { id:'raf', tag:'Made for the screen', name:'Rafaël Rozendaal', url:'https://www.newrafael.com', img:'references/sites/raf.jpg',
    what:'Single artworks made for the browser, one moving idea filling the whole screen.',
    takes:'One idea per page, made for the screen it lives on. The page is the work, not a frame around it.' },
  { id:'petra', tag:'Found digital material', name:'Petra Cortright', url:'https://www.petracortright.com', img:'references/sites/petra.jpg',
    what:'Her front page is a cross built from old emoji and smileys.',
    takes:'Make the elements for this site from cheap or found digital material. The front page is a piece in itself.' },
  { id:'olia', tag:'The early web', name:'Olia Lialina', url:'https://art.teleportacia.org', img:'references/sites/olia.jpg',
    what:'Net art from the early web: a starfield and a lone home button.',
    takes:'Use the browser’s own raw parts on purpose: default buttons, plain links, frames. The web before templates.' },
  { id:'ll', tag:'A system that reacts', name:'Lundgren+Lindqvist', url:'https://www.lundgrenlindqvist.se', img:'references/sites/ll.jpg',
    what:'A studio site where blocks of image and type divide the screen and answer each other.',
    takes:'A strict system whose divisions react to one another. The layout itself is the interaction.' },
  { id:'ulli', tag:'An artist’s method', name:'Ulli Lust', url:'https://www.fantagraphics.com', img:'references/sites/ulli.jpg',
    what:'A punk memoir drawn in pen and ink with one green.',
    takes:'A traditional artist’s method decides how the site works: drawn panels, captions, speech balloons, one spot colour.' },
  { id:'S01', tag:'Cut open', name:'A house cut open', img:'references/thumb/S01.jpg',
    what:'A building in cross-section, a different scene painted in every room.',
    takes:'Open the thing up and show what happens in every part at once. Each room is a section of the site.' },
  { id:'S12', tag:'A map', name:'A hand-drawn city map', img:'references/thumb/S12.jpg',
    what:'Place names written by hand, routes in blue, a legend in the corner.',
    takes:'Lay the ground out as itself and put things where they happen. The map is the navigation.' },
  { id:'P12', tag:'Relations over time', name:'A club’s history, 1979 to 2010', img:'references/thumb/P12.jpg',
    what:'Thirty years drawn as overlapping fans of fine lines with dated points.',
    takes:'Draw how things relate and change, and let the items be small. A timeline as a picture, not a list.' },
  { id:'P13', tag:'The whole set at once', name:'Fifty artworks in a ring', img:'references/thumb/P13.jpg',
    what:'Every piece arranged in one circle, a single caption alone in the middle.',
    takes:'Show the whole set at once in one shape. The arrangement says what the set is.' },
  { id:'P03', tag:'Placed by argument', name:'A Swiss editorial board', img:'references/thumb/P03.jpg',
    what:'Photographs at angles, wedges of colour cutting across, text at top and bottom.',
    takes:'Place things by what they say to each other, not into slots. Angles and cuts of colour join them.' },
  { id:'S18', tag:'Almost empty', name:'A nearly empty spread', img:'references/thumb/S18.jpg',
    what:'Tiny figures, scattered dots, three small photographs and one paragraph.',
    takes:'Say very little and give it room. The white space is part of what it says.' },
  { id:'P07', tag:'One statement', name:'Red cows in a field', img:'references/thumb/P07.jpg',
    what:'Flat red cow silhouettes over a photograph of a field, script lettering top and bottom.',
    takes:'One surface, one statement: a photograph with flat colour knocked into it and a single line of words.' }
];
/* only the ones Noor has said they like (Lando, Studio Feixen and Teenage Engineering were refused; JODI is contested) */
const FILE_REFS = ['bruno', 'raf', 'msg', 'petra', 'igloo', 'olia', 'll'].filter((k) => SITES[k]).map((k) => [k, SITES[k].name]).concat([['ulli', 'Ulli Lust, Today Is the Last Day of the Rest of Your Life']]);
/* ---------- the format: a hard constraint, stated first, kept everywhere (cr15) ---------- */
const FORMATS = {
  'website':{ unit:'page', head:'FORMAT: A WEBSITE. Several pages a visitor moves between.', first:'First screen', end:'The end, on every page', web:true,
    deliver:'Check every page at phone and desktop widths.' },
  'single page':{ unit:'page', head:'FORMAT: ONE PAGE. A single page that scrolls; no other pages.', first:'First screen', end:'The end of the page', web:true,
    deliver:'Check it at phone and desktop widths.' },
  'poster':{ unit:'sheet', head:'FORMAT: A POSTER. One sheet, portrait, in the proportion of A-series paper (1 to 1.414). It is not a website and not a web page: no pages, no navigation, no menu, no scrolling, no buttons, no hover states, no animation. Everything is seen at once, from across a room and then up close.',
    first:'Seen from across the room', end:'What they do after seeing it', web:false,
    deliver:'Make it as one HTML file whose body is exactly the sheet (594 by 841, scaled to fit the window without reflowing), or as an SVG. Look at it whole at full size and at thumbnail size.' },
  'deck':{ unit:'slide', head:'FORMAT: A DECK. Slides at 16 by 9, one idea to a slide, presented one at a time. Not a scrolling web page.', first:'The first slide', end:'The last slide', web:false,
    deliver:'Look at every slide at full screen and as a thumbnail strip.' },
  'app screen':{ unit:'screen', head:'FORMAT: ONE APP SCREEN. A single phone screen, 390 by 844, in the app\u2019s own interface. Not a website: no site header, no footer, no scrolling page of sections.', first:'What the screen shows first', end:'The one thing they do on it', web:true,
    deliver:'Check it at 390 by 844.' }
};
const WEB_ONLY = ['b2', 'b3', 'b5', 'b6', 'b9', 'b12', 'b13'];
/* ---------- writing it ---------- */
function list(arr, pre){ return arr.map((x) => (pre || '- ') + x).join('\n'); }
function compose(){
  const P = pickStructure(), never = (S.never || []).concat(S.neverOther ? [S.neverOther] : []);
  normalizeScales();
  const set = (s) => S.scales[s[0]] !== undefined && S.scales[s[0]] !== null;
  const scales = SCALES.filter((s) => !s[3] && set(s)).map((s) => s[1] + ' to ' + s[2].toLowerCase() + ': ' + scalePhrase(s, S.scales[s[0]]) + ' (' + S.scales[s[0]] + ' of 100)');
  const tones = SCALES.filter((s) => s[3] === 'tone' && set(s)).map((s) => s[1] + ' to ' + s[2].toLowerCase() + ': ' + scalePhrase(s, S.scales[s[0]]) + ' (' + S.scales[s[0]] + ' of 100)');
  const acts = actionList().map((a) => (ACTION_LABELS[a] || a).toLowerCase());
  const picked = (S.refPicks || []).map((id) => REFS.find((r) => r.id === id)).filter(Boolean);
  const chosen = PICKS.filter((p) => (S.picks || []).includes(p.id));
  const ours = S.images.filter((m) => m.role === 'ours'), refs = S.images.filter((m) => m.role === 'ref');
  const fileRefs = FILE_REFS.filter((r) => (S.fileRefs || []).includes(r[0])).map((r) => r[1] + (SITES[r[0]] ? ' (' + SITES[r[0]].url + ')' : ''));
  const F = FORMATS[S.kind] || FORMATS.website, T = [];
  T.push(F.head);
  T.push('\nMake a ' + S.kind + '. What it is for: ' + S.what + '.' + (S.kind !== 'website' && /\b(site|website|web page)\b/i.test(S.what || '') ? ' Where that line says site or page it describes the subject; the thing to make is still a ' + S.kind + '.' : ''));
  T.push('Read the whole brief before starting. The format above is fixed. After that, the brief outranks the taste file on anything to do with function: who it is for, what they need, and the action.');
  T.push('\nTHE NARRATIVE\nWho it is for: ' + S.who + '\nWhat they need from it: ' + S.job + '\nThe one sentence it states: ' + S.says + '\n' + F.first + ': ' + S.first + '\nThe peak: ' + S.peak + '\n' + F.end + ': ' + S.end);
  T.push('\nWHAT’S REAL\n' + (S.exists ? 'What exists: ' + S.exists : 'Nothing supplied yet. Where content is missing, leave a clearly marked gap; do not fill it with invented material.') +
    (never.length ? '\nNever invent: ' + never.join(', ') + '. If one is needed and missing, mark the gap.' : ''));
  if (ours.length || refs.length) T.push('\nIMAGES' + (ours.length ? '\nUse these, they are ours:\n' + list(ours.map((m) => m.name + (m.why ? ': ' + m.why : ''))) : '') + (refs.length ? '\nLearn from these, do not copy them:\n' + list(refs.map((m) => m.name + (m.why ? ': ' + m.why : ''))) : ''));
  T.push('\nTHE SHAPE\n' + list(SHAPE.filter((q) => (S.shape[q.id] || {}).v).map((q) => SHAPE_SHORT[q.id])) + '\n' + (P ? 'Structure: ' + P.name + '. ' + P.says + ' ' + (P.because || '') : 'No structure fits. Say so and propose one; do not default to a stack of bands.'));
  if (scales.length) T.push('\nTHE FEEL\n' + list(scales) + '\nAnything not listed is your call, inside the taste file.');
  if (tones.length) T.push('\nTHE TONE OF THE WORDS\n' + list(tones));
  T.push('\nMUST DO, CAN’T CHANGE\nThe action: ' + (acts.length ? acts[0] : 'get in touch') + (acts.length > 1 ? ', and where it fits, ' + acts.slice(1).join(', ') : '') + '. ' + (F.web ? 'One primary action per ' + F.unit + ', one step away, where the eye already is.' : 'Put what they need to do it on the ' + F.unit + ': the when, the where, and how to get it.') + '\n' + (S.device ? 'Design ' + S.device + '.\n' : '') + (S.fixed ? 'Fixed: ' + S.fixed : 'Nothing fixed.'));
  if (chosen.length) T.push('\nWORK THEY LOVE, AND WHAT TO TAKE FROM EACH (take the method, never copy the work)\n' + list(chosen.map((p) => p.name + (p.url ? ' (' + p.url + ')' : '') + '. ' + p.what + ' Take: ' + p.takes)));
  if (S.ref1 || S.ref2 || S.not || fileRefs.length || picked.length) T.push('\nFOR THIS PROJECT' + (S.ref1 ? '\nExcellent: ' + S.ref1 + (S.ref1why ? '. ' + S.ref1why : '') : '') + (S.ref2 ? '\nExcellent: ' + S.ref2 + (S.ref2why ? '. ' + S.ref2why : '') : '') +
    (S.not ? '\nMust not look like: ' + S.not + (S.notwhy ? '. ' + S.notwhy : '') : '') + (fileRefs.length ? '\nFrom the taste file, these fit: ' + fileRefs.join('; ') + '. Take their method, never their drawings.' : '') +
    (picked.length ? '\nFrom the reference folder, these were picked:\n' + list(picked.map((r) => r.id + ', ' + r.says)) : ''));
  T.push('\nTHE TASTE\n' + 'Standing: ' + STANDING.good.words + '. Never ' + STANDING.bad.words + '.\nImmersive only on some occasions. Otherwise, elements made for this piece specifically.\n' +
    'Look to traditional artists (comics artists, printmakers, illustrators) for how a piece works, not only how it looks.');
  T.push('\nTYPE\n' + list(TYPE.map((t) => t.rule)));
  T.push('\nSURFACE\n' + list(SURFACE.map((s) => s.rule)));
  T.push('\nDRAWING\n' + list(SKETCH.map((s) => s.rule)));
  T.push('\nPHOTOGRAPHS\n' + list(PHOTO.map((s) => s.rule)));
  T.push('\nNEVER, AND ALWAYS\n' + list(PROFILE.rules.map((r) => r.text)));
  T.push('\nHOW PEOPLE READ AND ACT (check every ' + F.unit + ' against these)\n' + list(BEHAVIOUR_SCIENCE.filter((b) => F.web || !WEB_ONLY.includes(b.id)).map((b) => b.name + ': ' + b.rule)));
  const TOOL = { 'Claude Code':'Write it as files in this folder. Open it in a browser at phone and desktop widths and check every page before calling it done.', 'Claude.ai':'Build it as one HTML artifact. Check it at phone and desktop widths.',
    'Cursor':'Write it as files in this project. Run it and check it at phone and desktop widths.', 'v0':'Use only what the tool needs; keep every rule above even where the defaults pull the other way.',
    'Lovable':'Use only what the tool needs; keep every rule above even where the defaults pull the other way.', 'Figma Make':'Keep every rule above even where the defaults pull the other way.', 'Other':'Check it at phone and desktop widths.' };
  T.push('\nBEFORE YOU SAY IT IS DONE\n' + (F.web ? TOOL[S.tool || 'Claude Code'] + ' ' : '') + F.deliver + '\nIt is a ' + S.kind + ', nothing else. No text touches other text. No effects on letters.' + (F.web ? ' Every ' + F.unit + ' ends on: ' + S.end + '.' : ''));
  return T.join('\n');
}
function slug(){ return (S.what || 'brief').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'brief'; }
function skillMd(){
  return '---\nname: litmus-' + slug() + '\ndescription: Builds ' + (S.what || 'the piece') + ', in Noor’s taste from Litmus. Use when working on this project or asked to make, change or check any page of it.\n---\n\n' + compose() + '\n\nImages, if any, are in assets/; picked references are in assets/references/. The brief as data is in brief.json.\n';
}

