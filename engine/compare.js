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
    verdict:null, reason:''
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
    verdict:null, reason:''
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
    verdict:null, reason:''
  }
];

/* What a verdict is worth. A pick records a direction. A reason records
   a rule, and only a reason can be applied to a page that is not one of
   these six. A verdict with an empty reason is logged and deliberately
   carries no weight, because "I preferred the left one" has never
   improved any output. */
function contestWeight(c){
  if (!c.verdict) return 0;
  return (c.reason && c.reason.trim().length > 12) ? 1 : 0;
}
