const cases = [
  ["merz-fundsachen", "nasci", []],
  ["merz-fundsachen", "sketch", []],
  ["merz-stempel", "sketch", []],
  ["merz-sheet", "sketch", []],
  ...["scan", "word", "part"].map(name => ["merz-fragment-route", name, []]),
  ...["clippings", "syllables", "connections"].map(name => ["merz-materials", name, []]),
  ["merz-surface", "edge-sketch", ["edges.js"]],
  ["merz-surface", "edge-clean", ["edges.js"]],
  ...["large-small", "text-rules", "open-page"].map(name => ["merz-pages", name, []]),
  ...["sketch", "r", "rule"].map(name => ["merz-fragments", name, []]),
  ["merz-parts", "sketch", []],
  ["merz-parts", "adapter-sketch", ["alphabet.js"]],
  ...["module-start", "module-parts"].map(name => ["merz-parts", name, []]),
  ...["clean", "print", "light-print", "strong-print", "age", "both", "element-print", "element-age", "sketch"].map(name => ["merz-surface", name, ["../merz-print/ink.js", "surface.js", "composition.js"]]),
  ["merz-surface", "draw-ink", ["../merz-print/ink.js", "surface.js"]]
];

document.getElementById("run").addEventListener("click", async () => {
  const button = document.getElementById("run");
  const result = document.getElementById("result");
  button.disabled = true;
  result.textContent = "";
  let passed = 0;
  try {
    for (const [folder, name, helpers] of cases) {
      const frame = document.createElement("iframe");
      frame.title = folder + "/" + name;
      const base = new URL("../experiments/" + folder + "/", location.href).href;
      const scripts = ["../../vendor/p5-2.3.4.min.js", "../../p5.merz.js", ...helpers, name + ".js"];
      frame.srcdoc = '<!doctype html><html><head><base href="' + base + '"><script>window.sketchErrors=[];window.addEventListener("error",e=>sketchErrors.push(e.message));window.addEventListener("unhandledrejection",e=>sketchErrors.push(String(e.reason)));<\/script>' + scripts.map(src => '<script defer src="' + src + '?check=' + Date.now() + '"><\/script>').join("") + '</head><body></body></html>';
      document.getElementById("host").append(frame);
      try {
        await new Promise((resolve, reject) => {
          const started = performance.now();
          const timer = setInterval(() => {
            const errors = frame.contentWindow.sketchErrors || [];
            const canvas = frame.contentDocument.querySelector("canvas");
            if (errors.length) { clearInterval(timer); reject(new Error(errors.join("; "))); }
            else if (canvas && canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height).data.some(value => value !== 0)) {
              clearInterval(timer); resolve();
            } else if (performance.now() - started > 15000) {
              clearInterval(timer); reject(new Error("No rendered canvas within 15 seconds"));
            }
          }, 100);
        });
        passed++;
        result.textContent += "PASS " + folder + "/" + name + "\n";
      } finally { frame.remove(); }
    }
    result.textContent += "PASS: " + passed + " sketches rendered without site controls or a drawing container.";
  } catch (error) { result.textContent += "FAIL: " + error.message; }
  finally { button.disabled = false; }
});
