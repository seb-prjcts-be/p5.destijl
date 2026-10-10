function drawAlphabet(p) {
  p.background("#f7f7f2");
  p.noFill();
  p.strokeCap(p.SQUARE);
  p.strokeJoin(p.MITER);
  function paths(items, colour) {
    p.stroke(colour);
    for (const path of items) {
      p.strokeWeight(path.width);
      p.beginShape();
      for (const point of path.points) p.vertex(...point);
      p.endShape();
    }
  }
  let index = 0;
  for (const letter of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
    p.push();
    p.translate(20 + (index % 6) * 95, 20 + Math.floor(index / 6) * 110);
    const options = { size: 65, weight: 0.65 };
    paths(Merz.geometry(letter, options).paths, "#20201e");
    const parts = Merz.parts(letter, options);
    paths(parts[parts.length - 1].paths, "#b92d26");
    p.pop();
    index++;
  }
}

function setup() {
  createCanvas(600, 600).parent("drawing");
  pixelDensity(1);
  noLoop();
}

function draw() {
  drawAlphabet(globalThis);
  const reference = document.querySelector("canvas").toDataURL();
  const host = document.createElement("div");
  document.querySelector("main").append(host);
  let instance;
  const completed = new Promise((resolve, reject) => {
    instance = new p5((p) => {
      p.setup = () => {
        p.createCanvas(600, 600).parent(host);
        p.pixelDensity(1);
        p.noLoop();
      };
      p.draw = () => {
        try {
          drawAlphabet(p);
          resolve(p.canvas.toDataURL() === reference);
        } catch (error) { reject(error); }
      };
    });
  });
  completed.then(equal => {
    document.getElementById("result").textContent = equal
      ? "PASS: all 26 whole letters and selected named parts have identical global/instance pixels."
      : "FAIL: global and instance drawings differ.";
  }).catch(error => {
    document.getElementById("result").textContent = "FAIL: " + error.message;
  }).finally(() => { instance.remove(); host.remove(); });
}
