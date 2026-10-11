// Found pieces from the Merzbilder catalogue in a new arrangement:
// the numeral 2, the boat and the hand from Merz 2, the letters and the rule from Merz 8/9.
let blatt;
async function setup() {
  createCanvas(600, 760).parent('drawing');
  noLoop();
  const farbe = Merz.farbe;
  blatt = Merz.andruck({ paper: 0.8, ink: 0.1, seed: 23, color: '#a08962' });

  // The found numeral, large, and the four blue letters as a descending stair.
  await blatt.merzbilder('006', 36, 48, 250);
  const letters = await Promise.all(['016', '017', '018', '019'].map(id => Merz.merzbilder(id)));
  blatt.stempel(letters, 300, 40, { repeat: 4, stepX: 62, stepY: 118, scale: 0.5 });

  // The boat, cut to an oval and torn, with a stack of found rules beside it.
  const boat = await Merz.merzbilder('009');
  const oval = Merz.rundschnitt(boat, 0, 0, boat.width, boat.height);
  blatt.stempel(Merz.riss(oval, { amount: 0.4, seed: 9 }), 40, 430, { scale: 1.1 });
  const rule = await Merz.merzbilder('025');
  blatt.stempel(rule, 330, 520, { repeat: 6, stepY: 26, scale: 0.3 });
  await blatt.merzbilder('010', 520, 560, 40);

  // Our own word in the geometric alphabet, and the catalogue numbers of the pieces.
  blatt.stempel(Merz.satz('ZWEI', { size: 72, weight: 0.6 }), 36, 640, { color: farbe.rot });
  blatt.stempel(['MERZ 2 / MERZ 8', '006 016 017 018 019 009 025 010'], 330, 690, { size: 10, weight: 500, spacing: 1, leading: 15 });
  describe('A large found numeral 2, four blue found letters descending like stairs, a torn oval boat, a stack of found rules, a pointing hand and the red geometric word ZWEI.');
}
function draw() {
  Merz.stempel(blatt, 0, 0);
}
