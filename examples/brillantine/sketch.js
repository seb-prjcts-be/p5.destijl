// An imagined advertisement. BRILLANTINE: Merz 4, p. 36; Nichts ist Zufall: Merz 1, p. 7.
// Other product wording and numbers are invented for this sketch.
let bogen;
function setup() {
  createCanvas(600, 760).parent('drawing');
  noLoop();
  bogen = Merz.bogen({ paper: 0.25, ink: 0.17, seed: 17 });
  const g = bogen;
  g.noStroke();
  g.fill(Merz.farbe.schwarz);
  g.textFont('Archivo Black');
  g.textSize(12);
  g.text('BRILLANTINE. ESSENZ FÜR DAS HAAR.', 30, 37);
  g.rect(30, 45, 538, 3);
  g.textSize(10);
  g.text('FORM. GLANZ. EIN WENIG GENÜGT.', 30, 64);
  g.rect(30, 72, 538, 3);

  // Tall, heavy type carries the page; the two lines have different proportions.
  function headline(word, x, y, w, h) {
    g.push();
    g.translate(x, y);
    g.textSize(100);
    g.scale(w / g.textWidth(word), h / 74);
    g.text(word, 0, 74);
    g.pop();
  }
  headline('BRILL', 26, 111, 540, 175);
  headline('ANTINE', 29, 310, 508, 111);

  g.textFont('Archivo Black');
  g.textSize(122);
  g.text('04', 25, 562);
  g.textFont('Arial');
  g.textSize(13);
  g.text('ESSENZ — 50 ml', 339, 472);
  g.fill(Merz.farbe.rot);
  g.rect(342, 486, 224, 7);

  // The small bottle acts as a marginal illustration rather than a second headline.
  g.push();
  g.translate(48, 603);
  g.rotate(-0.13);
  g.scale(0.34);
  g.fill(Merz.farbe.schwarz);
  g.rect(52, -24, 82, 36);
  g.rect(66, 12, 54, 35);
  g.beginShape();
  for (const point of [[66,42],[120,42],[158,85],[158,250],[26,250],[26,85]]) g.vertex(...point);
  g.endShape(CLOSE);
  g.fill(Merz.farbe.grau);
  g.rect(37, 110, 110, 99);
  Merz.stempel(Merz.satz('B', { size: 64, weight: 0.6 }), 50, 124, { color: Merz.farbe.rot }, g);
  g.pop();

  g.noFill();
  g.stroke(Merz.farbe.schwarz);
  g.strokeWeight(5);
  g.rect(235, 523, 331, 76);
  g.noStroke();
  g.fill(Merz.farbe.schwarz);
  g.textFont('Archivo Black');
  g.textSize(26);
  g.text('Nichts ist Zufall.', 249, 554);
  g.textFont('Arial');
  g.textSize(12);
  g.text('Ein wenig genügt. Form und Glanz.', 250, 579);

  Merz.stempel('ESSENZ / BRILLANTINE / NR. 04', 580, 426, { size: 9, font: 'monospace', angle: -90 }, g);

  g.textFont('Archivo Black');
  g.textSize(23);
  g.text('FORM UND GLANZ', 132, 661);
  g.textSize(12);
  g.text('BRILLANTINE / ESSENZ / NR. 04', 132, 684);
  g.textFont('Arial');
  g.textSize(10);
  g.text('50 ml. Ein wenig genügt.', 132, 702);
  describe('An imagined Brillantine advertisement: tall heavy black lettering, a large 04, a small bottle and a framed quotation.');
}

function draw() {
  bogen.druck();
}
