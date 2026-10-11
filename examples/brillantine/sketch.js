// An imagined advertisement. BRILLANTINE: Merz 4, p. 36; Nichts ist Zufall: Merz 1, p. 7.
// Other product wording and numbers are invented for this sketch.
let paper, impression;
let moving = new URLSearchParams(location.search).get('motion') === '1';
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let elapsed = 0;

function setup() {
  createCanvas(600, 760).parent('drawing');
  pixelDensity(1);
  frameRate(30);
  const ground = createGraphics(width, height);
  ground.pixelDensity(1);
  ground.background('#f7f7f2');
  paper = Merz.andruck(ground, { ink: 0, paper: 0.25, seed: 17 });
  ground.remove();

  const g = createGraphics(width, height);
  g.pixelDensity(1);
  g.clear();
  g.noStroke();
  g.fill('#20201e');
  g.textFont('monospace');
  g.textSize(12);
  g.text('ESSENZ / NR. 04', 34, 42);
  g.text('50 ml', 510, 42);
  g.fill('#b92d26');
  g.rect(34, 64, 532, 8);
  Merz.stempel(Merz.satz('BRILL', { size: 102, spacing: 9, weight: 0.58 }), 30, 96, { color: '#20201e' }, g);
  Merz.stempel(Merz.satz('ANTINE', { size: 84, spacing: 6, weight: 0.58 }), 30, 220, { color: '#20201e' }, g);
  g.noStroke();
  g.fill('#b92d26');
  g.rect(34, 340, 195, 245);
  g.fill('#f7f7f2');
  g.textFont('Georgia');
  g.textSize(43);
  g.text('Nichts', 48, 402);
  g.text('ist', 48, 448);
  g.text('Zufall.', 48, 494);
  g.textFont('monospace');
  g.textSize(11);
  g.text('FORM / GLANZ', 49, 561);

  // A bottle is drawn from simple p5 geometry, with a geometric letter on its label.
  g.push();
  g.translate(302, 361);
  g.rotate(-0.10);
  g.fill('#20201e');
  g.rect(52, -24, 82, 36);
  g.rect(66, 12, 54, 35);
  g.beginShape();
  for (const point of [[66,42],[120,42],[158,85],[158,250],[26,250],[26,85]]) g.vertex(...point);
  g.endShape(CLOSE);
  g.fill('#f7f7f2');
  g.rect(37, 110, 110, 99);
  Merz.stempel(Merz.satz('B', { size: 64, weight: 0.6 }), 50, 124, { color: '#b92d26' }, g);
  g.fill('#f7f7f2');
  g.textSize(10);
  g.text('04', 82, 235);
  g.pop();

  g.push();
  g.translate(556, 595);
  g.rotate(-HALF_PI);
  g.fill('#20201e');
  g.textSize(13);
  g.text('BRILLANTINE / ESSENZ / 04', 0, 0);
  g.pop();
  g.fill('#20201e');
  g.rect(34, 634, 532, 3);
  g.textFont('Georgia');
  g.textSize(31);
  g.text('Ein wenig genügt.', 34, 683);
  g.textFont('monospace');
  g.textSize(10);
  g.text('ESSENZ     /     FORM     /     GLANZ', 34, 724);
  g.text('04', 549, 724);
  impression = Merz.andruck(g, { ink: 0.17, paper: 0, seed: 17 });
  g.remove();
  moving = moving && !reducedMotion.matches;
  updateButton();
  if (!moving) noLoop();
  document.getElementById('motion').addEventListener('click', () => {
    moving = !moving;
    updateButton();
    if (moving) loop(); else { noLoop(); redraw(); }
  });
  document.getElementById('save').addEventListener('click', () => saveCanvas('brillantine', 'png'));
  reducedMotion.addEventListener('change', event => {
    if (event.matches) { moving = false; updateButton(); noLoop(); redraw(); }
  });
  describe('An imagined Brillantine advertisement: a large black heading, red quotation block, tilted bottle and a narrow vertical line of text.');
}

function updateButton() {
  const button = document.getElementById('motion');
  button.textContent = moving ? 'Pause' : 'Play';
  button.setAttribute('aria-pressed', String(moving));
}

function draw() {
  image(paper, 0, 0);
  if (!moving) { image(impression, 0, 0); return; }
  elapsed += Math.min(deltaTime, 100) / 1000;
  const phase = elapsed % 14;
  // Hold the complete page for most of the cycle. Reveal along its reading directions.
  const horizontal = constrain(phase / 2, 0, 1);
  const vertical = constrain((phase - 1) / 2, 0, 1);
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(0, 0, width * horizontal, 320);
  drawingContext.rect(0, 320, width, 305 * vertical);
  drawingContext.rect(0, 625, width * horizontal, 135);
  drawingContext.clip();
  image(impression, 0, 0);
  drawingContext.restore();
}

