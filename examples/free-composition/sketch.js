let work;

function setup() {
  createCanvas(700, 700).parent('example');
  noLoop();
  work = Merz.create({ width: 700, height: 700 });
  work.plane(60, 390, 220, 150, { color: Merz.palette.blue });
  work.line(60, 325, 640, 325, { color: Merz.palette.red, strokeWeight: 12 });
  work.text('FORM', 60, 115, { size: 120, spacing: 15 });
  const word = work.text('SPACE', 340, 550, { size: 36, spacing: 6 });
  work.update(word, { angle: -90 });
  describe('A blue rectangle, a red line and the geometric words FORM and SPACE.');
  document.getElementById('save-example').addEventListener('click', () => work.downloadSVG());
}

function draw() {
  work.draw();
}
