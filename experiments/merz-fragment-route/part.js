// With p5.js and p5.merz.js loaded.
const amount = 0.7;
const seed = 17;
let cut;

async function setup() {
  const canvas = createCanvas(600, 680);
  if (document.getElementById("drawing")) canvas.parent("drawing");
  pixelDensity(1);
  noLoop();
  const source = Merz.bauteil("R", "bowl", { size: 150, weight: 0.85 });
  // The oval catches a little of the opening in R.
  const piece = Merz.rundschnitt(source, 30, 0, 115, 95);
  cut = Merz.riss(piece, { amount, seed });
  describe(
    "Change the letter part, amount and seed. An oval cut from an R bowl becomes a repeated field, with placement and rotation in p5."
  );
}

function draw() {
  background(Merz.farbe.grau);
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      Merz.stempel(cut, 90 + col * 135 + ((row + col) % 2 ? 48 : -48),
        105 + row * 142 + ((row + col) % 2 ? 40 : -40),
        { color: Merz.farbe.rot, scale: 96 / 115, angle: (row + col) % 2 === 0 ? 0 : 180 });
    }
  }
}
