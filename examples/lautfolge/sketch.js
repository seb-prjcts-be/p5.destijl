// Recombined sound fragments from Merz 1, p. 8 and Merz 4, p. 37.
const pageDescription = 'A sound poem with large OI EI, small repeated syllables, a vertical black passage and red punctuation. The groups form a fixed composition.';
function compose(g) {
  textAt(g, 'OI', 27, 182, 182);
  textAt(g, 'EI', 258, 327, 166, 'Georgia', '#b92d26');
  textAt(g, 'BI DI', 38, 273, 25, 'monospace');
  textAt(g, 'ZI C S B P D', 40, 308, 14, 'monospace');
  for (let i = 0; i < 5; i++) textAt(g, 'O A  O A  la la', 38 + i * 12, 405 + i * 32, 14 + i * 3, 'Georgia');
  g.push(); g.translate(561, 592);g.rotate(-HALF_PI);
  textAt(g, 'HHH  HH  HHH  HH', 0, 0, 30);g.pop();
  g.noStroke();g.fill('#b92d26');g.rect(32, 596, 170, 18);
  textAt(g, 'O la la la', 33, 681, 49, 'Georgia');
  textAt(g, 'O A O A la la', 248, 724, 23, 'Georgia');
}
