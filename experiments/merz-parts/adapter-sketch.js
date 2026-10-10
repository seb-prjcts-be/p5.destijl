// A local alphabet adapter supplies geometry. Ordinary p5 code draws it.
let letter = "N";
let selectedPart = "top-bar";
const partColour = "#b92d26";
const repeats = 5;
let glyph;

function setup() {
  const canvas = createCanvas(600, 840);
  if (document.getElementById("drawing")) canvas.parent("drawing");
  pixelDensity(1);
  noLoop();
  glyph = MerzAlphabetStudy.letter(letter, { size: 170, weight: 0.65 });
  connectParts();
  describe("A geometric letter with one named part recoloured and repeated.");
}

function draw() {
  background("#f7f7f2");
  for (const path of glyph.paths) paintPath(path, 55, 100, "#20201e");
  const part = glyph.parts.find((part) => part.id === selectedPart);
  if (!part) throw new Error("Choose a part available in this letter.");
  for (const path of part.paths) {
    paintPath(path, 55, 100, partColour);
    for (let i = 0; i < repeats; i++) {
      paintPath(path, 330, 100 + i * 85, partColour, 0.45);
    }
  }
  noStroke();
  fill("#20201e");
  textFont("Georgia");
  textSize(18);
  text("One named part.\nThe whole letter keeps its construction.", 55, 620);
}

function paintPath(path, x, y, colour, partScale = 1) {
  push();
  translate(x, y);
  scale(partScale);
  noFill();
  stroke(colour);
  strokeWeight(path.width);
  strokeCap(SQUARE);
  strokeJoin(MITER);
  beginShape();
  for (const point of path.points) vertex(...point);
  endShape();
  pop();
}

function keyPressed() {
  if (key === "s" || key === "S") saveCanvas("p5.merz-named-parts", "png");
}

// The page controls use the same two values as the sketch.
function connectParts() {
  const letters = document.querySelector("#letter");
  const parts = document.querySelector("#part");
  if (!letters || !parts) return;
  for (const value of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
    letters.add(new Option(value, value));
  }
  letters.value = letter;
  function updateParts() {
    glyph = MerzAlphabetStudy.letter(letter, { size: 170, weight: 0.65 });
    parts.replaceChildren();
    for (const part of glyph.parts) parts.add(new Option(part.id, part.id));
    if (!glyph.parts.some((part) => part.id === selectedPart)) {
      selectedPart = glyph.parts[0].id;
    }
    parts.value = selectedPart;
  }
  updateParts();
  letters.addEventListener("change", () => {
    letter = letters.value;
    updateParts();
    redraw();
  });
  parts.addEventListener("change", () => {
    selectedPart = parts.value;
    redraw();
  });
}
