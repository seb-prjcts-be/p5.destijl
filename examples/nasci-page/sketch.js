// A new page informed by NASCI's contrasting scales and reading directions.
// Found phrases: Kunst ist Form (Merz 8/9, p. 78); NASCI (cover).
const pageDescription = 'A large NASCI title above branching geometric forms, a red field, narrow vertical text and small notes separated by open paper.';
function compose(g) {
  textAt(g, 'NASCI', 25, 139, 115);
  textAt(g, 'Kunst ist Form.', 31, 177, 16, 'Georgia');
  g.noStroke(); g.fill('#234b92'); g.rect(32, 207, 106, 12);
  g.fill('#b92d26'); g.rect(351, 222, 212, 320);
  g.push(); g.translate(260, 486); g.rotate(-0.24);
  for (let i = 0; i < 6; i++) {
    Merz.stempel(Merz.satz('Y', {size: 45 + i * 20, weight: 0.5}), -i * 24, -i * 38, {color: i % 2 ? '#234b92' : '#20201e'}, g);
  }
  g.pop();
  textAt(g, 'FORM', 362, 274, 39, 'Archivo Black', '#f7f7f2');
  textAt(g, 'KRAFT', 362, 316, 33, 'Archivo Black', '#f7f7f2');
  for (let i = 0; i < 12; i++) {g.fill('#f7f7f2');g.rect(365, 354 + i * 13, 172 - i * 9, 5);}
  g.push(); g.translate(578, 587); g.rotate(-HALF_PI);
  textAt(g, 'NASCI / FORM / KRAFT', 0, 0, 11, 'monospace');g.pop();
  textAt(g, 'Kunst ist Form.', 35, 607, 39, 'Georgia');
  textAt(g, 'Formen heißt entformen.', 35, 636, 20, 'Georgia');
  g.fill('#20201e');g.rect(35, 665, 525, 5);
  textAt(g, 'NASCI', 36, 709, 21);
  textAt(g, '8 / 9', 487, 715, 29);
  textAt(g, 'FORM / WACHSTUM / GLEICHGEWICHT', 35, 735, 9, 'monospace');
}
