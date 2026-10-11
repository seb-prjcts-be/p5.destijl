// Found texts: T019-T025, Merz 1, p. 4.
// See assets/fundsachen/texts/catalogue.json for source scans.
/* Local composition shared by the surface comparisons. */
(function (root) {
  "use strict";
  function marks(layer, index) {
    layer.push();
    if (index === 0) {
      const work = Merz.create({
        width: 600,
        height: 840,
        background: null
      });
      work.text("STEM", 48, 110, {
        size: 128,
        spacing: 12,
        weight: 0.8
      });
      work.draw(layer);
    }
    if (index === 1) {
      layer.noStroke();
      layer.fill("#20201e");
      layer.textFont("Georgia");
      layer.textSize(19);
      layer.text(
        "DADA erwacht.",
        48,
        355
      );
    }
    if (index === 2) {
      layer.translate(540, 620);
      layer.rotate(-Math.PI / 2);
      layer.noStroke();
      layer.fill("#b92d26");
      layer.textFont("Arial");
      layer.textSize(22);
      layer.text("WACHT", 0, 0);
    }
    if (index === 3) {
      layer.stroke("#20201e");
      layer.strokeWeight(3);
      layer.line(48, 690, 450, 690);
      layer.noStroke();
      layer.fill("#20201e");
      layer.textFont("Arial");
      layer.textSize(12);
      layer.text("STILTE", 48, 748);
    }
    layer.pop();
  }
  function alphaSum(layer) {
    layer.loadPixels();
    let sum = 0;
    for (let i = 3; i < layer.pixels.length; i += 4) sum += layer.pixels[i];
    return sum;
  }
  function render(p, options) {
    const {
      printAmount: printAmount,
      ageAmount: ageAmount,
      pattern: pattern,
      treatment: treatment
    } = options;
    p.background("#f7f7f2");
    const layer = p.createGraphics(600, 840);
    layer.pixelDensity(1);
    try {
      let cleanAlpha = 0;
      for (let i = 0; i < 4; i++) {
        if (treatment === "element-print" || treatment === "element-age") {
          const part = p.createGraphics(600, 840);
          part.pixelDensity(1);
          try {
            marks(part, i);
            cleanAlpha += alphaSum(part);
            if (treatment === "element-print") {
              MerzInkStudy.apply(part, printAmount, pattern + i * 101);
            } else {
              MerzSurfaceStudy.applyAge(part, ageAmount, pattern + 1000 + i * 101);
            }
            layer.image(part, 0, 0);
          } finally {
            part.remove();
          }
        } else marks(layer, i);
      }
      if (treatment !== "element-print" && treatment !== "element-age")
        cleanAlpha = alphaSum(layer);
      if (treatment === "print" || treatment === "both")
        MerzInkStudy.apply(layer, printAmount, pattern);
      if (treatment === "age" || treatment === "both")
        MerzSurfaceStudy.applyAge(layer, ageAmount, pattern + 1e3);
      p.image(layer, 0, 0);
      const report = document.getElementById("coverage");
      if (report)
        report.textContent =
          "Measured coverage loss: " +
          (100 * (1 - alphaSum(layer) / cleanAlpha)).toFixed(2) +
          "% of the clean ink layer.";
    } finally {
      layer.remove();
    }
  }
  function connectControls(options, redrawPage) {
    const form = document.getElementById("surface-controls");
    if (!form) return;
    const initial = {
      ...options
    };
    const fields = {
      print: "printAmount",
      age: "ageAmount",
      seed: "pattern"
    };
    form.elements.print.closest("label").hidden = ![
      "print",
      "both",
      "element-print"
    ].includes(options.treatment);
    form.elements.age.closest("label").hidden = ![
      "age",
      "both",
      "element-age"
    ].includes(options.treatment);
    form.elements.seed.closest("label").hidden = options.treatment === "clean";
    for (const [name, key] of Object.entries(fields)) {
      form.elements[name].value = options[key];
    }
    form.addEventListener("input", () => {
      if (!form.checkValidity()) return;
      for (const [name, key] of Object.entries(fields)) {
        options[key] = Number(form.elements[name].value);
      }
      redrawPage();
    });
    form.addEventListener("submit", (event) => event.preventDefault());
    document.getElementById("reset").addEventListener("click", () => {
      Object.assign(options, initial);
      for (const [name, key] of Object.entries(fields)) {
        form.elements[name].value = options[key];
      }
      redrawPage();
    });
  }
  root.MerzSurfacePage = {
    render: render,
    connectControls: connectControls
  };
})(globalThis);
