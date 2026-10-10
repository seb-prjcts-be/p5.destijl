// With p5.js and p5.merz.js loaded.
// 0 for Merzbild, 1 for Splitter, 2 for Rrrt.
let study = 0;

function setup() {
  const canvas = createCanvas(600, 760);
  if (document.getElementById('drawing')) canvas.parent('drawing');
  pixelDensity(1);
  noLoop();
  // For the three views on the example page.
  const selected = new URLSearchParams(location.search).get('study');
  if (selected !== null) study = Number(selected);
}

function draw() {
  background(Merz.farbe.grau);
  if (study === 0) merzbild();
  if (study === 1) splitWord();
  if (study === 2) rrrt();
}

function merzbild() {
  // A longer word might run off the page.
  const word = Merz.satz('MERZ', { size: 106, weight: 0.7, spacing: 6 });
  const impressions = [];
  for (let i = 0; i < 5; i++) {
    impressions.push({ x: 28 + i * 13, y: 28 + i * 115, color: i % 2 ? Merz.farbe.rot : Merz.farbe.schwarz });
  }
  Merz.stempel(word, impressions);
  noStroke(); fill(Merz.farbe.rot); rect(20, 620, 560, 103);
  Merz.stempel('Fundsachen', 30, 693, { size: 69, color: Merz.farbe.grau });
  Merz.stempel('01 02 03 04 05 06 07 08 09 10 11 12', 556, 54, { size: 13, font: 'monospace', angle: 90, color: Merz.farbe.schwarz });
}

function splitWord() {
  const word = Merz.satz('SPLITTER', { size: 110, weight: 0.85, spacing: 8 });
  // Two strips might leave more of the word intact.
  const pieces = Merz.splitter(word, { rows: 3 });
  const torn = pieces.map((piece, i) => Merz.riss(piece, { amount: 0.16, seed: 17 + i }));
  Merz.stempel(torn, -10, 42, {
    repeat: 10,
    stepY: 58,
    offsetX: -150,
    scale: 0.9,
    angle: [-4, 0, 0],
    color: [Merz.farbe.rot, Merz.farbe.schwarz, Merz.farbe.schwarz]
  });
  Merz.stempel('splitter', 30, 705, { size: 81, color: Merz.farbe.schwarz });
  Merz.stempel('17 / 41 / 103', 377, 703, { size: 15, font: 'monospace', color: Merz.farbe.rot });
}

function rrrt() {
  // A small piece of R, with room to repeat.
  const bowl = Merz.bauteil('R', 'bowl', { size: 96, weight: 0.6 });
  const impressions = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 6; col++) {
      impressions.push({ x: 28 + col * 90, y: 120 + row * 63, scale: 0.72 + (col % 3) * 0.12, color: (row + col) % 5 === 0 ? Merz.farbe.rot : Merz.farbe.schwarz });
    }
  }
  Merz.stempel(bowl, impressions);
  Merz.stempel('rrrt', 28, 98, { size: 105, color: Merz.farbe.rot });
  Merz.stempel('ABFALL  KLEBSTOFF  MERZBILD  ZWECKFREI', 28, 660, {
    size: 16, font: 'monospace', color: Merz.farbe.schwarz, rows: 4, leading: 20
  });
}

function keyPressed() {
  if (key === 's' || key === 'S') saveCanvas('p5.merz-stempel-' + study, 'png');
}
