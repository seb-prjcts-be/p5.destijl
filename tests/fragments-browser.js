async function setup() {
  noCanvas();
  const report = document.getElementById("result");
  const check = (condition, message) => {
    if (!condition) throw new Error(message);
  };
  let instance;
  try {
    const g = createGraphics(120, 100);
    g.pixelDensity(1);
    g.background("#b92d26");
    const sources = [
      g,
      Merz.geometry("R", { size: 100 }),
      Merz.parts("R", { size: 100 })
    ];
    const outline = [
      [0, 0],
      [100, 0],
      [100, 85],
      [0, 85]
    ];
    let resolve;
    const ready = new Promise((r) => (resolve = r));
    instance = new p5((p) => {
      p.setup = () => {
        p.noCanvas();
        resolve();
      };
    });
    await ready;
    const pixels = (image) => Array.from(image.pixels).join(",");
    for (const source of sources) {
      const piece = Merz.fragment(source, outline);
      const clean = piece.bau(globalThis);
      check(piece.bau === piece.toImage, 'toImage is the bau alias');
      check(pixels(clean) === pixels(piece.toImage()), 'legacy rendering parity');
      check(pixels(piece.bau(instance, { color: '#b92d26' })) === pixels(piece.toImage(instance, { color: '#b92d26' })), 'alias preserves instance and colour options');
      const cells = Merz.splitter(source, { rows: 2, columns: 2 });
      for (const cell of cells) {
        check(pixels(cell.bau()) === pixels(cell.bau(instance)), 'splitter global/instance parity');
      }
      const beforeSplit = pixels(cells[0].bau());
      Merz.tear(cells[1], { amount: 1, seed: 17 });
      check(beforeSplit === pixels(cells[0].bau()), 'splitter sibling independence');
      check(pixels(clean) === pixels(Merz.ausschnitt(source, 0, 0, 100, 85).bau()), "cut matches polygon and default global rendering");
      const oval = Merz.rundschnitt(source, 0, 0, 100, 85);
      const ovalImage = oval.bau();
      check(pixels(ovalImage) === pixels(oval.bau(instance)), "oval global/instance parity");
      check(ovalImage.pixels[3] === 0, "oval corner is transparent");
      check(Array.from(ovalImage.pixels).some((v, i) => i % 4 === 3 && v > 0), "oval retains ink");
      check(
        pixels(clean) ===
          pixels(Merz.tear(piece, { amount: 0 }).bau(globalThis)),
        "zero identity"
      );
      const torn = Merz.tear(piece, { amount: 1, seed: 17 });
      const image = torn.bau(globalThis);
      check(pixels(image) === pixels(torn.bau(instance)), "global/instance parity");
      const repeat = Merz.tear(piece, { amount: 1, seed: 17 }).bau(globalThis);
      const aa = pixels(image).split(","),
        bb = pixels(repeat).split(",");
      const differences = aa
        .map((v, i) => Math.abs(Number(v) - Number(bb[i])))
        .filter((v) => v);
      check(
        !differences.length,
        "repeatability source " +
          sources.indexOf(source) +
          " differences " +
          differences.length +
          " max " +
          Math.max(...differences)
      );
      check(pixels(image) !== pixels(clean), "edge changes pixels");
    }
    const saved = Merz.fragment(g, outline);
    const splitSaved = Merz.splitter(g, { rows: 2 });
    const splitPixels = pixels(splitSaved[0].bau());
    const before = pixels(saved.bau(globalThis));
    g.background("#234b92");
    check(splitPixels === pixels(splitSaved[0].bau()), 'splitter source snapshot');
    check(before === pixels(saved.bau(globalThis)), "image snapshot");
    g.remove();
    const geom = Merz.geometry("R", { size: 100 });
    const savedGeometry = Merz.fragment(geom, outline);
    const original = pixels(savedGeometry.bau(globalThis));
    geom.paths[0].points[0][0] = 999;
    check(original === pixels(savedGeometry.bau(globalThis)), "geometry snapshot");
    report.textContent =
      "PASS: image, geometry and parts; actual pixel changes, zero identity, repeatability, detached sources and global/instance parity.";
  } catch (error) {
    report.textContent = "FAIL: " + error.message;
  } finally {
    if (instance) instance.remove();
  }
}
