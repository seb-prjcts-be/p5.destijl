async function setup() {
  noCanvas();
  const report = document.getElementById("result");
  const check = (condition, message) => {
    if (!condition) throw new Error(message);
  };
  let instance;
  try {
    const g = createGraphics(120, 100);
    g.pixelDensity(1);
    g.background("#b92d26");
    const sources = [
      g,
      Merz.satz("R", { size: 100 }),
      Merz.bauteile("R", { size: 100 })
    ];
    const outline = [
      [0, 0],
      [100, 0],
      [100, 85],
      [0, 85]
    ];
    let resolve;
    const ready = new Promise((r) => (resolve = r));
    instance = new p5((p) => {
      p.setup = () => {
        p.noCanvas();
        resolve();
      };
    });
    await ready;
    const pixels = (image) => Array.from(image.pixels).join(",");
    for (const density of [1,2]) {
      const manual=createGraphics(180,180),short=createGraphics(180,180);
      manual.pixelDensity(density);short.pixelDensity(density);
      const piece=Merz.bauteil('R','bowl',{size:100});
      manual.translate(20,20);manual.noFill();manual.stroke('#b92d26');manual.strokeCap(PROJECT);manual.strokeJoin(MITER);
      for(const path of piece.paths){manual.strokeWeight(path.width);manual.beginShape();for(const point of path.points)manual.vertex(...point);manual.endShape();}
      Merz.stempel(piece,20,20,{color:'#b92d26'},short);
      manual.loadPixels();short.loadPixels();
      check(pixels(manual)===pixels(short),'part and stempel match manual drawing at density '+density);
      manual.remove();short.remove();
    }
    const geometryCuts=Merz.splitter(Merz.satz('L'),{rows:2});
    const partCuts=Merz.splitter(Merz.bauteile('L'),{rows:2});
    for(let i=0;i<geometryCuts.length;i++){
      check(JSON.stringify(geometryCuts[i].outline())===JSON.stringify(partCuts[i].outline()),'geometry/parts bounds');
      check(pixels(geometryCuts[i].bau())===pixels(partCuts[i].bau(instance)),'geometry/parts pixel parity');
    }
    for (const source of sources) {
      const piece = Merz.schnitt(source, outline);
      const clean = piece.bau(globalThis);
      check(pixels(clean) === pixels(piece.bau()), 'default global rendering parity');
      check(pixels(piece.bau(instance, { color: '#b92d26' })) === pixels(piece.bau(globalThis, { color: '#b92d26' })), 'global/instance colour parity');
      const cells = Merz.splitter(source, { rows: 2, columns: 2 });
      for (const cell of cells) {
        check(pixels(cell.bau()) === pixels(cell.bau(instance)), 'splitter global/instance parity');
      }
      const beforeSplit = pixels(cells[0].bau());
      Merz.riss(cells[1], { amount: 1, seed: 17 });
      check(beforeSplit === pixels(cells[0].bau()), 'splitter sibling independence');
      check(pixels(clean) === pixels(Merz.ausschnitt(source, 0, 0, 100, 85).bau()), "cut matches polygon and default global rendering");
      const oval = Merz.rundschnitt(source, 0, 0, 100, 85);
      const ovalImage = oval.bau();
      check(pixels(ovalImage) === pixels(oval.bau(instance)), "oval global/instance parity");
      check(ovalImage.pixels[3] === 0, "oval corner is transparent");
      check(Array.from(ovalImage.pixels).some((v, i) => i % 4 === 3 && v > 0), "oval retains ink");
      check(
        pixels(clean) ===
          pixels(Merz.riss(piece, { amount: 0 }).bau(globalThis)),
        "zero identity"
      );
      const torn = Merz.riss(piece, { amount: 1, seed: 17 });
      const image = torn.bau(globalThis);
      check(pixels(image) === pixels(torn.bau(instance)), "global/instance parity");
      const repeat = Merz.riss(piece, { amount: 1, seed: 17 }).bau(globalThis);
      const aa = pixels(image).split(","),
        bb = pixels(repeat).split(",");
      const differences = aa
        .map((v, i) => Math.abs(Number(v) - Number(bb[i])))
        .filter((v) => v);
      check(
        !differences.length,
        "repeatability source " +
          sources.indexOf(source) +
          " differences " +
          differences.length +
          " max " +
          Math.max(...differences)
      );
      check(pixels(image) !== pixels(clean), "edge changes pixels");
    }
    const highSource=createGraphics(120,100);highSource.pixelDensity(2);highSource.background('#b92d26');
    highSource.noStroke();highSource.fill('#20201e');highSource.rect(10,0,.5,100);
    const highPiece=Merz.ausschnitt(highSource,10,10,80,60);
    const highImage=highPiece.bau();
    check(highImage.width===80 && highImage.height===60 && highImage.pixelDensity()===2 && highImage.canvas.width===160,'bau preserves raster density and crop size');
    const crop=highSource.drawingContext.getImageData(20,20,160,120).data;
    check(Array.from(crop).every((v,i)=>v===highImage.pixels[i]),'crop preserves physical detail');
    check(pixels(highImage)===pixels(highPiece.bau(instance)),'high density instance parity');
    const highSurface=Merz.andruck(highImage,{ink:0,paper:0});
    check(pixels(highImage)===pixels(highSurface) && highSurface.pixelDensity()===2,'bau to surface keeps density');
    highSource.background('#ffffff');
    check(pixels(highImage)===pixels(highPiece.bau()),'high density detached snapshot');
    highSource.remove();
    pixelDensity(2);instance.pixelDensity(2);
    const vector=Merz.ausschnitt(Merz.satz('R'),0,0,100,100);
    const vectorHigh=vector.bau();
    check(vectorHigh.pixelDensity()===2 && vectorHigh.canvas.width===200,'geometry follows drawing context density');
    check(pixels(vectorHigh)===pixels(vector.bau(instance)),'vector density 2 instance parity');
    pixelDensity(1);instance.pixelDensity(1);
    const saved = Merz.schnitt(g, outline);
    const splitSaved = Merz.splitter(g, { rows: 2 });
    const splitPixels = pixels(splitSaved[0].bau());
    const before = pixels(saved.bau(globalThis));
    g.background("#234b92");
    check(splitPixels === pixels(splitSaved[0].bau()), 'splitter source snapshot');
    check(before === pixels(saved.bau(globalThis)), "image snapshot");
    g.remove();
    const geom = Merz.satz("R", { size: 100 });
    const savedGeometry = Merz.schnitt(geom, outline);
    const original = pixels(savedGeometry.bau(globalThis));
    geom.paths[0].points[0][0] = 999;
    check(original === pixels(savedGeometry.bau(globalThis)), "geometry snapshot");
    report.textContent =
      "PASS: image, geometry and parts; actual pixel changes, zero identity, repeatability, detached sources and global/instance parity.";
  } catch (error) {
    report.textContent = "FAIL: " + error.message;
  } finally {
    if (instance) instance.remove();
  }
}
