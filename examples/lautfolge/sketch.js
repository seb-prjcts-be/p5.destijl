// Recombined sound fragments from Merz 1, p. 8 and Merz 4, p. 37.
let paper, ink;
function setup() {
  createCanvas(600, 760).parent('drawing');
  pixelDensity(1); noLoop();
  const ground = createGraphics(width, height); ground.pixelDensity(1);
  ground.background(Merz.farbe.grau);
  paper = Merz.andruck(ground, { ink: 0, paper: 0.3, seed: 41 }); ground.remove();
  const layer = createGraphics(width, height); layer.pixelDensity(1); layer.clear();
  compose(layer);
  ink = Merz.andruck(layer, { ink: 0.22, paper: 0, seed: 17 }); layer.remove();
  describe('A sound poem with large OI EI, small repeated syllables, a vertical black passage and red punctuation. The groups form a fixed composition.');
}
function draw() {
  image(paper, 0, 0);
  image(ink, 0, 0);
}
// The page is drawn once on a transparent ink layer. Change a syllable, a size or the loop here.
function compose(g) {
  Merz.stempel('OI', 27, 182, { size: 182 }, g);
  Merz.stempel('EI', 258, 327, { size: 166, font: 'Georgia', color: Merz.farbe.rot }, g);
  Merz.stempel('BI DI', 38, 273, { size: 25, font: 'monospace' }, g);
  Merz.stempel('ZI C S B P D', 40, 308, { size: 14, font: 'monospace' }, g);
  for (let i = 0; i < 5; i++) Merz.stempel('O A  O A  la la', 38 + i * 12, 405 + i * 32, { size: 14 + i * 3, font: 'Georgia' }, g);
  Merz.stempel('HHH  HH  HHH  HH', 561, 592, { size: 30, font: 'Archivo Black', angle: -90 }, g);
  g.noStroke(); g.fill(Merz.farbe.rot); g.rect(32, 596, 170, 18);
  Merz.stempel('O la la la', 33, 681, { size: 49, font: 'Georgia' }, g);
  Merz.stempel('O A O A la la', 248, 724, { size: 23, font: 'Georgia' }, g);
}
