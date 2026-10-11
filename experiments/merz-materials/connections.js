// Found texts: T423, Merz 8/9, p. 76.
// See assets/fundsachen/texts/catalogue.json for source scans.
// Load p5.js and p5.merz.js before this sketch.
const seed = 31;
const opening = 108;
const threads = 6;

function setup() {
  const canvas = createCanvas(600, 720);
  if (document.getElementById("drawing")) canvas.parent("drawing");
  pixelDensity(1);
  noLoop();
  describe(
    "A blue irregular shape with a real opening overlaps fine lines, a yellow disc and a red stepped letter part."
  );
}

function draw() {
  randomSeed(seed);
  background("#f7f7f2");
  noStroke();
  fill("#e8bb32");
  circle(351, 323, 285);
  stroke("#20201e");
  strokeWeight(1);
  for (let i = 0; i < threads; i++) {
    noFill();
    bezier(58, 124 + i * 9, 515, 50, 60, 621, 540, 580 + i * 8);
  }
  // Erase on a separate layer: the opening reveals earlier shapes and lines.
  const scrap = createGraphics(600, 720);
  scrap.pixelDensity(1);
  scrap.noStroke();
  scrap.fill("#234b92");
  scrap.beginShape();
  for (const point of [
    [110, 190],
    [300, 126],
    [480, 201],
    [420, 441],
    [241, 486],
    [82, 351]
  ]) {
    scrap.vertex(...point);
  }
  scrap.endShape(CLOSE);
  scrap.erase();
  scrap.circle(295, 306, opening);
  scrap.noErase();
  image(scrap, 0, 0);
  scrap.remove();

  push();
  translate(404, 425);
  rotate(0.38);
  const step = Merz.bauteile("Z", { size: 165, weight: 0.55 }).find(
    (part) => part.id === "lower-turn"
  );
  paint(step.paths, 0, 0, "#b92d26");
  pop();
  noFill();
  stroke("#20201e");
  strokeWeight(2);
  beginShape();
  for (let x = 72; x <= 262; x += 7) vertex(x, 555 + random(-9, 9));
  endShape();
  noStroke();
  fill("#20201e");
  textFont("monospace");
  textSize(13);
  text("Kunstwerk ist Gleichgewicht.", 70, 660);
}

function paint(paths, x, y, colour) {
  Merz.stempel({ paths }, x, y, { color: colour });
}
