// Load p5.js and p5.merz.js before this sketch.
// These syllables are invented for this visual study.
const syllables = ["ta", "rr", "oum", "eh"];
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
  push();
  translate(65, 475);
  rotate(-0.48);
  fill("#20201e");
  textFont("monospace");
  for (let i = 0; i < repetitions; i++) {
    textSize(18 + i * 3);
    text(syllables[1], i * 62, 0);
  }
  pop();
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
  push();
  translate(x, y);
  noFill();
  stroke(colour);
  strokeCap(SQUARE);
  strokeJoin(MITER);
  for (const path of paths) {
    strokeWeight(path.width);
    beginShape();
    for (const point of path.points) vertex(...point);
    endShape();
  }
  pop();
}
