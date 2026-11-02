# Litmus

A taste layer for AI. One person's judgment, written down, so a model can use it.

- Site — https://noorbsharma21.github.io/litmus/
- Engine — https://noorbsharma21.github.io/litmus/engine/

## 01 The problem

Building was never the problem. Ask a model for six versions and you get six, all usable. What it has no view on is which one is worth keeping, and that comes back to you every time. Supply no view and you get the middle of everything.

Last semester every project opened with forty minutes of the same corrections: no purple gradient, no centred heading, no rounded corners. By the fifth one I was pasting the same paragraph into an empty chat.

## 02 The idea

Taste works like a limit. What makes work yours is the long list of things you will not do, and that list never gets written down, so it never reaches the prompt.

Litmus writes it down. You say what you are making. Everything else is already decided.

Four things the file holds: the refusals, the rules, the measures, the evidence. The refusals come first, because a model will do anything you have not forbidden.

## 03 What is in here

| Path | What it is |
| --- | --- |
| `index.html` | The argument. Problem, method, what the research says, and the current taste file printed in full. |
| `engine/index.html` | The engine, stage one. Reads the corpus, runs the judgments, writes the file. |
| `engine/data.js` | The corpus. Every record came from reading the piece; nothing is invented. |
| `engine/site.js` | The sample renderer — draws real pages in the taste so you can see it applied. |
| `images/` | The source work. Hand-drawn artwork and camera roll, years older than any of this. |

No build, no dependencies. Open `index.html` in a browser, or serve the folder over HTTP if you want the engine's relative paths to resolve cleanly.

## 04 How the engine works

Forty-three pieces of my own work go in, twelve read and tagged so far. `read:true` means the image was looked at by hand; `read:false` is queued.

Ninety-four specimens get judged in two rounds. Each is shown three ways — large, small, and sitting inside a page — because a decision can be right in one place and wrong in another. Type that holds up as a headline falls apart at 12px, and the engine should be able to say so.

Then it subtracts. Six attributes are true of every competent gallery on the internet: limited palette, high contrast, considered spacing, clear hierarchy, legible type, intentional composition. Those get thrown away. What survives the subtraction is the gap — the part that is actually mine rather than the part that is merely good.

Rules carry weight, and the hard ones are marked so they are not traded off against preferences. When I mark something wrong, the file rewrites itself.

The sample renderer draws each page at a real page width and scales it down afterwards, so 34px type reads as 34px type instead of as a poster. Accent colours are filtered for contrast against the ground they will actually sit on before one is picked, rather than checked after — the file calls contrast non-negotiable, and a sample that broke it would make a liar of the thing it is demonstrating.

A brief also picks the skeleton. A wine shop and a photography site are not the same page with different type on it: one is a catalogue with prices and a buy path, the other is a stack of pictures with almost no words. The taste is what makes both recognisably the same hand. The skeleton is what stops them looking like each other.

## 05 Method

I am not writing my taste down from memory. I make things and record what I decide while making them, including the decisions I threw out — the thrown-out ones teach it more.

1. Design five or six things myself
2. Log every decision, kept and thrown out
3. Write the never list and the always list
4. Feed it back and mark what it got wrong
5. Write the file
6. Test it on something new

Steps 3 to 6 repeat. If nobody can see the difference, go back to 3.

Saved references sit underneath as background, but they count for less. What I made says more than what I admire.

## 06 What comes out

Two forms.

**A prompt.** Copy it, paste it, use it once. Good for a single piece.

**A skill.** One page of instructions you drop into a project folder. Every chat about that project then starts with the taste already loaded and you never type the setup again. This is the one I use. It is short on purpose — a model skims anything longer.

## 07 Prior work

Four findings shaped how this is built.

- **ViPer** has people comment on a handful of images saying what they like and dislike, then turns that into a structured list of liked and disliked attributes. Close to what this does, and it holds up. Both halves matter — the dislikes carry as much as the likes.
- **A few examples are enough.** The corpus does not need to be large to separate one person from the average.
- **Mere exposure** (Zajonc, 1968). People shown unfamiliar shapes preferred the ones they had seen most, and later work found it holds even when they cannot remember seeing the image at all. You like what you have already been looking at, which is why a camera roll is evidence.
- Asking *why* beats asking *which*.

## 08 Status

Stage one, running. Twelve of forty-three pieces read. The taste file on the site is version two.

## 09 Licence

Code, engine and written method are MIT — see [LICENSE](LICENSE).

The artwork in `images/` is not. Those are my own drawings, paintings and photographs, published here as the evidence the method runs on, and reserved in full. Not licensed for reuse or for inclusion in a training corpus.

Typefaces are linked from Google Fonts, not bundled. Full terms in [NOTICE](NOTICE).
