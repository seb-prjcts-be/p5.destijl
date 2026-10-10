async function setup() {
  noCanvas();
  const report = document.getElementById("result");
  const check = (ok, message) => {
    if (!ok) throw new Error(message);
  };
  const original = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function(type,...args) {
    if(type==='webgl'||type==='webgl2')throw new Error('Unexpected WebGL context');
    return original.call(this,type,...args);
  };
  let instance, g;
  try {
    g = createGraphics(120, 100);
    g.pixelDensity(1);
    g.noStroke();
    g.fill("#b92d26");
    g.rect(10, 10, 100, 80);
    const pixel = (image) => Array.from(image.pixels);
    const zero = Merz.andruck(g, { ink: 0, paper: 0 });

    const clean = pixel(zero);
    const first = pixel(Merz.andruck(g, { ink: 0.12, paper: 0, seed: 17 }));
    Merz.andruck(g, { ink: 0.65, paper: 0, seed: 29 });
    const again = pixel(Merz.andruck(g, { ink: 0.12, paper: 0, seed: 17 }));
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
      pixel(Merz.andruck(g, { ink: 0, paper: 0 })).every((v, i) => v === clean[i]),
      "source unchanged"
    );
    const fallback = pixel(
      Merz.andruck(g, { ink: 0.12, paper: 0, seed: 17 }, { createImage })
    );
    check(
      first.every((v, i) => v === fallback[i]),
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
    const other = pixel(Merz.andruck(g, { ink: 0.12, paper: 0, seed: 17 }, instance));
    check(
      first.every((v, i) => v === other[i]),
      "global/instance parity"
    );
    g.background("#f7f7f2");
    const paper = pixel(Merz.andruck(g, { ink: 0, paper: 0.18, seed: 17 }));
    check(
      paper.every((v, i) => i % 4 !== 3 || v === 255),
      "paper alpha preserved"
    );
    check(
      paper.some((v, i) => i % 4 === 2 && v < 242),
      "paper changes colour"
    );

    const larger = createGraphics(160, 110);
    larger.pixelDensity(2);
    larger.background("#20201e");
    const resized = Merz.andruck(larger, { ink: 0.12, paper: 0 });
    check(
      resized.width === 160 && resized.height === 110,
      "logical dimensions preserved"
    );
    check(resized.pixelDensity()===2 && resized.canvas.width===320 && resized.canvas.height===220, 'density 2 retained');
    const raw=larger.drawingContext;
    raw.fillStyle='#ff0000';raw.fillRect(0,0,.5,110);
    const originalPixels=Array.from(raw.getImageData(0,0,320,220).data);
    const preserved=Merz.andruck(larger,{ink:0,paper:0});
    check(pixel(preserved).every((v,i)=>v===originalPixels[i]),'density 2 zero preserves every physical pixel');
    const instanceHigh=Merz.andruck(larger,{ink:.12,paper:0},instance);
    const globalHigh=Merz.andruck(larger,{ink:.12,paper:0});
    check(pixel(instanceHigh).every((v,i)=>v===globalHigh.pixels[i]),'density 2 global/instance parity');
    const solid=createGraphics(120,100);solid.pixelDensity(2);solid.background('#f7f7f2');
    const high=Merz.andruck(solid,{ink:0,paper:.18,seed:17});
    check(paper.every((v,i)=>{const px=Math.floor(i/4),channel=i%4;return high.pixels[4*(Math.floor(px/120)*2*240+(px%120)*2)+channel]===v;}),'same logical surface pattern at densities 1 and 2');
    solid.remove();larger.remove();
    let thrown = false;
    try {
      Merz.andruck(g, { ink: -1 });
    } catch (error) {
      thrown = true;
    }
    check(thrown, "invalid settings");
    report.textContent = 'PASS: original CPU output, repeated masks, source preserved, ink alpha, paper colour, global/instance parity and densities 1/2. No WebGL contexts requested.';
  } catch (error) {
    report.textContent = 'FAIL: ' + error.message;
  } finally {
    HTMLCanvasElement.prototype.getContext = original;
    if (instance) instance.remove();
    if (g) g.remove();
  }
}
