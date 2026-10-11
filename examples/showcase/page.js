// Shared page mounting and fixed paper and ink treatment.
let pagePaper, pageInk;
function setup() {
  createCanvas(600, 760).parent('drawing');
  pixelDensity(1); noLoop();
  const ground = createGraphics(width, height); ground.pixelDensity(1);
  ground.background(Merz.farbe.grau);
  pagePaper = Merz.andruck(ground, { ink: 0, paper: 0.3, seed: 41 }); ground.remove();
  const ink = createGraphics(width, height); ink.pixelDensity(1); ink.clear();
  compose(ink);
  pageInk = Merz.andruck(ink, { ink: 0.22, paper: 0, seed: 17 }); ink.remove();
  describe(pageDescription);
}
function draw() {
  image(pagePaper, 0, 0);
  image(pageInk, 0, 0);
}
function textAt(g, value, x, y, size, font = 'Archivo Black', colour = '#20201e') {
  g.noStroke(); g.fill(colour); g.textFont(font); g.textSize(size); g.text(value, x, y);
}
