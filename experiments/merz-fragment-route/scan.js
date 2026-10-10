// Load p5.js and the local p5.merz.js before this sketch.
const amount = 0.7;
const seed = 17;
let cut;

async function setup() {
  const canvas = createCanvas(600, 680);
  if (document.getElementById("drawing")) canvas.parent("drawing");
  pixelDensity(1);
  noLoop();
  const source = await loadImage("../merz-fragments/assets/merz-2-cover.jpg");
  const piece = Merz.fragment(source, [
    [8, 48],
    [294, 48],
    [294, 215],
    [8, 215]
  ]);
  cut = Merz.tear(piece, { amount, seed }).toImage(globalThis, { color: "#b92d26" });
  describe(
    "Change amount and seed, or move the crop points. The library cuts the scan and changes its edge; p5 places the pieces."
  );
}

function draw() {
  background("#f7f7f2");
  for (let i = 0; i < 3; i++) {
    push();
    translate(65 + i * 38, 65 + i * 170);
    rotate(-0.08 + i * 0.08);
    image(cut, 0, 0, 370, 216);
    pop();
  }
}
