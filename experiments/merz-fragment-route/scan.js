// With p5.js and p5.merz.js loaded.
const amount = 0.7;
const seed = 17;
let cut;

async function setup() {
  const canvas = createCanvas(600, 680);
  if (document.getElementById("drawing")) canvas.parent("drawing");
  pixelDensity(1);
  noLoop();
  const source = await loadImage("../merz-fragments/assets/merz-2-cover.jpg");
  // A little more height would bring more paper into the cut.
  const piece = Merz.ausschnitt(source, 8, 48, 286, 167);
  cut = Merz.riss(piece, { amount, seed });
  describe(
    "Change amount and seed, or change the crop position and size. The library cuts the scan and changes its edge; p5 places the pieces."
  );
}

function draw() {
  background(Merz.farbe.grau);
  for (let i = 0; i < 3; i++) {
    Merz.stempel(cut, 65 + i * 38, 65 + i * 170,
      { scale: 370 / 286, angle: (-0.08 + i * 0.08) * 180 / Math.PI });
  }
}
