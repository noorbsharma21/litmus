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

  /* Specimen answers. id from DECK, each with the three contexts.
     Empty for now: nothing has been judged in conversation yet. */
  judgments: {},

  /* Forced choice results, as {tag: {win, loss}}. These add to the
     corpus assumptions rather than replacing them. */
  pairs: {},

  /* Claim verdicts, 'true' | 'nearly' | 'false'. Anything absent
     stays at the engine's default of true. */
  marks: {},

  /* Rules in Noor's own words, carried into every prompt verbatim.
     These are the standing ones, stated across the work rather than
     worked out by the engine. */
  rules: [
    { id:'p-words', verdict:'bad', scope:'any',
      text:'Never write: authentic, hidden gem, off the beaten path, vibrant, nestled, cool, cute, vibe, must-visit, Instagrammable, bucket list, trending, a find, a score.' },
    { id:'p-dash', verdict:'bad', scope:'any',
      text:'No em dashes in any prose. Rephrase the sentence instead.' },
    { id:'p-caps', verdict:'bad', scope:'any',
      text:'Write Disco, never all caps DISCO.' },
    { id:'p-aside', verdict:'bad', scope:'any',
      text:'No knowing asides like "that is the whole trick". Use a concrete detail instead. An aphoristic closing line is fine.' },
    { id:'p-flip', verdict:'bad', scope:'any',
      text:'Never use the negation flip: "X is not A, it is B". Say what it is.' },
    { id:'p-claim', verdict:'good', scope:'any',
      text:'Every mention of Disco says what it is and carries the traction: 25 cities, 600 weekly actives, 42k+ Instagram impressions. Weekly, never monthly.' }
  ],

  /* Things returned to, with the structure read off them. */
  sources: []
};
