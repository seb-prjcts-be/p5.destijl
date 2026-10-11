// The geometric alphabet cut, torn and repeated. Every mark here comes from the library.
let bogen;
function setup() {
  createCanvas(600, 760).parent('drawing');
  noLoop();
  const farbe = Merz.farbe;
  bogen = Merz.bogen({ paper: 0.2, ink: 0.12, seed: 5 });

  // A word in four torn strips, each shifted a little further.
  const word = Merz.satz('MERZ', { size: 118, weight: 0.7 });
  Merz.splitter(word, { rows: 4 }).forEach((strip, i) =>
    Merz.stempel(Merz.riss(strip, { amount: 0.35, seed: 3 + i }), 40 + i * 12, 50 + strip.y + i * 7,
      { color: i % 2 ? farbe.schwarz : farbe.rot }, bogen));

  // One part of a letter, cut to an oval and torn, repeated down the right side.
  const bowl = Merz.bauteil('R', 'bowl', { size: 230 });
  const piece = Merz.riss(Merz.rundschnitt(bowl, 60, 0, 150, 120), { amount: 0.6, seed: 11 });
  Merz.stempel(piece, 420, 290, { repeat: 3, stepY: 125, offsetX: -30, color: [farbe.rot, farbe.schwarz] }, bogen);

  // A torn letter drawn directly, a row of forks and three spaced lines.
  Merz.riss('K', 60, 320, { size: 200, amount: 0.5, seed: 2 }, bogen);
  Merz.stempel(Merz.bauteil('Y', 'fork', { size: 40, weight: 0.4 }), 60, 590, { repeat: 8, stepX: 44, color: farbe.blau }, bogen);
  Merz.stempel(['ABFALL', 'KLEBSTOFF', 'MERZBILD'], 60, 680, { size: 14, font: 'monospace', leading: 18, spacing: 6 }, bogen);
  describe('MERZ in four torn and shifted strips, a torn oval piece of an R repeated three times, a large torn K, a row of blue forks and three spaced lines of monospace text.');
}
function draw() {
  bogen.druck();
}
