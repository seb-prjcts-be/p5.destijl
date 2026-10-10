// Study helpers, separate from the library API. No image assets are needed.
const paperState = { amount: 0.35, seed: 17, print: true };
const paperViews = new Map();
const { hash, field } = MaterialStudy;

function drawPaper(p, kind) {
  const { amount, seed } = paperState;
  p.background('#f7f7f2');
  if (kind !== 'clean' && amount > 0) {
    p.loadPixels();
    for (let y = 0; y < p.height; y++) {
      for (let x = 0; x < p.width; x++) {
        const grain = hash(x, y, seed + 111) - 0.5;
        const broad = field(x / 95, y / 95, seed + 101) - 0.5;
        const fibre = field((x + y * 0.3) / 2, y / 12, seed + 121) - 0.5;
        const change = amount * (kind === 'grain' ? grain * 12 : broad * 9 + fibre * 5 + grain);
        const i = 4 * (y * p.width + x);
        [247, 247, 242].forEach((base, c) => { p.pixels[i + c] = base + change; });
      }
    }
    p.updatePixels();
    if (kind === 'connected') {
      p.noFill();
      p.strokeWeight(0.45);
      for (let i = 0; i < 1300; i++) {
        const x = hash(i, 1, seed) * p.width;
        const y = hash(i, 2, seed) * p.height;
        const angle = hash(i, 3, seed) * Math.PI * 2;
        const length = 2 + hash(i, 4, seed) * 7;
        p.stroke(105, 100, 87, amount * 24);
        p.line(x, y, x + Math.cos(angle) * length, y + Math.sin(angle) * length);
      }
      p.noStroke();
      p.fill(105, 100, 87, amount * 40);
      for (let i = 0; i < 35; i++) p.ellipse(hash(i, 5, seed) * p.width, hash(i, 6, seed) * p.height, 0.8, 1.2);
    }
  }
  if (paperState.print) drawInk(p);
}

function drawInk(p) {
  p.noStroke(); p.fill('#b92d26'); p.rect(52, 70, 210, 14);
  p.fill('#20201e'); p.textFont('Georgia'); p.textSize(68); p.text('Fundsachen', 45, 220);
  function paths(data, x, y, colour) {
    p.push(); p.translate(x, y); p.noFill(); p.stroke(colour); p.strokeCap(p.SQUARE); p.strokeJoin(p.MITER);
    for (const path of data) {
      p.strokeWeight(path.width); p.beginShape();
      for (const point of path.points) p.vertex(...point);
      p.endShape();
    }
    p.pop();
  }
  paths(Merz.geometry('M', { size: 250, weight: 0.55 }).paths, 315, 330, '#b92d26');
  const bowl = Merz.parts('R', { size: 95, weight: 0.65 }).find(part => part.id === 'bowl');
  for (let i = 0; i < 3; i++) paths(bowl.paths, 52, 330 + i * 91, '#20201e');
  p.noStroke(); p.fill('#20201e'); p.textFont('monospace'); p.textSize(15);
  p.text('1 / 2 / 3', 52, 671);
}

function updatePaper() {
  for (const [kind, p] of paperViews) drawPaper(p, kind);
  document.getElementById('amount-value').value = paperState.amount;
  document.getElementById('status').textContent = `Three sheets, 600 × 760 pixels. Pattern ${paperState.seed}.`;
}
for (const kind of ['clean', 'grain', 'connected']) new p5(p => {
  p.setup = () => {
    p.createCanvas(600, 760).parent(kind); p.pixelDensity(1); p.noLoop();
    paperViews.set(kind, p); drawPaper(p, kind);
    p.describe(`${kind} paper with a fixed red and black typographic drawing.`);
    if (paperViews.size === 3) updatePaper();
  };
});
document.getElementById('amount').addEventListener('input', e => { paperState.amount = Number(e.target.value); updatePaper(); });
document.getElementById('pattern').addEventListener('change', e => { paperState.seed = Number(e.target.value); updatePaper(); });
document.getElementById('print').addEventListener('change', e => { paperState.print = e.target.checked; updatePaper(); });
document.getElementById('actual').addEventListener('change', e => document.querySelector('.papers').classList.toggle('actual', e.target.checked));
document.getElementById('reset').addEventListener('click', () => {
  Object.assign(paperState, { amount: 0.35, seed: 17, print: true });
  document.getElementById('amount').value = 0.35; document.getElementById('pattern').value = 17;
  document.getElementById('print').checked = true; document.getElementById('actual').checked = false;
  document.querySelector('.papers').classList.remove('actual'); updatePaper();
});
document.getElementById('check').addEventListener('click', () => {
  const saved = { ...paperState };
  const pixels = kind => paperViews.get(kind).drawingContext.getImageData(0, 0, 600, 760).data;
  const equal = (a, b) => a.every((v, i) => v === b[i]);
  const results = [];
  try {
    Object.assign(paperState, { amount: 0.35, seed: 17, print: true }); updatePaper();
    const first = pixels('connected'); const clean = pixels('clean');
    updatePaper(); results.push(['repeat render', equal(first, pixels('connected'))]);
    paperState.seed = 41; updatePaper(); results.push(['seed changes paper', !equal(first, pixels('connected'))]);
    results.push(['clean stays fixed', equal(clean, pixels('clean'))]);
    paperState.seed = 17; updatePaper(); results.push(['return to seed', equal(first, pixels('connected'))]);
    paperState.amount = 0; updatePaper();
    results.push(['zero restores clean', equal(pixels('clean'), pixels('grain')) && equal(pixels('clean'), pixels('connected'))]);
  } finally { Object.assign(paperState, saved); updatePaper(); }
  document.getElementById('status').textContent = results.map(([name, ok]) => `${ok ? 'PASS' : 'FAIL'} ${name}`).join(' / ');
});
