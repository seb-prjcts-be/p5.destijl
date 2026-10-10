'use strict';
const controls = {
  amount: document.getElementById('amount'), seed: document.getElementById('seed'),
  route: document.getElementById('route'), status: document.getElementById('status')
};
const sketches = [];
for (const [host, fixed] of [['clean', 0], ['light', .25], ['chosen', null]]) {
  const sketch = new p5(p => {
    p.setup = () => {
      p.createCanvas(600, 840).parent(host); p.pixelDensity(1); p.noLoop();
      p.describe('A page with MERZ, a black plane with cut-out FORM, a red line, small text and open space.');
    };
    p.draw = () => MerzCompositionStudy.render(p, fixed ?? Number(controls.amount.value), Number(controls.seed.value), controls.route.value);
  });
  sketches.push(sketch);
}
function update() {
  if (!controls.seed.checkValidity() || controls.seed.value === '') {
    controls.status.textContent = 'Choose a whole pattern number between 0 and 999999.'; return;
  }
  controls.status.textContent = '';
  const amount = Number(controls.amount.value).toFixed(2);
  document.getElementById('amount-value').value = amount;
  document.getElementById('chosen-value').textContent = amount;
  for (const p of sketches) p.redraw();
}
controls.amount.addEventListener('input', update);
controls.seed.addEventListener('input', update);
controls.route.addEventListener('change', update);
document.getElementById('reset').addEventListener('click', () => {
  controls.amount.value = '.6'; controls.seed.value = '17'; controls.route.value = 'direct'; update();
});
document.getElementById('save').addEventListener('click', () => {
  if (!controls.seed.checkValidity() || controls.seed.value === '') return;
  sketches[2].saveCanvas(`p5.merz-print-${controls.amount.value}-${controls.seed.value}`, 'png');
});
fetch('sketch.js').then(r => { if (!r.ok) throw new Error('Sketch not available'); return r.text(); })
  .then(source => { document.getElementById('source').textContent = source; })
  .catch(() => { document.getElementById('source').textContent = 'Open sketch.js using the link above.'; });
document.getElementById('drawing-source').textContent = MerzCompositionStudy.letterPaths.toString() + '\n\n' +
  '// Pass window in global mode, or p in instance mode.\n' +
  'function drawBuildingBlocks(p) {\n' +
  "  letterPaths(p, 'MERZ', 52, 127, { size: 106, spacing: 15 });\n" +
  "  p.stroke('#b92d26'); p.strokeWeight(7); p.strokeCap('square');\n" +
  '  p.line(52, 273, 532, 273);\n' +
  "  p.noStroke(); p.fill('#20201e');\n" +
  '  p.rect(52, 405, 260, 110);\n}';
