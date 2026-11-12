/* ---------------------------------------------------------------
   PEOPLE. From cr13, 11 November 2026, after Noor asked of 04 "what are
   we selecting for here, what is going on":
   "you need to understand the context and best deliver to the prompts,
   there will be like what is the narrative we are stating, I want you to
   also understand best practices with regards to behavioural science."

   Two things every site settles before anything is drawn:
   1. NARRATIVE: who comes, what they came to do, the one thing the site
      states, the moment they remember, and how it ends.
   2. BEHAVIOUR: how people actually read and act on a page, from the
      research, turned into checks. Taste decides how it looks; these
      decide whether a visitor understands it and can act.
   --------------------------------------------------------------- */

/* the questions, answered for every brief before design starts */
const NARRATIVE_QUESTIONS = [
  'Who comes: the actual visitor, not the client.',
  'What they came to do: the job, in their words.',
  'The narrative: one sentence the whole site states. Every page is a scene in it.',
  'First screen: what it is, who it is for, and what you can do here, answered without scrolling.',
  'The peak: the one moment they will remember (usually the signature interaction). It must serve the narrative.',
  'The end: every page closes on the action the visitor came for, not on a footer.'
];

const BEHAVIOUR_SCIENCE = [
  { id:'b1', name:'Information scent', src:'Pirolli and Card, Information Foraging, 1999',
    rule:'People follow cues that promise what they want and leave when the cue goes cold. The first screen names the thing and the job; links say where they go.' },
  { id:'b2', name:'Signifiers', src:'Norman, The Design of Everyday Things, revised 2013',
    rule:'Anything you can act on shows that it can be acted on, and what will happen. If an interaction needs a note to explain it, it has failed (04, cr13).' },
  { id:'b3', name:'Purpose before play', src:'Fogg Behavior Model, 2009 (behaviour = motivation, ability, prompt)',
    rule:'An interaction is there because it does the visitor’s job better (try the type, hear the track, see the frame close). Play with no job is friction. The prompt to act sits at the moment motivation peaks.' },
  { id:'b4', name:'One action per page', src:'Hick 1952, Hyman 1953; choice overload is weaker than claimed (Scheibehenne, Greifeneder and Todd meta-analysis, 2010)',
    rule:'Decision time grows with the options in front of you. Each page has one primary action; the rest is quieter. Do not lean on the jam study.' },
  { id:'b5', name:'Make it easy', src:'Behavioural Insights Team, EAST framework, 2014 (Easy, Attractive, Social, Timely)',
    rule:'The action the visitor came for (book, buy, ticket, directions) is one step away, where the eye already is, at the moment they want it.' },
  { id:'b6', name:'Recognition over recall', src:'Nielsen, usability heuristics, 1994',
    rule:'Show the options; never make someone remember what was on another page (the chosen seat stays written down, the bunch stays on the tag).' },
  { id:'b7', name:'Peak and end', src:'Kahneman, Fredrickson, Schreiber and Redelmeier, 1993',
    rule:'People judge an experience by its most intense moment and its end. Design one peak, not five, and end each page well.' },
  { id:'b8', name:'First and last', src:'Murdock, serial position effect, 1962',
    rule:'The first and last things in a sequence are remembered best: the most important fact first, the action last.' },
  { id:'b9', name:'Targets', src:'Fitts 1954; WCAG 2.5.5 (44 by 44 px)',
    rule:'What people need to press is big enough and near where they are looking; on touch, at least 44 px. Decoration can be small; actions cannot.' },
  { id:'b10', name:'Load', src:'Sweller, cognitive load, 1988; Mayer, coherence principle',
    rule:'Every element costs attention. The experimental part has to carry meaning; anything that carries none goes (agrees with t5, say less).' },
  { id:'b11', name:'Story', src:'Green and Brock, narrative transportation, 2000',
    rule:'People absorbed in a story attend more and remember more. State one narrative and keep every part of it inside that story.' },
  { id:'b12', name:'Progress', src:'Kivetz, Urminsky and Zheng, goal gradient, 2006',
    rule:'In anything with steps, show how far along you are (the florist’s tag filling up).' },
  { id:'b13', name:'Sensible defaults', src:'Johnson and Goldstein, 2003',
    rule:'Start in the useful state: the next show already open, today’s bake already showing, the first track ready.' },
  { id:'b14', name:'Real proof only', src:'Cialdini, Influence, 1984',
    rule:'Social proof works, so it must be true: a bakery selling out by eleven is information. Invented counts are banned (cr1).' },
  { id:'b15', name:'Never dark patterns', src:'Brignull’s catalogue; Mathur et al., Dark Patterns at Scale, 2019',
    rule:'No fake scarcity or urgency, no confirmshaming, no hidden costs, no tricks to stop people leaving.' }
];

