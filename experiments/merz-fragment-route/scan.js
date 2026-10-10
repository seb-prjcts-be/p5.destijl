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
  const piece = Merz.ausschnitt(source, 8, 48, 286, 167);
  cut = Merz.tear(piece, { amount, seed }).bau();
  describe(
    "Change amount and seed, or change the crop position and size. The library cuts the scan and changes its edge; p5 places the pieces."
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
