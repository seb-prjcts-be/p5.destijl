// A new cover composition after the supplied Die Blume Anna cover.
// The curve and bars are redrawn with p5; this is not a facsimile.
const pageDescription = 'Two vertical Anna Blume titles beside a sweeping black curve, a corner of repeated bars and a compact footer.';
function compose(g) {
  g.push(); g.translate(142, 442); g.rotate(-HALF_PI);
  textAt(g, 'Die Blume Anna', 0, 0, 43, 'Georgia');
  textAt(g, 'Die neue Anna Blume', 0, 76, 32, 'Georgia'); g.pop();
  g.noFill(); g.stroke('#20201e'); g.strokeWeight(49); g.strokeCap(ROUND);
  g.bezier(332, 44, 545, 159, 470, 348, 305, 466);
  g.noStroke(); g.fill('#20201e');
  for (let i = 0; i < 23; i++) {
    g.push(); g.translate(362, 40 + i * 21); g.rotate(-0.06); g.rect(0, 0, 43, 11); g.pop();
  }
  for (let i = 0; i < 20; i++) g.rect(45 + i * 18, 531, 10, 45);
  g.rect(191, 590, 79, 16);
  g.push(); g.translate(515, 485); g.rotate(-HALF_PI);
  textAt(g, 'Kurt Merz Schwitters', 0, 0, 22, 'Georgia'); g.pop();
  textAt(g, 'Die Blume Anna', 44, 665, 43, 'Georgia');
  textAt(g, 'Die neue Anna Blume', 171, 699, 23, 'Georgia');
  textAt(g, 'WORT / FORM / WIEDERHOLUNG', 240, 729, 9, 'monospace');
}
