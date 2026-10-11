// A new page informed by NASCI's contrasting scales and reading directions.
// Found phrases: Kunst ist Form (Merz 8/9, p. 78); NASCI (cover).
let bogen;
function setup() {
  createCanvas(600, 760).parent('drawing');
  noLoop();
  bogen = Merz.bogen({ paper: 0.3, ink: 0.22, seed: 17 });
  compose(bogen);
  describe('A large NASCI title above branching geometric forms, a red field, narrow vertical text and small notes separated by open paper.');
}
function draw() {
  bogen.druck();
}
// The page is drawn once on the sheet. Change a word, the red field or the Y loop here.
function compose(g) {
  Merz.stempel(Merz.satz('NASCI', { size: 83 }), 25, 56, g);
  Merz.stempel('Kunst ist Form.', 31, 177, { size: 16, font: 'Georgia' }, g);
  g.noStroke(); g.fill(Merz.farbe.blau); g.rect(32, 207, 106, 12);
  g.fill(Merz.farbe.rot); g.rect(351, 222, 212, 320);
  g.push(); g.translate(260, 486); g.rotate(-0.24);
  for (let i = 0; i < 6; i++) {
    Merz.stempel(Merz.satz('Y', { size: 45 + i * 20, weight: 0.5 }), -i * 24, -i * 38, { color: i % 2 ? Merz.farbe.blau : Merz.farbe.schwarz }, g);
  }
  g.pop();
  Merz.stempel('FORM', 362, 274, { size: 39, color: Merz.farbe.grau }, g);
  Merz.stempel('KRAFT', 362, 316, { size: 33, color: Merz.farbe.grau }, g);
  g.noStroke();
  for (let i = 0; i < 12; i++) { g.fill(Merz.farbe.grau); g.rect(365, 354 + i * 13, 172 - i * 9, 5); }
  Merz.stempel('NASCI / FORM / KRAFT', 578, 587, { size: 11, font: 'monospace', angle: -90 }, g);
  Merz.stempel('Kunst ist Form.', 35, 607, { size: 39, font: 'Georgia' }, g);
  Merz.stempel('Formen heißt entformen.', 35, 636, { size: 20, font: 'Georgia' }, g);
  g.fill(Merz.farbe.schwarz); g.rect(35, 665, 525, 5);
  Merz.stempel('NASCI', 36, 709, { size: 21 }, g);
  Merz.stempel('8 / 9', 487, 715, { size: 29 }, g);
  Merz.stempel('FORM / WACHSTUM / GLEICHGEWICHT', 35, 735, { size: 9, font: 'monospace' }, g);
}
