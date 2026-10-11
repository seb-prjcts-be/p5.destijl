// Found texts: T169, Merz 2, p. 31; T103, p. 17; T166, p. 30.
// See assets/fundsachen/texts/catalogue.json for source scans.
// Load p5.js and p5.merz.js before this sketch.
const seed = 17;
const ticketNumber = "038 / 72";
let clipping;

async function setup() {
  const cover = await loadImage("../merz-fragments/assets/merz-2-cover.jpg");
  const outline = [[0, 12], [245, 0], [232, 367], [15, 350]];
  const points = outline.map(([x, y]) => [x * cover.width / 245, y * cover.height / 375]);
  clipping = Merz.schnitt(cover, points).bau();
  const canvas = createCanvas(600, 720);
  if (document.getElementById("drawing")) canvas.parent("drawing");
  pixelDensity(1);
  noLoop();
  describe(
    "A cropped Merz cover, an invented ticket and red circular impressions overlap on a pale page."
  );
}

function draw() {
  randomSeed(seed);
  background("#f7f7f2");
  // This irregular clipping keeps the scan's own paper.
  push();
  translate(52, 54);
  rotate(-0.08);
  image(clipping, 0, 0, 245, 367);
  pop();

  push();
  translate(222, 282);
  rotate(0.12);
  noStroke();
  fill("#e8bb32");
  beginShape();
  vertex(0, 0);
  vertex(290, 0);
  for (let y = 8; y <= 184; y += 8) vertex(290 - random(2, 9), y);
  vertex(0, 184);
  for (let y = 176; y > 0; y -= 8) vertex(random(2, 9), y);
  endShape(CLOSE);
  fill("#20201e");
  textFont("monospace");
  textSize(13);
  text("Hier abschneiden!", 18, 27);
  textSize(34);
  text(ticketNumber, 18, 82);
  stroke("#20201e");
  strokeWeight(1);
  line(18, 100, 270, 100);
  for (let x = 20; x < 270; x += 9) line(x, 119, x, 157);
  pop();

  noFill();
  stroke("#b92d26");
  strokeWeight(4);
  for (let i = 0; i < 3; i++) circle(410 + i * 3, 220 + i * 2, 138);
  strokeWeight(1);
  circle(410, 220, 116);
  noStroke();
  fill("#b92d26");
  textFont("Georgia");
  textSize(30);
  text("i", 373, 228);
  paint(
    Merz.bauteile("R", { size: 140 }).find((part) => part.id === "bowl").paths,
    70,
    480,
    "#20201e"
  );
  fill("#20201e");
  textFont("Georgia");
  textSize(18);
  text("Hierin is het onmogelijke mogelijk.", 235, 601);
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
