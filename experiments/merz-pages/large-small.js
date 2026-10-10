const word = "ROOM";
const title = { x: 48, y: 110, size: 128 };
const smallText = {
  x: 48,
  y: 355,
  size: 19,
  text: "A word takes its place.\nSmall text keeps a different voice.\nThe space between them stays open."
};
const sideText = { x: 540, y: 620, size: 22, text: "ROOM TO MAKE" };
const ink = "#20201e",
  accent = "#b92d26";

function setup() {
  const canvas = createCanvas(600, 840);
  if (document.getElementById("drawing")) canvas.parent("drawing");
  pixelDensity(1);
  noLoop();
  describe(
    "A large geometric word, small serif text and a vertical red passage, separated by open space."
  );
}

function draw() {
  background("#f7f7f2");
  letters(word, title.x, title.y, {
    size: title.size,
    spacing: 12,
    weight: 0.8,
    color: ink
  });
  noStroke();
  fill(ink);
  textFont("Georgia");
  textSize(smallText.size);
  text(smallText.text, smallText.x, smallText.y);
  push();
  translate(sideText.x, sideText.y);
  rotate(-HALF_PI);
  fill(accent);
  textFont("Arial");
  textSize(sideText.size);
  text(sideText.text, 0, 0);
  pop();
  stroke(ink);
  strokeWeight(3);
  line(48, 690, 450, 690);
  noStroke();
  fill(ink);
  textFont("Arial");
  textSize(12);
  text("01 / LARGE AND SMALL", 48, 748);
}

function letters(value, x, y, options) {
  push();
  translate(x, y);
  noFill();
  stroke(options.color || "#20201e");
  strokeCap(SQUARE);
  strokeJoin(MITER);
  for (const part of Merz.geometry(value, options).paths) {
    strokeWeight(part.width);
    beginShape();
    for (const point of part.points) vertex(...point);
    endShape();
  }
  pop();
}

function keyPressed() {
  if (key === "s" || key === "S") saveCanvas("p5.merz-page", "png");
}
