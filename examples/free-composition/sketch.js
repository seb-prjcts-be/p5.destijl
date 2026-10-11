// Found texts: T360/T393, Merz 8/9, cover.
// See assets/fundsachen/texts/catalogue.json for source scans.
let work;

function setup() {
  createCanvas(700, 700).parent('example');
  noLoop();
  work = Merz.create({ width: 700, height: 700 });
  work.line(60, 325, 640, 325, { color: Merz.palette.red, strokeWeight: 12 });
  work.text('NASCI', 60, 115, { size: 120, spacing: 15 });
  // Five moments of one construction. Change the step to change its growth.
  for (let i = 0; i < 5; i++) {
    const size = 48 + i * 16;
    work.letter('Y', 60 + i * 120, 520 - size, { size, weight: 0.55 });
  }
  work.text('KRAFT', 60, 565, { size: 40, spacing: 8 });
  work.plane(60, 650, 580, 12, { color: Merz.palette.blue });
  describe('NASCI above five branching Y forms growing from left to right along a shared baseline, with KRAFT below, a red rule and a blue strip.');
  document.getElementById('save-example').addEventListener('click', () => work.downloadSVG());
}

function draw() {
  work.draw();
}
