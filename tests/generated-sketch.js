let work;

function setup() {
  createCanvas(900, 900);
  noLoop();
  work = Merz.create({ width: 900, height: 900 });
  work.plane(75, 440, 270, 170, {"color":"#234b92"});
  work.text("VORM", 75, 145, {"color":"#20201e","size":140,"weight":0.85,"proportion":1,"spacing":16});
  work.line(75, 380, 780, 380, {"color":"#b92d26","strokeWeight":14});
  work.text("RUIMTE", 460, 690, {"color":"#20201e","size":46,"weight":0.8,"proportion":1,"spacing":8});
  work.text("D V Q", 75, 300, {"color":"#20201e","size":70,"weight":0.8,"proportion":1,"spacing":12});
}

function draw() {
  work.draw();
}