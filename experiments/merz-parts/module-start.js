// Load p5.js and p5.merz.js before this sketch.
const word = "ROOM";
const size = 110;
const ink = "#20201e";

function setup() {
  const canvas = createCanvas(600, 600);
  if (document.getElementById("drawing")) canvas.parent("drawing");
  noLoop();
  describe("A geometric word above a red plane and an ordinary p5 line.");
}

function draw() {
  background("#f7f7f2");
  const wordShape = Merz.geometry(word, { size, spacing: 10 });
  paint(wordShape.paths, 45, 95, ink);
  noStroke();
  fill("#b92d26");
  rect(45, 270, 180, 110);
  stroke(ink);
  strokeWeight(3);
  line(45, 440, 545, 440);
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
