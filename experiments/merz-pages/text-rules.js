// Found texts: T019-T025, Merz 1, p. 4.
// See assets/fundsachen/texts/catalogue.json for source scans.
const lines = [
  "STILTE",
  "STEM",
  "WACHT",
  "WAAK"
];
const heading = { text: "WEK", x: 52, y: 92, size: 100 };
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
  Merz.satz(heading.text, heading.x, heading.y, {
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
  Merz.stempel('DADA COMPLET', 50, 570, { size: 12, font: 'Arial', angle: -90 });
  noStroke();
  fill(ink);
  textSize(12);
  text("DADA erwacht.", 52, 748);
}

function keyPressed() {
  if (key === "s" || key === "S") saveCanvas("p5.merz-page", "png");
}
