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
  Merz.stempel('MERZ', 142, 215, { width: 318, height: 158, color: farbe.blau }, bogen);
  Merz.stempel('8', 52, 213, { size: 128, font: 'Georgia', color: farbe.blau }, bogen);
  Merz.stempel('9', 478, 213, { size: 128, font: 'Georgia', color: farbe.blau }, bogen);
  Merz.stempel(['NATUR, FORM UND KRAFT IN EINEM HEFT', 'GESETZT MIT GEFUNDENEN WORTEN'], 60, 247,
    { size: 11, leading: 17, width: 480, color: farbe.blau }, bogen);

  // The margin: a bar, two notes read upwards, a pointing hand and the date.
  bogen.noStroke(); bogen.fill(farbe.blau); bogen.rect(133, 268, 7, 440);
  Merz.stempel('REDAKTION: NATUR UND FORM', 58, 585, { size: 20, color: farbe.blau, angle: -90 }, bogen);
  Merz.stempel('GESETZT IN GENT, 2026', 78, 585, { size: 9, font: 'monospace', color: farbe.blau, angle: -90 }, bogen);
  await Merz.merzbilder('026', 57, 603, 20, bogen);
  Merz.stempel('HEFT 1, NR. 8/9', 52, 668, { size: 9, color: farbe.blau }, bogen);
  Merz.stempel(['OKTO', 'BER', '2026'], 52, 700, { size: 24, leading: 27, width: 72, color: farbe.blau }, bogen);

  // The text: one mixed line, then a measure of red lines between blue rules.
  Merz.stempel('NATUR', 165, 357, { size: 30, color: farbe.rot }, bogen);
  Merz.stempel('ODER', 292, 357, { size: 14, color: farbe.rot }, bogen);
  Merz.stempel('NASCI', 372, 357, { width: 203, height: 44, color: farbe.rot }, bogen);
  bogen.rect(165, 365, 410, 9);
  Merz.stempel(['HEISST WERDEN:', 'WAS SICH AUS SICH', 'SELBST DURCH EIGENE', 'KRAFT ENTWICKELT', 'GESTALTET UND BEWEGT'],
    165, 401, { size: 26, leading: 44.6, width: 410, color: farbe.rot, rule: { weight: 9, color: farbe.blau } }, bogen);
  Merz.stempel('NASCI', 230, 712, { size: 44, color: farbe.rot }, bogen);
  Merz.stempel(['Natur, Form und Kraft:', 'was sich aus sich selbst entwickelt.'], 165, 728,
    { size: 9, font: 'Georgia', leading: 12 }, bogen);
  describe('A cover after Merz 8/9: a stretched blue MERZ between the numerals 8 and 9, a measure of red lines between blue rules, a pointing hand and notes read upwards.');
}
function draw() {
  bogen.druck();
}
