// Load p5.js, p5.merz.js, ink.js and composition.js before this sketch.
// Change the composition in composition.js; both drawing routes are there.
const amount = .6;
const seed = 17;

function setup() {
  createCanvas(600, 840).parent('example');
  pixelDensity(1);
  noLoop();
  describe('A page with geometric letters, ordinary text, cut-out letters and small differences in ink coverage.');
}

function draw() {
  MerzCompositionStudy.render(window, amount, seed, 'direct');
}

function keyPressed() {
  if (key === 's' || key === 'S') saveCanvas('p5.merz-print', 'png');
}
