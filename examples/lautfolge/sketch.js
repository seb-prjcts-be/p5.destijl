// Recombined sound fragments from Merz 1, p. 8 and Merz 4, p. 37.
let blatt;
function setup() {
  createCanvas(600, 760).parent('drawing');
  noLoop();
  blatt = Merz.andruck({ paper: 0.3, ink: 0.22, seed: 17 });
  compose(blatt);
  describe('A sound poem with large OI EI, small repeated syllables, a vertical black passage and red punctuation. The groups form a fixed composition.');
}
function draw() {
  Merz.stempel(blatt, 0, 0);
}
// The page is drawn once on the sheet, then stamped onto the canvas. Change a syllable, a size or the loop here.
function compose(g) {
  g.stempel(Merz.satz('OI', { size: 125 }), 27, 57);
  g.stempel('EI', 258, 327, { size: 166, font: 'antiqua', weight: 700, color: Merz.farbe.rot });
  g.stempel('BI DI', 38, 273, { size: 25, weight: 500, spacing: 2 });
  g.stempel('ZI C S B P D', 40, 308, { size: 14, weight: 500, spacing: 2 });
  for (let i = 0; i < 5; i++) g.stempel('O A  O A  la la', 38 + i * 12, 405 + i * 32, { size: 14 + i * 3, weight: 400 });
  g.stempel('HHH  HH  HHH  HH', 561, 592, { size: 30, angle: -90 });
  g.noStroke(); g.fill(Merz.farbe.rot); g.rect(32, 596, 170, 18);
  g.stempel('O la la la', 33, 681, { size: 49, weight: 400 });
  g.stempel('O A O A la la', 248, 724, { size: 23, weight: 400 });
}
