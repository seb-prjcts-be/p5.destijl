// Load p5.js and p5.merz.js before this sketch.
const inkAmount = 0.12;
const paperAmount = 0.18;
const seed = 17;
let sheet;

function setup() {
  const canvas = createCanvas(600, 760);
  if (document.getElementById("drawing")) canvas.parent("drawing");
  pixelDensity(1);
  noLoop();
  const paper = createGraphics(width, height);
  paper.pixelDensity(1);
  paper.background("#f7f7f2");
  sheet = Merz.surface(paper, { ink: 0, paper: paperAmount, seed });
  paper.remove();

  const ink = createGraphics(width, height);
  ink.pixelDensity(1);
  ink.noStroke();
  ink.fill("#b92d26");
  ink.rect(52, 70, 210, 16);
  ink.fill("#20201e");
  ink.textFont("Georgia");
  ink.textSize(78);
  ink.text("Fundsachen", 45, 227, 510);
  const letters = Merz.geometry("M", { size: 250, weight: 0.55 });
  paint(ink, letters.paths, 315, 330, "#b92d26");
  const parts = Merz.parts("R", { size: 95, weight: 0.65 });
  const bowl = parts.find((part) => part.id === "bowl");
  for (let i = 0; i < 3; i++) paint(ink, bowl.paths, 52, 330 + i * 91, "#20201e");
  ink.noStroke();
  ink.fill("#20201e");
  ink.textFont("monospace");
  ink.textSize(15);
  ink.text("1 / 2 / 3", 52, 671);
  ink.textSize(11);
  ink.text("Collected here. Arranged in code.", 52, 700);
  const impression = Merz.surface(ink, { ink: inkAmount, paper: 0, seed });
  const page = createGraphics(width, height);
  page.pixelDensity(1);
  page.image(sheet, 0, 0);
  page.image(impression, 0, 0);
  sheet = page.get();
  page.remove();
  ink.remove();
  describe(
    "A pale sheet with slight surface variation, red and black letterforms and a row of repeated R bowls."
  );
}

function draw() {
  image(sheet, 0, 0);
}

function paint(target, paths, x, y, colour) {
  target.push();
  target.translate(x, y);
  target.noFill();
  target.stroke(colour);
  target.strokeCap(SQUARE);
  target.strokeJoin(MITER);
  for (const path of paths) {
    target.strokeWeight(path.width);
    target.beginShape();
    for (const point of path.points) target.vertex(...point);
    target.endShape();
  }
  target.pop();
}

function keyPressed() {
  if (key === "s" || key === "S") saveCanvas("p5.merz-fundsachen", "png");
}
