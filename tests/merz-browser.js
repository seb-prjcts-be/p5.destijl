new p5(p => {
  p.setup = () => {
    p.createCanvas(1, 1); p.pixelDensity(1); p.noLoop();
    const result = document.getElementById('result');
    try {
      let layer;
      function snapshot(route, amount) {
        if (layer) layer.remove();
        layer = p.createGraphics(600, 840); layer.pixelDensity(1);
        MerzCompositionStudy.draw(layer, route);
        MerzInkStudy.apply(layer, amount, 17);
        layer.loadPixels(); return Array.from(layer.pixels);
      }
      function diff(a, b) {
        let changed = 0, maximum = 0; const bounds = [600,840,0,0];
        for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) { changed++; maximum = Math.max(maximum, Math.abs(a[i] - b[i])); const x=Math.floor(i/4)%600,y=Math.floor(i/2400); bounds[0]=Math.min(bounds[0],x);bounds[1]=Math.min(bounds[1],y);bounds[2]=Math.max(bounds[2],x);bounds[3]=Math.max(bounds[3],y); }
        return { changed, maximum, bounds };
      }
      const direct = snapshot('direct', 0), retained = snapshot('retained', 0);
      const ink = snapshot('direct', .6); snapshot('direct', .9);
      const reset = snapshot('direct', .6);
      const routes = diff(direct, retained), repeat = diff(ink, reset);
      const zero = diff(direct, snapshot('direct', 0));
      if(routes.changed||repeat.changed||zero.changed)throw new Error('pixel mismatch');
      result.textContent = 'PASS: ' + JSON.stringify({ constants:[layer.PROJECT,layer.MITER,layer.CORNER], density: layer.pixelDensity(), length: direct.length, routes, repeat, zero }, null, 2);
      layer.remove();
    } catch (error) { result.textContent = 'FAIL: ' + error.stack; }
  };
});
