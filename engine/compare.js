/* Comparative judgment.

   Everything in this engine so far has been a refusal. Ten slop
   patterns, sixteen rules, one thrown-out claim. Those clear the floor,
   and profile.js says as much in its own note: taste starts at the
   point where every option on the table is already well made. Nothing
   in the engine has ever asked which of two good things is better, so
   there is no signal anywhere in it about the top end, which is why it
   cannot reach for one.

   The other reason the output came back basic: the forty-four
   references were counted as equal evidence, and they are nowhere near
   equal. Six or seven are serious. The rest is competent genre work.
   Counting cannot tell a South China Morning Post information graphic
   from an anonymous architecture-school board, so both got one vote
   and the average of those votes is the middle.

   So this file does three things differently.

   It uses work that is unarguably well made. Every site here is live
   and was opened and checked on 6 November 2026, and the awards are
   cited rather than asserted. No Pinterest.

   It pairs sites that answer the same question two opposite ways,
   because a preference between two good answers to one question is
   transferable and a preference between two unrelated pages is not.

   And it asks for the reason, not the pick. The pick alone says "A over
   B". The reason is the only part that tells the engine anything about
   a page neither of us has seen yet.                                 */

const CONTESTS = [
  {
    id:'x1',
    question:'How do you make a stranger care about one person?',
    why:'Both of these are a single individual’s website. They hold opposite theories of how attention is earned: one performs for you, the other refuses to start until you do something.',
    a:{ name:'Lando Norris',
        url:'https://landonorris.com',
        credit:'OFF+BRAND. Awwwards Site of the Year 2025.',
        does:'A cinematic scroll. Full-bleed motion, enormous condensed caps, the next race as a live fixture. It performs at you and the performance is extremely well made.' },
    b:{ name:'Bruno Simon',
        url:'https://bruno-simon.com',
        credit:'Top ten, CSS Design Awards 2025 Website of the Year.',
        does:'A WebGL yard you drive a toy car around. The work is physically scattered on the ground and you find it by bumping into things. Nothing is presented to you at all.' },
    verdict:'b',
    reason:'i like the latter because it is more surreal though i also liked lando’s 3d designs bruno does world building icnredibly well. we want the non obious experientially rich solitions',
    read:'World building over performance. He granted Lando the craft and took Bruno anyway, which rules out "it looked better" as the explanation. "Non obvious, experientially rich" is the first positive standard in this project that is about quality rather than recognisability.'
  },
  {
    id:'x2',
    question:'What do you do with a body of work nobody has curated for the viewer?',
    why:'One hides every image behind text and makes you dig. The other puts the whole studio on the doormat, in colour, including the shop. Both are the work of people who clearly know what they are doing.',
    a:{ name:'Are.na',
        url:'https://www.are.na',
        credit:'Running 15 years. Text-first by design.',
        does:'A database that opens as a paragraph. No hero image, no grid of thumbnails, nothing to look at until you follow something. The restraint is the product.' },
    b:{ name:'Studio Feixen',
        url:'https://www.studiofeixen.ch',
        credit:'Lucerne. Cited repeatedly as the studio other studios watch.',
        does:'Everything out front: fonts, posters, shop, talks, colour everywhere, quick links. No withholding of any kind.' },
    verdict:'b',
    reason:'i rrwally liek the simplicuty of arena but i like studio fixen because of th emotion graphcis',
    read:'Motion decided it. He praised Are.na’s simplicity and then took the opposite side for one reason, which makes the reason load bearing. Nothing in this engine has ever had motion in it.'
  },
  {
    id:'x3',
    question:'How much is a site allowed to withhold before it is just being difficult?',
    why:'This is the question your own references keep asking and never answer the same way twice. Twelve of the forty-four are nearly empty and thirteen are packed, with almost nothing in between.',
    a:{ name:'Lundgren+Lindqvist',
        url:'https://www.lundgrenlindqvist.se',
        credit:'Göteborg. Cited as a typographic masterclass.',
        does:'Opens almost blank. One grey sentence, one word in the corner. Everything is behind the scroll and it does not tell you that.' },
    b:{ name:'Scout Motors',
        url:'https://www.scoutmotors.com',
        credit:'Awwwards E-commerce of the Year 2025.',
        does:'Brand story, product and configuration folded into one continuous scroll, so nothing is behind a template page. It withholds nothing and still does not feel like a brochure.' },
    verdict:'a',
    reason:'i loev the laupouts and geographic divisions and interacitbity between these elements i think its need and succisnt',
    read:'Not withholding. "Geographic divisions and interactivity between these elements" is a page divided into territories that react to each other. The question this contest asked turned out to be the wrong question.'
  }
];

