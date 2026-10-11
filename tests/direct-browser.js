async function setup() {
  createCanvas(400, 300);
  noLoop();
  let instance;
  const check = (ok, message) => { if (!ok) throw new Error(message); };
  const pixelsOf = p => { p.loadPixels(); return Array.from(p.pixels); };
  const same = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);
  try {
    await Merz.ready();
    instance = await new Promise(resolve => new p5(p => {
      p.setup = () => { p.createCanvas(400, 300); p.noLoop(); resolve(p); };
    }, document.getElementById('instance')));
    const methods = ['satz', 'bauteile', 'bauteil', 'ausschnitt', 'rundschnitt', 'schnitt', 'splitter', 'riss', 'andruck'];
    for (const density of [1, 2]) {
      pixelDensity(density); instance.pixelDensity(density);
      // Warm both canvas readback paths equally before comparing antialiased edges.
      for (let i = 0; i < 4; i++) { loadPixels(); instance.loadPixels(); }
      for (const name of methods) {
        const args = name === 'bauteil' ? ['R', 'bowl', 120, 70] : ['R', 120, 70];
        clear();
        const count = Merz[name](...args);
        check(count === (name === 'splitter' ? 3 : 1), name + ' count');
        const first = pixelsOf(globalThis);
        check(first.some((value, i) => i % 4 === 3 && value > 0), name + ' visible');
        clear(); Merz[name](...args);
        check(same(first, pixelsOf(globalThis)), name + ' deterministic');
        instance.clear(); Merz[name](...args, {}, instance);
        check(same(first, pixelsOf(instance)), name + ' global/instance density ' + density);
        clear(); push(); translate(20, 15); rotate(0.2);
        const transform = drawingContext.getTransform().toString();
        Merz[name](...args, { color: Merz.farbe.rot });
        check(drawingContext.getTransform().toString() === transform, name + ' restores transform');
        pop();
        const transformed = pixelsOf(globalThis);
        instance.clear(); instance.push(); instance.translate(20, 15); instance.rotate(0.2);
        Merz[name](...args, { color: Merz.farbe.rot }, instance); instance.pop();
        const instanceTransformed = pixelsOf(instance);
        check(same(transformed, instanceTransformed), name + ' outer transform density ' + density + ': ' + transformed.reduce((count, value, index) => count + (value !== instanceTransformed[index]), 0) + ' differing channels, maximum ' + transformed.reduce((maximum, value, index) => Math.max(maximum, Math.abs(value - instanceTransformed[index])), 0));
      }
    }
    const material = Merz.satz('R');
    const original = JSON.stringify(material);
    for (const name of ['ausschnitt', 'rundschnitt', 'schnitt', 'riss', 'andruck', 'splitter']) Merz[name](material, 10, 10);
    check(JSON.stringify(material) === original, 'geometry source preserved');
    const imageSource = createGraphics(100, 100);
    imageSource.pixelDensity(2); imageSource.background(Merz.farbe.rot);
    const imageBefore = pixelsOf(imageSource);
    const fragment = Merz.ausschnitt(imageSource, 0, 0, 100, 100);
    for (const name of ['ausschnitt', 'rundschnitt', 'schnitt', 'riss', 'andruck', 'splitter']) {
      for (const source of [imageSource, fragment]) {
        clear(); Merz[name](source, 40, 40);
        const globalPixels = pixelsOf(globalThis);
        instance.clear(); Merz[name](source, 40, 40, {}, instance);
        check(same(globalPixels, pixelsOf(instance)), name + ' image/fragment parity');
      }
    }
    check(same(imageBefore, pixelsOf(imageSource)), 'image source preserved');
    imageSource.remove();
    check(Merz.splitter('R', 0, 0, { columns: 2 }) === 2, 'column override');
    check(Merz.splitter('R', 0, 0, { rows: 1, gap: 0 }) === 1, 'single-piece override');
    for (const name of methods) {
      const args = name === 'bauteil' ? ['R', 'bowl', 0, 0] : ['R', 0, 0];
      for (const options of [{ unknown: 1 }, { scale: 0 }, { color: 'red' }, null]) {
        let threw = false;
        try { Merz[name](...args, options); } catch { threw = true; }
        check(threw, name + ' validates options');
      }
    }
    document.getElementById('result').textContent = 'PASS: nine direct routes, visible defaults, counts, repeatability, outer transforms, global/instance parity at densities 1/2, source preservation and validation.';
  } catch (error) {
    document.getElementById('result').textContent = 'FAIL: ' + error.message;
  } finally { instance?.remove(); }
}
