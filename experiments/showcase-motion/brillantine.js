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
  g.textFont('Archivo Black');
  g.textSize(12);
  g.text('BRILLANTINE. ESSENZ FÜR DAS HAAR.', 30, 37);
  g.rect(30, 45, 538, 3);
  g.textSize(10);
  g.text('FORM. GLANZ. EIN WENIG GENÜGT.', 30, 64);
  g.rect(30, 72, 538, 3);

  // Tall, heavy type carries the page; the two lines have different proportions.
  function headline(word, x, y, w, h) {
    g.push();
    g.translate(x, y);
    g.textSize(100);
    g.scale(w / g.textWidth(word), h / 74);
    g.text(word, 0, 74);
    g.pop();
  }
  headline('BRILL', 26, 111, 540, 175);
  headline('ANTINE', 29, 310, 508, 111);

  g.textFont('Archivo Black');
  g.textSize(122);
  g.text('04', 25, 562);
  g.textFont('Arial');
  g.textSize(13);
  g.text('ESSENZ — 50 ml', 339, 472);
  g.fill('#b92d26');
  g.rect(342, 486, 224, 7);

  // The small bottle acts as a marginal illustration rather than a second headline.
  g.push();
  g.translate(48, 603);
  g.rotate(-0.13);
  g.scale(0.34);
  g.fill('#20201e');
  g.rect(52, -24, 82, 36);
  g.rect(66, 12, 54, 35);
  g.beginShape();
  for (const point of [[66,42],[120,42],[158,85],[158,250],[26,250],[26,85]]) g.vertex(...point);
  g.endShape(CLOSE);
  g.fill('#f7f7f2');
  g.rect(37, 110, 110, 99);
  Merz.stempel(Merz.satz('B', { size: 64, weight: 0.6 }), 50, 124, { color: '#b92d26' }, g);
  g.pop();

  g.noFill();
  g.stroke('#20201e');
  g.strokeWeight(5);
  g.rect(235, 523, 331, 76);
  g.noStroke();
  g.fill('#20201e');
  g.textFont('Archivo Black');
  g.textSize(26);
  g.text('Nichts ist Zufall.', 249, 554);
  g.textFont('Arial');
  g.textSize(12);
  g.text('Ein wenig genügt. Form und Glanz.', 250, 579);

  g.push();
  g.translate(580, 426);
  g.rotate(-HALF_PI);
  g.textFont('monospace');
  g.textSize(9);
  g.text('ESSENZ / BRILLANTINE / NR. 04', 0, 0);
  g.pop();

  g.textFont('Archivo Black');
  g.textSize(23);
  g.text('FORM UND GLANZ', 132, 661);
  g.textSize(12);
  g.text('BRILLANTINE / ESSENZ / NR. 04', 132, 684);
  g.textFont('Arial');
  g.textSize(10);
  g.text('50 ml. Ein wenig genügt.', 132, 702);
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
  describe('An imagined Brillantine advertisement: tall heavy black lettering, a large 04, a small bottle and a framed quotation.');
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

