// A cover after Merz 8/9. Found words: NATUR (T392), NASCI (T360), KRAFT (T393),
// WAS SICH AUS SICH SELBST DURCH EIGENE KRAFT ENTWICKELT (T394), GESTALTET UND BEWEGT (T395).
// Title, notes and date are new.
let bogen;
async function setup() {
  createCanvas(600, 760).parent('drawing');
  noLoop();
  const farbe = Merz.farbe;
  bogen = Merz.bogen({ paper: 0.25, ink: 0.15, seed: 17 });

  // The masthead: a stretched title between two numerals in another face.
  Merz.stempel('MERZ', 142, 215, { stretch: 62, weight: 800, width: 318, height: 158, color: farbe.blau }, bogen);
  Merz.stempel('8', 52, 213, { size: 128, font: 'antiqua', weight: 500, color: farbe.blau }, bogen);
  Merz.stempel('9', 478, 213, { size: 128, font: 'antiqua', weight: 500, color: farbe.blau }, bogen);
  Merz.stempel(['NATUR, FORM UND KRAFT IN EINEM HEFT', 'GESETZT MIT GEFUNDENEN WORTEN'], 60, 247,
    { size: 11, weight: 500, leading: 17, width: 480, color: farbe.blau }, bogen);

  // The margin: a bar, two notes read upwards, a pointing hand and the date.
  bogen.noStroke(); bogen.fill(farbe.blau); bogen.rect(133, 268, 7, 440);
  Merz.stempel('REDAKTION: NATUR UND FORM', 58, 585, { size: 20, weight: 700, stretch: 87, color: farbe.blau, angle: -90 }, bogen);
  Merz.stempel('GESETZT IN GENT, 2026', 78, 585, { size: 9, weight: 500, spacing: 1, color: farbe.blau, angle: -90 }, bogen);
  await Merz.merzbilder('026', 57, 603, 20, bogen);
  Merz.stempel('HEFT 1, NR. 8/9', 52, 668, { size: 9, weight: 500, color: farbe.blau }, bogen);
  Merz.stempel(['OKTO', 'BER', '2026'], 52, 700, { size: 24, weight: 700, leading: 27, width: 72, color: farbe.blau }, bogen);

  // The text: one line in three sizes across the measure, then red lines between blue rules.
  Merz.stempel([{ text: 'NATUR', size: 30, weight: 500 }, { text: 'ODER', size: 14, weight: 500 }, { text: 'NASCI', weight: 800, width: 203, height: 44 }],
    165, 357, { width: 410, color: farbe.rot }, bogen);
  Merz.stempel(['HEISST WERDEN:', 'WAS SICH AUS SICH', 'SELBST DURCH EIGENE', 'KRAFT ENTWICKELT', 'GESTALTET UND BEWEGT'],
    165, 401, { size: 24, weight: 500, stretch: 125, leading: 44.6, width: 410, color: farbe.rot, rule: { weight: 9, color: farbe.blau, before: true } }, bogen);
  Merz.stempel('NASCI', 370, 712, { size: 44, weight: 500, stretch: 112, align: 'center', color: farbe.rot }, bogen);
  Merz.stempel('Natur, Form und Kraft:', 165, 728, { size: 9, weight: 400 }, bogen);
  Merz.stempel('was sich aus sich selbst entwickelt.', 575, 728, { size: 9, weight: 400, align: 'right' }, bogen);
  describe('A cover after Merz 8/9: a stretched blue MERZ between the numerals 8 and 9, a measure of red lines between blue rules, a pointing hand and notes read upwards.');
}
function draw() {
  bogen.druck();
}
