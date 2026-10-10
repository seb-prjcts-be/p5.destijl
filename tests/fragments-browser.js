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
      const clean = piece.toImage(globalThis);
      check(
        pixels(clean) ===
          pixels(Merz.tear(piece, { amount: 0 }).toImage(globalThis)),
        "zero identity"
      );
      const torn = Merz.tear(piece, { amount: 1, seed: 17 });
      const image = torn.toImage(globalThis);
      check(pixels(image) === pixels(torn.toImage(instance)), "global/instance parity");
      const repeat = Merz.tear(piece, { amount: 1, seed: 17 }).toImage(globalThis);
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
    const before = pixels(saved.toImage(globalThis));
    g.background("#234b92");
    check(before === pixels(saved.toImage(globalThis)), "image snapshot");
    g.remove();
    const geom = Merz.geometry("R", { size: 100 });
    const savedGeometry = Merz.fragment(geom, outline);
    const original = pixels(savedGeometry.toImage(globalThis));
    geom.paths[0].points[0][0] = 999;
    check(original === pixels(savedGeometry.toImage(globalThis)), "geometry snapshot");
    report.textContent =
      "PASS: image, geometry and parts; actual pixel changes, zero identity, repeatability, detached sources and global/instance parity.";
  } catch (error) {
    report.textContent = "FAIL: " + error.message;
  } finally {
    if (instance) instance.remove();
  }
}
