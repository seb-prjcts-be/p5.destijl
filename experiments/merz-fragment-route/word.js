// With p5.js and p5.merz.js loaded.
const amount = 0.7;
const seed = 17;
const strips = [];

async function setup() {
  const canvas = createCanvas(600, 680);
  if (document.getElementById("drawing")) canvas.parent("drawing");
  pixelDensity(1);
  noLoop();
  const source = Merz.satz("MERZ", { size: 180, spacing: 8 });
  // Perhaps four narrower strips next time.
  const pieces = Merz.splitter(source, { rows: 3 });
  for (const [row, piece] of pieces.entries()) {
    strips.push(
      Merz.riss(piece, { amount, seed: seed + row }).bau(globalThis, {
        color: row === 1 ? Merz.farbe.rot : Merz.farbe.schwarz
      })
    );
  }
  describe(
    "Change the word, amount and seed. Each strip comes from the same word geometry; p5 separates and offsets the resulting images."
  );
}

function draw() {
  background(Merz.farbe.grau);
  for (let row = 0; row < strips.length; row++) {
    const strip = strips[row];
    image(
      strip,
      40 + row * 17,
      155 + row * 110,
      480,
      (480 * strip.height) / strip.width
    );
  }
}
