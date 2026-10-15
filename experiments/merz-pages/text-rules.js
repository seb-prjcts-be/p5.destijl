const lines = [
  "A LINE HOLDS A PLACE",
  "WORDS RETURN BELOW IT",
  "LEAVE ROOM BETWEEN",
  "ONE THOUGHT AND ANOTHER"
];
const heading = { text: "LINES", x: 52, y: 92, size: 100 };
const layout = { x: 90, y: 330, width: 450, gap: 57 };
const ink = "#20201e";
const accent = "#b92d26";

function setup() {
  const canvas = createCanvas(600, 840);
  if (document.getElementById("drawing")) canvas.parent("drawing");
  pixelDensity(1);
  noLoop();
  describe(
    "A geometric heading above four red text lines and dark horizontal rules, with small vertical information."
  );
}

function draw() {
  background("#f7f7f2");
  letters(heading.text, heading.x, heading.y, {
    size: heading.size,
    spacing: 12,
    weight: 0.75
  });
  textFont("Arial");
  textSize(24);
  for (let i = 0; i < lines.length; i++) {
    const y = layout.y + i * layout.gap;
    noStroke();
    fill(accent);
    text(lines[i], layout.x, y);
    stroke(ink);
    strokeWeight(4);
    line(layout.x, y + 15, layout.x + layout.width, y + 15);
  }
  push();
  translate(50, 570);
  rotate(-HALF_PI);
  noStroke();
  fill(ink);
  textSize(12);
  text("TEXT / RULES / INTERVALS", 0, 0);
  pop();
  noStroke();
  fill(ink);
  textSize(12);
  text("02 / TEXT AND RULES", 52, 748);
}

function letters(value, x, y, options) {
  push();
  translate(x, y);
  noFill();
  stroke(options.color || "#20201e");
  strokeCap(SQUARE);
  strokeJoin(MITER);
  for (const part of Merz.satz(value, options).paths) {
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
