// An imagined advertisement. BRILLANTINE: Merz 4, p. 36; Nichts ist Zufall: Merz 1, p. 7.
// Other product wording and numbers are invented for this sketch.
let blatt;
function setup() {
  createCanvas(600, 760).parent('drawing');
  noLoop();
  const farbe = Merz.farbe;
  blatt = Merz.andruck({ paper: 0.25, ink: 0.17, seed: 17 });
  blatt.noStroke();

  // Two small lines between rules, then the heavy headline filling two boxes.
  blatt.stempel(['BRILLANTINE. ESSENZ FÜR DAS HAAR.', 'FORM. GLANZ. EIN WENIG GENÜGT.'], 30, 37,
    { size: 11, weight: 700, leading: 27, rule: { weight: 3, after: true } });
  blatt.stempel('BRILL', 26, 286, { weight: 900, stretch: 75, width: 540, height: 175 });
  blatt.stempel('ANTINE', 29, 421, { weight: 900, stretch: 75, width: 508, height: 111 });
  blatt.stempel('04', 25, 562, { size: 122, weight: 900 });

  // A small bottle as a marginal illustration, with a geometric B on its label.
  blatt.push(); blatt.translate(48, 603); blatt.rotate(-0.13); blatt.scale(0.34);
  blatt.fill(farbe.schwarz);
  blatt.rect(52, -24, 82, 36); blatt.rect(66, 12, 54, 35);
  blatt.beginShape();
  for (const point of [[66, 42], [120, 42], [158, 85], [158, 250], [26, 250], [26, 85]]) blatt.vertex(...point);
  blatt.endShape(CLOSE);
  blatt.fill(farbe.grau); blatt.rect(37, 110, 110, 99);
  blatt.stempel(Merz.satz('B', { size: 64, weight: 0.6 }), 50, 124, { color: farbe.rot });
  blatt.pop();

  // Product notes, a framed quotation and a vertical reference.
  blatt.stempel('ESSENZ, 50 ml', 339, 472, { size: 13, weight: 400 });
  blatt.fill(farbe.rot); blatt.rect(342, 486, 224, 7);
  blatt.noFill(); blatt.stroke(farbe.schwarz); blatt.strokeWeight(5); blatt.rect(235, 523, 331, 76); blatt.noStroke();
  blatt.stempel('Nichts ist Zufall.', 249, 554, { size: 26, weight: 900 });
  blatt.stempel('Ein wenig genügt. Form und Glanz.', 250, 579, { size: 12, weight: 400 });
  blatt.stempel('ESSENZ / BRILLANTINE / NR. 04', 580, 426, { size: 9, weight: 500, spacing: 1, angle: -90 });
  blatt.stempel('FORM UND GLANZ', 132, 661, { size: 23, weight: 900 });
  blatt.stempel('BRILLANTINE / ESSENZ / NR. 04', 132, 684, { size: 12, weight: 700 });
  blatt.stempel('50 ml. Ein wenig genügt.', 132, 702, { size: 10, weight: 400 });
  describe('An imagined Brillantine advertisement: tall heavy black lettering, a large 04, a small bottle and a framed quotation.');
}
function draw() {
  Merz.stempel(blatt, 0, 0);
}
