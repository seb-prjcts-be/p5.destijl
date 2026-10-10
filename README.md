# p5.merz

[Showcase, examples and documentation](https://seb-prjcts-be.github.io/p5.merz/)

Letters, lines and colour planes for your own p5.js sketches. Version 0.2.0.
The geometric letters are our own drawings, developed through studies of
Van Doesburg. Kurt Schwitters is a further reference for the typographic work.

Load p5.js, then p5.merz.js or its min-build, then your sketch.
Use the Merz API. p5.merz.js is the source of truth; the build regenerates
the min-build. The DeStijl API alias remains available for existing sketches.

The local working copy also includes `Merz.parts('R', { size: 100 })`:
named paths to draw, change and repeat in ordinary p5 code. `Merz.geometry()`
returns whole-text paths and dimensions. See the [drawing guide](docs/guide.html#geometry)
and [complete part sketch](experiments/merz-parts/module-parts.html).
The local fragment route accepts images, geometry and parts: `fragment(source, outline)`,
`tear(piece, { amount, seed })`, then `piece.toImage(p)` for ordinary p5 drawing.
See [three fragment examples](docs/examples.html#fragment-scan).
`Merz.surface(image, { ink: 0.12, paper: 0, seed: 17 })` adds quiet surface
variation to an image or graphics layer. Keep ink and paper on separate layers;
ordinary p5 code still draws the result. See [Fundsachen](experiments/merz-sheet/)
and the [surface guide](docs/guide.html#surface).
These additions are not yet included in the published 0.2.0 release.

```js
let work;
function setup() {
  createCanvas(600, 600);
  noLoop();
  work = Merz.create({ width: 600, height: 600 });
  work.plane(50, 330, 200, 150, { color: Merz.palette.blue });
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

## Fundsachen

Browse the [sample catalogue](docs/fundsachen.html), then load a fragment with `await Merz.fundsachen('001')` or its name, `merz-2-cover-m`. Use it with `tear()` and `stempel()`. The catalogue contains 28 letters, numbers, words, rules and images from Merz 2 and Merz 8/9. Each entry has a transparent PNG download; 17 letters, numbers and rules also have SVG silhouettes. Use `{ variant: 'scan' }` to load the original paper-backed crop.

For a downloaded sample use `await Merz.fundsachen('022', { url: 'merz-8-cover-nasci-ink.png' })`. The image path is relative to your sketch page; the library can remain online. To load the hosted collection, keep `assets/fundsachen/` beside the library, or provide its absolute URL as `{ baseURL: 'https://your-site.example/samples/' }`. Source credits and crop coordinates accompany the assets. See the [working sketch](experiments/merz-fundsachen/index.html).

## Development

`Merz.stempel(source, placements, p)` repeats geometry, letter parts or a fragment at explicit positions. Each placement sets `x`, `y` and optionally `angle`, `scale` and `color`. Use ordinary p5 drawing before and after it. See [three sketches](experiments/merz-stempel/index.html) and the [reference](docs/guide.html#stempel). This addition is available in the local development build.

```sh
npm ci
npm run build:min
npm test
```

Checks cover letter geometry, stable ids, atomic updates, drawing order,
spacing, SVG, renderer settings and repeatable ink coverage. Source and
min-build produce the same SVG. The bundled p5.js 2.3.4 has its own licence.
The library uses the MIT licence. There is no public release or CDN tag yet.
