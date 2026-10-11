// A few sounds from Kurt Schwitters' Ursonate, set with the library itself.
function setup() {
  const holder = document.getElementById('hero-canvas');
  createCanvas(holder.clientWidth, holder.clientHeight).parent(holder);
  noLoop();
  describe('Fümms in large serif letters, a red geometric M and repeated letter parts. The open space holds the p5.merz title.');
}

function draw() {
  resetMatrix();
  background(Merz.farbe.grau);
  // One page for wide screens, a taller one for phones; the canvas scales to fit.
  const page = width < 700
    ? { width: 600, height: 760, word: [24, 174, 155], m: [290, 155, 220], row: [45, 327], forks: [330, 421], line: [28, 389, 238] }
    : { width: 1200, height: 620, word: [46, 215, 244], m: [805, 210, 310], row: [658, 342], forks: [870, 559], line: [644, 430, 763] };
  scale(width / page.width, height / page.height);
  const farbe = Merz.farbe;

  Merz.stempel(Merz.satz('M', { size: page.m[2], weight: 0.48 }), page.m[0], page.m[1], { color: farbe.rot });
  Merz.stempel('Fümms', page.word[0], page.word[1], { size: page.word[2], font: 'Georgia' });
  for (let i = 0; i < 5; i++) {
    Merz.stempel('m', page.row[0] + i * 34.4, page.row[1] - i * 6.3, { size: 15 + i * 5, font: 'monospace', angle: -10.3 });
  }
  Merz.stempel(Merz.bauteil('Y', 'fork', { size: 35, weight: 0.4 }), page.forks[0], page.forks[1], { repeat: 5, stepX: 34 });
  stroke(farbe.schwarz); strokeWeight(2);
  line(page.line[0], page.line[1], page.line[2], page.line[1]);
}

function windowResized() {
  const holder = document.getElementById('hero-canvas');
  resizeCanvas(holder.clientWidth, holder.clientHeight);
  redraw();
}
