// Load p5.js, the library, ink.js, surface.js and composition.js first.
const settings = {
  printAmount: 0.45,
  ageAmount: 0.65,
  pattern: 17,
  treatment: "print"
};

function setup() {
  const canvas = createCanvas(600, 840);
  if (document.getElementById("drawing")) canvas.parent("drawing");
  pixelDensity(1);
  noLoop();
  describe(
    "A fixed typographic page with separately chosen ink coverage and local ageing loss."
  );
  MerzSurfacePage.connectControls(settings, () => redraw());
}

function draw() {
  MerzSurfacePage.render(globalThis, settings);
}

function keyPressed() {
  if (key === "s" || key === "S") {
    saveCanvas("p5.merz-surface-" + settings.treatment, "png");
  }
}
