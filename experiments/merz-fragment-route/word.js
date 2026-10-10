// Load p5.js and the local p5.merz.js before this sketch.
const amount = 0.7;
const seed = 17;
const strips = [];

async function setup() {
  const canvas = createCanvas(600, 680);
  if (document.getElementById("drawing")) canvas.parent("drawing");
  pixelDensity(1);
  noLoop();
  const source = Merz.geometry("MERZ", { size: 180, spacing: 8 });
  const pieces = Merz.splitter(source, { rows: 3 });
  for (const [row, piece] of pieces.entries()) {
    strips.push(
      Merz.tear(piece, { amount, seed: seed + row }).bau(globalThis, {
        color: row === 1 ? "#b92d26" : "#20201e"
      })
    );
  }
  describe(
    "Change the word, amount and seed. Each strip comes from the same word geometry; p5 separates and offsets the resulting images."
  );
}

function draw() {
  background("#f7f7f2");
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
