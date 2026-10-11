// Found texts: T423, Merz 8/9, p. 76; T041, Merz 1, p. 7; T130, Merz 2, p. 23; T021/T024, Merz 1, p. 4.
// See assets/fundsachen/texts/catalogue.json for source scans.
/* Own composition, inspired by typographic relationships in Merz.
 * Uses the shared Merz geometry for both drawing routes.
 */
(function (root) {
  'use strict';
  const ink = '#20201e', red = '#b92d26';
  function letterPaths(p, text, x, y, options) {
    p.push();
    p.translate(x, y);
    p.noFill(); p.stroke(options.color || '#20201e');
    p.strokeCap('square'); p.strokeJoin('miter');
    for (const part of Merz.satz(text, options).paths) {
      p.strokeWeight(part.width);
      p.beginShape();
      for (const point of part.points) p.vertex(...point);
      p.endShape();
    }
    p.pop();
  }
  // Both routes draw precisely the same word, line and plane.
  function retained(p) {
    const work = Merz.create({ width: 600, height: 840, background: null });
    work.text('MERZ', 52, 127, { size: 106, spacing: 15, color: ink });
    work.line(52, 273, 532, 273, { strokeWeight: 7, color: red });
    work.plane(52, 405, 260, 110, { color: ink });
    work.draw(p);
  }
  function direct(p) {
    letterPaths(p, 'MERZ', 52, 127, { size: 106, spacing: 15, color: ink });
    p.push();
    p.stroke(red); p.strokeWeight(7); p.strokeCap('square');
    p.line(52, 273, 532, 273);
    p.noStroke(); p.fill(ink); p.rect(52, 405, 260, 110);
    p.pop();
  }
  function draw(p, route) {
    p.push(); p.rectMode('corner');
    (route === 'retained' ? retained : direct)(p);
    // Real transparency, rather than painting the word in the paper colour.
    p.erase();
    letterPaths(p, 'FORM', 72, 432, { size: 47, spacing: 7, color: ink });
    p.noErase();
    p.noStroke(); p.fill(ink);
    p.textFont('Arial'); p.textStyle('normal'); p.textSize(12);
    p.text('MERZBILD', 52, 65);
    p.textSize(16);
    p.text('Kunstwerk ist Gleichgewicht.', 52, 315);
    p.text('Nichts ist Zufall.', 52, 339);
    p.textFont('Georgia'); p.textSize(85);
    p.text('m', 345, 479);
    Merz.stempel('WACHT', 543, 570, { size: 14, font: 'Arial', angle: -90 }, p);
    p.textFont('Arial'); p.textSize(14);
    p.text('01', 52, 744);
    p.text('DADA COMPLET', 100, 744);
    p.pop();
  }
  function render(p, amount, seed, route) {
    // Start fresh so previous p5 drawing/erase state cannot leak.
    const layer = p.createGraphics(600, 840); layer.pixelDensity(1);
    try {
      draw(layer, route);
      MerzInkStudy.apply(layer, amount, seed);
      p.push();
      p.background('#f7f7f2');
      // This red plane can be seen through the cut-out word.
      p.noStroke(); p.fill(red); p.rectMode('corner'); p.rect(90, 440, 130, 43);
      p.image(layer, 0, 0);
      p.pop();
    } finally { layer.remove(); }
  }
  root.MerzCompositionStudy = { draw, render, letterPaths };
})(globalThis);
