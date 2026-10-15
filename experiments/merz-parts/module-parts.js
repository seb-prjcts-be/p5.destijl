// Load p5.js and p5.merz.js before this sketch.
const letter = "R";
const partName = "bowl";
const copies = 4;

function setup() {
  const canvas = createCanvas(600, 600);
  if (document.getElementById("drawing")) canvas.parent("drawing");
  noLoop();
  describe(
    "The bowl of a geometric R, recoloured and repeated beside the whole letter."
  );
}

function draw() {
  background("#f7f7f2");
  const options = { size: 100, weight: 0.65 };
  const whole = Merz.satz(letter, options);
  const chosen = Merz.bauteil(letter, partName, options);
  Merz.stempel(whole, 55, 95, { color: "#20201e" });
  Merz.stempel(chosen, 55, 95, { color: "#b92d26" });
  for (let i = 0; i < copies; i++) {
    Merz.stempel(chosen, 350, 95 + i * 90, { color: "#b92d26" });
  }
  noStroke();
  fill("#20201e");
  textFont("Georgia");
  textSize(20);
  text("A part can become another drawing.", 55, 530);
}
