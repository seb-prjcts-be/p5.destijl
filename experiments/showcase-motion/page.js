// Shared page mounting, fixed material treatment and optional playback.
let pagePaper, pageInk, pageTime = 0;
let playing = false;
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
function setup() {
  createCanvas(600, 760).parent('drawing');
  pixelDensity(1); frameRate(30);
  const ground = createGraphics(width, height); ground.pixelDensity(1);
  ground.background(Merz.farbe.grau);
  pagePaper = Merz.andruck(ground, { ink: 0, paper: 0.3, seed: 41 }); ground.remove();
  const ink = createGraphics(width, height); ink.pixelDensity(1); ink.clear();
  compose(ink);
  pageInk = Merz.andruck(ink, { ink: 0.22, paper: 0, seed: 17 }); ink.remove();
  playing = new URLSearchParams(location.search).get('motion') === '1' && !motionPreference.matches;
  const button = document.getElementById('motion');
  function update() { button.textContent = playing ? 'Pause' : 'Play'; button.setAttribute('aria-pressed', String(playing)); }
  button.addEventListener('click', () => { playing = !playing; update(); if (playing) loop(); else { noLoop(); redraw(); } });
  motionPreference.addEventListener('change', event => { if (event.matches) { playing = false; update(); noLoop(); redraw(); } });
  document.getElementById('save').addEventListener('click', () => saveCanvas('merz-page', 'png'));
  update(); if (!playing) noLoop();
  describe(pageDescription);
}
function draw() {
  image(pagePaper, 0, 0);
  if (!playing) { image(pageInk, 0, 0); return; }
  pageTime += Math.min(deltaTime, 100) / 1000;
  reveal(pageTime % 14);
}
function textAt(g, value, x, y, size, font = 'Archivo Black', colour = '#20201e') {
  g.noStroke(); g.fill(colour); g.textFont(font); g.textSize(size); g.text(value, x, y);
}
function revealStrips(seconds, vertical) {
  drawingContext.save(); drawingContext.beginPath();
  for (let i = 0; i < 8; i++) {
    const progress = constrain((seconds - i * 0.14) / 1.5, 0, 1);
    if (vertical) drawingContext.rect(i * 75, 0, 75, height * progress);
    else drawingContext.rect(0, i * 95, width * progress, 95);
  }
  drawingContext.clip(); image(pageInk, 0, 0); drawingContext.restore();
}
