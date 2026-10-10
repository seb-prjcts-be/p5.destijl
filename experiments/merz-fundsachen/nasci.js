// With p5.js and p5.merz.js loaded.
async function setup() {
  const farbe = Merz.settings();
  const canvas = createCanvas(600, 760);
  if (document.getElementById('drawing')) canvas.parent('drawing');
  pixelDensity(1); noLoop();
  const [nasci, eight, nine, hand, rule, kraft] = await Promise.all(
    ['022', '020', '021', '026', '025', '024'].map(id => Merz.fundsachen(id))
  );
  const paper = createGraphics(width, height);
  paper.pixelDensity(1);
  paper.background(farbe.grau);
  image(Merz.surface(paper, { ink: 0, paper: 0.18, seed: 17 }), 0, 0);
  paper.remove();
  Merz.stempel(eight, [{ x: 25, y: 20, scale: 1.15 }]);
  Merz.stempel(nine, [{ x: 405, y: 100, scale: 1.15 }]);
  Merz.stempel(nasci, [
    { x: 170, y: 30, scale: 1.08 },
    { x: 35, y: 280, scale: 1.5 },
    { x: 150, y: 455, angle: -90, scale: 0.55 }
  ]);
  Merz.stempel(kraft, [{ x: 170, y: 465, scale: 1.5 }]);
  Merz.stempel(rule, [{ x: 25, y: 250, scale: 0.66 }, { x: 25, y: 700, scale: 0.66 }]);
  // Seven hands along the bottom. Perhaps fewer would do.
  const hands = [];
  for (let i = 0; i < 7; i++) hands.push({ x: 30 + i * 79, y: 565, scale: 1 });
  Merz.stempel(hand, hands);
}