/* ---------------------------------------------------------------
   What the three verdicts say together, which is more than any one of
   them says alone.

   The contests were designed to find out how much Noor thinks a page
   should withhold. x2 and x3 answer that question in opposite
   directions: Feixen shows everything and beat Are.na, then
   Lundgren+Lindqvist shows almost nothing and beat Scout Motors. If
   withholding were the axis, those two verdicts would contradict each
   other. They do not contradict each other, so withholding is not the
   axis and the contests were asking the wrong thing.

   What the three winners share, and all three losers lack:

     Bruno Simon          you move, the world answers
     Studio Feixen        the graphics are in motion
     Lundgren+Lindqvist   elements reveal and react to each other

     Lando Norris         a film, extremely well shot, that plays at you
     Are.na               static text, no motion anywhere
     Scout Motors         a film, in one scroll, that plays at you

   Three for three, with his own words carrying it each time: "world
   building", "motion graphics", "interactivity between these
   elements". The axis is not how much is shown. It is whether the page
   is a system that answers you or a sequence that plays at you.

   This is the first thing in the project that is a positive standard
   about quality rather than a refusal or a tendency, and the first
   confirmed by comparison across good work rather than by counting a
   corpus. It also happens to be the single largest hole in what has
   been built: every structure in structure.js draws a still image.   */
const FINDING = {
  id:'f1',
  claim:'A page should be a system that answers you, not a sequence that plays at you.',
  from:['x1','x2','x3'],
  words:['world building', 'motion graphics', 'interactivity between these elements'],
  against:'Scored 3 of 3. Both losers that had motion, Lando Norris and Scout Motors, had it as cinema rather than as response, and both lost.',
  breaks:[
    'structure.js draws seven still sheets. None of the seven has any behaviour at all.',
    'The eleven dimensions in data.js are all static: weight, tracking, case, scale, measure, leading, gap, ground, colours, alignment, border. Not one concerns what happens when the page is touched.',
    'profile.js has no rule about motion, in either direction. There is nothing to break and nothing to follow.',
    'The generated prompt never mentions behaviour, so a model reading it builds a still page and is technically obedient.'
  ],
  open:'"Non obvious, experientially rich" and "neat and succinct" are both his, from x1 and x3, and they pull against each other. Bruno Simon is not succinct. That tension is real and is not resolved here.'
};

/* What a verdict is worth. A pick records a direction. A reason records
   a rule, and only a reason can be applied to a page that is not one of
   these six. A verdict with an empty reason is logged and deliberately
   carries no weight, because "I preferred the left one" has never
   improved any output. */
function contestWeight(c){
  if (!c.verdict) return 0;
  return (c.reason && c.reason.trim().length > 12) ? 1 : 0;
}

/* The vocabulary the finding needs and the engine does not have.

   These are not styling values like the eleven dimensions. They are
   what the page does when somebody touches it, which is the thing all
   three verdicts turned on. Written as a ladder from least to most,
   so a brief can be pulled along it the way the others are.

   Nothing here is judged yet. It is a vocabulary to choose inside, put
   in the file so that a model reading it is at least told that the
   question exists. A prompt that says nothing about behaviour gets a
   still page back and the model has obeyed it exactly.             */
const BEHAVIOUR = [
  { v:'still',     says:'Nothing moves and nothing answers. A printed sheet served over HTTP.',
    note:'Every one of the seven structures is currently this, and Are.na is this, and Are.na lost.' },
  { v:'revealed',  says:'Elements arrive as you move through, and the arrival is composed rather than decorative.',
    note:'Lundgren+Lindqvist. Opens almost blank and builds itself as you go.' },
  { v:'responsive', says:'The elements react to each other, not just to the scrollbar. Moving one changes another.',
    note:'His words on x3: "interactivity between these elements". The strongest thing he has said about a page.' },
  { v:'inhabited', says:'A space you move around inside, where the arrangement holds together whatever order you take it in.',
    note:'Bruno Simon. Also the only one of the three that no amount of styling gets you to.' }
];

/* The two the file should refuse, because both lost and both lost for
   the same reason. Motion is not the point. Being played at is. */
const BEHAVIOUR_NEVER = [
  'A cinematic scroll that plays at the viewer. Lando Norris and Scout Motors are both this, both are better made than almost anything else in the set, and both lost.',
  'Motion as decoration. A thing that moves because it can, rather than because moving is how it answers you.'
];
