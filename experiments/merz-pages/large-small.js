// Found texts: T019-T025, Merz 1, p. 4.
// See assets/fundsachen/texts/catalogue.json for source scans.
const word = "STAB";
const title = { x: 48, y: 110, size: 128 };
const smallText = {
  x: 48,
  y: 355,
  size: 19,
  text: "DADA erwacht."
};
const sideText = { x: 540, y: 620, size: 22, text: "KRAFT" };
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
  Merz.satz(word, title.x, title.y, {
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
  Merz.stempel(sideText.text, sideText.x, sideText.y, { size: sideText.size, font: 'Arial', color: accent, angle: -90 });
  stroke(ink);
  strokeWeight(3);
  line(48, 690, 450, 690);
  noStroke();
  fill(ink);
  textFont("Arial");
  textSize(12);
  text("NUMMER", 48, 748);
}

function keyPressed() {
  if (key === "s" || key === "S") saveCanvas("p5.merz-page", "png");
}
