# p5.merz

[Showcase, examples and documentation](https://seb-prjcts-be.github.io/p5.merz/)

When I was in school, we took the bus to Paris, where I saw work by loads of painters and sculptors I already adored. There was one question I held on to until we were on the bus back to Ghent, when I finally asked my teacher:<br>
“Who is KS?”<br>
She smiled and said:<br>
“That is Kurt Schwitters.”

The name p5.merz comes out of that affection for Schwitters' work. His typographical work reached a high point in the magazine *Merz* (1923–1932). Twenty-one issues were published, numbered 1–24. Issues 10, 22 and 23 were never published.

This library and its language reflect the vocabulary Kurt Schwitters used to document his artistic and typographic work. Words are important, so we kept them.

## Using the library

Load p5.js, then p5.merz.js or its min-build, then your sketch.
Text stamps come from a printer's case of two bundled fonts, loaded before setup() in p5.js 2.x: Archivo as the grotesk, in six widths and every weight, and Bodoni Moda as the antiqua for numerals and contrast. Keep `assets/fonts/` next to the library file.
Use the Merz API. p5.merz.js is the source of truth; the build regenerates
the min-build.

A page needs a sheet and a few stamps. This is a cover after Merz 8/9, with found words from the catalogue:

```js
let blatt;
function setup() {
  createCanvas(600, 760);
  noLoop();
  const farbe = Merz.farbe;
  blatt = Merz.andruck({ paper: 0.25, ink: 0.15, seed: 17 });
  blatt.stempel('MERZ', 142, 215, { stretch: 62, width: 318, height: 158, color: farbe.blau });
  blatt.stempel('NASCI', 372, 357, { width: 203, height: 44, color: farbe.rot });
  blatt.stempel(['WAS SICH AUS SICH', 'SELBST DURCH EIGENE', 'KRAFT ENTWICKELT'], 165, 401,
    { size: 24, weight: 500, stretch: 125, leading: 44.6, width: 410, color: farbe.rot, rule: { weight: 9, color: farbe.blau } });
}
function draw() {
  Merz.stempel(blatt, 0, 0);
}
```

`andruck()` without a source is a proof sheet the size of the canvas, with its own paper and ink; the sheet carries the drawing calls. `stempel()` sets text, geometry or a cut piece, and prints a sheet; a `width` fills the measure, `width` with `height` stretches the letters, and `rule` draws bars between lines. The [showcase](https://seb-prjcts-be.github.io/p5.merz/) runs four complete pages beside their code.

The library also includes `Merz.bauteile('R', { size: 100 })`:
named paths to draw, change and repeat in ordinary p5 code. Use `Merz.bauteil('R', 'bowl')` to pick one by name. `Merz.satz()`
returns whole-text paths and dimensions. See the [drawing guide](docs/guide.html#geometry)
and [complete part sketch](experiments/merz-parts/module-parts.html).
Cut images, graphics, geometry or letter parts with the same three calls:

- `Merz.ausschnitt(source, x, y, width, height)` cuts a rectangle or strip.
- `Merz.rundschnitt(source, x, y, width, height)` cuts an oval; omit height for a circle.
- `Merz.schnitt(source, points)` cuts your own convex outline.

The first two use the top-left corner in source coordinates. Each returns a
fragment for `riss()`, `stempel()` or `bau()`.

```js
const piece = Merz.ausschnitt(source, 8, 48, 286, 167);
const cut = Merz.riss(piece, { amount: 0.3, seed: 17 }).bau();
image(cut, 40, 80);
```

`bau()` uses global p5. In instance mode, use `bau(p)`.
Divide a source into several pieces with `Merz.splitter(source, { rows: 3 })`.
Use `{ columns: 4 }` for vertical strips or `{ rows: 3, columns: 4 }` for a grid.
The array runs left to right, then top to bottom. Each piece works with
`riss()`, `stempel()` and `bau()`.

See [three fragment examples](docs/examples.html#fragment-scan) and the
[cutting guide](docs/guide.html#fragments).
`Merz.andruck(image, { ink: 0.12, paper: 0, seed: 17 })` adds quiet surface
variation to an image or graphics layer. Keep ink and paper on separate layers;
ordinary p5 code still draws the result. See [Merzbilder](experiments/merz-sheet/)
and the [surface guide](docs/guide.html#surface).

`Merz.andruck({ paper: 0.3, ink: 0.2 })` returns a proof sheet the size of the canvas. Draw on it with p5 or with the calls it carries, then `Merz.stempel(blatt, 0, 0)` prints paper and ink in draw(). See the [sheet guide](docs/guide.html#sheet).

```js
let work;
function setup() {
  createCanvas(600, 600);
  noLoop();
  work = Merz.create({ width: 600, height: 600 });
  work.plane(50, 330, 200, 150, { color: Merz.farbe.blau });
  work.line(50, 280, 550, 280, { strokeWeight: 8 });
  work.text('FORM', 50, 90, { size: 100 });
}
function draw() {
  work.draw();
}
```

Drawing methods return stable ids. Use update, move, bringToFront, sendToBack
and remove to edit elements. SVG keeps the geometry and drawing order in an
editable group per element, without font dependencies.

- [Showcase](index.html)
- [Examples](docs/examples.html)
- [Guide and API](docs/guide.html)
- [About](docs/about.html)
- [Documentation and studies](docs/index.html)

## Characters and drawing

The geometric letters are our own drawings, developed through studies of Van Doesburg.

26 distinct uppercase letters, numbers, punctuation, symbols, spaces and new
lines are available. Accents are simplified and curly quotes are recognised.
Short characters have narrower frames. Unsupported characters raise an error.
D/O and U/V have distinct shapes; Q stays within its frame. The unusual letter
shapes still need readability studies with users.

This version targets p5.js 2.x and the 2D canvas. Examples use global and
instance mode. Geometry and SVG also work without p5. Match canvas and
composition dimensions for the same crop. External p5 transforms are not
included in SVG. Colours are six-digit hex values; choose your own palette.

## Letters and ink

The [Merz study](experiments/merz-print/index.html) draws the same page with
stored elements or ordinary p5 functions. It combines geometric letters,
system text and real cut-outs, with static seeded ink coverage.
The [drawing guide](docs/guide.html) explains the library API.
The ink helpers are experimental and do not extend the public API.

A separate module for the geometric alphabet is a possibility to investigate. It has not been implemented.

## Colours

The default colours are available directly:

```js
background(Merz.farbe.grau);
fill(Merz.farbe.rot); // also Merz.farbe[1]
```

For a custom palette, use `const farbe = Merz.settings({ rot: '#c4382d', grau: '#f1eddf' })`. The default `Merz.farbe` stays unchanged.
The order is grau, rot, schwarz, blau, gelb (indices 0–4).
Keep `farbe` outside setup when draw() also uses it.

## Merzbilder

Draw a sample directly in async setup():

```js
await Merz.merzbilder('001', 40, 60, 140);
```

The last value is its width; proportions are preserved. Loading is handled by the library.

Browse the [sample catalogue](docs/fundsachen.html), then load a fragment with `await Merz.merzbilder('001')` or its name, `merz-2-cover-m`. Use it with `riss()` and `stempel()`. The catalogue contains 28 letters, numbers, words, rules and images from Merz 2 and Merz 8/9. Each entry has a transparent PNG download; 17 letters, numbers and rules also have SVG silhouettes. Use `{ variant: 'scan' }` to load the original paper-backed crop.

For a downloaded sample use `await Merz.merzbilder('022', { url: 'merz-8-cover-nasci-ink.png' })`. The image path is relative to your sketch page; the library can remain online. To load the hosted collection, keep `assets/fundsachen/` beside the library, or provide its absolute URL as `{ baseURL: 'https://your-site.example/samples/' }`. Source credits and crop coordinates accompany the assets. See the [working sketch](experiments/merz-fundsachen/index.html).

## Development

Version 0.3.0 is prepared here; it has no release tag yet.

`Merz.stempel('rrrt', 28, 98)` draws text. Add options when needed: `Merz.stempel('rrrt', 28, 98, { size: 105 })`. The same short form accepts geometry, parts and fragments. In instance mode, pass the p5 instance or graphics buffer last, with or without options.

`Merz.stempel(source, placements, p)` repeats geometry, letter parts or a fragment at explicit positions. Each placement sets `x`, `y` and optionally `angle`, `scale` and `color`. Use ordinary p5 drawing before and after it. See [three sketches](experiments/merz-stempel/index.html) and the [reference](docs/guide.html#stempel).

```sh
npm ci
npm run build:min
npm test
```

After editing `assets/fundsachen/catalogue.json`, run `npm run sync:fundsachen` to update its readable copy in the library. The min-build checks that both copies agree and writes only `p5.merz.min.js`.

The [browser runner](tests/run-browser.html) runs all browser checks sequentially. Select the full Merzbilder catalogue for every scan and SVG; the default run samples letters, rules, numbers, words, images and text.

Checks cover letter geometry, stable ids, atomic updates, drawing order,
spacing, SVG, renderer settings and repeatable ink coverage. Source and
min-build produce the same SVG. The bundled p5.js 2.3.4 has its own licence.
The library code uses the MIT licence. The facsimiles and derived samples in `assets/fundsachen/` are excluded from that licence. They come from Merz 2 and Merz 8/9, held by the International Dada Archive, University of Iowa Libraries. See [source credits and reuse notes](assets/fundsachen/SOURCES.md). The Merz 2 reuse record remains to be verified.

The printer's case is bundled under the SIL Open Font License: [Archivo](assets/fonts/archivo/README.md) by Omnibus-Type and [Bodoni Moda](assets/fonts/bodoni-moda/README.md) by Owen Earl, both taken unmodified from the [Google Fonts repository](https://github.com/google/fonts). Our thanks to both designers and to the Google Fonts project for keeping these faces free and available.

## Sources

[University of Iowa: Merz, 1923–1932](https://sdrc.lib.uiowa.edu/dada/merz/).
