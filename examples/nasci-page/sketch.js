// A new page informed by NASCI's contrasting scales and reading directions.
// Found phrases: Kunst ist Form (Merz 8/9, p. 78); NASCI (cover).
let blatt;
function setup() {
  createCanvas(600, 760).parent('drawing');
  noLoop();
  blatt = Merz.andruck({ paper: 0.45, ink: 0.22, seed: 17 });
  compose(blatt);
  describe('A large NASCI title above branching geometric forms, a red field, narrow vertical text and small notes separated by open paper.');
}
function draw() {
  Merz.stempel(blatt, 0, 0);
}
// The page is drawn once on the sheet, then stamped onto the canvas. Change a word, the red field or the Y loop here.
function compose(g) {
  g.stempel(Merz.satz('NASCI', { size: 83 }), 25, 56);
  g.stempel('Kunst ist Form.', 31, 177, { size: 16, weight: 400 });
  g.noStroke(); g.fill(Merz.farbe.blau); g.rect(32, 207, 106, 12);
  g.fill(Merz.farbe.rot); g.rect(351, 222, 212, 320);
  g.push(); g.translate(260, 486); g.rotate(-0.24);
  for (let i = 0; i < 6; i++) {
    g.stempel(Merz.satz('Y', { size: 45 + i * 20, weight: 0.5 }), -i * 24, -i * 38, { color: i % 2 ? Merz.farbe.blau : Merz.farbe.schwarz });
  }
  g.pop();
  g.stempel('FORM', 362, 274, { size: 39, color: Merz.farbe.grau });
  g.stempel('KRAFT', 362, 316, { size: 33, color: Merz.farbe.grau });
  g.noStroke();
  for (let i = 0; i < 12; i++) { g.fill(Merz.farbe.grau); g.rect(365, 354 + i * 13, 172 - i * 9, 5); }
  g.stempel('NASCI / FORM / KRAFT', 578, 587, { size: 11, weight: 500, spacing: 1, angle: -90 });
  g.stempel('Kunst ist Form.', 35, 607, { size: 39, weight: 400 });
  g.stempel('Formen heißt entformen.', 35, 636, { size: 20, weight: 400 });
  g.fill(Merz.farbe.schwarz); g.rect(35, 665, 525, 5);
  g.stempel('NASCI', 36, 709, { size: 21 });
  g.stempel('8 / 9', 487, 715, { size: 29 });
  g.stempel('FORM / WACHSTUM / GLEICHGEWICHT', 35, 735, { size: 9, weight: 500, spacing: 1 });
}
