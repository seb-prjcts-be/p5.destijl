// Found texts: T019-T023, Merz 1, p. 4; T041, p. 7.
// See assets/fundsachen/texts/catalogue.json for source scans.
const ink = "#20201e";
const accent = "#b92d26";
const leftGroup = {
  x: 45,
  y: 58,
  size: 28,
  text: "NUMMER\nKRAFT\nBAND"
};
const rules = { x: 490, y: 50, width: 270, gap: 15, count: 6 };
const rightGroup = {
  x: 710,
  y: 365
};

function setup() {
  const canvas = createCanvas(900, 600);
  if (document.getElementById("drawing")) canvas.parent("drawing");
  pixelDensity(1);
  noLoop();
  describe(
    "Two small groups of text and shapes separated by a large open field, with a thin horizontal line."
  );
}

function draw() {
  background("#f7f7f2");
  noStroke();
  fill(ink);
  textFont("Georgia");
  textSize(leftGroup.size);
  text(leftGroup.text, leftGroup.x, leftGroup.y);
  fill(accent);
  rect(220, 45, 75, 85);
  stroke(ink);
  strokeWeight(2);
  line(45, 155, 820, 155);
  for (let i = 0; i < rules.count; i++) {
    strokeWeight(4);
    line(
      rules.x,
      rules.y + i * rules.gap,
      rules.x + rules.width,
      rules.y + i * rules.gap
    );
  }
  noStroke();
  fill(ink);
  rect(65, 390, 30, 95);
  rect(105, 365, 45, 120);
  Merz.satz("R", rightGroup.x, rightGroup.y, {
    size: 105,
    weight: 0.65
  });
  noStroke();
  fill(ink);
  textSize(24);
  text("Nichts ist Zufall.", 300, 500);
  text("WEG", 45, 555);
}

function keyPressed() {
  if (key === "s" || key === "S") saveCanvas("p5.merz-page", "png");
}
