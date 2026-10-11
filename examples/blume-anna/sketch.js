// A new cover composition after the supplied Die Blume Anna cover.
// The curve and bars are redrawn with p5; this is not a facsimile.
let blatt;
function setup() {
  createCanvas(600, 760).parent('drawing');
  noLoop();
  blatt = Merz.andruck({ paper: 0.45, ink: 0.22, seed: 17 });
  compose(blatt);
  describe('Two vertical Anna Blume titles beside a sweeping black curve, a corner of repeated bars and a compact footer.');
}
function draw() {
  Merz.stempel(blatt, 0, 0);
}
// The page is drawn once on the sheet, then stamped onto the canvas. Change a word, a position or the curve here.
function compose(g) {
  g.stempel('Die Blume Anna', 142, 442, { size: 43, weight: 700, angle: -90 });
  g.stempel('Die neue Anna Blume', 218, 442, { size: 32, weight: 500, angle: -90 });
  g.noFill(); g.stroke(Merz.farbe.schwarz); g.strokeWeight(49); g.strokeCap(ROUND);
  g.bezier(332, 44, 545, 159, 470, 348, 305, 466);
  g.noStroke(); g.fill(Merz.farbe.schwarz);
  for (let i = 0; i < 23; i++) {
    g.push(); g.translate(362, 40 + i * 21); g.rotate(-0.06); g.rect(0, 0, 43, 11); g.pop();
  }
  for (let i = 0; i < 20; i++) g.rect(45 + i * 18, 531, 10, 45);
  g.rect(191, 590, 79, 16);
  g.stempel('Kurt Merz Schwitters', 515, 485, { size: 22, weight: 500, angle: -90 });
  g.stempel('Die Blume Anna', 44, 665, { size: 43, weight: 700 });
  g.stempel('Die neue Anna Blume', 171, 699, { size: 23, weight: 500 });
  g.stempel('WORT / FORM / WIEDERHOLUNG', 240, 729, { size: 9, weight: 500, spacing: 1 });
}
