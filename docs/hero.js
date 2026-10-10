// A visual response to Kurt Schwitters' Ursonate, not a reproduction of its score.
// Change the fragment, scales and positions; drawing stays in ordinary p5 code.
const fragment = "Fümms";

function setup() {
  const holder = document.getElementById("hero-canvas");
  createCanvas(holder.clientWidth, holder.clientHeight).parent(holder);
  pixelDensity(1);
  noLoop();
  describe(
    "Fümms in large serif letters, a red geometric M and repeated letter parts. The open space holds the p5.merz title."
  );
}

function draw() {
  resetMatrix();
  background("#f7f7f2");
  const compact = width < 700;
  const pageWidth = compact ? 600 : 1200;
  const pageHeight = compact ? 760 : 620;
  scale(width / pageWidth, height / pageHeight);
  const ink = "#20201e";
  const red = "#b92d26";

  // The M is one material among ordinary text and lines.
  paint(
    Merz.geometry("M", { size: compact ? 220 : 310, weight: 0.48 }).paths,
    compact ? 290 : 805,
    compact ? 155 : 210,
    red
  );
  noStroke();
  fill(ink);
  textFont("Georgia");
  textSize(compact ? 155 : 244);
  text(fragment, compact ? 24 : 46, compact ? 174 : 215);

  push();
  translate(compact ? 45 : 658, compact ? 327 : 342);
  rotate(-0.18);
  textFont("monospace");
  for (let i = 0; i < 5; i++) {
    textSize(15 + i * 5);
    text("m", i * 35, 0);
  }
  pop();

  const fork = Merz.parts("Y", { size: 35, weight: 0.4 }).find(
    (part) => part.id === "fork"
  );
  for (let i = 0; i < 5; i++)
    paint(fork.paths, (compact ? 330 : 870) + i * 34, compact ? 421 : 559, ink);
  stroke(ink);
  strokeWeight(2);
  line(
    compact ? 28 : 644,
    compact ? 389 : 430,
    compact ? 238 : 763,
    compact ? 389 : 430
  );
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

function windowResized() {
  const holder = document.getElementById("hero-canvas");
  resizeCanvas(holder.clientWidth, holder.clientHeight);
  redraw();
}
