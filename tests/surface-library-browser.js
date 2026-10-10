async function setup() {
  noCanvas();
  const report = document.getElementById("result");
  const check = (ok, message) => {
    if (!ok) throw new Error(message);
  };
  let passes = 0,
    contexts = 0;
  const gpuContexts = [];
  const original = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function (type, ...args) {
    const context = original.call(this, type, ...args);
    if (type === "webgl" && context) {
      contexts++;
      gpuContexts.push(context);
      const draw = context.drawArrays.bind(context);
      context.drawArrays = (...values) => {
        passes++;
        return draw(...values);
      };
    }
    return context;
  };
  let instance, g;
  try {
    g = createGraphics(120, 100);
    g.pixelDensity(1);
    g.noStroke();
    g.fill("#b92d26");
    g.rect(10, 10, 100, 80);
    const pixel = (image) => Array.from(image.pixels);
    const zero = Merz.surface(g, { ink: 0, paper: 0 });
    check(passes === 0 && contexts === 0, "zero must bypass GPU");
    const clean = pixel(zero);
    const first = pixel(Merz.surface(g, { ink: 0.12, paper: 0, seed: 17 }));
    Merz.surface(g, { ink: 0.65, paper: 0, seed: 29 });
    const again = pixel(Merz.surface(g, { ink: 0.12, paper: 0, seed: 17 }));
    check(
      first.every((v, i) => v === again[i]),
      "return to same settings"
    );
    check(
      first.some((v, i) => i % 4 === 3 && v < clean[i]),
      "ink must reduce some coverage"
    );
    check(
      first.every((v, i) => i % 4 !== 3 || v <= clean[i]),
      "ink must not add coverage"
    );
    check(
      pixel(Merz.surface(g, { ink: 0, paper: 0 })).every((v, i) => v === clean[i]),
      "source unchanged"
    );
    const fallback = pixel(
      Merz.surface(g, { ink: 0.12, paper: 0, seed: 17 }, { createImage })
    );
    check(
      first.every((v, i) => Math.abs(v - fallback[i]) <= 1),
      "CPU comparison"
    );
    let ready;
    const done = new Promise((resolve) => (ready = resolve));
    instance = new p5((p) => {
      p.setup = () => {
        p.noCanvas();
        ready();
      };
    });
    await done;
    const other = pixel(Merz.surface(g, { ink: 0.12, paper: 0, seed: 17 }, instance));
    check(
      first.every((v, i) => v === other[i]),
      "global/instance parity"
    );
    g.background("#f7f7f2");
    const paper = pixel(Merz.surface(g, { ink: 0, paper: 0.18, seed: 17 }));
    check(
      paper.every((v, i) => i % 4 !== 3 || v === 255),
      "paper alpha preserved"
    );
    check(
      paper.some((v, i) => i % 4 === 2 && v < 242),
      "paper changes colour"
    );
    check(contexts === 2 && passes >= 5, "GPU contexts reused and passes executed");
    const larger = createGraphics(160, 110);
    larger.pixelDensity(2);
    larger.background("#20201e");
    const resized = Merz.surface(larger, { ink: 0.12, paper: 0 });
    check(
      resized.width === 160 && resized.height === 110,
      "density normalized and resize"
    );
    larger.remove();
    const expected = pixel(
      Merz.surface(g, { ink: 0.12, paper: 0, seed: 17 }, { createImage })
    );
    gpuContexts[0].getExtension("WEBGL_lose_context").loseContext();
    const lost = pixel(Merz.surface(g, { ink: 0.12, paper: 0, seed: 17 }));
    check(
      lost.every((v, i) => v === expected[i]),
      "context loss fallback"
    );
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      return type === "webgl" ? null : original.call(this, type, ...args);
    };
    const withoutGPU = { createImage, createGraphics };
    const absent = pixel(
      Merz.surface(g, { ink: 0.12, paper: 0, seed: 17 }, withoutGPU)
    );
    check(
      absent.every((v, i) => v === expected[i]),
      "no WebGL fallback"
    );
    let thrown = false;
    try {
      Merz.surface(g, { ink: -1 });
    } catch (error) {
      thrown = true;
    }
    check(thrown, "invalid settings");
    report.textContent =
      "PASS: zero bypass, source preserved, ink alpha, paper colour, exact repeatability and global/instance parity, CPU comparison within 1 byte, density/resize and context-loss/no-WebGL fallback. Hidden shader passes: " +
      passes +
      "; contexts: " +
      contexts;
  } catch (error) {
    report.textContent =
      "FAIL: " + error.message + "; passes " + passes + "; contexts " + contexts;
  } finally {
    HTMLCanvasElement.prototype.getContext = original;
    if (instance) instance.remove();
    if (g) g.remove();
  }
}
