// Found texts: T022, Merz 1, p. 4; T429, Merz 8/9, p. 78.
// See assets/fundsachen/texts/catalogue.json for source scans.
const word = "WAAK";
const partColour = "#b92d26";
const repeats = 5;
let crossbar;

function setup() {
  const canvas = createCanvas(600, 840);
  if (document.getElementById("drawing")) canvas.parent("drawing");
  pixelDensity(1);
  noLoop();
  // A's second path is its crossbar in the current geometry.
  // This is an inspected local choice, not a named public part.
  crossbar = Merz.satz("A", {
    size: 170,
    weight: 0.65
  }).paths[1];
  describe(
    "An A with a red crossbar, five repeated crossbars and the word WAAK beside ordinary serif text."
  );
}

function draw() {
  background("#f7f7f2");
  const letter = Merz.satz("A", {
    size: 170,
    weight: 0.65
  });
  Merz.stempel({ paths: [letter.paths[0]] }, 55, 100);
  Merz.stempel({ paths: [crossbar] }, 55, 100, { color: partColour });
  for (let i = 0; i < repeats; i++) Merz.stempel({ paths: [crossbar] }, 330, 100 + i * 38, { color: partColour });
  const work = Merz.create({
    width: 600,
    height: 840,
    background: null
  });
  const id = work.text(word, 55, 425, {
    size: 90,
    spacing: 12
  });
  work.update(id, {
    color: "#20201e"
  });
  work.draw();
  noStroke();
  fill("#20201e");
  textFont("Georgia");
  textSize(18);
  text(
    "Kunst ist Form.\nFormen heißt entformeln.",
    55,
    620
  );
}

function keyPressed() {
  if (key === "s" || key === "S") saveCanvas("p5.merz-parts", "png");
}
