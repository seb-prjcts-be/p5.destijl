// Recombined sound fragments from Merz 1, p. 8 and Merz 4, p. 37.
const pageDescription = 'A sound poem with large OI EI, small repeated syllables, a vertical black passage and red punctuation. The groups form a fixed composition.';
function compose(g) {
  Merz.stempel('OI', 27, 182, { size: 182 }, g);
  Merz.stempel('EI', 258, 327, { size: 166, font: 'Georgia', color: '#b92d26' }, g);
  Merz.stempel('BI DI', 38, 273, { size: 25, font: 'monospace' }, g);
  Merz.stempel('ZI C S B P D', 40, 308, { size: 14, font: 'monospace' }, g);
  for (let i = 0; i < 5; i++) Merz.stempel('O A  O A  la la', 38 + i * 12, 405 + i * 32, { size: 14 + i * 3, font: 'Georgia' }, g);
  Merz.stempel('HHH  HH  HHH  HH', 561, 592, { size: 30, font: 'Archivo Black', angle: -90 }, g);
  g.noStroke();g.fill('#b92d26');g.rect(32, 596, 170, 18);
  Merz.stempel('O la la la', 33, 681, { size: 49, font: 'Georgia' }, g);
  Merz.stempel('O A O A la la', 248, 724, { size: 23, font: 'Georgia' }, g);
}
