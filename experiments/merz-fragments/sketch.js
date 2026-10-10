const fragments = {
  m: {
    x: 10,
    y: 55,
    width: 70,
    height: 140
  },
  r: {
    x: 171,
    y: 55,
    width: 58,
    height: 140
  },
  rule: {
    x: 12,
    y: 30,
    width: 282,
    height: 7
  }
};
const selectedFragment = "m";
const crop = fragments[selectedFragment];
const positions = [
  {
    x: 60,
    y: 110,
    width: 95
  },
  {
    x: 180,
    y: 110,
    width: 95
  },
  {
    x: 300,
    y: 110,
    width: 95
  }
];
let source;

async function setup() {
  source = await loadImage("assets/merz-2-cover.jpg");
  const canvas = createCanvas(600, 840);
  if (document.getElementById("drawing")) canvas.parent("drawing");
  pixelDensity(1);
  noLoop();
  describe(
    "Three rectangular fragments from the Merz 2 cover above a clean geometric M. The scan retains its paper and ink surface."
  );
}

function draw() {
  background("#f7f7f2");
  for (const place of positions) {
    const height = (place.width * crop.height) / crop.width;
    image(
      source,
      place.x,
      place.y,
      place.width,
      height,
      crop.x,
      crop.y,
      crop.width,
      crop.height
    );
  }
  const work = Merz.create({
    width: 600,
    height: 840,
    background: null
  });
  work.text("M", 60, 425, {
    size: 190,
    weight: 0.8
  });
  work.draw();
  noStroke();
  fill("#20201e");
  textFont("Arial");
  textSize(14);
  text(
    "A scan fragment keeps the paper around it.\nThe geometric letter remains editable.",
    60,
    690
  );
}

function keyPressed() {
  if (key === "s" || key === "S") saveCanvas("p5.merz-fragments", "png");
  if (key === "c" || key === "C") {
    const fragment = source.get(crop.x, crop.y, crop.width, crop.height);
    save(fragment, "merz-2-cover-" + selectedFragment + ".png");
  }
}
