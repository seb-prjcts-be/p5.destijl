// Load p5.js and p5.merz.js before this sketch.
// Sound fragments: T045-T047, Merz 1, p. 8. Recombined here.
const syllables = ["OI", "BI", "EI", "DI"];
const repetitions = 7;

function setup() {
  const canvas = createCanvas(600, 720);
  if (document.getElementById("drawing")) canvas.parent("drawing");
  pixelDensity(1);
  noLoop();
  describe(
    "Large serif syllables, a diagonal line of repeated sounds and small geometric letter parts share a white page."
  );
}

function draw() {
  background("#f7f7f2");
  noStroke();
  fill("#20201e");
  textFont("Georgia");
  textSize(218);
  text(syllables[0], 36, 223);
  fill("#b92d26");
  textStyle(ITALIC);
  textSize(145);
  text(syllables[2], 205, 368);
  textStyle(NORMAL);
  for (let i = 0; i < repetitions; i++) {
    Merz.stempel(syllables[1], 65 + Math.cos(-0.48) * i * 62,
      475 + Math.sin(-0.48) * i * 62,
      { size: 18 + i * 3, font: 'monospace', angle: -0.48 * 180 / Math.PI });
  }
  const fork = Merz.bauteile("Y", { size: 46, weight: 0.45 }).find(
    (part) => part.id === "fork"
  );
  for (let i = 0; i < 5; i++) paint(fork.paths, 62 + i * 38, 557, "#234b92");
  noStroke();
  fill("#20201e");
  textFont("Arial");
  textSize(15);
  for (let i = 0; i < 4; i++) text(syllables.join("   "), 332, 515 + i * 23);
  textFont("Georgia");
  textSize(32);
  text(syllables[3] + "?", 455, 643);
}

function paint(paths, x, y, colour) {
  Merz.stempel({ paths }, x, y, { color: colour });
}