/* the twenty briefs, settled */
const NARRATIVES = {
  '01':{ who:'Neighbours deciding what to drink tonight', job:'Find a bottle they will like without knowing grape names; know when it is open',
         says:'The people here have tasted every bottle and will tell you plainly what it is like.', peak:'Picking a bottle up and reading its note', end:'Address and opening days' },
  '02':{ who:'People planning a special dinner', job:'Know what they would eat, what it costs, and book',
         says:'Eight courses, one evening, following the season.', peak:'The courses arriving on the plate in turn', end:'Book a table' },
  '03':{ who:'Fans and curious locals', job:'When and where is the next show; hear them; get a ticket',
         says:'A duo you have to hear in a room, and this is the next room.', peak:'Holding to hear them', end:'Tickets' },
  '04':{ who:'Art directors, editors and restaurant owners looking to commission', job:'Judge her eye fast, see her range, get in touch',
         says:'How she sees: the whole roll, and the frames she keeps.', peak:'A frame under the loupe; a circled frame becoming a print', end:'Commission her' },
  '05':{ who:'Someone planning a weekend in Porto', job:'A plan they can follow, hour by hour',
         says:'One Saturday, walked the way a local walks it.', peak:'Dragging the sun through the day', end:'The route, to take with them' },
  '06':{ who:'Researchers, students, past and future clients', job:'Find a project by year',
         says:'Thirty-one years of work on one long table, in order.', peak:'Walking down the table', end:'Ask to visit the archive' },
  '07':{ who:'Prospective clients and future staff', job:'See how they think and what they have built',
         says:'A building is thought through in layers of drawings.', peak:'Spreading the drawings out', end:'Talk to us about a project' },
  '08':{ who:'Readers', job:'Find a book and buy it',
         says:'Every book here is set and printed by hand.', peak:'Printing a word of their own', end:'Buy a book' },
  '09':{ who:'People buying a pot or a present', job:'See the pots, price, lead time, order',
         says:'Every pot is thrown to order, and you shape it with her.', peak:'Shaping the clay', end:'Order a pot' },
  '10':{ who:'Locals choosing a night out', job:'What is on which night; get a seat',
         says:'A week of films: pick your night, pick your seat.', peak:'Choosing a seat', end:'Book that seat' },
  '11':{ who:'Fans and record buyers', job:'Hear the releases; buy one',
         says:'Six records; flick through the crate as you would in a shop.', peak:'A record sliding out and playing', end:'Buy the record' },
  '12':{ who:'Readers', job:'See what is in this issue; buy it',
         says:'An issue about weather: go into the fog to find what is inside.', peak:'Zooming into the cover', end:'Buy issue 9' },
  '13':{ who:'People buying flowers today', job:'What is in, build a bunch, price, collection time',
         says:'Today’s stems: build your bunch, ready at four.', peak:'Stems dropping into the vase', end:'Order the bunch' },
  '14':{ who:'Audiences', job:'What is on, when, tickets',
         says:'Three works this season about bodies in motion.', peak:'The dancer smearing as you move', end:'Book a date' },
  '15':{ who:'People planning a visit', job:'What is in it, when, whether it is free',
         says:'Small things from the stores, brought into the light one at a time.', peak:'Pulling the drawer out', end:'Dates, gallery, free entry' },
  '16':{ who:'Locals deciding whether to go now', job:'What is still on the counter, and until when',
         says:'What is left right now, emptying through the day.', peak:'Loaves going as the hours pass', end:'Come before it goes: hours and address' },
  '17':{ who:'Designers', job:'Try the face; licence it',
         says:'One face, built from cells: type your own word.', peak:'The word building itself', end:'Licence it' },
  '18':{ who:'People who want a tattoo', job:'See her line; book',
         says:'Her line, on skin.', peak:'Drawing on the skin', end:'Book a Tuesday, or walk in on Saturday' },
  '19':{ who:'Cyclists with something broken', job:'What it costs, when, where',
         says:'Bring it in and you will know the price before we touch it.', peak:'Spinning the wheel', end:'Walk in: address, days, prices' },
  '20':{ who:'People who cannot sleep, at night', job:'Start an episode with no fuss',
         says:'Pick tonight’s sound and go to sleep.', peak:'The page dimming with you', end:'Listen in your podcast app' }
};
