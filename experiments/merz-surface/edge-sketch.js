// Found texts: T020/T025, Merz 1, p. 4.
// See assets/fundsachen/texts/catalogue.json for source scans.
// Load p5.js, p5.merz.js and the local edges.js study first.
const word = "STAB";
const edgeAmount = 0.7;
const edgeSeed = 17;

function setup() {
  const canvas = createCanvas(600, 600);
  if (document.getElementById("drawing")) canvas.parent("drawing");
  pixelDensity(1);
  noLoop();
  describe("A geometric word, red rectangle and thin rule, drawn on an ink layer.");
}

function draw() {
  background("#f7f7f2");
  const ink = createGraphics(width, height);
  ink.pixelDensity(1);

  // Draw the word on a transparent layer.
  const letters = Merz.satz(word, { size: 110, spacing: 10 });
  ink.push();
  ink.translate(45, 80);
  ink.noFill();
  ink.stroke("#20201e");
  ink.strokeCap(SQUARE);
  ink.strokeJoin(MITER);
  for (const path of letters.paths) {
    ink.strokeWeight(path.width);
    ink.beginShape();
    for (const point of path.points) ink.vertex(...point);
    ink.endShape();
  }
  ink.pop();

  // Ordinary p5 shapes and text share that layer.
  ink.noStroke();
  ink.fill("#b92d26");
  ink.rect(45, 255, 160, 110);
  ink.fill("#20201e");
  ink.textFont("Georgia");
  ink.textSize(20);
  ink.text("DADA erwacht.", 45, 435);
  ink.stroke("#20201e");
  ink.strokeWeight(2);
  ink.line(45, 485, 540, 485);

  // Change only the ink near its edges. Keep the drawing above yours.
  MerzEdgeStudy.apply(ink, edgeAmount, edgeSeed);
  image(ink, 0, 0);
  ink.remove();
}

function keyPressed() {
  if (key === "s" || key === "S") saveCanvas("p5.merz-ink-edges", "png");
}
