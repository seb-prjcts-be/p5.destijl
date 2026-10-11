// Recombined sound fragments from Merz 1, p. 8 and Merz 4, p. 37.
let bogen;
function setup() {
  createCanvas(600, 760).parent('drawing');
  noLoop();
  bogen = Merz.bogen({ paper: 0.3, ink: 0.22, seed: 17 });
  compose(bogen);
  describe('A sound poem with large OI EI, small repeated syllables, a vertical black passage and red punctuation. The groups form a fixed composition.');
}
function draw() {
  bogen.druck();
}
// The page is drawn once on the sheet. Change a syllable, a size or the loop here.
function compose(g) {
  Merz.stempel(Merz.satz('OI', { size: 125 }), 27, 57, g);
  Merz.stempel('EI', 258, 327, { size: 166, font: 'antiqua', weight: 700, color: Merz.farbe.rot }, g);
  Merz.stempel('BI DI', 38, 273, { size: 25, weight: 500, spacing: 2 }, g);
  Merz.stempel('ZI C S B P D', 40, 308, { size: 14, weight: 500, spacing: 2 }, g);
  for (let i = 0; i < 5; i++) Merz.stempel('O A  O A  la la', 38 + i * 12, 405 + i * 32, { size: 14 + i * 3, weight: 400 }, g);
  Merz.stempel('HHH  HH  HHH  HH', 561, 592, { size: 30, angle: -90 }, g);
  g.noStroke(); g.fill(Merz.farbe.rot); g.rect(32, 596, 170, 18);
  Merz.stempel('O la la la', 33, 681, { size: 49, weight: 400 }, g);
  Merz.stempel('O A O A la la', 248, 724, { size: 23, weight: 400 }, g);
}
