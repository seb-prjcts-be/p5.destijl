// Load p5.js and p5.merz.js. Keep assets/fundsachen beside the library.
async function setup() {
  const canvas = createCanvas(600, 760);
  if (document.getElementById('drawing')) canvas.parent('drawing');
  pixelDensity(1); noLoop();
  const m = await Merz.fundsachen('001');
  const r = await Merz.fundsachen('merz-2-cover-r');
  const rule = await Merz.fundsachen('003');
  background('#f7f7f2');
  Merz.stempel(m, [{ x: 40, y: 50, scale: 2 }, { x: 320, y: 330, scale: 1.5, angle: 8 }]);
  Merz.stempel(Merz.tear(r, { amount: 0.2, seed: 17 }), [{ x: 250, y: 90, scale: 2.4, angle: -8 }]);
  const lines = [];
  for (let i = 0; i < 7; i++) lines.push({ x: 40 + i * 8, y: 530 + i * 20, scale: 1.6 });
  Merz.stempel(rule, lines);
  noStroke(); fill('#b92d26'); textFont('monospace'); textSize(20); text('001 / 002 / 003', 40, 725);
}
