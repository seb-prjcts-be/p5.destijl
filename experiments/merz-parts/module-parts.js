// Load p5.js and p5.merz.js before this sketch.
const letter = "R";
const partName = "bowl";
const copies = 4;

function setup() {
  const canvas = createCanvas(600, 600);
  if (document.getElementById("drawing")) canvas.parent("drawing");
  noLoop();
  describe(
    "The bowl of a geometric R, recoloured and repeated beside the whole letter."
  );
}

function draw() {
  background("#f7f7f2");
  const options = { size: 100, weight: 0.65 };
  const whole = Merz.geometry(letter, options);
  const available = Merz.parts(letter, options);
  const chosen = available.find((part) => part.id === partName);
  if (!chosen)
    throw new Error("Choose one of: " + available.map((part) => part.id).join(", "));
  paint(whole.paths, 55, 95, "#20201e");
  paint(chosen.paths, 55, 95, "#b92d26");
  for (let i = 0; i < copies; i++) {
    paint(chosen.paths, 350, 95 + i * 90, "#b92d26");
  }
  noStroke();
  fill("#20201e");
  textFont("Georgia");
  textSize(20);
  text("A part can become another drawing.", 55, 530);
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
