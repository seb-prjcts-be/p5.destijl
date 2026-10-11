async function setup() {
  createCanvas(120, 100).parent('drawing');
  pixelDensity(1);
  noLoop();
  const report = document.getElementById('result');
  const check = (ok, message) => { if (!ok) throw new Error(message); };
  const pixelsOf = p => { p.loadPixels(); return Array.from(p.pixels); };
  const same = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);
  const draw = g => { g.noStroke(); g.fill(Merz.farbe.rot); g.rect(10, 10, 100, 80); };
  let instance;
  try {
    await Merz.ready();
    // A clean sheet prints exactly what was drawn on the paper colour.
    const plain = Merz.andruck({ paper: 0, ink: 0 });
    check(plain.width === 120 && plain.height === 100, 'sheet takes the canvas size');
    draw(plain);
    clear(); Merz.stempel(plain, 0, 0);
    const printed = pixelsOf(globalThis);
    clear(); background(Merz.farbe.grau); draw(globalThis);
    check(same(printed, pixelsOf(globalThis)), 'clean sheet equals direct drawing');
    // Treatment is deterministic, kept between prints and renewed after clear() and background().
    const sheet = Merz.andruck({ paper: 0.3, ink: 0.2, seed: 17 });
    draw(sheet);
    clear(); Merz.stempel(sheet, 0, 0);
    const first = pixelsOf(globalThis);
    check(!same(first, printed), 'treatment changes the print');
    clear(); Merz.stempel(sheet, 0, 0);
    check(same(first, pixelsOf(globalThis)), 'repeated print is identical');
    sheet.clear(); draw(sheet); clear(); Merz.stempel(sheet, 0, 0);
    check(same(first, pixelsOf(globalThis)), 'same drawing after clear gives the same print');
    sheet.clear(); sheet.noStroke(); sheet.fill(Merz.farbe.blau); sheet.rect(0, 0, 60, 100); clear(); Merz.stempel(sheet, 0, 0);
    check(!same(first, pixelsOf(globalThis)), 'new drawing after clear gives a new print');
    sheet.background(Merz.farbe.gelb); clear(); Merz.stempel(sheet, 0, 0);
    const yellow = pixelsOf(globalThis);
    check(!same(first, yellow) && yellow.some((v, i) => i % 4 === 0 && v > 200), 'background renews the print');
    const other = Merz.andruck({ paper: 0.3, ink: 0.2, seed: 18 }); draw(other); clear(); Merz.stempel(other, 0, 0);
    check(!same(first, pixelsOf(globalThis)), 'another seed gives another print');
    // The sheet carries the drawing calls.
    const carried = Merz.andruck({ paper: 0.3, ink: 0.2, seed: 17 });
    carried.stempel(Merz.satz('M', { size: 40 }), 10, 10, { color: Merz.farbe.rot });
    const viaSheet = pixelsOf(carried);
    const direct = Merz.andruck({ paper: 0.3, ink: 0.2, seed: 17 });
    Merz.stempel(Merz.satz('M', { size: 40 }), 10, 10, { color: Merz.farbe.rot }, direct);
    check(same(viaSheet, pixelsOf(direct)), 'sheet.stempel equals stempel with the sheet as context');
    direct.clear(); direct.riss('R', 10, 10, { size: 60 });
    check(pixelsOf(direct).some((v, i) => i % 4 === 3 && v > 0), 'sheet.riss draws on the sheet');
    const piece = await direct.merzbilder('001');
    check(typeof piece.bau === 'function', 'sheet.merzbilder returns a fragment');
    // Placement, restored settings and a position.
    const again = Merz.andruck({ paper: 0.3, ink: 0.2, seed: 17 }); draw(again);
    clear(); push(); imageMode(CENTER); tint(255, 40); Merz.stempel(again, 0, 0); pop();
    check(same(first, pixelsOf(globalThis)), 'print places the corner and ignores tint');
    clear(); Merz.stempel(again, 5, 0);
    check(!same(first, pixelsOf(globalThis)), 'print accepts a position');
    clear(); Merz.stempel(again, 0, 0, { angle: 90 });
    check(!same(first, pixelsOf(globalThis)), 'print accepts an angle');
    // Instance mode, with and without options.
    instance = await new Promise(resolve => new p5(p => {
      p.setup = () => { p.createCanvas(120, 100); p.pixelDensity(1); p.noLoop(); resolve(p); };
    }, document.getElementById('instance')));
    const sheetP = Merz.andruck({ paper: 0.3, ink: 0.2, seed: 17 }, instance); draw(sheetP); instance.clear(); Merz.stempel(sheetP, 0, 0, instance);
    check(same(first, pixelsOf(instance)), 'instance print equals global print');
    const bare = Merz.andruck({}, instance);
    check(bare.width === 120 && bare.height === 100, 'empty options with a context');
    // Explicit size and canvas density.
    const small = Merz.andruck({ width: 40, height: 30 });
    check(small.width === 40 && small.height === 30, 'explicit size');
    pixelDensity(2);
    const dense = Merz.andruck({ paper: 0, ink: 0 });
    check(dense.pixelDensity() === 2, 'sheet follows the canvas density');
    draw(dense); clear(); Merz.stempel(dense, 0, 0);
    check(pixelsOf(globalThis).length === 120 * 100 * 16, 'density 2 print');
    pixelDensity(1);
    for (const options of [{ colour: '#ffffff' }, { paper: 2 }, { seed: 0.5 }, { width: 0 }, []]) {
      let threw = false; try { Merz.andruck(options); } catch { threw = true; }
      check(threw, 'validates options');
    }
    report.textContent = 'PASS: sheet size, clean identity, deterministic and kept print, renewal after clear and background, seeds, carried calls, placement, restored settings, instance parity and density.';
  } catch (error) {
    report.textContent = 'FAIL: ' + error.message;
  } finally { instance?.remove(); }
}
