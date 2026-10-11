// An imagined advertisement. BRILLANTINE: Merz 4, p. 36; Nichts ist Zufall: Merz 1, p. 7.
// Other product wording and numbers are invented for this sketch.
let bogen;
function setup() {
  createCanvas(600, 760).parent('drawing');
  noLoop();
  const farbe = Merz.farbe;
  bogen = Merz.bogen({ paper: 0.25, ink: 0.17, seed: 17 });
  bogen.noStroke();

  // Two small lines between rules, then the heavy headline filling two boxes.
  Merz.stempel(['BRILLANTINE. ESSENZ FÜR DAS HAAR.', 'FORM. GLANZ. EIN WENIG GENÜGT.'], 30, 37,
    { size: 11, leading: 27, rule: { weight: 3, after: true } }, bogen);
  Merz.stempel('BRILL', 26, 286, { width: 540, height: 175 }, bogen);
  Merz.stempel('ANTINE', 29, 421, { width: 508, height: 111 }, bogen);
  Merz.stempel('04', 25, 562, { size: 122 }, bogen);

  // A small bottle as a marginal illustration, with a geometric B on its label.
  bogen.push(); bogen.translate(48, 603); bogen.rotate(-0.13); bogen.scale(0.34);
  bogen.fill(farbe.schwarz);
  bogen.rect(52, -24, 82, 36); bogen.rect(66, 12, 54, 35);
  bogen.beginShape();
  for (const point of [[66, 42], [120, 42], [158, 85], [158, 250], [26, 250], [26, 85]]) bogen.vertex(...point);
  bogen.endShape(CLOSE);
  bogen.fill(farbe.grau); bogen.rect(37, 110, 110, 99);
  Merz.stempel(Merz.satz('B', { size: 64, weight: 0.6 }), 50, 124, { color: farbe.rot }, bogen);
  bogen.pop();

  // Product notes, a framed quotation and a vertical reference.
  Merz.stempel('ESSENZ — 50 ml', 339, 472, { size: 13, font: 'Arial' }, bogen);
  bogen.fill(farbe.rot); bogen.rect(342, 486, 224, 7);
  bogen.noFill(); bogen.stroke(farbe.schwarz); bogen.strokeWeight(5); bogen.rect(235, 523, 331, 76); bogen.noStroke();
  Merz.stempel('Nichts ist Zufall.', 249, 554, { size: 26 }, bogen);
  Merz.stempel('Ein wenig genügt. Form und Glanz.', 250, 579, { size: 12, font: 'Arial' }, bogen);
  Merz.stempel('ESSENZ / BRILLANTINE / NR. 04', 580, 426, { size: 9, font: 'monospace', angle: -90 }, bogen);
  Merz.stempel('FORM UND GLANZ', 132, 661, { size: 23 }, bogen);
  Merz.stempel('BRILLANTINE / ESSENZ / NR. 04', 132, 684, { size: 12 }, bogen);
  Merz.stempel('50 ml. Ein wenig genügt.', 132, 702, { size: 10, font: 'Arial' }, bogen);
  describe('An imagined Brillantine advertisement: tall heavy black lettering, a large 04, a small bottle and a framed quotation.');
}
function draw() {
  bogen.druck();
}
