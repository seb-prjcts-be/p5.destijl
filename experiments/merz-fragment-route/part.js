let farbe;
// With p5.js and p5.merz.js loaded.
const amount = 0.7;
const seed = 17;
let cut;

async function setup() {
  farbe = Merz.settings();
  const canvas = createCanvas(600, 680);
  if (document.getElementById("drawing")) canvas.parent("drawing");
  pixelDensity(1);
  noLoop();
  const source = Merz.parts("R", { size: 150, weight: 0.85 }).find(
    (part) => part.id === "bowl"
  );
  // The oval catches a little of the opening in R.
  const piece = Merz.rundschnitt(source, 30, 0, 115, 95);
  cut = Merz.tear(piece, { amount, seed }).bau(globalThis, { color: farbe.rot });
  describe(
    "Change the letter part, amount and seed. An oval cut from an R bowl becomes a repeated field, with placement and rotation in p5."
  );
}

function draw() {
  background(farbe.grau);
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      push();
      translate(90 + col * 135, 105 + row * 142);
      rotate((row + col) % 2 === 0 ? 0 : PI);
      image(cut, -48, -40, 96, 80);
      pop();
    }
  }
}
