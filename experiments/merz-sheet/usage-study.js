// Helpers for this study, before choosing a library API.
const UsageStudy = {
  target(source, x, y, { target = globalThis, ...options } = {}) {
    return Merz.stempel(source, x, y, options, target);
  },
  bind(target) {
    return { stempel: (source, x, y, options = {}) => Merz.stempel(source, x, y, options, target) };
  },
  layer(p, width, height, options, draw) {
    const buffer = p.createGraphics(width, height);
    try {
      buffer.pixelDensity(p.pixelDensity());
      draw(buffer);
      return Merz.andruck(buffer, options, p);
    } finally {
      buffer.remove();
    }
  }
};

function marks(p, route) {
  const bowl = Merz.bauteil('R', 'bowl', { size: 130 });
  if (route === 'target') {
    UsageStudy.target(bowl, 30, 45, { color: '#b92d26', target: p });
    UsageStudy.target(bowl, 130, 120, { color: '#20201e', target: p });
  } else if (route === 'bound') {
    const merz = UsageStudy.bind(p);
    merz.stempel(bowl, 30, 45, { color: '#b92d26' });
    merz.stempel(bowl, 130, 120, { color: '#20201e' });
  } else {
    Merz.stempel(bowl, 30, 45, { color: '#b92d26' }, p);
    Merz.stempel(bowl, 130, 120, { color: '#20201e' }, p);
  }
  p.noStroke(); p.fill('#20201e'); p.rect(30, 235, 210, 6);
}

function setup() {
  createCanvas(640, 320).parent('drawing');
  noLoop();
  const check = (ok, text) => { if (!ok) throw new Error(text); };
  const same = (a, b) => a.pixels.length === b.pixels.length && a.pixels.every((v, i) => v === b.pixels[i]);
  const options = { ink: .12, paper: 0, seed: 17 };
  try {
    for (const density of [1, 2]) {
      pixelDensity(density);
      const reference = createGraphics(300, 300);
      reference.pixelDensity(density);
      marks(reference, 'current');
      const original = Merz.andruck(reference, options);
      reference.remove();
      const targeted = UsageStudy.layer(globalThis, 300, 300, options, p => marks(p, 'target'));
      const bound = UsageStudy.layer(globalThis, 300, 300, options, p => marks(p, 'bound'));
      check(same(original, targeted) && same(original, bound), 'Context routes differ at density ' + density);
      check(bound.width === 300 && bound.pixelDensity() === density, 'Layer dimensions or density');
      const paper = UsageStudy.layer(globalThis, 300, 300, { ink: 0, paper: .18, seed: 17 }, p => p.background('#f7f7f2'));
      background('#f7f7f2');
      image(paper, 10, 10); image(original, 10, 10);
      image(paper, 330, 10); image(bound, 330, 10);
    }
    let removed = false;
    const failingContext = { pixelDensity: () => 2, createGraphics: () => ({ pixelDensity() {}, remove() { removed = true; } }) };
    try { UsageStudy.layer(failingContext, 10, 10, options, () => { throw new Error('drawing interrupted'); }); } catch (error) {
      check(error.message === 'drawing interrupted', 'Drawing error was hidden');
    }
    check(removed, 'Buffer not removed after drawing error');
    document.getElementById('result').textContent = 'PASS: both context routes match the current pixels at density 1 and 2. Layer size and density are preserved; buffers are removed after a drawing error.';
  } catch (error) {
    document.getElementById('result').textContent = 'FAIL: ' + error.message;
  }
}
