let poster;
function setup() {
  createCanvas(700, 900).parent('poster');
  noLoop();
  poster = Merz.create({ width: 700, height: 900 });
  poster.plane(60, 405, 220, 180, { color: Merz.palette.blue });
  poster.text('EXPO\n2026', 60, 70, { size: 110, leading: 145, spacing: 18 });
  poster.line(60, 370, 640, 370, { color: Merz.palette.red, strokeWeight: 12 });
  poster.text('FORM & SPACE', 60, 640, { size: 36, spacing: 8 });
  poster.text('10/10 — 20:00', 60, 715, { size: 30, spacing: 6 });
  poster.text('€ 12,50 (–25%)', 60, 780, { size: 26, spacing: 5 });
  describe('An imagined exhibition poster: Expo 2026, Form and Space, 10 October at 20:00, 12 euros 50 with a 25 percent discount.');
  document.getElementById('save-poster').addEventListener('click', () => poster.downloadSVG('p5.merz-poster.svg'));
}
function draw() { poster.draw(); }
