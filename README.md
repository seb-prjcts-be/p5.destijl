# p5.merz

[Showcase](https://seb-prjcts-be.github.io/p5.merz/) · [Examples](https://seb-prjcts-be.github.io/p5.merz/docs/examples.html) · [Guide](https://seb-prjcts-be.github.io/p5.merz/docs/guide.html) · [Merzbilder catalogue](https://seb-prjcts-be.github.io/p5.merz/docs/fundsachen.html) · [About](https://seb-prjcts-be.github.io/p5.merz/docs/about.html)

You set a page with the means of the magazine *Merz* (1923–1932): a sheet of paper, stamps of text from a printer's case, found letters and rules from the scans, pieces cut and torn, red and blue on cream. The library keeps the mechanics, the sheet, the measure, the fonts, the cutting and the surface; you choose every word, size and position in ordinary p5 code.

The names are Kurt Schwitters' own words for his work: Satz, Bauteile, Schnitt, Riss, Andruck, Stempel, Merzbilder. [About](https://seb-prjcts-be.github.io/p5.merz/docs/about.html) tells where the affection comes from.

## Install

Load p5.js, then the library, then your sketch. Keep `assets/fonts/` next to the library file; it holds the two bundled fonts.

```html
<script src="vendor/p5-2.3.4.min.js"></script>
<script src="p5.merz.js"></script>
<script src="sketch.js"></script>
```

The examples pin p5.js 2.3.4, so a sketch that works today works next year. The library uses the p5.js 2.x setup hook to load its fonts before `setup()`; see [Instance mode and modules](https://seb-prjcts-be.github.io/p5.merz/docs/guide.html#instance-mode) for a late or module load. `p5.merz.min.js` is the built copy of `p5.merz.js`.

## Quick start

A cover after Merz 8/9, with found words from the catalogue:

```js
let blatt;
function setup() {
  createCanvas(600, 760);
  noLoop();
  const farbe = Merz.farbe;
  blatt = Merz.andruck({ paper: 0.55, ink: 0.15, seed: 17, color: '#e3d5bd' });
  blatt.stempel('MERZ', 142, 215, { stretch: 62, width: 318, height: 158, color: farbe.blau });
  blatt.stempel('NASCI', 372, 357, { width: 203, height: 44, color: farbe.rot });
  blatt.stempel(['WAS SICH AUS SICH', 'SELBST DURCH EIGENE', 'KRAFT ENTWICKELT'], 165, 401,
    { size: 24, weight: 500, stretch: 125, leading: 44.6, width: 410, color: farbe.rot, rule: { weight: 9, color: farbe.blau } });
}
function draw() {
  Merz.stempel(blatt, 0, 0);
}
```

The sheet is made once in `setup()`; `draw()` prints it. Change a word, a size or a position and run again.

## The sheet

`Merz.andruck({ paper, ink, seed, color })` without a source makes a proof sheet the size of the canvas, with its own paper. Draw on it with p5, or with the calls it carries: `blatt.stempel()`, `blatt.riss()`, `blatt.merzbilder()`. `Merz.stempel(blatt, 0, 0)` prints paper and ink; the ink is treated once and renewed after `clear()` or `background()`. [Sheet](https://seb-prjcts-be.github.io/p5.merz/docs/guide.html#sheet).

## Stamps

`Merz.stempel(text, x, y, options)` sets text from the printer's case: `font` is `grotesk` (Archivo, the default) or `antiqua` (Bodoni Moda), with `weight` from 100 to 900 and `stretch` from 62 to 125. An array of strings sets lines; `width` fills the measure; `width` with `height` stretches the letters into that box; `rule` draws bars between the lines; `align` and segments on one line are there when a page needs them. The same call stamps geometry, letter parts and cut pieces, repeated with `repeat`, `stepX` and `stepY`. [Stempel](https://seb-prjcts-be.github.io/p5.merz/docs/guide.html#stempel).

## Letters and parts

`Merz.satz('MERZ', { size: 100 })` returns the geometric alphabet as paths: our own drawings after Van Doesburg, 26 letters, numerals and punctuation. `Merz.bauteile('R')` returns its named parts, `Merz.bauteil('R', 'bowl')` one of them. Draw them with `stempel()` or with your own `vertex()` loop. [Geometry](https://seb-prjcts-be.github.io/p5.merz/docs/guide.html#geometry).

## Cut and tear

`Merz.ausschnitt(source, x, y, width, height)` cuts a rectangle, `rundschnitt()` an oval, `schnitt()` your own convex outline, `splitter()` a grid of pieces. `Merz.riss(piece, { amount, seed })` tears the edge inward. Sources are images, graphics, geometry, parts and other pieces. `piece.bau()` gives the raster image. [Fragments](https://seb-prjcts-be.github.io/p5.merz/docs/guide.html#fragments).

## Surface

`Merz.andruck(image, { ink, paper, seed })` treats a layer: ink loses a little coverage, paper gets tonal clouds, fibre-like streaks and grain. At paper 1 the variation matches the covers of Merz 2 and Merz 8/9 measured at 600 pixels wide; their colours are #a08962 and #e3d5bd. [Surface](https://seb-prjcts-be.github.io/p5.merz/docs/guide.html#surface).

## Merzbilder

`await Merz.merzbilder('001')` loads a found piece from the catalogue, 28 letters, numerals, words, rules and images from Merz 2 and Merz 8/9, as a piece for `stempel()` and `riss()`; `await Merz.merzbilder('001', x, y, width)` draws it straight away. Every piece has a transparent PNG download, 17 also an SVG silhouette. [Catalogue](https://seb-prjcts-be.github.io/p5.merz/docs/fundsachen.html).

## Composition and SVG

`Merz.create()` keeps geometric letters, lines and planes as elements with ids, edits them later and exports editable SVG without font dependencies. Most sketches need no composition; it is there when you want vectors. [Composition](https://seb-prjcts-be.github.io/p5.merz/docs/guide.html#keep-a-composition).

## Colours

`Merz.farbe.grau`, `rot`, `schwarz`, `blau` and `gelb`, also by index 0 to 4. `Merz.settings({ rot: '#c4382d' })` returns a palette with your own values. [Colours](https://seb-prjcts-be.github.io/p5.merz/docs/guide.html#settings).

## Examples

- [Umschlag](https://seb-prjcts-be.github.io/p5.merz/examples/umschlag/): a cover after Merz 8/9, every line a found text.
- [Brillantine](https://seb-prjcts-be.github.io/p5.merz/examples/brillantine/): an imagined advertisement with a headline in two boxes.
- [Zwei](https://seb-prjcts-be.github.io/p5.merz/examples/zwei/): found pieces from the catalogue in a new arrangement, on the tan of Merz 2.
- [Riss](https://seb-prjcts-be.github.io/p5.merz/examples/riss/): the geometric alphabet cut, torn and repeated.
- [Die Blume Anna](https://seb-prjcts-be.github.io/p5.merz/examples/blume-anna/), [NASCI](https://seb-prjcts-be.github.io/p5.merz/examples/nasci-page/), [OI EI](https://seb-prjcts-be.github.io/p5.merz/examples/lautfolge/): three earlier pages.
- [Poster](https://seb-prjcts-be.github.io/p5.merz/examples/poster/) and [NASCI / KRAFT](https://seb-prjcts-be.github.io/p5.merz/examples/free-composition/): compositions with SVG export.
- [Characters](https://seb-prjcts-be.github.io/p5.merz/examples/characters/): the geometric alphabet in one view.

Each page shows its code beside the drawing, with a button to copy the sketch. The [studies](https://seb-prjcts-be.github.io/p5.merz/docs/research.html) behind the library stay online.

## Public API

`Merz.ready()`, `settings()`, `satz()`, `bauteile()`, `bauteil()`, `ausschnitt()`, `rundschnitt()`, `schnitt()`, `splitter()`, `riss()`, `andruck()`, `stempel()`, `merzbilder()`, `create()`, with `Merz.farbe`, `Merz.palette`, `Merz.characters` and `Merz.version`. The [function reference](https://seb-prjcts-be.github.io/p5.merz/docs/guide.html#api-reference) lists arguments and return values.

## Test

```sh
npm ci
npm run build:min
npm test
```

`npm test` checks geometry, stable ids, SVG, cutting, surface, fonts and the catalogue for source and min-build. [tests/run-browser.html](tests/run-browser.html) runs the 19 browser pages, including every example page. After editing `assets/fundsachen/catalogue.json`, run `npm run sync:fundsachen`.

Version 0.3.0 is prepared here; it has no release tag yet.

## How this was made

Designed and directed by Sebastien Vanblaere, written with AI assistance; the responsibility is his. The geometric letters come out of studies of Van Doesburg's alphabet; the pages follow the Merz scans at the University of Iowa.

## Licence and credits

The library code is MIT. The scans and the pieces cut from them in `assets/fundsachen/` fall outside that licence; they come from Merz 2 and Merz 8/9, held by the International Dada Archive, University of Iowa Libraries, see [SOURCES.md](assets/fundsachen/SOURCES.md). The Merz 2 reuse record remains to be verified. The bundled p5.js 2.3.4 has its own licence.

The printer's case is bundled under the SIL Open Font License: [Archivo](assets/fonts/archivo/README.md) by Omnibus-Type and [Bodoni Moda](assets/fonts/bodoni-moda/README.md) by Owen Earl, both taken unmodified from the [Google Fonts repository](https://github.com/google/fonts). Our thanks to both designers, to the Google Fonts project, and to the International Dada Archive for keeping the scans available: [University of Iowa: Merz, 1923–1932](https://sdrc.lib.uiowa.edu/dada/merz/).
