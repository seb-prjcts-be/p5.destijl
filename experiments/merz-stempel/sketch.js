// Load p5.js and p5.merz.js. Change study to 0, 1 or 2.
let study = 0;
const red = '#b92d26';
const black = '#20201e';

function setup() {
  const canvas = createCanvas(600, 760);
  if (document.getElementById('drawing')) canvas.parent('drawing');
  pixelDensity(1);
  noLoop();
  // The comparison page selects each sketch through its URL.
  const selected = new URLSearchParams(location.search).get('study');
  if (selected !== null) study = Number(selected);
}

function draw() {
  background('#f7f7f2');
  if (study === 0) merzbild();
  if (study === 1) splitter();
  if (study === 2) rrrt();
}

function merzbild() {
  const word = Merz.geometry('MERZ', { size: 106, weight: 0.7, spacing: 6 });
  const impressions = [];
  for (let i = 0; i < 5; i++) {
    impressions.push({ x: 28 + i * 13, y: 28 + i * 115, color: i % 2 ? red : black });
  }
  Merz.stempel(word, impressions);
  noStroke(); fill(red); rect(20, 620, 560, 103);
  fill('#f7f7f2'); textFont('Georgia'); textSize(69); text('Fundsachen', 30, 693);
  push(); translate(556, 54); rotate(HALF_PI);
  fill(black); textFont('monospace'); textSize(13);
  text('01 02 03 04 05 06 07 08 09 10 11 12', 0, 0); pop();
}

function splitter() {
  const word = Merz.geometry('SPLITTER', { size: 110, weight: 0.85, spacing: 8 });
  const piece = Merz.fragment(word, [[0, 22], [word.width, 22], [word.width, 67], [0, 67]]);
  const torn = Merz.tear(piece, { amount: 0.16, seed: 17 });
  const impressions = [];
  for (let i = 0; i < 10; i++) {
    impressions.push({ x: i % 2 ? -160 : -10, y: 42 + i * 58, scale: 0.9, angle: i % 3 === 0 ? -4 : 0, color: i % 3 === 0 ? red : black });
  }
  Merz.stempel(torn, impressions);
  noStroke(); fill(black); textFont('Georgia'); textSize(81); text('splitter', 30, 705);
  fill(red); textFont('monospace'); textSize(15); text('17 / 41 / 103', 377, 703);
}

function rrrt() {
  const bowl = Merz.parts('R', { size: 96, weight: 0.6 }).find(part => part.id === 'bowl');
  const impressions = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 6; col++) {
      impressions.push({ x: 28 + col * 90, y: 120 + row * 63, scale: 0.72 + (col % 3) * 0.12, color: (row + col) % 5 === 0 ? red : black });
    }
  }
  Merz.stempel(bowl, impressions);
  noStroke(); fill(red); textFont('Georgia'); textSize(105); text('rrrt', 28, 98);
  fill(black); textFont('monospace'); textSize(16);
  for (let row = 0; row < 4; row++) text('ABFALL  KLEBSTOFF  MERZBILD  ZWECKFREI', 28, 660 + row * 20);
}

function keyPressed() {
  if (key === 's' || key === 'S') saveCanvas('p5.merz-stempel-' + study, 'png');
}
