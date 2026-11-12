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
/* only the ones Noor has said they like (Lando, Studio Feixen and Teenage Engineering were refused; JODI is contested) */
const FILE_REFS = ['bruno', 'raf', 'msg', 'petra', 'igloo', 'olia', 'll'].filter((k) => SITES[k]).map((k) => [k, SITES[k].name]).concat([['ulli', 'Ulli Lust, Today Is the Last Day of the Rest of Your Life']]);
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
  const ours = S.images.filter((m) => m.role === 'ours'), refs = S.images.filter((m) => m.role === 'ref');
  const fileRefs = FILE_REFS.filter((r) => (S.fileRefs || []).includes(r[0])).map((r) => r[1] + (SITES[r[0]] ? ' (' + SITES[r[0]].url + ')' : ''));
  const T = [];
  T.push('Make a ' + S.kind + ': ' + S.what + '.');
  T.push('Read the whole brief before starting. The brief outranks the taste file on anything to do with function: who comes, what they came to do, and the action.');
  T.push('\nTHE NARRATIVE\nWho comes: ' + S.who + '\nWhat they came to do: ' + S.job + '\nThe one sentence it states: ' + S.says + '\nFirst screen: ' + S.first + '\nThe peak: ' + S.peak + '\nThe end, on every page: ' + S.end);
  T.push('\nWHAT’S REAL\n' + (S.exists ? 'What exists: ' + S.exists : 'Nothing supplied yet. Where content is missing, leave a clearly marked gap; do not fill it with invented material.') +
    (never.length ? '\nNever invent: ' + never.join(', ') + '. If one is needed and missing, mark the gap.' : ''));
  if (ours.length || refs.length) T.push('\nIMAGES' + (ours.length ? '\nUse these, they are ours:\n' + list(ours.map((m) => m.name + (m.why ? ': ' + m.why : ''))) : '') + (refs.length ? '\nLearn from these, do not copy them:\n' + list(refs.map((m) => m.name + (m.why ? ': ' + m.why : ''))) : ''));
  T.push('\nTHE SHAPE\n' + list(SHAPE.filter((q) => (S.shape[q.id] || {}).v).map((q) => SHAPE_SHORT[q.id])) + '\n' + (P ? 'Structure: ' + P.name + '. ' + P.says + ' ' + (P.because || '') : 'No structure fits. Say so and propose one; do not default to a stack of bands.'));
  if (scales.length) T.push('\nTHE FEEL\n' + list(scales) + '\nAnything not listed is your call, inside the taste file.');
  if (tones.length) T.push('\nTHE TONE OF THE WORDS\n' + list(tones));
  T.push('\nMUST DO, CAN’T CHANGE\nThe action: ' + (acts.length ? acts[0] : 'get in touch') + (acts.length > 1 ? ', and where it fits, ' + acts.slice(1).join(', ') : '') + '. One primary action per page, one step away, where the eye already is.\n' + (S.device ? 'Design ' + S.device + '.\n' : '') + (S.fixed ? 'Fixed: ' + S.fixed : 'Nothing fixed.'));
  if (S.ref1 || S.ref2 || S.not || fileRefs.length || picked.length) T.push('\nFOR THIS PROJECT' + (S.ref1 ? '\nExcellent: ' + S.ref1 + (S.ref1why ? '. ' + S.ref1why : '') : '') + (S.ref2 ? '\nExcellent: ' + S.ref2 + (S.ref2why ? '. ' + S.ref2why : '') : '') +
    (S.not ? '\nMust not look like: ' + S.not + (S.notwhy ? '. ' + S.notwhy : '') : '') + (fileRefs.length ? '\nFrom the taste file, these fit: ' + fileRefs.join('; ') + '. Take their method, never their drawings.' : '') +
    (picked.length ? '\nFrom the reference folder, these were picked:\n' + list(picked.map((r) => r.id + ', ' + r.says)) : ''));
  T.push('\nTHE TASTE\n' + 'Standing: ' + STANDING.good.words + '. Never ' + STANDING.bad.words + '.\nImmersive only on some occasions. Otherwise, elements made for this piece specifically.\n' +
    'Look to traditional artists (comics artists, printmakers, illustrators) for how a piece works, not only how it looks.');
  T.push('\nTYPE\n' + list(TYPE.map((t) => t.rule)));
  T.push('\nSURFACE\n' + list(SURFACE.map((s) => s.rule)));
  T.push('\nNEVER, AND ALWAYS\n' + list(PROFILE.rules.map((r) => r.text)));
  T.push('\nHOW PEOPLE ACT ON A PAGE (check every page against these)\n' + list(BEHAVIOUR_SCIENCE.map((b) => b.name + ': ' + b.rule)));
  const TOOL = { 'Claude Code':'Write it as files in this folder. Open it in a browser at phone and desktop widths and check every page before calling it done.', 'Claude.ai':'Build it as one HTML artifact. Check it at phone and desktop widths.',
    'Cursor':'Write it as files in this project. Run it and check it at phone and desktop widths.', 'v0':'Use only what the tool needs; keep every rule above even where the defaults pull the other way.',
    'Lovable':'Use only what the tool needs; keep every rule above even where the defaults pull the other way.', 'Figma Make':'Keep every rule above even where the defaults pull the other way.', 'Other':'Check it at phone and desktop widths.' };
  T.push('\nBEFORE YOU SAY IT IS DONE\n' + TOOL[S.tool || 'Claude Code'] + '\nNo text touches other text at any width. Every page ends on: ' + S.end + '.');
  return T.join('\n');
}
function slug(){ return (S.what || 'brief').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'brief'; }
function skillMd(){
  return '---\nname: litmus-' + slug() + '\ndescription: Builds ' + (S.what || 'the piece') + ', in Noor’s taste from Litmus. Use when working on this project or asked to make, change or check any page of it.\n---\n\n' + compose() + '\n\nImages, if any, are in assets/; picked references are in assets/references/. The brief as data is in brief.json.\n';
}

