/* Round one: twenty briefs, two versions each.

   Built 9 November 2026 at his request: "design 20 prompts, and for
   that, do versions of each. Then I will reject and accept it."

   The two versions of a brief share palette, type and content and
   differ on exactly one axis, so a verdict says something about that
   axis rather than about everything at once. The axes are the questions
   the file has left open:

     route     immersive, or elements made for this site. Which occasion
               calls for which is the condition that was never given.
     worlds    one idea, or several living worlds on one sheet. The
               candidate construct from cr3, tested on unrelated briefs.
     preweb    "pre internet" as the early web, or as print. Two readings
               of his words, never settled.
     density   packed, or nearly empty.
     division  a regular grid, or uneven land. The tension from cr3.

   Copy is names, dates, prices and plain nouns. No art of his. Every
   image is drawn in code. Every palette is one reference's combination. */

var ROUND = [
  { n:'01', brief:'A natural wine shop',            axis:'route',    a:'made for it: every bottle drawn from its own wine',            b:'immersive: walk along the cellar racks',              pal:'P17' },
  { n:'02', brief:'A chef’s eight course tasting menu', axis:'worlds', a:'one idea: one plate, the courses arrive on it',        b:'several worlds: eight plates on one sheet',           pal:'P11' },
  { n:'03', brief:'A poster for one night of music', axis:'preweb',  a:'early web: raw HTML, the browser’s own type',           b:'print: two inks, misregistered, halftone',            pal:'S03' },
  { n:'04', brief:'A photographer’s portfolio', axis:'route',    a:'made for it: a contact sheet that develops under you',       b:'immersive: a darkroom with prints on the line',       pal:'P07' },
  { n:'05', brief:'A weekend guide to a city',       axis:'worlds',   a:'one idea: one route across the screen',                       b:'several worlds: the weekend as four territories',     pal:'P08' },
  { n:'06', brief:'A studio archive, 1979 to 2010',  axis:'density',  a:'packed: every year and project at once',                      b:'nearly empty: one year at a time',                    pal:'P11' },
  { n:'07', brief:'An architecture practice',        axis:'division', a:'regular grid: nine projects in nine cells',                   b:'uneven land: the projects as plots on a site',        pal:'P07' },
  { n:'08', brief:'A small press and bookshop',      axis:'preweb',   a:'early web: a list of links and a pane',                       b:'print: spines on a shelf',                            pal:'P17' },
  { n:'09', brief:'A ceramics studio selling pots',  axis:'route',    a:'made for it: every pot turned from its own profile',          b:'immersive: inside the kiln',                          pal:'P11' },
  { n:'10', brief:'A film festival, one week',       axis:'route',    a:'made for it: each film a frame that runs only when held',     b:'immersive: seen from the seats',                      pal:'P08' },
  { n:'11', brief:'An independent record label',     axis:'worlds',   a:'one idea: one record, turned by hand',                        b:'several worlds: six sleeves on one sheet',            pal:'P17' },
  { n:'12', brief:'An independent magazine',         axis:'preweb',   a:'early web: a raw contents page',                              b:'print: a printed contents page',                      pal:'P07' },
  { n:'13', brief:'A florist',                       axis:'division', a:'regular grid: sixteen beds in rows',                          b:'uneven land: a garden plan',                          pal:'P08' },
  { n:'14', brief:'A dance company’s season',   axis:'route',    a:'made for it: your movement is drawn as the dance',           b:'immersive: a stage, the light follows you',           pal:'S03' },
  { n:'15', brief:'A museum exhibition of small objects', axis:'density', a:'packed: one hundred and twenty objects in a drawer',   b:'nearly empty: one object in a large room',            pal:'P17' },
  { n:'16', brief:'A bakery',                        axis:'worlds',   a:'one idea: one loaf, sliced by the pointer',                   b:'several worlds: six bakes on one sheet',              pal:'P07' },
  { n:'17', brief:'A typeface foundry selling one face', axis:'density', a:'packed: every glyph at once',                           b:'nearly empty: one glyph at a time',                   pal:'P11' },
  { n:'18', brief:'A tattoo artist',                 axis:'route',    a:'made for it: a flash sheet drawn for this site',              b:'immersive: the chair under the lamp',                 pal:'P07' },
  { n:'19', brief:'A bicycle repair workshop',       axis:'division', a:'regular grid: services in cells, gears that mesh',            b:'uneven land: the workshop floor',                     pal:'P17' },
  { n:'20', brief:'A podcast about sleep',           axis:'preweb',   a:'early web: a raw episode list under a night of asterisks',    b:'print: an almanac page with the moon',                pal:'P11' }
];
