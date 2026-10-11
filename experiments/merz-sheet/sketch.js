// Found texts: T041, Merz 1, Page 7.
// See assets/fundsachen/texts/catalogue.json for source scans.
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
  sheet = Merz.andruck(paper, { ink: 0, paper: paperAmount, seed });
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
  const letters = Merz.satz("M", { size: 250, weight: 0.55 });
  Merz.stempel(letters, 315, 330, { color: "#b92d26" }, ink);
  const bowl = Merz.bauteil("R", "bowl", { size: 95, weight: 0.65 });
  for (let i = 0; i < 3; i++) Merz.stempel(bowl, 52, 330 + i * 91, { color: "#20201e" }, ink);
  ink.noStroke();
  ink.fill("#20201e");
  ink.textFont("monospace");
  ink.textSize(15);
  ink.text("1 / 2 / 3", 52, 671);
  ink.textSize(11);
  ink.text("Nichts ist Zufall.", 52, 700);
  const impression = Merz.andruck(ink, { ink: inkAmount, paper: 0, seed });
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

function keyPressed() {
  if (key === "s" || key === "S") saveCanvas("p5.merz-fundsachen", "png");
}
