/* Noor's profile.

   Decisions settled in conversation and committed here, rather than
   typed into the site and left in one browser's localStorage.

   This is the point of the file. A judgment made on the site lives in
   the browser that made it: it does not reach another machine, another
   browser, or anyone you send the link to, and clearing site data ends
   it. A judgment written here ships with the page, so the live site is
   always the current state of what we have decided.

   Precedence, lowest first:
     DEFAULTS in data.js   assumptions read off the corpus
     PROFILE here          decided in conversation, committed, shared
     the browser           what you do on the site right now, local only

   To change anything here, say so in the chat. The site updates when
   it is pushed. Anything done on the site stays in that browser until
   it is handed back and committed, and the engine says plainly how
   much of that there is. */

const PROFILE = {
  updated: '2026-11-05',
  note: 'Written from the conversation. Everything here was said out loud, not inferred.',

  /* The slop rules below clear the floor. They are not taste, because
     nobody with any would make that page. Taste starts at the point
     where every option on the table is already well made. */

  /* Specimen answers. id from DECK, each with the three contexts.
     Empty for now: nothing has been judged in conversation yet. */
  judgments: {},

  /* Forced choice results, as {tag: {win, loss}}. These add to the
     corpus assumptions rather than replacing them. */
  pairs: {},

  /* Claim verdicts, 'true' | 'nearly' | 'false'. Anything absent
     stays at the engine's default of true.

     Marked 6 November 2026. Three true, nine nearly, one false.

     The nine are not nine separate corrections. Six of the notes say
     the same thing in different words: sometimes, depends on the
     occasion, only when it needs it, not necessarily. The engine had
     written these as standing instructions when they are moves held
     in reserve. That is one structural error, not nine small ones.

     It came from reading frequency as preference. Yellow appears in
     seven pieces, so the engine concluded yellow was wanted. Noor's
     answer was "not necessarily". A thing can recur in the work
     without being a rule of the work, and nothing in the method as
     built could tell those apart. */
  marks: {
    c1:'true',   c2:'false',  c3:'nearly', c4:'nearly', c5:'nearly',
    c6:'true',   c7:'nearly', c8:'nearly', c9:'nearly', c10:'nearly',
    c11:'nearly',c12:'nearly',c13:'true'
  },

  /* What the nine should have said, in his words where he gave them.
     `when` is the condition that lets the move in. Where it is null
     the condition has not been set yet, and the engine says so rather
     than inventing one. */
  claims: {
    c3:  { rule:'Colour can take the whole frame instead of picking out one element.',
           when:null, said:'' },
    /* "the occasion" is the honest answer and not yet a usable one. It
       is kept in `said` and `when` stays null, so the file admits the
       condition is missing instead of dressing the words up as a test
       the engine can run. */
    c4:  { rule:'Repetition is available: a grid, a mirror, the same thing recoloured.',
           when:null, said:'sometimes, depends on the occasion you see' },
    c5:  { rule:'The border can carry something of its own rather than being margin.',
           when:null, said:'sometimes yes' },
    c7:  { rule:'Type may be allowed to run off the edge instead of fitting inside the picture.',
           when:null, said:'' },
    c8:  { rule:'Halftone is available as a texture. Where any texture is used it comes from a printing process, never a filter laid on top, and that half does not bend.',
           when:null, said:'' },
    c9:  { rule:'In collage, photographs arrive in stacks of three or four. Outside collage this does not apply at all.',
           when:'the piece is a collage', said:'no, those are just for my collages' },
    c10: { rule:'A picture can sit under a picture rather than a colour.',
           when:'the layout has the room for it', said:'well, only sometimes depends on how much spacing it needs' },
    c11: { rule:'Breaking the alignment is worth reaching for when the piece needs the movement.',
           when:null, said:'i like the dynamicity but also should only be a need of the occasion' },
    c12: { rule:'Yellow recurs in the corpus. That is a fact about the work, not a preference. Do not reach for it by default.',
           when:'never by default', said:'not necessarily' }
  },

  /* Rules in Noor's own words, carried into every prompt verbatim.
     These are the standing ones, stated across the work rather than
     worked out by the engine. */
  rules: [
    { id:'p-words', verdict:'bad', scope:'any',
      text:'Never write: authentic, hidden gem, off the beaten path, vibrant, nestled, cool, cute, vibe, must-visit, Instagrammable, bucket list, trending, a find, a score.' },
    { id:'p-dash', verdict:'bad', scope:'any',
      text:'No em dashes in any prose. Rephrase the sentence instead.' },
    /* Two brand rules used to sit here, about how one product writes its
       own name and quotes its own numbers. Scoping them was not enough.
       They are not taste, they are a client's style guide, and a file
       about how Noor designs should not contain either. Removed. */
    { id:'p-aside', verdict:'bad', scope:'any',
      text:'No knowing asides like "that is the whole trick". Use a concrete detail instead. An aphoristic closing line is fine.' },
    { id:'p-flip', verdict:'bad', scope:'any',
      text:'Never use the negation flip: "X is not A, it is B". Say what it is.' },

    /* The house style of generated marketing pages, refused by name.
       These are the floor, not the taste. Clearing them gets you to
       competent, which is where the actual judgments start. */
    { id:'s-gradtext', verdict:'bad', scope:'any',
      text:'Never fill type with a gradient.' },
    { id:'s-glass', verdict:'bad', scope:'any',
      text:'Never use translucent blurred panels.' },
    { id:'s-badge', verdict:'bad', scope:'any',
      text:'Never open with a rounded pill badge announcing a feature, with or without a sparkle.' },
    { id:'s-dualcta', verdict:'bad', scope:'any',
      text:'Never pair a filled primary button with a ghost secondary beside it.' },
    { id:'s-cards', verdict:'bad', scope:'any',
      text:'Never use a row of three rounded cards with soft drop shadows.' },
    { id:'s-stats', verdict:'bad', scope:'any',
      text:'Never show a row of large round statistics with captions under them.' },
    { id:'s-logos', verdict:'bad', scope:'any',
      text:'Never run a row of greyed-out logos under the hero.' },
    { id:'s-quote', verdict:'bad', scope:'any',
      text:'Never use a centred testimonial with a circular avatar under it.' },
    { id:'s-darkcta', verdict:'bad', scope:'any',
      text:'Never close on a dark band with a glowing CTA.' },
    { id:'s-words', verdict:'bad', scope:'any',
      text:'Never write supercharge, seamless, effortlessly, unlock, empower, or introducing.' },

    /* Caught in the engine's own mockups, which had ten rules on one
       page. A hairline is the cheapest thing that reads as structure,
       so it is what gets reached for when the spacing has not been
       solved. Deleting them is only half the fix. */
    { id:'n-rules', verdict:'bad', scope:'any',
      text:'Do not use hairlines, dividers or rules to create structure. Space, alignment, weight and position separate things. A rule is allowed only where it marks something space cannot: the head of a data table, or a real edge of the page.' },
    { id:'n-space', verdict:'good', scope:'any',
      text:'When a rule comes out, give the space back. A block that was separated by a line needs roughly double the gap it had, or it reads as one block.' },
    { id:'n-label', verdict:'good', scope:'any',
      text:'Where a line was labelling a change of section, use a small label in the quiet colour instead, not a line and not nothing.' }
  ],

  /* Things returned to, with the structure read off them. */
  sources: []
};
